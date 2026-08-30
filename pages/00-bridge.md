# The agent built the wrong thing

<div class="mt-8 text-2xl opacity-90">Flawlessly.</div>

<div class="mt-12 grid grid-cols-2 gap-6">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">What we reviewed</div>
    <div class="text-sm mt-1">2,400 lines of clean, tested, idiomatic code</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">What nobody reviewed</div>
    <div class="text-sm mt-1">The three sentences that told it what to build</div>
  </div>
</div>

<!--
Open cold. No agenda slide, no introductions beyond your name.

Ask the room by show of hands: who has shipped something correct that was not
what was wanted? Every hand goes up. That is the day's subject, and asking it
before you have explained anything is what makes the rest land.
-->

---

<h1 class="!text-xl">Twelve leverage points</h1>

<p class="!text-xs !leading-tight opacity-75">From Donella Meadows' systems theory. Changes near the top cascade through the whole system; changes at the bottom stay local. Today operates the six in bold.</p>

| # | Leverage point | The question |
|---|---|---|
| 12 | **Context** | What does the agent actually know? |
| 11 | Model | Cost, speed, intelligence tradeoffs? |
| 10 | Prompt | Are the instructions concrete? |
| 9 | Tools | Which actions, in what form? |
| 8 | Standard&nbsp;output | Can anyone see what happened? |
| 7 | Types | Is typing consistent and enforced? |
| 6 | **Documentation** | Can agents navigate it? |
| 5 | **Tests** | Help, or theatre? |
| 4 | Architecture | Is it agentically intuitive? |
| 3 | **Plans** | Can they complete without more input? |
| 2 | **Templates** | What does good output look like? |
| 1 | **ADWs** | How does work flow? |

<!--
Do not teach all twelve. Name the six in bold as today's territory and say
plainly that the other six ship as optional reading. The room does not need
them, and saying so out loud buys credibility for everything that follows.

Meadows' point is the ordering itself: intervening at #1 changes everything
downstream; fixing #12 changes one conversation.
-->

---

# 12 · Context

**What does the agent actually know at the moment it decides?**

<div class="mt-6 text-sm opacity-90">
A spec is the highest signal-to-noise context you can hand an agent. Everything else you might load competes with it for the same budget.
</div>

<div class="grid grid-cols-2 gap-4 mt-8">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Bad</div>
    <div class="text-sm mt-1">Load all the documentation<br/>500k+ tokens, most of it irrelevant</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Good</div>
    <div class="text-sm mt-1">The spec for this change, plus the specs it points at<br/>15k tokens, high signal</div>
  </div>
</div>

<!--
This is the bridge from the prerequisite deck into today. Context is where
specs earn their place: not as documentation, as the highest-value thing you
can put in front of a decision.
-->

---

# 6 · Documentation

**Can an agent navigate it, and does it still describe reality?**

<div class="mt-6 text-sm opacity-90">Two failure modes, and only one of them is visible.</div>

<div class="grid grid-cols-2 gap-4 mt-8">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Unnavigable</div>
    <div class="text-sm mt-1">Correct, complete, and in a wiki nobody links to. The agent never finds it.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Silently stale</div>
    <div class="text-sm mt-1">Found, read, trusted — and wrong. Worse than absent, because it is believed.</div>
  </div>
</div>

<div class="callout-key mt-6 text-sm">
Module 4 gives this a name: <b>spec drift</b>, the default state of any document not defended by process.
</div>

<!--
Plant the vocabulary here so module 4 can say "drift" without re-explaining it.
Stale documentation is worse than none: absent docs make an agent ask, wrong
docs make it confident.
-->

---

# 5 · Tests

**Do they help, or are they theatre?**

<div class="grid grid-cols-2 gap-4 mt-8">
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Helps</div>
    <div class="text-sm mt-1">Failure names the behaviour that broke. An agent can act on the message alone.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Theatre</div>
    <div class="text-sm mt-1">Passes without validating anything. Coverage tooling reports the method as tested.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-75">
