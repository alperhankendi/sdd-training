# Running-Example Repository Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `sdd-training-example`, a .NET API key management service whose **git history is the deliverable** — each BMAD artifact lands as its own commit so modules 2 and 3 can walk the chain by diff, and modules 3 and 4 can run live against a real codebase.

**Architecture:** One ASP.NET Core Web API plus a `specs/` tree. The code is deliberately *good* — it is the contrast against `sdd-training-legacy`. What makes this repo unusual is that its commit history is authored, not incidental: the demo scrolls `git log` and reads `git diff` between artifact commits, so commit boundaries, ordering and messages are content. A `HistoryAudit` test project asserts the history still has the shape the demos need after any rebase or amend.

**Tech Stack:** .NET 10 (`net10.0`), ASP.NET Core Web API (controller-based, not minimal API — controllers read better on a projector), Entity Framework Core with SQLite, xUnit.

**Spec:** `docs/superpowers/specs/2026-08-30-sdd-training-design.md` — §6 (running example), §4 Modules 2, 3 and 4, §9 ("BMAD side always pre-baked").

## Global Constraints

- **Target framework:** `net10.0`. Verified: SDK 10.0.400 is the only SDK on the authoring machine and `dotnet new -f net8.0` fails with exit 127.
- **Domain:** API key management — issue, rotate, revoke, rate-limit, audit. Chosen in §6 because rotation windows and revocation propagation are real design problems, not toy ones.
- **The code is good.** No planted defects, no legacy smells. Every anti-pattern belongs in `sdd-training-legacy`. The one exception is Task 9's false premise, which is planted in a *spec*, not in the code.
- **The history is authored.** Every commit in `specs/` is demo material. Commit messages are read aloud. No `wip`, no `fix typo`, no squashing after the fact.
- **Never rebase or amend a spec commit** once Task 11's audit passes. The demo's `git diff` invocations reference commit subjects.
- **BMAD artifacts are pre-baked** (§9). This repo *contains* them; nothing in the demo generates them live.
- **Language:** all code, specs, comments and commit messages in English.

---

## File Structure

| Path | Responsibility |
|---|---|
| `specs/00-product-brief.md` | BMAD phase 1 output. Module 2's demo starts here. |
| `specs/10-prd.draft.md` | The **deliberately weak** PRD that the quality gate rejects. Module 2's live moment. |
| `specs/10-prd.md` | The PRD after the gate. The diff between draft and final is the lesson. |
| `specs/20-architecture.md` | BMAD phase 3. Names the rotation-window design. |
| `specs/30-epics/E1-key-lifecycle.md` | The epic module 3 zooms into. |
| `specs/30-epics/E2-rate-limiting.md` | A second epic, unbuilt. Shows decomposition without demanding delivery. |
| `specs/40-stories/S1.2-revoke-during-rotation.md` | The story module 3 builds live. |
| `specs/light-path/` | The depth-dial coda: a one-file bug fix at `/quick-spec` depth, no PRD, no architecture. |
| `specs/plans/S1.2-plan.md` | The executable plan module 3 produces and module 4 runs — **carrying the planted false premise**. |
| `src/KeyService/` | The API. Controllers, services, EF context. |
| `tests/KeyService.Tests/` | Real tests. This repo's tests are honest. |
| `audit/HistoryAudit/` | Asserts the commit history still has the shape the demos walk. |
| `DEMO-SCRIPT.md` | Written in Task 11 from the dry-run. Feeds Plan 4's facilitator notes. |

---

## Task 1: Scaffold and the key-lifecycle domain

**Files:**
- Create: `sdd-training-example/KeyService.slnx`, `src/KeyService/`, `tests/KeyService.Tests/`
- Create: `src/KeyService/Models/ApiKey.cs`, `AuditEntry.cs`
- Test: `tests/KeyService.Tests/ApiKeyTests.cs`

**Interfaces:**
- Produces: `KeyService.Models.ApiKey` with `Id`, `Prefix`, `KeyHash`, `CustomerId`, `Scopes`, `CreatedAt`, `ExpiresAt`, `RevokedAt`, and `bool IsActive(DateTime asOf)`. Every later task uses these names.

- [ ] **Step 1: Scaffold**

```bash
mkdir -p sdd-training-example && cd sdd-training-example
dotnet new sln -n KeyService
dotnet new webapi -n KeyService -o src/KeyService -f net10.0 --use-controllers
dotnet new xunit -n KeyService.Tests -o tests/KeyService.Tests -f net10.0
dotnet sln add src/KeyService/KeyService.csproj tests/KeyService.Tests/KeyService.Tests.csproj
dotnet add tests/KeyService.Tests/KeyService.Tests.csproj reference src/KeyService/KeyService.csproj
dotnet add src/KeyService/KeyService.csproj package Microsoft.EntityFrameworkCore.Sqlite
dotnet new gitignore && git init
```

