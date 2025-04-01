<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import emailjs from '@emailjs/browser';

const { t, locale } = useI18n();

// Función para actualizar los enlaces del CV
const updateCvLinks = () => {
  try {
    const cvPath = getCvPath();
    const cvLinks = document.querySelectorAll('a[href*="/cv/"]');
    if (cvLinks && cvLinks.length) {
      cvLinks.forEach(link => {
        link.setAttribute('href', cvPath);
      });
    }
  } catch (error) {
    console.warn('Error actualizando enlaces de CV:', error);
  }
};

// Función para actualizar visualmente los elementos
const updateContactElements = () => {
  setTimeout(() => {
    try {
      const elements = document.querySelectorAll('#contacto label, #contacto button, #contacto h3, #contacto h4, #contacto p, #contacto a');
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
      console.warn('Error actualizando elementos de contacto:', error);
    }
  }, 100);
};

// Método para forzar actualización del componente
const forceContactUpdate = () => {
  try {
    // Actualizar los enlaces del CV
    updateCvLinks();
    
    // Actualizar visualmente los elementos
    updateContactElements();
  } catch (error) {
    console.warn('Error actualizando componente Contact:', error);
  }
};

// Agregar watcher para forzar actualización cuando cambie el idioma
watch(locale, async () => {
  // Forzar actualización de traducciones
  await nextTick();
  forceContactUpdate();
}, { immediate: true });

// Escuchar eventos de actualización de idioma
onMounted(() => {
  if (typeof window !== 'undefined') {
    // Eventos globales
    window.addEventListener('languageChanged', forceContactUpdate);
    
    // Evento específico de componente
    document.addEventListener('localeUpdated', forceContactUpdate);
    
    // Exponer método al objeto window para acceso directo
    if (!window.forceUpdateComponents) {
      window.forceUpdateComponents = {};
    }
    window.forceUpdateComponents.contact = forceContactUpdate;
  }
});

// Configuración de EmailJS
const SERVICE_ID = 'service_4ks4viw';
const TEMPLATE_ID = 'template_o1fvmvm'; 
const PUBLIC_KEY = 'U7kilm7E4KQsFhYZX'; 

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const hasError = ref(false);
const errorMessage = ref('');

// Función para obtener la ruta del CV según el idioma
const getCvPath = () => {
  return locale.value === 'en' ? '/cv/Resume-JoaquinGuerreiro.pdf' : '/cv/CV-JoaquinGuerreiro.pdf';
};

