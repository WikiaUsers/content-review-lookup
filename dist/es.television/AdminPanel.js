// Panel administrativo
var server = mw.config.get('wgServer');
var edittoken = mw.user.tokens.values.editToken;
$('.WikiaSiteWrapper').append('<div class="lateral"><div class="paneladministrativo"><h2>Panel administrativo</h2><hr class="separator" /><div class="contenido"></div><div style="vertical-align: bottom; float: right;"><a onclick="agregar()">añadir</a></div></div></div>');
$.getJSON('/api.php?action=parse&text={{Template:Wikivisión:Panel administrativo}}&format=json', function(data) {
   var code = data.parse.text['*'];
    $('.lateral .contenido').append(code);
});
function agregar() {
    $.showCustomModal('Agregar tarea', '<form class="WikiaForm" method="" name="" id="adminpanel"><fieldset><strong>¿Qué quieres añadir</strong><br /><textarea name="tareas" id="tareas" cols="80" rows="3" placeholder="Agrega aquí las tareas que quieres que se añadan"></textarea></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancelar",
            handler: function () {
                cancelarTarea();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Agregar",
            handler: function () {
                agregarTarea();
            }
        }]
    });
}
function cancelarTarea() {
    $("#requestWindow").closeModal();
}
function agregarTarea() {
    console.log('añadiendo...');
    var $form = $('#adminpanel'),
        tareas = $form.find('#tareas').val(),
        page = '\n*' + tareas + '';
    if (!tareas) {
        alert("¡No has colocado la tarea!");
        return;
    }
    console.log('revisado...');
    var url = server + '/api.php?action=edit&title=Template:Wikivisión:Panel administrativo&appendtext=' + encodeURIComponent(page) + '&&token=' + encodeURIComponent(edittoken);
    console.log('datos obtenidos: ',url);
    $.post(url, function (r) {
        console.log('La tarea ha sido añadida:',r);
        cancelarTarea();
        window.location.reload();
    });
    console.log('guardando...');
}