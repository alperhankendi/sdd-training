# Seed Legacy Repository Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `sdd-training-legacy`, a deliberately bad 5,000–8,000 line C# billing application in which all seven anti-patterns required by module 5 of the SDD training are present, findable inside a 20-minute demo, and verified by an automated audit.

**Architecture:** An ASP.NET Core MVC billing app whose *bulk* is generated from a written specification (`SEED-SPEC.md`) and whose *defects* are then hand-planted with exact code. This split matters: the boring 80% is volume the demo never inspects, while each planted property must sit at a known file and line so the instructor can reach it reliably. A `SeedAudit` xUnit project — kept separate from the app's own deliberately-meaningless tests — asserts every planted property still exists, so a later refactor cannot silently remove the material module 5 depends on.

**Tech Stack:** .NET 10 (`net10.0`), ASP.NET Core MVC with Razor views, Entity Framework Core with the SQLite provider, xUnit.

**Spec:** `docs/superpowers/specs/2026-08-30-sdd-training-design.md` — see §7 (Seed Legacy Repository), §4 Module 5, §6 (running example, for the deliberate echo), and §9 (this deliverable has no fallback).

## Global Constraints

- **Target framework:** `net10.0`. Verified on this machine: SDK 10.0.400 is the only SDK present, and `dotnet new -f net8.0` fails with exit 127 because the SDK 10 templates do not offer that framework. Only the instructor builds these repos — participants' laptops are read-only (spec §2.4) — so matching the authoring machine is correct.
- **Domain:** invoicing and billing. It must NOT be API-key management — that is the running example (§6), and module 5 needs a different context so brownfield is not demonstrated on a greenfield example.
- **Size:** 5,000–8,000 lines of C# and Razor across `src/`. Below 5,000 the repo does not feel legacy; above 8,000 it stops being navigable in a 20-minute demo.
- **Startup:** `dotnet run --project src/LegacyBilling` must serve on `http://localhost:5080` and `dotnet test` must complete, both in under two minutes on a clean machine with no manual setup. The database is SQLite, created and seeded on first run.
- **No repository documentation** beyond bare run instructions. No architecture notes, no XML doc comments on public members, no `CLAUDE.md`, no `AGENTS.md`. Module 5 beat 5 teaches `CLAUDE.md` as the cheapest first artifact; the room must find it absent.
- **Every planted defect is load-bearing.** Do not fix a defect you notice while working. The audit project exists to stop exactly that.
- **Language:** all code, comments and commit messages in English.
- **Commits:** one commit per task, message prefixed `seed:`.

---

## File Structure

| Path | Responsibility |
|---|---|
| `SEED-SPEC.md` | The generation spec for the repo's bulk. Not shipped to participants; it is the tool that produces volume, and it is deleted from the participant-facing branch in Task 11. |
| `README.md` | Bare run instructions only. Deliberately inadequate. |
| `src/LegacyBilling/Program.cs` | Host setup, DI registration, SQLite bootstrap and seeding. |
| `src/LegacyBilling/Controllers/InvoiceController.cs` | **Plant 1 — the god file.** Routing, validation, persistence, money formatting and notification, all in one class. ~900 lines. |
| `src/LegacyBilling/Controllers/CustomerController.cs` | Ordinary bulk. Reasonable by contrast, so the god file stands out. |
| `src/LegacyBilling/Controllers/ReportController.cs` | Ordinary bulk. |
| `src/LegacyBilling/Views/Invoice/Details.cshtml` | **Plant 2 — business rules in the view.** Discount and tax logic living where no spec would look. |
| `src/LegacyBilling/Services/BillingService.cs` | **Plant 3a** — `ApplyDiscount` overloads with divergent semantics. |
| `src/LegacyBilling/Services/BillingService.Adjustments.cs` | **Plant 3b** — the partial-class half holding the second, differently-behaved `ApplyDiscount`. |
| `src/LegacyBilling/Services/PeriodCalculator.cs` | **Plant 6 — the boundary bug.** Doubly-inclusive period comparison. |
| `src/LegacyBilling/Services/InvoiceNumberGenerator.cs` | Ordinary bulk, but reads `AppConfig` — one of the scattered coupling sites. |
| `src/LegacyBilling/Services/NotificationService.cs` | Ordinary bulk; a second `AppConfig` site. |
| `src/LegacyBilling/Config/AppConfig.cs` | **Plant 4 — the static config singleton.** Mutable global state read from seven call sites. |
| `src/LegacyBilling/Data/BillingContext.cs` | EF Core context. |
| `src/LegacyBilling/Data/Seed.cs` | Deterministic demo data, including the invoice that exposes Plant 6. |
| `src/LegacyBilling/Models/*.cs` | `Invoice`, `InvoiceLine`, `Customer`, `Payment`, enums. |
| `tests/LegacyBilling.Tests/*.cs` | **Plant 5 — the three meaningless tests**, plus ordinary-bulk tests that are merely thin. |
| `audit/SeedAudit/*.cs` | The audit suite. Asserts all seven plants are present. Never shown to participants. |

Ordinary bulk carries the line count. The seven plants carry the lesson. Keep them in the files named above so the facilitator notes (Plan 3) can cite exact paths.

---

## Task 1: Repository scaffold that builds, runs and tests

**Files:**
- Create: `sdd-training-legacy/.gitignore`
- Create: `sdd-training-legacy/LegacyBilling.slnx`
- Create: `sdd-training-legacy/src/LegacyBilling/LegacyBilling.csproj`
- Create: `sdd-training-legacy/src/LegacyBilling/Program.cs`
- Create: `sdd-training-legacy/tests/LegacyBilling.Tests/LegacyBilling.Tests.csproj`
- Create: `sdd-training-legacy/tests/LegacyBilling.Tests/SmokeTests.cs`
- Create: `sdd-training-legacy/README.md`

**Interfaces:**
- Consumes: nothing.
- Produces: a solution named `LegacyBilling.slnx` (SDK 10 emits the XML solution format, not `.sln`) with projects `LegacyBilling` (web, `net10.0`) and `LegacyBilling.Tests` (xUnit, `net10.0`); the web app listens on `http://localhost:5080`.

- [ ] **Step 1: Create the solution and projects**

```bash
mkdir -p sdd-training-legacy && cd sdd-training-legacy
dotnet new sln -n LegacyBilling
dotnet new mvc -n LegacyBilling -o src/LegacyBilling -f net10.0
dotnet new xunit -n LegacyBilling.Tests -o tests/LegacyBilling.Tests -f net10.0
dotnet sln add src/LegacyBilling/LegacyBilling.csproj tests/LegacyBilling.Tests/LegacyBilling.Tests.csproj
dotnet add tests/LegacyBilling.Tests/LegacyBilling.Tests.csproj reference src/LegacyBilling/LegacyBilling.csproj
dotnet add src/LegacyBilling/LegacyBilling.csproj package Microsoft.EntityFrameworkCore.Sqlite
# Do not pin a version here. Let NuGet resolve the latest compatible with net10.0,
# then record the resolved version in the commit message for reproducibility.
git init
```

- [ ] **Step 2: Write the failing smoke test**

Replace the entire contents of `tests/LegacyBilling.Tests/SmokeTests.cs`:

```csharp
using Xunit;

namespace LegacyBilling.Tests;

public class SmokeTests
{
    [Fact]
    public void ApplicationAssembly_IsReferenced()
    {
        var type = typeof(LegacyBilling.Program);
        Assert.Equal("LegacyBilling", type.Assembly.GetName().Name);
    }
}
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `dotnet test`
Expected: FAIL — `Program` is inaccessible because the MVC template emits top-level statements with an implicit internal `Program` class.

- [ ] **Step 4: Make `Program` reachable and pin the port**

Replace the entire contents of `src/LegacyBilling/Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
builder.WebHost.UseUrls("http://localhost:5080");

var app = builder.Build();
app.UseStaticFiles();
app.UseRouting();
app.MapControllerRoute(name: "default", pattern: "{controller=Invoice}/{action=Index}/{id?}");
app.Run();

