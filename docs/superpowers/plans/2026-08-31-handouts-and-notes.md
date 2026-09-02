# Lab Handouts and Facilitator Notes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce the five lab handouts the deck references and the facilitator notes that make the day deliverable by someone reading English notes and speaking Turkish.

**Architecture:** Content, not software, so the test cycle is different in kind: each handout is verified by a **solvability check** — can the stated task actually be completed from the handout alone, and does the planted defect it depends on actually exist in the material? A `verify.mjs` asserts the structural invariants (every lab in the deck has a handout, every handout has a senior variant and both debrief forms, every answer key claim resolves against a real file and line in the repositories).

**Tech Stack:** Markdown. Node for the verifier. No build step.

**Spec:** `docs/superpowers/specs/2026-08-30-sdd-training-design.md` — §2.4 (labs are spec critique, §10.1 group size unknown → two debrief forms), §8 deliverables 5, 6 and 7.

## Global Constraints

- **All handouts in English.** Delivery is spoken Turkish; the paper is not.
- **No handout requires a laptop.** §2.4: labs are reading and rewriting, never coding. A handout that cannot be done on paper is a defect.
- **Every handout has a senior variant** and it must be a *different question*, not a harder instance of the same one.
- **Every handout has two debrief forms** — round-the-room for ≤15 people, instructor read-out above that. Group size is unresolved (§10.1) and the design must tolerate either.
- **Every answer-key claim must resolve** to a real file and line in `sdd-training-legacy` or `sdd-training-example`. No invented examples.
- **Facilitator notes carry the demo scripts verbatim**, including the exact commands, because a command improvised on stage is a command that fails on stage.

---

## File Structure

| Path | Responsibility |
|---|---|
| `handouts/lab-1-rank-find-rewrite.md` | Three specs of varying quality + tasks |
| `handouts/lab-1-ANSWERS.md` | Instructor copy. Never printed for participants. |
| `handouts/lab-2-five-questions.md` | One-line request, five-question exercise |
| `handouts/lab-3-planted-defects.md` | A plan with two planted defects |
| `handouts/lab-3-ANSWERS.md` | Which steps, and why each is a defect |
| `handouts/lab-4-the-pr.md` | The diff, two-sided answer key |
| `handouts/lab-4-ANSWERS.md` | Spec gap + implementation defect |
| `handouts/lab-4-ci-reference.md` | The CI material cut from module 4, its permanent home |
| `handouts/lab-5-characterize.md` | Legacy function + delta-spec task |
| `handouts/lab-5-ANSWERS.md` | Test list, delta-spec, and the bug question |
| `facilitator/00-running-order.md` | The day, with cut order and the three never-cut rules |
| `facilitator/demo-scripts.md` | Exact commands per demo, with fallback cues |
| `facilitator/objections.md` | The MDA exchange and the other four predictable challenges |
| `facilitator/room-setup.md` | Laptops read-only, ports, repo branches, what to open before 08:45 |
| `scripts/verify.mjs` | Structural assertions |

---

## Task 1: Verifier and directory scaffold

**Files:**
- Create: `handouts/`, `facilitator/`, `scripts/verify.mjs`

**Interfaces:**
- Produces: `node scripts/verify.mjs` exits non-zero until every handout exists with its required sections.

- [ ] **Step 1: Write the failing verifier**

Assertions, all of which must fail now and pass at Task 7:
1. Five participant handouts and four answer keys exist.
2. Every handout contains a `## If you finish early` section (the senior variant).
3. Every handout's answer key contains both `### Debrief — small room` and `### Debrief — large room`.
4. No participant handout contains the word `ANSWER` (a paste error would hand out the key).
5. Every `file.cs:NN` citation in an answer key resolves to a file that exists in the sibling repositories, and that file has at least NN lines.

Assertion 5 is the one that matters. Answer keys rot silently when the repositories change, and a key that cites a line that no longer exists is worse than no key.

- [ ] **Step 2: Run it, confirm every assertion fails**

- [ ] **Step 3: Commit**

---

## Task 2: Lab 1 — rank, find, rewrite

