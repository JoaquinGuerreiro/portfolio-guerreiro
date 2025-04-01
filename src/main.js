import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'

// Definir mensajes de traducción directamente en el archivo
const messages = {
  es: {
    nav: {
      skills: 'Habilidades',
      projects: 'Proyectos',
      certifications: 'Certificaciones',
      contact: 'Contacto'
    },
    header: {
      role: 'Desarrollador y Programador Web',
      rights: 'Todos los derechos reservados'
    },
    sections: {
      skills: {
        title: 'Habilidades y Tecnologías'
      },
      projects: {
        title: 'Mis Proyectos',
        view: 'Ver',
        certificate: 'Certificado',
        pdf: 'PDF',
        gif: 'GIF',
        github: 'GitHub',
        demo: 'Sitio',
        technologies: 'Tecnologías utilizadas',
        inProgress: 'En Desarrollo'
      },
      certifications: {
        title: 'Certificaciones',
        issuer: 'Emisor',
        date: 'Fecha',
        inProgress: 'En curso'
      },
      contact: {
        title: 'Contacto',
        info: 'Información de contacto',
        form: {
          name: 'Nombre',
          email: 'Email',
          subject: 'Asunto',
          message: 'Mensaje',
          send: 'Enviar mensaje',
          sending: 'Enviando...',
          success: '¡Mensaje enviado con éxito!',
          error: 'Hubo un error al enviar el mensaje',
          tryAgain: 'Enviar otro mensaje',
          thanks: 'Gracias por contactarme. Te responderé a la brevedad.',
          fillOrContact: 'Completá el formulario o contactame directamente a través de:'
        },
        location: 'Ubicación',
        downloadCV: 'Descargar CV',
        phone: 'Teléfono',
        email: 'Correo electrónico',
        instagram: 'Instagram',
        socialMedia: 'Redes Sociales'
      }
    },
    skills: {
      graphicDesign: 'Diseño Gráfico',
      uxui: 'Diseño UX/UI',
      officePackage: 'Paquete de Office'
    }
  },
  en: {
    nav: {
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications',
      contact: 'Contact'
    },
    header: {
      role: 'Web Developer and Programmer',
      rights: 'All rights reserved'
    },
    sections: {
      skills: {
        title: 'Skills & Technologies'
      },
      projects: {
        title: 'My Projects',
        view: 'View',
        certificate: 'Certificate',
        pdf: 'PDF',
        gif: 'GIF',
        github: 'GitHub',
        demo: 'Site',
        technologies: 'Technologies used',
        inProgress: 'In Progress'
      },
      certifications: {
        title: 'Certifications',
        issuer: 'Issuer',
        date: 'Date',
        inProgress: 'In Progress'
      },
      contact: {
        title: 'Contact',
        info: 'Contact Information',
        form: {
          name: 'Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
          send: 'Send message',
          sending: 'Sending...',
          success: 'Message sent successfully!',
          error: 'There was an error sending the message',
          tryAgain: 'Send another message',
          thanks: 'Thank you for contacting me. I will reply shortly.',
          fillOrContact: 'Fill out the form or contact me directly through:'
        },
        location: 'Location',
        downloadCV: 'Resume',
        phone: 'Phone',
        email: 'Email',
        instagram: 'Instagram',
        socialMedia: 'Social Media'
      }
    },
    skills: {
      graphicDesign: 'Graphic Design',
      uxui: 'UX/UI Design',
      officePackage: 'Office Package'
    }
  }
};

console.log('Mensajes de traducción definidos:', messages);

// Función segura para acceder a localStorage
function getLocalStorageItem(key, defaultValue) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      return defaultValue;
    }
  }
  return defaultValue;
}

// Inicializa i18n con una verificación de entorno
const i18n = createI18n({
  legacy: false,
  locale: getLocalStorageItem('language', 'es'),
  fallbackLocale: 'es',
  messages,
  globalInjection: true,
  warnHtmlMessage: false,
  silentTranslationWarn: true,
  sync: true
})

console.log('i18n configurado, locale actual:', i18n.global.locale.value);

const app = createApp(App)
app.use(i18n)
app.mount('#app')