namespace LegacyBilling
{
    public partial class Program { }
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `dotnet test`
Expected: PASS, 1 test.

- [ ] **Step 6: Write the inadequate README**

Replace the entire contents of `README.md`:

```markdown
# LegacyBilling

## Run

    dotnet run --project src/LegacyBilling

Then open http://localhost:5080

## Test

    dotnet test
```

Nothing else. No architecture section, no domain glossary, no contribution notes. The absence is the teaching material for module 5 beat 5.

- [ ] **Step 7: Verify the app starts**

Run: `dotnet run --project src/LegacyBilling`
Expected: console shows `Now listening on: http://localhost:5080`. Stop it with Ctrl-C.

`GET /` returns **404 until Task 8**, because the default route points at
`InvoiceController` and the god file does not exist yet. This is a correct
intermediate state, not a defect — Step 7 verifies the host listens, nothing more.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "seed: scaffold LegacyBilling solution with smoke test"
```

---

## Task 2: Domain model and EF Core context

**Files:**
- Create: `src/LegacyBilling/Models/Customer.cs`
- Create: `src/LegacyBilling/Models/Invoice.cs`
- Create: `src/LegacyBilling/Models/InvoiceLine.cs`
- Create: `src/LegacyBilling/Models/Payment.cs`
- Create: `src/LegacyBilling/Data/BillingContext.cs`
- Test: `tests/LegacyBilling.Tests/ModelTests.cs`

**Interfaces:**
- Consumes: the solution from Task 1.
- Produces: `LegacyBilling.Models.{Customer, Invoice, InvoiceLine, Payment}`, enums `CustomerTier { Standard, Premium, Enterprise }` and `InvoiceStatus { Draft, Issued, Paid, Void }`, and `LegacyBilling.Data.BillingContext` with `DbSet<Customer> Customers`, `DbSet<Invoice> Invoices`, `DbSet<InvoiceLine> InvoiceLines`, `DbSet<Payment> Payments`. Every later task uses these exact names.

- [ ] **Step 1: Write the failing model test**

Create `tests/LegacyBilling.Tests/ModelTests.cs`:

```csharp
using System;
using LegacyBilling.Models;
using Xunit;

namespace LegacyBilling.Tests;

public class ModelTests
{
    [Fact]
    public void Invoice_TotalsItsLines()
    {
        var invoice = new Invoice
        {
            Id = 1,
            CustomerId = 7,
            PeriodStart = new DateTime(2026, 3, 1),
            PeriodEnd = new DateTime(2026, 4, 1),
            Status = InvoiceStatus.Draft
        };
        invoice.Lines.Add(new InvoiceLine { Amount = 100m, OccurredAt = new DateTime(2026, 3, 5) });
        invoice.Lines.Add(new InvoiceLine { Amount = 42.50m, OccurredAt = new DateTime(2026, 3, 9) });

        Assert.Equal(142.50m, invoice.Subtotal);
    }
}
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `dotnet test --filter Invoice_TotalsItsLines`
Expected: FAIL — build error, `Invoice` does not exist.

- [ ] **Step 3: Write the models**

Create `src/LegacyBilling/Models/Customer.cs`:

```csharp
namespace LegacyBilling.Models;

public enum CustomerTier { Standard, Premium, Enterprise }

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string TaxRegion { get; set; } = "TR";
    public CustomerTier Tier { get; set; } = CustomerTier.Standard;
    public List<Invoice> Invoices { get; set; } = new();
}
```

Create `src/LegacyBilling/Models/Invoice.cs`:

```csharp
namespace LegacyBilling.Models;

public enum InvoiceStatus { Draft, Issued, Paid, Void }

public class Invoice
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public Customer? Customer { get; set; }
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
    public InvoiceStatus Status { get; set; } = InvoiceStatus.Draft;
    public string Number { get; set; } = "";
    public List<InvoiceLine> Lines { get; set; } = new();
    public List<Payment> Payments { get; set; } = new();

    public decimal Subtotal => Lines.Sum(l => l.Amount);
}
```

Create `src/LegacyBilling/Models/InvoiceLine.cs`:

```csharp
namespace LegacyBilling.Models;

public class InvoiceLine
{
    public int Id { get; set; }
    public int InvoiceId { get; set; }
    public string Description { get; set; } = "";
    public string Category { get; set; } = "usage";
    public decimal Amount { get; set; }
    public DateTime OccurredAt { get; set; }
}
```

Create `src/LegacyBilling/Models/Payment.cs`:

```csharp
namespace LegacyBilling.Models;

public class Payment
{
    public int Id { get; set; }
    public int InvoiceId { get; set; }
    public decimal Amount { get; set; }
    public DateTime ReceivedAt { get; set; }
    public string Reference { get; set; } = "";
}
```

- [ ] **Step 4: Write the EF Core context**

Create `src/LegacyBilling/Data/BillingContext.cs`:

```csharp
using LegacyBilling.Models;
using Microsoft.EntityFrameworkCore;

namespace LegacyBilling.Data;

public class BillingContext : DbContext
{
    public BillingContext(DbContextOptions<BillingContext> options) : base(options) { }

    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Invoice> Invoices => Set<Invoice>();
    public DbSet<InvoiceLine> InvoiceLines => Set<InvoiceLine>();
    public DbSet<Payment> Payments => Set<Payment>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Invoice>().HasMany(i => i.Lines).WithOne().HasForeignKey(l => l.InvoiceId);
        b.Entity<Invoice>().HasMany(i => i.Payments).WithOne().HasForeignKey(p => p.InvoiceId);
        b.Entity<Customer>().HasMany(c => c.Invoices).WithOne(i => i.Customer!).HasForeignKey(i => i.CustomerId);
        b.Entity<InvoiceLine>().Property(l => l.Amount).HasPrecision(18, 2);
        b.Entity<Payment>().Property(p => p.Amount).HasPrecision(18, 2);
    }
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `dotnet test --filter Invoice_TotalsItsLines`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "seed: add billing domain model and EF Core context"
```

---

## Task 3: Write the generation spec for the repo's bulk

**Files:**
- Create: `SEED-SPEC.md`

**Interfaces:**
- Consumes: the model names from Task 2.
- Produces: `SEED-SPEC.md`, the input to Task 4's generation step. It is deleted from the participant branch in Task 11.

There is a deliberate irony here worth noticing but not shipping: the bulk of a repository that teaches spec-driven development is itself generated from a spec. It is also the only practical way to reach 5,000 lines without hand-writing filler.

- [ ] **Step 1: Write the generation spec**

Create `SEED-SPEC.md`:

```markdown
# LegacyBilling — generation spec for bulk code

Generate ordinary, unremarkable ASP.NET Core MVC code for a small invoicing
application. This is volume the training demo never inspects closely. It must
compile, run, and look like code a competent team wrote in a hurry four years ago.

## Do not generate
- `Controllers/InvoiceController.cs`
- `Views/Invoice/Details.cshtml`
- `Services/BillingService.cs`, `Services/BillingService.Adjustments.cs`
- `Services/PeriodCalculator.cs`
- `Config/AppConfig.cs`
- Anything under `tests/` or `audit/`

Those are planted by hand in later tasks. Generating them would overwrite the defects.

## Generate

**Controllers** (`src/LegacyBilling/Controllers/`)
- `CustomerController.cs` — Index, Details, Create, Edit, Delete over `Customer`. Constructor-injected `BillingContext`. 150–250 lines.
- `ReportController.cs` — three read-only report actions: revenue by month, top customers by billed amount, unpaid invoices older than 30 days. 200–300 lines.

**Services** (`src/LegacyBilling/Services/`)
- `InvoiceNumberGenerator.cs` — produces numbers shaped `INV-{year}-{sequence:D5}`. Must read its prefix from `LegacyBilling.Config.AppConfig.InvoicePrefix` (a static member planted separately; assume it exists and is a `string`).
- `NotificationService.cs` — writes notification records to a log file. Must read `LegacyBilling.Config.AppConfig.NotificationsEnabled` (a `bool`) and `AppConfig.SmtpHost` (a `string`).
- `TaxTableService.cs` — returns a VAT rate for a `TaxRegion` string from a hard-coded dictionary covering TR, DE, GB, US. Public surface: `decimal RateFor(string taxRegion)`.

**Pin every generated service's public surface, not just this one.** In execution
Task 8's hand-written skeleton failed to compile because it assumed
`InvoiceNumberGenerator.Next(int year)` and `NotificationService.Send(string, string)`,
while generation produced `Next(DateTime issuedOn)` and a family of typed methods
(`InvoiceIssued`, `PaymentReceived`, ...). **A generated signature the plan does not
pin is a signature the plan cannot call.** Required minimum:
- `InvoiceNumberGenerator`: `string Next(DateTime issuedOn)`
- `NotificationService`: `void InvoiceIssued(int custId, string invoiceNumber, decimal total)`
- `CsvExporter.cs` — exports invoices to CSV.

**Views** (`src/LegacyBilling/Views/`)
- Razor views for every Customer and Report action. Plain Bootstrap markup, no logic beyond loops and formatting.
- `Views/Invoice/Index.cshtml` and `Views/Invoice/Create.cshtml` — listing and form only, no business logic.

**Models**
- `ReportRow.cs`, `InvoiceSummary.cs`, and any view models the above need.

## Style requirements — these make it read as legacy
- No XML documentation comments on any public member.
- No nullable-reference annotations beyond what the compiler forces.
- Occasional commented-out blocks left in place, three or four across the codebase.
- At least two `// TODO:` comments referring to work nobody will do.
- Inconsistent naming between layers: `CustomerId` in models, `custId` in some
  service parameters, `customer_id` in one raw SQL string.
- Business dates handled as `DateTime`, never `DateOnly`, with no time-zone handling anywhere.

## Constraints
- Target `net10.0`. Compiles with zero errors and zero warnings that block build.
- Total generated output: **4,000–5,500 lines** across C# and `.cshtml`. The repository already holds ~225 lines of scaffold and the hand-planted defects add ~1,100 later; this range is what makes the final repository land in 5,000–8,000.
- No new NuGet packages beyond those already referenced.
- Do not add tests. Do not add documentation files.
```

- [ ] **Step 2: Commit**

```bash
git add SEED-SPEC.md
git commit -m "seed: add generation spec for bulk code"
```

---

## Task 4: Generate the bulk and verify it builds

**Files:**
- Create: everything listed under "Generate" in `SEED-SPEC.md`
- Modify: `src/LegacyBilling/Program.cs` — register the generated services
- Test: `tests/LegacyBilling.Tests/BulkBuildTests.cs`

**Interfaces:**
- Consumes: `SEED-SPEC.md` from Task 3; models from Task 2.
- Produces: `LegacyBilling.Services.{InvoiceNumberGenerator, NotificationService, TaxTableService, CsvExporter}` and the Customer/Report controllers and views. `TaxTableService` exposes `decimal RateFor(string taxRegion)`; Task 6 calls it from the Razor view.

- [ ] **Step 1: Create the `AppConfig` stub FIRST**

The generated code reads `AppConfig`, so the stub must exist before generation or
the agent cannot run its own exit test. Create `src/LegacyBilling/Config/AppConfig.cs`
with only the three members the generated code touches:

```csharp
namespace LegacyBilling.Config;

public static class AppConfig
{
    public static string InvoicePrefix = "INV";
    public static bool NotificationsEnabled = true;
    public static string SmtpHost = "localhost";
}
```

Task 5 replaces this file wholesale. Do not add other members here.

- [ ] **Step 2: Generate the bulk from the spec**

Hand `SEED-SPEC.md` to a coding agent with this instruction, verbatim:

> Read `SEED-SPEC.md` and generate exactly the files it lists under "Generate", honouring every style requirement and constraint. Do not create any file listed under "Do not generate". Do not add tests or documentation. Stop when the solution builds.

`AppConfig` and `PeriodCalculator` do not exist yet, so the generated code that references them will not compile until Tasks 5 and 9. That is expected and is resolved in Step 3.

- [ ] **Step 3: Write the failing line-count test**

This is an **interim floor**, not the final size check. At this point the plants
of Tasks 5–11 have not landed, and they add roughly 1,100 lines — chiefly the
~900-line god controller. Asserting the final 5,000–8,000 range here would fail
by arithmetic, not by defect. The final range is asserted by the audit suite in
Task 11.

Create `tests/LegacyBilling.Tests/BulkBuildTests.cs`:

```csharp
using System.IO;
using System.Linq;
using Xunit;

namespace LegacyBilling.Tests;

public class BulkBuildTests
{
    private static string SrcRoot()
    {
        var dir = new DirectoryInfo(Directory.GetCurrentDirectory());
        while (dir is not null && !Directory.Exists(Path.Combine(dir.FullName, "src")))
            dir = dir.Parent;
        Assert.NotNull(dir);
        return Path.Combine(dir!.FullName, "src", "LegacyBilling");
    }

