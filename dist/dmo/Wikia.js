/* CSS placed here will be applied to all skins. See also: [[MediaWiki:Monobook.css]] and [[MediaWiki:Monaco.css]] */

//adding RC link to toolbar
$('ul.tools li:first-child').after('<li><a href="http://dmo.answers.wikia.com/wiki/Digimon_Masters_Online_Answers">Answer Wiki</a></li>');

/* Poll auto-formatting */
.ajax-poll {
    width: auto !important;  /* Inline style override for Poll extension*/
    border: 1px solid #aaa !important; /* Replaces dashed with solid grey */
}
.pollAnswerVotes span {
    color: black !important;
}

/* Fix padding for table in "MediaWiki:SiteNotice" */
#siteNotice { /* For both Monobook and Monaco */
    padding:0 !important;
}
#article #siteNotice { /* Specific for Monaco */
    margin:-11px !important;
    margin-bottom:-1px !important;
}
#article #siteNotice table { /* Specific for Monaco */
    margin:0 !important;
}
#content #collapsibleTable0, #content #wikiSiteNotice { /* Specific for Monobook */
    margin-bottom:0;
}

/* Make the siteNotice load smoother */
#mw-dismissable-notice td[align="right"] {
    display:none;
}
#article #siteNotice #collapsibleTable0 th > span {
    float:none;
    position:absolute;
    right:5px;
}

/* Center the [hide][dismiss] on siteNotice */
#mw-dismissable-notice td span {
    vertical-align:bottom;
}

/* Fix siteNotice background in Monobook */
#mw-dismissable-notice {
    background-color: transparent;
}

/* Hide title and tagline on Main Page */
body.page-RuneScape_Wiki h1.firstHeading, body.page-RuneScape_Wiki #siteSub { 
    display:none;
}

/* Small reference list */
ol.references {
    font-size: 100%;
}
 
.references-small { 
    font-size: 90%;
}
 a
/* VALIDATOR NOTICE: the following is correct, but the W3C validator doesn't accept it */
/* -moz-* is a vendor-specific extension (CSS 2.1 4.1.2.1) */
/* column-count is from the CSS3 module "CSS Multi-column Layout" */
/* Please ignore any validator errors caused by these two lines */
.references-2column {
    font-size: 90%;
    -moz-column-count:2;
    column-count:2;
}

/* Messagebox templates */
 
.messagebox {
    border: 1px solid #aaa;
    background-color: #F9F9F9;
    color: black;
    width: 80%;
    margin: 0 auto 1em auto;
    padding: .2em;
}
.messagebox.merge {
    border: 1px solid #C0B8CC;
    background-color: #f0e5ff;
    text-align: center;
}
.messagebox.cleanup {
    border: 1px solid #9f9fff;
    background-color: #efefff;
    text-align: center;
}
.messagebox.standard-talk {
    border: 1px solid #c0c090;
    background-color: #f8eaba;
}
.messagebox.nested-talk {
    border: 1px solid #c0c090;
    background-color: #f8eaba;
    width: 100%;
    margin: 2px 4px 2px 4px;
}
.messagebox.small {
    width: 238px;
    font-size: 85%;
    float: right;
    clear: both;
    margin: 0 0 1em 1em;
    line-height: 1.25em; 
}
.messagebox.small-talk {
    width: 238px;
    font-size: 85%;
    float: right;
    clear: both;
    margin: 0 0 1em 1em;
    line-height: 1.25em; 
    background: #F8EABA;
}

