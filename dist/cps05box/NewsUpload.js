/*
	to-do list:
	  1. output text if string is too big (actually, always do that)
	  2. fix the passed 'date' property
	  3. add an interface
	  4. include in the interface a progress bar
*/
$news = {};
$news.fn = {};
$news.data = {};
$news.errors = [];

/* data */

// languages text
$news.data.langs = {
	en: "English",
	pt: "Portugu\u00eas",
	fr: "Fran\u00e7ais",
	es: "Espa\u00f1ol",
	de: "Deutsch",
	ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
}

// swf files paths
$news.data.files = [ // this[i].text.replace(/ /g,"") -> results fragment of the wiki file name
	{pos: "front", file: "header", text: "Header"},
	{pos: "front", file: "navigation", text: "Navigation"},
	{pos: "front", file: "featureStory", text: "Feature Story"},
	{pos: "overlays", file: "featureMore", text: "Feature More"},
	{pos: "front", file: "supportStory", text: "Support Story"},
	{pos: "front", file: "upcomingEvents", text: "Upcoming Events"},
	{pos: "front", file: "newsFlash", text: "News Flash"},
	{pos: "front", file: "askAuntArctic", text: "Ask Aunt Arctic"}, // provide name switching
	{pos: "front", file: "dividers", text: "Dividers"},
	{pos: "back", file: "header", text: "Header"},
	{pos: "back", file: "navigation", text: "Navigation"},
	{pos: "back", file: "askAuntArctic", text: "Comics"},
	{pos: "back", file: "jokesAndRiddles", text: "Jokes and Riddles"},
	{pos: "back", file: "secrets", text: "Secrets"},
	{pos: "overlays", file: "secretOverlay", text: "Secret (overlay)"},
	{pos: "back", file: "dividers", text: "Dividers"},
	{pos: "back", file: "submitYourContent", text: "Submit Your Content"}
];

// licensing
$news.data.licensing = "== Licensing ==\n{{CPTimes}}";

// upload comment
$news.data.uploadComment = "Uploaded newspaper file";

/* functions */

// get current issue information
$news.fn.getCurr = function(onDone) {
	$.ajax({
		url: "http://media1.clubpenguin.com/play/en/web_service/game_configs/newspapers.jsonp?cb=" + new Date().getTime(),
		dataType: "jsonp",
		jsonpCallback: "cp_newspapers",
		success: function(data) {
			var a = data[0];
			onDone({
				date: (function(DATE) {var a = new Date(new Date(DATE).getTime() + 86400000);return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][a.getMonth()] + " " + a.getDate() + ", " + a.getFullYear();}(a.date)),
				issue: a.issue.match(/\d+$/)[0],
				path: a.path.match(/\d+$/)[0]
			});
		}
	});
}

