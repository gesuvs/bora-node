FROM node:12.16.1-alpine

WORKDIR /usr/src/app

COPY ["package.json", "./"]

RUN yarn && yarn global add pm2 && yarn cache clean --mirror

COPY ./dist .

EXPOSE 7777

CMD ["pm2-runtime", "server.js"]
