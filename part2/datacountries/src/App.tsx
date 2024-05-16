import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Country from "src/components/Country";
import CityWeather from "src/components/CityWeather";

function App() {
  const [currentValue, setCurrentValue] = useState("");
  const allCountriesRef = useRef<Array<string> | null>(null);
  const [countries, setCountries] = useState<Array<string>>([]);
  const [fullCountry, setFullCountry] = useState<CountryData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Fetch all countries first
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(
        (res) =>
          (allCountriesRef.current = res.data
            .map((c: any) => c?.name?.common)
            .filter((c: any) => typeof c === "string"))
      )
      .catch((e) => console.log(e.message));
  }, []);

  // Filter from current search
  useEffect(() => {
    if (currentValue === "" || !allCountriesRef.current) {
      setCountries([]);
      return;
    }

    setCountries(
      allCountriesRef.current.filter((c) =>
        c.toLocaleLowerCase().includes(currentValue.toLocaleLowerCase())
      )
    );
  }, [currentValue]);

  // Fetch full data when single country
  useEffect(() => {
    if (countries.length !== 1) {
      setFullCountry(null);
      setWeather(null);
      return;
    }
    selectCountry(countries[0]);
  }, [countries]);

  function selectCountry(country: string) {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(({ data }) => {
        const formated = formatedCountryData(data);
        setFullCountry(formated);
        return formated;
      })
      .then(({ capital }) => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${
              import.meta.env.VITE_WEATHER_KEY
            }`
          )
          .then(({ data }) => setWeather(formatedWeatherData(data)));
      })
      .catch((e) => console.log(e.message));
  }

  function formatedWeatherData(data: any): WeatherData {
    return {
      name: data.name || "",
      description: data?.weather[0]?.description || "",
      icon: data?.weather[0]?.icon,
      windspeed: data?.wind?.speed || null,
      humidity: data?.main?.humidity,
    };
  }

  function formatedCountryData(data: any): CountryData {
    return {
      name1: data?.name?.common || "",
      name2: data?.name?.common || "",
      capital: (Array.isArray(data?.capital) && data.capital[0]) || "",
      area: data.area || null,
      languages: (data.languages && Object.values(data.languages)) || [],
      flagPng: data?.flags.png || null,
      flagAlt: data?.flags.alt || "",
    };
  }

  return (
    <>
      <h1>Data for countries</h1>
      <label>
        Search country:
        <input
          type="text"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      </label>

      {countries.length > 10 ? (
        <div>Too many corresponding countries !</div>
      ) : (
        countries.length > 1 && (
          <ul>
            {countries.map((c, i) => (
              <li key={i}>
                {" "}
                {c}
                <button onClick={() => selectCountry(c)}>Show</button>
              </li>
            ))}
          </ul>
        )
      )}

      <Country data={fullCountry}></Country>
      <CityWeather data={weather}></CityWeather>
    </>
  );
}

export default App;
