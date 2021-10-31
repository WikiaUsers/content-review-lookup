#!/bin/sh
set -e

if [ -z "$1" ] || [ -z "$2" ] || [ ! -d "$1" ] || [ ! -d "$2" ]
then
    echo "Passed AntiSpam/content-review-lookup directory does not exist!"
    exit 1
fi

cd "$1/scripts"
/usr/local/bin/node wikis.js
/usr/local/bin/node urls.js
cd "$2"
rm -f "$2/urls.json"
cp "$1/scripts/urls.json" "$2"
rm -rf "$2/dist"
/usr/local/bin/node main.js
git add .
git commit -m "Updating sitewide JavaScript."
git push