const submitForm = async () => {
  isSubmitting.value = true;
  hasError.value = false;
  errorMessage.value = '';
  
  try {
    const templateParams = {
      from_name: formData.value.name,
      from_email: formData.value.email,
      subject: `[Portfolio Contact] ${formData.value.subject} - From: ${formData.value.name} (${formData.value.email})`,
      message: formData.value.message,
      to_name: 'Joaquín Guerreiro',
      reply_to: formData.value.email
    };
    
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    
    if (response.status === 200) {
      isSubmitted.value = true;
      formData.value = { name: '', email: '', subject: '', message: '' };
    } else {
      hasError.value = true;
      errorMessage.value = locale.value === 'es' ? 'Hubo un error al enviar el mensaje' : 'There was an error sending the message';
    }
  } catch (error) {
    hasError.value = true;
    errorMessage.value = locale.value === 'es' ? 'Hubo un error al enviar el mensaje' : 'There was an error sending the message';
    console.error('Error sending form:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// Inicializar EmailJS
emailjs.init(PUBLIC_KEY);
</script>

<template>
  <div class="mx-auto bg-dark-light p-8 rounded-xl border border-gray-800 shadow-lg">
    <div class="grid md:grid-cols-5 gap-10">
      <!-- Info de contacto -->
      <div class="md:col-span-2 space-y-6">
        <div>
          <h3 class="text-xl font-bold text-white mb-2">{{ locale === 'es' ? 'Información de contacto' : 'Contact Information' }}</h3>
          <p class="text-gray-400">{{ locale === 'es' ? 'Completá el formulario o contactame directamente a través de:' : 'Fill out the form or contact me directly through:' }}</p>
        </div>
        
        <!-- Email con enlace mailto -->
        <a href="mailto:joaquinguerreiro12@gmail.com" class="flex items-start space-x-3 hover:brightness-125 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <h4 class="text-sm font-medium text-white">{{ locale === 'es' ? 'Correo electrónico' : 'Email' }}</h4>
            <p class="text-gray-400">joaquinguerreiro12@gmail.com</p>
          </div>
        </a>
        
        <!-- Teléfono con enlace a WhatsApp -->
        <a href="https://wa.me/5491159770182" target="_blank" class="flex items-start space-x-3 pt-3 hover:brightness-125 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.5l.72 2.88a2 2 0 01-.45 1.95l-2.1 2.1a16.001 16.001 0 006.36 6.36l2.1-2.1a2 2 0 011.95-.45l2.88.72a2 2 0 011.5 1.94V19a2 2 0 01-2 2h-1a19.002 19.002 0 01-18-18V5z" />
          </svg>
          <div>
            <h4 class="text-sm font-medium text-white">{{ locale === 'es' ? 'Teléfono' : 'Phone' }}</h4>
            <p class="text-gray-400">+54 9 11 5977-0182</p>
          </div>
        </a>

        <a href="https://www.instagram.com/joakoguerreiro/" target="_blank" class="flex items-start space-x-3 pt-3 hover:brightness-125 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11.37a4 4 0 11-8 0 4 4 0 018 0zM17.5 6.5h.01" />
          </svg>
            <div>
              <h4 class="text-sm font-medium text-white">{{ locale === 'es' ? 'Instagram' : 'Instagram' }}</h4>
              <p class="text-gray-400">@joakoguerreiro</p>
            </div>
        </a>
        
        <div class="flex items-start space-x-3 pt-3 hover:brightness-125 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <h4 class="text-sm font-medium text-white">{{ locale === 'es' ? 'Ubicación' : 'Location' }}</h4>
            <p class="text-gray-400">Ciudad Autónoma de Buenos Aires, Argentina</p>
          </div>
        </div>
        
        <!-- Botón de CV destacado -->
        <div class="pt-6 pb-2 flex justify-center">
          <a :href="getCvPath()" target="_blank" 
             class="group flex items-center justify-center w-3/6 py-3 px-4 bg-primary text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-[1.02]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {{ locale === 'es' ? 'Descargar CV' : 'Resume' }}
          </a>
        </div>
        
        <div class="pt-2">
          <div class="flex space-x-4 justify-center">
            <a href="https://www.linkedin.com/in/joaquin-guerreiro-apolonia/" target="_blank" class="text-gray-400 hover:text-primary transition-colors">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-9 w-9" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://github.com/JoaquinGuerreiro" target="_blank" class="text-gray-400 hover:text-primary transition-colors">
              <span class="sr-only">GitHub</span>
              <svg class="h-9 w-9" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Formulario -->
      <div class="md:col-span-3">
        <form v-if="!isSubmitted" @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="name" class="block mb-2 text-left text-sm font-medium text-gray-300">{{ locale === 'es' ? 'Nombre' : 'Name' }}</label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              required
              class="w-full p-3 bg-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
            >
          </div>
          <div>
            <label for="email" class="block mb-2 text-left text-sm font-medium text-gray-300">{{ locale === 'es' ? 'Email' : 'Email' }}</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              required
              class="w-full p-3 bg-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
            >
          </div>
          <div>
            <label for="subject" class="block mb-2 text-left text-sm font-medium text-gray-300">{{ locale === 'es' ? 'Asunto' : 'Subject' }}</label>
            <input 
              type="text" 
              id="subject" 
              v-model="formData.subject" 
              required
              class="w-full p-3 bg-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
            >
          </div>
          <div>
            <label for="message" class="block mb-2 text-left text-sm font-medium text-gray-300">{{ locale === 'es' ? 'Mensaje' : 'Message' }}</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              rows="5" 
              required
              class="w-full p-3 bg-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
            ></textarea>
          </div>
          <div>
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full py-3 bg-gradient-to-r from-primary to-blue-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-primary/40"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ locale === 'es' ? 'Enviando...' : 'Sending...' }}
              </span>
              <span v-else>{{ locale === 'es' ? 'Enviar mensaje' : 'Send message' }}</span>
            </button>
          </div>
          <div v-if="hasError" class="text-red-400 mt-4 p-3 bg-red-400/10 rounded-lg">
            {{ locale === 'es' ? 'Hubo un error al enviar el mensaje' : 'There was an error sending the message' }}
          </div>
        </form>

        <div v-else class="text-center py-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">{{ locale === 'es' ? '¡Mensaje enviado con éxito!' : 'Message sent successfully!' }}</h3>
          <p class="text-gray-300 mb-6">{{ locale === 'es' ? 'Gracias por contactarme. Te responderé a la brevedad.' : 'Thank you for contacting me. I will reply shortly.' }}</p>
          <button 
            @click="isSubmitted = false" 
            class="py-2 px-4 bg-primary/20 rounded-lg hover:bg-primary/30 transition-colors"
          >
            {{ locale === 'es' ? 'Enviar otro mensaje' : 'Send another message' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>