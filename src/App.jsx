import { useState } from 'react';
import {
  getCurrentWeather,
  getWeatherByCoords,
  getForecast,
  getForecastByCoords,
} from './services/weatherApi';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import UnitToggle from './components/UnitToggle';
import Forecast from './components/Forecast';
import { getBackgroundClass } from './utils/getBackgroundClass';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState('metric');
  const [lastQuery, setLastQuery] = useState(null);

  const fetchByCity = async (city, unitsToUse) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city, unitsToUse),
        getForecast(city, unitsToUse),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      setLastQuery({ type: 'city', value: city });
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchByCoords = async (lat, lon, unitsToUse) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoords(lat, lon, unitsToUse),
        getForecastByCoords(lat, lon, unitsToUse),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      setLastQuery({ type: 'coords', value: { lat, lon } });
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    fetchByCity(city, units);
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setError('Tvoj browser ne podržava geolokaciju.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchByCoords(latitude, longitude, units);
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Odbijen pristup lokaciji. Dozvoli u postavkama browsera.');
        } else {
          setError('Nije moguće dohvatiti lokaciju.');
        }
      }
    );
  };

  const handleUnitToggle = (newUnits) => {
    if (newUnits === units) return;
    setUnits(newUnits);

    if (!lastQuery) return;

    if (lastQuery.type === 'city') {
      fetchByCity(lastQuery.value, newUnits);
    } else {
      fetchByCoords(lastQuery.value.lat, lastQuery.value.lon, newUnits);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-8 gap-6 transition-all duration-1000 ${getBackgroundClass(weather)}`}>
      <div className="flex items-center justify-between w-full max-w-md">
        <h1 className="text-4xl font-bold text-white">VuCast</h1>
        <UnitToggle units={units} onToggle={handleUnitToggle} />
      </div>

      <SearchBar onSearch={handleSearch} onGeolocate={handleGeolocate} />

      {loading && (
        <p className="text-white text-lg">Učitavam...</p>
      )}

      {error && (
        <p className="text-red-200 text-lg">❌ {error}</p>
      )}

      {weather && forecast && !loading && (
        <>
          <CurrentWeather weather={weather} units={units} />
          <WeatherDetails weather={weather} units={units} />
          <Forecast forecastList={forecast} units={units} />
        </>
      )}
    </div>
  );
}

export default App;