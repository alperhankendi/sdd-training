# Non-goals first

<div class="mt-8 text-xl">Ask what is <b>out</b> of scope before asking what is in it.</div>

<div class="mt-10 text-sm opacity-90">
The mechanism, not the etiquette:
</div>

<div class="mt-4 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-good">
    <div class="font-bold">People agree on goals</div>
    <div class="mt-1">"Make key rotation safe." Everyone nods. No information transferred.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold">People differ on boundaries</div>
    <div class="mt-1">"Does this cover keys already leaked?" Now two people discover they disagreed all along.</div>
  </div>
</div>

<div class="mt-8 text-sm">Disagreement is the product. Surfacing it early is the entire point of this stage.</div>

<!--
THIS MODULE OPENS WITH THREE THINGS SAID OUT LOUD, no slides. They were cut
because each lands in a couple of sentences and a screen added nothing. Deliver
them in this order before this slide goes up:

1. THE DAMAGE.
   "Four weeks into a project, two services encode different answers to what a
   user is. Both teams are correct against the ticket they were given. Nobody
   made a mistake. The assumption was never wrong, it was just never stated, so
   it was never checked."

2. THE REFRAME. This one matters most; without it the rest is a checklist.
   "The person who gave you the requirement does not have a finished spec in
   their head either. So this is not extraction, it is construction. Your
   questions are not retrieving an answer, they are creating one."
   Then ask: have you been given a requirement that turned out wrong? (hands)
   And did the person who gave it know it was wrong at the time? (no)

3. THE FIVE QUESTIONS. Say them once; they are also on the Lab 2 handout.
   What would make you reject this? What must it not do? What happens on the
   unhappy path? Who else is affected? What is already true that I must not break?
   Note that the first is first on purpose: "what do you want" produces
   agreement, "what would make you reject this" produces information.

Then this slide. This is why the template has a Non-goals section: module 1
handed them the section, here it is earned.
-->

---

# Three classes of hidden assumption

<div class="mt-6">

| Class | Sounds like | Detection |
|---|---|---|
| **Domain** | "the user", "the account", "active" | Ask for two examples that are *nearly* the same and differ in one way |
| **Constraint** | "fast", "soon", "at scale" | Ask for the number, then ask what happens one past it |
| **Success** | "works", "handles it", "is reliable" | Ask how you would prove it to someone who doubted you |

</div>

<div class="mt-8 text-sm opacity-90">
Different classes need different questions. Asking "can you be more specific?" catches none of them, because the speaker already believes they were.
</div>

<!--
The domain-assumption detection is the strongest of the three and worth
demonstrating: "give me two things that are both users, that differ in one way,
where you would want different behaviour." That question breaks open more
requirements than any other single sentence in this deck.
-->

---

# Ask or assume is a property of the spec

<div class="mt-8 text-lg">Not a property of the agent, and not a personality trait.</div>

<div class="mt-8 grid grid-cols-2 gap-6 text-sm">
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Asks too much</div>
    <div class="mt-1">It is reading an under-specified spec.<br/><br/>The fix is in the document, not the prompt.</div>
  </div>
  <div class="callout-bad">
    <div class="font-bold text-red-600 dark:text-red-400">Assumes too much</div>
    <div class="mt-1">It is reading a spec that failed to <b>mark its own uncertainty</b>.<br/><br/>Also the document.</div>
  </div>
</div>

<div class="callout-good mt-8 text-sm">
An agent cannot distinguish "we decided this and did not write it down" from "we never decided this", because from inside the document, those look identical.
</div>

<!--
This is the slide that stops people trying to fix elicitation with prompt
engineering. The unmarked unknown is indistinguishable from a settled decision,
and no amount of instruction can teach an agent to tell them apart.
-->

---

# Open questions are a section, not a feeling

<div class="mt-8 text-lg">Writing down what you do not know is the discipline. Resolving it silently with a guess is the failure.</div>

```markdown
## Open questions

- [ ] Do enterprise customers get a longer rotation overlap than 24h?
      → Needs: Product. Blocks: acceptance criterion 3. Assumed for now: no.
- [ ] Is revocation reversible within the grace period?
      → Needs: Security. Blocks: nothing yet. Assumed for now: irreversible.
```

<div class="mt-6 text-sm opacity-90">
Three parts each: <b>who decides</b>, <b>what it blocks</b>, and <b>what we assumed meanwhile</b>. Without the third, work stops. Without the first, it never resolves.
</div>

<!--
"Assumed for now" is what makes this practical rather than bureaucratic. It lets
execution continue while keeping the assumption visible and attributable, which
is exactly what an unmarked guess does not do.

Module 4 picks this up: a mid-execution discovery that the spec is merely SILENT
goes here, and work continues around it.
-->

---

# Principle · size the artifact to the change

<div class="mt-6">

| | Project altitude | Feature altitude |
|---|---|---|
| **Artifact** | Product Brief → PRD | A design in chat |
| **Ceremony** | A gate between phases | An approval before work starts |
| **Owner** | Tech lead, product | Whoever is building it |
| **Cadence** | Per project | Several times a week |
| **Cost of being wrong** | Weeks. Amended under change control. | An hour. Re-run it. |

