/************************************************************/
/* this stylesheet applies to the new wikia / oasis skin    */
/* see also MediaWiki:Common.css and MediaWiki:Monobook.css */
/************************************************************/

/*******************************/
/* import MediaWiki:Common.css */
/*******************************/
@import url("/index.php?title=MediaWiki:Common.css&ctype=text/css&action=raw");

/***************************/
/* bug fixes for oasis.css */
/***************************/
/* broken links are once again red */
.newcategory { color: #BA0000 !important; }
/* css syntax highlighting has css property be black text on black background. this fixes it to be white on black */
.kw1 { color: rgb(255, 255, 255) !important; } 
/* wikia search has black text on gray background. this makes it yellow on gray */
.WikiaSearch input[type="text"] { color: #fec356 !important }
/* override the black background and give it transparency if it supports it */
.WikiaPageBackground { background: url("https://images.wikia.nocookie.net/__cb20101022055252/dragonage/images/e/e5/Gray24_80.png") !important; }
/* override the single brown border of the news */
.WikiaBlogListingBox .WikiaBlogListingPost { border-bottom: 1px solid #404040; }
/* override the new blog news listing which gives it one huge margin */
.WikiaBlogListingBox .WikiaBlogListingPost blockquote { margin: 0 0 0 5px !important; }
/* remove the black bar below the table of content */
.WikiHeader .shadow-mask { display: none; }
/* removes picture attribution, attribution in wiki pages is unnecessary, see the actual file for uploader */
.WikiaArticle .picture-attribution { display:none; }
/* gives all polls some padding on the right so it is no longer flush against the edge */
.ajax-poll .pollAnswer { padding-right: 2em !important; }
/* makes the user preference all fit within one line so it no longer overflows when gadgets tab is present */
.tabs li a { padding-left: 8px; padding-right: 8px; }
/* removes the dark background in preferences */
fieldset { background: inherit }
/* removes the white background and replaces it with the transparent da wiki background; changes colors to grey instead of dark grey */
.AdminDashboardChromedArticle { background: url("https://images.wikia.nocookie.net/__cb20101022055407/dragonage/images/1/13/Gray24_70.png"); color: rgb(192,192,192); }
/* fix the line under the navigation */
.WikiHeaderRestyle .shadow-mask { display: none !important }
/* frontpage fix */
.WikiaBlogListingBox ul, .wikia-slideshow ul { margin-left: 0 !important }
/* read more */
.RelatedPagesModule ul {  margin: 5px 0 15px !important }
/* lists */
.WikiaArticle dd { margin-left: 1.5em }
.WikiaArticle ul { margin: 0.4em 0 0.5em 1.5em; }
/* edit notice */
.editnotice { padding: 0.5em; font-size: 9pt; margin-top: 0.5em; margin-bottom: 0.5em; }
.editnotice-talk { font-size: 9pt; }
/* Gallery in categories */
.WikiaArticle ul.gallery { margin: 0em; }
li.gallerybox { border: 1px solid #464646; background: #0B0B0B; }
li.gallerybox > * > div.thumb { background: inherit }
/* History diff */
#pagehistory li.selected { background: #1d1d1d; border: 1px dashed #999 }
#pagehistory li { border: 0; }
span.autocomment { color: #AAA }
/* Edit notice */
.mw-custompreload ul, .mw-editnotice ul { margin-left: 1.5em; list-style: square }

/**********/
/* search */
/**********/
/*#WikiaSearch { border: 1px solid rgb(0, 0, 0); background: transparent; background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0.2) 0, black 100%); -moz-border-radius: 0.5em; -moz-box-shadow: 1px 1px 4px black; background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(0, rgba(0, 0, 0, 0.2)), color-stop(100%, black)); -webkit-border-radius: 0.5em; -webkit-box-shadow: 1px 1px 4px black; border-radius: 0.5em; box-shadow: 1px 1px 4px black; }
#WikiaSearch input[type="text"] { border: none; background-color: transparent; }
#WikiaSearch button { width: 25px; background: transparent; text-shadow: 1px 1px rgba(255, 255, 255, 0.3), -1px 0 rgba(0,0,0,0.3); color: rgb(190,124,1); -moz-user-select: none; -webkit-user-select: none; user-select: none; -moz-border-radius: 7px; -webkit-border-radius: 3px; border-radius: 3px; }
#WikiaSearch button:hover { background-image: -moz-linear-gradient(bottom, rgb(233,152,1) 0, rgb(254,210,129) 100%); background-image: -webkit-gradient(linear, 0% 100%, 0% 0%, color-stop(0, rgb(233,152,1)), color-stop(100%, rgb(254,210,129))); color: rgb(233,152,1); }
#WikiaSearch button img { position: absolute; top: 2px; left: 2px; } */

/**********/
/* forums */
/**********/
.forum_header { }
.forum_header>div:first-child { float: left; width: 56px; height: 56px; }
.forum_header>div:last-child { padding: 12px 0; }
.forum_header>div:last-child>div { width: 100%; border: 1px solid black; padding: 0.4em 0em 0.4em 0em; margin: 0; font-weight: bold; vertical-align: baseline; background: transparent; background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0.2) 0, black 100%); -moz-border-radius: 1em; -moz-box-shadow: 1px 1px 4px rgb(24, 24, 24); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(0, rgba(0, 0, 0, 0.2)), color-stop(100%, black)); -webkit-border-radius: 10px; -webkit-box-shadow: 1px 1px 4px rgb(24, 24, 24); border-radius: 10px; box-shadow: 1px 1px 4px rgb(24, 24, 24); }


/*************/
/* edit page */
/*************/
.editpage-editarea textarea,
textarea.csWikitext { color: #000000 !important; }
.editpage-editarea textarea, textarea.csWikitext { background-color: #FFFFFF !important; }

/* Userpage */
.WikiaUserPagesHeader { background: inherit }