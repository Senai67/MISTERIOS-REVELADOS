import { useState } from 'react'
import HeroSection from './components/HeroSection'
import BookGrid from './components/BookGrid'
import BookDetailView from './components/BookDetailView'
import ManuscriptView from './components/ManuscriptView'

function App() {
  const [selectedBook, setSelectedBook] = useState(null)
  const [isReadingMode, setIsReadingMode] = useState(false)
  const [initialChapter, setInitialChapter] = useState(0)

  const handleBookSelect = (book) => {
    setSelectedBook(book)
    setIsReadingMode(false)
    setInitialChapter(0)
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
    </div>
  )
}

export default App
