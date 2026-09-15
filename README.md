# DCS-F-14BU-Components

OvGME-ready DCS input profiles, shared UI Layer controls, and generated kneeboard references for the **F-14B(U) Tomcat**.

| Identity | Value |
| --- | --- |
| DCS input module | `F-14BU` |
| Kneeboard folder | `F-14BU` |
| Release package | `DCS-F-14BU-Components-<version>-OVGME.zip` |

## Documentation

| Guide | Purpose |
| --- | --- |
| [Installation](docs/INSTALLATION.md) | Back up, install, verify, and remove the OvGME package. |
| [Control mappings](docs/CONTROL-MAPPINGS.md) | Device-by-device axes, buttons, modifiers, and unassigned/default profiles. |
| [OpenKneeboard and VAICOM PRO](docs/OPENKNEEBOARD-VAICOM.md) | Use the generated tab, VAICOM PTT bridge, and optional VoiceAttack navigation. |
| [Third-party assets](docs/THIRD-PARTY-ASSETS.md) | Hardware-art provenance and redistribution notes. |

## Package contents

- `Config/Input/F-14BU/joystick` — module-specific `.diff.lua` profiles.
- `Config/Input/F-14BU/modifiers.lua` — module modifiers when configured.
- `Config/Input/UiLayer` — the DCS-Common UI Layer payload filtered for the packaged devices.
- `KNEEBOARD/F-14BU` — numbered PNG control references.

The consumer repository owns module bindings, page composition, and labels. DCS-Common supplies the shared hardware definitions, renderer, packaging logic, and canonical UI Layer controls.

## Local build

```bash
npm ci
export DCS_COMMON_ROOT=/path/to/DCS-Common   # or checkout at .dcs-common
npm run build:kneeboard
npm run test:kneeboard
pwsh ./scripts/Build-OvGME.ps1 -Version 0.0.0-local
```

Review `config/kneeboard.json` and the matching files under `src/Config/Input/F-14BU` before releasing. See DCS-Common's [consumer repository setup](https://github.com/ScottyMac52/DCS-Common/blob/main/docs/consumer-repository-setup.md) for the shared contract.