Record the resolved EF version in the commit message; do not pin a version you have not seen resolve.

- [ ] **Step 2: Write the failing lifecycle test**

Create `tests/KeyService.Tests/ApiKeyTests.cs`:

```csharp
using System;
using KeyService.Models;
using Xunit;

namespace KeyService.Tests;

public class ApiKeyTests
{
    private static ApiKey Key(DateTime? revoked = null) => new()
    {
        Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
        Prefix = "ak_live_7Q2",
        KeyHash = "not-a-real-hash",
        CustomerId = 1,
        Scopes = "read,write",
        CreatedAt = new DateTime(2026, 3, 1),
        ExpiresAt = new DateTime(2026, 9, 1),
        RevokedAt = revoked
    };

    [Fact]
    public void ActiveKey_IsActiveInsideItsWindow()
        => Assert.True(Key().IsActive(new DateTime(2026, 5, 1)));

    [Fact]
    public void ExpiredKey_IsNotActive()
        => Assert.False(Key().IsActive(new DateTime(2026, 10, 1)));

    [Fact]
    public void RevokedKey_IsNotActiveEvenInsideItsWindow()
        => Assert.False(Key(revoked: new DateTime(2026, 4, 1)).IsActive(new DateTime(2026, 5, 1)));
}
```

- [ ] **Step 3: Run to verify it fails**

Run: `dotnet test`
Expected: FAIL — `ApiKey` does not exist.

- [ ] **Step 4: Write the models**

Create `src/KeyService/Models/ApiKey.cs`:

```csharp
namespace KeyService.Models;

public class ApiKey
{
    public Guid Id { get; set; }
    public string Prefix { get; set; } = "";
    public string KeyHash { get; set; } = "";
    public int CustomerId { get; set; }
    public string Scopes { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime? RevokedAt { get; set; }

    public bool IsActive(DateTime asOf)
    {
        if (RevokedAt is not null && RevokedAt <= asOf) return false;
        return asOf >= CreatedAt && asOf < ExpiresAt;
    }
}
```

Note the asymmetry: `>= CreatedAt` and `< ExpiresAt`. Half-open by design. This is the *correct* form of the boundary the seed repo gets wrong, and module 5 can point at both.

Create `src/KeyService/Models/AuditEntry.cs` with `Id`, `ApiKeyId`, `Action`, `OccurredAt`, `Actor`.

- [ ] **Step 5: Run to verify it passes, then commit**

```bash
dotnet test
git add -A && git commit -m "feat: api key lifecycle model"
```

---

## Task 2: The Product Brief commit

**Files:**
- Create: `specs/00-product-brief.md`

**Interfaces:**
- Produces: the first artifact in the chain module 2 walks. Its commit subject is read aloud; the demo script cites it.

- [ ] **Step 1: Write the brief**

Two pages maximum. Sections: Problem, Who has it, Why now, What success looks like, What we are explicitly not solving. The last section matters most — module 2 beat 3 teaches non-goals first, and the demo needs a real one to point at.

The non-goals must include *"we are not building key-level rate limiting in v1"* so that Task 5's second epic visibly exists but is visibly unbuilt.

- [ ] **Step 2: Commit as its own artifact**

```bash
git add specs/00-product-brief.md
git commit -m "spec(brief): define the API key management problem and its non-goals"
```

One artifact per commit, from here to Task 7. The demo walks these by `git log --oneline -- specs/`.

---

## Task 3: The weak PRD, and the gate that rejects it

**Files:**
- Create: `specs/10-prd.draft.md`
- Create: `specs/10-prd.md`
- Create: `specs/gates/G1-prd-review.md`

**Interfaces:**
- Consumes: the brief from Task 2.
- Produces: three commits whose diffs are module 2's most persuasive twenty seconds.

Spec §4 Module 2 says the one thing worth running live on the BMAD side is *a quality gate rejecting a deliberately weak PRD*. This task builds that moment. The weakness must be real and specific, not a strawman — a reviewer should be able to defend the draft as "looks fine" at a glance.

- [ ] **Step 1: Write the weak draft**

`specs/10-prd.draft.md` must look competent and fail on exactly four things, none of them cosmetic:

