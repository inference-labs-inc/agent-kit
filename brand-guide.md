# Inference Labs — AI-Interpretable Brand Guide

> **Purpose:** This document is structured for consumption by AI agents working on UI/UX, marketing, or design tasks. All values are exact and machine-usable. When a section links to a Notion page, that page is the authoritative source — fetch it to get the latest assets or updated rules.

---

## Identity

| Property | Value |
|----------|-------|
| **Company name** | Inference Labs |
| **Product name** | Inference Network |
| **Tagline** | Auditable Autonomy |
| **Aesthetic handle** | CLI-meets-cryptography; precise, verifiable, trustless |
| **Domain** | https://inferencelabs.com |
| **Docs** | https://docs.inferencelabs.com |
| **Brand kit (Notion)** | https://inferencelabs.notion.site/brandkit |

### Mission

Empower the future of multi-agent systems by enabling verifiable, trustworthy, privacy-centric inference across industries.

### Core concept

Inference Labs built **Proof of Inference** — a cryptographic verification layer that makes every model inference, agent decision, and workflow execution mathematically provable. Model weights and biases remain private (veiled). Trust is replaced by proof.

---

## Color System

**Authoritative source:** https://inferencelabs.notion.site/Color-2a126b0aa7b881c1b3afddfa08f233e2

### Primary palette

| Name | Hex | Usage |
|------|-----|-------|
| **Brand Dark** | `#0d110f` | Primary dark background, headings on light |
| **Brand Light** | `#efeeea` | Light background, off-white surfaces |
| **Brand Accent** | `#04f7a4` | CTAs, highlights, active states, brand moments |
| **Pure Black** | `#000000` | Borders, dividers, high-contrast UI |
| **Pure White** | `#ffffff` | Text on dark, containers, inverse surfaces |

### Neutral palette

| Name | Hex | Usage |
|------|-----|-------|
| **Gray Mid** | `#a3a3a3` | Secondary text, disabled states |
| **Gray Light** | `#cbcbc8` | Subtle borders, placeholder text |

### Transparency tokens

These are used for overlays, hover states, and depth layering:

| Token | Value | Usage |
|-------|-------|-------|
| Dark overlay strong | `#000000e6` | Modal backdrops |
| Dark overlay mid | `#0d110fb3` | Card overlays |
| Dark overlay light | `#0d110f66` | Subtle hover tints |
| White overlay mid | `#ffffff80` | Text on dark images |
| White overlay subtle | `#ffffff1a` | Ghost buttons, borders on dark |
| Input background | `#bbbbbb26` | Form field fills |
| Border subtle | `#00000026` | Dividers, card outlines |

### Color rules

- **Never use the brand accent (`#04f7a4`) as a background for large areas.** It is an accent only — use it for single interactive elements, underlines, or data highlights.
- The dark/light pair (`#0d110f` / `#efeeea`) is the primary mode toggle. Both are neutral enough to be used as page-level backgrounds.
- Avoid saturated colors outside this palette. The brand reads as deliberately restrained.
- When in doubt, go darker. The brand skews dark-mode-native.

---

## Typography

**Authoritative source:** https://inferencelabs.notion.site/Typography-2a126b0aa7b8817dae07fbbc76fea24e

### Typefaces

| Role | Family | Weights | Source |
|------|--------|---------|--------|
| **Display / Headings** | Host Grotesk | 300, 400, 700 | Google Fonts |
| **Body / UI** | Inter | 400, 600, 700, 900 | Google Fonts |
| **Code / Technical** | Fragment Mono | 400 | Google Fonts |

All three are loaded via `fonts.gstatic.com`. Use the Google Fonts CDN to embed:

```html
<!-- Host Grotesk -->
<link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300;400;700&display=swap" rel="stylesheet">

<!-- Inter -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">

<!-- Fragment Mono -->
<link href="https://fonts.googleapis.com/css2?family=Fragment+Mono&display=swap" rel="stylesheet">
```

### Type hierarchy

| Level | Font | Weight | Letter spacing | Notes |
|-------|------|--------|----------------|-------|
| Hero / Display | Host Grotesk | 700 | `-0.02em` | Large format, marketing |
| H1 | Host Grotesk | 700 | `-0.02em` | Page titles |
| H2 | Host Grotesk | 400 | `-0.01em` | Section headings |
| H3 | Inter | 700 | `0em` | Subsection headings |
| Body | Inter | 400 | `0em` | General prose |
| UI labels / small | Inter | 600 | `0em` | Caps optional for labels |
| Code / terminal | Fragment Mono | 400 | `0em` | All technical strings, addresses, proofs |

