// ExamMainPageTest.jsx
import { useState } from "react";
import ExamTimer from "./ExamTimer";
import QuestionCard from "./QuestionCard";
import FocusWarning from "../../../../components/FocusWarning";

const ExamMainPageTest = () => {
  const dummyExam = { id: 1, name: "Sample Exam", duration: 60, total_marks: 100, total_questions: 3 };
  const dummyQuestions = [
    { id: 1, question: "Q1", options: JSON.stringify([{ ans: true }, { ans: false }]) },
    { id: 2, question: "Q2", options: JSON.stringify([{ ans: false }, { ans: true }]) },
    { id: 3, question: "Q3", options: JSON.stringify([{ ans: true }, { ans: true }]) },
  ];

  const [answers, setAnswers] = useState({});

  const handleAnswerSelect = (id, index) => {
    setAnswers((prev) => ({ ...prev, [id]: index }));
  };

  return (
    <div>
      <h2>{dummyExam.name}</h2>
      <ExamTimer duration={dummyExam.duration} onTimeUp={() => console.log("Time up")} />

      {dummyQuestions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          questionNumber={q.id}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={answers[q.id]}
          isAnswered={answers[q.id] !== undefined}
        />
      ))}

      <FocusWarning
        maxWarnings={3}
        active={true}
        onMaxWarnings={() => console.log("Max warnings reached")}
        examId={dummyExam.id}
      />
    </div>
  );
};

export default ExamMainPageTest;
