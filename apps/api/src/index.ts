import { createServer } from "node:http";
import dotenv from "dotenv";
import { createYoga, createSchema } from "graphql-yoga";
import { APP_CONFIG } from "@repo/config";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || APP_CONFIG.api.port;

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
  cors: {
    origin: ["http://localhost:3000", "http://localhost:9000"],
    credentials: true,
  },
});

const server = createServer(yoga);

server.listen(PORT, () => {
  console.log(
    `[BFF] GraphQL server running on http://localhost:${PORT}/graphql`
  );
  console.log(`[BFF] Environment: ${process.env.NODE_ENV || "development"}`);
});

export default yoga;
