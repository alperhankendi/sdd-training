import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const EXPECTED = {
  '00-bridge.md': 14,
  '01-spec-anatomy.md': 15,
  '02-elicitation.md': 14,
  '03-plans.md': 15,
  '04-verification.md': 18,
  '05-brownfield.md': 14,
  '06-antipatterns.md': 13,
}

const PARKED = ['Standard Out', 'leverage point #11', 'leverage point #10', 'leverage point #9', 'leverage point #7', 'leverage point #4']

let failed = 0
const fail = (msg) => { console.error(`FAIL  ${msg}`); failed++ }
const pass = (msg) => console.log(`ok    ${msg}`)

// A partial holds N slides separated by N-1 lines that are exactly `---`.
// Per-slide frontmatter also uses `---`, and each such block contributes one
// EXTRA separator line, so it must be discounted or every slide carrying a
// layout would be counted twice.
const countSlides = (text) => {
  const lines = text.split('\n')
  let separators = 0
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== '---') continue
    separators++
    // Frontmatter block: `---`, then key: value lines, then a closing `---`.
    if (i + 1 < lines.length && /^[A-Za-z_][\w-]*\s*:/.test(lines[i + 1])) {
      let j = i + 1
      while (j < lines.length && lines[j].trim() !== '---') j++
      i = j // the closing `---` is consumed, not counted
    }
  }
  return separators + 1
}

let total = 0
for (const [file, expected] of Object.entries(EXPECTED)) {
  const path = join('pages', file)
  if (!existsSync(path)) { fail(`${file} is missing`); continue }
  const n = countSlides(readFileSync(path, 'utf8'))
  total += n
  if (n === expected) pass(`${file}: ${n} slides`)
  else fail(`${file}: ${n} slides, expected ${expected}`)
}

if (total === 103) pass(`total: ${total} slides`)
else fail(`total: ${total} slides, expected 103`)

// Module 0's hierarchy table legitimately NAMES all twelve leverage points --
// that is the map. The invariant is that modules 1-6 must not LEAN on the six
// this day does not teach, because the pre-read is optional (spec 10.7) and
// most of the room will not have read it.
for (const [file] of Object.entries(EXPECTED)) {
  if (file === '00-bridge.md') continue
  const path = join('pages', file)
  if (!existsSync(path)) continue
  const text = readFileSync(path, 'utf8')
  for (const term of PARKED) {
    if (text.includes(term)) fail(`${file} back-references parked pre-read material: "${term}"`)
  }
}
pass('spec 11: modules 1-6 do not lean on parked pre-read slides')

process.exit(failed ? 1 : 0)
