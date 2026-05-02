# Build from monorepo root: docker build -f apps/api/Dockerfile .
FROM node:22-alpine AS builder
WORKDIR /repo
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN pnpm install --frozen-lockfile
COPY apps/api apps/api
RUN pnpm --filter api build

FROM node:22-alpine AS runner
ARG APP_VERSION=unknown
WORKDIR /repo
ENV NODE_ENV=production \
    APP_VERSION=$APP_VERSION
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001 -G nodejs
COPY --from=builder /repo/package.json /repo/pnpm-workspace.yaml /repo/pnpm-lock.yaml ./
COPY --from=builder /repo/node_modules ./node_modules
COPY --from=builder /repo/apps/api/package.json ./apps/api/
COPY --from=builder /repo/apps/api/dist ./apps/api/dist
USER nestjs
EXPOSE 3001
CMD ["node", "apps/api/dist/main.js"]
