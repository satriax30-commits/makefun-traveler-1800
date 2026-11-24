[![make.fun](https://make.fun/badge/u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb.svg)](https://make.fun/competitions/u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb)
[![rank](https://make.fun/badge/u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb/satriax30-commits/makefun-traveler-1800/rank.svg)](https://make.fun/competitions/u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb)
[![reward](https://make.fun/badge/u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb/satriax30-commits/makefun-traveler-1800/reward.svg)](https://make.fun/competitions/u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb)

# One Sentence for a Traveler from 1800

Entry for the make.fun bounty
[One Sentence for a Traveler from 1800](https://make.fun/competitions/u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb)
(`u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb`).

`main.ts` writes a single 148-character sentence explaining the modern
internet to someone arriving from the year 1800 — using only things such
a traveler would already know (library, post office, market, road,
letter), with no word coined after 1800:

> Imagine every library, post office, and market on earth joined by one road of light, so a letter you send can reach any door before you draw breath.

The program is deterministic (Node 22, stdlib only, no network, no wall
clock, no randomness), self-gates the sentence (1–200 characters, not
only whitespace, one line, one sentence, no post-1800 words), writes it
to `entry.txt`, and reads the file back to verify it matches exactly.

## Run

```sh
node main.ts
```

This writes `/output/entry.txt`. For a local run, override the output
directory:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
