// Auto-refresh
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
//configurações do relógio
// dispõe um relógio de 24h seguido de dia, mês (pt-br)
// e ano com "(UTC)" no final
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{Janeiro;Fevereiro;Março;Abril;Maio;Junho;Julho;Agosto;Setembro;Outubro;Novembro;Dezembro}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		'u:dev:DisplayClock/code.js',
		'u:dev:LastEdited/code.js',
		'u:dev:DupImageList/code.js',
		'u:dev:FixMultipleUpload/code.js',
		'u:dev:LockOldBlogs/code.js',
		'u:dev:LockForums/code.js',
		'u:dev:AjaxRC/code.js',
		'u:dev:MessageBlock/code.js',
		'u:dev:YoutubePlayer/code.js',
		'u:dev:ExternalImageLoader/code.js',
		'u:dev:AjaxEmoticons/code.js',
		'u:dev:EditcountTag/code.js',
		'u:dev:WallGreetingButton/code.js',
		'u:dev:ExternalImageLoader/code.js',
		'u:dev:RevealAnonIP/code.js'
	]
});
 
/* mensagem de bloqueio automatica */
var MessageBlock = {
  title : 'Bloqueado',
  message : 'Você foi suspenso de Bullwort Academy por $2 pelo(s) seguinte(s) motivo(s): "$1"',
  autocheck : true
};
 
//LastEdited config
window.lastEdited = {avatar: false};