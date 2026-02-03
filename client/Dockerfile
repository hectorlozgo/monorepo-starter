FROM node:24-bookworm-slim AS development
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json npm-lock.yaml* tsconfig.base.json ./
COPY client/package.json ./client/

RUN npm install
COPY client ./client
ENV VITE_NODE_ENV=development

EXPOSE 4000
CMD ["npm", "--workspace", "client", "run", "dev", "--", "--port", "4000", "--host", "0.0.0.0"]

FROM development AS builder
WORKDIR /app/client
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/client/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
ENV VITE_NODE_ENV=production

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]