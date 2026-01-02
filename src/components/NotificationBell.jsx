import { useNotifications } from "../hooks/useNotifications";

function NotificationBell() {
  const { notifications } = useNotifications();

  return (
    <div style={{ position: "relative" }}>
      🔔
      {notifications.length > 0 && (
        <span style={styles.badge}>
          {notifications.length}
        </span>
      )}
    </div>
  );
}

const styles = {
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "red",
    color: "white",
    borderRadius: "50%",
    padding: "3px 7px",
    fontSize: "12px",
  },
};

export default NotificationBell;
