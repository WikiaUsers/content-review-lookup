// Popups de referencias
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

// Bloquear foros
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Este foro se considera archivado ya que no se ha respondido en <expiryDays> días.",
};

importArticles({
    type: "script",
    articles: [
        // Mostrar imágenes duplicadas
        "MediaWiki:Common.js/DupImageList.js",
        // Resumenes predefinidos
//        "u:dev:Standard_Edit_Summary/code.js",
        // SpellCheck en el editor visual
        "u:dev:VisualSpellCheck/code.js",
        // Popups de referencias
        "u:dev:ReferencePopups/custom.js",
        // Bloquear foros antiguos
        "u:dev:LockForums/code.js"
    ]
});
 
// Borrado rápido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'mantenimiento',
  'label': 'mantenimiento'};
fdButtons[fdButtons.length] = {
  'summary': '[[Ayuda:Vandalismo|vandalismo]]',
  'label': 'vandalismo'};
fdButtons[fdButtons.length] = {
  'summary': '[[Ayuda:Spam|spam]]',
  'label': 'spam'};
fdButtons[fdButtons.length] = {
  'summary': '[[Ben 10 Wiki:Normas de la comunidad#Artículo|Incumplimiento reglas de artículos]]',
  'label': 'Incump. artículos'};
fdButtons[fdButtons.length] = {
  'summary': 'A petición del mismo autor',
  'label': 'a petición'};
fdButtons[fdButtons.length] = {
  'summary': 'Duplicado',
  'label': 'duplicado'};
fdButtons[fdButtons.length] = {
  'summary': 'fan-art',
  'label': 'fanon'};
fdButtons[fdButtons.length] = {
  'summary': 'Irrelevante/Innecesario',
  'label': 'irrelevante'};
importScriptPage( 'FastDelete/code.js', 'dev' );
 
// NOMBREUSUARIO
 
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);
 

// 5. AutoRefreshing RecentChanges and WikiActivity

var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
var ajaxRefresh = 10000;
importScriptPage('AjaxRC/code.js', 'dev');

// 7. Botones extras
 if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
     "speedTip": "Insertar plantilla",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Plantilla"};
 
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "Proponer el artículo para ser borrado",
     "tagOpen": "\{\{borrar|",
     "tagClose": "\}\}",
     "sampleText": "Motivo"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_user.png",
     "speedTip": "Usuario",
     "tagOpen": "\{\{usuario|",
     "tagClose": "\}\}",
     "sampleText": "nombre"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
     "speedTip": "Véase también",
     "tagOpen": "\{\{VT|",
     "tagClose": "\}\}",
     "sampleText": "artículo"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/8e/Button_stub.png",
     "speedTip": "Esbozo",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "esbozo"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/63/Button_l_en.png",
     "speedTip": "Insertar un interwiki a la Ben 10 Wiki inglesa.",
     "tagOpen": "\[\[en:",
     "tagClose": "\]\]",
     "sampleText": "artículo"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6c/Button_see_also.png",
     "speedTip": "Véase también",
     "tagOpen": "\{\{VT|",
     "tagClose": "\}\}",
     "sampleText": "artículo"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/cb/Button_wikipedia.png",
     "speedTip": "Artículo existente en Wikipedia",
     "tagOpen": "\{\{WP|",
     "tagClose": "\}\}",
     "sampleText": "artículo"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/17/Button_indevelopment.png",
     "speedTip": "Marcar el artículo en construcción",
     "tagOpen": "\{\{Construccion|Usuario:",
     "tagClose": "\}\}",
     "sampleText": "tu nombre de usuario"};
 
    }
  //Test
  window.rdaRefreshInterval