/* Any JavaScript here will be loaded for all users on every page load. */
switch (mw.config.get('wgPageName')) {
    case 'Luck':
        $(function(){
            importScriptPage('MediaWiki:LuckCalculator.js');    
        });
        break;
    case 'Conquest_-_Supreme_Victory':
        $(function(){
            importScriptPage('MediaWiki:ConquestCalculator.js');
        });
        break;
    case 'List_of_Items':
        $(function(){
            importScriptPage('MediaWiki:TableCounter.js');
        });
        break;
}
/* ******** Javascript for tooltips below ******* */

window.tooltips_list = [{
        classname: 'item-tooltip',
        parse: '{{DataItem <#item#>|TooltipItem}}'
}];

window.tooltips_config = {
    offsetX: 8,
    offsetY: 8,
    waitForImages: true,
    noCSS: true
};

/* ********************************************************************* */