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
| `packaging/ovgme` | OVGME package metadata templates |
| `scripts` | Kneeboard and OVGME build scripts |
| `dist` | Validated OVGME archive, complete release bundle, and checksums |

## Quick start

1. Download `Scott-F-14BU-Complete-Package-<version>.zip` from GitHub Releases and extract it.
2. Configure OVGME with this root:

   `C:\\Users\\vyper\\Saved Games\\DCS.openbeta`

3. Place the ZIP from the extracted `OVGME` folder in that configuration's mod repository.
4. Close DCS, enable the package, then start DCS.
5. In OpenKneeboard, use the DCS Aircraft tab or add `KNEEBOARD\\F-14BU` as a Folder tab.
6. Load the Warthog throttle profile manually once because its Windows device GUID was not available.

The release also provides the OVGME ZIP as a separate asset for users who only need the DCS profiles and kneeboard. Pull requests and pushes to `main` build and validate CI packages without publishing them. Releases are created deliberately with the **Create tagged OVGME release** workflow.

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

Git tags in the form `vMAJOR.MINOR.PATCH` are the authoritative OVGME package versions. To publish a release, run the **Create tagged OVGME release** workflow from the Actions page and select a `patch`, `minor`, or `major` bump. The workflow calculates the next version from the newest stable tag, builds and validates that version, then creates the matching tag and GitHub Release from the exact same commit.

Ordinary CI builds use a prerelease version such as `0.0.0-ci.42`. Local builds default to `0.0.0-local`; pass `-Version 1.3.0` to the PowerShell build and test scripts when a specific version is needed.
