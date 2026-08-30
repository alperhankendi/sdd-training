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

const countSlides = (text) =>
  text.split('\n').filter((l) => l.trim() === '---').length

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

for (const [file] of Object.entries(EXPECTED)) {
  const path = join('pages', file)
  if (!existsSync(path)) continue
  const text = readFileSync(path, 'utf8')
  for (const term of PARKED) {
    if (text.includes(term)) fail(`${file} back-references parked pre-read material: "${term}"`)
  }
}
pass('spec §11: no back-references to parked pre-read slides')

process.exit(failed ? 1 : 0)
