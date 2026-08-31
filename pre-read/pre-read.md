---
theme: default
title: "Agentic Coding: Optional Background"
info: |
  Optional pre-read for the Spec-Driven Development training.
  The training does not assume any of this.
class: text-center
transition: slide-left
mdc: true
---

# Agentic Coding

### The six leverage points the training does not operate

<div class="pt-8 text-sm opacity-75">

**This is optional.** The Spec-Driven Development day is self-contained and assumes none of it.

The training operates leverage points 1, 2, 3, 5, 6 and 12, and delivers what it needs of them in its first thirty minutes. These six are the rest of the framework: useful, and not prerequisites.

</div>

<!--
Say the optionality in the first line. A pre-read that implies obligation gets
resented by the people who did not do it and skimmed by the people who did.
-->

---

# The hierarchy

<p class="!text-xs !leading-tight opacity-75">From Donella Meadows. Changes near the top cascade; changes at the bottom stay local. The <b>bold</b> six are covered in the training itself.</p>

| # | Leverage point | Covered here |
|---|---|---|
| 12 | **Context** | training |
| 11 | Model | this deck |
| 10 | Prompt | this deck |
| 9 | Tools | this deck |
| 8 | Standard output | this deck |
| 7 | Types | this deck |
| 6 | **Documentation** | training |
| 5 | **Tests** | training |
| 4 | Architecture | this deck |
| 3 | **Plans** | training |
| 2 | **Templates** | training |
| 1 | **ADWs** | training |

---

# 11 · Model

**What are the tradeoffs: cost, speed, intelligence?**

- Matching tasks to the right model tier
- Where over-indexing on capability wastes budget
- Keeping model choices current without constant churn

<div class="grid grid-cols-2 gap-4 mt-8">
  <div class="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400">
    <div class="font-bold text-red-600 dark:text-red-400">Bad</div>
    <div class="text-sm">A frontier model for simple text extraction, at ten times the cost for no gain</div>
  </div>
  <div class="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400">
    <div class="font-bold text-green-600 dark:text-green-400">Good</div>
    <div class="text-sm">Frontier for code generation, a cheaper tier for classification</div>
  </div>
</div>

---

# 10 · Prompt

**Are the instructions concrete and actionable?**

- What makes a prompt concrete rather than vague
- How to test whether a prompt can actually be followed
- Setting a quality bar for prompts before looking elsewhere for the problem

<div class="grid grid-cols-2 gap-4 mt-8">
  <div class="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400">
    <div class="font-bold text-red-600 dark:text-red-400">Bad</div>
    <div class="text-sm">"Make this code better"</div>
  </div>
  <div class="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400">
    <div class="font-bold text-green-600 dark:text-green-400">Good</div>
    <div class="text-sm">"Refactor the auth module to use dependency injection. Extract token validation into its own class. Preserve existing test coverage."</div>
  </div>
</div>

---

# 9 · Tools

**Which actions can an agent take, and in what form?**

- Deciding between internal tools, MCP servers and CLI wrappers
- The tradeoff between tool flexibility and tool reliability
- When tool limitations become the bottleneck

<div class="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
  <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
    <div class="font-bold text-blue-600 dark:text-blue-400">Internal tools</div>
    <div class="text-xs mt-1 opacity-75">Most control, least portability</div>
  </div>
  <div class="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
    <div class="font-bold text-purple-600 dark:text-purple-400">MCP servers</div>
    <div class="text-xs mt-1 opacity-75">Standard protocol, growing ecosystem</div>
  </div>
  <div class="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
    <div class="font-bold text-orange-600 dark:text-orange-400">CLI wrappers</div>
    <div class="text-xs mt-1 opacity-75">Easy to build, brittle output</div>
  </div>
</div>

---

# 8 · Standard output

**Can agents and operators actually see what the code did?**

- How observable agentic systems really are
- What information is missing from current visibility
- Balancing verbose logging against signal-to-noise
- What self-documenting output looks like in practice

---

# 7 · Types

**Is typing consistent and enforced across the codebase?**

- How strong typing helps agents write correct code
- Surfacing type errors to agents in a form they can act on
- The relationship between type coverage and agent success rate

---

# 4 · Architecture

**Is the codebase agentically intuitive?**

- What makes an architecture agentically intuitive
- Balancing "what is in the training data" against "what is right for the problem"
- Patterns agents handle well, and patterns they handle badly
- How much codebase structure affects agent success

---

# Where to go next

<div class="mt-8 text-sm">

The training picks up at leverage points **3, 2 and 1** (Plans, Templates and workflows) and spends the day on the artifact that drives all three: **the specification.**

</div>

<div class="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 text-sm">
Nothing in the training depends on this deck. If you read none of it, you will not be behind.
</div>

<div class="mt-8 text-xs opacity-60">
Based on Donella Meadows, <i>Leverage Points: Places to Intervene in a System</i> (1999).
</div>
