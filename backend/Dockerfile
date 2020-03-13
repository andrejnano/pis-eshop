## PIS - backend Dockerfile

# pull base image
# Production ready nodeJS Docker image including the PM2 runtime.
FROM keymetrics/pm2:latest-alpine

# use 'app/' as the working dir
WORKDIR /app

# add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install & cache dependencies
COPY package*.json ./
RUN npm install

# enable listening on a given port on this container
ARG BACKEND_PORT
ENV BACKEND_PORT $BACKEND_PORT
EXPOSE $BACKEND_PORT
