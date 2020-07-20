//<source lang="JavaScript">

/** Extra toolbar options ******************************************************
 *  
 *  Description: Adds extra buttons to the editing toolbar.
 *  
 *  To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]].
 *  
 *  Maintainers (Wikipedia): [[User:MarkS]], [[User:Voice of All]], [[User:R. Koot]]
 */
 
if (mwCustomEditButtons) {
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Target page name"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
        "speedTip": "Strike",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Strike-through text"
    });
 
    mwCustomEditButtons.push({
         "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
        "speedTip": "Line break",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
        "speedTip": "Superscript",
        "tagOpen": "<sup>",
        "tagClose": "</sup>",
        "sampleText": "Superscript text"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
        "speedTip": "Subscript",
        "tagOpen": "<sub>",
        "tagClose": "</sub>",
        "sampleText": "Subscript text"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
        "speedTip": "Small",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Small Text"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
        "speedTip": "Insert hidden Comment",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Comment"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
        "speedTip": "Insert a picture gallery",
        "tagOpen": "\n<gallery>\n",
        "tagClose": "\n</gallery>",
        "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
        "speedTip": "Insert block of quoted text",
        "tagOpen": "<blockquote>\n",
        "tagClose": "\n</blockquote>",
        "sampleText": "Block quote"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
        "speedTip": "Insert a table",
        "tagOpen": '{|{{hitman table}}\n|',
        "tagClose": "\n|}",
        "sampleText": "-\n! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
        "speedTip": "Insert a reference",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Insert footnote text here"
    });
}
 
 
//fix edit summary prompt for undo
//this code fixes the fact that the undo function combined with the "no edit summary prompter" causes problems if leaving the
//edit summary unchanged
//this was added by [[User:Deskana]], code by [[User:Tra]]
//see bug 8912
addOnloadHook(function () {
    if (document.location.search.indexOf("undo=") != -1
        && document.getElementsByName('wpAutoSummary')[0]) {
        document.getElementsByName('wpAutoSummary')[0].value='1';
    }
})
 
/** Edittools javascript loader ************************************************
 *
 *  Description: Pulls in [[MediaWiki:Edittools.js]]. Includes a cache-bypassing
 *  version number in the URL in order to allow any changes to the edittools to
 *  be rapidly deployed to users.
 *
 *  Note that, by default, this function does nothing unless the element with
 *  the ID "editpage-specialchars" (which contains the old edittools code in
 *  [[MediaWiki:Edittools]], and will be retained as a placeholder in the new
 *  implementation) has a class named "edittools-version-NNN", where NNN is a
 *  number.  If the class name has "test" before the number, the code will only
 *  run for users who have set "window.testJsEdittools = true" in their user JS.
 *  The "test" should be retained in the class name until the new edittools
 *  implementation is ready and fully tested, and until at least 30 days have
 *  passed since this loader stub was added (which will be in 27 June 2008).
 *
 *  For compatibility with Alex Smotrov's original implementation, on which this
 *  code is loosely based (see [[mw:User talk:Alex Smotrov/edittools.js]]), this
 *  loader can also be disabled by setting "window.noDefaultEdittools = true".
 *
 *  Maintainers (Wikipedia): [[User:Ilmari Karonen]]
 */
 
addOnloadHook(function () {
    // needs to be deferred until the DOM has fully loaded
    var placeholder = document.getElementById("editpage-specialchars");
    if (!placeholder || window.noDefaultEdittools) return;
    var match = /(?:^| )edittools-version-(\d+)(?: |$)/.exec(placeholder.className);
 
    // set window.testJsEdittools = true to enable testing before full deployment
    if (!match && window.testJsEdittools)
        match = /(?:^| )edittools-version-(test\d+)(?: |$)/.exec(placeholder.className);
 
    if (!match) return;
    var url = wgScript + '?title=MediaWiki:Edittools.js&action=raw&ctype=text/javascript&nocache=' + match[1];
    importScriptURI(url);
});
 
//</source>


/*
** Add source URL to summary when uploading from URL
**   by [[User:Derple]]
*/

addOnloadHook(get_URL);
function get_URL() {
    var URL_form=document.getElementById('wpUploadFileURL');
    addHandler(URL_form, 'change', insert_URL);
}

function insert_URL(event) {
  var URL = document.getElementById('wpUploadFileURL').value;
  var summary = document.getElementById('wpUploadDescription');
  var re = /\[http[^]*Source URL\]/;
  if(summary.value.match(re)) {
    summary.value = summary.value.replace(re, '[' + URL + ' Source URL]');
  } else {
    summary.value = summary.value + '\n\n[' + URL + ' Source URL]';
  }
}