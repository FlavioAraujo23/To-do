FROM node:20-buster as build

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm i bcrypt

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]