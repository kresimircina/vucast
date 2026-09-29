// CurrentWeather.jsx
// Prikaz trenutnog vremena — glavna kartica

function CurrentWeather({ weather, units }) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
  const tempSymbol = units === 'metric' ? '°C' : '°F';

  return (
    <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg text-white text-center w-full max-w-md">
      <h2 className="text-2xl font-bold">
        {weather.name}, {weather.sys.country}
      </h2>

      <img
        src={iconUrl}
        alt={weather.weather[0].description}
        className="w-32 h-32 mx-auto"
      />

      <p className="text-6xl font-bold">
        {Math.round(weather.main.temp)}{tempSymbol}
      </p>

      <p className="text-lg capitalize mt-2">
        {weather.weather[0].description}
      </p>

      <p className="text-sm mt-2 opacity-80">
        Osjeća se kao {Math.round(weather.main.feels_like)}{tempSymbol}
      </p>
    </div>
  );
}

export default CurrentWeather;