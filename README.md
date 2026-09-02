# Spec-Driven Development — a one-day training

Delivered in Turkish from an English deck. Four repositories; this one is the
entry point.

| Repository | What it is |
|---|---|
| **sdd-training** | The Slidev deck, its verifier, and the design documents under `docs/` |
| **sdd-training-materials** | Participant handouts, answer keys, and facilitator notes |
| **sdd-training-example** | A greenfield API key service with an authored spec chain and git history. Module 3 teaches from `specs/plans/S1.2-plan.md` |
| **sdd-training-legacy** | A brownfield billing system with planted defects. **Use the `training` branch**; `main` carries an audit whose filenames give the defects away |

## The deck

```
npm install
npm run dev      # localhost:3030, presenter view at /presenter/
npm run verify   # structural assertions, run this before every change lands
npm run build
```

`scripts/verify.mjs` is not decoration. It asserts the slide budget per module,
that Slidev's own parser agrees with that count, that no slide renders empty or
has markup parsed as frontmatter, acronym expansion, principle-before-tool
ordering, speaker-note coverage, that every lab brief says where its material is,
and the wording of the review teaching. Every one of those assertions exists
because the deck was once wrong in that exact way.

## The day

370 minutes of content, 08:45 to 16:30, seven modules, 88 slides plus a title.
Three labs totalling 50 minutes. `sdd-training-materials/facilitator/00-running-order.md`
is the schedule of record.

## What is not here

Turkish speaker notes. They are the instructor's own working documents, they live
outside every repository, and `.gitignore` keeps them out.
