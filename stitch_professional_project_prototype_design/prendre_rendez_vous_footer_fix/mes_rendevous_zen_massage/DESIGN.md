---
name: Serene Wellness
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeec'
  surface-container-high: '#e9e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#434843'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#737872'
  outline-variant: '#c3c8c1'
  surface-tint: '#4f6353'
  primary: '#425646'
  on-primary: '#ffffff'
  primary-container: '#5a6e5d'
  on-primary-container: '#d9f0da'
  inverse-primary: '#b6ccb8'
  secondary: '#6b5c4c'
  on-secondary: '#ffffff'
  secondary-container: '#f4dfcb'
  on-secondary-container: '#716252'
  tertiary: '#4e5154'
  on-tertiary: '#ffffff'
  tertiary-container: '#66696c'
  on-tertiary-container: '#e8e9ed'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e8d3'
  primary-fixed-dim: '#b6ccb8'
  on-primary-fixed: '#0d1f12'
  on-primary-fixed-variant: '#384b3c'
  secondary-fixed: '#f4dfcb'
  secondary-fixed-dim: '#d7c3b0'
  on-secondary-fixed: '#241a0e'
  on-secondary-fixed-variant: '#524436'
  tertiary-fixed: '#e1e2e6'
  tertiary-fixed-dim: '#c5c6ca'
  on-tertiary-fixed: '#191c1f'
  on-tertiary-fixed-variant: '#44474a'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
  sage-deep: '#4A594D'
  sand-light: '#F2EBE3'
  charcoal-muted: '#2C2E30'
  status-pending: '#E6D5A7'
  status-confirmed: '#7A9E7E'
  status-completed: '#A0A0A0'
  status-cancelled: '#D18D8D'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

The design system is rooted in the philosophy of "Sanctuary through Design." It targets a high-end wellness clientele seeking an escape from the digital noise. The personality is professional, serene, and profoundly tranquil, bridging the gap between clinical excellence and holistic luxury.

The visual direction follows a **Minimalist** and **Corporate/Modern** hybrid style. It leverages heavy whitespace and a refined editorial layout to evoke a sense of air and calm. By removing unnecessary visual friction, the design system ensures that the user's journey—from discovering Gabon's natural beauty to booking a session—is as therapeutic as the massage itself. Every interaction is designed to feel deliberate, soft, and sophisticated.

## Colors

The palette is derived from natural, earthy elements:
- **Primary (Sage Green):** Represents growth, healing, and the lush flora of Gabon. Use this for primary CTAs and brand moments.
- **Secondary (Soft Sand):** Evokes warmth and physical touch. Used for subtle backgrounds and secondary UI elements.
- **Tertiary (Warm Charcoal):** Replaces harsh blacks for text and deep accents to maintain a softer, high-end feel.
- **Neutral (Off-White):** A "bone" or "linen" white that serves as the canvas, preventing the clinical sterile feel of pure #FFFFFF.

Semantic status colors are desaturated to ensure they do not break the tranquil mood while remaining functional for administrative tasks.

## Typography

This design system uses a classic Serif/Sans pairing to balance luxury with modern utility.

- **Headlines (Libre Caslon Text):** This elegant serif conveys the "Zen" brand's authoritative yet graceful nature. It should be used for hero sections, titles, and high-impact messaging.
- **Body & Labels (Hanken Grotesk):** A clean, highly readable sans-serif that ensures clarity for service descriptions and administrative data. 

Letter spacing is slightly increased on labels to enhance the premium, "boutique" feel, while headlines use tighter tracking for a more polished, editorial look.

## Layout & Spacing

The layout philosophy is built on **Generous Whitespace**. We use a 12-column fluid grid for desktop and a single column for mobile. 

- **Breathing Room:** Section gaps are intentionally large (80px+) to ensure the content never feels crowded.
- **Grid Alignment:** Product cards and calendar views should align to the 12-column grid to maintain professional rigor.
- **Reflow Rules:** On tablet, the 4-column product grid transitions to 2 columns. On mobile, elements stack vertically with centered text for display headers.
- **Temporal Spacing:** The 15-minute cleaning buffer in the booking system is represented visually by subtle vertical padding in the administrative calendar.

## Elevation & Depth

To maintain a serene atmosphere, the design system avoids heavy shadows. Instead, it uses **Tonal Layers** and **Ambient Shadows**.

- **Surfaces:** The base background is the neutral `off-white`. Elevated surfaces (like cards or modals) use `white` or `sand-light` with a very soft, high-diffusion shadow (Blur: 20px, Opacity: 5%, Tinted with Tertiary Charcoal).
- **Glassmorphism:** The main navigation bar utilizes a subtle backdrop blur (12px) and 90% opacity of the neutral color to maintain context while scrolling through photography.
- **Interactions:** Hover states on interactive elements should shift the background color slightly rather than increasing shadow depth, keeping the UI feeling "light" and ethereal.

## Shapes

The shape language is defined by **Softness**. We avoid sharp, aggressive corners to ensure the UI feels approachable and safe. 

- **Standard Radius:** 0.5rem (8px) is applied to all buttons, input fields, and small cards.
- **Large Radius:** 1.5rem (24px) is used for main product images and container cards to create a "pillowy" aesthetic.
- **Interactive States:** Buttons may transition toward a slightly more rounded state upon interaction to mimic physical softness.

## Components

- **Navigation & 'Book a Session':** The primary CTA should be a "Ghost Button" with a Sage Green border and text, transitioning to a solid fill on hover. The navigation is persistent but minimal.
- **Product Cards:** Cards feature a large image with the `rounded-xl` radius. The title is in Hanken Grotesk Medium, and the price is in Libre Caslon Text to add a touch of luxury.
- **Interactive Calendar:** Time slots are displayed in a clean grid. 'Available' slots use a subtle Sand-Light background; 'Selected' slots use solid Sage Green with White text. 'Unavailable' slots are desaturated with 40% opacity.
- **Review & Rating:** We use custom-drawn stars in a muted gold (derived from Sand). Text reviews follow a "Review/Reply" threaded layout with subtle vertical dividers.
- **Input Fields:** Bottom-border only or very light outlines to avoid a "boxy" feel. Placeholders are in Charcoal-Muted at 50% opacity.
- **Chips/Badges:** Use pill shapes (`rounded-full`) with low-saturation backgrounds for status indicators like "Achat Vérifié" or "Confirmed."