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
# Portable prod tree: own node_modules + dist (no reliance on monorepo path layout). --legacy: workspace without injectWorkspacePackages.
RUN pnpm --filter api --prod deploy --legacy /deploy/api

FROM node:22-alpine AS runner
ARG APP_VERSION=unknown
WORKDIR /app
# PORT is not set here: compose injects it from infrastructure scripts/.env (TMD_ADMIN_API_LISTEN_PORT via apply-tmd-admin-env-from-sync.sh).
# EXPOSE matches ansible default redeployment_app_tmd_admin_api_listen_port (BehindTheMusicTree/infrastructure ansible/roles/redeployment_app/defaults/main.yml).
ENV NODE_ENV=production \
    APP_VERSION=$APP_VERSION
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001 -G nodejs
COPY --from=builder --chown=nestjs:nodejs /deploy/api .
USER nestjs
EXPOSE 3000
CMD ["node", "dist/main.js"]
