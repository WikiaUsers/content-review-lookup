/* Any JavaScript here will be loaded for all users on every page load. */

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 10;
/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[Wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:User_Avatar_Finder/code.js"
    ]
});
window.AddRailModule = [{prepend: true, maxAge: 0}];
mw.hook('messageWall.activated').add(function () {
const appContainer = document.querySelector('.message-wall-app');
const postsContainer = document.querySelector('.MessageWallForum');
const helloMessage = document.createElement('div');
helloMessage.textContent = 'Hello! Please be respectful.';
helloMessage.style.color = 'red';
helloMessage.style.padding = '10px';
helloMessage.style.border = '1px solid red';
helloMessage.style.margin = '0 0 12px';
appContainer.insertBefore(helloMessage, postsContainer);
})