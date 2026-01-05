# Build Stage
FROM node:24-alpine AS build_image

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Active Corepack et installe PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

# Installe git (nécessaire pour certaines dépendances)
RUN apk add --no-cache git

WORKDIR /app

# Copie le fichier d'environnement
COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm build-docker

# Production Stage
FROM node:24-alpine AS production_stage

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]