FROM node:10-alpine
COPY . /src
WORKDIR /src
RUN npm install
ENTRYPOINT ["node", "./main.js"]