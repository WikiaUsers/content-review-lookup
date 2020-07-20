/**************************************************************************************

* The 'MediaWiki:Wikia.css' is loaded via link as a part of 'site.css', at the very *top*
of the page in the html 'header', just before 'user.css', but after oasis, wikihiero, etc.

* The 'MediaWiki:Common.css' is NOT loaded on Wikia sites, and if like Wikipedia would
have been loaded as a part of a load.php with oasis, or shortly after, and at the *top*
and in the actual html 'header', without any JS having run yet.

* Both files would be checked and minified the same.

* This wiki is pretty set as far as using just one theme, simi-permanently. The 'Common'
is supposed to be theme agnostic, and 'Wikia' is supposed to be theme sensitive and
guaranteed to be last by being at the bottom, to affect state after common and theme
have been applied during client page load. There are significant performance
considerations in just how and where things are place, and WoWWiki is way behind the
curve for the moment, so please be aware :) more later...

* Do NOT use this file expecting to see changes on the Wikia site. The code that would
normally placed here, place in 'MediaWiki:Wikia.css' AND here. However, because there is
no way to prove that simple mirror of changes would produce a correct Common.css, if it
was turned on again later, do not expect this file to ever be functional. There is a way
to include this file separately *now*, however it requires using the 'importArticles'
which for Wikia, as so far seen, uses *VERY* expensive client side fixups to to produce
the same effect that Wikipedia emits on the original document.   

* Do not use 'importArticle' and friends to include additional CSS for performance reasons.

* See also 'MediaWiki:Wikia.js' and 'MediaWiki:Common.js'

***************************************************************************************/

/* --- RECENT CSS CHANGES --- */
/* [[Category: User CSS| ]] [[Category: WoWWiki]] */

/*** LINK HOVERING ***/
/****************************/
/*UNVISITED LINKS */

