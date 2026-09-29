// groupForecastByDay.js
// Transformira 3-satne intervale iz OpenWeather API-ja u dnevne sažetke

/**
 * Grupira 40 3-satnih intervala u 5 dnevnih sažetaka.
 * @param {Array} list - array of forecast items iz OpenWeather API-ja
 * @returns {Array} - array od 5 objekata { date, tempMin, tempMax, icon, description }
 */
export function groupForecastByDay(list) {
  const daysMap = new Map();

  list.forEach((item) => {
    // item.dt_txt izgleda "2026-09-30 12:00:00"
    const dateKey = item.dt_txt.split(' ')[0]; // "2026-09-30"

    if (!daysMap.has(dateKey)) {
      daysMap.set(dateKey, {
        date: dateKey,
        temps: [],
        items: [],
      });
    }

    const day = daysMap.get(dateKey);
    day.temps.push(item.main.temp);
    day.items.push(item);
  });

  // Pretvori Map u array i za svaki dan izračunaj min/max i uzmi reprezentativnu ikonu
  const result = Array.from(daysMap.values()).map((day) => {
    // Reprezentativna ikona: item najbliži 12:00 (podne)
    const noonItem =
      day.items.find((i) => i.dt_txt.includes('12:00:00')) || day.items[0];

    return {
      date: day.date,
      tempMin: Math.min(...day.temps),
      tempMax: Math.max(...day.temps),
      icon: noonItem.weather[0].icon,
      description: noonItem.weather[0].description,
    };
  });

  // Vrati samo prvih 5 dana (za slučaj da API vrati više)
  return result.slice(0, 5);
}