import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import { refreshTranslations, triggerLanguageChanged } from './utils/i18nHelper';

// Controlar logs - establecer false para producción
const DEBUG_MODE = false;

// Función para logs controlados
const debugLog = (...args) => {
  if (DEBUG_MODE) {
    console.log(...args);
  }
};

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
        inProgress: 'Título en Trámite'
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
        inProgress: 'Title in Process'
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

debugLog('Mensajes de traducción definidos:', messages);

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
  sync: true,
  missingWarn: false,
  fallbackWarn: false,
  runtimeOnly: false,
  compositionOnly: true,
  fullInstall: true
});

// Crear un método global para forzar la actualización de traducciones
function forceI18nRefresh() {
  // Usar la utilidad para disparar el evento de cambio de idioma
  triggerLanguageChanged();
  
  // También actualizar directamente el DOM
  const appElement = document.querySelector('#app');
  if (appElement && appElement.__vue_app__) {
    const vm = appElement.__vue_app__._instance;
    if (vm && vm.proxy && typeof vm.proxy.$forceUpdate === 'function') {
      vm.proxy.$forceUpdate();
    }
  }
  
  // Refrescar todas las traducciones visibles
  refreshTranslations('body *[data-i18n], h1, h2, h3, p, a, button, label, span');
}

// Agregar al objeto window para poder acceder desde cualquier lugar
if (typeof window !== 'undefined') {
  window.forceI18nRefresh = forceI18nRefresh;
}

const app = createApp(App);
app.use(i18n);

// Sistema de reactividad simplificado
window.addEventListener('languageChanged', () => {
  const appElement = document.querySelector('#app');
  if (appElement && appElement.__vue_app__) {
    const vm = appElement.__vue_app__._instance;
    if (vm && vm.proxy && typeof vm.proxy.$forceUpdate === 'function') {
      // Forzar actualización del componente principal
      vm.proxy.$forceUpdate();
      
      // También actualizar los componentes hijos
      if (vm.subTree && vm.subTree.children) {
        setTimeout(() => {
          // Recorrer el árbol de componentes y forzar actualización
          const updateComponents = (components) => {
            if (!components) return;
            // Asegurarse de que components sea un array antes de usar forEach
            if (Array.isArray(components)) {
              components.forEach(component => {
                if (component && component.component && component.component.proxy) {
                  try {
                    component.component.proxy.$forceUpdate();
                  } catch (error) {
                    debugLog('Error forzando actualización:', error);
                  }
                }
                if (component && component.children) {
                  updateComponents(component.children);
                }
              });
            } else if (components.component && components.component.proxy) {
              // Si no es un array, pero tiene un componente
              try {
                components.component.proxy.$forceUpdate();
              } catch (error) {
                debugLog('Error forzando actualización de componente individual:', error);
              }
              
              if (components.children) {
                updateComponents(components.children);
              }
            }
          };
          
          updateComponents(vm.subTree.children);
          debugLog('Actualizando componentes después del cambio de idioma');
        }, 50);
      }
    }
  }
});

app.mount('#app');

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
    try {
      const currentLocale = i18n.global.locale.value;
      debugLog('Aplicando traducciones para:', currentLocale);
      
      // Función auxiliar para reemplazar texto en nodos
      function processNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.nodeValue;
          Object.keys(translationKeys).forEach(key => {
            if (text && text.includes(key)) {
              node.nodeValue = text.replace(key, translationKeys[key][currentLocale]);
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
            // Procesar atributos para elementos como placeholders, titles, etc.
            if (node.hasAttributes()) {
              for (let i = 0; i < node.attributes.length; i++) {
                const attr = node.attributes[i];
                Object.keys(translationKeys).forEach(key => {
                  if (attr.value && attr.value.includes(key)) {
                    attr.value = attr.value.replace(key, translationKeys[key][currentLocale]);
                  }
                });
              }
            }
            
            // Procesar elementos hijos
            Array.from(node.childNodes).forEach(child => processNode(child));
          }
        }
      }
      
      // Procesar todo el cuerpo del documento
      processNode(document.body);
    } catch (error) {
      debugLog('Error al actualizar traducciones:', error);
    }
  }

  // Escuchar eventos con tiempos más cortos
  document.addEventListener('languageChanged', () => {
    // Ejecutar primero inmediatamente
    doReplace();
    
    // Una actualización adicional después de un corto periodo
    setTimeout(doReplace, 200);
  });

  window.addEventListener('DOMContentLoaded', doReplace);
  window.addEventListener('load', doReplace);

  // Ejecutar solo unas pocas veces en lugar de 15 veces
  let count = 0;
  const interval = setInterval(() => {
    doReplace();
    count++;
    if (count >= 3) clearInterval(interval); // Reducido de 15 a 3 veces
  }, 250);

  // Observar cambios en el DOM con una configuración más ligera
  const observer = new MutationObserver(() => {
    doReplace();
  });

  window.addEventListener('load', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false, // Reducir el alcance de observación
      attributes: false,    // Reducir el alcance de observación
    });
  });
}

// Ejecutar la función de reemplazo
replaceTranslationKeys();

// Agregar evento para asegurar que las traducciones se apliquen al cargar la página
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    debugLog('DOMContentLoaded: Aplicando traducciones iniciales');
    
    // Aplicar con un pequeño retraso para asegurar que todos los componentes estén montados
    setTimeout(() => {
      const currentLang = i18n.global.locale.value;
      debugLog('Idioma inicial detectado:', currentLang);
      
      // Una sola actualización en lugar de múltiples
      triggerLanguageChanged();
      refreshTranslations('body *');
    }, 100);
  });
  
  // Una última actualización después de la carga completa
  window.addEventListener('load', () => {
    setTimeout(() => {
      triggerLanguageChanged();
      refreshTranslations('body *');
    }, 500);
  });
}
