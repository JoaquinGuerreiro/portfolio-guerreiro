import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import es from './i18n/es'
import en from './i18n/en'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'es',
  fallbackLocale: 'es',
  messages: {
    es,
    en
  }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
