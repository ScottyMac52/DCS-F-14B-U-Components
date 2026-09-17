# F-14BU control mappings

This reference is generated from the effective DCS `.diff.lua` profiles used by IPI. Those profiles remain the executable source of truth.

## Device index

| Device | Profile file | Layers | Assignments |
| --- | --- | --- | ---: |
| [F16 MFD 1](devices/TM-MFD-1-MAPPINGS.md) | `F16 MFD 1 {51FA60C0-CB32-11ed-800B-444553540000}.diff.lua` | Base, JOY_BTN7 | 33 |
| [F16 MFD 2](devices/TM-MFD-2-MAPPINGS.md) | `F16 MFD 2 {51FA39B0-CB32-11ed-8008-444553540000}.diff.lua` | Base, JOY_BTN7 | 31 |
| [F16 MFD 3](devices/TM-MFD-3-MAPPINGS.md) | `F16 MFD 3 {C5BE49A0-2342-11ee-8001-444553540000}.diff.lua` | Base | 12 |
| [MOZA AB9 FFB Base](devices/MOZA-AB9-MAPPINGS.md) | `MOZA AB9 FFB Base {71DA6210-432E-11f1-8001-444553540000}.diff.lua` | Base | 2 |
| [OnYourTwelve F-14 PDCP](devices/ONYOURTWELVE-PDCP-MAPPINGS.md) | `OnYourTwelve F-14 PDCP {52C96400-3F11-11f1-8001-444553540000}.diff.lua` | Base | 29 |
| [T-Pendular-Rudder](devices/TM-TPR-MAPPINGS.md) | `T-Pendular-Rudder {14ED3D40-3F58-11f1-8002-444553540000}.diff.lua` | Base | 3 |
| [Throttle - HOTAS Warthog](devices/TM-WARTHOG-THROTTLE-MAPPINGS.md) | `Throttle - HOTAS Warthog {5200C960-CB32-11ed-8020-444553540000}.diff.lua` | Base, JOY_BTN7 | 26 |
| [Viper TQS](devices/VIPER-TQS-MISSION-PACK-MAPPINGS.md) | `Viper TQS {C0A33440-3F54-11f1-8001-444553540000}.diff.lua` | Base | 0 |
| [VKBSim Gunfighter F14](devices/VKB-F14-GUNFIGHTER-MAPPINGS.md) | `VKBSim Gunfighter F14 {2D5CEC70-5189-11f1-8001-444553540000}.diff.lua` | Base, JOY_BTN7 | 16 |
| [WINCTRL CarrierAce PTO 2](devices/WINCTRL-PTO2-MAPPINGS.md) | `WINCTRL CarrierAce PTO 2 {19B7D090-6120-11f0-8001-444553540000}.diff.lua` | Base, JOY_BTN7 | 20 |
| [WINCTRL ViperAce ICP](devices/WINCTRL-ICP-MAPPINGS.md) | `WINCTRL ViperAce ICP {3731E2E0-4D98-11f1-8001-444553540000}.diff.lua` | JOY_BTN7, Base | 40 |

## Reading the tables

