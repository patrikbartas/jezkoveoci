# Ježkove oči

Jednoduchá statická web appka s ježkom, ktorého oči sledujú kurzor.

## Funkcie

- oči sa otáčajú smerom ku kurzoru
- prepínanie light/dark režimu kliknutím na ježka
- odkaz `2%` v ľavom dolnom rohu otvorí Google Drive dokument
- pripravené na jednoduchý hosting aj Vercel

## Súbory

- `index.html` - štruktúra stránky + SEO meta + favicon
- `styles.css` - layout, light/dark téma, responzívny vzhľad
- `main.js` - logika sledovania kurzora a prepínania témy
- SVG assety (`jezko_bez_oci.svg`, `lave-oko.svg`, `prave-oko.svg`, `favicon.svg`)

## Lokálne spustenie

Stačí otvoriť `index.html` v prehliadači, alebo spustiť jednoduchý statický server.

Príklad:

```bash
python3 -m http.server 8000
```

Potom otvor:

```text
http://localhost:8000
```

## Deploy

Projekt je statický, takže ho môžeš nasadiť:

- na Vercel (bez build kroku)
- na ľubovoľný static hosting
