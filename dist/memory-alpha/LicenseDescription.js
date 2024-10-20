$(function(){
	new mw.Api().loadMessagesIfMissing(['license-description-with-link']).done(function(){
		var licenseLink = '<a href="https://www.fandom.com/licensing">CC BY-NC</a>';
		$('.license-description').html(mw.message('license-description-with-link', licenseLink).text());
	});
});