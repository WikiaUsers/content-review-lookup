@import "/index.php?title=MediaWiki:Common.css/hilite&action=raw&ctype=text/css";

/** CSS placed here will be applied to all skins */

/* wikitable/prettytable class for skinning normal tables <pre>*/

table.wikitable,
table.prettytable {
  margin: 1em 1em 1em 0;
  background: #f9f9f9;
  border: 1px #aaa solid;
  border-collapse: collapse;
  vertical-align:top;
}

table.wikitable th, table.wikitable td,
table.prettytable th, table.prettytable td {
  border: 1px #aaa solid;
  padding: 0.2em;
  vertical-align:top;
}

table.wikitable th,
table.prettytable th {
  background: #f2f2f2;
  text-align: center;
  vertical-align:top;
}

table.wikitable caption,
table.prettytable caption {
  margin-left: inherit;
  margin-right: inherit;
  font-weight: bold;
}

/* Messagebox templates */

.messagebox {
   border: 1px solid #aaa;
   background-color: #f9f9f9;
   width: 80%;
   margin: 0 auto 1em auto;
   padding: .2em;
}
.messagebox.merge {
   border: 1px solid #c0b8cc;
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

/* Wiki Header */

.WikiHeader {
background-image: url(http://images.wikia.com/gtawiki/images/d/d4/WikiHeaderBackground.png.png);
}

/* Infobox template style */

.infobox {
   border: 1px solid #aaa;
   background-color: #f9f9f9;
   color: black;
   margin-bottom: 0.5em;
   margin-left: 1em;
   padding: 0.2em;
   float: right;
   clear: right;
   font-size: 11px;
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

/* Big Tables */
.bigtable {
   background-color: #f8f8f8;
   border: 1px solid #aaa;
   color: black;
   margin-bottom: 0.5em;
   margin-left: 1em;
   padding: 0.2em;
   border-spacing: 25px 1px;
}
.bigtable th {
   font-size: 15px;
   text-align: left;
}
.bigtable td, .bigtable th {
   vertical-align: top;
   padding: 0 5px;
}
.bigtable td {
   background-color: #f8f8f8;
}

div.topicon {
  position:absolute; 
  z-index:100; 
  top:10px;
  display: block !important;
}

.interProject {
   display:none; 
   clear: both; 
   border-top: 2px dotted #AAAAAA; 
   margin-top: 2em;
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
        background-color: #ccf;
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

.lightlinks a { color:#CCE; }
.lightlinks a.new {color:#FBB!important;}
.darklinks a { color:#33A; }
.whitelinks a { color:#FFF; }
.whitelinks a.new {color:#FFF!important;}
.blacklinks a { color:#000; }
.underlinelinks a { text-decoration:underline; }
.boldlinks a {font-weight: bold;}

/*This hides the date field from the forum tag, when inside class=hidedate */
.hidedate .forum_edited{
display:none;
}



/* default skin for navigation boxes */
table.navbox {            /* navbox container style */
  border: 1px solid #aaa;
  width: 100%; 
  margin: auto;
  clear: both;
  font-size: 88%;
  text-align: center;
  padding: 1px;
}
table.navbox + table.navbox {  /* single pixel border between adjacent navboxes */
  margin-top: -1px;            /* (doesn't work for IE6, but that's okay)       */
}
.navbox-title,
.navbox-abovebelow,
table.navbox th {
  text-align: center;      /* title and above/below styles */
  padding-left: 1em;
  padding-right: 1em;
}
.navbox-group {           /* group style */
  white-space: nowrap;
  text-align: right;
  font-weight: bold;
  padding-left: 1em;
  padding-right: 1em;
}
.navbox, .navbox-subgroup {
  background: #fdfdfd;     /* Background color */
}
.navbox-list {
  border-color: #fdfdfd;   /* Must match background color */
}
.navbox-title,
table.navbox th {
  background: #ccccff;     /* Level 1 color */
}
.navbox-abovebelow,
.navbox-group,
.navbox-subgroup .navbox-title {
  background: #ddddff;     /* Level 2 color */
}
.navbox-subgroup .navbox-group, .navbox-subgroup .navbox-abovebelow {
  background: #e6e6ff;     /* Level 3 color */
}
.navbox-even {
  background: #f7f7f7;     /* Even row striping */
}
.navbox-odd {
  background: transparent; /* Odd row striping */
}
 
.collapseButton {          /* 'show'/'hide' buttons created dynamically by the        */
    float: right;          /* CollapsibleTables javascript in [[MediaWiki:Common.js]] */
    font-weight: normal;   /* are styled here so they can be customised.              */
    text-align: right;
    width: auto;
}
.navbox .collapseButton {  /* In navboxes, the show/hide button balances the vde links from */
    width: 6em;            /* [[Template:Tnavbar]], so they need to be the same width.      */
}

/* This just formats the centralised wikia help box on help pages */
.sharedHelp{
background-color:#FEE;
border-color:#F00;
margin-top:40px;
}

.sharedHelpInfo{
font-size:22px;
margin-right:200px;
border:1px solid red;
width:340px;
background-color:#FFF;
margin-bottom:30px;
font-weight:bold;
font-family:verdana, sans-serif;
}


/* Hide title and tagline on Main Page */
body.page-Main_Page h1.firstHeading, body.page-Main_page #siteSub { 
    display:none;
}

/* Recent changes byte indicators */
.mw-plusminus-pos { color: #006500; }
.mw-plusminus-neg { color: #8B0000; }