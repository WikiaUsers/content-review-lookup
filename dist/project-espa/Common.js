/* Any JavaScript here will be loaded for all users on every page load. */
// Ajax auto-refresh
var ajaxPages = [
'Special:RecentChanges',
'Special:WikiActivity',
'Special:Contributions'
];
/* Any JavaScript here will be loaded for all users on every page load. */
// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
function updatetimer(i)
{
var now = new Date();
var then = timers[i].eventdate;
var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
// catch bad date strings
if (isNaN(diff))
{
timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
return;
}
// determine plus/minus
if (diff < 0)
{
diff = -diff;
var tpm = '';
}
else
{
var tpm = '';
}
// calcuate the diff
var left = (diff % 60) + ' seconds';
diff = Math.floor(diff / 60);
if (diff > 0) left = (diff % 60) + ' minutes ' + left;
diff = Math.floor(diff / 60);
if (diff > 0) left = (diff % 24) + ' hours ' + left;
diff = Math.floor(diff / 24);
if (diff > 0) left = diff + ' days ' + left
timers[i].firstChild.nodeValue = tpm + left;
// a setInterval() is more efficient, but calling setTimeout()
// makes errors break the script rather than infinitely recurse
timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
function checktimers()
{
//hide 'nocountdown' and show 'countdown'
var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
var countdowns = getElementsByClassName(document, 'span', 'countdown');
for (var i in countdowns) countdowns[i].style.display = 'inline'
//set up global objects timers and timeouts.
timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
timeouts = new Array(); // generic holder for the timeouts, global
if (timers.length == 0) return;
for (var i in timers)
{
timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
updatetimer(i); //start it up
}
}
addOnloadHook(checktimers);
///////////////////////////////////////
// END OF CODE
///////////////////////////////////////
/**
 * Hides the link to parent pages from subpages if {{HideContentSub}} is included
 **/
function hideContentSub()
{
if (mw.config.get('wgNamespaceNumber') === 0 || $('#hideContentSub').length > 0)
{
if (mw.config.get('skin') === 'oasis')
{
if ($('#WikiaPageHeader h2').text().substring(0, 1) === "<")
{
var $wikiaHeader = $('#WikiaPageHeader h2'),
$backToPageLink;
if (mw.config.get('wgNamespaceNumber') % 2 === 1)
{
// ugly hack to only leave back to page link on talk pages
$backToPageLink = $wikiaHeader.find('a[accesskey="c"]');
$wikiaHeader.html('').append($backToPageLink);
}
else
{
$wikiaHeader.hide();
}
}
}
else
{
if ($('#contentSub span.subpages').text().substring(0, 1) === "<")
{
$('#contentSub span.subpages').hide();
}
}
}
}

// Adds Discord //
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/widgetInject.js"
    ]
});
console.log("loaded common.js");