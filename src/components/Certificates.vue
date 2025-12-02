<script setup>
import { useI18n } from 'vue-i18n';
import { ref, watch, nextTick, onMounted } from 'vue';

const { t, locale } = useI18n();

const certificates = ref([
  {
    title: {
      es: "Técnico Superior en Diseño y Programación Web",
      en: "Higher Technician in Web Design and Programming"
    },
    issuer: "Escuela de Arte Multimedial Da Vinci",
    date: "2023/25",
    description: {
      es: "Carrera completa de Desarrollo Web Full Stack. Creación de Páginas Web RESS (Responsive + Server Side Components), y Aplicaciones Móviles (PWA). Conocimientos avanzados en IOT, manejo de APIs, Marketing Digital, Servidores, Diseño UX, Análisis de Datos, Creación de Contenido y Producción de Videos Web. Trabajo con IA aplicada a la resolución de bloques de código para implementaciones a gran escala.",
      en: "Complete Full Stack Web Development career. Creation of RESS Web Pages (Responsive + Server Side Components), and Mobile Applications (PWA). Advanced knowledge in IOT, API handling, Digital Marketing, Servers, UX Design, Data Analysis, Content Creation and Web Video Production. Work with AI applied to code block resolution for large-scale implementations."
    },

    pdfUrl: "/certificates/title-constance.pdf",

    showDetails: true,
    highlighted: true,
    subjects: [
      {
        cuatrimestre: "Primer cuatrimestre",
        materias: [
          { nombre: { es: "Maquetado y Desarrollo Web", en: "Web Layout and Development" }, tecnologias: ["HTML", "CSS", "Responsive Design, JavaScript"], promedio: 10 },
          { nombre: { es: "Diseño de Interfaces", en: "Interface Design" }, tecnologias: ["Photoshop", "Landing Pages"], promedio: 10 },
          { nombre: { es: "Lógica de Programación", en: "Programming Logic" }, tecnologias: ["Pseudocode", "JavaScript"], promedio: 10 },
          { nombre: { es: "Marketing Digital", en: "Digital Marketing" }, tecnologias: ["SEO/SEM", "Branding, Marketing"], promedio: 10 },
          { nombre: { es: "Comunicación Visual", en: "Visual Communication" }, tecnologias: ["Photoshop", "Illustrator"], promedio: 10 },
        ]
      },
      {
        cuatrimestre: "Segundo cuatrimestre",
        materias: [
          { nombre: { es: "PP: Interacción con Dispositivos Móviles", en: "PP: Interaction with Mobile Devices" }, tecnologias: ["HTML", "CSS", "JavaScript", "Bootstrap", "Mobile UX"], promedio: 10 },
          { nombre: { es: "Diseño Gráfico para Web", en: "Graphic Design for Web" }, tecnologias: ["Photoshop", "Branding", "Web Flow, Landing Pages, Mockups, Wireframes"], promedio: 10 },
          { nombre: { es: "Programación I", en: "Programming I" }, tecnologias: ["HTML", "CSS", "JavaScript", "ECMAScript", "Loops"], promedio: 5 },
          { nombre: { es: "Diseño Vectorial", en: "Vector Design" }, tecnologias: ["Illustrator", "SVG, User Flows"], promedio: 9 },
          { nombre: { es: "Experiencia de Usuario", en: "User Experience" }, tecnologias: ["UX/UI Research", "Personas, User Flows"], promedio: 9 },
          { nombre: { es: "Análisis de Datos", en: "Data Analysis" }, tecnologias: ["SEO/SEM, SMART, Google Analytics, Google Ads"], promedio: 10 },
        ]
      },
      {
        cuatrimestre: "Tercer cuatrimestre",
        materias: [
          { nombre: { es: "Emprendimiento de Negocios", en: "Business Entrepreneurship" }, tecnologias: ["Business Model Canvas", "Scrum", "Kanban", "Agile Methodologies"], promedio: 9 },
          { nombre: { es: "Aplicaciones Web Progresivas", en: "Progressive Web Applications" }, tecnologias: ["PWA", "Service Workers", "JavaScript", "Local Storage", "Notifications"], promedio: 9 },
          { nombre: { es: "Sistemas Operativos", en: "Operating Systems" }, tecnologias: ["Linux", "Windows"], promedio: 10 },
          { nombre: { es: "PP: Programación II", en: "PP: Programming II" }, tecnologias: ["HTML", "CSS", "PHP", "MySQL", "Bootstrap"], promedio: 9 },
          { nombre: { es: "Programación con Entornos de Trabajo", en: "Programming with Work Environments" }, tecnologias: ["Wordpress", "PHP"], promedio: 10 },
          { nombre: { es: "PP: Aplicaciones para Dispositivos Móviles", en: "PP: Applications for Mobile Devices" }, tecnologias: ["JavaScript", "Bootstrap", "Vite", "Vue.js", "Local Storage"], promedio: 9 },
        ]
      },
      {
        cuatrimestre: "Cuarto cuatrimestre",
        materias: [
          { nombre: { es: "PP: Clientes Web Mobile", en: "PP: Mobile Web Clients" }, tecnologias: ["SPA", "Vite", "Vue.js", "Firebase", "Tailwind CSS"], promedio: 10 },
          { nombre: { es: "Internet de las Cosas", en: "Internet of Things" }, tecnologias: ["IoT", "Arduino"], promedio: 9 },
          { nombre: { es: "Portales y Comercio Electrónico", en: "Portals and E-Commerce" }, tecnologias: ["E-Commerce", "PHP", "Lavarel", "MySQL", "Blade"], promedio: 10 },
          { nombre: { es: "Aplicaciones Híbridas", en: "Hybrid Applications" }, tecnologias: ["React", "Node.js", "Express", "MongoDB", "RESTful APIs"], promedio: 10 },
          { nombre: { es: "Ética y Deontología Profesional", en: "Professional Ethics and Deontology" }, tecnologias: ["Professional Ethics, Philosophy"], promedio: 10 },
          { nombre: { es: "PP: Proyecto Final", en: "PP: Final Project" }, tecnologias: ["Full Stack", "Project Management", "Vue.js", "Vite", "Firebase", "Tailwind CSS", "Marketing", "Branding"], promedio: 10, tesis: true },
        ]
      }
    ]
  },
  {
    title: {
      es: "Curso de introducción al desarrollo web: HTML y CSS (2/2)",
      en: "Introduction to Web Development: HTML and CSS (2/2)"
    },
    issuer: "Google Digital Academy (Skillshop)",
    date: "2022",
    description: {
      es: "Creación de páginas web profesionales adaptables a distintos dispositivos de la mano de la Universidad de Alicante. Formación con el lenguaje CSS para poder realizar webs completas de manera profesional.",
      en: "Creation of professional responsive web pages in collaboration with the University of Alicante. Training in CSS language to create complete websites professionally."
    },
    pdfUrl: "/certificates/certif-desarrollo-webII.pdf",
    inProgress: false
  },
  {
    title: {
      es: "Curso de introducción al desarrollo web: HTML y CSS (1/2)",
      en: "Introduction to Web Development: HTML and CSS (1/2)"
    },
    issuer: "Google Digital Academy (Skillshop)",
    date: "2022",
    description: {
      es: "Creación de páginas web profesionales adaptables a distintos dispositivos de la mano de la Universidad de Alicante. Nacimiento de la Web y cómo ha llegado a ser lo que es hoy. Creación de páginas web correctas de manera profesional utilizando HTML5.",
      en: "Creation of professional responsive web pages in collaboration with the University of Alicante. The birth of the Web and how it has become what it is today. Professional creation of proper web pages using HTML5."
    },
    pdfUrl: "/certificates/certif-desarrollo-webI.pdf",
    inProgress: false
  },
  {
    title: {
      es: "Protege tu Negocio: Ciberseguridad en el Teletrabajo",
      en: "Protect Your Business: Cybersecurity in Remote Work"
    },
    issuer: "Google Digital Academy (Skillshop)",
    date: "2022",
    description: {
      es: "Descubre cómo implantar el teletrabajo de forma segura y eficiente de la mano de INCIBE. Un programa de Innovación en Ciberseguridad de la PYME impulsado por la Secretaría General de Industria y de la PYME (SGIPYME) del Ministerio de Industria, Comercio y Turismo y gestionado por EOI.",
      en: "Learn how to implement remote work securely and efficiently with INCIBE. An SME Cybersecurity Innovation program promoted by the General Secretariat of Industry and SME (SGIPYME) of the Ministry of Industry, Commerce and Tourism and managed by EOI."
    },
    pdfUrl: "/certificates/certif-ciberseguridad.pdf",
    inProgress: false
  },
  {
    title: {
      es: "Digitaliza paso a paso tu negocio con herramientas de Google",
      en: "Digitize your business step by step with Google tools"
    },
    issuer: "Google Digital Academy (Skillshop)",
    date: "2022",
    description: {
      es: "Curso para conseguir que tu negocio sea visible online y llegue a un mayor número de clientes. Aprenderás el funcionamiento de herramientas como Perfil de Empresa (antiguo Google My Business), YouTube o Google Forms.",
      en: "Course to make your business visible online and reach more customers. You will learn how to use tools like Business Profile (formerly Google My Business), YouTube, and Google Forms."
    },
    pdfUrl: "/certificates/certif-digitaliza-negocio.pdf",
    inProgress: false
  },
]);