### Typography rules

- Use **Host Grotesk** for anything that needs to feel like a brand moment (heroes, feature names, pull quotes).
- Use **Inter** for everything functional: body copy, navigation, forms, tables.
- Use **Fragment Mono exclusively** for: code snippets, cryptographic hashes, proof strings, addresses, command-line examples, and numerical data that must feel precise.
- Letter spacing should be tight or neutral — never loose/expanded. The brand does not use tracked-out display type.

---

## Logo

**Authoritative source:** https://inferencelabs.notion.site/Logo-2a126b0aa7b88142a1cbfb64baa54631

Fetch the above page (JavaScript required) to download logo files in all formats and color variants. The following rules apply generally:

### Logo variants

The brand supports at minimum: **dark background variant** (light logo) and **light background variant** (dark logo). Use Brand Dark (`#0d110f`) or Brand Light (`#efeeea`) backgrounds for the primary logo presentations.

### Clear space

Maintain a minimum clear space around the logo equal to the height of the logo's lowercase "x" on all sides.

### Prohibited uses

- Do not recolor the logo with Brand Accent (`#04f7a4`) alone.
- Do not apply drop shadows, gradients, or emboss effects.
- Do not stretch, compress, or rotate.
- Do not place on busy photographic backgrounds without a clean backer.
- Do not alter the relationship between the wordmark and logomark (if separate elements exist).

---

## Layout & Spacing

### Spacing scale (px)

`10 → 12 → 20 → 24 → 32 → 40`

Use these values for padding, margin, and gap. Do not use arbitrary values.

### Responsive breakpoints

| Name | Range |
|------|-------|
| Mobile | `≤767px` |
| Tablet | `768px–991px` |
| Desktop | `992px–1439px` |
| Large desktop | `≥1440px` |

### Layout rules

- The site is built in Framer; the grid is fluid with fixed breakpoints.
- Navigation is fixed at the top; content scrolls beneath it.
- Components use `1px solid` borders in `#00000026` (light mode) for card and container delineation.
- Generous whitespace is a deliberate brand choice — do not compress layouts.
- Modal overlays use `#000000e6` as the backdrop.

---

## Brand Voice & Tone

**Authoritative source:** https://docs.inferencelabs.com

### Positioning

Inference Labs speaks as a cryptography-native, technically rigorous builder. The voice is confident, precise, and ideologically clear — without being academic or inaccessible.

### Tone characteristics

| Characteristic | In practice |
|----------------|-------------|
| **Verifiable** | Prefer concrete, provable statements. Avoid vague claims. |
| **Precise** | Use exact technical terms. Don't soften jargon for the sake of accessibility. |
| **Principled** | Decentralization and openness are non-negotiable positions, not marketing options. |
| **Minimal** | Say less. The brand does not over-explain. |
| **Non-corporate** | Avoid buzzword stacking. Never use "leverage", "synergy", "ecosystem play". |

### Approved phrasing patterns

- "Cryptographically verifiable" not "secure" (too vague)
- "Proof of Inference" (always capitalized, treat as a proper noun)
- "Auditable Autonomy" (always capitalized)
- "Inference Network" (the product; capitalized)
- "Autonometrics" (coined term; always capitalized)
- "Sovereign Agents" / "Smart Agents" (capitalized)
- "veiled model weights" (lowercase; describes the privacy technique)
- ">>> inference labs" (CLI-style, lowercase with `>>>` prefix, for technical/developer contexts)

### What to avoid

- Avoid anthropomorphizing AI excessively ("the AI thinks", "the model wants").
- Avoid phrases that imply trust without proof ("you can trust that...", "simply rely on...").
- Avoid passive constructions that obscure accountability.
- Avoid positioning that conflicts with decentralization values (e.g., implying centralized control is a feature).

---

## Imagery

**Authoritative source:** https://inferencelabs.notion.site/Imagery-2a126b0aa7b8815eafabd582f6f203fd

Fetch the above Notion page for current approved imagery and photography guidelines. The following principles apply based on the overall brand aesthetic:

### Style direction

