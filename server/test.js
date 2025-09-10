import IoRedis from "ioredis";

const client = new IoRedis()//defaut it will be localhsot

await client.set("foo", "bar");

console.log(await client.get("foo"));