    [Fact]
    public void BulkGeneration_ReachedItsFloor()
    {
        var lines = Directory
            .EnumerateFiles(SrcRoot(), "*.*", SearchOption.AllDirectories)
            .Where(f => f.EndsWith(".cs") || f.EndsWith(".cshtml"))
            .Where(f => !f.Contains(Path.Combine("obj", "")) && !f.Contains(Path.Combine("bin", "")))
            .Sum(f => File.ReadAllLines(f).Length);

        Assert.InRange(lines, 4000, 6800);
    }
}
```

- [ ] **Step 4: Register generated services in `Program.cs`**

In `src/LegacyBilling/Program.cs`, immediately after `builder.Services.AddControllersWithViews();`, insert:

```csharp
builder.Services.AddDbContext<LegacyBilling.Data.BillingContext>(o =>
    o.UseSqlite("Data Source=billing.db"));
builder.Services.AddScoped<LegacyBilling.Services.InvoiceNumberGenerator>();
builder.Services.AddScoped<LegacyBilling.Services.NotificationService>();
builder.Services.AddScoped<LegacyBilling.Services.TaxTableService>();
builder.Services.AddScoped<LegacyBilling.Services.CsvExporter>();
```

Add `using Microsoft.EntityFrameworkCore;` at the top of the file.

- [ ] **Step 5: Run the build and the line-count test**

Run: `dotnet build && dotnet test --filter BulkGeneration_ReachedItsFloor`
Expected: build succeeds; the test PASSES. Under the floor, add volume by deepening `ReportController` and its views. Over the ceiling, trim the `CsvExporter` views. Never pad with comments or blank lines.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "seed: generate bulk controllers, services and views from SEED-SPEC"
```

---

## Task 5: Plant 4 — the static config singleton

**Files:**
- Modify: `src/LegacyBilling/Config/AppConfig.cs` (replace wholesale)
- Modify: `src/LegacyBilling/Services/InvoiceNumberGenerator.cs`
- Modify: `src/LegacyBilling/Services/NotificationService.cs`
- Test: `audit/SeedAudit/ConfigCouplingAudit.cs`
- Create: `audit/SeedAudit/SeedAudit.csproj`

**Interfaces:**
- Consumes: the stub from Task 4 Step 3.
- Produces: `LegacyBilling.Config.AppConfig` with public mutable statics `InvoicePrefix` (string), `NotificationsEnabled` (bool), `SmtpHost` (string), `LateFeePercent` (decimal), `GracePeriodDays` (int), `DefaultTaxRegion` (string), `RoundingMode` (string). Tasks 6, 7 and 8 read these.

This plant serves module 5 beat 6, seam finding: you cannot draw a boundary you can specify around code that reaches into mutable global state from seven places.

- [ ] **Step 1: Create the audit project**

```bash
dotnet new xunit -n SeedAudit -o audit/SeedAudit -f net10.0
dotnet sln add audit/SeedAudit/SeedAudit.csproj
dotnet add audit/SeedAudit/SeedAudit.csproj reference src/LegacyBilling/LegacyBilling.csproj
```

- [ ] **Step 2: Write the failing audit**

Create `audit/SeedAudit/ConfigCouplingAudit.cs`:

```csharp
using System;
using System.IO;
using System.Linq;
using Xunit;

namespace SeedAudit;

public class ConfigCouplingAudit
{
    internal static string SrcRoot()
    {
        var dir = new DirectoryInfo(Directory.GetCurrentDirectory());
        while (dir is not null && !Directory.Exists(Path.Combine(dir.FullName, "src")))
            dir = dir.Parent;
        Assert.NotNull(dir);
        return Path.Combine(dir!.FullName, "src", "LegacyBilling");
    }

    internal static string[] SourceFiles() => Directory
        .EnumerateFiles(SrcRoot(), "*.*", SearchOption.AllDirectories)
        .Where(f => f.EndsWith(".cs") || f.EndsWith(".cshtml"))
        .Where(f => !f.Contains(Path.Combine("obj", "")) && !f.Contains(Path.Combine("bin", "")))
        .ToArray();

    [Fact]
    public void AppConfig_IsReadFromAtLeastSevenCallSites()
    {
        var sites = SourceFiles()
            .Where(f => !f.EndsWith("AppConfig.cs"))
            .Sum(f => File.ReadAllText(f).Split("AppConfig.").Length - 1);

        Assert.True(sites >= 7, $"AppConfig is read from only {sites} call sites; module 5 seam finding needs at least 7.");
    }

    [Fact]
    public void AppConfig_ExposesMutableStatics()
    {
        var fields = typeof(LegacyBilling.Config.AppConfig)
            .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static)
            .Where(f => !f.IsInitOnly && !f.IsLiteral)
            .ToArray();

        Assert.True(fields.Length >= 7, $"AppConfig exposes only {fields.Length} mutable statics; expected at least 7.");
    }
}
```

- [ ] **Step 3: Run the audit to verify it fails**

Run: `dotnet test audit/SeedAudit`
Expected: both tests FAIL — the stub has 3 members and few call sites.

- [ ] **Step 4: Replace `AppConfig` wholesale**

Replace the entire contents of `src/LegacyBilling/Config/AppConfig.cs`:

```csharp
namespace LegacyBilling.Config;

// Loaded once at startup from appsettings. Mutable because the ops team
// needed to flip NotificationsEnabled without a redeploy, back in 2022.
public static class AppConfig
{
    public static string InvoicePrefix = "INV";
    public static bool NotificationsEnabled = true;
    public static string SmtpHost = "localhost";
    public static decimal LateFeePercent = 1.5m;
    public static int GracePeriodDays = 14;
    public static string DefaultTaxRegion = "TR";
    public static string RoundingMode = "half-up";
}
```

- [ ] **Step 5: Scatter the reads**

In `src/LegacyBilling/Services/InvoiceNumberGenerator.cs`, ensure the number format reads `AppConfig.InvoicePrefix` inline at the point of use rather than via a constructor-captured field. In `src/LegacyBilling/Services/NotificationService.cs`, ensure both `AppConfig.NotificationsEnabled` and `AppConfig.SmtpHost` are read inline inside the send method, not hoisted.

The remaining four call sites arrive in Tasks 6, 7 and 8, which read `LateFeePercent`, `GracePeriodDays`, `DefaultTaxRegion` and `RoundingMode`. Expect `AppConfig_IsReadFromAtLeastSevenCallSites` to stay red until Task 8.

- [ ] **Step 6: Run the audit**

Run: `dotnet test audit/SeedAudit --filter AppConfig_ExposesMutableStatics`
Expected: PASS. The call-site test remains red by design until Task 8.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "seed: plant static mutable AppConfig singleton"
```

---

## Task 6: Plant 2 — business rules embedded in the Razor view

**Files:**
- Create: `src/LegacyBilling/Views/Invoice/Details.cshtml`
- Test: `audit/SeedAudit/ViewLogicAudit.cs`

**Interfaces:**
- Consumes: `Invoice`, `InvoiceLine`, `CustomerTier` (Task 2); `TaxTableService.RateFor` (Task 4); `AppConfig.RoundingMode` and `AppConfig.DefaultTaxRegion` (Task 5).
- Produces: a view whose displayed total cannot be reproduced from any C# file. This is the archetypal "knowledge with no home" for module 5 beat 3.

The discount ladder below exists in exactly one place in the repository: this view. That is the whole point. A participant running the deletion test on `BillingService` will conclude the spec is complete, because the missing rule is not in the file they are reading.

- [ ] **Step 1: Write the failing audit**

Create `audit/SeedAudit/ViewLogicAudit.cs`:

```csharp
using System.IO;
using System.Linq;
using Xunit;

namespace SeedAudit;

public class ViewLogicAudit
{
    [Fact]
    public void InvoiceDetails_ContainsBusinessRulesFoundNowhereElse()
    {
        var view = Path.Combine(ConfigCouplingAudit.SrcRoot(), "Views", "Invoice", "Details.cshtml");
        Assert.True(File.Exists(view), "Views/Invoice/Details.cshtml is missing.");

        var text = File.ReadAllText(view);
        Assert.Contains("CustomerTier.Enterprise", text);
        Assert.Contains("0.12m", text);

        var elsewhere = ConfigCouplingAudit.SourceFiles()
            .Where(f => !f.EndsWith("Details.cshtml"))
            .Count(f => File.ReadAllText(f).Contains("0.12m"));

        Assert.Equal(0, elsewhere);
    }
}
```

- [ ] **Step 2: Run the audit to verify it fails**

Run: `dotnet test audit/SeedAudit --filter InvoiceDetails_ContainsBusinessRulesFoundNowhereElse`
Expected: FAIL — the view does not exist.

- [ ] **Step 3: Write the view with the rules inside it**

Create `src/LegacyBilling/Views/Invoice/Details.cshtml`:

```cshtml
@using LegacyBilling.Models
@using LegacyBilling.Config
@model LegacyBilling.Models.Invoice
@inject LegacyBilling.Services.TaxTableService TaxTable

@{
    ViewData["Title"] = "Invoice " + Model.Number;

    var subtotal = Model.Subtotal;

    // Volume discount ladder. Agreed with sales, Nov 2022.
    decimal discountRate = 0m;
    if (Model.Customer?.Tier == CustomerTier.Enterprise)
    {
        discountRate = subtotal >= 50000m ? 0.18m : 0.12m;
    }
    else if (Model.Customer?.Tier == CustomerTier.Premium)
    {
        discountRate = subtotal >= 20000m ? 0.08m : 0.05m;
    }

    // Usage-only invoices never discount, regardless of tier.
    if (Model.Lines.All(l => l.Category == "usage") && Model.Lines.Count < 3)
    {
        discountRate = 0m;
    }

    var discount = subtotal * discountRate;
    var taxable = subtotal - discount;
    var vatRate = TaxTable.RateFor(Model.Customer?.TaxRegion ?? AppConfig.DefaultTaxRegion);
    var vat = AppConfig.RoundingMode == "half-up"
        ? Math.Round(taxable * vatRate, 2, MidpointRounding.AwayFromZero)
        : Math.Round(taxable * vatRate, 2, MidpointRounding.ToEven);
    var total = taxable + vat;
}

<h2>@ViewData["Title"]</h2>
<p>@Model.Customer?.Name — @Model.PeriodStart.ToString("yyyy-MM-dd") to @Model.PeriodEnd.ToString("yyyy-MM-dd")</p>

<table class="table">
    <thead><tr><th>Description</th><th>Occurred</th><th class="text-end">Amount</th></tr></thead>
    <tbody>
    @foreach (var line in Model.Lines)
    {
        <tr>
            <td>@line.Description</td>
            <td>@line.OccurredAt.ToString("yyyy-MM-dd")</td>
            <td class="text-end">@line.Amount.ToString("N2")</td>
        </tr>
    }
    </tbody>
    <tfoot>
        <tr><td colspan="2">Subtotal</td><td class="text-end">@subtotal.ToString("N2")</td></tr>
        <tr><td colspan="2">Discount (@((discountRate * 100).ToString("N0"))%)</td><td class="text-end">-@discount.ToString("N2")</td></tr>
        <tr><td colspan="2">VAT</td><td class="text-end">@vat.ToString("N2")</td></tr>
        <tr><th colspan="2">Total</th><th class="text-end">@total.ToString("N2")</th></tr>
    </tfoot>
</table>
```

- [ ] **Step 4: Run the audit to verify it passes**

Run: `dotnet test audit/SeedAudit --filter InvoiceDetails_ContainsBusinessRulesFoundNowhereElse`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "seed: plant discount and rounding rules inside Invoice/Details.cshtml"
```

---

## Task 7: Plant 3 — two same-named methods with divergent behaviour

**Files:**
- Create: `src/LegacyBilling/Services/BillingService.cs`
- Create: `src/LegacyBilling/Services/BillingService.Adjustments.cs`
- Modify: `src/LegacyBilling/Program.cs` — register `BillingService`
- Test: `audit/SeedAudit/DivergentOverloadAudit.cs`

**Interfaces:**
- Consumes: `Invoice`, `CustomerTier` (Task 2); `AppConfig.LateFeePercent` (Task 5).
- Produces: `LegacyBilling.Services.BillingService` with `decimal ApplyDiscount(decimal amount, CustomerTier tier)` and `decimal ApplyDiscount(decimal amount, CustomerTier tier, bool includeLateFee)`. Task 8's god file calls both.

Module 5 beat 3 needs an ambiguity that no rewrite of the spec resolves. Two methods with the same name whose three-argument form is not a superset of the two-argument form is exactly that: no wording fixes it, only a human decision about which is correct.

- [ ] **Step 1: Write the failing audit**

Create `audit/SeedAudit/DivergentOverloadAudit.cs`:

```csharp
using LegacyBilling.Models;
using LegacyBilling.Services;
using Xunit;

namespace SeedAudit;

public class DivergentOverloadAudit
{
    [Fact]
    public void ApplyDiscount_OverloadsDisagreeOnTheSameInput()
    {
        var svc = new BillingService();

        var two = svc.ApplyDiscount(1000m, CustomerTier.Premium);
        var three = svc.ApplyDiscount(1000m, CustomerTier.Premium, false);

        Assert.NotEqual(two, three);
    }
}
```

- [ ] **Step 2: Run the audit to verify it fails**

Run: `dotnet test audit/SeedAudit --filter ApplyDiscount_OverloadsDisagreeOnTheSameInput`
Expected: FAIL — build error, `BillingService` does not exist.

- [ ] **Step 3: Write the first half of the partial class**

Create `src/LegacyBilling/Services/BillingService.cs`:

```csharp
using LegacyBilling.Models;

namespace LegacyBilling.Services;

public partial class BillingService
{
    // Percentage off, applied to the whole amount.
    public decimal ApplyDiscount(decimal amount, CustomerTier tier)
    {
        var rate = tier switch
        {
            CustomerTier.Enterprise => 0.15m,
            CustomerTier.Premium => 0.10m,
            _ => 0m
        };
        return amount - (amount * rate);
    }
}
```

- [ ] **Step 4: Write the second half, in a separate file**

Create `src/LegacyBilling/Services/BillingService.Adjustments.cs`:

```csharp
using LegacyBilling.Config;
using LegacyBilling.Models;

namespace LegacyBilling.Services;

public partial class BillingService
{
    // Added for the 2023 enterprise renegotiation. Flat amounts, not percentages.
    public decimal ApplyDiscount(decimal amount, CustomerTier tier, bool includeLateFee)
    {
        var flat = tier switch
        {
            CustomerTier.Enterprise => 250m,
            CustomerTier.Premium => 75m,
            _ => 0m
        };
        var discounted = amount - flat;
        if (includeLateFee)
        {
            discounted += discounted * (AppConfig.LateFeePercent / 100m);
        }
        return discounted;
    }
}
```

The two-argument form takes 10% off 1000 and returns 900. The three-argument form takes a flat 75 off and returns 925. Neither is documented anywhere, and the call sites in Task 8 use both.

- [ ] **Step 5: Register the service**

In `src/LegacyBilling/Program.cs`, add to the service registrations:

```csharp
builder.Services.AddScoped<LegacyBilling.Services.BillingService>();
```

- [ ] **Step 6: Run the audit to verify it passes**

Run: `dotnet test audit/SeedAudit --filter ApplyDiscount_OverloadsDisagreeOnTheSameInput`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "seed: plant divergent ApplyDiscount overloads across partial class"
```

---

## Task 8: Plant 1 — the god controller

**Files:**
- Create: `src/LegacyBilling/Controllers/InvoiceController.cs`
- Test: `audit/SeedAudit/GodFileAudit.cs`

**Interfaces:**
- Consumes: `BillingContext` (Task 2); `BillingService`, `InvoiceNumberGenerator`, `NotificationService`, `TaxTableService` (Tasks 4, 7); `AppConfig.GracePeriodDays` and `AppConfig.RoundingMode` (Task 5); `PeriodCalculator.GetLinesForPeriod` (Task 9, forward reference).
- Produces: `InvoiceController` with actions `Index`, `Details`, `Create`, `Issue`, `RecordPayment`, `Rebill`, `Export`. Task 9 depends on `Rebill` calling `PeriodCalculator`.

Module 5 beat 6 is seam finding. This file has no seams: HTTP concerns, validation, EF queries, money arithmetic, string formatting and notification all interleave inside single action methods.

- [ ] **Step 1: Write the failing audit**

Create `audit/SeedAudit/GodFileAudit.cs`:

```csharp
using System.IO;
using System.Linq;
using Xunit;

namespace SeedAudit;

public class GodFileAudit
{
    [Fact]
    public void InvoiceController_IsBigEnoughToNeedSeamFinding()
    {
        var path = Path.Combine(ConfigCouplingAudit.SrcRoot(), "Controllers", "InvoiceController.cs");
        Assert.True(File.Exists(path), "Controllers/InvoiceController.cs is missing.");
        var lines = File.ReadAllLines(path).Length;
        Assert.InRange(lines, 800, 1000);
    }

