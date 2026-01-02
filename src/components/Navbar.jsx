import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <h3>🎒 Campus Lost & Found</h3>

      {user && (
        <div style={styles.links}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/post">Post Item</Link>
          <Link to="/history">History</Link>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#f3f4f6",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
};

export default Navbar;
