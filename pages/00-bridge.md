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
| 1 | **ADWs** (AI Developer Workflows - Yapay zekâ geliştirici iş akışları) | How does work flow? |

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
    <div class="text-sm mt-1">Found, read, trusted, and wrong. Worse than absent, because it is believed.</div>
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
You will meet a real one this afternoon: a test named after the method it does not test.
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
That is the whole test. Not "is it detailed": <b>can it run without you in the room.</b>
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

<div class="mt-6 text-sm opacity-75">The highest leverage point today's material actually operates. An entire module is built on it, and the long demo produces one live.</div>

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
<div class="text-sm mt-1">Every incident adds a section. Nothing ever removes one. Eventually filling in the template costs more than the work it governs, and that is over-specification, which module 6 names as an anti-pattern.</div>
</div>

<!--
The spec anatomy template you hand out in module 1 is subject to this exact
decay. Say so when you hand it over: seven sections, and the bar for an eighth
is a failure it would have prevented.
-->

---

# 1 · ADWs (AI Developer Workflows - Yapay zekâ geliştirici iş akışları)

**How does work flow between agents?**

<span class="text-sm opacity-75">The highest leverage point in the framework. An ADW is the path a piece of work takes from request to merge: which agent touches it, in what order, and what each one hands the next.</span>

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
the room needs a concrete one: it happened while making the material you will
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
    <div class="text-sm">The executable half of a spec. Module 1's acceptance criteria become module 3's verify steps.</div>
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
I intervene" to "where does the truth live". That is the actual subject of
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

Infrastructure settled this a decade ago. **Code has had the argument before, and lost it twice.**

- CASE tools and 4GLs, late 1980s
- **MDA** (Model-Driven Architecture - Model güdümlü mimari) and round-trip UML (Unified Modeling Language - Birleşik modelleme dili), 2001–2008. You drew the model, it generated the code. Regeneration was cheap *and* deterministic, and it still lost
- It quietly **won** wherever the definition covers a narrow slice completely: protobuf, OpenAPI clients, GraphQL types, ORM migrations

</div>

<div class="callout-bad mt-6 text-sm">
And there is a reason code never had this argument: rewriting was <b>the most dangerous thing you could do.</b> "The Big Rewrite" entered the vocabulary as a warning, not a plan. Producing code was the bottleneck, and a rewrite spent the one thing you could not get back.
</div>

<div class="callout-key mt-4 text-sm">
What changed is not the price of regeneration. It is the <b>medium of the definition</b>: natural language became executable, which widens the reachable slice from wire formats to behaviour. The price of that width is determinism.
</div>

<!--
Two minutes maximum. Someone in the room has lived MDA or 4GLs, and claiming
the argument never happened costs you the only thing this beat has, which is
credibility about why today is different. Say "lost it twice" out loud.

Cite Fowler, SnowflakeServer / PhoenixServer, 2012 -- that is the one
established anchor.

THE BIG REWRITE box is this slide's missing bridge. Without it the slide asks
"why didn't code do the same?" and never answers. The answer is that a rewrite
spent the scarce resource. Every senior in the room has either lived one or been
warned off one, so the phrase does the work -- do not explain it.

It also states the day's premise in one move: if regeneration stops being
expensive, the rewrite stops being a gamble and becomes an operation. Say it,
then move. Do NOT let it turn into a debate about rewrites; module 4 shows what
regeneration does and does not fix.

EXPAND MDA OUT LOUD. Half the room has never heard of it, the other half lived
through it. For the first half an unexplained acronym makes the strongest
historical claim in the deck land as noise. One clause is enough:
"Model-Driven Architecture -- you drew the model, it generated the code."
The same objection returns by name in module 6, so the word has to mean
something by then. Describe the code-side extension in plain words; do not
present it as a named methodology, because a term that survives no search
costs you credibility a second time.
-->

---

# Code was never the asset

<div class="mt-4 text-sm opacity-75">The economic reframe underneath all of this.</div>

| | Traditional (mutation) | Phoenix (immutability) |
|---|---|---|
| **The asset is** | Lines of code, authored algorithms | Specifications, tests, system boundaries |
| **Legacy is created by** | Slow accumulation over years | Entropy reset on every regeneration |
| **Financial strategy** | Capitalise the codebase as IP (Intellectual Property - Fikri mülkiyet) | **Compaction**: keep conceptual mass small |
| **The developer's job** | Authoring and maintaining syntax | Stewardship, defining evaluation criteria |

<div class="callout-key mt-6 text-sm">
<b>Compaction is a cost strategy, not tidiness.</b> If a model writes the code but something must still <i>verify</i> it, then sheer volume is a liability. Smaller systems are cheaper to be sure about.
</div>

<div class="mt-4 text-xs opacity-60">
Adapted from Fowler's Phoenix Architecture. One row of the original, <i>"evolution method: complete regeneration from updated specs"</i>, overclaims. Module 4 corrects it.
</div>

<!--
This is the economics under the phoenix framing, and it is the slide a room of
senior people will argue with. Let them.

CODE AS A CACHE is the metaphor worth saying out loud: the files are a
materialised view of the system's current understanding -- useful while current,
disposable when stale. That is a friendlier framing than "binary" because a cache
is EXPECTED to go stale, and nobody feels insulted by it.

COMPACTION is the row that is new to this audience and it is the one to spend
time on. The argument is not aesthetic. If generation is cheap and verification
is not, then every line you keep is a line something must re-verify forever.
Volume moved from asset to liability, and most teams' instincts have not.

