/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

document.addEventListener("keydown", (function () {
  let buffer = "";
  return function (e) {
    buffer += e.key.toLowerCase();
    if (buffer.includes("ly2")) {
      window.location.href = "/wiki/Página_do_Easter_Egg";
    }
    if (buffer.length > 20) buffer = buffer.slice(-20);
  };
})());