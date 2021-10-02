import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import AddressContext from '/context/AddressContext';
import { NORMALIZE_ADDRESS } from '/queries/normalizeAddress';
import { withApollo } from '@apollo/client/react/hoc';
import { Form, Row, Col, Button, } from 'react-bootstrap'
import LayoutContainer from '/components/LayoutContainer';
import FormInput from '/components/FormInput';
import FormSelect from '/components/FormSelect';
import { compare, STATES } from '/components/helpers';
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
    <LayoutContainer title="What address are you moving FROM?" page="1" className={styles.form}>

      <Form>
        <FormInput field="street" value={street} validator={validate}  errors={errors} placeholder="STREET ADDRESS" />
        <FormInput field="unit" value={unit} validator={validate}  errors={errors} placeholder="APARTMENT" />
        <FormInput field="city" value={city} validator={validate}  errors={errors} placeholder="CITY" />

        <Row>
          <Col>
            <FormSelect field="state" options={STATES} value={state} validator={validate}  errors={errors} placeholder="STATE" />
          </Col>

          <Col>
            <FormInput field="postalCode" value={postalCode} validator={validate}  errors={errors} placeholder="ZIP" />
          </Col>
        </Row>

        <Button onClick={onSubmit} disabled={isDisabled()} className="p-3" variant="primary" type="button">
          Next
        </Button>
      </Form>

    </LayoutContainer>
  )
}

export default withApollo(AddressForm);