    [Fact]
    public void InvoiceController_MixesEveryConcern()
    {
        var text = File.ReadAllText(
            Path.Combine(ConfigCouplingAudit.SrcRoot(), "Controllers", "InvoiceController.cs"));

        Assert.Contains("_db.Invoices", text);          // persistence
        Assert.Contains("ModelState", text);            // validation
        Assert.Contains("ToString(\"N2\")", text);      // formatting
        Assert.Contains("_notifications", text);        // notification
        Assert.Contains("AppConfig.", text);            // global config
    }
}
```

- [ ] **Step 2: Run the audit to verify it fails**

Run: `dotnet test audit/SeedAudit --filter InvoiceController`
Expected: both FAIL — the file does not exist.

- [ ] **Step 3: Write the controller skeleton with all concerns interleaved**

Create `src/LegacyBilling/Controllers/InvoiceController.cs`. This is the exact head of the file; the remaining actions follow the same shape and are filled in Step 4.

```csharp
using LegacyBilling.Config;
using LegacyBilling.Data;
using LegacyBilling.Models;
using LegacyBilling.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LegacyBilling.Controllers;

public class InvoiceController : Controller
{
    private readonly BillingContext _db;
    private readonly BillingService _billing;
    private readonly InvoiceNumberGenerator _numbers;
    private readonly NotificationService _notifications;
    private readonly TaxTableService _tax;

