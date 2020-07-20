/* Any JavaScript here will be loaded for all users on every page load. */
function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
}

importScriptPage('ShowHide/code.js', 'dev');

/* Terrible hack to add "show/hide" behavior to the references section */
$("span.mw-headline:contains('References')").after('   <span id="collapseReferencesToggle" style="font-weight: normal; width: 6em; font-size:67%; cursor:pointer;">[<a>show/hide</a>]</span>');
$("#collapseReferencesToggle").bind('click', function() {
  $("#articleReferences").toggle();
});

/**
 * Places article badges to the left of the article title.
 * Originally from: http://starwars.wikia.com/wiki/MediaWiki:Common.js as showEras()
 * @param {String} className Class name of div that has the article badges
 */
function showArticleBadges(className) {
   var titleDiv = document.getElementById( className );

   if( titleDiv == null || titleDiv == undefined )
   return;

   $('div#articleBadges').remove().appendTo('h1.firstHeading').toggle();
}

showArticleBadges('articleBadges');

// New Look stuff starts here

/* If the rail is present, make article backgound narrower */
if ($("#WikiaRail").length) {$("#WikiaPage").addClass("borderEdge");}

/* Add CUP text to the bottom of the page */
$("footer.CorporateFooter").after('<footer id="CUPLegalText" class="CUPLegalText">This website uses trademarks and/or copyrights owned by <a href="http://pathfinder.wikia.com/wiki/Paizo_Publishing,_LLC">Paizo Publishing, LLC</a>, which are used under Paizo&rsquo;s <a href="http://pathfinder.wikia.com/wiki/PathfinderWiki:Community_Use_Policy">Community Use Policy</a>. We are expressly prohibited from charging you to use or access this content. This website is not published, endorsed, or specifically approved by Paizo Publishing. For more information about Paizo&rsquo;s Community Use Policy, please visit <a href="http://paizo.com/communityuse">paizo.com/communityuse</a>. For more information about Paizo Publishing and Paizo products, please visit <a href="http://paizo.com">paizo.com</a>.</footer>');


/* If the rail is present, make some elements narrower */
if ($("#WikiaRail").length) {
   $("#CUPLegalText").width("660px")
   $(".CorporateFooter").width("670px");
}