$news.fn.upload = function(obj) {
	/*
	var obj = {
		issue: "451",
		path: "yyyymmdd",
		props: {}
	}
	*/
	if (typeof obj.filesArr !== "object") {
		obj.filesArr = [];
	}
	if (typeof obj.props === "undefined") {
		obj.props = {};
		for (var i in $news.data.langs) {
			for (var j in $news.data.files) {
				var filename = i.toUpperCase() + "News" + obj.issue + ($news.data.files[j].file == "secretOverlay" ? "SecretOverlay" : (function() {var a = $news.data.files[j].text.replace(/ /g,""); return a == "Comics" ? "AskAuntArcticBack" : a;}())) + ($news.data.files[j].file == "dividers" && $news.data.files[j].pos == "back" ? "Back" : "") + (["header","navigation"].indexOf($news.data.files[j].file) > -1 ? $news.data.files[j].pos.replace(/[fb]/, function(a) {return a.toUpperCase();}) : "") + ".swf";
				obj.filesArr.push(filename);
				obj.props[filename] = "http://media1.clubpenguin.com/play/v2/content/local/" + i + "/news/papers/" + obj.path + "/content/" + $news.data.files[j].pos + "/" + $news.data.files[j].file + ".swf";
			}
		}
	}
	function enc(s) {
		return encodeURIComponent(s);
	}
	var a = Object.keys(obj.props)[0],
		url = obj.props[a];
		window.Q_obj = obj; // DEBUGGING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	if (typeof a !== "undefined") {
		// there are still properties in 'obj'
		$.ajax({
			url: mw.util.wikiScript("api") + "?action=upload&filename=" + enc(a) + "&comment=" + enc($news.data.uploadComment) + "&text=" + enc($news.data.licensing) + "&token=" + enc(mw.user.tokens.get("editToken")) + "&url=" + enc(url),
			type: "POST",
			success: function(data) {
				console.info("Successfully uploaded " + a);
				//console.info(String(100 - Object.keys(obj.props).length/obj.filesArr.length*100).match(/\d+(\.\d{0,2})?/)[0] + "%");
				console.info(obj.props, Object.keys(obj.props).length, obj.filesArr.length);
				$("#newsupload-progress").val(String(String(obj.filesArr.length) - Object.keys(obj.props).length) + " / " + String(obj.filesArr.length)).css("background", "linear-gradient(to right, #dfd " + String((1 - Object.keys(obj.props).length / obj.filesArr.length) * 100) + "%, #ddd " + String((1 - Object.keys(obj.props).length / obj.filesArr.length) * 100) + "%)");
				delete obj.props[a];
				$news.fn.upload({
					issue: obj.issue,
					date: obj.date,
					path: obj.path,
					props: obj.props,
					filesArr: obj.filesArr
				});
			},
			error: function(data) {
				console.error("Failed to upload the file " + a + ". Error logs may be found in $news.errors");
				$news.errors.push({type: "upload_error", value: {filename: a, url: obj[a], response: data}});
				delete obj.props[a];
				$news.fn.upload({
					issue: obj.issue,
					date: obj.date,
					path: obj.path,
					props: obj.props,
					filesArr: obj.filesArr
				});
			}
		});
	} else {
		// all properties have been deleted
		console.info("Done!");
		console.info("Now start saving pages!");
		$news.fn.create(obj);
	}
}


