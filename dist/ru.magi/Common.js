/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// **************************************************
// Experimental javascript countdown timer
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = '';
    } else {
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

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/**Reference Popups
    *Adapted from wikipedia
    */
mw.loader.load( '//en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-ReferenceTooltips.js&action=raw&ctype=text/javascript' );
mw.loader.load( '//en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-ReferenceTooltips.css&action=raw&ctype=text/css', 'text/css' );
mw.util.addCSS( '.referencetooltip > li > sup { display: none; }' );

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/Toggler.js',
        'u:dev:ShowHide/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:AjaxRC/code.js'
    ]
});