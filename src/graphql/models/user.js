export const typeDef = /* GraphQL */ `
  type Query {
    user: User
  }

  type Mutation {
    createUser(user: NewUserInput!): User
  }

  input NewUserInput {
    name: String
    age: Int
  }

  type User {
    id: Int
    name: String
    age: Int
  }
`;

export const resolvers = {
  Query: {
    user: () => ({ id: 1, name: "Ruru" }),
  },

  Mutation: {
    createUser: (_, { user }) => {
      return { id: 2, ...user };
    },
  },

  User: {
    name: (obj) => obj.name.trim().toUpperCase(),
  },
};
