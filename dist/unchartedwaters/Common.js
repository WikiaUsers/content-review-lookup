//ImageMapEdit script, more info on:
//https://meta.wikimedia.org/wiki/User:Dapete/ImageMapEdit#English
if (wgNamespaceNumber==6 && wgAction=='view') {
	mw.loader.load('//tools.wmflabs.org/imagemapedit/ime.js');
}


/*-----------------------------------------------------------------------------------------------*/
// http://dev.wikia.com/wiki/BotoneraPopups
importScriptURI('http://dev.wikia.com/wiki/BotoneraPopups/Code/en.js?action=raw&ctype=text/javascript&templates=expand');
importStylesheetPage('BotoneraPopups/code.css', 'dev');



importScriptURI('dev:MassRename/code.js');
// Lists all duplicate images on [[UW-Template:Duplicate Images]]
importScriptPage('DupImageList/code.js', 'dev');

// jQuery-UI v1.8.24
importScriptURI('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.24/jquery-ui.min.js');

// Template:ShowInfo JavaScript
importScriptPage('Template:ShowInfo/Script.js');
 
monoBookText = 'MonoBook';
oasisText = 'Wikia';


importStylesheetPage('Template:Questinfo/Stylesheet.css');
importStylesheetPage('Template:Ambox/code.css');
importStylesheetPage('Template:Forum/code.css');
importStylesheetPage('Template:BioStyle.css');
importStylesheetPage('Template:DajanStyle.css');
importStylesheetPage('Template:ShowInfo/Style.css');
importStylesheetPage('Template:BookInfo/Style.css');
importStylesheetPage('Template:AidesInfo/Style.css');
importStylesheetPage('Template:h1/Style.css');
importStylesheetPage('Template:SkillInfo/Style.css');
importStylesheetPage('Template:NPCInfo/Style.css');
importStylesheetPage('Template:NPCprod/Style.css');
importStylesheetPage('UW-Templates:UWtable/Style.css');


importScriptPage('w:c:dev:SkinSwitchButton/code.js');
importScriptPage('Template:NPCprod/Script.js');
importScriptPage('Template:TGnfo/Script.js');
importScriptPage('Template:AidesInfo/Script.js');
importScriptPage('Template:DiscoveryInfo/Script.js');
importScriptPage('UW-Templates:UWtable/Script.js');

importScriptPage('Template:JobsInfo/Script.js');

if (mw.config.get("wgUserGroups").indexOf('Bureaucrat') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';
  importScriptPage('MediaWiki:MassRename/code.js', 'dev');
}
/*
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:SkinSwitchButton/code.js',
        'Template:NPCprod/Script.js',
        'Template:TGnfo/Script.js',
        'Template:AidesInfo/Script.js',
        'Template:DiscoveryInfo/Script.js',
        'UW-Templates:UWtable/Script.js',
        'Template:JobsInfo/Script.js'
    ]
});
*/

$('table.uisortable').children('tbody').addClass('ui-sortable');
$('.ui-sortable').sortable();
$('.ui-sortable').disableSelection();
$('.ui-draggable').draggable();


//Updated @ 22:09, March 25, 2015 (UTC)