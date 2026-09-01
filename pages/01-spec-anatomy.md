# "Make the auth module better"

<div class="mt-10 text-xl">A requirement that cannot fail is not a requirement.</div>

<div class="mt-10 text-sm opacity-90">
Nobody can build it. Nobody can review it. Nobody can tell you it is done, and nobody can tell you it is wrong, which is the part that costs.
</div>

<!--
Every person in the room has received this ticket. Ask what they did with it;
the answer is always "I guessed, and I was mostly right." Mostly is the problem.
-->

---

# What a spec is

<div class="grid grid-cols-2 gap-6 mt-8">
  <div class="callout-key">
    <div class="font-bold">Intent</div>
    <div class="text-sm mt-1">What we are trying to make true, and for whom</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Constraints</div>
    <div class="text-sm mt-1">What must hold regardless of how it is built</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">Acceptance criteria</div>
    <div class="text-sm mt-1">How we will know. Each one able to fail.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold">Non-goals</div>
    <div class="text-sm mt-1">What this deliberately does not do</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-75">
Notice what is absent: <b>how</b>. A spec that says how has stopped being a spec and started being a plan.
</div>

<!--
Intent comes first on purpose. Rooms reach for acceptance criteria because
those feel rigorous, and end up with a testable description of the wrong thing.
-->

---

# The testability test

<div class="text-xl mt-8">
If you cannot derive a <b>failing test</b> or a <b>rejection criterion</b> from a requirement, it is not a spec.
</div>

<div class="grid grid-cols-2 gap-6 mt-10">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Not a spec</div>
    <div class="text-sm mt-1">"Rotation should be reliable"<br/>"Handle errors appropriately"<br/>"Make it fast"</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">A spec</div>
    <div class="text-sm mt-1">"A key revoked during its rotation window must stop authenticating within 30 seconds across all regions."</div>
  </div>
</div>

<!--
Say "requirement", not "line". A spec's prose paragraphs are context; the rule
applies to what it asks for, not to every sentence.

The second disjunct is load-bearing. "Rejection criterion" exists to reach
requirements that yield no automated test -- architectural constraints, design
intent, operational limits. If the rule meant acceptance criteria only, the
first disjunct alone would carry it. Somebody will ask; that is the answer.
-->

---

# Specs form a graph, not a document

<div class="text-lg mt-6">The way to keep a spec small is to <b>point at the spec that already says it</b>, not to say less.</div>

