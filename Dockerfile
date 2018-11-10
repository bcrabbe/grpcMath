FROM daveamit/node-alpine-grpc

WORKDIR /app
COPY package.json /app/package.json
RUN npm install

COPY . /app
EXPOSE 5001
ENTRYPOINT npm start
