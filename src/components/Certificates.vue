<script setup>
const certificates = [
  {
    title: "Técnico Superior en Diseño y Programación Web",
    issuer: "Escuela de Arte Multimedial Da Vinci",
    date: "2023/25",
    description: "Carrera completa de Desarrollo Web Full Stack. Creación de Páginas Web RESS (Responsive + Server Side Components), y Aplicaciones Móviles (PWA). Conocimientos avanzados en IOT, manejo de APIs, Marketing Digital, Servidores, Diseño UX, Análisis de Datos, Creación de Contenido y Producción de Videos Web. Trabajo con IA aplicada a la resolución de bloques de código para implementaciones a gran escala.",
    pdfUrl: "",
    inProgress: true
  },
  {
    title: "Curso de introducción al desarrollo web: HTML y CSS (2/2)",
    issuer: "Google Digital Academy (Skillshop)",
    date: "2022",
    description: "Creación de páginas web profesionales adaptables a distintos dispositivos de la mano de la Universidad de Alicante. Formación con el lenguaje CSS para poder realizar webs completas de manera profesional.",
    pdfUrl: "/certificates/certif-desarrollo-webII.pdf",
    inProgress: false
  },
  {
    title: "Curso de introducción al desarrollo web: HTML y CSS (1/2)",
    issuer: "Google Digital Academy (Skillshop)",
    date: "2022",
    description: "Creación de páginas web profesionales adaptables a distintos dispositivos de la mano de la Universidad de Alicante. Nacimiento de la Web y cómo ha llegado a ser lo que es hoy. Creación de páginas web correctas de manera profesional utilizando HTML5.",
    pdfUrl: "/certificates/certif-desarrollo-webI.pdf",
    inProgress: false
  },
  {
    title: "Protege tu Negocio: Ciberseguridad en el Teletrabajo",
    issuer: "Google Digital Academy (Skillshop)",
    date: "2022",
    description: "Descubre cómo implantar el teletrabajo de forma segura y eficiente de la mano de INCIBE. Un programa de Innovación en Ciberseguridad de la PYME impulsado por la Secretaría General de Industria y de la PYME (SGIPYME) del Ministerio de Industria, Comercio y Turismo y gestionado por EOI.",
    pdfUrl: "/certificates/certif-ciberseguridad.pdf",
    inProgress: false
  },
  {
    title: "Digitaliza paso a paso tu negocio con herramientas de Google",
    issuer: "Google Digital Academy (Skillshop)",
    date: "2022",
    description: "Curso para conseguir que tu negocio sea visible online y llegue a un mayor número de clientes. Aprenderás el funcionamiento de herramientas como Perfil de Empresa (antiguo Google My Business), YouTube o Google Forms.",
    pdfUrl: "/certificates/certif-digitaliza-negocio.pdf",
    inProgress: false
  },
];
</script>

<template>
  <div class="space-y-8">
    <div 
      v-for="cert in certificates" 
      :key="cert.title"
      class="bg-dark-light p-6 rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
    >
      <div class="flex flex-col md:flex-row md:justify-between md:items-start">
        <div>
          <h3 class="text-xl font-bold text-primary mb-2">{{ cert.title }}</h3>
          <p class="text-gray-300 font-bold italic">{{ cert.issuer }}</p>
        </div>
        <div class="mt-2 md:mt-0 flex items-center gap-4">
          <span class="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary text-sm">
            {{ cert.date }}
          </span>
          <button
            v-if="cert.inProgress"
            class="px-4 py-2 bg-gray-700/50 text-gray-400 rounded-lg flex items-center gap-2 cursor-not-allowed"
            disabled
          >
            <i class="fas fa-file-alt"></i>
            Título en Trámite
          </button>
          <a
            v-else-if="cert.pdfUrl"
            :href="cert.pdfUrl"
            target="_blank"
            class="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors flex items-center gap-2"
          >
            <i class="fas fa-file-pdf"></i>
            Certificado
          </a>
        </div>
      </div>
      <p class="mt-4 text-gray-400">{{ cert.description }}</p>
    </div>
  </div>
</template>