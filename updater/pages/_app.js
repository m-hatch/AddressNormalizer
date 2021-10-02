import { AddressProvider } from '/context/AddressContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => (
  <AddressProvider>
    <Component {...pageProps} />
  </AddressProvider>
);

export default MyApp
