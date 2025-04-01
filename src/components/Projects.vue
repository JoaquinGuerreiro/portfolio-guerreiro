<script setup>
import { ref, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import projectsData from '../data/projects.js';

const { t, locale } = useI18n();

// Crear una ref para los proyectos
const projects = ref(projectsData);

// Agregar watcher para forzar actualización cuando cambie el idioma
watch(locale, async (newLocale) => {
  // Forzar actualización de traducciones
  await nextTick();
  
  if (typeof document !== 'undefined') {
    // Disparar evento personalizado para actualizar este componente
    document.dispatchEvent(new CustomEvent('projectsLocaleUpdated'));
    
    // Manera segura de forzar reactividad - usar una nueva copia
    projects.value = [...projectsData];
    
    // Intentar actualizar visualmente los elementos
    updateProjectsText();
  }
}, { immediate: true });

// Función para actualizar elementos visuales
const updateProjectsText = () => {
  setTimeout(() => {
    try {
      const elements = document.querySelectorAll('#proyectos .text-primary, #proyectos .text-gray-300, #proyectos a');
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
      console.warn('Error al actualizar textos de proyectos:', error);
    }
  }, 100);
};

// Escuchar eventos de actualización de idioma
if (typeof window !== 'undefined') {
  window.addEventListener('languageChanged', () => {
    try {
      // Forzar reactividad actualizando la referencia a projects
      projects.value = [...projectsData];
      
      // Actualizar visualmente
      updateProjectsText();
    } catch (error) {
      console.warn('Error actualizando proyectos:', error);
    }
  });
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div v-for="project in projects" :key="project.title" 
         class="bg-dark-light rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-gray-800 hover:border-primary/30 h-[542px] flex flex-col">
      <!-- Imagen del proyecto -->
      <div class="h-44 bg-gradient-to-br from-dark-light to-primary/5 flex items-center justify-center overflow-hidden">
        <img 
          v-if="project.image" 
          :src="project.image" 
          :alt="typeof project.title === 'object' ? project.title[locale] : project.title"
          class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div v-else class="text-4xl text-primary/50 group-hover:text-primary/80 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      </div>
      
      <!-- Contenido del proyecto -->
      <div class="p-6 pt-4 flex flex-col flex-grow">
        <h3 class="text-lg font-bold mb-2 text-primary group-hover:brightness-125 transition">
          {{ typeof project.title === 'object' ? project.title[locale] : project.title }}
        </h3>
        <p class="text-gray-300 mb-6 flex-grow">
          {{ typeof project.description === 'object' ? project.description[locale] : project.description }}
        </p>
        <div class="flex flex-wrap gap-3 mt-auto">
          <a v-if="project.github" :href="project.github" target="_blank" 
             class="flex items-center justify-center px-4 py-2 bg-primary/10 rounded-lg hover:bg-primary/30 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
            </svg>
            {{ $t('sections.projects.github') }}
          </a>
          <a v-if="project.demo" :href="project.demo" target="_blank"
             class="flex items-center justify-center px-4 py-2 bg-primary/20 rounded-lg hover:bg-primary transition-colors hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ $t('sections.projects.demo') }}
          </a>
          <a v-if="project.pdfUrl" :href="project.pdfUrl" target="_blank"
             class="flex items-center justify-center px-4 py-2 bg-primary/20 rounded-lg hover:bg-primary transition-colors hover:text-white">
            <i class="fas fa-file-pdf mr-2"></i>
            {{ $t('sections.projects.pdf') }}
          </a>
          <a v-if="project.pdfUrl2" :href="project.pdfUrl2" target="_blank"
             class="flex items-center justify-center px-4 py-2 bg-primary/20 rounded-lg hover:bg-primary transition-colors hover:text-white">
            <i class="fas fa-file-pdf mr-2"></i>
            {{ $t('sections.projects.pdf') }}
          </a>
          <a v-if="project.gifUrl" :href="project.gifUrl" target="_blank"
             class="flex items-center justify-center px-4 py-2 bg-primary/20 rounded-lg hover:bg-primary transition-colors hover:text-white">
            <i class="fas fa-file-video mr-2"></i>
            {{ $t('sections.projects.gif') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.project-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

a {
  color: #42b983;
  text-decoration: none;
}
</style>