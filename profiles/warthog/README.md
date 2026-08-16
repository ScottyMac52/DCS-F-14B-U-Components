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
- **ViperAce ICP:** reserve for B(U) CDNU/navigation/data-entry functions rather than tactical throttle functions.
- **Warthog BTN2-BTN6:** always reserved for the AutoHotKey/VAICOM TX bridge.
- **Warthog BTN13-BTN14:** never bind; the physical pinky switch is inoperative.

Safety/stateful controls such as engine cutoff retain one meaning and are not repurposed on Shift.

## Pilot philosophy and selected Shift roles

- **Base:** flight/combat, wing sweep and DFCS controls.
- **Shift:** weapons/tactical/DFCS convenience that is not already represented by PTO2, PDCP, MFDs, ICP or VAICOM.
- Speed-brake retract/extend are explicitly available both with and without Shift so holding BTN7 never removes speed-brake authority.
- BTN13/BTN14 are excluded from both layers.

Verified Pilot autopilot definitions:

| Warthog input | Base role | Pilot SHIFT role |
|---:|---|---|
| BTN24 | Autopilot On, else Off | — |
| BTN25 | Altitude Hold On, else Off | — |
| BTN26 | Autopilot Heading Toggle On | — |
| BTN27 | Heading Hold GT, else Off | Autopilot Vector VEC/PCD, else Off |
| BTN28 | Autopilot Vector ACL, else Off | — |

The maintained BTN24, BTN25, BTN27, and BTN28 positions use deterministic press/release commands. The inherited generic autopilot toggle on BTN26 and inherited unmodified VEC/PCD binding on BTN27 are removed so each physical chord has one command form. Command IDs and value semantics are verified against the locally installed Heatblur input definitions, shared command enumeration, and current Saved Games exports.

On the VKB grip, `SHIFT + JOY_BTN3` remains A/P REF/NWS and `SHIFT + JOY_BTN5` provides Catapult Salute while preserving the base DLC/countermeasure action. The unmodified JOY_BTN6 paddle is the directly accessible emergency autopilot disconnect. `SHIFT + JOY_BTN6` is intentionally left out of the aircraft profile because the DCS UI Layer owns that chord for VR recentering.

## RIO philosophy and selected Shift roles

- **Base:** direct LANTIRN operation.
- **Shift:** HCU / AWG-9 / TID tactical control.
- **ICP:** B(U) CDNU/navigation data entry, keeping keypad work off the throttle.
- BTN13/BTN14 are excluded from both layers.

Preferred RIO Shift definitions, subject to exact current B(U) command-ID verification:

| Warthog input | RIO SHIFT role |
|---:|---|
| Slew X/Y | HCU X/Y axes |
| BTN1 slew push | HCU HALF ACTION |
| BTN2-BTN6 | VAICOM unchanged |
| BTN7 / BTN8 | Radar antenna elevation UP / DOWN |
| BTN9 / BTN10 | TID range IN / OUT |
| BTN11 / BTN12 | Radar scan azimuth narrow / wide |
| BTN13 / BTN14 | **UNUSED - broken pinky switch** |
| BTN15 | HCU FULL ACTION |
| BTN16 | MRL / Manual Rapid Lock-on |
| BTN17 | IFF Interrogate |
| BTN18 / BTN19 | Radar mode previous / next |
| BTN20 | OFFSET |
| BTN21-BTN24 | HCU modes: IR/TV / RDR / DDD CURSOR / TID CURSOR |
| BTN25 / BTN26 | DDD/TID display-scale or brightness candidates |
| BTN27 / BTN28 | Radar/TID range secondary pair if useful after validation |
| BTN29 / BTN30 | Radar STBY / XMT |
| BTN31 / BTN32 | STAB/scan-volume secondary functions |
| Coolie HAT | Radar scan center UP / RIGHT / DOWN / LEFT |

The RIO base profile contains the verified LANTIRN command set. The shifted radar/TID/HCU layer should only be populated with command IDs verified against the current B(U) RIO input definitions.

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
| Coolie HAT U/R/D/L | LANTIRN slew up/right/down/left |
| BTN13 / BTN14 | **UNUSED - broken pinky switch** |
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
