$(function(){
	new mw.Api().loadMessagesIfMissing(['license-description']).done(function(){
		$('.license-description').html(mw.message('license-description', '<a href="https://www.fandom.com/licensing">CC BY-NC</a>').text());
	});
});