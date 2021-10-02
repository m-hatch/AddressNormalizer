import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import AddressContext from '/context/AddressContext';
import { NORMALIZE_ADDRESS } from '/queries/normalizeAddress';
import { withApollo } from '@apollo/client/react/hoc';
import { Form, Row, Col, Button, } from 'react-bootstrap'
import AddressHead from '/components/AddressHead';
import FormInput from '/components/FormInput';
import { compare } from '/components/helpers';
import styles from '../styles/index.module.css'

const AddressForm = ({ client }) => {
  const router = useRouter();
  const [errors, setErrors] = useState({
    street: '',
    state: '',
    city: '',
    postalCode: ''
  });
  const [store, dispatch] = useContext(AddressContext);
  const { street, unit, city, state, postalCode } = store.formInput.address;

  const validate = (field, value) => {
    const msg = (field !== 'unit' && value.length < 1) ? 'Must contain a value' : '';
    setErrors({
      ...errors,
      [field]: msg
    });
  };

  const isDisabled = () => (
    [street, city, state, postalCode].includes('')
  );

  const routeToNext = (address) => {
    if (compare(store.formInput.address, address)) {
      dispatch({type: 'selectAddress', payload: 'formInput'});
      router.push('/confirm');
    } else {
      dispatch({type: 'setNormalized', payload: address});
      router.push('/choose');
    }
  };

  const onSubmit = async () => {
    const { data } = await client.query({
      query: NORMALIZE_ADDRESS,
      variables: { address: store.formInput.address },
    });

    routeToNext(data.normalizedAddress.normalizedAddress);
  };

  return (
    <div className={styles.container}>
      <AddressHead page="1" />

      <main className={styles.main}>
        <h2 className={styles.description}>
          What address are you moving FROM?
        </h2>

        <div className={styles.form}>
          <Form>
            <FormInput field="street" value={street} validator={validate}  errors={errors} placeholder="STREET ADDRESS" />
            <FormInput field="unit" value={unit} validator={validate}  errors={errors} placeholder="APARTMENT" />
            <FormInput field="city" value={city} validator={validate}  errors={errors} placeholder="CITY" />

            <Row>
              <Col>
                <FormInput field="state" value={state} validator={validate}  errors={errors} placeholder="STATE" />
              </Col>

              <Col>
                <FormInput field="postalCode" value={postalCode} validator={validate}  errors={errors} placeholder="ZIP" />
              </Col>
            </Row>

            <Button onClick={onSubmit} disabled={isDisabled()} className="p-3" variant="primary" type="button">
              Next
            </Button>
          </Form>
        </div>
      </main>
    </div>
  )
}

export default withApollo(AddressForm);
