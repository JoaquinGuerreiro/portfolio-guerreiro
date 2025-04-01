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

// Solución temporal para asegurarse de que las traducciones se apliquen
// después de que el DOM esté listo
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      // Forzar una actualización de los componentes
      const currentLocale = i18n.global.locale.value;
      i18n.global.locale.value = currentLocale === 'es' ? 'en' : 'es';
      setTimeout(() => {
        i18n.global.locale.value = currentLocale;
      }, 10);
    }, 100);
  });
}