**Files:**
- Create: `handouts/lab-1-rank-find-rewrite.md`, `handouts/lab-1-ANSWERS.md`

The three specs are for the same feature: **key rotation with an overlap window**, from the running example.

- [ ] **Step 1: Write spec A — the worst**

Contains at least four defects, each of a *different class*, so ranking is about kind and not quantity: an untestable criterion, a hidden domain assumption, a constraint with no number, and a goal that is really a solution.

- [ ] **Step 2: Write spec B — plausible but wrong at one altitude**

Well-formed, testable, and written at task altitude — it specifies the schema and the call site. This is the one that produces the most useful argument, because half the room will rank it first.

- [ ] **Step 3: Write spec C — the best, and still imperfect**

Correct altitude, testable criteria, explicit non-goals, and one genuine open question left marked rather than resolved. It must not be perfect; a flawless option teaches participants that specs get finished.

- [ ] **Step 4: Write the answer key**

Ranking C > B > A, with the argument for why B outranks A despite being *more* precise — precision at the wrong altitude is not quality. Three ambiguities in A, and one rewritten acceptance criterion.

**Senior variant answer:** the ambiguity that survives rewriting is *"do enterprise customers get a longer overlap?"* — it is a decision, not a wording defect, and it belongs to whoever owns pricing.

- [ ] **Step 5: Solvability check**

Give the handout to someone who has not seen the deck. They must be able to complete all three tasks from the paper alone. If they ask a question the handout should have answered, fix the handout.

---

## Task 3: Lab 2 — five questions

**Files:**
- Create: `handouts/lab-2-five-questions.md`

The request: *"We need to let customers see who used which API key."*

- [ ] **Step 1: Write the handout**

The request, the instruction to write five questions whose *answers would change what you build*, and space to write. Explicitly: not clarifications, not "what do you mean" — questions that change the build.

- [ ] **Step 2: Write the senior variant into the same file**

Which of your five could an agent answer from the codebase, and which need a human? What makes the difference?

- [ ] **Step 3: Write both debrief forms**

Small room: round the room, one question each, no repeats — distinct questions run out around person nine, and that exhaustion is itself the lesson. Large room: take four from volunteers, then read out the two that matter most, which are reliably *what must not change* and *who is allowed to see this*.

- [ ] **Step 4: No answer key**

Deliberately. There is no correct set of five, and shipping a key would turn a divergent exercise into a guessing game. Note this in the handout so an instructor does not go looking for the missing file.

---

## Task 4: Lab 3 — the plan with two planted defects

**Files:**
- Create: `handouts/lab-3-planted-defects.md`, `handouts/lab-3-ANSWERS.md`

- [ ] **Step 1: Write an eight-step plan that looks right**

For a real change in the running example: adding revocation propagation. Seven steps must be genuinely well-formed — action / verify / done, self-contained, declared interfaces. The exercise fails if the defects are the only thing on the page worth reading.

- [ ] **Step 2: Plant defect one — an unverifiable step**

Its `verify` is `dotnet build`, which passes whether or not the step's actual work was done. The tell is that the verify command does not mention anything the action produced.

- [ ] **Step 3: Plant defect two — a step that assumes a human**

`verify: confirm the cache looks right in the dashboard`. Reads as diligence. Cannot be executed by anything without eyes.

- [ ] **Step 4: Write the answer key, in terms of the executor's four properties**

The senior variant asks *which property makes it a defect*, so the key must answer in those terms: defect one violates "cannot tell success from plausible-looking failure"; defect two violates "may be a different executor, and it confabulates rather than stalls."

---

## Task 5: Lab 4 — the PR

**Files:**
- Create: `handouts/lab-4-the-pr.md`, `handouts/lab-4-ANSWERS.md`, `handouts/lab-4-ci-reference.md`

- [ ] **Step 1: Write the diff onto paper**

The rate-limit change from fixed to sliding window, printed as a unified diff with line numbers, plus the unchanged test file so participants can see that the tests genuinely still pass.

- [ ] **Step 2: Write the two-sided answer key**

**Side one — the spec gap:** burst behaviour at the window edge changed materially and no spec says which is correct. The definition of done was not met.

