importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'   /* Search Suggestions */
    ]
});
 
/* Disable Image Upload Pop-Ups */
$(document).ready(function() {
	$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
});
function PlaceholderLink() {
	$('.wikiaPlaceholder a').attr('href', '/wiki/Special:Upload').unbind('click');
}
$(PlaceholderLink);