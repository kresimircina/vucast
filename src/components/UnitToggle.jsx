// UnitToggle.jsx
// Toggle između Celzija (metric) i Fahrenheita (imperial)

function UnitToggle({ units, onToggle }) {
  return (
    <div className="flex bg-white/20 backdrop-blur-md rounded-lg p-1">
      <button
        onClick={() => onToggle('metric')}
        className={`px-4 py-1 rounded-md font-semibold transition ${
          units === 'metric'
            ? 'bg-white text-blue-700'
            : 'text-white hover:bg-white/10'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onToggle('imperial')}
        className={`px-4 py-1 rounded-md font-semibold transition ${
          units === 'imperial'
            ? 'bg-white text-blue-700'
            : 'text-white hover:bg-white/10'
        }`}
      >
        °F
      </button>
    </div>
  );
}

export default UnitToggle;