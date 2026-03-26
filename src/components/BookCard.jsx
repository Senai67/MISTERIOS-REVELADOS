/**
 * BookCard - Tarjeta individual de libro
 * 
 * Muestra la portada del libro con efecto hover lift
 * Incluye: imagen, volumen, título y botón "LEER"
 */

export default function BookCard({ book, onClick }) {
  return (
    <article
      className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 h-full"
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
        className="relative overflow-hidden rounded-lg shadow-card group-hover:shadow-card-hover transition-shadow duration-300 h-full flex flex-col"
        style={{ backgroundColor: book.color }}
      >
        {/* Portada del libro - Imagen o Gradiente decorativo */}
        <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden flex-shrink-0">
          {book.imagen ? (
            /* Imagen de portada */
            <img
              src={book.imagen}
              alt={`Portada de ${book.titulo}`}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 20%' }}
            />
          ) : (
            /* Fondo con patrón decorativo */
            <>
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(255,255,255,0.1) 2px,
                      rgba(255,255,255,0.1) 4px
                    )
                  `
                }}
              />

              {/* Borde dorado decorativo */}
              <div
                className="absolute inset-4 border-2 opacity-50"
                style={{ borderColor: 'rgba(212, 175, 55, 0.5)' }}
              />

              {/* Icono decorativo central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: 'rgba(212, 175, 55, 0.7)' }}
                >
                  <span
                    className="text-3xl font-bold"
                    style={{ color: 'rgba(212, 175, 55, 0.9)' }}
                  >
                    {book.volumen.replace('Volumen ', 'V')}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Overlay inferior degradado */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)'
            }}
          />
        </div>

        {/* Información del libro */}
        <div className="p-5 text-center flex-grow flex flex-col justify-between" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div>
            {/* Número de volumen */}
            <p
              className="text-sm uppercase tracking-wider mb-2"
              style={{ color: 'rgba(232, 200, 80, 0.9)' }}
            >
              {book.volumen}
            </p>

            {/* Título del libro - limitado a 2 líneas */}
            <h3
              className="text-base font-semibold mb-2 line-clamp-2 min-h-[2.5rem]"
              style={{
                color: '#FFFFFF',
                fontFamily: 'Cinzel, serif'
              }}
            >
              {book.titulo}
            </h3>

            {/* Descripción - limitado a 3 líneas */}
            <p
              className="text-sm italic mb-4 opacity-80 line-clamp-3 min-h-[3rem]"
              style={{
                color: '#FDF6E3',
                fontFamily: 'Playfair Display, serif'
              }}
            >
              {book.descripcion}
            </p>
          </div>

          {/* Botón LEER */}
          <button
            className="inline-block px-6 py-2 border-2 text-sm uppercase tracking-wider transition-all duration-200 hover:bg-gold-hover"
            style={{
              borderColor: '#D4AF37',
              color: '#D4AF37',
              backgroundColor: 'transparent',
              fontFamily: 'Cinzel, serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#C5A028'
              e.target.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = '#D4AF37'
            }}
          >
            LEER
          </button>
        </div>
      </div>
    </article>
  )
}
