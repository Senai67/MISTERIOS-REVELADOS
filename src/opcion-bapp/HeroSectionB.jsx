import { useState, useEffect } from 'react'

export default function HeroSectionB() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section
      className="relative w-full py-16 overflow-hidden"
      style={{
        backgroundColor: '#1a1a2e',
        backgroundImage: `url('/images/slide1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center calc(50% + 50px)',
        backgroundAttachment: 'fixed'
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundColor: 'rgba(26,26,46,0.7)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-wider transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            color: '#FFFFFF',
            fontFamily: 'Cinzel, serif',
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
          }}
        >
          MISTERIOS REVELADOS
        </h1>

        <p
          className={`text-lg sm:text-xl md:text-2xl italic max-w-3xl transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            color: '#edcc61',
            fontFamily: 'Playfair Display, serif',
            textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
          }}
        >
          Enseñanzas Eternas de Saint Germain y el Poder del I AM
        </p>

        <div
          className={`mt-8 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            style={{
              width: '120px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)'
            }}
          />
        </div>

        <p
          className={`mt-6 text-sm sm:text-base max-w-2xl transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontFamily: 'Lora, serif',
            fontStyle: 'italic'
          }}
        >
          Enseñanzas reveladas por Saint Germain a través de Godfré Ray King (1939)
        </p>
      </div>
    </section>
  )
}
