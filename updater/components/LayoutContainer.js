import Head from 'next/head'
import styles from '../styles/layout.module.css'

const LayoutContainer = ({ title, page, className, children }) => (
  <div className={styles.container}>
      <Head>
        <title>Updater | { page }</title>
        <meta name="description" content={`Address form page ${page}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.description}>
          { title }
        </h2>

        <div className={className}>
        { children }
        </div>
      </main>
    </div>
);

export default LayoutContainer;
