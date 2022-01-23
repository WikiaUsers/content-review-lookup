/* mw-tabber link fix [links containing "()"] */
window.addEventListener('load', function () {
	/* this is stupidly overspecifc to make sure it's only used for tabbers */
	/* .parent(), because the a element doesn't listen to clicks itself */
    $('.wds-tabs__tab[data-hash="'+ decodeURI(window.location.hash.replace(/\./gi, '%')).substr(1) +'"] > .wds-tabs__tab-label > a[href="#"]').parent().click();
});