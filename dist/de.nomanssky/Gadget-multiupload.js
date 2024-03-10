mw.loader.using(['site', 'mediawiki.util']).then(function() {
	i18n = {
		multiupload: "Mehrere Dateien hochladen:",
		yes: "Ja",
		no: "Nein",
		sourcefiles: "Quelldateien:",
		uploadfiles: "Dateien hochladen",
		nofiles: "Bitte zuerst einige Dateien auswählen.",
		nolicense: "Bitte zuerst eine gültige Lizenz auswählen.",
		summary: "Zusammenfassung",
		license: "Lizenz",
		uploading: "Dateien hochladen...",
		uploaded: "Hochgeladen:",
		failed: "Fehlgeschlagen:",
		done: "Fertig."
	};
	if (mw.config.get("wgCanonicalSpecialPageName")!=="Upload") return;	
	$("#wpUploadFile").parent().parent().addClass("regularFileSelect");
	$("tr.regularFileSelect").before('<tr><td class="mw-label">'+i18n.multiupload+'</td><td class="mw-input"><label><input type="radio" name="multipleFiles" value="'+i18n.yes+'" /> '+i18n.yes+'</label> &nbsp; <label><input type="radio" name="multipleFiles" value="'+i18n.no+'" checked="" /> '+i18n.no+'</label></td></tr>');
	$("tr.regularFileSelect").after('<tr class="multipleFileSelect" style="display:none;"><td class="mw-label">'+i18n.sourcefiles+'</td><td class="mw-input"><input type="file" id="multiupload" multiple /></td></tr>');
	$("input[name='wpUpload']").addClass("regularFileSelect");
	$("#wpDestFile").parent().parent().addClass("regularFileSelect");
	$("#wpIgnoreWarning").parent().parent().addClass("regularFileSelect");
	$("input[name='wpUpload']").after('<input type="button" value="'+i18n.uploadfiles+'" class="multipleFileSelect" style="display:none;" id="multiFileSubmit" />');
	$("input[name='multipleFiles']").change(function(){
		if (this.value===i18n.yes) {
			$(".regularFileSelect").hide();
			$(".multipleFileSelect").show();
		}
		else {
			$(".regularFileSelect").show();
			$(".multipleFileSelect").hide();
		}
	});
	$("#multiFileSubmit").click(function() {
		files = $("#multiupload")[0].files;
		if (files.length === 0) {
			alert(i18n.nofiles);
			return false;
		}
		if ($("#wpLicense option:selected").val() === "" && !mw.config.get('UMFBypassLicenseCheck')) {
			alert(i18n.nolicense);
			return false;
		}
		summary = $("#wpUploadDescription").val();
		if (summary !== "") summary = "== "+i18n.summary+" ==\n"+summary;
		license = ($("#wpLicense option:selected").val() === "")?"":"\n== "+i18n.license+" ==\n"+$("#wpLicense option:selected").prop("title");
		text = summary + license;
		watch = "preferences";
		if ($("#wpWatchthis").is(":checked")) watch = "watch";
		else watch = "nochange";
		curFile = 0;
		$("#firstHeading").text(i18n.uploading);
		$("#mw-content-text").html("<h3>"+i18n.uploaded+"</h3><ul></ul><div style='display:none;' id='multiUploadFailed'><h3>"+i18n.failed+"</h3><ul></ul></div>");
		function gNF() {
			if(curFile>files.length) {
				$("#mw-content-text").append("<h3>"+i18n.done+"</h3>");
				return;
			}
			if(files[curFile] === undefined) {
				curFile++;
				gNF();
				return;
			}
			fd = new FormData();
			fd.append("action","upload");
			fd.append("token",mw.user.tokens.get('editToken'));
			fd.append("filename",files[curFile].name);
			fd.append("file",files[curFile]);
			fd.append("text",text);
			fd.append("watchlist",watch);
			fd.append("ignorewarnings",1);
			fd.append("format","json");
			$.ajax({
				url: mw.util.wikiScript('api'),
				method:'POST',
				data:fd,
				cache:false,
				contentType:false,
				processData:false,
				type:'POST'
			}).done(function(d){
				if (d.error == undefined) {
					$("#mw-content-text > ul").append('<li><a href="'+d.upload.imageinfo.descriptionurl+'" target="_blank">'+d.upload.filename+'</a></li>');
				}
				else {
					$("#multiUploadFailed ul").append('<li>'+files[curFile].name+'</li>');
				$("#multiUploadFailed").show();
				}
				curFile++;
				gNF();
			}).fail(function(d) {
				$("#multiUploadFailed ul").append('<li>'+files[curFile].name+'</li>');
				$("#multiUploadFailed").show();
				curFile++;
				gNF();
			});
		}
		gNF();
	});
});