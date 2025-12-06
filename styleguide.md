<<<<<<< HEAD
---
  🥷 Market Ninjas Style Guide

  Brand Identity

  Project: AI-powered platform for transforming YouTube videos into
   viral short-form contentTarget: Cursor Chiangmai Hackathon
  project

  ---
  Color Palette

  Primary Colors

  - Primary Blue: #6366f1 (Indigo)
  - Primary Dark: #4f46e5 (Deeper indigo for hover states)
  - Secondary Purple: #8b5cf6 (Accent color)

  Accent Colors

  - Success Green: #10b981 (Confirmations, high confidence)
  - Danger Red: #ef4444 (Errors, warnings)

  Neutral Grays

  - Gray 50: #f9fafb (Lightest background)
  - Gray 100: #f3f4f6 (Subtle backgrounds)
  - Gray 200: #e5e7eb (Borders, dividers)
  - Gray 300: #d1d5db (Inactive elements)
  - Gray 600: #4b5563 (Secondary text)
  - Gray 700: #374151 (Body text)
  - Gray 900: #111827 (Headings, primary text)

  Special Backgrounds

  - Blue Tones: #1e3a8a, #1e40af (Headers, badges)
  - Gradient Background: linear-gradient(135deg, #e0f2fe 0%, 
  #bae6fd 50%, #7dd3fc 100%) - Sky blue gradient
  - Primary Button: linear-gradient(135deg, var(--primary), 
  var(--secondary)) - Indigo to purple

  ---
  Typography

  Font Family

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, 'Helvetica Neue', Arial, sans-serif;

  Font Sizes

  - Hero Title: 3rem (48px)
  - Section Headers: 1.5rem (24px)
  - Large Text: 1.2rem (19.2px)
  - Body: 1rem (16px)
  - Small/Meta: 0.85-0.9rem (13.6-14.4px)

  Font Weights

  - Regular: 400 (system default)
  - Semibold: 600 (Titles, buttons, labels)
  - Bold: 700 (Section labels)

  ---
  Emoji System 🎨

  Philosophy: Emojis are used extensively throughout the UI to
  create a friendly, approachable, and modern interface. They serve
   as visual anchors and improve scannability.

  Core Brand Emoji

  - 🥷 Market Ninjas - Main brand identity

  Navigation & Actions

  - 🔍 Search
  - ➕ Create/Add
  - 🔄 Refresh/Reset
  - 📥 Download
  - ❌ Error/Close

  Content Categories

  - 📹 Video/Video Selection
  - 🎬 Scripts/Generated Content
  - ✨ Insights/Magic/Results
  - 🎥 Video Generation

  Video Styles (10 distinct styles)

  - 🎙 Podcast
  - 🎤 Street Interview
  - 📹 Talking Head
  - 😮 Reaction
  - 🎓 Tutorial
  - 📖 Storytime
  - ⚔ Debate
  - 👁 POV
  - 🎁 Reveal
  - 📢 Callout

  Metadata Icons

  - 👤 Author/Creator
  - 👁 Views
  - ⏱ Duration/Time
  - 🚀 Hackathon/Launch

  Status & Feedback

  - ✅ Success/Complete
  - 🔑 API Key/Configuration
  - ⚡ Fast/Processing

  ---
  UI Components

  Cards

  background: white
  border-radius: 20px
  padding: 32px
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08)
  border: 1px solid rgba(255, 255, 255, 0.8)
  backdrop-filter: blur(10px)

  Buttons - Primary

  background: linear-gradient(135deg, #6366f1, #8b5cf6)
  color: white
  padding: 14px 28px
  border-radius: 8px
  font-weight: 600
  Hover: Lift effect with translateY(-2px) and enhanced shadow

  Buttons - Secondary

  background: #f3f4f6
  color: #374151
  border-radius: 8px

  Search Input

  background: rgba(255, 255, 255, 0.95)
  backdrop-filter: blur(10px)
  border: 3px solid rgba(30, 58, 138, 0.3)
  border-radius: 16px
  padding: 18px 20px 18px 60px
  Focus: Border changes to #1e3a8a, lifts with shadow

  Video Cards

  border-radius: 16px
  overflow: hidden
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
  Hover: translateY(-4px) with enhanced shadow and primary border
  Selected: border-color: #6366f1 with glow

  Insight Cards

  background: #f9fafb
  border-left: 4px solid #6366f1
  padding: 24px
  border-radius: 12px

  Script Cards

  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05),
  rgba(139, 92, 246, 0.05))
  border: 2px solid #6366f1
  border-radius: 16px
  padding: 24px

  ---
  Layout & Spacing

  Container

  - Max Width: 1200px
  - Margin: Centered with 0 auto
  - Body Padding: 20px

  Grid Systems

  Video List: grid-template-columns: repeat(auto-fill, 
  minmax(320px, 1fr))
  Gallery: grid-template-columns: repeat(auto-fill, minmax(280px, 
  1fr))
  Gap: 24px

  Standard Spacing

  - Section Margins: 24-48px
  - Element Margins: 12-20px
  - Padding: 16-32px (depending on component size)

  ---
  Visual Effects

  Shadows

  - Light: 0 2px 8px rgba(0, 0, 0, 0.08)
  - Medium: 0 4px 20px rgba(0, 0, 0, 0.08)
  - Hover/Elevated: 0 12px 24px rgba(0, 0, 0, 0.12)
  - Primary Glow: 0 8px 20px rgba(99, 102, 241, 0.25)

  Transitions

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
  Fast: 0.2s for buttons
  Standard: 0.3s for cards and hovers

  Hover Effects

  - Lift: transform: translateY(-2px) to translateY(-4px)
  - Shadow Enhancement: Increase blur and opacity
  - Border Highlight: Change to primary color

  Backdrop Effects

  backdrop-filter: blur(10px)
  background: rgba(255, 255, 255, 0.95)

  ---
  Content Tone & Voice

  Console Logging

  console.log('🥷 Market Ninjas Server')
  console.log('🌐 Web Interface: ...')
  console.log('🔑 API Key: ...')
  console.log('✅ Configured / ❌ Missing')
  console.log('🔍 Processing: ...')
  console.log('🎬 Generating ... style script')

  UI Messaging

  - Badge: "🚀 Cursor Chiangmai Hackathon"
  - Title: "🥷 Market Ninjas"
  - Subtitle: "Transform YouTube videos into viral short-form
  content"
  - Footer: "Powered by AI • Phase 1.5: Insight Extraction"

  Section Headers (with emoji prefixes)

  - "📹 Video Search Results"
  - "🔍 Extract Insights"
  - "✨ Extracted Insights"
  - "🎬 Generated Scripts"
  - "🎬 Generated Shorts"

  ---
  Best Practices

  1. Always prefix section headers with relevant emojis
  2. Use gradients for primary CTAs (indigo to purple)
  3. Apply lift effects on hover for interactive elements
  4. Maintain glass morphism aesthetic with backdrop blur
  5. Use the sky blue gradient for page background
  6. Border left accent for insight/information cards (4px solid
  primary)
  7. 16:9 aspect ratio for video thumbnails
  8. 9:16 aspect ratio for generated vertical videos
  9. White cards with soft shadows against gradient background
  10. Consistent 16px base font size with relative sizing

  ---
  Responsive Breakpoints

  Mobile (max-width: 768px)

  - Hero title: 2rem (reduced from 3rem)
  - Card padding: 20px (reduced from 32px)
  - Single column layouts
  - Stack horizontal elements vertically
  - Full-width buttons

  ---
  Special Elements

  Hackathon Badge

  background: rgba(255, 255, 255, 0.9)
  backdrop-filter: blur(10px)
  border: 2px solid rgba(30, 58, 138, 0.2)
  border-radius: 20px
  padding: 8px 20px
  text-transform: uppercase
  letter-spacing: 0.5px

  Confidence Tags

  - High: rgba(16, 185, 129, 0.1) background, green text
  - Medium: rgba(245, 158, 11, 0.1) background, orange text

  Loading Spinner

  width: 16px
  height: 16px
  border: 2px solid rgba(255,255,255,0.3)
  border-top-color: white
  border-radius: 50%
