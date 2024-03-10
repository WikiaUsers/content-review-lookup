mw.loader.using(['site']).done(function() {
	if (!(mw.config.get("wgAction") == "edit" || mw.config.get("wgAction") == "submit")) return;
	$("<div>").attr("id","weTopButtons").append("<br>").append($("#wpSaveWidget").clone()).append($("#wpPreviewWidget").clone()).append($("#wpDiffWidget").clone()).append("<br><br>").prependTo("#editform");
});