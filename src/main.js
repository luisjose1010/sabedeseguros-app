/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

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
    appBuild.mount('#sabedese-app')
}
