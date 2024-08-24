/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/*** Añadir botón para editar el mensaje de bienvenida del muro ***/
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

// Actividad que se actualiza sola
AjaxRCRefreshText = 'Actividad automatizada';
AjaxRCRefreshHoverText = 'Con la casilla marcada esta página se actualizará automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity", "Especial:PáginasNuevas", "Especial:Seguimiento"];
importScriptPage('AjaxRC/code.js', 'dev');
// Botón para regresar arriba
importScriptPage('BackToTopButton/code.js', 'dev');
// Script para cuenta regresiva
importScriptPage('Countdown/code.js', 'dev');
// Etiqueta para usuarios inactivos
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
// Referencias en globos
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});
// Mostrar IP de anónimos para usuarios con ciertos permisos
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'helper', 'util', 'staff']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
// Script para mostrar con etiquetas a los mejores editores
importArticles({
    type: 'script',
    articles: [
        'w:dev:TopEditors/code.js'
    ]
});
// Borrado rápido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'Este artículo no guarda relación con el tema del Wiki',
  'accesskey': '1',
  'label': 'Sin relación'};
fdButtons[fdButtons.length] = {
  'summary': 'Este artículo lleva en sí Spam u links hacia otros sitios Web',
  'accesskey': '2',
  'label': 'Spam'};
fdButtons[fdButtons.length] = {
  'summary': 'Esta creación contiene un grado alto de vandalismos',
  'accesskey': '3',
  'label': 'Vandalismo'};
fdButtons[fdButtons.length] = {
  'summary': 'El contenido podría tratarse de especulaciones y mentiras',
  'accesskey': '4',
  'label': 'Especulación'};
fdButtons[fdButtons.length] = {
  'summary': 'El artículo llevaba contenido erótico, sexual y variantes',
  'accesskey': '5',
  'label': 'Sexual'};
fdButtons[fdButtons.length] = {
  'summary': 'Artículo excesivamente corto, puedes crearlo cuando tengas más contenido que mostrar en él',
  'accesskey': '6',
  'label': 'C. Insuficiente'};
importArticle({type: 'script', article: 'w:c:pintorsmeargle:MediaWiki:Common.js/borradoRápido.js'});