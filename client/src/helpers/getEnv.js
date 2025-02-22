export const getEnv = (envName) => {
  const env = import.meta.env;
  const value = env[envName];

  if (!value) {
    console.warn(
      `⚠️ Warning: Environment variable "${envName}" is not defined.`
    );
  }

  return value || ""; // Return an empty string if not found
};