1. **Rotation is described without a window.** "Keys can be rotated" — with no statement of whether the old key keeps working, and for how long. Downstream this is unimplementable.
2. **Revocation has no propagation requirement.** No latency bound, no statement of whether it is synchronous.
3. **An acceptance criterion that cannot fail:** "Key issuance should be fast and reliable."
4. **A hidden assumption never marked as open:** it assumes one key per customer, which contradicts the brief's multi-environment use case.

Commit it:

```bash
git add specs/10-prd.draft.md
git commit -m "spec(prd): first draft for gate review"
```

- [ ] **Step 2: Write the gate's rejection**

`specs/gates/G1-prd-review.md` records the gate's four findings against BMAD's checks — completion criteria met, ambiguities resolved, dependencies documented, can the downstream phase execute from this artifact. The verdict is **rejected**, with the fourth check failing hardest: an architect cannot design a rotation mechanism from a PRD that never says what happens to the old key.

```bash
git add specs/gates/G1-prd-review.md
git commit -m "spec(gate): reject PRD draft — rotation window and revocation latency unspecified"
```

- [ ] **Step 3: Write the PRD that passes**

`specs/10-prd.md` fixes exactly those four. It states a 24-hour rotation overlap, a 30-second revocation propagation bound, a testable issuance criterion, and marks the multi-key question as an explicit Open Question rather than silently answering it.

```bash
git add specs/10-prd.md
git commit -m "spec(prd): rotation overlap 24h, revocation bound 30s, multi-key marked open"
```

- [ ] **Step 4: Verify the diff reads well on a projector**

Run: `git diff HEAD~2:specs/10-prd.draft.md HEAD:specs/10-prd.md`
The output must fit a projector without horizontal scrolling and the four fixes must be visible without narration. If a change is only legible with explanation, rewrite the draft so the diff carries it.

---

## Task 4: Architecture

**Files:**
- Create: `specs/20-architecture.md`

- [ ] **Step 1: Write it, and make it constrain**

The architecture must *decide* the rotation mechanism, not describe options: overlapping validity windows, both keys accepted during the overlap, revocation writes a tombstone that the validation path checks.

Crucially it must state the propagation model explicitly — **revocation propagates asynchronously via cache invalidation, bounded at 30 seconds** — because Task 9's planted false premise contradicts exactly this, and the contradiction has to be findable in a document the room has already seen.

```bash
git add specs/20-architecture.md
git commit -m "spec(arch): overlapping-window rotation with async revocation tombstones"
```

---

## Task 5: Epics and stories

**Files:**
- Create: `specs/30-epics/E1-key-lifecycle.md`, `specs/30-epics/E2-rate-limiting.md`
- Create: `specs/40-stories/S1.1-issue-key.md`, `S1.2-revoke-during-rotation.md`, `S1.3-audit-trail.md`

- [ ] **Step 1: Write the epics**

E1 decomposes into the three stories. E2 exists and is explicitly deferred, tracing back to the brief's non-goal — this is what makes the decomposition credible rather than tidy.

- [ ] **Step 2: Write the stories, each traceable upward**

Every story carries a `Traces to:` line naming its epic, the PRD section, and the architecture decision it depends on. Module 2's traceability beat points at these lines directly.

`S1.2-revoke-during-rotation.md` is the one module 3 builds live. It must be small enough to complete on stage and interesting enough to matter: *a key revoked during its rotation overlap must stop authenticating within the propagation bound, and the surviving key must keep working.*

```bash
git add specs/30-epics specs/40-stories
git commit -m "spec(epics): E1 key lifecycle decomposed into three stories, E2 deferred"
```

---

## Task 6: The light-path artifacts for the depth-dial coda

**Files:**
- Create: `specs/light-path/quick-spec-log-prefix.md`
- Create: `specs/light-path/dev-story-log-prefix.md`

**Interfaces:**
- Consumes: nothing. Deliberately disconnected from the chain above — that is the point.

Spec §4 Module 2's demo coda runs *the same one-file bug fix* down both toolchains at their lightest setting. This task builds the BMAD half, pre-baked as `/quick-spec → /dev-story`.

- [ ] **Step 1: Pick the bug**

A one-file fix with no design content: the audit log writes the key's full prefix where it should write only the first six characters. Real, trivially verifiable, and touches exactly one file.

- [ ] **Step 2: Write the two artifacts, and keep them short**

`quick-spec-log-prefix.md` must be under fifteen lines. If it grows past that, the coda stops making its point — the whole argument is that the artifact shrinks with the change.

There is **no** Product Brief, **no** PRD, **no** Architecture document for this change. Their absence is the demonstration. Do not create placeholder files saying "not applicable"; nothing at all is the correct output.

