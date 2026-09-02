# Execution

<div class="mt-8 text-lg">Running a plan end to end. What the executor actually needs, and what makes it stall.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-good">
    <div class="font-bold">Needs</div>
    <div class="mt-1">The plan, the repository, and permission to run the verify commands. Nothing else.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold">Stalls on</div>
    <div class="mt-1">A verify step it cannot run · a decision nobody delegated · a step whose <code>done</code> is unobservable</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-75">
All three are plan defects, found at execution time. That is late, but far earlier than production.
</div>

<!--
Keep this short; the demo carries it. The point is only that a stall is
diagnostic: it names a place where module 3's rules were not followed.
-->

---

# Evidence before assertions

<div class="mt-8 text-xl">Never say "done", "fixed", or "passing" without having just looked.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Assertion</div>
    <div class="mt-1">"The tests pass."<br/><br/>Based on: the tests passed forty minutes and three edits ago.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Evidence</div>
    <div class="mt-1">"The tests pass."<br/><br/>Based on: the output on screen, from this working tree, just now.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
This applies to people at least as much as to agents. The difference is that a person can be embarrassed later, which is a weak but real forcing function.
</div>

<!--
Concrete house rule worth offering: the sentence "it should work now" is banned.
Either it was run, or the state is unknown -- and saying so is not weakness.
-->

---

# Principle · check the claim before anything derives from it

<div class="mt-6 text-sm opacity-90">
An adversarial check placed <b>before</b> the point where other work starts depending on the claim. Late enough to be meaningful, early enough that nothing has been built on it yet. Two instantiations:
</div>

<div class="mt-6 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-key">
    <div class="font-bold">BMAD · quality gate between phases</div>
    <div class="mt-2">Adversarial. Can the next phase execute from this artifact alone?</div>
    <div class="mt-2 opacity-75">Prevents: cascade failure. An incomplete PRD becoming a flawed architecture becoming thousands of lines of wrong code.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">Superpowers · verification before completion</div>
    <div class="mt-2">Evidence check at the end of a unit of work.</div>
    <div class="mt-2 opacity-75">Prevents: a false "done". The claim is checked against the repository, not against memory.</div>
  </div>
</div>

<div class="mt-6 text-sm opacity-90">Same shape (an adversarial check on a claim before it goes downstream) at two costs.</div>

<!--
Principle first, as ever: the shape is "check the claim before anything derives
from it". These two are instances.
-->

---


# Testing theatre

<div class="mt-8 text-lg">Tests that pass without validating anything.</div>

```csharp
[Fact]
public void GetLinesForPeriod_DoesNotThrow()
{
    var ex = Record.Exception(() =>
        PeriodCalculator.GetLinesForPeriod(new List<InvoiceLine>(), DateTime.Now, DateTime.Now));
    Assert.True(true);
}
```

<div class="mt-6 grid grid-cols-3 gap-4 text-sm">
  <div class="callout-bad"><b>Names the method</b><br/>so a reader assumes it is covered</div>
  <div class="callout-bad"><b>Captures the exception</b><br/>and never inspects it</div>
  <div class="callout-bad"><b>Asserts a tautology</b><br/>on an empty list</div>
</div>

<div class="mt-6 text-sm opacity-90">Coverage tooling reports <code>GetLinesForPeriod</code> as tested. It is the buggiest function in that codebase.</div>

<!--
Real code from the repository they meet in module 5. Do not tell them yet that
the function is buggy in a specific way -- say only that it is the buggiest, so
that this afternoon's discovery pays this slide off.

Mocks belong in the same family: a mock that returns what the caller expects
cannot fail, and it hides exactly the failure it was written to catch.
-->

---

# The spec is wrong. You are 40% in.

<div class="mt-2 text-sm opacity-75">The most common real event in spec-driven work, and the edge that makes this not waterfall.</div>

<div class="grid grid-cols-3 gap-4 mt-8">
  <div class="callout-key">
    <div class="font-bold">Under-specified</div>
    <div class="text-sm mt-1">The spec is <i>silent</i>, not wrong.<br/><br/>→ Open Questions. Execution continues around it.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Spec is wrong</div>
    <div class="text-sm mt-1">Amend the spec <b>first</b>.<br/><br/>→ Re-derive affected steps. Mark built work suspect. Resume.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Implementer disagrees</div>
    <div class="text-sm mt-1">The precision budget already settled this.<br/><br/>→ The spec does not change.</div>
  </div>
</div>

<!--
Module 0 asserted "not waterfall" in one sentence. This slide is the only place
the day demonstrates it -- without a backward edge the claim is decoration.

The third column is the one people fight. "The implementer thinks the spec is
wrong" is usually "the implementer would have done it differently", and module
1's precision budget already gave that ground away deliberately.
-->

---

# Who decides

<div class="mt-12 text-center">
<div class="callout-key !text-2xl">The agent proposes. The human disposes.</div>
</div>

<div class="mt-12 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-key">
    <div class="font-bold">Feature altitude</div>
    <div class="mt-1">The feature's author decides. Usually within a minute, usually in the same session.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Project altitude</div>
    <div class="mt-1">The PRD owner decides. Not the implementer, and not the agent that noticed.</div>
  </div>
</div>

<div class="mt-10 text-sm opacity-90">
Without this line the triage is unusable, because every branch of it ends in a change somebody must authorise.
</div>

<!--
This is module 1's escalation rule one altitude down. Same principle: a
contradiction is resolved by the owner, never by whoever happened to hit it.
-->

---

# The split, and the diagnostic

<div class="mt-6 grid grid-cols-2 gap-6">
  <div class="callout-key">
    <div class="font-bold">Spec review asks</div>
    <div class="text-lg mt-2">Are we building the right thing?</div>
    <div class="text-sm mt-2 opacity-75">Is the intent right, complete, non-contradictory? Do the acceptance criteria cover this change?</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">Code review asks</div>
    <div class="text-lg mt-2">Did this artifact do it, and what else did it do?</div>
    <div class="text-sm mt-2 opacity-75">The residue module 1 deliberately left unspecified.</div>
  </div>
</div>

<div class="callout-key mt-8 text-center">
<b>If fixing the spec and regenerating would remove it, it is a spec defect.<br/>Otherwise it is an implementation defect, and only reading code finds those.</b>
</div>

<!--
Introduce that diagnostic as MODULE 0's DELETION TEST RETURNING IN ITS SECOND
FORM -- the same question, now asked of a defect rather than of a module. The
room should recognise it, not meet it.

When someone objects that somebody still has to read the diff: that is the RIGHT
ANSWER, not resistance to absorb. Arrive at it. Do not defend against it.

Name the residue as an explicit review target, out loud, so it stops being
nobody's job.
-->
