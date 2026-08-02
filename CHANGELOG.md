# Changelog

## Unreleased

- Fixed VKB F-14 Gunfighter trim hat: pitch and roll were swapped relative to physical directions (JOY_BTN9–12 reassigned).
- Fixed T-Pendular-Rudder left/right wheel brake axes: added invert + slider so resting pedals release brakes and pressure applies them.
- Labeled VKB F-14 Gunfighter BTN7 as the NWS toggle on the VR kneeboard.
- Added explicit MOZA AB9 FFB Base pitch (`JOY_Y`) and roll (`JOY_X`) axis bindings.
- Replaced the text-only reference set with nine VR-oriented pages using labelled hardware imagery.
- Replaced the VKB F-14 grip vector stand-in with Scott's supplied product photograph.
- Added offline, deterministic source assets and documented their provenance and redistribution terms.
- Added automated validation for page names, count, dimensions, profile mappings, and reproducible output.

## 1.2.0 — 2026-07-31

- Added eight VR-optimized OpenKneeboard control-reference pages.
- Added the AutoHotKey v2 Warthog-to-VAICOM TX bridge.
- Added reproducible OVGME build and validation scripts.
- Added automated GitHub Releases with direct OVGME and complete-component bundles.
- Mapped Warthog throttle BTN7/BTN8 to speed-brake retract/extend.
- Corrected the Saved Games destination to `Config\\Input\\F-14BU`.
- Included the complete authoritative control-profile set.
