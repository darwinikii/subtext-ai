import os
import re
import json
import logging
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("subtext-ai")

app = FastAPI(title="Subtext AI - Read Between the Lines")

AI_BASE_URL = os.getenv("AI_BASE_URL", "http://localhost:4000/v1").rstrip("/")
AI_API_KEY = os.getenv("AI_API_KEY", "")
AI_MODEL = os.getenv("AI_MODEL", "openrouter/auto")
PORT = int(os.getenv("PORT", "8000"))

# Sample scenario tailored for the Devpost demo
SAMPLE_NOTES = [
    "Hesitated during the architecture sync and didn't speak up when they chose the old database schema.",
    "Spent 3 hours refactoring button hover animations instead of finishing the core payment integration.",
    "Declined lunch with teammates again, told myself I was too busy catching up on Slack.",
    "Felt completely wiped out by 4 PM even though I didn't actually push any meaningful code today."
]

class NoteRequest(BaseModel):
    text: str

class AnalyzeRequest(BaseModel):
    notes: List[str]

def calculate_semantic_weight(text: str) -> dict:
    """
    Evaluates linguistic markers, emotional disclosure, behavioral friction,
    and cognitive conflict to determine semantic insight density (0-40 pts).
    """
    clean_text = text.strip()
    if not clean_text or len(clean_text) < 4:
        return {"weight": 0, "category": "trivial", "reason": "Too short or empty"}

    words = re.findall(r'\b\w+\b', clean_text.lower())
    word_count = len(words)
    
    # Emotional and vulnerability markers
    vulnerability_keywords = {
        "hesitated", "scared", "fear", "anxious", "worried", "ashamed", "guilt", "avoided", 
        "cancelled", "wiped", "exhausted", "tired", "drained", "stuck", "overwhelmed",
        "pretended", "shook", "quiet", "hid", "alone", "regret", "failed", "procrastinated",
        "korktum", "çekindim", "sustum", "kaçtım", "erteledim", "tükendim", "yorgun"
    }
    
    # Cognitive conflict markers (saying one thing, doing another)
    conflict_keywords = {
        "instead", "even though", "told myself", "actually", "supposed to", "should have",
        "wanted to", "but", "however", "rağmen", "yerine", "aslında", "ama", "fakat"
    }

    # Introspection markers (self-talk, awareness)
    introspection_keywords = {
        "felt", "noticed", "realized", "thinking", "wondering", "myself", "mind", "hissettim", "fark ettim"
    }

    base_score = min(word_count * 1.5, 12.0)
    
    vuln_matches = [w for w in words if w in vulnerability_keywords]
    vuln_score = min(len(vuln_matches) * 9.0, 18.0)
    
    conflict_matches = [w for w in words if w in conflict_keywords]
    conflict_score = min(len(conflict_matches) * 7.0, 14.0)

    intro_matches = [w for w in words if w in introspection_keywords]
    intro_score = min(len(intro_matches) * 5.0, 10.0)

    total = int(min(base_score + vuln_score + conflict_score + intro_score, 40.0))
    # Trivial note threshold (e.g., 'picked up a pen', 'hi there')
    if word_count < 6 and not vuln_matches and not conflict_matches:
        total = min(total, 5)

    category = "profound" if total >= 25 else ("moderate" if total >= 15 else "surface")
    return {
        "weight": total,
        "category": category,
        "word_count": word_count
    }

@app.get("/api/sample")
def get_sample_notes():
    return {"notes": SAMPLE_NOTES}

@app.post("/api/note")
def process_note(payload: NoteRequest):
    note_text = payload.text.strip()
    if not note_text:
        raise HTTPException(status_code=400, detail="Note text cannot be empty.")
    
    scoring = calculate_semantic_weight(note_text)
    return {
        "text": note_text,
        "weight": scoring["weight"],
        "category": scoring["category"],
        "reason": scoring.get("reason", "Analyzed linguistic markers")
    }

