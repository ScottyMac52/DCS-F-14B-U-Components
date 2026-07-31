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

Write-Host 'Package validation passed.'
