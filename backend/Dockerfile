ARG NODE_VERSION

FROM node:${NODE_VERSION:?error}-alpine AS base
WORKDIR /app

FROM base AS dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
# USER node
COPY . .

RUN npm install
RUN npm install -g nodemon
RUN npm run prisma:generate

CMD npm run dev

FROM base AS prod
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
# USER node
COPY . .

RUN npm install
RUN npm run db:deploy

CMD npm run
