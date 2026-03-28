# 📜 Implementación de Descarga de Volúmenes en PDF

## Descripción General

Esta documentación explica cómo está implementada la funcionalidad de descarga de volúmenes/libros en formato PDF en la aplicación **Maestros del Lejano Oriente**. El objetivo es que una IA pueda entender y replicar esta funcionalidad en otra web.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.2.0 | Framework UI |
| **jsPDF** | 4.2.0 | Generación de PDFs |
| **Vite** | 7.3.1 | Build tool |

---

## 📦 Instalación de Dependencias

```bash
npm install jspdf
```

---

## 🏗️ Arquitectura del Componente

El componente principal es `ManuscriptView.jsx`, ubicado en:
```
src/components/Manuscript/ManuscriptView.jsx
```

### Estructura del Componente

```jsx
import { jsPDF } from 'jspdf';
import { LIBROS } from '../../data/libros';

const ManuscriptView = ({ volume, onBack, jumpToParagraph }) => {
    // ... estado y lógica
    
    const handleDownloadPDF = () => {
        // Lógica de generación del PDF
    };
    
    // ... renderizado
};
```

---

## 📝 Función `handleDownloadPDF` - Explicación Detallada

### Código Completo

```jsx
const handleDownloadPDF = () => {
    // 1. Obtener los datos del volumen actual
    const bookKey = `Vida y Enseñanzas de los Maestros ${volume.id}`;
    const chapters = LIBROS[bookKey];

    // 2. Validar que exista contenido
    if (!chapters || chapters.length === 0) {
        alert("No hay contenido disponible para este volumen aún.");
        return;
    }

    // 3. Crear nueva instancia de jsPDF
    const doc = new jsPDF();
    let currentY = 20;  // Posición vertical inicial (márgen superior)
    const pageHeight = 280;  // Altura útil de la página (A4 es ~297mm)

    // 4. Configurar fuente por defecto
    doc.setFont("times", "normal");

    // 5. Agregar título del libro
    doc.setFontSize(22);
    doc.text(volume.title, 20, currentY);  // (texto, x, y)
    currentY += 15;  // Avanzar posición Y

    // 6. Iterar sobre cada capítulo
    chapters.forEach((chapter) => {
        // 6a. Verificar si necesitamos nueva página
        if (currentY > pageHeight - 20) {
            doc.addPage();
            currentY = 20;
        }

        // 6b. Agregar título del capítulo
        doc.setFontSize(16);
        doc.setFont("times", "bold");

        // Dividir título largo en múltiples líneas (ancho máximo: 170mm)
        const chapterTitleLines = doc.splitTextToSize(chapter.title, 170);
        chapterTitleLines.forEach(line => {
            if (currentY > pageHeight - 10) { 
                doc.addPage(); 
                currentY = 20; 
            }
            doc.text(line, 20, currentY);
            currentY += 10;
        });

        // 6c. Agregar contenido del capítulo
        doc.setFontSize(12);
        doc.setFont("times", "normal");

        // Dividir contenido en líneas que quepan en el ancho
        const contentLines = doc.splitTextToSize(chapter.content, 170);
        contentLines.forEach(line => {
            if (currentY > pageHeight - 10) {
                doc.addPage();
                currentY = 20;
            }
            doc.text(line, 20, currentY);
            currentY += 6;  // Espacio entre líneas (interlineado)
        });

        currentY += 10;  // Espacio extra después de cada capítulo
    });

    // 7. Guardar/descargar el PDF
    doc.save(`${volume.title.replace(/[: ]+/g, '_')}.pdf`);
};
```

---

## 🔍 Explicación Paso a Paso para IA

### 1. **Inicialización del Documento PDF**

```js
const doc = new jsPDF();
```
- Crea una nueva instancia de jsPDF con configuración por defecto (formato A4, orientación vertical)

### 2. **Gestión de Coordenadas**

```js
let currentY = 20;
const pageHeight = 280;
```
- `currentY`: Posición vertical actual (empieza en 20mm desde el borde superior)
- `pageHeight`: Altura máxima útil antes de agregar nueva página

### 3. **Configuración de Fuentes**

```js
doc.setFont("times", "normal");      // Tipo y peso de fuente
doc.setFontSize(22);                  // Tamaño en puntos
```

Opciones disponibles:
- **Fuentes**: `times`, `helvetica`, `courier`
- **Estilos**: `normal`, `bold`, `italic`, `bolditalic`

### 4. **Agregar Texto**

```js
doc.text(texto, x, y);
```
- `texto`: Contenido a escribir
- `x`: Posición horizontal (mm desde borde izquierdo)
- `y`: Posición vertical (mm desde borde superior)

### 5. **Dividir Texto en Múltiples Líneas**

