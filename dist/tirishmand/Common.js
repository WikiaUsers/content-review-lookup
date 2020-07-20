/* Any JavaScript here will be loaded for all users on every page load. */

/*#########################################################################
# ==CONFIGURATION OPTIONS==                                               #
#  All config options for imported scripts                                #
#########################################################################*/

/****************************************************************************
 * ==AjaxRC configuration options==                                         *
 *   Auto updating recent changes opt-in - Advanced auto refreshing         *
 *   recent changes and watchlist                                           *
 *    See w:c:dev:AjaxRC for info & attribution                             *
 * *************************************************************************/
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
//ajaxIndicator = ' ';//Link to Custom Progress indicator eg'https://images.wikia.nocookie.net/__cb1/wowwiki/images/0/0e/Progressbar.gif';
ajaxRefresh = 60000; //60000 (60 seconds) this is default anyway
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

/****************************************************************************
 * ==Tooltip configuration options==                                        *
 *   Displays tooltips when hovering over specific elements                 *
 *    More specific config options in Extentions section below. Display &   *
 *    layout options are in the MediaWiki:Wikia.css page                    *
 *    See w:c:dev:Tooltips for info & attribution                           *
 * *************************************************************************/
var tooltips_config = {
    offsetX: 5, // tooltip will be moved right (default 8 for both)
    offsetY: 10, //and down from where the cursor is pointing. Min allowed=5
    waitForImages: true,
    //events: ['CustomEvent'],
}
/*#########################################################################
# ==IMPORTS==                                                             #
#  All imported scripts                                                   #
#########################################################################*/
/*****************************************************************************
 * Importing external code for use on wikia                                  *
 * Any configurations for the below scripts have to be added above before    *
 * scripts are loaded.                                                       *
 *                                                                           *
 * **************************************************************************/
importArticles({
 type:'script',
 debug:'false',
 articles:[
  'u:dev:AjaxRC/code.js',   //
  'u:dev:Tooltips.js',       //Import Tooltip code from dev to active tooltips on pages.
  'MediaWiki:AjaxTables/code.js'   // ajax driven 'show table'.Used for Templates:ajaxsub&AjaxTables See 'MediaWiki:AjaxTables'
 ]
});


/*#########################################################################
# ==EXTENTIONS==                                                          #
#  All code and addons that extend the usability of the wikia             #
#########################################################################*/
/*****************************************************************************
 * ==Tooltip Extended Parameter Options==                                    *
 *  Specific config options for the Tooptip script behaviour on different    *
 *   pages. Provides extra Param settings                                    *
 *                                                                           *
 * **************************************************************************/
/* Custom Tooltips for use with the Tooltips/code.js. Current classes are
    guides only taken from other wikias like age-of-wonders-3 and 
    leagueoflegends to assist in tip structure and learning.*/
var tooltips_list = [
    {
        classname: 'unit-tooltip',
        parse: '{'+'{<#unit#>|rank=<#rank#>|size=<#size#>|upgrade=<#upgrade#>|upgrades=<#upgrades#>|upgraded=<#upgraded#>|race=<#race#>|tt=<#tt#>|show=no}}',
        //onShow: function() { if ((this).getElementsByClassName('template-unit')[0]) {Unit = (this).getElementsByClassName('template-unit')[0]; console.info("Onshow var =",Unit); processunit (Unit);} },
    }, {
        classname: 'service-tooltip',
        parse: '{'+'{<#spell#>|magnitude=<#magnitude#>|tt=<#tt#>}}',
    }, {
        classname: 'rank-tooltip',
        parse: '{'+'{<#ability#>|<#magnitude#>|duration=<#duration#>|tt=<#tt#>|show=no}}',
    }, {
        classname: 'structure-tooltip',
        parse: '{'+'{<#structure#>}}',
    }, {
        classname: 'planet-tooltip',
        parse: '{'+'{<#planet#>}}',
    }, /*{
        classname: 'damageability-tooltip',
        parse: '{'+'{<#ability#>|physical=<#physical#>|spirit=<#spirit#>|blight=<#blight#>|fire=<#fire#>|frost=<#frost#>|shock=<#shock#>|tt=<#tt#>|show=no}}',
        onShow: function(handle) { a = handle; writeloc = (this).getElementsByClassName('writedamage')[0]; damagesource = a.parentElement; unitloc = damagesource.parentElement.parentElement; damageCalc (writeloc, damagesource, unitloc); },
    },*/ {
        classname: 'galaxy-tooltip',
        parse: '{'+'{Prottable|<#magnitude#>|<#element#>}}',
    }, {
classname: 'character_icon',
    parse: '{' + '{Tooltip/Champion|<#character#>|<#skin#>}}',
}, {
    classname: 'cc-tooltip',
    parse: '{' + '{Crowd_control_info|<#type#>}}',
}, {
    classname: 'skin-icon',
    parse: '{' + '{Tooltip/Skin|<#param#>}}',
}, {
    classname: 'skinloading-icon',
    parse: '{' + '{Tooltip/Skin/Loading|<#param#>}}',
}, {
    classname: 'item-icon',
    parse: '{' + '{Tooltip/Item|<#param#>}}',
}, {
    classname: 'spell-icon',
    parse: '{' + '{Tooltip/Spell|<#param#>}}',
}, {
    classname: 'passive-progression',
    parse: '{' + '{Tooltip/Progression|<#size#>|<#values#>|<#levels#>|type=<#type#>|formula=<#formula#>}}',
}, {
    classname: 'tooltip-sandbox',
    parse: '{' + '{Tooltip/Sandbox|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>}}',
}
    ];