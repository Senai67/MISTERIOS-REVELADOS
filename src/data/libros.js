/**
 * Datos de libros - Trilogía Saint Germain
 * Estructura de Metadatos para Carga Dinámica (Lazy Loading)
 */

const libros = [
  {
    id: 0,
    volumen: "RECOMENDACIÓN",
    titulo: "DIFERENCIA ENTRE 'I AM' Y 'YO SOY'",
    descripcion: "El poder vibratorio de 'I AM' vs 'Yo Soy' para decretos",
    sinopsis: "Esta sección especial aclara que solo el término original posee la vibración y el poder del 'Nombre de Dios en acción'.",
    color: "#D4AF37",
    imagen: "/images/IAM3.png",
    capitulos: [
      { numero: 1, titulo: "El Poder Vibratorio del I AM", path: "/content/v0/cap01.md" },
      { numero: 2, titulo: "Testimonio del Gran Director Divino", path: "/content/v0/cap02.md" },
      { numero: 3, titulo: "Las Palabras Más Poderosas", path: "/content/v0/cap03.md" },
      { numero: 4, titulo: "Mil Veces Más Poder", path: "/content/v0/cap04.md" }
    ]
  },
  {
    id: 1,
    volumen: "Volumen I",
    titulo: "MISTERIOS REVELADOS",
    descripcion: "Encuentro místico en el Monte Shasta (1930)",
    sinopsis: "Narra el encuentro entre Godfré Ray King y Saint Germain, introduciendo la 'Poderosa Presencia I AM'.",
    color: "#713a77",
    colorInferior: "#532b57",
    imagen: "/images/Slide1b.png",
    capitulos: [
      { numero: 0, titulo: "Prefacio y Dedicatoria", path: "/content/v1/intro.md" },
      { numero: 1, titulo: "Encuentro con el Maestro", path: "/content/v1/cap01.md" },
      { numero: 2, titulo: "El Desierto del Sáhara", path: "/content/v1/cap02.md" },
      { numero: 3, titulo: "El Royal Teton", path: "/content/v1/cap03.md" },
      { numero: 4, titulo: "Misterios del Yellowstone", path: "/content/v1/cap04.md" },
      { numero: 5, titulo: "Memorias Incas", path: "/content/v1/cap05.md" },
      { numero: 6, titulo: "Ciudades Sepultadas del Amazonas", path: "/content/v1/cap06.md" },
      { numero: 7, titulo: "El Valle Secreto", path: "/content/v1/cap07.md" },
      { numero: 8, titulo: "El Poder Omnipresente de Dios", path: "/content/v1/cap08.md" },
      { numero: 9, titulo: "Venus Visita el Royal Teton", path: "/content/v1/cap09.md" }
    ]
  },
  {
    id: 2,
    volumen: "Volumen II",
    titulo: "LA PRESENCIA MÁGICA",
    descripcion: "Aplicación práctica de las leyes del 'I AM'",
    sinopsis: "Continúa las vivencias de Godfré Ray King, enfocándose en la maestría sobre la sustancia y la energía.",
    color: "#5A3D7A",
    imagen: "/images/slide2.png",
    capitulos: [
      { numero: 1, titulo: "Un Extraño Suceso", path: "/content/v2/cap01.md" },
      { numero: 2, titulo: "Revelaciones", path: "/content/v2/cap02.md" },
      { numero: 3, titulo: "Maravillas Subterráneas", path: "/content/v2/cap03.md" },
      { numero: 4, titulo: "Romance Divino", path: "/content/v2/cap04.md" },
      { numero: 5, titulo: "El Gran Comando", path: "/content/v2/cap05.md" },
      { numero: 6, titulo: "El Mensajero de la Gran Hermandad Blanca", path: "/content/v2/cap06.md" },
      { numero: 7, titulo: "El Mensaje Misterioso", path: "/content/v2/cap07.md" },
      { numero: 8, titulo: "El Poder Conquistador", path: "/content/v2/cap08.md" },
      { numero: 9, titulo: "La Ascensión de Daniel Rayborn", path: "/content/v2/cap09.md" },
      { numero: 10, titulo: "Experiencias Finales y Nuestro Viaje a Arabia", path: "/content/v2/cap10.md" },
      { numero: 11, titulo: "El Verdadero Mensajero del Servicio Divino", path: "/content/v2/cap11.md" }
    ]
  },
  {
    id: 3,
    volumen: "Volumen III",
    titulo: "LOS DISCURSOS DEL 'I AM'",
    descripcion: "El Libro de Oro de Saint Germain",
    sinopsis: "Recopilación de 33 discursos dictados por el Maestro para la liberación de la humanidad.",
    color: "#1A4365",
    imagen: "/images/Discursos2.png",
    capitulos: [
      { numero: 0, titulo: "Agradecimiento y Prefacio", path: "/content/v3/intro.md" },
      ...Array.from({ length: 33 }, (_, i) => ({
        numero: i + 1,
        titulo: `Discurso ${i + 1}`,
        path: `/content/v3/discurso${(i + 1).toString().padStart(2, '0')}.md`
      }))
    ]
  }
]

export default libros
