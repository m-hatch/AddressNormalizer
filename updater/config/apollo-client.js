import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://api.staging.updater.com/graphql',
    cache: new InMemoryCache(),
});

export default client;
