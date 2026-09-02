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
THIS MODULE OPENS WITH THREE THINGS SAID OUT LOUD, no slides. They were cut
because each lands in a couple of sentences and a screen added nothing. Deliver
them in this order before this slide goes up:

1. THE DAMAGE.
   "Four weeks into a project, two services encode different answers to what a
   user is. Both teams are correct against the ticket they were given. Nobody
   made a mistake. The assumption was never wrong, it was just never stated, so
   it was never checked."

2. THE REFRAME. This one matters most; without it the rest is a checklist.
   "The person who gave you the requirement does not have a finished spec in
   their head either. So this is not extraction, it is construction. Your
   questions are not retrieving an answer, they are creating one."
   Then ask: have you been given a requirement that turned out wrong? (hands)
   And did the person who gave it know it was wrong at the time? (no)

3. THE FIVE QUESTIONS. Say them once; they are also on the Lab 2 handout.
   What would make you reject this? What must it not do? What happens on the
   unhappy path? Who else is affected? What is already true that I must not break?
   Note that the first is first on purpose: "what do you want" produces
   agreement, "what would make you reject this" produces information.

Then this slide. This is why the template has a Non-goals section: module 1
handed them the section, here it is earned.
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
| **Project** | BMAD<br/><span class="text-xs opacity-60">a document-first method</span> | Product Brief → PRD → Architecture → Epics |
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

# What is an agentic coding framework?

<div class="mt-8 text-lg">A structure that tells an agent <b>how to work</b>, not what to build.</div>

<div class="mt-8 grid grid-cols-3 gap-4 text-sm">
  <div class="callout-key">
    <div class="font-bold">Skill</div>
    <div class="mt-1">A file describing when it activates and what it does at that moment.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Artifact</div>
    <div class="mt-1">What each skill produces. It becomes the next skill's input.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Flow</div>
    <div class="mt-1">Which skill hands to which. The order is not arbitrary.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-75">
A framework is where you stop writing prompts and start <b>designing a workflow</b>.
</div>

<!--
This slide is a bridge. Most of the explanation lives on the external page:
claude-code-mastery/15-Agentic-Coding-Frameworks

Show the slide, cover the three boxes in one sentence each, then switch to the
browser and teach the concept there. Slide 42 is waiting when you come back.

The line that matters: a framework is the move from writing prompts to designing
a workflow. Until now the room has heard "how do I ask better questions". From
here it is "who produces what, and hands it to whom".
-->

---

# How I actually use them

<div class="mt-6 grid grid-cols-2 gap-5">
  <div class="callout-key">
    <div class="font-bold text-blue-600 dark:text-blue-400">With BMAD</div>
    <div class="text-sm mt-2">Market research, brief, PRD, architecture, functional requirements, stories, plan.</div>
    <div class="text-sm mt-2 opacity-75">The whole project. Once.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">With Superpowers</div>
    <div class="text-sm mt-2">For every story: spec, plan, implementation. Test-driven throughout.</div>
    <div class="text-sm mt-2 opacity-75">Once per story.</div>
  </div>
</div>

<div class="callout-key mt-8">
What gets handed over is <b>one story.</b> And Superpowers does not just receive it: <b>it writes its own spec and its own plan for that story.</b>
</div>

<div class="mt-6 text-sm opacity-90">
So the same loop runs at two scales. Once at project altitude, once per story at feature altitude. <b>Different weight, same shape.</b>
</div>

<!--
This slide carries the hybrid practice and does the depth dial's job at the same
time.

The right-hand box is the important one: Superpowers does not merely implement,
it RUNS THE LOOP AGAIN for every story. That is the day's fractal claim, and here
it arrives as an observation rather than an assertion.

The sizing lesson falls out of it: altitude is a property of the WORK, not of the
toolchain. You use both on the same day; the choice is whether this is a project
or a story.
-->

---

# Two frameworks, side by side

