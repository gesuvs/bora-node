FROM node:12.16.1-alpine

WORKDIR /usr/src/app


COPY ["package.json","prisma/schema.prisma","entrypoint.sh","./"]

RUN yarn && yarn global add pm2 && yarn cache clean

COPY dist .

EXPOSE 5555

CMD ["pm2-runtime", "index.js"]
