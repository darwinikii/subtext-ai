---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [ ] **1. Runnable server and conversational messaging interface with Mind Bubble scaffold**
  Becomes usable: The FastAPI server starts and serves the modern dark-mode application. Users can enter notes into the chat dock and see their thought stream appear in real time.
  Why now: Proves the runtime, file serving, styling, and core conversational interface end-to-end so all animations and analysis logic have an operational foundation.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > Features and Behavior > 1. Conversational Thought Ingestion`
  Spec ref: `spec.md > Stack`, `spec.md > File Structure`, `spec.md > Components > 1. ChatInput & Messaging Dock`
  Build: Create `requirements.txt`, `server.py`, `static/index.html`, `static/style.css`, and `static/app.js`. Implement the base FastAPI app, message submission handler, and initial Mind Bubble SVG/Canvas layout.
  Verify (mechanical): Start the server on port 8000, perform an HTTP GET request to verify `200 OK`, and simulate posting a note to confirm it appears in the DOM.
  Learner check: Open `http://localhost:8000`, type a casual thought, press Enter, and see it display in the thought stream.
  Commit: `feat: scaffold server and conversational messaging interface`

- [ ] **2. Semantic weight scoring and reactive Mind Bubble inflation dynamics**
  Becomes usable: Submitting a note calculates its semantic insight density via `POST /api/note`. The central Mind Bubble dynamically scales, pulses, and intensifies its glow based on insight weight rather than raw count. Includes the "Load Sample Day" button.
  Why now: Delivers the core visual metaphor and interactive behavior that defines the app's personality and prepares the stage for the burst.
  PRD ref: `prd.md > Features and Behavior > 2. Semantic Weight-Driven Mind Bubble`
  Spec ref: `spec.md > Components > 2. MindBubble Controller`, `spec.md > Data Model`
  Build: Implement linguistic cue scoring in `server.py` (`POST /api/note`), dynamic CSS transform/canvas pulse in `static/app.js`, and the 1-click "Load Sample Day" preloader.
  Verify (mechanical): Send both a trivial note ("picked up a pen") and an emotional note ("voice shook in meeting"); verify through API response that the latter awards higher semantic weight (30+ pts vs <10 pts) and updates bubble scale.
  Learner check: Click "Load Sample Day" or enter 2 real notes; watch the Mind Bubble swell and accelerate its pulse.
  Commit: `feat: add semantic weight scoring and reactive mind bubble inflation`

- [ ] **3. Deep LLM subtext engine, auto/manual burst, and 3-card reveal**
  Becomes usable: When the bubble saturates (or upon manual burst), the bubble ruptures with a particle animation, sends the accumulated text to the LLM (OpenRouter/local proxy with fallback), and reveals the 3 sharp insight cards ("Between the Lines", "Your Blind Spot", "Deep Perspective"). Premature bursts trigger humorous guidance.
  Why now: Completes the full end-to-end journey and delivers the unique kernel required for the hackathon submission.
  PRD ref: `prd.md > Features and Behavior > 3. Deep Analysis Engine`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components > 3. InsightCards Reveal`, `spec.md > Important Failure Modes`
  Build: Implement `POST /api/analyze` in `server.py` with structured LLM prompt and resilient fallback generator. Add particle explosion and card reveal transitions in `app.js` and `style.css`. Add premature burst detection.
  Verify (mechanical): Send request to `POST /api/analyze` with sample notes; verify JSON response contains non-empty `between_the_lines`, `blind_spot`, and `deep_perspective` fields. Verify premature burst returns coaching guidance.
  Learner check: Inflate the bubble to critical mass, watch it automatically burst into the 3 insight cards, and inspect the diagnostic depth.
  Commit: `feat: implement deep subtext analysis engine and card reveal`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — Slice 2 (Mind Bubble inflation and sample loader verified in browser)
- [ ] Final kick-the-tires exploration and feedback completed — Slice 3 (Full burst & card reveal verified)

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [to be recorded upon completion]
Route and stops: [to be recorded upon completion]
Edit outcome: [to be recorded upon completion]
Reflection: [to be recorded upon completion]
Activity mode: [to be recorded upon completion]

## Revisions
