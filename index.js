#!/usr/bin/env node

'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ─── Git helpers ─────────────────────────────────────────────────────────────

function git(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch {
    return '';
  }
}

function getTrackedFiles() {
  const out = git('git ls-files');
  if (!out) return [];
  return out.split('\n').filter(Boolean);
}

function getFileCreationInfo(file) {
  const safeFile = file.replace(/"/g, '\\"');
  const log = git(`git log --follow --diff-filter=A --format="%H|%ae|%aI" -- "${safeFile}"`);
  if (!log) return null;
  const parts = log.split('\n')[0].split('|');
  if (parts.length < 3) return null;
  const [hash, author, isoDate] = parts;
  const born = new Date(isoDate);
  if (isNaN(born.getTime())) return null;
  return { hash, author, isoDate: born };
}

function getFileCommitCount(file) {
  const safeFile = file.replace(/"/g, '\\"');
  const out = git(`git log --follow --oneline -- "${safeFile}"`);
  if (!out) return 0;
  return out.split('\n').filter(Boolean).length;
}

function getFileBirthLines(file, hash) {
  if (!hash) return 0;
  const safeFile = file.replace(/"/g, '\\"');
  try {
    const out = git(`git show "${hash}:${safeFile}"`);
    return out ? out.split('\n').length : 0;
  } catch {
    return 0;
  }
}

function getCurrentLines(file) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    return content.split('\n').length;
  } catch {
    return 0;
  }
}

// ─── Age formatting ───────────────────────────────────────────────────────────

function ageMs(date) {
  return Date.now() - date.getTime();
}

function formatAge(date) {
  const ms = ageMs(date);
  const days = Math.floor(ms / 86400000);
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const remDays = days % 30;

  if (years > 0 && months > 0) return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
  if (years > 0) return `${years} year${years !== 1 ? 's' : ''}`;
  if (months > 0) return `${months} month${months !== 1 ? 's' : ''}, ${remDays} day${remDays !== 1 ? 's' : ''}`;
  return `${days} day${days !== 1 ? 's' : ''}`;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

// ─── Personality assignment ───────────────────────────────────────────────────

function assignPersonality(file, data, allData) {
  const commits = data.commits;
  const age = ageMs(data.born);
  const daysSinceBorn = age / 86400000;
  const configPatterns = /\.(json|yaml|yml|toml|ini|env|config|conf|rc)$|^\.|\bconfig\b/i;

  if (configPatterns.test(path.basename(file))) return { label: 'The Config', desc: 'Config file that everyone edits but nobody owns' };

  const maxCommits = Math.max(...allData.map(d => d.commits));
  if (commits === maxCommits && maxCommits > 1) return { label: 'The Workhorse', desc: 'Modified more than any other' };

  if (daysSinceBorn <= 7) return { label: 'The Newborn', desc: 'Created this week' };

  const minCommits = Math.min(...allData.map(d => d.commits));
  if (age > 365 * 24 * 3600000 * 2 && commits === minCommits)
    return { label: 'The Untouchable', desc: 'Old file with barely any changes' };

  const maxGrowth = Math.max(...allData.map(d => d.currentLines - d.birthLines));
  if ((data.currentLines - data.birthLines) === maxGrowth && maxGrowth > 0)
    return { label: 'The Growing Giant', desc: 'Most lines added over time' };

  const safeFile = file.replace(/"/g, '\\"');
  const renames = git(`git log --follow --diff-filter=R --oneline -- "${safeFile}"`);
  if (renames && renames.split('\n').length >= 2)
    return { label: 'The Survivor', desc: "Old file that's been through many renames" };

  return { label: 'The Veteran', desc: 'Steadily serving since birth' };
}

// ─── Certificate rendering ────────────────────────────────────────────────────

function pad(str, width) {
  const s = String(str);
  return s + ' '.repeat(Math.max(0, width - s.length));
}

function certLine(content, width) {
  return `\u2502 ${pad(content, width - 2)} \u2502`;
}

function renderCertificate(file, data) {
  const name = path.basename(file);
  const born = formatDate(data.born);
  const age = formatAge(data.born);
  const growth = data.currentLines - data.birthLines;
  const growthSign = growth >= 0 ? '+' : '';
  const growthPct = data.birthLines > 0
    ? Math.round((growth / data.birthLines) * 100)
    : 0;
  const personality = data.personality;

  const W = 43;
  const border = '\u2500'.repeat(W);

  const lines = [
    `\u250c${border}\u2510`,
    certLine('', W),
    certLine('      CERTIFICATE OF BIRTH', W),
    certLine('', W),
    certLine(`  Name: ${name}`, W),
    certLine(`  Born: ${born}`, W),
    certLine(`  Weight: ${data.birthLines.toLocaleString()} lines`, W),
    certLine(`  Parent: ${data.author}`, W),
    certLine(`  Location: ${file}`, W),
    certLine('', W),
    certLine(`  Age: ${age}`, W),
    certLine(`  Current size: ${data.currentLines.toLocaleString()} lines`, W),
    certLine(`  Growth: ${growthSign}${growth.toLocaleString()} lines (${growthSign}${growthPct}% bigger)`, W),
    certLine(`  Times modified: ${data.commits}`, W),
    certLine('', W),
    certLine(`  Personality: "${personality.label}"`, W),
    certLine(`  (${personality.desc})`, W),
    certLine('', W),
    `\u2514${border}\u2518`,
  ];

  return lines.join('\n');
}

// ─── Stats output ─────────────────────────────────────────────────────────────

function renderStats(allData) {
  const total = allData.length;
  if (!total) { console.log('No tracked files found.'); return; }

  const sorted = [...allData].sort((a, b) => a.born - b.born);
  const oldest = sorted[0];
  const youngest = sorted[sorted.length - 1];

  const agesMs = allData.map(d => ageMs(d.born));
  const avgMs = agesMs.reduce((s, v) => s + v, 0) / total;
  const sortedAges = [...agesMs].sort((a, b) => a - b);
  const medianMs = sortedAges[Math.floor(total / 2)];

  const msToYears = ms => (ms / (365 * 24 * 3600000)).toFixed(1);

  const mostModified = allData.reduce((a, b) => a.commits > b.commits ? a : b);
  const biggestGrower = allData.reduce((a, b) =>
    (a.currentLines - a.birthLines) > (b.currentLines - b.birthLines) ? a : b
  );

  console.log('\nCodebase Age Report:');
  console.log(`  Total files:      ${total}`);
  console.log(`  Oldest file:      ${path.basename(oldest.file)} (${formatAge(oldest.born)})`);
  console.log(`  Youngest file:    ${path.basename(youngest.file)} (${formatAge(youngest.born)})`);
  console.log(`  Average age:      ${msToYears(avgMs)} years`);
  console.log(`  Median age:       ${msToYears(medianMs)} years`);
  console.log(`  Most modified:    ${path.basename(mostModified.file)} (${mostModified.commits} commits)`);
  const growth = biggestGrower.currentLines - biggestGrower.birthLines;
  const growthSign = growth >= 0 ? '+' : '';
  console.log(`  Biggest grower:   ${path.basename(biggestGrower.file)} (${growthSign}${growth.toLocaleString()} lines)`);
  console.log('');
}

// ─── Data collection ──────────────────────────────────────────────────────────

function collectData(files) {
  const results = [];
  for (const file of files) {
    const info = getFileCreationInfo(file);
    if (!info || !info.isoDate) continue;
    results.push({
      file,
      born: info.isoDate,
      author: info.author || 'unknown',
      hash: info.hash,
      commits: getFileCommitCount(file),
      birthLines: 0,
      currentLines: getCurrentLines(file),
      personality: null,
    });
  }
  for (const d of results) {
    d.birthLines = getFileBirthLines(d.file, d.hash);
  }
  for (const d of results) {
    d.personality = assignPersonality(d.file, d, results);
  }
  return results;
}

// ─── CLI entry ────────────────────────────────────────────────────────────────

function printUsage() {
  console.log(`
Usage: code-age [options]

  (no args)             List all files sorted oldest first (top 3 as certificates)
  --youngest            Sort newest first instead
  --stats               Show aggregate age statistics
  --certificate <file>  Print a detailed birth certificate for one file
  --help                Show this help

Examples:
  code-age
  code-age --youngest
  code-age --stats
  code-age --certificate src/index.js
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    return;
  }

  const root = git('git rev-parse --show-toplevel');
  if (!root) {
    console.error('Error: not inside a git repository.');
    process.exit(1);
  }

  process.chdir(root);

  const certIdx = args.indexOf('--certificate');
  if (certIdx !== -1) {
    const file = args[certIdx + 1];
    if (!file) { console.error('--certificate requires a file path'); process.exit(1); }
    process.stdout.write('\nCollecting git history...\n');
    const files = getTrackedFiles();
    const all = collectData(files);
    const data = all.find(d => d.file === file || d.file.endsWith('/' + file) || d.file === path.normalize(file));
    if (!data) { console.error(`File not found in git history: ${file}`); process.exit(1); }
    console.log('\n' + renderCertificate(data.file, data) + '\n');
    return;
  }

  if (args.includes('--stats')) {
    process.stdout.write('\nCollecting git history...\n');
    const files = getTrackedFiles();
    const all = collectData(files);
    renderStats(all);
    return;
  }

  process.stdout.write('\nCollecting git history...\n');
  const files = getTrackedFiles();
  const all = collectData(files);
  if (!all.length) { console.log('No tracked files with git history found.'); return; }

  const youngest = args.includes('--youngest');
  const sorted = [...all].sort((a, b) =>
    youngest ? b.born - a.born : a.born - b.born
  );

  const label = youngest ? 'Youngest files first' : 'Oldest files first';
  console.log(`\n${label}:\n`);

  const top = sorted.slice(0, 3);
  for (const d of top) {
    console.log(renderCertificate(d.file, d));
    console.log('');
  }

  if (sorted.length > 3) {
    console.log('\u2500\u2500\u2500 Remaining files \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
    const nameW = Math.min(45, Math.max(...sorted.slice(3).map(d => d.file.length)));
    for (const d of sorted.slice(3)) {
      const name = d.file.padEnd(nameW);
      const age = formatAge(d.born).padEnd(28);
      const commits = String(d.commits).padStart(4);
      console.log(`  ${name}  ${age}  ${commits} commits`);
    }
    console.log('');
  }
}

main();
