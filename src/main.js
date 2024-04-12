/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import HealthQuoter from './components/HealthQuoter.vue'

// Composables
import { createApp } from 'vue/dist/vue.esm-bundler'

if (document && document.getElementById('app')) {
    const app = createApp(App)
    registerPlugins(app)
    app.mount('#app')
}

if (document && document.getElementById('sabedese-app')) {
    const appBuild = createApp({})
    registerPlugins(appBuild)
    appBuild.component('health-quoter', HealthQuoter)
    appBuild.mount('#sabedese-app')
}
