// WeatherDetails.jsx
// Grid s dodatnim podacima o vremenu (vjetar, vlažnost, tlak, vidljivost)

function WeatherDetails({ weather }) {
  const details = [
    {
      label: 'Vjetar',
      value: `${weather.wind.speed.toFixed(1)} m/s`,
      icon: '💨',
    },
    {
      label: 'Vlažnost',
      value: `${weather.main.humidity}%`,
      icon: '💧',
    },
    {
      label: 'Tlak',
      value: `${weather.main.pressure} hPa`,
      icon: '📊',
    },
    {
      label: 'Vidljivost',
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      icon: '👁',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md">
      {details.map((item) => (
        <div
          key={item.label}
          className="bg-white/20 backdrop-blur-md p-4 rounded-lg text-white text-center"
        >
          <div className="text-2xl">{item.icon}</div>
          <p className="text-sm opacity-80 mt-1">{item.label}</p>
          <p className="text-lg font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default WeatherDetails;