if( typeof wgWikiEditorPreferences != 'undefined' && wgWikiEditorPreferences.toolbar ) {
 if (wgServer == "https://secure.wikimedia.org") {
   importScriptURI("https://secure.wikimedia.org/wikipedia/en/w/index.php?title=User:Mr.Z-man/refToolbar_2.0/base.js&action=raw&ctype=text/javascript");
 } else {
   importScriptURI('http://en.wikipedia.org/w/index.php?title=User:Mr.Z-man/refToolbar_2.0/base.js&action=raw&ctype=text/javascript');
 }
 if( wgWikiEditorPreferences.toolbar.enable && wgWikiEditorPreferences.toolbar.dialogs /*&& navigator.userAgent.indexOf('MSIE') == -1*/ ) {
  importScriptURI('http://en.wikipedia.org/w/index.php?title=User:Mr.Z-man/refToolbar_2.0.js&action=raw&ctype=text/javascript');
 } else if( wgWikiEditorPreferences.toolbar.enable ) {
  importScriptURI('http://en.wikipedia.org/w/index.php?title=User:Mr.Z-man/refToolbarIE.js&action=raw&ctype=text/javascript');
 }
} else if (wgAction == 'edit' || wgAction == 'submit') {
  importScriptURI('http://en.wikipedia.org/w/index.php?title=User:Apoc2400/refToolbarPlus.js&action=raw&ctype=text/javascript');
}