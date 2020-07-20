/* Any JavaScript here will be loaded for all users on every page load. */
function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=136718626364451&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}

$(fBox);


importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});