# 🧙‍♂️ ChatBot "Pregunta al Maestro" - Guía de Instalación

> Paquete de exportación para integrar el buscador de manuscritos en tu proyecto **MISTERIOS-REVELADOS**

---

## 📦 Contenido del Paquete

```
EXPORT_CHATBOT/
├── README.md                      ← Este archivo
├── README.md                      ← Instrucciones detalladas
├── CODE_SNIPPETS.md               ← Fragmentos de código listos para copiar
└── src/
    ├── App.jsx.template           ← Plantilla de App.jsx
    ├── components/
    │   └── MasterChat/
    │       └── MasterChat.jsx     ← Componente del chat
    ├── lib/
    │   └── search.js              ← Motor de búsqueda
    └── data/
        └── volumes.js             ← Metadatos de volúmenes
```

---

## 🚀 Instalación Rápida (5 pasos)

### Paso 1: Copiar la carpeta `src`

Copia todo el contenido de `EXPORT_CHATBOT/src/` a tu proyecto:

```
MISTERIOS-REVELADOS/
├── src/
│   ├── components/
│   │   └── MasterChat/
│   │       └── MasterChat.jsx     ✅ COPIAR
│   ├── lib/
│   │   └── search.js              ✅ COPIAR
│   └── data/
│       └── volumes.js             ✅ COPIAR
```

### Paso 2: Copiar `libros.js` (tu contenido)

El buscador necesita tu contenido. Copia tu archivo `libros.js` existente:

```
MISTERIOS-REVELADOS/
└── src/
    └── data/
        └── libros.js              ✅ DEBES TENERLO (tu contenido)
```

> **Nota:** `libros.js` NO está incluido en este paquete porque contiene el contenido específico de tu proyecto. Debes usar el tuyo propio.

### Paso 3: Modificar `App.jsx`

Añade las siguientes partes a tu `App.jsx`:

#### 3.1. Importación

```jsx
import MasterChat from './components/MasterChat/MasterChat';
```

#### 3.2. Estado

```jsx
const [isChatOpen, setIsChatOpen] = useState(false);
```

#### 3.3. Botón (antes de `</MainLayout>`)

```jsx
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
```

#### 3.4. Componente del chat

```jsx
<MasterChat
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}
  onNavigateToBook={handleBookClick}
/>
```

### Paso 4: Verificar CSS

Asegúrate de tener en tu `index.css`:

```css
:root {
  --color-parchment: #F4EBD0;
  --color-gold: #B8860B;
  --color-gold-dim: #8B6D2D;
  /* ... ver CODE_SNIPPETS.md para todas las variables */
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ... ver CODE_SNIPPETS.md para todas las animaciones */
```

### Paso 5: ¡Probar!

Ejecuta tu proyecto y haz clic en el botón dorado de la esquina inferior derecha.

---

## 📋 Checklist de Verificación

Antes de probar, verifica:

- [ ] `MasterChat.jsx` copiado en `src/components/MasterChat/`
- [ ] `search.js` copiado en `src/lib/`
- [ ] `volumes.js` copiado en `src/data/`
- [ ] `libros.js` existe en `src/data/` (tu contenido)
- [ ] Importación de `MasterChat` añadida en `App.jsx`
- [ ] Estado `isChatOpen` declarado en `App.jsx`
- [ ] Botón flotante añadido en `App.jsx`
- [ ] Componente `<MasterChat />` añadido en `App.jsx`
- [ ] Función `handleBookClick` definida en `App.jsx`
- [ ] Variables CSS en `index.css`
- [ ] Animaciones CSS en `index.css`

---

## 🔧 Personalización

### Cambiar colores del botón

Edita las clases Tailwind en el botón:

```jsx
className="fixed bottom-8 right-8 z-40 bg-[TU_COLOR] ..."
```

### Cambiar posición del botón

Modifica `bottom-8 right-8` por:
- `bottom-8 left-8` → esquina inferior izquierda
- `top-8 right-8` → esquina superior derecha
- `top-8 left-8` → esquina superior izquierda

### Cambiar mensaje de bienvenida

En `MasterChat.jsx`, línea 8:

```jsx
{ role: 'master', text: 'TU MENSAJE AQUÍ' }
```

### Cambiar placeholder del input

En `MasterChat.jsx`, línea ~178:

```jsx
placeholder="TU TEXTO AQUÍ..."
```

---

## 🐛 Problemas Comunes

| Problema | Solución |
|----------|----------|
| El botón no aparece | Verifica que el estado `isChatOpen` esté inicializado y que `z-40` no sea sobrescrito |
| El chat no se abre | Comprueba que `onClick={() => setIsChatOpen(true)}` esté correcto |
| La búsqueda no funciona | Asegúrate de que `libros.js` tenga contenido y esté importado en `search.js` |
| Los resultados no navegan | Verifica que `handleBookClick` esté conectado correctamente |
| Error "LIBROS no definido" | Copia tu `libros.js` a `src/data/` |
| Estilos rotos | Verifica que las variables CSS existan en `index.css` |

---

## 📞 Archivos de Referencia

| Archivo | Descripción |
|---------|-------------|
| `README.md` | Instrucciones detalladas paso a paso |
| `CODE_SNIPPETS.md` | Fragmentos de código listos para copiar y pegar |
| `src/App.jsx.template` | Plantilla completa de App.jsx |
| `src/components/MasterChat/MasterChat.jsx` | Componente del chat (NO MODIFICAR) |
| `src/lib/search.js` | Motor de búsqueda (NO MODIFICAR) |
| `src/data/volumes.js` | Metadatos de volúmenes (ADAPTABLE) |

---

## 📝 Notas Importantes

1. **`libros.js` es tu contenido** - Debes usar tu propio archivo con el contenido de tu proyecto
2. **`volumes.js` es opcional** - Si no usas navegación por volúmenes, puedes omitirlo
3. **El buscador indexa automáticamente** - Al abrir el chat por primera vez, se indexa todo el contenido
4. **Máximo 20 resultados** - La búsqueda devuelve hasta 20 coincidencias ordenadas por relevancia

---

## ✨ Características Incluidas

- ✅ Botón flotante con animación hover
- ✅ Modal de chat con backdrop blur
- ✅ Búsqueda en tiempo real
- ✅ Resultados navegables
- ✅ Animaciones suaves
- ✅ Diseño responsive
- ✅ Estilo "pergamino antiguo"
- ✅ Mensajes de estado (buscando, sin resultados)
- ✅ Botón de limpiar búsqueda
- ✅ Soporte para acentos y mayúsculas/minúsculas

---

**¡Listo!** Una vez completada la instalación, el botón debería funcionar exactamente como en el proyecto original.

Para cualquier duda, consulta `CODE_SNIPPETS.md` para ver fragmentos listos para copiar.
