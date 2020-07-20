// <source lang="javascript">
// created by Curiouscrab
if(skin == 'monobook') {
	for(i=0; i<$('#p-tb a').length; i++) {
		if(document.getElementById('p-tb').getElementsByTagName('a')[i].search == '?printable=yes') {
			document.getElementById('p-tb').getElementsByTagName('a')[i].href = '#';
			document.getElementById('p-tb').getElementsByTagName('a')[i].id = 'printable';
		}
	}
}
if(skin == 'oasis') {
	$('#WikiaPageHeader .wikia-menu-button .WikiaMenuElement').append('<li><a id="printable">Print</a></li>')
}
$('#printable').each(function () {
	$(this).click(function () {
		$('.editsection, #togglelink, .toctoggle, .wikia-button, #siteSub, #contentSub, #catlinks, #jump-to-nav, #WikiaRail, #WikiHeader, #WikiaFooter, .global-footer, .wikia-menu-button, .talk, .header-tally, .header-title h2, #articleCategories, .WikiaArticleInterlang, #WikiaArticleBottomAd, #WikiaArticleFooter, #siteNotice').remove();
		$('a').css({'color':'inherit'});
		document.getElementsByTagName('body')[0].className='';
		if(skin == 'monobook') {
			$('body').html($('#globalWrapper').html($('#column-content').css({'margin':'0'})));
			$('#content').css({'marginLeft':'0','marginTop':'0','border':'none','borderRadius':'0'});
		}
		if(skin == 'oasis') {
			$('body').html($('#WikiaPage').css({'margin':'0','border':'0'})).css({'padding':'0'});
		}
		$('#mw-content-text').append('user: ' + (wgUserName || 'Anonymous') + '<br>url: ' + window.location.href);
	});
});
// </source>