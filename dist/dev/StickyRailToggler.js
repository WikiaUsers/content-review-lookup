(function () {
    if (window.StickyRailToggler) return;
    window.StickyRailToggler = true;
	$( '.right-rail-toggle' ).css({'top': '0', 'right': '50%', 'position': 'relative', 'margin-bottom': '9px', 'margin-left': 'auto'}).wrap('<div class="page-side-tools__wrapper__right" style="position: absolute; height: 100%; right: 0; padding: 18px 0; transform: translateX(50%); z-index: 1;"><div class="page-side-tools__right" style="top: 58px; position: sticky;"></div></div>');
})();