import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { generateQuiz, verifyAnswers, submitClaim } from "../services/claimService";
import { useAuth } from "../hooks/useAuth";

function Claim() {
  const { itemId } = useParams();
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const loadQuiz = async () => {
      const q = await generateQuiz({ itemId });
      setQuestions(q.split("\n"));
      setAnswers(new Array(q.length).fill(""));
    };
    loadQuiz();
  }, [itemId]);

  const handleSubmit = async () => {
    const result = await verifyAnswers(questions, answers);

    await submitClaim(
      itemId,
      user.uid,
      questions,
      answers,
      result.score,
      result.verified
    );

    alert(result.verified ? "Claim verified!" : "Verification failed");
  };

  return (
    <div style={styles.container}>
      <h3>Verification Quiz</h3>

      {questions.map((q, i) => (
        <div key={i}>
          <p>{q}</p>
          <input
            value={answers[i]}
            onChange={e => {
              const copy = [...answers];
              copy[i] = e.target.value;
              setAnswers(copy);
            }}
          />
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Answers</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "30px auto",
  },
};

export default Claim;