You will meet a real one this afternoon — a test named after the method it does not test.
</div>

<!--
Do not show the example yet. Module 4 shows it and module 5 finds it in the
legacy repository; the forward reference is enough here.

The test in question captures an exception, never inspects it, and asserts a
tautology. Its name mentions the buggiest function in the codebase.
-->

---

# 3 · Plans

**Can a plan complete with zero further input?**

<div class="mt-6 text-lg">
That is the whole test. Not "is it detailed" — <b>can it run without you in the room.</b>
</div>

<div class="grid grid-cols-2 gap-4 mt-8">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Not a plan</div>
    <div class="text-sm mt-1">"Refactor the auth module, add tests, update docs"</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">A plan</div>
    <div class="text-sm mt-1">Ordered steps, each carrying its own verification and its own definition of done</div>
  </div>
</div>

<div class="mt-6 text-sm opacity-75">The highest leverage point today's material actually operates. Module 3 spends seventy minutes here.</div>

<!--
Resist explaining why now. Module 3 derives every rule in this area from a
single fact about executors, and stating the conclusion here would spend the
derivation's surprise.
-->

---

# 2 · Templates

**Does the agent know what good output looks like?**

<div class="mt-6 text-sm opacity-90">
A template is a worked example with the variable parts removed. It answers a question no instruction can: <i>what shape should the answer have?</i>
</div>

<div class="callout-key mt-8">
<div class="font-bold">The failure mode is bloat.</div>
<div class="text-sm mt-1">Every incident adds a section. Nothing ever removes one. Eventually filling in the template costs more than the work it governs — and that is over-specification, which module 6 names as an anti-pattern.</div>
</div>

<!--
The spec anatomy template you hand out in module 1 is subject to this exact
decay. Say so when you hand it over: seven sections, and the bar for an eighth
is a failure it would have prevented.
-->

---

# 1 · ADWs

**How does work flow between agents?**

<span class="text-sm opacity-75">The highest leverage point in the framework.</span>

<div class="grid grid-cols-2 gap-4 mt-8">
  <div class="callout-key">
    <div class="font-bold">Deterministic workflow</div>
    <div class="text-sm mt-1">You decide the control flow. Repeatable, debuggable, rigid.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Agentic orchestration</div>
    <div class="text-sm mt-1">The agent decides. Flexible, and hard to explain after it goes wrong.</div>
  </div>
</div>

<div class="mt-8 text-sm">
The unsolved problem in both: <b>handoff</b>. What agent B knows about agent A's work is exactly what agent A wrote down.
</div>

<!--
That last sentence is the seed for module 3's declared-interfaces beat. It is
also literally true of this training's own construction: the plan that built
today's legacy repository failed to compile because it assumed a function
signature the generating step had not been told to produce. Tell that story if
the room needs a concrete one — it happened while making the material you will
use this afternoon.
-->

---

# Where this connects

<div class="grid grid-cols-2 gap-6 text-left mt-8">
  <div class="callout-key">
    <div class="font-bold text-blue-600 dark:text-blue-400 mb-2">Context, Documentation</div>
    <div class="text-sm">What the agent can know. Specs are the highest-value form of both.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold text-purple-600 dark:text-purple-400 mb-2">Tests</div>
    <div class="text-sm">The executable half of a spec. Module 1's acceptance criteria become module 3's test list.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400 mb-2">Plans, Templates, ADWs</div>
    <div class="text-sm">The three highest points, and the three this day actually operates.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold text-orange-600 dark:text-orange-400 mb-2">Source</div>
    <div class="text-sm">Donella Meadows, <i>Leverage Points: Places to Intervene in a System</i> (1999)</div>
  </div>
</div>

<!--
Close the bridge here. The next four slides change the question from "where do
I intervene" to "where does the truth live" — and that is the actual subject of
the day.
-->
