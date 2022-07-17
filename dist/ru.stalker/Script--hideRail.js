function hideRail() {
	if (mw.config.values.wgUserName === null) return;
	$('.page__right-rail:not(.is-rail-hidden)').addClass('is-rail-hidden');
}

$(hideRail);