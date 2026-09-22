# code-age-calculator — implementation reference

Source revision: `b1efabd383ff291424f40c1ce32c89ce73018c72`. This reference records source declarations; it is not a transcript of a successful run.

## Entrypoint and runtime

[package.json](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/package.json) declares `index.js`. Node.js `>=20` and npm; Git is also used by the implementation.

Executable mapping: `code-age` → `./index.js`.

## Supported workflow

Tracked-file discovery; creation-commit details; modification counts; terminal birth-certificate presentation.

Git history records repository events, not necessarily when an idea or file was first created. Shallow clones, copied files and renames can distort age. Playful file personalities are entertainment.

## Command reference

The commands below use the installed executable name. From the pinned checkout, replace it with the `node` entrypoint shown above. Options and command branches were cross-checked against captured source; examples are not execution transcripts.

| Flag | Description |
|---|---|
| _(no args)_ | List all files oldest-first; top 3 rendered as certificates |
| `--youngest` | Sort newest-first instead |
| `--stats` | Show aggregate codebase age statistics |
| `--certificate <file>` | Print a birth certificate for a specific file |
| `--help` | Show usage |

## Package scripts

| Script | Exact command |
| --- | --- |
| `test` | `node index.js --help` |

## Implementation sources

[index.js](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/index.js).

## Verification boundary

No repository code, tests, network operation, hook installer or migration was executed for this review. Source inspection supports the documented interface; runtime correctness and external-service compatibility remain unverified.
