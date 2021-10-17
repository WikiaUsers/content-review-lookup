#!/bin/sh
set -e

if [ -z "$1" ] || [ ! -d "$1" ]
then
    echo "Passed AntiSpam directory does not exist!"
    exit 1
fi

cd "$1/scripts"
node wikis.js
node urls.js
cd "${0%/*}"
cp "$1/scripts/urls.json" .
rm -rf dist
npm start
git add .
git commit -m "Updating sitewide JavaScript."
git push
