document.addEventListener("keydown", (function () {
  let buffer = "";
  return function (e) {
    buffer += e.key.toLowerCase();
    if (buffer.includes("ly2")) {
      window.location.href = "/wiki/Template:ly2";
    }
    if (buffer.length > 20) buffer = buffer.slice(-20);
  };
})());