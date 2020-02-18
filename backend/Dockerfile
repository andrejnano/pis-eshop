## PIS - backend Dockerfile

# pull base image
FROM node:12-alpine

# # copy project files to (and create) directory '/app'
# COPY . app/

# use 'app/' as the working dir
WORKDIR /app

# install dependencies
RUN yarn

# enable listening on a given port on this container
ARG BACKEND_PORT
ENV BACKEND_PORT $BACKEND_PORT
RUN echo $BACKEND_PORT
EXPOSE $BACKEND_PORT

# execute server.js script using Node.js
ENTRYPOINT node ./src/server.js
