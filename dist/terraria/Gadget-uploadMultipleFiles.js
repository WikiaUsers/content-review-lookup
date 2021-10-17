mw.loader.using(['site', 'mediawiki.util']).then(function() {
	if (mw.config.get("wgCanonicalSpecialPageName")!=="Upload"){
		return;
	}
	var l10nFactory = l10nFactory || function($lang, $data) {
		return function ($key) {
			// (null==undefined) is true,(null===undefined) is false
			return ($data[$lang] && $data[$lang][$key] != null) ? $data[$lang][$key] : $data.en[$key];
		};
	};

	var l10n = l10nFactory(mw.config.get( 'wgUserLanguage' ),{
		en: {
			multiupload: "Upload multiple files:",
			yes: "Yes",
			no: "No",
			sourcefiles: "Source files:",
			uploadfiles: "Upload files",
			nofiles: "Please select some files first.",
			nolicense: "Please select a valid license first.",
			summary: "Summary",
			license: "Licensing",
			uploading: "Uploading files...",
			uploaded: "Uploaded:",
			failed: "Failed:",
			done: "Done."
		}
	});
	
	$(function(){
		$("#wpUploadFile").parent().parent().addClass("regularFileSelect");
		console.log('start', l10n("sourcefiles"), $("#wpUploadFile").parent().parent());
		$("tr.regularFileSelect").before('<tr><td class="mw-label">'+l10n("multiupload")+'</td><td class="mw-input"><label><input type="radio" name="multipleFiles" value="'+l10n("yes")+'" /> '+l10n("yes")+'</label> &nbsp; <label><input type="radio" name="multipleFiles" value="'+l10n("no")+'" checked="" /> '+l10n("no")+'</label></td></tr>');
		$("tr.regularFileSelect").after('<tr class="multipleFileSelect" style="display:none;"><td class="mw-label">'+l10n("sourcefiles")+'</td><td class="mw-input"><input type="file" id="multiupload" multiple /></td></tr>');
		$("input[name='wpUpload']").addClass("regularFileSelect");
		$("#wpDestFile").parent().parent().addClass("regularFileSelect");
		$("#wpIgnoreWarning").parent().parent().addClass("regularFileSelect");
		$("input[name='wpUpload']").after('<input type="button" value="'+l10n("uploadfiles")+'" class="multipleFileSelect" style="display:none;" id="multiFileSubmit" />');
		$("input[name='multipleFiles']").change(function(){
			if (this.value===l10n("yes")) {
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
				alert(l10n("nofiles"));
				return false;
			}
			if ($("#wpLicense option:selected").val() === "" && !mw.config.get('UMFBypassLicenseCheck')) {
				alert(l10n("nolicense"));
				return false;
			}
			summary = $("#wpUploadDescription").val();
			if (summary !== "") summary = "== "+l10n("summary")+" ==\n"+summary;
			license = ($("#wpLicense option:selected").val() === "")?"":"\n== "+l10n("license")+" ==\n"+$("#wpLicense option:selected").prop("title");
			text = summary + license;
			watch = "preferences";
			if ($("#wpWatchthis").is(":checked")) watch = "watch";
			else watch = "nochange";
			curFile = 0;
			$("#firstHeading").text(l10n("uploading"));
			$("#mw-content-text").html("<h3>"+l10n("uploaded")+"</h3><ul></ul><div style='display:none;' id='multiUploadFailed'><h3>"+l10n("failed")+"</h3><ul></ul></div>");
			var gNF;
			gNF = function() {
				if(curFile>files.length) {
					$("#mw-content-text").append("<h3>"+l10n("done")+"</h3>");
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
			};
			gNF();
		});
	});
});