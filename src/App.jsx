import { useState, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import BookGrid from './components/BookGrid'
import BookDetailView from './components/BookDetailView'
import ManuscriptView from './components/ManuscriptView'
import MasterChat from './components/MasterChat/MasterChat'
import HeroSectionB from './opcion-bapp/HeroSectionB'
import BookGridB from './opcion-bapp/BookGridB'
import BookDetailViewB from './opcion-bapp/BookDetailViewB'

function App() {
  const [selectedBook, setSelectedBook] = useState(null)
  const [isReadingMode, setIsReadingMode] = useState(false)
  const [initialChapter, setInitialChapter] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isOptionB, setIsOptionB] = useState(false) // Forzar Opción A por defecto
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    console.log('[App] isOptionB:', isOptionB)
  }, [isOptionB])

  const toggleOptionB = () => {
    console.log('[App] Toggling OptionB')
    setIsOptionB(prev => !prev)
  }

  const handleBookSelect = (book, chapterIndex = null) => {
    setSelectedBook(book)
    setIsReadingMode(chapterIndex !== null)
    setInitialChapter(chapterIndex !== null ? chapterIndex : 0)
    if (chapterIndex !== null) {
      setIsChatOpen(false)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setSelectedBook(null)
    setIsReadingMode(false)
    setInitialChapter(0)
  }

  const handleRead = (chapterIndex = 0) => {
    setInitialChapter(chapterIndex)
    setIsReadingMode(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loadError) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <h1>Error de carga</h1>
        <pre>{loadError}</pre>
      </div>
    )
  }

  try {
    const DetailView = isOptionB ? BookDetailViewB : BookDetailView
    const Hero = isOptionB ? HeroSectionB : HeroSection
    const Grid = isOptionB ? BookGridB : BookGrid

    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF6E3' }}>
        <button
          onClick={toggleOptionB}
          className="fixed top-4 right-4 z-50 px-4 py-2 rounded-md text-xs uppercase tracking-wider transition-all duration-200"
          style={{
            backgroundColor: isOptionB ? '#D4AF37' : '#F5EDD9',
            color: isOptionB ? '#FFFFFF' : '#4A4A4A',
            border: '2px solid #D4AF37',
            fontFamily: 'Cinzel, serif',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
          title={isOptionB ? 'Cambiar a Opción A' : 'Cambiar a Opción B'}
        >
          {isOptionB ? 'Opción B' : 'Opción A'}
        </button>

        {isReadingMode && selectedBook ? (
          <ManuscriptView
            book={selectedBook}
            onBack={() => setIsReadingMode(false)}
            initialChapter={initialChapter}
          />
        ) : selectedBook ? (
          <DetailView
            book={selectedBook}
            onBack={handleBack}
            onRead={handleRead}
          />
        ) : (
          <>
            <Hero />
            <Grid onBookSelect={handleBookSelect} />

            <footer
              style={{
                padding: '2rem 1rem',
                textAlign: 'center',
                backgroundColor: '#F5EDD9',
                color: '#4A4A4A'
              }}
            >
              <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                Misterios Revelados - Enseñanzas de Saint Germain
              </p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Basado en los escritos de Godfré Ray King © 1939
              </p>
            </footer>
          </>
        )}

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
          onNavigateToBook={handleBookSelect}
        />
      </div>
    )
  } catch (error) {
    console.error('[App Error]:', error)
    setLoadError(error.message + '\n' + error.stack)
    return null
  }
}

export default App
