import { Redis } from "@upstash/redis";

// Vercel sometimes prefixes env vars with the store name.
// Fall back to the prefixed names so production works without manual remapping.
const url =
  process.env.UPSTASH_REDIS_REST_URL ??
  process.env["benFeuerPortRedis_KV_REST_API_URL"];

const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ??
  process.env["benFeuerPortRedis_KV_REST_API_TOKEN"];

if (!url || !token) {
  throw new Error(
    "Redis not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
  );
}

export const redis = new Redis({ url, token });
