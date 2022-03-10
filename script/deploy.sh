#!/bin/bash

cd ..

cd deploy

git pull

cp -a -R ../build/* .

git add .

git commit -m "Update $(date --rfc-3339 seconds)"

git push origin main
