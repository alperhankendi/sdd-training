# Four weeks in, nobody agrees what "user" means

<div class="mt-10 text-sm opacity-90">
Two services encode different answers. Both are correct against the ticket they were built from. Neither team did anything wrong.
</div>

<div class="callout-bad mt-10">
The assumption was never wrong. It was never <b>stated</b>, so it was never <b>checked</b>.
</div>

<!--
This is the most expensive failure in the day, because everything downstream
inherits it and nothing downstream can detect it. A perfect plan built on a
drifted assumption executes flawlessly into the wrong system.
-->

---

# Intent is incomplete at the source

<div class="mt-8 text-xl">The requester's head does not contain a finished spec either.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Extraction</div>
    <div class="mt-1">"They know what they want; my job is to get it out of them."<br/><br/>Leads to transcription, and to blaming the requester when it turns out wrong.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Construction</div>
    <div class="mt-1">"Neither of us knows yet; my job is to build it with them."<br/><br/>Leads to questions that create the answer rather than retrieve it.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-75">This reframe does most of the work in this module. Everything after it is technique.</div>

<!--
Test it against the room: ask who has been given a requirement that turned out
wrong, and whether the person who gave it knew it was wrong at the time. They
did not. They had not been asked the question that would have revealed it.
-->

---

# The question ladder

<div class="mt-6 text-sm opacity-75">Five questions, ordered by how much they surface per minute.</div>

<div class="mt-6 space-y-2 text-sm">
  <div class="callout-key"><b>1 ·</b> What would make you <b>reject</b> this?</div>
  <div class="callout-key"><b>2 ·</b> What must it <b>not</b> do?</div>
  <div class="callout-key"><b>3 ·</b> What happens on the <b>unhappy path</b>?</div>
  <div class="callout-key"><b>4 ·</b> Who <b>else</b> is affected?</div>
  <div class="callout-key"><b>5 ·</b> What is <b>already true</b> that I should not break?</div>
</div>

<div class="mt-6 text-sm opacity-90">
Question 1 first, deliberately. "What do you want" produces agreement. "What would make you reject this" produces information.
</div>

<!--
Question 5 is the one people skip and the one that catches the most in existing
systems. It is also the bridge to module 5: in a legacy codebase, "what is
already true" has no written answer at all.
-->

---

# Non-goals first

<div class="mt-8 text-xl">Ask what is <b>out</b> of scope before asking what is in it.</div>

<div class="mt-10 text-sm opacity-90">
The mechanism, not the etiquette:
</div>

<div class="mt-4 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-good">
    <div class="font-bold">People agree on goals</div>
    <div class="mt-1">"Make key rotation safe." Everyone nods. No information transferred.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold">People differ on boundaries</div>
    <div class="mt-1">"Does this cover keys already leaked?" Now two people discover they disagreed all along.</div>
  </div>
</div>

<div class="mt-8 text-sm">Disagreement is the product. Surfacing it early is the entire point of this stage.</div>

<!--
This is why the template has a Non-goals section, and it is worth saying so
explicitly -- module 1 handed them the section, this slide is where it is earned.
-->

---

# Three classes of hidden assumption

<div class="mt-6">

| Class | Sounds like | Detection |
|---|---|---|
| **Domain** | "the user", "the account", "active" | Ask for two examples that are *nearly* the same and differ in one way |
| **Constraint** | "fast", "soon", "at scale" | Ask for the number, then ask what happens one past it |
| **Success** | "works", "handles it", "is reliable" | Ask how you would prove it to someone who doubted you |

</div>

<div class="mt-8 text-sm opacity-90">
Different classes need different questions. Asking "can you be more specific?" catches none of them, because the speaker already believes they were.
</div>

<!--
The domain-assumption detection is the strongest of the three and worth
demonstrating: "give me two things that are both users, that differ in one way,
where you would want different behaviour." That question breaks open more
requirements than any other single sentence in this deck.
-->

---

# Ask or assume is a property of the spec

