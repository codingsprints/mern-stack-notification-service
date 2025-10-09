- docker build -t my-notification-service-prod:latest -f .\docker\production\Dockerfile .

- docker run -it --name notification-service -p 5005:5005 -v "$(pwd)/config:/home/node/app/config" my-notification-service-prod:latest
