## PIS - frontend Dockerfile

# pull base image
FROM node:12-alpine

# # copy project files to (and create) directory '/app'
# COPY ./package app/

# use 'app/' as the working dir
WORKDIR app/

# add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install & cache dependencies
COPY package.json /app/package.json
RUN yarn

# enable listening on port 3000 on this container
EXPOSE 3000

# start development server
ENTRYPOINT yarn run serve