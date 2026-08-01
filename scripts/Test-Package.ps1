[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent $PSScriptRoot
$Version = (Get-Content (Join-Path $RepoRoot 'packaging/ovgme/VERSION.TXT') -Raw).Trim()
$PackageName = "Scott-F-14BU-Control-Profiles-$Version"
$Archive = Join-Path $RepoRoot "dist/$PackageName.zip"
$VerifyRoot = Join-Path $RepoRoot '.build/verify'

if (-not (Test-Path $Archive)) { throw "Missing package: $Archive" }
Remove-Item $VerifyRoot -Recurse -Force -ErrorAction SilentlyContinue
Expand-Archive $Archive $VerifyRoot

$Container = Join-Path $VerifyRoot $PackageName
$Joystick = Join-Path $Container 'Config/Input/F-14BU/joystick'
$Kneeboard = Join-Path $Container 'KNEEBOARD/F-14BU'

if (-not (Test-Path $Joystick)) { throw 'Missing F-14BU joystick directory.' }
if (-not (Test-Path $Kneeboard)) { throw 'Missing F-14BU kneeboard directory.' }
if ((Get-ChildItem $Joystick -Filter '*.diff.lua').Count -ne 12) { throw 'Expected 12 control profiles.' }
if ((Get-ChildItem $Kneeboard -Filter '*.png').Count -ne 8) { throw 'Expected 8 kneeboard pages.' }
if ((Get-Content (Join-Path $VerifyRoot 'VERSION.TXT') -Raw).Trim() -ne $Version) { throw 'VERSION.TXT mismatch.' }

$Throttle = Get-Content (Join-Path $Joystick 'Throttle - HOTAS Warthog F-14BU.diff.lua') -Raw
$AddedKeys = [regex]::Matches(
    $Throttle,
    '\["added"\]\s*=\s*\{\s*\[1\]\s*=\s*\{\s*\["key"\]\s*=\s*"(?<Key>JOY_BTN\d+)"'
) | ForEach-Object { $_.Groups['Key'].Value }
foreach ($Button in 2..6) {
    if ($AddedKeys -contains "JOY_BTN$Button") {
        throw "Warthog MIC JOY_BTN$Button was added unexpectedly."
    }
}

$SpeedBrakeBindings = @(
    @{ Command = 'dnilp3020u3020cd18vdnilvp-1vu0'; Button = 'JOY_BTN7'; Name = 'Speed brake retract' },
    @{ Command = 'dnilp3020u3020cd18vdnilvp1vu0'; Button = 'JOY_BTN8'; Name = 'Speed brake extend' }
)
foreach ($Binding in $SpeedBrakeBindings) {
    $CommandPattern = '(?ms)^\t\t\["' + [regex]::Escape($Binding.Command) +
        '"\]\s*=\s*\{(?<Block>.*?)(?=^\t\t\["|^\t\},)'
    $CommandMatch = [regex]::Match($Throttle, $CommandPattern)
    if (-not $CommandMatch.Success) {
        throw "Missing Warthog speed-brake command $($Binding.Command)."
    }

    $Block = $CommandMatch.Groups['Block'].Value
    if ($Block -notmatch ('\["key"\]\s*=\s*"' + [regex]::Escape($Binding.Button) + '"')) {
        throw "$($Binding.Command) is not mapped to $($Binding.Button)."
    }
    if ($Block -notmatch ('\["name"\]\s*=\s*"' + [regex]::Escape($Binding.Name) + '"')) {
        throw "$($Binding.Command) does not have the expected name '$($Binding.Name)'."
    }
}

$CageSeamPattern = '(?ms)^\t\t\["d3126pnilu3126cd57vd1vpnilvu0"\]\s*=\s*\{' +
    '(?<Block>.*?)(?=^\t\t\["|^\t\},)'
$CageSeamMatch = [regex]::Match($Throttle, $CageSeamPattern)
if (-not $CageSeamMatch.Success -or
    $CageSeamMatch.Groups['Block'].Value -notmatch '\["removed"\].*?"JOY_BTN15"') {
    throw 'Warthog JOY_BTN15 was not removed from CAGE-SEAM.'
}

$PlmPattern = '(?ms)^\t\t\["d3127pnilu3127cd57vd1vpnilvu0"\]\s*=\s*\{' +
    '(?<Block>.*?)(?=^\t\t\["|^\t\},)'
$PlmMatch = [regex]::Match($Throttle, $PlmPattern)
if (-not $PlmMatch.Success -or
    $PlmMatch.Groups['Block'].Value -notmatch '\["added"\].*?"JOY_BTN15"' -or
    $PlmMatch.Groups['Block'].Value -notmatch '\["name"\]\s*=\s*"PLM button"') {
    throw 'Warthog JOY_BTN15 is not mapped exclusively to PLM as expected.'
}

$Pto2Profile = Get-ChildItem $Joystick -Filter 'WINCTRL CarrierAce PTO 2*.diff.lua'
if ($Pto2Profile.Count -ne 1) { throw 'Expected exactly one WINCTRL CarrierAce PTO2 profile.' }
$Pto2 = Get-Content $Pto2Profile.FullName -Raw
$NoseStrutBindings = @(
    @{ Command = 'd3019pnilu3019cd18vd1vpnilvu0'; Button = 'JOY_BTN3'; Name = 'Nose strut - EXTEND else OFF (3-way Switch Up)' },
    @{ Command = 'd3019pnilu3019cd18vd-1vpnilvu0'; Button = 'JOY_BTN4'; Name = 'Nose strut - KNEEL else OFF (3-way Switch Down)' }
)
foreach ($Binding in $NoseStrutBindings) {
    $Pattern = '(?ms)^\t\t\["' + [regex]::Escape($Binding.Command) +
        '"\]\s*=\s*\{(?<Block>.*?)(?=^\t\t\["|^\t\},)'
    $Match = [regex]::Match($Pto2, $Pattern)
    if (-not $Match.Success -or
        $Match.Groups['Block'].Value -notmatch ('\["added"\].*?"' + [regex]::Escape($Binding.Button) + '"') -or
        $Match.Groups['Block'].Value -notmatch ('\["name"\]\s*=\s*"' + [regex]::Escape($Binding.Name) + '"')) {
        throw "PTO2 nose-strut binding $($Binding.Name) is not mapped to $($Binding.Button)."
    }
}

$GunfighterProfile = Get-ChildItem $Joystick -Filter '*Gunfighter F14*.diff.lua'
if ($GunfighterProfile.Count -ne 1) { throw 'Expected exactly one VKB F-14 Gunfighter profile.' }
$Gunfighter = Get-Content $GunfighterProfile.FullName -Raw
$TrimBindings = @(
    @{ Command = 'dnilp2019u2019cdnilvdnilvp1vu0'; Button = 'JOY_BTN9'; Name = 'Trim Pitch Up' },
    @{ Command = 'dnilp2020u2020cdnilvdnilvp-1vu0'; Button = 'JOY_BTN10'; Name = 'Trim Roll Left Wing Down' },
    @{ Command = 'dnilp2020u2020cdnilvdnilvp1vu0'; Button = 'JOY_BTN11'; Name = 'Trim Roll Right Wing Down' },
    @{ Command = 'dnilp2019u2019cdnilvdnilvp-1vu0'; Button = 'JOY_BTN12'; Name = 'Trim Pitch Down' }
)
foreach ($Binding in $TrimBindings) {
    $Pattern = '(?ms)^\t\t\["' + [regex]::Escape($Binding.Command) +
        '"\]\s*=\s*\{(?<Block>.*?)(?=^\t\t\["|^\t\},)'
    $Match = [regex]::Match($Gunfighter, $Pattern)
    if (-not $Match.Success -or
        $Match.Groups['Block'].Value -notmatch ('\["added"\].*?"' + [regex]::Escape($Binding.Button) + '"') -or
        $Match.Groups['Block'].Value -notmatch ('\["name"\]\s*=\s*"' + [regex]::Escape($Binding.Name) + '"')) {
        throw "VKB trim binding $($Binding.Name) is not mapped to $($Binding.Button)."
    }
}

$Mfd3 = Get-Content (Join-Path $Joystick 'F16 MFD 3 {C5BE49A0-2342-11ee-8001-444553540000}.diff.lua') -Raw
if ($Mfd3 -match 'cd7v') { throw 'MFD3 contains direct RIO LANTIRN device bindings.' }
$Mfd3Bindings = @(
    @{ Command = 'd3934pnilu3934cd62vd1vpnilvu0'; Button = 'JOY_BTN1'; Name = 'Jester Context Action (short, hold, double click)' },
    @{ Command = 'd3935pnilu3935cd62vd1vpnilvu0'; Button = 'JOY_BTN2'; Name = 'Jester Context Action SHORT (button, direct bind)' },
    @{ Command = 'd3936pnilu3936cd62vd1vpnilvu0'; Button = 'JOY_BTN3'; Name = 'Jester Context Action HOLD (button, direct bind)' },
    @{ Command = 'd3937pnilu3937cd62vd1vpnilvu0'; Button = 'JOY_BTN4'; Name = 'Jester Context Action DOUBLE (button, direct bind)' }
)
foreach ($Binding in $Mfd3Bindings) {
    $Pattern = '(?ms)^\t\t\["' + [regex]::Escape($Binding.Command) +
        '"\]\s*=\s*\{(?<Block>.*?)(?=^\t\t\["|^\t\},)'
    $Match = [regex]::Match($Mfd3, $Pattern)
    if (-not $Match.Success -or
        $Match.Groups['Block'].Value -notmatch ('\["added"\].*?"' + [regex]::Escape($Binding.Button) + '"') -or
        $Match.Groups['Block'].Value -notmatch ('\["name"\]\s*=\s*"' + [regex]::Escape($Binding.Name) + '"')) {
        throw "MFD3 Jester context binding $($Binding.Command) is invalid."
    }
}
$Mfd3AddedKeys = [regex]::Matches($Mfd3, '\["added"\].*?\["key"\]\s*=\s*"(?<Key>JOY_BTN\d+)"') |
    ForEach-Object { $_.Groups['Key'].Value }
if ($Mfd3AddedKeys.Count -ne 4 -or @($Mfd3AddedKeys | Where-Object { $_ -notin 'JOY_BTN1', 'JOY_BTN2', 'JOY_BTN3', 'JOY_BTN4' }).Count -ne 0) {
    throw 'MFD3 buttons 5-28 must remain unbound.'
}

Write-Host 'Package validation passed.'
