# F-14B(U) Warthog throttle seat profiles

These are portable DCS **Load Profile** `.diff.lua` files for the Thrustmaster HOTAS Warthog throttle. They are intentionally stored without a Windows device GUID so the files can be used on another machine without renaming them first.

## Profiles

- `F-14BU-Pilot/Throttle - HOTAS Warthog.diff.lua` — portable copy of this repository's canonical Pilot Warthog mapping.
- `F-14BU-RIO/Throttle - HOTAS Warthog.diff.lua` — original RIO mapping focused on direct LANTIRN operation.

Both profiles preserve `JOY_BTN2` through `JOY_BTN6` for the repository's AutoHotKey/VAICOM TX bridge.

## Loading in DCS

1. Open **Options → Controls** and select the F-14B(U) seat/category you want to configure.
2. Find the **Throttle - HOTAS Warthog** column.
3. Right-click the column and choose **Load profile**.
4. Select the matching Pilot or RIO file from this directory.
5. Review the column for conflicts before flying.

The canonical GUID-named Pilot profile under `src/Config/Input/F-14BU/joystick` remains the profile installed automatically by the OVGME package. The RIO profile is kept here as a manual-load profile until the B(U) RIO Saved Games input-directory behavior is verified against a current DCS installation.

## RIO layout

The RIO profile prioritizes the controls that are difficult to reach while heads-down on the PTID/TID:

| Warthog input | RIO command |
|---:|---|
| BTN1 | Video output TCS/LANTIRN |
| BTN2–BTN6 | Reserved for VAICOM |
| BTN7 / BTN8 | LANTIRN trigger half / full |
| BTN9 | Undesignate |
| BTN10 | FOV toggle |
| BTN11–BTN14 | Slew up/right/down/left |
| BTN15 / BTN16 | Point / area track |
| BTN17 | WHOT/BHOT |
| BTN18 / BTN19 | QWP− / QWP+ |
| BTN20 | S4 press |
| BTN21–BTN24 | S4 up/right/down/left |
| BTN25 / BTN26 | Slider AGC/MGC / laser-focus |
| BTN27 / BTN28 | Pod power / off |
| BTN29 | LANTIRN power toggle |
| BTN30 | OPER/STBY unstow |
| BTN31 | Mode toggle |
| BTN32 | Laser arm toggle |

### Provenance

The RIO command IDs were independently assembled from publicly inspectable Heatblur F-14 control definitions and command IDs already present in this repository's history. No third-party downloadable `.diff.lua` profile was copied. In particular, the popular GrEa5eLiTeNiN Warthog profile is marked **Do Not Redistribute** on DCS User Files and is therefore reference-only, not source material for these files.

The F-14B(U) is still new and Heatblur may revise control IDs. Treat this as a high-coverage starting profile and verify every binding in the DCS controls UI after updates.
