/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* Icono sociales
 * By: [[Madnessfan34537]]
 */
 window.dev = window.dev || {}; window.dev.editSummaries = { css: '#stdSummaries { width: 264px }', select: 'MediaWiki:Standard Edit Summary' };
 
SpoilerAlert = {
    question: 'Este artículo contiene adelantos y/o tramas de episodios aún no estrenados. ¿Desea continuar?',
    yes: 'Si, quiero continuar',
    no: 'No, gracias',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers');
    }
};
 
 
function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    $('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://twitter.com/MaxSteelWikiES"><img src="https://images.wikia.nocookie.net/rainoftheghosts/images/f/f3/Twitter_icon.png"></a></div></div></div>');
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
		addOnloadHook(SocialIcons);
 
}

/* ANY JAVASCRIPT HERE WILL BE LOADED FOR ALL USERS ON EVERY PAGE LOAD */
 
importArticles({
   type: 'script',
   articles: [
      "u:dev:AjaxRC/code.js", /* Ajax refresh */
      "u:dev:ShowHide/code.js", /* Show/Hide function */
      "u:dev:InactiveUsers/code.js", /* Inactive users label */
      "u:dev:FixWantedFiles/code.js", /* Fix red links to files */
      "u:dev:DisableArchiveEdit/code.js", /* Disable talk page archive editing */
      "u:dev:DupImageList/code.js", /* Duplicate image list */
      "u:dev:ReferencePopups/code.js", /* Reference popups */
      "u:dev:Countdown/code.js", /* Countdown timer */
      "u:dev:MessageWallUserTags/code.js", /* User tags on forum threads */
      "u:dev:WallGreetingButton/code.js", /* Message Wall greeting button */
      "u:dev:BackToTopButton/code.js", /* "Back to top" button */
      "u:dev:DisplayClock/code.js", /* Display clock in wiki header */
      "u:runescape:MediaWiki:Common.js/preload.js", /* Template preloads */
      "u:deadisland:User:Jgjake2/js/DISPLAYTITLE.js", /* DisplayTitle function */
      "u:scripts:Content/SpoilersToggle.js", /* Spoilers by User:Tierre; from Dragon Age Wiki @ w:c:dragonage:Help:Spoilers */
      "MediaWiki:Common.js/PurgeButton.js", /* "Purge" button */
      "MediaWiki:Common.js/userRightsIcons.js", /* Custom user profile icons */
      "MediaWiki:Common.js/Stdsummaries.js", /* Summary filler */
      "MediaWiki:GooglePlus.js", /* Google+ config */
      "MediaWiki:Common.js/slider.js" /* "Slider" header for main page */
    ]
});
 
/* 'Ajax refresh' variables */
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:WikiActivity/activity", "Special:WikiActivity/watchlist", "Special:Log", "Special:Contributions", "Special:NewFiles", "Special:Statistics", "Special:NewPages", "Special:ListFiles"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refreshes the page';
 
/* 'User tags' variables */
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'The War Knight': 'Administrador',
        }
};