FROM node:12.16.1-alpine

WORKDIR /usr/src/app

COPY ["package.json","./"]

RUN yarn && yarn global add pm2 && \
  yarn cache clean


COPY . .

EXPOSE 8888

CMD ["pm2-runtime", "src/index.js"]
