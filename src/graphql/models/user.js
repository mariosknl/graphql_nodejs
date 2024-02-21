export const typeDef = /* GraphQL */ `
  type Query {
    user: User
  }

  type User {
    id: Int
    name: String
  }
`;

export const resolvers = {
  Query: {
    user: () => ({ id: 1, name: "Ruru" }),
  },
  User: {
    name: (obj) => obj.name.toUpperCase(),
  },
};
