window.subscribedWikis = [];
window.allWikis = [];
window.rlWikis = {};
window.langs = ["BG","BS","CS","DE","EL","EN","ES","ET","FR","HU","ID","IT","JA","KO","NL","PL","PT","PT-BR","RU","SK","UK","TH","TR","VI","ZH","ZH-CN"];

window.maxChanges = 10;
window.wiki_i = 0;
window.grcTimer = 0;
window.getPatrolData = false;

window.grcDTF = new Intl.DateTimeFormat('pt',{
	year: 'numeric', day: 'numeric', month: 'numeric',
	hour: 'numeric', minute: 'numeric', second: 'numeric',
	timeZoneName:'short'
});

window.reloadWikis = function() {
	if (grcTimer != undefined) clearTimeout(grcTimer);
	var h = "";
	for (wiki in subscribedWikis) {
		if (subscribedWikis[wiki]==undefined) continue;
		h+= '<div id="rc-'+subscribedWikis[wiki].key+'"><h3><a href="\/\/'+subscribedWikis[wiki].domain+'/Special:RecentChanges" target="_blank">'+subscribedWikis[wiki].name+'</a> <img src="https://help.gamepedia.com/media/help.gamepedia.com/d/db/Icon_delete.png" style="cursor:pointer; width:60px; position:relative; top:-3px;" onClick="$(\'#rco-'+subscribedWikis[wiki].key+'\').prop(\'checked\',false).change();" /></h3><ul></ul></div>';
	}
	$("#grasprc").html(h);
	wiki_i = 0;
	getNextWiki();
}

window.cleanDate = function(dt, min) {
	return new Date((new Date(dt)).setMinutes(min)).setSeconds(0);
}

