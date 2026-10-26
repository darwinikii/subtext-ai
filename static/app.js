// Subtext AI - Interactive Client Application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // App State
  const state = {
    notes: [],
    totalWeight: 0,
    targetSaturation: 100,
    isBursting: false,
    hasBurst: false
  };

  // DOM Elements
  const noteInput = document.getElementById("noteInput");
  const sendNoteBtn = document.getElementById("sendNoteBtn");
  const manualBurstBtn = document.getElementById("manualBurstBtn");
  const sampleBtn = document.getElementById("sampleBtn");
  const resetBtn = document.getElementById("resetBtn");
  const resetSessionBtn = document.getElementById("resetSessionBtn");
  const copyDiagnosisBtn = document.getElementById("copyDiagnosisBtn");
  const copyDiagnosisText = document.getElementById("copyDiagnosisText");

  const bubbleContainer = document.getElementById("bubbleContainer");
  const bubbleOrb = document.getElementById("bubbleOrb");
  const bubblePercent = document.getElementById("bubblePercent");
  const bubbleStatusText = document.getElementById("bubbleStatusText");
  const bubbleHint = document.getElementById("bubbleHint");
  const ambientGlow = document.getElementById("ambientGlow");
  const notesContainer = document.getElementById("notesContainer");
  const earlyAlert = document.getElementById("earlyAlert");
  const earlyAlertText = document.getElementById("earlyAlertText");

  const stageView = document.getElementById("stageView");
  const resultsView = document.getElementById("resultsView");
  const cardBetweenLines = document.getElementById("cardBetweenLines");
  const cardBlindSpot = document.getElementById("cardBlindSpot");
  const cardDeepPerspective = document.getElementById("cardDeepPerspective");

  const burstCanvas = document.getElementById("burstCanvas");
  const ctx = burstCanvas.getContext("2d");

  // Particle System
  let particles = [];
  function createExplosion(x, y) {
    particles = [];
    const colors = ["#C084FC", "#A855F7", "#7E22CE", "#38BDF8", "#F43F5E", "#FBBF24", "#FFFFFF"];
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 2;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }

  function renderParticles() {
    ctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
    let active = false;
    for (let p of particles) {
      if (p.alpha > 0.01) {
        active = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    if (active) {
      requestAnimationFrame(renderParticles);
    }
  }

  // Update Visual Bubble State based on Semantic Weight
  function updateBubbleVisuals() {
    const rawPercent = Math.min(Math.round((state.totalWeight / state.targetSaturation) * 100), 100);
    bubblePercent.textContent = `${rawPercent}%`;

    // Scale calculation: base 1.0 up to 1.35
    const scaleFactor = 1 + (rawPercent / 100) * 0.35;
    bubbleContainer.style.transform = `scale(${scaleFactor})`;

    // Ambient lighting adjustment
    if (rawPercent > 70) {
      ambientGlow.style.background = `radial-gradient(circle, rgba(244, 63, 94, 0.25) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 75%)`;
    } else {
      ambientGlow.style.background = `radial-gradient(circle, rgba(147, 51, 234, 0.18) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)`;
    }

    if (rawPercent === 0) {
      bubbleStatusText.textContent = "Mind Bubble: Resting (0% Subtext Density)";
      bubbleHint.textContent = "Drop fragmented daily notes. Watch the bubble swell with semantic weight.";
      bubbleOrb.classList.remove("saturated");
    } else if (rawPercent < 50) {
      bubbleStatusText.textContent = `Mind Bubble: Absorbing (${rawPercent}% Subtext Density)`;
      bubbleHint.textContent = "Insights are starting to cluster. Keep adding thoughts.";
      bubbleOrb.classList.remove("saturated");
    } else if (rawPercent < 100) {
      bubbleStatusText.textContent = `Mind Bubble: High Pressure (${rawPercent}% Subtext Density)`;
      bubbleHint.textContent = "Strong undercurrents detected! Near saturation threshold.";
      bubbleOrb.classList.add("saturated");
    } else {
      bubbleStatusText.textContent = "Mind Bubble: Critical Saturation (100%)";
      bubbleHint.textContent = "Subtext decrypted! Bursting automatically...";
      bubbleOrb.classList.add("saturated");
    }
  }

  // Append note to the live thought stream
  function renderNoteItem(note) {
    const pill = document.createElement("div");
    pill.className = "flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs fade-in-up text-slate-300";
    
    let badgeColor = "bg-slate-800 text-slate-400 border-slate-700";
    if (note.category === "profound") {
      badgeColor = "bg-purple-500/20 text-purple-300 border-purple-500/30";
    } else if (note.category === "moderate") {
      badgeColor = "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }

    pill.innerHTML = `
      <div class="flex items-center space-x-2 truncate pr-2">
        <i data-lucide="message-square" class="w-3.5 h-3.5 text-purple-400 flex-shrink-0"></i>
        <span class="truncate">${escapeHtml(note.text)}</span>
      </div>
      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${badgeColor} flex-shrink-0">
        +${note.weight} pts
      </span>
    `;

    notesContainer.appendChild(pill);
    notesContainer.scrollTop = notesContainer.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Submit Note Handler
  async function submitNote(text) {
    const trimmed = text.trim();
    if (!trimmed || state.isBursting || state.hasBurst) return;

    noteInput.value = "";
    earlyAlert.classList.add("hidden");

    try {
      const res = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed })
      });

      if (!res.ok) throw new Error("Could not score note");
      const data = await res.json();

      state.notes.push(data);
      state.totalWeight += data.weight;
      renderNoteItem(data);
      updateBubbleVisuals();

      // Check for automatic burst threshold
      if (state.totalWeight >= state.targetSaturation && !state.hasBurst && !state.isBursting) {
        setTimeout(() => triggerBurst(false), 600);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Trigger Burst & Subtext Analysis
  async function triggerBurst(isManual = true) {
    if (state.isBursting || state.hasBurst) return;
    state.isBursting = true;
    earlyAlert.classList.add("hidden");

    // Gather notes
    const noteTexts = state.notes.map(n => n.text);

    // Call analyze endpoint
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: noteTexts })
      });

      const data = await res.json();

      // Handle premature burst edge case
      if (data.is_early) {
        state.isBursting = false;
        bubbleOrb.classList.add("bubble-deflate");
        earlyAlertText.textContent = data.message;
        earlyAlert.classList.remove("hidden");
        if (window.lucide) window.lucide.createIcons();

        setTimeout(() => {
          bubbleOrb.classList.remove("bubble-deflate");
        }, 1000);
        return;
      }

      // Successful Burst Sequence!
      state.hasBurst = true;
      const rect = burstCanvas.getBoundingClientRect();
      createExplosion(burstCanvas.width / 2, burstCanvas.height / 2);
      renderParticles();

      // Shrink and hide stage, reveal diagnostic cards
      bubbleOrb.style.transition = "all 0.4s ease-out";
      bubbleOrb.style.transform = "scale(0)";
      bubbleOrb.style.opacity = "0";

      setTimeout(() => {
        stageView.classList.add("hidden");
        
        cardBetweenLines.textContent = data.between_the_lines;
        cardBlindSpot.textContent = data.blind_spot;
        cardDeepPerspective.textContent = data.deep_perspective;

        resultsView.classList.remove("hidden");
        if (window.lucide) window.lucide.createIcons();
      }, 450);

    } catch (err) {
      console.error("Burst analysis error:", err);
      state.isBursting = false;
    }
  }

  // Load Sample Day Sequential Preloader
  async function loadSampleDay() {
    if (state.isBursting || state.hasBurst) resetSession();

    sampleBtn.disabled = true;
    sampleBtn.classList.add("opacity-60");

    try {
      const res = await fetch("/api/sample");
      const data = await res.json();
      const samples = data.notes || [];

      for (let i = 0; i < samples.length; i++) {
        await submitNote(samples[i]);
        // Realistic typing cadence pause
        if (i < samples.length - 1) {
          await new Promise(r => setTimeout(r, 700));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      sampleBtn.disabled = false;
      sampleBtn.classList.remove("opacity-60");
    }
  }

  // Reset Session
  function resetSession() {
    state.notes = [];
    state.totalWeight = 0;
    state.isBursting = false;
    state.hasBurst = false;

    notesContainer.innerHTML = "";
    earlyAlert.classList.add("hidden");
    
    stageView.classList.remove("hidden");
    resultsView.classList.add("hidden");

    bubbleOrb.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
    bubbleOrb.style.transform = "scale(1)";
    bubbleOrb.style.opacity = "1";
    bubbleOrb.classList.remove("saturated", "bubble-deflate");

    updateBubbleVisuals();
    noteInput.focus();
  }

  // Event Listeners
  sendNoteBtn.addEventListener("click", () => submitNote(noteInput.value));
  noteInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitNote(noteInput.value);
    }
  });

  manualBurstBtn.addEventListener("click", () => triggerBurst(true));
  bubbleContainer.addEventListener("click", () => triggerBurst(true));
  sampleBtn.addEventListener("click", loadSampleDay);
  resetBtn.addEventListener("click", resetSession);
  resetSessionBtn.addEventListener("click", resetSession);

  // Copy Diagnosis Utility
  copyDiagnosisBtn.addEventListener("click", () => {
    const text = 
`[Subtext AI Diagnosis]
Between the Lines:
${cardBetweenLines.textContent.trim()}

Your Blind Spot:
${cardBlindSpot.textContent.trim()}

Deep Perspective & Micro-Shift:
${cardDeepPerspective.textContent.trim()}`;

    navigator.clipboard.writeText(text).then(() => {
      copyDiagnosisText.textContent = "Copied to Clipboard!";
      setTimeout(() => {
        copyDiagnosisText.textContent = "Copy Full Diagnosis";
      }, 2000);
    });
  });

  // Initial State
  updateBubbleVisuals();
});
