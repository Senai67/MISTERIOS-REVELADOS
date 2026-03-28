"""
Script para limpiar contenido de archivos .md
- Elimina el índice/tabla de contenidos del Volumen III
- Elimina caracteres raros como 
"""

import os
import re

CONTENT_DIR = os.path.join(os.path.dirname(__file__), 'public', 'content')

# Texto del índice a eliminar (Volumen III - Discursos del I AM)
INDEX_PATTERN = r'Por El Amado Saint Germain\s*[\s]*\s*INDICE\s*Tema\s*Página.*?AGRADECIMIENTO DEL AUTOR\s*Reconozco con sincera gratitud.*?en su presente y espléndida forma\.'

# Caracteres raros a eliminar
WEIRD_CHARS = ['', '', '', '']

def clean_file(filepath):
    """Limpia un archivo .md"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return False
    
    original = content
    
    # Eliminar índice/tabla de contenidos (solo en Volumen III)
    content = re.sub(INDEX_PATTERN, '', content, flags=re.DOTALL | re.IGNORECASE)
    
    # Eliminar caracteres raros
    for char in WEIRD_CHARS:
        content = content.replace(char, '')
    
    # Eliminar líneas que solo contengan caracteres raros repetidos
    lines = content.split('\n')
    cleaned_lines = []
    for line in lines:
        # Si la línea solo tiene caracteres raros o espacios, saltarla
        clean_line = line.strip()
        if clean_line and not re.match(r'^[\s]*$', clean_line):
            cleaned_lines.append(line)
    
    content = '\n'.join(cleaned_lines)
    
    # Solo escribir si hubo cambios
    if content != original:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Limpiado: {filepath}")
            return True
        except Exception as e:
            print(f"Error writing {filepath}: {e}")
            return False
    
    return False

def main():
    """Procesa todos los archivos .md en content/"""
    cleaned_count = 0
    total_count = 0
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        # Saltar carpetas _bak
        if '_bak' in root:
            continue
            
        for file in files:
            if file.endswith('.md'):
                total_count += 1
                filepath = os.path.join(root, file)
                if clean_file(filepath):
                    cleaned_count += 1
    
    print(f"\n{'='*50}")
    print(f"Archivos procesados: {total_count}")
    print(f"Archivos modificados: {cleaned_count}")
    print(f"{'='*50}")

if __name__ == '__main__':
    main()
