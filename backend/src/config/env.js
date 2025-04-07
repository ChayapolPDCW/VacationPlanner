import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import fs from "node:fs";
import path from "node:path";

const SERVER_WD = process.cwd();

// .env
dotenvExpand.expand(
  dotenv.config({
  override: true,
  path: [path.resolve(SERVER_WD, ".env")],
}));

// Set DATABASE_URL to service name when running inside a container
if (fs.existsSync("/.dockerenv")) {
  dotenvExpand.expand(
    dotenv.config({
    override: true,
    path: [path.resolve(SERVER_WD, process.env.CONTAINER_ENV_FILE)],
  }));
}
