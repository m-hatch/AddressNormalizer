import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, concat } from "@apollo/client";

const httpLink = new HttpLink({ uri: 'https://api.staging.updater.com/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      accessToken: process.env.ACCESS_TOKEN,
      client: process.env.CLIENT,
      app: 'mover',
    }
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default client;
