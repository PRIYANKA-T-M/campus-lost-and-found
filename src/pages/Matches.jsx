import { useEffect, useState } from "react";
import { getAllMatches } from "../services/matchService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Matches() {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMatches = async () => {
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
    };

    loadMatches();
  }, []);

  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: "center" }}>🤖 AI Matches</h2>

      {matches.length === 0 && (
        <p style={{ textAlign: "center" }}>No matches yet</p>
      )}

      {matches.map(match => (
        <div key={match.id} style={styles.matchBox}>
          <div style={styles.items}>
            <ItemCard item={match.lostItem} />
            <ItemCard item={match.foundItem} />
          </div>

          <p>
            <b>Confidence:</b> {match.confidence}%
          </p>

          <button
            onClick={() => navigate(`/claim/${match.lostItem.id}`)}
          >
            Claim Item
          </button>
        </div>
      ))}
    </>
  );
}

const styles = {
  matchBox: {
    border: "2px solid #ddd",
    padding: "20px",
    margin: "20px",
    borderRadius: "10px",
  },
  items: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
};

export default Matches;
