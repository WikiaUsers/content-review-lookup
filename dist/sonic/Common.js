/**** Custom user tags ****/
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
window.archiveListTemplate = 'Archive';

//Handling new navbox by @Luma.dash
window.setTimeout(function() {
var $container = $('.navb'), $imgBox = $('#contain');
if ($container) {
    $container.each(function() {
	    $(this).find('.desc').css({
        'border-top': '4px solid ' + $(this).css('border-left-color'),
    });
	});
}
if ($imgBox) 
    $('#contain img').css('object-fit', 'contain');
}, 1000);
/**** End of new navbox handling ****/

window.InactiveUsers = {
	 months: 4, 
	 text: 'Inactive',
};

//Quote color auto-set 
$(function() {
if ($('.portable-infobox .pi-secondary-background').length > 0) {
	$(':root').css('--lquote-color', $('.portable-infobox .pi-secondary-background').css('background-color')); //set css variable to our custom accent color
}
else 
	return;
});

/*Handling content moderator FANDOM badges to match our color by @Luma.dash*/
function callback(mutations) { //handle content moderator badge color
$('span[title="Content Moderator"] svg path:first-child').attr('fill', '#ce2029');	
}
$(function() {
var namespace = mw.config.get('wgCanonicalNamespace');
if (namespace == "User_blog" || namespace == "Message_Wall") {
	var observer = new MutationObserver(callback);
	var Comm;
	if (namespace == "User_blog") { //in case it is a user blog
		Comm = document.querySelector('#articleComments');
	}
	else if (namespace == "Message_Wall") { //in case it is a message wall
	Comm = document.querySelector('#MessageWall');
	}
var option = {
	childList: true, 
	subtree: true
};
observer.observe(Comm, option);
}
});

/* correct 'page-header__page-subtitle' in order to link to the correct parent page of the sub-page in the talk namespace  */
/* until there's an official fix from FANDOM*/
/*by @Luma.dash */
$(function() {
if (mw.config.get('wgPageName').includes('/') == true && mw.config.get('wgCanonicalNamespace') == "Talk") { //if it is the "Talk" namespace
var back = document.querySelector('.page-header__page-subtitle a'); //and it is a sub page of the talk page, get the 'back' link
var arr = mw.config.get('wgPageName').split('/'); //split pagename based on forward slash
var val = arr[0]; //get first title before the first forward slash
for (var i = 1; i < arr.length - 1; i++) //check if there are sub of sub-pages
		val += "/" + arr[i]; //add full page name
var api = new mw.Api().get({ //check if the parent article exists
	action: 'query', 
	titles: [val] 
}).then(function(ret){ //ret is the returned object
		$.each(ret.query.pages, function(key, value) { //each 'page' is given as an object here (value) of (pages)
					if (value.missing == "") //No page is created, do end the function with
						back.href = "/wiki/" + val + "?action=edit&redlink=1"; //set href of the prev link to "Talk:PageName?action=edit&redlink=1"
					else { //if the parent page exists
						back.href = "/wiki/" + val; //set href of the prev link to "Talk:PageName"
						back.removeAttribute('class'); //make the link blue
					}
});
});
}
});