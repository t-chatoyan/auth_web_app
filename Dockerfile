FROM node:18-alpine AS builder
WORKDIR /app
COPY /*.json ./

ENV NPM_CONFIG_FETCH_RETRY_MAXTIMEOUT=600000
RUN npm install -g npm@10.2.5
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]



