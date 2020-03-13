# PIS projekt 2020 - Internetovy obchod (Eshop)

## Architecture: 3 containerized services

The application consists of three "microservices".
Each has a specific function:

- **Frontend**:a Nginx web server that **serves Vue.js** static files.
- **Backend**: a Node/Java/PHP application that **handles API requests** from the *Frontend*
- **Database**: a database instance for development (MySQL/GraphQL/...)

```
User <-> Browser <-> Client-side web app (FE) <-> HTTP <-> API (BE) <-> Routes <-> Controllers <-> Model <-> Database
```

### Development configuration

During development, each service works a bit different.

- Frontend doesn't use nginx, but a Vue development server, so it is possible to **live-edit** the source code of frontend, and see changes **hot-reloaded** instantly in the browser.
- Backend uses **pm2** process manager, which restarts node server each time source code changes.
- Database should be using volume for development purposes.


## Setup

1. Install [Docker](https://docs.docker.com/install/)
2. Run **Docker Daemon**
3. `git clone https://github.com/andrejnano/pis-eshop.git`
4. `cd pis-eshop`
5. `cp .template.env .env` copy environment configuration file template to an actual config file
6. `make dev` (build & run services/containers in a dev configuration)
7. Open **frontend** app in browser: http://localhost:3000
8. Open **backend** app in browser: http://localhost:4000

**Optionally:**
- `make ps` to display running services (containers)
- `make clean` to stop containers and remove images
- `make dev-build` to rebuild images
- `make help` to display usage help

## Typical workflow:

0. **Docker** must be running in the background on host OS
1. `cd` to project dir
2. `git pull` for new repo changes
3. `make dev-build` to build images
4. `make dev` to run services
5. Make changes to project source code

- `make log` to display logs from both services, `make log-frontend` or `make log-backend` to display logs from a single service. *Tip: open 2 terminal windows/tabs, in each show logs form a single service side by side*
- `CTRL + c` to close log stream
- When finished, use `make clean` to stop running services & remove images.
- Stage & commit changes + `git push`

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
