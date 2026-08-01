# Kneeboard image sources and redistribution

The generated kneeboard PNGs are built entirely from files committed under
`kneeboard/assets/source`; the build does not download anything. This document records the
provenance and transformations for each hardware image.

## VKB F-14 grip

- File: `kneeboard/assets/source/vkb-f14-grip.svg`
- Source: original project vector illustration, drawn for this repository from the control
  layout and factual product features shown on the [official VKB product page](https://www.vkbcontrollers.com/products/gnx-f-14-add-on-grip).
- Transformation: rendered locally by `scripts/build-kneeboard.mjs` and composited with the
  project callouts.
- Rights: no VKB photograph or third-party artwork is included. The illustration is part of
  this project.

## Thrustmaster Warthog throttle

- Files: `warthog-throttle-base.png` and `warthog-throttle-handles.png`.
- Source: [Joystick Diagrams](https://github.com/Rexeh/joystick-diagrams), commit
  `1e9f5d0b6aeaeabc7da6fcec4122554df9da69a7`, template
  `templates/Thrustmaster/Thrustmaster Warthog - Throttle.svg`.
- License: GNU GPL v2; a copy is stored at
  `kneeboard/assets/source/licenses/joystick-diagrams-GPL-2.0.txt`.
- Transformation: the front and rear views were cropped from the upstream SVG, rendered,
  flattened, converted to optimized high-contrast monochrome line art, and committed as the
  preferred local derivatives. The build composites those files with project callouts.

## WINCTRL CarrierAce PTO2

- Files: `pto2-template.svg` and `pto2-clean.png`.
- Source: [Joystick Diagrams](https://github.com/Rexeh/joystick-diagrams), commit
  `1e9f5d0b6aeaeabc7da6fcec4122554df9da69a7`, template
  `templates/WinWing/PTO 2 Panel of Take Off/PTO 2 Panel of Take Off.svg`.
- License: GNU GPL v2; a copy is stored at
  `kneeboard/assets/source/licenses/joystick-diagrams-GPL-2.0.txt`.
- Transformation: template annotations and page background were removed with an OpenAI image
  edit; the magenta key was removed locally to produce transparency. The control geometry was
  preserved and the result was composited with project callouts. The cleaned derivative remains
  available under the same GPL terms.

## Thrustmaster Cougar MFDs

- Files: `cougar-mfd-template.png` and `cougar-mfd-clean.png`.
- Source: [Bindulator](https://github.com/norekdcs2020/Bindulator), commit
  `c7f0cf82432fc3f0752cffe8b9478ea726601891`, template
  `Templates/Bindulator_template_Cougar_MFD_Left_v2.pdf`.
- License: the Bindulator Templates directory is offered under GNU GPL v2 or later; a copy is
  stored at `kneeboard/assets/source/licenses/bindulator-templates-GPL-2.0-or-later.txt`.
- Transformation: the source PDF page was rendered to PNG, its red template annotations and
  page background were removed with an OpenAI image edit, and the magenta key was removed
  locally. The same cleaned image is used for MFD1, MFD2, and MFD3. The cleaned derivative
  remains available under the same GPL terms.

## Custom F-14 PDCP

- File: `kneeboard/assets/source/scott-custom-f14-pdcp.jpeg`.
- Source: photograph supplied by Scott in issue #17 for use in this repository and its release
  packages.
- Transformation: resized and JPEG-compressed locally during the deterministic build, then
  composited with project callouts.

Product and company names identify compatible hardware. Their owners do not endorse this
project. The preferred form for modifications is the source asset together with
`scripts/build-kneeboard.mjs`; release tags preserve the exact source corresponding to each
distributed set of PNG derivatives.
