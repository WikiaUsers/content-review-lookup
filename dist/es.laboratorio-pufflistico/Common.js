 $(init);
 }(jQuery, mediaWiki));
$(function () {
    $('.youtubeplayer').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            playertype = esc('' + $this.data('playertype')),
            id = esc($this.data('id') || ''),
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            autoplay = esc('' + $this.data('autoplay')),
            args = esc('' + $this.data('args'));
 
        if ( id === '' ) {
            return;
        }
        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/' + playertype + '/' + id + '?feature=player_embedded&autoplay=' + autoplay + '&' + args + '" frameborder="0" allowfullscreen></iframe>');
    });
});
$(function () {
    $('.audio').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            options = esc('' + $this.data('options')),
            src = esc('' + $this.data('src')),
            type = esc('' + $this.data('type'));
        $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>');
    });
});
$(function () {
    $('.video').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            options = esc('' + $this.data('options')),
            src = esc('' + $this.data('src')),
            type = esc('' + $this.data('type'));
        $this.html('<video width="' + width + '" height="' + height + '" ' + options + '><source src="' + src + '" type="'+ type + '"</video>');
    });
});
$('.norc').bind('contextmenu', function(e) {
    return false;
}

/* Auto-refrescar WikiActivitad */

var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxIndicator = 'https://vignette.wikia.nocookie.net/clubpenguin/images/6/68/D_CP_MEM_Loader_34.gif/revision/latest?cb=20120915200111';
var ajaxRefresh = 10000;
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');

/* ====================================================================== *\
	# $cp api
\* ====================================================================== */

/* global object */
window.$cp = {};

/* json */
$cp.json = {};

// loaded data
$cp.json.val = {};

// custom callback names
$cp.json.cbs = {
	"cover": "cp_covers",
	"chunking_map": "cp_chunking_maps",
	"puffles_v2": "cp_puffles_v2s",
	"stamps_tokenized": "cp_stamps_tokenizeds"
};

// callback queue for files that have yet to be loaded
$cp.json.que = {};

// generate url based on filename + lang
$cp.json.stringToUrl = function(file, lang) {
	var lang = ["pt", "fr", "es", "de", "ru"].indexOf(lang) > -1 ? lang : "en",
		url = "https://icer.ink/media1." + (["characters", "worlds"].indexOf(file) > -1 ? "friends.go.com/content/disney-land-clubpenguin/" + lang + "/" : ["lands", "text"].indexOf(file) > -1 ? "friends.go.com/content/" + lang + "/" : ["markup", "images"].indexOf(file) > -1 ? "friends.go.com/content/" : "clubpenguin.com/play/" + lang + "/web_service/game_configs/") + file + ".jsonp";
	return url;
}

// get callback name
$cp.json.getCbName = function(file) {
	return ["lands", "characters", "text", "markup", "images", "worlds"].indexOf(file) > -1 ? file + "Data" : ($cp.json.cbs.hasOwnProperty(file) ? $cp.json.cbs[file] : "cp_" + file);
}

// get file
$cp.json.get = function(a) {
	var lang = ["pt", "fr", "es", "de", "ru"].indexOf(a.lang) > -1 ? a.lang : "en",
		file = a.file,
		url = $cp.json.stringToUrl(file, lang),
		cb = $cp.json.getCbName(file),
		cbfn = typeof a.success === "function" ? a.success : function() {console.log("Finished loading '" + file + "' file as JSONP (" + lang + ")");},
		cbkey = lang + "::" + file;
	$cp.json.val[lang] = $cp.json.val[lang] || {};
	if ($cp.json.val[lang].hasOwnProperty(file)) {
		// file has already been requested and loaded
		cbfn($cp.json.val[lang][file]);
	} else {
		// file hasn't loaded yet
		if (!$cp.json.que.hasOwnProperty(cbkey)) {
			// no requests in queue - this is the first one
			$cp.json.que[cbkey] = [cbfn];
			$cp.json.requestJsonpResource(url, lang, file, cb, cbkey);
		} else {
			// file hasn't loaded, yet a request has already been sent
			$cp.json.que[cbkey].push(cbfn);
		}
	}
}

// make a jsonp request
$cp.json.requestJsonpResource = function(url, lang, file, cb, cbkey) {
	var args = arguments;
	args = {
		url: args[0],
		lang: args[1],
		file: args[2],
		cb: args[3],
		cbkey: args[4]
	};
	$.ajax({
		url: url,
		dataType: "jsonp",
		jsonpCallback: cb,
		success: function(data) {
			$cp.json.val[args.lang][args.file] = data;
			for (var i in $cp.json.que[args.cbkey]) {
				$cp.json.que[args.cbkey][i](data);
			}
		}
	});
}

// get multiple resources in a single function
$cp.json.multi = function(a, b) {
	var arg = Array.prototype.slice.apply(arguments),
		toget = arg[0],
		onDone = arg[1];
	function get() {
		if (toget.length > 0) {
			var newReq = toget.shift();
			newReq.success = function() {
				if (toget.length == 0) {
					if (typeof onDone === "function") {
						onDone();
					}
				} else {
					get();
				}
			}
			$cp.json.get(newReq);
		}
	}
	get();
}

/* ====================================================================== *\
	# nombres en otros idiomas obtenido de https://clubpenguin.fandom.com/wiki/MediaWiki:Common.js solo utilizado de forma privada en este wiki
\* ====================================================================== */
 
$(function() {
if ([4].indexOf(mw.config.get("wgNamespaceNumber")) > -1 && $("#interlangcp").length == 1) {
	var il = {};
	il.fn = {};
	il.data = {items: {}};
 
	/* =============================== *\
		# data
	\* =============================== */
 
	// id properties
	il.data.idProps = {
		paper_items: "paper_item_id",
		furniture_items: "furniture_item_id",
		puffle_items: "puffle_item_id",
		igloos: "igloo_id",
		igloo_locations: "igloo_location_id",
		igloo_floors: "igloo_floor_id",
		rooms: "room_id",
		stamps: "stamp_id"
	};
 
	// item name properties
	il.data.nameProps = {
		paper_items: "label",
		furniture_items: "label",
		puffle_items: "label",
		igloos: "name",
		igloo_locations: "label",
		igloo_floors: "label",
		rooms: "short_name",
		stamps: "name"
	};
 
	// css
	il.data.css = (
		'nav#interlangcp {\n' +
			'\twidth: 500px;\n' +
			'\theight: 400px;\n' +
			'\tmargin: 0 auto;\n' +
			'\tpadding: 0;\n' +
			'\tborder: 1px solid #cccccc;\n' +
			'\ttext-align: center;\n' +
		'}\n' +
		'nav#interlangcp .interlangcp-title {\n' +
			'\tfont-weight: bold;\n' +
		'}\n' +
		'nav#interlangcp p {\n' +
			'\tmargin: 10px;\n' +
			'\tpadding: 0;\n' +
			'\ttext-align: left;\n' +
		'}\n' +
		'nav#interlangcp textarea {\n' +
			'\twidth: 400px;\n' +
			'\theight: 300px;\n' +
			'\tresize: none;\n' +
			'\ttext-align: left;\n' +
		'}\n' +
		'nav#interlangcp input[type="text"] {\n' +
			'\twidth: 400px;\n' +
		'}'
	);
 
	/* =============================== *\
		# functions
	\* =============================== */
	// prepare list of resources
	il.fn.getFilesConst = function(file) {
		var langs = ["pt", "fr", "es", "de", "ru"],
			arr = [];
		while (langs.length > 0) {
			arr.push({
				file: file,
				lang: langs.shift()
			});
		}
		return arr;
	}
	// import resources
	il.fn.getFiles = function(file, id) {
		$cp.json.multi(
			il.fn.getFilesConst(file),
			function() {
				il.fn.parseContent(file, id);
			}
		);
	}
	// parse content
	il.fn.parseContent = function(file, id) {
		if (!il.data.items.hasOwnProperty(file)) {
			il.data.items[file] = {};
			if (file == "stamps") {
				// special case for stamps
				il.fn.parseStampContent();
			} else {
				for (var i in $cp.json.val) {
					var lang = $cp.json.val[i];
					if (i != "en") { // in case en file has already been loaded by something else
						for (var j in lang[file]) {
							var _id = lang[file][j][il.data.idProps[file]];
							if (!il.data.items[file].hasOwnProperty(_id)) {
								il.data.items[file][_id] = {};
							}
							il.data.items[file][_id][i] = lang[file][j][il.data.nameProps[file]];
						}
					}
				}
			}
		}
		if (il.data.items[file].hasOwnProperty(id)) {
			il.fn.makeTable(file, id);
		} else {
			il.fn.enable("Error: ID " + id + " for that item type could not found. Please enter a different ID or try a different type");
		}
	}
	// parse content for stamp files
	il.fn.parseStampContent = function() {
		var file = "stamps";
		for (var lang in $cp.json.val) {
			var locale = $cp.json.val[lang][file];
			if (lang != "en") { // in case en file has already been loaded by something else
				for (var category in locale) {
					for (var item in locale[category].stamps) {
						var curr = locale[category].stamps[item],
							_id = curr.stamp_id,
							_name = curr.name;
						if (!il.data.items[file].hasOwnProperty(_id)) {
							il.data.items[file][_id] = {};
						}
						il.data.items[file][_id][lang] = _name;
					}
				}
			}
		}
	}
	// make table
	il.fn.makeTable = function(file, id) {
		var output = "",
			a = il.data.items[file][id]
		for (var lang in a) {
			output += "\n|" + lang + "= " + a[lang];
		}
		var txt = output.length > 0 ? "==Names in other languages==\n{{Language" + output + "\n}}" : il.fn.error(id);
		il.fn.enable(txt);
	}
	// generate error message
	il.fn.error = function(id) {
		return "ERROR: no item with ID " + id + " for the given type could be found. Please make sure that the ID and the item type are correct";
	}
	// trigger
	il.fn.generate = function(file, id) {
		il.fn.getFiles(file, id);
	}
	// process inputs
	il.fn.process = function(file, id) {
		$("#interlangcp input, #interlangcp textarea, #interlangcp select")
			.attr("disabled", "disabled")
			.filter("textarea").val("Preparing resources...\nThis may take a few seconds on the first time for each item type");
		if (id.length > 0) {
			return il.fn.generate(file, id);
		} else {
			il.fn.enable("Please enter a valid ID");
		}
	}
	// de-disable form
	il.fn.enable = function(newTextareaText) {
		$("#interlangcp [disabled]")
			.removeAttr("disabled")
			.filter("textarea").val(newTextareaText);
	}
	// activation function
	il.fn.activation = function() {
		il.fn.process(
			$("#interlangcp-select").val(),
			$("#interlangcp-id").val().replace(/[^\d]/g, "")
		);
	}
 
	/* =============================== *\
		# implementation
	\* =============================== */
	// css
	mw.util.addCSS(il.data.css);
 
	// markup
	$("#interlangcp").replaceWith(
		'<nav id="interlangcp">\n' +
			'\t<p>\n' +
				'\t\t<span class="interlangcp-title">Item ID:</span> <input type="text" id="interlangcp-id" /><br />\n' +
				'\t\t<span class="interlangcp-title">Item sort:</span>\n' +
				'\t\t<select id="interlangcp-select">\n' + // orid = original order, during the development. not important
					'\t\t\t<option data-orid="0" value="paper_items">Clothing</option>\n' +
					'\t\t\t<option data-orid="1" value="furniture_items">Furniture</option>\n' +
					'\t\t\t<option data-orid="6" value="puffle_items">Puffle item</option>\n' +
					'\t\t\t<option data-orid="2" value="igloos">Igloo</option>\n' +
					'\t\t\t<option data-orid="3" value="igloo_locations">Igloo location</option>\n' +
					'\t\t\t<option data-orid="4" value="igloo_floors">Flooring</option>\n' +
					'\t\t\t<option data-orid="7" value="rooms">Rooms</option>\n' +
					'\t\t\t<option data-orid="7" value="stamps">Stamps</option>\n' +
				'\t\t</select><br />\n' +
				'\t\t<input type="button" id="interlangcp-go" value="go" />\n' +
			'\t</p>\n' +
			'\t<textarea></textarea>\n' +
		'</nav>'
	);
 
	// activation
	$("#interlangcp-go").click(function() {
		il.fn.activation();
	});
	$("#interlangcp-id").keydown(function(e) {
		if (e.keyCode == 13) {
			il.fn.activation();
		}
	});
}
});