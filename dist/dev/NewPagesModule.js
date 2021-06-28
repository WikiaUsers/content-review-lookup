mw.loader.using("mediawiki.api").then(
  function() {
    $(function(){
		$('<section class="rail-module new-pages-module"></section>')
			.appendTo('#WikiaRail')
			.load(mw.config.get("wgScriptPath") + '/index.php?title=Template:NewPagesModule&action=render');
		importArticle({
			type: 'style',
			article: 'u:dev:MediaWiki:NewPagesModule.css'
		});
	});
  }
);