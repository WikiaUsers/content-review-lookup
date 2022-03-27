function fakeTOC() {
	$('.faketoc .toctitle h2').prepend(
		'<svg class="wds-icon wds-icon-tiny"><use href="#wds-icons-bullet-list-tiny"></use></svg>'
		);
}

fakeTOC();