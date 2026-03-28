import { useState, useEffect } from 'react'

/**
 * BookDetailView - Vista de detalle de libro
 * 
 * Muestra la portada del libro (misma card que home) con información detallada,
 * sinopsis, botones de acción y lista de capítulos.
 * Diseño horizontal: cover izquierda, info derecha.
 */

// Iconos
const IconArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

const IconBook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
)

const IconDownload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
)

const IconRefresh = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
)

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function BookDetailView({ book, onBack, onRead }) {
  const [progressPercent, setProgressPercent] = useState(0)
  const [hasProgress, setHasProgress] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  useEffect(() => {
    // Calcular progreso de lectura desde localStorage
    const savedProgress = localStorage.getItem(`book_progress_${book.id}`)
    if (savedProgress) {
      const progress = parseInt(savedProgress)
      setProgressPercent(progress)
      setHasProgress(progress > 0)
    }
  }, [book.id])

  const handleResetProgress = () => {
    if (showResetConfirm) {
      localStorage.setItem(`book_progress_${book.id}`, '0')

      // Clear individual chapter progress
      book.capitulos.forEach((_, idx) => {
        localStorage.removeItem(`audio_progress_book_${book.id}_ch_${idx}`)
        localStorage.removeItem(`audio_progress_book_${book.id}_ch_${idx}_percent`)
      })

      setProgressPercent(0)
      setHasProgress(false)
      setShowResetConfirm(false)
    } else {
      setShowResetConfirm(true)
      setTimeout(() => setShowResetConfirm(false), 3000)
    }
  }

  const handleDownloadPDF = () => {
    // Descargar el PDF completo de la Trilogía
    window.open('/pdfs/Misterios_Revelados_Completo.pdf', '_blank');
  }

  return (
    <section className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FDF6E3' }}>
      <div className="max-w-6xl mx-auto">

        {/* Botón Volver */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-8 text-sm uppercase tracking-wider transition-colors duration-200"
          style={{ color: '#4A4A4A', fontFamily: 'Cinzel, serif' }}
          onMouseEnter={(e) => e.target.style.color = '#D4AF37'}
          onMouseLeave={(e) => e.target.style.color = '#4A4A4A'}
        >
          <IconArrowLeft />
          Volver a la Biblioteca
        </button>

        {/* Contenido Principal - Layout Horizontal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Columna Izquierda - Portada del Libro (misma card que home) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div
              className="rounded-lg overflow-hidden shadow-2xl transition-transform duration-300"
              style={{
                backgroundColor: book.color,
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
              }}
            >
              {/* Imagen de portada */}
              <div className="relative h-80 sm:h-96 overflow-hidden">
                {book.imagen ? (
                  <img
                    src={book.imagen}
                    alt={`Portada de ${book.titulo}`}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 20%' }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${book.color} 0%, ${book.color}dd 100%)`
                    }}
                  >
                    <div
                      className="w-24 h-24 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: 'rgba(212, 175, 55, 0.7)' }}
                    >
                      <span
                        className="text-4xl font-bold"
                        style={{ color: 'rgba(212, 175, 55, 0.9)', fontFamily: 'Cinzel, serif' }}
                      >
                        {book.volumen.replace('Volumen ', 'V').replace(' ', '')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Overlay inferior */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)'
                  }}
                />
              </div>

              {/* Información en la portada */}
              <div
                className="p-6 text-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
              >
                <p
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ color: 'rgba(232, 200, 80, 0.9)', fontFamily: 'Cinzel, serif' }}
                >
                  {book.volumen}
                </p>
                <h2
                  className="text-lg font-semibold mb-3"
                  style={{ color: '#FFFFFF', fontFamily: 'Cinzel, serif' }}
                >
                  {book.titulo}
                </h2>
                <p
                  className="text-sm italic opacity-80"
                  style={{ color: '#FDF6E3', fontFamily: 'Playfair Display, serif' }}
                >
                  {book.descripcion}
                </p>
              </div>
            </div>

            {/* Progreso de lectura (móvil/tablet) */}
            {hasProgress && (
              <div className="mt-6 p-4 rounded-lg lg:hidden" style={{ backgroundColor: '#F5EDD9' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm" style={{ color: '#4A4A4A', fontFamily: 'Cinzel, serif' }}>
                    Progreso de lectura
                  </span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: '#D4AF37', fontFamily: 'Cinzel, serif' }}
                  >
                    {progressPercent}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: '#D4AF37'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Columna Derecha - Información y Acciones */}
          <div className="lg:col-span-8 xl:col-span-9">

            {/* Título y Sinopsis */}
            <div className="mb-8">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{ color: '#2C2C2C', fontFamily: 'Cinzel, serif' }}
              >
                {book.titulo}
              </h1>

              <div
                className="text-lg leading-relaxed mb-8 pl-6 border-l-4"
                style={{
                  color: '#4A4A4A',
                  fontFamily: 'Lora, serif',
                  borderColor: '#D4AF37'
                }}
              >
                <p style={{ fontFamily: 'Lora, serif', fontStyle: 'normal' }}>
                  {book.sinopsis || book.descripcion}
                </p>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {/* Botón Leer Manuscrito */}
              <button
                onClick={() => onRead(0)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm uppercase tracking-wider font-semibold transition-all duration-200"
                style={{
                  backgroundColor: '#D4AF37',
                  color: '#FFFFFF',
                  fontFamily: 'Cinzel, serif',
                  boxShadow: '0 4px 12px rgba(212, 175, 55, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#C5A028'
                  e.target.style.boxShadow = '0 6px 16px rgba(197, 160, 40, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#D4AF37'
                  e.target.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.4)'
                }}
              >
                <IconBook />
                Leer Manuscrito
              </button>

              {/* Botón Reset Progreso */}
              <button
                onClick={handleResetProgress}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200"
                style={{
                  borderColor: showResetConfirm ? '#8B0000' : '#D4AF37',
                  color: showResetConfirm ? '#8B0000' : '#D4AF37',
                  backgroundColor: 'transparent'
                }}
                title={showResetConfirm ? "Click para confirmar" : "Reiniciar progreso"}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = showResetConfirm ? '#8B0000' : '#D4AF37'
                  e.target.style.color = '#FDF6E3'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = showResetConfirm ? '#8B0000' : '#D4AF37'
                }}
              >
                {showResetConfirm ? <IconCheck /> : <IconRefresh />}
              </button>

              {/* Botón Descargar Manuscrito */}
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm uppercase tracking-wider font-semibold transition-all duration-200 border-2"
                style={{
                  borderColor: '#D4AF37',
                  color: '#D4AF37',
                  backgroundColor: 'transparent',
                  fontFamily: 'Cinzel, serif'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#D4AF37'
                  e.target.style.color = '#FFFFFF'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#D4AF37'
                }}
              >
                <IconDownload />
                Descargar PDF Completo
              </button>
            </div>

            {/* Progreso de lectura (desktop) */}
            {hasProgress && (
              <div className="hidden lg:block mb-8 p-4 rounded-lg" style={{ backgroundColor: '#F5EDD9' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm" style={{ color: '#4A4A4A', fontFamily: 'Cinzel, serif' }}>
                    Progreso de lectura
                  </span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: '#D4AF37', fontFamily: 'Cinzel, serif' }}
                  >
                    {progressPercent}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: '#D4AF37'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Contenido del Manuscrito */}
            <div className="mt-12">
              <h2
                className="text-2xl font-bold mb-6 pb-3 border-b-2"
                style={{
                  color: '#2C2C2C',
                  fontFamily: 'Cinzel, serif',
                  borderColor: '#D4AF37'
                }}
              >
                Contenido del Manuscrito
              </h2>

              <div className="space-y-3">
                {book.capitulos.map((capitulo, index) => {
                  const progressStr = localStorage.getItem(`audio_progress_book_${book.id}_ch_${index}_percent`)
                  const progress = progressStr ? parseInt(progressStr, 10) : 0

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg transition-all duration-200 cursor-pointer"
                      style={{
                        backgroundColor: '#F5EDD9',
                        border: '1px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#D4AF37'
                        e.currentTarget.style.backgroundColor = '#FFF8E7'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'transparent'
                        e.currentTarget.style.backgroundColor = '#F5EDD9'
                      }}
                      onClick={() => onRead(index)}
                    >
                      <span
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                        style={{
                          backgroundColor: book.color,
                          color: '#FDF6E3',
                          fontFamily: 'Cinzel, serif'
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <h3
                          className="font-semibold mb-1"
                          style={{ color: '#2C2C2C', fontFamily: 'Cinzel, serif' }}
                        >
                          {capitulo.titulo}
                        </h3>
                        <p
                          className="text-sm line-clamp-2"
                          style={{ color: '#4A4A4A', fontFamily: 'Lora, serif' }}
                        >
                          Haga clic para cargar y leer este capítulo...
                        </p>
                        {progress > 0 && (
                          <p
                            className="mt-2 text-xs italic font-serif"
                            style={{ color: '#8B691C' }}
                          >
                            Progreso de lectura: {progress}%
                          </p>
                        )}
                      </div>
                      <span
                        className="flex-shrink-0 text-sm uppercase tracking-wider"
                        style={{ color: '#D4AF37', fontFamily: 'Cinzel, serif' }}
                      >
                        Leer →
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