    public InvoiceController(BillingContext db, BillingService billing,
        InvoiceNumberGenerator numbers, NotificationService notifications, TaxTableService tax)
    {
        _db = db; _billing = billing; _numbers = numbers; _notifications = notifications; _tax = tax;
    }

    public async Task<IActionResult> Index(string? status, int page = 1)
    {
        var q = _db.Invoices.Include(i => i.Customer).AsQueryable();
        if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<InvoiceStatus>(status, out var s))
            q = q.Where(i => i.Status == s);

        var invoices = await q.OrderByDescending(i => i.PeriodStart)
            .Skip((page - 1) * 25).Take(25).ToListAsync();

        ViewBag.Formatted = invoices.ToDictionary(i => i.Id, i => i.Subtotal.ToString("N2"));
        ViewBag.Overdue = invoices
            .Where(i => i.Status == InvoiceStatus.Issued
                     && i.PeriodEnd.AddDays(AppConfig.GracePeriodDays) < DateTime.Now)
            .Select(i => i.Id).ToHashSet();

        return View(invoices);
    }

    public async Task<IActionResult> Details(int id)
    {
        var invoice = await _db.Invoices
            .Include(i => i.Customer).Include(i => i.Lines).Include(i => i.Payments)
            .FirstOrDefaultAsync(i => i.Id == id);
        if (invoice is null) return NotFound();
        return View(invoice);
    }

