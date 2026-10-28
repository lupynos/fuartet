# Správa a lokální vývoj webu fuARTet

Statický web kapely: https://fuartet.cz/

Pro testování stačí Python 3.7+ a PowerShell. Server čte HTML, CSS, JavaScript i obrázky přímo ze zdrojů; nepotřebuje npm, Node.js, instalaci balíčků ani build.

```powershell
cd C:\dev\fuartet
.\preview.ps1
```

Terminál vypíše přímé odkazy na Acoustic a Electric, obvykle na portu 8080. Obsazený nebo systémem zakázaný port (WinError 10013) automaticky přeskočí. Pokud nelze použít ani okolní porty, nechá volný port vybrat operační systém. Vždy otevřete skutečnou adresu vypsanou v terminálu. Terminál nechte otevřený; server ukončíte Ctrl+C. Po uložení úprav stačí obnovit prohlížeč (Ctrl+F5), server není nutné restartovat.

Vlastní port: `.\preview.ps1 -Port 8090`. Počáteční odkaz na Electric: `.\preview.ps1 -Theme electric`. Pokud PowerShell blokuje spouštění skriptů, použijte jednorázově `powershell -NoProfile -ExecutionPolicy Bypass -File .\preview.ps1`; trvalé nastavení systému se tím nemění.

Skript hledá Python v příkazech `py`, `python` a `python3`. Vlastní instalaci lze zadat parametrem `-Python 'C:\cesta\python.exe'`. Python server lze spustit i přímo: `py scripts/preview.py`.

## Styly ve verzi 3

Aktivní stránka používá `files/css/site.css`, akustické přepisy v `files/css/acoustic.css` a skripty `site.js`, `theme-init.js` a `theme.js`. Styly se upravují přímo. `theme-init.js` se načítá před CSS, aby přímý odkaz na variantu neproblikl původními barvami.

### Náhled obou variant a výchozí verze

V hlavičce jsou odkazy Electric a Acoustic; používají parametry `?theme=electric` a `?theme=acoustic`. Přepínání vyžaduje JavaScript; obsah i výchozí vzhled sestaveného webu fungují také bez něj. Historie prohlížeče vrací předchozí variantu. Parametr má přednost před nastavením buildu a nic se neukládá do localStorage.

Pro GitHub Pages změňte `band_theme` v `_config.yml` (`electric` nebo `acoustic`). Jekyll doplní hodnotu do atributu `data-theme` v HTML. Git tag jen označuje revizi, nastavení nemění.

Náhled přes `preview.ps1` načítá výchozí variantu z `_config.yml` při každém požadavku. Odstraní Jekyll front matter a nahradí dva používané Liquid výrazy (variantu a datum). Datum v lokálním náhledu znamená dnešní místní datum. Zdrojové soubory se nemění a složka `dist/` se nepoužívá.

### Volitelný statický build pro publikaci

Pro publikaci mimo Jekyll je ponechaný samostatný build s Node.js (bez dalších balíčků). Pro lokální testování ho nepotřebujete:

```powershell
$env:BAND_THEME='acoustic'
npm run build
Remove-Item Env:BAND_THEME
```

Bez `BAND_THEME` build převezme hodnotu z `_config.yml`. Neplatná hodnota build zastaví. Složka `dist/` je ignorovaná Gitem a obsahuje hotový web včetně `.nojekyll`; lze ji publikovat jako statický artefakt. Stávající publikování zdrojů přes Jekyll funguje dál.

## Historické styly (v2)

Archivní legacy-v2.html používá hotové files/css/legacy-v2-tailwind.css a vlastní legacy-v2.css. Tyto soubory jsou zachované v repozitáři. Nepoužívaný build Tailwindu byl odstraněn kvůli zranitelnostem jeho závislostí. Původní build lze dohledat v historii Gitu; pro provoz ani úpravy hlavního webu není potřeba.

## Úpravy obsahu a vzhledu

- Obsah je v `index.html`. Prázdný YAML front matter na začátku a Liquid výraz v patičce zpracovává při publikaci Jekyll. Obsah funguje bez JavaScriptu; načítání externích přehrávačů po kliknutí obsluhuje `files/js/site.js`.
- Vlastní styly upravujte v `files/css/site.css`.
- `files/css/output.css` je historický výstup, který hlavní ani archivní stránka nenačítá.
- Proběhlé koncerty patří do sbalitelného archivu. Nové termíny přidejte nad archiv.
- Web používá menší WebP obrázky s uvedenými rozměry; původní JPG/PNG zůstávají zachované.
- Při změně fotek aktualizujte WebP i rozměry `width` a `height`. Fotografie mají kvalitu 82 a delší stranu maximálně 1000 px (pozadí 1600 px). AI banner má 1440 × 480 px a kvalitu 86.
- Sekce pro pořadatele nabízí bio a původní fotografie. Bio ke stažení je v `files/press/fuartet-bio.txt`; při změně upravte i text na stránce.
- Technický rider zatím není dodaný. Sekce odkazuje na domluvu s kapelou; po dodání lze přidat odkaz na PDF.

