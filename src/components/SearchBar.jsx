// SearchBar.jsx
// Komponenta za unos naziva grada i pokretanje pretrage

import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const isEmpty = city.trim() === '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty) return;
    onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Unesi naziv grada..."
        className="flex-1 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white"
      />
      <button
        type="submit"
        disabled={isEmpty}
        className="px-6 py-2 rounded-lg bg-white/30 backdrop-blur-md text-white font-semibold hover:bg-white/40 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/30"
      >
        Traži
      </button>
    </form>
  );
}

export default SearchBar;