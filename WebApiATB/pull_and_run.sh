#!/bin/bash

set -e

server_up() {
    echo "Server up..."
    docker pull mrsamix/webatbapi:latest
    docker stop webatbapi_container || true
    docker rm webatbapi_container || true
    docker run -d --restart=always -v /volumes/npd421-api/images:/app/images --name webatbapi_container -p 3089:8080 mrsamix/webatbapi
}

start_containers() {
    echo "Containers start..."
    docker run -d --restart=always -v /volumes/npd421-api/images:/app/images --name webatbapi_container -p 3089:8080 mrsamix/webatbapi
}

stop_containers() {
    echo "Containers stop..."
    docker stop webatbapi_container || true
    docker rm webatbapi_container || true
}

restart_containers() {
    echo "Containers restart..."
    docker stop webatbapi_container || true
    docker rm webatbapi_container || true
    docker run -d --restart=always -v /volumes/npd421-api/images:/app/images --name webatbapi_container -p 3089:8080 mrsamix/webatbapi
}

echo "Choose action:"
echo "1. Server up"
echo "2. Containers start"
echo "3. Containers stop"
echo "4. Containers restart"
read -p "Enter action number: " action

case $action in
    1)
        server_up
        ;;
    2)
        start_containers
        ;;
    3)
        stop_containers
        ;;
    4)
        restart_containers
        ;;
    *)
        echo "Invalid action number!"
        exit 1
        ;;
esac
