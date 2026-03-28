# 📜 Instrucciones para Integrar el ChatBot "Pregunta al Maestro"

Este documento contiene las instrucciones y el código necesario para integrar el botón flotante con el chatbot de búsqueda en tu proyecto **MISTERIOS-REVELADOS**.

---

## 📋 Resumen de la Funcionalidad

El botón "Pregunta al Maestro" es un componente flotante que abre un modal de chat donde los usuarios pueden buscar contenido dentro de los manuscritos. Incluye:

- **Botón flotante** posicionado en la esquina inferior derecha
- **Modal de chat** con interfaz estilo pergamino antiguo
- **Buscador de texto** que indexa todo el contenido
- **Resultados navegables** que llevan al usuario al fragmento exacto

---

## 🚀 Pasos para la Integración

### Paso 1: Copiar la Estructura de Carpetas

Crea la siguiente estructura en tu proyecto `MISTERIOS-REVELADOS`:

```
src/
├── components/
│   └── MasterChat/
│       ├── MasterChat.jsx
│       └── MasterChat.css (opcional, si quieres separar estilos)
├── lib/
│   └── search.js
└── data/
    ├── libros.js (tu contenido)
    └── volumes.js (metadatos de los volúmenes)
```

---

### Paso 2: Copiar los Archivos de Código

Copia los siguientes archivos desde `MAESTROS_LEJANO_ORIENTE` a tu proyecto:

| Archivo Origen | Archivo Destino |
|---------------|-----------------|
| `src/components/MasterChat/MasterChat.jsx` | `src/components/MasterChat/MasterChat.jsx` |
| `src/lib/search.js` | `src/lib/search.js` |
| `src/data/libros.js` | `src/data/libros.js` |
| `src/data/volumes.js` | `src/data/volumes.js` |

---

### Paso 3: Integrar en App.jsx

#### 3.1. Importar el componente

Añade esta importación en tu `App.jsx`:

```jsx
import MasterChat from './components/MasterChat/MasterChat';
```

#### 3.2. Añadir el estado

En la función `App()`, añade este estado:

```jsx
const [isChatOpen, setIsChatOpen] = useState(false);
```

#### 3.3. Añadir el botón flotante

Justo antes del cierre de `</MainLayout>` o al final del return, añade:

```jsx
{/* Access to the Master - Botón de Búsqueda */}
<button
  onClick={() => setIsChatOpen(true)}
  className="fixed bottom-8 right-8 z-40 bg-parchment shadow-mystic border-2 border-gold/40 p-4 rounded-full hover:scale-110 active:scale-95 transition-all group overflow-hidden"
  title="Pregunta al Maestro"
>
  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
</button>

<MasterChat
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}
  onNavigateToBook={handleBookClick}
/>
```

#### 3.4. Añadir la función de navegación

Asegúrate de tener una función `handleBookClick` que maneje la navegación:

```jsx
const handleBookClick = (volume, paragraphId = null) => {
  setSelectedVolume(volume);
  if (paragraphId !== null) {
    setJumpToParagraph(paragraphId);
    setIsChatOpen(false);
  } else {
    setJumpToParagraph(null);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

---

### Paso 4: Verificar Estilos CSS

El chatbot usa las siguientes clases CSS personalizadas. Asegúrate de que existan en tu `index.css`:

```css
/* Animaciones */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

/* Borde decorativo */
.paper-edge {
  border-style: solid;
  border-width: 1px;
  border-image: linear-gradient(to right, transparent, var(--color-gold), transparent) 1;
}

/* Respuesta del maestro */
.master-response {
  font-style: italic;
  color: var(--color-gold-dim);
}

/* Ocultar scrollbar */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

---

### Paso 5: Variables de Tema

Asegúrate de tener definidas estas variables CSS en tu `:root` o `@theme`:

```css
:root {
  --color-parchment: #F4EBD0;
  --color-parchment-light: #F9F4E8;
  --color-parchment-dark: #E2D1A4;
  --color-ink: #2C2C2C;
  --color-ink-light: #4A4A4A;
  --color-gold: #B8860B;
  --color-gold-dim: #8B6D2D;
  --color-gold-bright: #D4AF37;
}
```

---

## ⚙️ Personalización

### Cambiar el texto del placeholder

En `MasterChat.jsx`, línea ~78:

```jsx
placeholder="Pregunta al Maestro sobre [TU TEMA]..."
```

### Cambiar el mensaje de bienvenida

En `MasterChat.jsx`, línea ~8:

```jsx
{ role: 'master', text: 'TU MENSAJE DE BIENVENIDA' }
```

### Cambiar el mensaje de "no encontrado"

En `MasterChat.jsx`, línea ~55:

```jsx
text: 'TU MENSAJE PERSONALIZADO'
```

---

## 📁 Archivos Incluidos

| Archivo | Descripción |
|---------|-------------|
| `MasterChat.jsx` | Componente principal del chat |
| `search.js` | Motor de búsqueda indexado |
| `libros.js` | Contenido de los manuscritos |
| `volumes.js` | Metadatos de volúmenes |
| `CODE_SNIPPETS.md` | Fragmentos de código listos para copiar |

---

## 🐛 Solución de Problemas

### El botón no aparece
- Verifica que el estado `isChatOpen` esté inicializado
- Comprueba que el CSS `fixed bottom-8 right-8 z-40` no esté siendo sobrescrito

### La búsqueda no funciona
- Asegúrate de que `libros.js` tenga contenido
- Verifica que `librarySearch.init()` se llame correctamente

### Los resultados no navegan
- Confirma que `onNavigateToBook` esté conectado correctamente
- Verifica que `volumes.js` tenga los IDs correctos

---

## 📞 Notas Importantes

1. **El buscador indexa todo el contenido** de `libros.js` automáticamente
2. **Los resultados muestran hasta 20 coincidencias** ordenadas por relevancia
3. **El chat se puede cerrar** haciendo clic en la X o fuera del modal
4. **Presionar Enter** envía la búsqueda

---

**¡Listo!** Una vez copiados los archivos y realizadas las integraciones, el botón debería funcionar exactamente como en el proyecto original.
