# It stopped at step 7 of 12

<div class="mt-10 text-sm opacity-90">
Nobody can tell what state the repository is in. Steps 1–6 may have run. Step 7 may be half-applied. The only way to find out is to read everything it touched.
</div>

<div class="callout-bad mt-10">
A plan that cannot be resumed is not a plan. It is a to-do list that got lucky the first time.
</div>

<!--
Ask who has watched this happen. Then ask what they did: almost everyone says
"started over". That is the real cost -- not the failure, the discarded work.
-->

---

# Principle · a plan is source code

<div class="mt-8 text-xl">It must be complete enough to run with <b>zero human interaction</b>.</div>

<div class="mt-8 text-sm opacity-90">
Leverage point 3 from this morning, now operational. And the test is not "is it detailed": detail is easy to add and proves nothing. The test is:
</div>

<div class="callout-key mt-6 !text-lg">
Could someone who has never seen this project run it to completion without asking me anything?
</div>

<div class="mt-8 text-sm opacity-75">
If the answer is "they would probably figure it out", the answer is no.
</div>

<!--
Do not name a tool yet. Everything in this module is derived from one fact about
executors, and that fact comes next. State the conclusion here, earn it on the
following slide.
-->

---

# Why · the executor's failure model

<div class="mt-6 text-lg">Every rule in this module descends from four properties.</div>

<div class="mt-8 grid grid-cols-2 gap-4 text-sm">
  <div class="callout-bad"><b>Its context is not yours.</b><br/>It has not been in the meetings.</div>
  <div class="callout-bad"><b>It does not persist across steps.</b><br/>Step 7 may be a fresh mind.</div>
  <div class="callout-bad"><b>It may be a different executor each time.</b><br/>Including a different person.</div>
  <div class="callout-bad"><b>It confabulates rather than stalls.</b><br/>Faced with ambiguity it produces something plausible and reports success.</div>
</div>

<div class="callout-key mt-8 text-sm">
The fourth is the one that costs. A human stuck at step 7 asks. An executor stuck at step 7 <b>invents</b>, and the invention surfaces at step 11 where nobody can attribute it.
</div>

<!--
Demonstrate this if you have three minutes: hand an agent a plan step with a
plausible ambiguity and let the room watch it confidently build the wrong thing
and report success. Nothing you say is as convincing as watching it happen.

This slide is also the answer to "this is waterfall with extra steps". The
waterfall answer is "the plan must be complete before execution". THIS answer is
"the executor cannot ask you a question and will invent one instead, so
completeness is not ceremony -- it is the interface." Those are different claims.
-->

---

# Anatomy of an executable plan

```markdown
- [ ] Step 3: Write the minimal implementation

    action    Create src/Rotation/WindowPolicy.cs with the class below
    verify    dotnet test --filter WindowPolicy -v
    done      One test passes; no other test changes status
```

<div class="grid grid-cols-3 gap-4 mt-8 text-sm">
  <div class="callout-key"><b>action</b><br/>What to do, unambiguously enough to do it</div>
  <div class="callout-key"><b>verify</b><br/>A command whose output settles it</div>
  <div class="callout-key"><b>done</b><br/>What that output must say</div>
</div>

<div class="mt-6 text-sm opacity-75">
This is <b>one project's encoding</b> of the shape, not the shape itself. The shape is: every step carries its own proof.
</div>

<!--
That last line matters. Teaching action/verify/done as if the words were the
concept is exactly the ritual-over-reasoning failure this module has to avoid.
Another team will use different words and be doing the same thing correctly.
-->

---

# Per-step verification, and why

<div class="mt-8 text-lg">Because the executor cannot tell success from plausible-looking failure.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Verify at the end</div>
    <div class="mt-1">Step 3 silently did the wrong thing.<br/>Steps 4–12 built on it.<br/>You find out at step 12, and the failure points at step 12.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Verify per step</div>
    <div class="mt-1">Step 3 fails at step 3.<br/>Nothing is built on a false premise.<br/>The failure points where the defect is.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
An unverified step does not merely risk being wrong. It <b>contaminates every step after it</b>, and it moves the symptom away from the cause.
</div>

<!--
This is the same argument as fast feedback in testing, and the room already
believes it. What is new is applying it to a document.
-->

---

# Self-contained tasks

