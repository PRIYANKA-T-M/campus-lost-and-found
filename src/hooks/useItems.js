import { useEffect, useState } from "react";
import { getItemsByType } from "../services/itemService";

export const useItems = (type) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const data = await getItemsByType(type);
      setItems(data);
      setLoading(false);
    };

    loadItems();
  }, [type]);

  return { items, loading };
};
