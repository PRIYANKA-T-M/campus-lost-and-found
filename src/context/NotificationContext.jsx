import { createContext } from "react";
import { useNotifications } from "../hooks/useNotifications";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const data = useNotifications();
  return (
    <NotificationContext.Provider value={data}>
      {children}
    </NotificationContext.Provider>
  );
}
