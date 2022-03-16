FROM node:16

WORKDIR /usr/mattdekok/app

COPY . .

RUN npm run build:dev

CMD [ "npm", "start" ]