---
version: alpha
name: Inference Labs
description: Design system for Inference Labs and Inference Network. Dark, cryptography-native, precise, minimal.
colors:
  primary: "#0d110f"
  secondary: "#efeeea"
  tertiary: "#04f7a4"
  neutral: "#a3a3a3"
  neutral-light: "#cbcbc8"
  black: "#000000"
  white: "#ffffff"
typography:
  hero:
    fontFamily: Host Grotesk
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.02em
  h1:
    fontFamily: Host Grotesk
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  h2:
    fontFamily: Host Grotesk
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0em
  code-sm:
    fontFamily: Fragment Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
rounded:
  none: 0px
  sm: 6px
  md: 10px
  lg: 16px
  full: 999px
spacing:
  xs: 10px
  sm: 12px
  md: 20px
  lg: 24px
  xl: 32px
  2xl: 40px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.black}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  button-ghost:
    backgroundColor: "{colors.neutral-light}"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  card:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  code-block:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  panel-inverse:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  badge-muted:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
---

# Inference Labs DESIGN.md

## Overview

Inference Labs should feel cryptography-native, exact, and engineered rather than decorative. The visual language is dark-first, restrained, and technical: terminal cues, proof strings, stark contrast, and sparse accent moments are all on-brand.

The product voice is minimal and rigorous. Interfaces should communicate that systems are verifiable, not merely polished. Favor confident layouts, clear information hierarchy, and intentional whitespace over visual noise or consumer-app friendliness.

## Colors

The palette is anchored by a near-black dark, an off-white light surface, and a single neon green accent used sparingly.

- **Primary (`#0d110f`)** is the base dark for page backgrounds, dark panels, and headings on light surfaces.
- **Secondary (`#efeeea`)** is the light surface color for pages, cards, and readable contrast blocks.
- **Tertiary (`#04f7a4`)** is the brand accent for CTAs, active states, proof highlights, and focused data moments.
- **Neutral (`#a3a3a3`)** and **Neutral Light (`#cbcbc8`)** support captions, disabled states, placeholders, and subtle dividers.
- **Black (`#000000`)** and **White (`#ffffff`)** are reserved for hard contrast and inverse text treatments.
- Transparency treatments should use the brand guide values directly in implementation: `#000000e6` for modal backdrops, `#0d110fb3` for dark overlays, `#0d110f66` for subtle dark hovers, `#ffffff1a` for ghost borders and fills on dark surfaces, `#bbbbbb26` for input fills, and `#00000026` for light-mode borders.

Do not flood large surfaces with the accent green. It is a precision instrument, not a background color.

## Typography

Typography should clearly separate brand expression from functional interface content.

- **Host Grotesk** carries brand moments: hero text, page titles, and key headings.
- **Inter** handles all functional UI and editorial reading: body copy, navigation, forms, tables, labels, and subsection headings.
- **Fragment Mono** is mandatory for technical strings such as hashes, proofs, wallet addresses, code, and CLI output.

Tracking stays tight to neutral. Headlines should feel compact and deliberate; body text should remain highly legible and unembellished. Avoid decorative type treatments, soft editorial flourishes, or wide letter spacing.

## Layout

Layout should feel structured, spacious, and deliberate. Use a fluid layout with clear breakpoint transitions and generous whitespace rather than dense dashboard packing.

- Spacing must come from the fixed scale: `10`, `12`, `20`, `24`, `32`, `40`.
- Mobile targets widths up to `767px`.
- Tablet spans `768px` to `991px`.
- Desktop spans `992px` to `1439px`.
- Large desktop begins at `1440px`.

Navigation may remain fixed while content scrolls beneath it. Cards and sections should use breathing room, not compression, to signal confidence and clarity.

## Elevation & Depth

Depth is subtle and should come primarily from contrast, overlays, and containment rather than shadow-heavy skeuomorphism.

- Use `#000000e6` for modal backdrops.
- Use `#0d110fb3` for layered dark panels and media overlays.
- Use `#0d110f66` or `#ffffff1a` for hover and ghost treatments.
- Use `#00000026` for card outlines and section separation before introducing shadows.

If shadow is used at all, keep it quiet. The brand should read as flat, exact, and computational.

## Shapes

Shapes should remain mostly rectilinear with modest rounding. Corners can be softened enough to feel intentional, but never playful or bubbly.

- Use `rounded.none` for strict dividers, data tables, and terminal-like frames.
- Use `rounded.sm` or `rounded.md` for inputs, buttons, and compact containers.
- Use `rounded.lg` for larger cards and panels.
- Use `rounded.full` only for pills, status chips, or badges when functionally justified.

Avoid ornamental geometry, exaggerated blobs, or soft consumer-product curves.

## Components

Components should feel systematic and high-signal.

- **Primary buttons** use the accent green on dark or light surfaces and should be reserved for the main action in a given view.
- **Ghost buttons** should read as low-emphasis controls. In implementation, prefer translucent white treatments on dark surfaces even though the token model here stays fully opaque.
- **Cards** should typically use light surfaces with dark text, subtle borders, and ample internal padding.
- **Code blocks** and proof displays should default to dark backgrounds with mono text and green emphasis for values that matter.

Tables, logs, proof artifacts, and terminal-like readouts are first-class interface patterns for this brand. They should look deliberate, not like incidental developer leftovers.

## Do's and Don'ts

- Do use dark, high-contrast compositions with restrained accent usage.
- Do use mono typography for addresses, proofs, hashes, commands, and machine output.
- Do preserve whitespace and clear containment around technical information.
- Do write UI copy in a precise, verifiable, non-corporate tone.
- Don't use warm gradients, soft pastel palettes, or generic SaaS blues and purples.
- Don't use stock-photo lifestyle aesthetics, smiley humanist visuals, or "friendly robot" motifs.
- Don't imply trust where proof is the real product claim.
- Don't over-animate, over-round, or over-decorate the interface.
