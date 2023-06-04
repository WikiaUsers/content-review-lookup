/* start -- Random Background "randomBkgnd" */
importScript('MediaWiki:Common.js/randomBkgnd.js'); 
/* end -- Random Background "randomBkgnd" */
importArticles({
    type: "style",
    articles: [
        "w:c:dev:FontAwesome/code.css"
    ]
});
/* check for updates once in a while */
/* list of icons http://fontawesome.io/icons/ */
/* use like <span class="fa fa-camera" style="font-size:30px;color:green"></span> */
/* <span class="fa"></span> is necessary, add something like fa-camera (the icon) by looking at the website. style with style= but not super needed. */
/* Any JavaScript here will be loaded for all users on every page load. */
/* button no worky
importScriptPage('BackToTopArrow/code.js/black', 'dev');
var Speed = 650;
var Start = X;

topnavtoggle = {
	duration: "5s",
	msgcheck: 3000,
	text: {
		pin: "Click here to lock the navigation in place!",
		unread: "If this icon appears, then you have one or more unread messages!",
	}
 
}
*/
/* probs not this one either
importArticles({
	type: "script",
	articles: [
		"u:dev:Novasis14/code.js"
	]
});
*/

/*not using right now
importScriptPage('ExternalImageLoader/code.js', 'dev');
/*Example is  <br> {{ExternalImageLoader
|url = http://www.mycathatesyou.com/wp-content/gallery/gifs/6.gif
|align = right
|alt = Thats how I do it
|caption = Thats my cat
|link = http://dev.wikia.com/wiki/ExternalImageLoader/code.js
}} */

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});
/*Quickly see refs!*/
/* realised that this isn't what I wanted
importArticle({
  type: 'script',
  article: 'u:dev:ResponsiveSlider/code.js'
});
*/
/* your syntax is
<div class="jcarousel-wrapper">
    <div class="jcarousel">
        <div class="jcarousel-list">
       
            <!-- Content Item -->
            <div class="jcarousel-item">
                <div class="banner-image nomobile">
                    <!-- banner-box-left / banner-box-right -->
                    <div class="banner-box banner-box-left" {{#if:{{{width|}}}|style="width:{{{width}}}"}}>
                        <!-- Banner Title -->
                        <div class="name">[[{{{title}}}|{{{alt-title|{{{title}}}}}}]]</div>
                        <!-- Banner Subtitle -->
                        <div class="type Foleo">[[{{{section-link}}}|{{{section}}}]]</div>
                        <!-- Banner Description -->
                        <div class="quote">[[{{{title}}}|{{{cite}}}]]</div>
                    </div>
                    <!-- Image Slider -->
                    [[File:{{{image-file}}}|frameless|1700px|link={{{title}}}|{{{title}}}]]
                </div>
            </div>
            <!-- /Content Item -->
 
        </div>
    </div>
    <span class="jcarousel-control-prev">[[#|<span style="color:#888;text-decoration:none">&lsaquo;</span>]]</span>
    <span class="jcarousel-control-next">[[#|<span style="color:#888;text-decoration:none">&rsaquo;</span>]]</span>
    <p class="jcarousel-pagination"></p>
</div>
*/
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '13px',
    glowColor: '#FAFAD2',
    users: {
        'Nanoleopard201': 'Founder • Admin',
        '72e': 'Helldiver • Admin',
        'Kichuuni': 'Howler • Admin'
    }
};
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});