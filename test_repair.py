import json
from typing import Optional, Dict, Any

def parse_hardware_json(raw_text: str) -> Optional[Dict[str, Any]]:
    if not raw_text:
        return None
    clean = raw_text.strip()
    if "```json" in clean:
        clean = clean.split("```json")[1].split("```")[0].strip()
    elif "```" in clean:
        clean = clean.split("```")[1].split("```")[0].strip()

    start_idx = clean.find("{")
    if start_idx == -1:
        return None
    clean = clean[start_idx:]

    # Attempt 1: Direct JSON parsing
    try:
        return json.loads(clean)
    except Exception:
        pass

    # Attempt 2: Last closing brace
    last_brace = clean.rfind("}")
    if last_brace != -1:
        try:
            return json.loads(clean[:last_brace + 1])
        except Exception:
            pass

    # Attempt 3: Stack-based auto-closer for truncated output
    in_quote = False
    escape = False
    stack = []
    last_valid_pos = 0

    for idx, ch in enumerate(clean):
        if escape:
            escape = False
            continue
        if ch == "\\":
            escape = True
            continue
        if ch == '"':
            in_quote = not in_quote
            continue
        if not in_quote:
            if ch in ('{', '['):
                stack.append(ch)
            elif ch in ('}', ']'):
                if stack:
                    stack.pop()
                    if not stack:
                        last_valid_pos = idx + 1

    if last_valid_pos > 0:
        try:
            return json.loads(clean[:last_valid_pos])
        except Exception:
            pass

    closure = '"' if in_quote else ''
    for open_ch in reversed(stack):
        closure += '}' if open_ch == '{' else ']'

    for trim in range(0, min(80, len(clean))):
        prefix = clean if trim == 0 else clean[:-trim].rstrip()
        for c in [closure, '"}', '"]}', '}', ']']:
            try:
                return json.loads(prefix + c)
            except Exception:
                continue

    return None

# Test with truncated JSON
t1 = '{"device_name": "3D Printer", "parts": [{"name": "Nozzle", "status": "critical"'
print("T1 result:", parse_hardware_json(t1))

t2 = 'Some preamble\n```json\n{"device_name": "Car Alternator", "parts": []}\n```\nSome postamble'
print("T2 result:", parse_hardware_json(t2))
