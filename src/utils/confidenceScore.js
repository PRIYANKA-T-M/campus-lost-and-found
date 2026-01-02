export const confidenceLabel = (score) => {
  if (score >= 90) return "Very High";
  if (score >= 75) return "High";
  if (score >= 60) return "Medium";
  return "Low";
};
