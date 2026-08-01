[CmdletBinding()]
param(
    [string]$Version
)

$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent $PSScriptRoot
$Version = node (Join-Path $PSScriptRoot 'version.mjs') resolve $Version
if ($LASTEXITCODE -ne 0) { throw 'Failed to resolve the OVGME package version.' }
$PackageName = "Scott-F-14BU-Control-Profiles-$Version"
$BuildRoot = Join-Path $RepoRoot '.build/ovgme'
$StageRoot = Join-Path $BuildRoot 'stage'
$Container = Join-Path $StageRoot $PackageName
$Dist = Join-Path $RepoRoot 'dist'
$Archive = Join-Path $Dist "$PackageName.zip"

Remove-Item $BuildRoot -Recurse -Force -ErrorAction SilentlyContinue
New-Item (Join-Path $Container 'Config/Input/F-14BU') -ItemType Directory -Force | Out-Null
New-Item (Join-Path $Container 'KNEEBOARD/F-14BU') -ItemType Directory -Force | Out-Null
New-Item $Dist -ItemType Directory -Force | Out-Null

Copy-Item (Join-Path $RepoRoot 'src/Config/Input/F-14BU/joystick') (Join-Path $Container 'Config/Input/F-14BU/joystick') -Recurse
Copy-Item (Join-Path $RepoRoot 'kneeboard/F-14BU/*') (Join-Path $Container 'KNEEBOARD/F-14BU')
$ReadmeTemplate = Get-Content (Join-Path $RepoRoot 'packaging/ovgme/README.TXT') -Raw
if (-not $ReadmeTemplate.Contains('{{VERSION}}')) {
    throw 'OVGME README.TXT does not contain the {{VERSION}} token.'
}
$ReadmeTemplate.Replace('{{VERSION}}', $Version) |
    Set-Content (Join-Path $StageRoot 'README.TXT') -Encoding utf8
$Version | Set-Content (Join-Path $StageRoot 'VERSION.TXT') -Encoding utf8

Remove-Item $Archive -Force -ErrorAction SilentlyContinue
Compress-Archive -Path $Container, (Join-Path $StageRoot 'README.TXT'), (Join-Path $StageRoot 'VERSION.TXT') -DestinationPath $Archive -CompressionLevel Optimal

Write-Host "Created $Archive"
