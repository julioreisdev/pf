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

export function isVideo(typeFile) {
  if (
    typeFile?.includes(".ogg") ||
    typeFile?.includes(".mkv") ||
    typeFile?.includes(".mp4")
  )
    return true;

  return false;
}
