# F-14B(U) Warthog throttle seat profiles

These are portable DCS **Load Profile** `.diff.lua` files for the Thrustmaster HOTAS Warthog throttle.

## HOTAS shift architecture

The VKB F-14 Gunfighter grip `JOY_BTN7` is a dedicated **hold-only HOTAS SHIFT**. It has no aircraft command by itself.

On the VKB grip:

- DLC/CM button (`JOY_BTN5`) normally remains **DLC Toggle / Countermeasure Dispense**.
- `SHIFT + JOY_BTN5` is **Autopilot Reference / Nosewheel Steering Toggle**.
- The previous direct NWS/AP Reference binding on `JOY_BTN7` is removed.

This keeps NWS/AP Reference on the stick while making BTN7 safe to hold for second-layer Warthog commands.

DCS stores a shifted binding with a `reformers` entry. The profiles use `JOY_BTN7` as that reformer. Confirm the modifier is recognized in the current DCS controls UI after loading the profiles.

## Domain ownership / no-duplication rule

The shifted Warthog layer is for capabilities that otherwise require virtual-cockpit interaction. Do **not** spend shifted bindings duplicating dedicated hardware:

- **PTO2:** carrier/airframe controls such as gear, hook, flaps, antiskid, parking brake, refueling, taxi lights and nose strut.
- **PDCP:** HUD/VDI/HSD/ECM, steering and display controls.
- **MFD 1:** direct Jester navigation/radar/context controls.
- **MFD 2:** deterministic carrier/airframe backup.
- **MFD 3:** Pilot/Jester LANTIRN context controls.
- **Warthog BTN2-BTN6:** always reserved for the AutoHotKey/VAICOM TX bridge.

Safety/stateful controls such as engine cutoff retain one meaning and are not repurposed on Shift.

## Pilot philosophy

- **Base:** flight/combat, wing sweep and DFCS controls.
- **Shift:** additional B(U) combat/avionics/VR convenience functions that are not already represented by the dedicated cockpit hardware above.
- Speed-brake retract/extend are explicitly available both with and without Shift so holding BTN7 never removes speed-brake authority.

The remaining Pilot shifted assignments should only be filled with command IDs verified against a current F-14B(U) installation; speculative bindings are intentionally not added.

## RIO philosophy

- **Base:** direct LANTIRN operation.
- **Shift:** AWG-9 / TID / HCU / navigation capability.

The RIO base profile currently contains the verified LANTIRN command set. The shifted radar/TID/HCU layer is reserved but should only be populated with command IDs verified against the current B(U) RIO input definitions.

## Loading in DCS

1. Open **Options -> Controls** and select the F-14B(U) seat/category.
2. Confirm VKB `JOY_BTN7` is available as the HOTAS modifier and has no standalone aircraft command.
3. Find the **Throttle - HOTAS Warthog** column.
4. Right-click the column and choose **Load profile**.
5. Select the matching Pilot or RIO file.
6. Verify the base and shifted bindings in the Controls UI before flying.

The canonical GUID-named Pilot profile under `src/Config/Input/F-14BU/joystick` remains the OVGME-installed profile. The RIO profile remains manual-load until B(U) RIO Saved Games input-directory behavior is verified against a current DCS installation.

## RIO base layout

| Warthog input | RIO command |
|---:|---|
| BTN1 | Video output TCS/LANTIRN |
| BTN2-BTN6 | Reserved for VAICOM |
| BTN7 / BTN8 | LANTIRN trigger half / full |
| BTN9 | Undesignate |
| BTN10 | FOV toggle |
| BTN11-BTN14 | Slew up/right/down/left |
| BTN15 / BTN16 | Point / area track |
| BTN17 | WHOT/BHOT |
| BTN18 / BTN19 | QWP- / QWP+ |
| BTN20 | S4 press |
| BTN21-BTN24 | S4 up/right/down/left |
| BTN25 / BTN26 | Slider AGC/MGC / laser-focus |
| BTN27 / BTN28 | Pod power / off |
| BTN29 | LANTIRN power toggle |
| BTN30 | OPER/STBY unstow |
| BTN31 | Mode toggle |
| BTN32 | Laser arm toggle |

### Provenance

The RIO command IDs were independently assembled from publicly inspectable Heatblur F-14 control definitions and command IDs already present in this repository's history. No third-party downloadable `.diff.lua` profile was copied. The GrEa5eLiTeNiN Warthog profile is marked **Do Not Redistribute** on DCS User Files and is reference-only, not source material.

The F-14B(U) is still new and Heatblur may revise control IDs. Verify every binding in the DCS Controls UI after updates.
