#!/bin/bash

# This script is used to deploy the whole system inside a production environment
# It is envoked by a 'Webhook' service, which is running on a specified hostname:port
# configured in the project's github repository. When a 'git push' operation occurs,
# Github communicates with the 'Webhook' service and launches this script in production.

git fetch --all
git checkout --force "origin/master"
make clean
docker system prune
make production-build
make production
