---
doc: prd
status: approved
---

# Subtext AI — Product Requirements (PRD)

An interactive, reflective daily companion where casual notes inflate a central "Mind Bubble" based on semantic insight density, bursting at critical mass to reveal hidden cognitive patterns, unspoken avoidance, and blind spots.
Source: `scope.md > The Unique Kernel` and `scope.md > The Core Loop`.

## The Core Journey
1. **Arrival & First Impression:** The user opens the app to an intimate, conversational dark-mode interface. At the center pulses a calm, organic "Mind Bubble". At the bottom sits a messaging input bar.
2. **Dropping Notes:** The user sends fragmented thoughts throughout the day, texting themselves as if in a private DM (or clicks the "Load Sample Day" button for an instant demonstration).
3. **Semantic Inflation:** Each message travels to the Mind Bubble. Rather than inflating blindly per message count, the bubble evaluates the emotional and behavioral insight weight of the note. Superficial remarks cause minor ripples; deeply telling notes expand the bubble noticeably.
4. **Saturation & Bursting:**
   - **Automatic Burst:** When accumulated insight weight reaches the critical saturation threshold, the system declares the subtext clear and automatically triggers a burst.
   - **Manual Burst:** After accumulating sufficient insight, the user can click "Burst & Reveal Subtext" at any time.
5. **Card Reveal:** The bubble ruptures with a fluid particle animation, unveiling 3 sharp insight cards:
   - 🔍 **Between the Lines (The Hidden Dynamic):** The subtle undercurrent connecting scattered notes.
   - 🎯 **Your Blind Spot:** An unspoken friction or avoidance mechanism.
   - 💡 **Deep Perspective & Micro-Shift:** A precision cognitive prompt to unlock progress.
6. **Reset / New Reflection:** The user can click "Start Fresh Reflection" to clear the session.

## Screens and Layout
- **Single-Page Application (SPA):**
  - **Header:** Application branding (`Subtext AI`), a concise subhead ("Read between the lines of your day"), and a prominent `Load Sample Day` quick-demo button.
  - **Hero Stage:** The dynamic Mind Bubble canvas. Pulses and shifts color as semantic weight increases. Upon bursting, smoothly transitions into the 3 result cards.
  - **Bottom Chat Dock:** Clean messaging input field, "Send" button, and a dynamic "Burst Bubble" action with progress indicator.

## Look and Feel
- **Aesthetic:** Intimate, candid, focused, and contemplative.
- **Palette:** Deep Obsidian Black background (`#0B0F19`), Slate cards (`#161F30`), Neon Purple (`#A855F7`) and Electric Blue (`#3B82F6`) glowing accents, and crisp white/slate typography.
- **Typography:** High-legibility modern sans-serif (Inter / System UI).

## Features and Behavior

### 1. Conversational Thought Ingestion
- Users type casual one-liners or short paragraphs and press Enter / Send.
- Messages appear in a subtle chat timeline and visually feed into the central bubble.

### 2. Semantic Weight-Driven Mind Bubble
- Inflation is driven strictly by **insight density** (emotional cues, self-critique, conflict, friction), not raw note quantity.
- Trivial notes (e.g., *"Picked up a pen"*) cause a negligible pulse.
- Meaningful disclosures (e.g., *"Voice shook during the meeting, so I skipped my proposal"*) significantly expand the bubble.
- **Premature Burst Edge Case:** If triggered before reaching minimum insight density, the bubble deflates/cracks and provides witty, encouraging feedback:
  - *"Not enough subtext yet! Share a few more unfiltered thoughts or moments from your day so I can see between the lines."*

### 3. Deep Analysis Engine
- Evaluates the collective text using a specialized prompt designed to bypass obvious cause-and-effect and identify unspoken friction.
- Formats output strictly into the 3 structured insight cards.

## States and Boundaries
- **Empty State:** Centered calm bubble with the prompt: *"Drop your raw daily thoughts. Watch your mind bubble swell..."*
- **Saturating State:** Bubble grows in scale, glow, and pulse frequency as insight accumulates.
- **Bursting State:** High-energy particle burst and glowing transition into analysis cards.
- **Revealed State:** Smoothly rendered insight cards with copy buttons.
- **Network / API Failure State:** Gracefully falls back to a built-in analytical engine to ensure the video demo is never interrupted.

## Product Decisions
- **Conversational Messaging UI:** Selected over a formal form to evoke the feeling of texting a trusted confidant.
- **Semantic Weight vs Note Count:** Ensures the inflation mechanic reflects true substance and avoids false expectations.
- **Automatic Burst Threshold:** Delivers an exciting, autonomous AI moment when critical mass is reached.

## What We're Building (POC Scope)
- Responsive dark-mode single-page web app.
- Dynamic semantic-weight Mind Bubble with CSS/Canvas animations.
- Premature trigger handling with humorous guidance.
- AI-driven deep subtext analysis engine returning 3 structured cards.
- 1-click "Load Sample Day" button for immediate demo recordings.

## Deferred From the POC
- Multi-turn conversational chat following card reveal.
- Multi-day historical database persistence and longitudinal pattern tracking.
- Voice audio capture.

## Non-Goals
- User accounts / authentication walls.
- Third-party calendar and productivity tool synchronizations.

## Open Questions
- None; product behavior and boundaries are finalized.
