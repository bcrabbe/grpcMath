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
import util from 'util';
import grpc_promise from 'grpc-promise';

const PROTO_PATH = (process.env.PATH_TO_GRPCMATH || '.') + '/math.proto';

const  packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const math_proto = grpc.loadPackageDefinition(packageDefinition).math;

function main() {
  const MathService = init();
  test();
  setInterval(test, 1000);

  async function test() {
    try {
      const a = (Math.random()*10).toFixed(0),
            b = (Math.random()*10).toFixed(0);
      let result = await MathService.add(a, b);
      console.log(`${a} + ${b} = ${result}`);
      result = await MathService.divide(a, b);
      console.log(`${a} / ${b} = ${result}`);
    } catch(err) {
      console.log(err);
    }
  }
}

main();

function init() {
  const url = process.argv[2] || 'localhost:5001';
  console.log(`Connecting to ${url}`);
  const math = new math_proto.Math(
    url,
    grpc.credentials.createInsecure()
  );
  grpc_promise.promisifyAll(math);

  const add = async (a, b) => {
    const req = {a: a, b: b};
    return math.add()
      .sendMessage(req)
      .then(resp => resp.result)
      .catch(console.err);
  };

  const divide = async (a, b) => {
    const req = {a: a, b: b};
    return math
      .divide()
      .sendMessage(req)
      .then(resp => resp.result)
      .catch(console.err);
  };

  return {
    add: add,
    divide: divide
  };
}
