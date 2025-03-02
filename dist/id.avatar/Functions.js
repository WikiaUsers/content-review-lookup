


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

/*
    to call in onload hooks
*/
function initFunctionsJS()
{
    storePageName();
}