import gql from "graphql-tag";

export const NORMALIZE_ADDRESS = gql`
  query normalizeAddress($address: AddressInput!){
    normalizedAddress(input: $address){
      normalizedAddress {
        city
        state
        street
        unit
        postalCode
      }
    }
  }
`;
