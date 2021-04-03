// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

$('#bodyContent a[href]').each(function(){
	var $this = $(this);
	if ($this.attr('href') == '/User:' + mw.config.get('wgUserName')){
		$this.addClass('self-highlight');
		$this.attr('style','background-color:#6ff !important');
	}
});