```bash
git add specs/light-path
git commit -m "spec(light-path): quick-spec and dev-story for the audit log prefix fix"
```

- [ ] **Step 3: Implement the fix as a separate commit**

```bash
git commit -m "fix: log only the first six characters of the key prefix"
```

The demo shows this commit next to the four-commit chain above it. Two changes, two depths, same repository — that contrast is the coda's payload.

---

## Task 7: Build story S1.1 conventionally

**Files:**
- Create: `src/KeyService/Services/KeyIssuer.cs`, `Data/KeyContext.cs`, `Controllers/KeysController.cs`
- Test: `tests/KeyService.Tests/KeyIssuerTests.cs`

**Interfaces:**
- Produces: `KeyIssuer.Issue(int customerId, string scopes, DateTime now)` returning `(ApiKey key, string plaintext)`; `KeysController` with `POST /keys`, `POST /keys/{id}/rotate`, `DELETE /keys/{id}`.

Module 3 builds S1.2 live, so S1.1 must already be done — the room needs a codebase that works before it watches one grow.

- [ ] **Step 1–5: TDD the issuer**

Write the failing test for prefix format and hash storage, run it red, implement, run it green, commit. The plaintext key is returned once and never stored; only `KeyHash` persists.

```bash
git commit -m "feat: issue keys with hashed storage and single-use plaintext return"
```

---

## Task 8: The executable plan for S1.2

**Files:**
- Create: `specs/plans/S1.2-plan.md`

**Interfaces:**
- Consumes: story S1.2 (Task 5), architecture (Task 4).
- Produces: the plan module 3 shows and module 4 executes live.

- [ ] **Step 1: Write it in action / verify / done form**

Six to eight steps, each with its own verification command. Every step must be runnable with no human input — this plan is module 3's worked example of its own principle.

- [ ] **Step 2: Do NOT plant the false premise yet**

Task 9 does that, as a separate commit. The demo needs to show a plan that looks right, then discover it is not.

```bash
git add specs/plans/S1.2-plan.md
git commit -m "plan(S1.2): revoke-during-rotation, eight verifiable steps"
```

---

## Task 9: Plant the false premise

**Files:**
- Modify: `specs/plans/S1.2-plan.md` — steps 4 and 5

**Interfaces:**
- Consumes: the plan from Task 8, the architecture from Task 4.
- Produces: module 4's live correction-loop moment.

Spec §4 Module 4's demo executes this plan live and hits a spec that is wrong. The premise must be *plausible* and must contradict something already written down, so the correction is discoverable rather than arbitrary.

- [ ] **Step 1: Rewrite steps 4 and 5 to assume synchronous propagation**

The plan step must assert that after `DELETE /keys/{id}` returns, the key is immediately rejected everywhere — and its `<verify>` must be a test that asserts exactly that with no wait. The architecture (Task 4) says propagation is asynchronous within 30 seconds. Both documents are in the repo; only one can be right.

- [ ] **Step 2: Confirm the failure is real, not theatrical**

Run the plan's step-5 verification against the code from Task 7 plus a stub revocation path. It must fail for the *stated* reason — the cache still serves the revoked key — not because of a compile error or a missing method. A failure the room can misread as a typo teaches nothing.

- [ ] **Step 3: Commit**

```bash
git add specs/plans/S1.2-plan.md
git commit -m "plan(S1.2): assume revocation is immediately visible"
```

The commit message is deliberately confident. It is the sound a wrong spec makes.

---

## Task 10: The green-tests-wrong-behaviour PR

**Files:**
- Create: branch `pr/rate-limit-window`
- Modify: `src/KeyService/Services/RateLimiter.cs`, its tests

**Interfaces:**
- Produces: the artifact module 4's second demo half walks, and the diff Lab 4 hands participants.

- [ ] **Step 1: Write a change that alters behaviour, passes its tests, and leaves the spec untouched**

Change the rate-limit window from a fixed window to a sliding one. Every existing test passes — they only assert "requests over the limit are rejected", which both implementations satisfy. Burst behaviour at the window edge changes materially, and no spec says which is correct.

- [ ] **Step 2: Plant one implementation defect the spec is silent about by design**

Inside the same diff, a `Dictionary` counter keyed by customer with no eviction — an unbounded memory growth that no spec would ever mention because it is implementation judgment (module 1 beat 6). This is the second half of Lab 4's two-sided answer key, and the thing that proves module 4 beat 8's point: fixing the spec and regenerating would not remove it.

- [ ] **Step 3: Commit on the branch, do not merge**