// create page
$news.fn.create = function (a) {
	var date = new Date(a.path.match(/(\d+)(\d\d)(\d\d)$/).splice(1).join("/"));
		pageContent = encodeURIComponent('{{Newspaper2\n|issue= ' + a.issue + '\n|date= ' + (["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()) + '\n|ask= ' + "" + '\n}}');
	$.ajax({
		url: mw.util.wikiScript("api") + "?action=edit&titles=Club_Penguin_Times/" + a.issue + "&text=" + encodeURIComponent(pageContent) + "&summary=" + encodeURIComponent("test") + "&token=" + encodeURIComponent(mw.user.tokens.get("editToken")),
		type: "POST",
		success: function(data) {
			console.log("Success!");
		},
		error: function(data) {
			window.Q_publisherror = data;
			if (data.status == 756) {
				console.error("The request was too long. Please copy the content in the textarea and use it for creating the page");
			} else {
				console.error("An error occured while attempting to publish the page");
			}
		}
	}).always(function() {
		$("#newsupload-result").val(pageContent);
		$("#newsupload dt").html('<a href="/wiki/Club_Penguin_Times/' + a.issue + '">' + a.issue + '</a>');
	});
}

// main execution
$news.fn.exe = function() {
	// DEBUGGING START
	var fromCurr = $("#newsupload-current:checked").length == 1;

	// DEBUGGING END
	if (fromCurr) {
		// from current issue - get data and then create pages based on it
		$news.fn.getCurr($news.fn.upload);
	} else {
		// data from a different page
		var issue = $("#newsupload-issue").val(),
			date = $("#newsupload-date").val(),
			path = $("#newsupload-path").val();
		if (
			$.isArray(issue.match(/^\d+$/)) &&
			$.isArray(date.match(/^[A-Z][a-z]+ ([1-9]|[1-3][0-9]?), \d{4,}$/)) &&
			$.isArray(path.match(/^\d{4,}(0[1-9]|1[0-2])[0-3][0-9]$/))
		) {
			$news.fn.upload({
				issue: issue,
				date: date,
				path: path
			});
		} else {
			console.error("Your input is incorrect. Please check again your parameters");
			alert("Your input is incorrect. Please check again your parameters");
		}
	}
}

/* interface */

$("#mw-content-text").html(
	'<section id="newsupload">\n' +
		'\t<h3>News uploader wizard (beta)</h3>\n' +
		'\t<input type="checkbox" id="newsupload-current" checked /> <span class="help" title="Parameters with a * on them will be ignored if this box is checked">Upload from current Club Penguin Times issue</span><br />\n' +
		'\tIssue:* <input type="text" id="newsupload-issue" /><br />\n' +
		'\t<span class="explain" title="As \'MM DD, YYYY\', while specifying the month name (first letter uppercase)">Date:*</span> <input type="text" id="newsupload-date" /><br />\n' +
		'\t<span class="explain" title="As \'YYYYMMDD\', as for PST during 00:00 UTC, hence, the day before the update">Path date:*</span> <input type="text" id="newsupload-path" /><br />\n' +
		'\tAsk: <input type="text" id="newsupload-ask" value="Aunt Arctic" /><br />\n' +
		'\tComic or Ask section on the back:<br />\n' +
		'\t&nbsp;&nbsp;<input type="radio" name="newsupload-askcomic" value="ask" /> Ask Aunt Arctic (or other character)<br />\n' +
		'\t&nbsp;&nbsp;<input type="radio" name="newsupload-askcomic" value="comic" checked /> Comic<br />\n' +
		'\tProgress: <input type="text" id="newsupload-progress" disabled /><br />\n' +
		'\t<input type="button" id="newsupload-start" value="start" />\n' +
		'\t<h3>Output</h3>\n' +
		'\tIt is likely that the page\'s content will be too long. If that\'s the case, once loading is done, copy the following content to the page:\n' +
		'\t<dl><dt></dt></dl>\n' +
		'\t<textarea id="newsupload-result"></textarea>\n' +
		'\t<h3>Instructions</h3>\n' +
		'\t<ol>\n' +
			'\t\t<li>Leave the <span style="font-style: italic;">Upload from current Club Penguin Times issue</span> checkbox checked if you are interested in uploading the current issue.</li>\n' +
			'\t\t<li>Uncheck and fill the parameters with the asterisks (<span style="font-weight: bold;">*</span>) if you are uploading an old issue of the paper.</li>\n' +
			'\t\t<li>Modify the <span style="font-style: italic;">Ask</span> text field if the Ask section included a different character.</li>\n' +
			'\t\t<li>Switch the <span style="font-style: italic;">Comic or Ask section on the back</span> radio inputs if needed.</li>\n' +
			'\t\t<li>Hit <span style="font-style: italic;">start</span> to start uploading.</li>\n' +
		'\t</ol>\n' +
		'\tFor questions, requests or bug reports, please contact <a href="http://' + (location.origin == "http://archives.clubpenguinwiki.info" ? "archives.clubpenguinwiki.info" : "cps05box.wikia.com") + '/wiki/User_talk:Penguin-Pal">Penguin-Pal</a>\n' +
	'</section>'
);

$("#newsupload-start").click(function() {
	$news.fn.exe();
});


/* interface css */

mw.util.addCSS(
	'#newsupload {\n' +
		'\tbackground: #fafafa;\n' +
		'\tborder: 1px solid #ccc;\n' +
		'\tpadding: 4px;\n' +
		'\tborder-radius: 10px;\n' +
	'}\n' +
	'section#newsupload h3 {\n' +
		'\tmargin-top: 0;\n' +
	'}\n' +
	'#newsupload textarea {\n' +
		'\tresize: none;\n' +
	'}\n' +
	'#newsupload dl, #newsupload dt {\n' +
		'\tmargin: 0;\n' +
		'\tpadding-left: 5;\n' +
	'}\n' +
	'#newsupload dt:not(:empty) {\n' +
		'\tmargin: 3px 0;\n' +
	'}\n'
);


/*
$news.fn.upload({
  issue: "451",
  path: "20140702"
});
*/