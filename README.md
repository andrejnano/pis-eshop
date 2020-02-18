# PIS projekt 2020 - Internetovy obchod (Eshop)

## Architecture: 3 containerized services

- **Frontend** (Vue served by nginx)
- **Backend** (Node/Java/PHP/...)
- *DB*? (MySQL/GraphQL/...)

## Setup

1. Install [Docker](https://docs.docker.com/install/)
2. Run **Docker Daemon**
3. `git clone https://github.com/andrejnano/pis-eshop.git`
4. `cd pis-eshop`
5. `make dev` (build & run services/containers in a dev configuration)
6. Open **frontend** app in browser: http://localhost:3000
7. Open **backend** app in browser: http://localhost:4000

**Optionally:**
- `make ps` to display running services (containers)
- `make clean` to stop containers and remove images
- `make dev-build` to rebuild images
- `make help` to display usage help


## Extra

- Vue tutorial: https://www.taniarascia.com/getting-started-with-vue/
- Install [Vue Dev Tools](https://github.com/vuejs/vue-devtools#vue-devtools)
- Install [Vetur VSCode extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
  - Syntax-highlighting
  - Snippet
  - Emmet
  - Linting / Error Checking
  - Formatting
  - Auto Completion
  - Debugging
- Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)


...


<h3>Essential Links</h3>
<ul>
    <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
    <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
    <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
    <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
    <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
</ul>
<h3>Ecosystem</h3>
<ul>
    <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
    <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
    <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
    <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
    <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
</ul>