import { useState, useEffect, useRef } from 'react'

/**
 * ManuscriptView - Vista de lectura de manuscrito
 *
 * Muestra el contenido completo del libro con:
 * - Navegación por capítulos (Dropdown y botones)
 * - TTS (Text-to-Speech) con control de audio
 * - Progreso de lectura
 */

// Iconos
const IconArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const IconPlay = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const IconPause = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </svg>
)

const IconChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const IconChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

const IconDownload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
)

export default function ManuscriptView({ book, onBack, initialChapter = 0 }) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(initialChapter)
  const [isPlaying, setIsPlaying] = useState(false)
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [currentParagraph, setCurrentParagraph] = useState(0)
  const [chapterContent, setChapterContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const contentRef = useRef(null)
  const isPlayingRef = useRef(false)
  const allParagraphsRef = useRef([])

  // Cargar contenido del capítulo actual
  useEffect(() => {
    const fetchChapter = async () => {
      setIsLoading(true)
      try {
        const path = book.capitulos[currentChapterIndex]?.path
        if (!path) throw new Error('No path defined for this chapter')

        const response = await fetch(path)
        if (!response.ok) throw new Error('Failed to load chapter content')

        const text = await response.text()
        setChapterContent(text)
        setCurrentParagraph(0)
      } catch (error) {
        console.error("Error loading chapter:", error)
        setChapterContent("Error al cargar el contenido. Por favor, intente de nuevo más tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchChapter()
  }, [currentChapterIndex, book.id])

  // Voces TTS
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const synth = window.speechSynthesis
      const sortAndFilterVoices = (all) => {
        const allowedVoices = [
          'Google español',
          'Google español de Estados Unidos',
          'Microsoft Helena - Spanish (Spain)',
          'Microsoft Laura - Spanish (Spain)',
          'Microsoft Pablo - Spanish (Spain)'
        ]
        return all.filter(v => allowedVoices.includes(v.name))
      }

      const loadVoices = () => {
        const availableVoices = synth.getVoices()
        const sorted = sortAndFilterVoices(availableVoices)
        setVoices(sorted)
        const savedVoice = localStorage.getItem('tts-voice')
        const voice = sorted.find(v => v.name === savedVoice) || sorted[0]
        if (voice) setSelectedVoice(voice)
      }
      loadVoices()
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices
      }
      return () => synth.cancel()
    }
  }, [])

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
      isPlayingRef.current = false
    }
  }, [])

  // Chrome TTS keep-alive: Chrome silently stops speaking after ~15 s without interaction
  useEffect(() => {
    const id = setInterval(() => {
      if (window.speechSynthesis && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause()
        window.speechSynthesis.resume()
      }
    }, 10000)
    return () => clearInterval(id)
  }, [])

  if (!book || !book.capitulos) return null


  const currentChapter = book.capitulos[currentChapterIndex]
  const totalChapters = book.capitulos.length
  const progressKey = `audio_progress_book_${book.id}_ch_${currentChapterIndex}`

  // Agrupa las líneas envueltas del PDF en párrafos reales.
  // Los archivos .md tienen una línea por fragmento separadas por \n\n.
  // Acumulamos líneas hasta encontrar un final de oración.
  const parseChapterContent = (rawText) => {
    const ENDS_SENTENCE = /[.!?"»\u201d\u2019]$/
    const lines = rawText
      .replace(/\r/g, '')
      .replace(/^#+ .*\n?/gm, '') // strip Markdown headers
      .split('\n\n')
      .map(l => l.replace(/\n/g, ' ').trim())
      .filter(l => l.length > 0)

    const result = []
    let current = ''
    let headerDone = false

    for (const line of lines) {
      // Salta el encabezado del capítulo (CAPÍTULO, -IX-, título corto)
      // hasta encontrar la primera línea de longitud "prosa" (> 8 palabras).
      if (!headerDone) {
        const wordCount = line.split(/\s+/).filter(Boolean).length
        if (wordCount > 8) {
          headerDone = true
        } else {
          continue
        }
      }

      current = current ? current + ' ' + line : line

      if (ENDS_SENTENCE.test(line)) {
        if (current.trim().length > 10) result.push(current.trim())
        current = ''
      }
    }
    if (current.trim().length > 10) result.push(current.trim())
    return result
  }

  const allParagraphs = isLoading ? [] : [
    { type: 'title', text: currentChapter.titulo },
    ...parseChapterContent(chapterContent).map(text => ({ type: 'content', text }))
  ]
  allParagraphsRef.current = allParagraphs

  const handleVoiceChange = (e) => {
    const voice = voices.find(v => v.name === e.target.value)
    setSelectedVoice(voice)
    localStorage.setItem('tts-voice', voice.name)
  }

  const playNext = (index) => {
    const paragraphs = allParagraphsRef.current
    if (!isPlayingRef.current || index >= paragraphs.length) {
      setIsPlaying(false)
      isPlayingRef.current = false
      return
    }

    const text = paragraphs[index].text.replace(/\r/g, '').trim()

    // Calcular porcentaje y guardarlo
    const progressPercent = allParagraphs.length > 1 ? Math.round((index / (allParagraphs.length - 1)) * 100) : 0
    localStorage.setItem(`${progressKey}_percent`, progressPercent.toString())

    // Saltar fragmentos vacíos o trivialmente cortos silenciosamente
    if (!text || text.length <= 3) {
      playNext(index + 1)
      return
    }

    setCurrentParagraph(index)
    localStorage.setItem(progressKey, index.toString())

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'es-ES'
    utterance.rate = 1.0
    if (selectedVoice) utterance.voice = selectedVoice

    utterance.onend = () => playNext(index + 1)
    // On error: if 'interrupted' (user cancelled) → stop; otherwise skip to next paragraph
    utterance.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') {
        isPlayingRef.current = false
        setIsPlaying(false)
      } else {
        playNext(index + 1)
      }
    }

    window.speechSynthesis.speak(utterance)

    // Only scroll for content paragraphs (index 0 = title has no DOM id)
    if (index > 0) {
      setTimeout(() => {
        const element = document.getElementById(`paragraph-${index}`)
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }

  const handleListenToggle = () => {
    if (isPlayingRef.current) {
      window.speechSynthesis.cancel()
      isPlayingRef.current = false
      setIsPlaying(false)
    } else {
      isPlayingRef.current = true
      setIsPlaying(true)
      playNext(currentParagraph)
    }
  }

  const handleParagraphClick = (index) => {
    setCurrentParagraph(index)
    localStorage.setItem(progressKey, index.toString())

    // Calculate percentage and save it
    const progressPercent = allParagraphsRef.current.length > 1 ? Math.round((index / (allParagraphsRef.current.length - 1)) * 100) : 0
    localStorage.setItem(`${progressKey}_percent`, progressPercent.toString())

    if (isPlayingRef.current) {
      window.speechSynthesis.cancel()
      setTimeout(() => playNext(index), 100)
    }
  }

  const progress = allParagraphs.length > 0 ? (currentParagraph / (allParagraphs.length - 1)) * 100 : 0

  return (
    <section className="min-h-screen py-6 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FDF6E3' }}>
      <div className="max-w-4xl mx-auto">

        {/* Cabecera de controles */}
        <div className="mb-6 p-4 rounded-lg shadow-lg" style={{ backgroundColor: book.color }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button onClick={onBack} className="flex items-center gap-2 text-white font-serif uppercase text-sm">
              <IconArrowLeft /> Volver
            </button>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Selector de Capítulo */}
              <select
                value={currentChapterIndex}
                onChange={(e) => {
                  setCurrentChapterIndex(parseInt(e.target.value))
                  window.speechSynthesis.cancel()
                  isPlayingRef.current = false
                  setIsPlaying(false)
                }}
                className="px-2 py-1 rounded text-sm bg-white border border-yellow-600 font-serif"
              >
                {book.capitulos.map((cap, i) => (
                  <option key={i} value={i}>{cap.numero}. {cap.titulo}</option>
                ))}
              </select>

              {/* Selector de Voz */}
              <select
                value={selectedVoice?.name || ''}
                onChange={handleVoiceChange}
                className="px-2 py-1 rounded text-sm bg-white border border-yellow-600 font-serif"
              >
                {voices.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
              </select>

              <button
                onClick={handleListenToggle}
                className="flex items-center gap-2 px-3 py-1 rounded text-sm text-white font-serif transition-colors hover:opacity-90"
                style={{ backgroundColor: book.id === 0 ? '#8B0000' : '#D4AF37' }}
              >
                {isPlaying ? <IconPause /> : <IconPlay />} {isPlaying ? 'Pausar' : 'Escuchar'}
              </button>
            </div>
          </div>

          {/* Progreso */}
          <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#D4AF37] transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Contenido Principal */}
        <div ref={contentRef} className="p-6 sm:p-10 rounded-lg shadow-sm" style={{ backgroundColor: '#F5EDD9', minHeight: '60vh' }}>
          {isLoading ? (
            <div className="text-center py-20 font-serif text-xl" style={{ color: book.color }}>Cargando capítulo...</div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-yellow-600" style={{ color: book.color, fontFamily: '"Times New Roman", Times, serif' }}>
                {currentChapter.titulo}
              </h2>
              <div className="space-y-6">
                {allParagraphs.slice(1).map((para, idx) => {
                  const gIdx = idx + 1
                  const isActive = gIdx === currentParagraph
                  return (
                    <div
                      key={gIdx}
                      id={`paragraph-${gIdx}`}
                      onClick={() => handleParagraphClick(gIdx)}
                      className={`p-4 rounded transition-all cursor-pointer ${isActive ? 'bg-yellow-100 border-l-4 border-yellow-600' : 'hover:bg-yellow-50'}`}
                    >
                      <p
                        className={`leading-relaxed text-lg ${isActive ? 'text-black font-medium' : 'text-gray-700'}`}
                        style={{ fontFamily: '"Times New Roman", Times, serif', lineHeight: 1.8 }}
                      >
                        {para.text}
                      </p>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {/* Navegación Inferior */}
        <div className="mt-6 p-4 bg-[#F5EDD9] rounded-lg flex justify-between items-center font-serif text-sm">
          <button
            disabled={currentChapterIndex === 0}
            onClick={() => { setCurrentChapterIndex(c => c - 1); window.speechSynthesis.cancel(); setIsPlaying(false); isPlayingRef.current = false; }}
            className="flex items-center gap-1 text-yellow-700 disabled:text-gray-400"
          >
            <IconChevronLeft /> Anterior
          </button>
          <span className="text-gray-600">Capítulo {currentChapterIndex + 1} de {totalChapters}</span>
          <button
            disabled={currentChapterIndex === totalChapters - 1}
            onClick={() => { setCurrentChapterIndex(c => c + 1); window.speechSynthesis.cancel(); setIsPlaying(false); isPlayingRef.current = false; }}
            className="flex items-center gap-1 text-yellow-700 disabled:text-gray-400"
          >
            Siguiente <IconChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
