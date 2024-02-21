import { createSchema } from "graphql-yoga";
import { typeDef as User, resolvers as userResolvers } from "./models/user.js";
import merge from "lodash/merge.js";

const queries = /* GraphQL */ `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from Yoga!",
  },
};

export const schema = createSchema({
  typeDefs: [queries, User],
  resolvers: merge(resolvers, userResolvers),
});