const showModal = ref(false);
const selectedCert = ref(null);

const openDetailsModal = (cert) => {
  selectedCert.value = cert;
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
  selectedCert.value = null;
};

// Función para actualizar textos visualmente
const updateCertificatesText = () => {
  setTimeout(() => {
    try {
      const elements = document.querySelectorAll('#certificaciones .text-primary, #certificaciones .text-gray-400');
      if (elements && elements.length) {
        elements.forEach(el => {
          if (el) {
            el.style.opacity = '0.99';
            setTimeout(() => { 
              if (el) el.style.opacity = '1'; 
            }, 50);
          }
        });
      }
    } catch (error) {
      console.warn('Error al actualizar textos de certificados:', error);
    }
  }, 100);
};

// Método para forzar actualización de certificados
const forceCertificatesUpdate = () => {
  try {
    // Forzar reactividad con una nueva copia
    const certsCopy = [...certificates.value];
    certificates.value = certsCopy;
    
    // Actualizar textos visualmente
    updateCertificatesText();
  } catch (error) {
    console.warn('Error actualizando certificados:', error);
  }
};

// Agregar watcher para forzar actualización cuando cambie el idioma
watch(locale, async () => {
  // Forzar actualización de traducciones
  await nextTick();
  forceCertificatesUpdate();
}, { immediate: true });

