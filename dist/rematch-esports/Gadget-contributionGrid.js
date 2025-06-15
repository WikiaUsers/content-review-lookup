// Author: pcj

mw.loader.using('mediawiki.api').then(function() {
	if (mw.config.get("wgNamespaceNumber") != 202) return;
	var user = mw.config.get("wgPageName").slice(12);
	var a = new mw.Api();
	var startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();
	var contribs = [];
	var dateContribs = [];
	var testDate = startDate;
	while (testDate.slice(0,10) <= new Date().toISOString().slice(0,10)) {
		dateContribs.push({date:testDate.slice(0,10),contribs:0});
		testDate = new Date(new Date(testDate).getTime() + 86400000).toISOString();
	}
	function findIndex(date) {
		for (var i in dateContribs) {
			if (dateContribs[i].date == date) return i;
		}
		return -1;
	}
	function processData() {
		for (var c in contribs) {
			dateContribs[findIndex(contribs[c].timestamp.slice(0,10))].contribs++;
		}
		var numWeeks = dateContribs.length / 7;
		var gridOutput = "";
		var urlBase = '/index.php?title=Special%3AContributions&contribs=user&target='+encodeURIComponent(user.replace(/ /g,'_'))+'&start=';
		for (d=0;d<dateContribs.length;d++) {
			da = dateContribs[d];
			var dayNum = new Date(da.date).getUTCDay() + 1;
			var weekNum = Math.floor((new Date(da.date).getTime() - new Date(dateContribs[0].date).getTime())/(1000*60*60*24*7)) + 1 + ((dayNum < (new Date(dateContribs[0].date).getUTCDay() + 1))?1:0);
			var bgColor = "#9999997d";
			if (da.contribs > 0) bgColor = "#F3B67D";
			if (da.contribs > 10) bgColor = "#F3B679";
			if (da.contribs > 20) bgColor = "#F39A48";
			if (da.contribs > 30) bgColor = "#F37F20";
			gridOutput += '<a title="'+da.date+': '+da.contribs+'" style="background-color:'+bgColor+'; grid-area:'+dayNum+' / '+weekNum+' / '+(dayNum+1)+' / '+(weekNum+1)+';" href="'+urlBase+da.date+'&end='+da.date+'"></a>';
		}
		$("#gridOutput").css({
			"display":"grid",
			"grid-gap":"2px",
			"grid-template":"repeat(7,1fr) / repeat("+Math.ceil(numWeeks)+",1fr)"
		});
		$("#gridOutput").html(gridOutput);
	}
	function getData(uccontinue) {
		if ($("#gridOutput").length == 0) $(".curseprofile .activity").after('<div class="contribution-grid section"><h3>Contribution grid</h3><div id="gridOutput" style="width:100%; height:120px;">Loading...</div></div>');
		params = {action:"query",list:"usercontribs",ucuser:user,ucend:startDate,uclimit:"max"};
		if (uccontinue !== "") params.uccontinue = uccontinue;
		a.get(params).done(function (data) {
			contribs = contribs.concat(data.query.usercontribs);
			if (data["continue"] !== undefined) {
				if (data["continue"].uccontinue !== undefined) {
					getData(data["continue"].uccontinue);
					return;
				}
			}
			processData();
		});
	}
	getData("");
});