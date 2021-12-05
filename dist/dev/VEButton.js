$( function() {
	var conf = mw.config.get([
    	'wgPageName',
    	'wgNamespaceNumber',
    	'wgPageContentModel',
	]);
	if ((conf.wgNamespaceNumber === 4) || (conf.wgNamespaceNumber === 10) || (conf.wgPageContentModel != 'wikitext')) return;
	if ((mw.user.options.get('editor') === "2") && (mw.user.options.get('editortype') === "2")) return;
	if (($('#p-cactions #ca-ve-edit').length === 0) && ($('#custom-ca-ve-edit').length === 0)) {
		$('#p-cactions > ul').prepend(
				$('<li>').prepend(
					$('<a>', {
						id: 'custom-ca-ve-edit',
						href: '/wiki/' + conf.wgPageName + '?veaction=edit',
						text: 'VisualEditor'
					})
				)
		);
		// use API to get the VE text
		/* new mw.Api().get({
			action: "query",
			format: "json",
    		meta: "allmessages",
    		ammessages: 'visualeditor-ca-ve-edit'
		}).done(function(data) {
			var ve = data.query.allmessages[0]['*'];
			$('#p-cactions > ul').prepend(
				$('<li>').prepend(
					$('<a>', {
						id: 'custom-ca-ve-edit',
						href: '/wiki/' + conf.wgPageName + '?veaction=edit',
						text: ve
					})
				)
			);
		});
		*/
	}
} );