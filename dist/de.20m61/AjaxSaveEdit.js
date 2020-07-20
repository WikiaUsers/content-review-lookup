function updateAjaxSave() {
    var AjaxSaveTextarea = document.getElementById('editarea').getElementsByTagName('textarea')[0];
    AjaxSaveTextarea.innerHTML = AjaxSaveTextarea.value;
}
setInterval(updateAjaxSave, 1000);