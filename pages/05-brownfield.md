# 200,000 lines. No docs. "Just add the feature."

<div class="mt-10 text-sm opacity-90">
Three tests exist. They assert nothing. The last person who understood the billing path left in 2023.
</div>

<div class="callout-bad mt-10">
There is no spec here to drift from. Everything the last four modules taught assumed a starting point that does not exist.
</div>

<!--
This is the situation nearly everyone in the room returns to on Monday, and it
is the question most SDD material refuses to answer. Say that out loud -- it
buys you the room's attention for the next fifty minutes.
-->

---

# Why greenfield advice fails here

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">"Write the PRD"</div>
    <div class="mt-1">For a system that already exists and already has users. There is no product decision to make.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">"Design the architecture"</div>
    <div class="mt-1">It has one. Nobody chose it, and nobody can describe it.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">"Write acceptance criteria"</div>
    <div class="mt-1">Against what? Current behaviour is <b>unknown to its own owners</b>.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">"Spec the system"</div>
    <div class="mt-1">Six months. Nobody reads it. Stale on delivery.</div>
  </div>
</div>

<!--
The fourth is the one teams actually attempt, and it is the one that poisons SDD
for an entire organisation when it fails. Name it now; module 6 names it again as
an anti-pattern.
-->

---

# Spec the delta, not the system

<div class="mt-10 text-xl">The unit of specification is <b>the change</b> — not the codebase.</div>

<div class="callout-bad mt-10">
<b>The project that always dies:</b> six months to specify the whole legacy system. Nobody reads it. It is stale on delivery.
</div>

<div class="callout-good mt-6">
<b>The ratchet that works:</b> every module you touch leaves a spec behind. Coverage grows along the paths that get traffic — not by project plan.
</div>

<!--
This is the single most useful sentence a participant carries into Monday, and
the only honest answer to the situation nearly all of them return to.

If this module runs long, cut anything else. Not this slide.
-->

---

# Spec archaeology

<div class="mt-8 text-lg">Hand the code to an agent. Ask it to write down what the system does <b>today</b>.</div>

<div class="mt-8 grid grid-cols-3 gap-4 text-sm">
  <div class="callout-key"><b>1 · It drafts</b><br/>A behavioural spec, from implementation, in minutes rather than weeks</div>
  <div class="callout-good"><b>2 · You correct</b><br/>The draft is confidently wrong in places only you can see</div>
  <div class="callout-good"><b>3 · The corrections are the value</b><br/>Each one is undocumented knowledge, made explicit for the first time</div>
</div>

<div class="mt-8 text-sm opacity-90">
The output matters less than step 2. You are not getting a document — you are getting a list of the things you knew and never wrote down.
</div>

<!--
Emphasise that the draft being WRONG is not a failure of the method. A draft
that needed no correction would mean the code already told the whole story, in
which case you did not need archaeology.
-->

---

# Where to start · the deletion test, third form

<div class="mt-8 text-lg">Run it across a legacy repository and it fails <b>everywhere</b>.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Useless as a verdict</div>
    <div class="mt-1">"Nothing passes" tells you what you already knew.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Excellent as a ranking</div>
    <div class="mt-1">Where it fails <b>hardest</b> — code whose behaviour nobody could reconstruct from anything written down — is where archaeology pays first.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
This is the honest answer to "where do I even start", which is the question this module exists to answer.
</div>

<!--
Third appearance of the morning's question. Say so explicitly -- the room should
recognise it. Module 0 asked whether the spec is the source; module 4 asked
whether a defect is a spec defect; this asks which gap to close first.
-->

---

# What archaeology finds, and in what order

<div class="mt-6 text-sm opacity-75">Measured on the repository you are about to see.</div>

<div class="mt-6 space-y-3 text-sm">
  <div class="callout-good">
    <div class="font-bold">Local defects come free</div>
    <div class="mt-1">Contradictory overloads, a comment that lies, a wrong comparison operator. One file, one expression. Found while building a normal picture.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Cross-file defects need adversarial reading</div>
    <div class="mt-1">Two individually-correct-looking lines, sixty lines apart. Found only by deliberately looking for contradiction.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold">Absences are found last, or never</div>
    <div class="mt-1">That nothing can create an invoice line. That every validation error returns HTTP 200 invisibly. Found on a <b>third</b> pass, after already believing the system was understood.</div>
  </div>
