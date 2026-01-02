import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { askGemini } from "./geminiService";

export const generateQuiz = async (item) => {
  const prompt = `
Generate 4 verification questions only the owner can answer.
Item details: ${JSON.stringify(item)}
`;

  return await askGemini(prompt);
};

export const verifyAnswers = async (questions, answers) => {
  const prompt = `
Questions: ${JSON.stringify(questions)}
Answers: ${JSON.stringify(answers)}

Evaluate and return JSON:
{ "score": number, "verified": true/false }
`;

  const result = await askGemini(prompt);
  return JSON.parse(result);
};

export const submitClaim = async (itemId, userId, questions, answers, score, verified) => {
  await addDoc(collection(db, "claims"), {
    itemId,
    claimantId: userId,
    questions,
    answers,
    score,
    verified,
    createdAt: new Date(),
  });

  if (verified) {
    await updateDoc(doc(db, "items", itemId), {
      status: "resolved",
    });
  }
};
