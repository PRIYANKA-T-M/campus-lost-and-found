import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const sendNotification = async (userId, message, itemId) => {
  await addDoc(collection(db, "notifications"), {
    userId,
    message,
    itemId,
    read: false,
    createdAt: new Date(),
  });
};

export const listenToNotifications = (userId, callback) => {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId)
  );

  return onSnapshot(q, snapshot => {
    const notifs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(notifs);
  });
};
