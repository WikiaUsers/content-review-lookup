function applyBG() {
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const color = dark ? "black" : "white";

  document.body.style.background = color;
  document.documentElement.style.background = color;
}

applyBG();
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyBG);