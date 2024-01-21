#!/bin/sh
echo "Install dependencies for BackEnd..."

npm install --global yarn

yarn

echo "Start BackEnd..."

yarn start:dev
