#!/bin/bash
set +e
cd ../../
rm -rf staging
mkdir staging
cd staging
git clone https://www.github.com/skagit/mokuhanga.git
cd mokuhanga/cicd
npm install
cd ../server
npm install
cd ../../
rm -rf ../mokuhanga
mv mokuhanga ../
cd ../mokuhanga/server
pm2 restart main.js
cd ../cicd
pm2 restart main.js