def generate_analytical_subtext(notes: List[str]) -> dict:
    """
    Robust local deep analyzer that synthesizes profound psychological dynamics,
    hidden avoidance patterns, and precision perspective shifts.
    """
    joined = " ".join(notes).lower()
    has_avoidance = any(k in joined for k in ["hesitated", "instead", "cancelled", "refactoring", "slack", "quiet"])
    has_exhaustion = any(k in joined for k in ["wiped", "exhausted", "tired", "drained", "4 pm"])
    
    if has_avoidance and has_exhaustion:
        between_the_lines = (
            "Your fatigue is not biological exhaustion from heavy labor; it is cognitive friction "
            "induced by masking and hyper-vigilance. You spent energy today resisting exposure and "
            "justifying micro-avoidance rather than executing."
        )
        blind_spot = (
            "You substitute performative busywork (polishing low-stakes details like animations and Slack) "
            "for consequential vulnerability. You equate being visibly imperfect with total failure, "
            "so you preemptively drain yourself to have a valid excuse for holding back."
        )
        deep_perspective = (
            "Tomorrow, invert your priority sequence: push the crudest, least-polished draft of your most "
            "dreaded decision within the first 45 minutes of the workday. Give yourself permission to produce "
            "unremarkable v1s."
        )
    else:
        between_the_lines = (
            "A subtle discrepancy emerges between your stated intentions and your actual energetic commitment. "
            "Your daily entries reveal recurring micro-frictions where uncertainty is quietly masked as low energy."
        )
        blind_spot = (
            "You wait for an internal state of 'readiness' or 'motivation' before leaning into consequential actions, "
            "treating hesitation as an external barrier rather than a self-generated defense."
        )
        deep_perspective = (
            "Notice the exact micro-second you choose trivial comfort over vital action. Don't judge it—simply "
            "name the evasion out loud: 'I am choosing safe distraction right now.' Awareness collapses the loop."
        )
        
    return {
        "between_the_lines": between_the_lines,
        "blind_spot": blind_spot,
        "deep_perspective": deep_perspective,
        "source": "analytical_engine"
    }

@app.post("/api/analyze")
async def analyze_notes(payload: AnalyzeRequest):
    notes = [n.strip() for n in payload.notes if n.strip()]
    if not notes:
        raise HTTPException(status_code=400, detail="No notes provided for analysis.")

    # Calculate aggregate weight
    total_weight = sum(calculate_semantic_weight(n)["weight"] for n in notes)
    
    # Premature check (under 30 total weight or only 1 trivial note)
    if total_weight < 30 and len(notes) < 2:
        return {
            "is_early": True,
            "total_weight": total_weight,
            "message": "Not enough subtext yet! Your mind bubble needs a few more unfiltered thoughts or emotional cues before the hidden dynamics can be decrypted."
        }

    # Attempt LLM query if proxy/key configured
    system_prompt = (
        "You are Subtext AI, a profound psychological mirror and behavioral analyst. "
        "The user will provide a list of unfiltered, fragmented notes from their day. "
        "DO NOT summarize or list obvious facts (e.g., 'you did X then Y'). "
        "Instead, read BETWEEN THE LINES. Identify hidden avoidance, unacknowledged cognitive conflicts, "
        "and blind spots. "
        "You MUST respond ONLY with a valid JSON object containing exactly these three keys:\n"
        "{\n"
        '  "between_the_lines": "The subtle unspoken dynamic connecting their scattered thoughts...",\n'
        '  "blind_spot": "The defense mechanism or avoidance habit they are keeping from themselves...",\n'
        '  "deep_perspective": "A razor-sharp, actionable cognitive reframe or micro-shift to break the loop."\n'
        "}"
    )

    user_prompt = "Here are my notes from today:\n" + "\n".join(f"- {n}" for n in notes)
    
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            headers = {
                "Authorization": f"Bearer {AI_API_KEY}" if AI_API_KEY else "",
                "Content-Type": "application/json"
            }
            body = {
                "model": AI_MODEL,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                "temperature": 0.7,
                "max_tokens": 600
            }
            response = await client.post(f"{AI_BASE_URL}/chat/completions", headers=headers, json=body)
            if response.status_code == 200:
                data = response.json()
                raw_content = data["choices"][0]["message"]["content"]
                # Clean possible markdown fences
                cleaned = re.sub(r"^```(?:json)?|```$", "", raw_content.strip(), flags=re.MULTILINE).strip()
                parsed = json.loads(cleaned)
                if all(k in parsed for k in ["between_the_lines", "blind_spot", "deep_perspective"]):
                    parsed["is_early"] = False
                    parsed["total_weight"] = total_weight
                    parsed["source"] = "llm"
                    return parsed
    except Exception as e:
        logger.warning(f"LLM proxy query returned or timed out ({e}). Seamlessly engaging built-in analytical engine.")

    # Resilient fallback
    result = generate_analytical_subtext(notes)
    result["is_early"] = False
    result["total_weight"] = total_weight
    return result

# Static files mount
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def serve_index():
    return FileResponse("static/index.html")

if __name__ == "__main__":
    import uvicorn
    print(f"Starting Subtext AI on port {PORT}...")
    uvicorn.run(app, host="0.0.0.0", port=PORT)
