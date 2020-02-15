## PIS - backend Dockerfile

# pull base image
FROM node:12-alpine

# # copy project files to (and create) directory '/app'
# COPY . app/

# use 'app/' as the working dir
WORKDIR /app

# install dependencies
RUN yarn

# enable listening on port 4000 on this container
EXPOSE 4000

# execute server.js script using Node.js
ENTRYPOINT node ./src/server.js