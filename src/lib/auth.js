const getStorage = (type) => {
  if (typeof window === "undefined") return null;
  return type === "session" ? window.sessionStorage : window.localStorage;
};

const storageKeys = ["token", "authToken"];

export const storeAuthToken = (token) => {
  if (!token || typeof token !== "string") return;
  const session = getStorage("session");
  const local = getStorage("local");

  try {
    session?.setItem("token", token);
  } catch (error) {
    console.warn("Unable to write token to sessionStorage", error);
  }

  try {
    local?.setItem("token", token);
    local?.setItem("authToken", token);
  } catch (error) {
    console.warn("Unable to write token to localStorage", error);
  }
};

export const getStoredAuthToken = () => {
  const session = getStorage("session");
  const local = getStorage("local");

  for (const key of storageKeys) {
    const value = session?.getItem(key);
    if (value) return value;
  }

  for (const key of storageKeys) {
    const value = local?.getItem(key);
    if (value) return value;
  }

  return null;
};
