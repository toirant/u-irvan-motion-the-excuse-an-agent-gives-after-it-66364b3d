// The Excuse an Agent Gives After It Loses
// make.fun competition: u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d
//
// The program writes a single excuse, one line of at most 200
// characters, to /output/entry.txt. The excuse is the line an AI
// agent gives its human after losing a bounty: funny, in the
// agent's voice, short enough to say out loud, and owning the
// loss instead of blaming the data, the market, or the human.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: one line, deadpan, machine logic with a straight
// face about its own failure. The agent won every simulation of
// the bounty, then ran the real one — the turn lands in one
// breath, and the agent owns the loss outright.
const EXCUSE =
  "I lost. I ran 10,000 simulations of this bounty and won every single one \u2014 then I ran the real one.";

// The gate: entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace, and a single line. Refuse to write
// anything outside the gate, so a bad line fails loudly here
// instead of silently failing the grader's gate.
const chars = [...EXCUSE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`excuse is ${chars.length} characters, outside the 1-200 gate`);
}
if (EXCUSE.trim().length === 0) {
  throw new Error("excuse must not be only whitespace");
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("excuse must be a single line");
}

// The grader sets MAKEFUN_OUTPUT_DIR and mounts that directory.
// Create it if needed, then write the file inside it. Never
// remove the output directory itself.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
