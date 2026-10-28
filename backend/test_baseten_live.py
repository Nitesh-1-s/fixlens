import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(dotenv_path="F:/ja/backend/.env")

api_key = os.environ.get("BASETEN_API_KEY")
base_url = os.environ.get("BASETEN_BASE_URL", "https://inference.baseten.co/v1")
model = os.environ.get("MODEL_NAME", "meta-models/muse-spark-open-1026")

client = OpenAI(
    base_url=base_url,
    api_key=api_key,
)

response = client.chat.completions.create(
    model=model,
    messages=[
        {
            "role": "user",
            "content": "Diagnose a bulging 1000uF 16V electrolytic capacitor on a motherboard VRM in 2 sentences."
        }
    ],
    max_tokens=1024,
)

msg = response.choices[0].message
print("=== THINKING / REASONING TRACE ===")
print(msg.reasoning_content[:200] + "...")
print("\n=== FINAL AI DIAGNOSIS ===")
print(msg.content)