a,
.color2 a {
	color: #70b8ff;
}
a: hover,
.color2 a:hover {
	/* VISITED LINKS */
	color: #16a92d;
	text-decoration: none;
	text-shadow: #16a92d 0 0 10px;
}
a: visited,
.color2 a:visited {
	color: #70b8ff;
	text-decoration: none;
}
a: visited: hover,
.color2 a:visited:hover {
	/* NEW LINKS */
	color: #16a92d;
	text-decoration: none;
	text-shadow: #16a92d 0 0 10px;
}
a.new {
	color: #871611 !important;
}
a.new: hover,
.color2 a.new:hover {
	/* Mists countdown background */
	color: #16a92d!important;
	text-decoration: none;
	text-shadow: #16a92d 0 0 5px !important;
}
.countdownBkgndMists {
	/* Background-colors for Template: Level right color box */
	background-image: url("https://images.wikia.nocookie.net/wowwiki/images/a/ae/MoPGiveawayHeader.jpg");
}
.levelbgcolor-horde {
	background-color: #300;
}
.levelbgcolor-alliance {
	background-color: #003;
}
.levelbgcolor-neutral {
	background-color: #330;
}
.levelbgcolor-combat {
	background-color: #530;
}
.levelbgcolor-easternkingdoms {
	background-color: #413;
}
.levelbgcolor-kalimdor {
	background-color: #303;
}
.levelbgcolor-outland {
	background-color: #030;
}
.levelbgcolor-northrend {
	background-color: #033;
}
.levelbgcolor-vashjir {
	background-color: #350;
}
.levelbgcolor-deepholm {
	background-color: #310;
}
.levelbgcolor-firelands {
	/* remove table backgrounds */
	background-color: #610;
}
table {
	/* quick fix for darker red links problem */
	background-color: inherit;
}
a.new {
	/* to remove the external link icon from sortable tables */
	color: #f05048;
}
#bodyContent a.sortheader {
	/* fixes spacing after using plainlinks class to remove arrow */
	background: none;
	padding-right: 0;
}
#bodyContent .plainlinks a {
	/* increase h2 heading margin */
	background: none !important;
	padding: 0 !important;
}
h2 {
	/* Change background of category bar */
	margin-top: 1em;
}
#catlinks {
	/* --- PERSONAL LINKS --- */
	/* icon change */
	background-color: #e6e6fd;
}
li#pt-userpage,
li#pt-anonuserpage,
li#pt-login {
	/* self spacing, bold */
	background: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/4/49/UserIcon.png") no-repeat;
}
#p-personal {
	/* content spacing */
	font-weight: bold;
	padding: 4px 0 3px;
}
#column-content,
#p-cactions {
	/* removing a little wasted space */
	margin-top: 5px;
}
#p-personal UL {
	/* --- RC LIST --- */
	/* rc list byte-change colours */
	padding-right: 1em;
}
.mw-plusminus-neg {
	color: #8b0000;
}
.mw-plusminus-pos {
	color: #006400;
}
.mw-plusminus-null {
	/* move namespace bit on RC to the right */
	color: #666;
}
div.namespacesettings {
	/* colour 'N' and 'm' */
	background: #eee;
	border: 1px dotted #606060;
	clear: none;
	float: right;
	font-size: 90%;
	padding: 4px;
	position: relative;
	top: -4em;
	width: 160px;
}
.newpage {
	color: #a56c40;
}
.minor {
	/* --- SMALLER TEMPLATES USED TEXT --- */
	color: #666;
}
.templatesUsed ul {
	/* --- [[SPECIAL: ALLPAGES]], CATEGORY REDIRECT TWEAKS --- */
	font-size: 90%;
}
.redirect-in-category,
.allpagesredirect {
	font-style: italic;
}
.allpagesredirect:after {
	/* --- REFERENCE STYLES --- */
	/* make the list of references look smaller */
	color: #808080;
	content: " (redirect)";
}
ol.references {
	font-size: 100%;
}
.references-small {
	/* VALIDATOR NOTICE: the following is correct, but the W3C validator doesn't accept it */
	/* -moz-* is a vendor-specific extension (CSS 2.1 4.1.2.1) */
	/* Please ignore any validator errors caused by these two lines */
	/* column-count is from the CSS3 module "CSS Multi-column Layout" */
	font-size: 90%;
}
.references-2column {
	-moz-column-count: 2;
	column-count: 2;
	font-size: 90%;
}
.same-bg {
	/* Highlight clicked reference in blue to help navigation */
	background: none;
}
ol.references > li:target {
	background-color: #ccf;
}
sup.reference:target {
	/* --- YOU HAVE NEW MESSAGES BAR --- */
	/* prettified */
	background-color: #ccf;
}
.usermessage,
.usermessage plainlinks {
	/* --- TAB STYLES --- */
	/* for "edit this page" tab and "discussion" tab etc */
	border: 2px solid #ee8500;
	margin: 0.5em 0;
	padding: 0.5em;
	vertical-align: middle;
}
.tab {
	/* --- OTHER TWEAKS --- */
	/* TabView extension */
	border-color: #808080;
	border-style: solid solid none;
	border-width: thin;
	font-size: 95%;
	padding: 0.25ex 1ex 0;
}
.yui-content {
	/* border: solid 1px;*/
	background-color: #edf5ff;
	padding: 0.25em 0.5em;
}
.yui-nav {
	border-color: #edf5ff;
	border-style: solid;
	border-width: 0 0 5px;
	margin: 0 !important;
}
.yui-skin-sam .yui-navset .yui-nav,
.yui-skin-sam .yui-navset .yui-navset-top .yui-nav {
	border-color: #edf5ff;
	border-style: solid;
	border-width: 0 0 5px;
}
.yui-navset .yui-nav .selected {
	background-color: #edf5ff;
}
.yui-navset .yui-nav li {
	/* Tabber tweaks */
	.tabberlive .tabbertab h2, ;padding-left: 10px;
	padding-right: 10px;
}
.tabberlive .tabbertab h3 {
	display: block !important;
}
ul.tabbernav li a:link {
	color: #70b8ff !important;
}
ul.tabbernav li a:hover {
	background: #333 !important;
	border-color: #227 !important;
	color: black !important;
}
ul.tabbernav li.tabberactive a:hover {
	background: #333 !important;
	color: black !important;
}
ul.tabbernav li.tabberactive a:link {
	color: #d5d4d4 !important;
}
ul.tabbernav li.tabberactive a {
	background-color: #333 !important;
	border-bottom-style: none !important;
	border: 1px solid #d5d4d4 !important;
}
ul.tabbernav li a {
	-khtml-border-radius: 0;
	-moz-border-radius: 0;
	-webkit-border-radius: 0;
	background: #333 !important;
	border-radius: 0;
	border: 1px !important;
	margin-left: 0 !important;
	margin-right: 3px;
}
.tabberlive .tabbertab {
	border: none !important;
}
ul.tabbernav {
	border-bottom: none !important;
}
.tabberlive .editsection {
	/* background for transparent images when viewed directly */
	display: none;
}
#file img {
	/* Prevents line breaks in links, used for navboxes */
	background: transparent url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/thumb/3/34/Wwchecker.svg/16px-Wwchecker.svg.png") repeat scroll 0 0;
}
.nowraplinks a {
	/* *** WOWWIKI TEMPLATES ****/
	/* --- NAVFRAME STUFF --- */
	/* Documentation at [[wikipedia: Wikipedia: NavFrame]]. */
	/* Standard Navigationsleisten, aka box hiding thingy from .de. */
	div.Boxmerge, ;white-space: nowrap;
}
div.NavFrame {
	border-collapse: collapse;
	border: 1px solid #aaa;
	font-size: 95%;
	margin: 0;
	padding: 4px;
	text-align: center;
}
div.Boxmerge div.NavFrame {
	border-style: none;
}
div.NavFrame+div.NavFrame {
	border-top-style: none;
}
div.NavPic {
	background-color: #fff;
	float: left;
	margin: 0;
	padding: 2px;
}
div.NavFrame div.NavHead {
	background-color: #ccf;
	font-weight: bold;
	height: 1.6em;
	position: relative;
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
	clear: both;
	line-height: 1px;
	margin: 0;
	padding: 0;
}
a.NavToggle {
	/* --- TOOLTIP --- */
	/* WoW Style Tooltip */
	font-size: smaller;
	font-weight: normal;
	position: absolute;
	right: 3px;
	top: 0;
}
/* div.itemtooltip li a {
	color: inherit;;
}
would ideally replace most a declarations here, but IE support is lacking. */
div.itemtooltip {
	-moz-border-radius: 0.75ex;
	-webkit-border-radius: 0.75ex;
	background-color: #111;
	border: 1px #bbb solid;
	margin: 5px;
	min-width: 15em;
	padding: 0.3em;
	text-align: left;
}
div.itemtooltip ul,
.htt .tooltip-content ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
div.itemtooltip,
div.itemtooltip li,
div.itemtooltip li a,
.htt .tooltip-content,
.htt .tooltip-content li,
.htt .tooltip-content li a {
	color: #fff;
}
div.itemtooltip li.socket,
div.itemtooltip li.socket a,
.htt .tooltip-content li.socket,
.htt .tooltip-content li.socket a {
	color: #999;
}
div.itemtooltip li.glyph,
div.itemtooltip li.glyph a,
.htt .tooltip-content li.glyph,
.htt .tooltip-content li.glyph a {
	color: #71d5ff;
}
div.itemtooltip li.req,
div.itemtooltip li.req a,
.htt .tooltip-content li.req,
.htt .tooltip-content li.req a {
	color: #999;
}
div.itemtooltip li.locked,
div.itemtooltip li.locked a,
.htt .tooltip-content li.locked,
.htt .tooltip-content li.locked a {
	color: #d22;
}
div.itemtooltip li.bonus,
div.itemtooltip li.bonus a,
.htt .tooltip-content li.bonus,
.htt .tooltip-content li.bonus a {
	color: #0f0;
}
div.itemtooltip li.flavor,
div.itemtooltip li.flavor a,
.htt .tooltip-content li.flavor,
.htt .tooltip-content li.flavor a {
	color: #ffd517;
}
div.itemtooltip li.detail,
div.itemtooltip li.detail a,
.htt .tooltip-content li.detail,
.htt .tooltip-content li.detail a {
	color: #66c;
}
div.itemtooltip li.set,
div.itemtooltip li.set a,
.htt .tooltip-content li.set,
.htt .tooltip-content li.set a {
	color: #ffd100;
}
div.itemtooltip li.setbonus,
div.itemtooltip li.setbonus a,
.htt .tooltip-content li.setbonus,
.htt .tooltip-content li.setbonus a {
	color: #999;
}
.tooltip,
.htt .tooltip-content {
	-moz-border-radius: 0.75ex;
	-webkit-border-radius: 0.75ex;
	background-color: #111;
	border: 1px #bbb solid;
	color: #fff;
	float: left;
	font-size: 1em;
	margin: 5px;
	min-width: 15em;
	padding: 0.3em;
	width: 18em;
}
.tooltip ul,
.htt .tooltip-content ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
.htt .tooltip-content {
	background: transparent url("https://images.wikia.nocookie.net/__cb20080417010831/wowwiki/images/thumb/c/c0/Ttbackground.svg/275px-Ttbackground.svg.png") !important;
	font-size: 1em;
	max-width: 300px;
	width: auto !important;
}
.htt .tooltip-content .tooltip-hide {
	display: none;
}
.tooltip-ready {
	/* default skin for navigation boxes */
	display: block;
	visibility: hidden;
	z-index: 999;
}
/* --- TABLE DESIGNS --- */
table.navbox {
	/* single pixel border between adjacent navboxes (doesn't work for IE6, but that's okay) */
	border: 1px solid #aaa;
	clear: both;
	font-size: 88%;
	margin: auto;
	padding: 1px;
	text-align: center;
	width: 100%;
}
table.navbox+table.navbox {
	margin-top: -1px;
}
.navbox-title,
.navbox-abovebelow,
table.navbox th {
	/* title and above/below styles */
	padding-left: 1em;
	padding-right: 1em;
	text-align: center;
}
.navbox-group {
	/* group style */
	font-weight: bold;
	padding-left: 1em;
	padding-right: 1em;
	text-align: right;
	white-space: nowrap;
}
.navbox,
.navbox-subgroup {
	background: #fdfdfd;
}
.navbox-list {
	border-left: 2px solid #fdfdfd;
}
.navbox-title,
table.navbox th {
	background: #ccf;
}
.navbox-abovebelow,
.navbox-group,
.navbox-subgroup .navbox-title {
	background: #ddf;
}
.navbox-subgroup .navbox-group,
.navbox-subgroup .navbox-abovebelow {
	background: #e6e6ff;
}
.navbox-even {
	background: #f7f7f7;
}
.navbox-odd {
	background: transparent;
}
@media print {
	/* dark table style */
	.navbox {
		display: none;
	}
}
table.darktable {
	background: #f9f9f9;
	border: 1px solid #aaa;
	font-size: 89%;
	margin: 0.5em 0 1em 0.5em;
	padding: 5px;
}
table.darktable th {
	background-color: #ccf;
	padding: 0 0.5em;
}
table.darktable caption {
	font-size: 120%;
	font-weight: bold;
}
table.darktable tr:not(:first-child) th {
	background-color: #ddf;
}
table.extrapadding td {
	padding-left: 4px;
	padding-right: 4px;
}
table.td-right td {
	/* title stuff */
	text-align: right;
}
.title {
	background-color: #ddf;
	font-weight: bold;
	padding: 1px 2px;
	text-align: center;
}
.alt {
	background-color: #e9e9ff;
}
table.zebra > tbody > tr:nth-child(2n+1) {
	background-color: #e9e9ff;
}
table .hover:hover {
	/* --- MAIN PAGE STYLES --- */
	/* darkgreen header */
	background-color: orange;
}
/* for occasions where a table element is class="hover": for legibility in larger tables *   /
.mainpagetabledarkgreen {
	/* green body */
	background-color: #8ac4b4;;
}
.mainpagetablegreen {
	/* darkblue header */
	background-color: #a2ccbe;
}
.mainpagetabledarkblue {
	/* blue body */
	background-color: #a0a2b8;
}
.mainpagetableblue {
	/* darkred header */
	background-color: #babbd0;
}
.mainpagetabledarkred {
	/* red body */
	background-color: #bdacac;
}
.mainpagetablered {
	/* --- GENERAL TEMPLATE DESIGNS --- */
	/* bg for wowbox */
	background-color: #d7c6c6;
}
.wowboxbg {
	/* making certain links black on monobook */
	background-color: #ddd;
}
.speciallink {
	/* disambig, i-note design */
	color: black;
}
.greybar {
	/* band, in use by [[template: infoline]] */
	background-color: #ddd;
	border-bottom: 1px #606060 solid;
	border-top: 1px #606060 solid;
	color: #000;
}
.band {
	display: table;
	line-height: 130%;
	margin: 0.2ex 3em;
	padding: 1ex 3em 0.5ex;
	text-align: center;
}
/* --- {
	 {
		t|Ambox;;
	}
}
TEMPLATE DESIGNS --- */
/* {
	 {
		t|Ambox;;
	}
	;;
}
design */
.ambox {
	background-color: #eee;
	border-collapse: collapse;
	border-left: 10px solid #228b22;
	border: 1px #aaa solid;
	font-size: 95%;
	margin: 0 auto;
	width: 80%;
}
/* {
	 {
		t|Ambox;;
	}
}
colors */
.ambox-blue {
	border-left: 10px solid #1e90ff;
}
.ambox-brown { border-left: 10px solid #442800; }
.ambox-red {
	border-left: 10px solid #b22222;
}
.ambox-orange {
	border-left: 10px solid #f28500;
}
.ambox-yellow {
	border-left: 10px solid #f4c430;
}
.ambox-purple {
	border-left: 10px solid #9932cc;
}
.ambox-gray {
	border-left: 10px solid #bba;
}
.ambox-green {
	border-left: 10px solid #228b22;
}
/* {
	 {
		t|Ambox;;
	}
}
small text */
.amsmalltext {
	font-size: smaller;
	margin-left: 0.8em;
	margin-top: 0.5em;
}
/* {
	 {
		t|Ambox;;
	}
}
image */
.ambox-image {
	/* 0.5em left, 0 right */
	padding: 2px 0 2px 0.5em;
	text-align: center;
	width: 60px;
}
@media print {
	.ambox {
		display: none;
		/* Blizz text color */
	}
	/* --- COLORS --- */
	.blizztext,
}
/* no ambox when printing */
.text-blizz {
	/* text colors: say, yell, emote, whisper */
	color: #0070af;
}
.text-say {
	color: #c90;
}
.text-yell {
	color: #ff4040;
}
.text-emote {
	color: #f87431;
}
.text-whisper {
	color: #f8b0de;
}
.text-bossemote {
	/* Item Quality Colors */
	color: #f0d000;
}
.qc-artifact,
.qc-artifact a,
.qc-heirloom,
.qc-heirloom a {
	color: #e6cc80;
}
.qc-legendary,
.qc-legendary a {
	color: #ff8000;
}
.qc-epic,
.qc-epic a {
	color: #a335ee;
}
.qc-rare,
.qc-rare a {
	color: #0070ff;
}
.qc-uncommon,
.qc-uncommon a {
	color: #1eff00;
}
.qc-common,
.qc-common a {
	color: #000;
	div.itemtooltip li a span.qc-common,
}
/* common is normally white, but white on white is bad */
.htt .tooltip-content li a span.qc-common {
	color: #fff;
	.qc-poor,
}
/* but we want it white inside tooltips. */
.qc-poor a {
	color: #9d9d9d;
}
.qc-enchant,
.qc-enchant a {
	color: #ffd100;
}
.qc-object,
.qc-object a {
	/* Class Colors */
	color: #ee0;
}
.cc-druid,
.cc-druid a {
	color: #ff7d0a;
}
.cc-hunter,
.cc-hunter a {
	color: #abd473;
}
.cc-mage,
.cc-mage a {
	color: #69ccf0;
}
.cc-monk,
.cc-monk a {
	color: #00ff96;
	.cc-paladin,
}
/* Theoretically from game UI constant value. */
.cc-paladin a {
	color: #f58cba;
}
.cc-priest,
.cc-priest a {
	color: gray;
	.cc-rogue,
}
/* priest is white, but not on light skins... see monaco/wowwiki.css */
.cc-rogue a {
	color: #c90;
}
.cc-shaman,
.cc-shaman a {
	color: #2459ff;
}
.cc-warlock,
.cc-warlock a {
	color: #9482ca;
}
.cc-warrior,
.cc-warrior a {
	color: #c79c6e;
}
.cc-deathknight,
.cc-deathknight a {
	color: #c41e3a;
}
.druid,
.druidalt {
	color: white;
}
.druid {
	background-color: #7f3e05;
}
.druidalt {
	background-color: #630;
}
.druid a,
.druidalt a {
	color: #ff7f0a;
}
.hunter,
.hunteralt {
	color: white;
}
.hunter {
	background-color: #453;
}
.hunteralt {
	background-color: #342;
}
.hunter a,
.hunteralt a {
	color: #abd473;
}
.mage,
.magealt {
	color: white;
}
.mage {
	background-color: #48a;
}
.magealt {
	background-color: #367;
}
.mage a,
.magealt a {
	color: #6cf;
}
.paladin,
.paladinalt {
	color: white;
}
.paladin {
	background-color: #835;
}
.paladinalt {
	background-color: #624;
}
.paladin a,
.paladinalt a {
	color: #f9c;
}
.priest,
.priestalt {
	color: white;
}
.priest {
	background-color: #777;
}
.priestalt {
	background-color: #444;
}
.priest a,
.priestalt a {
	color: #bbb;
}
.rogue,
.roguealt {
	color: white;
}
.rogue {
	background-color: #550;
}
.roguealt {
	background-color: #440;
}
.rogue a,
.roguealt a {
	color: #fff569;
}
.shaman,
.shamanalt {
	color: white;
}
.shaman {
	background-color: #127;
}
.shamanalt {
	background-color: #125;
}
.shaman a,
.shamanalt a {
	color: #2459ff;
}
.warlock,
.warlockalt {
	color: white;
}
.warlock {
	background-color: #315;
}
.warlockalt {
	background-color: #204;
}
.warlock a,
.warlockalt a {
	color: #c9f;
}
.warrior,
.warrioralt {
	color: white;
}
.warrior {
	background-color: #753;
}
.warrioralt {
	background-color: #432;
}
.warrior a,
.warrioralt a {
	color: #c79c6e;
}
.deathknight,
.deathknightalt {
	color: white;
}
/* .deathknight {
	background-color: #;;;
}*/
/* .deathknightalt {
	background-color: #;;;
	.deathknight a,
	;
}*/
.deathknightalt a {
	/* PLAINLINKS (see wikipedia: Common.css */
	color: #c41e3a;
}
.plainlinksneverexpand {
	background: none ! important;
	padding: 0 ! important;
}
.plainlinksneverexpand .urlexpansion {
	display: none ! important;
}
.plainlinksneverexpand a {
	background: none !important;
	padding: 0 !important;
}
.plainlinksneverexpand a.external.text:after {
	display: none !important;
}
.plainlinksneverexpand a.external.autonumber:after {
	/* USERBOXES */
	display: none !important;
}
table.wwusrbox {
	border-style: solid;
	border-width: 1px;
	float: left;
	margin: 0.2em;
	padding: 0;
}
table.wwusrbox td.left,
table.wwusrbox td.right {
	font-size: 1.6em;
	padding: 0;
	text-align: center;
	vertical-align: middle;
}
table.wwusrbox td.main {
	font-size: 0.90em;
	line-height: 125%;
	padding: 0 4px;
	vertical-align: middle;
}
table.wwusrbox {
	background: #f8f8f8;
	border-color: #aaa;
}
table.wwusrbox td.left,
table.wwusrbox td.right {
	/* - Book Styling */
	background: #d8d8d8;
}
div.book {
	margin: 0.5em;
}
div.book > div {
	border-style: solid;
	border-width: 1px;
}
div.book > div > h4 {
	border-bottom-style: solid;
	border-bottom-width: 1px;
	font-family: Georgia, serif;
	font-size: 1.1em;
	font-weight: bold;
	margin: 0;
	padding: 0.2em;
}
div.book > div > h4 span.editsection {
	font-family: sans-serif;
	font-size: 0.91em;
}
div.book > div > div > div {
	font-family: Georgia, serif;
	font-size: 0.85em;
	margin-top: 0;
	margin: 0.5em;
	position: relative;
}
/* For IE7 because it doesn't support double-colon selectors and there's a strict mode bug with inline elements */
div.book p:first-child:first-letter {
	font-size: 2em;
	line-height: 1;
	text-transform: uppercase;
}
div.book p:first-child::first-letter {
	/* Select reputation colors */
	border-style: solid;
	border-width: 1px;
	font-size: 2em;
	line-height: 1;
	padding: 1px;
	text-transform: uppercase;
}
span.rep-friendly {
	color: lime;
}
span.rep-neutral {
	color: yellow;
}
span.rep-hostile {
	/* Tooltip formatting common */
	color: red;
}
div.wtooltip {
	-moz-border-radius: 0.75ex;
	-webkit-border-radius: 0.75ex;
	background-color: #111;
	border: 1px #bbb solid;
	color: white;
	margin: 5px;
	min-width: 15em;
	padding: 0.3em;
	text-align: left;
}
div.wtooltip ul {
	/* Buffs & Debuffs */
	list-style: none;
	margin: 0;
	padding: 0;
}
div.bufftip {
	border-color: #aaa;
	border-style: solid;
	border-width: 1px;
}
div.debuff {
	border-color: #c00;
}
div.debuffmagic {
	border-color: #39f;
}
div.debuffcurse,
div.buffweapon {
	border-color: #90f;
}
div.debuffdisease {
	border-color: #960;
}
div.debuffpoison {
	border-color: #090;
}
.achievementlink {
	/* *************************/
	/* New main page-related styles */
	/****** TESTING AREA ******/
	/**************************/
	color: goldenrod;
}
body.page-Portal_Main #wikia_page,
body.page-Portal_World_of_Warcraft #wikia_page,
body.page-Portal_WotLK #wikia_page,
body.page-Portal_Interface_customization #wikia_page,
body.page-Portal_Warcraft_universe #wikia_page,
body.page-Portal_Community #wikia_page {
	min-width: 735px;
}
body.page-Portal_Main hr,
body.page-Portal_World_of_Warcraft hr,
body.page-Portal_WotLK hr,
body.page-Portal_Interface_customization hr,
body.page-Portal_Warcraft_universe hr,
body.page-Portal_Community hr {
	background-color: #444;
	color: #444;
}
.mpcontentbox-sidebar {
	-moz-border-radius: 0.5em;
	-webkit-border-radius: 0.5em;
	font-size: 89%;
	margin-top: 10px;
	padding: 7px 10px 12px;
}
.mpcontentbox-main {
	-moz-border-radius: 0.5em;
	-webkit-border-radius: 0.5em;
	font-size: 89%;
	margin-top: 10px;
	padding: 7px 15px 12px;
}
.mpcontentbox-header {
	border-bottom: 1px solid #444;
}
.mpcontentbox-table {
	width: 100%;
}
.mpcontentbox-table td {
	width: 50%;
}
.bg-darkgray {
	background-color: #bbb;
}
.bg-darkblue {
	background-color: #a0a2b8;
}
.bg-darkred {
	background-color: #bdacac;
}
.bg-darkgreen {
	background-color: #8ac4b4;
}
#mptabs {
	clear: left;
	font-size: 93%;
	font-weight: bold;
	margin: 1em 0 3px;
}
#mptabs .activetab {
	-moz-border-radius-topleft: 0.5em;
	-moz-border-radius-topright: 0.5em;
	-webkit-border-radius-topleft: 0.5em;
	-webkit-border-radius-topright: 0.5em;
	background: #bbb;
	color: black;
	margin: 0 3px 0 0;
	padding: 5px 10px;
	text-decoration: none;
}
#mptabs a .inactivetab,
#mptabs strong .inactivetab {
	-moz-border-radius-topleft: 0.5em;
	-moz-border-radius-topright: 0.5em;
	-webkit-border-radius-topleft: 0.5em;
	-webkit-border-radius-topright: 0.5em;
	background: #ddd;
	color: black;
	margin: 0 3px 0 0;
	padding: 5px 10px;
	text-decoration: none;
}
#mptabs a .inactivetab: hover,
#mptabs strong .inactivetab:hover {
	background: #ccc;
	color: black;
}
#mptabs a:hover {
	/* poll stuff */
	text-decoration: none !important;
}
.poll {
	background-color: #a0a2b8 !important;
	border: none !important;
	max-width: 500px !important;
	padding: 5px 0 !important;
	width: 88% !important;
}
.pollAjax {
	background-color: #999 !important;
}
.pollAnswerVotes {
padding:1px !important;
}
.pollAnswerVotes div {
padding:1px !important;
	background-color: #999 !important;
	margin-right: 10px !important;
}
.poll .ourVote div {
	/* NEW poll stuff */
	border: 1px solid #ccc !important;
}
div.ajax-poll {
	/* costitem */
	border: none !important;
	width: 88% !important;
}
span.costitem div {
	/* Login form fix attempt for all skins */
	display: inline;
}
* html #userloginForm form {
	float: none;
}
* html #userlogin form {
	/* Recent changes, Special: Filelist arrows */
	float: none;
}
.mw-arr-r {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/2/26/Icon-next-12x12.png");
}
.mw-arr-d,
.mw-sort-desc {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/6/68/Icon-down-12x12.png");
}
.mw-arr-u,
.mw-sort-asc {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/7/79/Icon-up-12x12.png");
}
.mw-arr-l {
	/* Table sort for Special: Filelist */
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/2/20/Icon-back-12x12.png");
}
.TablePager_sort {
	background-position: 2px 50%;
}
.TablePager th a {
	display: block;
}
.TablePager_sort a {
	/* Lootbox design */
	padding: 0 4px 0 16px;
}
table.lootbox td {
	margin: 0;
	padding: 1px;
}
table.lootbox div.itemtooltip {
	/* Forum formatting */
	margin: 0;
}
.forumheader {
	background-color: #f9f9f9;
	border: 1px solid #aaa;
	margin-top: 1em;
	padding: 12px;
}
.forumlist td span {
	display: block;
	font-size: smaller;
	padding-left: 10px;
}
.forumlist td span a {
	text-decoration: none;
}
.forumlist td span.forum_author {
	padding-left: 30px;
}
.forumlist td.forum_edited a {
	text-decoration: none;
}
.forumlist td.forum_title a {
	padding-left: 20px;
}
.forumlist td.forum_title span a {
	padding-left: 0;
}
.forumlist td.forum_title a.forum_new {
	background: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/4/4e/Forum_new.gif") center left no-repeat;
	font-weight: bold;
	padding-left: 20px;
}
.forumlist td.forum_title a.forum_new:visited {
	background: none;
	font-weight: normal;
	padding-left: 20px;
}
.forumlist th.forum_title {
	/* "Temporary" additions */
	padding-left: 20px;
}
.blizzcon {
	background: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/3/30/WoWbg.jpg");
}
.opacity70 {
	/* accessibility tweaks */
	background: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/c/ca/70opacity.png") repeat;
}
.horizontal ul {
	margin: 0;
	padding: 0;
}
.horizontal li {
	border-right: 1px solid;
	display: inline;
	padding: 0 0.2em 0 0.4em;
}
.horizontal li:last-child {
	/* elinks */
	border-right: medium none;
	padding-right: 0;
}
ul.elinks {
	list-style-type: none;
	margin: 0;
	padding: 0;
}
ul.elinks li {
	background-position: 0 0;
	background-repeat: no-repeat;
	list-style: none;
	min-height: 25px;
	padding-left: 25px;
	vertical-align: middle;
}
ul.elinks li.mmo4ever {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/b/b5/Icon-mmo4ever-22x22.png");
}
ul.elinks li.sigrie {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/b/ba/Icon-mmochampion-22x22.png");
}
ul.elinks li.wowdb {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/d/da/Icon-wowdb-22x22.png");
}
ul.elinks li.wowhead {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/6/6e/Icon-wowhead-22x22.png");
}
ul.elinks li.allakhazam {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/7/7c/Icon-allakhazam-22x22.png");
}
ul.elinks li.thottbot {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/f/ff/Icon-thottbot-22x22.png");
}
ul.elinks li.wowus {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/9/9c/Icon-wowus-22x22.png");
}
span.alliance-link,
span.horde-link,
span.neutral-link {
	background-position: 0 0;
	background-repeat: no-repeat;
	min-height: 15px;
	padding-left: 17px;
	vertical-align: middle;
}
span.alliance-link {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/4/45/Alliance_15.gif");
}
span.horde-link {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/6/68/Horde_15.gif");
}
span.neutral-link {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/5/5f/Neutral_15.gif");
}
.alliance-link-big,
.horde-link-big,
.neutral-link-big,
.combat-link-big {
	background-position: 1px 3px;
	background-repeat: no-repeat;
	min-height: 36px;
	padding-left: 39px;
	vertical-align: middle;
}
.alliance-link-big {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/8/8e/Alliance_32-square.gif");
}
.horde-link-big {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/7/7c/Horde_32.gif");
}
.neutral-link-big {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/3/38/Neutral_32-square.gif");
}
.combat-link-big {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/6/6c/Combat_32.gif");
}
span.socketlink-red {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/0px/02/UI-EmptySocket-Red.png");
}
span.socketlink-blue {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/f/fc/UI-EmptySocket-Blue.png");
}
span.socketlink-yellow {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/8/87/UI-EmptySocket-Yellow.png");
}
span.socketlink-prismatic {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/4/48/UI-EmptySocket-Prismatic.png");
}
span.socketlink-meta {
	background-image: url("https://images.wikia.nocookie.net/__cb1/wowwiki/images/7/75/UI-EmptySocket-Meta.png");
}
span.socketlink {
	background-position: 0 0;
	background-repeat: no-repeat;
	min-height: 16px;
	padding-left: 18px;
	vertical-align: middle;
}
span.socketlink a {
	color: #999;
}
.page-Special_Search #contentSub {
	font: 10pt sans-serif;
}
.mw-userpage-userdoesnotexist {
	border: 2px solid red;
	font: bold 12pt sans-serif;
	text-align: center;
}
.quotemark {
	font: bold 35px Times New Roman, serif;
	padding: 7px;
	position: relative;
	top: -12px;
}
.quote {
	/* display: none; */
	max-width: 75%;
}
body.page-Portal_Main h1.firstHeading,
body.page-Portal_Main #mp-newsline,
body.page-Portal_Main #contentSub,
body.page-Portal_World_of_Warcraft #contentSub,
body.page-Portal_WotLK #contentSub,
body.page-Portal_Interface_customization #contentSub,
body.page-Portal_Warcraft_universe #contentSub,
body.page-Portal_Community #contentSub,
.TablePager_sort img,
.ajaxHide-active,
body.ns-110 #ca-talk,
body.ns-110 #this_talk,
body.ns-110 #page_tabs li+li,
.aChar,
.hidden,
#jsErrors,
span.costitem p.error {
	display: none;
}
#profile-content-inner {
	margin-right: 0;
}
.itemlink {
	/* talent trees (experimental) */
	white-space: nowrap;
}
.talenttree {
	position: relative;
}
.talenttree div {
	position: absolute;
}
.talenttree div.col1 {
	left: 1em;
}
.talenttree div.col2 {
	left: 5em;
}
.talenttree div.col3 {
	left: 9em;
}
.talenttree div.col4 {
	left: 13em;
}
.talenttree div.tier1 {
	top: 1em;
}
.talenttree div.tier2 {
	top: 5em;
}
.talenttree div.tier3 {
	top: 9em;
}
.talenttree div.tier4 {
	top: 13em;
}
.talenttree div.tier5 {
	top: 17em;
}
.talenttree div.tier6 {
	top: 21em;
}
.talenttree div.tier7 {
	top: 25em;
}
.talenttree div.tier8 {
	top: 29em;
}
.talenttree div.tier9 {
	top: 33em;
}
.talenttree div.tier10 {
	top: 37em;
}
.talenttree div.tier11 {
	top: 41em;
}
.custom-dropdown {
	padding: 1px 8px;
}
.custom-dropdown > :first-child:after {
	background-image: url("data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D");
	border-color: white transparent transparent;
	border-style: solid;
	border-width: 4px;
	content: "";
	display: inline-block;
	height: 1px;
	margin-left: 4px;
	margin-top: 2px;
	position: relative;
	vertical-align: middle;
	width: 1px;
}
.custom-dropdown:hover {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	margin-bottom: -1px;
	padding-bottom: 2px;
}
.custom-dropdown ul {
	list-style: none outside none;
	min-width: 100%;
	top: 23px;
}
.custom-dropdown:hover ul {
	display: block;
}
.custom-dropdown li a {
	font-size: 12px;
	height: 14px;
	line-height: 14px;
}