```js
const lines = doc.splitTextToSize(texto, anchoMaximo);
```
- Divide un texto largo en líneas que quepan en un ancho específico (en mm)
- Retorna un array de strings

### 6. **Agregar Nueva Página**

```js
doc.addPage();
```
- Crea una nueva página en blanco
- Necesario cuando `currentY` excede el límite

### 7. **Guardar/Descargar**

```js
doc.save('nombre_archivo.pdf');
```
- Descarga el PDF generado en el navegador del usuario

---

## 🎨 Estilos y Formato Aplicados

| Elemento | Fuente | Tamaño | Estilo | Espaciado |
|----------|--------|--------|--------|-----------|
| Título del Libro | Times | 22pt | Normal | 15mm después |
| Título de Capítulo | Times | 16pt | Bold | 10mm después |
| Contenido | Times | 12pt | Normal | 6mm entre líneas |
| Espacio post-capítulo | - | - | - | 10mm |

---

## 📊 Flujo de Trabajo

```
┌─────────────────────┐
│  Usuario hace clic  │
│  en "Descargar PDF" │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Obtener datos del  │
│  volumen (LIBROS)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Validar contenido  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Crear jsPDF        │
│  - Configurar fuente│
│  - Agregar título   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Por cada capítulo: │
│  1. Chequear página │
│  2. Agregar título  │
│  3. Agregar contenido│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Guardar PDF        │
│  (descarga automática)│
└─────────────────────┘
```

---

## 🔧 Botón de Descarga en la UI

```jsx
<button
    onClick={handleDownloadPDF}
    className="px-8 py-3 border border-ink/20 text-ink font-display tracking-widest hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
>
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
    Descargar Manuscrito
</button>
```

---

## 📋 Estructura de Datos Requerida

### `LIBROS` (desde `src/data/libros.js`)

```js
{
    "Vida y Enseñanzas de los Maestros 1": [
        {
            title: "Título del Capítulo",
            content: "Contenido del capítulo..."
        },
        // ... más capítulos
    ],
    // ... más volúmenes
}
```

### `volume` Object (prop)

```js
{
    id: 1,
    title: "Título del Volumen",
    summary: "Descripción breve...",
    milestones: [
        { title: "...", description: "..." }
    ]
}
```

---

## 🚀 Cómo Replicar en Otra Web

### Paso 1: Instalar jsPDF
```bash
npm install jspdf
```

### Paso 2: Crear Función de Descarga
```js
import { jsPDF } from 'jspdf';

const downloadAsPDF = (data, filename) => {
    const doc = new jsPDF();
    let y = 20;
    
    doc.setFont("times", "normal");
    doc.setFontSize(22);
    doc.text(data.title, 20, y);
    y += 15;
    
    data.chapters.forEach(chapter => {
        if (y > 260) { doc.addPage(); y = 20; }
        
        doc.setFontSize(16);
        doc.setFont("times", "bold");
        const titleLines = doc.splitTextToSize(chapter.title, 170);
        titleLines.forEach(line => {
            doc.text(line, 20, y);
            y += 10;
        });
        
        doc.setFontSize(12);
        doc.setFont("times", "normal");
        const contentLines = doc.splitTextToSize(chapter.content, 170);
        contentLines.forEach(line => {
            if (y > 260) { doc.addPage(); y = 20; }
            doc.text(line, 20, y);
            y += 6;
        });
        y += 10;
    });
    
    doc.save(`${filename}.pdf`);
};
```

### Paso 3: Conectar a Botón
```jsx
<button onClick={() => downloadAsPDF(libroData, 'mi-libro')}>
    Descargar PDF
</button>
```

---

## ⚠️ Consideraciones Importantes

1. **Márgenes**: El código usa 20mm de margen izquierdo y superior
2. **Ancho de línea**: 170mm máximo para texto (A4 tiene 210mm de ancho)
3. **Salto de página**: Se detecta cuando `currentY > pageHeight - 20`
4. **Nombre de archivo**: Se sanitiza reemplazando `:` y espacios con `_`

---

## 📚 Recursos Adicionales

- **jsPDF Documentation**: https://github.com/parallax/jsPDF
- **jsPDF API Reference**: https://rawgit.com/parallax/jsPDF/master/docs/jsPDF.html

---

## 📁 Archivos Relacionados en Este Proyecto

| Archivo | Propósito |
|---------|-----------|
| `src/components/Manuscript/ManuscriptView.jsx` | Componente principal con `handleDownloadPDF` |
| `src/data/libros.js` | Datos de los volúmenes y capítulos |
| `package.json` | Dependencias del proyecto |

---

*Documentación generada para replicación por IA - Proyecto Maestros del Lejano Oriente*
