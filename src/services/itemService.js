import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file) => {
  const imageRef = ref(storage, `images/${Date.now()}-${file.name}`);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};

export const createItem = async (itemData) => {
  await addDoc(collection(db, "items"), {
    ...itemData,
    status: "open",
    createdAt: new Date(),
  });
};

export const getItemsByType = async (type) => {
  const q = query(collection(db, "items"), where("type", "==", type));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateItemStatus = async (itemId, status) => {
  await updateDoc(doc(db, "items", itemId), { status });
};
