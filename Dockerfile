FROM node:24-bookworm-slim as development
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile
COPY . .

FROM development AS builder
RUN pnpm build

FROM node:24-bookworm-slim as runner
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml* ./ tsconfig.json ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts && pnpm add tsx
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "--import", "tsx", "dist/index.js"]