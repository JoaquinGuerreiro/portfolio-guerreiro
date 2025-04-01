<script setup>
import { useI18n } from 'vue-i18n';
import { ref, watch, nextTick } from 'vue';

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
    pdfUrl: "",
    inProgress: true
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

// Agregar watcher para forzar actualización cuando cambie el idioma
watch(locale, async (newLocale) => {
  // Forzar actualización de traducciones
  await nextTick();
  
  if (typeof document !== 'undefined') {
    // Disparar evento personalizado para actualizar este componente
    document.dispatchEvent(new CustomEvent('certificatesLocaleUpdated'));
    
    // Manera segura de forzar reactividad - crear una copia nueva
    const certsCopy = [...certificates.value];
    certificates.value = certsCopy;
    
    // Intentar actualizar visualmente
    updateCertificatesText();
  }
}, { immediate: true });

// Función para actualizar textos visualmente
const updateCertificatesText = () => {
  setTimeout(() => {
    try {
      const elements = document.querySelectorAll('#certificaciones .text-primary, #certificaciones .text-gray-400');
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '0.99';
          setTimeout(() => { 
            if (el) el.style.opacity = '1'; 
          }, 50);
        }
      });
    } catch (error) {
      console.warn('Error al actualizar textos de certificados:', error);
    }
  }, 100);
};

// Escuchar eventos de actualización de idioma
if (typeof window !== 'undefined') {
  window.addEventListener('languageChanged', () => {
    try {
      // Forzar reactividad con una nueva copia
      const certsCopy = [...certificates.value];
      certificates.value = certsCopy;
      
      // Actualizar textos visualmente
      updateCertificatesText();
    } catch (error) {
      console.warn('Error actualizando certificados:', error);
    }
  });
}
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
          <h3 class="text-2xl font-semibold text-primary mb-3">
            {{ typeof cert.title === 'object' ? cert.title[locale] : cert.title }}
          </h3>
          <p class="text-gray-300 font-semibold italic">{{ cert.issuer }}</p>
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
            {{ $t('sections.certifications.inProgress') }}
          </button>
          <a
            v-else-if="cert.pdfUrl"
            :href="cert.pdfUrl"
            target="_blank"
            class="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors flex items-center gap-2"
          >
            <i class="fas fa-file-pdf"></i>
            {{ $t('sections.projects.certificate') }}
          </a>
        </div>
      </div>
      <p class="mt-3 text-gray-400">
        {{ typeof cert.description === 'object' ? cert.description[locale] : cert.description }}
      </p>
    </div>
  </div>
</template>