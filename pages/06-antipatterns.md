# "So SDD means we write more documents."

<div class="mt-10 text-xl">If anyone leaves believing that, today failed.</div>

<div class="mt-10 text-sm opacity-90">
Not partially. The person who believes it will try it once, find it slow, and conclude the whole thing is bureaucracy, and they will be harder to convince the second time than they were this morning.
</div>

<!--
Say the failure condition out loud. It is stated in the training's own design
document as the criterion by which the day is judged, and naming it here tells
the room that the last forty-five minutes are not a disclaimer.
-->

---

# Anti-patterns · the specs themselves

<div class="mt-6">

| Anti-pattern | Looks like | Healthy counterpart |
|---|---|---|
| **Spec theater** | A document that cannot be wrong | Module 1: the testability test |
| **Over-specification** | The spec costs more than the code | Module 1: the precision budget |
| **Altitude confusion** | A task where a spec belongs | Module 2: the depth dial |
| **Restatement** | The same constraint in eleven files | Module 1: reference over restatement |

</div>

<div class="mt-8 text-sm opacity-90">
Each of these has a counterpart you already met. None of them is new material. This is a recognition exercise.
</div>

<!--
The right-hand column is the point of the table. An anti-pattern with no
counterpart is a scolding; an anti-pattern traced back to a practice is a
diagnostic.
-->

---

# Anti-patterns · the process around them

<div class="mt-6">

| Anti-pattern | Looks like | Healthy counterpart |
|---|---|---|
| **Spec drift** | Spec and code diverge, silently | Module 4: definition of done |
| **Retro-spec** | Spec patched at PR time to match the build | Module 4: the spec changes *first* |
| **Ceremonial gate** | A gate nobody can fail | Module 2: size the artifact to the change |
| **Big-bang brownfield spec** | Six months specifying code nobody is changing | Module 5: spec the delta |
| **Regeneration as review substitute** | "The spec is right, so skip the diff" | Module 4: code review *gains* a spec review |

</div>

<div class="mt-6 text-sm opacity-75">The last two are the expensive ones. One wastes a quarter; the other ships security defects.</div>

<!--
Retro-spec and drift produce the same diff -- that was module 4's slide, and
this is where the room should recognise it as a named thing rather than a
subtlety.
-->

---

# Spotting them in your own team

<div class="mt-6 text-sm opacity-75">Every anti-pattern above is obvious in someone else's process. Three questions that make them visible in yours.</div>

<div class="mt-8 space-y-3 text-sm">
  <div class="callout-key">
    <div class="font-bold">1 · When did a spec last get rejected?</div>
    <div class="mt-1">If the answer is "never", the gate is ceremonial. A check nothing has ever failed is not a check.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">2 · Which changed first, the spec or the code?</div>
    <div class="mt-1">Ask it about last week's actual PRs, not about the policy. Retro-spec and correction produce the same diff.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">3 · Could you delete the spec and lose anything?</div>
    <div class="mt-1">If nobody would notice, it was documentation of a decision rather than the decision itself, and it will drift, because nothing depends on it.</div>
  </div>
</div>

<div class="mt-6 text-sm opacity-90">All three are answerable in ten minutes from your own repository. None requires anyone's permission.</div>

<!--
Question 1 is the sharpest and the most uncomfortable. Most teams that adopt a
review gate never fail one, and read that as evidence the process is working.

Question 3 is the deletion test pointed at the spec instead of the code, which
is worth saying out loud -- it is the morning's question turned around.
-->

---

# When NOT to do SDD

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-good">
    <div class="font-bold">One-off scripts</div>
    <div class="mt-1">Nobody maintains it. Write the script.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">Exploratory prototypes</div>
    <div class="mt-1">You do not yet know what you are building. Specs slow down the finding out.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">Stable finished systems</div>
    <div class="mt-1">Not changing. A parallel spec is overhead with no benefit.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Spikes</div>
    <div class="mt-1">The artifact shrinks to a sentence. <b>The gate does not disappear.</b></div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
A participant who cannot name three cases where SDD is overhead has not understood it.
</div>

<!--
The spike wording is deliberate and it matters: the room watched a tool classify
and gate a spike in module 2 this morning. A flat "don't do SDD for spikes" here
reads as a contradiction seven hours later, and someone will say so.
-->

