FROM node:16

RUN apt update -y && apt upgrade -y

WORKDIR /app

COPY ./frontend/package.json /app/frontend/package.json
COPY ./frontend/package-lock.json /app/frontend/package-lock.json
COPY ./package.json /app/package.json

RUN npm run build:docker

COPY . /app

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD [ "npm", "run", "start:docker" ]