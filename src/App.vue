<script setup>
import { ref, onMounted, computed } from 'vue';
import Projects from './components/Projects.vue';
import Contact from './components/Contact.vue';
import Certificates from './components/Certificates.vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const currentLanguage = computed(() => locale.value);

const toggleLanguage = () => {
  const newLang = currentLanguage.value === 'es' ? 'en' : 'es';
  locale.value = newLang;
  localStorage.setItem('language', newLang);
};

const habilidades = computed(() => [
  { nombre: 'HTML', icono: 'devicon-html5-plain' },
  { nombre: 'CSS', icono: 'devicon-css3-plain' },
  { nombre: 'JavaScript', icono: 'devicon-javascript-plain' },
  { nombre: 'PHP', icono: 'devicon-php-plain' },
  { nombre: 'MySQL/SQL', icono: 'devicon-mysql-plain' },
  { nombre: 'Vue', icono: 'devicon-vuejs-plain' },
  { nombre: 'React', icono: 'devicon-react-original' },
  { nombre: 'Node', icono: 'devicon-nodejs-plain' },
  { nombre: 'MongoDB', icono: 'devicon-mongodb-plain' },
  { nombre: 'Laravel', icono: 'devicon-laravel-plain' },
  { nombre: 'WordPress', icono: 'devicon-wordpress-plain' },
  { nombre: 'Adobe Photoshop', icono: 'devicon-photoshop-plain' },
  { nombre: 'Adobe Illustrator', icono: 'devicon-illustrator-plain' },
  { nombre: t('skills.officePackage'), icono: 'fas fa-file-word' },
  { nombre: t('skills.graphicDesign'), icono: 'fas fa-palette' },
  { nombre: t('skills.uxui'), icono: 'fas fa-pencil-ruler' }
]);

const activeSection = ref('');
const menuOpen = ref(false);

// Para detectar la sección activa mientras se hace scroll
onMounted(() => {
  const sections = document.querySelectorAll('section[id]');
  
  // Implementa el scroll suave
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Función para detectar la sección visible durante el scroll
  const checkVisibility = () => {
    const scrollPosition = window.scrollY + 300;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeSection.value = sectionId;
      }
    });
  };
  
  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Ejecutar al cargar
});

