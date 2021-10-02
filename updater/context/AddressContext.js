import { createContext, useReducer } from 'react';
import initialState from '/context/initialState';
import reducer from '/context/reducer';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <AddressContext.Provider value={[store, dispatch]}>
      {children}
    </AddressContext.Provider>
  );
};
export default AddressContext;
