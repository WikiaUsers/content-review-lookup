/* Any JavaScript here will be loaded for all users on every page load. */

window.railWAM = {
    logPage:"Project:WAM Log"
};

window.AjaxCommentDeleteConfig = {
    fastDelete: "housekeeping"
};

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
}
/* ******** Javascript for tooltips below ******* */

var tooltips_list = [{
        classname: 'item-tooltip',
        parse: '{{DataItem <#item#>|TooltipItem}}'
}];

var tooltips_config = {
    offsetX: 8,
    offsetY: 8,
    waitForImages: true,
    noCSS: true
};

/* ********************************************************************* */