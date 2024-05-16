const Filter = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <label>
      {name}:
      <input value={value} onChange={onChange} />
    </label>
  );
};

export default Filter;
