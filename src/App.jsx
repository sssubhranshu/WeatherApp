import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios';

const Weather = ({weather}) => {
  return <div>
    <h3>Wind</h3>
    <p>Wind speed: {weather.wind.speed}</p>
    <p>Wind direction: {weather.wind.deg} deg</p>
    <h3>Temperatue</h3>
    <p>Temperature: {Math.round(weather.main.temp-273, 2)} C </p>
    <p>Feels Like: {Math.round(weather.main.feels_like - 273, 2)} C</p>
    <p>Max Temperature: {Math.round(weather.main.temp_max - 273, 2)} C</p>
    <p>Min Temperature: {Math.round(weather.main.temp_min - 273, 2)} C</p>
    <h3>Humidity</h3>
    <p>Humidity: {weather.main.humidity}</p>
  </div>
} 

function App() {
  const [count, setCount] = useState(0)
  const apiKey = '1b3969b98168580bca1ea7850244a223';
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(()=> {
    async function getCountries()  {
      const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
      const data = await response.data.data;
      return data;
    };
    
    getCountries().then(data => setCountries(data));
    // setCountries(data);
    // console.log(data); 
   }, []);

   const getWeather = async () => {
    console.log(selectedCountry);
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry}&appid=${apiKey}`);
    const data = await response.data;
    console.log(data);
    setWeather(data);
   }

   const handleChange = (e) => {
    const c = e.target.value;
    setSelectedCountry(c);
    console.log(c);
   }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <select name="country" id="country" value={selectedCountry} onChange={handleChange}>
      {countries && countries.map(obj => 
        <option value={obj.country} >{obj.country}</option>
        )}
      </select>
      <button onClick={getWeather}>Get Weather</button>
      {weather && 
      <Weather weather={weather}/>
      }
    </div>
  )
}

export default App
