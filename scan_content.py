import os
import re

base_path = r'c:\DEV\ANTIGRAVITY\MISTERIOS-REVELADOS\misterios-revelados-app\public\content'

results = []

for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith('.md'):
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, base_path)
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    first_20 = "".join(lines[:20])
                    # Try to find Chapter Number and Title
                    # Looking for patterns like "CAPÍTULO -I-" or "DISCURSO I"
                    cap_match = re.search(r'CAP\w+TULO\s+-(I|V|X|L|C)+-', first_20, re.IGNORECASE)
                    if not cap_match:
                         cap_match = re.search(r'DISCURSO\s+(I|V|X|L|C)+', first_20, re.IGNORECASE)
                    
                    # Try to find title (usually on a new line after chapter)
                    title = "Unknown"
                    if cap_match:
                        # Find the next non-empty line after the chapter match
                        line_index = 0
                        for i, line in enumerate(lines[:20]):
                             if cap_match.group(0) in line:
                                 line_index = i
                                 break
                        for line in lines[line_index+1:line_index+5]:
                            if line.strip() and not re.match(r'^-(I|V|X|L|C)+-$', line.strip()):
                                title = line.strip()
                                break
                    
                    results.append({
                        "path": rel_path,
                        "size": len(lines),
                        "cap": cap_match.group(0) if cap_match else "None",
                        "title": title,
                        "preview": first_20[:100].replace('\n', ' ')
                    })
            except Exception as e:
                results.append({"path": rel_path, "error": str(e)})

for res in sorted(results, key=lambda x: x['path']):
    if "error" in res:
        print(f"{res['path']}: ERROR {res['error']}")
    else:
        print(f"{res['path']} ({res['size']} lines) [{res['cap']}]: {res['title']}")
