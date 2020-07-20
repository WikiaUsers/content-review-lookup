/*\
|*|
|*| LegacyWall
|*| sitewide
|*| add list of message wall threads for wikis where message wall had been active at some point but has been removed since
|*|
|*| @author Penguin-Pal
|*|
|*| intentionally did not construct message walls on the interface, as they are supported even after feature's removal,
|*| but the script loads at least some of that information, and can be adjusted to fully-support such change if needed
|*|
\*/
(function() {
var data = {},
	fn = {};

/* ================================ *\
	# data
\* ================================ */

// regex for evaluating thread titles
data.messageTitleRegExp = /Thread\:([^\/]+)\/@comment\-([\da-zA-Z\:\.]*)\-(\d+)(?:\/@comment\-([\da-zA-Z\:\.]*)\-(\d+))?/; // in really old messages, the userid was missing, cause, u know, 4stupid ppl u nid fandom powered by stupid

// users by ids
data.users = {}; // key = userid, value = username

// xhr-loaded thread data
data.threads = {
	/*
		wallOwner: {
			"u0-t0": {
				"name": "We need more potatoes",
				"href": "/wiki/Thread:69" // (insert lenny here) lol jk ik its impossible- wikia creates over 9000 articleids when creating the wiki so that thread number is fake news
			}
		}
	*/
};


/* ================================ *\
	# functions
\* ================================ */

/* constructors */

// wall data
fn.ThreadData = function() {
	this.name = null; // ac_metadata of thread title
	this.user = null; // user who created the thread
	this.wall = null; // owner of message wall
	this.messages = []; // array of messages;
	this.time = {
		open: 0, // time of creating the given thread
		last: 0 // time of leaving the last reply
	};
	this.href = null; // link to '/wiki/Thread:%' (still works even if message walls are disabled)
	// add error messages/notes if needed (string)
	this.note = false;
	// length
	Object.defineProperty(this, "length", {
		get: function() {
			return this.messages.length;
		}
	});
};


/* regular functions */

// get thread titles of messages left on one's message wall
fn.getWallMessages = function(user, cb, list, from) {
	// redefine 'list' if needed
	list = Array.isArray(list) ? list : [];
	// variables
	var api = new mw.Api(),
		params,
		curr;
	params = {
		action: "query",
		list: "allpages",
		apnamespace: 1201,
		apprefix: user + "/",
		aplimit: "max"
	};
	// add 'from' to api if present
	if (from) {
		params.apfrom = from;
	}
	// get data
	api.get(params, function(json) {
		json.query.allpages.forEach(function(page) {
			curr = {
				title: page.title,
				id: page.pageid
			};
			list.push(curr);
		});
		if (json.hasOwnProperty("query-continue")) {
			// need more requests
			fn.getWallMessages(user, cb, list, json["query-continue"].allpages.apfrom);
		} else {
			// all titles found
			cb(list);
		}
	});
};

// group titles
fn.groupWallMessages = function(list) {
	var groups = {},
		users = [], // users = array of users who ever left a message/reply
		curr, // currently-inspected message on the list
		newData; // only if needed;
	list.forEach(function(page) {
		curr = fn.getTitleInfo(page.title);
		// create thread object if not created yet
		groups[curr.w] = groups[curr.w] || {}; // wall of currently-inspected user- pretty useless as i have no intention in providing a generator-like interface for 'user' input field, but wutevah
		if (!(groups[curr.w][curr.v0] instanceof fn.ThreadData)) {
			newData = new fn.ThreadData();
			newData.wall = curr.w;
			newData.user = curr.u0; // have to define here each time, in case the starting message was deleted :(
			newData.time.open = curr.t0;
			newData.time.last = curr.t0;
			groups[curr.w][curr.v0] = newData;
		}
		// add message to thread + update "last" time
		if (curr.hasOwnProperty("u1")) {
			page.user = curr.u1;
			groups[curr.w][curr.v0].time.last = Math.max(groups[curr.w][curr.v0].time.last, curr.t1); // reply - set new time if needed
			// add user to list of repliers
			if (users.indexOf(curr.u1) == -1) {
				users.push(curr.u1);
			}
		} else {
			page.user = curr.u0;
			// add user to list of repliers
			if (users.indexOf(curr.u0) == -1) {
				users.push(curr.u0);
			}
		}
		page.user = curr[curr.hasOwnProperty("u1") ? "u1" : "u0"];
		fn.expandThreadData(groups[curr.w][curr.v0], page, curr);
	});
	// return groups and do whatever the hell you want with them
	return {
		groups: groups,
		users: users
	};
};

// evaluate group message title
fn.getTitleInfo = function(title) {
	var paths = title.match(data.messageTitleRegExp),
		output;
	output = {
		w: paths[1], // wall owner
		u0: paths[2], // creating user
		t0: Number(paths[3]), // creation time
		v0: paths[2] + "-" + paths[3]
	};
	if (typeof paths[4] !== "undefined") {
		// if title belongs to reply
		output.u1 = paths[4]; // replying user
		output.t1 = Number(paths[5]); // reply time
		output.v1 = paths[4] + "-" + paths[5];
	}
	return output;
};

// add message to thread data
fn.expandThreadData = function(thread, page, messageData) {
	thread.messages.push(page);
	var t = messageData[messageData.hasOwnProperty("t1") ? "t1" : "t0"];
	if (thread.time.last < t) {
		// update last-active time if needed
		thread.time.last = t;
	}
};

// add relevant data to wall + check if 'fn.loadRelevantWallContent' is needed
fn.seekRelevantWallContent = function(wallOwner, groups, cb) {
	var output = {}, // add evaluated messages at a time, return when done
		missing = [],
		group,
		curr;
	output[wallOwner] = {};
	data.threads[wallOwner] = data.threads.hasOwnProperty(wallOwner) ? data.threads[wallOwner] : {};
	for (group in groups[wallOwner]) { // 'group' has syntax of 'u0-t0'
		curr = groups[wallOwner][group];
		if (data.threads[wallOwner].hasOwnProperty(group)) {
			curr.name = data.threads[wallOwner][group].name;
			curr.href = data.threads[wallOwner][group].href;
			curr.note = data.threads[wallOwner][group].note;
			output[wallOwner][group] = curr;
		} else {
			missing.push("Thread:" + wallOwner + "/@comment-" + curr.user + "-" + curr.time.open);
		}
	}
	fn.loadRelevantWallContent(wallOwner, groups, missing, function(groups) {
		cb(groups);
	});
};


// load xhr-dependant data for threads in wall (header + href, excluding usernames)
fn.loadRelevantWallContent = function(wallOwner, groups, missing, cb) {
	if (missing.length > 0) {
		// xhr required for at least 1 thread
		var api = new mw.Api(),
			curr,
			gkey,
			obj;
		api.get({
			action: "query",
			prop: "revisions",
			rvprop: "content|ids", // no point in 'user' parameter as we're checking the latest revision, not the first one- possibly cause wikia disabled some kind of userid and tried to cover it :p
			titles: missing.splice(0, 50).join("|")
		}, function(json) {
			for (var pageid in json.query.pages) {
				obj = {};
				curr = json.query.pages[pageid];
				gkey = curr.title.split("@comment-")[1];
				if (pageid < 0) {
					obj.href = mw.util.getUrl("User_talk:" + wallOwner);
					obj.name = "";
					obj.note = i18n.msg("error-001").plain();
				} else {
					obj.href = mw.util.getUrl("Thread:" + pageid);
					obj.name = curr.revisions[0]["*"].match(/<ac_metadata title\="([^\"]+?)\"\>/);
					if (Array.isArray(obj.name)) {
						obj.name = obj.name[1];
					} else {
						obj.name = "";
						obj.note = i18n.msg("error-002").plain();
					}
				}
				data.threads[wallOwner][gkey] = obj;
				groups[wallOwner][gkey].name = obj.name;
				groups[wallOwner][gkey].href = obj.href;
				
			}
			// call function again to see if more loads are needed
			fn.loadRelevantWallContent(wallOwner, groups, missing, cb);
		});
	} else {
		// no need to load any threads
		cb(groups);
	}
};

// order titles by creation date- recent to oldest
fn.sortThreadsByTime = function(wallOwner, threads) {
	if (!threads.hasOwnProperty(wallOwner)) {
		// has no messages
		return [];
	}
	var output = [];
	Object.keys(threads[wallOwner]).sort(function(a, b) {
		return threads[wallOwner][b].time.open - threads[wallOwner][a].time.open;
	}).forEach(function(item, i) {
		output.push(threads[wallOwner][item]);
	});
	return output;
};

// generate results table
fn.generateMarkup = function(threads) {
	// index | title | # of replies | creator | created | updated | notes
	var table = $(
			'<table id="legacywall-table" class="wikitable">' +
				'<thead>' +
					'<th>' + i18n.msg("table-index").escape() + '</th>' +
					'<th>' + i18n.msg("table-title").escape() + '</th>' +
					'<th>' + i18n.msg("table-replies").escape() + '</th>' +
					'<th>' + i18n.msg("table-starter").escape() + '</th>' +
					'<th>' + i18n.msg("table-open").escape() + '</th>' +
					'<th>' + i18n.msg("table-last").escape() + '</th>' +
					//'<th>' + i18n.msg("table-note").escape() + '</th>'
				'</thead>' +
				'<tbody>' +
				'</tbody>' +
			'</table>'
		),
		temp;
	threads.forEach(function(thread, i) {
		temp = $('<tr />').append(
			$('<td />').text(threads.length - i),
			$('<td />').append($('<a />').attr("href", thread.href).text(thread.name)),
			$('<td />').text(thread.length - 1),
			$('<td />').append(fn.markupfyUser(thread.user)),
			$('<td />').text(fn.formatTime(thread.time.open)),
			$('<td />').text(fn.formatTime(thread.time.last))/*,
			$('<td />').text(thread.time.note)*/
		);
		$(table).find("tbody").append(temp);
	});
	return table;
};

// create link to user
fn.markupfyUser = function(user) {
	var a = $('<a />');
	if ($.isNumeric(user)) {
		// registered user
		user = data.users[user];
		a.attr("href", mw.util.getUrl("User:" + user)).text(user);
	} else {
		// ip address
		a.attr("href", mw.util.getUrl("Special:Contributions/" + user)).text(user);
	}
	return a;
};

// format timestamp
fn.formatTime = function(t) {
	var s = String(t);
	return s.substr(0, 4) + "-" + s.substr(4, 2) + "-" + s.substr(6, 2) + "T" + s.substr(8, 2) + ":" + s.substr(10, 2) + ":" + s.substr(12, 2);
};

// get list of essential users
fn.seekUsers = function(users, cb) {
	var missing = [];
	users.forEach(function(user) {
		if ($.isNumeric(user) && !data.users.hasOwnProperty(user)) {
			// not ip + not previously loaded
			missing.push(user);
		}
	});
	fn.loadUsers(missing, cb);
};
// load list of essential users
fn.loadUsers = function(users, cb) {
	if (users.length > 0) {
		var xhr = new XMLHttpRequest(),
			json;
		xhr.open("GET", mw.config.get("wgScriptPath") + "/api/v1/User/Details?size=12&ids=" + users.splice(0, 100).join(","), true);
		xhr.onload = function() {
			json = JSON.parse(xhr.responseText);
			json.items.forEach(function(user) {
				data.users[user.user_id] = user.name;
			});
			fn.loadUsers(users, cb);
		};
		xhr.send();
	} else {
		cb();
	}
};

// initiate loading
fn.init = function(wallOwner) {
	fn.getWallMessages(wallOwner, function(list) {
		var groupedMessages = fn.groupWallMessages(list);
		fn.seekRelevantWallContent(wallOwner, groupedMessages.groups, function(threads) { // while we're at it, redefine groups for something useful lol.. nvm called it 'threads' lol
			// load usernames of users
			fn.seekUsers(groupedMessages.users, function() {
				var ordered = fn.sortThreadsByTime(wallOwner, threads),
					markup = fn.generateMarkup(ordered);
				$("#mw-content-text").html(markup);
			});
		});
	});
};


/* ================================ *\
	# implementations
\* ================================ */

var trigger = $('<li><a></a></li>'),
	title = mw.config.get("wgTitle"),
	ns = mw.config.get("wgNamespaceNumber"),
	i18n;

if (ns === 3 && title.indexOf("/") === -1) {
	// add css thingies. JustLeafy suggesting putting it here lol. thanks man :)
	importArticle({
		type: "style",
		article: "u:dev:MediaWiki:LegacyWall/code.css"
	});
	// user talk, not subpage
	$(trigger).click(function() {
		if (
			confirm(
				"LegacyWall is used to list discussions for wikis where Message Wall is no longer available.\n\n" +
				"Loading can take anywhere from a few seconds to a full minute, depending on how frequently users contacted the given user. Click 'OK' to start loading.\n\n" +
				"To find out more, visit:\nhttps://dev.wikia.com/wiki/LegacyWall"
			)
		) {
			$(trigger).remove();
			$("#mw-content-text").text(i18n.msg("loading-text").plain());
			fn.init(title);
		}
	});
	// import i18n script before adding the interface
	$.getScript(mw.config.get("wgScriptPath") + '/load.php?mode=articles&articles=u:dev:MediaWiki:I18n-js/code.js&only=scripts').done(function() {
		window.dev.i18n.loadMessages("LegacyWall").done(function(i18n_legacywall) {
			i18n = i18n_legacywall;
			$(trigger).find("a").attr("title", i18n.msg("trigger-title").plain()).text(i18n.msg("trigger-text").plain());
		});
	});
	$("nav.wikia-menu-button ul").append(trigger);
}


})(); // <-- end of function