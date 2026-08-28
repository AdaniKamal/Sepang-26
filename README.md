# SEPANG//26

**Unofficial Fan Companion**

A mobile-first fan web app concept for the KRACKEDEVS Sepang bounty. The project focuses on one clear use case: helping fans understand and enjoy a Malaysian F1 race weekend through circuit context, weather, strategy, beginner education and shareable fan interaction.

## Version history

| Version | Status | Main changes |
|---|---|---|
| V1 | Previous | First working race hub, generic circuit interaction, Strategy Lab, First Timer mode, Malaysia survival guide and prediction card. |
| V2 | Previous | Replaced the original acid-green palette with the Sepang sunrise direction: racing red, hot orange, amber, warm cream and asphalt black. |
| V3 | Previous | Added the Sepang-style circuit redraw, mobile responsiveness, T1–T15 interactions, and PNG download/native sharing for the fan prediction card. |
| V4 | Previous | Fixed fan-card action contrast and improved hover/focus readability. |
| V5 | Previous | Integrated MET Malaysia weather data via data.gov.my, 7-day forecast, warning detection, Fan Ready recommendations and weather-to-Strategy-Lab handoff. |
| V6 | Previous | Made the hero weather card interactive, added Weather to the menu and converted the 7-day forecast into a swipeable carousel. |
| V7 | Previous | Fixed duplicate forecast dates and simplified the Weather section copy. |
| V8 | Previous | Corrected the circuit turn mapping against the supplied Sepang reference. |
| V9 | Previous | Refined the circuit and added the live D-1 countdown. |
| V10 | Previous | Rebuilt the circuit against the latest supplied reference and added a mobile-friendly turn selector. |
| V11 | Previous | Added the Race Day Companion dashboard. |
| V11.1 | Previous | Improved First Timer mobile UX so each answer opens directly below the selected topic; removed “No jargon wall.” |
| V11.2 | Current | Fixed mobile Weekend session cards so the action chips no longer overlap the descriptive text. |
## Current features

- Mobile-first race weekend homepage
- Fan-made Sepang circuit redraw
- Interactive Turn 1–15 circuit notes
- MET Malaysia / data.gov.my Sepang forecast
- 7-day weather outlook in a swipeable carousel
- Morning, afternoon and night forecast
- Relevant Selangor / Sepang weather warning detection
- Fan Ready guidance based on forecast conditions
- Send current weather scenario into Strategy Lab
- Fan strategy simulator
- Beginner-friendly F1 explainer
- Malaysia-specific heat, rain, walking and connectivity guidance
- Fan prediction card
- Download prediction card as PNG
- Native mobile share sheet when supported
- Explicit unofficial / non-affiliation disclaimer

## Weather data

SEPANG//26 uses Malaysia's official Weather API published through **data.gov.my**. The source data is provided by **MET Malaysia (Malaysian Meteorological Department)**.

Official developer reference:

**https://developer.data.gov.my/realtime-api/weather**

Endpoints used:

```text
GET https://api.data.gov.my/weather/forecast
GET https://api.data.gov.my/weather/warning
```

The app filters the forecast for **Sepang** using the documented nested-location query syntax.

Important distinction:

- The **7-day general forecast is updated daily**.
- **Weather warnings are updated when required**.
- SEPANG//26 does not present this API as F1 telemetry, live track temperature or team-grade meteorological data.
- Forecast field values are currently supplied in Bahasa Melayu by the API; the app maps the documented values to concise English fan-facing labels.

The earthquake warning endpoint is intentionally not used because it is outside the app's race-weekend weather use case.

## Race-weekend behaviour

The forecast endpoint only provides a 7-day window. SEPANG//26 therefore shows the latest Sepang forecast normally.

When **2–4 October 2026** enters the available forecast window, those dates are automatically highlighted as the race weekend.

## Failure handling

If the API is unavailable:

- the rest of SEPANG//26 continues working;
- the weather module displays an unavailable state;
- generic Malaysia race-day preparation guidance remains visible.

## Project notes

The circuit illustration is an original fan-made redraw intended to evoke the recognizable Sepang layout. It is not an official circuit map asset.

Before final bounty submission, race session times, transport, venue facilities and other event-specific information should be validated against authoritative sources.

The project intentionally avoids official Formula 1 logos, team logos and copied Formula 1 UI.

## Circuit reference correction

V8 corrects the earlier circuit-turn mapping. The Turn 1–15 order in the interactive circuit view was rebuilt against the Sepang reference image supplied during development.

The circuit remains an original fan-made redraw for this project rather than a copied official map asset.