```bash
git checkout -b pr/rate-limit-window
git commit -m "perf: switch rate limiting to a sliding window"
git checkout main
```

Leaving it unmerged is what lets the demo show it as a pull request.

---

## Task 11: History audit and demo dry-run

**Files:**
- Create: `audit/HistoryAudit/HistoryShapeTests.cs`
- Create: `DEMO-SCRIPT.md`

- [ ] **Step 1: Assert the history still has the demo's shape**

```csharp
using System.Diagnostics;
using System.Linq;
using Xunit;

namespace HistoryAudit;

public class HistoryShapeTests
{
    private static string Git(string args)
    {
        var p = Process.Start(new ProcessStartInfo("git", args)
            { RedirectStandardOutput = true, WorkingDirectory = RepoRoot() })!;
        var output = p.StandardOutput.ReadToEnd();
        p.WaitForExit();
        return output;
    }

    private static string RepoRoot()
    {
        var dir = new System.IO.DirectoryInfo(System.IO.Directory.GetCurrentDirectory());
        while (dir is not null && !System.IO.Directory.Exists(System.IO.Path.Combine(dir.FullName, ".git")))
            dir = dir.Parent;
        Assert.NotNull(dir);
        return dir!.FullName;
    }

    [Theory]
    [InlineData("spec(brief):")]
    [InlineData("spec(prd): first draft for gate review")]
    [InlineData("spec(gate): reject PRD draft")]
    [InlineData("spec(arch):")]
    [InlineData("spec(epics):")]
    [InlineData("spec(light-path):")]
    [InlineData("plan(S1.2): assume revocation is immediately visible")]
    public void DemoCommit_StillExists(string subjectFragment)
    {
        var log = Git("log --format=%s");
        Assert.Contains(log.Split('\n'), line => line.Contains(subjectFragment));
    }

    [Fact]
    public void GateRejection_PrecedesTheFinalPrd()
    {
        var subjects = Git("log --reverse --format=%s").Split('\n').ToList();
        var gate = subjects.FindIndex(s => s.Contains("spec(gate): reject"));
        var final = subjects.FindIndex(s => s.Contains("rotation overlap 24h"));
        Assert.True(gate >= 0 && final > gate,
            "The gate rejection must come before the passing PRD, or module 2's diff tells the story backwards.");
    }
}
```

- [ ] **Step 2: Dry-run modules 2, 3 and 4 against this repo, timed**

Module 2: walk the chain by diff, then run the light-path coda. Module 3: show the plan, run `writing-plans` live against story S1.3. Module 4: execute the S1.2 plan live and let it hit the false premise.

- [ ] **Step 3: Write `DEMO-SCRIPT.md`**

One section per demo: the exact commands, the exact commit hashes or subjects to walk, what to say while a command runs, and the recorded-fallback cue point. Plan 4's facilitator notes are assembled from this file.

- [ ] **Step 4: Verify the false-premise moment actually lands**

Time from starting the plan execution to the agent stopping on the contradiction. If it exceeds four minutes the room loses the thread — shorten the plan's earlier steps, never the discovery itself.

```bash
git add -A && git commit -m "chore: history audit and demo script"
```

---

## Self-Review

**Spec coverage.** §6's running example is Tasks 1 and 7. §9's "BMAD side always pre-baked" is satisfied because every BMAD artifact is committed, never generated live. Module 2's demo is Tasks 2–5, its live gate moment is Task 3, its depth-dial coda is Task 6. Module 3's demo is Tasks 5, 7 and 8. Module 4's two demo halves are Tasks 9 and 10. Lab 4's two-sided answer key is Task 10 Steps 1 and 2.

**The one thing this plan does that Plan 1 does not.** It treats commit history as an authored artifact with its own regression test. Task 11's `HistoryShapeTests` exists because a rebase or an amend months later would silently break every demo that walks a commit subject, and nothing else would notice.

**Placeholder scan.** Tasks 2, 4, 5 and 7 specify document contents by required section and required property rather than by full text, because these are prose artifacts whose wording is the author's. Each names what must be present and what downstream task depends on it. Tasks 3, 9 and 10 — the three that carry planted content — are specified exactly, because their precision is what makes the demos work.

**Type consistency.** `ApiKey.IsActive(DateTime)` is declared in Task 1 and used in Tasks 7 and 9. `KeyIssuer.Issue(int, string, DateTime)` is declared in Task 7's Interfaces and consumed by Task 9's verification. Commit subjects asserted in Task 11 are quoted verbatim from Tasks 2, 3, 4, 5, 6 and 9.
