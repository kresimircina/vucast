// getBackgroundClass.js
// Vraća Tailwind gradient klase ovisno o trenutnom vremenu

/**
 * Vraća Tailwind klase za pozadinu ovisno o weather podacima.
 * @param {Object} weather - weather objekt iz OpenWeatherMap API-ja
 * @returns {string} - Tailwind klase za gradient pozadinu
 */
export function getBackgroundClass(weather) {
  // Default (kad nema weather podataka — inicijalno stanje)
  if (!weather) {
    return 'bg-gradient-to-br from-blue-400 to-blue-700';
  }

  const main = weather.weather[0].main;
  const icon = weather.weather[0].icon;
  const isNight = icon.endsWith('n');

  // Noć — jedan gradient bez obzira na vrijeme
  if (isNight) {
    return 'bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800';
  }

  // Dan — ovisi o kategoriji vremena
  switch (main) {
    case 'Clear':
      return 'bg-gradient-to-br from-sky-400 via-blue-400 to-orange-300';
    case 'Clouds':
      return 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600';
    case 'Rain':
    case 'Drizzle':
      return 'bg-gradient-to-br from-slate-600 via-blue-800 to-slate-700';
    case 'Thunderstorm':
      return 'bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900';
    case 'Snow':
      return 'bg-gradient-to-br from-blue-100 via-blue-200 to-slate-300';
    case 'Mist':
    case 'Fog':
    case 'Haze':
      return 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500';
    default:
      return 'bg-gradient-to-br from-blue-400 to-blue-700';
  }
}