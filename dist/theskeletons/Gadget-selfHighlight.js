// By Equazcion: http://theskeletons.fandom.com/User:TheSkull28870

$('#bodyContent a[href]').each(function(){
	var $this = $(this);
	if ($this.attr('href') == '/User:' + mw.config.get('wgUserName')){
		$this.addClass('self-highlight');
		$this.attr('style','background-color:#6ff !important');
	}
});