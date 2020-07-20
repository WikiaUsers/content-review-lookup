/* Next chapter release countdown clock */

$(function() {

	// Takes the current month and year
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var month = monthNames[new Date().getMonth()];
	var year = new Date().getFullYear();
	    
	// Generates the countdown
	var countdown = '<div id="chapter-countdown"><span data-end="remove" data-options="no-leading-zeros" class="countdown" style="display: none;">Only <span class="countdowndate">' + month + ' 14 ' + year + ' 16:00:00 -0700</span> for the chapter\'s official release!</span></div>';
	    
	// Appends it to the <body> (to load before the Countdown script and as a standard initial placement)
	$('body').append(countdown);

	// Moves it to different places accordingly
	if (mw.config.get('wgNamespaceNumber') === 1201) { // Above message box in threads
	    $('.new-reply').prepend($('#chapter-countdown'));
	} else if (mw.config.get('wgNamespaceNumber') === 1200) { // Above message box in Message Walls
	    $('#chapter-countdown').prependTo($('#wall-new-message, .new-reply'));
	} else if (('#EditPageEditorWrapper').length) { // Below the Classic Editor
	    $('#EditPageEditorWrapper').prepend($('#chapter-countdown'));
	}

});

// Below Visual Editor
$('.wikia-menu-button').click(function() {
    setTimeout(function() {
        $('#WikiaArticle').prepend($('#chapter-countdown'));
    }, 7000);
});

// Above upload window
$('.upphotos').click(function() {
    setTimeout(function() {
        $('.modalContent').prepend($('#chapter-countdown'));
    }, 3000);
});