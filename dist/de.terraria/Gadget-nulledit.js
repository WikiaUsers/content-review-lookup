mw.loader.using(['site']).done(function() {
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', "Nulledit", 'ca-null-edit', "Führe einen Nulledit dieser Seite durch", '2')).click(function() {
		if (!confirm("Dies wird die Seite neu laden. OK?")) return;
		new mw.Api().postWithToken('csrf',{action:"edit",title:mw.config.get("wgPageName"),appendtext:""}).done(function(data){
			location.reload();
		}).fail(function(code, data){
			alert("Konnte keinen Nulledit durchführen. Grund: " + code);
		});
	});
});