# fastify-mqtt-async

Wrapper for [async-mqtt](https://www.npmjs.com/package/async-mqtt) with TS support.

## Install

```
npm i @rohu/fastify-mqtt-async
```

## Using it

Add it to your fastify project with the `register` method.

```ts
import fastify from "fastify";
import { fastifyMqttAsync } from "@eduardoroth/fastify-mqtt-async";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = fastify();

// register plugin
server.register(fastifyMqttAsync, { url: "mqtt://localhost:1883" });

server.listen({ port, host }, (err) => {
  if (err) throw err;
});
```

Then you can use it in your methods

```ts
import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get("/mqtt/ping", async function (req, reply) {
    await this.mqttClient.publish("your/topic/#", "Async Hi Mosquitto!");
    reply.send({ mqtt: "message sent!" });
  });
}
```

## License

Licensed under [MIT](./LICENSE).