<div class="grid grid-cols-2 gap-5 mt-5 text-xs">
  <div>
    <div class="font-bold text-blue-600 dark:text-blue-400 mb-2">BMAD · 11 skills</div>
    <div class="opacity-60 mb-1">Analysis, optional</div>
    <div class="font-mono opacity-85">bmad-brainstorming · bmad-forge-idea · bmad-deep-recon · bmad-product-brief · bmad-prfaq</div>
    <div class="opacity-60 mt-3 mb-1">Planning, what to build</div>
    <div class="font-mono opacity-85">bmad-prd · bmad-ux · <b class="text-blue-600 dark:text-blue-400">bmad-spec</b></div>
    <div class="opacity-60 mt-3 mb-1">Solutioning, how and who does what</div>
    <div class="font-mono opacity-85">bmad-architecture · bmad-create-epics-and-stories · bmad-sprint-planning</div>
    <div class="mt-3 opacity-75">Every path runs through <b>bmad-spec</b>, then <b>bmad-build</b>.</div>
  </div>
  <div>
    <div class="font-bold text-green-600 dark:text-green-400 mb-2">Superpowers · 7 steps</div>
    <div class="font-mono opacity-85 leading-relaxed">
      1 brainstorming<br/>
      2 using-git-worktrees<br/>
      3 writing-plans<br/>
      4 subagent-driven-development<br/>
      5 test-driven-development<br/>
      6 requesting-code-review<br/>
      7 finishing-a-development-branch
    </div>
    <div class="mt-3 opacity-75">Fixed order. Every story goes through all seven.</div>
  </div>
</div>

<div class="mt-6 text-sm opacity-90">
The left one runs <b>once</b>. The right one runs <b>for every story</b>.
</div>

<!--
Do not read the lists. Two things have to land:

1. BMAD is wide and branching, Superpowers is narrow and sequential. Because one
   is MAKING decisions and the other is EXECUTING them.
2. Left runs once, right runs per story. The frequency difference is the altitude
   difference made visible.

bmad-spec is highlighted because every path goes through it. Point, do not explain.
-->

---

# Demo · a library loan service

<div class="mt-4 grid grid-cols-2 gap-5 text-sm">
  <div class="callout-key">
    <div class="font-bold">The brief</div>
    <div class="mt-1 opacity-90">Members borrow and return books, and <b>each book has limited copies</b>. A member may hold <b>at most 5 loans</b>; loans have a <b>due date</b>. Returning frees the copy and the next member can borrow it right away.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">Already in the box</div>
    <div class="mt-1 opacity-90"><code>Book</code>, <code>Loan</code>, a <code>LoanService</code> with borrow and return, a repository port, named exceptions, five green tests.</div>
    <div class="mt-2 font-bold">Not in the box</div>
    <div class="mt-1 opacity-90">Members, <b>reservations</b>, <b>fines</b>, notifications, any swappable policy.</div>
  </div>
</div>

<div class="mt-5 grid grid-cols-3 gap-4 text-sm">
  <div class="callout-key">
    <div class="font-bold">What does "borrowed" mean?</div>
    <div class="mt-1">Returning frees the copy <i>right away</i>. From which moment: the return being recorded, or the book being back on the shelf?</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Five loans, and a due date</div>
    <div class="mt-1">Does an <b>overdue</b> loan still count toward the five? And what happens <b>the day it turns overdue</b>?</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">What counts as success?</div>
    <div class="mt-1">No copy is ever lent twice, or no copy ever <b>sits unlent</b> while somebody wants it?</div>
  </div>
</div>

<div class="callout-bad mt-5 text-sm">
None of these is an engineering decision: <b>are fines charged at all? Is a lost book the same as an overdue one? Does renewing reset the due date or extend it?</b>
</div>

<!--
DOMAIN: a library loan service, from Akin Kaldiroglu's bootcamp deck 10. Chosen
because everyone has borrowed a book, so no domain teaching is needed, and because
the brief carries all THREE CLASSES of hidden assumption on its own. The three boxes
along the bottom are exactly those three classes; point at that.

NOT IN THE BOX is where the work is: reservations, fines, notifications, swappable
policy. Every gap is a place the code is silent and somebody has to decide.

THE CONSTRAINT QUESTION IS THE BEST OF THEM. "At most five loans" and "loans have a
due date" are both in the brief, and neither says whether an overdue loan still
counts toward the five. Nobody notices until the fifth loan goes overdue in
production.

THE SUCCESS QUESTION looks like a trick and is not. A library that never lends a copy
twice can also be one where returned copies sit on a trolley for a day. Which failure
is worse is a BUSINESS decision, not an engineering rule. Say that out loud.

FINES ARE THE SHARPEST ITEM IN THE RED CALLOUT. The given code has no notion of them
at all, so the question is not "how do fines work", it is "do fines exist". No amount
of code reading answers it.

Brief, inventory, preparation and running order: facilitator/DEMO-REQUIREMENTS.md
-->

---

# Demo · the order we run it in

