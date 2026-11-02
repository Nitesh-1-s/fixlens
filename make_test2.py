import os, sys, json, codecs
sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

with open("F:/ja/scratch_test.py", "r", encoding="utf-8") as f:
    code = f.read()

# Replace the print lines to avoid cp1252 crash
code = code.replace("print('RAW END:\\n', raw[-400:])", "pass")
with open("F:/ja/scratch_test2.py", "w", encoding="utf-8") as f:
    f.write(code)
