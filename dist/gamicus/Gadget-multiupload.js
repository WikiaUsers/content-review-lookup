mw.loader.using(['site']).then(function() {
	if (mw.config.get("wgPageName")!=="Special:Upload") return;	
	$("#mw-htmlform-source tr:first-child").addClass("regularFileSelect");
	$("tr.regularFileSelect").before('<tr><td class="mw-label">Upload multiple files:</td><td class="mw-input"><label><input type="radio" name="multipleFiles" value="Yes" /> Yes</label> &nbsp; <label><input type="radio" name="multipleFiles" value="No" checked="" /> No</label></td></tr>');
	$("tr.regularFileSelect").after('<tr class="multipleFileSelect" style="display:none;"><td class="mw-label">Source files:</td><td class="mw-input"><input type="file" id="multiupload" multiple /></td></tr>');
	$("input[name='wpUpload']").addClass("regularFileSelect");
	$("#wpDestFile").parent().parent().addClass("regularFileSelect");
	$("#bodyContent fieldset:last-child").addClass("regularFileSelect");
	$("span.mw-htmlform-submit-buttons").append('<input type="button" value="Upload files" class="multipleFileSelect" id="multiFileSubmit" />');
	$("input[name='multipleFiles']").change(function(){
		if (this.value==="Yes") {
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
			alert("Please select some files first.");
			return false;
		}
		if ($("#wpLicense option:selected").val() === "") {
			alert("Please select a valid license first.");
			return false;
		}
		summary = $("#wpUploadDescription").val();
		if (summary !== "") summary = "== Summary ==\n"+summary;
		license = "== License ==\n"+$("#wpLicense option:selected").prop("title");
		text = summary + "\n" + license;
		curFile = 0;
		$("#firstHeading").text("Uploading files...");
		$("#mw-content-text").html("<h3>Uploaded:</h3><ul></ul><div style='display:none;' id='multiUploadFailed'><h3>Failed:</h3><ul></ul></div>");
		function gNF() {
			if(curFile>files.length) {
				$("#mw-content-text").append("<h3>Done.</h3>");
				return;
			}
	        if(files[curFile] === undefined) {
                curFile++;
                gNF();
                return;
	        }
			$.ajax({url:'/api.php',data:{action:'query',meta:'tokens',format:'json'},dataType:'json'}).done(function(data) {
				fd = new FormData();
				fd.append("action","upload");
				fd.append("token",data.query.tokens.csrftoken);
				fd.append("filename",files[curFile].name);
				fd.append("file",files[curFile]);
				fd.append("text",text);
				fd.append("ignorewarnings",1);
				fd.append("format","json");
				$.ajax({
					url:'/api.php',
					method:'POST',
					data:fd,
					cache:false,
					contentType:false,
					processData:false,
					type:'POST'
		      	}).done(function(d){
		      		$("#mw-content-text > ul").append('<li><a href="'+d.upload.imageinfo.descriptionurl+'" target="_blank">'+d.upload.filename+'</a></li>');
					curFile++;
					gNF();
		        }).fail(function(d) {
		        	$("#multiUploadFailed ul").append('<li>'+files[curFile].name+'</li>');
		        	$("#multiUploadFailed").show();
		        	curFile++;
		        	gNF();
		        });
		    });
		}
		gNF();
	});
});