/* Any JavaScript here will be loaded for all users on every page load. */
/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername()
{
    var spans = getElementsByClass('insertusername', null, 'span');

    for(var i = 0; i < spans.length; i++)
    {
        spans[i].innerHTML = wgUserName;
    }
}

importArticles({
    type: "script",
    articles: [
        "w:c:dev:InputUsername/code.js",
        "u:avatar:MediaWiki:Common.js/icons.js" /* Add icons to page header bottom border */
    ]
});