if (!window.StickyRailTogglerLoaded) {
  window.StickyRailTogglerLoaded = true;
	$( '.right-rail-toggle' ).wrap('<div class="page__side-tools-wrapper right" style="left: 100%;"><div class="right-rail-toggle-wrapper" style="transform: translateX(-50%); top: 48px; right: 18px; margin-top: -18px; position: sticky;"></div></div>');
	$( '.right-rail-toggle-wrapper' ).after('<div class="page-side-tools__right" style="margin-top: 63px; position: sticky; top: 112px;"></div>');
}