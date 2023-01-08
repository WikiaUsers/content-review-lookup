// 13:19, January 4, 2016 (UTC)
// From http://enwp.org/MediaWiki:Sandbox.js as at 09:46, January 3, 2016 (UTC)

// <source lang="JavaScript">

// This is a sandbox to experiment with JavaScript.
// Load it by appending &withJS=MediaWiki:Sandbox.js to the URL
mw.loader.using([
 'mediawiki.util',
 'mediawiki.user'
]).done(function () {

// This is to check that the code is loaded
mw.util.addCSS( "#p-logo {background: pink;}");

function addFooter( name ) {
   var footer = document.getElementById('footer');
   var box = document.createElement("div");
   box.id = "footer-custom";
   $.ajax({
     url: mw.util.wikiScript('api'),
     data: {
       format: 'json',
       action: 'parse',
       prop: 'text',
       page: name
    }
  }).done(function (data) {
     box.appendChild( document.createTextNode( data.parse && data.parse.text['*'] ) );
     footer.insertBefore( box, footer.firstChild );
  });
}
 
if (wgNamespaceNumber == 0) {
  $(function(){
    var cats = mw.config.get( 'wgCategories' );
    if (!cats)
      return;
    for (var i = 0; i < cats.length; i++) {
      if (cats[i] == 'Living people' || cats[i].title == 'Possibly living people') {
        addFooter('Template:BLP');
        break;
      }
    }
  });
}

});

// </source>