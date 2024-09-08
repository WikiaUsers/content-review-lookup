/* Spoilers */
SpoilerAlert = {
    question: 'Este artículo contiene spoilers. ¿Deseas continuar?',
    yes: 'Si, acepto',
    no: 'No, mejor no',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

/* Social Media Iconos */
var SocialMediaButtons = {  position: "top", colorScheme: "color", buttonSize: "35px", wikiTwitterAccount: "WikiDead" }; importScriptPage('SocialIcons/code.js','dev');

/* Tooltips */
importArticles({ type: 'script', article: 'u:dev:Tooltips/code.js' });