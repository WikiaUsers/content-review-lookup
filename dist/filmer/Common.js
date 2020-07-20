function preloadMenu() {
  if(document.createbox.preload) {
    var cb = document.createbox;
    if(cb.preload.value == 'Mal:Mal') {
      var sel = 'Maler: <select name="presel" onChange="editvars123();">\n'
      sel += '<option selected> --- Velg mal ---</option>\n';
      sel += '<option value="Mal:Filmmal"> Film</option>\n';
      sel += '<option value="Mal:Skuespillermal"> Skuespiller</option>\n';
      sel += '<option value="Mal:Regissørmal"> Regissør</option>\n';
      sel += '</select>\n';
      cb.innerHTML = sel + cb.innerHTML;
    }
  }
}
addOnloadHook(preloadMenu);

function editvars123() {
document.createbox.preload.value = document.createbox.presel.value;
document.createbox.editintro.value = document.createbox.presel.value + "/intro";
}