**Side two — the implementation defect:** an unbounded per-customer counter with no eviction. No spec would ever mention it, because it is implementation judgment (module 1 beat 6). Fixing the spec and regenerating would not remove it.

Second side stated explicitly as the point of the lab: **a participant who finds only the first has learned exactly the half that ships bugs.**

- [ ] **Step 3: Write the CI reference sheet**

The material cut from module 4, now permanently housed here (§11 of the spec): the three check types, what each catches, what each costs in false positives, and the note that every one of them can be gamed by adding a reference nobody read.

- [ ] **Step 4: Solvability check against the deck**

Module 4's demo says "there is also something else in that diff". Confirm the something else is actually visible in the printed diff and not only in the full repository.

---

## Task 6: Lab 5 — characterize, then delta-spec

**Files:**
- Create: `handouts/lab-5-characterize.md`, `handouts/lab-5-ANSWERS.md`

- [ ] **Step 1: Print the function**

`PeriodCalculator.GetLinesForPeriod` from `sdd-training-legacy`, verbatim, with its real line numbers. Plus the three hollow tests, so participants see what "already tested" looks like here.

- [ ] **Step 2: State the change**

*Bill each line in exactly one period.*

- [ ] **Step 3: Write the answer key**

The characterization test list — boundary instant, one second either side, empty range, inverted range, a line outside both periods. Then the delta-spec: half-open interval, `[start, end)`, stated as a constraint with an acceptance criterion that can fail.

- [ ] **Step 4: Answer the senior variant honestly**

The bug question has no clean answer and the key must say so. The defensible move: pin the bug, write the delta-spec for the correct behaviour, make the change a **decision with a date and an owner**, and state what happens to historical invoices. The answer participants give first — "just fix it" — silently rewrites years of billing.

---

## Task 7: Facilitator notes

**Files:**
- Create: `facilitator/00-running-order.md`, `demo-scripts.md`, `objections.md`, `room-setup.md`

- [ ] **Step 1: Running order**

The schedule, the cut order as a table with its conditions, and the three never-cut rules: module 6, module 0 beat 4, and no module's core idea rushed to protect the end time.

- [ ] **Step 2: Demo scripts, verbatim**

Per demo: exact commands, exact branch, what to say while something runs, and the fallback cue. From `DEMO-DRYRUN.md`: open `Details` directly because the list page renders zeros; port 5080 not what `launchSettings` advertises; demo from the `training` branch only.

- [ ] **Step 3: Objections**

The MDA exchange with the acceptance-set answer and its concession, written out as a script rather than as bullet points — it is the only place in the day where an unprepared answer costs the room.

Plus four more: *"this is waterfall"*, *"our team will never write specs"*, *"the agent can just read the code"*, and *"who has time for this"*.

- [ ] **Step 4: Room setup**

What is open before 08:45, in what order, on which branch. The laptops-are-read-only rule and the sentence to say at 08:45. The 90-second deletion-test exercise and its two cautions: give a repo to anyone without one, and never collect answers publicly.

- [ ] **Step 5: Run the full verifier**

All assertions green, including that every `file:line` citation resolves.

---

## Self-Review

**Spec coverage.** §8 deliverable 5 is Tasks 2–6. Deliverable 6 is Task 7. Deliverable 7 (recorded demo fallbacks) is **not** in this plan — it requires recording sessions against finished repositories and is a separate activity, noted here so its absence is deliberate rather than forgotten. §2.4's no-laptop rule is a Global Constraint and checked by the solvability steps. §10.1's unresolved group size is handled by requiring two debrief forms everywhere.

**What makes this plan different from 1 and 3.** There is no build and no test suite, so the verifier checks *structure and citation integrity* rather than behaviour. Assertion 5 — every `file:line` in an answer key resolves against the real repositories — is the one that earns its keep: answer keys rot silently, and a key citing a line that no longer exists is worse than no key at all.

**Placeholder scan.** Every handout's *content* is specified by required property and by the defect it must contain, not by full text, because these are prose artifacts whose wording is the author's. Every planted defect and every answer-key claim is specified exactly, because those are what make the labs work.
