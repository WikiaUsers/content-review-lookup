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

function cbck (mutations) {
var $regular = $('.navb .wds-tab__content.wds-is-current').not(':has(.wds-tab__content.wds-is-current)');
$regular.css('grid-template-columns', '1fr 1fr 1fr 1fr');
$regular.css('justify-items', 'center');
}
$(function() {
	var tracked = document.querySelector('.navb .tabber.wds-tabber');
	if (tracked !== null) {
		var observer = new MutationObserver(cbck);
		var options = {
		childList: true,
		subtree: true, 
		attributeFilter: ["class"]
		}
	observer.observe(tracked, options);
	}
});

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