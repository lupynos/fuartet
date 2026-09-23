# fuARTet

Statický web kapely: https://fuartet.cz/

## Vývoj a build

Je potřeba Node.js a pnpm. Z kořene projektu spusťte:

```sh
pnpm install --frozen-lockfile
pnpm run build
```

Pro průběžné generování Tailwind CSS použijte `pnpm run watch`.
Tailwind je připnutý na verzi 3.4.17 a strom závislostí ukládá `pnpm-lock.yaml`.
Commitujte také vygenerovaný `files/css/output.css`, protože hosting podává statické soubory.

## Úpravy obsahu a vzhledu

- Obsah je v `index.html`. Prázdný YAML front matter na začátku a Liquid výraz v patičce zpracovává při publikaci Jekyll. JavaScript web nevyžaduje.
- Vlastní styly upravujte v `files/css/site.css`, které se načítá po Tailwindu.
- `files/css/output.css` neupravujte ručně; generuje jej build.
- Proběhlé koncerty patří do sbalitelného archivu. Nové termíny přidejte nad archiv.
- Web používá menší WebP obrázky s uvedenými rozměry; původní JPG/PNG zůstávají zachované.
- Při změně fotek aktualizujte WebP i rozměry `width` a `height`. Aktuální WebP mají kvalitu 82 a delší stranu maximálně 1000 px (pozadí 1600 px).
- Sekce pro pořadatele nabízí bio a původní fotografie. Bio ke stažení je v `files/press/fuartet-bio.txt`; při změně upravte i text na stránce.
- Technický rider zatím není dodaný. Sekce odkazuje na domluvu s kapelou; po dodání lze přidat odkaz na PDF.

## Kontrola před publikováním

Spusťte build a prohlédněte web na mobilu i desktopu. Ověřte navigaci, archiv, stahování, hudební přehrávače a kontakt. Publikujte HTML, složku `files` a `CNAME`; `node_modules` se nepublikuje.

## Lokální náhled a vložené přehrávače

Otevírejte web přes lokální HTTP server. Dvojklik na index.html používá file:// a nemusí vloženým přehrávačům poskytnout potřebný kontext ani HTTP Referer.

V PowerShellu (Node.js a pnpm musí být dostupné):

```powershell
cd C:\dev\fuartet
pnpm install --frozen-lockfile
pnpm run build
pnpm dlx http-server@14.1.1 . -a 127.0.0.1 -p 8080 -c-1
```

Příkaz dlx při prvním spuštění potřebuje připojení k registru balíčků. Server je dostupný pouze na tomto počítači. Otevřete http://127.0.0.1:8080/ v běžném prohlížeči. Terminál nechte spuštěný; ukončíte ho Ctrl+C. Parametr -c-1 vypíná cache lokálního serveru. Pokud je port obsazený, použijte -p 8081 a odpovídající adresu.

Máte-li nainstalovaný Python, alternativou bez balíčku http-server je:

```powershell
cd C:\dev\fuartet
py -m http.server 8080 --bind 127.0.0.1
```

Při práci s Tailwind třídami spusťte ve druhém terminálu ze stejné složky pnpm run watch. Po úpravách obnovte prohlížeč; server sám stránku neobnovuje. Úpravy site.css build nepotřebují. Při podezření na starou cache použijte Ctrl+F5.

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

Oficiální dokumentace: [http-server](https://github.com/http-party/http-server), [chyby YouTube iframe přehrávače](https://developers.google.com/youtube/iframe_api_reference#onError), [diagnostika Spotify embeds](https://developer.spotify.com/documentation/embeds/tutorials/troubleshooting).

## Historie změn

Technické změny, ověření a známá omezení zapisujte do [CHANGELOG.md](CHANGELOG.md). Postup evidence a vydání je uvedený na konci changelogu.

## Datum sestavení v GitHub Pages

Na začátku index.html musí zůstat dva řádky `---` (prázdný YAML front matter). Jekyll díky nim zpracuje Liquid výraz `{{ site.time | date: "%Y-%m-%d" }}` v patičce. Jde o datum sestavení Jekyllem, nikoli datum posledního Git commitu nebo přesný okamžik dokončení deploye. Datum závisí na časovém pásmu buildu.

Publikace musí obsahovat Jekyll build; samotné nahrání statických souborů v custom GitHub Actions workflow Liquid nevyhodnotí. Soubor .nojekyll by při standardním publikování z větve Jekyll vypnul.

Lokální http-server ani Python http.server šablony nezpracovávají: zobrazí surový výraz a mohou zobrazit i front matter. Pro náhled odpovídající produkci použijte Jekyll build/serve v prostředí s Ruby a Jekyllem; obyčejný HTTP náhled slouží jen k orientační kontrole obsahu a přehrávačů.

Dokumentace: [Jekyll front matter](https://jekyllrb.com/docs/frontmatter/) a [site.time](https://jekyllrb.com/docs/variables/).