<div class="mt-8 text-lg">Not a property of the agent, and not a personality trait.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Asks too much</div>
    <div class="mt-1">It is reading an under-specified spec.<br/><br/>The fix is in the document, not the prompt.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Assumes too much</div>
    <div class="mt-1">It is reading a spec that failed to <b>mark its own uncertainty</b>.<br/><br/>Also the document.</div>
  </div>
</div>

<div class="callout-good mt-8 text-sm">
An agent cannot distinguish "we decided this and did not write it down" from "we never decided this", because from inside the document, those look identical.
</div>

<!--
This is the slide that stops people trying to fix elicitation with prompt
engineering. The unmarked unknown is indistinguishable from a settled decision,
and no amount of instruction can teach an agent to tell them apart.
-->

---

# Open questions are a section, not a feeling

<div class="mt-8 text-lg">Writing down what you do not know is the discipline. Resolving it silently with a guess is the failure.</div>

```markdown
## Open questions

- [ ] Do enterprise customers get a longer rotation overlap than 24h?
      → Needs: Product. Blocks: acceptance criterion 3. Assumed for now: no.
- [ ] Is revocation reversible within the grace period?
      → Needs: Security. Blocks: nothing yet. Assumed for now: irreversible.
```

<div class="mt-6 text-sm opacity-90">
Three parts each: <b>who decides</b>, <b>what it blocks</b>, and <b>what we assumed meanwhile</b>. Without the third, work stops. Without the first, it never resolves.
</div>

<!--
"Assumed for now" is what makes this practical rather than bureaucratic. It lets
execution continue while keeping the assumption visible and attributable, which
is exactly what an unmarked guess does not do.

Module 4 picks this up: a mid-execution discovery that the spec is merely SILENT
goes here, and work continues around it.
-->

---

# Principle · size the artifact to the change

<div class="mt-6">

| | Project altitude | Feature altitude |
|---|---|---|
| **Artifact** | Product Brief → PRD | A design in chat |
| **Ceremony** | A gate between phases | An approval before work starts |
| **Owner** | Tech lead, product | Whoever is building it |
| **Cadence** | Per project | Several times a week |
| **Cost of being wrong** | Weeks. Amended under change control. | An hour. Re-run it. |

</div>

<div class="mt-6 text-sm opacity-75">Same questions. Same failure it prevents. Different weight, because different reversibility.</div>

<!--
Principle before tool: this slide states the shape, the next two name the
toolchains. Do not name BMAD or Superpowers before this slide -- a participant
with access to neither must still leave with the shape.
-->

---

# Two instantiations of that principle

| Altitude | Toolchain | Artifacts |
|---|---|---|
| **Project** | BMAD | Product Brief → PRD → Architecture → Epics |
| **Feature** | Superpowers | brainstorm → design → plan → verify |

<div class="mt-8 text-sm opacity-90">
Two toolchains, one shape. If you have access to neither, the previous slide is still the whole lesson. These are instances of it, not the source of it.
</div>

<div class="mt-6 text-sm opacity-75">
The loop is fractal. What is <b>not</b> fractal is the cost of being wrong, and that is the next slide.
</div>

<!--
Named here and only here. Everything before this slide is vendor-neutral by
design, so a participant whose organisation uses neither still leaves with
something they can apply on Monday.
-->

---

# Altitude is a property of the work

| Toolchain | Depth dial |
|---|---|
| **BMAD** | Quick Flow ↔ Full Planning |
| **Superpowers** | spike ↔ bounded ↔ architectural |

<div class="callout-key mt-8">
The question is not <s>"which one?"</s> It is <b>"at what depth?"</b>
</div>

<div class="mt-8 text-sm opacity-75">
And the dial has a reason. The loop is fractal; the <b>reversibility</b> is not. A wrong feature plan is re-run in an hour. A wrong PRD found in week six is amended under change control, because epics, stories and other teams' commitments were already derived from it.
</div>

<!--
This slide is the module's payload and the reason the previous one is not enough.
A participant who leaves believing "BMAD means heavy" has learned a procurement
rule, not a sizing skill -- and every tool here has its own dial.

The reversibility asymmetry is also the justification for two inputs on module
6's decision flowchart -- expected lifespan and compliance -- which otherwise
reach the photographed slide with nothing behind them.
-->

---

