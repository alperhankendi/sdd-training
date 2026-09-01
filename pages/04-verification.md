# Green tests. Wrong behaviour.

<div class="mt-10 text-sm opacity-90">
And the other one: the spec says X, the code does Y, both are on main, and both were approved.
</div>

<div class="callout-bad mt-10">
Everything that was supposed to catch this ran, and passed.
</div>

<!--
Two damages in one slide because this module holds two ideas and they reinforce
each other. Ask which of the two the room has seen more often; it is always the
second, and almost nobody calls it a defect.
-->

---

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

# Verification is not testing

<div class="mt-10 grid grid-cols-2 gap-6">
  <div class="callout-key">
    <div class="font-bold">A test asks</div>
    <div class="mt-2 text-lg">Does the code match my expectation?</div>
  </div>
  <div class="callout-good">
    <div class="font-bold">Verification asks</div>
    <div class="mt-2 text-lg">Is the <b>claim of completion</b> true?</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
Different questions with different failure modes. A suite can be entirely green while the claim "this feature is done" is false, because the suite tests what someone thought to test, and the claim covers everything.
</div>

<div class="callout-key mt-6 text-sm">
<b>If you learned the classical definition:</b> in IEEE V&amp;V (Verification and Validation - Doğrulama ve geçerleme) terms verification means <i>"are we building the product right"</i> and it <b>includes</b> unit testing. I am using the word more narrowly today: <b>checking the claim of done against reality.</b> Same word, smaller scope.
</div>

<!--
This is the epistemic core of the day and it survives every other revision.
Verification is about the ASSERTION, not the artifact.

The V&V box is not pedantry. Anyone with a formal software engineering
education was taught that verification INCLUDES unit testing -- it is the
standard IEEE split -- and without this line they hear the slide title as
simply false and stop listening. Ten seconds spent conceding the classical
sense buys the rest of the module.
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

# What each cannot catch

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">A phase gate cannot catch</div>
    <div class="mt-1">Anything about the artifact that gets <b>built later</b>. It reviews a document, and documents cannot contain an N+1 query.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">A completion check cannot catch</div>
    <div class="mt-1">That the whole unit of work was <b>the wrong thing</b>. It verifies the claim it was given, not the claim it should have been given.</div>
  </div>
</div>

<div class="mt-10 text-sm opacity-90">
Neither is a substitute for the other, and the gap between them is exactly where "correct implementation of the wrong requirement" lives.
</div>

<!--
Ask the room where this morning's opening damage sits on this slide. It sits in
the gap -- which is why elicitation exists and why neither gate would have saved
it.
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

# Spec drift

<div class="mt-8 text-lg">The default state of any document not defended by process.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Why it is silent</div>
    <div class="mt-1">Nothing fails. The code works, the tests pass, the document sits there being wrong. There is no error to see.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">When you find out</div>
    <div class="mt-1">When someone trusts it. An onboarding engineer, an auditor, or an agent. By then it has been wrong for months.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-90">
Drift is not caused by carelessness. It is caused by there being <b>no moment at which the document is required to be right</b>.
</div>

<!--
That last sentence is the setup for the definition-of-done change two slides on.
The fix is not diligence. It is creating the moment.
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

# Definition of done, and its order

<div class="mt-6 text-lg">A change that alters behaviour without a spec update is an <b>incomplete change</b>.</div>

<div class="mt-6 text-sm opacity-90">A process change, not a guideline. But state it order-sensitively or it is worthless:</div>

<div class="callout-good mt-6 !text-lg">
The spec changes <b>first</b>, and the owner decides.
</div>

<div class="callout-bad mt-6">
A spec patched at PR time to describe whatever happened to get built is <b>drift with better paperwork</b>.
</div>

<!--
Expect resistance here, and expect it to be reasonable. "We do not know what the
spec should say until we have built it" is often true for genuinely exploratory
work -- and module 6 gives explicit permission to skip SDD for exactly that.

What is not acceptable is doing exploratory work by default and calling the
retro-spec a process.
-->

---

# Correction and drift produce the same diff

<div class="mt-10 text-xl">Two commits. Identical content. One is the process working, one is the process being laundered.</div>

<div class="mt-10 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Correction</div>
    <div class="mt-1">Spec changed first. Owner decided. Implementation followed.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Drift laundering</div>
    <div class="mt-1">Code changed first. Spec edited afterwards to match. Nobody decided anything.</div>
  </div>
</div>

<div class="mt-10 text-sm opacity-90">
You cannot tell them apart from the artifact. Only from <b>the order</b>, and <b>who decided</b>.
</div>

<!--
This is why the definition-of-done change is about order rather than presence.
"Did the spec get updated" is satisfied by both columns. It is the wrong question
and it is the one most teams adopt.
-->

---

# Code review *gains* a spec review

<div class="text-sm opacity-75">It does not lose the code review.</div>

<div class="callout-bad mt-6">
<b>The tempting version is false:</b> "if the spec is right, the code can be regenerated." The compiler metaphor needs determinism and non-editability. Agentic generation has neither, and generated code is hand-edited from the first hotfix onward.
</div>

