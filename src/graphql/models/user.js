import { response } from "express";
import { ObjectId } from "mongodb";

export const typeDef = /* GraphQL */ `
  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(user: NewUserInput!): User
    deleteUser(id: ID!): Boolean
    updateUser(id: ID!, updateUser: UpdateUserInput): User
  }

  input NewUserInput {
    name: String!
    email: String!
  }

  input UpdateUserInput {
    name: String!
  }

  type User {
    id: ID!
    name: String
    email: String

    comments: [Comment]
  }
`;

export const resolvers = {
  Query: {
    users: (obj, args, { mongo }) => {
      return mongo.users.find().limit(10).toArray();
    },
    user: async (obj, { id }, { mongo }) => {
      return mongo.users.findOne({ _id: new ObjectId(String(id)) });
    },
  },

  Mutation: {
    createUser: async (_, { user }, { mongo }) => {
      const response = await mongo.users.insertOne(user);
      return {
        id: response.insertedId,
        ...user,
      };
    },

    deleteUser: async (obj, { id }, { mongo }) => {
      await mongo.users.deleteOne({ _id: new ObjectId(String(id)) });
      return true;
    },

    updateUser: async (obj, { id, updateUser }, { mongo }) => {
      const response = await mongo.users.updateOne(
        { _id: new ObjectId(String(id)) },
        { $set: { name: updateUser.name } }
      );
      return mongo.users.findOne({ _id: new ObjectId(String(id)) });
    },
  },

  User: {
    id: ({ id, _id }) => _id || id,
    name: (obj) => obj.name.trim().toUpperCase(),
    comments: ({ email }, args, { mongo }) => {
      return mongo.comments.find({ email }).limit(20).toArray();
    },
  },
};
