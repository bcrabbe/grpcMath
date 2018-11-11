#### Build
```sh
npm install
```

#### Run
```sh
node --experimental-modules math_server.mjs
```

#### Test
```sh
node --experimental-modules math_client.mjs localhost:5001
```

#### Docker
```sh
docker build -t grpc-math:latest .
docker run -p 80:80 --name grpc-math grpc-math
node --experimental-modules math_client.mjs $(ipconfig getifaddr en0):80
```
