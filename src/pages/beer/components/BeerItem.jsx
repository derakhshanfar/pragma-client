const BeerItem = ({ name, temperature, status }) => {
  return (
    <tr>
      <td width={150}>{name}</td>
      <td width={150}>{temperature}</td>
      <td width={150}>
        <span>{status}</span>
      </td>
    </tr>
  );
};

export default BeerItem