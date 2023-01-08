// **************************************
// Disable Rollback script from Dev Wiki
// **************************************
 
window.RollbackWikiDisable = true;
 
// *****************************************************
// Allow editing of rollback edit summary
// Requires CSS from MediaWiki:Rollback.js/Style.css
// ******************************************************
 
// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
 
importStylesheet("MediaWiki:Rollback.js/Style.css");
new function() {
    "use strict";
	$('.mw-rollback-link a, .mw-custom-rollback-link')
	    .after($('<span>')
	    .addClass('edit-rollback')
	    .prop('title', 'Edit rollback summary'));
	$('#mw-content-text').on('click', '.edit-rollback', function() {
		var $rollback = $('#rollback-summary');
		if ($(this).parent().is($rollback.parent())) {$rollback.toggle();} 
		else {$rollback.remove();
			var name = decodeURIComponent($(this).prev()
			.prop('href')
			.match(/&from=(.+)&token/)[Number(1)]
			.replace(/\+/g, ' '));
			$rollback = $('<div id="rollback-summary">')
			    .append($('<input type="text">')
			    .addClass('mw-ui-input rollback-text')
			    .prop({
			        maxlength: 250,
			        spellcheck: true
			    })
			    .val(
			          'Revert consecutive edits by [[Special:Cont'+
			           'ributions]]' + name + '|' + name + ']]'+
			           '([[User talk:' + name + '|talk]])'
			    ),
			$('<input type="button">')
			    .addClass(
			        'mw-ui-button mw-ui-constructive rollback-submit\
			        -button'
			    ).val('Rollback')).insertAfter(this)}
 
		// This puts the cursor at the end of the text
		
		var $text = $rollback.find('.rollback-text');
		var summary = $text.val(); $text.focus().val('').val(summary);});
	    $('#mw-content-text').on('click', '.rollback-submit-button', function() {
		var $link = $(this).closest('.mw-rollback-link');
		window.location = $link.find('a')
		                       .prop('href') + 
		                       '&summary=' + 
		                       encodeURIComponent($link
		                       .find('.rollback-text')
		                       .val());
	});
 
	/** Allow rollback to be submitted by pressing enter while focused on the 
	    input field **/
	    
	$('#mw-content-text').on('keypress', '.rollback-text', function(e) {
		if (e.which !== 13) {return}
		e.preventDefault();
		$('.rollback-submit-button').click();});
 
	// Close rollback if clicked anywhere else
	
	$(window).click(function(e) {
		if (!$(e.target).is('#rollback-summary, .edit-rollback') && 
		   !$('#rollback-summary').has(e.target).length)  {
		       $('#rollback-summary').hide();
		    }
	    }
)}();
 
// **********************************************
// Ask for user confirmation before rollbacking
// Really handy in case someone misclicks
// **********************************************
 
$("a.mw-rollback-link[data-action = 'rollback'],\
  .mw-custom-rollback-link").on('click', function(e) {
    var linkText = $(e.target).text(),
    count = linkText.match(/\d/) ? linkText.match(/\d+/)[0]: null,
    message = 'Rollback ' + (count ? count + ' edits': 'edit') + ' by ' + 
               mw.util.getParamValue('from', e.target.href) + '?';
    if(!confirm(message)) return e.preventDefault();
});