</div>

<div class="mt-6 text-sm opacity-75">Same questions. Same failure it prevents. Different weight, because different reversibility.</div>

<!--
Principle before tool: this slide states the shape, the next two name the
toolchains. Do not name BMAD or Superpowers before this slide -- a participant
with access to neither must still leave with the shape.
-->

---

# Two instantiations of that principle

| Altitude | Toolchain | Artifacts |
|---|---|---|
| **Project** | BMAD<br/><span class="text-xs opacity-60">a document-first method</span> | Product Brief → PRD → Architecture → Epics |
| **Feature** | Superpowers | brainstorm → design → plan → verify |

<div class="mt-8 text-sm opacity-90">
Two toolchains, one shape. If you have access to neither, the previous slide is still the whole lesson. These are instances of it, not the source of it.
</div>

<div class="mt-6 text-sm opacity-75">
The loop is fractal. What is <b>not</b> fractal is the cost of being wrong, and that is the next slide.
</div>

<!--
Named here and only here. Everything before this slide is vendor-neutral by
design, so a participant whose organisation uses neither still leaves with
something they can apply on Monday.
-->

---

# Agentic Coding Framework nedir?

<div class="mt-8 text-lg">Bir agent'a <b>nasıl çalışacağını</b> söyleyen yapı.</div>

<div class="mt-8 grid grid-cols-3 gap-4 text-sm">
  <div class="callout-key">
    <div class="font-bold">Skill</div>
    <div class="mt-1">Ne zaman devreye gireceğini ve o an ne yapacağını tarif eden bir dosya.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Artefakt</div>
    <div class="mt-1">Her skill'in ürettiği şey. Bir sonraki skill'in girdisi oluyor.</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Akış</div>
    <div class="mt-1">Hangi skill'den hangisine geçileceği. Sıra rastgele değil.</div>
  </div>
</div>

<div class="mt-8 text-sm opacity-75">
Framework, prompt yazmayı bırakıp <b>iş akışı tasarlamaya</b> geçtiğiniz yer.
</div>

<!--
Bu slayt bir köprü. Anlatımın büyük kısmı dış sayfada:
claude-code-mastery/15-Agentic-Coding-Frameworks

Slaytı aç, üç kutuyu bir cümleyle geç, sonra tarayıcıya geç ve kavramı orada anlat.
Geri döndüğünde slayt 42 seni bekliyor olacak.

Anahtar cümle: framework, prompt yazmaktan is akisi tasarlamaya gecis. Salon bu
ana kadar hep "nasil soru sorulur" duydu; buradan itibaren "kim ne uretir, kime
verir" konusuyoruz.
-->

---

# Pratikte nasıl kullanıyorum

<div class="mt-6 grid grid-cols-2 gap-5">
  <div class="callout-key">
    <div class="font-bold text-blue-600 dark:text-blue-400">BMAD ile</div>
    <div class="text-sm mt-2">Market research, brief, PRD, mimari, FR, story, plan.</div>
    <div class="text-sm mt-2 opacity-75">Projenin tamamı. Bir kez.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Superpowers ile</div>
    <div class="text-sm mt-2">Her story için: spec, plan, implementasyon. Baştan sona TDD.</div>
    <div class="text-sm mt-2 opacity-75">Story başına bir kez.</div>
  </div>
</div>

<div class="callout-key mt-8">
Devredilen şey <b>bir story.</b> Ve Superpowers onu almakla kalmıyor: <b>o story için kendi spec'ini ve kendi planını yazıyor.</b>
</div>

<div class="mt-6 text-sm opacity-90">
Yani aynı döngü iki ölçekte koşuyor. Proje irtifasında bir kez, feature irtifasında her story için bir kez. <b>Ağırlık farklı, şekil aynı.</b>
</div>

<!--
Bu slayt hem hibrit pratigi anlatiyor hem de depth dial'in isini goruyor.

Onemli olan sag kutu: Superpowers sadece implementasyon yapmiyor, her story icin
DONGUYU BASTAN KOSUYOR. Bu, gunun fraktal iddiasinin kaniti ve iddia degil
gozlem olarak veriliyor.

Ve buradan cikan sizing dersi: irtifa aracin ozelligi degil, ISIN ozelligi. Ayni
gun iki araci da kullaniyorsunuz, secim proje mi story mi oldugu.
-->

---

# İki framework, yan yana

