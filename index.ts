import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { AsyncMqttClient, connectAsync, IClientOptions } from "async-mqtt";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    mqttClient: AsyncMqttClient;
  }
}

interface Options {
  url: string;
  opts?: IClientOptions;
  allowRetries?: boolean;
}

const fastifyMqttAsync: FastifyPluginAsync<Options> = async (
  fastify: FastifyInstance,
  options: Options,
) => {
  try {
    if (fastify.mqttClient)
      throw new Error("MQTT client has already been registered!");
    const { url, opts, allowRetries } = options;
    const client = await connectAsync(url, opts, allowRetries);
    fastify.decorate("mqttClient", client);
    fastify.addHook("onClose", () => client.end());
  } catch (e) {
    fastify.log.error(e);
  }
};

export default fp(fastifyMqttAsync, {
  fastify: "4.x",
  name: "fastify-mqtt-async",
});
export { fastifyMqttAsync };
