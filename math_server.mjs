/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import grpc from 'grpc';
import protoLoader from '@grpc/proto-loader';

const PROTO_PATH = './math.proto';
let LOG = true;

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const math_proto = grpc.loadPackageDefinition(packageDefinition).math;

function add(call, callback) {
  const {a, b} = call.request;
  const result = a + b;
  if(LOG) console.log(`server add: ${a} + ${b} => ${result}`);
  callback(null, {result: result});
}

function divide(call, callback) {
  const {a, b} = call.request;
  const result = a / b;
  if(LOG) console.log(`server divide: ${a} / ${b} => ${result}`);
  callback(null, {result: result});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  const server = new grpc.Server();
  server.addService(math_proto.Math.service, {
    add: add,
    divide: divide,
  });
  const port = process.argv[2] || 5001;
  console.log(`Listening on 0.0.0.0:${port}`);
  server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
