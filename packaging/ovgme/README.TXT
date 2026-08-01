SCOTT'S F-14B(U) CONTROL PROFILES
OVGME PACKAGE VERSION {{VERSION}}

This package installs Scott's F-14B(U) control profiles and OpenKneeboard
pages into:

  C:\Users\vyper\Saved Games\DCS.openbeta

Installed paths:

  Config\Input\F-14BU\joystick
  KNEEBOARD\F-14BU

Configure OVGME with the DCS.openbeta Saved Games directory as its root.
Close DCS before enabling or disabling this package.

The Warthog throttle GUID was not available. Load its profile manually once:

  Config\Input\F-14BU\joystick\
  Throttle - HOTAS Warthog F-14BU.diff.lua

JOY_BTN2 through JOY_BTN6 are deliberately unassigned in DCS because they
are managed by AutoHotKey and VAICOM PRO.

OpenKneeboard should discover KNEEBOARD\F-14BU through the DCS Aircraft tab.
If not, add that directory as a Folder tab.
