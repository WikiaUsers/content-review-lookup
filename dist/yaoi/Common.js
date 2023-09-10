//Link Preview: Shows the image of a page when a link is hovered over

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/yaoiboyslove/images/e/e6/Site-logo.png/revision/latest?cb=20210714142404e';
window.pPreview.defimage = 'https://static.wikia.nocookie.net/yaoiboyslove/images/e/e6/Site-logo.png/revision/latest?cb=20210714142404e';

(function () {
    
    "use strict";
    
    var choices = document.getElementsByClassName("js-choose");
    var options, i, j;
    for (i = 0; i < choices.length; i++) {
        options = choices[i].getElementsByClassName("js-option");
        for (j = 0; j < options.length; j++) {
            options[j].classList.remove("current");
        }
        options[Math.floor(Math.random() * options.length)].classList.add("current");
    }
    
})();

//Multi Upload: Allows Special:Upload to add multiple images all at once

window.MultiUploadoption = {
    max: 100
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UploadMultipleFiles.js',
        'u:dev:MediaWiki:CustomTools.js',
    ]
})

//Page Creator: Adds three options to the Toolbar to help with creating articles

mw.hook('dev.ct').add(function(addButtons) {
	addButtons([
		{
		link: 'https://yaoi.fandom.com/wiki/Special:Upload',
		placement: 'toolbar',
		text: 'Upload Image',
		},
		{
		link: 'https://yaoi.fandom.com/wiki/Module:Complete_Serialization',
		placement: 'toolbar',
		text: 'Serialization',
		},
		{
		link: 'https://yaoi.fandom.com/wiki/User_blog:Ph1i5-B0t/Wiki_Article_Headings',
		placement: 'toolbar',
		text: 'Guide',
		},
		{
		link: 'https://yaoi.fandom.com/wiki/Manga_Article_Creator',
		placement: 'toolbar',
		text: 'Article Creator',
		},
	]);
});