<div class="mt-8 text-lg">The reader of task 7 never saw task 3.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Breaks silently</div>
    <div class="mt-2 font-mono text-xs">"Same approach as Task 3, but for revocation"</div>
    <div class="mt-2">Works in one long session. Fails the first time each task gets a fresh executor, and fails by producing something, not by stopping.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Survives</div>
    <div class="mt-2 font-mono text-xs">Repeat the code. Repeat the constraint. Repeat the file path.</div>
    <div class="mt-2">Duplication in a plan is not a smell. The plan is not the program.</div>
  </div>
</div>

<!--
Developers resist this because DRY is deep in the reflexes. Say plainly: a plan
is read once, in fragments, possibly by different readers. Factoring it out
optimises for a reader who does not exist.
-->

---

# Declared interfaces

<div class="mt-8 text-lg">All task 7 knows about task 3 is <b>what task 3 wrote down</b>.</div>

```markdown
### Task 7: Revocation propagation

Consumes:  KeyStore.Invalidate(Guid keyId)  (from Task 3)
Produces:  RevocationCache.Purge(Guid keyId, DateTime asOf) : Task<int>
```

<div class="mt-6 text-sm opacity-90">
Two lines per task. They exist because the alternative is an executor guessing a signature, and guessing plausibly, which is worse than guessing badly.
</div>

<div class="callout-bad mt-6 text-sm">
This happened while building today's material. A plan assumed <code>Next(int year)</code>; generation had produced <code>Next(DateTime issuedOn)</code>. The plan had not pinned the signature, so it could not call it.
</div>

<!--
Tell that story -- it is from this training's own construction, this week, and
it is the cheapest possible demonstration that the rule is not theoretical.

The general form: a signature the plan does not pin is a signature the plan
cannot call.
-->

---

# Sizing a plan

<div class="mt-6">

| Too small | Right | Too large |
|---|---|---|
| One step | A reviewer could reject one task while approving its neighbour | Nobody can hold the outcome in mind |
| Ceremony costs more than the work | Each task ends with something testable | Failure at step 30 means re-deciding step 4 |

</div>

<div class="mt-8 text-sm opacity-90">
The boundary test is a <b>review</b> test, not a size test: <i>could someone meaningfully approve this task and reject the next one?</i> If not, they are one task.
</div>

<div class="mt-6 text-sm opacity-75">
And the required completeness rises with how badly the executor can recover: a colleague beside you &lt; one long session &lt; a fresh executor per task.
</div>

<!--
That last line is the dial, and it is what reconciles module 1's precision
budget with this module's completeness bar. Under-specify whatever the executor
can recover from on its own; specify everything else. They are not in conflict --
they are the same variable read at two altitudes.
-->

---

# Resumability

<div class="mt-8 text-lg">Can this be picked up at step 5, in a fresh session, with no memory of steps 1–4?</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-key">
    <div class="font-bold">What makes it possible</div>
    <div class="mt-1">Each step's <b>done</b> is observable from the repository, not from memory. You can read the tree and know where you are.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold">What makes it impossible</div>
    <div class="mt-1">"Continue where we left off." State that exists only in a conversation is state that cannot be resumed.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-75">This is the property that separates a plan from a to-do list.</div>

<!--
Concrete test: check out the repository fresh, read the plan, and identify the
first unchecked step whose "done" is not already true. If you cannot, the plan
is not resumable.
-->

---

# Amendability

<div class="mt-6 text-lg">The harder case: the plan is fine, and the <b>spec above it</b> turns out wrong.</div>

<div class="mt-8 text-sm opacity-90">
You are at step 6 of 9. Steps 1–5 are done and correct against a spec that is about to change. What happens to them?
</div>

<div class="mt-8 grid grid-cols-3 gap-4 text-sm">
  <div class="callout-key"><b>Some are still valid</b><br/>They never depended on the wrong part.</div>
  <div class="callout-bad"><b>Some are now suspect</b><br/>Correct against the old spec. Silent, and wrong.</div>
  <div class="callout-key"><b>Some must be re-derived</b><br/>The step still applies; its content does not.</div>
</div>

<div class="mt-6 text-sm opacity-75">A plan built to be amended marks which is which. Module 4 does the amending.</div>

<!--
This slide exists because the conventional teaching stops at resumability, and
resumability only covers INTERRUPTION. Amendment is more common and much more
dangerous, because completed work stays checked off while quietly becoming wrong.
-->

