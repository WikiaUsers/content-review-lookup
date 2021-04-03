/*
    Makes the image on the search form, if one is present, point to the search page
    instead of the Wikia main page.
*/
function rewriteSearchFormLink()
{
    var links = document.getElementById('searchform');
    if(links === null) return false;
    links = links.getElementsByTagName('a');
   
    if(links.length > 0)
        links[0].href = "/index.php?title=Special:Search&adv=1";
}

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