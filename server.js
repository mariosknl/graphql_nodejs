var {
  graphql,
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { ruruHTML } = require("ruru/server");

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello(name: String!): String

//     age: Int
//     weight: Float
//     isOver18: Boolean
//     hobbies: [String!]!

//     user: User
//   }

//   type User {
//     id: Int
//     name: String
//   }
// `);

const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
      resolve: (obj) => {
        const name = obj.name.trim().toUpperCase();
        if (obj.isAdmin) {
          return `${name} (Admin)`;
        }
        return name;
      },
    },
  },
});

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "Query",
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve: () => {
//           return "Hello World";
//         },
//       },

//       user: {
//         type: User,
//         resolve: () => {
//           return {
//             id: 1,
//             name: "John Doe",
//             isAdmin: true,
//           };
//         },
//       },
//     },
//   }),
// });

// The rootValue provides a resolver function for each API endpoint
// var rootValue = {
//   hello: ({ name }) => {
//     return `Hello ${name}`;
//   },
//   age: () => {
//     return 36;
//   },
//   weight: () => {
//     return 75.5;
//   },
//   isOver18: () => {
//     return true;
//   },
//   hobbies: () => {
//     return ["Reading", "Gardening", "Cooking"];
//   },

//   user: () => {
//     return {
//       id: 1,
//       name: "John Doe",
//     };
//   },
// };

const app = express();

app.all(
  "/graphql",
  createHandler({
    schema,
    // rootValue,
  })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
