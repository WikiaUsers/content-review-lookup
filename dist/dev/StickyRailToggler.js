(function () {
    if (window.StickyRailToggler) return;
    window.StickyRailToggler = true;
	$( '.right-rail-toggle' ).wrap('<div class="page-side-tools__wrapper right" style="left: 100%;"><div class="right-rail-toggle-wrapper" style="transform: translateX(-50%); top: 38px; right: 18px; margin-top: -18px; position: sticky;"></div></div>');
	$( '.right-rail-toggle-wrapper' ).after('<div class="page-side-tools__right" style="margin-top: 61px; position: sticky; top: 100px;"></div>');
})();