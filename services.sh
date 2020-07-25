set -a; . ./.env.prod; set +a
docker stack deploy -c docker-compose.services.yml services
