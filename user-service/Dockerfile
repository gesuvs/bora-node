FROM node:10.13-alpine
ENV NODE_ENV production
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY dist/main.js .
EXPOSE 3000
CMD node main.js
