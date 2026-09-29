// LoadingSpinner.jsx
// Animirani spinner za loading stanje

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      <p className="text-white text-sm opacity-80">Učitavam podatke...</p>
    </div>
  );
}

export default LoadingSpinner;