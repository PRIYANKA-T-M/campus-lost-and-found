import { loginWithGoogle } from "../services/authservice";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed"+err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🎒 Campus Lost & Found</h2>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
};

export default Login;
