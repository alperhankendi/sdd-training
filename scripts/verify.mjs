import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const EXPECTED = {
  '00-bridge.md': 16,
  '01-spec-anatomy.md': 17,
  '02-elicitation.md': 11,
  '03-plans.md': 10,
  '04-verification.md': 17,
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

const TOTAL = 98
if (total === TOTAL) pass(`total: ${total} slides`)
else fail(`total: ${total} slides, expected ${TOTAL}`)

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

// No em-dashes in slide content. Speaker notes are exempt: nobody reads those on
// a projector. Use a colon, a comma, parentheses, or two sentences instead.
for (const [file] of Object.entries(EXPECTED)) {
  const path = join('pages', file)
  if (!existsSync(path)) continue
  const body = readFileSync(path, 'utf8').replace(/<!--[\s\S]*?-->/g, '')
  const hits = body.split('\n').filter((l) => l.includes('\u2014'))
  if (hits.length === 0) pass(`${file}: no em-dashes`)
  else fail(`${file}: ${hits.length} em-dash(es) in slide content -- first: ${hits[0].trim().slice(0, 70)}`)
}

// Acronym convention: {ACRONYM} (English expansion - Türkçe karşılık) at first
// use. The deck is English but delivered in Turkish, and an unexpanded acronym is
// the hardest thing to parse in a second language.
const ACRONYMS = ['IP', 'PRD', 'CI', 'UML', 'MDA', 'ADWs', 'V&amp;V']
const allPages = Object.keys(EXPECTED)
  .filter((f) => existsSync(join('pages', f)))
  .map((f) => readFileSync(join('pages', f), 'utf8'))
  .join('\n')
for (const a of ACRONYMS) {
  if (!allPages.includes(a)) continue
  // Word-bounded, or short acronyms match inside ordinary words: an unbounded
  // /IP/ hits DESCRIPTION and SCRIPT, and the check passes while the deck is
  // wrong. Verified by deleting a real expansion and watching this go red.
  // Markup between the acronym and its parens is allowed, but only a little.
  const expanded = new RegExp('\\b' + a + '\\b(?:[^()\\n]{0,60}?)\\((?=[^)]*\\s-\\s)')
  if (expanded.test(allPages)) pass(`acronym ${a.replace('&amp;','&')}: expanded`)
  else fail(`acronym ${a.replace('&amp;','&')}: never expanded as {ACRONYM} (English - Türkçe)`)
}

// Slidev silently SKIPS a `src:` whose file does not exist -- verified during
// execution: the deck built cleanly with six of seven partials missing. A typo
// in a path would therefore drop an entire module with no error anywhere.
const deck = readFileSync('slides.md', 'utf8')
const imported = [...deck.matchAll(/^src:\s*\.\/pages\/(.+)$/gm)].map((m) => m[1].trim())
for (const file of Object.keys(EXPECTED)) {
  if (imported.includes(file)) pass(`slides.md imports ${file}`)
  else fail(`slides.md does not import ${file} -- Slidev would drop it silently`)
}
for (const file of imported) {
  if (!existsSync(join('pages', file))) fail(`slides.md imports ${file}, which does not exist`)
}

// Spec 2.3: a principle must be stated before the tool that instantiates it,
// or the module degrades into a vendor demo for anyone without access.
for (const file of ['02-elicitation.md', '03-plans.md', '04-verification.md']) {
  if (!existsSync(join('pages', file))) continue
  const text = readFileSync(join('pages', file), 'utf8')
  const firstTool = Math.min(
    ...['BMAD', 'Superpowers'].map((t) => { const i = text.indexOf(t); return i < 0 ? Infinity : i })
  )
  const firstPrinciple = text.indexOf('Principle')
  if (firstTool === Infinity) pass(`${file}: names no toolchain`)
  else if (firstPrinciple >= 0 && firstPrinciple < firstTool) pass(`${file}: principle precedes tool`)
  else fail(`${file}: a toolchain is named before the principle it instantiates`)
}

// The two review rounds' most expensive correction. "becomes" would ship the
// false regeneration premise; "gains" is the corrected teaching. If an edit ever
// reverts this wording, the deck must fail rather than quietly mis-teach.
if (existsSync(join('pages', '04-verification.md'))) {
  const m4 = readFileSync(join('pages', '04-verification.md'), 'utf8')
  if (/code review \*?gains\*? a spec review/i.test(m4)) pass('module 4: review teaching says "gains", not "becomes"')
  else fail('module 4: the review slide must say code review GAINS a spec review')
  if (m4.includes('it is a spec defect')) pass('module 4: PR diagnostic present')
  else fail('module 4: the spec-defect/implementation-defect diagnostic is missing')
  if (/becomes a spec review/i.test(m4)) fail('module 4: "becomes a spec review" reintroduces the false regeneration premise')
}

// The facilitator delivers in Turkish from English notes. A slide carrying an
// argument with no note is a slide that will be improvised.
for (const [file] of Object.entries(EXPECTED)) {
  if (!existsSync(join('pages', file))) continue
  const text = readFileSync(join('pages', file), 'utf8')
  const slides = countSlides(text)
  const notes = text.split('<!--').length - 1
  const floor = Math.ceil(slides * 0.7)
  if (notes >= floor) pass(`${file}: ${notes} speaker notes for ${slides} slides`)
  else fail(`${file}: only ${notes} speaker notes for ${slides} slides (need ${floor})`)
}

const bridge = readFileSync(join('pages', '00-bridge.md'), 'utf8')

// The three-jobs table lives in module 6's close, not module 0's. In module 0 two
// of its three rows reference diagnostics the room has not met, so it reads as a
// puzzle; at the close it pays off in the past tense. Module 0 gets a real agenda.
if (bridge.includes('# The day')) pass('module 0: closes with an agenda')
else fail('module 0: no agenda slide -- the day needs a map once the room knows why')
if (bridge.includes('One question, three jobs'))
  fail('module 0: the through-line table belongs to module 6, not here')

if (existsSync(join('pages', '06-antipatterns.md'))) {
  const m6 = readFileSync(join('pages', '06-antipatterns.md'), 'utf8')
  if (m6.includes('One question, three jobs')) pass('module 6: through-line callback present')
  else fail('module 6: the through-line callback is missing -- it is the day\'s closing argument')
}

if (bridge.includes('lost it twice')) pass('module 0: honest history of prior attempts present')
else fail('module 0: the MDA/4GL history is missing -- the beat loses credibility without it')

// Every lab slide must say WHERE its material is. Lab 1 shipped as three tasks
// with nothing on screen and nothing named, and the room could not tell what it
// was being asked to do; the same defect was still sitting in labs 3, 4 and 5
// afterwards. A lab brief that does not point at the sheet is not a brief.
const LAB_SLIDES = [
  ['01-spec-anatomy.md', 'Lab 1'],
  ['03-plans.md', 'Lab 3'],
  ['04-verification.md', 'Lab 4'],
  ['05-brownfield.md', 'Lab 5'],
]
for (const [file, lab] of LAB_SLIDES) {
  if (!existsSync(join('pages', file))) continue
  const text = readFileSync(join('pages', file), 'utf8')
  const at = text.indexOf(`# ${lab} ·`)
  if (at < 0) { fail(`${lab}: no brief slide found in ${file}`); continue }
  const end = text.indexOf('\n---\n', at)
  const body = text.slice(at, end < 0 ? text.length : end).split('<!--')[0]
  if (/elinizdeki|payla[şs]t[ıi][ğg][ıi]m|size verilecek|da[ğg][ıi]tt[ıi][ğg][ıi]m/i.test(body)) pass(`${lab}: names where the material is`)
  else fail(`${lab}: the brief never says where the material is -- the room cannot start`)
}

// The authority on what the deck actually contains is Slidev's own parser, not
// the separator counting above. They disagreed once and it cost two slides: a
// `---` with no blank line after it made Slidev swallow the whole slide body as
// YAML frontmatter, so `Anatomy of an executable plan` and `Declared interfaces`
// silently vanished while every hand-rolled check above stayed green.
const { load } = await import('@slidev/parser/fs')
const parsed = await load(process.cwd(), './slides.md')
const pages = parsed.slides.length
const EXPECTED_PAGES = TOTAL + 1 // the title slide in slides.md

if (pages === EXPECTED_PAGES) pass(`slidev parses ${pages} pages`)
else fail(`slidev parses ${pages} pages, expected ${EXPECTED_PAGES} -- a slide is being swallowed or invented`)

const ALLOWED_FRONTMATTER = new Set(['src', 'layout', 'class', 'clicks', 'transition', 'theme', 'title', 'info', 'drawings', 'fonts', 'mdc'])
for (const [i, sl] of parsed.slides.entries()) {
  const body = (sl.content || '').trim()
  if (!body) { fail(`slide ${i + 1}: renders empty`); continue }
  const junk = Object.keys(sl.frontmatter || {}).filter((k) => !ALLOWED_FRONTMATTER.has(k))
  if (junk.length) fail(`slide ${i + 1} (${body.split('\n')[0].slice(0, 40)}): markup parsed as frontmatter -- the separator above it needs a blank line after it`)
}
if (!failed) pass('every slide has a body and clean frontmatter')

process.exit(failed ? 1 : 0)
