# 200,000 lines. No docs. "Just add the feature."

<div class="mt-10 text-sm opacity-90">
Three tests exist. They assert nothing. The last person who understood the billing path left in 2023.
</div>

<div class="callout-bad mt-8">
There is no spec here to drift from. Everything the last four modules taught assumed a starting point that does not exist.
</div>

<div class="callout-key mt-6 text-sm">
<b>Legacy is not about age.</b> A system is legacy when understanding it requires historical knowledge that exists nowhere except inside the tangled logic of the code. That is the deletion test failing, stated as a definition.
</div>

<div class="mt-4 text-sm opacity-75">
And it used to take years. <b>An agent can now produce a thousand lines and start patching them in a single afternoon</b>, the same failure mode at a speed that outruns anyone's ability to write down why.
</div>

<!--
This is the situation nearly everyone in the room returns to on Monday, and it
is the question most SDD material refuses to answer. Say that out loud -- it
buys you the room's attention for the next fifty minutes.

THE LEGACY DEFINITION IS THE SLIDE. "Not about age" reframes the whole module:
a repository written last month can be legacy, and a twenty-year-old one with
good specs is not. It is also module 0's deletion test restated as a definition
rather than a test, so the room should recognise it.

Adapted from Fowler's Phoenix Architecture, which puts it as: a system becomes
legacy because understanding it requires historical knowledge no longer
documented anywhere except in the tangled logic of the code.

The afternoon line is the one that lands hardest with this audience. Legacy used
to be something you inherited. It is now something you can create before lunch,
and the mechanism is exactly what makes agents feel productive -- mutation is
frictionless, so nobody stops to write down why.
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

<div class="mt-10 text-xl">The unit of specification is <b>the change</b>, not the codebase.</div>

<div class="callout-bad mt-10">
<b>The project that always dies:</b> six months to specify the whole legacy system. Nobody reads it. It is stale on delivery.
</div>

<div class="callout-good mt-6">
<b>The ratchet that works:</b> every module you touch leaves a spec behind. Coverage grows along the paths that get traffic, not by project plan.
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
The output matters less than step 2. You are not getting a document. You are getting a list of the things you knew and never wrote down.
</div>

<!--
Emphasise that the draft being WRONG is not a failure of the method. A draft
that needed no correction would mean the code already told the whole story, in
which case you did not need archaeology.
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

<div class="mt-8 text-lg">Pin current behaviour, <b>bugs included</b>, before changing anything.</div>

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

If someone notices this is the same shape as the wrong-spec case module 4 triages --
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
There are linters for this file now: <code>npx ecc-agentshield</code> checks <code>CLAUDE.md</code> and <code>.cursorrules</code> against about a hundred security rules.
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
  <div class="callout-good"><b>3 ·</b> Characterization test for the period boundary. It passes, pinning the bug.</div>
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

# Lab 5 · Önce karakterize edin, sonra delta-spec

<div class="mt-4 text-sm opacity-90">
Elinizdeki kâğıtta, az önce baktığımız billing sisteminden <b>gerçek bir fonksiyon</b> var. Spec'i yok. Dokümantasyonu yok. Adını anan <b>tek bir test</b> var.
</div>

<div class="mt-6 space-y-3 text-sm">
  <div class="callout-key"><b>1 ·</b> Hiçbir şeyi değiştirmeden <b>önce</b> yazacağınız characterization testlerini listeleyin.</div>
  <div class="callout-key"><b>2 ·</b> Değişiklik için kabul kriterlerini yazın: <b>fail edebilecek</b> olan kısmı.</div>
</div>

<div class="callout-bad mt-6 text-sm">
<b>Erken bitirirseniz:</b> altıncı dakikada dağıtılan kartı çevirin.
</div>

<!--
The senior variant has no clean answer and that is deliberate. The useful
responses all involve making it a decision rather than a correction: pin the
bug, write the delta-spec for the correct behaviour, name who decided, and record
what happens to historical data.

The answer people give first -- "just fix it" -- is exactly what silently
rewrites years of invoices.

The card at six minutes carries the bug hint. Do not hand it out early and do not
hint at it verbally; the sheet has to stay solvable on its own until then.

DEBRIEF -- under ~15: ask for the test list first, then ask the bug question and
let two people disagree. Above 15: take the test list from volunteers and pose
the bug question rhetorically, then answer it. The disagreement is better but it
does not scale past about fifteen people.
-->
