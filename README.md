# SabedeSeguros App

Aplicación de cotizadores de seguros para la página web de Sabe de Seguros que utiliza Vue.js y Vuetify, con una estructura de proyecto creada mediante su herramienta oficial de "scaffolding". Está diseñada para utilizarse en el contexto de un [plugin personalizado](https://github.com/luisjose1010/sabedese-quoters "sabedese-quoters") de WordPress, por lo que puede montarse el componente principal en un elemento HTML con el id '#app' ubicado en cualquier lugar de un sitio web, o bien, utilizar cualquiera de los cotizadores individualmente mediante un elemento con el id '#sabedese-app', especificando el cotizador manualmente con su elemento.

## Uso

Se puede utilizar el componente por defecto montando la aplicación normal de Vue:

```html
<div id="app">
  <!-- Va a renderizar 'dropdown-quoters' automáticamente -->
</div>
```

o bien, se puede montar individualmente cada cotizador utilizando el componente correspondiente. Por ejemplo:

```html
<div id="sabedese-app">
  <dropdown-quoters></dropdown-quoters>
</div>
```

### Cotizadores disponibles

- **dropdown-quoters** - Cotizador desplegable con todo el resto de cotizadores.
- **health-quoter** - Cotizador para pólizas de salud.
- **funeral-quoter** - Cotizador para pólizas funerarias.
- **accidents-quoter** - Cotizador para pólizas de accidentes personales.
- **life-quoter** - Cotizador para pólizas de vida.
- **car-quoter** - Cotizador para pólizas de vehículos.
- **patrimonial-quoter** - Cotizador para pólizas patrimoniales.
- **transport-quoter** - Cotizador para pólizas de transporte.
- **surety-quoter** - Cotizador para pólizas de siniestro.
- **pet-quoter** - Cotizador para pólizas de mascotas.

### Uso dentro del plugin de WordPress

Para utilizar este componente en el [plugin](https://github.com/luisjose1010/sabedese-quoters "sabedese-quoters") de WordPress, se debe agregar la carpeta empaquetada del proyecto a la carpeta `/src/app` dentro de la respectiva raíz del plugin de WordPress. El plugin se encuentra configurado para mostrar los componentes al utilizar los "shortcodes" definidos para cada cotizador.

## Gestión del proyecto

El proyecto se gestiona íntegramente mediante la plataforma de gestión [ClickUp](https://app.clickup.com/ "ClickUp") en este [enlace](https://app.clickup.com/9013166617/v/f/90131438783/90130724656 "Proyecto ClickUp de SabedeSeguros"). Para acceder al respectivo enlace con las tareas y la organización del proyecto, que complementan la documentación del mismo, es necesario poseer una cuenta con los permisos necesarios.

![Tareas del proyecto](docs/project-tasks.png)

## ❗️ Important Links

- 📄 [Docs](https://vuetifyjs.com/)
- 🚨 [Issues](https://issues.vuetifyjs.com/)
- 🏬 [Store](https://store.vuetifyjs.com/)
- 🎮 [Playground](https://play.vuetifyjs.com/)
- 💬 [Discord](https://community.vuetifyjs.com)

## 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [yarn](https://yarnpkg.com/getting-started)                   | `yarn install` |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install` |
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

After completing the installation, your environment is ready for Vuetify development.

## ✨ Features

- 🖼️ **Optimized Front-End Stack**: Leverage the latest Vue 3 and Vuetify 3 for a modern, reactive UI development experience. [Vue 3](https://v3.vuejs.org/) | [Vuetify 3](https://vuetifyjs.com/en/)
- 🗃️ **State Management**: Integrated with [Pinia](https://pinia.vuejs.org/), the intuitive, modular state management solution for Vue.
- 🚦 **Routing and Layouts**: Utilizes Vue Router for SPA navigation and vite-plugin-vue-layouts for organizing Vue file layouts. [Vue Router](https://router.vuejs.org/) | [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
- ⚡ **Next-Gen Tooling**: Powered by Vite, experience fast cold starts and instant HMR (Hot Module Replacement). [Vite](https://vitejs.dev/)
- 🧩 **Automated Component Importing**: Streamline your workflow with unplugin-vue-components, automatically importing components as you use them. [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

These features are curated to provide a seamless development experience from setup to deployment, ensuring that your Vuetify application is both powerful and maintainable.

## 💡 Usage

This section covers how to start the development server and build your project for production.

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
yarn dev
```

(Repeat for npm, pnpm, and bun with respective commands.)

> Add NODE_OPTIONS='--no-warnings' to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.

### Building for Production

To build your project for production, use:

```bash
yarn build
```

(Repeat for npm, pnpm, and bun with respective commands.)

Once the build process is completed, your application will be ready for deployment in a production environment.

## 💪 Support Vuetify Development

This project is built with [Vuetify](https://vuetifyjs.com/en/), a UI Library with a comprehensive collection of Vue components. Vuetify is an MIT licensed Open Source project that has been made possible due to the generous contributions by our [sponsors and backers](https://vuetifyjs.com/introduction/sponsors-and-backers/). If you are interested in supporting this project, please consider:

- [Requesting Enterprise Support](https://support.vuetifyjs.com/)
- [Sponsoring John on Github](https://github.com/users/johnleider/sponsorship)
- [Sponsoring Kael on Github](https://github.com/users/kaelwd/sponsorship)
- [Supporting the team on Open Collective](https://opencollective.com/vuetify)
- [Becoming a sponsor on Patreon](https://www.patreon.com/vuetify)
- [Becoming a subscriber on Tidelift](https://tidelift.com/subscription/npm/vuetify)
- [Making a one-time donation with Paypal](https://paypal.me/vuetify)

## 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Vuetify, LLC
