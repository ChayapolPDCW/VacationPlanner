#! /usr/bin/env bash

on_exit() {
    echox "NOTE: Command output was written to setup.log" 1>&2

    if [ ! $1 ]; then
        echox "Stopping and removing Compose service containers and networks, if there are any"
        docker compose down >>setup.log 2>&1
        return
    fi

    echox "Gracefully stopping containers"
    docker compose stop >>setup.log 2>&1
}

echox() {
    echo -e $* | tee -a setup.log >&2
}

STEP_COUNTER=1

echox -e "=> STEP #${STEP_COUNTER}: Making .env copies"

ENV_FILE_PREFIXES=('.' './backend' './frontend')
SRC_ENV_FILENAME='.env.sample'
DEST_ENV_FILENAME='.env'

for prefix in ${ENV_FILE_PREFIXES[@]}; do
    cp -i "${prefix}/${SRC_ENV_FILENAME}" "${prefix}/${DEST_ENV_FILENAME}" >>setup.log
    status=$?

    if [ ! $status ]; then
        on_exit 1
        exit $status
    else
        echox "Done"
    fi
done

echox "NOTE: Don't forget to add API keys to the proper .env files"
echox -e "=> STEP #${STEP_COUNTER}: Success"
(( STEP_COUNTER++ ))

echox -e "=> STEP #${STEP_COUNTER}: Building Compose services"

if ! $(docker compose build >>setup.log 2>&1); then
    echox "Error when building Compose service images"
    on_exit 1
    exit 1
fi

echox -e "=> STEP #${STEP_COUNTER}: Success"
(( STEP_COUNTER++ ))

echox -e "=> STEP #${STEP_COUNTER}: Testing Compose services"

if ! $(docker compose up -d >>setup.log 2>&1); then
    echox "Error starting Compose service containers"
    on_exit 1
    exit 1
fi

echox "All containers started successfully"
echox "Gracefully stopping containers..."

if ! $(docker compose stop >>setup.log 2>&1); then
    echox "Failed to stop containers"
    on_exit 1
    exit 1
fi

echox "Done"

echox -e "=> STEP #${STEP_COUNTER}: Success"
(( STEP_COUNTER++ ))

# COMPOSE_DB_SERVICES=(db backend)
# echox "Starting Compose services: ${COMPOSE_DB_SERVICES[*]}"

echox "Starting Compose services"

if ! $(docker compose up -d >>setup.log 2>&1); then
    echox "Error while initializing database: failed to start Compose services}"
    on_exit 1
    exit 1
fi

BACKEND_SERVICE_CONTAINER_NAME=$(docker compose ps --format '{{.Name}}' backend)

echox "Compose services started"

echox -e "=> STEP #${STEP_COUNTER}: Success"
(( STEP_COUNTER++ ))

echox -e "=> STEP #${STEP_COUNTER}: Migrating database"

if ! $(docker exec $BACKEND_SERVICE_CONTAINER_NAME \
        sh -c 'export $(grep -v '^#' /app/.env.container | xargs) \
            && npx prisma migrate dev >>/app/setup.log 2>&1 \
            && npx @snaplet/seed sync >>/app/setup.log 2>&1' >>setup.log 2>&1); then
    echox "Error while initializing database: migration failed"
    on_exit 1
    exit 1
fi

echox "Database migrated"

echox -e "=> STEP #${STEP_COUNTER}: Success"
(( STEP_COUNTER++ ))

echox -e "=> STEP #${STEP_COUNTER}: Seeding database"

if ! $(docker exec $BACKEND_SERVICE_CONTAINER_NAME \
        sh -c 'export $(grep -v '^#' /app/.env.container | xargs) \
            && npx prisma db seed >>/app/setup.log 2>&1' >>setup.log 2>&1); then
    echox "Error while initializing database: seeding failed"
    on_exit 1
    exit 1
fi

echox "Database seeded"

echox -e "=> STEP #${STEP_COUNTER}: Success"
(( STEP_COUNTER++ ))

on_exit 0

echox "ALL DONE"
echox -e "\n\tNext up: $ docker compose up\n"

exit 0
