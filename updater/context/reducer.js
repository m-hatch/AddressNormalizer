
const addressHelper = (field, state, action) => ({
  ...state,
  formInput: {
    ...state.formInput,
    address: {
      ...state.formInput.address,
      [field]: action.payload
    }
  }
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'street':
      return addressHelper('street', state, action);
    case 'unit':
      return addressHelper('unit', state, action);
    case 'state':
      return addressHelper('state', state, action);
    case 'city':
      return addressHelper('city', state, action);
    case 'postalCode':
      return addressHelper('postalCode', state, action);
    default:
      return state;
  }
}

export default reducer;