</div>

<div class="mt-6 text-sm opacity-90"><b>The defects a spec would have caught are precisely the ones code reading finds last.</b></div>

<!--
This is empirical, from a real archaeology run on the repository in the next
slide -- not a claim. Say so; it is much stronger as a measurement than as an
opinion.

It is also this module's strongest argument for writing specs at all, and it
lands better here than as an assertion in module 0.
-->

---

# Characterization tests

<div class="mt-8 text-lg">Pin current behaviour — <b>bugs included</b> — before changing anything.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-good">
    <div class="font-bold">What it buys</div>
    <div class="mt-1">A safety net without first understanding the whole system. You can change code you do not understand, and know when you changed something you did not mean to.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">What it is not</div>
    <div class="mt-1">A statement that the behaviour is correct. It is a statement that it is <b>current</b>.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
This is the cheapest way to make a legacy change safe, and it works before any spec exists.
</div>

<!--
The distinction in the right box is the one people get wrong. A characterization
test is a record, not an endorsement -- and a suite of them is a description of
the system, which is the beginning of a spec.
-->

---

# Pinning a bug on purpose

```csharp
// Characterization: pins CURRENT behaviour, bug included. Do not "fix" this test.
[Fact]
public void BoundaryLine_IsBilledInBothAdjacentPeriods()
{
    var march = PeriodCalculator.GetLinesForPeriod(lines, Mar1, Apr1);
    var april = PeriodCalculator.GetLinesForPeriod(lines, Apr1, May1);

    Assert.Contains(march, l => l.Id == 2);
    Assert.Contains(april, l => l.Id == 2);   // the same line, billed twice
}
```

<div class="mt-6 text-sm opacity-90">
Both ends of the comparison are inclusive. A line at exactly the period boundary is billed in <b>both</b> months. Some customer has been overcharged for years.
</div>

<div class="callout-bad mt-6 text-sm">
So do you fix it? And what do you write down either way?
</div>

<!--
Do not answer the question. It is Lab 5's senior variant.

For your reference: fixing it silently changes historical invoices. The
defensible move is to pin it, write the delta-spec for the correct behaviour,
and make the change a DECISION with a date and an owner rather than a quiet
correction.

If someone notices this is the same shape as module 4's planted false premise --
an off-by-one on a window boundary, three hours earlier -- that is the connection
landing. Do not point at it first.
-->

---

# The cheapest first artifact

<div class="mt-8 text-lg">A <code>CLAUDE.md</code> at the repository root.</div>

<div class="mt-8 text-sm opacity-90">
Not a specification. A map: what this system is, which paths matter, what is load-bearing, what is known-broken, and what not to touch.
</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-good">
    <div class="font-bold">Highest return per hour available</div>
    <div class="mt-1">An afternoon. Every agent session and every new joiner benefits from it immediately.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">And it is the entry point</div>
    <div class="mt-1">Spec coverage grows from it. The first thing it should say is where the specs are.</div>
  </div>
</div>

<div class="mt-6 text-xs opacity-60">
There are linters for this file now — <code>npx ecc-agentshield</code> checks <code>CLAUDE.md</code> and <code>.cursorrules</code> against about a hundred security rules.
</div>

<!--
The repository they are about to see does not have one. That absence is
deliberate and it is the first thing to point at in the demo -- before opening a
single source file, note what is not there.

The linter footnote is worth a sentence: if you are going to tell a room to write
a CLAUDE.md, telling them something checks it is the difference between advice
and a practice.
-->

---

# Seam finding

<div class="mt-8 text-lg">Specs need edges. Legacy code hides them.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Why you cannot spec it yet</div>
    <div class="mt-1">A 900-line controller doing routing, validation, persistence, formatting and notification in single methods. There is no boundary to draw a spec around.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">And mutable global state</div>
    <div class="mt-1">Configuration read inline from seven places across four files. Any boundary you draw leaks.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
Finding the seam is usually the work. Once a boundary exists, specifying it is the easy part.
</div>

