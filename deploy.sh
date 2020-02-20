#!/bin/bash

git fetch --all
git checkout --force "origin/master"
make clean
docker system prune
make production-build
make production
