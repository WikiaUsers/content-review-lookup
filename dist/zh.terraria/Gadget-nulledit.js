mw.loader.using(['site']).done(function() {
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', "Null edit", 'ca-null-edit', "Null edit this page", '2')).click(function() {
		if (!confirm("This will reload the page. OK?")) return;
		new mw.Api().postWithToken('csrf',{action:"edit",title:mw.config.get("wgPageName"),appendtext:""}).done(function(data){
			location.reload();
		}).fail(function(code, data){
			alert("Could not perform null edit. Reason: " + code);
		});
	});
});