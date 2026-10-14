/*
  Distrito Barber Club · datos editables
  ---------------------------------------------------------------
  Todo lo que cambia de una barbería a otra está aquí: contacto,
  horarios, servicios, precios, equipo y reservas. El resto de la
  web lee estos valores; no hace falta tocar el HTML.

  `demo: true` muestra un aviso discreto (una sola vez, en el pie)
  indicando que estos datos son de demostración. Pásalo a `false`
  cuando cargues los datos reales.
*/
window.DBC = {
  demo: true,

  negocio: {
    nombre: "Distrito Barber Club",
    direccion: "Calle del Oficio 12",
    ciudad: "28004 Madrid",
    // Enlace al mapa. Si lo dejas vacío se genera una búsqueda con la dirección.
    mapa: "",
    telefono: "+34 600 000 000",
    email: "reservas@distritobarber.example",
    instagram: "", // p. ej. "https://instagram.com/distritobarberclub" (vacío = no se muestra)
  },

  // Días agrupados tal como se leen en el cartel de la puerta.
  horario: [
    { dias: "Martes a viernes", horas: "10:00 – 20:30" },
    { dias: "Sábado", horas: "10:00 – 15:00" },
    { dias: "Domingo y lunes", horas: "Cerrado" },
  ],

  reservas: {
    // Si la barbería usa un sistema de reservas (Booksy, Treatwell, Fresha…),
    // pega aquí su enlace y el formulario enviará a él.
    sistemaUrl: "",
    // Si no hay sistema, se genera un mensaje de WhatsApp con lo elegido.
    // Número en formato internacional, solo dígitos.
    whatsapp: "34600000000",
  },

  moneda: "€",

  // Vídeo opcional de portada (MP4 ligero, sin sonido, 6–12 s, < 4 MB).
  // Solo se carga en pantallas grandes y sin "reducir movimiento";
  // la fotografía de portada se mantiene como imagen alternativa.
  portadaVideo: "",

  // `id` se usa en los enlaces "Reservar este servicio". Precio en número.
  servicios: [
    {
      id: "corte",
      nombre: "Corte",
      descripcion: "Leemos tu pelo y tu forma de llevarlo. Tijera o máquina, lavado y peinado final con producto.",
      duracion: 45,
      precio: 22,
      imagen: "1657105052497-f996284ffff8",
      proporcion: [4, 5],
      alt: "Barbero recortando con tijera y peine la parte superior del cabello",
    },
    {
      id: "barba",
      nombre: "Barba",
      descripcion: "Perfilado a navaja, toalla caliente y aceite. Líneas limpias que aguantan la semana.",
      duracion: 30,
      precio: 16,
      imagen: "1532710093739-9470acff878f",
      proporcion: [3, 2],
      alt: "Afeitado de barba con navaja, en blanco y negro",
    },
    {
      id: "ritual",
      nombre: "Ritual completo",
      descripcion: "Corte, barba y lavado con masaje craneal. El servicio entero, sin prisas.",
      duracion: 75,
      precio: 35,
      imagen: "1567894340315-735d7c361db0",
      proporcion: [3, 4],
      alt: "Barbero trabajando el degradado de un cliente de pelo rizado",
    },
  ],

  equipo: [
    {
      id: "alex",
      nombre: "Álex Ferrer",
      especialidad: "Degradados y texturas",
      imagen: "1717700921740-a1440f3b89a4",
      alt: "Retrato de Álex con delantal de barbero",
    },
    {
      id: "marco",
      nombre: "Marco Ruiz",
      especialidad: "Barba y navaja",
      imagen: "1595294572864-ddb46d169dbb",
      alt: "Retrato de Marco en penumbra sosteniendo unas tijeras",
    },
    {
      id: "dani",
      nombre: "Dani Ortega",
      especialidad: "Cortes clásicos a tijera",
      imagen: "1720251354355-258ad9d1a6af",
      alt: "Retrato de Dani con los brazos cruzados",
    },
  ],
};
