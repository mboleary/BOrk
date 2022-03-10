#!/bin/bash

cd ../build

git add .

git commit -m "Update $(date --rfc-3339 seconds)"

git push origin master --force
