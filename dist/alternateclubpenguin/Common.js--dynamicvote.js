/*
	create vote-adder forms for specific vote pages
*/


if (mw.config.get("wgAction") == "edit") {

$(function() {

var v4cp = {fn: {}, data: {}} // votes4couchpotatoes


/* ======================================== *\
	# mw.config wikipedia global variables (wgFoo)
\* ======================================== */
var _  = mw.config.get(["wgNamespaceNumber", "wgTitle", "wgUserName"]);


/* ======================================== *\
	# data
\* ======================================== */

// markup
v4cp.data.markup = (
	'<nav id="v4cp-parent">\n' +
		'<nav id="v4cp">\n' +
			'<h3>\n' +
				'Automatic vote form\n' +
				'<span id="v4cp-close"></span>\n' +
			'</h3>\n' +
			'<p>\n' +
				'<span class="v4cp-label">File/Article:</span> <input type="text" class="v4cp-field" id="v4cp-vpage" name="page" /><br />\n' +
				'<span class="v4cp-label">Vote name:</span> <input type="text" class="v4cp-field" id="v4cp-vname" name="vname" /><br />\n' +
				'<span class="v4cp-label">Nominated user:</span> <input type="text" class="v4cp-field" id="v4cp-nominee" name="nominee" /><br />\n' +
				'<span class="v4cp-label">Confirmed by admin:</span> <input type="text" class="v4cp-field" id="v4cp-sysop" name="sysop" /><br />\n' +
				'<span class="v4cp-label">Description:</span><br />\n' +
				'<textarea type="text" class="v4cp-field" id="v4cp-vdesc" name="description"></textarea><br />\n' +
				'<input type="radio" checked name="v4cp-ivote" id="v4cp-ivote-for" /><label for="v4cp-ivote-for" class="v4cp-label">&nbsp;I would like to automatically sign \'For\'</label> <br />\n' +
				'<input type="radio" name="v4cp-ivote" id="v4cp-ivote-against" disabled /><label for="v4cp-ivote-against" class="v4cp-label">&nbsp;I would like to automatically sign \'Against\'</label> <br />\n' +
				'<input type="radio" name="v4cp-ivote" id="v4cp-ivote-none" /><label for="v4cp-ivote-none" class="v4cp-label">&nbsp;Don\'t add my signature by default</label> <br />\n' +
				'<span class="v4cp-notice">Note! Certain parameters are optional.</span> <br />\n' +
				'<input type="button" id="v4cp-save" value="Done" />\n' +
			'</p>' +
		'</nav>' +
	'</nav>'
);

// css
v4cp.data.css = (
	'nav#v4cp-parent {\n' +
		'\tdisplay: none;\n' +
		'\tjustify-content: center;\n' +
		'\talign-items: center;\n' +
		'\twidth: 100%;\n' +
		'\theight: 100%;\n' +
		'\tposition: fixed;\n' +
		'\ttop: 0;\n' +
		'\tleft: 0;\n' +
		'\tz-index: 9999;\n' +
		'\tbackground: rgba(0, 0, 0, 0.35);\n' +
	'}\n' +
	'nav#v4cp-parent.v4cp-visible {\n' +
		'\tdisplay: flex;\n' +
	'}\n' +
	'nav#v4cp {\n' +
		'\twidth: 320px;\n' +
		'\tpadding: 10px;\n' +
		'\tbackground: #fafafa;\n' +
		'\tborder: 1px solid #ccc;\n' +
		'\tborder-radius: 10px;\n' +
		'\tcolor: #333333;\n' +
	'}\n' +
	'nav#v4cp h3 {\n' +
		'\tfont-weight: bold;\n' +
		'\tfont-size: 18px;\n' +
		'\tline-height: 18px;\n' +
		'\tcolor: #000000;\n' +
	'}\n' +
	'nav#v4cp p {\n' +
		'\tpadding: 0px;\n' +
		'\tmargin: 3px 0 0 15px;\n' +
		'\tline-height: 1.5em;\n' +
	'}\n' +
	'nav#v4cp .v4cp-label {\n' +
		'\tfont-weight: bold;\n' +
	'}\n' +
	'nav#v4cp .v4cp-notice {\n' +
		'\tfont-style: italic;\n' +
		'\tcolor: #999999;\n' +
	'}\n' +
	'nav#v4cp #v4cp-vdesc {\n' +
		'\twidth: 290px;\n' +
		'\theight: 200px;\n' +
		'\tresize: none;\n' +
	'}\n' +
	'nav#v4cp .v4cp-field {\n' +
		'\tborder: 1px solid #eee;\n' +
		'\tborder-radius: 4px;\n' +
	'}\n' +
	'nav#v4cp p > input[type="text"]:not(:first-of-type) {\n' +
		'\tmargin-top: 4px;\n' +
	'}\n' +
	'nav#v4cp p > input[type="radio"]:disabled + label {\n' +
		'\tcolor: #999999;\n' +
	'}\n' +
	'nav#v4cp h3 {\n' +
		'\tbackground: linear-gradient(to left, rgba(32, 136, 255, 0.35), rgba(32, 136, 255, 0) 33%);\n' +
		'\tborder-radius: 8px;\n' +
	'}\n' +
	'nav#v4cp #v4cp-close {\n' +
		'\tdisplay: inline-block;\n' +
		'\twidth: 12px;\n' +
		'\theight: 12px;\n' +
		'\tfloat: right;\n' +
		'\tmargin: 2px 4px;\n' +
		'\tbackground: url(\'http://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Emblem-unreadable.svg/14px-Emblem-unreadable.svg.png\') center no-repeat;\n' +
		'\tborder: 1px solid #cccccc;\n' +
		'\tborder-radius: 3px;\n' +
		'\tcursor: pointer;\n' +
	'}'
);

// required fields
v4cp.data.req = {
	"Penguin of the Month": ["nominee", "description"],
	"Featured Image of the Month": ["page"],
	"Vote Page": ["vname", "sysop", "description"],
	"Featured Article": ["page", "description"],
	"Item of the Month": ["page", "description"]
}

// required fields
v4cp.data.allowAgainstVoting = ["Vote Page"];

/* ======================================== *\
	# functions
\* ======================================== */

// show
v4cp.fn.show = function() {
	v4cp.fn.reset();
	$("#v4cp-parent").addClass("v4cp-visible");
}

// hide
v4cp.fn.hide = function() {
	$("#v4cp-parent").removeClass("v4cp-visible");
	v4cp.fn.reset();
}

// reset form
v4cp.fn.reset = function() {
	$('#v4cp .v4cp-field').val("");
	$('#v4cp [name="v4cp-ivote"]:checked').removeAttr("checked");
	$('#v4cp-ivote-for').attr("checked", "checked");
	var currPage = _.wgTitle,
		currVote = Object.keys(v4cp.data.req).indexOf(currPage) > -1 ? currPage : undefined;
	if (currVote) {
		$('nav#v4cp .v4cp-field').each(function() {
			var name = $(this).attr("name");
			if (v4cp.data.req[currVote].indexOf(name) > -1) {
				$(this).removeAttr("disabled");
			} else {
				$(this).attr("disabled", "disabled");
			}
		});
	}
	if (v4cp.data.allowAgainstVoting.indexOf(_.wgTitle) > -1) {
		$("#v4cp-ivote-against").removeAttr("disabled");
	}
}

// lack in data error
v4cp.fn.notEnoughData = function() {
	console.log("Error: not enough data");
	return "";
}

// namespace page but no known vote held there
v4cp.fn.error = function() {
	console.log("Sorry! No vote detected. In case this is a vote page, please contact an admin and specify the page on which you're seeing this error.");
	return "";
}

// other error
v4cp.fn.dataError = function() {
	console.log("No data detected or incorrect namespace.");
	return "";
}

// scroll to bottom
v4cp.fn.goToBottom = function() {
	var a = $("#wpTextbox1").scrollTop(Infinity);
}

v4cp.fn.draft = function() {
	var obj = arguments[0],
		page = mw.config.get(["wgNamespaceNumber", "wgTitle", "wgUserName"]);
	if (obj && _.wgNamespaceNumber == 4) {
		switch (_.wgTitle) {
			// penguin of the month
			case "Penguin of the Month":
				if (obj.nominee) {
					return '==[[Special:Contributions/' + obj.nominee + ']] (' + (obj.ivote == "for" ? '+1' : '0') + ')==\nNominated by [[User:' + _.wgUserName + '|' + _.wgUserName + ']]\n' + (obj.description ? '<br />' + obj.description + '\n\n' : '') + '===For (' + (obj.ivote == "for" ? '1' : '0') + ')===\n' + (obj.ivote == "for" ? '#[[user:Penguin-Pal|<span style="color: #0e92cf;">Penguin-Pal</span>]] [[user talk:Penguin-Pal|<span style="color: #2e47aa;">(talk)</span>]] 17:34, January 4, 2015 (UTC)\n' : '') + '===Comments===';
				} else {
					return v4cp.fn.notEnoughData();
				}
				break;
			// featured image
			case "Featured Image of the Month":
				if (obj.page) {
					return '==[[:File:' + obj.page + '|' + obj.page + ']] (' + (obj.ivote == "for" ? '+1' : '0') + ')==\n[[File:' + obj.page + '|thumb]]\nNominated by [[User:' + _.wgUserName + '|' + _.wgUserName + ']]\n===For (' + (obj.ivote == "for" ? '1' : '0') + ')===\n' + (obj.ivote == "for" ? '#[[user:Penguin-Pal|<span style="color: #0e92cf;">Penguin-Pal</span>]] [[user talk:Penguin-Pal|<span style="color: #2e47aa;">(talk)</span>]] 17:34, January 4, 2015 (UTC)\n' : '') + '===Comments===';
				} else {
					return v4cp.fn.notEnoughData();
				}
				break;
			// vote page
			case "Vote Page":
				if (obj.vname && obj.description && obj.sysop) {
					return '==' + obj.vname + ' (' + (obj.ivote == "for" ? '+1' : obj.ivote == "against" ? "-1" : '0') + ')==\nNominated by [[User:' + _.wgUserName + '|' + _.wgUserName + ']] and confirmed by [[User:' + obj.sysop + '|' + obj.sysop + ']]<br />\n' + obj.description + '\n\n===For (' + (obj.ivote == "for" ? '1' : '0') + ')===\n' + (obj.ivote == "for" ? '#[[user:Penguin-Pal|<span style="color: #0e92cf;">Penguin-Pal</span>]] [[user talk:Penguin-Pal|<span style="color: #2e47aa;">(talk)</span>]] 17:34, January 4, 2015 (UTC)\n' : '') + '===Against (' + (obj.ivote == "against" ? "1" : "0") + ')==='  + (obj.ivote == "against" ? '\n#[[user:Penguin-Pal|<span style="color: #0e92cf;">Penguin-Pal</span>]] [[user talk:Penguin-Pal|<span style="color: #2e47aa;">(talk)</span>]] 17:34, January 4, 2015 (UTC)' : '') + '\n===Comments===';
				} else {
					return v4cp.fn.notEnoughData();
				}
				break;
			// featured article
			case "Featured Article":
				if (obj.page) {
					return '==' + obj.page + ' (' + (obj.ivote == "for" ? '+1' : '0') + ')==\n:Nominated by [[User:' + _.wgUserName + '|' + _.wgUserName + ']]\n' + (obj.description ? obj.description + '\n\n' : '') + '===For (' + (obj.ivote == "for" ? '1' : '0') + ')===\n' + (obj.ivote == "for" ? '#[[user:Penguin-Pal|<span style="color: #0e92cf;">Penguin-Pal</span>]] [[user talk:Penguin-Pal|<span style="color: #2e47aa;">(talk)</span>]] 17:34, January 4, 2015 (UTC)\n' : '') + '===Comments===';
				} else {
					return v4cp.fn.notEnoughData();
				}
				break;
			// item of the month
			case "Item of the Month":
				if (obj.page) {
					return '==[[' + obj.page + ']] (' + (obj.ivote == "for" ? '+1' : '0') + ')==\n:Nominated by [[User:' + _.wgUserName + '|' + _.wgUserName + ']]\n' + (obj.description ? obj.description + '\n\n' : '') + '===For (' + (obj.ivote == "for" ? '1' : '0') + ')===\n' + (obj.ivote == "for" ? '#[[user:Penguin-Pal|<span style="color: #0e92cf;">Penguin-Pal</span>]] [[user talk:Penguin-Pal|<span style="color: #2e47aa;">(talk)</span>]] 17:34, January 4, 2015 (UTC)\n' : '') + '===Comments===';
				} else {
					return v4cp.fn.notEnoughData();
				}
				break;
			default:
				return v4cp.fn.error();
		}
	} else {
		v4cp.fn.dataError();
	}
}


/* ======================================== *\
	# implement
\* ======================================== */

if (Object.keys(v4cp.data.req).indexOf(_.wgTitle) > -1) {

// add css
mw.util.addCSS(v4cp.data.css);

// add form

$("body").prepend(v4cp.data.markup);

$('<img />').attr({
	"id": "v4cp-opener",
	"src": "https://images.wikia.nocookie.net/clubpenguin/images/2/26/AddVoteWiki.png",
	"width": "23",
	"height": "22",
	"title": "Start a new vote",
	"class": "mw-toolbar-editbutton"
}).click(function() {
	v4cp.fn.show();
}).insertAfter("#cke_toolbar_source_1 > img:last-of-type");


$("#v4cp-save").click(function() {
	var output = v4cp.fn.draft({
		nominee: $("#v4cp-nominee").val(),
		description: $("#v4cp-vdesc").val(),
		page: $("#v4cp-vpage").val(),
		vname: $("#v4cp-vname").val(),
		sysop: $("#v4cp-sysop").val(),
		ivote: $('#v4cp [name="v4cp-ivote"]:checked').attr("id").match(/[a-z]+$/)[0]
	});
	if (output.length > 0) {
		document.querySelector("#wpTextbox1").value += "\n\n" + output;
		v4cp.fn.hide();
		v4cp.fn.goToBottom();
		v4cp.fn.hide();
	} else {
		alert("An error has occured. Please make sure that all enabled fields have been filled.");
	}
});

$("#v4cp-close").click(function() {
	v4cp.fn.hide();
});


// 'if () {}' end
}


// '$(function() {})' end
});

// first 'if () {}' end
}