/* Infobox template style. */
.infobox {
    border: 1px solid #aaa;
    background-color: #f9f9f9;
    color: inherit !important;
    margin: 0 0 0.5em 2em !important;
    padding: 0.2em;
    float: right;
    clear: right;
}
.infobox td,
.infobox th {
    vertical-align: top;
    color: black;
}
.infobox caption {
    font-size: larger;
    padding-bottom: 10px !important;
    margin-left: 0 !important;
    color: inherit !important;
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

/* Wikitable/Prettytable class for skinning normal tables. */
table.wikitable,
table.prettytable {
    margin: 1em 1em 1em 0;
    background: #F9F9F9;
    border: 1px #aaa solid;
    border-collapse: collapse;
    color: black;
}

table.wikitable th, table.wikitable td,
table.prettytable th, table.prettytable td {
    border: 1px #aaa solid;
    padding: 0.2em;
}

table.wikitable th,
table.prettytable th {
    background: #F2F2F2;
    text-align: center;
    color: black;
}

table.wikitable caption,
table.prettytable caption {
    margin-left: inherit;
    margin-right: inherit;
    font-weight: bold;
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

/* [[Template:Navbox]] and wide variant */

/* Default skin for navigation boxes. */
table.navbox {              /* Navbox style */
    border: 1px solid #aaa;
    color: black;
    width: 100%; 
    margin: auto;
    clear: both;
    font-size: 90%;
    text-align: left;
    padding: 1px;
}
table.navbox + table.navbox {
    margin-top:-1px;        /* single pixel border between adjacent navboxes */
}
.navbox, .navbox-subgroup {
    background: #f9f9f9;    /* Background color */
}
.navbox-title {             /* Title style */
    background: #ccccff;    /* Level 1 color */
    font-size:110%;
    text-align: center;      
    padding-left: 1em;
    padding-right: 1em;
    border:2px solid white;
}
.navbox-group {             /* Group style */
    background: #ddddff;    /* Level 2 color */
    font-weight: bold;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
    border-left:2px solid white;
    border-bottom:2px solid white;
}
.navbox .navbox-group a {
    white-space: normal;
}
.navbox-list {
    border-color: #f9f9f9;  /* Must match background color */
    padding-left: 7px;
    padding-right: 7px;
    padding-bottom: 5px;
}
.navbox-subgroup .navbox-title {
    background: #ddddff;    /* Level 2 color */
}
.navbox-subgroup .navbox-group {
    background: #e6e6ff;    /* Level 3 color */
    padding-bottom: 5px;
}
.navbox-subgroup .navbox-group a {
    white-space: normal;
}
.navbox-subgroup .navbox-list {
    background: transparent !important; 
}


@media print {
    .navbox {
        display: none;
    }
}

/* Disambig. */
#disambig {
    border-top: 1px solid #ccc; 
    border-bottom: 1px solid #ccc;
}

/* Background to make transparency show up on image description pages. */
#file img {background: url("") repeat;}


/* Light gray highlight on focus for search forms */
#p-search input:focus {
    background:#F9F9F9;
}

/* Colour the number of characters added/removed in the recent changes/ */
.mw-plusminus-pos {
    color: #006500;
}

.mw-plusminus-neg {
    color: #8B0000;
}

/* Display text below main article header, located at MediaWiki:tagline */
#siteSub {
    display: inline;
    font-size: 92%;
    font-weight: normal;
}

/* Change background of category bar */
#catlinks { 
    background: url() #F9F9F9 no-repeat 99.7% 65% !important;
}

/* Bold 'edit this page' link to encourage newcomers */
#ca-edit a {
    font-weight: bold !important;
}

/* Mark redirects in Special:Allpages and Special:Watchlist */
.allpagesredirect a {
    color: #888;
    font-style: italic;
}
.watchlistredir a {
    color: #888;
    font-style: italic;
}
.nowraplinks a { white-space: nowrap; }

/* Make MediaWiki:Newarticletext appear */
.mw-newarticletext {
    display: block !important;
}