---

# Tests are the executable half

<div class="mt-8 text-lg">Module 1's acceptance criteria become this module's test list. Directly.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-good">
    <div class="font-bold">Acceptance criterion</div>
    <div class="mt-2 text-xs">"After rotation the previous key authenticates for exactly 24 hours, then fails with <code>401 key_expired</code>."</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">Its verify step</div>
    <div class="mt-2 font-mono text-xs">dotnet test --filter RotationOverlap<br/><br/>done: two tests pass at 23h59m and at 24h01m</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
If a criterion cannot become a verify step, it failed module 1's testability test and you are finding out late.
</div>

<!--
This is the join between the two modules and worth pausing on. A spec whose
criteria do not survive translation into verify steps was never testable; the
plan is just where that becomes undeniable.
-->

---

# Decomposition · project altitude

<div class="mt-8 text-lg opacity-75">BMAD: Architecture → Epics → Stories, with gates between</div>

<div class="mt-6 text-sm opacity-90">
Coarser units, longer-lived, reviewed by more people. A story is not a task: it states an outcome and leaves the steps open.
</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-key">
    <div class="font-bold">What the gate checks</div>
    <div class="mt-1">Can the next phase execute from this artifact alone?</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Who signs off</div>
    <div class="mt-1">Someone who will not implement it. That is the point.</div>
  </div>
</div>

<div class="mt-6 text-sm opacity-75">Every story carries a <code>Traces to:</code> line naming its epic, PRD section and architecture decision.</div>

<!--
Traceability is what makes this altitude worth its cost. Show a Traces-to line
on screen; it is the concrete form of the compliance argument, and it is far more
persuasive than the word "auditability".
-->

---

# Decomposition · feature altitude

<div class="mt-8 text-lg opacity-75">Superpowers <code>writing-plans</code>: one spec, one plan, N tasks, usually an afternoon</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-good">
    <div class="font-bold">What it produces</div>
    <div class="mt-1">An ordered list of tasks, each with action / verify / done, each independently executable.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">What it does not produce</div>
    <div class="mt-1">Epics. Stories. Sign-off. If the change needs those, you are at the wrong altitude.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
Same shape as the slide before. Different granularity, different reviewer, different cost of being wrong.
</div>

<!--
Do not let this read as "the lightweight one is for small teams". It is for small
CHANGES. The same team uses both in the same week.
-->

---

# Same shape, different weight

<div class="mt-4">

| | Project altitude | Feature altitude |
|---|---|---|
| **Unit** | Story: an outcome | Task: a step with a verify |
| **Reviewed by** | Someone who will not implement it | Whoever picks it up |
| **Gate** | Between phases, blocking | An approval before work starts |
| **Traceability** | Explicit, upward, to PRD | Implicit: the spec is one file away |
| **Cost of being wrong** | Re-derive the epics | Re-run the plan |

</div>

<div class="mt-6 text-sm opacity-90">
Choose by <b>reversibility</b>, not by team size and not by how important the work feels.
</div>

<!--
The room will want a rule of thumb. Give them this one: if being wrong costs
more than a day to unwind, you are at project altitude regardless of how small
the change looks.

Module 6's flowchart formalises this. Do not pre-empt it here.
-->

---

# Lab 3 · Find the two

<div class="mt-8 text-lg">A supplied plan. Ten minutes.</div>

<div class="mt-8 space-y-3 text-sm">
  <div class="callout-key"><b>1 ·</b> Find the step that <b>cannot be verified</b>: its <code>verify</code> would pass whether or not the step worked.</div>
  <div class="callout-key"><b>2 ·</b> Find the step that <b>silently assumes a human is present</b>.</div>
</div>

<div class="callout-good mt-8 text-sm">
<b>If you finish early:</b> for each defect you found, name which of the executor's four properties makes it a defect. Not what to fix. <b>Why it breaks.</b>
</div>

<!--
The senior variant tests the mechanism rather than the repair, which is the whole
point of having stated the failure model at the start of the module. Someone who
can only say "add a verify step" has learned the rule; someone who can say
"because a fresh executor cannot see the previous output" has learned the reason.

DEBRIEF -- under ~15: ask two people for the human-assumption step first, since
it is the one people miss. Above 15: read out both, then ask for a show of hands
on who found the second one. It is usually about a third.
-->