- **Dark, high-contrast** visual compositions preferred — the brand reads as dark-mode native.
- **Abstract / technical**: Network graphs, cryptographic structures, circuit-like geometry, node clusters.
- **No stock-photo humanism**: Avoid lifestyle imagery, smiling professionals, or generic "innovation" clichés (handshakes, lightbulbs, etc.).
- **Monochromatic or two-tone**: Compositions that use the primary dark and one accent (the neon green `#04f7a4`) are on-brand.
- **CLI aesthetics**: Terminal-style displays, proof strings, hash outputs are imagery assets, not just code.

### AI-generated imagery (if applicable)

When generating imagery for Inference Labs contexts: prompt for dark backgrounds, node-graph topologies, cryptographic lattices, and luminous green (`#04f7a4`) accent lines. Avoid warm tones, organic shapes, and anything that reads as "soft AI" or "friendly robot".

---

## Technical Terminology Glossary

AI agents working on copy, documentation, or UI strings should use these terms consistently:

| Term | Definition | Casing |
|------|-----------|--------|
| **Proof of Inference** | Cryptographic proof that a model inference was executed correctly and authentically | Title Case |
| **Auditable Autonomy** | The brand's core thesis: autonomous systems must be mathematically auditable | Title Case |
| **Autonometrics** | Biometric-grade inference verification for autonomous agents; coined by Inference Labs | Title Case |
| **Inference Network** | The main product — a verified, decentralized inference network | Title Case |
| **Sovereign Agents** | Autonomous AI entities operated collectively, universally accessible | Title Case |
| **Smart Agents** | Autonomous AI systems with context retention and memory | Title Case |
| **zkML** | Zero-knowledge machine learning; the cryptographic technique underlying Proof of Inference | Lowercase acronym |
| **veiled model weights** | Privacy technique that keeps model parameters hidden while still producing verifiable outputs | Lowercase |
| **Bittensor** | The network Inference Labs' Subnet 2 is built on | Title Case |
| **Subnet 2** | Inference Labs' marketplace for inference and compute verification on Bittensor | Title Case |

---

## Asset & Resource Index

| Resource | URL |
|----------|-----|
| Main website | https://inferencelabs.com |
| Docs | https://docs.inferencelabs.com |
| Glossary | https://docs.inferencelabs.com/resources/glossary |
| Blog | https://blog.inferencelabs.com |
| GitHub | https://github.com/inference-labs-inc |
| Whitepaper | https://public.inferencelabs.com/inference-network-whitepaper.pdf |
| Media room | https://inferencelabs.com/media-room |
| Subnet 2 | https://subnet2.inferencelabs.com |
| **Brand kit (Notion)** | https://inferencelabs.notion.site/brandkit |
| Logo guidelines (Notion) | https://inferencelabs.notion.site/Logo-2a126b0aa7b88142a1cbfb64baa54631 |
| Typography guidelines (Notion) | https://inferencelabs.notion.site/Typography-2a126b0aa7b8817dae07fbbc76fea24e |
| Color guidelines (Notion) | https://inferencelabs.notion.site/Color-2a126b0aa7b881c1b3afddfa08f233e2 |
| Imagery guidelines (Notion) | https://inferencelabs.notion.site/Imagery-2a126b0aa7b8815eafabd582f6f203fd |

> **Note for AI agents:** The Notion brand kit pages require JavaScript to render and cannot be fetched programmatically via standard HTTP. Use the values in this document as the machine-readable source of truth. The Notion links are authoritative for visual assets (logo files, approved imagery) which must be reviewed by a human or accessed via a browser session.

---

## Quick Reference Card

```
COLORS
  dark bg:    #0d110f    light bg:   #efeeea
  accent:     #04f7a4    black:      #000000
  white:      #ffffff    gray-mid:   #a3a3a3

FONTS
  display:    Host Grotesk (700, 400, 300)
  body/ui:    Inter (400, 600, 700, 900)
  code:       Fragment Mono (400)

SPACING (px)
  10  12  20  24  32  40

BREAKPOINTS (px)
  mobile ≤767  tablet 768–991  desktop 992–1439  xl ≥1440

BRAND VOICE
  verifiable · precise · principled · minimal · non-corporate

KEY TERMS (always cap)
  Proof of Inference · Auditable Autonomy · Autonometrics
  Inference Network · Sovereign Agents · Smart Agents
```
