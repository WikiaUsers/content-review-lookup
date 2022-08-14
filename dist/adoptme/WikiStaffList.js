/*************
Title        :   WikiStaffList
Description  :   Displaying a list of users with group rights 'sysop', 'content-moderator', 'threadmoderator', and/or 'rollback'
Author       :   Vastmine1029
Version      :   1.0
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
		for (i=0; i<data.length; i++) {
			for(j=0; j<data[i]['groups'].length; j++) {
				if (data[i]['groups'][j] === "bot" || data[i]['groups'][j] === "bot-global") {
					bot.push(data[i]['name']);
					break;
				}
			}
		}
		
		// checking user groups and sorting it accordingly by role hierarchy
		// Hierarchy: sysop, content-moderator/threadmoderator, rollback
		for (i=0; i<data.length; i++) {
			// checking sysop
			for(j=0; j<data[i]['groups'].length; j++) {
				if (data[i]['groups'][j] === "sysop") {
					sysop.push(data[i]['name']);
					for(k=0; k<bot.length; k++) {
						if(data[i]['name'] === bot[k]) {
							sysop.pop();
							break;
						}
					}
				}
			}
			
			//checking content-moderator
			for(j=0; j<data[i]['groups'].length; j++) {
				if(data[i]['groups'][j] === "content-moderator") {
					contentmod.push(data[i]['name']);
					for(k=0; k<sysop.length; k++) {
						if(data[i]['name'] === sysop[k]) {
							contentmod.pop();
							break;
						}
					}
					for(k=0; k<bot.length; k++) {
						if(data[i]['name'] === bot[k]) {
							contentmod.pop();
							break;
						}
					}
				}
			}
			
			//checking thread-moderator
			for(j=0; j<data[i]['groups'].length; j++) {
				if(data[i]['groups'][j] === "threadmoderator") {
					threadmod.push(data[i]['name']);
					for(k=0; k<sysop.length; k++) {
						if(data[i]['name'] === sysop[k]) {
							threadmod.pop();
							break;
						}
					}
					for(k=0; k<bot.length; k++) {
						if(data[i]['name'] === bot[k]) {
							threadmod.pop();
							break;
						}
					}
				}
			}
			
			//checking rollback
			for(j=0; j<data[i]['groups'].length; j++) {
				if(data[i]['groups'][j] === "rollback") {
					rollback.push(data[i]['name']);
					for(k=0; k<sysop.length; k++) {
						if(data[i]['name'] === sysop[k]) {
							rollback.pop();
							break;
						}
					}
					for (k=0; k<contentmod.length; k++) {
						if(data[i]['name'] === contentmod[k]) {
							rollback.pop();
							break;
						}
					}
					for (k=0; k<threadmod.length; k++) {
						if(data[i]['name'] === threadmod[k]) {
							rollback.pop();
							break;
						}
					}
					for(k=0; k<bot.length; k++) {
						if(data[i]['name'] === bot[k]) {
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
		if($("#sysop").length) {
			if(sysop.length <= 0) {
				sysop_list = "<dl><dd><b>No members</b></dd></dl>";
			}
			else {
				for (i=0; i<sysop.length; i++) {
					sysop_list += "<li><a href=\"/wiki/User:" + sysop[i] + "\">" + sysop[i] + "</a></li>";
				}
				sysop_list += "</ul>";
			}
			document.querySelector("#sysop").innerHTML = sysop_list;
		}
		
		var contentmod_list = "<ul>";
		if($("#content-moderator").length) {
			if(contentmod.length <= 0) {
				contentmod_list = "<dl><dd><b>No members</b></dd></dl>";
			}
			else {
				for (i=0; i<contentmod.length; i++) {
					contentmod_list += "<li><a href=\"/wiki/User:" + contentmod[i] + "\">" + contentmod[i] + "</a></li>";
				}
				contentmod_list += "</ul>";
			}
			document.querySelector("#content-moderator").innerHTML = contentmod_list;
		}
		
		var threadmoderator_list = "<ul>";
		if($("#threadmoderator").length) {
			if(threadmod.length <= 0) {
				contentmod_list = "<dl><dd><b>No members</b></dd></dl>";
			}
			else {
				for (i=0; i<threadmod.length; i++) {
					threadmoderator_list += "<li><a href=\"/wiki/User:" + threadmod[i] + "\">" + threadmod[i] + "</a></li>";
				}
				threadmoderator_list += "</ul>";
			}
			document.querySelector("#threadmoderator").innerHTML = threadmoderator_list;
		}
		
		var rollback_list = "<ul>";
			if($("#rollback").length) {
				if(rollback.length <= 0) {
					rollback_list = "<dl><dd><b>No members</b></dd></dl>";
				}
			else {
				for (i=0; i<rollback.length; i++) {
					rollback_list += "<li><a href=\"/wiki/User:" + rollback[i] + "\">" + rollback[i] + "</a></li>";
				}
				rollback_list += "</ul>";
			}
			document.querySelector("#rollback").innerHTML = rollback_list;
		}
	});
});