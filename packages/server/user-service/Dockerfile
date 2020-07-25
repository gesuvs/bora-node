FROM node:12.16.1-alpine

WORKDIR /usr/src/app

COPY ["package.json","script.sh","./"]

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh openssl && \
  ./script.sh && yarn && yarn global add pm2 && \
  yarn cache clean && apk del git openssh openssl


COPY . .

EXPOSE 3333

CMD ["pm2-runtime", "dist/main.js"]
