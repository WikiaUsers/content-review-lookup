
var total = 0;
var pc = 0;
var urls = [];
var formIndex;
var postContent=[];
var namespace="ModelData:";
function postToPage(u, content, cb, fi) {
	total = (content.length) * u.length;
        pc=0;
	urls = u;
	formIndex=fi;
	postContent=content;
	doPost(urls[0],0,postContent,cb);

}

function doPost(u, idx, content, cb) {
        
	var url = "/wiki/" + namespace + u;
	$.ajax({
		url: url + "?action=edit",
		dataType: "html",
		async: "true"
	}).always(function(data) {
		var postData = {
			'wpStarttime': $("input[name='wpStarttime']", $(data)).attr("value"),
			'wpSection': "",
			'wpEdittime': $("input[name='wpEdittime']", $(data)).attr("value"),
			'wpScrolltop': "",
			'wpAutoSummary': $("input[name='wpAutoSummary']", $(data)).attr("value"),
			'oldid': $("input[name='oldid']", $(data)).attr("value"),
			'wpTextbox1': postContent[0],
			'wpEditToken': $("input[name='wpEditToken']", $(data)).attr("value"),
		};
		if ($("#wpTextbox1", $(data)).prop("readonly") == undefined || $("#wpTextbox1", $(data)).prop("readonly") == false) {
			$.post(url + "?action=submit", postData).always(function(data) {
				pc++;
				//setStatus Posted (pc of total)
				updateSubProgress(pc/total);
				setStatus(formIndex,fileStatus.GOOD,"Posting...("+pc+" of "+total+")",postButtonState.DISABLED);
				if (postContent.length > 1) {
					postSubPage(1,idx,content,cb);
				} else {
					if (idx + 1 != urls.length) {
						setTimeout(function(){doPost(urls[idx+1],idx+1,postContent,cb)},10);
					} else {
						cb(1, "Posted!");
					}
				}
			});
		} else {
			cb(0, "Post failed - Permissions Error.");
		}


	});


}

function postSubPage(ci,ui,content,cb)
{
	var url = "/wiki/" + namespace + urls[ui] + 'p'+(ci+1);
					$.ajax({
						url: url + "?action=edit",
						dataType: "html",
						async: "true"
					}).always(function(data) {
						var postData = {
							'wpStarttime': $("input[name='wpStarttime']", $(data)).attr("value"),
							'wpSection': "",
							'wpEdittime': $("input[name='wpEdittime']", $(data)).attr("value"),
							'wpScrolltop': "",
							'wpAutoSummary': $("input[name='wpAutoSummary']", $(data)).attr("value"),
							'oldid': $("input[name='oldid']", $(data)).attr("value"),
							'wpTextbox1': postContent[ci],
							'wpEditToken': $("input[name='wpEditToken']", $(data)).attr("value"),
						};
						if ($("#wpTextbox1", $(data)).prop("readonly") == undefined || $("#wpTextbox1", $(data)).prop("readonly") == false) {
							$.post(url + "?action=submit", postData).always(function(data) {
								procSubPage(ci,ui,content,data,cb)
							});
						} else {
							cb(0, "Post failed - Permissions Error.");
						}
					});
	
}

function procSubPage(ci,ui,content,data,cb)
{
	pc++;
	updateSubProgress(pc/total);
	setStatus(formIndex,fileStatus.GOOD,"Posting...("+pc+" of "+total+")",postButtonState.DISABLED);
	if(ci+1 != content.length)
	{
		setTimeout(function(){postSubPage(ci+1,ui,content,cb)},10);
	}else{
		if(ui+1 != urls.length)
		{
			setTimeout(function(){doPost(urls[ui+1],ui+1,content,cb)},10);
		}else{
			cb(1, "Posted!");
		}
	}
	
}