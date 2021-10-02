import { ApolloProvider } from '@apollo/client';
import { AddressProvider } from '/context/AddressContext';
import client from '/config/apollo-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <AddressProvider>
      <Component {...pageProps} />
    </AddressProvider>
  </ApolloProvider>
);

export default MyApp
