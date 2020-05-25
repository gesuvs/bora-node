FROM node:12.16.1-alpine

WORKDIR /usr/src/app


COPY ["package.json","entrypoint.sh","./"]

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh && \
  yarn && yarn global add pm2 && yarn cache clean && \
  apk del git openssh

COPY build .

EXPOSE 5555

CMD ["pm2-runtime", "server.js"]