<div class="grid grid-cols-2 gap-5 mt-5 text-xs">
  <div>
    <div class="font-bold text-blue-600 dark:text-blue-400 mb-2">BMAD · 11 skill</div>
    <div class="opacity-60 mb-1">Analysis, opsiyonel</div>
    <div class="font-mono opacity-85">bmad-brainstorming · bmad-forge-idea · bmad-deep-recon · bmad-product-brief · bmad-prfaq</div>
    <div class="opacity-60 mt-3 mb-1">Planning, ne inşa edilecek</div>
    <div class="font-mono opacity-85">bmad-prd · bmad-ux · <b class="text-blue-600 dark:text-blue-400">bmad-spec</b></div>
    <div class="opacity-60 mt-3 mb-1">Solutioning, nasıl ve iş bölümü</div>
    <div class="font-mono opacity-85">bmad-architecture · bmad-create-epics-and-stories · bmad-sprint-planning</div>
    <div class="mt-3 opacity-75">Her yol <b>bmad-spec</b>'ten geçiyor, sonra <b>bmad-build</b>.</div>
  </div>
  <div>
    <div class="font-bold text-green-600 dark:text-green-400 mb-2">Superpowers · 7 adım</div>
    <div class="font-mono opacity-85 leading-relaxed">
      1 brainstorming<br/>
      2 using-git-worktrees<br/>
      3 writing-plans<br/>
      4 subagent-driven-development<br/>
      5 test-driven-development<br/>
      6 requesting-code-review<br/>
      7 finishing-a-development-branch
    </div>
    <div class="mt-3 opacity-75">Sıra sabit. Her story bu yedi adımdan geçiyor.</div>
  </div>
</div>

<div class="mt-6 text-sm opacity-90">
Soldaki <b>bir kez</b> koşuyor. Sağdaki <b>her story için</b> koşuyor.
</div>

<!--
Listeleri okuma. Iki sey gorsunler:

1. BMAD genis ve dallanan, Superpowers dar ve sirali. Cunku biri KARAR aliyor,
   digeri KARARI UYGULUYOR.
2. Soldaki bir kez, sagdaki her story icin. Frekans farki, irtifa farkinin
   gorunur hali.

bmad-spec vurgulu cunku her yol oradan geciyor. Isaret et, acma.
-->

---

# Hadi demo

<div class="mt-6 text-xl">Etkinlik bileti satışı.</div>

<div class="mt-3 text-sm opacity-75">Herkesin bildiği bir iş. Ve içinde mühendisin karar veremeyeceği sorular var.</div>

<div class="mt-7 grid grid-cols-3 gap-4 text-sm">
  <div class="callout-key">
    <div class="font-bold">Bilet alındı, ne demek?</div>
    <div class="mt-1">Sepete eklendi mi, ödendi mi? Ödeme beklerken o koltuk kimin?</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Koltuk kaç dakika tutulur?</div>
    <div class="mt-1">Ve o sürenin <b>bir saniye fazlasında</b> ne oluyor?</div>
  </div>
  <div class="callout-key">
    <div class="font-bold">Başarı ne?</div>
    <div class="mt-1">Kapasiteyi aşmamak mı, yoksa boş koltukla başlamamak mı?</div>
  </div>
</div>

<div class="callout-bad mt-7 text-sm">
Ve şunların hiçbiri mühendislik kararı değil: <b>iade var mı? Etkinlik iptal olursa ile müşteri vazgeçerse aynı mı? Bilet devredilebilir mi?</b>
</div>

<div class="mt-6 grid grid-cols-2 gap-5 text-sm">
  <div class="callout-key">
    <div class="font-bold text-blue-600 dark:text-blue-400">Önce BMAD</div>
    <div class="mt-1">Brief, PRD, mimari, story'ler.</div>
  </div>
  <div class="callout-good">
    <div class="font-bold text-green-600 dark:text-green-400">Sonra Superpowers</div>
    <div class="mt-1">Tek bir story: <b>koltuk seçilir ve ödemeye kadar geçici tutulur.</b></div>
  </div>
</div>

<!--
DOMAIN: etkinlik bileti satisi. Secildi cunku herkes bilet almistir, ve
modul 2'nin ogrettigi UC SINIF belirsizligi dogal olarak tasiyor. Ekrandaki uc
kutu tam olarak o uc sinif; isaret et.

Kisit sorusu en iyisi: "koltuk kac dakika tutulur" kolay cevaplanir, "bir saniye
fazlasinda ne olur" cevaplanmaz. Sinir davranisi orada.

Basari sorusu tuzak gibi gorunuyor ama gercek: havayollari bilerek fazla satiyor.
Yani "kapasiteyi asma" bir muhendislik kurali degil, bir IS karari. Bunu soyle.

DEVREDILEN STORY: "Kullanici bir koltuk secer ve odemeye kadar gecici olarak
tutulur." Kucuk, ama icinde bir zamanlayici ve bir yaris kosulu var, yani TDD
demosu icin gercek malzeme.

DEMO SIRASI ~20 dakika:
  BMAD tarafi, onceden pisirilmis artefaktlarla yurunur, ~8 dakika
  Superpowers tarafi, ilk uc adim canli, kalan dordu anlatim, ~12 dakika

EN GUCLU AN: BMAD'in urettigi STORY ile Superpowers'in o story icin yazdigi
SPEC'i yan yana koymak. Ayni is, iki irtifa, iki belge. Fraktal iddiasi burada
kanitlaniyor.
-->
