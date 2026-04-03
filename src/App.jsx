import { useState } from 'react'
import HeroSection from './components/HeroSection'
import BookGrid from './components/BookGrid'
import BookDetailView from './components/BookDetailView'
import ManuscriptView from './components/ManuscriptView'
import MasterChat from './components/MasterChat/MasterChat'

function App() {
  const [selectedBook, setSelectedBook] = useState(null)
  const [isReadingMode, setIsReadingMode] = useState(false)
  const [initialChapter, setInitialChapter] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [loadError, setLoadError] = useState(null)

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
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF6E3' }}>
        {isReadingMode && selectedBook ? (
          <ManuscriptView
            book={selectedBook}
            onBack={() => setIsReadingMode(false)}
            initialChapter={initialChapter}
          />
        ) : selectedBook ? (
          <BookDetailView
            book={selectedBook}
            onBack={handleBack}
            onRead={handleRead}
          />
        ) : (
          <>
            <HeroSection />
            <BookGrid onBookSelect={handleBookSelect} />

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
          className="fixed bottom-8 right-8 z-40 bg-parchment shadow-mystic p-4 rounded-full hover:scale-110 active:scale-95 transition-all group overflow-hidden"
          style={{ borderColor: '#7a473d', borderWidth: '2px' }}
          title="Consulta"
        >
          <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg className="w-8 h-8" style={{ color: '#7a473d' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