// Escuchar eventos de actualización de idioma
onMounted(() => {
  if (typeof window !== 'undefined') {
    // Evento global
    window.addEventListener('languageChanged', forceCertificatesUpdate);
    
    // Evento específico del componente
    document.addEventListener('certificatesLocaleUpdated', forceCertificatesUpdate);
    
    // Exponer método al objeto window para acceso directo
    if (!window.forceUpdateComponents) {
      window.forceUpdateComponents = {};
    }
    window.forceUpdateComponents.certificates = forceCertificatesUpdate;
  }
});

// Traducción de cuatrimestres
const getCuatrimestreLabel = (cuatri, locale) => {
  const map = {
    'Primer cuatrimestre': { es: 'Primer cuatrimestre', en: 'First semester' },
    'Segundo cuatrimestre': { es: 'Segundo cuatrimestre', en: 'Second semester' },
    'Tercer cuatrimestre': { es: 'Tercer cuatrimestre', en: 'Third semester' },
    'Cuarto cuatrimestre': { es: 'Cuarto cuatrimestre', en: 'Fourth semester' },
  };
  return map[cuatri] ? map[cuatri][locale] : cuatri;
};

// Bloquear scroll del body cuando la modal está abierta
watch(showModal, (val) => {
  if (typeof window !== 'undefined' && window.document && window.document.body) {
    if (val) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
});
</script>

<template>
  <div :class="$attrs.class && $attrs.class.includes('modal-overlay')">
    <div 
      v-for="cert in certificates" 
      :key="cert.title"
      :class="[
        'bg-dark-light p-6 mb-4 rounded-xl border transition-all duration-300 hover:shadow-lg hover:shadow-primary/10',
        cert.highlighted
          ? 'border-2 border-primary/60 shadow-lg animate-pulse-soft hover:brightness-110 transition-all duration-300'
          : 'border-gray-800 hover:border-primary/30'
      ]"
    >
      <div class="flex flex-col md:flex-row md:justify-between md:items-start">
        <div>
          <h3 class="text-2xl font-semibold text-primary mb-3">
            {{ typeof cert.title === 'object' ? cert.title[locale] : cert.title }}
          </h3>
          <p class="text-gray-300 font-semibold italic">{{ cert.issuer }}</p>
        </div>

        <div class="mt-2 md:mt-0 flex flex-wrap items-center gap-3 justify-end">
          <span class="inline-block px-4 py-1 bg-primary/10 rounded-full text-green text-sm">
            {{ cert.date }}
          </span>
          <template v-if="cert.showDetails">
            <!-- Botón Detalles reutilizable -->
            <button
              @click="openDetailsModal(cert)"
              class="px-4 py-2 bg-primary/20 text-green rounded-lg hover:bg-primary/30 transition-colors flex items-center gap-2"
            >
              <i class="fas fa-info-circle"></i>
              {{ locale === 'es' ? 'Detalles' : 'Details' }}
            </button>
          </template>
          <!-- Botón en progreso -->
          <button
            v-if="!cert.showDetails && cert.inProgress"
            class="px-4 py-2 bg-gray-700/50 text-gray-400 rounded-lg flex items-center gap-2 cursor-not-allowed"
            disabled
          >
            <i class="fas fa-file-alt"></i>
            {{ locale === 'es' ? 'Título en Trámite' : 'Title in Process' }}
          </button>
          <!-- Botón certificado -->
          <a
            v-if="cert.pdfUrl"
            :href="cert.pdfUrl"
            target="_blank"
            class="px-4 py-2 bg-primary/20 text-green rounded-lg hover:bg-primary/30 transition-colors flex items-center gap-2"
          >
            <i class="fas fa-file-pdf"></i>
            {{ locale === 'es' ? 'Certificado' : 'Certificate' }}
          </a>
        </div>
      </div>
      <p class="mt-3 text-gray-400">
        {{ typeof cert.description === 'object' ? cert.description[locale] : cert.description }}
      </p>
    </div>
    <!-- Modal Detalles -->
    <div v-if="showModal" class="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" @click.self="closeModal">
      <div class="bg-dark-light pt-4 pb-8 px-8 rounded-xl shadow-lg max-w-3xl w-full relative border border-primary/30 max-h-[90vh] overflow-y-auto mx-2 sm:mx-auto" style="top:0;">
        <button @click="closeModal" class="sticky top-2  z-10 flex items-center justify-center text-gray-400 hover:text-primary text-xl bg-dark-light rounded-full w-9 h-9" style="position: sticky; margin-left: auto; display: flex;"><i class="fas fa-times"></i></button>
        <div class="flex items-center gap-3 mb-4">
          <i class="fas fa-info-circle text-primary text-2xl"></i>
          <h4 class="text-xl font-bold text-primary">{{ locale === 'es' ? 'Detalles del Certificado' : 'Certificate Details' }}</h4>
        </div>
        <div v-if="selectedCert && selectedCert.subjects">
          <div v-for="cuatri in selectedCert.subjects" :key="cuatri.cuatrimestre" class="mb-6">
            <h5 class="font-bold text-lg mb-4 text-primary">{{ getCuatrimestreLabel(cuatri.cuatrimestre, locale) }}</h5>
            <div class="grid grid-cols-12 gap-2 text-left mb-2 font-semibold border-b border-gray-700 pb-1">
              <div class="col-span-6">{{ locale === 'es' ? 'Materia' : 'Subject' }}</div>
              <div class="col-span-4">{{ locale === 'es' ? 'Tecnologías' : 'Technologies' }}</div>
              <div class="col-span-2 text-center">{{ locale === 'es' ? 'Nota' : 'Grade' }}</div>
            </div>
            <div>
              <div v-for="mat in cuatri.materias" :key="mat.nombre[locale]" :class="['grid grid-cols-12 gap-2 items-center py-2 rounded', mat.tesis ? 'bg-primary/10 px-3' : '']">
                <div class="col-span-6 font-medium flex items-center">
                  {{ mat.nombre[locale] }}
                  <span v-if="mat.tesis" class="ml-2 px-2 py-0.5 rounded bg-primary text-white text-xs font-bold">{{ locale === 'es' ? 'Tesis' : 'Thesis' }}</span>
                </div>
                <div class="col-span-4">
                  <span v-if="mat.tecnologias && mat.tecnologias.length">
                    {{ mat.tecnologias.join(', ') }}
                  </span>
                  <span v-else>-</span>
                </div>
                <div class="col-span-2 flex justify-center">
                  <span class="bg-green-700 text-white px-4 py-1 rounded-lg font-bold text-lg">{{ mat.promedio }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse-soft {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,212,255,0.10), 0 0 10px 2px rgba(0,212,255,0.10); }
  50% { box-shadow: 0 0 0 3px rgba(0,212,255,0.12), 0 0 16px 6px rgba(0,212,255,0.13); }
}
.animate-pulse-soft {
  animation: pulse-soft 2.5s infinite;
}
@media (max-width: 900px) {
  .max-w-3xl {
    max-width: 95vw !important;
  }
}
@media (max-width: 600px) {
  .max-w-3xl {
    max-width: 100vw !important;
    border-radius: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
.modal-overlay {
  z-index: 50;
}
</style>