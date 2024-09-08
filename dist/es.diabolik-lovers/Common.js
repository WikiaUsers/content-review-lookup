window.AjaxRCRefreshText = "Auto-Actualizar";
window.AjaxRCRefreshHoverText = "Actualiza la página automáticamente";
window.ajaxPages = [
  "Especial:CambiosRecientes",
  "Especial:WikiActivity",
  "Especial:PáginasSinCategorizar",
  "Especial:Todas",
];

(function userNameReplace() {
  var disableUsernameReplace;
  if (disableUsernameReplace || mw.config.get("wgUserName") === null) {
    return;
  }
  document.querySelector("span.insertusername").innerText = mw.config.get(
    "wgUserName"
  );
})();

if ($.inArray("Spoiler", wgCategories) > -1) {
  window.SpoilerAlertJS = {
    question: "Esta área contiene spoilers. ¿Seguro que quieres leerlo?",
    yes: "Si",
    no: "No",
    fadeDelay: 1600,
  };
}