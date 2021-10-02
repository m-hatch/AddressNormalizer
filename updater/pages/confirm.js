import { useRouter } from 'next/router';
import { useContext } from 'react';
import AddressContext from '/context/AddressContext';
import { Button } from 'react-bootstrap'
import AddressHead from '/components/AddressHead';
import FormattedAddress from '/components/FormattedAddress';
import styles from '../styles/confirm.module.css'

const Confirm = () => {
  const router = useRouter();
  const [store, dispatch] = useContext(AddressContext);
  const selected = store.formInput.selected ? store.formInput.address : store.normalized.address;

  const onEdit = () => {
    dispatch({type: 'resetSelected'})
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <AddressHead page="3" />

      <main className={styles.main}>
        <h2 className={styles.description}>
          Does this address look correct?
        </h2>

        <div className={styles.confirm}>
          <FormattedAddress address={selected} />
        </div>

        <Button onClick={onEdit} className="p-3" variant="outline-primary" type="submit">
          Enter new address
        </Button>
      </main>
    </div>
  )
}

export default Confirm;
