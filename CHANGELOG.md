# Historie verzí webu

Verze označují stav zdrojového kódu Git tagem. Datum vydání není potvrzením dokončeného nasazení na GitHub Pages.

## Nevydané změny

Zatím žádné.

## [3.0.0](https://github.com/lupynos/fuartet/compare/v2.1.1...v3.0.0) — 2026-09-26

- Schválený mobilní redesign nasazen jako hlavní index.html; zachován tmavý vzhled, AI banner a tyrkysové akcenty.
- Výraznější úvod s hlavními akcemi a upoutávkou na nejbližší koncert; koncerty seřazeny chronologicky.
- Hlavní video, rozbalitelná galerie a Spotify načítané až po kliknutí. Externí odkazy fungují i bez JavaScriptu.
- Rozbalitelné medailonky členů a materiály pro pořadatele; schválené delší bio sjednoceno se souborem ke stažení.
- Galerie tří původních fotografií s odkazy na plná JPG a responzivním rozložením.
- Aktivní CSS a JS přesunuty z preview do site.css/site.js. Stránka nevyžaduje build Tailwindu; historické soubory zachovány.
- Zachován Jekyll front matter a datum sestavení v patičce, odstraněno noindex a testovací označení. test.html přesměrovává na hlavní web.
- Zachovány starší sekční kotvy; aktualizováno README a dokumentace údržby.
- Ověřeny lokální soubory, kotvy, bio a syntaxe JS; mobilní rozložení a načítání iframe byly ověřeny na schváleném návrhu. Přehrávání externích médií a produkční Jekyll build dosud nejsou potvrzené.

## [2.1.1](https://github.com/lupynos/fuartet/compare/v2.1.0...v2.1.1) — 2026-09-24

- Zjednodušen úvod pod bannerem: odstraněn opakovaný název a odkaz na vlastní stránku. Dosavadní popis hudby slouží jako hlavní nadpis h1.

## [2.1.0](https://github.com/lupynos/fuartet/compare/v2.0.0...v2.1.0) — 2026-09-24

### Přidáno

- Sekce členů kapely a materiály pro pořadatele: bio a fotografie ke stažení.
- Úvodní akce Poslechnout a Objednat koncert, AI banner a přepínač jeho šířky na desktopu.
- Sbalitelný archiv koncertů a aktualizovaný program včetně přesunutého Kyjova a říjnových koncertů.
- Čtyři YouTube videa včetně aTNTXdjkc1E, odkaz na kanál a přímé odkazy na jednotlivá videa.

### Změněno a opraveno

- Sekce Vydání přejmenována na Hudba; videa přesunuta hned za ni a přidána do navigace.
- Responzivní galerie videí 2 × 2, na mobilu jeden sloupec; odložené načítání přehrávačů.
- Rozložení navigace, členů, fotografií, přehrávačů a sociálních ikon pro menší displeje.
- Přístupnost: hlavní nadpis, navigační popisky, přeskočení na obsah, focus a názvy iframe.
- Fotografie ve WebP, explicitní rozměry a lazy loading; původní fotografie zachovány.
- Vlastní styly odděleny od generovaného CSS, Tailwind 3.4.17 připnutý pomocí pnpm lockfilu.
- Zachováno zpracování data sestavení Jekyllem pomocí front matter a site.time.
- README zkráceno na rozcestník; návody přesunuty do docs/DEVELOPMENT.md. Verze package.json sjednocena s tagem webu.

### Ověření a známá omezení

- Kontrola struktury HTML, lokálních souborů, kotev, obrázků a JavaScriptu; build CSS a kontrola diffu před označením verze.
- Skutečné přehrávání externích médií, vizuální kontrola celé stránky a produkční Jekyll build nebyly v tomto vydání automaticky ověřeny.
- Videa zatím mají neutrální popisky; technický rider čeká na dodání kapelou.

## Starší verze

V repozitáři existují tagy v1.0.0, v1.0.1, v1.0.2, v1.0.3 a v2.0.0. Podrobný changelog k nim nebyl veden; historii změn zachovává Git. Pracovní poznámky ze září 2026 jsou v [archivu](docs/CHANGELOG-DETAILS.md).

## Postup vydání

Zapište změny pod Nevydané změny. Před vydáním je přesuňte pod nové číslo a datum, aktualizujte package.json, ověřte build a web a vytvořte commit a anotovaný tag vX.Y.Z. Pushněte větev i konkrétní tag; potom ověřte výsledek GitHub Pages. Starší tagy nepřepisujte.
