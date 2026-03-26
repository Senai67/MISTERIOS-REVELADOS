import BookCard from './BookCard'
import libros from '../data/libros'

export default function BookGrid({ onBookSelect }) {
  return (
    <section
      style={{
        padding: '3rem 1rem',
        backgroundColor: 'var(--parchment)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'var(--ink)',
              fontFamily: 'Cinzel, serif'
            }}
          >
            VOLÚMENES DISPONIBLES
          </h2>
          
          {/* Línea dorada */}
          <div
            style={{
              width: '6rem',
              height: '0.25rem',
              margin: '1rem auto',
              backgroundColor: 'var(--gold-primary)'
            }}
          />
          
          <p
            style={{
              fontSize: '1.125rem',
              fontStyle: 'italic',
              maxWidth: '42rem',
              margin: '0 auto',
              color: 'var(--ink-light)',
              fontFamily: 'Playfair Display, serif'
            }}
          >
            Enseñanzas reveladas por Saint Germain a través de Godfré Ray King (1939)
          </p>
        </div>

        {/* Grid de libros */}
        <div className="book-grid">
          {libros.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={onBookSelect}
            />
          ))}
        </div>

        {/* Nota */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--ink-light)', fontSize: '0.875rem' }}>
            Haz clic en cualquier libro para comenzar a leer
          </p>
        </div>
      </div>
    </section>
  )
}
