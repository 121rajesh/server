#!/bin/bash

# download the node modules
# npm install

# remove the container if exists or running 
if [ $(docker container ls -q -a --filter name=server) != '' ]; then
    docker container stop server
    docker container rm server
fi

# remove the image if exists
if [ $(docker image ls -q --filter reference=server) != '' ]; then
    docker image rm server
fi

# build the image
docker build -t server .

# start the container
docker container run -itd -p 4000:4000 --name server server