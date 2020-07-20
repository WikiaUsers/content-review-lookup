
/*Nav Back*/
.WikiHeader > nav li.marked {
    background: url(https://vignette.wikia.nocookie.net/tobias-laboratory/images/a/af/DYqn0n1.png/revision/latest?cb=20150328231319) no-repeat;
    background-size: 100% 100%;
    height: 33px;
    border-radius: 0;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.7), 0 0 8px rgba(255, 255, 255, 0.9) !important;
}


/*Founder Colors*/

a[href$=":Photo_Negative_Mickey"],
a[href$="/Photo_Negative_Mickey"]{
    color: #00ffff !important;
    font-weight: bold !important;

/*Admin*/

a[href$=":Blackout1912"],
a[href$="/Blackout1912"]{
    color: #008080 !important;
    font-weight: bold !important;

/* borders of navigation submenu */
.WikiHeader .subnav {
background:#000000;
border: 3px solid #000000;
}
 
/* background, border color of each submenu item */
.WikiHeader .subnav li a {
background:#000080;
border: 1px solid #808000;
}
 
/* background color of each submenu item on mouse-over */
.WikiHeader .subnav li a:hover {
background:#00124d;
}
 
.navbackground .chevron, .navbackground div {
    display:none;
}

/* Selected Tab */
ul.tabs li.selected a {
    color: black !important;
    background: blue !important;
    border: 3px solid Black !important;
    border-bottom: none !important;
    border-radius: 4px 4px 0 0 !important;
}

/* Normal Tab; NOT selected */
ul.tabs li a {
    background: Blue !important;
    color: black !important;
    border: 2px solid Black !important;
    border-bottom: none !important;
}

/* Contents of the selected tab */
div.tabBody.selected {
    background: #222222 !important;
    color: Blue !important;
    border: 3px solid Black !important;
    border-radius: 0 0 8px 8px !important;
    padding: 5px !important;
    box-shadow: 3px 3px 6px Black;
}

/* tabber overrides*/
 
.tabberlive .tabbertab {
border: 3px #000 solid !important;
border-top:0 !important;
}
 
ul.tabbernav {
 border-bottom: 3px #000 solid !important;
 font: bold 14px Fixedsys, sans-serif !important;
}
 
ul.tabbernav li a:link { color: #FFFFFF!important; }
ul.tabbernav li a:visited { color: #FFFFFF!important; }
 
ul.tabbernav li.tabberactive a, ul.tabbernav li a:hover, ul.tabbernav li a {
color: #000000 !important; 
border: 3px #000000 solid !important;  
background-image: -moz-linear-gradient(
    center bottom,
    rgb(0, 0, 230) 0%,
    rgb(0, 0, 0) 100%) !important; 
background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0, rgb(0, 0, 0)),
    color-stop(1, rgb(0, 24, 34))) !important; 
}

body{ cursor: url('http://s17.postimg.org/nklc10xxn/inactive.png'), auto;
}

p:hover{ cursor: url('http://s17.postimg.org/o7k8qjutn/text.png'), text;
}

p:active{ cursor: url('http://s17.postimg.org/ylgh61q6j/phover.png'), text;
} 
a:hover{ cursor: url('http://s17.postimg.org/hidpaj9hn/ahover.png'), pointer;
}
a:active{ cursor: url('http://s17.postimg.org/hidpaj9hn/ahover.png'), pointer;
}

/**************/
/* Link hover */
/**************/
a:hover {
	text-shadow: #000000 0 0 3px;
    color: #FF0000 !important;
	text-decoration:none;
	-webkit-transition: all .4s linear 0s;
	-moz-transition: all .4s linear 0s;
	-ms-transition: all .4s linear 0s;
	-o-transition: all .4s linear 0s;
	transition: all .4s linear 0s;

}

/* Rounded Avatars */
.ChatModule .avatar {
    border-radius: 10px !important;
}

.WikiaArticle h2 {
background: #6514ff;
border-radius: 10px; }

.WikiaArticle h3 {
background: #333399;
border-radius: 8px; }

.WikiaArticle h4 {
background: #333399;
border-radius: 6px; }

.WikiaArticle h3 {
	clear: both;
}
.WikiaArticle h1 .mw-headline {
	margin-left: 10px;
}
.WikiaArticle h2 .mw-headline {
	margin-left: 8px;
}
.WikiaArticle h3 .mw-headline {
	margin-left: 6px;
}
.WikiaArticle h2 .editsection,
.WikiaArticle h3 .editsection,
.WikiaArticle h4 .editsection {
	background: url("https://images.wikia.nocookie.net/dragonage/es/images/1/1d/Sprite-pencil.png") no-repeat 10px , url("https://images.wikia.nocookie.net/__cb29806/common/skins/oasis/images/checkers.png") repeat, #003333;
	display: block;
	float: right;
	height: 18px;
	line-height: 18px;
	margin: 9px 7px 0;
	max-width: 25px;
	min-width: 25px;
	padding-right: 10px;
}
.WikiaArticle h3 .editsection {
	margin: 4px 7px 0;
}
.WikiaArticle h4 .editsection {
	border-bottom: none;
	border: dotted 1px #000;
	margin: 3px 7px 0;
}
.WikiaArticle h2 .editsection a,
.WikiaArticle h3 .editsection a,
.WikiaArticle h4 .editsection a {
	display: none;
}
.WikiaArticle h2 .editsection: hover a,
.WikiaArticle h3 .editsection: hover a,
.WikiaArticle h4 .editsection:hover a {
	display: block;
}
.WikiaArticle h2 .editsection: hover,
.WikiaArticle h3 .editsection: hover,
.WikiaArticle h4 .editsection:hover {
	background-image: url("https://images.wikia.nocookie.net/__cb29806/common/skins/oasis/images/checkers.png");
	max-width: 150px;
	padding-right: 0;
}
.WikiaArticle .editsection {
	-moz-border-radius: 10px 10px 0 0;
	-webkit-border-top-left-radius: 10px;
	-webkit-border-top-right-radius: 10px;
	background: #000;
	border-radius: 10px 10px 0 0;
	height: 20px;
	line-height: 19px;
	margin: 2px auto auto 15px;
}
.WikiaArticle .editsection:hover {
	background: #333333;
}
.WikiaArticle .editsection a {
	color: #191509;
	font-size: 85%;
	padding: 0 12px 3px 0;
	text-decoration: none;
}
.WikiaArticle .editsection img {
	vertical-align: middle;
}
.WikiaArticle .sprite.edit-pencil {
	margin: -3px 5px 0 10px;
}
.WikiaArticle h1,
.WikiaArticle h2 {
	margin-top: 0px;
	padding-top: 0px;
}

/*Edit Button Section {{w:c:es.gta}}*/
/** Selecting the Edit button will display and appears the Edit Section **/
.WikiaArticle h2 .editsection:hover, .WikiaArticle h3 .editsection:hover, .WikiaArticle h4 .editsection:hover {
    max-width:150px;
    padding-right:0px;
    background-image: url("https://images.wikia.nocookie.net/__cb29806/common/skins/oasis/images/checkers.png");
   -moz-transition: padding 0.5s linear;
   -webkit-transition: padding 0.5s linear;
   -ms-transition: padding 0.5s linear;
   -o-transition: padding 0.5s linear;
}
 
/** Change the edit section by the gray color **/
.WikiaArticle .editsection:hover { 
    background: #333333; 
}
 
/** "Edit Section" link **/
.WikiaArticle .editsection a { 
    color:#191509;
    text-decoration:none;  
    padding: 0px 12px 3px 0px;
    font-size:85%;
}
 
.WikiaArticle .editsection img {
    vertical-align: middle;
}
 
/** pencil image **/
.WikiaArticle .sprite.edit-pencil {
    margin: -3px 5px 0 10px;
}

/* Logo */
/* Logo Rotation */
 
.WikiHeader .wordmark {
    -moz-transform: rotate(0deg) scale(1) skew(180deg) translate(0px);
    -moz-transition: All 0.6863s ease;
    -ms-transform: rotate(0deg) scale(1) skew(180deg) translate(0px);
    -ms-transition: All 0.6863s ease;
    -o-transform: rotate(0deg) scale(1) skew(180deg) translate(0px);
    -o-transition: All 0.6863s ease;
    -webkit-transform: rotate(0deg) scale(1) skew(180deg) translate(0px);
    -webkit-transition: All 0.6863s ease;
    transform: rotate(0deg) scale(1) skew(180deg) translate(0px);
    transition: All 0.6863s ease;
    color: #708090;
    font-weight: bold;
    margin-bottom: 10px;
    width: 250px;
    word-wrap: break-word;
}
 /* Logo Rotation */
 
.WikiHeader .wordmark:hover {
    -webkit-transform: rotate(1deg) scale(1.090) skew(180deg) translate(0px);
    -moz-transform: rotate(1deg) scale(1.090) skew(180deg) translate(0px);
    -ms-transform: rotate(1deg) scale(1.090) skew(180deg) translate(0px);
    -o-transform: rotate(1deg) scale(1.090) skew(180deg) translate(0px);
    transform: rotate(1deg) scale(1.090) skew(180deg) translate(0px);
}

/* Main Page Headers */
 
.heading {
   background: url('http://i.imgur.com/NxzCkeQ.png') repeat-x;
   color: white;  
   font-size:120%; 
   font-family: 'Clarendon'; 
   padding:5px 5px 5px; 
   border-top-left-radius:5px; 
   border-top-right-radius:5px; 
   font-weight:normal; 
   text-align:center;
   background-position: top left;
   width:100%;
   /* border:1px solid #ee7a06; */
}

/***** Module background without URL, just made by wiki colors code *****/
/***** Don't used right now because we're testing if the users like *****/
/*****       the design of the modules with a URL Background.       *****/

/*
.WikiaArticleInterlang,
.WikiaRail .module {
   background: #000000;
   background-image:-moz-linear-gradient(19% 75% 90deg,#800000, #D60404, #000000 100%);
   background-image:-webkit-gradient(linear, 0% 0%, 0% 100%, from(#800000), to(#000000), color-stop(.6,#D60404));
   background-image:-webkit-gradient(linear, 0% 0%, 0% 100%, from(#800000), to(#000000), color-stop(.6,#D60404));
   color:white;
   border-radius:10px;
   border:none;
   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8C0000', endColorstr='#8C0000',GradientType=0 );
   opacity: 0.8 !important;
}
.WikiaRail .module a {
   color:White;
   font-weight:Insula;
}
*/

/* Code for the wiki main page                 */
/*    ul.tabbernav = navigation tab            */
/*    li.tabberactive = active tab             */
.mainpage ul.tabbernav {
 border-bottom: 0px solid !important;
 font: normal 14px Helvetica, Arial, sans-serif !important;
 padding: 10px 0px !important;
 border-top: 5px solid #8B0000;
}
 
.mainpage ul.tabbernav li {}
 
.mainpage ul.tabbernav li a {
 padding: 10px 10px !important;
 margin-left: 0px !important;
 border: 0px solid !important;
 background: #000 !important;
}
 
.mainpage ul.tabbernav li a:link { color: #8B0000 !important; }
.mainpage ul.tabbernav li a:visited { color: #8B0000 !important; }
 
.mainpage ul.tabbernav li a:hover {
 background-color: #8B0000 !important;
 border-color: transparent !important;
 color: #000 !important;
}
 
.mainpage ul.tabbernav li.tabberactive a {
 color:#000 !important;
 font-weight:normal !important;
 border: 0px solid #D9D9D9 !important;
 border-bottom: 1px solid #fff !important;
 background-color: #8B0000 !important;
}
 
.mainpage ul.tabbernav li.tabberactive a:hover {
border: 0px solid #D9D9D9 !important;
border-bottom: 0px solid #000 !important;
}
 
.mainpage .tabberlive {
 width: 100% !important;
}
.mainpage .tabberlive .tabbertab {
 border:0px solid #D9D9D9 !important;
 border-top:0 !important;
}
 
/* Styles to the custom windows */
 
.mainpage .tab-item-avatar {
float:left;width:48px;margin:20px 10px 0px 10px;}
 
.mainpage .tab-item-title {
font-size:22px;padding-top:20px;margin:5px 0px -5px 0px
}
 
.mainpage .tab-item-content {
margin: 0px 0px 0px 10px;border-bottom:1px solid #ccc;
}

/* Editor Spell [[w:c:onceuponatime]] */
div.loading-message {
   letter-spacing: 1.5px;
   text-transform: uppercase;
}
#EditPageEditor .loading-indicator .loading-message .loading-throbber {
   background-image: url(http://loadinggif.com/images/image-selection/32.gif) !important;
   background-size: 140px 152px !important;
   background-repeat:no-repeat !important;
   background-position:top center;
   background-color:transparent;
   overflow:visible;
   height:200px !important;
   width: 600px !important;
}


/* Used on the main page to ilumenate specific images */
.portal_mini-section_ring {
    margin: -3px 0 0.5em;
    padding-left: 8px;
}
.portal_mini-section_ring img {
    opacity: .60;
    -khtml-opacity: .60;
    -moz-opacity: .60;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";
    filter: alpha(opacity=60);
}
 
.portal_mini-section_ring img:hover {
    opacity: 1;
    -khtml-opacity: 1;
    -moz-opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
}