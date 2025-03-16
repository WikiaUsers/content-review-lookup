/* Any JavaScript here will be loaded for all users on every page load. */
// The following code changes the background image of the page depending on the tag.
// Note: The order of code is important! It determines the priority of image in relation to the game.
$(function(){
function changingBackground() {
var body = document.getElementsByTagName("body")[0]
	if ($('.theme-patriot').length > 0) { // RS Patriots
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/rainbowsix/images/b/b3/Patriots_Art.jpg/revision/latest?cb=20250312160035&format=original)')}
	else if ($('.theme-vegas').length > 0) { // RS Vegas
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/rainbowsix/images/a/a3/Vegas_Cover_Art.jpg/revision/latest?cb=20250220221113&format=original)')}
    else if ($('.theme-vegas2').length > 0) { // RS Vegas 2
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/rainbowsix/images/0/05/Vegas_2_Cover_Art.jpg/revision/latest?cb=20250220220843&format=original)')}
	else if ($('.theme-psp').length > 0) { // RS Vegas (PSP)
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/rainbowsix/images/b/bc/Vegas_Cover_Art_2.jpg/revision/latest?cb=20250223200718&format=original)')}
    else { // If there is no tag, then main background
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/rainbowsix/images/0/08/Site-background-dark/revision/latest?cb=20250223160905&format=original)')}
}
$(changingBackground);
});

/* dev:AjaxRC configuration */
window.ajaxSpecialPages = [
	"RecentChanges",
	"Log",
	"Contributions"
];