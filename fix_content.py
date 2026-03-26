import os
import shutil

# Absolute path
base_path = r'c:\DEV\ANTIGRAVITY\MISTERIOS-REVELADOS\misterios-revelados-app\public\content'

def stitch(target_rel, source_rels):
    target_path = os.path.join(base_path, target_rel)
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as outfile:
        for s_rel in source_rels:
            s_path = os.path.join(base_path, s_rel)
            if os.path.exists(s_path):
                with open(s_path, 'r', encoding='utf-8') as infile:
                    outfile.write(infile.read())
                    outfile.write("\n\n")
            else:
                print(f"Warning: Source not found: {s_path}")

# Phase 1: Create temp directory to avoid overwriting issues
temp_path = os.path.join(base_path, 'temp_fix')
if os.path.exists(temp_path):
    shutil.rmtree(temp_path)
os.makedirs(temp_path)

# Volume 1 Stitching
print("Stitching Volume 1...")
stitch('temp_fix/v1/cap01.md', ['v1/cap01.md', 'v1/cap02.md'])
stitch('temp_fix/v1/cap02.md', ['v1/cap03.md', 'v1/cap04.md'])
stitch('temp_fix/v1/cap03.md', ['v1/cap05.md', 'v1/cap06.md'])
stitch('temp_fix/v1/cap04.md', ['v1/cap07.md', 'v1/cap08.md'])
stitch('temp_fix/v1/cap05.md', ['v1/cap09.md', 'v1/cap10.md'])
stitch('temp_fix/v1/cap06.md', ['v1/cap11.md', 'v1/cap12.md'])
stitch('temp_fix/v1/cap07.md', ['v1/cap13.md', 'v1/cap14.md', 'v2/cap00.md'])
stitch('temp_fix/v1/cap08.md', ['v2/cap01.md'])
stitch('temp_fix/v1/cap09.md', ['v2/cap02.md'])
stitch('temp_fix/v1/intro.md', ['v1/cap00.md'])

# Volume 2 Moving
print("Moving Volume 2...")
stitch('temp_fix/v2/cap01.md', ['v2/cap03.md'])
stitch('temp_fix/v2/cap02.md', ['v2/cap04.md'])
stitch('temp_fix/v2/cap03.md', ['v2/cap05.md'])
stitch('temp_fix/v2/cap04.md', ['v2/cap06.md'])
stitch('temp_fix/v2/cap05.md', ['v2/cap07.md'])
stitch('temp_fix/v2/cap06.md', ['v2/cap08.md'])
stitch('temp_fix/v2/cap07.md', ['v2/cap09.md'])
stitch('temp_fix/v2/cap08.md', ['v2/cap10.md'])
stitch('temp_fix/v2/cap09.md', ['v2/cap11.md'])
stitch('temp_fix/v2/cap10.md', ['v2/cap12.md'])
stitch('temp_fix/v2/cap11.md', ['v2/cap13.md'])

# Volume 3 Rename
print("Stitching Volume 3...")
stitch('temp_fix/v3/intro.md', ['v3/discurso00.md'])
for i in range(1, 34):
    num = str(i).padStart(2, '0')
    stitch(f'temp_fix/v3/discurso{num}.md', [f'v3/discurso{num}.md'])

# Phase 2: Replace old directories with new ones
def replace_dir(vol):
    old_dir = os.path.join(base_path, vol)
    target_dir = os.path.join(temp_path, vol)
    if os.path.exists(target_dir):
        # Backup old dir just in case
        backup_dir = old_dir + "_bak"
        if os.path.exists(backup_dir):
            shutil.rmtree(backup_dir)
        os.rename(old_dir, backup_dir)
        os.rename(target_dir, old_dir)
        print(f"Replaced {vol} with fixed content.")

# For discursos, padStart is not in python, use .zfill()
# Actually let's rewrite the Volume 3 loop properly
# (I'll just do it in the final script)
