$(function(){
	new mw.Api().loadMessagesIfMissing(['custom-license-description']).done(function(){
		$('.license-description').html(mw.message('custom-license-description', '<a href="https://www.fandom.com/licensing">CC BY-NC</a>').text());
	});
});