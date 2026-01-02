import { useEffect, useState } from "react";
import { getItemsByType } from "../services/itemService";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadItems = async () => {
      const lost = await getItemsByType("lost");
      const found = await getItemsByType("found");
      setItems([...lost, ...found]);
    };
    loadItems();
  }, []);

  const handleClaim = (itemId) => {
    navigate(`/claim/${itemId}`);
  };

  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: "center" }}>Open Items</h2>
      <div style={styles.grid}>
        {items.map(item => (
          <ItemCard key={item.id} item={item} onClaim={handleClaim} />
        ))}
      </div>
    </>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    padding: "20px",
  },
};

export default Dashboard;
