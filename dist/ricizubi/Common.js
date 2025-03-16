.WikiaFooter .toolbar .tools > li {
	padding:0;
}
.WikiaFooter .toolbar .tools > li a {
	padding:0 10px;
}
.WikiaFooter .toolbar .tools > li a:hover {
	color:#000;
	text-shadow: #999 1px 1px 1px;
	text-decoration:none;
	-moz-box-shadow: 0 0 10px 3px #EB0;
	-webkit-box-shadow: 0 0 10px 3px #EB0;
	box-shadow: 0 0 10px 3px #EB0;
	background-color:#EB0;
	background-image:-moz-linear-gradient(top, #EB0 25%, #B80 75%);
	background-image:-webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(25%, #EB0), color-stop(75%, #B80));
}
 
Place .comments li[data-user="Stone Roger"] blockquote {
   background: White !important;
}
.comments li[data-user="Stone Roger"] blockquote:after {
   border-color: transparent White transparent !important;
}
.comments li[data-user="Stone Roger"] blockquote div {
   background: transparent !important;
}
 
small { font-size: 88%; }
 
/* Highlight user names on Wikiactivity and the like */
@import "/index.php?title=MediaWiki:Wikia.css/hilite&action=raw&ctype=text/css";
 
/* Colour code of Recent changes page byte difference indications */
.mw-plusminus-pos { color: #00FF33; }
.mw-plusminus-neg { color: #FF3300; }
 
}
/* 
 
See also: [[MediaWiki:Monobook.css]]
 
Tools: [http://www.wikia.com/index.php?title=MediaWiki:Common.css&usemsgcache=yes&action=raw&ctype=text/css&smaxage=18000 reload cache]
[http://jigsaw.w3.org/css-validator/validator?uri=http%3A%2F%2Fwww.wikia.com%2Findex.php%3Ftitle%3DMediaWiki%3ACommon.css%26action%3Draw%26ctype%3Dtext%2Fcss%26smaxage%3D18000&usermedium=all check w3c validation]
 
h2 {margin-top: 20px;}
 
.toc {margin-top: 20px;}
 
<pre><nowiki>*/
 
/* Hide the little logo and make the background of the main logo transparent */
.logoContainer { background-color: transparent!important; }
.wikiaLogo {display:none!important}
 
/* Help headers */
 
 
    .basic {
        background-image: url('http://images.wikia.com/communitytest/images/3/3b/Greenheader.png'); 
        color:#006600; 
     }
 
    .moderate {
        background-image: url('http://images.wikia.com/communitytest/images/7/7f/Blueheader.png');
        color:#333399; 
     }
 
    .expert {
        background-image: url('http://images.wikia.com/communitytest/images/e/ed/Purpleheader.png');
        color:#663399; 
     }
 
    .helpheader {
	padding-left: 5px;
	margin-top: .5em;
	margin-bottom: .17em;
        width: 100%;
        background-repeat: repeat-y;
        clear: right;
        display: table;
     }
    .helpheader h2 {
        margin: 0px !important;
        display: inline;
        float: left;
        font-size: 140%;
        font-weight: bold;
        line-height: 150%;
        margin: 15px 0px 3px 0px;
        padding:0.4em;
        text-align:left;
        vertical-align:middle;
        border-style: none;
     }
    .helpheader h2 ~ h2 {
        display: inline;
        float: left;
     }
    .silver_taskstar h2 {
        background: url('http://images.wikia.com/central/images/a/aa/Silver_taskstar.png') left center no-repeat;
        padding-left: 25px;
        padding-right: 15px;
     }
    .silver_taskstar h2 ~ h2 {
        background: transparent !important;
        padding-left: 0px;
     }
    .helpheader h2 ~ h2:before {
        content: '/';
        margin-right: 10px;
     }
    .helpheader .editsection {
        background: white;
        margin-top: -25px;
        position: absolute;
        right: 5px;
     }
 
     .glass {
        background-image: url(http://images.wikia.com/central/images/a/a9/Glass_bar.png);
        background-repeat: repeat-x
     }
 
/*~ Cell sizes for ambox/tmbox/imbox/cmbox/ombox/fmbox/dmbox message boxes ~*/
th.mbox-text, td.mbox-text {	     /* The message body cell(s) */
	border: none; 
	padding: 0.25em 0.9em;       /* 0.9em left/right */
	width: 100%;		     /* Make all mboxes the same width regardless of text length */
}
td.mbox-image {			     /* The left image cell */
	border: none; 
	padding: 2px 0 2px 0.9em;    /* 0.9em left, 0px right */
	text-align: center; 
}
td.mbox-imageright {		     /* The right image cell */
	border: none;
	padding: 2px 0.9em 2px 0;    /* 0px left, 0.9em right */
	text-align: center; 
}
 
/*~ Talk page message box styles ~*/
table.tmbox {
	margin: 4px 10%;
	border-collapse: collapse;
	border: 1px solid #c0c090;	/* Default "notice" gray-brown */
	background: #f8eaba;
}
.mediawiki .mbox-inside .tmbox {	/* For tmboxes inside other templates. The "mediawiki" */
	margin: 2px 0;			/* class ensures that this declaration overrides other */
	width: 100%;	     /* For Safari and Opera */ /* styles (including mbox-small above) */
}
.mbox-inside .tmbox.mbox-small {	/* "small" tmboxes should not be small when  */
	line-height: 1.5em;		/* also "nested", so reset styles that are   */   
	font-size: 100%;		/* set in "mbox-small" above.                */
}
table.tmbox-speedy {
	border: 2px solid #b22222;	/* Red */
	background: #fee;		/* Pink */
}
table.tmbox-delete {
	border: 2px solid #b22222;	/* Red */
}
table.tmbox-content {
	border: 2px solid #f28500;	/* Orange */
}
table.tmbox-style {
	border: 2px solid #f4c430;	/* Yellow */
}
table.tmbox-move {
	border: 2px solid #9932cc;	/* Purple */
}
table.tmbox-protection,
table.tmbox-notice {
	border: 1px solid #c0c090;	/* Gray-brown */
}
 
/* These mbox-small classes must be placed after all other 
   ambox/tmbox/ombox etc classes. "body.mediawiki" is so 
   they override "table.ambox + table.ambox" above. */
body.mediawiki table.mbox-small {   /* For the "small=yes" option. */
	clear: right;
	float: right;
	margin: 4px 0 4px 1em;
	width: 238px;
	font-size: 88%;
	line-height: 1.25em;
}
body.mediawiki table.mbox-small-left {   /* For the "small=left" option. */
	margin: 4px 1em 4px 0;
	width: 238px;
	border-collapse: collapse;
	font-size: 88%;
	line-height: 1.25em;
}
 
/* 
=== Babel === 
*/
 
div.babelbox {
   float: right;
   margin-left: 1em;
   margin-bottom: 0.5em;
   width: 246px;
   border: 1px solid #99B3FF;
   padding: 2px 0 2px 0;
}
.lang-blockN, .lang-block0, .lang-block1, .lang-block2, .lang-block3 {
   margin: 2px 4px 2px 4px; /* t, l, b, r */
   width:238px;
   border-collapse: collapse;
}
td.lang-codeN, td.lang-code0, td.lang-code1, td.lang-code2, td.lang-code3 {
   text-align:center;
   font-size:14pt;
   width:45px;
   height:45px;
}
td.lang-descriptionN, td.lang-description0, td.lang-description1,
td.lang-description2, td.lang-description3 {
  font-size:8pt;
  padding:4pt;
  line-height:1.25em
}
 
.lang-block0 {
   border:1px solid #FFB3B3;
}
td.lang-code0 {
  background-color: #FFB3B3;
  color: black;
}
td.lang-description0 {
  background-color: #FFE0E8;
  color: black;
}
 
.lang-block1,  .lang-block2, .lang-block3  {
   border:1px solid #99B3FF;
}
td.lang-code1, td.lang-code2, td.lang-code3 {
  background-color: #99B3FF;
  color: black;
}
td.lang-description1,  td.lang-description2, td.lang-description3 {
  background-color: #E0E8FF;
  color: black;
}
 
.lang-blockN {
   border:1px solid #6EF7A7;
}
td.lang-codeN {
  background-color: #6EF7A7;
  color: black;
}
td.lang-descriptionN {
  background-color: #C5FCDC;
  color: black;
}
 
/* 
=== Forum formatting -Algorithm & -Splaka === 
*/
 
.forumheader { 
   border: 1px solid #aaa; background-color: #f9f9f9; color: #000; margin-top: 1em; padding: 6px; 
}
.forumlist td.forum_edited a { 
   color: black; text-decoration: none 
}
.forumlist td.forum_title a { 
   padding-left: 20px; 
}
.forumlist td.forum_title a.forum_new {  
   font-weight: bold; background: url('http://images3.wikia.nocookie.net/central/images/4/4e/Forum_new.gif?1') center left no-repeat; padding-left: 20px; 
}
.forumlist td.forum_title a.forum_new:visited { 
    font-weight: normal; background: none; padding-left: 20px; 
}
.forumlist th.forum_title { 
padding-left: 20px; 
}
 
/* === underline classes === */
 
.underlinelink a{ text-decoration: underline ! important; }
.nounderlinelink a{ text-decoration: none ! important; }
 
/* font class for 'click here' */
 
.clickhere a, .clickhere a:visited { 
   color: #3366BB !important
}
.clickhere a:hover, .clickhere a:active { 
  color: #268CFE !important
}
 
/* === class for task boxes === */
.task {
  border: 1px solid #585490; 
  background: #f8faff; 
  padding:.5em; }
 
/* === class for main page link tables === */
#bodyContent .buttonlink a { 
  background: transparent url(http://images.wikia.com/central/images/9/96/Bullet_plain.png) center left no-repeat !important; 
  padding-left: 14px !important;
}
#bodyContent .buttonstar a {
  background: transparent url(http://images.wikia.com/central/images/e/ec/Bullet_star.png) center left no-repeat !important; 
  padding-left: 14px !important;
}
#bodyContent .buttonstar3 a {
  background: transparent url(http://images.wikia.com/central/images/e/ef/Bullet_star3.png) center left no-repeat !important; 
  padding-left: 14px !important;
}
 
/* === misc === */
li #credits { white-space: normal; }
.headbare h1, .headbare h2 { border-bottom: none; }
.mw-plusminus-pos { color: #006500; }
.mw-plusminus-neg { color: #8B0000; }
 
/* Mark redirects in Special:Allpages and Special:Watchlist */
 .allpagesredirect { font-style: italic; }
 .watchlistredir { font-style: italic; }
 
/* === for Percent template === */
.percent-fill { 
  height:24px; 
  background: #ffffff url(http://images.wikia.com/central/images/3/31/Gradient24.png) 0 0 repeat;
}
.percent-empty { 
  height: 24px; 
  background: transparent; 
}
 
/* === per page stuff === */
.page-Category_Custom_edit_buttons .gallerybox .thumb { padding:0 !important; }
.page-Wikia_Maintenance_copyvio a[title|="Category:Files with unknown copyright status"] {display:none;}
body.page-Community_Chat #page_controls {display:none;}
body.page-Community_Chat #page_tabs {display:none;} 
body.page-Community_Chat #articleFooterActions {display:none;}
 
/* === Dynamic navigation === */
 
/* default skin for navigation boxes */
table.navbox {
    background-color: #f9f9f9;
    border: 1px solid #aaa;
    clear: both;
    font-size: 90%;
    margin: 1em 0em 0em;
    padding: 2px;
    text-align: center;
    width: 100%;
}
 
table.navbox th {
    background-color: #ccf;
    padding-left: 1em;
    padding-right: 1em;
}
 
table.navbox tr:not(:first-child) th {
    background-color: #ddf;
}
 
@media print {
    .navbox {
        display: none;
    }
}
 
/* Standard Navigationsleisten, aka box hiding thingy from .de.  Documentation at [[Wikipedia:NavFrame]]. */
 
div.Boxmerge,
div.NavFrame {
        margin: 0px;
        padding: 4px;
        border: 1px solid #aaa;
        text-align: center;
        border-collapse: collapse;
        font-size: 95%;
}
div.Boxmerge div.NavFrame {
        border-style: none;
        border-style: hidden;
}
div.NavFrame + div.NavFrame {
        border-top-style: none;
        border-top-style: hidden;
}
div.NavPic {
        background-color: #fff;
        margin: 0px;
        padding: 2px;
        float: left;
}
div.NavFrame div.NavHead {
        height: 1.6em;
        font-weight: bold;
        background-color: #ccccff;
        position:relative;
}
div.NavFrame p {
        font-size: 100%;
}
div.NavFrame div.NavContent {
        font-size: 100%;
}
div.NavFrame div.NavContent p {
        font-size: 100%;
}
div.NavEnd {
        margin: 0px;
        padding: 0px;
        line-height: 1px;
        clear: both;
}
a.NavToggle {
        position:absolute;
        top:0px;
        right:3px;
        font-weight:normal;
        font-size:smaller;
}
 
.NavToggle {
	float:right;
	position:absolute;
	top:0px;
	right:3px;
}
.NavHead {position:relative;}
 
/* == For experimental Adoption 2.0 template == */
.adoption20 {
        position: absolute;
        top: 5px;
        right: 12px;
        height: 22px;
        padding: 2px 5px;
        border: 1px solid #F00;
        background-color: #FFFFDB;
}
.adoption20 .translate {
        position: absolute;
        right: 5px;
        font-size: 90%;
        border: 1px solid #BBBB66;
        background-color: #FFFFD7;
        float:left;
        padding: 1px .5em;
}
 
/* More Hubs styling -Dantman */
.morehubs {
	background: #FFFFFF;
	position: absolute;
	margin: 0px;
	padding: 0px;
	text-align: left;
	vertical-align: middle;
}
.morehubs map,
.morehubs div,
.morehubs p {
	text-align: left;
	vertical-align: middle;
	margin: 0px;
	padding: 0px;
}
.morehubs p {
	position: relative;
	left: -15px;
	top: 3px;
}
 
/* Remove titles from hubs -Dantman */
.ns-150 .firstHeading,
.page-Big_wikis .firstHeading,
.page-Not_a_valid_Wikia .firstHeading,
.page-Wikia_Not_a_valid_Wikia .firstHeading
 { display: none; }
 
/* remove talk link from forum namespace (monobooks/newskins/quartzskins/monaco) -Splarka */
body.ns-110 #ca-talk, body.ns-110 #this_talk, body.ns-110 #page_tabs li+li  { display: none; }
 
/* TabView extension */
.yui-content {
background-color: #EDF5FF;
/*border: solid 1px;*/
padding: 0.25em 0.5em;
}
 
.yui-nav {
border-color:#EDF5FF;
border-style:solid;
border-width:0pt 0pt 5px;
margin: 0px !important;
}
 
 
.yui-skin-sam .yui-navset .yui-nav, .yui-skin-sam .yui-navset .yui-navset-top .yui-nav {
border-color:#EDF5FF;
border-style:solid;
border-width:0pt 0pt 5px;
}
 
.yui-navset .yui-nav .selected {
background-color: #EDF5FF;
}
 
.yui-navset .yui-nav li {
padding-left: 10px;
padding-right: 10px;
}
 
/* wikialist stuff */
 
.wikialist-header {
  border:2px solid #7777aa;
  margin:auto;
  font-size:130%;
  background-color: #ddddee;
}
.wikialist-header td {
  padding:.25em;
  white-space: nowrap;
}
.wikialist-header td.wlh-button a {
  text-decoration:none;
  display:block;
  border:2px outset #ddddee;
  padding:.25em;
  font-weight:bold;
  color: black;
  text-align:center;
}
.wikialist-header td.wlh-button a:hover { 
  background-color: #ccccff; 
}
.wikialist-header td.wlh-button strong {
  text-decoration:none;
  display:block;
  border:2px inset #ddddee;
  padding:.25em;
  text-align:center;
}
.wikialist-header th { font-size:115% }
 
/* </pre>
=== class for Hubs === 
<pre> */
#bodyContent .nostar a { 
  background: transparent url(http://images.wikia.com/central/images/9/96/Bullet_plain.png) center left no-repeat !important; 
  padding-left: 14px !important;
}
#bodyContent .yellowstar a { 
  background: transparent url(http://images4.wikia.nocookie.net/central/images/thumb/e/e6/Hubstar-yellow.png/12px-Hubstar-yellow.png) center left no-repeat !important; 
  padding-left: 14px !important;
}
#bodyContent .orangestar a { 
  background: transparent url(http://images1.wikia.nocookie.net/central/images/thumb/7/73/Hubstar-orange.png/12px-Hubstar-orange.png) center left no-repeat !important; 
  padding-left: 14px !important;
}
#bodyContent .redstar a { 
  background: transparent url(http://images3.wikia.nocookie.net/central/images/thumb/e/ea/Hubstar-red.png/12px-Hubstar-red.png) center left no-repeat !important; 
  padding-left: 14px !important;
}
 
.hubmodule {
   border:1px solid silver;
   width: auto;
   margin-bottom: 10px;
   padding:3px;
}
 
table.hubmodule th, div.hubmodule h2 {
    background-color: lightyellow;
    color: black;
    text-align:center;
    font-size: 150%;
    font-weight:normal;
    margin-bottom:0.6em;
    padding-bottom:0.17em;
    padding-top:0.3em;
    border:none;
}
 
.hubmodule .poll {
    width: auto;
}
 
#bodyContent .poll {
    background-color: inherit;
}
 
/*</pre>
=== Infobox classes copied from en.wikipedia ===
<pre> */
/* Infobox template style */
.infobox {
    border: 1px solid #aaa;
    background-color: #f9f9f9;
    color: black;
    margin: 0.5em 0 0.5em 1em;
    padding: 0.2em;
    float: right;
    clear: right;
}
.infobox td,
.infobox th {
    vertical-align: top;
}
.infobox caption {
    font-size: larger;
    margin-left: inherit;
}
.infobox.bordered {
    border-collapse: collapse;
}
.infobox.bordered td,
.infobox.bordered th {
    border: 1px solid #aaa;
}
.infobox.bordered .borderless td,
.infobox.bordered .borderless th {
    border: 0;
}
 
/* styles for bordered infobox with merged rows */
.infobox.bordered .mergedtoprow td,
.infobox.bordered .mergedtoprow th {
    border: 0;
    border-top: 1px solid #aaa;
    border-right: 1px solid #aaa;
}
 
.infobox.bordered .mergedrow td,
.infobox.bordered .mergedrow th {
    border: 0;
    border-right: 1px solid #aaa;
}
 
/* Put a checker background at the image description page only visible if the image has transparent background */
#file img {
    background: url("http://images.wikia.com/central/images/5/5d/Checker-16x16.png") repeat;
}
 
/* Commonly used Wikipedia .wikitable and .prettytable */
table.wikitable,
table.prettytable {
    margin: 1em 1em 1em 0;
    background: #f9f9f9;
    border: 1px #aaa solid;
    border-collapse: collapse;
}
.wikitable th, .wikitable td,
.prettytable th, .prettytable td {
    border: 1px #aaa solid;
    padding: 0.2em;
}
.wikitable th,
.prettytable th {
    background: #f2f2f2;
    text-align: center;
}
.wikitable caption,
.prettytable caption {
    margin-left: inherit;
    margin-right: inherit;
    font-weight: bold;
}
 
.wikiaSkinMonaco #dynamic-links-write-article-row
 { display: none; }
 
/* dont need to show this on this page, just confuses people as its the same as the page title */
.page-Special_CreateWiki #request_wiki { display: none; }
 
.collapseLink { cursor: pointer; }
 
/* Homepage */
.homepage-feature-box {
   border:1px solid #CCCCCC;
   margin:0 1px 10px;
   outline:1px solid #FFFFFF;
   padding:8px;
}
 
.page-Community_Central_Adoption_requests .mw-warning-with-logexcerpt {display: none !important; }
.page-Community_Central_Not_a_valid_Wikia .firstHeading { display: none; }
 
/* fzy dev */
.wikia-button.red {
    background-color: #F00;
    background-image: -moz-linear-gradient(top, #F00 20%, #a00 70%);
    background-image: -webkit-gradient(linear, 0% 20%, 0% 70%, from(#C00), to(#A00));
    border-color: #E20000;
    box-shadow: 0 1px 0 #900, 0 -1px 0 #900, 1px 0 0 #900, -1px 0 0 #900;
    color: #30;
    -moz-box-shadow: 0 0 0 1px #900;
    -webkit-box-shadow: 0 1px 0 #900, 0 -1px 0 #900, 1px 0 0 #900, -1px 0 0 #900
 
 
 
 
var archiveListTemplate = 'ArchiveList';
var archivePageTemplate = 'ArchivePage';
importScriptPage('ArchiveTool/code.js', 'dev');
 
$(function() {
  if ( skin === "monaco" ) {
    var $siteNotice = $('#siteNotice');
    $siteNotice.find('script').remove();
    $siteNotice.insertBefore('#article');
    $siteNotice.find('table table').appendTo($siteNotice);
    $siteNotice.find('#mw-dismissable-notice').remove();
  } else if ( skin === "oasis" || skin === "wikia" ) {
    // START Notification Bubble Integration
/*jQuery(function($) {
 
	function hasNotificationBubble() {
		return !!$("#WikiaNotifications li").length;
	}
 
	function ensureWikiaNotificationsArea() {
		if ( $('#WikiaNotifications').length )
			return;
		$('<ul id="WikiaNotifications" class="WikiaNotifications" />').prependTo('#WikiaFooter .toolbar');
	}
 
	function addNotificationBubble(msg, onclose) {
		var $li = $('<li />');
		var $div = $('<div data-type=2 />').html(msg).appendTo($li);
		$('<a class="sprite close-notification" />')
			.click(function() {
				$(this).closest('li').remove();
				if ( onclose )
					onclose.apply(this, arguments);
			})
			.prependTo($div);
		ensureWikiaNotificationsArea();
		$li.appendTo("#WikiaNotifications");
	}
 
	function doReaderNotice(msg, id) {
		if ( hasNotificationBubble() )
			// Only display a reader bubble when nothing else is using the area
			return;
 
		var cookieName = "readernotice_bubble_dismiss";
 
		if ( $.cookies.get(cookieName) === id.toString() )
			return;
 
		addNotificationBubble(msg, function() {
			$.cookies.set(cookieName, id.toString(), { hoursToLive: 30*24 });
		});
	}
 
	if ( $.cookies.get("readernotice_bubble_dismiss") === "1" ) {
		doReaderNotice('Sorry if you already answered our survey, but we had issues with the last one. If you still have time please <a href="http://www.surveymonkey.com/s/narutopedia-look-survey">fill out our new survey</a>.', 2);
	} else {
		doReaderNotice('We\'d like to know what you think of Wikia\'s new look, if you have time please <a href="http://www.surveymonkey.com/s/narutopedia-look-survey">fill out this survey</a>.', 2);
	}
});*/
    // END Notification Bubble Integration
  } else {
    $('#mw-dismissable-notice > tbody > tr > td:last').remove();
  }
  if( ( wgAction === "edit" && wgNamespaceNumber > -1 && wgNamespaceNumber % 2 === 0 ) || wgPageName === "Special:CreatePage" )
    $("<div class=warningmessage>Do <strong>not</strong> add new manga information to the wiki until the entire chapter is available.</div>")
      .prependTo(skin === "oasis" || skin === "wikia" ? '#WikiaArticle' : '#bodyContent');
  if( wgAction === "edit" && wgNamespaceNumber === 8 && wgTitle === "Monaco-sidebar" ) {
    $("#bodyContent #wikiPreview ul li").each(function() {
      var n = this;
      var texts = this.firstChild.nodeValue.replace(/^\s+/, "").replace(/\s+$/, "").split("|");
      n.removeChild(n.firstChild);
      var before = n.firstChild; texts.forEach(function(text, i) {
        if ( i )
          n.insertBefore(document.createTextNode("|"), before);
        if ( /[#:]/.test(text) )
          n.insertBefore(document.createTextNode(text), before);
        else
          n.insertBefore($("<a/>").attr({href: wgArticlePath.replace("$1", "MediaWiki:"+text.replace(/^\s+/, ""))}).text(text)[0], before);
      });
    });
  }
});
 
/*</pre>*/
 
/* BEGIN Dynamic Navigation Bars (experimantal) */
/* This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history */
 
/* Test if an element has a certain class */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
/* Collapsible tables */
/* Description: Allows tables to be collapsed, showing only the header. See [[Wikipedia:NavFrame]]. */
/* Maintainers: [[User:R. Koot]] */
 
 var autoCollapse = 2;
 var collapseCaption = "-";
 var expandCaption = "+";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );
 
/* Dynamic Navigation Bars (experimental) */
 
/* set up the words in your language */
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
/* set up max count of Navigation Bars on page */
/* if there are more, all will be hidden */
/* NavigationBarShowDefault = 0; // all bars will be hidden */
/* NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden */
  var NavigationBarShowDefault = autoCollapse;
 
/* shows and hides content and picture (if available) of navigation bars */
/* Parameters: indexNavigationBar: the index of navigation bar to be toggled */
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     /* if shown now */
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     /* if hidden now */
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
/* adds show/hide-button to navigation bars */
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     /* iterate over all < div >-elements */ 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         /* if found a navigation bar */
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     /* if more Navigation Bars found than Default: hide all */
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
 
  } 
  addOnloadHook( createNavigationBarToggleButton );
importScriptPage('ShowHide/code.js', 'dev');