import { useState } from "react";
import { createItem, uploadImage } from "../services/itemService";
import LocationSelect from "../components/LocationSelect";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";

function PostItem() {
  const { user } = useAuth();

  const [type, setType] = useState("lost");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageURL = image ? await uploadImage(image) : "";

    await createItem({
      type,
      category,
      location,
      description,
      imageURL,
      postedBy: user.uid,
    });

    alert("Item posted successfully!");
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Post Item</h3>

        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <input
          placeholder="Category (Wallet, Phone...)"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />

        <LocationSelect value={location} onChange={setLocation} />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        <input type="file" onChange={e => setImage(e.target.files[0])} />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

const styles = {
  form: {
    maxWidth: "400px",
    margin: "30px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default PostItem;
