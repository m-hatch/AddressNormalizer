
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

const selectedHelper = (state, type, bool) => ({
  ...state[type],
  selected: bool
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
    case 'selectAddress':
      return {
        ...state,
        [action.payload]: selectedHelper(state, action.payload, true)
      };
    case 'resetSelected':
      return {
        formInput: selectedHelper(state, 'formInput', false),
        normalized: selectedHelper(state, 'normalized', false)
      };
    default:
      return state;
  }
}

export default reducer;
