docker network inspect ondc-network --format {{.Id}} 2>/dev/null || docker network create ondc-network
docker build -t sample-gateway-registry:latest .
docker stop sample-gateway-registry || true && docker rm sample-gateway-registry || true
docker run --network=ondc-network -p 1010:1010 --name sample-gateway-registry -d sample-gateway-registry:latest 