$('.wattpad-embed').each(function() {
	var esc = mw.html.escape,
	$this = $(this);
	story = esc('' + $this.data('story-id'));
    $this.html('<iframe width="500" height="280" frameborder="0" allowfullscreen="" src="https://embed.wattpad.com/story/'+ story +'" ></iframe>');
});