export async function loadInterFonts() {
  const [regular, bold] = await Promise.all([
    fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-400-normal.woff"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-700-normal.woff"
    ).then((r) => r.arrayBuffer()),
  ]);
  return { regular, bold };
}