// SOLUCIÓN PARA REEMPLAZAR CLAVES DE TRADUCCIÓN EN MODO PRODUCCIÓN
function replaceTranslationKeys() {
  if (typeof window === 'undefined') return;
  
  // Crear diccionario de traducciones para ambos idiomas
  const translationKeys = {
    'nav.skills': { es: 'Habilidades', en: 'Skills' },
    'nav.projects': { es: 'Proyectos', en: 'Projects' },
    'nav.certifications': { es: 'Certificaciones', en: 'Certifications' },
    'nav.contact': { es: 'Contacto', en: 'Contact' },
    'header.role': { es: 'Desarrollador y Programador Web', en: 'Web Developer and Programmer' },
    'header.rights': { es: 'Todos los derechos reservados', en: 'All rights reserved' },
    'sections.skills.title': { es: 'Habilidades y Tecnologías', en: 'Skills & Technologies' },
    'sections.projects.title': { es: 'Mis Proyectos', en: 'My Projects' },
    'sections.certifications.title': { es: 'Certificaciones', en: 'Certifications' },
    'sections.contact.title': { es: 'Contacto', en: 'Contact' },
    'sections.contact.info': { es: 'Información de contacto', en: 'Contact Information' },
    'sections.contact.form.fillOrContact': { 
      es: 'Completá el formulario o contactame directamente a través de:', 
      en: 'Fill out the form or contact me directly through:' 
    },
    'sections.contact.email': { es: 'Correo electrónico', en: 'Email' },
    'sections.contact.phone': { es: 'Teléfono', en: 'Phone' },
    'sections.contact.instagram': { es: 'Instagram', en: 'Instagram' },
    'sections.contact.location': { es: 'Ubicación', en: 'Location' },
    'sections.contact.downloadCV': { es: 'Descargar CV', en: 'Resume' },
    'sections.contact.form.name': { es: 'Nombre', en: 'Name' },
    'sections.contact.form.email': { es: 'Email', en: 'Email' },
    'sections.contact.form.subject': { es: 'Asunto', en: 'Subject' },
    'sections.contact.form.message': { es: 'Mensaje', en: 'Message' },
    'sections.contact.form.send': { es: 'Enviar mensaje', en: 'Send message' },
    'sections.projects.github': { es: 'GitHub', en: 'GitHub' },
    'sections.projects.demo': { es: 'Sitio', en: 'Site' },
    'sections.projects.pdf': { es: 'PDF', en: 'PDF' },
    'sections.projects.gif': { es: 'GIF', en: 'GIF' },
    'sections.certifications.inProgress': { es: 'En curso', en: 'In Progress' },
    'sections.projects.certificate': { es: 'Certificado', en: 'Certificate' },
    'skills.graphicDesign': { es: 'Diseño Gráfico', en: 'Graphic Design' },
    'skills.uxui': { es: 'Diseño UX/UI', en: 'UX/UI Design' },
    'skills.officePackage': { es: 'Paquete de Office', en: 'Office Package' }
  };
  
  // Función para reemplazar las claves
  function doReplace() {
    setTimeout(() => {
      const currentLocale = i18n.global.locale.value;
      
      // Función auxiliar para reemplazar texto en nodos
      function processNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const trimmedText = node.nodeValue.trim();
          if (translationKeys[trimmedText] && translationKeys[trimmedText][currentLocale]) {
            node.nodeValue = node.nodeValue.replace(
              trimmedText, 
              translationKeys[trimmedText][currentLocale]
            );
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // No procesar scripts ni estilos
          if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
            node.childNodes.forEach(child => processNode(child));
          }
        }
      }
      
      // Procesar todo el cuerpo del documento
      processNode(document.body);
      
      console.log('Reemplazo de claves de traducción completado para el idioma:', currentLocale);
    }, 100); // Pequeño retraso para asegurar que el DOM esté listo
  }
  
  // Ejecutar al cargar y cuando cambie el idioma
  window.addEventListener('DOMContentLoaded', doReplace);
  document.addEventListener('DOMContentLoaded', doReplace);
  
  // También ejecutar después de que la página esté completamente cargada
  window.addEventListener('load', doReplace);
  
  // Observar cambios en el idioma usando intervalo
  if (typeof window !== 'undefined') {
    // Crear una variable para seguir el idioma actual
    let currentLocaleValue = i18n.global.locale.value;
    
    // Verificar periódicamente si ha cambiado el idioma
    setInterval(() => {
      if (currentLocaleValue !== i18n.global.locale.value) {
        currentLocaleValue = i18n.global.locale.value;
        doReplace();
        console.log('Idioma cambiado a:', currentLocaleValue);
      }
    }, 500);
  }
  
  // Ejecutar cada segundo durante los primeros 5 segundos para asegurar que se aplique
  let count = 0;
  const interval = setInterval(() => {
    doReplace();
    count++;
    if (count >= 5) clearInterval(interval);
  }, 1000);
}

// Ejecutar la función de reemplazo
replaceTranslationKeys();
