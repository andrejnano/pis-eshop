## PIS - frontend Dockerfile
# pull base image
FROM node:12-alpine as dev-stage

# use 'app/' as the working dir
WORKDIR app/

# add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# import fontawesome token
ARG FA_TOKEN
ENV FA_TOKEN $FA_TOKEN

ARG BACKEND_API_URL
ENV BACKEND_API_URL $BACKEND_API_URL

# install & cache dependencies
COPY package*.json ./
RUN npm install

# enable listening on a given port on this container
ARG FRONTEND_PORT
ENV FRONTEND_PORT $FRONTEND_PORT
EXPOSE $FRONTEND_PORT

# [2] BUILDING STAGE
FROM dev-stage as build-stage

ARG BACKEND_API_URL
ENV VUE_APP_BACKEND_API_URL "$BACKEND_API_URL"

COPY ./ .
RUN npm run build

# [3] PRODUCTION STAGE
FROM nginx:latest as production-stage

# copy built production-ready vue app
COPY --from=build-stage /app/dist/ srv/www/static

ARG FRONTEND_PORT
ENV FRONTEND_PORT $FRONTEND_PORT
EXPOSE $FRONTEND_PORT

CMD ["nginx", "-g", "daemon off;"]