<!--
Both examples are literally in the repository they will see. Do not abstract
them -- open the file.
-->

---

# The incremental ratchet

<div class="mt-8 text-lg">Every module you touch leaves a spec behind.</div>

<div class="mt-8 grid grid-cols-3 gap-4 text-sm">
  <div class="callout-key"><b>Coverage follows traffic</b><br/>The code that changes often gets specified first, because that is the code you keep touching</div>
  <div class="callout-key"><b>No project needed</b><br/>No budget line, no migration plan, nothing to get cancelled in Q3</div>
  <div class="callout-good"><b>It compounds</b><br/>Each spec makes the next change cheaper, in exactly the area where changes are frequent</div>
</div>

<div class="mt-8 text-sm opacity-90">
After a year the specified fraction is small and it is <b>the fraction that matters</b>, because it was selected by where the work actually went.
</div>

<!--
The counter-argument is real and worth pre-empting: this leaves the quiet,
dangerous corners unspecified forever. True -- and those corners are also the
ones nobody is changing, which is where the risk is lowest. The ratchet is a
prioritisation, not a promise of coverage.
-->

---

# The anti-pattern

<div class="callout-bad mt-10 !text-xl">
"Let's spec the whole legacy system first."
</div>

<div class="mt-10 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold">Why it is attractive</div>
    <div class="mt-1">It feels thorough. It is easy to plan. It produces a deliverable everyone can point at.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold">Why it dies</div>
    <div class="mt-1">Six months of writing about code nobody is changing. Stale before it ships. Nobody reads it. And SDD is now discredited for that whole organisation.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
Name it out loud so that when someone proposes it in three weeks, the room has a word for it.
</div>

<!--
This is the failure that poisons adoption most reliably, because it fails
expensively and publicly and the conclusion everyone draws is "specs do not work
here".
-->

---

# Demo · one delta-spec cycle

<div class="mt-8 space-y-3 text-sm">
  <div class="callout-key"><b>1 ·</b> Note what is <b>absent</b>. No <code>CLAUDE.md</code>. A README with two commands in it.</div>
  <div class="callout-key"><b>2 ·</b> Archaeology on the billing path. Read the draft. Correct it out loud.</div>
  <div class="callout-good"><b>3 ·</b> Characterization test for the period boundary. It passes — pinning the bug.</div>
  <div class="callout-good"><b>4 ·</b> Delta-spec for one change: <i>bill each line in exactly one period.</i></div>
  <div class="callout-key"><b>5 ·</b> Implement. The characterization test now fails, and that failure is the <b>evidence</b>.</div>
</div>

<div class="mt-6 text-sm opacity-90">Twenty minutes. The spec covers the change, not the system.</div>

<!--
Practical notes from the dry run:
  - Open Details directly. The invoice LIST page renders 0.00 for every row, an
    unrelated defect that will derail you for two minutes.
  - Port 5080. launchSettings advertises different ports and is wrong.
  - Step 5 is the payoff: a characterization test failing is the ONLY moment all
    day when a red test means success.
-->

---

# Lab 5 · Characterize, then delta-spec

<div class="mt-8 text-lg">A legacy function. Ten minutes.</div>

<div class="mt-8 space-y-3 text-sm">
  <div class="callout-key"><b>1 ·</b> List the characterization tests you would write <b>first</b>, before changing anything.</div>
  <div class="callout-key"><b>2 ·</b> Draft the delta-spec for the stated change.</div>
</div>

<div class="callout-bad mt-8 text-sm">
<b>If you finish early:</b> the function contains a subtle bug. Your characterization test will pin the buggy behaviour. What do you do — and what do you write down?
</div>

<!--
The senior variant has no clean answer and that is deliberate. The useful
responses all involve making it a decision rather than a correction: pin the
bug, write the delta-spec for the correct behaviour, name who decided, and record
what happens to historical data.

The answer people give first -- "just fix it" -- is exactly what silently
rewrites years of invoices.

DEBRIEF -- under ~15: ask for the test list first, then ask the bug question and
let two people disagree. Above 15: take the test list from volunteers and pose
the bug question rhetorically, then answer it. The disagreement is better but it
does not scale past about fifteen people.
-->
