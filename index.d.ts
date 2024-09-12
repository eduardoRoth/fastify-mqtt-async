import { FastifyPluginAsync } from "fastify";
import { AsyncMqttClient, IClientOptions } from "async-mqtt";
declare module "fastify" {
  interface FastifyInstance {
    mqttClient: AsyncMqttClient;
  }
}
interface Options {
  url?: string;
  opts?: IClientOptions;
  allowRetries?: boolean;
}
declare const fastifyMqttAsync: FastifyPluginAsync<Options>;
declare const _default: FastifyPluginAsync<
  Options,
  import("fastify").RawServerDefault,
  import("fastify").FastifyTypeProviderDefault
>;
export default _default;
export { fastifyMqttAsync };
