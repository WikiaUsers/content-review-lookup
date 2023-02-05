/***** CSS placed here will be applied to all skins on the entire site. *****/
/* See also: [[MediaWiki:Monobook.css]] */
/* <pre> */

/* Mark redirects in Special:Allpages and Special:Watchlist */
.allpagesredirect { font-style: italic; }
.watchlistredir { font-style: italic; }

/* Infobox template style */
.infobox {
   border: 1px solid #aaaaaa;
   background-color: #f9f9f9;
   color: black;
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
}
.infobox.bordered .borderless td,
.infobox.bordered .borderless th {
   border: 0;
}

/* Forum formatting (by -Algorithm & -Splaka) */
.forumheader {
     border: 1px solid #aaa;
     background-color: #f9f9f9; margin-top: 1em; padding: 12px;
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
/* </pre> */