/* Forum formatting -Algorithm & -Splaka */
.forumheader { 
    border: 1px solid #aaa; 
    background-color: #f9f9f9; 
    color: black;
    margin-top: 1em; 
    padding: 12px;
}
.forumlist td span { 
    display: block; 
    padding-left: 15px; 
    font-size: smaller;
}
.forumlist td span a,  { 
    text-decoration: none; 
}
.forumlist td span.forum_author { 
    padding-left: 30px; 
}
.forumlist td.forum_edited a { 
    text-decoration: none;
}
.forumlist td.forum_title a { 
    padding-left: 25px; 
}
.forumlist td.forum_title span a { 
    padding-left: 5px;
}
.forumlist td {
    padding:0;
}
.forumlist td.forum_title a.forum_new { 
    font-weight: bold; 
    background: url() no-repeat; 
    padding:2px 0 1px 25px; 
}
.sticky td.forum_title a.forum_new { 
    background-image: url(); 
} 
.forumlist td.forum_title a.forum_new:visited { 
    font-weight: normal; 
    background: none; 
}
.forumlist th.forum_title { 
    padding-left: 25px;
}
.archive td.forum_title a.forum_new { 
    font-weight: normal !important; 
    background: none !important; 
}

/* remove talk link from forum namespace (Monobook/Quartz/Monaco) -Splarka */
body.ns-110 #ca-talk, body.ns-110 #this_talk, body.ns-110 #page_tabs li+li  { 
    display: none;
}

/* Force default link colours in light-coloured backgrounds */
table.wikitable a, table.prettytable a, table.messagebox a, table.navbox a, div.forumheader a, image a {
    color: #002bb8 !important;
}
table.wikitable a:visited, table.prettytable a:visited, table.messagebox a:visited, table.navbox a:visited, div.forumheader a:visited, image a:visited {
    color: #5a3696 !important;
}
table.wikitable a:active, table.prettytable a:active, table.messagebox a:active, table.navbox a:active, div.forumheader a:active, image a:active {
    color: #faa700 !important;
}
table.wikitable a.new, table.prettytable a.new, table.messagebox a.new, table.navbox a.new, div.forumheader a.new, image a.new {
    color: #ba0000 !important;
}
table.wikitable a.new:visited, table.prettytable a.new:visited, table.messagebox a.new:visited, table.navbox a.new:visited, div.forumheader a.new:visited, image a.new:visited {
    color: #a55858 !important;
}

/* Other fixes for light-coloured backgrounds */
.diff-context, .diff-addedline, #anontalktext {
    color: black !important;
}

/* Force text wrapping in PRE tags */
pre {
    white-space: -moz-pre-wrap;  /* Mozilla, supported since 1999 */
    white-space: -pre-wrap;      /* Opera 4 - 6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    white-space: pre-wrap;       /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
    word-wrap: break-word;       /* IE 5.5+ */
}

/* Make the "Edit Similar" box all on single line and middle aligned */
.editsimilar_dismiss {
    margin-top:-1.7em;
}

#editsimilar_links {
    height:1.4em;
}

/* Make the AJAX checkbox not affect the page header's underline onload */
.firstHeading span, #ajaxRCtoggle {
    vertical-align:top;
}

/* Gives the "Fade to transparent" effect in table cells and DIV */
/* Used in conjunction with "background-color:<colour>" */
#gradient, .gradient, .gradient-horizontal { 
    background-image: url(); 
}

.gradient-vertical {
    background-image: url();
}

/* Overrides default colour for image borders -> "File:Example.png|border" */
img.thumbborder {
    border: 1px solid black !important;
}

/* Hide the "Category" header in the File namespace.  */
.ns-6 a#Category + h2 {
	display: none;
}

/* Hides configuration sections for dynamic templates (e.g. calculators). */
.jcConfig {
	display: none;
}

/* Hide edit button in article title */
.wikiaSkinMonaco .editsection-upper {
	display: none;
}

/* Name Hilites */
importScript('MediaWiki:common.css/hilite');

/* Gives the "Fade to transparent" effect in table cells and DIV */
/* Used in conjunction with "background-color:<colour>" */
#gradient, .gradient, .gradient-horizontal { 
    background-image: url(http://images1.wikia.nocookie.net/runescape/images/1/14/Gradient-1pixel-horizontal.png); 
}
 
.gradient-vertical {
    background-image: url(http://images3.wikia.nocookie.net/runescape/images/b/b4/Gradient-1pixel-vertical.png);
}

@import "/index.php?title=MediaWiki:Common.css/hilite&action=raw&ctype=text/css";