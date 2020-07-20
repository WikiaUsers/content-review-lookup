/* Any JavaScript here will be loaded for all users on every page load. */
importArticle({
    type: "style",
    article: "User:Peaskey/bitfont.css"
});

$(document).ready(function() {
	$("head").prepend('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"></style>');
});