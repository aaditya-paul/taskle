# Taskle Design System & Theme Context

## Overview

Taskle follows a **"Handcrafted Productivity"** design philosophy that combines modern digital interfaces with warm, human-centered design elements. The theme evokes the feeling of a carefully crafted notebook or journal - personal, inviting, and thoughtfully designed.

## Core Design Philosophy

- **Warm Minimalism**: Clean, uncluttered interfaces with warm, inviting colors
- **Handcrafted Aesthetic**: Typography and elements that feel personal and human-made
- **Focused Productivity**: Design that reduces cognitive load and enhances focus
- **Subtle Sophistication**: Professional appearance with playful, creative touches

## Color Palette

### Primary Colors

- **Background**: `#1B1615` - Deep, warm charcoal (not pure black)
- **Secondary**: `#232329` - Slightly lighter warm gray for cards/containers
- **Foreground**: `#ffffff` - Pure white for text

### Accent Colors

- **Primary Accent**: `#fde047` (Yellow 300) - Warm, energetic yellow for highlights
- **Secondary Accent**: `#facc15` (Yellow 400) - Slightly deeper yellow for hover states
- **Tertiary Accent**: `#eab308` (Yellow 500) - Rich yellow for active states

### Supporting Colors

- **Gray 700**: `#374151` - Borders and subtle elements
- **Gray 800**: `#1f2937` - Secondary backgrounds

## Typography System

### Font Hierarchy

1. **Display/Headings**: `font-virgil` - Handwritten, creative feel for titles and branding
2. **Body/UI**: `font-patrick-hand` - Casual, readable handwriting for interface elements
3. **Fallback**: `font-sans` (Geist Sans) - Clean, modern sans-serif for technical text

### Typography Characteristics

- **Virgil Font**: Used for main headings, logo, and important titles. Evokes creativity and personal touch
- **Patrick Hand**: Used for navigation, buttons, and body text. Maintains readability while feeling handcrafted
- **Font Weights**: Regular (400), Medium (500), Bold (700)

## Visual Elements

### Spacing & Layout

- **Generous Padding**: 24px+ margins for breathing room
- **Rounded Corners**: 12px-24px border radius for soft, approachable feel
- **Max Width**: 6xl (1152px) for optimal reading and visual balance

### Interactive Elements

- **Buttons**: Gradient backgrounds with yellow accent, rounded corners, hover animations
- **Links**: Underline animations on hover with yellow accent
- **Cards**: Semi-transparent backgrounds with subtle borders and backdrop blur

### Effects & Animation

- **Backdrop Blur**: `backdrop-blur-md` for modern glass-morphism effect
- **Drop Shadows**: Subtle shadows with yellow glow on hover for important elements
- **Transitions**: 200-300ms duration with `ease-out` timing for smooth interactions
- **Hover States**: Scale transforms (0.95-1.1), color transitions, shadow changes

## Component Patterns

### Navigation

- **Fixed Position**: Floating navbar with glass-morphism effect
- **Responsive Design**: Mobile hamburger menu with slide-down animation
- **Active States**: Underline animations and color changes

### Cards & Containers

- **Background**: Semi-transparent secondary color with border
- **Hover Effects**: Subtle background lightening and border color changes
- **Content**: Generous padding with clear hierarchy

### Buttons

- **Primary**: Yellow gradient with black text, rounded corners
- **Secondary**: Outlined with gray border, white text
- **Interactive**: Scale animations, shadow effects on hover

## Accessibility Considerations

- **Contrast Ratios**: High contrast between text and background
- **Focus States**: Clear focus indicators with yellow accent
- **Readable Typography**: Handwritten fonts maintain legibility
- **Responsive Design**: Mobile-first approach with touch-friendly targets

## Brand Personality

- **Warm & Approachable**: Not corporate or cold
- **Creative & Inspiring**: Encourages productivity through beauty
- **Personal & Human**: Feels like a custom-made tool
- **Professional Yet Playful**: Serious about productivity, fun in execution

## Usage Guidelines for LLMs

When working with this theme:

1. **Always use the handwritten fonts** (`font-virgil` for headings, `font-patrick-hand` for body)
2. **Yellow (#fde047) is the primary accent** - use for CTAs, highlights, and active states
3. **Dark background (#1B1615) with white text** - maintain this high contrast
4. **Semi-transparent overlays** with `backdrop-blur-md` for modern layering
5. **Generous spacing and rounded corners** (12px-24px) for softness
6. **Smooth animations** (200-300ms) with scale and color transitions
7. **Glass-morphism effects** with borders and transparency
8. **Mobile-first responsive design** with breakpoints at `md:` and `lg:`

## Technical Implementation

- **Framework**: Next.js with Tailwind CSS v4
- **Color System**: CSS custom properties in `@theme inline`
- **Font Loading**: Next.js `localFont` for custom typefaces
- **Component Structure**: Reusable, accessible components with consistent styling
- **Responsive**: Mobile-first design with lg: breakpoint for desktop features

This theme creates a unique position in the productivity app space by feeling more like a beautifully designed physical notebook brought to digital life, rather than a sterile corporate tool.
