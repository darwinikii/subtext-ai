---
doc: spec
status: approved
---

# Subtext AI — Technical Specification

## How This Works, In Plain Language
The application consists of two integrated components:
1. **Frontend (User Interface):** A responsive, dark-mode single-page web app built with modern HTML5, Tailwind CSS, Lucide icons, and Canvas/CSS particle animations. It features a conversational dock, an organic glowing Mind Bubble whose scale and glow react dynamically to semantic insight weight, and an animated card reveal stage.
2. **Backend (Python FastAPI Server):** A lightweight API server that receives incoming notes, scores their semantic insight density, and forwards the collective text to an OpenAI-compatible LLM endpoint (local proxy at `http://localhost:4000/v1` or external provider via `.env`) to produce the 3 structured insight cards.

Why this architecture? It provides instant local execution (`python server.py`), eliminates heavy `npm build` overhead, and guarantees a zero-latency, high-framerate visual experience for the hackathon video demo.

## The Core Journey Through the System
1. **Note Ingestion:** User inputs a thought → `POST /api/note` is triggered.
2. **Semantic Weight Scoring:** The backend calculates the emotional/behavioral cue score (0–40 pts per note) and returns the updated cumulative saturation percentage (`weight_percentage`).
3. **Bubble Reaction:** The frontend scales the CSS transform and glow intensity of the Mind Bubble.
4. **Burst & Analysis:**
   - When saturation reaches 100% (automatic) or the user clicks "Burst" (manual) → `POST /api/analyze` is invoked.
   - The backend queries the LLM proxy with a structured subtext prompt. If insight density is insufficient, it returns an early-trigger notice.
5. **Card Reveal:** The backend returns verified JSON containing the 3 insight dimensions; the frontend initiates the burst particle animation and reveals the cards.
PRD ref: `prd.md > The Core Journey`.

## Stack
- **Backend:** Python 3.13, FastAPI, Uvicorn, HTTPX (async HTTP client), Python-dotenv.
  - *Rationale:* Lightweight, standards-based, and inherently optimized for AI API integration.
- **Frontend:** Modern Vanilla JavaScript (ES6+), HTML5, Tailwind CSS (via CDN), Canvas 2D particle system.
  - *Rationale:* Zero compilation lag, smooth 60fps animations, effortlessly editable.
- **AI Integration:** OpenAI-compatible endpoint (`http://localhost:4000/v1`) with fallback to intelligent local heuristic engine.
- **Configuration:** `.env` for endpoint and API key management.

## Where It Runs and How Someone Tries It
- **Runtime:** Runs locally on `http://localhost:8000`.
- **Start Command:**
  ```powershell
  python server.py
  ```
- **Demo Walkthrough:** Open `http://localhost:8000` in any modern browser. Click "Load Sample Day" or enter 3 personal notes. Observe the Mind Bubble swell with insight density, automatically burst at critical mass, and display the 3 profound diagnostic cards.

## Look and Feel
- **Theme:** Obsidian Dark Mode (`#0B0F19` body, `#161F30` cards).
- **Accents:** Neon Violet (`#A855F7`), Electric Blue (`#3B82F6`), and Emerald Glow (`#10B981`).
- **Bubble:** Dynamic Canvas + CSS glowing sphere with organic sinusoidal oscillation.
PRD ref: `prd.md > Look and Feel`.

## Components

### 1. ChatInput & Messaging Dock
Handles text input, keyboard submission (`Enter`), note history display, and manual trigger controls.
PRD ref: `prd.md > Features and Behavior > 1. Conversational Thought Ingestion`.

### 2. MindBubble Controller
A reactive canvas/CSS engine managing bubble scale, pulse frequency, color gradient transitions, and the rupture particle explosion.
PRD ref: `prd.md > Features and Behavior > 2. Semantic Weight-Driven Mind Bubble`.

### 3. InsightCards Reveal
Renders the 3 diagnostic cards ("Between the Lines", "Your Blind Spot", "Deep Perspective") with copy utilities and fluid entry animations.
PRD ref: `prd.md > Features and Behavior > 3. Deep Analysis Engine`.

### 4. Semantic Weight & LLM Engine (Backend)
- `server.py`: Hosts `/api/note`, `/api/analyze`, `/api/sample`, and static file serving.
- Evaluates linguistic cues for saturation scoring and parses LLM JSON outputs with fallback resilience.

## Data Model
- Client session payload:
  ```json
  {
    "notes": [
      { "id": 1, "text": "Stayed quiet during the review...", "weight": 35 }
    ],
    "total_weight": 85,
    "status": "accumulating | bursting | revealed"
  }
  ```
- No external database is required; state is managed cleanly in client memory for optimal PoC performance.

## File Structure
```
devpost/
├── devpost/
│   ├── learner-profile.md
│   ├── scope.md
│   ├── prd.md
│   └── spec.md
├── static/
│   ├── index.html        # Single-page interface
│   ├── app.js            # Bubble canvas animation, messaging, and API calls
│   └── style.css         # Custom animations, glowing utilities
├── server.py             # FastAPI server with LLM proxy integration
├── requirements.txt      # Python dependencies
├── .env.example          # Template for local AI credentials
├── .env                  # Local AI proxy configuration (git-ignored)
├── .gitignore
└── README.md             # Devpost submission instructions and overview
```

## Important Failure Modes
1. **AI Proxy Timeout / Unreachable:** Backend automatically routes through a built-in analytical generator so the demo recording never encounters a blank screen or error.
2. **Premature Burst:** Backend signals insufficient data; bubble deflates with humorous constructive coaching.
3. **Empty Submission:** Input field rejects blank notes with visual shake feedback.

## What Was Simplified and Why
- **Pure Modern Web vs Bundler:** Avoided complex bundler configs to maintain maximum developer velocity and zero-dependency browser execution.
- **Session-Based State:** Selected over database persistence to preserve PoC simplicity and ensure instantaneous resets during demos.

## Decisions and Open Issues
- **Language Decision:** All code, repository files, planning documentation, and user interfaces are standardized in English to accommodate Devpost hackathon judges.
- **AI Connectivity:** Configured for `http://localhost:4000/v1` with dynamic model selection via `.env`.
