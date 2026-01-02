export const formatDate = (timestamp) => {
  if (!timestamp) return "";

  const date =
    timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};
