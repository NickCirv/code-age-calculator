```
    🎂  code-age-calculator  🎂
    ════════════════════════════
    Birth certificates for your codebase.
    Find out which files are ancient, which
    ones never sleep, and which just arrived.
```

# code-age-calculator

Zero-dependency Node.js CLI that uses `git log` to print birth certificates for every tracked file in your repo.

## Install

```bash
npm install -g code-age-calculator
```

Or run without installing:

```bash
npx code-age-calculator
```

## Usage

```bash
# List all files, oldest first — top 3 get full birth certificates
code-age

# Sort newest first
code-age --youngest

# Aggregate stats for the whole codebase
code-age --stats

# Detailed certificate for a specific file
code-age --certificate src/index.js
```

## Example: Default output

```
Oldest files first:

┌───────────────────────────────────────────┐
│                                           │
│       CERTIFICATE OF BIRTH               │
│                                           │
│  Name: index.js                           │
│  Born: Tuesday, March 15, 2019           │
│  Weight: 847 lines                        │
│  Parent: nick@cirvgreen.com               │
│  Location: src/index.js                   │
│                                           │
│  Age: 7 years, 0 months                   │
│  Current size: 1,247 lines               │
│  Growth: +400 lines (+47% bigger)        │
│  Times modified: 156                      │
│                                           │
│  Personality: "The Workhorse"             │
│  (Modified more than any other)           │
│                                           │
└───────────────────────────────────────────┘
```

## Example: --stats

```
Codebase Age Report:
  Total files:      47
  Oldest file:      index.js (7 years)
  Youngest file:    utils.ts (2 days)
  Average age:      2.3 years
  Median age:       1.1 years
  Most modified:    api.js (234 commits)
  Biggest grower:   app.tsx (+2,100 lines)
```

## File Personalities

Every file gets a personality based on its git stats:

| Personality | Criteria |
|---|---|
| The Workhorse | Most commits of any file |
| The Untouchable | Very old, barely touched |
| The Growing Giant | Most lines added over time |
| The Newborn | Created this week |
| The Survivor | Old file with multiple renames |
| The Config | Config/dotfile pattern |
| The Veteran | Everything else — steady and reliable |

## Requirements

- Node.js 14+
- Git installed and accessible in PATH
- Must be run inside a git repository

## You might also like

More tools from the same author: **github.com/NickCirv**

## License

MIT
