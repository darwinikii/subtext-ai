# Subtext AI 🔮
> **Read between the lines of your fragmented daily thoughts.**  
> Built for the Devpost **"Build With AI: Basics"** Hackathon.

![Subtext AI Preview](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.13-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-teal?style=for-the-badge&logo=fastapi)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 💡 Inspiration
Have you ever ended a workday feeling utterly exhausted, even though you didn't finish the core tasks you intended to? Most productivity tools ask you for checklists, deadlines, and superficial summaries. But human behavior isn't linear—it's driven by subconscious avoidance, fear of exposure, and micro-frictions that we rarely admit to ourselves.

We asked: **What if an AI didn't just summarize your day, but acted as a candid psychological mirror that read *between the lines* of your unfiltered notes to reveal your true blind spots?**

That is **Subtext AI**.

---

## ✨ Key Features & The Experience

- 💬 **Conversational Note Ingestion:** Drop raw thoughts, feelings, or friction points throughout the day as if texting a trusted confidant.
- 🫧 **Semantic Weight-Driven "Mind Bubble":** The central Mind Bubble does **not** inflate blindly by message count. Instead, our semantic scoring engine evaluates emotional vulnerability, cognitive conflict, and defense mechanisms. Superficial notes cause faint ripples; genuine disclosures cause the bubble to noticeably swell and pulse.
- 💥 **Dynamic Auto-Burst & Manual Burst:** When subtext density reaches 100% critical mass, the bubble automatically bursts with a canvas particle explosion.
- ⚠️ **Premature Burst Protection:** If triggered prematurely with insufficient data, the bubble deflates with witty coaching feedback to share more unfiltered thoughts.
- 🃏 **The 3 Deep Diagnostic Dimensions:**
  1. 🔍 **Between the Lines (The Hidden Dynamic):** Connects disparate notes into the unspoken common denominator (e.g., masking perfectionism as fatigue).
  2. 🎯 **Your Blind Spot:** Exposes the defense mechanism you are keeping from yourself.
  3. 💡 **Deep Perspective & Micro-Shift:** Provides a razor-sharp, actionable cognitive reframe to break the avoidance loop tomorrow morning.
- ⚡ **1-Click "Load Sample Day":** Sequentially streams a realistic founder/developer day so judges can witness the inflation and burst within seconds.

---

## 🛠️ Tech Stack & Architecture

- **Backend:** Python 3.13 + **FastAPI** + **Uvicorn** + **HTTPX**
- **Frontend:** Modern Vanilla JavaScript (ES6+), **Tailwind CSS**, Lucide Icons, and Canvas 2D Particle Engine.
- **AI Integration:** LiteLLM / OpenRouter OpenAI-compatible API endpoint with a resilient built-in analytical fallback engine.
- **Spec-Driven Methodology:** Engineered using the Devpost Learn Skill Pack (`1-start`, `2-scope`, `3-prd`, `4-spec`, `5-build`, `6-ship`).

---

## 🚀 Quickstart — Run Locally in 60 Seconds

### 1. Clone the repository
```bash
git clone https://github.com/your-username/subtext-ai.git
cd subtext-ai
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. (Optional) Configure AI credentials
Copy the sample environment file:
```bash
cp .env.example .env
```
*(The application works out of the box with the local proxy or its resilient analytical engine!)*

### 4. Start the server
```bash
python server.py
```
Open **`http://localhost:8000`** in your browser.

---

## 📂 Hackathon Planning Artifacts
As required by the Devpost hackathon rules, all planning specifications generated during flipped-interaction are preserved in the repository:
- 📄 [`scope.md`](scope.md) — The approved problem boundary, unique kernel, and target user.
- 📋 [`prd.md`](prd.md) — The detailed product definition, core user journey, and edge cases.
- 📐 [`spec.md`](spec.md) — The complete architectural blueprint and data contracts.
- 🧭 [`devpost/`](devpost/) — Full workspace documentation records.

---

## 🎥 1-Minute Demo Walkthrough for Reviewers
1. Open `http://localhost:8000`.
2. Click **"Load Sample Day"** in the top right.
3. Watch the notes stream into the chat dock while the central **Mind Bubble** swells and shifts from violet to glowing rose.
4. Witness the automatic particle burst at 100% saturation.
5. Review the 3 diagnostic cards revealing the user's hidden perfectionism loop.
6. Click **"Copy Full Diagnosis"** or **"Reflect on Another Day"**.

---

## 🔮 What's Next for Subtext AI
- **Longitudinal Cognitive Memory:** Multi-week tracking to spot recurring multi-month blind spot cycles.
- **Voice Journaling:** Instant audio transcription with tone and hesitation acoustic analysis.
- **Calendar Contrast:** Comparing scheduled calendar blocks against actual emotional notes to quantify the "masking tax."