The bottom line is deliberate. The source prescribes never editing in place and
always regenerating the whole module. We are not teaching that, module 4 shows
why it is false, and saying so here -- while still crediting the source -- is
cheaper than being caught agreeing with something we later contradict.

Do NOT read the table aloud. Give them the two words -- asset, compaction -- and
let them read it.
-->

---

# The deletion test

<div class="text-xl mt-6">
If I deleted this module entirely, could I regenerate it, <b>correctly</b>, from its spec alone?
</div>

<div class="mt-4 text-sm opacity-75">Not "would the output be identical." Identity is not available and is not the point.</div>

<div class="callout-key mt-8">
<div class="font-bold">Ask it as an enumeration, not as a feeling:</div>
<div class="mt-2 text-lg">Name one thing you would have to know to rebuild this that the spec does not say.</div>
<div class="mt-2 text-sm opacity-75">If you can name one, it fails, and the thing you named is the backlog entry.</div>
</div>

<div class="mt-6 text-sm">Ask it in two sizes: <b>this module</b>, and <b>this boundary</b>. The knowledge least likely to be written down lives between modules.</div>

<!--
Ask it as an enumeration, not as a feeling. The naive form fails because the
person answering cannot un-know what they are auditing. Worked example to use:

  You wrote the login module. You know emails are lowercased before comparison,
  because otherwise Ahmet@company.com and ahmet@company.com become two accounts.
  The spec says "users log in with email and password." Could you rebuild it from
  that? Of course. But you are not reading the spec -- you are reading the spec
  PLUS everything in your head. Hand it to someone who has never seen the code
  and a month later support gets a ticket: "I cannot log into my account."

The code was right. The spec was right. The lowercasing rule was written down
nowhere.

Deliberately no room exercise here. An earlier version asked everyone to open
their own repository for ninety seconds; it was cut because a clear worked
example does the same job in less time and does not depend on people having a
repository they can open.

Say plainly that the test is literally runnable: delete it, hand a fresh agent
the spec, diff the behaviour.
-->

---

# What a failure means

<div class="text-lg mt-6">
The code holds knowledge that exists <b>nowhere else</b>.
</div>

<div class="mt-4 text-sm opacity-90">Every piece of it is a single point of failure living in one person's head, or in nobody's.</div>

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
So spec review is a review that was <b>missing</b>, not a review that replaces one.
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

# Before we start

<div class="mt-8 space-y-5 text-lg">

<div>1 · The failure is not bad code. It is <b>correct code built from an instruction nobody reviewed.</b></div>

<div>2 · The test: <b>name one thing you would need to rebuild this that the spec does not say.</b></div>

<div>3 · If you can name one, that knowledge lives <b>only in the code</b>, and in one person's head or nobody's.</div>

<div>4 · Not every miss is debt. <b>Intent and constraints</b> belong in the spec. <b>Implementation judgment</b> does not.</div>

<div>5 · The truth <b>split</b>. Intent moved to the spec. This artifact never left the code.</div>

<div>6 · So spec review is a review that was <b>missing</b>, not one that replaces reading the diff.</div>

</div>

<!--
Ninety seconds. Read the six lines, do not expand them. Every one of them has
already been argued; this is retrieval, not teaching.

Time comes from the agenda slide, which got shorter when the three-jobs table
moved to module 6. Module 0 stays at 40 minutes.

If you only have time for two: line 2 is the instrument the room uses three more
times today, and line 4 is what stops them going home and over-specifying
everything. Lines 5 and 6 are the ones module 4 depends on being remembered
correctly.

Ask if anything is unclear BEFORE the agenda, not after. Once the agenda is up
the room has moved on and will not go back.
-->

---

# The day

<div class="mt-6">

| | Answers |
|---|---|
| **1 · Spec anatomy** | What is a spec, and what is only pretending to be one? |
| **2 · Intent → spec** | Where does a spec come from, when nobody has written one? |
| **3 · Spec → plan** | How does a spec become work something else can run? |
| **4 · Verification** | How do you know it was actually done? |
| **5 · Brownfield** | What if there is no spec and 200,000 lines of code? |
| **6 · When not to** | When should you do none of this? |

</div>

<div class="callout-key mt-8 text-sm">
In infrastructure the definition is the Dockerfile, the Terraform module, the manifest.<br/>
<b class="text-lg">In code it is the spec.</b><br/>
Everything above is the work of building and maintaining that definition.
</div>

<!--
This is the agenda, and it arrives here rather than at 08:45 because only now
does the room know why it needs one. At the start these six lines are a list; here
each one is a consequence of the deletion test.

An earlier version put the three-jobs through-line table on this slide. It was
cut for two reasons: two of its three rows reference diagnostics the room has not
met yet, so it reads as a puzzle rather than a map -- and the identical table
already closes module 6, where it pays off in the past tense. Showing it twice
spends the recognition before it is earned.

The Dockerfile line closes the phoenix argument opened four slides ago. Slide 11
asked why code never had that argument; this answers it. Say the two sentences
and stop -- the callout does the rest.

Time check: you should be at 40 minutes. If you are over, cut from module 1's
ladder, never from the mindset switch.

THE OBJECTION USUALLY LANDS HERE, and it is the strongest of the day:
"if the spec is complete enough to regenerate from, it contains everything the
code contained -- you have rewritten the program in English. We tried this. It
was called MDA."

Do not improvise. The scripted answer is in facilitator/objections.md and it
turns on the acceptance set. Concede the singleton cases out loud.
-->