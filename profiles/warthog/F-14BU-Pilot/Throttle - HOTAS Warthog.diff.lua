-- F-14B(U) Pilot / TM HOTAS Warthog throttle
-- Portable DCS "Load Profile" copy of the repository's canonical Pilot profile.
-- This file intentionally omits the machine-specific Warthog device GUID.
-- JOY_BTN2 through JOY_BTN6 remain reserved for AutoHotKey/VAICOM TX1-TX5.

local diff = {
    ["axisDiffs"] = {
        ["a2001cdnil"] = { ["name"] = "Pitch", ["removed"] = { [1] = { ["key"] = "JOY_Y" } } },
        ["a2002cdnil"] = { ["name"] = "Roll", ["removed"] = { [1] = { ["key"] = "JOY_X" } } },
        ["a2003cdnil"] = { ["name"] = "Rudder", ["removed"] = { [1] = { ["key"] = "JOY_RZ" } } },
        ["a2004cdnil"] = { ["name"] = "Throttle Both", ["removed"] = { [1] = { ["key"] = "JOY_Z" } } },
    },
    ["keyDiffs"] = {
        ["dnilp3020u3020cd18vdnilvp-1vu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN7" } }, ["name"] = "Speed brake retract" },
        ["dnilp3020u3020cd18vdnilvp1vu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN8" } }, ["name"] = "Speed brake extend" },
        ["d3126pnilu3126cd57vd1vpnilvu0"] = { ["removed"] = { [1] = { ["key"] = "JOY_BTN15" } }, ["name"] = "CAGE-SEAM button" },
        ["d3127pnilu3127cd57vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN15" } }, ["name"] = "PLM button" },
        ["d3024pnilu3024cd17vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN11" } }, ["removed"] = { [1] = { ["key"] = "JOY_BTN3" } }, ["name"] = "Wing Sweep Auto Mode" },
        ["d3025pnilu3025cd17vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN9" } }, ["removed"] = { [1] = { ["key"] = "JOY_BTN4" } }, ["name"] = "Wing Sweep Forward" },
        ["d3026pnilu3026cd17vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN10" } }, ["removed"] = { [1] = { ["key"] = "JOY_BTN6" } }, ["name"] = "Wing Sweep Aft" },
        ["d3027pnilu3027cd17vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN12" } }, ["removed"] = { [1] = { ["key"] = "JOY_BTN5" } }, ["name"] = "Wing Sweep Bomb Mode" },
        ["d3550pnilu3550cd62vd1vpnilvu-1"] = { ["removed"] = { [1] = { ["key"] = "JOY_BTN2" } }, ["name"] = "Toggle Menu" },
        ["d3136pnilu3136cd55vd-1vpnilvu0"] = { ["removed"] = { [1] = { ["key"] = "JOY_BTN9" } }, ["name"] = "Master arm on/off (3pos)" },
        ["d3136pnilu3136cd55vd1vpnilvu0"] = { ["removed"] = { [1] = { ["key"] = "JOY_BTN10" } }, ["name"] = "Master arm off/training (3pos)" },
        ["d3139pnilu3139cd55vd1vpnilvu0"] = { ["removed"] = { [1] = { ["key"] = "JOY_BTN12" } }, ["name"] = "AIM-9 cooling toggle" },
        ["d3018pnilunilcd18vd0vpnilvunil"] = { ["removed"] = { [1] = { ["key"] = "JOY_BTN21" } }, ["name"] = "Gears Toggle" },
        ["d3041pnilunilcd22vd0vpnilvunil"] = { ["removed"] = { [1] = { ["key"] = "JOY_BTN26" } }, ["name"] = "Autopilot toggle" },
        ["d3056pnilu3056cd35vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN21" } }, ["name"] = "Master Caution Reset" },
        ["d3040pnilu3040cd22vd1vpnilvu-1"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN24" } }, ["name"] = "Autopilot On, else Off" },
        ["d3038pnilu3038cd22vd1vpnilvu-1"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN25" } }, ["name"] = "Altitude Hold On, else Off" },
        ["d3744pnilunilcd22vd1vpnilvunil"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN26" } }, ["name"] = "Autopilot Heading Toggle On" },
        ["d3128pnilu3128cd20vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN29" } }, ["name"] = "Left Engine Cutoff" },
        ["d3129pnilu3129cd20vd1vpnilvu0"] = { ["added"] = { [1] = { ["key"] = "JOY_BTN30" } }, ["name"] = "Right Engine Cutoff" },
    },
}
return diff
