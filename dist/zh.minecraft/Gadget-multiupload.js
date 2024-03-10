mw.loader.using(['site']).then(function () {
	i18n = {
		specialpage: "Special:上传文件",
		multiupload: wgULS(undefined,undefined,undefined,"批量上传：", "批量上傳：", "批量上載："),
		yes: "是",
		no: "否",
		sourcefiles: wgULS("源文件名：", "源檔名："),
		uploadfiles: wgULS(undefined,undefined,undefined,"上传文件", "上傳檔案", "上載檔案"),
		nofiles: wgULS(undefined,undefined,undefined,"请选择要上传的文件。", "請選取要上傳的檔案。", "請選取要上載的檔案。"),
		nolicense: wgULS("请选择适用的许可协议。", "請選取適用的授權條款。"),
		summary: "摘要",
		license: "许可协议",
		uploading: wgULS(undefined,undefined,undefined,"上传中……", "正在上傳……", "正在上載……"),
		uploaded: wgULS(undefined,undefined,undefined,"已上传：", "已上傳：", "已上載："),
		failed: wgULS(undefined,undefined,undefined,"上传失败", "上傳失敗", "上載失敗"),
		done: wgULS(undefined,undefined,undefined,"上传结束", "上傳結束", "上載結束"),
		comment: "Multiupload"
	};
	if (mw.config.get("wgPageName") !== i18n.specialpage) return;
	$("#wpUploadFile").parent().parent().addClass("regularFileSelect");
	$("tr.regularFileSelect").before('<tr><td class="mw-label">' + i18n.multiupload + '</td><td class="mw-input"><label><input type="radio" name="multipleFiles" value="' + i18n.yes + '" /> ' + i18n.yes + '</label> &nbsp; <label><input type="radio" name="multipleFiles" value="' + i18n.no + '" checked="" /> ' + i18n.no + '</label></td></tr>');
	$("tr.regularFileSelect").after('<tr class="multipleFileSelect" style="display:none;"><td class="mw-label">' + i18n.sourcefiles + '</td><td class="mw-input"><input type="file" id="multiupload" multiple /></td></tr>');
	$("input[name='wpUpload']").addClass("regularFileSelect");
	$("#wpDestFile").parent().parent().addClass("regularFileSelect");
	$("#wpIgnoreWarning").parent().parent().addClass("regularFileSelect");
	$("span.mw-htmlform-submit-buttons").append('<input type="button" value="' + i18n.uploadfiles + '" class="multipleFileSelect" style="display:none;" id="multiFileSubmit" />');
	$("input[name='multipleFiles']").change(function () {
		if (this.value === i18n.yes) {
			$(".regularFileSelect").hide();
			$(".multipleFileSelect").show();
		}
		else {
			$(".regularFileSelect").show();
			$(".multipleFileSelect").hide();
		}
	});
	$("#multiFileSubmit").click(function () {
		files = $("#multiupload")[0].files;
		if (files.length === 0) {
			mw.notify( i18n.nofiles, { title: comment } );
			return false;
		}
		if ($("#wpLicense option:selected").val() === "") {
			mw.notify( i18n.nolicense, { title: comment } );
			return false;
		}
		summary = $("#wpUploadDescription").val();
		if (summary !== "") {
			summary = "== " + i18n.summary + " ==\n" + summary;
			comment = i18n.comment + " " + summary.substring(0, 20);
		} else {
			comment = i18n.comment;
		}
		license = "== " + i18n.license + " ==\n" + $("#wpLicense option:selected").prop("title");
		text = summary + "\n" + license;
		watch = "preferences";
		if ($("#wpWatchthis").is(":checked")) watch = "watch";
		else watch = "nochange";
		curFile = 0;
		$("#firstHeading").text(i18n.uploading);
		$("#mw-content-text").html("<h3>" + i18n.uploaded + "</h3><ul></ul><div style='display:none;' id='multiUploadFailed'><h3>" + i18n.failed + "</h3><ul></ul></div>");
		function gNF() {
			if (curFile > files.length) {
				$("#mw-content-text").append("<h3>" + i18n.done + "</h3>");
				return;
			}
			if (files[curFile] === undefined) {
				curFile++;
				gNF();
				return;
			}
			$.ajax({ url: mw.util.wikiScript('api'), data: { action: 'query', meta: 'tokens', format: 'json' }, dataType: 'json' }).done(function (data) {
				fd = new FormData();
				fd.append("action", "upload");
				fd.append("token", data.query.tokens.csrftoken);
				fd.append("filename", files[curFile].name);
				fd.append("file", files[curFile]);
				fd.append("text", text);
				fd.append("watchlist", watch);
				fd.append("ignorewarnings", 1);
				fd.append("format", "json");
				fd.append("comment", comment);
				$.ajax({
					url: mw.util.wikiScript('api'),
					method: 'POST',
					data: fd,
					cache: false,
					contentType: false,
					processData: false,
					type: 'POST'
				}).done(function (d) {
					if ('error' in d) {
						$("#multiUploadFailed ul").append('<li>' + files[curFile].name + '：' + d.error.info + '</li>');
						$("#multiUploadFailed").show();
					}
					else {
						$("#mw-content-text > ul").append('<li><a href="' + d.upload.imageinfo.descriptionurl + '" target="_blank">' + d.upload.filename + '</a></li>');
					}
					curFile++;
					gNF();
				}).fail(function (d) {
					$("#multiUploadFailed ul").append('<li>' + files[curFile].name + '</li>');
					$("#multiUploadFailed").show();
					curFile++;
					gNF();
				});
			});
		}
		gNF();
	});
});