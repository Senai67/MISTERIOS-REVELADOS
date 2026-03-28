/**
 * =============================================================================
 * CÓDIGO DE DESCARGA PDF - EXTRAÍDO PARA REPLICACIÓN
 * =============================================================================
 * 
 * Este archivo contiene el código esencial para la funcionalidad de descarga
 * de volúmenes en PDF. Puede ser copiado y adaptado para otros proyectos.
 * 
 * Dependencia requerida: npm install jspdf
 */

import { jsPDF } from 'jspdf';

/**
 * =============================================================================
 * FUNCIÓN PRINCIPAL: handleDownloadPDF
 * =============================================================================
 * 
 * Genera y descarga un PDF con el contenido completo de un volumen/libro.
 * 
 * @param {Object} volume - Objeto con información del volumen
 * @param {string} volume.title - Título del volumen
 * @param {string} volume.id - ID del volumen
 * @param {Object} LIBROS - Objeto con todos los libros y capítulos
 * 
 * @returns {void} - Descarga el PDF automáticamente
 */
export const handleDownloadPDF = (volume, LIBROS) => {
    // 1. Obtener la clave del libro en el objeto LIBROS
    const bookKey = `Vida y Enseñanzas de los Maestros ${volume.id}`;
    const chapters = LIBROS[bookKey];

    // 2. Validar que exista contenido
    if (!chapters || chapters.length === 0) {
        alert("No hay contenido disponible para este volumen aún.");
        return;
    }

    // 3. Crear nueva instancia de jsPDF (formato A4 por defecto)
    const doc = new jsPDF();
    
    // 4. Variables de control de posición
    let currentY = 20;              // Posición Y inicial (mm desde arriba)
    const pageHeight = 280;         // Altura útil de página (mm)
    const marginLeft = 20;          // Margen izquierdo (mm)
    const maxWidth = 170;           // Ancho máximo de texto (mm)

    // 5. Configurar fuente base
    doc.setFont("times", "normal");

    // 6. Agregar título del libro
    doc.setFontSize(22);
    doc.setFont("times", "normal");
    doc.text(volume.title, marginLeft, currentY);
    currentY += 15;  // Espacio después del título

    // 7. Procesar cada capítulo
    chapters.forEach((chapter) => {
        // 7a. Verificar si necesita nueva página antes del capítulo
        if (currentY > pageHeight - 20) {
            doc.addPage();
            currentY = 20;
        }

        // 7b. Agregar título del capítulo
        doc.setFontSize(16);
        doc.setFont("times", "bold");

        // Dividir título en líneas si es muy largo
        const chapterTitleLines = doc.splitTextToSize(chapter.title, maxWidth);
        chapterTitleLines.forEach(line => {
            // Verificar salto de página dentro del título
            if (currentY > pageHeight - 10) { 
                doc.addPage(); 
                currentY = 20; 
            }
            doc.text(line, marginLeft, currentY);
            currentY += 10;  // Espacio después de cada línea del título
        });

        // 7c. Agregar contenido del capítulo
        doc.setFontSize(12);
        doc.setFont("times", "normal");

        // Dividir contenido en líneas
        const contentLines = doc.splitTextToSize(chapter.content, maxWidth);
        contentLines.forEach(line => {
            // Verificar salto de página
            if (currentY > pageHeight - 10) {
                doc.addPage();
                currentY = 20;
            }
            doc.text(line, marginLeft, currentY);
            currentY += 6;  // Interlineado (espacio entre líneas)
        });

        // 7d. Espacio extra después de cada capítulo
        currentY += 10;
    });

    // 8. Generar nombre de archivo seguro (sin caracteres especiales)
    const safeFilename = volume.title.replace(/[: ]+/g, '_');
    
    // 9. Descargar el PDF
    doc.save(`${safeFilename}.pdf`);
};

/**
 * =============================================================================
 * VERSIÓN SIMPLIFICADA (para proyectos más simples)
 * =============================================================================
 * 
 * Esta versión es más genérica y fácil de adaptar a cualquier proyecto.
 * 
 * @param {Object} bookData - Datos del libro
 * @param {string} bookData.title - Título del libro
 * @param {Array} bookData.chapters - Array de capítulos {title, content}
 * @param {string} filename - Nombre del archivo PDF
 */
export const downloadBookAsPDF = (bookData, filename = 'libro') => {
    const doc = new jsPDF();
    let y = 20;
    const pageHeight = 280;
    const margin = 20;
    const contentWidth = 170;

    doc.setFont("times", "normal");

    // Título del libro
    doc.setFontSize(22);
    doc.text(bookData.title, margin, y);
    y += 20;

    // Capítulos
    bookData.chapters.forEach((chapter) => {
        // Salto de página si es necesario
        if (y > pageHeight - 30) {
            doc.addPage();
            y = 20;
        }

        // Título del capítulo
        doc.setFontSize(16);
        doc.setFont("times", "bold");
        const titleLines = doc.splitTextToSize(chapter.title, contentWidth);
        titleLines.forEach(line => {
            if (y > pageHeight - 10) {
                doc.addPage();
                y = 20;
            }
            doc.text(line, margin, y);
            y += 10;
        });

        // Contenido del capítulo
        doc.setFontSize(12);
        doc.setFont("times", "normal");
        const contentLines = doc.splitTextToSize(chapter.content, contentWidth);
        contentLines.forEach(line => {
            if (y > pageHeight - 10) {
                doc.addPage();
                y = 20;
            }
            doc.text(line, margin, y);
            y += 6;
        });

        y += 10; // Espacio post-capítulo
    });

    doc.save(`${filename}.pdf`);
};

/**
 * =============================================================================
 * EJEMPLO DE USO
 * =============================================================================
 */

// Ejemplo 1: Usando la función completa
/*
import { handleDownloadPDF } from './pdfDownload';
import { LIBROS } from './data/libros';

const volume = {
    id: 1,
    title: "El Primer Maestro"
};

<button onClick={() => handleDownloadPDF(volume, LIBROS)}>
    Descargar PDF
</button>
*/

// Ejemplo 2: Usando la versión simplificada
/*
import { downloadBookAsPDF } from './pdfDownload';

const bookData = {
    title: "Mi Libro Increíble",
    chapters: [
        { title: "Capítulo 1", content: "Érase una vez..." },
        { title: "Capítulo 2", content: "Entonces sucedió..." }
    ]
};

<button onClick={() => downloadBookAsPDF(bookData, 'mi-libro')}>
    Descargar PDF
</button>
*/

export default { handleDownloadPDF, downloadBookAsPDF };