// Función para cerrar el menú después de hacer clic en un enlace
const closeMenu = () => {
  menuOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-dark text-white relative overflow-hidden">
    <!-- Animación de fondo con código matriz -->
    <div class="absolute inset-0 opacity-10 z-0">
      <div class="code-background"></div>
      <div class="matrix-code"></div>
    </div>

    <!-- Efecto de gradiente animado -->
    <div class="fixed inset-0 opacity-20 z-0">
      <div class="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary animate-gradient"></div>
    </div>

    <!-- Contenido principal -->
    <div class="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
      <!-- Navegación -->
      <nav class="fixed top-0 left-0 right-0 z-50 py-4 bg-dark/80 backdrop-blur-md shadow-md">
        <div class="container mx-auto px-4 max-w-6xl flex justify-between items-center">
          <!-- Logo de la marca -->
          <div class="flex items-center gap-4">
            <div class="text-primary font-bold">
              <a href="#inicio" class="hidden md:inline text-2xl hover:brightness-125 transition-all">Joaquín Guerreiro</a>
              <span class="md:hidden text-2xl">JG</span>
            </div>
            
            <!-- Botón de idioma -->
            <div class="relative">
              <button 
                @click="toggleLanguage"
                class="px-3 py-1 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors flex items-center gap-2"
              >
                <i class="fas fa-globe text-md"></i>
                <span class="text-md font-medium">{{ currentLanguage.toUpperCase() }}</span>
              </button>
            </div>
          </div>
          
          <!-- Menú de navegación (escritorio) -->
          <ul class="hidden md:flex space-x-8">
            <li v-for="(section, index) in ['habilidades', 'proyectos', 'certificaciones', 'contacto']" :key="index">
              <a 
                :href="`#${section}`" 
                class="py-2 px-1 text-lg font-medium relative group transition-all"
                :class="activeSection === section ? 'text-primary brightness-125' : 'text-gray-300 hover:text-white'"
              >
                {{ $t(`nav.${section === 'habilidades' ? 'skills' : 
                            section === 'proyectos' ? 'projects' : 
                            section === 'certificaciones' ? 'certifications' : 'contact'}`) }}
                <!-- Subrayado animado -->
                <span 
                  class="block w-full h-0.5 absolute bottom-0 left-0 bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" 
                  :class="activeSection === section ? 'scale-x-100' : ''"
                ></span>
              </a>
            </li>
          </ul>
          
          <!-- Botón de menú hamburguesa -->
          <button 
            @click="menuOpen = !menuOpen" 
            class="md:hidden text-white focus:outline-none"
          >
            <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Menú móvil desplegable -->
        <div 
          v-show="menuOpen" 
          class="md:hidden absolute top-full left-0 right-0 bg-dark-light border-t border-gray-800 shadow-lg"
        >
          <div class="container mx-auto px-4 max-w-6xl">
            <ul class="py-2">
              <li v-for="(section, index) in ['habilidades', 'proyectos', 'certificaciones', 'contacto']" :key="index"
                  class="border-b border-gray-800 last:border-b-0">
                <a 
                  :href="`#${section}`" 
                  @click="closeMenu"
                  class="block py-3 px-6 text-base font-medium transition-colors"
                  :class="activeSection === section ? 'text-primary' : 'text-gray-300 hover:bg-dark hover:text-white'"
                >
                  {{ section.charAt(0).toUpperCase() + section.slice(1) }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Espacio -->
      <div class="h-20"></div>

      <!-- Header -->
      <header id="inicio" class="text-center mb-24 p-8 bg-dark-light bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg border border-primary/20">
        <div class="inline-block p-1.5 rounded-full bg-gradient-to-r from-primary to-blue-500 mb-6">
          <div class="w-48 h-48 rounded-full overflow-hidden">
            <img src="./assets/joako-color.jpg" alt="Joaquín Guerreiro" class="w-full h-full object-cover">
          </div>
        </div>
        <h1 class="text-5xl font-bold mb-4 text-white">Joaquín Guerreiro Apolonia</h1>
        <p class="text-xl text-primary"><strong>{{ $t('header.role') }}</strong></p>
    </header>
    
      <!-- Sección de habilidades -->
      <section id="habilidades" class="mb-28 scroll-mt-32">
        <h2 class="text-3xl font-bold mb-12 text-center text-primary relative">
          {{ $t('sections.skills.title') }}
          <span class="block h-1 w-24 bg-primary mx-auto mt-4"></span>
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="habilidad in habilidades" :key="habilidad.nombre" 
               class="bg-dark-light p-5 rounded-lg text-center hover:bg-primary/10 hover:scale-105 hover:shadow-md hover:shadow-primary/20 transition-all duration-300 border border-gray-800 flex flex-col items-center justify-center">
            <i :class="[habilidad.icono, 'text-5xl mb-4 text-primary']"></i>
            <span>{{ habilidad.nombre }}</span>
          </div>
        </div>
    </section>

      <!-- Sección de proyectos -->
      <section id="proyectos" class="mb-28 scroll-mt-32">
        <h2 class="text-3xl font-bold mb-12 text-center text-primary relative">
          {{ $t('sections.projects.title') }}
          <span class="block h-1 w-24 bg-primary mx-auto mt-4"></span>
        </h2>
      <Projects />
    </section>

      <!-- Sección de certificados -->
      <section id="certificaciones" class="mb-28 scroll-mt-32">
        <h2 class="text-3xl font-bold mb-12 text-center text-primary relative">
          {{ $t('sections.certifications.title') }}
          <span class="block h-1 w-24 bg-primary mx-auto mt-4"></span>
        </h2>
        <Certificates />
      </section>

      <!-- Sección de contacto -->
      <section id="contacto" class="mb-16 scroll-mt-32">
        <h2 class="text-3xl font-bold mb-12 text-center text-primary relative">
          {{ $t('sections.contact.title') }}
          <span class="block h-1 w-24 bg-primary mx-auto mt-4"></span>
        </h2>
        <Contact />
      </section>

      <!-- Footer -->
      <footer class="text-center text-gray-400 py-6 border-t border-gray-800 mt-20">
        <a href="#inicio"><img src="/src/assets/JG-png-logo.png" alt="Logo de Joaquín Guerreiro Apolonia, JG." class="mx-auto mb-4 w-9 inline-block hover:scale-105 transition-transform hover:brightness-125"></a>
        <p>&copy; {{ new Date().getFullYear() }} Joaquín Guerreiro Apolonia. {{ $t('header.rights') }}</p>
        <div class="flex justify-center mt-4 space-x-4">

          <a href="https://www.linkedin.com/in/joaquin-guerreiro-apolonia/" target="_blank" class="text-primary hover:text-white transition-colors">
            <span class="sr-only">LinkedIn</span>
            <svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          <a href="https://github.com/JoaquinGuerreiro" target="_blank" class="text-primary hover:text-white transition-colors">
            <span class="sr-only">GitHub</span>
            <svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
.code-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(rgba(13, 17, 23, 0.8), rgba(13, 17, 23, 0.8)),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2300b4d8' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  z-index: -10;
}

/* MATRIZ DE CÓDIGO */
.matrix-code {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: -5;
  pointer-events: none;
}

.matrix-code::before, .matrix-code::after {
  content: none;
}

.matrix-code::after {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 300%;
  background-image: 
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1500' height='1000' viewBox='0 0 1500 1000'%3E%3Ctext x='200' y='20' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3E11001%3C/text%3E%3Ctext x='200' y='40' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3Earray%3C/text%3E%3Ctext x='200' y='60' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Efilter%3C/text%3E%3Ctext x='200' y='80' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.6'%3E01100%3C/text%3E%3Ctext x='200' y='100' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Ewhile%3C/text%3E%3Ctext x='200' y='120' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3Efor()%3C/text%3E%3Ctext x='200' y='140' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Eeach%3C/text%3E%3Ctext x='200' y='160' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.6'%3E10101%3C/text%3E%3Ctext x='200' y='180' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Ebreak%3C/text%3E%3Ctext x='200' y='200' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3Eswitch%3C/text%3E%3Ctext x='700' y='40' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Elet%3C/text%3E%3Ctext x='700' y='60' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3Econst%3C/text%3E%3Ctext x='700' y='80' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Evar%3C/text%3E%3Ctext x='700' y='100' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.6'%3E1010%3C/text%3E%3Ctext x='700' y='120' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Eexport%3C/text%3E%3Ctext x='700' y='140' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3Edefault%3C/text%3E%3Ctext x='700' y='160' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Easync%3C/text%3E%3Ctext x='700' y='180' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.6'%3E10101%3C/text%3E%3Ctext x='700' y='200' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Eawait%3C/text%3E%3Ctext x='1200' y='20' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3Emodule%3C/text%3E%3Ctext x='1200' y='40' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Erequire%3C/text%3E%3Ctext x='1200' y='60' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.6'%3E1101%3C/text%3E%3Ctext x='1200' y='80' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Epackage%3C/text%3E%3Ctext x='1200' y='100' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3Ejson%3C/text%3E%3Ctext x='1200' y='120' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Ehtml%3C/text%3E%3Ctext x='1200' y='140' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.6'%3E010%3C/text%3E%3Ctext x='1200' y='160' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Escript%3C/text%3E%3Ctext x='1200' y='180' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3Estyle%3C/text%3E%3Ctext x='1200' y='200' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Ebody%3C/text%3E%3C/svg%3E");
  background-repeat: repeat-y;
  animation: matrix-code-fall 30s linear infinite;
}

/* Segunda capa de texto para una distribución alternativa */
.matrix-code::before {
  content: "";
  position: absolute;
  top: -120%;
  left: 0;
  width: 100%;
  height: 300%;
  background-image: 
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1500' height='1000' viewBox='0 0 1500 1000'%3E%3Ctext x='450' y='20' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.6'%3E0110%3C/text%3E%3Ctext x='450' y='40' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3E&lt;div&gt;%3C/text%3E%3Ctext x='450' y='60' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3Efunction()%3C/text%3E%3Ctext x='450' y='80' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3E{return}%3C/text%3E%3Ctext x='450' y='100' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.6'%3E10101%3C/text%3E%3Ctext x='450' y='120' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Eimport%3C/text%3E%3Ctext x='450' y='140' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3Eclass%3C/text%3E%3Ctext x='450' y='160' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Ecomponent%3C/text%3E%3Ctext x='450' y='180' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.6'%3E0101%3C/text%3E%3Ctext x='450' y='200' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Evue%3C/text%3E%3Ctext x='950' y='20' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3E@media%3C/text%3E%3Ctext x='950' y='40' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Escreen%3C/text%3E%3Ctext x='950' y='60' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.6'%3E1001%3C/text%3E%3Ctext x='950' y='80' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Eselector%3C/text%3E%3Ctext x='950' y='100' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3Eflex%3C/text%3E%3Ctext x='950' y='120' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Egrid%3C/text%3E%3Ctext x='950' y='140' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.6'%3E10001%3C/text%3E%3Ctext x='950' y='160' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3Estyle%3C/text%3E%3Ctext x='950' y='180' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.8'%3EkeyFrame%3C/text%3E%3Ctext x='950' y='200' fill='%2300b4d8' font-family='monospace' font-size='14' opacity='0.7'%3E{state}%3C/text%3E%3C/svg%3E");
  background-repeat: repeat-y;
  animation: matrix-code-fall-alt 25s linear infinite;
}

@keyframes matrix-code-fall {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(33.33%);
  }
}

@keyframes matrix-code-fall-alt {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(33.33%);
  }
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Estilos para el menú móvil */
@media (max-width: 768px) {
  .nav-open {
    height: auto;
    opacity: 1;
    visibility: visible;
  }
}
</style>


