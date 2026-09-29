// Forecast.jsx
// Prikaz 5-dnevne prognoze kao horizontalni red kartica

import { groupForecastByDay } from '../utils/groupForecastByDay';

function Forecast({ forecastList, units }) {
  const days = groupForecastByDay(forecastList);
  const tempSymbol = units === 'metric' ? '°C' : '°F';

  const formatDayName = (dateStr) => {
    const date = new Date(dateStr);
    const days = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];
    return days[date.getDay()];
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-white text-lg font-semibold mb-2 text-center">
        5-dnevna prognoza
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {days.map((day) => (
          <div
            key={day.date}
            className="bg-white/20 backdrop-blur-md p-3 rounded-lg text-white text-center"
          >
            <p className="text-sm font-semibold">
              {formatDayName(day.date)}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              className="w-12 h-12 mx-auto"
            />
            <p className="text-xs">
              {Math.round(day.tempMax)}{tempSymbol}
            </p>
            <p className="text-xs opacity-70">
              {Math.round(day.tempMin)}{tempSymbol}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;