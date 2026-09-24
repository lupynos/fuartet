# Archiv pracovních záznamů před vydáním v2.1.0

Záznam změn zdrojového kódu a obsahu webu. Datum označuje provedení změn, nikoli publikování. Stav nasazení sledujte samostatně; zápis v tomto souboru neznamená, že je změna na produkci.

## Záznamy z přípravy v2.1.0

Následující zápisy zachycují průběh práce včetně mezikroků a tehdejších omezení. Aktuální historii vydání najdete v [CHANGELOG.md](../CHANGELOG.md).

### 2026-09-24 – Hudba a přepínání banneru

- Sekce Vydání přejmenována na Hudba v nadpisu i navigaci; kotva #music zachována.
- V pravém horním rohu úvodu přidáno ikonové tlačítko přepínající šířku mezi 1504 px a 48rem, tedy šířkou sekce Hudba.
- Přepínač se zobrazí pouze od 1024 px a při funkčním JavaScriptu; má klávesnicové ovládání, stav aria-pressed a měnící se ikonu i tooltip. Výchozí stav zůstává široký.
- Nový files/js/site.js obsluhuje pouze tuto volitelnou interakci; obsah zůstává dostupný bez JavaScriptu.


### 2026-09-24 – videosekce

- Přidáno YouTube video aTNTXdjkc1E jako první, vizuálně zvýrazněná položka.
- Videa přesunuta za Vydání a před O nás, doplněn nadpis a odkaz v hlavní navigaci.
- Čtyři videa tvoří mřížku 2 × 2 od 768 px a jeden sloupec na mobilu; přehrávače mají lazy loading a minimální výšku 200 px.
- Doplněny přímé odkazy na jednotlivá videa a kanál pro případ potíží s vloženým přehrávačem.
- Skutečné názvy videí nebylo možné načíst; použity neutrální popisky. Přehrávání externích videí nebylo ověřeno.


### 2026-09-23 – širší úvodní blok

- Od šířky viewportu 1024 px má úvod maximálně 1504 px (1440 px obrázek a 64 px vnitřní okraje). Menší displeje zachovávají původní šířku bloku a vnější okraje.
- Obrázek vyplňuje dostupnou šířku při zachování poměru stran.


### 2026-09-23 – zkušební AI úvodní vizuál

- V index.html nasazena alternativní AI ilustrace files/pic/fuartet-hero-ai-v1.webp: tmavý hudební motiv s názvem kapely, modrými liniemi a zlatým akcentem.
- Webová varianta má rozměry 1440 × 480 px, explicitní rozměry v HTML a vysokou prioritu načtení.
- Původní Fuartet1.webp zůstává zachovaný; návrat vyžaduje změnu src a rozměrů zpět na 592 × 132 px.
- Ověřen vytvořený obrázek a jeho reference; vizuální kontrola celé stránky nebyla provedena.


### 2026-09-23 – obnovení data sestavení pro GitHub Pages

- Obnoven prázdný YAML front matter v index.html a původní Liquid výraz site.time v nenápadné patičce. Předchozí odstranění nesprávně předpokládalo publikaci bez Jekyllu.
- Doplněn styl publication-date v site.css a vysvětlení rozdílu mezi statickým HTTP náhledem a Jekyll buildem v README.
- Ověřena přítomnost front matter, Liquid výrazu a čistota diffu; produkční Jekyll build nebyl lokálně spuštěn.


### 2026-09-23 – synchronizace s origin/main

- Převzat commit cb934b5 s přesunem koncertu Víno a Jazz v Kyjově na 4. září 2026 v 19:30.
- Vyřešen konflikt v index.html: zachován sbalitelný archiv, lokální říjnové koncerty v Zábřehu a Opavě i ostatní rozpracované úpravy.
- Před synchronizací vytvořena záloha rozpracovaných změn v Git stash (codex-backup-before-pull-2026-09-23).


### 2026-09-23

#### Opravy

- Responzivní navigace, zalamování sociálních ikon a svislé rozložení profilů členů.
- Sekce O nás a hudební přehrávače používají jeden sloupec na mobilu a dva na širších obrazovkách; iframe přehrávače vyplňují dostupnou šířku.
- Doplněn hlavní nadpis, landmark main, odkaz pro přeskočení navigace, názvy navigací, popisky iframe a viditelný focus pro ovládání klávesnicí.
- Odstraněna nezpracovaná Liquid šablona v patičce a prázdná Jekyll front matter; HTML funguje jako samostatný statický dokument.
- Proběhlé termíny odděleny do archivu. Doplněny atributy rel u odkazů otevíraných do nové karty.

#### Funkce a obsah

- Úvodní odkazy Poslechnout, Objednat koncert a Pro pořadatele.
- Sbalitelný archiv 11 koncertů z let 2025–2026 včetně plakátu, založený na nativním details/summary bez JavaScriptu.
- Sekce Pro pořadatele: krátké bio, TXT ke stažení a dvě původní JPG fotografie.
- Kontaktní text pro poptávku koncertu; technické požadavky se domlouvají individuálně, rider dosud není dodán.
- Rozšířen meta description.

#### CSS, výkon a sestavení

- Nový files/css/site.css načítaný po Tailwind CSS obsahuje vlastní responzivní styly a styly nových prvků.
- Sedm používaných rastrových obrázků převedeno do WebP: celkem 1 804 753 → 377 756 bajtů (přibližně −79 %). Originály zachovány.
- Obrázky mají explicitní rozměry; fotografie mimo úvod a iframe používají lazy loading.
- Pozadí na mobilu nepoužívá fixed attachment.
- Přidán package.json s build/watch skripty, Tailwind CSS 3.4.17 a pnpm-lock.yaml; manifest i lockfile již nejsou ignorovány Gitem.
- Tailwind skenuje index.html; vygenerovaný output.css je minifikovaný.
- README obsahuje postup sestavení, údržby, lokálního HTTP náhledu a diagnostiky vložených přehrávačů.

#### Ověření a omezení

- Úspěšné sestavení CSS a instalace přes pnpm install --frozen-lockfile.
- Ověřeny lokální soubory, kotvy, unikátní ID, rozměry obrázků, popisky iframe, CSS pozadí a obsah sbaleného archivu.
- git diff --check bez chyb po sjednocení konců řádků.
- Build hlásil zastaralá data caniuse-lite; sestavení dokončil úspěšně.
- Vizuální kontrola a skutečné přehrávání externích médií dosud neověřeny. Automatizovaný prohlížeč odmítl přístup k lokálnímu file URL.
- Změny při zápisu tohoto záznamu nebyly commitnuté ani publikované.

## Jak historii udržovat

Při každé věcné změně doplňte do sekce Nevydané změny datum, dotčené soubory nebo části webu, důvod změny a provedené ověření. Při vydání přesuňte odpovídající záznamy pod nadpis s datem nasazení a doplňte skutečný Git commit nebo tag. Nevymýšlejte zpětně verze ani identifikátory commitů. Detailní diff zůstává v Gitu.
