import { useState } from 'react';
import { getCurrentWeather } from './services/weatherApi';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCurrentWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-700 flex flex-col items-center p-8 gap-6">
      <h1 className="text-4xl font-bold text-white">VuCast</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <p className="text-white text-lg">Učitavam...</p>
      )}

      {error && (
        <p className="text-red-200 text-lg">❌ {error}</p>
      )}

      {weather && !loading && (
        <>
          <CurrentWeather weather={weather} />
          <WeatherDetails weather={weather} />
        </>
      )}
    </div>
  );
}

export default App;