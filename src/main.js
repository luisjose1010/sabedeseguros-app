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
import FuneralQuoter from './components/FuneralQuoter.vue'
import AccidentsQuoter from './components/AccidentsQuoter.vue'
import LifeQuoter from './components/LifeQuoter.vue'
import CarQuoter from './components/CarQuoter.vue'
import PatrimonialQuoter from './components/PatrimonialQuoter.vue'
import TransportQuoter from './components/TransportQuoter.vue'
import SuretyQuoter from './components/SuretyQuoter.vue'
import PetQuoter from './components/PetQuoter.vue'

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
    appBuild.component('funeral-quoter', FuneralQuoter)
    appBuild.component('accidents-quoter', AccidentsQuoter)
    appBuild.component('life-quoter', LifeQuoter)
    appBuild.component('car-quoter', CarQuoter)
    appBuild.component('patrimonial-quoter', PatrimonialQuoter)
    appBuild.component('transport-quoter', TransportQuoter)
    appBuild.component('surety-quoter', SuretyQuoter)
    appBuild.component('pet-quoter', PetQuoter)
    appBuild.mount('#sabedese-app')
}
