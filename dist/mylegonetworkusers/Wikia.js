// Sharing Buttons
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
};
importScriptPage('SocialIcons/code.js','dev');

//Banner
$('#WikiHeader').after('<div id="siteNotification" style="text-align:center;background-color: rgb(192,206,45);background-image: -moz-linear-gradient(top,rgb(192,206,45) 0%,rgb(192,206,45) 100%);background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0%,rgb(192,206,45)),color-stop(100%,rgb(192,206,45)));background-image: -webkit-linear-gradient(top,rgb(192,206,45) 0%,rgb(192,206,45) 100%);background-image: -o-linear-gradient(top,rgb(192,206,45) 0%,rgb(192,206,45) 100%);background-image: -ms-linear-gradient(top,rgb(192,206,45) 0%,rgb(192,206,45) 100%);background-image: linear-gradient(to bottom,rgb(192,206,45) 0%,rgb(192,206,45) 100%);margin:-10px 0 10px;color:white;height:4em;"><br /><big><a href="http://mylegonetworkusers.wikia.com/wiki/User_blog:Agent_Spy/Wiki_inactive" style="color:white;">Please refer to this blog for the status of this wiki.</a></big></div>');

// Remove image attribution on picture thumbnails
$('.picture-attribution').remove();

importScriptPage( 'FastDelete/code.js', 'dev' );
var fdButtons = [];
fdButtons[fdButtons.length] = {
	'summary': 'spam',
	'label': 'spam'
};
fdButtons[fdButtons.length] = {
	'summary': 'the page was unneeded',
	'label': 'unneeded'
};
fdButtons[fdButtons.length] = {
	'summary': 'vandalism',
	'label': 'vandal'
};
 
// </source>
// RevealAnonIP
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['*']
};
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});