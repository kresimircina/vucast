// weatherApi.js
// Service za komunikaciju s OpenWeatherMap API-jem

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Dohvaća trenutno vrijeme za zadani grad.
 * @param {string} city - naziv grada (npr. "Vukovar")
 * @param {string} units - "metric" za °C, "imperial" za °F
 * @returns {Promise<Object>} - podaci o vremenu
 */
export async function getCurrentWeather(city, units = 'metric') {
  if (!API_KEY) {
    throw new Error('API ključ nije postavljen. Provjeri .env datoteku.');
  }

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}&lang=hr`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Grad "${city}" nije pronađen.`);
    }
    if (response.status === 401) {
      throw new Error('Neispravan API ključ.');
    }
    throw new Error(`Greška pri dohvaćanju podataka (${response.status}).`);
  }

  const data = await response.json();
  return data;
}

/**
 * Dohvaća trenutno vrijeme prema koordinatama.
 * @param {number} lat - geografska širina
 * @param {number} lon - geografska dužina
 * @param {string} units - "metric" ili "imperial"
 * @returns {Promise<Object>} - podaci o vremenu
 */
export async function getWeatherByCoords(lat, lon, units = 'metric') {
  if (!API_KEY) {
    throw new Error('API ključ nije postavljen. Provjeri .env datoteku.');
  }

  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}&lang=hr`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Neispravan API ključ.');
    }
    throw new Error(`Greška pri dohvaćanju podataka (${response.status}).`);
  }

  const data = await response.json();
  return data;
}