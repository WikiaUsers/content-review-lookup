/* Any JavaScript here will be loaded for all users on every page load. */
var Start = 0;

//configuration for dev:WikiActivity.js
/* Added on 2020-10-25 by D4rkWzd */
window.rwaOptions = {
	limit: 50,
	namespaces: [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
	autoInit: true 
};

/* Expanding categories section by default */
$(function() {
    $('.page-footer__categories.wds-is-collapsed').removeClass('wds-is-collapsed');
});
/* End categories section */