<div class="mt-3 text-sm opacity-75">You already believe this about code. It is <b>DRY</b> (Don't Repeat Yourself), applied to prose.</div>

```yaml
# key-rotation.spec.md
Relates to:   revocation.spec.md
Inherits:     platform-constraints.spec.md   # rate limits, audit retention
Supersedes:   key-rotation.v1.spec.md
```

<div class="mt-6 text-sm">This is where cross-cutting requirements live: rate limits, rotation windows, audit retention, API shape. A flat per-feature <code>Constraints</code> list has nowhere to put them.</div>

<div class="callout-key mt-6 text-sm">
<b>When two specs contradict:</b> more specific beats more general · newer beats older, with an explicit <code>Supersedes</code> · when neither applies, it escalates to the owner, not to whoever read them last.
</div>

<!--
This slide converts the precision budget from a warning into a technique, which
is why it comes before the template rather than after it.

Without a reference mechanism a team has exactly two moves for shared material:
restate it, and watch the copies diverge on the first change; or omit it, and
watch the agent ask. Both are worse than a link.
-->

---

# The anatomy

<div class="mt-4">

| Section | Answers |
|---|---|
| **Relates to / Inherits / Supersedes** | What does this depend on, and what does it replace? |
| **Context** | Why are we doing this now? |
| **Goal** | What becomes true? |
| **Non-goals** | What stays false, deliberately? |
| **Constraints** | What must hold regardless of approach? |
| **Acceptance criteria** | How do we know? Each able to fail. |
| **Open questions** | What do we not know yet, and who decides? |

</div>

<div class="mt-6 text-sm opacity-75">Seven sections. The bar for an eighth is a failure it would have prevented.</div>

<!--
Hand this out. It is the artifact participants leave with.

Do NOT present these seven as handed down. Four of them are derived from
failures the room meets later today, and saying so now is what stops the
template being cargo-culted:
  - Acceptance criteria: the previous slide.
  - Non-goals: module 2 -- people agree on goals and differ on boundaries.
  - Open questions: module 2 -- the alternative is resolving silently with a guess.
  - Context: module 0's leverage point 12 -- specs are the highest-signal context.

The eighth-section bar matters. Templates decay by accretion: every incident
adds a section, nothing removes one, and eventually filling it in costs more
than the work it governs.
-->

---

# Reference over restatement

<div class="grid grid-cols-2 gap-6 mt-8">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Restated</div>
    <div class="text-xs mt-2 font-mono">rate limit: 1000/hour<br/>audit retention: 7 years<br/>key prefix: ak_live_</div>
    <div class="text-sm mt-2">In eleven specs. Six of them are now wrong, and nobody knows which six.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Referenced</div>
    <div class="text-xs mt-2 font-mono">Inherits: platform-constraints.spec.md</div>
    <div class="text-sm mt-2">In eleven specs. One place to change, and the change is visible in the diff of the thing that actually changed.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
The copies do not diverge because someone was careless. They diverge because nothing made divergence visible.
</div>

<!--
This is the same argument as DRY, and it is worth saying so -- the room already
believes it about code. The novelty is only that it applies to prose, which
most teams have never treated as something that can be factored.
-->

---

# When two specs disagree

<div class="mt-6 text-lg">Decide the rule <b>before</b> the disagreement. After it, the rule is an argument about authority.</div>

<div class="mt-10 space-y-4 text-xl">
  <div><b>1 ·</b> Specific beats general.</div>
  <div><b>2 ·</b> Newer beats older.</div>
  <div><b>3 ·</b> Otherwise, escalate to the owner.</div>
</div>

<div class="mt-10 text-sm opacity-75">Rule 3 is the important one. Most contradictions are not ambiguity. They are two people who never spoke.</div>

<!--
Three lines, stated plainly. Do NOT explain the caveats here: rules 1 and 2 both
have one, and both are shown working on the next slide. Saying them twice spends
the next slide before it arrives.

Rule 3 is the one to dwell on, and the only one that is about people rather than
documents. A later module returns to it one altitude up: the agent proposes, the
human disposes. Same idea.
-->

---

# Same number. Different outcome.

<div class="grid grid-cols-2 gap-4 mt-4 text-xs font-mono">
  <div class="p-3 rounded bg-gray-100 dark:bg-gray-800">
    <div class="opacity-50 mb-1">platform-constraints.spec.md</div>
    <div>rate limit: <b>1000</b>/hour</div>
  </div>
  <div class="p-3 rounded bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400">
    <div class="opacity-50 mb-1">bulk-export.spec.md</div>
    <div>Inherits: platform-constraints</div>
    <div>rate limit: <b>5000</b>/hour</div>
    <div class="text-green-700 dark:text-green-400 mt-1"># overrides platform default:</div>
    <div class="text-green-700 dark:text-green-400"># batch, not interactive</div>
  </div>
</div>

<div class="callout-good mt-2 text-sm"><b>5000 wins.</b> Rule 1: specific beats general, because it <i>says</i> so.</div>

<div class="grid grid-cols-2 gap-4 mt-6 text-xs font-mono">
  <div class="p-3 rounded bg-gray-100 dark:bg-gray-800">
    <div class="opacity-50 mb-1">platform-constraints.spec.md</div>
    <div>rate limit: <b>1000</b>/hour</div>
  </div>
  <div class="p-3 rounded bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400">
    <div class="opacity-50 mb-1">reporting.spec.md</div>
    <div>Inherits: platform-constraints</div>
    <div>rate limit: <b>5000</b>/hour</div>
    <div class="opacity-40 mt-1">&nbsp;</div>
    <div class="opacity-40">&nbsp;</div>
  </div>
</div>

<div class="callout-bad mt-2 text-sm"><b>Neither wins.</b> Rule 3: escalate. This is not an override, it is a contradiction that nobody noticed.</div>

<div class="mt-6 text-center text-lg">
The difference is <b>two comment lines</b>. Those lines are the decision.
</div>

<!--
This is the slide that makes rule 1's "explicitly" caveat land. Prose cannot do
it: the two cases are IDENTICAL except for a comment, and only seeing them side
by side makes that visible.

Walk it in this order. Read the left column once, it is the same in both. Then
the top right, then the verdict. Then the bottom right, and pause BEFORE the
verdict so the room can spot the difference themselves. Somebody usually does.

The point to land: the second file is not wrong because 5000 is wrong. It may be
exactly the right number. It is wrong because nobody can tell whether it is a
decision or a mistake, and a spec that cannot distinguish those two is not doing
its job.

Practical consequence worth saying out loud: this is why an override needs a
reason, not just a value. "5000" is a number. "5000, because batch is not
interactive" is a decision someone can disagree with.
-->

---

# Four things people call "the spec"

<div class="mt-6">

| | Answers | Lifespan | Owner |
|---|---|---|---|
| **PRD** <span class="text-xs opacity-60">(Product Requirements Document - Ürün gereksinim dokümanı)</span> | Why, and for whom | Quarters | Product |
| **Spec** | What becomes true | Months | Whoever changes it next |
| **Plan** | How, in order | Days | The implementer |
| **Task** | One step | Hours | Whoever picks it up |

</div>

<div class="callout-bad mt-8 text-sm">
<b>The most common beginner error is writing one where another belongs</b>, usually a task where a spec goes, because tasks feel concrete and specs feel vague.
</div>

<!--
Altitude confusion is expensive in a specific way: a task written where a spec
belongs locks in an implementation before anyone has agreed what the thing
should do, and it is nearly impossible to notice afterwards because the artifact
looks rigorous.
-->

---

# Altitude confusion, in the wild

<div class="grid grid-cols-2 gap-6 mt-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">A task wearing a spec's clothes</div>
    <div class="mt-2 font-mono text-xs">"Add a revoked_at column to api_keys and check it in ValidateKey()"</div>
    <div class="mt-2">Decides the schema and the call site before anyone said what revocation means.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">A PRD wearing a spec's clothes</div>
    <div class="mt-2 font-mono text-xs">"Customers need confidence that compromised keys can be dealt with quickly"</div>
    <div class="mt-2">True, unbuildable, and impossible to reject.</div>
  </div>
</div>

<div class="callout-good mt-6 text-sm">
<b>The spec sits between them:</b> "A revoked key must stop authenticating within 30 seconds. Revocation is irreversible. Keys revoked mid-rotation must not invalidate their replacement."
</div>

<!--
Walk all three out loud. The middle one is the hardest to write and the only one
that can be both agreed and executed.
-->

---

# The precision budget

<div class="mt-8 text-xl">Over-specification is a failure mode, not diligence.</div>

<div class="mt-8 text-sm opacity-90">
Specify <b>intent and constraints</b>. Leave implementation judgment to the implementer, human or otherwise.
</div>

<div class="callout-bad mt-8">
A spec that is harder to maintain than the code it produces has failed, no matter how complete it is.
</div>

<div class="mt-6 text-sm">
A division of labour: the spec owns <i>what must be true</i>, the implementer owns <i>how</i>. Cross the line and you own both, forever.
</div>

<div class="callout-good mt-6 text-sm">
<b>But a constraint about anticipated change is in budget, not out.</b><br/>
"Adding a notification channel must not require editing <code>AssignJobService</code>" is testable, names no pattern, and leaves the design open. <b>"Use the Strategy pattern with an abstract base class"</b> is out: that is the implementer's call.
</div>

<!--
Module 4 depends on this slide. If authors leave implementation judgment out of
the spec -- and they should -- then somebody must still review the region the
spec deliberately does not cover. That is where security, concurrency and
error-path defects live, and module 4 assigns it explicitly.

Defend this slide against the obvious wrong repair, which is "then specify
security in the spec too."

The green box exists because of a real counterexample. Ask an agent to add a
per-user notification preference and its default output is an if/else branch
inside the service -- a design that rots on the next channel. Without that box,
"leave implementation judgment out" reads as licensing the rot, and a sharp
participant will say so. WITH it, the answer is: name the constraint, not the
pattern. The constraint is spec altitude; the pattern is not.
-->

---

# How over-specification actually happens

<div class="mt-6 text-sm opacity-90">Nobody decides to over-specify. It accretes, one reasonable addition at a time.</div>

<div class="mt-8 space-y-3 text-sm">
  <div class="callout-key"><b>Week 1:</b> "The spec should say which library, we wasted a day on that."</div>
  <div class="callout-key"><b>Week 6:</b> "The spec should say the error message text, support complained."</div>
  <div class="callout-bad"><b>Week 14:</b> "The spec should say the log format." Now every log change is a spec change.</div>
  <div class="callout-bad"><b>Week 30:</b> Nobody writes specs. They are too expensive, and the ones that exist are wrong.</div>
</div>

<div class="mt-6 text-sm opacity-75">Each step was locally correct. The trajectory was not.</div>

<!--
Ask the room where they would have stopped. The honest answer is that you cannot
tell locally -- which is why the test is the precision budget, not judgment in
the moment: does this belong to WHAT MUST BE TRUE, or to HOW.
-->

---

# The ladder · rung one

<div class="callout-bad mt-8 !text-lg">
"Make key rotation better"
</div>

<div class="mt-8 text-sm opacity-90">
No subject, no failure condition, no reader who could reject it. Every reader agrees, and no two agree about the same thing.
</div>

<div class="mt-8 text-sm">First question: <b>better than what, for whom?</b></div>

<!--
Do this live, rewriting on screen, one rung per click. The room should watch a
sentence get sharper four times -- reading four finished rungs off a slide
teaches nothing.

This is the ladder's only pass before Lab 1.
-->

---

# The ladder · rungs two and three

<div class="mt-6 space-y-6">
  <div class="callout-bad">
    <div class="text-xs font-bold opacity-60">RUNG 2 · has a subject</div>
    <div class="mt-1">"Customers should be able to rotate a key without downtime."</div>
    <div class="text-xs mt-2 opacity-75">Better. Still unbuildable: what is downtime, and how long may the old key live?</div>
  </div>
  <div class="callout-key">
    <div class="text-xs font-bold opacity-60">RUNG 3 · has a mechanism</div>
    <div class="mt-1">"When a key is rotated, the old key keeps working for an overlap period so callers can migrate."</div>
    <div class="text-xs mt-2 opacity-75">Buildable now, but two people will pick different overlaps and both will be right.</div>
  </div>
</div>

<!--
Rung 3 is where most teams stop, and it is the most dangerous rung: it reads as
finished. Two implementers will produce different systems and neither will have
violated it.
-->

---

# The ladder · rung four

<div class="callout-good mt-8">
<div class="text-xs font-bold opacity-60">ACCEPTANCE CRITERION</div>
<div class="mt-2 text-lg">"After rotation, the previous key continues to authenticate for exactly 24 hours, then fails with <code>401 key_expired</code>. A key revoked during that window stops authenticating within 30 seconds and does not affect its replacement."</div>
</div>

<div class="mt-8 grid grid-cols-3 gap-4 text-sm">
  <div class="callout-key"><b>Can fail</b><br/>25 hours later it must be dead</div>
  <div class="callout-key"><b>Names the observable</b><br/><code>401 key_expired</code>, not "an error"</div>
  <div class="callout-key"><b>Covers interaction</b><br/>revocation × rotation, the case rung 3 hid</div>
</div>

<!--
Point out what rung 4 still does NOT say: nothing about tables, caches, or where
the check lives. That is the precision budget holding. The criterion is
executable and the implementation is open -- that combination is the target.
-->

---

# Üç spec. Aynı feature.

<div class="mt-4 text-sm opacity-75">Anahtar rotasyonu. Üç farklı yazar. Üçü de işe başlamak için yeterli bulunmuş.</div>

<div class="grid grid-cols-3 gap-3 mt-5 text-xs">
  <div class="p-3 rounded bg-gray-100 dark:bg-gray-800">
    <div class="font-bold mb-2">A</div>
    <div class="opacity-80">Rotasyon hızlı olmalı.</div>
    <div class="opacity-80 mt-1">Mevcut entegrasyonlar çalışmaya devam etmeli.</div>
    <div class="opacity-80 mt-1">Hataları uygun şekilde ele al.</div>
    <div class="opacity-80 mt-2"><b>Kabul:</b> QA rotasyonun uçtan uca çalıştığını doğrular.</div>
  </div>
  <div class="p-3 rounded bg-gray-100 dark:bg-gray-800">
    <div class="font-bold mb-2">B</div>
    <div class="opacity-80"><code>api_keys</code> tablosuna <code>rotated_from</code> ve <code>overlap_expires_at</code> kolonlarını ekle.</div>
    <div class="opacity-80 mt-1"><code>ValidateKey()</code> içinde, <code>revoked_at IS NULL</code> ve (<code>expires_at &gt; now()</code> veya <code>overlap_expires_at &gt; now()</code>) ise kabul et.</div>
    <div class="opacity-80 mt-1"><code>rotated_from</code> üzerine index ekle.</div>
  </div>
  <div class="p-3 rounded bg-gray-100 dark:bg-gray-800">
    <div class="font-bold mb-2">C</div>
    <div class="opacity-80"><b>Non-goals:</b> otomatik rotasyon. Zaten iptal edilmiş anahtarı rotate etmek.</div>
    <div class="opacity-80 mt-1">Overlap sırasında iptal edilen anahtar <b>30 saniye</b> içinde durur ve yerine geçeni etkilemez.</div>
    <div class="opacity-80 mt-1"><b>Açık soru:</b> Enterprise müşteriler 24 saatten uzun overlap alır mı? Ürün karar verecek.</div>
  </div>
</div>

<div class="callout-bad mt-5 text-sm">
One of these three looks the most professional of the group and is <b>not</b> the best one.
</div>

<!--
The three columns are in Turkish on purpose. This lab asks the room to judge
subtle quality differences under time pressure; doing that in a second language
measures English comprehension, not spec reading. The chrome stays English like
the rest of the deck, the material to be judged does not.

The handout must match. If the paper is English while the screen is Turkish, the
room reads the same three specs twice in two languages, which is worse than
either choice alone.

Do not read these columns aloud. They are a taste, not the material: the full
specs are on the handout, and nobody can read three specs off a projector.

What the columns must do in five seconds is show these are three different KINDS
of document, not three drafts of the same one. A is adjectives. B is schema. C is
boundaries plus an unresolved question.

Hand the paper out BEFORE this slide. The screen is the framing, the paper is the
exercise.
-->

---

# Lab 1 · Hangisini almak isterdiniz?

<div class="mt-4 text-sm opacity-90">
Bu üçünden biri size verilecek ve onunla inşa edeceksiniz.
</div>

<div class="mt-6 space-y-3 text-sm">
  <div class="callout-key"><b>1 ·</b> Sıralayın. Hangisini almak istersiniz, hangisi size en pahalıya patlar? Birinciyi ikinciden ayıran şeyi <b>tek cümlede</b> söyleyebilecek durumda olun.</div>
  <div class="callout-key"><b>2 ·</b> En kötüsünde <b>üç belirsizlik</b> bulun. Belirsizlik: iki yetkin insanın farklı şeyler inşa edeceği ve ikisinin de savunabileceği yer.</div>
  <div class="callout-key"><b>3 ·</b> Bulabildiğiniz en zayıf kabul kriterini alın ve <b>bir testin yanlış olduğunu yakalayabileceği</b> hâle getirin.</div>
</div>

<div class="callout-bad mt-6 text-sm">
Bu üçünden biri <b>en profesyonel görünen ve en iyisi olmayan.</b> Hangisi olduğunu ve nedenini bulmak egzersizin kendisi.
</div>

<!--
The old version listed three tasks and never said what the exercise was FOR. It
read as busywork, and the point only arrived in the debrief.

The red box is the fix. It does not say WHICH spec is the trap, so nothing is
spoiled, but it turns a mechanical ranking into a hunt. The skill being taught is
not "spot the trap blind", it is "know that precision can mislead you", and
people only exercise that if they know to look.

Roughly half the room ranks B first, and that disagreement IS the lab. Get a
defence of B out loud before giving the answer; it is usually a good defence,
because B genuinely is more precise in the places it covers.

The sentence to land at the end: precision at the wrong altitude is not quality.

Senior variant is on the handout, not the slide. Point at it, do not read it.
-->