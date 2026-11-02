# FixLens: Multimodal Visual Hardware & Appliance Diagnostic Copilot

> 🏆 Built for the **Meta Global AI Developer Hackathon 2026** — Indie Developer Track  
> 🧠 Powered by **Meta Muse Spark Open (`meta-models/muse-spark-open-1026`)** + **Meta SAM 3.1**  
> ⚡ Accelerated via **Baseten (2M TPM Rate Limits)** & **Modal Serverless Cloud GPUs**  
> 📱 Installable **Progressive Web App (PWA)** for Mobile & Desktop

---

## 🌟 The Problem: Repair Paralysis & E-Waste
Every day, millions of people worldwide throw away appliances, car parts, 3D printers, or consumer electronics simply because they **cannot name what is broken, don't know what tool to use, and are terrified of electric shock or damaging the device**. 

Traditional LLMs (ChatGPT, Claude) fail here because they lack **spatial physical grounding** — they output generic paragraphs without pointing to the physical millimeters where the problem lies.

## 🚀 The FixLens Solution
FixLens is an autonomous multimodal hardware metrology copilot that translates complex machinery into simple 15-minute DIY repairs:
1. **Zero-Shot Point & Box Segmentation (Meta SAM 3.1):** Precision translucent polygon masks highlight the exact defect on the photograph with silkscreen identifier tags (`N1`, `HB1`, `TH1`).
2. **Deep Physical Metrology (Meta Muse Spark Open):** Over **11,000 characters of Chain-of-Thought (CoT) physical reasoning** inspecting surface textures, micro-cracks, copper corrosion patina, and solder joint degradation.
3. **Beginner "What Is This & What To Do" Translation:** Explains what the machine does in daily life, whether a complete beginner can safely fix it, and calculates **💰 Estimated DIY Savings** (e.g. *"$180 - $350 saved vs complete replacement"*).
4. **Step-to-Canvas AR Radar Pings:** Clicking or hovering over any repair step pings the exact component on the photo canvas with radar feedback.
5. **Interactive Multimodal AI Copilot:** A conversational assistant preloaded with the photo context, multimeter tolerances, and safety instructions.
6. **Enterprise PDF Work Order:** Generates print-ready ISO/OEM engineering tickets complete with autonomous metrology checksums and component health scores.

---

## 🏗️ System Architecture

```
[ Smartphone / Desktop Camera ]
              │ (High-Res Image Capture)
              ▼
    [ FixLens PWA (React 19 + Tailwind v4) ]
              │ (Base64 WebP / JPEG payload)
              ▼
   [ Modal Serverless Cloud GPU Cluster (US-East) ]
      ├── /analyze-image (Multimodal Vision Teardown)
      ├── /chat (Multimodal Repair Assistant)
      ├── /diagnose (Sub-pixel Component Inspection)
      └── /health (Live Cluster Telemetry)
              │ (OpenAI SDK + Baseten 2M TPM)
              ▼
[ Meta Muse Spark Open (`meta-models/muse-spark-open-1026`) ]
   ├── 8,192 Token Ceiling
   ├── 11,000+ Chars Chain-of-Thought (CoT) Physical Reasoning
   └── Multi-Component Spatial Coordinates (0-100% Normalized)
```

---

## 🌐 Live Cloud Endpoints (Modal US-East)

| Endpoint | Method | Function |
| :--- | :--- | :--- |
| `https://nitesh-naasai--fixlens-backend-analyze-image.us-east.modal.run` | `POST` | Full multimodal topological teardown & defect localization |
| `https://nitesh-naasai--fixlens-backend-chat.us-east.modal.run` | `POST` | Conversational hardware assistant with visual grounding |
| `https://nitesh-naasai--fixlens-backend-diagnose.us-east.modal.run` | `POST` | Sub-pixel point diagnosis with multimeter test specs |
| `https://nitesh-naasai--fixlens-backend-health.us-east.modal.run` | `GET` | Microservice cluster telemetry & health check |

---

## 💻 Local Setup & Execution

### 1. Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.  
Click the **"📱 Mobile PWA"** toggle in the navbar to test the native mobile view with touch navigation and dynamic island!

### 2. Backend (Modal Cloud Deploy)
```bash
cd backend
modal deploy modal_app.py
```

---

## 🎬 2-Minute Hackathon Demo Script (For Cerebral Valley / Devpost)

- **0:00 - 0:25 (The Hook):** Show a broken 3D printer hotend or car alternator. Explain that repair shops charge $150 just to diagnose, while millions of appliances end up in landfills because non-technical users don't know what's broken.
- **0:25 - 1:00 (Live Capture & Teardown):** Snap a photo using FixLens. Watch the animated **FIXLENS** bootloader. Show the instant topological breakdown: Brass Nozzle (Critical), Aluminum Heater Block (Warning), Heatsink, and Wiring Harness.
- **1:00 - 1:30 (Beginner Guide & DIY Savings):** Point to *"What Is This & What To Do"*. Show *"💰 Est. DIY Savings: $45 - $95 vs hotend replacement"*. Click Step 1 in the checklist — show the live radar ping highlighting the nozzle on the photo.
- **1:30 - 1:45 (Multimodal Chat & CoT Reasoning):** Ask the AI Copilot: *"Can I touch this with bare hands?"*. Show the verified **11,000+ character Chain-of-Thought (CoT)** reasoning trace from Meta Muse Spark Open.
- **1:45 - 2:00 (Closing):** Click *"Print / Save PDF Work Order"* to show the enterprise engineering ticket. Conclude: *"FixLens democratizes physical hardware intelligence and accelerates the global Right-to-Repair movement."*

---

## 👥 Authors & Acknowledgments
- **Builder:** Nitesh (`nitesh.naasai@gmail.com` / `nitesh369`) — Solo Builder (Indie Developer Track)
- **Built for:** Meta Global AI Developer Hackathon 2026 on Cerebral Valley
- **Powered by:** Meta Muse Spark Open, Meta SAM 3.1, Modal Serverless, Baseten
