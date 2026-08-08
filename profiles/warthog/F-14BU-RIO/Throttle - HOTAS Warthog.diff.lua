-- F-14B(U) RIO / TM HOTAS Warthog throttle
-- Portable DCS "Load Profile" file: intentionally omits a device GUID.
-- Original mapping assembled from verified Heatblur F-14 RIO/LANTIRN command IDs.
-- JOY_BTN2 through JOY_BTN6 are deliberately left free for the repository's
-- AutoHotKey/VAICOM TX bridge, matching the Pilot throttle profile convention.
-- JOY_BTN13 and JOY_BTN14 (pinky switch) are intentionally unused because the
-- physical pinky switch on this cockpit's Warthog throttle is inoperative.

local diff = {
    ["axisDiffs"] = {
        ["a2001cdnil"] = { ["name"] = "Pitch", ["removed"] = { [1] = { ["key"] = "JOY_Y" } } },
        ["a2002cdnil"] = { ["name"] = "Roll", ["removed"] = { [1] = { ["key"] = "JOY_X" } } },
        ["a2003cdnil"] = { ["name"] = "Rudder", ["removed"] = { [1] = { ["key"] = "JOY_RZ" } } },
        ["a2004cdnil"] = { ["name"] = "Throttle Both", ["removed"] = { [1] = { ["key"] = "JOY_Z" } } },
    },
    ["keyDiffs"] = {
        ["d3498pnilu3498cd43vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN1" } }, ["name"] = "Video Output Toggle (TCS/LANTIRN)" },

        -- JOY_BTN2..JOY_BTN6 reserved for AutoHotKey/VAICOM TX1-TX5.

        ["d3501pnilu3501cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN7" } }, ["name"] = "LANTIRN Trigger Half Action" },
        ["d3502pnilu3502cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN8" } }, ["name"] = "LANTIRN Trigger Full Action" },
        ["d3504pnilunilcd7vd1vpnilvunil"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN9" } }, ["name"] = "LANTIRN Undesignate" },
        ["d3512pnilu3512cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN10" } }, ["name"] = "LANTIRN Toggle FOV" },

        -- Coolie HAT owns LANTIRN slew on the base layer. This keeps the broken
        -- Warthog pinky BTN13/BTN14 completely out of the profile.
        ["d3696pnilu3696cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_POV1_U" } }, ["name"] = "LANTIRN Slew Up" },
        ["d3695pnilu3695cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_POV1_R" } }, ["name"] = "LANTIRN Slew Right" },
        ["d3696pnilu3696cd7vd-1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_POV1_D" } }, ["name"] = "LANTIRN Slew Down" },
        ["d3695pnilu3695cd7vd-1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_POV1_L" } }, ["name"] = "LANTIRN Slew Left" },

        ["d3505pnilu3505cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN15" } }, ["name"] = "LANTIRN Point Track" },
        ["d3506pnilu3506cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN16" } }, ["name"] = "LANTIRN Area Track" },
        ["d3513pnilu3513cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN17" } }, ["name"] = "LANTIRN Toggle WHOT / BHOT" },
        ["d3510pnilunilcd7vd1vpnilvunil"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN18" } }, ["name"] = "LANTIRN QWP-" },
        ["d3511pnilunilcd7vd1vpnilvunil"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN19" } }, ["name"] = "LANTIRN QWP+" },
        ["d3683pnilu3683cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN20" } }, ["name"] = "LANTIRN S4 HAT Press (Declutter/Lase Auto-Man/MGC)" },
        ["d3507pnilu3507cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN21" } }, ["name"] = "LANTIRN S4 HAT Up (QADL/QHUD/Code +/Gain+)" },
        ["d3508pnilu3508cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN22" } }, ["name"] = "LANTIRN S4 HAT Right (QDES/Digit Right/Level+)" },
        ["d3509pnilu3509cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN23" } }, ["name"] = "LANTIRN S4 HAT Down (QSNO/Code -/Gain-)" },
        ["d3515pnilu3515cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN24" } }, ["name"] = "LANTIRN S4 HAT Left (Digit Left/Level-)" },
        ["d3514pnilu3514cd7vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN25" } }, ["name"] = "LANTIRN Slider AGC/MGC" },
        ["d3514pnilu3514cd7vd-1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN26" } }, ["name"] = "LANTIRN Slider Laser/Focus" },
        ["d3689pnilunilcd7vd1vpnilvunil"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN27" } }, ["name"] = "LANTIRN Power POD" },
        ["d3689pnilunilcd7vd0vpnilvunil"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN28" } }, ["name"] = "LANTIRN Power OFF" },
        ["d3705pnilunilcd7vd1vpnilvunil"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN29" } }, ["name"] = "LANTIRN Power Toggle" },
        ["d3704pnilunilcd7vd1vpnilvunil"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN30" } }, ["name"] = "LANTIRN OPER / STBY (Unstow)" },
        ["d3697pnilunilcd7vd1vpnilvunil"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN31" } }, ["name"] = "LANTIRN Mode Toggle" },
        ["d3517pnilunilcd7vd1vpnilvunil"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN32" } }, ["name"] = "LANTIRN Laser Arm Toggle" },
    },
}
return diff
