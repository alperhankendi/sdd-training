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

---

# Rebuilding from a definition

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Snowflake</div>
    <div class="text-sm mt-1">Patched in place until nobody dares touch it</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Phoenix</div>
    <div class="text-sm mt-1">Destroyed and rebuilt from its definition</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">

Infrastructure settled this a decade ago. **Code has had the argument before — and lost it twice.**

- CASE tools and 4GLs, late 1980s
- MDA and round-trip UML, 2001–2008 — regeneration was cheap *and* deterministic, and it still lost
- It quietly **won** wherever the definition covers a narrow slice completely: protobuf, OpenAPI clients, GraphQL types, ORM migrations

</div>

<div class="callout-key mt-6 text-sm">
What changed is not the price of regeneration. It is the <b>medium of the definition</b> — natural language became executable, which widens the reachable slice from wire formats to behaviour. The price of that width is determinism.
</div>

<!--
Two minutes maximum. Someone in the room has lived MDA or 4GLs, and claiming
the argument never happened costs you the only thing this beat has, which is
credibility about why today is different. Say "lost it twice" out loud.

Cite Fowler, SnowflakeServer / PhoenixServer, 2012 -- that is the one
established anchor. Describe the code-side extension in plain words; do not
present it as a named methodology, because a term that survives no search
costs you credibility a second time.
-->

---

# The deletion test

<div class="text-xl mt-6">
If I deleted this module entirely, could I regenerate it — <b>correctly</b> — from its spec alone?
</div>

<div class="mt-4 text-sm opacity-75">Not "would the output be identical." Identity is not available and is not the point.</div>

<div class="callout-key mt-8">
<div class="font-bold">Ask it as an enumeration, not as a feeling:</div>
<div class="mt-2 text-lg">Name one thing you would have to know to rebuild this that the spec does not say.</div>
<div class="mt-2 text-sm opacity-75">If you can name one, it fails — and the thing you named is the backlog entry.</div>
</div>

<div class="mt-6 text-sm">Ask it in two sizes: <b>this module</b>, and <b>this boundary</b>. The knowledge least likely to be written down lives between modules.</div>

<!--
RUN IT IN THE ROOM. Ninety seconds. Laptops are open.

Ask everyone to pull up a repository they actually work on, pick one module,
and silently name one thing they would need that is written down nowhere.
Then: "hands up if you could NOT name one." Almost no hands go up. That is the
lesson, and it lands on their own code rather than on this slide.

Give anyone without a repo the running example rather than letting them sit out.

Do NOT collect answers publicly. The exercise works because it is
uncomfortable, and naming a colleague's undocumented module in front of the
room converts insight into defensiveness. Show of hands only.

Say plainly that the test is literally runnable: delete it, hand a fresh agent
the spec, diff the behaviour.
-->

---

# What a failure means

<div class="text-lg mt-6">
The code holds knowledge that exists <b>nowhere else</b>.
</div>

<div class="mt-4 text-sm opacity-90">Every piece of it is a single point of failure living in one person's head — or in nobody's.</div>

<div class="callout-bad mt-10 !text-lg">
You have been maintaining the binary and calling it the source.
</div>

<div class="mt-10 grid grid-cols-2 gap-4 text-sm">
  <div class="callout-key">
    <div class="font-bold">It is a gradient, not a gate</div>
    <div class="mt-1">Almost nothing passes today. The questions are <i>what fraction</i> and <i>which knowledge</i>.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">Not every failure is debt</div>
    <div class="mt-1">Spec debt only when the missing knowledge is <b>intent or constraint</b>. When it is implementation judgment, the spec is right and the test is <i>supposed</i> to fail there.</div>
  </div>
</div>

<!--
The right-hand box is not optional. Without it participants go home and seed
their backlog with precision-budget residue, which is over-specification -- an
anti-pattern module 6 names. It is also the earliest possible statement of
module 4's spec-defect / implementation-defect diagnostic.
-->

---

# The truth splits. It does not relocate.

<div class="grid grid-cols-2 gap-6 mt-10">
  <div class="callout-key">
    <div class="font-bold text-blue-600 dark:text-blue-400">Truth about intent</div>
    <div class="text-lg mt-2">moved to the spec</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Truth about this artifact</div>
    <div class="text-lg mt-2">never left the code, and never will</div>
  </div>
</div>

<div class="mt-10 text-lg">
So spec review is a review that was <b>missing</b> — not a review that replaces one.
</div>

<div class="mt-4 text-sm opacity-75">
And it is missing in the place where defects are cheapest to catch, which is where the least attention has historically been spent. That asymmetry is the whole shift.
</div>

<!--
Phrase this as a split, never as an either/or. Rooms keep climaxes and drop
caveats: an either/or here is what would make people stop reading diffs, seven
hours before module 4 has to undo it. Phrased as a split, module 4's review
beat inherits this vocabulary instead of correcting it.

The bound, stated now and not at 16:35: regeneration is nondeterministic and
yields a DIFFERENT defect set, not an empty one. The deletion test measures the
completeness of the spec. It says nothing about the correctness of any
particular generated artifact.
-->

---

# One question, three jobs

| Where | The question | What it decides |
|---|---|---|
| **Now** | Name one thing you'd need that the spec doesn't say | Is the spec the source, or is the code? |
| **Module 4** | Would fixing the spec and regenerating remove this defect? | Spec defect, or implementation defect |
| **Module 5** | Where does the test fail hardest here? | What archaeology must recover first |

<div class="callout-key mt-10 text-sm">
In infrastructure the definition is the Dockerfile, the Terraform module, the manifest.<br/>
<b class="text-lg">In code it is the spec.</b><br/>
Everything else today — anatomy, elicitation, plans, verification, brownfield — is the work of building and maintaining that definition.
</div>

<!--
This is the agenda slide, and it arrives here rather than at the start because
only now does the room know why it needs one.

The objection is coming, and it is the strongest one anyone will raise all day:
"if the spec is complete enough to regenerate from, it contains everything the
code contained -- you have rewritten the program in English. We tried this. It
was called MDA."

Do not improvise the answer. It is in the facilitator notes, and it turns on
the acceptance set: a spec does not determine the implementation, it determines
the SET of implementations that would be correct. Where that set has more than
one member, the spec is strictly smaller than the code. MDA failed because it
forced the set to a singleton. Then concede the cases where the set genuinely
IS a singleton -- and name them as module 6's "when not to do SDD".
-->
