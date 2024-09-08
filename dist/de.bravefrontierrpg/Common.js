/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
ItemsToAdd = [
  {
    'Name': 'Fehlende Animationen',
    'Page': 'Kategorie:Missing Animation',
    'Description': 'Diese Einheiten benötigen noch eine GIF-Animation.'
  },
];
AffectsSidebar = true;

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
window.AjaxRCRefreshText = 'Automatische Aktualisierung';
window.AjaxRCRefreshHoverText = 'Seite wird automatisch aktualisiert';
window.ajaxPages = [
    "Spezial:WikiActivity",
];

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};
//// Configuration for Tooltip
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true
};
var tooltips_list = [
    {
        classname: 'js-tooltip-item',
        parse: '{'+'{Tooltip/Item|<#name#>}}',
    },
]

function InsertIframeNews() {
    $('.insert-iframe-news').each(function(k,v){
        var $this = $(this);
        $this.append(
            $('<iframe>')
                .attr('src','http://apiv2-bravefrontier.gumi-europe.net/web/notice/index.php')
                .css('position', 'absolute')
                .css('left', $this.data('iframe-left'))
                .css('top', $this.data('iframe-top'))
                .css('width', $this.data('iframe-width'))
                .css('height', $this.data('iframe-height'))
        );
    });
}
// functions to launch on startup
$(function(){
    InsertIframeNews();
});