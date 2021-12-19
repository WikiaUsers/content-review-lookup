/* Modified version of https://dev.fandom.com/wiki/UploadMultipleFiles */
mw.loader.using(["site", "mediawiki.util"]).then(function() {
	if (mw.config.get("wgCanonicalSpecialPageName") !== "Upload")
		return;

	var l10nFactory = l10nFactory || function($lang, $data) {
		return function ($key) {
			// (null == undefined) is true, (null === undefined) is false
			return ($data[$lang] && $data[$lang][$key] != null) ? $data[$lang][$key] : $data.en[$key];
		};
	};

	const l10n = l10nFactory(mw.config.get("wgUserLanguage"), {
		en: {
			multiupload: "Upload multiple files:",
			yes: "Yes",
			no: "No",
			sourcefiles: "Source files:",
			categoryname: "Category name:",
			categorynamehint: "Page name of the category, e.g. Item images",
			categorynamespace: "Category",
			uploadfiles: "Upload files",
			nofiles: "Please select some files first.",
			nolicense: "Please select a valid license first.",
			summary: "Summary",
			license: "Licensing",
			categories: "Categories",
			uploading: "Uploading files...",
			uploaded: "Uploaded:",
			failed: "Failed:",
			done: "Done."
		}
	});

	const getUploadDescription = function() {
		var sections = [];

		var summary = $("#wpUploadDescription").val();
		var licenseDisplayName = $("#wpLicense option:selected").val();
		var categoryName = $("#multiFileCategory").val();

		if (summary !== "")
			sections.push(summary);

		if (licenseDisplayName !== "") {
			var licenseTemplateText = $("#wpLicense option:selected").prop("title");
			sections.push("== " + l10n("license") + " ==\n" + licenseTemplateText);
		}

		if (categoryName !== "")
			sections.push("[[" + l10n("categorynamespace") + ":" + categoryName + "]]");

		return sections.join("\n\n");
	};

	const getWatchlistPreference = function() {
		if ($("#wpWatchthis").is(":checked")) {
			return "watch";
		} else {
			return "nochange";
		}
	};
	
	$(function(){
		$("#wpUploadFile").parent().parent().addClass("regularFileSelect");
		$("tr.regularFileSelect").before('<tr><td class="mw-label">'+ l10n("multiupload") + '</td><td class="mw-input"><label><input type="radio" name="multipleFiles" value="'+ l10n("yes") + '" /> '+ l10n("yes") + '</label> &nbsp; <label><input type="radio" name="multipleFiles" value="'+ l10n("no") + '" checked="" /> '+ l10n("no") + '</label></td></tr>');
		$("tr.regularFileSelect").after('<tr class="multipleFileSelect" style="display:none;"><td class="mw-label">' + l10n("sourcefiles") + '</td><td class="mw-input"><input type="file" id="multiupload" multiple /></td></tr>');
		$("input[name='wpUpload']").addClass("regularFileSelect");
		$("#wpDestFile").parent().parent().addClass("regularFileSelect");
		$("#wpIgnoreWarning").parent().parent().addClass("regularFileSelect");

		// Append "category name" textbox to multiupload section
		$("#mw-upload-form #mw-htmlform-description tbody").append('<tr class="mw-htmlform-field-HTMLTextField multipleFileSelect" style="display:none;"><td class="mw-label"><label for="multiFileCategory"><abbr title="' + l10n("categorynamehint") + '">' + l10n("categoryname") + '</abbr></label></td><td class="mw-input"><input id="multiFileCategory" name="multiFileCategory" size="60"></td></tr>');

		$("input[name='wpUpload']").after('<input type="button" value="' + l10n("uploadfiles") + '" class="multipleFileSelect" style="display:none;" id="multiFileSubmit" />');
		$("input[name='multipleFiles']").change(function() {
			if (this.value === l10n("yes")) {
				$(".regularFileSelect").hide();
				$(".multipleFileSelect").show();
			} else {
				$(".regularFileSelect").show();
				$(".multipleFileSelect").hide();
			}
		});

		$("#multiFileSubmit").click(function() {
			var files = $("#multiupload")[0].files;

			// Cancel upload if no files are selected
			if (files.length === 0) {
				alert(l10n("nofiles"));
				return false;
			}
			// Cancel upload if no license is selected
			if ($("#wpLicense option:selected").val() === "" && !mw.config.get("UMFBypassLicenseCheck")) {
				alert(l10n("nolicense"));
				return false;
			}

			// Description is summary + license + category
			var description = getUploadDescription();
			var watch = getWatchlistPreference();

			$("#firstHeading").text(l10n("uploading"));
			$("#mw-content-text").html("<h3>" + l10n("uploaded")  + "</h3><ul></ul><div style='display:none;' id='multiUploadFailed'><h3>" + l10n("failed") + "</h3><ul></ul></div>");
			
			var currentFileIdx = 0;
			var uploadCurrentFile;
			uploadCurrentFile = function() {
				if (currentFileIdx > files.length) {
					$("#mw-content-text").append("<h3>"+ l10n("done") + "</h3>");
					return;
				}

				if (files[currentFileIdx] === undefined) {
					currentFileIdx++;
					uploadCurrentFile();
					return;
				}

				fd = new FormData();
				fd.append("action", "upload");
				fd.append("token", mw.user.tokens.get("editToken"));
				fd.append("filename", files[currentFileIdx].name);
				fd.append("file", files[currentFileIdx]);
				fd.append("text", description);
				fd.append("watchlist", watch);
				fd.append("ignorewarnings", 1);
				fd.append("format", "json");
				
				$.ajax({
					url: mw.util.wikiScript("api"),
					method: "POST",
					data: fd,
					cache: false,
					contentType: false,
					processData: false,
					type: "POST"
				}).done(function(d) {
					if (d.error == undefined) {
						$("#mw-content-text > ul").append('<li><a href="' + d.upload.imageinfo.descriptionurl + '" target="_blank">' + d.upload.filename + '</a></li>');
					} else {
						$("#multiUploadFailed ul").append('<li>' + files[currentFileIdx].name + '</li>');
						$("#multiUploadFailed").show();
					}
					currentFileIdx++;
					uploadCurrentFile();
				}).fail(function() {
					$("#multiUploadFailed ul").append('<li>' + files[currentFileIdx].name + '</li>');
					$("#multiUploadFailed").show();
					currentFileIdx++;
					uploadCurrentFile();
				});
			};
			uploadCurrentFile();
		});
	});
});