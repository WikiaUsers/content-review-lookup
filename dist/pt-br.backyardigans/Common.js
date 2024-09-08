/** o código CSS colocado aqui será aplicado a todos os temas */




***** CSS placed here will be applied to all skins on the entire site. *****/

/* See also: [[MediaWiki:Monobook.css]] */

/* Brought in from Monaco to get back some stylings */




/*** MAIN COLORS ***/

body {

 color:#000000 !important;

}

a, table.gallery td a, div.thumbinner a, #bodyContent a.extiw {

 color: #fd5b08;

}

a:visited, table.gallery td a:visited {

 color: #fd5b08;

}

a.new {

 font-weight: 575;

 color: #cc3333 !important;

}

a.link {

 font-weight: 550;

 color: #ff6633;

}

.color1, .yui-panel .hd {




 color: #cc0000;

}




h1, h2, h3, h4, h5, h6 {

 color: #000;

}

.tabs li a {

 background-image:url("https://images.wikia.nocookie.net/phineasandferb/images/6/68/Phineasandferb_page_bar.png");

}




/*** NEW FEATURE CUSTOMIZATION ***/

.WikiaPage, {

 border: 1px solid #CC0000 !important;

 color: #000 !important;

}

.WikiaMainContent {

 color: #000 !important;

}

.WikiaSearch {

 border: 1px solid #CC0000;

 padding:2px;

}

.WikiaSearch input[type="text"] {

 width:280px;

}

.skin-oasis #edit_enhancements_toolbar, editform > #edit_enhancements_toolbar fixed {




 margin:10px !important;

}

.accent {




}

.WikiaArticleComments textarea {

 border: 1px solid orange;

}

.comments .article-comments-li.even blockquote {

 background:none repeat scroll 0 0 #FFFCCC !important;

}




.comments .article-comments-li.even blockquote:after {

 border-color:transparent !important;

}

div.ajax-poll {




}




/* Main Page Bloglist font change */

body.mainpage .WikiaBlogListing h1 {

 font-size:16px;

 font-weight:bold;

 margin-right:30px;

}




/* Header & Footer Menus */

.AccountNavigation .subnav

.AccountNavigation .subnav li, .AccountNavigation .subnav li a {




 background-image:none;

}

.AccountNavigation .subnav li:hover, .AccountNavigation .subnav li a:hover {

 background:none repeat scroll 0 0 #FFF999 !important; 

}

.AccountNavigation .subnav a:hover {

 background:none repeat scroll 0 0 transparent !important; 

}

.WikiaFooter .my-tools-menu li, .WikiaFooter .my-tools-menu li a {




 background-image:none;

}

.WikiaFooter .my-tools-menu li:hover, .WikiaFooter .my-tools-menu li a:hover {

 background:none repeat scroll 0 0 #FFF999 !important; 

}

.WikiaFooter .my-tools-menu a:hover {

 background:none repeat scroll 0 0 transparent !important; 

}

.WikiaFooter section > ul {

 background-image:none !important;

 border-bottom:none !important;

 border-left:none !important;

 border-right:none !important;

}




/* Nav Menus */

.WikiHeader nav {

 left: 275px;

}

.WikiHeader li {

 padding: 5px 0 0 5px;

}




.WikiHeader li a {

 -moz-border-radius: 5px;

 -webkit-border-radius: 5px;

 background: url("https://images.wikia.nocookie.net/phineasandferb/images/6/68/Phineasandferb_page_bar.png") repeat-x scroll 0 50% transparent !important;

 color: #000000;

 padding: 5px 10px 5px 5px;

 border:none;

}

.WikiHeader li a:hover {

 text-decoration:underline;

}

.WikiHeader .subnav {

 border:1px solid #CC0000;

}

.WikiHeader .subnav li, .WikiHeader .subnav li a {




 background-image:none !important;

}

.WikiHeader .subnav li:hover, .WikiHeader .subnav li a:hover {

 background:none repeat scroll 0 0 #FFF999 !important; 

}

.WikiHeader .subnav a:hover {

 background:none repeat scroll 0 0 transparent !important; 

}




/* Buttons */

a.wikia-button, .wikia-single-button a, .wikia-menu-button, input[type="submit"], input[type="reset"], input[type="button"], .button, button{

 background-image:url("https://images.wikia.nocookie.net/phineasandferb/images/6/68/Phineasandferb_page_bar.png");

 color:black;

}

