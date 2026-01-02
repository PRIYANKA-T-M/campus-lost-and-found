function ItemCard({ item, onClaim }) {
  return (
    <div style={styles.card}>
      <img src={item.imageURL} alt="item" style={styles.img} />

      <h4>{item.category}</h4>
      <p>{item.description}</p>
      <p><b>Location:</b> {item.location}</p>
      <p><b>Status:</b> {item.status}</p>

      {onClaim && item.status === "open" && (
        <button onClick={() => onClaim(item.id)}>
          Claim Item
        </button>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    width: "250px",
  },
  img: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
};

export default ItemCard;
