#!/bin/bash

git fetch --all
git checkout --force "origin/master"
make production
