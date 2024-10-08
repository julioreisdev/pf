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

export function imgBuffer(image) {
  if (image && image.type === "Buffer" && Array.isArray(image.data)) {
    const blob = new Blob([new Uint8Array(image.data)], {
      type: "image/png",
    });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } else {
    return "";
  }
}

export function videoBuffer(video) {
  if (video && video.type === "Buffer" && Array.isArray(video.data)) {
    const blob = new Blob([new Uint8Array(video.data)], {
      type: "video/mp4",
    });
    const videoUrl = URL.createObjectURL(blob);
    return videoUrl;
  } else {
    return "";
  }
}

export function isVideoBuffer(buffer) {
  // Converte o buffer para um array de bytes
  const bytes = new Uint8Array(buffer);

  // Verifica os primeiros bytes para identificar o tipo de arquivo
  // Assinaturas comuns de arquivos de vídeo:
  // MP4: [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]
  // AVI: [0x52, 0x49, 0x46, 0x46] (RIFF)
  // MKV: [0x1A, 0x45, 0xDF, 0xA3]
  // MOV: [0x00, 0x00, 0x00, 0x14, 0x66, 0x74, 0x79, 0x70]

  // MP4
  if (
    bytes.length > 7 &&
    bytes === 0x66 &&
    bytes === 0x74 &&
    bytes === 0x79 &&
    bytes === 0x70
  ) {
    return true;
  }

  // AVI
  if (
    bytes.length > 3 &&
    bytes === 0x52 &&
    bytes === 0x49 &&
    bytes === 0x46 &&
    bytes === 0x46
  ) {
    return true;
  }

  // MKV
  if (
    bytes.length > 3 &&
    bytes === 0x1a &&
    bytes === 0x45 &&
    bytes === 0xdf &&
    bytes === 0xa3
  ) {
    return true;
  }

  // MOV
  if (
    bytes.length > 7 &&
    bytes === 0x66 &&
    bytes === 0x74 &&
    bytes === 0x79 &&
    bytes === 0x70
  ) {
    return true;
  }

  // Se não corresponder a nenhum dos formatos conhecidos, não é um vídeo
  return false;
}