a.wikia-button:active, .wikia-single-button a:active, .wikia-menu-button:active, input[type="submit"]:active, input[type="reset"]:active, input[type="button"]:active, .button:active, button:active {

 background-image:url("https://images.wikia.nocookie.net/phineasandferb/images/6/68/Phineasandferb_page_bar.png");

 color:black;

}

a.wikia-button:hover, .wikia-single-button a:hover, .wikia-menu-button:hover, input[type="submit"]:hover, input[type="reset"]:hover, input[type="button"]:active, .button:hover, button:hover{

 background-image:url("https://images.wikia.nocookie.net/phineasandferb/images/6/68/Phineasandferb_page_bar.png");

 color:black;

}




/* Buttons Menus */

.wikia-menu-button ul, .wikia-menu-button ul a {




 background-image:none;

}

.wikia-menu-button ul li:hover, .wikia-menu-button ul li a:hover {

 background:none repeat scroll 0 0 #FFF999 !important; 

}

.wikia-menu-button ul a:hover {

 background:none repeat scroll 0 0 transparent !important; 

}




/* Sidebar Tweaks */

.WikiaPagesOnWikiModule {

 background-image:none !important;

 border:none !important;

}

.WikiaActivityModule, .FollowedPagesModule {

 background:url("https://images.wikia.nocookie.net/phineasandferb/images/6/68/Phineasandferb_page_bar.png") repeat-x scroll 0 0 #FFFCCC !important;

 border:1px solid #CC0000 !important;

}

.WikiaActivityModule h1, .FollowedPagesModule h1 {

 margin-top:-5px !important;

}

.WikiaBlogListingBox {




 background-image:none !important;

 border:1px solid #CC0000 !important;

}

#WikiaSpotlightsModule header h1 {

 color: #FFFFFF !important;

}




/* Content Area Tweaks */

.WikiaArticle {

 line-height: 1.5em;

}

.WikiaArticle h2 {

 border-bottom:1px solid #AAAAAA;

 margin-bottom:0.6em;

 margin-top:20px;

}

.WikiaArticle h3 {

 font-weight:bold;

}

.WikiaPageHeader details {

 background-image:none !important;

}

.WikiaArticle .toc {

 border-color: #AAAAAA !important;




 background-image:none;

}

.WikiaArticle .thumbinner  {




 background-image: none !important;

}

.WikiaArticleCategories, .wikitable {

 background-image: none !important;

}

.wikitable, table.wikitable {

 background: none !important;

 border: none;

}

table.wikitable th, table.wikitable td {

 border: none;

}

.WikiaArticle .editsection {

  float: right !important;

  margin-right: 10px !important;

}




/* Tabber color settings & Header hacks */

.tabberlive .tabbertab {

 border: none !important;

 padding: 15px 0 0 !important;

}

ul.tabbernav {

 border-bottom: 1px solid #CC0000 !important;

 font: 10.5px Verdana,sans-serif !important;

}

ul.tabbernav li.tabberactive a {




 border-bottom: 1px solid #FFFFF0 !important;

 color: #CC0000 !important;

 font-weight: bold;

}

ul.tabbernav li a:link {

 color: #000000 !important;

}

ul.tabbernav li a {

 -moz-border-radius: 10px 10px 0 0;

 background: url("https://images.wikia.nocookie.net/phineasandferb/images/6/68/Phineasandferb_page_bar.png") repeat-x scroll 0 50% transparent !important;

 border-color: #CC0000 !important;

}

ul.tabbernav li a:hover{

 background: none repeat scroll 0 0 #FD5B08 !important;

 border-color: #CC0000 !important;

 color: #FFFFFF !important;

}

ul.tabbernav li.tabberactive a {

 background: none repeat scroll 0 0 #FFFFF0 !important;

 border-bottom: 1px solid #FFFFF0 !important;

 color: #FD5B08 !important;

}

.tabberlive .tabbertab h2, .tabberlive .tabbertab h3 { 

 display:block !important; 

}




/* TabView extension */




/*set the base backcolor of the 'off' tabs */

