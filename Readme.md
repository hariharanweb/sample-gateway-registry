## Sample Gateway and Registry

- Add these entries to `/etc/hosts`
```
127.0.0.1 mobility-sample-bap
127.0.0.1 sample-gateway-registry
127.0.0.1 mobility-sample-bpp
```
- This is sample mobility Gateway and Registry
- Runs on http://sample-gateway-registry:1010

## Running Gateway and Registry locally

- Run `yarn start`
- To run in watch mode `yarn run watch`

## Running Gateway and Registry as Docker

- Build image `docker build -t sample-gateway-registry:latest .`
- Run the container `docker run -p 1010:1010 --name sample-gateway-registry -d sample-gateway-registry:latest`
- Check the logs `docker logs -f sample-gateway-registry`
