const CityWeather = ({ data }: { data: WeatherData | null }) => {
  if (!data) return null;

  return (
    <>
      <h3>Weather in {data.name}</h3>
      <p>{data.description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={`weather icon for ${data.description}`}
        loading="lazy"
      ></img>
      <p>Windspeed: {data.windspeed || "no data"}</p>
      <p>Humidity: {data.humidity || "no data"}</p>
    </>
  );
};
export default CityWeather;