---

# Where SDD buys nothing

<div class="mt-8 text-lg">The strongest objection of the day, and it is correct in its own domain.</div>

<div class="callout-bad mt-8">
"If the spec is complete enough to regenerate from, it contains everything the code contained. You have rewritten the program in English: longer, ambiguous, no compiler. We tried this. It was called MDA."
</div>

<div class="mt-8 text-sm opacity-90">
The answer turns on one distinction: a spec does not determine <b>the implementation</b>. It determines the <b>acceptance set</b>: the set of implementations that would be correct.
</div>

<div class="mt-6 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-good">
    <div class="font-bold">Set has many members</div>
    <div class="mt-1">The spec is strictly smaller than the code. The difference is the precision budget. SDD pays.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold">Set is a singleton</div>
    <div class="mt-1">A dense algorithmic kernel. A protocol implementation. A hot path where one shape performs. The spec converges on the code, and <b>the objector is right.</b></div>
  </div>
</div>

<!--
MDA failed because it forced the acceptance set to a singleton, which does make
the model grow into the program. SDD keeps it plural deliberately, and pays for
that with nondeterminism and with a residue only code review finds.

Concede the singleton column out loud and without hedging. An instructor who
tries to win the whole field loses the senior for the rest of the day; an
instructor who names the limit is believed about everything else.
-->

---

# Which altitude, what depth

```mermaid
flowchart TD
  A[A change to make] --> B{Maintained in six months?}
  B -- No --> Z[No spec. Write the script.]
  B -- Yes --> C{Domain new to the team?}
  C -- Yes --> E[Feature altitude<br/>architectural depth]
  C -- No --> D{More than one correct<br/>implementation?}
  D -- No --> Z2[Singleton acceptance set.<br/>SDD buys little.]
  D -- Yes --> F{Do other teams derive<br/>commitments from it?}
  F -- No --> G[Feature altitude<br/>bounded depth]
  F -- Yes --> H{Audit trail required?}
  H -- No --> I[Project altitude<br/>Quick Flow]
  H -- Yes --> J[Project altitude<br/>Full Planning]
```

<!--
This is the slide people photograph. Pause and let them.

Every input has been earned earlier -- nothing appears here for the first time.
Lifespan and compliance come from module 2's reversibility asymmetry. Domain
novelty from module 2's elicitation. The acceptance-set branch from the previous
slide. If you find yourself explaining an input here, it was under-taught earlier.
-->

---

# Reading it · a worked example

<div class="mt-6 text-sm opacity-75">"Add a per-customer rate limit to the API."</div>

<div class="mt-6 space-y-2 text-sm">
  <div class="callout-key"><b>Maintained in six months?</b> Yes. It is core platform behaviour.</div>
  <div class="callout-key"><b>Domain new?</b> No. The team has done rate limiting before.</div>
  <div class="callout-key"><b>More than one correct implementation?</b> Yes: fixed window, sliding window, token bucket all satisfy "reject over the limit", and they behave differently at the edge.</div>
  <div class="callout-bad"><b>Other teams derive commitments?</b> Yes. The client SDK and the support runbook both encode the behaviour.</div>
  <div class="callout-key"><b>Audit trail required?</b> No.</div>
</div>

<div class="callout-good mt-6">
<b>→ Project altitude, Quick Flow.</b> Not because it is big. Because other people will build on the answer.
</div>

<!--
That last sentence is the whole flowchart in one line. Size is not an input;
reversibility is.

This is also the exact change from module 4's PR demo -- the one where every
test stayed green while burst behaviour changed. Point at that if the room needs
to see why "more than one correct implementation" is the branch that matters.
-->

---

# The tool landscape

<div class="mt-6">

| | Optimises for | Weight |
|---|---|---|
| **BMAD** | Traceability, audit trails, multi-team coordination | Heavy, with a Quick Flow dial |
| **Superpowers** | Feature-level loop inside an editor session | Light, with an architectural dial |
| **GitHub Spec Kit** | A vendor-neutral `/specify → /plan → /tasks` flow | Medium |
| **Kiro** | Spec-driven work inside an IDE | Medium |
| **ECC** | A skills-and-agents harness spread across many editors | Medium; it is a harness, not a spec method |
| **Plain markdown + git** | Nothing, and it always works | As light as you make it |

