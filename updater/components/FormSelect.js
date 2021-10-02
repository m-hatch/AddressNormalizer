import { Form } from 'react-bootstrap';
import { useContext } from 'react';
import AddressContext from '/context/AddressContext';

const FormSelect = ({ field, options, value, validator, errors, placeholder }) => {
  const [_, dispatch] = useContext(AddressContext);

  const setField = (field, value) => {
    validator(field, value);
    dispatch({type: field, payload: value});
  };

  return (
    <Form.Group className="mb-4" controlId={field}>
      <Form.Control as="select" onChange={e => setField(field, e.target.value)} value={value} isInvalid={!!errors[field]} className="p-3" type="select">
        <option disabled value=''>{ placeholder }</option>
        { options.map(option => <option key={option} value={option}>{option}</option>) }
      </Form.Control>
      <Form.Control.Feedback type='invalid'>
        { errors[field] }
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormSelect;
