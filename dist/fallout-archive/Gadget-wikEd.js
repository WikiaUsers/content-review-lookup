/* <nowiki> */

/**
 * wikEd advanced text editor
 * Source: http://en.wikipedia.org/User:Cacycle/wikEd.js
 */

if ($.client.profile().name != 'msie') {
   /* Load wikEd from Wikipedia */
   mw.loader.load('http://en.wikipedia.org/w/index.php?title=User:Cacycle/wikEd.js&action=raw&ctype=text/javascript');

   /* Position wikEd button */
   mw.util.addCSS('div#p-personal ul li:first-child { right: 18px !important; }');
   mw.util.addCSS('div#p-personal:hover ul li:first-child a { min-width: 70px !important; }');
   mw.util.addCSS('div#p-personal ul li#wikEdLogoList { background-color: transparent; display: block !important; position: absolute; right: 0; top: 2px; }');
   mw.util.addCSS('div#p-personal ul li#wikEdLogoList #wikEdLogoImg { margin: 0; }');
}

/* </nowiki> */