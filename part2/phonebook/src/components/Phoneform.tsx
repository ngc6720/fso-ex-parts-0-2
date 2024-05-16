const Phoneform = ({
  onSubmit,
  name,
  onName,
  number,
  onNumber,
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  name: string;
  number: string;
  onName: React.ChangeEventHandler<HTMLInputElement>;
  onNumber: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Name:
          <input value={name} onChange={onName} required />
        </label>
        <label>
          Number:
          <input
            value={number}
            onChange={onNumber}
            required
            type="tel"
            pattern="[0-9\-+]{0,16}"
          />
        </label>
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  );
};

export default Phoneform;
