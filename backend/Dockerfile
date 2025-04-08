ARG NODE_VERSION

FROM node:${NODE_VERSION:?error}-alpine AS base

WORKDIR /app

FROM base AS dev

RUN apk add --no-cache openssl

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

RUN npm install -g nodemon

# USER node
COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]

FROM base AS prod
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
USER node
COPY . .

CMD ["node", "src/index.js"]
