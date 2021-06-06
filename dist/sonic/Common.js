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