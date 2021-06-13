//================================================================
// [[Template:Игры]]
// СКРИПТ ТРЕБУЕТ АДАПТАЦИИ, либо удаления шаблона
// if ( $('.va-titleicons').length ) {
// 	var previewCount = $('.va-titleicons-preview > a').length;
// 	var fullsizeCount = $('.va-titleicons-fullsize-content > a').length;
	
// 	if (previewCount < fullsizeCount) {
// 		$('.va-titleicons-preview').addClass('va-titleicons-showmore');
// 	}

//     $('.va-titleicons').prependTo('.page-header__contribution > div:first-child');
//     $('.va-titleicons').show();
// }

//================================================================
// Блок «Новые статьи» //
// Лучше, конечно, переписать это на нормальный скрипт с запросом по API и адекватной отрисовкой
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