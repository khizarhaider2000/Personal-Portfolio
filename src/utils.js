const assetMap = import.meta.glob("../assets/**/*", {
  eager: true,
  import: "default",
});

export const getImageUrl = (path = "") => {
  const normalizedPath = path.replace(/^\.\//, "").replace(/^\/+/, "");
  const key = `../assets/${normalizedPath}`;
  const assetUrl = assetMap[key];

  if (!assetUrl) {
    console.warn(`Asset not found for path: ${path}`);
    return "";
  }

  return assetUrl;
};
