export const colors = {
  main: "#1070ca",
  black: "#121212",
  grayBlue: "#0f1b2b",
};

export function debounce(func, timeout = 300) {
  let timer = null;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export const isVideo = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("Content-Type");
    return contentType && contentType.startsWith("video");
  } catch (error) {
    console.error("Error checking video type:", error);
    return false;
  }
};
