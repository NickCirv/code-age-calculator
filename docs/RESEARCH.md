# code-age-calculator — documentation research

Reviewed 21 September 2026. Public GitHub source only.

## Revision and scope

- Commit: [`b1efabd383ff291424f40c1ce32c89ce73018c72`](https://github.com/NickCirv/code-age-calculator/commit/b1efabd383ff291424f40c1ce32c89ce73018c72).
- Tree: `592c4cb51b336d1186636c658b9b232408bf38aa`; truncated: `false`.
- Capture: 5 of 5 eligible text files; all eligible text files.
- Method: package and entrypoint inspection, implementation-interface review, targeted behavior/limitation inspection, and test-source review. This is not an exhaustive correctness or security audit.
- Commands run against repository code: **none**. External services, deployment and npm publication were not verified.

## Claim and evidence map

| Documentation claim | Pinned evidence | Assessment |
| --- | --- | --- |
| Runtime, executable and development commands | [package.json](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/package.json) | Source declaration inspected; runtime unverified |
| Explores the recorded age and change history of files in a Git repository. | [index.js](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/index.js) | Implementation interfaces inspected; behavior not executed |
| Tracked-file discovery; creation-commit details; modification counts; terminal birth-certificate presentation. | [index.js](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/index.js) | Source-backed scope, not a test result |
| Git history records repository events, not necessarily when an idea or file was first created. Shallow clones, copied files and renames can distort age. Playful file personalities are entertainment. | [index.js](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/index.js) | Material limits documented; service compatibility remains open |

## Documentation inventory and disposition

| Existing document | Decision |
| --- | --- |
| [README.md](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/README.md) | Rewritten with source-specific purpose, direct checkout setup, limitations and verification status. Old section fragments retained where practical. |

Added `docs/REFERENCE.md` for the observed implementation and command surface, and this research record. Protected license and attribution files remain in their original locations without edits. No source or product UI was changed.

## Quality dimensions

| Dimension | Status | Evidence / next step |
| --- | --- | --- |
| Pinned provenance | Verified | Captured commit, tree and per-file hashes recorded below |
| Interface documentation | Partially verified | Source inspection only; run clean-checkout quickstart |
| Runtime behavior | Unverified | No repository execution in this review |
| Test results | Unverified | Existing tests were not run |
| Deployment / package availability | Unverified | No remote publish or live-service check |
| Visual / link checks | Unverified | Portfolio renderer and independent QA are separate from this authoring step |

## Unresolved issues

Git history records repository events, not necessarily when an idea or file was first created. Shallow clones, copied files and renames can distort age. Playful file personalities are entertainment.

A meaningful behavioral test suite was not established from the capture.

## Captured source inventory

This lists captured provenance, not a claim that every line received a full audit. Binary/generated/excluded files are outside the eligible text capture.

| File | SHA-256 | Bytes |
| --- | --- | --- |
| [LICENSE](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/LICENSE) | `029e46aa6100761e34796286d70a9c36ea77f06a75bf20788d998efebae752ea` | 1068 |
| [README.md](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/README.md) | `18004bf297677eaf365ed6e53e356d3aac240b392f4b3dc866da2d61c0536de6` | 1840 |
| [package.json](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/package.json) | `848a0ac91169d775dcbf8f284266ad7ac32f84c9b66d6aab6c05938d4f441364` | 529 |
| [.github/workflows/ci.yml](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/.github/workflows/ci.yml) | `e818f4e6bd805f798665dbbf04964d02f12fc59dd7f18903ad63d26d374ae3f0` | 380 |
| [index.js](https://github.com/NickCirv/code-age-calculator/blob/b1efabd383ff291424f40c1ce32c89ce73018c72/index.js) | `85f4af5123be43e66a2bdf2606e967d65946ba93499b86f0a61cf9cb1b7ac70f` | 11792 |
