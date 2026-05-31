$(function(){
	if (
		$('#WikiaRail').length
		&& mw.config.values.wgCanonicalNamespace != 'Special'
		&& mw.config.values.wgCanonicalNamespace != 'MediaWiki'
	)
	$('<section class="rail-module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:RailModule&action=render');
});