</div>

<div class="mt-8 text-sm opacity-90">
The last row is not a joke. Every principle today works with two markdown files and a review habit.
</div>

<!--
Spec Kit is on this slide despite not being taught, because the room has heard
the term and omitting it invites a Q&A ambush. One sentence is enough.

ECC is on the slide with a deliberate qualifier. It is a harness that distributes
skills and agents -- agent INSTRUCTION files, with no goal, no constraints and no
acceptance criteria. Useful, and not a spec method. If someone offers it as one,
that is module 1 slide 8's altitude confusion with a new costume.

The last row is the honest close: nothing today required a vendor.
-->

---

# What we did not cover

<div class="mt-8">

| Deferred | Where it lives |
|---|---|
| CI enforcement of spec-code linkage | The Lab 4 handout has a reference slide |
| Multi-agent orchestration | Named on the landscape slide, not taught |
| Organisational rollout, mandates | Deliberately out of scope (see the next slide) |

</div>

<div class="mt-8 text-sm opacity-90">
Said out loud so that a question about any of these reads as a boundary rather than an omission.
</div>

<!--
There is no part two. These are dropped, not postponed, and each has a resting
place. Saying so is more honest than implying a sequel that will not happen.
-->

---

# Monday · what to actually do

<div class="mt-8 space-y-4 text-sm">
  <div class="callout-good">
    <div class="font-bold">If you are early in your career</div>
    <div class="mt-1">Take the next ticket you are given and write the <b>five questions</b> from module 2 before writing any code. Send them to whoever wrote the ticket.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">If you are experienced</div>
    <div class="mt-1">Run the <b>deletion test</b> on one module you own. Name one thing you would need that is written down nowhere. Write that one thing down.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">If you lead a team</div>
    <div class="mt-1">Add one line to your definition of done: <b>behaviour changes require a spec change, and the spec changes first.</b> Nothing else. Not a template, not a tool.</div>
  </div>
</div>

<!--
One action each, and all three are free. Do not offer a menu -- a menu produces
a decision, and a decision at 17:00 produces nothing.

The third is the only one that needs anyone else's agreement, which is why it is
one line rather than a process.
-->

---

# Adopt what pays for itself first

<div class="mt-6 text-sm opacity-75">The costs and the benefits of SDD do not always land on the same person. Sort by who pays.</div>

<div class="mt-6 space-y-3 text-sm">
  <div class="callout-good">
    <div class="font-bold">Self-paying: adopt unilaterally, tomorrow</div>
    <div class="mt-1">The five questions · acceptance criteria that can fail · an executable plan · a delta-spec before a legacy change. Each repays you inside the same task.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Team-paying: needs a shared norm</div>
    <div class="mt-1">Spec as definition of done · spec review alongside code review. Do not adopt these alone; you will pay a visible tax for an invisible benefit.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold">Org-paying: needs a mandate and a budget</div>
    <div class="mt-1">Traceability CI · project-altitude artifacts · audit trails. Never mandate these downward without also moving whatever measures the mandated team.</div>
  </div>
</div>

<!--
This is the slide that prevents the most common failure after a good training:
one convinced person tries to institute a team-paying practice alone, loses the
argument in a standup, and concludes the method was naive.

Ceremonial gates form when the mandating party does not pay. That is the
mechanism, and it is worth naming.
-->

---

# One question, three jobs

<div class="mt-8">

| Where | The question | What it decided |
|---|---|---|
| Module 0 | Name one thing you'd need that the spec doesn't say | Is the spec the source, or is the code? |
| Module 4 | Would fixing the spec and regenerating remove this defect? | Spec defect, or implementation defect |
| Module 5 | Where does it fail hardest here? | What archaeology recovers first |

</div>

<div class="mt-10 text-xl text-center">
Not <s>is this code correct?</s><br/>
<b>Where does the truth about this system live?</b>
</div>

<!--
Close on the same question the day opened with. If only one thing survives the
week, this is the one worth surviving -- the practices are all downstream of it.

Then Q&A. Do not add a summary slide after this one; the callback IS the summary.
-->
