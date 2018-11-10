Build
___
`npm install`

Run
___
`node --experimental-modules math_server.mjs`

Test
___
`node --experimental-modules math_client.mjs`

Docker
___
`docker build -t grpc-math:latest .`
`docker run -p 5001:5001 --name grpc-math grpc-math`
