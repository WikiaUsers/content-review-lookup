$(function(){
	var params = Object.fromEntries(new URLSearchParams(location.search));
	delete params.title;
	
	if (!params.diff && !params.oldid && mw.config.get('wgCurRevisionId') !== 0){
		params.oldid = mw.config.get('wgCurRevisionId');
	}
	
	var permalink = mw.config.get('wgServer') + mw.util.getUrl(mw.config.get('wgPageName'), params);
	$('#mw-content-text').append($('<div id="printfooter" class="print-only">Retrieved from "<a href="' + permalink + '">' + permalink + '</a>"</div>'));
});