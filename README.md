# DCS F-14B(U) Components

Scott's DCS F-14B(U) control profiles, VAICOM PRO push-to-talk bridge, OVGME packaging, and VR-optimized OpenKneeboard reference pages.

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
| `kneeboard/F-14BU` | Generated OpenKneeboard/DCS PNG pages |
| `kneeboard/source` | Generated SVG sources |
| `kneeboard/assets/source` | Local image inputs used by the base F-14B(U) page generator |
| `docs` | Installation and complete mapping documentation |
| `packaging/ovgme` | OVGME package metadata templates |
| `scripts` | Kneeboard, shared-hardware adapter, versioning, and OVGME build scripts |
| `dist` | Validated OVGME archive, complete release bundle, and checksums |

## Quick start

1. Download `Scott-F-14BU-Complete-Package-<version>.zip` from GitHub Releases and extract it.
2. Configure OVGME with this root:

   `C:\\Users\\<username>\\Saved Games\\DCS.openbeta`

3. Place the ZIP from the extracted `OVGME` folder in that configuration's mod repository.
4. Close DCS, enable the package, then start DCS.
5. In OpenKneeboard, use the DCS Aircraft tab or add `KNEEBOARD\\F-14BU` as a Folder tab.
6. Load the Warthog throttle profile manually once because its Windows device GUID was not available.

The release also provides the OVGME ZIP as a separate asset for users who only need the DCS profiles and kneeboard.

See [Installation](docs/INSTALLATION.md), [Control mappings](docs/CONTROL-MAPPINGS.md), [OpenKneeboard and VAICOM](docs/OPENKNEEBOARD-VAICOM.md), and [Kneeboard image sources](docs/THIRD-PARTY-ASSETS.md).

## Shared kneeboard pipeline

The generated kneeboard contains nine pages. The F-14B(U) builder creates the complete base set, then `scripts/apply-shared-hardware.mjs` replaces the seven hardware pages with canonical device diagrams from DCS-Common:

- VKB F-14 Gunfighter grip
- Thrustmaster Warthog throttle
- OnYourTwelve PDCP
- WinCtrl PTO2
- Thrustmaster MFD 1, 2, and 3

The F-14B(U)-specific summary pages remain owned by this repository. Canonical shared-hardware assets, draw.io sources, geometry, and rendering logic are owned by DCS-Common.

The adapter locates DCS-Common in this order:

1. The directory specified by `DCS_COMMON_ROOT`.
2. The repository-local `.dcs-common` directory used by automation.

Do not hand-edit the generated shared hardware SVG or PNG pages in this repository. Make diagram changes in `assets/shared/hardware/drawio` in DCS-Common, regenerate and visually verify them there, merge that change, then rebuild this repository.

## Local development

Requirements:

- Node.js 22 and npm
- PowerShell 7 for the OVGME and release-bundle scripts
- A checkout of [DCS-Common](https://github.com/ScottyMac52/DCS-Common)

Install dependencies and point the build at DCS-Common.

PowerShell:

```powershell
npm ci
$env:DCS_COMMON_ROOT = 'C:\path\to\DCS-Common'
npm run build:kneeboard
npm run test:kneeboard
npm run test:versioning
```

Bash:

```bash
npm ci
export DCS_COMMON_ROOT=/path/to/DCS-Common
npm run build:kneeboard
npm run test:kneeboard
npm run test:versioning
```

`npm run build:kneeboard` first runs the F-14B(U) page generator and then applies the shared hardware renderer. The kneeboard test verifies the expected pages and dimensions, required content markers, offline generation, and deterministic rebuilds.

When changing control mappings or shared diagrams, inspect the generated SVG and PNG output before committing it. Generated pages are versioned so users and release builds receive the same reviewed output.

## Continuous integration and releases

Pull requests and pushes to `main` call the reusable build workflow in DCS-Common. CI checks out the shared repository automatically, rebuilds and tests the kneeboard, validates versioning and packaging, and uploads the generated packages without publishing a release.

Releases are created deliberately with the **Create tagged OVGME release** workflow:

1. Run the workflow from the Actions page.
2. Select a `patch`, `minor`, or `major` bump.
3. The reusable DCS-Common workflow calculates the next stable version from the latest tag.
4. It checks out the shared assets, rebuilds and validates the kneeboard and packages, commits regenerated kneeboard output when needed, and creates the matching tag and GitHub Release from that commit.

Git tags in the form `vMAJOR.MINOR.PATCH` are the authoritative OVGME package versions. Ordinary CI builds use a prerelease version such as `0.0.0-ci.42`. Local builds default to `0.0.0-local`; pass `-Version 1.3.0` to the PowerShell build and test scripts when a specific version is needed.

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
