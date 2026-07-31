# DCS F-14B(U) Components

Scott's DCS F-14B(U) control profiles, VAICOM PRO push-to-talk bridge, OVGME packaging, and VR-optimized OpenKneeboard reference pages.

## Design goals

- Use the actual DCS Saved Games profile path: `Config\\Input\\F-14BU`.
- Keep VAICOM PRO voice-first and never require the Jester wheel.
- Preserve the five AutoHotKey-managed Warthog MIC positions.
- Make every physical binding readable in VR through OpenKneeboard.
- Produce a repeatable OVGME archive rather than maintaining a hand-built ZIP.

## Repository layout

| Path | Purpose |
|---|---|
| `src/Config/Input/F-14BU/joystick` | Canonical DCS `.diff.lua` profiles |
| `autohotkey/dcs-Warthog.ahk` | Warthog-to-VAICOM TX1-TX5 bridge |
| `kneeboard/F-14BU` | Generated OpenKneeboard/DCS PNG pages |
| `kneeboard/source` | Generated SVG sources |
| `docs` | Installation and complete mapping documentation |
| `packaging/ovgme` | OVGME `README.TXT` and `VERSION.TXT` |
| `scripts` | Kneeboard and OVGME build scripts |
| `dist` | Validated OVGME distribution archive |

## Quick start

1. Configure OVGME with this root:

   `C:\\Users\\vyper\\Saved Games\\DCS.openbeta`

2. Download the OVGME workflow artifact or run `scripts/Build-OvGME.ps1`, then place the ZIP from `dist` in that configuration's mod repository.
3. Close DCS, enable the package, then start DCS.
4. In OpenKneeboard, use the DCS Aircraft tab or add `KNEEBOARD\\F-14BU` as a Folder tab.
5. Load the Warthog throttle profile manually once because its Windows device GUID was not available.

See [Installation](docs/INSTALLATION.md), [Control mappings](docs/CONTROL-MAPPINGS.md), and [OpenKneeboard and VAICOM](docs/OPENKNEEBOARD-VAICOM.md).

## VAICOM PRO

The AutoHotKey bridge maps Warthog joystick device 12 to VoiceAttack/VAICOM:

| VAICOM TX | Physical input | VoiceAttack chord |
|---|---|---|
| TX1 — VHF AM | `12Joy6` | `Ctrl+Alt+Shift+1` |
| TX2 — UHF | `12Joy3` | `Ctrl+Alt+Shift+2` |
| TX3 — VHF FM | `12Joy4` | `Ctrl+Alt+Shift+3` |
| TX4 — AUTO | `12Joy5` | `Ctrl+Alt+Shift+4` |
| TX5 — Interphone | `12Joy2` | `Ctrl+Alt+Shift+5` |

DCS bindings are intentionally removed from `JOY_BTN2` through `JOY_BTN6` in the Warthog throttle profile.

## Version

Current package version: `1.2.0`
