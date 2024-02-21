import express from "express";
import { createYoga } from "graphql-yoga";
import { ruruHTML } from "ruru/server";
import { schema } from "./src/graphql/index.js";
import { setupDatabase } from "./src/mongo/index.js";

const yoga = createYoga({
  schema,
  context: async () => {
    const mongo = await setupDatabase();
    return {
      mongo,
    };
  },
});

const app = express();

app.all("/graphql", yoga);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
