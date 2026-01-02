import { useEffect, useState } from "react";
import { listenToNotifications } from "../services/notificationService";
import { useAuth } from "./useAuth";

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenToNotifications(user.uid, setNotifications);
    return () => unsubscribe();
  }, [user]);

  return { notifications };
};
