FROM node:20.16.0-slim

WORKDIR ~/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
