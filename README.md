# SEPANG//26

**Unofficial Fan Companion**

A mobile-first fan web app concept for the KRACKEDEVS Sepang bounty. The project focuses on one clear use case: helping fans understand and enjoy a Malaysian F1 race weekend through circuit context, strategy, beginner education and shareable fan interaction.

## Version history

| Version | Status | Main changes |
|---|---|---|
| **V1** | Prototype | First working race hub, generic circuit interaction, Strategy Lab, First Timer mode, Malaysia survival guide and prediction card. |
| **V2** | Visual redesign | Replaced the portfolio-like acid-green palette with a distinct Sepang sunrise direction: racing red, hot orange, amber, warm cream and asphalt black. |
| **V3** | Current | Redrew the circuit into a recognizable Sepang-style 15-turn silhouette, improved mobile responsiveness, added full T1–T15 interactions, and added PNG download + native social sharing for the fan prediction card. |

## Current features

- Mobile-first race weekend homepage
- Friday / Saturday / Sunday session overview
- Fan-made Sepang circuit redraw
- Interactive Turn 1–15 circuit notes
- Fan strategy simulator for dry / light rain / heavy rain scenarios
- Beginner-friendly F1 explainer
- Malaysia-specific heat, rain, walking and connectivity guidance
- Fan prediction card
- Download prediction card as PNG
- Native mobile share sheet when the browser supports file sharing
- Explicit unofficial / non-affiliation disclaimer

## Run locally

Open `index.html` directly, or run:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Deploy

This version is static and does not require a backend. It can be deployed directly to:

- Vercel
- Netlify
- GitHub Pages

## Important project notes

The circuit illustration in this project is an original fan-made redraw intended to evoke the recognizable Sepang layout. It is not an official circuit map asset.

Before final bounty submission, official event details such as session times, transport, venue facilities, weather and race-weekend information should be validated against authoritative sources.

The project intentionally avoids official Formula 1 logos, team logos and copied Formula 1 UI.
