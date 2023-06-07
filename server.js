import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schema.js";
import resolvers from "./resolver.js";
import ConnectDB from "./config/database.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config/index.js";

ConnectDB();

const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, JWT_SECRET);
    return { userId };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
server.listen().then(({ url }) => {
  console.log(`server is running ${url}`);
});
