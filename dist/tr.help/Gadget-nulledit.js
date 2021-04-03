mw.loader.using(['site']).done(function() {
	if (!mw.config.get("wgIsProbablyEditable")) return;
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', "Boş düzenleme", 'ca-null-edit', "Bu sayfayı boş düzenle", '2')).click(function() {
		if (!confirm("Bu sayfayı yeniden yükleyecektir. Tamam mı?")) return;
		new mw.Api().postWithToken('csrf',{action:"edit",title:mw.config.get("wgPageName"),appendtext:""}).done(function(data){
			location.reload();
		}).fail(function(code, data){
			alert("Boş düzenleme gerçekleştirilemedi. Sebep: " + code);
		});
	});
});