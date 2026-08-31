# DCS-F-14B(U)-Components release notes

## Scaffolded release baseline

This repository was generated with the **DCS Input Profile Importer** from
[DCS-Common](https://github.com/ScottyMac52/DCS-Common) and then refined for the
DCS F-14B(U). It is a complete consumer repository rather than a collection of
loose input files.

### Scaffold identity

| Property | Value |
| --- | --- |
| Display name | F-14B(U) |
| DCS input module | `F-14BU` |
| Saved Games kneeboard folder | `KNEEBOARD/F-14BU` |
| Kneeboard configuration | `config/kneeboard.json` |
| Scaffold audit | `SCAFFOLD-REPORT.md` |
| UI Layer composition | Enabled |

The most recent scaffold audit mapped all nine profiles discovered during that
import session, reported no unmapped devices and no preview errors, and
preserved the separately configured MOZA AB9 profile while it was absent from
the imported source set.

### Included controller profiles

The scaffold includes F-14B(U) DCS input profiles and generated hardware
kneeboard coverage for:

- VKB Gunfighter with F-14 grip
- Thrustmaster Warthog throttle
- Thrustmaster MFD 1, MFD 2 and MFD 3
- Thrustmaster TPR pendular rudder
- MOZA AB9 force-feedback base
- OnYourTwelve F-14 PDCP
- WINCTRL CarrierAce PTO 2
- WINCTRL ViperAce ICP

The generated pages document the actual base and shifted assignments from the
profile files, including buttons, switches, axes and user-defined labels.
`JOY_BTN7` on the VKB F-14 grip is retained as the F-14B(U) hold modifier, and
the generated modifier pages and legends are derived from the configured
bindings.

### Profile-driven kneeboards

The scaffold converts `config/kneeboard.json` into matching SVG source pages
and DCS-ready PNG pages:

- Editable/generated SVG source: `kneeboard/source`
- DCS-ready PNG output: `kneeboard/F-14BU`
- Aircraft summary pages and shared hardware pages are sorted into one
  continuous kneeboard
- Every page receives its package page number and consumer/page provenance
- Hardware artwork and callout geometry come from the canonical DCS-Common
  shared hardware definitions
- Labels remain consumer-owned so F-14B(U)-specific wording can be refined
  without modifying the shared artwork

Run `npm run build:kneeboard` to regenerate the complete kneeboard. The build
uses `DCS_COMMON_ROOT` when supplied and otherwise uses the repository's
`.dcs-common` checkout.

### UI Layer composition

UI Layer composition is enabled for this consumer. During kneeboard generation,
the applicable shared UI functions are superimposed on the same hardware pages
as the F-14B(U) assignments. During packaging, the canonical UI Layer input
payload is filtered to the hardware profiles used by this repository.

The OvGME payload therefore installs both:

- `Config/Input/F-14BU` for the aircraft profiles and F-14B(U) modifiers
- `Config/Input/UiLayer` for the applicable shared UI controls and its
  `modifiers.lua`

This keeps common VR, view and kneeboard controls visible alongside the aircraft
bindings without packaging unrelated UI Layer devices.

### OvGME package contents

The scaffold builds a versioned
`DCS-F-14BU-Components-<version>-OVGME.zip` containing:

- F-14B(U) joystick `.diff.lua` profiles
- F-14B(U) `modifiers.lua`
- The tailored DCS UI Layer joystick payload and modifiers
- Generated PNG kneeboard pages under `KNEEBOARD/F-14BU`
- Root-level `README.TXT` and `VERSION.TXT`

A SHA-256 checksum is generated for the archive. The complete release bundle
also includes the OvGME archive, repository documentation, these release notes,
optional AutoHotKey resources when present, a version file and per-file
checksums.

### Automated build and release validation

Pull requests and main-branch builds use the reusable DCS-Common workflow to:

- install dependencies and regenerate the kneeboard
- parse and validate the Lua input profiles
- build the versioned OvGME archive
- verify the archive checksum
- verify the required F-14B(U), tailored UI Layer and kneeboard paths
- verify the OvGME archive root and required metadata files
- build and validate the complete release bundle

Main-branch and tagged-release workflows keep the committed SVG and PNG
kneeboard artifacts synchronized with the packaged output. Tagged releases use
semantic version increments and publish both release ZIP files with
`SHA256SUMS.txt`.
