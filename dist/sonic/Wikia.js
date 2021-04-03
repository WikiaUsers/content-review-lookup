/**** Custom user tags ****/
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
window.archiveListTemplate = 'Archive';

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Taken from Wikipedia's Common.js.
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

//Signature check
var el ='~~' + '~~';
window.SignatureCheckJS = {
    noSignature: '1. It looks like you forgot to sign your reply. Use ' + el + ' to sign.\n',
    epilogue: '2. If you are just correcting your already signed post or fixing an issue in the talkpage, do not bother with this message.'
};

// *********************************************
// Fixing static GIF thumbnails
// *********************************************
window.DynamicImages = {
    gifGaleryImages: true,
    gifImages: false,
    svgGaleryImages: true
};

/**** Category buttons ****/
if ($("#CategorySelectAdd").hasClass("wikia-button secondary add")) {
    $("#CategorySelectAdd").addClass("wds-is-squished wds-button");
    $("#CategorySelectCancel").addClass("wds-is-squished wds-button");
    $("#CategorySelectSave").addClass("wds-is-squished wds-button");
}
if ($('.categories').children('li').length >= 56) {
    document.getElementById('articleCategories').style.backgroundSize = "190%"; 
}
//AddRailModule
window.AddRailModule = [{prepend: true}];

//Handling new navbox by @Luma.dash
window.setTimeout(function() {
var $container = $('.navb'), $imgBox = $('#contain');
if ($container) {
    $container.each(function() {
	    $(this).find('.desc').css({
        'border-top': '4px solid ' + $(this).css('border-left-color'),
    });
    	$(this).find('.tabbernav li').css ({
        'border-top': '6px solid ' +  $(this).css('border-left-color'), 
        'border-radius': '10px',
    });
	});
}
if ($imgBox) 
    $('#contain img').css('object-fit', 'contain');
}, 1000);

//By @fngplg
$(function() {
    // makes active tabber tab based on the pagename and tabber content    
    var $tabber = $('#navb .tabber');
    if (!$tabber.length) return;
    $(function(){
        setTimeout(function() {
            $tabber.find('.tabbertab').each(function() {
                var $this = $(this),
                    $selflink = $this.find('.selflink'),
                    target = $selflink.closest('.tabbertab').attr('title'),
                    $tab2activate = $this.closest('.tabber').find('.tabbernav>Li>a[title="' + target + '"]');
                $tab2activate.click();
            });// each .tabbertab
        }, 100);// settimeout
    });// doc.rdy    
});
/**** End of new navbox handling ****/

window.InactiveUsers = {
	 months: 4, 
	 text: 'Inactive',
};