# Demo · project altitude

<div class="mt-8 text-lg opacity-75">Product Brief → PRD, walked by diff</div>

<div class="mt-8 space-y-3 text-sm">
  <div class="callout-key"><b>1 ·</b> The brief. Read its non-goals aloud. That section is the whole reason the PRD can be reviewed at all.</div>
  <div class="callout-bad"><b>2 ·</b> The draft PRD, and the gate <b>rejecting it</b>. Four findings, one fatal.</div>
  <div class="callout-good"><b>3 ·</b> The PRD that passes. Diff it against the draft.</div>
</div>

<div class="mt-8 text-sm opacity-90">
The fatal finding: an architect cannot design a rotation mechanism from a PRD that never says <b>what happens to the old key</b>.
</div>

<!--
Artifacts are pre-baked; you are walking git history, not generating. This is
deliberate -- generating a PRD live means the room watches a spinner for four
minutes and learns nothing that the diff does not show better.

Run ONE thing live if you run anything: the gate rejecting the draft. That is
the moment the method justifies itself.
-->

---

# Demo · feature altitude

<div class="mt-8 text-lg opacity-75">The same stage, in a conversation</div>

<div class="mt-8 text-sm opacity-90">
Live. Hand it a one-line request and watch it refuse to start: classify the work, ask what would make you reject it, ask for the non-goals, surface an assumption you had not noticed you were making, and stop at an approval gate before writing anything.
</div>

<div class="callout-key mt-8 text-sm">
Watch for the moment it asks a question you did not have an answer to. That is not the tool failing. That is the tool doing the only thing that matters at this stage.
</div>

<!--
This half runs live because a live elicitation dialogue is genuinely more
persuasive than any artifact, and because it is cheap -- it is a conversation,
not a generation.

If it asks something you cannot answer, DO NOT invent an answer to keep the demo
moving. Say "I don't know, and that is an open question" and put it in the
Open questions section on screen. That is the most valuable thirty seconds
available in this module.
-->

---

# The depth dial, on screen

<div class="mt-6 text-lg">The same one-file bug fix, down both toolchains, at their lightest setting.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-key">
    <div class="font-bold">Project altitude, light</div>
    <div class="mt-1 font-mono text-xs">/quick-spec → /dev-story</div>
    <div class="mt-2">No Product Brief. No PRD. No Architecture document. Fifteen lines total.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">Feature altitude, light</div>
    <div class="mt-1 font-mono text-xs">brainstorming</div>
    <div class="mt-2">"This looks bounded." Three sentences in chat, an approval gate, and <b>no spec file at all</b>.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
Sixty seconds. This is the only moment today when a depth dial turns on screen.
</div>

<!--
This coda is the honest answer to the senior in the room who has spent forty
minutes thinking "this is enormous overhead". Do not skip it to save time; if
you must cut something in this module, cut a question from the ladder.

The absence of artifacts on the light path is the demonstration. Do not create
placeholder documents saying "not applicable" -- nothing at all is the output.
-->

---

# Lab 2 · Five questions

<div class="mt-8 text-lg">A one-line feature request. Fifteen minutes.</div>

<div class="callout-bad mt-8 !text-lg font-mono">
"We need to let customers see who used which API key."
</div>

<div class="mt-8 text-sm">
Write the <b>five questions</b> you would ask before writing any spec. Not clarifications: questions whose answers would change what you build.
</div>

<div class="callout-good mt-6 text-sm">
<b>If you finish early:</b> which of your five could an agent answer itself from the codebase, and which genuinely require a human? Explain what makes the difference.
</div>

<!--
The senior variant is the actual lesson. "What is the current audit retention?"
is answerable from the code. "Should a revoked key's usage still be visible?" is
not answerable by anyone but a person with authority.

Conflating those two is why teams either interrogate agents pointlessly or let
them guess at decisions that were never theirs to make.

DEBRIEF -- under ~15 people: round the room, one question each, no repeats, and
you will run out of distinct questions around person nine, which is itself worth
pointing at. Above 15: take four from volunteers and read out the two that
matter most, which are almost always "what must NOT change" and "who is allowed
to see this".
-->
