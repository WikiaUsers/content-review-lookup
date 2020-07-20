importArticles({
    type: "script",
    articles: [
        // Nombre de usuario
        "MediaWiki:Common.js/nombreUsuario.js",
        // Ajax RecentChanges
        "w:c:dev:AjaxRC/code.js",
        // SpellCheck en el editor visual
        "w:c:dev:VisualSpellCheck/code.js"
    ]
});

// RevealAnonIP
window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/usercode.js', 'dev');

// Borrado rápido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'Esbozo',
  'label': 'Esbozo'};
fdButtons[fdButtons.length] = {
  'summary': '[[Ayuda:Vandalismo|Vandalismo]]',
  'label': 'Vandalismo'};
fdButtons[fdButtons.length] = {
  'summary': '[[Ben 10 Fan Fiction Wiki:Normas de la comunidad|Incumplimiento general de reglas]]',
  'label': 'Incump. reglas'};
fdButtons[fdButtons.length] = {
  'summary': 'A petición del mismo autor',
  'label': 'A petición'};
fdButtons[fdButtons.length] = {
  'summary': 'Duplicado',
  'label': 'duplicado'};
fdButtons[fdButtons.length] = {
  'summary': 'Irrelevante/innecesario',
  'label': 'Irrelevante'};
importScriptPage( 'FastDelete/code.js', 'dev' );