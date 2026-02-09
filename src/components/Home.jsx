

function Home({ onSelectCategory }) {
  return (
    <div className="card home">
      <h1 className="title">🧠 FaktArena</h1>

      <p className="subtitle">Uji pengetahuan anda berkaitan Malaysia!</p>

      <div className="category-grid">
        <button
          className="category-card sejarah"
          onClick={() => onSelectCategory("sejarah")}
        >
          <span className="emoji">📜</span>
          <span className="label">Sejarah</span>
        </button>

        <button
          className="category-card geografi"
          onClick={() => onSelectCategory("geografi")}
        >
          <span className="emoji">🌍</span>
          <span className="label">Geografi</span>
        </button>

        <button
          className="category-card warisan"
          onClick={() => onSelectCategory("warisan")}
        >
          <span className="emoji">🏛️</span>
          <span className="label">Warisan</span>
        </button>
      </div>

      <p className="hint">10 soalan  •  Masa terhad ⏱️</p>
    </div>
  );
}

export default Home;
