$('.faketoc').each( function (i) {
	$(this).prepend('<input type="checkbox" role="button" id="toctogglecheckbox' + i + '" class="toctogglecheckbox" style="display:none">');
	$(this).find('.toctitle h2').prepend('<svg class="wds-icon wds-icon-tiny"><use href="#wds-icons-bullet-list-tiny"></use></svg>');
	$(this).find('.toctitle').append('<span class="toctogglespan"><label class="toctogglelabel" for="toctogglecheckbox' + i + '"></label></span>');
});