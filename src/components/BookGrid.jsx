import BookCard from './BookCard'
import libros from '../data/libros'

export default function BookGrid({ onBookSelect }) {
  return (
    <section
      style={{
        padding: '3rem 1rem',
        backgroundColor: '#FDF6E3'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="book-grid">
          {libros.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={onBookSelect}
            />
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ color: '#4A4A4A', fontSize: '0.875rem', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            Haz clic en cualquier libro para comenzar a leer
          </p>
        </div>
      </div>
    </section>
  )
}
