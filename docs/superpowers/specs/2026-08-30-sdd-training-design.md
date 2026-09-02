---
title: Spec-Driven Development Training — Design
date: 2026-08-30
status: draft
audience: software developers, junior through senior
duration: 1 full day (420 min content)
---

# Spec-Driven Development Training — Design

## 1. Context and Goals

A one-day training that teaches Spec-Driven Development (SDD) to a mixed
junior-to-senior developer audience.

This training is the sequel to the existing `agentic-prep` deck ("The Twelve
Leverage Points of Agentic Coding"). That deck establishes *where* to intervene
in an agentic system. This training teaches *how* to operate the three highest
leverage points — Plans (#3), Templates (#2), ADWs (#1) — plus Documentation
(#6) and Tests (#5).

### Constraints

| Constraint | Value |
|---|---|
| Duration | 1 full day. 420 min is a planning target, not a ceiling — see §2.0 |
| **Priority** | **Depth of SDD fundamentals over schedule adherence.** A module that needs more time to land its core idea takes it. |
| Delivery | ~80% presentation and live demo, ~20% lab |
| Audience | Software developers, junior → senior, mixed in one room |
| Method | Tool-agnostic principles, instantiated by two concrete toolchains |
| Language | All artifacts in English; delivery spoken in Turkish |
| Output | Slidev deck + lab handouts + two demo repos |

### Success criteria

The training succeeds if, one week later, a participant has written at least one
spec that another person or agent executed without asking clarifying questions.
It fails if participants leave believing SDD means "write more documents."

## 2. Design Principles

### 2.0 Foundations before coverage

The clock is a planning instrument, not a design constraint. This training is judged on
whether developers leave *understanding why SDD works* — the reasoning, not the ritual.
It is not judged on whether it finished at 17:05.

Consequences that bind every decision below:

- **A module that needs 15 more minutes to make its core idea land takes them.** The
  timings in §5 are estimates to plan against and to detect over-stuffing. They are not
  commitments to defend during delivery.
- **When depth and coverage conflict, cut the topic, not the explanation.** A half-taught
  concept is worse than an untaught one: it produces confident misapplication, which is
  harder to correct than ignorance.
- **§5's cut order protects depth, not the end time.** It names what can be dropped
  whole. It never licenses rushing something that stays.
- **The real overrun risk is therefore not "the day runs long."** It is "a module got
  rushed and its idea did not land." §9 is scored against that failure, not the clock.

Practically: if the room is genuinely engaged in module 2's elicitation demo, the correct
move is to let it run and drop Lab 4's senior variant later — not to cut the demo short
to protect a schedule nobody in the room can see.

### 2.1 The spine: lifecycle backbone, failure-driven openers

> **Exception, recorded 2026-09-01.** Module 2 opens verbally rather than with a
> damage slide. Its failure (two teams encoding different answers to "what is a
> user") is obvious enough to state in two sentences, and a slide for it added
> nothing the presenter could not say. The opener still happens; it just has no
> screen. The test to apply elsewhere: **if the damage lands in two spoken
> sentences, it does not need a slide.**

Modules follow the SDD artifact chain chronologically:
`intent → spec → plan → tasks → execution → verification → evolution`.

Each module **opens with the concrete damage it prevents** — a failure the
senior developers in the room have personally experienced. The lifecycle gives
juniors a procedure; the failure openers give seniors a reason to stay engaged.

### 2.2 The two-altitude model is a lens, not a module pair

The same loop runs at two altitudes with different artifacts and owners:

| Altitude | Toolchain | Artifacts | Depth dial | Typical owner |
|---|---|---|---|---|
| **Project** | BMAD-METHOD | Product Brief → PRD → Architecture → Epics/Stories | Quick Flow ↔ Full Planning | Tech lead, senior |
| **Feature** | Superpowers (Claude Code) | brainstorm → design → plan → execution → verification | spike ↔ bounded ↔ architectural | Every developer |

**The depth dial column is load-bearing.** Altitude is a property of the *work*,
not of the toolchain. Each tool has its own sizing control, and a participant who
leaves believing "BMAD means heavy" has learned a procurement rule rather than a
sizing skill.

**This comparison appears inside modules 2, 3 and 4 as a side-by-side demo — it
does not get its own modules.** Making the toolchains into modules would run the
lifecycle twice and displace the lifecycle spine. Running them side by side at
each stage answers *"at what depth, when?"* while keeping the spine intact:

| Lifecycle stage | Module | Project altitude (BMAD) | Feature altitude (Superpowers) |
|---|---|---|---|
| Intent → Spec | 2 | Product Brief → PRD | `brainstorming` |
| Spec → Plan → Tasks | 3 | Architecture → Epics/Stories | `writing-plans` |
| Execution + verification | 4 | Adversarial quality gates | `executing-plans`, `verification-before-completion` |

The teaching point: **the loop is fractal — but the cost of being wrong is not.**
The sequence repeats at both altitudes. The reversibility does not. A wrong
feature plan is re-run in an hour. A wrong PRD discovered in week six is amended
under change control, because epics, stories and other teams' commitments have
already been derived from it.

That asymmetry, not the repetition, is what makes altitude a decision worth
teaching — and it is the missing justification for two of module 6's four
flowchart inputs, *expected lifespan* and *compliance requirements*, which
currently reach the photographed slide with nothing behind them.

**The elevator between altitudes.** The project-altitude artifact is the
constraint envelope the feature-altitude spec inherits. A feature design that
contradicts the architecture above it is a defect in one of the two, and it must
be named before either is executed. Without this sentence the two altitudes are
two unrelated diagrams.

Brownfield (module 5) is a third case that neither toolchain addresses directly.

### 2.3 Principle before tool, always

Every tool demo is preceded by the vendor-neutral principle it implements. A
participant with no access to BMAD or Claude Code must still leave with
something they can apply. If a module cannot state its principle without naming
a tool, the module is wrong.

### 2.4 Labs are spec critique, not coding

Given the ~20% lab budget and mixed seniority, labs are **reading and rewriting
specs**, never writing code. Rationale:

- Zero environment setup — no failed installs eating lab time
- Works identically for juniors and seniors at different depths
- Critiquing a bad spec is the fastest way to internalize what a good one is
- The instructor's live demos carry the code, where failure is recoverable

Every lab ships with a **senior variant** — a harder second question for
participants who finish early or need more depth.

**Laptops are present and read-only.** Participants bring machines, but nothing in
the day asks them to write code or write a spec. An open laptop with nothing to do
on it becomes email, so the design must say what it is *for*:

- **Follow-along during demos.** The running-example repo is open on their screen
  while the instructor narrates. Reading a PRD on your own display beats reading it
  off a projector, and it is the whole reason the BMAD artifacts are staged as
  walkable git history rather than screenshots.
- **Lab handouts delivered digitally**, so a lab can start in seconds.
- Following the deck on their own screen during demos.

The rule to state out loud at 08:45: *you will read on these all day and type on
them almost never.* Saying it prevents the room inventing its own use.

### 2.5 One running example, one legacy repo

Modules 0–4 and 6 follow a single product end to end: an **API key management
service** (issue, rotate, revoke, rate-limit, audit). Chosen because every
developer understands the domain, it is small enough to actually build, and its
audit requirements make BMAD's traceability argument concrete rather than
theoretical.

Module 5 switches to a separate, deliberately bad legacy repo (§7). Brownfield
cannot be demonstrated on a greenfield example.

## 3. Learning Outcomes by Seniority

| | Junior | Mid | Senior |
|---|---|---|---|
| **Elicitation** | Asks before assuming | Surfaces hidden assumptions systematically | Knows which ambiguity needs a human decision, not a better question |
| **Spec** | Tells a spec from a wish; writes criteria that can fail | Sizes precision — recognizes over-specification | Spots the ambiguity no rewrite resolves |
| **Plan** | Executes someone else's plan | Writes a plan that runs with zero human input | Designs plans that survive resumption and partial failure |
| **Altitude** | Knows which altitude they are working at | Chooses the altitude for a task | Decides which projects need project altitude at all |
| **Brownfield** | Writes characterization tests before changing code | Writes a delta-spec | Plans an incremental spec ratchet for a legacy system |
| **Judgment** | Knows SDD is not always right | Names three cases where SDD is overhead | Defends *not* doing SDD to a manager who wants it everywhere |

## 4. Module Breakdown

### Module 0 — The Bridge: Where We Are and Why SDD (40 min)

**Opening damage:** the agent built the wrong thing, flawlessly.

The "Bridge Cut" of the `agentic-prep` deck — approximately 9 slides drawn from
the existing 18:

- The leverage hierarchy table (the map itself)
- #12 Context — specs are the highest-signal context you can supply
- #6 Documentation — agent-navigable docs
- #5 Tests — help or theatre
- #3 Plans, #2 Templates, #1 ADWs — the three points this day operates
- Connections slide

The remaining 9 slides (Model, Prompt, Tools, Standard Out, Types,
Architecture) ship as a **pre-read package**, not delivered content. They are
about agentic engineering broadly; spending 20 minutes on model selection
dilutes an SDD training.

Content beats:
1. Sean Grove's framing: discarding the prompt that produced working code is
   checking in the binary and deleting the source. **Qualify it in the same
   breath** — the compilation metaphor holds only while code is wholly generated
   and never hand-edited, and every real system leaves that state at its first
   hotfix. What survives the qualification is "do not discard the source," not
   "the binary is disposable." Teaching the metaphor unqualified sets up a belief
   that fails in week two and takes the rest of the day's credibility with it.
2. SDD in one sentence, then three sentences on what it is **not**: not
   waterfall, not more documents, not a ceremony gate.
3. The day's map: the lifecycle spine, and the two altitudes as a recurring lens.
4. **The mindset switch — regenerative architecture and the deletion test
   (~10 min).** The last thing the room hears before the spec work starts, and
   the beat the rest of the day leans on. Detailed below.

#### Beat 4 — The mindset switch (~10 min)

The purpose of this beat is one change of question. Not *is this code correct?*
but **where does the truth about this system live?** Everything else in the day is
downstream of that answer.

**Budget the beat deliberately: the analogy is framing, the test is the payload.**
Roughly two minutes on point 1, the rest on the test, its verdict procedure, and
what a failure does and does not mean. An instructor who spends six minutes on
phoenix servers has spent the beat on its weaker half.

1. **Rebuilding from a definition — and why now is different.** Infrastructure
   settled this: a *snowflake* server is patched in place until nobody dares touch
   it; a *phoenix* is destroyed and rebuilt from its definition. Immutable
   infrastructure, containers and IaC won.

   **State the history honestly — code has had this argument before, and lost it
   twice.** CASE tools and 4GLs in the late eighties. MDA and round-trip UML
   generation from roughly 2001 to 2008, with regeneration that was both cheap
   *and* deterministic — and it still lost, because the platform-independent model
   had to grow until it was a programming language with worse tooling, and because
   generated code got hand-edited the moment it met production. It also quietly
   **won**, everywhere the definition covers a narrow slice completely and nobody
   edits the output: protobuf, OpenAPI clients, GraphQL types, ORM migrations.

   Someone in the room has lived at least one of these. Claiming the argument never
   happened costs the beat the only thing it has, which is credibility about why
   today is different. The honest and stronger claim: **what changed is not the
   price of regeneration but the medium of the definition.** Natural language
   became something a machine can execute, which widens the reachable slice from
   wire formats to behaviour — and the price of that width is determinism. That
   framing also converts point 6 from an apology into an accounting entry.

   **Say it as a description, not as a named methodology.** "Regenerative
   architecture" is an emerging description of a direction, not an established
   discipline with a literature behind it; presenting it as a named thing invites a
   search that turns up little and costs credibility. The established anchor is
   Fowler's SnowflakeServer / PhoenixServer (2012). Cite that; describe the rest.

   **The tie to SDD, made explicit rather than left implied.** Rebuilding from a
   definition requires that the definition exist and be good enough to rebuild
   from. In infrastructure that definition is the Dockerfile, the Terraform module,
   the manifest. **In code it is the spec.** That is the entire connection, and
   everything the rest of the day teaches — spec anatomy, elicitation, plans,
   verification, brownfield archaeology — is the work of building and maintaining
   that definition.

2. **The deletion test — posed as an enumeration, not as a feeling.** The naive
   form ("could I regenerate this from its spec?") is answered by imagining, and
   imagination is contaminated by the very knowledge under audit: the author cannot
   un-know the rotation-window subtlety while judging whether the spec conveys it,
   and will answer yes. The output would be a function of the respondent's
   familiarity, not the spec's completeness.

   Invert it: **name one thing you would have to know to rebuild this that the spec
   does not say.** If you can name one, it fails — and the thing you named is the
   backlog entry. That version is answerable, checkable by the person next to you,
   and produces an artifact instead of a mood.

   Say plainly that it is also **literally runnable**: delete the module, hand a
   fresh agent the spec, diff the behaviour. Module 0 runs no demo, but the room
   knowing this is an experiment rather than a rhetorical device is most of what
   separates it from a slogan.

   **Run it in the room, on their own code (~90 seconds).** Laptops are open (§2.4).
   Ask everyone to pull up a repository they actually work on, pick one module, and
   silently name one thing they would need to rebuild it that is written down
   nowhere. Then: *hands up if you could not name one.* This is reading, not
   writing — it stays inside the no-authoring rule — and it is the only moment in
   module 0 where the room does anything. Almost no hands going up **is** the
   lesson, and it lands on their own code rather than on a slide.

   Two cautions for the facilitator. Some participants will have nothing open or
   nothing shareable; give them the running example as a fallback rather than
   letting them sit out. And do not collect answers publicly — the exercise works
   because it is uncomfortable, and naming a colleague's undocumented module in
   front of the room converts insight into defensiveness. Ask only for the show of
   hands.

   **Pose it in two sizes.** *Can this module be regenerated from its spec plus the
   specs it points at?* and *can this boundary be regenerated from anything written
   down at all?* The second matters more: the knowledge least likely to be written
   down lives **between** modules, which is why module 1 beat 3 exists and why
   module 4's planted false premise — revocation propagates synchronously — is not
   a fact about any single module. A per-module-only test returns clean on exactly
   the material that is homeless.

3. **What a failure means.** If you can name the missing fact, the code holds
   knowledge that exists nowhere else. Every piece of it is a single point of
   failure living in one person's head, or in nobody's. The spec is not the source:
   **you have been maintaining the binary and calling it the source.**

4. **It is a gradient, not a gate — and not every failure is debt.** Almost nothing
   in a real codebase passes today; a beat implying otherwise would be dishonest.
   The useful questions are *what fraction* and *which knowledge is missing*, and
   the gaps are a spec backlog ranked for free by the exercise.

   But discriminate, or the backlog fills with the wrong thing: **a failure is spec
   debt only when the missing knowledge is intent or constraint. When the missing
   knowledge is implementation judgment, the spec is correct and the test is
   supposed to fail there.** Without this sentence participants go home and seed
   their backlog with precision-budget residue — which is over-specification, an
   anti-pattern module 6 names. It is also the earliest possible statement of
   module 4 beat 8's diagnostic.

5. **The switch: truth splits, it does not relocate.** Say it this way and not as
   an either/or. **The truth about *intent* moved to the spec. The truth about
   *this artifact* never left the code, and never will.** Spec review is therefore a
   review that was *missing*, not a review that replaces one — and it is missing in
   the place where defects are cheapest to catch, which is where the least
   attention has historically been spent. That asymmetry is the mindset switch.

   The either/or phrasing is what would create §9's "reviewers stop reading diffs"
   risk, and it would create it here, at 09:20, seven hours before module 4 beat 8
   spends its most expensive paragraphs undoing it. Phrased as a split, beat 8
   inherits module 0's vocabulary instead of correcting it.

6. **The bound, stated here rather than at 16:35.** Regeneration is
   nondeterministic and yields a *different* defect set, not an empty one. The
   deletion test measures the completeness of the **spec**; it says nothing about
   the correctness of any particular generated artifact. Module 4 beat 8 makes the
   split precise. One sentence now buys seven hours of correct belief.

**Facilitator: the objection that will actually come, and the answer that wins.**

> *"If the spec is complete enough that I can delete the module and get a correct
> one back, then the spec contains everything the code contained. You haven't moved
> the truth — you've rewritten the program in English, which is longer, ambiguous,
> and has no compiler. We tried this. It was called MDA. The model always grew
> until it was the code."*

This is the strongest form of the objection and it survives every appeal to better
tooling, because any definition sufficient to determine correct behaviour must, by
information content, encode that behaviour. **The answer requires conceding
territory, and the concession is what makes it land.**

The objection smuggles in *correct* = *behaviourally identical*. Point 2 already
disclaims that, and the instructor must make the disclaimer the pivot rather than a
footnote. A spec does not determine the implementation; it determines the
**acceptance set** — the set of implementations that would be correct. Wherever
that set has more than one member, the spec is strictly smaller than the code, and
the difference is the precision budget. **MDA failed because it tried to make the
acceptance set a singleton**, which does force the model to grow into the program.
SDD deliberately keeps it plural, and pays for that with nondeterminism (point 6)
and with a residue only code review finds (module 4 beat 8).

Then concede the rest out loud: where the acceptance set genuinely *is* a
singleton — a dense algorithmic kernel, a protocol implementation, a hot path where
only one shape performs — the objector is right, the spec converges on the code,
and SDD buys nothing. Those are module 6's "when NOT to do SDD" cases, and naming
them here at 09:20 rather than at 16:40 is what makes the concession read as
command of the material rather than retreat. An instructor who tries to win the
whole field loses that senior for the rest of the day.

**The through-line.** This is the day's most reused idea. Make each reuse explicit
rather than letting it read as three unrelated tests:

| Where | The question | What it decides |
|---|---|---|
| Module 0 beat 4 | Name one thing you would need that the spec does not say. | Is the spec the source, or is the code? |
| Module 4 beat 8 | Would fixing the spec and regenerating remove this defect? | Spec defect, or implementation defect |
| Module 5 beat 3 | Where does the test fail hardest here? | Which knowledge spec archaeology must recover first |

**Demo:** none. **Lab:** none. **Slides:** ~14.

### Module 1 — Spec Anatomy (70 min)

**Opening damage:** a spec that cannot fail. "Make the auth module better."

Content beats:
1. **What a spec is**: intent + constraints + acceptance criteria + non-goals.
2. **The testability test** — the module's core idea. If you cannot derive a
   failing test or a rejection criterion from a line, that line is not a spec.
3. **Specs form a graph, not a document.** The anatomy template below gains a
   `Relates to / Inherits / Supersedes` header, and with it the move that keeps a
   spec small: *point at the spec that already says it, rather than saying less.*
   This turns the precision budget from a warning into a technique. It also gives
   cross-cutting non-functional requirements and interface contracts — rate
   limits, rotation windows, audit retention, API shape — a home, which the flat
   per-feature Constraints list does not provide. Close it with the resolution
   rule for contradiction: more specific beats more general; newer beats older
   with an explicit supersedes line; when neither applies it escalates to the
   owner rather than being settled by whoever read the two specs last.
   *(The vague-to-concrete ladder previously previewed here now lives entirely in
   the demo, which already runs it. Module 1 was teaching "make it testable" four
   times; this removes a duplicate pass, not an explanation.)*
4. **Anatomy template**: Context / Goal / Non-goals / Constraints / Acceptance
   criteria / Open questions. The template participants leave with.
5. **Altitude confusion** — spec vs PRD vs plan vs task. The most common
   beginner error is writing a task where a spec belongs. Introduces the
   two-altitude lens that modules 2–4 then use.
6. **The precision budget** — over-specification is a failure mode, not
   diligence. Specify intent and constraints; leave implementation judgment to
   the implementer. A spec harder to maintain than the code it produces has
   failed.

**Demo (~10 min):** the vague-to-concrete ladder, live. Take one requirement from
the running example up four rungs, from "make it better" to an executable
acceptance criterion. This is the ladder's only pass before Lab 1.

> **Lab durations, corrected 2026-09-01.** The four lab headings in this document
> still carried the pre-rebalance numbers (Lab 3 fifteen, Lab 4 fifteen, Lab 5 ten),
> which are the ones the solvability run rejected for being inversely correlated
> with the actual work. The deck and the running order already carried the corrected
> values. All three now read 20 / 10 / 20 / 20, totalling 70 minutes.

**Lab 1 (20 min):** three specs for the same feature, varying quality. Rank
them. Find three ambiguities in the worst. Rewrite one acceptance criterion to
be testable.
*Senior variant:* find the ambiguity that survives every rewrite — the one that
must be resolved by a human decision, not better wording. Name the decision.

**Slides:** ~15.

### Module 2 — Intent → Spec: Elicitation (75 min)

**Opening damage:** assumption drift. Four weeks in, nobody agrees what "user"
means, and two services encode different answers.

The module that turns a request into a spec. This is the largest skill gap for
juniors and the stage where the most expensive errors are made, because
everything downstream inherits them.

Content beats:
1. **Intent is incomplete at the source.** The requester's head does not contain
   a finished spec either. Elicitation is construction, not extraction — this
   reframe does most of the work in the module.
2. **The question ladder** — the small set of questions that surface the most
   per minute: What would make you reject this? What must it *not* do? What
   happens on the unhappy path? Who else is affected? What is already true?
3. **Non-goals first.** Asking what is out of scope surfaces disagreement faster
   than asking what is in scope, because people agree on goals and differ on
   boundaries.
4. **Three classes of hidden assumption** — domain ("what is a user"),
   constraint ("how fast is fast enough"), success criteria ("how do we know it
   worked"). Each has a different detection technique.
5. **Ask vs assume is a spec property, not an agent property.** An agent that
   asks too much is reading an under-specified spec; an agent that assumes too
   much is reading one that failed to mark its own uncertainty. Fix the spec.
6. **Open questions as a first-class spec section.** The discipline of writing
   down what you do not know, rather than resolving it silently with a guess.
7. **Two-altitude lens (first appearance):** BMAD's Product Brief → PRD is
   elicitation at project scale, with a quality gate between phases. Superpowers'
   `brainstorming` is the same move at feature scale, in a conversation. Same
   stage, different depth, different owner, different cost.

**Demo (~40 min) — event ticket sales, revised 2026-09-01.** The module now ends
with the two frameworks named, compared side by side, and then run in sequence on
a domain the room already understands. Event ticket sales was chosen because it
carries all three classes of hidden assumption without any domain teaching: *what
does "ticket bought" mean* (domain), *how long is a seat held and what happens one
second past that* (constraint), *never exceed capacity or never start with an empty
seat* (success criteria). It also contains decisions that are visibly not
engineering decisions: refunds, cancellation versus a change of mind,
transferability.

A **running-order slide** precedes the demo and costs about 2 minutes of it,
replacing the verbal running order previously narrated over the demo intro. It carries eleven numbered steps in two lanes with a handoff bar between them. BMAD's lane runs once, pre-baked and
walked by diff, about 8 minutes: `product-brief`, `prd`, `architecture`,
`epics-and-stories`. The handoff is a single story, *a user selects a seat and it
is held until payment*. Superpowers' lane runs per story, about 30 minutes, and
**all seven steps run live**: `brainstorming`, `using-git-worktrees`,
`writing-plans`, `subagent-driven-development`, `test-driven-development`,
`requesting-code-review`, `finishing-a-development-branch`.

**Why it is 40 minutes and not 20, decided 2026-09-01.** Module 3's own demo was
withdrawn as a duplicate of this one, and its minutes were moved here rather than
returned to the day. The consequence is that the four steps this demo used to
narrate now execute, so the room watches a plan produced *and* run once, end to
end, instead of watching plan production twice. The plan step 7 produces stays open
on screen: module 3 teaches its anatomy, its verify lines, its declared interfaces
and its resumability from that file rather than from slide examples.

**Risk.** Forty minutes of live tooling ending at the lunch break has no slack. The
compressible tail is steps 10 and 11, a sentence each; steps 5 to 7 are not
compressible, they are the demo.

The map exists for one reason: without it, twenty minutes of tooling reads as a
product tour. With it, steps 5 and 7 are legible as *a spec and a plan, written
again, for one story* — which is where the fractal claim stops being an assertion
and becomes something the room watched happen.

**The depth-dial coda is withdrawn.** The sizing lesson now lands on the *How I
actually use them* slide, as an observation about the presenter's own practice
rather than a second demo segment: the same loop runs at project altitude once and
at feature altitude per story, so altitude is a property of the work and not of the
toolchain. This is cheaper than a second demo and lands earlier.

**Lab 2 is withdrawn.** The five-questions exercise duplicated elicitation work the
module already does on screen, and the module's minutes are better spent on the
demo. The day's lab budget is 70 minutes across four labs.

**Slides:** 11.

### Module 3 — Spec → Plan → Tasks (45 min)

**Opening damage:** the half-finished plan. The agent stopped at step 7 of 12
and nobody can tell what state the repository is in.

Content beats:
1. **Principle first:** a plan is source code. It must be complete enough to run
   with zero human interaction. Leverage point #3 from module 0, now
   operationalized. State the principle and its test before naming any tool.
2. **Anatomy of an executable plan** — action / verify / done. Every step
   carries its own verification criterion. Plans are read verbatim by the
   executor; they are not transformed into prompts, they *are* the prompts.
3. **Decomposition** — how a spec becomes a plan and a plan becomes tasks.
   Where the boundaries fall and why.
4. **Plan sizing** — too big to finish, too small to justify the ceremony. How
   to tell before you start rather than after.
5. **Resumability, and amendability.** What makes a plan survive being picked up
   at step 5 in a fresh session with no memory of steps 1–4 — the property that
   separates a plan from a to-do list. Then the harder second case: a plan must
   also survive *amendment*, when execution proves the spec above it wrong and
   steps already completed have to be marked suspect. Module 4 beat 6 does the
   amendment; this beat is where the plan is built to accept one.

**Beats 6 and 7 withdrawn, 2026-09-01.**

*Beat 6, tests as the executable half,* was a full slide. Its mechanics are now
shown live in module 2's demo, where `test-driven-development` runs red then green
on the seat-hold story. The one part a demo cannot show is the join back to module
1: an acceptance criterion that cannot become a verify step failed the testability
test. That sentence moved onto the anatomy slide, which is where the verify line is
already on screen. Module 0's leverage-point slide, which promises this join, was
reworded from *"module 3's test list"* to *"module 3's verify steps"* to match.

*Beat 7, the two-altitude lens,* was three slides: BMAD decomposition, Superpowers
decomposition, and a comparison table. All three restated module 2's slides 42, 43
and 45, which now name both frameworks, place them side by side, and show them
running in sequence. One of the three even opened with *"Same shape as the slide
before"* while the slide before it in the old ordering was already the second
telling. With module 2's restructure the claim was being made five times and
watched once. Module 3 now names no toolchain at all, and the altitude decision
lands where it was always meant to, on module 6's flowchart.

**The opening damage slide is also withdrawn.** It carried an assertion about
half-finished plans with no artifact on screen, immediately after the room watched
a plan get written and run. The scenario is now a two-sentence verbal opening and
the module starts on its principle.

**Demo withdrawn, 2026-09-01.** It was *the spec becomes a plan, both ways: BMAD
epics pre-baked, `writing-plans` live*, which is module 2's demo a second time. It
was also squeezed from both sides: module 2 now produces the plan and module 4 runs
it. Its twenty minutes went to module 2.

**What replaces it: an existing plan stays on screen.** The module is taught off
`sdd-training-example/specs/plans/S1.2-plan.md`, eight steps for *revoke during
rotation*. Anatomy reads step 1 whole. Per-step verification points at steps 2 and
3's `done` lines, which carry *"fails on an assertion, not on a build error"* and
*"no other test changes status"*, the contamination guard in one phrase. Declared
interfaces points at the file header's three full signatures. Sizing asks whether
steps 2 and 3 are one task. Resumability asks what is knowable at step 5. Nothing on
these slides is an invented example any more, which is why the code blocks came off
them.

**Not the plan the morning demo produces, decided 2026-09-01.** That was the first
arrangement and it had two defects. It made the module's entire material depend on a
live demo succeeding, so nothing could be rehearsed; and it wasted the strongest
chain in the day. `S1.2-plan.md` is **the plan module 4 runs and breaks**: its steps
4 and 5 assert that revocation propagates synchronously, and `20-architecture.md`
decision 2 says asynchronously with a 30 second bound and warns in as many words
that *any test or plan step that assumes synchronous propagation is wrong against
this architecture.* So the step the room reads closely in module 3 is the step that
detonates in module 4.

Module 3's amendability slide therefore works this as a **hypothetical**: *suppose
the architecture said propagation is asynchronous, what happens to steps 4 and 5?*
The room sorts eight steps into still-valid, suspect and must-re-derive. Module 4
then shows it was not a hypothetical. The instructor notes are explicit that the
answer must not be confirmed early.

The morning plan is still shown at the end of module 2 as that demo's payoff. The
link is verbal: *same shape as the one we wrote this morning, just fuller.*

This costs more minutes per slide than a slide-only walk, so module 3's nine
content slides take about 30 minutes rather than the ~19 the slide count suggests.

**Lab 3 (10 min):** a supplied plan with two planted defects. Find the step
that cannot be verified. Find the step that silently assumes a human is present.
*Senior variant:* rewrite the plan so it survives resumption from step 5 in a
session with no prior context.

**Slides:** 10, down from 15. The module is 45 minutes: about 30 walking the real
plan, 10 for Lab 3, 5 of slack. The 20 minutes released by withdrawing the demo went to module
2, so the day's content total is unchanged at 420 minutes and it still ends 17:20.
Lunch moves from 11:45 to 12:05.

### Module 4 — Execution and Verification (30 min)

> **Two slides withdrawn, 2026-09-02.**
>
> *Demo, the PR that passes.* It showed the rate-limit diff, green tests and the
> untouched spec, then said *"there is also something else in that diff."* That is
> Lab 4's first task, answered on screen before the lab begins, while the lab asks
> for **exactly two** findings. The "exactly two" wording exists because a
> solvability run found that a single open-ended task let people stop at the spec
> gap; handing them the spec gap first defeats the same wording. Lab 4 is now the
> room's first encounter with that PR. **Superseded 2026-09-02:** Lab 4 was withdrawn
> in full and the branch deleted.
>
> This is the slide-spoils-lab form of a defect the solvability run already caught
> between two handouts. That run only read the handouts, so it could not see this
> one.
>
> *Opening damage, "Green tests. Wrong behaviour."* Withdrawn for the same reason as
> module 3's opener: seven lines of assertion with no artifact on screen. It is now a
> two-sentence verbal opening and the module starts on **Execution**.
>
> *What each cannot catch.* Withdrawn 2026-09-02 as surplus. It named the blind spot
> of each mechanism from the principle slide, which is honest but is a slide spent on
> a caveat; the module's own demo makes the same point by showing a check that passed
> while the spec was wrong.
>
> **Cut to 7 slides, 2026-09-02.** Withdrawn on the client's instruction, as both
> abstract and over-detailed: *verification is not testing* (said to be covered
> repeatedly elsewhere), *spec drift*, *correction or drift with better paperwork*,
> *code review gains a spec review*, the wrong-spec demo, the CI options table, and
> **Lab 4 in full**. What remains: execution and its stalls, evidence before
> assertions, where the check sits, testing theatre, the three-way triage, who
> decides, and the split with its diagnostic.
>
> **Three promises had to be repaid elsewhere**, because the deck already pointed at
> the cut slides. Module 0 said *"module 4 gives this a name: spec drift"*; that
> slide now defines drift itself and its note says so. Module 6's anti-pattern table
> had three rows whose answer column named module 4 slides; those rows now state the
> counterpart inline, and the regeneration row points at module 6's own *Where SDD
> buys nothing*. The *gains, not becomes* wording, the most expensive correction the
> two review rounds produced, is now asserted against module 6 instead of module 4.
>
> **Two things were lost and are not recoverable elsewhere.** The wrong-spec demo was
> module 4's only live moment and the payoff for module 3's planted contradiction;
> module 3 now works that contradiction as fact rather than as a hypothetical with a
> deferred reveal. And the spec-defect/implementation-defect distinction is now taught
> but never practised.
>
> **Module 4 is 30 minutes.** The day is 370 minutes of content and ends 16:30. Labs
> are 50 of 370, 13.5%, against a specified ceiling of ~20%; the floor was never
> specified, so this breaches nothing, but it is a long way below where the day
> started.
>
> **Lab 4's material was deleted 2026-09-02**, on the client's instruction to leave no
> unused branches or sheets behind: the three handouts and the `pr/rate-limit-window`
> branch in `sdd-training-example` (was `9e586b6`, recoverable from the reflog for
> about ninety days). The change it carried was a fixed window to sliding window
> rate limiter, whose observable difference was burst behaviour at the window edge.
> Module 6's decision-flowchart worked example still uses that pair as an
> illustration, which needs no branch.
> The slack is deliberate and stays: this is the module where the correction loop and
> *who decides* generate the day's longest discussions, and the running order already
> declares the schedule soft.

> **Merged, 2026-09-01.** *Definition of done, and its order* and *Correction and
> drift produce the same diff* were one argument told twice: spec first with an
> owner deciding is a correction, code first with the spec patched afterwards is
> laundering, and the two produce the same diff. Now a single slide,
> *Correction, or drift with better paperwork*. It keeps the comparison, absorbs
> the definition-of-done rule, and closes on the operational half: *"did the spec
> get updated"* is satisfied by both columns, which is why it is the wrong question
> and the one most teams adopt.
>
> A module 4/5/6 sweep for the same kind of redundancy found nothing else. Module
> 3 was affected because it taught plan mechanics that module 2's demo now runs
> live; modules 4 to 6 teach verification, brownfield archaeology and the decision
> framework, none of which the demo covers. Candidates checked and rejected: the
> two SDD-boundary slides in module 6, module 4's verification trio, the code
> review pair, module 5's characterization cluster, and the tool landscape.

> **Domain continuity, decided 2026-09-01.** With module 2's demo moved to event
> ticket sales, the day runs on three codebases: tickets for modules 2 and 3, the
> API key service for module 4, the legacy billing system for module 5. Module 4
> stays where it is. Its wrong-spec scenario, its planted revocation defect and
> Lab 4's PR are all built into `sdd-training-example` and rebuilding them in the
> ticket domain buys continuity at the price of a second seeded repository.
>
> The switch is therefore **declared on the slide and out loud**, and turned into
> an argument rather than an apology: a method that only works on the example the
> instructor rehearsed is not a method. The demo slide's step 1 no longer says
> *"run module 3's plan"*, which stopped being true when module 3's demo was
> withdrawn.

**Opening damage:** green tests, wrong behavior. And: the spec says X, the code
does Y, both are on main, both were approved.

The longest module, because it holds the two ideas most likely to be skipped in
practice — verification and spec maintenance — and they reinforce each other.

Content beats:
1. **Execution** — running a plan end to end. What the executor actually needs
   and what makes it stall.
2. **Verification is not testing.** Tests check code against expectation;
   verification checks the *claim of completion* against reality. Evidence
   before assertions.
3. **Two-altitude lens:** BMAD's adversarial quality gates between phases vs
   Superpowers' `verification-before-completion` at the end of a feature. One
   prevents cascade failures across documents; the other prevents a false "done".
   Why both exist.
4. **Testing theatre detection** — leverage point #5 made concrete. Tests that
   pass without validating anything; mocks that hide the failure they were
   written to catch.
5. **Spec drift** — the default state of any spec not defended by process. Why
   drift is silent and why it is discovered at the worst possible moment.
6. **The correction loop — the backward edge.** The most common real event in
   spec-driven work: you are 40% into an execution and the spec is impossible,
   self-contradictory, or built on a false premise about the codebase. Every
   other module runs forward; this beat is the only place the day teaches the
   edge that runs back, and that edge *is* what makes SDD not waterfall — module
   0 asserts "not waterfall" in a sentence and nothing else in the design
   demonstrates it. Teach the three-way triage of a mid-execution discovery:
   - **Under-specified** — the spec is silent, not wrong. Goes to Open Questions;
     execution continues around it.
   - **Spec is wrong** — amend the spec *first*, re-derive the affected plan
     steps, mark already-built work suspect, then resume.
   - **Implementer merely disagrees** — the precision budget already settled
     this. The spec does not change.

   Then the authority line, without which the triage is unusable: *the agent
   proposes, the human disposes.* At feature altitude the feature author decides;
   at project altitude the PRD owner does.
7. **The definition-of-done change — and its order.** A change that alters
   behavior without a spec update is an incomplete change. This is a process
   change, not a guideline. But state it order- and authority-sensitively or it
   is worthless: **the spec changes first, and the owner decides.** A spec
   patched at PR time to describe whatever happened to get built is drift with
   better paperwork. Land the discriminator explicitly — *a correction and a
   drift produce the same diff; what separates them is that the spec changed
   first, and who decided.*
8. **Code review *gains* a spec review — it does not lose the code review.** The
   largest cultural shift in the day, and the one most easily taught wrongly.
   The tempting version — "if the spec is right, the code can be regenerated" —
   is false, and it is false in a way that ships bugs. The compiler metaphor
   needs determinism and non-editability; agentic generation has neither, and
   generated code is hand-edited from the first hotfix onward. A *fully correct*
   spec routinely yields an injection-shaped query, an N+1, a swallowed error
   path, a race on the rotation window, a key fragment in a log line. None are
   spec defects and regeneration does not remove them.

   So teach the split. The **spec review** asks *are we building the right
   thing* — is the intent right, complete, non-contradictory; do the acceptance
   criteria cover this change. The **code review** asks *did this artifact do it,
   and what else did it do* — the residue module 1 beat 6 deliberately left
   unspecified. Give the room a one-line diagnostic usable in their next PR:
   **if fixing the spec and regenerating would remove it, it is a spec defect;
   otherwise it is an implementation defect, and only reading code finds those.**
   Name the residue as an explicit review target so it stops being nobody's job.
   Introduce the diagnostic as **module 0's deletion test returning in its second
   form** — the same question, now asked of a defect rather than of a module. The
   room should recognise it, not meet it.

   Note for the facilitator: when someone objects that *somebody still has to
   read the diff*, that is the right answer, not resistance to absorb. The beat
   should arrive at it, not defend against it.

   *(The former CI-options beat — linkage checks, artifact freshness,
   traceability assertions — is cut **on merit, not by deferral**. There is no
   follow-up session (§10 Q4), so this material is dropped rather than postponed:
   it was a survey of speculative options, and the correction loop that took its
   slot is something participants use in their next PR. One reference slide moves
   into the Lab 4 handout, which is now its permanent home rather than a
   placeholder.)*

**Demo (~25 min):** execute module 3's plan live on the running example — with
**one false premise planted in the spec**: the rotation window assumes revocation
propagates synchronously, and it does not. The agent hits it live, stops, the
room watches the triage from beat 6 happen for real — amend the spec, re-derive
the affected steps, mark built work suspect, resume. This costs no extra time; it
changes what the plan runs into, not how long it runs. Then walk a PR that
changes behavior with green tests and an untouched spec.

**Lab 4 (20 min):** a supplied PR. It changes behavior. What is missing, and
what would you block on? **The answer key is two-sided**: the missing spec update
*and* one defect in the diff that the spec is silent about by design. A
participant who finds only the first has learned exactly the half that ships bugs.
*Senior variant:* for each defect, say which side of the beat 8 diagnostic it
falls on — would fixing the spec and regenerating remove it?

**Slides:** ~18.

### Module 5 — Brownfield: Retrofitting SDD (65 min)

**Opening damage:** 200k lines, no docs, three tests that assert nothing, and a
ticket that says "just add the feature." There is no spec here to drift from.

This module exists because it is the question most SDD material refuses to
answer, and because it is the situation nearly every participant returns to on
Monday.

Content beats:
1. **Why greenfield advice fails here** — there is no PRD to write, no
   architecture to design, and the system's actual behavior is unknown even to
   its owners. Modules 2–4 assumed a starting point that does not exist.
2. **The core move: spec the delta, not the system.** The unit of specification
   is the change, not the codebase. This single reframe is the module's payload.
3. **Spec archaeology** — the agent reads the code and drafts a spec of current
   behavior; the human corrects it. The corrections are the value: each one is
   undocumented knowledge made explicit for the first time.
   **Prioritise with module 0's deletion test in its third form:** run it across a
   legacy repo and it fails everywhere, which is useless as a verdict and
   excellent as a ranking. Where it fails *hardest* — the code whose behaviour
   nobody could reconstruct from anything written down — is where archaeology pays
   first. This is the honest answer to "where do I even start", which is the
   question this module exists to answer.
4. **Characterization tests as executable spec** — pin current behavior, bugs
   included, before changing anything. How to get a safety net without
   understanding the whole system first.
5. **`CLAUDE.md` / `AGENTS.md` as the cheapest first artifact** — the highest
   return per hour available in a legacy codebase, and the natural entry point
   for spec coverage.
6. **Seam finding** — where can you draw a boundary you can actually specify?
   Specs need edges; legacy code hides them.
7. **The incremental ratchet** — every module you touch leaves a spec behind.
   Coverage grows along the paths that get traffic, not by project plan.
8. **Anti-pattern: the big-bang legacy spec project.** Six months to specify the
   whole system, nobody reads it, stale on delivery. Name it explicitly so
   participants can recognize and refuse it.

**Demo (~20 min):** on the seed repo (§7), one complete delta-spec cycle —
archaeology, characterization tests, delta-spec, implementation, verification.

**Lab 5 (20 min):** a supplied legacy function. List the characterization tests
you would write first, then draft the delta-spec for a stated change.
*Senior variant:* the function contains a subtle bug. Your characterization test
will pin the buggy behavior. What do you do, and what do you write down?

**Slides:** ~14.

### Module 6 — Anti-Patterns and the Decision Framework (45 min)

**Opening damage:** "So SDD means we write more documents." This is the
training's own failure mode, and the module exists to prevent it. Not optional,
not compressible, never cut.

Content beats:
1. **The anti-pattern catalog**: spec theater, over-specification, spec drift,
   altitude confusion, the big-bang brownfield spec, specs used as ceremonial
   gates rather than executable artifacts, **regeneration as a review
   substitute** (→ module 4 beat 8), and **retro-spec, or drift laundering** —
   patching the spec at PR time to match whatever got built (→ module 4 beat 7).
   Each traced back to the module that introduced its healthy counterpart.
2. **When NOT to do SDD** — one-off scripts, exploratory prototypes, stable
   finished systems, and **spikes, where the artifact shrinks to a sentence but
   the gate does not disappear.** That wording matters: the room watched
   `brainstorming` classify and gate a spike in module 2, and a flat "don't do
   SDD for spikes" here reads as a contradiction seven hours later. Give explicit
   permission to skip. A participant who cannot name three cases where SDD is
   overhead has not understood it.
3. **The decision framework** — a single flowchart: task size × domain novelty ×
   expected lifespan × compliance requirements → which altitude, what depth.
   This is the slide people photograph; design it to be photographed.
4. **The tool landscape, one slide** — BMAD, Superpowers/Claude Code, GitHub
   Spec Kit, Kiro, plain markdown. What each optimizes for. Spec Kit appears
   here despite not being taught: the audience will have heard the term, and
   omitting it invites a Q&A ambush.
5. **Monday morning** — the smallest concrete next action, one per seniority
   level. The training's actual conversion point.
6. Q&A.

**Slides:** ~13.

## 5. Day Schedule

| Time | Block | Duration |
|---|---|---|
| 08:45–09:25 | Module 0 — The Bridge (incl. the mindset switch) | 40 |
| 09:25–10:35 | Module 1 — Spec Anatomy | 70 |
| 10:35–10:50 | Break | 15 |
| 10:50–12:05 | Module 2 — Intent → Spec, and the day's long demo | 75 |
| 12:05–12:55 | Lunch | 50 |
| 12:55–13:40 | Module 3 — Spec → Plan → Tasks | 45 |
| 13:40–13:55 | Break | 15 |
| 13:55–15:15 | Module 4 — Execution, Verification, Drift | 80 |
| 15:15–15:30 | Break | 15 |
| 15:30–16:35 | Module 5 — Brownfield | 65 |
| 16:35–17:20 | Module 6 — Anti-Patterns, Decision Framework | 45 |

Content: 420 min. Labs: 70 min (16.7%). Wall clock: 8h35m.

**Lab times were rebalanced after a solvability run** in which someone who had not seen
the deck attempted every handout from the paper alone. The stated times had been
inversely correlated with the actual work: Lab 3 was the easiest and had the longest
slot, Lab 5 was the hardest and had the shortest. Nobody would have reached the
finish-early section on Labs 4 or 5 — where, in both cases, the most valuable idea on
the sheet lives. Lab 5's task was also **scoped down** rather than merely given more
time, per §2.0: it now asks for acceptance criteria instead of a full delta-spec.

**The clock column is a soft schedule.** Per §2.0 it exists to detect
over-stuffing, not to be defended in the room. It is written here in wall-clock
times only because a facilitator needs somewhere to start.

Per §2.0 these are planning estimates, not commitments. Modules 3 and 4 are where
over-stuffing is most likely, so they are where to look first when the plan is audited.

If the day slips, **drop items whole — never compress an explanation.** Cut order:

| Order | Item | Frees | Condition |
|---|---|---|---|
| 1 | Module 2 demo, steps 10 and 11 narrated rather than run | 5 | Safe. The map slide already labels this as the compressible tail |
| 2 | Lab 4 senior variant | 5 | — |
| 3 | Module 4's CI options slide | 10 | Safe. The Lab 4 handout carries a reference sheet |
| 4 | Module 2 demo, steps 8 and 9 down to a single task | 5 | Last resort inside the demo. Steps 5 to 7 are never cut, they are the demo |

That is 25 minutes of clean drop-whole slack, none of it touching a lab.

**Rebuilt 2026-09-01.** The old order is void: its first item was the depth-dial
coda, its third was module 3's demo and its fourth was Lab 2, and all three have
since been withdrawn. Labs are now 70 of 420 minutes, 16.7%, comfortably under the
client's ~20% ceiling, so no cut in this list breaches a decided constraint.

Three rules override the cut order: **module 6 is never cut**; **module 0 beat 4, the
mindset switch, is never cut** — all three later uses of the deletion test assume the room
met it; and **no module's core idea is ever rushed to preserve the end time.** Running twenty minutes long is the correct
trade against a concept that did not land.

## 6. Running Example

**API key management service** — issue, rotate, revoke, rate-limit, audit.
**Confirmed.** Built in **.NET / C#**, matching the seed repo (§7); the day never
switches language, because a stack change mid-day costs attention and buys nothing.

| Property | Why it was chosen |
|---|---|
| Universally understood | No domain explanation cost in a mixed-seniority room |
| Genuinely constrained | Rotation windows and revocation propagation are real design problems |
| Small enough to build | One feature completes live inside modules 3–4 |
| Audit requirements | Makes BMAD's traceability and compliance argument concrete |
| Non-obvious edge cases | Supplies real material for modules 1–2 ambiguity labs |

## 7. Seed Legacy Repository

A deliberately bad repository, written for this training, used only in module 5.
Control over the defects matters more than authenticity: every anti-pattern the
module names must be present and findable within the demo's time budget.

**Target:** 5,000–8,000 lines of **C# / .NET**, runnable with `dotnet run` and
`dotnet test` in under two minutes on a clean machine. Same stack as the running
example (§6).

| Property | .NET instantiation | Serves |
|---|---|---|
| No README beyond setup steps | Bare `dotnet run` instructions only | `CLAUDE.md` as the cheapest first artifact |
| Three tests that assert nothing meaningful | xUnit tests that only `Assert.NotNull` or exercise a path with no assertion | Testing-theatre callback to module 4 |
| One ~900-line god file | A fat controller or service class doing routing, validation, persistence and formatting | Seam finding |
| Business rules with no home | Pricing or eligibility logic embedded in a Razor view / `.cshtml` | Spec archaeology — knowledge living where no spec would look |
| Two same-named methods, different behaviour | Overloads whose semantics diverge, or the same name across two partial classes | Ambiguity that no rewrite resolves |
| Implicit coupling through global config | A `static` config singleton or raw `IConfiguration` reads scattered through the call graph | Delta-spec boundary difficulty |
| One subtle behavioural bug | Off-by-one on a rotation window boundary, or a swallowed exception that changes a return path | Lab 5 senior variant — characterization pins the buggy behaviour |

The rotation-window bug is deliberately the same *shape* as module 4's planted
false premise. A participant who met it at 14:10 should feel the echo at 15:40
without being told.

The bug is the most important item: it forces the question of what
characterization testing means when current behavior is wrong.

## 8. Deliverables and Preparation

| # | Deliverable | Notes | Effort |
|---|---|---|---|
| 1 | Slidev deck (English), 99 slides | Same stack as `agentic-prep` | High |
| 2 | Bridge Cut (9 slides) + pre-read package (9 slides) | Derived from existing deck | Low |
| 3 | Running-example repo with pre-baked BMAD artifacts staged in git history | Must be walkable by diff | High |
| 4 | Seed legacy repo (§7) | Most expensive single item; gates module 5 | High |
| 5 | Five lab handouts, each with a senior variant | Markdown, printable | Medium |
| 6 | Facilitator notes: demo scripts, timings, cut order | | Medium |
| 7 | Recorded fallback for every live demo | Non-negotiable for a demo-led format | Medium |

## 9. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Live demo fails (latency, non-determinism) | High — format is demo-led | Recorded fallback for every demo; BMAD side always pre-baked |
| A module gets rushed and its core idea does not land | High — the failure §2.0 actually guards against | Drop items whole via the §5 cut order; never compress an explanation to hold the clock |
| Modules 3–4 run long | Low — explicitly accepted under §2.0 | Communicate a soft end time to participants in advance |
| Junior/senior split — one group disengages | Medium | Senior variant on every lab; failure openers aimed at seniors |
| Participants lack Claude Code / BMAD access | Medium | Principle-before-tool ordering (§2.3); labs need no tooling |
| Audience leaves hearing "more documents" | High — kills adoption | Module 6 protected from cuts; anti-patterns woven throughout |
| Seed repo prep overruns before the date | Medium | Start it first; it gates module 5 entirely |
| BMAD reads as unjustifiable overhead | Medium | **Module 2 demo coda, the light-path run** (§4, Module 2) — the only place a depth dial turns on screen; plus §2.2's depth-dial column |
| Participants learn "which tool" instead of "at what depth" | High — it is the difference between a procurement rule and a skill | §2.2 depth-dial column and recaption; module 2 demo coda; module 6 flowchart |
| Reviewers stop reading diffs | High — the training would cause the regression it prevents | **The risk is created in module 0 beat 4, not module 4**: point 5 must say truth *splits* (intent → spec, artifact → code), never that it relocates. Then module 4 beat 8's split inherits that vocabulary instead of retracting it; Lab 4's answer key is two-sided |
| Side-by-side demos double the demo prep | Medium | BMAD side is static artifacts, not a live run |

## 10. Open Questions

**Open but not blocking:**

1. **Group size** — unknown. The design is built to tolerate either: every lab
   debrief is written in two forms, a round-the-room reveal for under ~15 people
   and a three-minute instructor read-out above that. Decide before the handouts
   are finalised, not before the plan.

**Resolved:**

2. **Running example** — API key management, confirmed. §6.
3. **Stack** — .NET / C#, for both the running example and the seed repo. §6, §7.
4. **No hard stop.** The schedule (§5) is therefore genuinely soft, and §2.0
   governs without exception: a module that needs more time takes it, and the cut
   order exists to protect depth rather than an end time. Running to 17:35 is
   acceptable; rushing a core idea is not.
5. **Laptops** — present, and read-only. Participants write no code and no specs.
   See §2.4 for what the machines are for and the rule to state at 08:45.
6. **Follow-up session** — none planned. Consequences folded into §11: deferred
   material is now dropped, each piece with a named resting place.
7. **Pre-read package** — optional, therefore load-bearing on nothing. See the
   invariant in §11.

## 11. Out of Scope

**Design invariant — nothing in the day may depend on the pre-read.** The pre-read
package is optional (§10.7), so in practice most of the room will not have read it.
Module 0's Bridge Cut must therefore be self-sufficient. It is: the day operates
leverage points #1, #2, #3, #5, #6 and #12, and all six are inside the Bridge Cut.
The nine parked slides (Model, Prompt, Tools, Standard Out, Types, Architecture)
are enrichment only. **Any future revision that makes a module lean on a parked
slide breaks this invariant** — check against this list before adding a
back-reference.

**Cut, not deferred.** With no follow-up session planned (§10.6), the following are
dropped rather than postponed. Each has a resting place so it does not read as an
omission when someone asks:

| Material | Resting place |
|---|---|
| CI enforcement of spec-code linkage | One reference slide in the Lab 4 handout |
| Multi-agent orchestration beyond the two toolchains | Named in module 6's tool landscape slide, not taught |
| SDD at organisational scale, rollout strategy | Module 6's "Monday morning" beat, scoped to the individual |

**Out of scope as before:**

- Teaching BMAD comprehensively (68 workflows, 26 agents). It appears as the
  project-altitude half of a comparison, not as a curriculum.
- GitHub Spec Kit as a taught toolchain — one slide in module 6 only.
- Prompt engineering fundamentals.
- Model selection, tool design, type systems — leverage points outside scope.

## 12. Backlog — Deferred Items

Parked deliberately. Revisit after module content is drafted, not before.

| # | Item | Status |
|---|---|---|
| B1 | Source real spec examples from **https://ecc.tools/** instead of author-invented ones | **Evaluated 2026-08-31 — rejected as a spec source. Two smaller uses adopted.** |

**B1 detail.** The site is reported to host a good collection of skills. If its specs are
suitable, they would replace invented material in two places where authenticity carries
real weight:

- **Module 1, Lab 1** — the three specs of varying quality that participants rank.
  Real published specs are far more persuasive than ones written to be criticised, because
  participants cannot dismiss the bad one as a straw man.
- **Module 3, Lab 3** — the plan with two planted defects. A real plan with real
  weaknesses beats planted ones for the same reason.

### B1 verdict

**Rejected as a source of spec examples.** ECC is an agent harness — 286 skills and 64
agents, MIT-licensed, at `github.com/affaan-m/ECC`. What it hosts are **agent
instruction files**, not specifications. Their structure is `name` / `description` /
`When to Activate` / `Skip when` / `Inputs` / checklists of FAIL-PASS code pairs.

There is no `Goal`, no `Non-goals`, no `Constraints`, and no `Acceptance criteria`
anywhere in the form. These documents say how an agent should behave, not what a
system should become.

**Substituting them would be actively harmful, not merely unhelpful.** Presenting an
agent instruction file as a "spec example" models the exact error module 1 slide 8
teaches against — altitude confusion. The slide already lists four things people call
a spec; an instruction file would be a fifth, and Lab 1 would be teaching participants
to make the mistake the lab exists to correct.

Lab 1's three specs and Lab 3's defective plan stay author-written.

### Two smaller uses adopted

1. **Module 6, tool landscape slide.** ECC is a legitimate data point about the
   ecosystem — an MIT-licensed harness distributing skills, agents and hooks across
   many editors. One row, no endorsement.
2. **Module 5, the `CLAUDE.md` beat.** `npx ecc-agentshield` lints `CLAUDE.md` and
   `.cursorrules` against ~100 security rules. If the day tells a room to write a
   `CLAUDE.md` as the cheapest first artifact, telling them a linter exists for it is
   a genuinely useful, checkable pointer.

*Original note, retained for the record: before adopting any external source, check
licence and attribution terms, and confirm the material is legible without its
surrounding project context.*
