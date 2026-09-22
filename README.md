![Nicholas Ashkar — code-age-calculator](assets/nicholas-ashkar/banner.png)

# code-age-calculator

Explores the recorded age and change history of files in a Git repository.






<a id="usage"></a>

<a id="top-3-oldest-files-as-birth-certificates-rest-as-a-list"></a>

<a id="sort-newest-first"></a>

<a id="aggregate-stats-across-the-whole-codebase"></a>

<a id="detailed-certificate-for-one-file"></a>

## What it does

- Tracked-file discovery.
- Creation-commit details.
- Modification counts.
- Terminal birth-certificate presentation.


<a id="install"></a>

## Quickstart

Prerequisites: Node.js `>=20` and npm; Git is also used by the implementation. The checkout below pins the source used for this documentation.

```sh
git clone https://github.com/NickCirv/code-age-calculator.git
cd code-age-calculator
git checkout b1efabd383ff291424f40c1ce32c89ce73018c72
node index.js --stats
```

**Expected behavior (illustrative, not captured):** Prints aggregate recorded file-age statistics from this Git checkout.

Examples are source-inspected, **not runtime-tested**. See the research record for verification gaps.

## Boundaries and data

Git history records repository events, not necessarily when an idea or file was first created. Shallow clones, copied files and renames can distort age. Playful file personalities are entertainment.

## Development

The manifest defines `npm test` as:

```sh
node index.js --help
```

No separate behavioral test file was captured. Tests were not run for this documentation revision.

See [implementation and command reference](docs/REFERENCE.md) for the package scripts and inspected interfaces, and [research record](docs/RESEARCH.md) for the pinned source, document decisions and unresolved checks.

## License and contact

See [LICENSE](LICENSE) for the original terms and attribution. Legal text is unchanged.

[Nicholas Ashkar](https://nicholashkar.com/) · [Discuss a project](https://nicholashkar.com/#oxblood-contact)
