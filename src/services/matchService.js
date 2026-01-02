import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { askGemini } from "./geminiService";

export const findMatch = async (newItem, oppositeItems) => {
  const prompt = `
Lost/Found Item:
${JSON.stringify(newItem)}

Possible Matches:
${JSON.stringify(oppositeItems)}

Find the best match.
Return JSON:
{ "matchedItemId": "...", "confidence": number }
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
    console.error("Gemini match parsing failed", err);
  }
};
