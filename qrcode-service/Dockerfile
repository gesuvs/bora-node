FROM node:12.16.1-alpine

WORKDIR /usr/src/app

COPY ["package.json","tsconfig.json",".ssh", "./"]

RUN yarn && yarn global add pm2 && \
  yarn cache clean


COPY dist/ .

EXPOSE 2222

CMD ["pm2-runtime", "index.js"]
