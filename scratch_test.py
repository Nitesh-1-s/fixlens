import base64
import json
from openai import OpenAI

client = OpenAI(
    base_url='https://inference.baseten.co/v1',
    api_key='b10_suhwWIGI.SJNUuTKu1Tp7dabl1YztUGCe6aXj8Nsf'
)

with open('F:/ja/frontend/public/images/printer3d.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

prompt = """You are FixLens, a world-class multimodal hardware metrology and physical defect diagnostic intelligence powered by Meta Muse Spark Open.
Perform an expert visual and electromechanical analysis of this hardware photograph.
Utilize your physical reasoning to deeply inspect surface textures, discoloration, mechanical alignment, solder fillets, cracking, oxidation patina, and thermal damage.

Identify the overall device/machine and analyze ALL visible components of interest.
Identify the PRIMARY FAULT as critical or warning, and include 1 to 3 ADJACENT/ASSOCIATED components to provide complete operational context.

Return ONLY a strictly valid JSON response with the following schema, with no conversational preamble or markdown backticks:
{
  "device_name": "Specific device name",
  "layman_summary": "2-3 sentences",
  "layman_fix_guide": "1-2 sentences",
  "beginner_friendly": "Verdict",
  "failure_severity": "HIGH / CRITICAL",
  "estimated_diy_savings": "$savings",
  "parts": [
    {
      "id": "part_1",
      "name": "Component Name",
      "designator": "ID",
      "status": "critical",
      "health_score": 25,
      "confidence": 0.98,
      "bbox": {"x_min": 10.0, "y_min": 10.0, "x_max": 40.0, "y_max": 40.0},
      "center": {"x": 25.0, "y": 25.0},
      "repair_metrics": {
        "difficulty": "Moderate",
        "estimated_time": "20 mins",
        "estimated_cost": "$5.00",
        "risk_rating": "Thermal Hazard"
      },
      "technician_pro_tip": "tip",
      "test_verification": "test",
      "diagnosis": "diag",
      "root_cause": "cause",
      "safety_alert": "alert",
      "tools": ["tool1", "tool2"],
      "steps": ["step1", "step2"],
      "target_spec": "spec"
    }
  ]
}
"""

resp = client.chat.completions.create(
    model='meta-models/muse-spark-open-1026',
    messages=[{
        'role': 'user',
        'content': [
            {'type': 'text', 'text': prompt},
            {'type': 'image_url', 'image_url': {'url': f'data:image/png;base64,{b64}'}}
        ]
    }],
    max_tokens=4096,
    temperature=0.2
)

msg = resp.choices[0].message
raw = msg.content or ''
print('RAW LENGTH:', len(raw))
print('RAW PREVIEW:\n', raw[:600])
print('RAW END:\n', raw[-400:])

with open('F:/ja/raw_response.txt', 'w', encoding='utf-8') as rf:
    rf.write(raw)
