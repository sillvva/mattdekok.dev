FROM node:16

WORKDIR /usr/mattdekok/app

COPY ./frontend/package.json /usr/mattdekok/app/frontend/package.json
COPY ./frontend/package-lock.json /usr/mattdekok/app/frontend/package-lock.json
COPY ./package.json /usr/mattdekok/app/package.json

RUN npm run build:docker

COPY . .

CMD [ "npm", "run", "start:docker" ]