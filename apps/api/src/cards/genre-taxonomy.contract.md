# Genre taxonomy API contract

This document defines how clients (web + Android) consume genre themes from the API.

## Endpoint

- `GET /cards/genres`

## Response shape

```json
{
  "taxonomyVersion": "2026-05-05T13:55:12.345Z",
  "updatedAt": "2026-05-05T13:55:12.345Z",
  "entries": [
    {
      "id": 1,
      "name": "Rock",
      "isCountry": false,
      "parentId": null,
      "parentBId": null,
      "kind": "GENRE_ROOT",
      "intensity": "soft",
      "displayLabel": null,
      "theme": {
        "border": "#d01828",
        "headerBg": "#180404",
        "textMain": "#f04858",
        "textBody": "#d02838",
        "parchStrip": "#e3b2a4",
        "parchAbility": "#f0d2c8",
        "barPop": ["#800810", "#e82030"],
        "barExp": ["#600610", "#b81828"],
        "barGlowPop": "rgba(232,32,48,.85)",
        "barGlowExp": "rgba(184,24,40,.75)",
        "icon": "<svg ... />"
      },
      "updatedAt": "2026-05-05T13:55:12.345Z"
    }
  ]
}
```

## Client cache strategy (Android/Web)

- Cache `entries` locally (disk/database).
- Keep last seen `taxonomyVersion`.
- Re-fetch taxonomy on app start and periodic refresh.
- If `taxonomyVersion` changed, replace local cache.
- If API is unavailable, keep rendering from local cache.
- If no local cache exists, use a minimal bundled fallback.

## Taxonomy kind rules

- `COUNTRY_ROOT`: `isCountry = true`
- `COUNTRY_SUB_GENRE`: `isCountry = false` and parent row has `isCountry = true`
- `GENRE_ROOT`: `isCountry = false` and `parentId = null`
- `SUB_GENRE`: any other non-country child

## Card payload usage

- `GET /cards*` responses now include optional `genreTheme`.
- Clients should use `genreTheme` as primary theme source for card rendering.
- If `genreTheme` is absent for a row, fallback to local mapping logic.
