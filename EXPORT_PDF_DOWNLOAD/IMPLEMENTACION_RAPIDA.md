# 🚀 Guía Rápida de Implementación

## Para IA/Desarrolladores que quieren replicar esta funcionalidad

---

## ✅ Checklist de Implementación

### 1. Instalar Dependencia
```bash
npm install jspdf
```

### 2. Importar jsPDF
```js
import { jsPDF } from 'jspdf';
```

### 3. Crear Función de Descarga
```js
const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let currentY = 20;
    
    // Configurar fuente
    doc.setFont("times", "normal");
    
    // Agregar título
    doc.setFontSize(22);
    doc.text("Mi Libro", 20, currentY);
    currentY += 15;
    
    // Agregar capítulos
    chapters.forEach(chapter => {
        // Verificar salto de página
        if (currentY > 260) {
            doc.addPage();
            currentY = 20;
        }
        
        // Título del capítulo
        doc.setFontSize(16);
        doc.setFont("times", "bold");
        const lines = doc.splitTextToSize(chapter.title, 170);
        lines.forEach(line => {
            doc.text(line, 20, currentY);
            currentY += 10;
        });
        
        // Contenido
        doc.setFontSize(12);
        doc.setFont("times", "normal");
        const contentLines = doc.splitTextToSize(chapter.content, 170);
        contentLines.forEach(line => {
            if (currentY > 260) {
                doc.addPage();
                currentY = 20;
            }
            doc.text(line, 20, currentY);
            currentY += 6;
        });
        
        currentY += 10;
    });
    
    // Descargar
    doc.save('mi-libro.pdf');
};
```

### 4. Conectar a Botón
```jsx
<button onClick={handleDownloadPDF}>
    📥 Descargar PDF
</button>
```

---

## 📊 API de jsPDF Utilizada

| Método | Propósito | Parámetros |
|--------|-----------|------------|
| `new jsPDF()` | Crear documento | (opcional: config) |
| `setFont(family, style)` | Configurar fuente | `("times", "normal\|bold")` |
| `setSize(size)` | Tamaño de fuente | `(12)` en puntos |
| `text(text, x, y)` | Agregar texto | `(texto, x_mm, y_mm)` |
| `splitTextToSize(text, width)` | Dividir texto largo | `(texto, ancho_mm)` |
| `addPage()` | Nueva página | - |
| `save(filename)` | Descargar PDF | `("archivo.pdf")` |

---

## 🎯 Parámetros Clave

```js
const CONFIG = {
    marginLeft: 20,           // mm desde borde izquierdo
    marginTop: 20,            // mm desde borde superior
    maxWidth: 170,            // mm ancho máximo de texto
    pageHeight: 280,          // mm altura útil (A4 = 297mm)
    lineHeight: 6,            // mm entre líneas de contenido
    titleSpacing: 10,         // mm después de título
    chapterSpacing: 10,       // mm después de capítulo
    
    // Tamaños de fuente
    fontSizeBookTitle: 22,
    fontSizeChapterTitle: 16,
    fontSizeContent: 12,
};
```

---

## 🔧 Personalización

### Cambiar Fuente
```js
doc.setFont("helvetica", "normal");  // o "courier"
```

### Cambiar Formato de Página
```js
const doc = new jsPDF({
    orientation: 'portrait',  // o 'landscape'
    unit: 'mm',
    format: 'a4'              // o 'letter', 'a3', etc.
});
```

### Agregar Número de Página
```js
const pageCount = doc.internal.getNumberOfPages();
for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Página ${i} de ${pageCount}`, 180, 280);
}
```

### Agregar Imagen/Logo
```js
doc.addImage(imagenData, 'PNG', 20, 20, 50, 50);
```

---

## ⚠️ Errores Comunes y Soluciones

| Problema | Causa | Solución |
|----------|-------|----------|
| Texto se sale de la página | No verificar `currentY` | Chequear antes de cada `text()` |
| Salto de página corta texto | No verificar dentro de líneas | Verificar en cada línea del loop |
| Caracteres raros en PDF | Encoding incorrecto | jsPDF soporta UTF-8 básico |
| PDF muy grande | Mucho texto | Considerar compresión o dividir |

---

## 🧪 Testing

```js
// Test con datos mínimos
const testData = {
    title: "Libro de Prueba",
    chapters: [
        { title: "Cap 1", content: "Contenido corto" },
        { title: "Cap 2", content: "Más contenido..." }
    ]
};

downloadBookAsPDF(testData, 'test');
```

---

## 📁 Estructura de Archivos Sugerida

```
tu-proyecto/
├── src/
│   ├── components/
│   │   └── BookViewer.jsx
│   ├── utils/
│   │   └── pdfDownload.js    ← Funciones PDF
│   └── data/
│       └── books.js          ← Datos de libros
└── package.json
```

---

## 🔗 Referencias

- **jsPDF GitHub**: https://github.com/parallax/jsPDF
- **jsPDF Demo**: https://rawgit.com/parallax/jsPDF/master/examples/basic.html
- **Formato A4**: 210mm × 297mm

---

*Guía creada para replicación rápida - Proyecto Maestros del Lejano Oriente*
