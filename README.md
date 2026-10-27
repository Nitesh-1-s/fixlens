# FixLens: Real-Time Visual Hardware & Appliance Diagnostic Copilot

> Built for the **Meta Global AI Developer Hackathon 2026** — Indie Developer Track  
> Powered by **SAM 3.1**, **Muse Spark Open (`meta-models/muse-spark-open-1026`)**, and **Muse Image**  
> Accelerated via **Baseten (2M TPM Rate Limits)** and **Modal Cloud GPUs**

---

## 🌟 Overview
FixLens is an interactive visual repair workbench that bridges the gap between complex physical machinery and automated AI diagnostic intelligence. 

Instead of traditional generic text chatbots or static image analyzers, FixLens allows a technician, engineer, or DIY maker to point a camera or upload video/photos of complex hardware (PC motherboards, 3D printers, automotive engine bays, or robotics), **click on any component**, and instantly trigger:
1. **Zero-Shot Point Segmentation (SAM 3.1):** Pixel-perfect interactive polygon segmentation masks that isolate the component in real time.
2. **Multimodal Visual Reasoning (Muse Spark Open):** Deep defect identification (e.g., bulging capacitor vents, thermal MOSFET discoloration, frayed thermistor leads, copper sulfate corrosion).
3. **Autonomous Agentic Repair Workflow:** Step-by-step interactive teardown checklist, safety hazard warnings, and mandatory tool lists.
4. **Target State Preview (Muse Image):** Visual reference synthesis of what the repaired component should look like when properly serviced.
5. **Printable Engineering Work Orders:** One-click ISO-compliant diagnostic report generation.

---

## 🚀 Quickstart & Local Execution

### 1. Frontend (React + Vite + Tailwind CSS)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Backend (FastAPI / Python)
```bash
cd backend
pip install -r requirements.txt
python main.py
```
API runs at [http://localhost:8000](http://localhost:8000) (Swagger docs at `/docs`).

---

## 🛠️ Tech Stack & Meta Model Synergy
* **Frontend:** React 19, Tailwind CSS v4, HTML5 Canvas, Lucide Icons, Canvas Confetti.
* **Vision Segmentation:** Meta **SAM 3.1** zero-shot point & box prompt engine.
* **Reasoning LLM:** Meta **Muse Spark Open (`meta-models/muse-spark-open-1026`)**.
* **Cloud Infrastructure:** **Modal** Serverless GPU Endpoints & **Baseten** high-throughput inference (2M TPM).
