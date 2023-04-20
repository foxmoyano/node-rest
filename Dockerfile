FROM node:14-buster-slim as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-buster-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /app/dist .

EXPOSE ${PORT}

CMD [ "node", "bundle.js" ]
