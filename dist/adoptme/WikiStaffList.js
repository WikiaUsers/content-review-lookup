/*************
Title        :   WikiStaffList
Description  :   Displaying a list of users with group rights 'sysop', 'content-moderator', 'threadmoderator', and/or 'rollback'
Author       :   Vastmine1029
Version      :   1.0.1
!!!!!!!!! NOTE: FOR ADOPT ME! WIKI (https://adoptme.fandom.com) USE ONLY !!!!!!!!!
*************/

mw.loader.using('mediawiki.api', function() {
	var api = new mw.Api(), data;
	var bot = ["Abuse filter", "AkulakhanBot"];
	var sysop = [];
	var contentmod = [];
	var threadmod = [];
	var rollback = [];
	
	api.get({
		action: 'query',
		list: 'allusers',
		augroup: 'sysop|content-moderator|threadmoderator|rollback',
		auprop: 'groups',
		aulimit: 'max'
	}).then(function(d) {
		data = d.query.allusers;
		
		// compiling accounts with "bot" or "bot-global" also containing "sysop|content-moderator|threadmoderator|rollback"
		for (var i=0; i < data.length; i++) {
			for (var j=0; j < data[i]['groups'].length; j++) {
				if (data[i]['groups'][j] === "bot" || data[i]['groups'][j] === "bot-global") {
					bot.push(data[i]['name']);
					break;
				}
			}
		}
		
		// checking user groups and sorting it accordingly by role hierarchy
		// Hierarchy: sysop, content-moderator/threadmoderator, rollback
		for (var i=0; i < data.length; i++) {
			// checking sysop
			for (var j = 0; j < data[i]['groups'].length; j++) {
				if (data[i]['groups'][j] === "sysop") {
					sysop.push(data[i]['name']);
					for(var k=0; k < bot.length; k++) {
						if(data[i]['name'] === bot[k] && sysop.includes(data[i]['name'])) {
							sysop.pop();
							break;
						}
					}
				}
			}
			
			// checking content-moderator
			for(var j=0; j < data[i]['groups'].length; j++) {
				if (data[i]['groups'][j] === "content-moderator") {
					contentmod.push(data[i]['name']);
					for (var k=0; k < sysop.length; k++) {
						if(data[i]['name'] === sysop[k] && contentmod.includes(sysop[k])) {
							contentmod.pop();
							break;
						}
					}
					for (var k=0; k < bot.length; k++) {
						if(data[i]['name'] === bot[k] && contentmod.includes(bot[k])) {
							contentmod.pop();
							break;
						}
					}
				}
			}
			
			// checking thread-moderator
			for (var j=0; j < data[i]['groups'].length; j++) {
				if (data[i]['groups'][j] === "threadmoderator") {
					threadmod.push(data[i]['name']);
					for(var k=0; k < sysop.length; k++) {
						if(data[i]['name'] === sysop[k] && threadmod.includes(sysop[k])) {
							threadmod.pop();
							break;
						}
					}
					for (var k=0; k < bot.length; k++) {
						if(data[i]['name'] === bot[k] && threadmod.includes(bot[k])) {
							threadmod.pop();
							break;
						}
					}
				}
			}
			
			// checking rollback
			for (var j=0; j < data[i]['groups'].length; j++) {
				if(data[i]['groups'][j] === "rollback") {
					rollback.push(data[i]['name']);
					for(var k=0; k < sysop.length; k++) {
						if(data[i]['name'] === sysop[k] && rollback.includes(sysop[k])) {
							rollback.pop();
							break;
						}
					}
					for (var k=0; k < contentmod.length; k++) {
						if(data[i]['name'] === contentmod[k] && rollback.includes(contentmod[k])) {
							rollback.pop();
							break;
						}
					}
					for (var k=0; k < threadmod.length; k++) {
						if(data[i]['name'] === threadmod[k] && rollback.includes(threadmod[k])) {
							rollback.pop();
							break;
						}
					}
					
					for(var k=0; k < bot.length; k++) {
						if(data[i]['name'] === bot[k] && rollback.includes(bot[k])) {
							rollback.pop();
							break;
						}
					}
				}
			}
		}
		console.log("sysop:", sysop);
		console.log("content-moderator:", contentmod);
		console.log("threadmoderator:", threadmod);
		console.log("rollback:", rollback);
		console.log("bot:", bot)
		
		var sysop_list = "<ul>";
		if ($("#adoptme_sysop_list").length) {
			if(sysop.length <= 0) {
				sysop_list = "<dl><dd><b>No members</b></dd></dl>";
			}
			else {
				for (var i=0; i < sysop.length; i++) {
					sysop_list += "<li><a href=\"/wiki/User:" + sysop[i] + "\">" + sysop[i] + "</a></li>";
				}
				sysop_list += "</ul>";
			}
			document.querySelector("#adoptme_sysop_list").innerHTML = sysop_list;
		}
		
		var contentmod_list = "<ul>";
		if ($("#adoptme_content-moderator_list").length) {
			if(contentmod.length <= 0) {
				contentmod_list = "<dl><dd><b>No members</b></dd></dl>";
			}
			else {
				for (i=0; i < contentmod.length; i++) {
					contentmod_list += "<li><a href=\"/wiki/User:" + contentmod[i] + "\">" + contentmod[i] + "</a></li>";
				}
				contentmod_list += "</ul>";
			}
			document.querySelector("#adoptme_content-moderator_list").innerHTML = contentmod_list;
		}
		
		var threadmoderator_list = "<ul>";
		if ($("#adoptme_threadmoderator_list").length) {
			if (threadmod.length <= 0) {
				contentmod_list = "<dl><dd><b>No members</b></dd></dl>";
			}
			else {
				for (var i=0; i < threadmod.length; i++) {
					threadmoderator_list += "<li><a href=\"/wiki/User:" + threadmod[i] + "\">" + threadmod[i] + "</a></li>";
				}
				threadmoderator_list += "</ul>";
			}
			document.querySelector("#adoptme_threadmoderator_list").innerHTML = threadmoderator_list;
		}
		
		var rollback_list = "<ul>";
			if ($("#adoptme_rollback_list").length) {
				if(rollback.length <= 0) {
					rollback_list = "<dl><dd><b>No members</b></dd></dl>";
				}
			else {
				for (var i=0; i < rollback.length; i++) {
					rollback_list += "<li><a href=\"/wiki/User:" + rollback[i] + "\">" + rollback[i] + "</a></li>";
				}
				rollback_list += "</ul>";
			}
			document.querySelector("#adoptme_rollback_list").innerHTML = rollback_list;
		}
	});
});