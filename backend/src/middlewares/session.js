/**
 * This modules initialize the Redis database for storing user sessions (the SessionStore)
 */

import session from "express-session";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";

// Create the client we will use to communicate with the database
let redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST_NAME}:${process.env.REDIS_PORT}`,
});

// Try to connect to the database
redisClient.connect().catch(console.error);

// Configure the place where we store user sessions
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:",
});

// Create a middleware we will use to validate the user requests
const sessionMiddleware = session({
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
});

export default sessionMiddleware;