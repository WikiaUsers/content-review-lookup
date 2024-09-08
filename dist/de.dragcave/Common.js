/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

/* Tooltip */

 span.info
 {
 position:relative;
 z-index:1;
 background-color:#ffffff;
 color:#2D006B;
 text-decoration:none;
 }
 span.info:hover
 {
 color:#2D006B; 
 cursor:help;
 border-bottom:1px dotted blue;
 }
 span.info span
 {
 display: none;
 }
 span.info:hover span
 {
 display:block;
 position:absolute;
 top:2em;
 left:2em;
 width:15em;
 border:1px solid #12127D;
 background-color:#fc0;
 color:#000;
 text-align: center;
 padding: 5px;
 font-size: 0.8em;
 }