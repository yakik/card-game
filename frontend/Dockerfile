FROM node:10.16.3-alpine

#COPY package.json .

RUN npm install -g serve

COPY build build

CMD ["serve", "-s", "build"]