<div class="mt-6 text-sm">A <b>fully correct</b> spec routinely yields: an injection-shaped query · an N+1 · a swallowed error path · a race on the rotation window · a key fragment in a log line. None are spec defects. Regeneration does not remove them.</div>

<div class="callout-key mt-6 text-sm">
<b>Which is why volume is a liability.</b> If generation is cheap and verification is not, every line you keep is a line something must re-verify forever. That is the real argument for keeping systems small. Not tidiness: <b>cost of certainty</b>.
</div>

<!--
This is the most carefully worded slide in the deck, and it is worded that way
because the appealing version of it ships bugs.

Module 1 beat 6 tells authors to leave implementation judgment OUT of the spec.
If review also skips that region, nobody is looking at where security,
concurrency, resource and error-path defects live. The training would have
caused the regression it exists to prevent.
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

---

# Demo · execution meets a wrong spec

<div class="mt-8 space-y-3 text-sm">
  <div class="callout-key"><b>1 ·</b> Run a plan we prepared earlier. <b>Different codebase:</b> an API key service, not this morning's ticket system.</div>
  <div class="callout-bad"><b>2 ·</b> It stops. The spec assumed revocation propagates <b>synchronously</b>. The architecture document, written days earlier, says asynchronously, bounded at 30 seconds.</div>
  <div class="callout-good"><b>3 ·</b> Triage it on screen: this is column two. Amend the spec first, re-derive the affected steps, mark built work suspect, resume.</div>
</div>

<div class="mt-8 text-sm opacity-90">
Both documents are in the repository. Only one can be right. That is what the backward edge is <b>for</b>.
</div>

<div class="mt-4 text-sm opacity-60">
A second codebase on purpose. If the move only worked on the system we built this morning, it would not be a method.
</div>

<!--
SAY THE DOMAIN CHANGE OUT LOUD, in one sentence, before running anything. A room
that notices the codebase changed and was not told assumes you lost your place.
Framed as deliberate it is an argument: a method that only works on the example
you rehearsed is not a method.

The premise is planted deliberately and the failure is real, not staged: the
step's verify command fails because the cache still serves the revoked key.

Do not rush the pause between 2 and 3. The room needs a moment to notice that
nothing here is an error in the code.
-->

---

# Demo · the PR that passes

<div class="mt-8 text-lg opacity-75">Behaviour changed. Tests green. Spec untouched.</div>

<div class="mt-8 text-sm opacity-90">
Rate limiting moved from a fixed window to a sliding one. Every existing test passes: they assert only that requests over the limit are rejected, and both implementations do that. Burst behaviour at the window edge changed materially, and no spec says which is correct.
</div>

<div class="callout-bad mt-8 text-sm">
There is also something else in that diff, and it is not a spec defect. Watch for it in the lab.
</div>

<!--
Do not point at the second defect. Lab 4's answer key is two-sided and the whole
value is in participants finding the second half themselves.

For your reference: an unbounded per-customer counter with no eviction. No spec
would ever mention it, because it is implementation judgment. Fixing the spec
and regenerating would not remove it.
-->

---

# CI · options, with costs

<div class="mt-6 text-sm opacity-75">Presented as options. None of these is a recommendation.</div>

<div class="mt-6">

| Check | Catches | Costs |
|---|---|---|
| Spec-to-code linkage | A change with no spec reference | False positives on refactors |
| Artifact freshness | A spec untouched for N releases | Noise on stable features |
| Traceability assertion | A story with no PRD ancestor | Only works at project altitude |

</div>

<div class="mt-8 text-sm opacity-90">
Every one of these can be gamed by adding a reference nobody read. Automation raises the floor; it does not create the norm.
</div>

<!--
This is the module's most cuttable slide and it is deliberately last before the
lab. If you are running long, cut it whole -- the Lab 4 handout carries a
reference copy.
-->

---

# Lab 4 · A PR that changes behaviour

<div class="mt-8 text-lg">Twenty minutes. Find <b>exactly two</b> things: one missing from the change, one wrong inside the diff.</div>

<div class="callout-good mt-8 text-sm">
<b>The answer key has two sides.</b> One is the missing spec update. The other is a defect in the diff that the spec is <b>silent about by design</b>.
</div>

<div class="mt-6 text-sm opacity-90">
A participant who finds only the first has learned exactly the half that ships bugs.
</div>

<div class="callout-key mt-8 text-sm">
<b>If you finish early:</b> for each defect, which side of the diagnostic does it fall on? Would fixing the spec and regenerating remove it?
</div>

<!--
This lab is the module's whole argument. It asks for exactly two findings on
purpose: a solvability run showed that "what is missing, and what would you block
on?" gave no completion condition, so people produced one finding and stopped --
and the one they stopped at was always the spec gap, which is the half the
training obviously teaches.

If the room finds only the spec gap, the review beat did not land and you should
say so plainly rather than move on.

DEBRIEF -- under ~15: ask for the spec gap first, get it quickly, then ask "what
else is in that diff" and let the silence sit. Above 15: take the spec gap from
a volunteer, then read out the second defect and ask who had it.
-->
