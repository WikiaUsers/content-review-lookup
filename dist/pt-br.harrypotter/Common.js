/***** CSS placed here will be applied to all skins on the entire site. *****/ /*
  */
 
 /*Make logo background transparent in Smoke/Slate skins*/
 .logoContainer { background-color: transparent!important; }
 
 /* Mark redirects in Special:Allpages and Special:Watchlist */
 .allpagesredirect { font-style: italic; }
 .watchlistredir { font-style: italic; }
 
 /* Messagebox templates */
  
 .messagebox {
 	clear:both;
 	width:85%;
 	margin:0px auto 3px auto;
 	padding:3px;
 	font-size:95%;
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
 
 /* in-universe and out-of-universe message boxes */
 .iumb, .ooumb { 
 	border-width: 0;
 	text-align:left;
 	padding: 0;
 }
 
 .iumb table, .ooumb table {
 	padding: 5px 10px 5px 10px;
 	background: transparent;
 	color: inherit;
 }
 
 .iumb table.hidable-content, .ooumb table.hidable-content {
 	padding: 0;
 }
 
 .iumb-icon, .ooumb-icon {
 	vertical-align: middle;
 	padding: 0;
 }
 
 .iumb-main, .ooumb-main {
 	padding: 0 0 0 10px;
 }
 
 .iumb-caption {
 	font-size: 1.3em;
 	font-weight: bold;
 }
 
 .ooumb-caption {
 	font-size: 1em;
 	font-weight: bold;
 }
 
 .iumb-comment {
 	font-size: 0.8em;
 }
 
 .iumb-hidable-button, .ooumb-hidable-button {
 	text-align: right;
 	margin: 0;
 	padding: 0 5px 0 0;
 	font-size: 0.8em;
 	vertical-align: bottom;
 }
 
 .iumb-table-container, .ooumb-table-container {
 	width: 100%;
 }
 
 .iumb p {
 	margin-top: 0;
 	margin-bottom: 0;
 }
 
 /* Infobox template styling */
 .infobox {
 	float: right;
 	clear: right;
 	margin: 0 0 .5em 1em;
 	width: 250px;
 	background: none;
 	border-collapse: collapse;
 	border-width: 0px;
 	font-size: 0.8em;
 	line-height: 1.5;
 }
 .infobox table.infoboxtable {
 	background:#f0f0f0;
 	float:right;
 	margin:0;
 	width:100%;
 	border-collapse:collapse;
 }
 .infobox td.infoboximage {
 	padding:0;
 	text-align:center; 
 }
 .infobox th.infoboxheading {
 	font-weight:bold;
 	text-align:center;
 	color:#ffffff;
 	font-size:larger;
 }
 .infobox th.infoboxsubheading  {
 	vertical-align:top;
 	text-align:left;
 	font-weight:normal; 
 }
 .infobox td.infoboxlabel, .infobox td.infoboxcell  {
 	vertical-align: middle;
 /*	border-top:1px solid #999;
 	border-bottom:1px solid #999; */
 }
 
  /* ugly hack to force normal height for infobox cells */
 .infoboxcell p { margin-top: 0px; margin-bottom: 0px; }
  /* .infoboxcell ul { list-style-type: disc; } */
 
 .infoboxcell ul {
 	 padding-left: 10px;
 	 margin-left: 10px;
 }
 
 .infoboxcell ul li {
 	 padding-left: 0;
 	 margin-left: 0;
 	 list-style-type: square;
 }
 
 .infobox div.plainlinks {
 	 color: #fff;
 }
 
 .infobox div.plainlinks a {
 	 color: #f0f0f0;
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
 	 font-weight: bold;
 	 background: url(https://images.wikia.nocookie.net/harrypotter/images/4/4e/Forum_new.gif) center left no-repeat;
 	 padding-left: 20px;
 }
 .forumlist td.forum_title a.forum_new:visited {
 	 font-weight: normal; background: none; padding-left: 20px;
 }
 .forumlist th.forum_title {
 	 padding-left: 20px;
 }
 
 /* Table styling, thins border */
 .wikitable {border-collapse:collapse;}
 
 /* Recent changes byte indicators */
 .mw-plusminus-pos { color: #006500; }
 .mw-plusminus-neg { color: #8B0000; }
 
 /* rounded corners */
 .rtop, .rbottom { display: block; padding: 0px; margin: 0px }
 .rtop *, .rbottom * { display: block; height: 1px; overflow: hidden; padding: 0px }
 .r1 {margin: 0 5px}
 .r2 {margin: 0 3px}
 .r3 {margin: 0 2px}
 .r4 {margin: 0 1px; height: 2px}
 /* end rounded corners */
 
 /* Color admin links differently (Orange) */
 ul.special li a[title="User:Caio1478"],
 table.mw-enhanced-rc td a[title="User:Caio1478"],
 ul.activityfeed li cite a[href="/wiki/User:Caio1478"],
 ul.special li a[title="User:MasterFer10"],
 table.mw-enhanced-rc td a[title="User:MasterFer10"],
 ul.activityfeed li cite a[href="/wiki/User:MasterFer10"] {
 	 font-weight: bold;
 	 color:#FF7F00;
 }
 
 /* Color Wikia differently (White) */
 ul a[title="User:Wikia"].mw-userlink {
 	 font-weight: bold;
 	 color:#660000;
 }
 /* The following makes the help text form MediaWiki:RecentChangesText show only for browsers that support the above */
 div.invisible { display: none; }
 div[id="color-admins"] { display: block; }
 
 .references-small { font-size: 0.85em; }
 
 /*
*/