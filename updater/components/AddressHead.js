import Head from 'next/head'

const AddressHead = ({ page }) => (
  <Head>
    <title>Updater | { page }</title>
    <meta name="description" content={`Address form page ${page}`} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default AddressHead;
