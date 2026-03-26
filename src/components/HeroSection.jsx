import { useState, useEffect } from 'react'

const HERO_IMAGES = [
  '/images/slide1.png',
  '/images/poderIAM.png',
  '/images/CiudadDorada.png'
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentImage = HERO_IMAGES[currentIndex]

  return (
    <section className="relative w-full h-[45vh] min-h-[400px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)'
            }}
          />
        </div>
      ))}

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-wider transition-all duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
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
          className={`text-lg sm:text-xl md:text-2xl italic max-w-3xl transition-all duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            color: '#E8C850',
            fontFamily: 'Playfair Display, serif',
            textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
          }}
        >
          Enseñanzas Eternas de Saint Germain y el Poder del I AM
        </p>
      </div>
    </section>
  )
}
