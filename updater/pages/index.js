import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AddressContext from '/context/AddressContext';
import { NORMALIZE_ADDRESS } from '/queries/normalizeAddress';
import { withApollo } from '@apollo/client/react/hoc';
import { Form, Row, Col, Button, } from 'react-bootstrap'
import styles from '../styles/index.module.css'

const AddressForm = ({ client }) => {
  const router = useRouter();
  const [store, dispatch] = useContext(AddressContext);
  const { street, unit, city, state, postalCode } = store.formInput.address;

  const setField = (field, value) => {
    dispatch({type: field, payload: value});
  };

  const onSubmit = async () => {
    console.log('CLIENT', client)
    const { data } = await client.query({
      query: NORMALIZE_ADDRESS,
      variables: { address: store.formInput.address },
    });
    console.log(store, data)
    dispatch({type: 'setNormalized', payload: data.normalizedAddress.normalizedAddress})
    router.push('/choose');
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
              <Form.Control onChange={e => setField('street', e.target.value)} value={street} className="p-3" type="text" placeholder="STREET ADDRESS" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="apt">
              <Form.Control onChange={e => setField('unit', e.target.value)} value={unit} className="p-3" type="text" placeholder="APARTMENT" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="city">
              <Form.Control onChange={e => setField('city', e.target.value)} value={city} className="p-3" type="text" placeholder="CITY" />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-4" controlId="state">
                  <Form.Control onChange={e => setField('state', e.target.value)} value={state} className="p-3" type="text" placeholder="STATE" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-4" controlId="zip">
                  <Form.Control onChange={e => setField('postalCode', e.target.value)} value={postalCode} className="p-3" type="text" placeholder="ZIP" />
                </Form.Group>
              </Col>
            </Row>

            <Button onClick={onSubmit} className="p-3" variant="primary" type="button">
              Next
            </Button>
          </Form>
        </div>
      </main>
    </div>
  )
}

export default withApollo(AddressForm);
