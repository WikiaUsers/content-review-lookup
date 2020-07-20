if (mw.config.get("wgNamespaceNumber") == 4 && mw.config.get("wgTitle") == "Chat/Logs") {
	var cv = {
		data: {},
		fn: {}
	};

	/* data */

	// path to log page
	cv.data.logPath = "Project:Chat/Logs/";

	// month names
	cv.data.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	// css
	cv.data.css = (
		'.chatview {\n' +
			'\tbackground: #fff;\n' +
		'}\n' +
		'.chatview-panel {\n' +
			'\tpadding: 10px;\n' +
			'\tbackground: linear-gradient(to top, #fafafa, rgba(255, 255, 255, 0) 8px);\n' +
		'}\n' +
		'.chatview-container ul, li {\n' +
			'\tmargin: 0;\n' +
			'\tpadding: 0;\n' +
		'}\n' +
		'.chatview-container ul {\n' +
			'\tlist-style: none;\n' +
		'}\n' +
		'.chatview-container li {\n' +
			'\tword-wrap: break-word;\n' +
		'}\n' +
		'.chatview-container li {\n' +
			'\tmin-height: 32px;\n' +
			'\tpadding: 18px 15px 16px 55px;\n' +
			'\tposition: relative;\n' +
		'}\n' +
		'.chatview-container .avatar {\n' +
			'\tborder: 1px solid #cccccc;\n' +
			'\tleft: 15px;\n' +
			'\tposition: absolute;\n' +
			'\ttop: 20px;\n' +
		'}\n' +
		'.chatview-container .time {\n' +
			'\tcolor: #9d9d9d;\n' +
			'\tfloat: right;\n' +
			'\tfont-size: 12px;\n' +
		'}\n' +
		'.chatview-container .username {\n' +
			'\tdisplay: block;\n' +
			'\tfont-weight: bold;\n' +
		'}\n' +
		'.chatview-container .username::after {\n' +
			'\tcontent: ":";\n' +
		'}\n' +
		'.chatview-container .message {\n' +
			'\twhite-space: pre-line;\n' +
		'}\n' +
		'.chatview-container .continued {\n' +
			'\tmargin-bottom: -15px;\n' +
			'\tmin-height: 0;\n' +
			'\tpadding-top: 0;\n' +
			'\ttop: -15px;\n' +
		'}\n' +
		'.chatview-container .continued .avatar {\n' +
			'\tdisplay: none;\n' +
		'}\n' +
		'.chatview-container .continued .username {\n' +
			'\tdisplay: none;\n' +
		'}\n' +
		'.chatview-container .continued .time {\n' +
			'\tdisplay: none;\n' +
		'}\n' +
		'.chatview-container .me-message {\n' +
			'\tcolor: #9d9d9d;\n' +
		'}\n' +
		'.chatview-container .inline-alert {\n' +
			'\tcolor: #9d9d9d;\n' +
			'\tfont-weight: bold;\n' +
			'\tmin-height: 0;\n' +
			'\tpadding-bottom: 10px;\n' +
			'\tpadding-top: 10px;\n' +
			'\ttext-align: center;\n' +
		'}\n' +
		'.chatview-container .inline-alert::before {\n' +
			'\tcontent: "~ ";\n' +
		'}\n' +
		'.chatview-container .inline-alert::after {\n' +
			'\tcontent: " ~";\n' +
		'}\n' +
		'.chatview-container .avatar-disabled {\n' +
			'\tbox-shadow: 0 0 2px 3px #f00;\n' +
		'}\n' +
		'@keyframes chatview-splash {\n' +
			'\t/* notch, go share a notch pie with apj */\n' +
			'\t0% {\n' +
				'\t\ttransform: translate(-10px, -5px) rotate(-15deg) scale(1);\n' +
			'\t}\n' +
			'\t50% {\n' +
				'\t\ttransform: translate(-10px, -5px) rotate(-15deg) scale(1.2);\n' +
			'\t}\n' +
			'\t100% {\n' +
				'\t\ttransform: translate(-10px, -5px) rotate(-15deg) scale(1);\n' +
			'\t}\n' +
		'}\n' +
		'.chatview-splash {\n' +
			'\tposition: absolute;\n' +
			'\ttop: 0;\n' +
			'\tright: 0;\n' +
			'\tcolor: #ff0;\n' +
			'\ttext-shadow: 2px 1px 2px #000, -1px -1px 1px #000;\n' +
			'\tanimation: chatview-splash cubic-bezier(0.5, 0.16, 0.5, 0.86) 600ms infinite;\n' +
		'}'
	);

	/* functions */

	// get content of pages from the api and then do something with it
	cv.fn.queryPage = function(titlesString, cb) {
		var a = new XMLHttpRequest(),
			b;
		a.open("GET", "/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=" + encodeURIComponent(titlesString), true);
		a.onload = function() {
			if (a.status == 200) {
				b = JSON.parse(a.responseText);
				cb(b);
			} else {
				console.warn("could not load {" + titlesString + "}");
			}
		}
		a.send();
	}

	// get subpage name by date
	cv.fn.getDateFormat = function(yyyy, mm, dd) {
		var a = [yyyy, mm, dd];
		a[1] = cv.data.months[Number(a[1]) - 1];
		a[2] = String(a[2]);
		if (a[2].length == 1) {
			a[2] = "0" + a[2];
		}
		return a[2] + " " + a[1] + " " + a[0];
	}

	// get content of log page
	cv.fn.queryLogPage = function(nav, yyyy, mm, dd, cb) {
		var fullpagename = cv.data.logPath + cv.fn.getDateFormat(yyyy, mm, dd);
		cv.fn.queryPage(fullpagename, function(data) {
			var a = data.query.pages,
				b, // pageid
				c;
			for (b in a) {
				if (b > -1) {
					c = cv.fn.trimLogContent(a[b].revisions[0]["*"]);
					cb(c);
				} else {
					console.warn("log page not found");
					cb("[0000-00-00 00:00:00] -!- chat view error: could not find " + fullpagename);
				}
				break;
			}
		});
	}

	// trim log page content
	cv.fn.trimLogContent = function(s) {
		return s.trim().replace(/\<pre class\=\"ChatLog\"\>\n*/, "").replace(/\<\/pre\>[\s\S]*$/, "").trim();
	}

	// escape messages
	cv.fn.escapeMessageText = function(s) {
		return s.replace(/[\<\>]/g, function(m) {
			// apostrophes, quote marks and ampersands are irrelevant for xss prevention here
			var a = {
				"<": "lt",
				">": "gt"
			}
			return "&" + a[m] + ";";
		});
	}

	// parse log page
	cv.fn.parseContent = function(s) {
		var lines = s.split("\n"),
			ul = document.createElement("ul"),
			segments,
			nodes,
			prevPoster = null,
			users = [], // users that need an avatar
			isEmptyLine = false,
			emptyLogPage;
		lines.forEach(function(line) {
			nodes = {
				li: document.createElement("li")
			}
			// check and fix pre-2014 syntax (before march 30, 2014
			if (!/^\[\d{4}\-\d{2}\-\d{2} [0-2][0-9]\:[0-6][0-9]\:[0-6][0-9]/.test(line) && line.length > 0) {
				if (/^[0-2][0-9]\:[0-6][0-9] /.test(line)) {
					// message or inline alert
					line = "[0000-00-00 " + line.substr(0, 5) + ":00]" + line.substr(5);
					// note that '/me' messages were originally logged as the plain sending text, but this is not a problem because the new syntax is turned back
					// into its original form while being parsed by the chat viewer
				} else {
					// (n+1)th line in a message with more than 1 line (time is irrelevant because it will be parsed as a '.continue' message
					// note that if this is part of a '/me' message, this line will be displayed as a normal message
					line = "[0000-00-00 XX:XX:00] &lt;" + prevPoster + "&gt; " + line;
				}
			}
			// check if is a me-message
			if (line.charAt(22) == "*" || line.substr(22, 2) == " *") {
				// turn back into the default syntax for easier processing
				// (some old '/me' lines (e.g. see april 30, 2014) had an extra space before the asterisk)
				line = line.substr(0, 22) + line.substr(line.charAt(22) == "*" ? 22 : 23).replace(/^\* ([^ ]+)/, function(m, m1) {
					return "&lt;" + m1 + "&gt; /me";
				});
			}
			// line segments
			segments = [
				line.substr(12, 5).replace(/^\d{2}/, function(m) {return m % 12;}), // time
				line.substr(22) // message
			];
			if (line.length == 0) {
				// wikia thinks i need to compare String.prototype.length
				// with ===, dahek with wikia logic
				// ...anywayz, make sure that the line contains something
				// (e.g. cpcnub didn't create an empty log again...)
				// well tbh i'd rather have an empty log than cpcb posting the same log over 9k times
				// poor halp.ucpls, sactage should start paying him for removing duplicate logs
				console.warn("lol empty line wth am i even logging this");
				console.warn("oi just figured out- i'm doing a console.log about project:chat/logs. it rhymes");
				console.warn("you know what else rhymes? %c'jes is a nub. is face luks liek a mop'", "font-style: italic;");
				console.warn("o wait no that's the truth");
				console.warn("^ btw the upper line should have had a gooby image in its end. but apparently using background-image in css is no longer supported (pls)");
				isEmptyLine = true;
			} else if (segments[1].charAt(0) != "-") {
				// @ message
				// make sure that message is empty (e.g. 21:34 on march 29, 2014)
				segments[1] += "  ";
				// push content to segments
				segments.push.apply(segments, segments[1].match(/\&lt\;(.+?)\&gt\; ([\s\S]*$)/).slice(1, 3));
				segments[2] = segments[2].replace(/_/g, " ");
				// message - li
				nodes.li.setAttribute("data-user", segments[2]);
				// message - avatar
				nodes.avatar = new Image();
				nodes.avatar.classList.add("avatar");
				nodes.avatar.width = 28;
				nodes.avatar.height = 28;
				// message - time
				nodes.time = document.createElement("span");
				nodes.time.textContent = segments[0];
				nodes.time.classList.add("time");
				// message - user
				nodes.user = document.createElement("span");
				nodes.user.textContent = segments[2];
				nodes.user.classList.add("username");
				if (users.indexOf(segments[2]) === -1) {
					users.push(segments[2]);
				}
				// message - message content
				nodes.msg = document.createElement("span");
				nodes.msg.classList.add("message");
				if (segments[3].indexOf("/me ") === 0) {
					// me-message
					nodes.msg.innerHTML = cv.fn.escapeMessageText(segments[3].substr(3)); // substr 3 to get the space in the "/me " as well
					nodes.meUsername = document.createElement("span");
					nodes.meUsername.appendChild(document.createTextNode("* "));
					nodes.meUsernameInner = document.createElement("span");
					nodes.meUsernameInner.textContent = segments[2];
					nodes.meUsername.appendChild(nodes.meUsernameInner);
					nodes.msg.insertBefore(nodes.meUsername, nodes.msg.childNodes[0]);
					nodes.msg.classList.add("me-message");
					nodes.li.classList.add("me-message-line");
				} else {
					// regular message
					nodes.msg.innerHTML = cv.fn.escapeMessageText(segments[3]);
				}
				// check if is continued
				if (prevPoster === segments[2]) {
					nodes.li.classList.add("continued");
				}
				prevPoster = segments[2];
				// append children
				nodes.li.appendChild(nodes.avatar);
				nodes.li.appendChild(nodes.time);
				nodes.li.appendChild(nodes.user);
				nodes.li.appendChild(nodes.msg);
			} else {
				// @ inline alert
				prevPoster = null;
				nodes.li.classList.add("inline-alert");
				nodes.li.textContent = segments[1].substr(4);
			}
			// append
			if (!isEmptyLine) {
				ul.appendChild(nodes.li);
			} else {
				isEmptyLine = false;
			}
		});
		if (ul.childNodes.length == 0) {
			// might as well have used :empty and :empty::after, but nah :P
			emptyLogPage = {};
			emptyLogPage.li = document.createElement("li");
			emptyLogPage.li.textContent = "lol looks like the logs are an empty line. way to go cpcb";
			emptyLogPage.span = document.createElement("span");
			emptyLogPage.span.textContent = "far more twisted!"; // lol if u got dat reference ur awesome
			emptyLogPage.span.classList.add("chatview-splash");
			emptyLogPage.li.appendChild(emptyLogPage.span);
			ul.appendChild(emptyLogPage.li);
		}
		return {
			ul: ul,
			users: users
		};
	}

	// load log page and turn into html
	cv.fn.logPageToHtml = function(nav, yyyy, mm, dd, cb) {
		cv.fn.queryLogPage(nav, yyyy, mm, dd, function(content) {
			var markup = cv.fn.parseContent(content);
			cb(markup.ul, markup.users);
		});
	}

	// add interface to page
	cv.fn.createInterface = function(cb) {
		var nav = document.createElement("nav"),
			nodes = {},
			temp,
			i,
			currTime = new Date();
		// create nodes
		nav.classList.add("chatview");
		// nodes - panel
		nodes.panel = document.createElement("div");
		nodes.panel.classList.add("chatview-panel");
		// nodes - date
		nodes.date_y = document.createElement("select");
		nodes.date_m = document.createElement("select");
		nodes.date_d = document.createElement("select");
		nodes.date_y.classList.add("chatview-panel-date-y");
		nodes.date_m.classList.add("chatview-panel-date-m");
		nodes.date_d.classList.add("chatview-panel-date-d");
		// nodes - submit button
		nodes.go = document.createElement("input");
		nodes.go.type = "button";
		nodes.go.classList.add("chatview-panel-go");
		nodes.go.value = "go";
		// nodes - container
		nodes.container = document.createElement("div");
		nodes.container.classList.add("chatview-container");
		// add date options
		for (i = 0; i < 3; i++) {
			temp = document.createElement("option");
			temp.textContent = ["Year", "Month", "Day"][i];
			temp.disabled = true;
			nodes["date_" + ["y", "m", "d"][i]].appendChild(temp);
		}
		for (i = 1; i <= 31; i++) {
			temp = document.createElement("option");
			temp.value = i;
			temp.textContent = i;
			if (i == currTime.getUTCDate()) {
				temp.selected =  true;
			}
			nodes.date_d.appendChild(temp);
		}
		cv.data.months.forEach(function(m, i) {
			temp = document.createElement("option");
			temp.value = i + 1;
			temp.textContent = m;
			if (i == currTime.getUTCMonth()) {
				temp.selected =  true;
			}
			nodes.date_m.appendChild(temp);
		});
		for (i = 2012; i <= new Date().getUTCFullYear(); i++) {
			temp = document.createElement("option");
			temp.value = i;
			temp.textContent = i;
			if (i == currTime.getUTCFullYear()) {
				temp.selected =  true;
			}
			nodes.date_y.appendChild(temp);
		}
		// append nodes
		nodes.panel.appendChild(nodes.date_y);
		nodes.panel.appendChild(nodes.date_m);
		nodes.panel.appendChild(nodes.date_d);
		nodes.panel.appendChild(nodes.go);
		nav.appendChild(nodes.panel);
		nav.appendChild(nodes.container);
		// return
		cb(nav);
	}

	// get date from the form
	cv.fn.getFormData = function(nav) {
		var y = nav.querySelector(".chatview-panel-date-y").value,
			m = nav.querySelector(".chatview-panel-date-m").value,
			d = nav.querySelector(".chatview-panel-date-d").value;
		return [y, m, d];
	}

	// get user ids
	cv.fn.getUserIds = function(users, cb) {
		var a = new XMLHttpRequest(),
			b;
		a.open("GET", "/api.php?action=query&format=json&list=users&ususers=" + encodeURIComponent(users.join("|")), true);
		a.onload = function() {
			if (a.status == 200) {
				b = JSON.parse(a.responseText);
				cb(b);
			} else {
				console.warn("could not user ids of users {" + users.join(" | ") + "}");
			}
		}
		a.send();
	}

	// get avatar by user ids
	cv.fn.getUserAvatars = function(userIds, avatars, cb) {
		avatars = avatars instanceof Object ? avatars : {};
		if (userIds.length > 0) {
			var a = new XMLHttpRequest(),
				b,
				c;
			a.open("GET", "/api/v1/User/Details?size=28&ids=" + encodeURIComponent(userIds.splice(0, 100).join(",")), true);
			a.onload = function() {
				if (a.status == 200) {
					b = JSON.parse(a.responseText);
					for (c in b.items) {
						avatars[b.items[c].name] = b.items[c].avatar;
					}
					cv.fn.getUserAvatars(userIds, avatars, cb);
				} else {
				}
			}
			a.send();
		} else {
			cb(avatars);
		}
	}

	// seal or unseal gui from interactions
	cv.fn.guiState = function(nav, mode) {
		// mode: {true => interactive, false => non interactive}
		var mods = nav.querySelectorAll("select, input"),
			i;
		for (i = 0; i < mods.length; i++) {
			mods[i].disabled = !mode;
		}
	}

	// prevent gui interactions
	cv.fn.seal = function(nav) {
		cv.fn.guiState(nav, false);
	}

	// allow gui interactions
	cv.fn.unseal = function(nav) {
		cv.fn.guiState(nav, true);
	}

	// insert created interface
	cv.fn.insertNewInterface = function(placeholder) {
		cv.fn.createInterface(function(nav) {
			/*var mwct = document.querySelector("#mw-content-text");
			mwct.parentNode.replaceChild(nav, mwct);*/
			nav.querySelector(".chatview-panel-go").addEventListener("click", function() {
				var a = cv.fn.getFormData(nav),
					b = a[0];
					b += "-" + (a[1].length == 1 ? "0" : "") + a[1];
					b += "-" + (a[2].length == 1 ? "0" : "") + a[2];
					b = new Date(b).getTime();
				// date is march 30, 2014, or later <--- irrelevant, now all dates are ok! :)
				cv.fn.seal(nav); // prevent further interactions until success or error
				cv.fn.logPageToHtml(nav, a[0], a[1], a[2], function(ul, users) {
					var container = nav.querySelector(".chatview-container");
					while (container.childNodes.length > 0) {
						container.removeChild(container.childNodes[0]);
					}
					container.appendChild(ul);
					cv.fn.getUserIds(users, function(data) {
						var user,
							ids = [],
							i;
						for (i = 0; i < data.query.users.length; i++) {
							user = data.query.users[i];
							if (user.hasOwnProperty("userid")) {
								// user exists
								ids.push(user.userid);
							}
						}
						cv.fn.getUserAvatars(ids, {}, function(avatars) {
							var imgs = nav.querySelectorAll(".chatview-container .avatar"),
								i,
								user;
							for (i = 0; i < imgs.length; i++) {
								user = imgs[i].parentNode.getAttribute("data-user");
								if (avatars.hasOwnProperty(user)) {
									// avatar of a defined user
									imgs[i].src = avatars[user];
								} else {
									imgs[i].classList.add("avatar-disabled");
									console.warn("user {" + user + "} not found");
								}
							}
							cv.fn.unseal(nav);
						});
					});
				});
			});
			// replace placeholder
			placeholder.parentNode.replaceChild(nav, placeholder);
		});
	}

	/* implementations */

	// add css
	mw.util.addCSS(cv.data.css);

	// add interface
	Array.prototype.forEach.call(document.querySelectorAll(".chatview-loader"), function(node) {
		cv.fn.insertNewInterface(node);
	});
}