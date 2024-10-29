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
import DropdownQuoters from './components/DropdownQuoters.vue'

// Composables
import { createApp } from 'vue/dist/vue.esm-bundler'

// Use default component
if (document && document.getElementById('app')) {
    const app = createApp(App)
    registerPlugins(app)
    app.mount('#app')
}

// Use individual components in the HTML element
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
    appBuild.component('dropdown-quoters', DropdownQuoters)
    appBuild.mount('#sabedese-app')
}
