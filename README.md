<div align="center">

# code-age-calculator

**Git-powered birth certificates for every file in your repo**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?labelColor=0B0A09)](https://opensource.org/licenses/MIT)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-blue.svg?labelColor=0B0A09)](https://github.com/NickCirv/code-age-calculator/blob/main/package.json)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14-brightgreen.svg?labelColor=0B0A09)](https://nodejs.org)

</div>

## Install

```bash
npx github:NickCirv/code-age-calculator
```

## Usage

```bash
# Top 3 oldest files as birth certificates, rest as a list
npx github:NickCirv/code-age-calculator

# Sort newest first
npx github:NickCirv/code-age-calculator --youngest

# Aggregate stats across the whole codebase
npx github:NickCirv/code-age-calculator --stats

# Detailed certificate for one file
npx github:NickCirv/code-age-calculator --certificate src/index.js
```

| Flag | Description |
|---|---|
| _(no args)_ | List all files oldest-first; top 3 rendered as certificates |
| `--youngest` | Sort newest-first instead |
| `--stats` | Show aggregate codebase age statistics |
| `--certificate <file>` | Print a birth certificate for a specific file |
| `--help` | Show usage |

## What it does

Reads `git log` history for every tracked file and prints a "birth certificate" showing when the file was born, who created it, how much it has grown, how many times it has been modified, and a personality label (Workhorse, Untouchable, Growing Giant, Newborn, Survivor, Config, Veteran). Run `--stats` for an aggregate age report across the entire codebase. Requires Git in PATH and must be run inside a git repository.

---
<sub>Zero dependencies · Node >=14 · MIT · by <a href="https://github.com/NickCirv">NickCirv</a></sub>
