importArticles({
    type: "script",
    articles: [
        // Ajax RecentChanges
        "w:c:dev:AjaxRC/code.js"
    ]
});
 
// RevealAnonIP
window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/usercode.js', 'dev');
 
// Borrado r�pido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'Esbozo',
  'label': 'Esbozo'};
fdButtons[fdButtons.length] = {
  'summary': '[[Ayuda:Vandalismo|Vandalismo]]',
  'label': 'Vandalismo'};
fdButtons[fdButtons.length] = {
  'summary': 'Aqu� no pas� nada',
  'label': 'Yolo'};
fdButtons[fdButtons.length] = {
  'summary': 'A petici�n del mismo autor',
  'label': 'A petici�n'};
fdButtons[fdButtons.length] = {
  'summary': 'Duplicado',
  'label': 'duplicado'};
fdButtons[fdButtons.length] = {
  'summary': 'Irrelevante/innecesario',
  'label': 'Irrelevante'};
importScriptPage( 'FastDelete/code.js', 'dev' );