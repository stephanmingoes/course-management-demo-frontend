import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        lecturers: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        courses: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  uri: "https://course-managment-demo.herokuapp.com/graphql",
  cache: cache,
});

export default client;
