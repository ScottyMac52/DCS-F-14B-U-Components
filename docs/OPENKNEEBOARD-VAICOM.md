# OpenKneeboard and VAICOM PRO

## Control philosophy

VAICOM PRO remains the primary interface for conversational Jester and radio operations. Physical controls provide deterministic, time-critical actions:

- MFD 1: direct Jester navigation/radar/context commands without opening the wheel
- MFD 2: carrier and airframe actions
- MFD 3: direct LANTIRN commands
- Warthog MIC switch: TX1-TX5 through AutoHotKey and VoiceAttack

## OpenKneeboard tab

The OVGME package installs eight numbered PNG pages into:

`KNEEBOARD\\F-14BU`

The numeric prefixes preserve page order. Use the DCS Aircraft tab when detection works; otherwise add the directory as a Folder tab.

## Optional VoiceAttack commands

OpenKneeboard installs remote-control executables under:

`C:\\Program Files\\OpenKneeboard\\utilities`

These commands can be added to the existing VoiceAttack profile without changing VAICOM's TX bindings:

| Suggested phrase | Program |
|---|---|
| Kneeboard next page | `OpenKneeboard-RemoteControl-NEXT_PAGE.exe` |
| Kneeboard previous page | `OpenKneeboard-RemoteControl-PREVIOUS_PAGE.exe` |
| Kneeboard next tab | `OpenKneeboard-RemoteControl-NEXT_TAB.exe` |
| Kneeboard previous tab | `OpenKneeboard-RemoteControl-PREVIOUS_TAB.exe` |
| Kneeboard brighter | `OpenKneeboard-RemoteControl-INCREASE_BRIGHTNESS.exe` |
| Kneeboard dimmer | `OpenKneeboard-RemoteControl-DECREASE_BRIGHTNESS.exe` |
| Kneeboard night | `OpenKneeboard-RemoteControl-ENABLE_TINT.exe` |
| Kneeboard day | `OpenKneeboard-RemoteControl-DISABLE_TINT.exe` |

Use phrases that do not overlap with VAICOM keywords.

