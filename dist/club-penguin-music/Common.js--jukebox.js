/* <syntaxhighlight lang="javascript">

if (["Club_Penguin_Music_Wiki:JukeBox", "JukeBox", "Club_Penguin_Music_Wiki", "Template:Mainpage-content"].indexOf(mw.config.get("wgPageName")) > -1) {

JukeBox = {};
JukeBox.fn = {};
JukeBox.fn.search = function() {
	$("nav#jukebox #jukebox-list li").removeClass("odd").hide();
	$("nav#jukebox #jukebox-list li").each(function() {
		if ($(this).text().toLowerCase().indexOf($("nav#jukebox input#jukebox-search-val").val().toLowerCase()) === 0) {
			$(this).show();
			if ($('nav#jukebox #jukebox-list li[style="display: list-item;"]').length % 2 == 1) {
				$(this).addClass("odd");
			}
		}
	});
}
$(document).ready(function() {
	jukebox = {};
	jukebox.playlistPage = "MediaWiki:Common.js/jukebox.js/json.css";
	jukebox.json = null;
	jukebox.init = function() {
		var a = Object.keys(jukebox.json),
			b = [];
		for (var i = 0; i < a.length; i++) {
			b.push('<li data-id="' + a[i] + '"' + (i == 0 ? ' class="selected"' : '') + '>' + jukebox.json[a[i]] + '</li>');
			if (i + 1 == a.length) {
				jukebox.list = b.join("\n");
				$("nav#jukebox #jukebox-list > ul").html("\n" + jukebox.list + "\n");
				$('nav#jukebox #jukebox-list li:even').addClass("odd");
				$("nav#jukebox #jukebox-list ul li").click(function() {
					$("nav#jukebox #jukebox-list ul li.selected").removeClass("selected");
					$(this).addClass("selected");
					$("nav#jukebox #jukebox-controls embed").replaceWith(
						'<embed src="' +
						($("nav#jukebox #jukebox-controls embed").attr("src").length > 0 ? "http://media1.clubpenguin.com/play/v2/content/global/music/" + $(this).attr("data-id") + ".swf" : "") +
						'" data-src="' +
						"http://media1.clubpenguin.com/play/v2/content/global/music/" + $(this).attr("data-id") + ".swf" +
						'" type="application/x-shockwave-flash" oncontextmenu="return false;" \/\>'
					);
					$("#jukebox-info #jukebox-info-current").html('<span>Current song:</span> ' + $(this).text());
					$("#jukebox-info #jukebox-info-id").html('<span>Song ID:</span> ' + (String(Number($(this).attr("data-id"))) == "NaN" ? "None" : $(this).attr("data-id")));
				});
				$("input#jukebox-controls-play").click(function() {
					if ($("nav#jukebox #jukebox-controls embed").attr("src").length == 0) {
						$("nav#jukebox #jukebox-controls embed").replaceWith(
							'<embed src="' +
							$("nav#jukebox #jukebox-controls embed").attr("data-src") +
							'" data-src="' +
							$("nav#jukebox #jukebox-controls embed").attr("data-src") +
							'type="application/x-shockwave-flash" oncontextmenu="return false;" \/\>'
						);
					}
				});
				$("input#jukebox-controls-stop").click(function() {
					if ($("nav#jukebox #jukebox-controls embed").attr("src").length > 0) {
						$("nav#jukebox #jukebox-controls embed").replaceWith(
							'<embed src="" ' +
							'" data-src="' +
							$("nav#jukebox #jukebox-controls embed").attr("src") +
							'" type="application/x-shockwave-flash" oncontextmenu="return false;" \/\>'
						);
					}
				});
				$("nav#jukebox input#jukebox-search-val").on("keyup", function() {
					JukeBox.fn.search();
				});
				$("nav#jukebox #jukebox-search-clr").click(function() {
					$("nav#jukebox #jukebox-list li").show();
				});
				$("nav#jukebox #jukebox-search-go").click(function() {
					JukeBox.fn.search();
				});
			}
		}
	}
	$.getJSON("/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=" + encodeURIComponent(jukebox.playlistPage) + "&cb=" + new Date().getTime(), function(data) {
		var json;
		for (var pageid in data.query.pages) {
			try {
				json = JSON.parse(data.query.pages[pageid].revisions[0]["*"]);
				jukebox.json = json;
				jukebox.init();
			} catch(err) {
				$("nav#jukebox").html('<code style="font-size: 20px; font-weight: bold;">There was an error loading the <a href="' + mw.util.getUrl(jukebox.playlistPage) + '">song playlist</a>.</span>');
			}
			break;
		}
	});
}());
}

/*
	// get json from [[List of Music]]
	var a = {};
	$(".wikitable td:nth-child(1)").each(function(i) {
		var b = $(".wikitable td:nth-child(2)")[i].innerText.replace(/\n/g, "");
		a[
			$(".wikitable td:nth-child(1)")[i].innerText.replace(/\n/g, "").replace(/ /g, "")
		] = b.indexOf(" ") == 0 ? b.substr(1) : b;
	});
*/


// </syntaxhighlight>