## Kontrola před publikováním

Spusťte lokální HTTP server a prohlédněte web na mobilu i desktopu. Ověřte navigaci, archiv, stahování, hudební přehrávače a kontakt. Publikujte HTML, složku `files` a `CNAME`; `node_modules` se nepublikuje.

## Lokální náhled a vložené přehrávače

Otevírejte web přes lokální HTTP server. Dvojklik na index.html používá file:// a nemusí vloženým přehrávačům poskytnout potřebný kontext ani HTTP Referer.

V PowerShellu:

```powershell
cd C:\dev\fuartet
.\preview.ps1
```

Server je dostupný pouze na tomto počítači. V běžném prohlížeči otevřete odkaz vypsaný v terminálu. Cache je vypnutá. Obsazený port se automaticky přeskočí.

Pro úplně jednoduchý server bez zpracování šablony lze použít standardní Python příkaz:

```powershell
cd C:\dev\fuartet
py -m http.server 8080 --bind 127.0.0.1
```

Po úpravách CSS obnovte prohlížeč; server sám stránku neobnovuje. Při podezření na starou cache použijte Ctrl+F5.

### Kontrolní postup

1. Ověřte úvodní tlačítka, navigaci, otevření i zavření archivu a stažení TXT/JPG v sekci pro pořadatele.
2. V nástrojích pro vývojáře (F12) vyzkoušejte šířky 320, 375, 768 a 1280 px. Stránka se nemá vodorovně posouvat a text nesmí překrývat sousední obsah.
3. Klávesou Tab projděte navigaci a akce; odkaz Přejít na obsah musí být při zaměření viditelný. Archiv lze přepnout Enterem nebo mezerníkem.
4. S připojením k internetu posuňte stránku k přehrávačům (jsou načítané odloženě). Ručně spusťte Spotify, Bandcamp a každé YouTube video. Samotné zobrazení iframe ještě nepotvrzuje funkční přehrávání.
5. V panelu Network zkontrolujte, že vlastní HTML, CSS a obrázky nemají chyby 404. Chyby cizích domén posuzujte odděleně od chyb lokálních souborů.

### Pokud vložený obsah nefunguje

- YouTube chyba 153 znamená chybějící HTTP Referer nebo ekvivalentní identifikaci klienta. Použijte HTTP náhled a zkontrolujte, zda prohlížeč nebo rozšíření neodstraňuje Referer. Pro iframe nenastavujte no-referrer. Existující rel="noreferrer" na běžných odkazech se iframe netýká.
- Spotify: zkontrolujte podporu chráněných médií a zachování allow="encrypted-media" na iframe. Web tento atribut již obsahuje. Dostupnost plného přehrávání se může lišit podle přihlášení, prohlížeče a obsahu.
- Při chybě ERR_BLOCKED_BY_CLIENT ověřte, zda konkrétní požadavek neblokuje rozšíření. Pro srovnání lze použít samostatný běžný profil bez rozšíření; anonymní režim může mít přísnější omezení cookies.
- Ruční spuštění je očekávané; oprávnění autoplay samo nezaručuje automatické přehrávání.
- Nedostupné, soukromé nebo pro vložení zakázané video lokální server neopraví. Zkontrolujte také dostupnost přímo u poskytovatele.
- Lokální HTTP server umožní běžný náhled, ale nezaručuje přehrání veškerého externího obsahu. Před publikováním ověřte přehrávače i na cílové HTTPS doméně.

Oficiální dokumentace: [chyby YouTube iframe přehrávače](https://developers.google.com/youtube/iframe_api_reference#onError), [diagnostika Spotify embeds](https://developer.spotify.com/documentation/embeds/tutorials/troubleshooting).

## Historie změn

Technické změny, ověření a známá omezení zapisujte do [CHANGELOG.md](../CHANGELOG.md). Postup evidence a vydání je uvedený na konci changelogu.

## Datum sestavení v GitHub Pages

Na začátku index.html musí zůstat dva řádky `---` (prázdný YAML front matter). Jekyll díky nim zpracuje Liquid výraz `{{ site.time | date: "%Y-%m-%d" }}` v patičce. Jde o datum sestavení Jekyllem, nikoli datum posledního Git commitu nebo přesný okamžik dokončení deploye. Datum závisí na časovém pásmu buildu.

Publikace musí obsahovat Jekyll build; samotné nahrání statických souborů v custom GitHub Actions workflow Liquid nevyhodnotí. Soubor .nojekyll by při standardním publikování z větve Jekyll vypnul.

Obyčejný Python http.server šablony nezpracovává: zobrazí surový výraz a může zobrazit i front matter. Doporučený `preview.ps1` tyto konkrétní výrazy zpracovává průběžně, ale nenahrazuje celý Jekyll. Pro úplné ověření produkčního sestavení použijte Jekyll build/serve.

Dokumentace: [Jekyll front matter](https://jekyllrb.com/docs/frontmatter/) a [site.time](https://jekyllrb.com/docs/variables/).
