import { useRouter } from 'next/router';
import { useContext } from 'react';
import AddressContext from '/context/AddressContext';
import { Button } from 'react-bootstrap'
import LayoutContainer from '/components/LayoutContainer';
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
    <LayoutContainer title="Does this address look correct?" page="3" className={styles.confirm}>

      <div className={styles.address}>
        <FormattedAddress address={selected} />
      </div>

      <Button onClick={onEdit} className="button p-3" variant="outline-primary" type="submit">
        Enter new address
      </Button>

    </LayoutContainer>
  )
}

export default Confirm;
