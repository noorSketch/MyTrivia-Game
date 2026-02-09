


function Result({ score, total, onRestart }) {

  // Decide emoji & message based on user's score
  let emoji = "💪";
  let message = "Teruskan usaha!";

  if (score >= 9) {
    emoji = "🏆";
    message = "Tahniah! Sangat cemerlang";
  } else if (score >= 5) {
    emoji = "👏";
    message = "Bagus! Teruskan!";
  } else if (score <= 2) {
    emoji = "😢";
    message = "Sila cuba lagi";
  }

  return (
    <div className="card">
      
      {/* Title */}
      <h2>Tamat! 🎉</h2>

      {/* Emoji feedback */}
      <h1>{emoji}</h1>

      {/* Message based on score */}
      <p>{message}</p>

      {/* Final score (always /10 because only 10 questions shown) */}
      <p className="result-score">
        Skor anda : {score} / 10
      </p>

      {/* Restart quiz */}
      <button
        className="primary result-button"
        onClick={onRestart}
      >
        Main Semula
      </button>

    </div>
  );
}

export default Result;
