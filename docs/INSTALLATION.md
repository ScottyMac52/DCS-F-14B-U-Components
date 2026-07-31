# Installation

## Release package

Download `Scott-F-14BU-Complete-Package-<version>.zip` from the repository's GitHub Releases page. It contains:

- `OVGME` — the directly installable DCS profiles and kneeboard ZIP
- `AutoHotKey` — the VAICOM PRO transmit bridge
- `Documentation` — installation, control mappings, and OpenKneeboard guidance
- `SHA256SUMS.txt` — hashes for the included installable files

The direct `Scott-F-14BU-Control-Profiles-<version>.zip` release asset is identical to the ZIP inside the complete package.

## OVGME

Create an OVGME configuration with:

- Root folder: `C:\\Users\\vyper\\Saved Games\\DCS.openbeta`
- Mods folder: any dedicated OVGME repository folder
- Backup folder: OVGME default or a dedicated empty folder

Copy `OVGME/Scott-F-14BU-Control-Profiles-<version>.zip` into the mods folder, refresh OVGME, close DCS, and enable the package.

The package installs:

- `Config\\Input\\F-14BU\\joystick` — control profiles
- `KNEEBOARD\\F-14BU` — OpenKneeboard/DCS reference pages

## Warthog throttle

The supplied Saved Games directory did not contain the Warthog throttle's Windows GUID. After enabling the package:

1. Open DCS controls for the F-14B(U).
2. Right-click the Warthog throttle column.
3. Choose **Load profile**.
4. Load `Config\\Input\\F-14BU\\joystick\\Throttle - HOTAS Warthog F-14BU.diff.lua`.
5. Confirm `JOY_BTN2` through `JOY_BTN6` have no DCS assignments.

## OpenKneeboard

OpenKneeboard should discover the pages through its DCS Aircraft tab. If the new aircraft identifier is not mapped automatically:

1. Open **Settings → Tabs**.
2. Add a **Folder** tab.
3. Select `C:\\Users\\vyper\\Saved Games\\DCS.openbeta\\KNEEBOARD\\F-14BU`.
4. Name the tab `F-14B(U) Controls`.

Do not edit OpenKneeboard's internal JSON settings directly.

## AutoHotKey and VAICOM

Run `autohotkey\\dcs-Warthog.ahk` with AutoHotKey v2.0. It bridges Warthog device 12 to the five VoiceAttack/VAICOM TX key chords.

Close DCS before enabling or disabling the OVGME package.
