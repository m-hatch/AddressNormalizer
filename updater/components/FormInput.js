import { Form } from 'react-bootstrap';
import { useContext } from 'react';
import AddressContext from '/context/AddressContext';

const FormInput = ({ field, value, validator, errors, placeholder }) => {
  const [_, dispatch] = useContext(AddressContext);

  const setField = (field, value) => {
    validator(field, value);
    dispatch({type: field, payload: value});
  };

  return (
    <Form.Group className="mb-4" controlId={field}>
      <Form.Control onChange={e => setField(field, e.target.value)} value={value} isInvalid={!!errors[field]} className="p-3" type="text" placeholder={placeholder} />
      <Form.Control.Feedback type='invalid'>
        { errors[field] }
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormInput;
