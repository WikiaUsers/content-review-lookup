/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

/*** A�adir bot�n para editar el mensaje de bienvenida del muro ***/
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

// Actividad que se actualiza sola
AjaxRCRefreshText = 'Actividad automatizada';
AjaxRCRefreshHoverText = 'Con la casilla marcada esta p�gina se actualizar� autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity", "Especial:P�ginasNuevas", "Especial:Seguimiento"];
importScriptPage('AjaxRC/code.js', 'dev');
// Bot�n para regresar arriba
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
// Mostrar IP de an�nimos para usuarios con ciertos permisos
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
// Borrado r�pido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'Este art�culo no guarda relaci�n con el tema del Wiki',
  'accesskey': '1',
  'label': 'Sin relaci�n'};
fdButtons[fdButtons.length] = {
  'summary': 'Este art�culo lleva en s� Spam u links hacia otros sitios Web',
  'accesskey': '2',
  'label': 'Spam'};
fdButtons[fdButtons.length] = {
  'summary': 'Esta creaci�n contiene un grado alto de vandalismos',
  'accesskey': '3',
  'label': 'Vandalismo'};
fdButtons[fdButtons.length] = {
  'summary': 'El contenido podr�a tratarse de especulaciones y mentiras',
  'accesskey': '4',
  'label': 'Especulaci�n'};
fdButtons[fdButtons.length] = {
  'summary': 'El art�culo llevaba contenido er�tico, sexual y variantes',
  'accesskey': '5',
  'label': 'Sexual'};
fdButtons[fdButtons.length] = {
  'summary': 'Art�culo excesivamente corto, puedes crearlo cuando tengas m�s contenido que mostrar en �l',
  'accesskey': '6',
  'label': 'C. Insuficiente'};
importArticle({type: 'script', article: 'w:c:pintorsmeargle:MediaWiki:Common.js/borradoR�pido.js'});