- `JOY_BTN#` identifies a button; `JOY_X`, `JOY_Y`, and similar names identify axes.
- A modifier before an input means both must be active.
- Empty/default profiles are documented explicitly rather than omitted.
- DCS device GUIDs in filenames are installation-specific; see [Installation](INSTALLATION.md#device-guids).

## Devices

### F16 MFD 1

- Profile: `F16 MFD 1 {51FA60C0-CB32-11ed-800B-444553540000}.diff.lua`
- Shared hardware: `tm-mfd`
- Physical instance: `51fa60c0-cb32-11ed-800b-444553540000`
- Kneeboard page: `02-TM-MFD-1.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN1` | SP 1 | — |
| `JOY_BTN2` | SP 2 | — |
| `JOY_BTN3` | SP 3 | — |
| `JOY_BTN4` | FP | — |
| `JOY_BTN5` | IP | — |
| `JOY_BTN6` | ST | — |
| `JOY_BTN7` | HB | — |
| `JOY_BTN8` | Man | — |
| `JOY_BTN9` | VSL High | — |
| `JOY_BTN10` | VSL Low | — |
| `JOY_BTN11` | PD/P-STT | — |
| `JOY_BTN12` | Brk Lck | — |
| `JOY_BTN13` | Auto | — |
| `JOY_BTN14` | 25 | — |
| `JOY_BTN15` | 50 | — |
| `JOY_BTN16` | 100 | — |
| `JOY_BTN17` | 200 | — |
| `JOY_BTN18` | 400 | — |
| `JOY_BTN19` | Lck Ahd | — |
| `JOY_BTN20` | Lck Enmy Ahd | — |
| `JOY_BTN21` | Grnd Stable | — |
| `JOY_BTN22` | AC Stable | — |
| `JOY_BTN23` | TWS | — |
| `JOY_BTN24` | RWS | — |
| `JOY_BTN25` | (CLSN) | — |
| `JOY_BTN26` | SHORT | — |
| `JOY_BTN27` | HOLD | — |
| `JOY_BTN28` | DOUBLE | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN20` | Lck Frnd Ahd | — |
| `JOY_BTN7 + JOY_BTN28` | RWR Brt Dwn Slw | — |
| `JOY_BTN7 + JOY_BTN26` | RWR Brt Dwn Fst | — |
| `JOY_BTN7 + JOY_BTN27` | RWR Brt Up Slw | — |
| `JOY_BTN7 + JOY_BTN25` | RWR Brt Up Fst | — |

### F16 MFD 2

- Profile: `F16 MFD 2 {51FA39B0-CB32-11ed-8008-444553540000}.diff.lua`
- Shared hardware: `tm-mfd`
- Physical instance: `51fa39b0-cb32-11ed-8008-444553540000`
- Kneeboard page: `03-TM-MFD-2.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN3` | Catapult | — |
| `JOY_BTN8` | Park | — |
| `JOY_BTN6` | Helpers | — |
| `JOY_BTN7` | Mesgs | — |
| `JOY_BTN9` | Teleport | — |
| `JOY_BTN22` | Miss Pdlck | — |
| `JOY_BTN21` | All Miss Pdlck | — |
| `JOY_BTN1` | Salute | — |
| `JOY_BTN5` | MSTR RST | — |
| `JOY_BTN18` | Play | — |
| `JOY_BTN17` | Stop | — |
| `JOY_BTN19` | FFWD | — |
| `JOY_BTN20` | FBKWD | — |
| `JOY_BTN27` | Vol Up | — |
| `JOY_BTN28` | Vol Dwn | — |
| `JOY_BTN2` | DLC/CMDS | — |
| `JOY_BTN13` | REC | — |
| `JOY_BTN15` | A/A | — |
| `JOY_BTN24` | 10 Down | — |
| `JOY_BTN23` | 10 Up | — |
| `JOY_BTN26` | 1 Down | — |
| `JOY_BTN25` | 1 Up | — |
| `JOY_BTN12` | INV | — |
| `JOY_BTN11` | NORM | — |
| `JOY_BTN16` | Switch | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN3` | Arm/Rfl | — |
| `JOY_BTN7 + JOY_BTN21` | Stp Pdlck | — |
| `JOY_BTN7 + JOY_BTN25` | T/R | — |
| `JOY_BTN7 + JOY_BTN26` | OFF | — |
| `JOY_BTN7 + JOY_BTN27` | Next WP | — |
| `JOY_BTN7 + JOY_BTN28` | Prev WP | — |

### F16 MFD 3

- Profile: `F16 MFD 3 {C5BE49A0-2342-11ee-8001-444553540000}.diff.lua`
- Shared hardware: `tm-mfd`
- Physical instance: `c5be49a0-2342-11ee-8001-444553540000`
- Kneeboard page: `04-TM-MFD-3.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN21` | Seat Up | — |
| `JOY_BTN22` | Seat Down | — |
| `JOY_BTN25` | ACM Cover | — |
| `JOY_BTN27` | ESeat ARMED | — |
| `JOY_BTN6` | Next WP | — |
| `JOY_BTN7` | Prev WP | — |
| `JOY_BTN1` | Context | — |
| `JOY_BTN2` | SHORT | — |
| `JOY_BTN3` | HOLD | — |
| `JOY_BTN4` | DOUBLE | — |
| `JOY_BTN24` | ALR-67 Vol Dwn | — |
| `JOY_BTN23` | ALR-67 Vol Up | — |

### MOZA AB9 FFB Base

- Profile: `MOZA AB9 FFB Base {71DA6210-432E-11f1-8001-444553540000}.diff.lua`
- Shared hardware: `moza-ab9`
- Physical instance: `71da6210-432e-11f1-8001-444553540000`
- Kneeboard page: `05-MOZA-AB9.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_Y` | Pitch Axis | — |
| `JOY_X` | Roll Axis | — |

### OnYourTwelve F-14 PDCP

- Profile: `OnYourTwelve F-14 PDCP {52C96400-3F11-11f1-8001-444553540000}.diff.lua`
- Shared hardware: `onyourtwelve-pdcp`
- Physical instance: `52c96400-3f11-11f1-8001-444553540000`
- Kneeboard page: `06-ONYOURTWELVE-PDCP.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN23` | HUD POWER OFF | — |
| `JOY_BTN24` | HUD POWER ON | — |
| `JOY_BTN27` | VDI POWER OFF | — |
| `JOY_BTN28` | VDI POWER ON | — |
| `JOY_BTN25` | HSD/ECM POWER OFF | — |
| `JOY_BTN26` | HSD/ECM POWER ON | — |
| `JOY_BTN1` | T.O. | — |
| `JOY_BTN2` | CRUISE | — |
| `JOY_BTN3` | A/A | — |
| `JOY_BTN4` | A/G | — |
| `JOY_BTN5` | LDG | — |
| `JOY_BTN15` | VDI NORM | — |
| `JOY_BTN16` | VDI TV | — |
| `JOY_BTN17` | HUD NIGHT | — |
| `JOY_BTN18` | HUD DAY | — |
| `JOY_BTN11` | HUD DIGITAL | — |
| `JOY_BTN12` | HUD ANALOG | — |
| `JOY_BTN13` | HUD ALT RDR | — |
| `JOY_BTN14` | HUD ALT BARO | — |
| `JOY_BTN29` | HSD ECM | — |
| `JOY_BTN20` | HSD TID | — |
| `JOY_BTN19` | HSD NAV | — |
| `JOY_BTN21` | ECM OVERRIDE OFF | — |
| `JOY_BTN22` | ECM OVERRIDE ON | — |
| `JOY_BTN6` | TACAN | — |
| `JOY_BTN7` | DEST | — |
| `JOY_BTN9` | VEC | — |
| `JOY_BTN10` | MAN | — |
| `JOY_BTN8` | AWL/PCD | — |

### T-Pendular-Rudder

- Profile: `T-Pendular-Rudder {14ED3D40-3F58-11f1-8002-444553540000}.diff.lua`
- Shared hardware: `tm-tpr`
- Physical instance: `14ed3d40-3f58-11f1-8002-444553540000`
- Kneeboard page: `07-TM-TPR.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_Z` | Rudder | — |
| `JOY_Y` | Whl Brk Lft | invert=true |
| `JOY_X` | Whl Brk Rght | invert=true |

### Throttle - HOTAS Warthog

- Profile: `Throttle - HOTAS Warthog {5200C960-CB32-11ed-8020-444553540000}.diff.lua`
- Shared hardware: `tm-warthog-throttle`
- Physical instance: `5200c960-cb32-11ed-8020-444553540000`
- Kneeboard page: `08-TM-WARTHOG-THROTTLE.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN16` | Stw Lft Inlt | — |
| `JOY_BTN17` | Stw Rght Inlt | — |
| `JOY_BTN11` | FWD | — |
| `JOY_BTN12` | AFT | — |
| `JOY_BTN28` | AP Hold On | — |
| `JOY_BTN27` | Hd Hold GT | — |
| `JOY_BTN26` | AP | — |
| `JOY_BTN15` | Auto Throt | — |
| `JOY_BTN20` | Eng Arstrt ON | — |
| `JOY_BTN32` | Crnk Eng Rt | — |
| `JOY_BTN31` | Crnk Eng Lft | — |
| `JOY_BTN18` | Crnk Eng OFF | — |
| `JOY_BTN19` | Crnk Eng OFF | — |
| `JOY_BTN25` | Pointer | — |
| `JOY_BTN30` | R eng idle | — |
| `JOY_BTN29` | L eng idle | — |
| `JOY_BTN24` | Master Arm | — |
| `JOY_BTN7` | SBrake Retract | — |
| `JOY_BTN8` | SBrake Extend | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN11` | Auto | — |
| `JOY_BTN7 + JOY_BTN12` | Bomb | — |
| `JOY_BTN7 + JOY_BTN9` | AP Vec ACL | — |
| `JOY_BTN7 + JOY_BTN10` | AP Vec OFF | — |
| `JOY_BTN7 + JOY_BTN26` | Hd Hold On | — |
| `JOY_BTN7 + JOY_BTN17` | Fuel Dump | — |
| `JOY_BTN7 + JOY_BTN21` | AP E Discon | — |

### Viper TQS

- Profile: `Viper TQS {C0A33440-3F54-11f1-8001-444553540000}.diff.lua`
- Shared hardware: `viper-tqs-mission-pack`
- Physical instance: `c0a33440-3f54-11f1-8001-444553540000`
- Kneeboard page: `not generated`

#### Base layer

No module-specific assignments are present. The profile remains available for shared UI Layer controls and future module bindings.

### VKBSim Gunfighter F14

- Profile: `VKBSim Gunfighter F14 {2D5CEC70-5189-11f1-8001-444553540000}.diff.lua`
- Shared hardware: `vkb-f14-gunfighter`
- Physical instance: `2d5cec70-5189-11f1-8001-444553540000`
- Kneeboard page: `01-VKB-F14-GUNFIGHTER.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN3` | Store Release | — |
| `JOY_BTN14` | Weapon Selector Sidewinder Missiles | — |
| `JOY_BTN16` | Weapon Selector Off | — |
| `JOY_BTN13` | Weapon Selector Sparrow or Phoenix Missiles | — |
| `JOY_BTN15` | Weapon Selector Gun | — |
| `JOY_BTN4` | Weapon Selector press | — |
| `JOY_BTN5` | DLC Toggle / Countermeasure Dispense | — |
| `JOY_BTN6` | Autopilot Reference / Nosewheel Steering Toggle | — |
| `JOY_BTN2` | Trigger | — |
| `JOY_BTN1` | Trigger First Detent | — |
| `JOY_BTN10` | Trim Pitch Down | — |
| `JOY_BTN11` | Trim Pitch Up | — |
| `JOY_BTN12` | Trim Roll Left Wing Down | — |
| `JOY_BTN9` | Trim Roll Right Wing Down | — |
| `JOY_RX` | DLC / Maneuver Flaps | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN5` | Bombing Tool - [Toggle] | — |

### WINCTRL CarrierAce PTO 2

- Profile: `WINCTRL CarrierAce PTO 2 {19B7D090-6120-11f0-8001-444553540000}.diff.lua`
- Shared hardware: `winctrl-pto2`
- Physical instance: `19b7d090-6120-11f0-8001-444553540000`
- Kneeboard page: `09-WINCTRL-PTO2.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN39` | Prkng brk pull | — |
| `JOY_BTN38` | Prkng brk stow | — |
| `JOY_BTN11` | Antskd/Splr BK Off | — |
| `JOY_BTN10` | Antskd/Splr BK Both | — |
| `JOY_BTN35` | Gears Up | — |
| `JOY_BTN37` | Gears Down | — |
| `JOY_BTN4` | Kneel | — |
| `JOY_BTN3` | Extend | — |
| `JOY_BTN32` | Hook Up | — |
| `JOY_BTN34` | Hook Down | — |
| `JOY_BTN7` | Flaps - DOWN | — |
| `JOY_BTN5` | Flaps - UP | — |
| `JOY_BTN2` | Master Caution | — |
| `JOY_BTN16` | Rfl Prb Rtrct | — |
| `JOY_BTN14` | Rfl Prb Ext | — |
| `JOY_BTN9` | Lghts Tax OFF | — |
| `JOY_BTN8` | Lghts Tax ON | — |
| `JOY_BTN13` | HookB CARRIER | — |
| `JOY_BTN12` | HookB FIELD | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN22` | E Jet Button | — |

### WINCTRL ViperAce ICP

- Profile: `WINCTRL ViperAce ICP {3731E2E0-4D98-11f1-8001-444553540000}.diff.lua`
- Shared hardware: `winctrl-icp`
- Physical instance: `3731e2e0-4d98-11f1-8001-444553540000`
- Kneeboard page: `10-WINCTRL-ICP.png`

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN29` | KB ON/OFF | — |
| `JOY_BTN7 + JOY_BTN31` | Prv Shrtct | — |
| `JOY_BTN7 + JOY_BTN30` | Nxt Shrtct | — |
| `JOY_BTN7 + JOY_BTN25` | HSD Head Down (Slow) | — |
| `JOY_BTN7 + JOY_BTN23` | HSD Hd Up Slw | — |
| `JOY_BTN7 + JOY_BTN24` | HSD Crs Dwn Slw | — |
| `JOY_BTN7 + JOY_BTN22` | HSD Crs Up Slw | — |
| `JOY_BTN7 + JOY_X` | Instr Lght Int | — |
| `JOY_BTN7 + JOY_RY` | Con Lght Int | — |
| `JOY_BTN7 + JOY_RX` | Frm Lght Int | — |
| `JOY_BTN7 + JOY_Y` | ALR-67 Volume | — |

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN21` | Trck Lnchd | — |
| `JOY_BTN7` | Shrtct  1 | — |
| `JOY_BTN8` | Shrtct  2 | — |
| `JOY_BTN9` | Shrtct  3 | — |
| `JOY_BTN11` | Shrtct  4 | — |
| `JOY_BTN12` | Shrtct  5 | — |
| `JOY_BTN13` | Shrtct  6 | — |
| `JOY_BTN15` | Shrtct  7 | — |
| `JOY_BTN16` | Shrtct  8 | — |
| `JOY_BTN17` | Shrtct  9 | — |
| `JOY_BTN18` | Shrtct 10 | — |
| `JOY_BTN30` | Nxt Pg | — |
| `JOY_BTN31` | Prv Pg | — |
| `JOY_BTN14` | Mk Shrtct | — |
| `JOY_BTN32` | VSL HI | — |
| `JOY_BTN33` | PAL | — |
| `JOY_BTN34` | VSL LO | — |
| `JOY_BTN4` | ILS Power | — |
| `JOY_BTN29` | Score window | — |
| `JOY_BTN25` | HSD Hd Dwn Fst | — |
| `JOY_BTN23` | HSD Hd Up Fst | — |
| `JOY_BTN24` | HSD Crs Dwn Fst | — |
| `JOY_BTN22` | HSD Crs Up Fst | — |
| `JOY_BTN20` | Vol Dec | — |
| `JOY_BTN19` | Vol Inc | — |
| `JOY_X` | HSD Bright | — |
| `JOY_Y` | HUD Bright | — |
| `JOY_RY` | VDI Bright | — |
| `JOY_RX` | VDI Cont | — |
