import { useEffect, useState } from "react";
import { getItemsByType } from "../services/itemService";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";

function History() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const lost = await getItemsByType("lost");
      setItems(lost.filter(i => i.status === "resolved"));
    };
    load();
  }, []);

  return (
    <>
      <Navbar />
      <h3 style={{ textAlign: "center" }}>Resolved Items</h3>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default History;
