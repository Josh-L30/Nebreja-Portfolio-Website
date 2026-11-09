export const data = fetch(
  new URL("../data/content.json", import.meta.url),
).then((response) => {
  if (!response.ok) throw new Error("Content unavailable");
  return response.json();
});
export const node = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};
const imageURL = (file, width) =>
  new URL(`../assets/${file}-${width}.webp`, import.meta.url).href;
export function fillImage(image, file, sizes) {
  if (file.startsWith("assets/")) {
    image.srcset = "";
    image.src = new URL("../" + file, import.meta.url).href;
    image.width = 1895;
    image.height = 867;
    image.decoding = "async";
    return;
  }
  image.srcset = [480, 960, 1440]
    .map((width) => `${imageURL(file, width)} ${width}w`)
    .join(", ");
  image.sizes = sizes;
  image.src = imageURL(file, 960);
  image.width = 1440;
  image.height = 720;
  image.decoding = "async";
}

export const arrowIcon = () => {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "1.5");
  icon.setAttribute("aria-hidden", "true");
  const path = document.createElementNS(icon.namespaceURI, "path");
  path.setAttribute("d", "M5 19 19 5M5 5h14v14");
  icon.append(path);
  return icon;
};
