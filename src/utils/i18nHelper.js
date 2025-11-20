/**
 * Utilidades para ayudar con el manejo de i18n en la aplicación
 */

// Función para mostrar mensajes de depuración solo si estamos en modo de depuración
const DEBUG_MODE = false;
const debugLog = (...args) => {
  if (DEBUG_MODE) {
    console.log(...args);
  }
};

/**
 * Dispara un evento personalizado para notificar a los componentes que el idioma ha cambiado
 */
export function triggerLanguageChanged() {
  if (typeof window === 'undefined') return;
  
  try {
    window.dispatchEvent(new CustomEvent('languageChanged'));
    debugLog('Evento de cambio de idioma disparado');
  } catch (error) {
    console.warn('Error al disparar evento de cambio de idioma:', error);
  }
}

/**
 * Fuerza una actualización de los textos traducidos en el DOM
 * @param {string} selector - Selector CSS para los elementos a actualizar
 */
export function refreshTranslations(selector = '[data-i18n]') {
  if (typeof document === 'undefined') return;
  
  try {
    // Intentar encontrar elementos con traducción
    const elements = document.querySelectorAll(selector);
    
    if (elements && elements.length) {
      // Forzar repintado con un pequeño cambio de opacidad
      elements.forEach(el => {
        if (el) {
          // Guardar el valor original de opacity
          const originalOpacity = el.style.opacity || '1';
          
          // Cambiar ligeramente la opacidad para forzar repintado
          el.style.opacity = '0.99';
          
          // Volver a la opacidad original después de un breve retraso
          setTimeout(() => {
            if (el) el.style.opacity = originalOpacity;
          }, 50);
        }
      });
    }
  } catch (error) {
    debugLog('Error actualizando traducciones:', error);
  }
}

/**
 * 
 * @param {string} text - Texto a traducir
 * @param {Object} translations - Diccionario de traducciones
 * @param {string} locale - Código de idioma actual
 * @returns {string} - Texto traducido
 */
/* 
export function applyTranslations(text, translations, locale) {
  if (!text || !translations || !locale) return text;
  
  try {
    let translatedText = text;
    
    // Reemplazar todas las claves de traducción en el texto
    Object.keys(translations).forEach(key => {
      if (translations[key] && translations[key][locale]) {
        translatedText = translatedText.replace(
          new RegExp(key, 'g'), 
          translations[key][locale]
        );
      }
    });
    
    return translatedText;
  } catch (error) {
    debugLog('Error aplicando traducciones:', error);
    return text;
  }
}
*/

// Exportar todas las funciones como un objeto por defecto
export default {
  refreshTranslations,
  triggerLanguageChanged,
  // applyTranslations
}; 