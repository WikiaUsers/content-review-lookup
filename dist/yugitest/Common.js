/*global mw, $, importStylesheet, importScript, importArticles, addOnloadHook, enableOldForumEdit */
/*jshint browser:true, curly:false, eqnull:true, strict:false */
mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */

// Cleanup excessive space in hlist elements
if (document.getElementsByClassName('hlist')[0])
{
    var hlists = document.getElementsByClassName('hlist');
    for (var i = 0; i < hlists.length; i++)
    {
        var items = hlists[i].getElementsByTagName('li');
        for (var j = 0; j < items.length; j++)
           items[j].innerHTML = items[j].innerHTML.trim();
    }
}

/* End of mw.loader.using callback; code should be added above this line */
} );