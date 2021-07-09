FROM node:10-alpine
COPY . /src
WORKDIR /src
RUN npm install
EXPOSE 80
ENTRYPOINT ["node", "./main.js"]