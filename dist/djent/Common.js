/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
$(function () {
	const text = $('.page-header__title').text();
	$('.page-header__title').html(text+' MediaWiki:Common.js!');
}());