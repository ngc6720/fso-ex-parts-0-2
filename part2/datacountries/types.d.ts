declare interface CountryData {
  name1: string;
  name2: string;
  capital: string;
  area: number | null;
  languages: Array<string>;
  flagPng: string | null;
  flagAlt: string;
}
declare interface WeatherData {
  name: string;
  description: string;
  icon: string;
  windspeed: number | null;
  humidity: number | null;
}