window.getNextWiki = function() {
	if (subscribedWikis[wiki_i] == undefined) return;
	d = '\/\/'+subscribedWikis[wiki_i].domain;
	var api = (d == "\/\/help.gamepedia.com")?new mw.Api():new mw.ForeignApi(d+"/api.php");
	api.postWithToken('csrf',{
		action:'query',
		list:'recentchanges',
		rcprop: 'title|user|parsedcomment|timestamp|ids|sizes|loginfo|tags'+(getPatrolData?'|patrolled':''),
        rcshow: '!bot',
        rctype: 'edit|new|log',
        rclimit: maxChanges
	}).done(function(data){
		if (subscribedWikis[wiki_i] == undefined) return;
		h = "";
		ns=0;
		for (c in data.query.recentchanges) {
			change = data.query.recentchanges[c];
			if ("actionhidden" in change || "suppressed" in change) {
				ns++;
				continue;
			}
			t = change.title.replace(/ /g,"_").replace(/"/g,"&quot;").replace(/%/g,"%25");
			u = change.user.replace(/ /g,"_");
			da = new Date(change.timestamp);
			tags = "";
			for (ta in change.tags) {
				if (ta>0) tags += ", ";
				tags += change.tags[ta];
			}
			comment = change.parsedcomment.replace(/a href="/g,'a target="_blank" href="'+d);
			if (change.type == "edit" || change.type == "new") {
				diff = change.newlen - change.oldlen;
				diffcolor = (Math.sign(diff)==-1)?'#8b0000;':(Math.sign(diff)==1)?'#006400':'#a2a9b1';
				h+='<li>('+(change.type=="new"?'diff':'<a href="'+d+'/index.php?title='+t+'&diff='+change.revid+'&oldid='+change.old_revid+'" target="_blank">diff</a>')+' | <a href="'+d+'/index.php?title='+t+'&action=history" target="_blank">hist</a>) &nbsp;'+(change.type=="new"?'<b>N</b>':'')+(change.unpatrolled==undefined?'':'<span style="font-weight:bold; color:#f00;">!</span>')+' <a href="'+d+'/'+t+'" target="_blank">'+change.title+'</a> &nbsp;'+grcDTF.format(da)+'&nbsp; <span style="color:'+diffcolor+';">('+diff+')</span> &nbsp;<a href="'+d+'/User:'+u+'" target="_blank">'+change.user+'</a> (<a href="'+d+'/User_talk:'+u+'" target="_blank">discussão</a> | <a href="'+d+'/Special:Contributions/'+u+'" target="_blank">contribs</a>) &nbsp;'+(comment==""?'':'('+comment+')')+(tags==""?'':' (Etiquetas: '+tags+')')+'</li>';
			}
			else if (change.type == "log") {
				if (change.logaction=="delete") {
					h+='<li>(<a href="'+d+'/Special:Log/delete" target="_blank">Registro de exclusão</a>)&nbsp;'+grcDTF.format(da)+' &nbsp; <a href="'+d+'/User:'+u+'" target="_blank">'+change.user+'</a> (<a href="'+d+'/User_talk:'+u+'" target="_blank">discussão</a> | <a href="'+d+'/Special:Contributions/'+u+'" target="_blank">contribs</a>) &nbsp;página deletada <a class="new" href="'+d+'/'+t+'" target="_blank">'+change.title+'</a>&nbsp;'+(comment==""?'':'('+comment+')')+'</li>';
				}
				else if (change.logaction=="block") {
					h+='<li>(<a href="'+d+'/Special:Log/block" target="_blank">Block log</a>)&nbsp;'+grcDTF.format(da)+' &nbsp; <a href="'+d+'/User:'+u+'" target="_blank">'+change.user+'</a> (<a href="'+d+'/User_talk:'+u+'" target="_blank">discussão</a> | <a href="'+d+'/Special:Contributions/'+u+'" target="_blank">contribs</a>) &nbsp;blocked <a href="'+d+'/'+t+'" target="_blank">'+change.title.replace("User:","")+'</a> (<a href="'+d+'/'+t.replace("User","User_talk")+'" target="_blank">discussão</a>) with an expiration time of '+change.logparams.duration+'&nbsp;'+(comment==""?'':'('+comment+')')+'</li>';
				}
				else if (change.logaction=="upload" || change.logaction == "overwrite") {
					h+='<li>(<a href="'+d+'/Special:Log/upload" target="_blank">Upload log</a>)&nbsp;'+grcDTF.format(da)+' &nbsp; <a href="'+d+'/User:'+u+'" target="_blank">'+change.user+'</a> (<a href="'+d+'/User_talk:'+u+'" target="_blank">discussão</a> | <a href="'+d+'/Special:Contributions/'+u+'" target="_blank">contribs</a>) &nbsp;uploaded '+(change.logaction=="overwrite"?'uma nova versão de ':'')+'<a href="'+d+'/'+t+'" target="_blank">'+change.title+'</a>&nbsp;'+(comment==""?'':'('+comment+')')+'</li>';
				}
				else if (change.logaction=="move") {
					h+='<li>(<a href="'+d+'/Special:Log/move" target="_blank">Move log</a>)&nbsp;'+grcDTF.format(da)+' &nbsp; <a href="'+d+'/User:'+u+'" target="_blank">'+change.user+'</a> (<a href="'+d+'/User_talk:'+u+'" target="_blank">discussão</a> | <a href="'+d+'/Special:Contributions/'+u+'" target="_blank">contribs</a>) &nbsp;moved page <a href="'+d+'/'+t+'" target="_blank">'+change.title+'</a> to <a href="'+d+'/'+change.logparams.target_title.replace(/ /g,"_")+'" target="_blank">'+change.logparams.target_title+'</a>&nbsp;'+(comment==""?'':'('+comment+')')+'</li>';
				}
				else if (change.logaction=="profile-edited") {
					h+='<li>(<a href="'+d+'/Special:Log/curseprofile" target="_blank">Profile log</a>)&nbsp;'+grcDTF.format(da)+' &nbsp; <a href="'+d+'/User:'+u+'" target="_blank">'+change.user+'</a> (<a href="'+d+'/User_talk:'+u+'" target="_blank">discussão</a> | <a href="'+d+'/Special:Contributions/'+u+'" target="_blank">contribs</a>) edited the '+change.logparams[(change.logparams[0]==undefined)?"4:section":0].replace("profile-","")+' on '+change.title.replace("UserProfile:","")+'\'s profile. &nbsp;'+(comment==""?'':'('+comment+')')+'</li>';
				}
				else ns++;

			}
			else ns++;
		}
		if (ns>0) h+= "<li>"+ns+" change(s) not shown.</li>";
		$("#rc-"+subscribedWikis[wiki_i].key+" > ul").html(h);
		wiki_i++;
		if (wiki_i<subscribedWikis.length) getNextWiki();
		else grcTimer = setTimeout(function() {wiki_i = 0; getNextWiki();}, 30000);
	}).fail(function(data) {
			console.log("Error: "+data);
			if (getPatrolData) {
				getPatrolData = false;
				getNextWiki();
			}
	});
}
window.rcSubscribe = function(key,domain,name) {
	if ($("#rco-"+key).prop("checked") && $.grep(subscribedWikis,function(w){return w.key==key;}).length==0) {
		if (grcTimer != undefined) clearTimeout(grcTimer);
		subscribedWikis.push({"key":key,"domain":domain,"name":name});
		$("#grasprc").append('<div id="rc-'+key+'"><h3><a href="\/\/'+domain+'/Special:RecentChanges" target="_blank">'+name+'</a> <img src="https://help.gamepedia.com/media/help.gamepedia.com/d/db/Icon_delete.png" style="cursor:pointer; width:60px; position:relative; top:-3px;" onClick="$(\'#rco-'+key+'\').prop(\'checked\',false).change();" /></h3><ul></ul></div>');
		wiki_i = subscribedWikis.length - 1;
		getNextWiki();
	}
	else {
		subscribedWikis = $.grep(subscribedWikis,function(w) { return w.key != key; });
		$("#rc-"+key).remove();
	}
	localStorage.setItem("subscribedWikis",JSON.stringify(subscribedWikis));
}

window.setWikiValue = function(wiki, edits, timestamp) {
	w = $.grep(allWikis,function(w){return w.key==wiki;})[0];
	if (allWikis.indexOf(w) == -1) return;
	allWikis[allWikis.indexOf(w)].edits = edits;
	allWikis[allWikis.indexOf(w)].timestamp = timestamp;
}

window.getWikiValue = function(wiki) {
	w = $.grep(allWikis,function(w){return w.key==wiki;})[0];
	if (w==undefined) return null;
	return {edits:w.edits,timestamp:w.timestamp};
}

window.grcDoneThisMinute = false;
window.grcMinTimer = function() {
	if ((new Date).getMinutes() == 3 && !grcDoneThisMinute) {
		grcDoneThisMinute = true;
		if (Math.abs(Date.parse($("#until").val())-cleanDate(new Date(),30)<3600000)) $("#until").val(grcDTF.format(cleanDate(new Date(),30)));
		if (Math.abs(Date.parse($("#since").val())-cleanDate(new Date()-3600000,0)<3600000)) $("#since").val(grcDTF.format(cleanDate(new Date()-3600000,0)));
		reloadWikiList();
	}
	else {
		grcDoneThisMinute = false;
		setTimeout(grcMinTimer,60000);
	}
}

window.timeSince = function() {
	w = ($("#since").val()=="")?getWikiValue("lastLoad").timestamp:Math.floor(cleanDate(new Date($("#since").val()),0)/1000);
	if (isNaN(w)) return "na hora selecionada";
	since = w * 1000;
	until = ($("#until").val()=="")?cleanDate(new Date(),0):Math.floor(cleanDate(new Date($("#until").val()),0));
	minutesDiff = Math.floor((until - since) / 60000);
	if (minutesDiff <= 60) return "na hora selecionada";
	hoursDiff = Math.floor(minutesDiff/60);
	if (hoursDiff < 24) return "in the "+hoursDiff+" hora(s) selecionada";
	return "in the "+Math.floor(hoursDiff/24)+" dia(s) selecionada";
}

window.reloadWikiList = function() {
	var since = ($("#since").val()=="")?getWikiValue("lastLoad").timestamp:Math.floor(cleanDate(new Date($("#since").val()),0)/1000);
	$("#since").val(grcDTF.format(cleanDate(new Date(since*1000),0)));
	var until = ($("#until").val()=="")?Math.floor(cleanDate(new Date(),30)/1000):Math.floor(cleanDate(new Date($("#until").val()),30)/1000);
	$("#until").val(grcDTF.format(cleanDate(new Date(until*1000),0)));
	$.getJSON("https://www.pcj.us/gp/?since="+since+"&until="+until+"&callback=?").done(function(data){
		$("#grc-wikis").html("");
		rlWikis = data;
		for (wiki in rlWikis) {
			if (wiki == "lastLoad") setWikiValue(wiki,0,rlWikis[wiki]);
			else {
				w = getWikiValue(wiki);
				edits = (w==null)?0:w.edits;
				setWikiValue(wiki,edits+rlWikis[wiki].edits,rlWikis[wiki].rctimestamp);
			}
		}
		allWikis.sort(function(a,b) {
			if (rlWikis[a.key]==undefined && rlWikis[b.key] == undefined) return (a.displayname<b.displayname)?-1:1;
			if (rlWikis[a.key]==undefined) return 1;
			if (rlWikis[b.key]==undefined) return -1;
			wa = rlWikis[a.key].edits;
			wat = rlWikis[a.key].rctimestamp;
			wb = rlWikis[b.key].edits;
			wbt = rlWikis[b.key].rctimestamp;
			if (wa == 0 && wb == 0) return (a.displayname<b.displayname)?-1:1;
			if (wa==wb || (isNaN(wa) && isNaN(wb))) {
				if (wat != "" && wbt != "") return (wat<wbt)?-1:1;
				if (wat != "") return -1;
				if (wbt != "") return 1;
				return (a.displayname<b.displayname)?-1:1;
			}
			if (isNaN(wa) || isNaN(wb)) {
				if (wat != "" && wbt != "") return (wat<wbt)?-1:1;
				if (wat != "") return -1;
				if (wbt != "") return 1;
				return (isNaN(wa))?1:-1;
			}
			return (wb-wa);
		});
		for (w in allWikis) {
			var wiki = allWikis[w];
			dn = wiki.displayname;
			if (dn == undefined) continue;
			sdn = (dn.replace(" Wiki","").lastIndexOf('(')<30)?dn.replace(" Wiki",""):dn.replace(" Wiki","").slice(0,30)+'... '+dn.slice(dn.lastIndexOf('('));
			editMsg = '';
			if (rlWikis[wiki.key] != undefined) {
				if (!isNaN(rlWikis[wiki.key].edits))
					editMsg = ' - <span style="color:indianred;">'+((rlWikis[wiki.key].edits>0)?(rlWikis[wiki.key].edits+' edit(s) '):'non-edit change(s) occurred ')+timeSince()+'</span>';
			}
			$("#grc-wikis").append('<div data-wiki-key="'+wiki.key+'" data-language="'+dn.substring(dn.lastIndexOf("(")+1,dn.lastIndexOf(")"))+'"><input type="checkbox" name="rc-options[]" id="rco-'+wiki.key+'" onchange="rcSubscribe(\''+wiki.key+'\',\''+wiki.domain+'\',\''+dn.replace(/'/g,"\\'")+'\');" '+($.grep(subscribedWikis,function(w){return w.key==wiki.key}).length==1?'checked="" ':'')+'/> <label for="rco-'+wiki.key+'">'+sdn+((wiki.wiki_manager==mw.config.get("wgUserName"))?'*':'')+'</label>'+editMsg+'</div>');
		}
		if ("Notification" in window) {
			if (Notification.permission === "granted") {
				var n = new Notification("A lista de wikis do GRASP RC foi atualizada.");
  				setTimeout(n.close.bind(n), 5000);
			}
		}
		setTimeout(grcMinTimer,60000);
	});

}

window.loadWikiList = function() {
	var api = new mw.Api();
	api.get( {
		'action': 'allsites',
		'do': 'getSiteStats',
		'filter': 'wikis|md5_key,ss_total_edits,wiki_domain,wiki_display_name,wiki_managers,wiki_tags'
	}).done(function(data) {
		wikis = data.data.wikis;
		for (w in wikis) {
			var wiki = wikis[w];
			if (wiki.wiki_tags.indexOf("redirect")!=-1) continue;
			allWikis.push({"key":wiki.md5_key,"edits":(wiki.ss_total_edits == undefined)?null:wiki.ss_total_edits,"timestamp":null,"domain":wiki.wiki_domain,"displayname":wiki.wiki_display_name,"wiki_manager":wiki.wiki_managers[0]});
	    }
	    allWikis.push({"key":"lastLoad","edits":0,"timestamp":Math.floor(cleanDate(new Date(),0)/1000)-3600});
		reloadWikiList();
	});
}

window.toggleLangs = function() {
	$("#grc-langs input").each(function(index) {
		if ($(this).prop("checked")==true) {
			$("#grc-wikis div[data-language='"+$(this).attr("id").replace("lang-","")+"']").show();
		}
		else {
			$("#grc-wikis div[data-language='"+$(this).attr("id").replace("lang-","")+"']").hide().children("input").prop("checked",false).change();
		}
	});
	$("input[name='grc-filter'][value='all']").prop("checked",true);
}

mw.loader.using(['mediawiki.api','mediawiki.ForeignApi']).then(function() {
	if (mw.config.get('wgPageName') != "Gamepedia_Help_Wiki:GRASP_RC" || mw.config.get('wgAction')!='view') return;
	if (mw.config.get("wgUserGroups").indexOf("grasp")!=-1 || mw.config.get("wgUserGroups").indexOf("global_sysop")!=-1) getPatrolData = true;
	if (("Notification" in window)) {
		if (Notification.permission !== 'denied') Notification.requestPermission();
	}
	$("#no-grasp").hide();
	$("body,div#content.mw-body").unbind("dblclick");
	if (localStorage.getItem("subscribedWikis")!= null) subscribedWikis = JSON.parse(localStorage["subscribedWikis"]);
	if (localStorage.getItem("maxChanges")!= null) maxChanges = localStorage["maxChanges"];
	$("#grc-options").append('<label for="maxChanges">Número máximo de alterações por wiki: </label> <input type="text" value="'+maxChanges+'" id="maxChanges" size="1" maxlength="3" />');
	$("#maxChanges").change(function() {
		maxChanges = this.value;	
		localStorage.setItem("maxChanges",maxChanges);
	});
	$("#grc-options").append('<br /><label for="since">Desde: </label> <input type="text" id="since" style="width:15em;" /> <input type="button" id="sinceReset" value="Reiniciar" />');
	$.datetimepicker.setDateFormatter({
	    parseDate: function (date, format) {
	        return Date.parse(date);
	    },
	    formatDate: function (date, format) {
	    	if (format == "H:i") return (new Date(date)).getHours()+':00';
	    	if (format == "Y/m/d") return (new Date(date)).toLocaleDateString();
	        return grcDTF.format(new Date(new Date(date).setMinutes(0)));
	    }
	});
	$("#since").datetimepicker({theme:'dark',onChangeDateTime:function(current_time,$input){reloadWikiList();},defaultTime:cleanDate(new Date()-3600000,0)});
	$("#sinceReset").click(function() {
		$("#since").val(grcDTF.format(cleanDate(new Date()-3600000,0)));
		reloadWikiList();
	});
	$("#grc-options").append('<br /><label for="until">Até: </label> <input type="text" id="until" style="width:15em;" /> <input type="button" id="untilReset" value="Reiniciar" />');
	$("#untilReset").click(function() {
		$("#until").val(grcDTF.format(cleanDate(new Date(),0)));
		reloadWikiList();
	});
	$("#until").datetimepicker({theme:'dark',onChangeDateTime:function(current_time,$input){reloadWikiList();},defaultTime:cleanDate(new Date(),0)});
	$("#grc-options").append('<br />Mostrar idiomas:<br/><div id="grc-langs" style="overflow:auto; height:4.6em; text-align:right;"></div>');
	for (i=0;i<langs.length;i++) $("#grc-langs").append('<label for="lang-'+langs[i]+'">'+langs[i]+'</label>&nbsp;<input type="checkbox" id="lang-'+langs[i]+'" checked="true" onchange="toggleLangs();" /><br/>');
	$("#grc-options").append('<input type="button" value="Todos" onclick="$(\'#grc-langs input\').prop(\'checked\',true); toggleLangs();" />&nbsp;');
	$("#grc-options").append('<input type="button" value="Nenhum" onclick="$(\'#grc-langs input\').prop(\'checked\',false); toggleLangs();" />');
	$("#grc-options").append('<br />Mostrar wikis com (na semana passada):<br /><input type="radio" name="grc-filter" id="grc-filter-all" value="all" checked="" /><label for="grc-filter-all">Todos</label> <input type="radio" name="grc-filter" id="grc-filter-lv" value="low_volume" /><label for="grc-filter-lv">Volume baixo</label> <input type="radio" name="grc-filter" id="grc-filter-ne" value="no_edits" /><label for="grc-filter-ne">Sem edições</label>');
	$("input[name='grc-filter']").change(function() {
		$v = $("input[name='grc-filter']:checked").val();
		if ($v == "all") {
			toggleLangs();
			return;
		}
		$.getJSON("https://www.pcj.us/gp/filters.php?f="+$v+"&callback=?").done(function(data) {
			$("#grc-wikis div").hide().children("input").prop("checked",false).change();
			for (i=0;i<data.length;i++) {
				$d = $("#grc-wikis div[data-wiki-key='"+data[i]+"'");
				if ($("#lang-"+$d.attr("data-language")).prop("checked")) $d.show();
			}
		});
	});
	loadWikiList();
	reloadWikis();
});