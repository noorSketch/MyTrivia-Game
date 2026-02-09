
import { useEffect, useState } from "react";
import questionsData from "../data/questions";

// Time limit per question (seconds)
const TIME_LIMIT = 15;

function Quiz({ category, onFinish }) {

  /* =======================
     STATE MANAGEMENT
  ======================== */

  // List of 10 randomly selected questions
  const [questions, setQuestions] = useState([]);

  // Index of current question
  const [currentIndex, setCurrentIndex] = useState(0);

  // User score (correct answers count)
  const [score, setScore] = useState(0);

  // Countdown timer for each question
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  // Stores selected answer index (null = not answered yet)
  const [selectedAnswer, setSelectedAnswer] = useState(null);


  /* =======================
     LOAD & SHUFFLE QUESTIONS
  ======================== */

  useEffect(() => {
    // Copy all questions for selected category
    const allQuestions = [...questionsData[category]];

    // Shuffle questions randomly
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);

    // Pick only 10 questions
    const selectedTen = shuffled.slice(0, 10);

    // Save into state
    setQuestions(selectedTen);
  }, [category]);


  /* =======================
     TIMER LOGIC
  ======================== */

  useEffect(() => {
    // Stop timer if:
    // - questions not loaded
    // - user already answered
    if (!questions.length || selectedAnswer !== null) return;

    // When time runs out, move to next question
    if (timeLeft === 0) {
      goNext();
      return;
    }

    // Decrease timer every second
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Cleanup timeout
    return () => clearTimeout(timer);
  }, [timeLeft, questions, selectedAnswer]);


  /* =======================
     SAFETY CHECK
  ======================== */

  // Prevent crash while loading questions
  if (!questions.length) return null;

  // Current question object
  const currentQuestion = questions[currentIndex];


  /* =======================
     HANDLE ANSWER CLICK
  ======================== */

  function handleAnswerClick(index) {
    // Save selected answer
    setSelectedAnswer(index);

    // Increase score if answer is correct
    if (index === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    // Delay before moving to next question
    setTimeout(goNext, 5500);
  }


  /* =======================
     MOVE TO NEXT QUESTION
  ======================== */

  function goNext() {
    const nextIndex = currentIndex + 1;

    if (nextIndex < questions.length) {
      // Go to next question
      setCurrentIndex(nextIndex);
      setTimeLeft(TIME_LIMIT);
      setSelectedAnswer(null);
    } else {
      // Quiz finished → send score to Result page
      onFinish(score);
    }
  }


  /* =======================
     RENDER UI
  ======================== */

  return (
    <div className="card">

      {/* Header: category & timer */}
      <div className="quiz-header">
        <span>{category.toUpperCase()}</span>

        {/* Timer turns red when ≤ 5 seconds */}
        <span className={`timer ${timeLeft <= 5 ? "danger" : ""}`}>
          ⏱ {timeLeft}s
        </span>
      </div>

      {/* Question text */}
      <h3 className="question">
        {currentQuestion.question}
      </h3>

      {/* Answer options */}
      <div className="options">
        {currentQuestion.options.map((option, index) => {

          // Determine button color after selection
          let className = "";
          if (selectedAnswer !== null && index === selectedAnswer) {
            className =
              index === currentQuestion.answer ? "correct" : "wrong";
          }

          return (
            <button
              key={index}
              className={className}
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswerClick(index)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation appears AFTER answering */}
      {selectedAnswer !== null && (
        <p
          style={{
            marginTop: "16px",
            color: "#555",
            fontSize: "14px",
            fontStyle: "italic",
          }}
        >
          {currentQuestion.explanation}
        </p>
      )}

    </div>
  );
}

export default Quiz;
