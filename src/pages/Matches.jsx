import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { askGemini } from "../services/geminiService";

/**
 * Create AI match when a new item is posted
 */
export const findMatch = async (newItem, oppositeItems) => {
  const prompt = `
Lost/Found Item:
${JSON.stringify(newItem)}

Possible Matches:
${JSON.stringify(oppositeItems)}

Return JSON ONLY:
{
  "matchedItemId": "string",
  "confidence": number
}
`;

  const response = await askGemini(prompt);

  try {
    const match = JSON.parse(response);

    if (match.confidence >= 70) {
      await addDoc(collection(db, "matches"), {
        lostItemId:
          newItem.type === "lost" ? newItem.id : match.matchedItemId,
        foundItemId:
          newItem.type === "found" ? newItem.id : match.matchedItemId,
        confidence: match.confidence,
        createdAt: new Date(),
      });
    }
  } catch (err) {
    console.error("Match parsing failed", err);
  }
};

/**
 * 🔥 THIS EXPORT IS REQUIRED BY Matches.jsx
 */
export const getAllMatches = async () => {
  const snapshot = await getDocs(collection(db, "matches"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