    [HttpPost]
    public async Task<IActionResult> Issue(int id)
    {
        var invoice = await _db.Invoices.Include(i => i.Lines).Include(i => i.Customer)
            .FirstOrDefaultAsync(i => i.Id == id);
        if (invoice is null) return NotFound();

        if (invoice.Status != InvoiceStatus.Draft)
        {
            ModelState.AddModelError("", "Only draft invoices can be issued.");
            return View("Details", invoice);
        }
        if (!invoice.Lines.Any())
        {
            ModelState.AddModelError("", "Cannot issue an empty invoice.");
            return View("Details", invoice);
        }

        invoice.Number = _numbers.Next(invoice.PeriodStart.Year);
        invoice.Status = InvoiceStatus.Issued;

        // Two-argument form: percentage.
        var net = _billing.ApplyDiscount(invoice.Subtotal, invoice.Customer!.Tier);
        var vat = Math.Round(net * _tax.RateFor(invoice.Customer.TaxRegion), 2,
            AppConfig.RoundingMode == "half-up" ? MidpointRounding.AwayFromZero : MidpointRounding.ToEven);

        await _db.SaveChangesAsync();
        _notifications.Send(invoice.Customer.Name,
            $"Invoice {invoice.Number} issued, total {(net + vat).ToString("N2")}");

        return RedirectToAction(nameof(Details), new { id });
    }
}
```

- [ ] **Step 4: Grow the file to 800–1000 lines**

Hand the file to a coding agent with this instruction, verbatim:

> Add the actions `Create`, `RecordPayment`, `Rebill` and `Export` to `InvoiceController`. Follow the exact style already present: no private helpers, no extracted methods, EF queries written inline in each action, validation via `ModelState.AddModelError`, money formatted with `ToString("N2")` at the point of use, `AppConfig` read inline. `RecordPayment` must call `_billing.ApplyDiscount(amount, tier, true)` — the three-argument overload. `Rebill` must call `PeriodCalculator.GetLinesForPeriod(invoice.Lines, invoice.PeriodStart, invoice.PeriodEnd)`; that class does not exist yet and the build will break until Task 9, which is expected. Target a final file length between 800 and 1000 lines. Do not add comments explaining the design.

`Issue` uses the two-argument overload and `RecordPayment` the three-argument one. Neither call site says why, which is the point of Task 7's plant.

- [ ] **Step 5: Confirm the build breaks only on `PeriodCalculator`**

Run: `dotnet build`
Expected: FAIL with `CS0103` or `CS0246` naming `PeriodCalculator` and nothing else. Any other error is a defect in this task — fix it before continuing.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "seed: plant InvoiceController god file with interleaved concerns"
```

---

## Task 9: Plant 6 — the period-boundary bug, and its characterization test

**Files:**
- Create: `src/LegacyBilling/Services/PeriodCalculator.cs`
- Create: `audit/SeedAudit/BoundaryBugAudit.cs`

**Interfaces:**
- Consumes: `InvoiceLine` (Task 2).
- Produces: `LegacyBilling.Services.PeriodCalculator.GetLinesForPeriod(IEnumerable<InvoiceLine> lines, DateTime periodStart, DateTime periodEnd)` returning `List<InvoiceLine>`. Task 8's `Rebill` action calls it; Plan 3's Lab 5 handout is built on it.

This is the repository's most important 12 lines. Per spec §7 the bug is deliberately the same *shape* as the false premise planted in module 4's demo — an off-by-one on a period boundary — so a participant who met it at 14:10 feels the echo at 15:40 without being told.

The bug: both ends of the comparison are inclusive. Consecutive monthly periods share a boundary instant, so a line occurring exactly at midnight on the first of the month is billed in both months.

- [ ] **Step 1: Write the failing characterization audit**

This test pins the *buggy* behaviour deliberately. It is the worked answer to Lab 5's senior variant — "your characterization test will pin the buggy behaviour; what do you do, and what do you write down?"

Create `audit/SeedAudit/BoundaryBugAudit.cs`:

```csharp
using System;
using System.Collections.Generic;
using LegacyBilling.Models;
using LegacyBilling.Services;
using Xunit;

namespace SeedAudit;

public class BoundaryBugAudit
{
    private static List<InvoiceLine> ThreeLinesAroundTheBoundary() => new()
    {
        new InvoiceLine { Id = 1, Description = "late March usage",  Amount = 10m, OccurredAt = new DateTime(2026, 3, 31, 23, 0, 0) },
        new InvoiceLine { Id = 2, Description = "boundary instant",  Amount = 20m, OccurredAt = new DateTime(2026, 4,  1,  0, 0, 0) },
        new InvoiceLine { Id = 3, Description = "early April usage", Amount = 30m, OccurredAt = new DateTime(2026, 4,  2,  9, 0, 0) },
    };

    // Characterization: pins CURRENT behaviour, bug included. Do not "fix" this test.
    [Fact]
    public void BoundaryLine_IsBilledInBothAdjacentPeriods()
    {
        var lines = ThreeLinesAroundTheBoundary();

        var march = PeriodCalculator.GetLinesForPeriod(lines, new DateTime(2026, 3, 1), new DateTime(2026, 4, 1));
        var april = PeriodCalculator.GetLinesForPeriod(lines, new DateTime(2026, 4, 1), new DateTime(2026, 5, 1));

        Assert.Contains(march, l => l.Id == 2);
        Assert.Contains(april, l => l.Id == 2);
        Assert.Equal(30m, march.Sum(l => l.Amount));  // 10 + 20
        Assert.Equal(50m, april.Sum(l => l.Amount));  // 20 + 30
    }
}
```

- [ ] **Step 2: Run it to verify it fails**

Run: `dotnet test audit/SeedAudit --filter BoundaryLine_IsBilledInBothAdjacentPeriods`
Expected: FAIL — build error, `PeriodCalculator` does not exist.

- [ ] **Step 3: Write the buggy implementation**

Create `src/LegacyBilling/Services/PeriodCalculator.cs`:

```csharp
using LegacyBilling.Models;

namespace LegacyBilling.Services;

public static class PeriodCalculator
{
    public static List<InvoiceLine> GetLinesForPeriod(
        IEnumerable<InvoiceLine> lines, DateTime periodStart, DateTime periodEnd)
    {
        var selected = new List<InvoiceLine>();
        foreach (var line in lines)
        {
            if (line.OccurredAt >= periodStart && line.OccurredAt <= periodEnd)
            {
                selected.Add(line);
            }
        }
        return selected;
    }
}
```

Both comparisons are inclusive. Do not change either operator. A later reader who "tidies" `<=` to `<` destroys module 5's payload, which is why Step 1's test exists.

- [ ] **Step 4: Run the audit to verify it passes**

Run: `dotnet test audit/SeedAudit --filter BoundaryLine_IsBilledInBothAdjacentPeriods`
Expected: PASS.

- [ ] **Step 5: Verify the whole solution now builds**

Run: `dotnet build`
Expected: SUCCESS. Task 8's forward reference is resolved.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "seed: plant doubly-inclusive period boundary bug with characterization test"
```

---

## Task 10: Plant 5 — three tests that assert nothing meaningful

**Files:**
- Create: `tests/LegacyBilling.Tests/InvoiceServiceTests.cs`
- Test: `audit/SeedAudit/TestingTheatreAudit.cs`

**Interfaces:**
- Consumes: `BillingService` (Task 7), `Invoice` (Task 2).
- Produces: three xUnit facts in the app's own test project that pass while validating nothing. Module 4 beat 4 teaches testing-theatre detection; module 5 calls back to it (spec §7).

These live in `tests/`, the participant-facing project. The audit that proves they are hollow lives in `audit/`, which participants never see.

- [ ] **Step 1: Write the failing audit**

Create `audit/SeedAudit/TestingTheatreAudit.cs`:

```csharp
using System.IO;
using System.Linq;
using Xunit;