.yui-nav li {

 -moz-border-radius: 5px;

 -webkit-border-radius: 5px;

 background: url("https://images.wikia.nocookie.net/phineasandferb/images/6/68/Phineasandferb_page_bar.png") repeat-x scroll 0 50% transparent !important;

 padding: 5px 7px !important;

 border: none;

}




.yui-navset .yui-nav li {

 margin: 2.5px !important;

}

.yui-nav li a {

 color: #000000 !important;

 font: 11px Verdana,sans-serif !important;

}




/** style the 'on' tab **/

.yui-nav li.tabPinned {

 border-top: 3px solid #FD5B08;

 border-left: 4px solid #FD5B08;

}

.yui-nav li.tabPinned a {

 font-weight: bold !important;

}




.wikiaPhotoGallery-slider-body .horizontal .description h2 {

 color: #FFFFFF;

}




/*** STANDARD WIKIA SETTINGS ***/

/* Mark redirects in Special:Allpages and Special:Watchlist */

.allpagesredirect { font-style: italic; }

.watchlistredir { font-style: italic; }




/* Infobox template style -- Changed colors to old-style infobox */

.infobox, .WikiaArticle .infobox {

 border: 1px solid #aaaaaa;




 color: #000000;

 margin-bottom: 0.5em;

 margin-left: 1em;

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

 border: 1px solid #aaaaaa;

 padding-left:5px;

}

.infobox.bordered .borderless td,

.infobox.bordered .borderless th {

 border: 0;

}




/* Remove Main Page Header */

body.page-Phineas_and_Ferb_Wiki #siteSub, body.page-Main_Page #contentSub, body.page-Phineas_and_Ferb_Wiki h1.firstHeading {

  display: none !important;

}




/* Giving headers and TOC a little extra space */

h2 {margin-top: 20px;}




.toc {margin-top: 20px;}




/* Forum formatting (by -Algorithm & -Splaka) */

.forumheader {

   border: 1px solid #aaa;

    margin-top: 1em; padding: 12px;

}

.forumlist td.forum_edited a {

   color: black; text-decoration: none

}

.forumlist td.forum_title a {

   padding-left: 20px;

}

.forumlist td.forum_title a.forum_new {

   font-weight: bold; background: url(/images/4/4e/Forum_new.gif)

   center left no-repeat; padding-left: 20px;

}

.forumlist td.forum_title a.forum_new:visited {

   font-weight: normal; background: none; padding-left: 20px;

}

.forumlist th.forum_title {

   padding-left: 20px;

}




/* Recent changes byte indicators */

.mw-plusminus-pos { color: #006500; }

.mw-plusminus-neg { color: #8B0000; }




/* === Babel === */




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




color: black;

}

td.lang-description0 {




color: black;

}




.lang-block1,  .lang-block2, .lang-block3  {

 border:1px solid #99B3FF;

}

td.lang-code1, td.lang-code2, td.lang-code3 {




color: black;

}

td.lang-description1,  td.lang-description2, td.lang-description3 {




color: black;

}




.lang-blockN {

 border:1px solid #6EF7A7;

}

td.lang-codeN {




color: black;

}

td.lang-descriptionN {




color: black;

}

/* Admins */
 
/** OsBackyardigans **/
 
.edited-by a[href="/wiki/Usu%C3%A1rio:OsBackyardigans"],
.subtle a[href="/wiki/Usu%C3%A1rio:OsBackyardigans"],
.forum_editor a[href="/wiki/Usu%C3%A1rio:OsBackyardigans"],
.history-user a[href="/wiki/Usu%C3%A1rio:OsBackyardigans"], 
.mw-userlink a[href="/wiki/Usu%C3%A1rio:OsBackyardigans"] {font-weight:bold;font-family: "Leelawadee", sans-serif;color:#0000CD !important}
 
/** BackyardigansFan **/
.edited-by a[href="/wiki/Usu%C3%A1rio:BackyardigansFan"],
.subtle a[href="/wiki/Usu%C3%A1rio:BackyardigansFan"],
.forum_editor a[href="/wiki/Usu%C3%A1rio:BackyardigansFan"],
.history-user a[href="/wiki/Usu%C3%A1rio:BackyardigansFan"], 
.mw-userlink a[href="/wiki/Usu%C3%A1rio:BackyardigansFan"] {font-weight:bold;font-family: "cursive", sans-serif;color:#32CD32 !important}