#!/bin/bash

DOCKER_NAME=posttest
PORT=5432
PASS=postgres

if [[ $1 == 'start' ]]; then
    docker run --name $DOCKER_NAME -p $PORT:$PORT -e POSTGRES_PASSWORD=$PASS -d postgres
    sleep 1
    docker exec -it posttest psql -c 'create database astorage;' -U postgres
fi

if [[ $1 == 'stop' ]]; then
    docker stop $DOCKER_NAME
fi

if [[ $1 == 'clean' ]]; then
docker container rm $DOCKER_NAME 
fi

if [[ $1 == 'destroy' ]]; then
    docker stop $DOCKER_NAME
    docker container rm $DOCKER_NAME 
fi

if [[ $1 == 'help' ]]; then
    echo -e "Help:\nhelp -> print this message\nstart -> start the container with db\nstop -> stop the container with db\nclean -> clean the container with db\ndestroy -> stop and clean container"
fi