namespace SeedAudit;

public class TestingTheatreAudit
{
    [Fact]
    public void ThreeTests_PassWhileAssertingNothingMeaningful()
    {
        var dir = new DirectoryInfo(Directory.GetCurrentDirectory());
        while (dir is not null && !Directory.Exists(Path.Combine(dir.FullName, "tests")))
            dir = dir.Parent;
        Assert.NotNull(dir);

        var path = Path.Combine(dir!.FullName, "tests", "LegacyBilling.Tests", "InvoiceServiceTests.cs");
        Assert.True(File.Exists(path), "tests/LegacyBilling.Tests/InvoiceServiceTests.cs is missing.");

        var text = File.ReadAllText(path);
        var hollow = text.Split("Assert.NotNull").Length - 1
                   + text.Split("Assert.True(true").Length - 1;

        Assert.True(hollow >= 3, $"Found only {hollow} hollow assertions; module 4's testing-theatre callback needs at least 3.");
    }
}
```

- [ ] **Step 2: Run it to verify it fails**

Run: `dotnet test audit/SeedAudit --filter ThreeTests_PassWhileAssertingNothingMeaningful`
Expected: FAIL — the file does not exist.

- [ ] **Step 3: Write the hollow tests**

Create `tests/LegacyBilling.Tests/InvoiceServiceTests.cs`:

```csharp
using System;
using LegacyBilling.Models;
using LegacyBilling.Services;
using Xunit;

namespace LegacyBilling.Tests;

public class InvoiceServiceTests
{
    [Fact]
    public void ApplyDiscount_ReturnsAValue()
    {
        var svc = new BillingService();
        var result = svc.ApplyDiscount(1000m, CustomerTier.Premium);
        Assert.NotNull(result.ToString());
    }

    [Fact]
    public void Invoice_CanBeConstructed()
    {
        var invoice = new Invoice { Id = 1, CustomerId = 1, PeriodStart = DateTime.Now, PeriodEnd = DateTime.Now };
        Assert.NotNull(invoice);
    }

    [Fact]
    public void GetLinesForPeriod_DoesNotThrow()
    {
        var ex = Record.Exception(() =>
            PeriodCalculator.GetLinesForPeriod(new List<InvoiceLine>(), DateTime.Now, DateTime.Now));
        Assert.True(true);
    }
}
```

The third is the sharpest: it names `GetLinesForPeriod`, so a reader assumes the boundary logic is covered. It captures the exception and never inspects it, and asserts a tautology. Coverage tooling reports the method as tested.

- [ ] **Step 4: Run both suites**

Run: `dotnet test tests/LegacyBilling.Tests && dotnet test audit/SeedAudit --filter ThreeTests_PassWhileAssertingNothingMeaningful`
Expected: the app's tests PASS (they always will — that is the lesson); the audit PASSES.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "seed: plant three hollow tests in the app test project"
```

---

## Task 11: Deterministic seed data, participant branch, and full-repo audit

**Files:**
- Create: `src/LegacyBilling/Data/Seed.cs`
- Modify: `src/LegacyBilling/Program.cs` — call the seeder at startup
- Create: `audit/SeedAudit/RepositoryAudit.cs`
- Delete (on the participant branch only): `SEED-SPEC.md`, `audit/`

**Interfaces:**
- Consumes: everything above.
- Produces: `LegacyBilling.Data.Seed.Populate(BillingContext db)`; a `main` branch carrying the audit and the generation spec, and a `training` branch that is what participants and the module 5 demo see.

- [ ] **Step 1: Write the seeder, including the invoice that exposes the bug**

Create `src/LegacyBilling/Data/Seed.cs`:

```csharp
using LegacyBilling.Models;

namespace LegacyBilling.Data;

public static class Seed
{
    public static void Populate(BillingContext db)
    {
        if (db.Customers.Any()) return;

        var acme = new Customer { Name = "Acme Industrial", Tier = CustomerTier.Enterprise, TaxRegion = "TR" };
        var borea = new Customer { Name = "Borea Yazilim", Tier = CustomerTier.Premium, TaxRegion = "TR" };
        var caldera = new Customer { Name = "Caldera GmbH", Tier = CustomerTier.Standard, TaxRegion = "DE" };
        db.Customers.AddRange(acme, borea, caldera);
        db.SaveChanges();

        // March and April invoices for Acme. The 1 April 00:00 line appears in both.
        var march = new Invoice
        {
            CustomerId = acme.Id, Number = "INV-2026-00001", Status = InvoiceStatus.Issued,
            PeriodStart = new DateTime(2026, 3, 1), PeriodEnd = new DateTime(2026, 4, 1)
        };
        var april = new Invoice
        {
            CustomerId = acme.Id, Number = "INV-2026-00002", Status = InvoiceStatus.Draft,
            PeriodStart = new DateTime(2026, 4, 1), PeriodEnd = new DateTime(2026, 5, 1)
        };
        db.Invoices.AddRange(march, april);
        db.SaveChanges();

        db.InvoiceLines.AddRange(
            new InvoiceLine { InvoiceId = march.Id, Description = "Compute hours, March", Category = "usage",   Amount = 4200m, OccurredAt = new DateTime(2026, 3, 14, 10, 0, 0) },
            new InvoiceLine { InvoiceId = march.Id, Description = "Support retainer",      Category = "service", Amount = 1500m, OccurredAt = new DateTime(2026, 3, 31, 23, 0, 0) },
            new InvoiceLine { InvoiceId = march.Id, Description = "Overage, period close", Category = "usage",   Amount =  980m, OccurredAt = new DateTime(2026, 4,  1,  0, 0, 0) },
            new InvoiceLine { InvoiceId = april.Id, Description = "Compute hours, April",  Category = "usage",   Amount = 5100m, OccurredAt = new DateTime(2026, 4, 12,  8, 30, 0) },
            new InvoiceLine { InvoiceId = april.Id, Description = "Overage, period close", Category = "usage",   Amount =  980m, OccurredAt = new DateTime(2026, 4,  1,  0, 0, 0) }
        );
        db.SaveChanges();
    }
}
```

The 980.00 line appears on both invoices with the same description and the same timestamp. It is visible in the UI without running a single test, which is what makes the module 5 demo work.

- [ ] **Step 2: Call the seeder at startup**

In `src/LegacyBilling/Program.cs`, immediately before `app.Run();`, insert:

```csharp
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<LegacyBilling.Data.BillingContext>();
    db.Database.EnsureCreated();
    LegacyBilling.Data.Seed.Populate(db);
}
```

- [ ] **Step 3: Write the full-repo audit**

Create `audit/SeedAudit/RepositoryAudit.cs`:

```csharp
using System.IO;
using System.Linq;
using Xunit;

namespace SeedAudit;

public class RepositoryAudit
{
    [Fact]
    public void NoAgentFacingDocumentationExists()
    {
        var root = new DirectoryInfo(ConfigCouplingAudit.SrcRoot()).Parent!.Parent!.FullName;
        foreach (var forbidden in new[] { "CLAUDE.md", "AGENTS.md", "ARCHITECTURE.md", "CONTRIBUTING.md", "docs" })
            Assert.False(File.Exists(Path.Combine(root, forbidden)) || Directory.Exists(Path.Combine(root, forbidden)),
                $"{forbidden} must not exist: module 5 beat 5 teaches CLAUDE.md as the cheapest first artifact, and the room must find it absent.");
    }

    [Fact]
    public void ReadmeIsDeliberatelyInadequate()
    {
        var root = new DirectoryInfo(ConfigCouplingAudit.SrcRoot()).Parent!.Parent!.FullName;
        var readme = File.ReadAllLines(Path.Combine(root, "README.md"));
        Assert.True(readme.Length <= 15, $"README has {readme.Length} lines; it must stay bare run instructions only.");
    }

    [Fact]
    public void Repository_IsLargeEnoughToFeelLegacy()
    {
        var lines = ConfigCouplingAudit.SourceFiles().Sum(f => File.ReadAllLines(f).Length);
        Assert.InRange(lines, 5000, 8000);
    }

    [Fact]
    public void NoXmlDocCommentsOnPublicMembers()
    {
        var offenders = ConfigCouplingAudit.SourceFiles()
            .Where(f => f.EndsWith(".cs"))
            .Where(f => File.ReadAllText(f).Contains("/// <summary>"))
            .ToArray();
        Assert.Empty(offenders);
    }
}
```

