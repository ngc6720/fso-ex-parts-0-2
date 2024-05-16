const Country = ({ data }: { data: CountryData | null }) => {
  if (!data) return null;

  return (
    <>
      <h2>{data.name1}</h2>
      <div>{data.name2}</div>
      <div>Capital : {data.capital}</div>
      <div>Area : {data.area ? data.area : ""}</div>
      Languages :
      <ul>
        {data.languages.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
      {data.flagPng && (
        <img src={data.flagPng} alt={data.flagAlt} loading="lazy" />
      )}
    </>
  );
};

export default Country;
