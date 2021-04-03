window.subscribedWikis = [];
window.allWikis = [];
window.rlWikis = {};
window.langs = ["BG","BS","CS","DE","EL","EN","ES","FI","FR","HU","IT","JA","KO","NL","PL","PT","PT-BR","RU","TH","TR","VI","ZH","ZH-CN","ZH-HANS"];
window.filterKeys = ["98a19227d2861539fde4d692de3543ce","938808c3dc01ddd174cb7d52dadc62d3","814eff22aaa6e6bd72c91dfd23730bcf","8e98826df25deccf6f221a790ee48fda","9c91e3786ffaca8661fc56c435cfc633","54229f7e07a0a8d5b0cbc2089ec0b5f8","7c5da2f7c47a806d7ba4bbfa859f1ac2","31bc79500632dfaefc98a87ce9ad7522","31dd0d62c4cd04d83c249450b498ef51","c65873a5527a838b5f1cb64f76553b2f","806c5afc5a31085ae56003681e0f5ba3","7879ecf947bdb599e83c7eaab9a8c0f6","54229f7e07a0a8d5b0cbc2089ec0b5f8"];

window.maxChanges = 10;
window.wiki_i = 0;
window.grcTimer = 0;
window.getPatrolData = false;

window.grcDTF = new Intl.DateTimeFormat('en-US',{
	year: 'numeric', month: 'numeric', day: 'numeric',
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

window.getNextWiki = function() {
	if (subscribedWikis[wiki_i] == undefined) return;
	d = '\/\/'+subscribedWikis[wiki_i].domain;
	var api = new mw.ForeignApi(d+"/api.php");
	api.postWithToken('csrf',{
		action:'query',
		list:'recentchanges',
		rcprop: 'title|user|parsedcomment|timestamp|ids|sizes|loginfo'+(getPatrolData?'|patrolled':''),
        rcshow: '!bot',
        rclimit: maxChanges
	}).done(function(data){
		if (subscribedWikis[wiki_i] == undefined) return;
		h = "";
		ns=0;
		for (c in data.query.recentchanges) {
			change = data.query.recentchanges[c];
			t = change.title.replace(/ /g,"_").replace(/"/g,"&quot;");
			u = change.user.replace(/ /g,"_");
			da = new Date(change.timestamp);
			comment = change.parsedcomment.replace(/a href="/g,'a target="_blank" href="'+d);
			if (change.type == "edit" || change.type == "new") {
				diff = change.newlen - change.oldlen;
				diffcolor = (Math.sign(diff)==-1)?'#8b0000;':(Math.sign(diff)==1)?'#006400':'#a2a9b1';
				h+='<li>('+(change.type=="new"?'diff':'<a href="'+d+'/index.php?title='+t+'&diff=prev&oldid='+change.revid+'" target="_blank">diff</a>')+' | <a href="'+d+'/index.php?title='+t+'&action=history" target="_blank">hist</a>) &nbsp;'+(change.type=="new"?'<b>N</b>':'')+(change.unpatrolled==undefined?'':'<span style="font-weight:bold; color:#f00;">!</span>')+' <a href="'+d+'/'+t+'" target="_blank">'+change.title+'</a> &nbsp;'+grcDTF.format(da)+'&nbsp; <span style="color:'+diffcolor+';">('+diff+')</span> &nbsp;<a href="'+d+'/User:'+u+'" target="_blank">'+change.user+'</a> (<a href="'+d+'/User_talk:'+u+'" target="_blank">talk</a> | <a href="'+d+'/Special:Contributions/'+u+'" target="_blank">contribs</a>) &nbsp;'+(comment==""?'':'('+comment+')')+'</li>';
			}
			else if (change.type == "log") {
				if (change.logaction=="delete") {
					h+='<li>(<a href="'+d+'/Special:Log/delete" target="_blank">Deletion log</a>)&nbsp;'+grcDTF.format(da)+' &nbsp; <a href="'+d+'/User:'+u+'" target="_blank">'+change.user+'</a> (<a href="'+d+'/User_talk:'+u+'" target="_blank">talk</a> | <a href="'+d+'/Special:Contributions/'+u+'" target="_blank">contribs</a>) &nbsp;deleted page <a class="new" href="'+d+'/'+t+'" target="_blank">'+change.title+'</a>&nbsp;'+(comment==""?'':'('+comment+')')+'</li>';
				}
				else if (change.logaction=="block") {
					h+='<li>(<a href="'+d+'/Special:Log/block" target="_blank">Block log</a>)&nbsp;'+grcDTF.format(da)+' &nbsp; <a href="'+d+'/User:'+u+'" target="_blank">'+change.user+'</a> (<a href="'+d+'/User_talk:'+u+'" target="_blank">talk</a> | <a href="'+d+'/Special:Contributions/'+u+'" target="_blank">contribs</a>) &nbsp;blocked <a href="'+d+'/'+t+'" target="_blank">'+change.title.replace("User:","")+'</a> (<a href="'+d+'/'+t.replace("User","User_talk")+'" target="_blank">talk</a>) with an expiration time of '+change.logparams.duration+'&nbsp;'+(comment==""?'':'('+comment+')')+'</li>';
				}
				else if (change.logaction=="upload" || change.logaction == "overwrite") {
					h+='<li>(<a href="'+d+'/Special:Log/upload" target="_blank">Upload log</a>)&nbsp;'+grcDTF.format(da)+' &nbsp; <a href="'+d+'/User:'+u+'" target="_blank">'+change.user+'</a> (<a href="'+d+'/User_talk:'+u+'" target="_blank">talk</a> | <a href="'+d+'/Special:Contributions/'+u+'" target="_blank">contribs</a>) &nbsp;uploaded '+(change.logaction=="overwrite"?'a new version of ':'')+'<a href="'+d+'/'+t+'" target="_blank">'+change.title+'</a>&nbsp;'+(comment==""?'':'('+comment+')')+'</li>';
				}
				else if (change.logaction=="move") {
					h+='<li>(<a href="'+d+'/Special:Log/move" target="_blank">Move log</a>)&nbsp;'+grcDTF.format(da)+' &nbsp; <a href="'+d+'/User:'+u+'" target="_blank">'+change.user+'</a> (<a href="'+d+'/User_talk:'+u+'" target="_blank">talk</a> | <a href="'+d+'/Special:Contributions/'+u+'" target="_blank">contribs</a>) &nbsp;moved page <a href="'+d+'/'+t+'" target="_blank">'+change.title+'</a> to <a href="'+d+'/'+change.logparams.target_title.replace(/ /g,"_")+'" target="_blank">'+change.logparams.target_title+'</a>&nbsp;'+(comment==""?'':'('+comment+')')+'</li>';
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

window.setWikiValue = function(wiki, edits) {
	w = $.grep(allWikis,function(w){return w.key==wiki;})[0];
	if (allWikis.indexOf(w) == -1) return;
	allWikis[allWikis.indexOf(w)].edits = edits;
}

window.getWikiValue = function(wiki) {
	w = $.grep(allWikis,function(w){return w.key==wiki;})[0];
	if (w==undefined) return null;
	return w.edits;
}

window.grcDoneThisMinute = false;
window.grcMinTimer = function() {
	if ((new Date).getMinutes() == 10 && !grcDoneThisMinute) {
		grcDoneThisMinute = true;
		if (Math.abs(Date.parse($("#until").val())-(new Date()).setMinutes(11))<7200000) $("#until").val(grcDTF.format(new Date(new Date().setMinutes(11))));
		if (Math.abs(Date.parse($("#since").val())-(new Date().setMinutes(9)-7200000))<7200000) $("#since").val(grcDTF.format(new Date(new Date().setMinutes(9)-7200000)));
		reloadWikiList();
	}
	else {
		grcDoneThisMinute = false;
		setTimeout(grcMinTimer,60000);
	}
}

window.timeSince = function() {
	w = ($("#since").val()=="")?getWikiValue("lastLoad"):Math.floor(new Date($("#since").val()).setMinutes(10)/1000);
	if (isNaN(w)) return "in the hour selected";
	since = w * 1000;
	until = ($("#until").val()=="")?(new Date().setMinutes(10)):Math.floor(new Date($("#until").val()).setMinutes(10));
	minutesDiff = Math.floor((until - since) / 60000);
	if (minutesDiff < 60) return "in the hour selected";
	hoursDiff = Math.floor((minutesDiff+60)/60)-1;
	if (hoursDiff < 24) return "in the "+hoursDiff+" hour(s) selected";
	return "in the "+Math.floor(hoursDiff/24)+" day(s) selected";
}

window.reloadWikiList = function() {
	var since = ($("#since").val()=="")?getWikiValue("lastLoad"):Math.floor((new Date($("#since").val()))/1000);
	$("#since").val(grcDTF.format(new Date(new Date(since*1000).setMinutes(9))));
	var until = ($("#until").val()=="")?Math.floor((new Date())/1000):Math.floor((new Date($("#until").val()))/1000);
	$("#until").val(grcDTF.format(new Date(new Date(until*1000).setMinutes(11))));
	$.getJSON("https://www.pcj.us/gp/?since="+since+"&until="+until+"&callback=?").done(function(data){
		$("#grc-wikis").html("");
		rlWikis = data;
		for (wiki in rlWikis) {
			if (wiki == "lastLoad") setWikiValue(wiki,rlWikis[wiki]);
			else setWikiValue(wiki,getWikiValue(wiki)+rlWikis[wiki]);
		}
		allWikis.sort(function(a,b) {
			wa = rlWikis[a.key];
			wb = rlWikis[b.key];
			if (isNaN(wa)) wa = 0;
			if (isNaN(wb)) wb = 0;
			if (wa==wb) return (a.displayname<b.displayname)?-1:1;
			return (wb-wa);
		});
		for (w in allWikis) {
			var wiki = allWikis[w];
			dn = wiki.displayname;
			if (dn == undefined) continue;
			sdn = (dn.replace(" Wiki","").lastIndexOf('(')<30)?dn.replace(" Wiki",""):dn.replace(" Wiki","").slice(0,30)+'... '+dn.slice(dn.lastIndexOf('('));
			$("#grc-wikis").append('<div data-language="'+dn.substring(dn.lastIndexOf("(")+1,dn.lastIndexOf(")"))+'"><input type="checkbox" name="rc-options[]" id="rco-'+wiki.key+'" onchange="rcSubscribe(\''+wiki.key+'\',\''+wiki.domain+'\',\''+dn.replace(/'/g,"\\'")+'\');" '+($.grep(subscribedWikis,function(w){return w.key==wiki.key}).length==1?'checked="" ':'')+'/> <label for="rco-'+wiki.key+'">'+sdn+'</label>'+(!isNaN(rlWikis[wiki.key])?' - <span style="color:indianred;">'+rlWikis[wiki.key]+' edit(s) '+timeSince()+'</span>':'')+'</div>');
		}
		setTimeout(grcMinTimer,60000);
	});

}

window.loadWikiList = function() {
	var api = new mw.Api();
	api.get( {
		'action': 'allsites',
		'do': 'getSiteStats'
	}).done(function(data) {
		wikis = data.data.wikis.filter(function(w){return filterKeys.indexOf(w.md5_key)==-1;});
		for (w in wikis) {
			var wiki = wikis[w];
			allWikis.push({"key":wiki.md5_key,"edits":(wiki.ss_total_edits == undefined)?null:wiki.ss_total_edits,"domain":wiki.wiki_domain,"displayname":wiki.wiki_display_name});
	    }
	    allWikis.push({"key":"lastLoad","edits":Math.floor((new Date()).getTime()/1000)-3600});
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
}

mw.loader.using(['mediawiki.api','mediawiki.ForeignApi']).then(function() {
	if (mw.config.get('wgPageName') != "Gamepedia_Help_Wiki:GRASP_RC" || mw.config.get('wgAction')!='view') return;
	if (mw.config.get("wgUserGroups").indexOf("grasp")!=-1) getPatrolData = true;
	$("#no-grasp").hide();
	$("body,div#content.mw-body").unbind("dblclick");
	if (localStorage.getItem("subscribedWikis")!= null) subscribedWikis = JSON.parse(localStorage["subscribedWikis"]);
	$("#grc-options").append('<label for="maxChanges">Max number of changes per wiki: </label> <input type="text" value="10" id="maxChanges" onChange="maxChanges = this.value;" size="1" maxlength="3" />');
	$("#grc-options").append('<br /><label for="since">Since: </label> <input type="text" id="since" style="width:15em;" /> <input type="button" id="sinceReset" value="Reset" />');
	$.datetimepicker.setDateFormatter({
	    parseDate: function (date, format) {
	        return Date.parse(date);
	    },
	    formatDate: function (date, format) {
	    	if (format == "H:i") return (new Date(date)).getHours()+':10';
	    	if (format == "Y/m/d") return (new Date(date)).toLocaleDateString();
	        return grcDTF.format(new Date(new Date(date).setMinutes(10)));
	    }
	});
	$("#since").datetimepicker({theme:'dark',onChangeDateTime:function(current_time,$input){reloadWikiList();},defaultTime:(new Date(new Date()-7200000).setMinutes(10))});
	$("#sinceReset").click(function() {
		$("#since").val(grcDTF.format(new Date(new Date().setMinutes(9)-7200000)));
		reloadWikiList();
	});
	$("#grc-options").append('<br /><label for="until">Until: </label> <input type="text" id="until" style="width:15em;" /> <input type="button" id="untilReset" value="Reset" />');
	$("#untilReset").click(function() {
		$("#until").val(grcDTF.format(new Date(new Date().setMinutes(11))));
		reloadWikiList();
	});
	$("#until").datetimepicker({theme:'dark',onChangeDateTime:function(current_time,$input){reloadWikiList();}});
	$("#grc-options").append('<br />Show languages:<br/><div id="grc-langs" style="overflow:auto; width:20em; height:7em; text-align:right;"></div>');
	for (i=0;i<langs.length;i++) $("#grc-langs").append('<label for="lang-'+langs[i]+'">'+langs[i]+'</label>&nbsp;<input type="checkbox" id="lang-'+langs[i]+'" checked="true" onchange="toggleLangs();" /><br/>');
	$("#grc-options").append('<input type="button" value="All" onclick="$(\'#grc-langs input\').prop(\'checked\',true); toggleLangs();" />&nbsp;');
	$("#grc-options").append('<input type="button" value="None" onclick="$(\'#grc-langs input\').prop(\'checked\',false); toggleLangs();" />');
	loadWikiList();
	reloadWikis();
});