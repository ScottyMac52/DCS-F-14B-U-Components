# DCS F-14B(U) Components

DCS/Heatblur F-14B(U) control profiles, VAICOM PRO push-to-talk bridge, OVGME packaging, and VR-optimized OpenKneeboard reference pages.

## Design goals

- Use the actual DCS Saved Games profile path: `Config\\Input\\F-14BU`.
- Keep VAICOM PRO voice-first and never require the Jester wheel.
- Preserve the five AutoHotKey-managed Warthog MIC positions.
- Make every physical binding readable in VR through OpenKneeboard.
- Produce a repeatable OVGME archive rather than maintaining a hand-built ZIP.
- Reuse the canonical hardware diagrams and build tooling maintained in [DCS-Common](https://github.com/ScottyMac52/DCS-Common).

## Repository layout

| Path | Purpose |
|---|---|
| `src/Config/Input/F-14BU/joystick` | Canonical DCS `.diff.lua` profiles |
| `autohotkey/dcs-Warthog.ahk` | Warthog-to-VAICOM TX1-TX5 bridge |
| `config/kneeboard.json` | Page order, shared device IDs, labels, and summary pages |
| `kneeboard/F-14BU` | Generated OpenKneeboard/DCS PNG pages |
| `kneeboard/source` | Generated SVG sources |
| `docs` | Installation and complete mapping documentation |
| `packaging/ovgme` | OVGME package metadata templates |
| `scripts` | Unified kneeboard builder, versioning, and OVGME/release scripts |
| `dist` | Validated OVGME archive, complete release bundle, and checksums |

## Quick start

1. Download `Scott-F-14BU-Complete-Package-<version>.zip` from GitHub Releases and extract it.
2. Configure OVGME with this root:

   `C:\\Users\\<username>\\Saved Games\\DCS.openbeta`

3. Place the ZIP from the extracted `OVGME` folder in that configuration's mod repository.
4. Close DCS, enable the package, then start DCS.
5. In OpenKneeboard, use the DCS Aircraft tab or add `KNEEBOARD\\F-14BU` as a Folder tab.
6. The Warthog throttle profile is installed automatically under its DCS device GUID; confirm `JOY_BTN2` through `JOY_BTN6` remain unassigned in DCS.

The release also provides the OVGME ZIP as a separate asset for users who only need the DCS profiles and kneeboard.

See [Installation](docs/INSTALLATION.md), [Control mappings](docs/CONTROL-MAPPINGS.md), [OpenKneeboard and VAICOM](docs/OPENKNEEBOARD-VAICOM.md), and [Kneeboard image sources](docs/THIRD-PARTY-ASSETS.md).

## Shared kneeboard pipeline

One script builds every page: `scripts/build-kneeboard.mjs`.

It imports DCS-Common helpers directly:

- `shared-hardware-consumer.mjs` for canonical device diagrams
- `profile-driven-kneeboard.mjs` for profile-backed labels
- `kneeboard-renderer.mjs` for consumer-owned summary pages

Current page set (ten pages):

- Summary: VAICOM overview, axes/reserved/OpenKneeboard notes
- Shared hardware: VKB F-14 Gunfighter grip, Warthog throttle, OnYourTwelve PDCP, WinCtrl PTO2, three Thrustmaster MFDs, TM TPR

DCS-Common is located in this order:

1. `DCS_COMMON_ROOT`
2. Repository-local `.dcs-common` (CI checkout)

Do not hand-edit generated SVG/PNG pages. Change diagrams in DCS-Common, rebuild there, then rebuild this repository.

## Local development

Requirements:

- Node.js 22 and npm
- PowerShell 7 for the OVGME and release-bundle scripts
- A checkout of [DCS-Common](https://github.com/ScottyMac52/DCS-Common)

```powershell
npm ci
$env:DCS_COMMON_ROOT = 'C:\path\to\DCS-Common'
npm run build:kneeboard
npm run test:kneeboard
npm run test:versioning
./scripts/Build-OvGME.ps1 -Version 0.0.0-local
./scripts/Test-Package.ps1 -Version 0.0.0-local
./scripts/Build-Release.ps1 -Version 0.0.0-local
./scripts/Test-Package.ps1 -Version 0.0.0-local
```

```bash
npm ci
export DCS_COMMON_ROOT=/path/to/DCS-Common
npm run build:kneeboard
npm run test:kneeboard
npm run test:versioning
```

`npm run build:kneeboard` is a single command. There is no separate `apply-shared-hardware` step and no `Test-Release.ps1`. `Test-Package.ps1` validates both the OVGME package and the complete release bundle.

## Continuous integration and releases

Pull requests and pushes to `main` call the reusable build workflow in DCS-Common. CI checks out the shared repository automatically, rebuilds and tests the kneeboard, validates versioning and packaging, and uploads the generated packages without publishing a release.

Releases are created deliberately with the **Create tagged OVGME release** workflow:

1. Run the workflow from the Actions page.
2. Select a `patch`, `minor`, or `major` bump.
3. The reusable DCS-Common workflow calculates the next stable version from the latest tag.
4. It rebuilds and validates the kneeboard and packages, commits regenerated kneeboard output when needed, and creates the matching tag and GitHub Release from that commit.

Git tags in the form `vMAJOR.MINOR.PATCH` are the authoritative OVGME package versions. Ordinary CI builds use a prerelease version such as `0.0.0-ci.42`. Local builds default to `0.0.0-local`.

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
