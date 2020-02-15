# PIS projekt 2020 - Internetovy obchod (Eshop)

## Architecture: 3 containerized services

The application consists of three "microservices".
Each has a specific function:

- **Frontend**:a Nginx web server that **serves Vue.js** static files. (or Vue dev server during development)
- **Backend**: a Node/Java/PHP application that **handles API requests** from the *Frontend*
- **Database**: a database instance for development (MySQL/GraphQL/...)

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
