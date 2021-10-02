import { useRouter } from 'next/router';
import { useContext } from 'react';
import AddressContext from '/context/AddressContext';
import AddressHead from '/components/AddressHead';
import FormattedAddress from '/components/FormattedAddress';
import styles from '../styles/choose.module.css'

const Choose = () => {
  const router = useRouter();
  const [store, dispatch] = useContext(AddressContext);

  const onChoose = (format) => {
    dispatch({type: 'selectAddress', payload: format});
    router.push('/confirm');
  };

  return (
    <div className={styles.container}>
      <AddressHead page="2" />

      <main className={styles.main}>
        <h2 className={styles.description}>
          Which address do you want to use?
        </h2>

        <div className={styles.choose}>
          <div onClick={() => onChoose('normalized')}>
            <p className={styles.official}>Official USPS Address</p>
            <FormattedAddress address={store.normalized.address} />
          </div>

          <div onClick={() => onChoose('formInput')}>
            <p className={styles.unrecognized}>Unrecognized Address</p>
            <FormattedAddress address={store.formInput.address} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Choose;
