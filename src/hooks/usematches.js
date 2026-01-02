import { useEffect, useState } from "react";
import { getAllMatches } from "../services/matchService";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

export const useMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      const matchDocs = await getAllMatches();

      const enriched = await Promise.all(
        matchDocs.map(async (m) => {
          const lostSnap = await getDoc(doc(db, "items", m.lostItemId));
          const foundSnap = await getDoc(doc(db, "items", m.foundItemId));

          return {
            ...m,
            lostItem: { id: lostSnap.id, ...lostSnap.data() },
            foundItem: { id: foundSnap.id, ...foundSnap.data() },
          };
        })
      );

      setMatches(enriched);
      setLoading(false);
    };

    loadMatches();
  }, []);

  return { matches, loading };
};
