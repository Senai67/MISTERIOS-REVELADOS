# 📋 Fragmentos de Código Listos para Copiar

---

## 1. App.jsx - Estado y Funciones

### Estados necesarios

```jsx
import React, { useState } from 'react';

function App() {
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [jumpToParagraph, setJumpToParagraph] = useState(null);

  // ... resto del código
}
```

### Función handleBookClick

```jsx
const handleBookClick = (volume, paragraphId = null) => {
  setSelectedVolume(volume);
  if (paragraphId !== null) {
    setJumpToParagraph(paragraphId);
    setIsChatOpen(false); // Close search when jumping to a book
  } else {
    setJumpToParagraph(null);
  }
  // Smooth scroll to top when switching views
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

### Función handleBack

```jsx
const handleBack = () => {
  setSelectedVolume(null);
  setJumpToParagraph(null);
};
```

---

## 2. App.jsx - Botón Flotante

Copia este bloque completo y pégalo justo antes del cierre de tu layout principal:

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

---

## 3. App.jsx - Importaciones

Añade estas importaciones al inicio de tu `App.jsx`:

```jsx
import React, { useState } from 'react';
import MasterChat from './components/MasterChat/MasterChat';
// ... tus otras importaciones
```

---

## 4. index.css - Estilos Requeridos

### Variables de tema (añadir en :root o @theme)

```css
:root {
  /* 1894 Palette */
  --color-parchment: #F4EBD0;
  --color-parchment-light: #F9F4E8;
  --color-parchment-dark: #E2D1A4;

  /* Ink Colors */
  --color-ink: #2C2C2C;
  --color-ink-light: #4A4A4A;

  /* Gold Colors */
  --color-gold: #B8860B;
  --color-gold-dim: #8B6D2D;
  --color-gold-bright: #D4AF37;
}
```

### Animaciones

```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
```

### Clases utilitarias

```css
/* Borde decorativo tipo pergamino */
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

/* Sombra mística */
.shadow-mystic {
  box-shadow: 0 10px 30px -10px rgba(184, 134, 11, 0.4);
}
```

---

## 5. Estructura de Archivos Requerida

```
tu-proyecto/
├── src/
│   ├── components/
│   │   └── MasterChat/
│   │       └── MasterChat.jsx
│   ├── lib/
│   │   └── search.js
│   ├── data/
│   │   ├── libros.js
│   │   └── volumes.js
│   ├── App.jsx
│   └── index.css
```

---

## 6. Ejemplo de App.jsx Completo

```jsx
import React, { useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import MasterChat from './components/MasterChat/MasterChat';
// ... tus otras importaciones

function App() {
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [jumpToParagraph, setJumpToParagraph] = useState(null);

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

  const handleBack = () => {
    setSelectedVolume(null);
    setJumpToParagraph(null);
  };

  return (
    <MainLayout>
      {/* Tu contenido principal aquí */}
      
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
    </MainLayout>
  );
}

export default App;
```

---

## 7. Checklist de Verificación

- [ ] Copiar `MasterChat.jsx` a `src/components/MasterChat/`
- [ ] Copiar `search.js` a `src/lib/`
- [ ] Copiar `libros.js` a `src/data/`
- [ ] Copiar `volumes.js` a `src/data/`
- [ ] Importar `MasterChat` en `App.jsx`
- [ ] Añadir estado `isChatOpen` en `App.jsx`
- [ ] Añadir botón flotante en `App.jsx`
- [ ] Añadir componente `<MasterChat />` en `App.jsx`
- [ ] Verificar que las variables CSS existan en `index.css`
- [ ] Verificar que las animaciones existan en `index.css`
- [ ] Probar el botón en el navegador

---
