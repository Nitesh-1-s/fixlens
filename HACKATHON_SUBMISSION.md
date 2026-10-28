# FixLens — Hackathon Submission & Demo Video Blueprint
**Event:** Meta Global AI Developer Hackathon 2026 (Cerebral Valley)  
**Track:** Indie Developer Track ($150,000 Top Prize)  
**Builder:** Nitesh (`nitesh.naasai@gmail.com` / GitHub: `nitesh369`)  

---

## 📋 Cerebral Valley Submission Form Fields

### 1. Project Title
**FixLens: Autonomous Multimodal Visual Hardware & Appliance Diagnostic Copilot**

### 2. One-Line Tagline
> Transforming physical machinery repair through interactive point segmentation (SAM 3.1), native hardware reasoning (Meta Muse Spark Open), and automated agentic teardown protocols.

### 3. Category Tags
- Primary: **Indie Track**
- Specialized Bonus Tracks: **Open Weights Bonus ($10,000)** & **Agentic Workflows Bonus ($5,000)**

### 4. Public GitHub Repository
`https://github.com/nitesh369/fixlens`

### 5. Live Demo URL
- Frontend: `https://fixlens-ai.vercel.app` (or local `http://localhost:5173`)
- Live Cloud Modal Endpoint: `https://nitesh-naasai--fixlens-backend-diagnose.us-east.modal.run`
- Cloud Health Telemetry: `https://nitesh-naasai--fixlens-backend-health.us-east.modal.run`

---

## 🧠 Technical Architecture & Meta Model Synergy

```
                      [ USER / TECHNICIAN ]
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
     [ Preset Hardware ]                  [ Custom Upload ]
  (Motherboard / 3D Printer / Auto)     (Macro Photography / Video)
            │                                     │
            └──────────────────┬──────────────────┘
                               │ Click / Hover Point Prompt
                               ▼
            ┌─────────────────────────────────────┐
            │       Meta SAM 3.1 Engine           │
            │   Interactive Segment Anything      │
            │    Sub-pixel Polygon Masking        │
            └──────────────────┬──────────────────┘
                               │ Cropped ROI + Hardware Context
                               ▼
            ┌─────────────────────────────────────┐
            │        Modal Serverless GPU         │
            │  FastAPI Cloud Microservice Cluster │
            └──────────────────┬──────────────────┘
                               │ 2M TPM Low-Latency Pipe
                               ▼
            ┌─────────────────────────────────────┐
            │   Meta Muse Spark Open-1026         │
            │   (Hosted on Baseten Engine)        │
            │                                     │
            │  1. Chain-of-Thought Reasoning      │
            │  2. Defect Surface Topology         │
            │  3. Safety & Thermal Risk Grading   │
            │  4. Required Tooling & Torque Specs │
            │  5. Sequential Teardown Protocol    │
            └──────────────────┬──────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
 [ Dynamic Diagnostic Workbench ]     [ ISO Work Order Export ]
 - Interactive Checklist & Confetti   - Printable PDF Engineering Ticket
 - Live Audio Readout (Text-to-Speech) - OEM Component Replacement Specs
 - Raw CoT Thought Chain Inspector
```

---

## 🎬 3-Minute Video Walkthrough Script (Judge-Winning Format)

| Time | Scene | On-Screen Action | Voiceover Script |
|---|---|---|---|
| **0:00 - 0:25** | The Problem | Camera on builder, then cuts to a damaged motherboard / messy engine bay. | *"Billions of dollars of electronics, manufacturing equipment, and appliances are prematurely discarded every year simply because diagnosing physical hardware faults requires decades of specialized engineering experience. Today, LLM chatbots are blind to microscopic physical defects, and static image classifiers only give generic labels without repair procedures. That's why I built FixLens."* |
| **0:25 - 0:55** | Core Demo: Motherboard VRM | Open FixLens in browser. Click on **Capacitor C12**. Show the polygon mask snapping onto the capacitor. | *"FixLens combines Meta's Segment Anything 3.1 with Meta Muse Spark Open. With zero manual prompt engineering, a technician clicks directly on any suspicious component. Here on this desktop motherboard, SAM 3.1 instantly isolates Capacitor C12. FixLens immediately detects positive vent bulging and electrolyte leakage, scores the health at 12/100, and warns of severe ripple voltage on the 12V Vcore rail."* |
| **0:55 - 1:25** | Native Chain-of-Thought | Click **"View Chain-of-Thought"** toggle in the sidebar. | *"FixLens doesn't just guess. Watch the raw Chain-of-Thought reasoning trace streaming directly from Meta Muse Spark Open via Baseten's 2M TPM endpoint. The model reasons through thermal expansion, calculates ESR degradation over 18x nominal, and computes the exact bleed resistor needed to discharge residual voltage safely before desoldering."* |
| **1:25 - 1:55** | 3D Printer & Automotive Scenarios | Switch scenario to **3D Printer Hotend**, then click the **0.4mm Brass Nozzle**. Check off steps 1, 2, and 3. | *"FixLens adapts across diverse hardware domains. Switching to a direct-drive 3D printer hotend, it pinpoints carbonized polymer backpressure leaking across the M6 threads. Technicians get an interactive teardown checklist with exact torque specifications (2.5 Nm at 250°C), audio diagnostic readouts for hands-free servicing, and real-time step verification."* |
| **1:55 - 2:30** | Zero-Shot Live Dynamic Inference | Click any unsegmented coordinate on the canvas or upload a new photo. Watch the live Modal serverless spinner fire. | *"Now let's test zero-shot dynamic inspection. I can click any coordinate on this engine compartment alternator. FixLens streams the bounding coordinates directly to our live Modal serverless cloud backend, executes sub-pixel inference on Meta Muse Spark Open, and returns an instant health index and hazard protocol in under 450 milliseconds."* |
| **2:30 - 3:00** | Work Order & Conclusion | Click **"Export Work Order"**. Modal opens with printable ISO ticket. | *"With one click, technicians export an ISO-compliant engineering work order complete with OEM replacement part numbers, safety alerts, and full reasoning traces for QA logs. Built entirely during the hackathon using Meta open-source intelligence, Baseten high-throughput inference, and Modal serverless compute. FixLens brings AI to physical repair."* |

---

## 🛠️ GitHub Repository & Vercel Deployment Instructions

### Push Local Code to GitHub:
1. Create a new public repository on GitHub named `fixlens`:
   - URL: `https://github.com/new` $\rightarrow$ Name: `fixlens` $\rightarrow$ Public.
2. In PowerShell, link your repository and push:
```powershell
cd "F:\ja"
git remote add origin https://github.com/nitesh369/fixlens.git
git branch -M main
git push -u origin main
```

### Deploy Frontend to Vercel (Free & Instant):
1. Visit [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select your `fixlens` repository.
3. Set **Root Directory** to `frontend`.
4. Click **Deploy**. Vercel will build the React 19 app and assign a live URL (e.g. `https://fixlens-zeta.vercel.app`).
