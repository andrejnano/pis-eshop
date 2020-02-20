# Frontend VUE

| App Structure |   |
|-------------------|---|
| `public/`         | static web data, index.html, robots.txt,... |
| `server/`         |  production nginx server |
| `src/`            |  Vue app source code |
| `.browserlistrc`  |  list of browsers to support |
| `.dockerignore`   |  list of files/dirs to ignore when copying to container |
| `.eslintrc.js`    |  linting rules |
| `.gitignore`      |  list of files/dirs to ignore |
| `.npmrc`          |  npm config |
| `babel.config.js` |  transpilation config |
| `Dockerfile`      |  docker image file |
| `jsconfig.json`   |   |
| `package.json`    |  package config and dependencies |
| `vue.config.js`   | vue app configuration  |


| Vue App Structure (`src/`)|   |
|-------------------------------|---|
| `assets/`                     | media assets (images/videos/data/..) |
| `components/`                 | reusable components |
| `pages/`                      | pages |
| `router/`                     | routing controller, setup of navigation routes |
| `store/`                      | state management |
| `styles/`                     | CSS/SCSS global styles |
| `App.vue`                     | root component |
| `main.js`                     | main injected JS file |
| `registerServiceWorker.js`    | PWA support, service worker, offline/cache fetching |
