FROM node:18-alpine

WORKDIR /opt/project

RUN npm install -g serverless

ENTRYPOINT ["/bin/sh", "-c", "while :; do sleep 10; done"]
