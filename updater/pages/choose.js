import { useRouter } from 'next/router';
import { useContext } from 'react';
import AddressContext from '/context/AddressContext';
import LayoutContainer from '/components/LayoutContainer';
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
    <LayoutContainer title="Which address do you want to use?" page="2" className={styles.choose}>

      <div onClick={() => onChoose('normalized')}>
        <p className={styles.official}>Official USPS Address</p>
        <FormattedAddress address={store.normalized.address} />
      </div>

      <div onClick={() => onChoose('formInput')}>
        <p className={styles.unrecognized}>Unrecognized Address</p>
        <FormattedAddress address={store.formInput.address} />
      </div>

    </LayoutContainer>
  )
}

export default Choose;
