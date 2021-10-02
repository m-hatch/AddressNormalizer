export const STATES = ['--', 'AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'];

export const compare = (obj1, obj2) => {
  // Note: we cannot use lodash isEqual because the objects are instances of different classes
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};

export const formValidator = (field, value, errors, setErrors) => {
  let msg;

  switch (field) {
    case 'street':
      msg = (value.length < 4) ? 'Mock validation: len > 3' : '';
      break;
    case 'state':
      msg = (!value || value === '--') ? 'Must contain a value' : '';
      break;
    case 'city':
      msg = (value.length < 4) ? 'Mock validation: len > 3' : '';
      break;
    case 'postalCode':
      msg = (!value.match(/(?:^|\D)(\d{5})(?!\d)/g)) ? 'Must be 5 digits' : '';
      break;
    default:
      msg = '';
  }

  setErrors({
    ...errors,
    [field]: msg
  });
};

export default {
  compare,
  formValidator
};
