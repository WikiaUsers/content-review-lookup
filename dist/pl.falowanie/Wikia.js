/* <pre><nowiki> */
 
/*
    Loads the current source of the page "pagename" (as stored in the database)
    and inserts it at the cursor position
*/
function doPreload(pagename)
{
    var loader = new ContentLoader();
    loader.callback = onPreloadArrival;
    loader.send('/index.php?title=' + pagename + '&action=raw&ctype=text/plain');
}
 
function insertAtCursor(myField, myValue)
{
    //IE support
    if (document.selection)
    {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA/NETSCAPE support
    else if(myField.selectionStart || myField.selectionStart == '0')
    {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
        + myValue
        + myField.value.substring(endPos, myField.value.length);
    }
    else
    {
        myField.value += myValue;
    }
}
 
 
/* ================
   Other imports
   ================ */
 
importArticles({
    type: "script",
    articles: [
        "w:dev:Standard_Edit_Summary/code.js"
    ]
});
/*</nowiki></pre>*/