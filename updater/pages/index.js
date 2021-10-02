import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import AddressContext from '/context/AddressContext';
import { NORMALIZE_ADDRESS } from '/queries/normalizeAddress';
import { withApollo } from '@apollo/client/react/hoc';
import { Form, Row, Col, Button, } from 'react-bootstrap'
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

  const disableForm = () => (
    [street, city, state, postalCode].includes('')
  );

  const setField = (field, value) => {
    validate(field, value);
    dispatch({type: field, payload: value});
  };

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
      <Head>
        <title>Updater</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.description}>
          What address are you moving FROM?
        </h2>

        <div className={styles.form}>
          <Form>
            <Form.Group className="mb-4" controlId="street">
              <Form.Control onChange={e => setField('street', e.target.value)} value={street} isInvalid={!!errors['street']} className="p-3" type="text" placeholder="STREET ADDRESS" />
              <Form.Control.Feedback type='invalid'>
                { errors['street'] }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="unit">
              <Form.Control onChange={e => setField('unit', e.target.value)} value={unit} className="p-3" type="text" placeholder="APARTMENT" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="city">
              <Form.Control onChange={e => setField('city', e.target.value)} value={city} isInvalid={!!errors['city']} className="p-3" type="text" placeholder="CITY" />
              <Form.Control.Feedback type='invalid'>
                { errors['city'] }
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-4" controlId="state">
                  <Form.Control onChange={e => setField('state', e.target.value)} value={state} isInvalid={!!errors['state']} className="p-3" type="text" placeholder="STATE" />
                  <Form.Control.Feedback type='invalid'>
                    { errors['state'] }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-4" controlId="postalCode">
                  <Form.Control onChange={e => setField('postalCode', e.target.value)} value={postalCode} isInvalid={!!errors['postalCode']} className="p-3" type="text" placeholder="ZIP" />
                  <Form.Control.Feedback type='invalid'>
                    { errors['postalCode'] }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button onClick={onSubmit} disabled={disableForm()} className="p-3" variant="primary" type="button">
              Next
            </Button>
          </Form>
        </div>
      </main>
    </div>
  )
}

export default withApollo(AddressForm);
