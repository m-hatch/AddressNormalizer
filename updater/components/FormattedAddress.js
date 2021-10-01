const FormattedAddress = ({ address }) => {
  const unit = address.unit ? `, ${address.unit}` : '';
  return (
    <>
      <span>{`${address.street}${unit}`}</span><br/>
      <span>{`${address.city}, ${address.state} ${address.postalCode}`}</span>
    </>
  );
};

export default FormattedAddress;
