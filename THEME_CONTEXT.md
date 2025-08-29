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

## Dashboard Page Design Context

### Overview

The Dashboard page is designed to provide users with a quick overview of their productivity metrics, tasks, and recent activities. It follows the "Handcrafted Productivity" philosophy by combining functional design with a warm, inviting aesthetic.

### Key Design Elements

#### Header

- **Typography**: Uses `font-virgil` for the main greeting and `font-patrick-hand` for the subtext to maintain a personal, handwritten feel.
- **Colors**:
  - Greeting text: `#fde047` (Yellow 300) for a warm, energetic highlight.
  - Subtext: `#ffffff` (Foreground/80) for subtle contrast.
- **Button**:
  - Gradient background: `from-yellow-300 to-yellow-400`.
  - Hover state: `from-yellow-400 to-yellow-500` with shadow effects.
  - Interaction: Scale transforms and hover lift effects for a tactile feel.

#### Stats Cards

- **Layout**: Responsive grid layout with 1-3 columns based on screen size.
- **Colors**:
  - Background: Semi-transparent secondary color with `backdrop-blur-sm`.
  - Borders: Subtle `#374151` (Gray 700/30) with hover transitions to `#fde047` (Yellow 300/30).
- **Icons**: Color-coded icons for quick visual recognition:
  - Green for completed tasks.
  - Yellow for in-progress tasks.
  - Blue for productivity metrics.
- **Hover Effects**: Subtle scaling (`hover:scale-[1.02]`) and active state feedback.

#### Recent Tasks & Activity

- **Typography**:
  - Task titles: `font-patrick-hand` for a casual, approachable feel.
  - Time indicators: Smaller, subdued text for secondary information.
- **Colors**:
  - Completed tasks: `#10B981` (Green 400) with line-through for differentiation.
  - Pending tasks: `#ffffff` (Foreground/90) for emphasis.
  - Activity dots: Pulsing `#fde047` (Yellow 300) for recent updates.
- **Interaction**: Hover highlights and scale transforms for clickable items.

### Accessibility Enhancements

- **Contrast Ratios**: Ensures all text and interactive elements meet WCAG AA standards.
- **Focus States**: Clear focus indicators for keyboard navigation.
- **Responsive Design**: Optimized for mobile-first with breakpoints for larger screens.

### Animations

- **Transitions**: Smooth 200-300ms transitions for hover and active states.
- **Hover Effects**: Lift and shadow enhancements for interactive elements.
- **Pulse Animations**: Used for activity indicators to draw attention subtly.

### Technical Implementation

- **Framework**: Next.js with Tailwind CSS.
- **Responsive Grid**: Utilizes Tailwind's `grid-cols-1`, `sm:grid-cols-2`, and `lg:grid-cols-3` for adaptive layouts.
- **State Management**: Prefetching and navigation handled via Next.js `useRouter` for seamless transitions.

This design ensures the Dashboard page is both functional and visually aligned with the Taskle theme, creating a delightful user experience.

This theme creates a unique position in the productivity app space by feeling more like a beautifully designed physical notebook brought to digital life, rather than a sterile corporate tool.
