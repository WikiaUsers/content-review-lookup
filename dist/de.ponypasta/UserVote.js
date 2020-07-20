importStylesheet("MediaWiki:Font-awesome.min.css");

var tmpLoad = "<span class='fa fa-2x fa-spinner fa-spin'></span>";
var tmpOK = "<span style='color: green;' class='fa fa-2x fa-check'></span>";
var tmpError = "<span style='color: red;' class='fa fa-2x fa-times'></span>";

var voteURL = "https://cpwiki.herokuapp.com/json";
var voteID;
var voteFieldset = [];
var voteNR=0;
var selectedRadio = 0;
function loadVoteData(voteNRCur,txt) {
	for (var i in $("input[type='radio'][name='vote"+voteNRCur+"']")) {if ($("input[type='radio'][name='vote"+voteNRCur+"']")[i].checked) {selectedRadio=i;}}							
	voteFieldset[voteNRCur].text('');
	$.ajax({
		method: "GET",
		url: voteURL,
		dataType: "json",
		data: {
			action: "getData",
			page: wgPageName,
			key: "vote"+voteNRCur,
		}
	}).done(function(response) {
		console.log(response);
		var votes;
		var voteCount = 0;
		if (response.status == "OK") {
			votes = response.answers;
			for (var element in votes) {
				for (var i = 0;i < txt.split("\n");i++) {
					if (txt.split("\n")[i] == element) {
						voteCount += votes[element];
					}
				}
			}
			voteCount = response.voteCount;
		} else {
			votes={};
			voteCount=1;
		}
		console.log(votes);
		console.log(voteCount);
		var options = 0;
		for (var i in txt.split("\n")) {
		var name = txt.split("\n")[i];
		if (name != "") {
			voteFieldset[voteNRCur].append($("<div/>",{
				class: "voteBarContainer",
				text: (votes[name] != undefined ? ((votes[name]/voteCount)*100).toFixed(2).replace(".",",") : 0)+"% ( "+(votes[name] != undefined ? votes[name] : 0)+" Stimme(n))"
			}).append($("<div/>",{
				class: "voteBar"
			}).css("width",(votes[name] != undefined ? ((votes[name]/voteCount)*100) : 0)+"%"))).append($("<input/>",{
				type: "radio",
				name: "vote"+voteNRCur,
				value: name,
				checked: (selectedRadio==options?true:false)
			})).append($("<b/>",{
				html: (voteFieldset[voteNRCur].hasClass("userVote-link2page")? "<a target='_blank' href='"+encodeURIComponent(name)+"'>"+name+"</a>" : name.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')),		
			})).append("<br/>");
			options++;
		}
	}
	});

}

$(".jsRequired").remove();
$(".userVote").each(function (a,element) {
	var txt = $(element).text();
	var voteStatus;
	var voteNRCur = voteNR;
	$(element).fadeIn(250);
	$(element).text('');
	console.log(element);
	voteFieldset[voteNRCur] = $("<fieldset/>").appendTo(element);
	if ($(element).hasClass("userVote-link2page")) {
		voteFieldset[voteNRCur].addClass("userVote-link2page");
	}
	loadVoteData(voteNRCur,txt);
	$("<button/>",{text: "Abstimmen!"}).appendTo(element).on("click",function() {
		if (wgUserName == null) {
			alert("Du musst angemeldet sein, um abstimmen zu können!");
			return;
		}
		voteStatus.html(tmpLoad+" Frage ID ab...");
		$.ajax({
			method: "GET",
			url: voteURL,
			dataType: "json",
			data: {
				action: "getID",
				username: wgUserName
			}
		}).done(function(response) {
			if (response.status != "OK") {
				voteStatus.html(tmpError+" Fehler beim Abstimmen (Remote:"+response.status+")");
				return;
			}
			voteID = response.id;
			var verificationKey = response.verify;
			
			voteStatus.html(tmpLoad+" Schreibe Verifizierungsschlüssel...");
			$.post("/api.php", {
				format: "json",
				action: "query",
				prop: "info|revisions",
				rvlimit: 1,
				intoken: "edit",
				titles: "Wertung:MWAuth",
			},function(response) {
				var revId = eval("for (var i in response.query.pages) {};i");
				var edittoken = response.query.pages[revId].edittoken;
				$.post("/api.php",{
					format: "json",
					action: "edit",
					title: "Wertung:MWAuth",
					section: 0,
					text: verificationKey,
					summary: "MediaWiki Authentication",
					token: edittoken
				},function(response) {
					if (response.edit.result == "Success") {
						voteStatus.html(tmpLoad+" Überprüfe Verifizierung...");
						$.ajax({
							method: "GET",
							url: voteURL,
							dataType: "json",
							data: {
								action: "verifyID"
							}
						}).done(function(response) {
							if (response.status == "OK") {
								var selection;
								for (var i in $("input[type='radio'][name='vote"+voteNRCur+"']")) {if ($("input[type='radio'][name='vote"+voteNRCur+"']")[i].checked) {selection =  $("input[type='radio'][name='vote"+voteNRCur+"']")[i].value}}
								voteStatus.html(tmpLoad+" Sende Abstimmungsdaten...");
								$.ajax({
									method: "GET",
									url: voteURL,
									dataType: "json",
									data: {
										action: "submit",
										id: voteID,
										page: wgPageName,
										key: $("input[type='radio'][name='vote"+voteNRCur+"']")[0].name,
										value: selection
									}
								}).done(function(response) {
									if (response.status == "OK") {
										loadVoteData(voteNRCur,txt);
										voteStatus.html(tmpOK+" Vielen Dank fürs Abstimmen!");
									} else {
										voteStatus.html(tmpError+ "Fehler aufgetreten! (Remote: "+response.status+")");
									}	
								});
							} else {
								voteStatus.html(tmpError+" Fehler aufgetreten! (Remote: "+response.status+")");
							}
						});
					} else {
						voteStatus.html(tmpError+" Fehler aufgetreten! (Verifizierungskey/"+response.edit.result+")");
					}
				}).fail(function() {
					voteStatus.html(tmpError+" Fehler aufgetreten! (Remote Contact)");
				});
			}).fail(function() {
				voteStatus.html(tmpError+" Fehler aufgetreten! (Wiki API)");
			});
	});
	});
	voteNR++;
	voteStatus = $("<span/>").appendTo(element);
});