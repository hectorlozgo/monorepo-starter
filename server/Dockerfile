FROM node:24-bookworm-slim as development
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/server/src/app
COPY package.json npm-lock.yaml* tsconfig.base.json ./
COPY server/package.json server/
COPY server ./server
RUN npm install

FROM development AS builder
WORKDIR /app/server
RUN npm build

FROM node:24-bookworm-slim as runner
WORKDIR /app/server
ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml* ./
COPY --from=builder /app/server/dist ./dist
RUN npm install --prod --frozen-lockfile

EXPOSE 3000
CMD ["node", "dist/index.js"]