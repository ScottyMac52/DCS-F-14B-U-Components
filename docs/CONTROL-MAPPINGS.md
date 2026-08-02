# F-14B(U) Control Mappings

## Warthog VAICOM TX bridge

| TX | Physical input | VoiceAttack chord |
|---|---|---|
| TX1 — VHF AM | `12Joy6` | `Ctrl+Alt+Shift+1` |
| TX2 — UHF | `12Joy3` | `Ctrl+Alt+Shift+2` |
| TX3 — VHF FM | `12Joy4` | `Ctrl+Alt+Shift+3` |
| TX4 — AUTO | `12Joy5` | `Ctrl+Alt+Shift+4` |
| TX5 — Interphone | `12Joy2` | `Ctrl+Alt+Shift+5` |

## Warthog throttle — speed brake

| Button | Command |
|---:|---|
| 7 | Speed brake retract |
| 8 | Speed brake extend |
| 15 | PLM button |

These directional bindings use the F-14B(U) speed-brake extend/retract command. BTN15 explicitly removes Heatblur's inherited CAGE-SEAM assignment before adding PLM, preventing both commands from firing together. None of these changes alter the AutoHotKey-managed MIC inputs on buttons 2–6.

## VKB F-14 Gunfighter — NWS and trim HAT

| Button | Command |
|---:|---|
| 7 | Autopilot Reference / Nosewheel Steering Toggle (NWS) |

The kneeboard labels BTN7 as **NWS toggle** for quick recognition in VR while retaining Heatblur's full combined command name here.

### Trim HAT

| HAT direction | Button | Command |
|---|---:|---|
| Up (back) | 10 | Trim pitch up |
| Left | 9 | Trim roll left wing down |
| Right | 12 | Trim roll right wing down |
| Down (forward) | 11 | Trim pitch down |

The four bindings are explicit in the Saved Games profile so they remain present even if Heatblur changes its device-default VKB mapping. Pitch/roll were previously swapped relative to physical hat directions; corrected in the profile.

## T-Pendular-Rudder (TRP) — rudder and toe brakes

| Physical axis | F-14B(U) axis | Notes |
|---|---|---|
| JOY_Z | Rudder | |
| JOY_Y | Wheel Brake Left | invert + slider |
| JOY_X | Wheel Brake Right | invert + slider |

Toe-brake axes require invert and slider so resting pedals = brakes released and progressive pressure applies braking. Without invert the axes are reversed (full brake at rest).

## MOZA AB9 FFB Base — flight axes

| Physical axis | F-14B(U) axis |
|---|---|
| Y | Pitch |
| X | Roll |

The primary pitch and roll bindings are explicit in the MOZA profile. The same profile removes inherited rudder and combined-throttle assignments so the TPR and throttle devices remain authoritative for those axes.

## WINCTRL CarrierAce PTO2 — launch bar / nose strut

| Physical switch position | Button | F-14B(U) command |
|---|---:|---|
| LAUNCH BAR RETRACT | 3 | Nose strut EXTEND; else OFF |
| LAUNCH BAR EXTEND | 4 | Nose strut KNEEL; else OFF |

The Hornet-labeled two-position launch-bar switch drives the Tomcat's three-way nose-strut control. Each maintained position returns the aircraft control to OFF when released.

## MFD 1 — direct Jester

| Button | Command | Button | Command |
|---:|---|---:|---|
| 1 | Steerpoint SP1 | 15 | Radar range 50 |
| 2 | Steerpoint SP2 | 16 | Radar range 100 |
| 3 | Steerpoint SP3 | 17 | Radar range 200 |
| 4 | Fixed point | 18 | Radar range 400 |
| 5 | Initial point | 19 | STT lock ahead |
| 6 | Surface target | 20 | STT lock enemy ahead |
| 7 | Home base | 21 | Ground stabilize |
| 8 | Manual steerpoint | 22 | Aircraft stabilize |
| 9 | VSL high | 23 | TWS |
| 10 | VSL low | 24 | RWS |
| 11 | Toggle PD-STT/P-STT | 25 | Collision steering |
| 12 | Break lock | 26 | Context short |
| 13 | Range auto | 27 | Context hold |
| 14 | Range 25 | 28 | Context double |

## MFD 2 — carrier and airframe

| Button | Command | Button | Command |
|---:|---|---:|---|
| 1 | Gear up | 11 | Refuel probe extend |
| 2 | Gear down | 12 | Refuel probe retract |
| 3 | Hook retract | 13 | Taxi light on |
| 4 | Hook extend | 14 | Taxi light off |
| 5 | Flaps up/half | 15 | Hook bypass carrier |
| 6 | Flaps down/half | 16 | Hook bypass field |
| 7 | Antiskid both | 17 | Nose strut kneel |
| 8 | Antiskid off | 18 | Master caution reset |
| 9 | Parking brake stow | 19 | Catapult salute |
| 10 | Parking brake pull | 20 | DLC/countermeasure |

## MFD 3 — pilot/Jester LANTIRN context

| Button | Pilot command |
|---:|---|
| 1 | Jester Context Action — smart short/hold/double |
| 2 | Jester Context Action SHORT — direct |
| 3 | Jester Context Action HOLD — direct |
| 4 | Jester Context Action DOUBLE — direct |
| 5–28 | Intentionally unbound |

In A/G mode, hold BTN1 while looking at a ground point and release it to ask Jester to slew the targeting pod and establish an area track. The same hold/look/release interaction on the VDI in LTS repeat tells Jester to move the pod to the indicated location. BTN2–BTN4 provide Heatblur's direct gesture fallbacks if the smart button has timing or hardware micro-interruption issues. No Jester wheel is required.

The generated kneeboard pages contain the complete PDCP, PTO2, Gunfighter, Warthog, axis, and reserved-device tables.
