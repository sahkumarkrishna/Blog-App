export const handleError = (statusCode, message) => {
  const error = new Error(message); // ✅ Correct instantiation
  error.statusCode = statusCode;
  return error;
};
