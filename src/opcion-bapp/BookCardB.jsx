const IMAGENES_OPCION_B = {
  0: '/OpcionB/portada-IAM.png',
  1: '/OpcionB/misterios-revelados.png',
  2: '/OpcionB/la-presencia-magica.png',
  3: '/OpcionB/discursos-IAM.png'
}

export default function BookCardB({ book, onClick }) {
  const imagenOpcionB = IMAGENES_OPCION_B[book.id] || book.imagen

  return (
    <article
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={() => onClick(book)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(book)
        }
      }}
      aria-label={`Leer ${book.titulo}`}
    >
      <div
        className="rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col"
        style={{
          backgroundColor: book.color,
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}
      >
        {/* Titulo superior - sin pastilla de fondo, 3 puntos más grande */}
        <div className="pt-4 pb-2 text-center">
          <p
            className="uppercase tracking-widest"
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.875rem' // text-sm (3 puntos más que text-xs)
            }}
          >
            {book.volumen}
          </p>
        </div>

        {/* Imagen del libro - centrada y más grande (30%) */}
        <div
          className="relative h-64 sm:h-72 md:h-80 overflow-hidden px-4 flex items-center justify-center"
          style={{
            textAlign: 'center',
            paddingTop: '0.5rem', // py-2 (menos padding arriba = libros suben)
            paddingBottom: '2.5rem'  // pb-10
          }}
        >
          <img
            src={imagenOpcionB}
            alt={`Portada de ${book.titulo}`}
            className="object-contain"
            style={{
              maxWidth: '130%',
              maxHeight: '130%',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))'
            }}
          />
        </div>

        {/* Botón inferior */}
        <div
          className="p-4 text-center flex-grow flex items-center justify-center"
          style={{ backgroundColor: book.colorInferior || 'rgba(0,0,0,0.25)' }}
        >
          <button
            className="px-6 py-1.5 text-xs uppercase tracking-wider transition-all duration-200"
            style={{
              border: '1px solid rgba(255,255,255,0.8)',
              color: '#FFFFFF',
              backgroundColor: 'transparent',
              fontFamily: 'Cinzel, serif',
              borderRadius: '3px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f0c43a'
              e.target.style.borderColor = '#f0c43a'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.borderColor = 'rgba(255,255,255,0.8)'
            }}
          >
            LEER
          </button>
        </div>
      </div>
    </article>
  )
}