<div class="mt-5">
  <div class="flex items-baseline gap-3">
    <div class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">BMAD · project altitude · once</div>
    <div class="text-xs opacity-55">pre-baked, walked by diff · about 8 minutes</div>
  </div>
  <div class="mt-2 grid grid-cols-4 gap-3">
    <div class="callout-key">
      <div class="text-xs opacity-50">1</div>
      <div class="font-mono text-sm">product-brief</div>
      <div class="text-xs mt-1 opacity-75">Who borrows, and what we will <b>not</b> build</div>
    </div>
    <div class="callout-key">
      <div class="text-xs opacity-50">2</div>
      <div class="font-mono text-sm">prd</div>
      <div class="text-xs mt-1 opacity-75">Borrow, return, hold, limits</div>
    </div>
    <div class="callout-key">
      <div class="text-xs opacity-50">3</div>
      <div class="font-mono text-sm">architecture</div>
      <div class="text-xs mt-1 opacity-75">Where copy state lives, who owns the queue</div>
    </div>
    <div class="callout-key">
      <div class="text-xs opacity-50">4</div>
      <div class="font-mono text-sm">epics-and-stories</div>
      <div class="text-xs mt-1 opacity-75">The story list</div>
    </div>
  </div>
</div>

<div class="mt-4 p-2 rounded-lg border-2 border-dashed border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-center text-sm">
  <span class="text-xs uppercase tracking-wider opacity-60 mr-2">handoff</span>
  <b>one story:</b> <i>a member places a hold on a title whose copies are all out, and the next copy returned goes to them</i>
</div>

<div class="mt-4">
  <div class="flex items-baseline gap-3">
    <div class="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">Superpowers · feature altitude · per story</div>
    <div class="text-xs opacity-55">all seven live · about 30 minutes</div>
  </div>
  <div class="mt-2 grid grid-cols-7 gap-2 text-xs">
    <div class="callout-good"><div class="opacity-50">5</div><div class="font-mono mt-1">brainstorming</div><div class="mt-1 opacity-75">its own <b>spec</b></div></div>
    <div class="callout-good"><div class="opacity-50">6</div><div class="font-mono mt-1">worktrees</div><div class="mt-1 opacity-75">isolated branch</div></div>
    <div class="callout-good"><div class="opacity-50">7</div><div class="font-mono mt-1">writing-plans</div><div class="mt-1 opacity-75">its own <b>plan</b></div></div>
    <div class="callout-good"><div class="opacity-50">8</div><div class="font-mono mt-1">subagent-driven</div><div class="mt-1 opacity-75">step by step</div></div>
    <div class="callout-good"><div class="opacity-50">9</div><div class="font-mono mt-1">test-driven</div><div class="mt-1 opacity-75">red, green</div></div>
    <div class="callout-good"><div class="opacity-50">10</div><div class="font-mono mt-1">code-review</div><div class="mt-1 opacity-75">reads the spec</div></div>
    <div class="callout-good"><div class="opacity-50">11</div><div class="font-mono mt-1">finish-branch</div><div class="mt-1 opacity-75">close it out</div></div>
  </div>
</div>

<div class="mt-5 text-sm opacity-90">
Watch step <b>5</b> and step <b>7</b>: a spec and a plan, written again, for <b>one story.</b> That is the loop from the top of this slide, running a second time at a smaller size.
</div>

<!--
This is the map. Show it before the demo starts, and leave it up for a beat.

Its real job is expectation setting: the room is about to watch about 40 minutes
of tooling, and without a map that reads as a product tour. With the map, every
step has a known place in a sequence.

Three things to point at, and nothing else:

  THE HANDOFF BAR. Everything above it decides WHAT to build. Everything below it
  builds ONE item from that decision. The bar is the altitude change.

  STEPS 5 AND 7. A spec and a plan, for a single story. Whoever missed the fractal
  claim two slides ago gets a second chance here, in concrete form.

  WHAT IS LIVE. Say it out loud before starting: BMAD is pre-baked and walked by
  diff, all seven Superpowers steps run live. A room that knows what is recorded
  stops wondering and starts watching.

This is the day's long demo, about 40 minutes including this map, and it is the
only place all seven steps run. Show the plan step 7 produces as the payoff, then
move on: module 3 teaches from a plan that already exists in the example
repository, so nothing after lunch depends on this demo having gone well.

If you fall behind, 10 and 11 compress to a sentence each and 8 and 9 can drop to
a single task. 5, 6 and 7 do not compress, they are the demo.
-->
