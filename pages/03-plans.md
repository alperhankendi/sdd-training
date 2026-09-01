
# Principle · a plan is source code

<div class="mt-8 text-xl">It must be complete enough to run with <b>zero human interpretation</b>.</div>

<div class="mt-4 text-sm opacity-75">
Not zero human <i>approval</i>. An irreversible action (a production push, a dropped table, a merge) should still stop and ask. That is a permissions policy, and it is orthogonal to whether the plan is any good.
</div>

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

INTERPRETATION, not interaction. The distinction is load-bearing and a
security-minded senior will hold you to it: "zero human interaction" is refuted
by any irreversible-action policy, and they are right. What the rule actually
forbids is a step that says "and then decide". Approval gates are a separate
axis and they do not make a plan worse.
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

<div class="mt-8 text-xl">Every step carries its own proof.</div>

<div class="grid grid-cols-3 gap-4 mt-8 text-sm">
  <div class="callout-key"><b>action</b><br/>What to do, unambiguously enough to do it</div>
  <div class="callout-key"><b>verify</b><br/>A command whose output settles it</div>
  <div class="callout-key"><b>done</b><br/>What that output must say</div>
</div>

<div class="mt-8 text-sm opacity-75">
Those three words are <b>one project's encoding</b> of the shape, not the shape itself. Another team uses different words and is doing the same thing correctly.
</div>

<div class="callout-key mt-6 text-sm">
The <b>verify</b> line is where this morning comes back: an acceptance criterion that cannot become a verify step <b>failed the testability test</b>, and you are finding that out late.
</div>

<!--
The example is not on the slide any more, on purpose. Open the real plan instead,
`sdd-training-example/specs/plans/S1.2-plan.md`, and read STEP 1 off it whole. Say
the codebase change as you open it: this is not the morning's ticket system, and a
method that only works on the example you rehearsed is not a method.

Step 1 is the simplest of the eight. Note out loud that its `done` says more than
its `verify`: the build passing is not enough, the field has to be there.

Two things have to survive that: action/verify/done is an ENCODING, not the
concept, and the verify line is the join back to module 1's acceptance criteria.
Teaching the three words as if they were the idea is exactly the
ritual-over-reasoning failure this module has to avoid.
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

<div class="mt-8 text-xl">All task 7 knows about task 3 is <b>what task 3 wrote down</b>.</div>

<div class="mt-8 text-sm opacity-90">
Two lines per task, <b>consumes</b> and <b>produces</b>, both carrying real signatures. They exist because the alternative is an executor guessing a signature, and guessing <i>plausibly</i>, which is worse than guessing badly.
</div>

<div class="callout-bad mt-8 text-sm">
This happened while building today's material. A plan assumed <code>Next(int year)</code>; generation had produced <code>Next(DateTime issuedOn)</code>. The plan had not pinned the signature, so it could not call it.
</div>

<div class="mt-6 text-lg">
A signature the plan does not pin is a signature the plan <b>cannot call</b>.
</div>

<!--
Tell that story, it is from this training's own construction and it is the cheapest
possible demonstration that the rule is not theoretical.

The declaration block itself is no longer on the slide. Show it from the file
header of `S1.2-plan.md`, which carries three lines with full signatures: one
consumes from the previous story, two produces with parameter and return types.
Point at the types. "A purge method" is what this rule exists to prevent.
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

# Lab 3 · İki kusuru bulun

<div class="mt-4 text-sm opacity-90">
Elinizdeki kâğıtta <b>sekiz adımlık gerçek bir plan</b> var. API key servisine revocation ekliyor, ve bu modülün kurallarına göre yazılmış <b>görünüyor</b>.
</div>

<div class="mt-6 space-y-3 text-sm">
  <div class="callout-key"><b>1 ·</b> <b>Verify'ı fail edemeyen</b> adımı bulun. Yani işi yapılmış da olsa yapılmamış da olsa <b>geçecek</b> olan adım.</div>
  <div class="callout-key"><b>2 ·</b> Sessizce <b>bir insanın orada olduğunu varsayan</b> adımı bulun.</div>
</div>

<div class="callout-bad mt-6 text-sm">
Birkaç adımda daha doğrulama sorunu var. Aradığımız <b>bu iki tanesi</b>, ama başkasını bulursanız haksız değilsiniz: toparlarken getirin.
</div>

<div class="callout-good mt-6 text-sm">
<b>Erken bitirirseniz:</b> bulduğunuz her kusur için, executor'ın <b>dört özelliğinden hangisi</b> onu kusur yapıyor? Nasıl düzeltileceğini değil. <b>Neden bozuk olduğunu.</b>
</div>

<!--
Hand the sheet out, say the two tasks, start the clock. Do not talk over it.

The senior variant tests the mechanism rather than the repair, which is the whole
point of having stated the failure model at the start of the module. Someone who
can only say "add a verify step" has learned the rule; someone who can say
"because a fresh executor cannot see the previous output" has learned the reason.

The sheet warns that other steps have problems too. That is honest and it stops
the pedantic participant from derailing the debrief with a third finding.

DEBRIEF: take both defects from the room, never supply them yourself.
-->
