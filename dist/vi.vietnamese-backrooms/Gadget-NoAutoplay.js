const autopause = setInterval(() => {
	$('audio').get().forEach(e => e.pause());
	if ($('audio').get().length && $('audio').get().every(e => e.paused)) clearInterval(autopause);
}, 4);