# fuARTet — web kapely

Zdrojové soubory oficiálního webu **[fuartet.cz](https://fuartet.cz/)**. fuARTet je instrumentální kvartet propojující funk, rock a jazz.

Web představuje kapelu, koncerty, hudbu a videa. Pořadatelé zde najdou kontakt, krátké bio a fotografie ke stažení.

## Co je v repozitáři

Jednostránkový web v HTML a CSS, publikovaný přes GitHub Pages s Jekyllem. Tailwind pomáhá se styly; drobný JavaScript přepíná šířku úvodního banneru. Obsah funguje i bez něj.

| Co chci upravit | Kde to najdu |
| --- | --- |
| Koncerty, texty, odkazy a videa | `index.html` |
| Vzhled a rozložení | `files/css/site.css` |
| Přepínání šířky banneru | `files/js/site.js` |
| Fotografie a grafika | `files/pic/` |
| Bio ke stažení | `files/press/fuartet-bio.txt` |
| Historie vydání | [CHANGELOG.md](CHANGELOG.md) |

Při úpravě bia aktualizujte text na stránce i soubor ke stažení. Proběhlé koncerty patří do sbalitelného archivu.

## Náhled a údržba

Pro lokální náhled stačí HTTP server; hotové CSS je součástí repozitáře. Postup spuštění, build Tailwindu a řešení problémů s přehrávači jsou v [návodu pro správu webu](docs/DEVELOPMENT.md).

Na začátku `index.html` ponechte prázdný YAML front matter (dva řádky `---`). Jekyll díky němu při sestavení doplní datum do patičky. Obyčejný lokální HTTP server tuto šablonu nevyhodnocuje.

## Verze webu

Významnější úpravy označujeme Git tagem, nyní **v2.1.1**. Číslo označuje podobu webu, nikoli hudební vydání kapely. Běžné aktualizace koncertů stačí ukládat jako commity.

- Opravy: zvýšit poslední číslo, například `2.1.1`.
- Nové funkce nebo sekce: zvýšit prostřední číslo, například `2.2.0`.
- Zásadní přestavba webu: zvýšit první číslo, například `3.0.0`.

Ke každému vydání patří záznam v changelogu, odpovídající verze v `package.json` a tag `vX.Y.Z`. Úspěšné nasazení na GitHub Pages je samostatný krok; samotný tag je nepotvrzuje.

## Kontakt

Koncerty a spolupráce: [borovicka.t@gmail.com](mailto:borovicka.t@gmail.com). Chyby webu lze hlásit přes [GitHub Issues](https://github.com/lupynos/fuartet/issues).
