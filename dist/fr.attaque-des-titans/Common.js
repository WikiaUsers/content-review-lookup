/*************************************************************************
 * Common JS du wiki                                                    **
 * Il est interdit de mettre du code JS directement dans cette page :   **
 * Toujours passer par une page et un import                            **
 * Version revue par @Think D. Solucer                                  **
 ************************************************************************/
 //<source lang="javascript">
// Wikia's own WikiaScriptLoader isn't automatically included in other skins such as monobook.
// Presumably this is because they no longer support them. This checks to see if WikiaScriptLoader 
// function reference has been declared, and if it has not, it creates it. Backwards compatibility
// for everybody! - Blame User:Tierrie @ DA Wiki if this works. Blame someone else if it breaks.
if(typeof WikiaScriptLoader === 'undefined') {
  var WikiaScriptLoader=WikiaScriptLoader?WikiaScriptLoader:function(){var b=navigator.userAgent.toLowerCase();this.useDOMInjection=b.indexOf("opera")!=-1||b.indexOf("firefox")!=-1&&b.indexOf("/4.0b")==-1;this.isIE=b.indexOf("opera")==-1&&b.indexOf("msie")!=-1;this.headNode=document.getElementsByTagName("HEAD")[0]}; WikiaScriptLoader.prototype={loadScript:function(b,c){this.useDOMInjection?this.loadScriptDOMInjection(b,c):this.loadScriptDocumentWrite(b,c)},loadScriptDOMInjection:function(b,c){var a=document.createElement("script");a.type="text/javascript";a.src=b;var d=function(){a.onloadDone=true;typeof c=="function"&&c()};a.onloadDone=false;a.onload=d;a.onreadystatechange=function(){a.readyState=="loaded"&&!a.onloadDone&&d()};this.headNode.appendChild(a)},loadScriptDocumentWrite:function(b,c){document.write('<script src="'+ b+'" type="text/javascript"><\/script>');var a=function(){typeof c=="function"&&c()};typeof c=="function"&&this.addHandler(window,"load",a)},loadScriptAjax:function(b,c){var a=this,d=this.getXHRObject();d.onreadystatechange=function(){if(d.readyState==4){var e=d.responseText;if(a.isIE)eval(e);else{var f=document.createElement("script");f.type="text/javascript";f.text=e;a.headNode.appendChild(f)}typeof c=="function"&&c()}};d.open("GET",b,true);d.send("")},loadCSS:function(b,c){var a=document.createElement("link"); a.rel="stylesheet";a.type="text/css";a.media=c||"";a.href=b;this.headNode.appendChild(a)},addHandler:function(b,c,a){if(window.addEventListener)window.addEventListener(c,a,false);else window.attachEvent&&window.attachEvent("on"+c,a)},getXHRObject:function(){var b=false;try{b=new XMLHttpRequest}catch(c){for(var a=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],d=a.length,e=0;e<d;e++){try{b=new ActiveXObject(a[e])}catch(f){continue}break}}return b}};window.wsl=new WikiaScriptLoader;
}
//Importing scripts from dev.wikia.com. Remember to add new scripts within this importArticles block to reduce the times for loading and executing
/* Actualisation automatique */
window.AjaxRCRefreshText = 'Actualisation automatique';
window.AjaxRCRefreshHoverText = 'Actualiser automatiquement la page';
window.ajaxPages = ["Spécial:Modifications_récentes","Spécial:WikiActivity"];

/*Statut*/

// **************************************************
// Infobox spoilers
// **************************************************
 
$(function spoilerLoad(){
    $("[title='Cliquer pour faire apparaître']").click(function(){$(this.nextSibling).fadeIn()});
});
 
// **************************************************
// - end - Infobox spoilers
// **************************************************

 
//Customization for imported scripts
//PreloadFileDescription, source: https://dev.wikia.com/wiki/PreloadFileDescription
PFD_templates = [
    {
        label:   'Images',
        desc:    '{{Documentation_Image\n|Description = \n|source      = \n|Vu = \n|Information }}',
    },
];

// https://dev.wikia.com/wiki/RevealAnonIP This must be placed above all imports.
window.RevealAnonIP = {
    permissions : ['user']
};
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/navfix.js", /*Fix wiki navigation ~Jgjake2*/
        "MediaWiki:Common.js/countdown.js", /*Countdown timer ~Splarkle*/
        "MediaWiki:Common.js/sliders.js", /*Jquery sliders ~Tierrie*/
        "MediaWiki:Common.js/title.js", /* {{Title}} ~CoDWiki*/
        "MediaWiki:Common.js/collapse.js", /*Collapsibles ~HaLo2FrEeEk*/
        "MediaWiki:Common.js/summaries.js", /*Standard edit summaries*/
        "MediaWiki:Common.js/UserGroupMessages.js",
        "MediaWiki:Common.js/masthead.js",
        "MediaWiki:Common.js/autolock.js", /*30day blog lock*/
        
        "MediaWiki:Functions.js",
        "MediaWiki:Gadget-Edittools.js",
        "MediaWiki:Gadget-SigReminder.js",
        "MediaWiki:Accueil.js", /* accueil */
        "MediaWiki:Spoiler.js", /* Modele spoiler */
        "MediaWiki:Think.js",
        "MediaWiki:Common.js/Other.js", /* Tout code important devra etre mis ici */
        "MediaWiki:Chat.js",
        
        "u:dev:View_Source/code.js", /* add "view source" link to edit dropdown */
        "u:dev:PurgeButton/code.js", /* add "refresh" link to edit dropdown */
        "u:dev:SearchSuggest/code.js", // add "search suggestions" to search results
        "w:c:deadisland:User:Jgjake2/js/ElderScrolls/Popups.js", /*Popup script  ~Jgjake2*/
        "w:c:fr.onepiece:MediaWiki:Common.js/Switch.js",
        "w:c:dev:RevealAnonIP/code.js",
    ]
});

/* Actualisation automatique */
window.AjaxRCRefreshText = 'Actualisation automatique';
window.AjaxRCRefreshHoverText = 'Actualiser automatiquement la page';
window.ajaxPages = ["Spécial:Modifications_récentes","Spécial:WikiActivity"]