=======
---
  🥷 Market Ninjas Style Guide

  Brand Identity

  Project: AI-powered platform for transforming YouTube videos into
   viral short-form contentTarget: Cursor Chiangmai Hackathon
  project

  ---
  Color Palette

  Primary Colors

  - Primary Blue: #6366f1 (Indigo)
  - Primary Dark: #4f46e5 (Deeper indigo for hover states)
  - Secondary Purple: #8b5cf6 (Accent color)

  Accent Colors

  - Success Green: #10b981 (Confirmations, high confidence)
  - Danger Red: #ef4444 (Errors, warnings)

  Neutral Grays

  - Gray 50: #f9fafb (Lightest background)
  - Gray 100: #f3f4f6 (Subtle backgrounds)
  - Gray 200: #e5e7eb (Borders, dividers)
  - Gray 300: #d1d5db (Inactive elements)
  - Gray 600: #4b5563 (Secondary text)
  - Gray 700: #374151 (Body text)
  - Gray 900: #111827 (Headings, primary text)

  Special Backgrounds

  - Blue Tones: #1e3a8a, #1e40af (Headers, badges)
  - Gradient Background: linear-gradient(135deg, #e0f2fe 0%, 
  #bae6fd 50%, #7dd3fc 100%) - Sky blue gradient
  - Primary Button: linear-gradient(135deg, var(--primary), 
  var(--secondary)) - Indigo to purple

  ---
  Typography

  Font Family

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, 'Helvetica Neue', Arial, sans-serif;

  Font Sizes

  - Hero Title: 3rem (48px)
  - Section Headers: 1.5rem (24px)
  - Large Text: 1.2rem (19.2px)
  - Body: 1rem (16px)
  - Small/Meta: 0.85-0.9rem (13.6-14.4px)

  Font Weights

  - Regular: 400 (system default)
  - Semibold: 600 (Titles, buttons, labels)
  - Bold: 700 (Section labels)

  ---
  Emoji System 🎨

  Philosophy: Emojis are used extensively throughout the UI to
  create a friendly, approachable, and modern interface. They serve
   as visual anchors and improve scannability.

  Core Brand Emoji

  - 🥷 Market Ninjas - Main brand identity

  Navigation & Actions

  - 🔍 Search
  - ➕ Create/Add
  - 🔄 Refresh/Reset
  - 📥 Download
  - ❌ Error/Close

  Content Categories

  - 📹 Video/Video Selection
  - 🎬 Scripts/Generated Content
  - ✨ Insights/Magic/Results
  - 🎥 Video Generation

  Video Styles (10 distinct styles)

  - 🎙 Podcast
  - 🎤 Street Interview
  - 📹 Talking Head
  - 😮 Reaction
  - 🎓 Tutorial
  - 📖 Storytime
  - ⚔ Debate
  - 👁 POV
  - 🎁 Reveal
  - 📢 Callout

  Metadata Icons

  - 👤 Author/Creator
  - 👁 Views
  - ⏱ Duration/Time
  - 🚀 Hackathon/Launch

  Status & Feedback

  - ✅ Success/Complete
  - 🔑 API Key/Configuration
  - ⚡ Fast/Processing

  ---
  UI Components

  Cards

  background: white
  border-radius: 20px
  padding: 32px
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08)
  border: 1px solid rgba(255, 255, 255, 0.8)
  backdrop-filter: blur(10px)

  Buttons - Primary

  background: linear-gradient(135deg, #6366f1, #8b5cf6)
  color: white
  padding: 14px 28px
  border-radius: 8px
  font-weight: 600
  Hover: Lift effect with translateY(-2px) and enhanced shadow

  Buttons - Secondary

  background: #f3f4f6
  color: #374151
  border-radius: 8px

  Search Input

  background: rgba(255, 255, 255, 0.95)
  backdrop-filter: blur(10px)
  border: 3px solid rgba(30, 58, 138, 0.3)
  border-radius: 16px
  padding: 18px 20px 18px 60px
  Focus: Border changes to #1e3a8a, lifts with shadow

  Video Cards

  border-radius: 16px
  overflow: hidden
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
  Hover: translateY(-4px) with enhanced shadow and primary border
  Selected: border-color: #6366f1 with glow

  Insight Cards

  background: #f9fafb
  border-left: 4px solid #6366f1
  padding: 24px
  border-radius: 12px

  Script Cards

  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05),
  rgba(139, 92, 246, 0.05))
  border: 2px solid #6366f1
  border-radius: 16px
  padding: 24px

  ---
  Layout & Spacing

  Container

  - Max Width: 1200px
  - Margin: Centered with 0 auto
  - Body Padding: 20px

  Grid Systems

  Video List: grid-template-columns: repeat(auto-fill, 
  minmax(320px, 1fr))
  Gallery: grid-template-columns: repeat(auto-fill, minmax(280px, 
  1fr))
  Gap: 24px

  Standard Spacing

  - Section Margins: 24-48px
  - Element Margins: 12-20px
  - Padding: 16-32px (depending on component size)

  ---
  Visual Effects

  Shadows

  - Light: 0 2px 8px rgba(0, 0, 0, 0.08)
  - Medium: 0 4px 20px rgba(0, 0, 0, 0.08)
  - Hover/Elevated: 0 12px 24px rgba(0, 0, 0, 0.12)
  - Primary Glow: 0 8px 20px rgba(99, 102, 241, 0.25)

  Transitions

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
  Fast: 0.2s for buttons
  Standard: 0.3s for cards and hovers

  Hover Effects

  - Lift: transform: translateY(-2px) to translateY(-4px)
  - Shadow Enhancement: Increase blur and opacity
  - Border Highlight: Change to primary color

  Backdrop Effects

  backdrop-filter: blur(10px)
  background: rgba(255, 255, 255, 0.95)

  ---
  Content Tone & Voice

  Console Logging

  console.log('🥷 Market Ninjas Server')
  console.log('🌐 Web Interface: ...')
  console.log('🔑 API Key: ...')
  console.log('✅ Configured / ❌ Missing')
  console.log('🔍 Processing: ...')
  console.log('🎬 Generating ... style script')

  UI Messaging

  - Badge: "🚀 Cursor Chiangmai Hackathon"
  - Title: "🥷 Market Ninjas"
  - Subtitle: "Transform YouTube videos into viral short-form
  content"
  - Footer: "Powered by AI • Phase 1.5: Insight Extraction"

  Section Headers (with emoji prefixes)

  - "📹 Video Search Results"
  - "🔍 Extract Insights"
  - "✨ Extracted Insights"
  - "🎬 Generated Scripts"
  - "🎬 Generated Shorts"

  ---
  Best Practices

  1. Always prefix section headers with relevant emojis
  2. Use gradients for primary CTAs (indigo to purple)
  3. Apply lift effects on hover for interactive elements
  4. Maintain glass morphism aesthetic with backdrop blur
  5. Use the sky blue gradient for page background
  6. Border left accent for insight/information cards (4px solid
  primary)
  7. 16:9 aspect ratio for video thumbnails
  8. 9:16 aspect ratio for generated vertical videos
  9. White cards with soft shadows against gradient background
  10. Consistent 16px base font size with relative sizing

  ---
  Responsive Breakpoints

  Mobile (max-width: 768px)

  - Hero title: 2rem (reduced from 3rem)
  - Card padding: 20px (reduced from 32px)
  - Single column layouts
  - Stack horizontal elements vertically
  - Full-width buttons

  ---
  Special Elements

  Hackathon Badge

  background: rgba(255, 255, 255, 0.9)
  backdrop-filter: blur(10px)
  border: 2px solid rgba(30, 58, 138, 0.2)
  border-radius: 20px
  padding: 8px 20px
  text-transform: uppercase
  letter-spacing: 0.5px

  Confidence Tags

  - High: rgba(16, 185, 129, 0.1) background, green text
  - Medium: rgba(245, 158, 11, 0.1) background, orange text

  Loading Spinner

  width: 16px
  height: 16px
  border: 2px solid rgba(255,255,255,0.3)
  border-top-color: white
  border-radius: 50%
>>>>>>> edd47c35450a2a1f4429b36b4340b487d5c5f417
  animation: spin 0.6s linear infinite