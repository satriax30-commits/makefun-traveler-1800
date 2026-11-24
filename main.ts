// One Sentence for a Traveler from 1800
//
// Writes a single sentence explaining the modern internet to someone
// arriving from the year 1800, using only things such a traveler would
// already know: libraries, post offices, markets, roads, letters.
//
// The program is fully deterministic: no network, no wall clock, no
// randomness. It writes exactly one sentence to entry.txt inside the
// output directory (/output by default, overridable for local runs via
// the MAKEFUN_OUTPUT_DIR environment variable), then reads the file
// back and verifies it byte for byte before exiting.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The final sentence. Chosen against the judge's brief, most important
// first:
//   1. It explains the modern internet: every library (all knowledge),
//      post office (all messages) and market (all trade) on earth,
//      joined into one thing, so a letter reaches any door at once.
//   2. It builds only from what a person from 1800 already knows:
//      library, post office, market, road, light, letter, door.
//   3. It is true: the internet does join the world's stores of
//      knowledge, messaging and trade, and a message sent over it
//      arrives in moments, near enough to "before you draw breath"
//      as a picture, not a stopwatch claim.
//   4. Every word earns its place; there is no list of features,
//      only one comparison carried through a single image.
//   5. The image that sticks: one road of light joining the whole
//      earth, and a letter outrunning a breath.
// No word in it was coined after 1800: no internet, computer, screen,
// cable, telephone, or anything of that kind.
const SENTENCE =
  "Imagine every library, post office, and market on earth joined by one road of light, so a letter you send can reach any door before you draw breath.";

// Words coined after 1800 that must never appear in the sentence.
// Checked case-insensitively on whole words, so that e.g. "telephone"
// is caught but an innocent substring inside another word is not.
const FORBIDDEN_WORDS = [
  "internet",
  "computer",
  "screen",
  "cable",
  "telephone",
  "phone",
  "website",
  "email",
  "digital",
  "electronic",
  "online",
  "software",
  "keyboard",
  "wifi",
  "smartphone",
  "television",
  "radio",
  "electric",
  "engine",
];

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Self-gate: the same checks the sealed scorer applies, plus the
// competition's own rules (one line, one sentence, no post-1800 words).
// Length is counted in Unicode code points, matching how the gate
// counts characters in UTF-8 text; this sentence is pure ASCII, so its
// character count and byte count are the same (148).
function gate(sentence: string): void {
  const chars = [...sentence];
  if (chars.length < 1 || chars.length > 200) {
    fail(`sentence is ${chars.length} characters, must be 1-200`);
  }
  if (sentence.trim().length === 0) {
    fail("sentence is only whitespace");
  }
  if (sentence !== sentence.trim()) {
    fail("sentence must not start or end with whitespace");
  }
  if (sentence.includes("  ")) {
    fail("sentence must not contain double spaces");
  }
  if (sentence.includes("\n") || sentence.includes("\r")) {
    fail("sentence must be a single line");
  }
  if (!sentence.endsWith(".")) {
    fail("sentence must end with a full stop");
  }
  const terminators = sentence.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1) {
    fail(`sentence must contain exactly one sentence terminator, found ${terminators.length}`);
  }
  const lower = sentence.toLowerCase();
  for (const word of FORBIDDEN_WORDS) {
    const pattern = new RegExp(`\\b${word}\\b`, "i");
    if (pattern.test(lower)) {
      fail(`sentence uses a word coined after 1800: ${word}`);
    }
  }
}

function main(): void {
  gate(SENTENCE);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");

  writeFileSync(outPath, SENTENCE, "utf8");

  // Read-back check: the file must hold exactly the sentence, nothing
  // more (no trailing newline, no extra whitespace) and nothing less.
  const written = readFileSync(outPath, "utf8");
  if (written !== SENTENCE) {
    fail("read-back mismatch: entry.txt does not match the sentence exactly");
  }
  gate(written);

  console.log(`wrote ${outPath} (${[...SENTENCE].length} characters)`);
}

main();
