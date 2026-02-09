import { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import questionsData from "./data/questions";

function App() {
  const [category, setCategory] = useState(null);
  const [score, setScore] = useState(null);

  function handleRestart() {
    setCategory(null);
    setScore(null);
  }

  return (
    <div className="app">
      {!category && <Home onSelectCategory={setCategory} />}

      {category && score === null && (
        <Quiz category={category} onFinish={setScore} />
      )}

      {category && score !== null && (
        <Result
          score={score}
          total={questionsData[category].length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
