window.BackToTopModern = true;

/* For [[Template:Haut_CPI]] - Miraculous Wiki (anglais - Template:Icons)*/
$(function () {
	var haut = $('#haut');
    if (haut.length) {
        $('.page-header__meta').after(haut);
        haut.show();
    }
});