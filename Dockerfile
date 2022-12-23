FROM node:18-alpine

WORKDIR /opt/project

COPY package.json package-lock.json ./

RUN npm install -g serverless && npm install

ENTRYPOINT ["sls", "offline", "--host", "0.0.0.0"]