- [ ] **Step 4: Run the entire audit suite**

Run: `dotnet test audit/SeedAudit`
Expected: ALL PASS, including `AppConfig_IsReadFromAtLeastSevenCallSites`, which Task 5 left red. If it is still red, add the missing reads to `Rebill` and `Export` in `InvoiceController` — `AppConfig.GracePeriodDays` and `AppConfig.LateFeePercent` are the natural sites.

- [ ] **Step 5: Verify the app runs and the bug is visible in the UI**

Run: `dotnet run --project src/LegacyBilling`
Open `http://localhost:5080/Invoice`. Open both Acme invoices. Confirm the 980.00 "Overage, period close" line appears on both, and that the March total reflects the discount ladder from `Details.cshtml` rather than from any C# file.

This is the module 5 demo's opening move. If it is not visible in under 60 seconds of clicking, the seed data is wrong.

- [ ] **Step 6: Create the participant-facing branch**

**`training` must be an ORPHAN branch.** A branch descended from `main` carries
`main`'s commit messages, and those messages are the answer key —
`seed: plant doubly-inclusive period boundary bug`, `seed: plant divergent
ApplyDiscount overloads`, and so on. Deleting `audit/` and `SEED-SPEC.md` from the
working tree does nothing about `git log`. A participant who types `git log` gets a
complete, ordered list of every planted defect.

This was discovered in execution, by the archaeology agent refusing to run: it
noticed the contamination channel before doing the exercise.

An orphan branch also produces a *more* authentic artifact. Real legacy
repositories frequently begin with a single import commit, so the absent history
reads as ordinary rather than suspicious.

```bash
git add . && git commit -m "seed: add deterministic seed data and full-repo audit"

git checkout --orphan training
rm -rf audit SEED-SPEC.md
dotnet sln remove audit/SeedAudit/SeedAudit.csproj
git add -A
GIT_AUTHOR_DATE="2022-03-14T09:12:00+03:00" GIT_COMMITTER_DATE="2022-03-14T09:12:00+03:00" \
  git commit -m "Import LegacyBilling from internal SVN"
```

Then verify the channel is actually closed:

```bash
git log training --format="%s" | grep -iE "plant|seed:|audit" && echo LEAK || echo clean
```

**Distribute only this branch.** `git clone --single-branch --branch training`, or
push `training` alone to wherever participants fetch it. Handing over a clone that
also carries `main` re-opens the leak.

`main` keeps the audit and the generation spec; `training` is what the demo and the participants see. Never demo from `main` — `audit/` names every plant and would give the lesson away.

Two things discovered in execution:

1. **`BulkBuildTests` must not live in `tests/`.** Its name and comments disclose
   that the repository was generated and that defects were planted. Move it to
   `audit/` as `BulkBuildAudit` before branching. Participants must see only
   `SmokeTests`, `ModelTests` and `InvoiceServiceTests`.
2. **Gitignored build output survives the branch switch.** After `git checkout
   training`, `audit/bin` and `audit/obj` remain on disk even though nothing under
   `audit/` is tracked there. Run `rm -rf audit` on the training branch before
   demoing, or the room sees a folder that should not exist.

- [ ] **Step 7: Verify the training branch is clean and complete**

```bash
git checkout training
dotnet build && dotnet test
git checkout main
```

Expected: build succeeds; the app's own three hollow tests plus the smoke and model tests pass. No `audit/` directory, no `SEED-SPEC.md`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "seed: verify training branch builds without audit scaffolding"
```

---

## Task 12: Module 5 demo dry-run

**Files:**
- Create: `DEMO-DRYRUN.md` (on `main` only)

**Interfaces:**
- Consumes: the `training` branch from Task 11.
- Produces: written evidence that all seven plants are reachable inside module 5's 20-minute demo budget. Plan 3's facilitator notes are built from this file.

Spec §9 records that this deliverable has no recorded fallback. A dry-run is therefore not optional polish — it is the only verification that module 5 can be delivered at all.

- [ ] **Step 1: Run the demo end to end against the training branch, timed**

Work only from `git checkout training`. Perform, in order, timing each: (a) note the absent `CLAUDE.md`; (b) run spec archaeology — hand an agent `InvoiceController.cs` and ask for a spec of current behaviour; (c) correct the draft, recording each correction; (d) write the characterization test for `GetLinesForPeriod`; (e) write a delta-spec for a stated change — *bill each line in exactly one period*; (f) implement and verify.

- [ ] **Step 2: Record the result**

Create `DEMO-DRYRUN.md` with a row per plant: plant, file and line, minutes to reach it, and whether an agent found it unaided or the instructor had to steer. Record total elapsed time.

- [ ] **Step 3: Judge against the budget**

Total must be at or under 20 minutes. If over, the correct fix is to cut demo scope — the archaeology step compresses well — not to simplify the repository. The plants are the curriculum.

Record explicitly which plants the archaeology agent found unaided. Any plant an agent surfaces on its own is one the instructor does not have to point at, and Plan 3's facilitator notes need that distinction to write the demo script.

- [ ] **Step 4: Commit**

```bash
git checkout main
git add DEMO-DRYRUN.md
git commit -m "seed: record module 5 demo dry-run timings"
```

---

## Self-Review

**Spec coverage (§7).** All seven required properties have a task: no README (Task 1, audited Task 11), three meaningless tests (Task 10), ~900-line god file (Task 8), business rules in a view (Task 6), same-named divergent methods (Task 7), implicit global-config coupling (Task 5), subtle behavioural bug (Task 9). The §7 requirement that the bug echo module 4's planted premise is met by Task 9's boundary off-by-one. The 5,000–8,000 line target is enforced by Task 4's test. `dotnet run` / `dotnet test` under two minutes is verified in Tasks 1, 11 and 12. The .NET stack from §6/§10.3 is fixed in Global Constraints.

**Placeholder scan.** No TBD or TODO in the plan's own instructions. The two generation steps (Task 4 Step 1, Task 8 Step 4) delegate bulk volume to an agent, but each supplies the verbatim instruction, the constraining spec, and a measurable exit test — they are not "implement later". The `// TODO:` comments requested inside `SEED-SPEC.md` are deliberate content of the artifact.

**Type consistency.** `GetLinesForPeriod(IEnumerable<InvoiceLine>, DateTime, DateTime)` is declared identically in Task 8's forward reference, Task 9's audit and Task 9's implementation. `ApplyDiscount` has exactly two signatures, both declared in Task 7 and both called in Task 8. `AppConfig`'s seven members are declared in Task 5 and read in Tasks 6, 7 and 8. `TaxTableService.RateFor(string)` is specified in Task 3, produced in Task 4, consumed in Tasks 6 and 8. `BillingContext` DbSet names are fixed in Task 2 and used in Task 8 and Task 11.

**Known intentional broken states.** Three, all deliberate and all documented at the step that creates them: `GET /` 404s from Task 1 until Task 8; `AppConfig_IsReadFromAtLeastSevenCallSites` is red from Task 5 until Task 8; `dotnet build` fails on `PeriodCalculator` between Tasks 8 and 9.

**Known intentional red state.** `AppConfig_IsReadFromAtLeastSevenCallSites` is red from Task 5 until Task 8 completes; Task 11 Step 4 closes it and names the remedy if it does not. `dotnet build` is deliberately broken between Task 8 and Task 9 by the `PeriodCalculator` forward reference; Task 8 Step 5 asserts that this is the *only* error.
