# Installing DCS-F-14BU-Components

## Requirements

- DCS World with the F-14BU module installed.
- OvGME configured with the DCS Saved Games directory as its root.
- The hardware profiles you intend to use.
- OpenKneeboard, VoiceAttack, VAICOM PRO, and AutoHotkey are optional.

## Back up existing controls

Before enabling the package, copy these folders somewhere outside Saved Games:

```text
Saved Games\DCS\Config\Input\F-14BU
Saved Games\DCS\Config\Input\UiLayer
Saved Games\DCS\KNEEBOARD\F-14BU
```

## Install with OvGME

1. Download `DCS-F-14BU-Components-<version>-OVGME.zip` from the repository release.
2. Add it to the OvGME configuration rooted at your DCS Saved Games directory.
3. Enable the package.
4. In DCS, open **Options → Controls → F-14BU** and verify the expected device columns.
5. Confirm that the numbered kneeboard pages appear in game or OpenKneeboard.

The archive writes `Config/Input/F-14BU`, the applicable `Config/Input/UiLayer` profiles, and `KNEEBOARD/F-14BU`.

## Device GUIDs

DCS embeds a Windows device-instance GUID in each `.diff.lua` filename. If your GUID differs, use DCS **Load profile** for the matching device or re-scaffold when the repository should adopt a newly captured device set.

## Remove or restore

Disable the package in OvGME before installing another version. Restore the backed-up folders to return to the pre-package state.
