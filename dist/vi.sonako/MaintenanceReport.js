/*
  There are two ways to view MaintenanceReport: a div or a popup.

  *[[Special:MaintenanceReport]] to auto-start in a div
  *Add <div id='MaintenanceReport'></div> to any page to auto-start in a div
  *Or, add <button id='MaintenanceReport' class="button">Maintenance Report</button>
   to any page for a button which launches a popup.
*/
$(function() {
	$("#Recentchangestext").append(" &bull; <button id='MaintenanceReport' class='button'>Maintenance</button>");
	if ( (!$('#MaintenanceReport').length && mw.config.get('wgCanonicalNamespace')+":"+mw.config.get('wgTitle') != "Special:MaintenanceReport")
		|| typeof window.maintenanceReport != "undefined"
	) return; //skip non-relevant pages and avoid duplicate instances.

	window.maintenanceReport = {
		"options": {
			removeZero: 1,  //set to true to remove pages with zero results
			addButton: false  //set to true to add a button instead of autostarting.
		},
		"specials": ["Unusedcategories", "BrokenRedirects", "DoubleRedirects", "Deadendpages", "Lonelypages", "Uncategorizedcategories", "Uncategorizedpages", "Uncategorizedtemplates", "Wantedcategories", "Wantedfiles", "Wantedpages", "Wantedtemplates", "Unusedtemplates"],

		"categories": ["Lonelypages", "DPL queries with no results", "DPL queries with errors", "Deletion proposals", "Merge proposals", "Dialogue template with one line", "Broken references", "Broken file links", "Template errors", "ParserFunction errors", "Template has invalid parameters", "Template is missing parameters", "References needing names", "Cleanup", "Content requests", "Image requests", "Infobox needs information", "Reference requests", "Rating requests", "Translation requests", "Unconfirmed information", "Infobox needs caption", "Pages using duplicate arguments in template calls"],

		"defaults": ["Unusedcategories", "BrokenRedirects", "DoubleRedirects", "Deadendpages", "Lonelypages", "Uncategorizedcategories", "Uncategorizedpages", "Uncategorizedtemplates", "Wantedcategories", "Wantedfiles", "Wantedpages", "Wantedtemplates", "Unusedtemplates", "DPL queries with no results", "DPL queries with errors", "Deletion proposals", "Merge proposals", "Dialogue template with one line", "Broken references", "Broken file links", "Template errors", "ParserFunction errors", "Template has invalid parameters", "References needing names", "Infobox needs caption"],

		"results": {}
	};
	if (mw.config.get('wgCanonicalNamespace')+":"+mw.config.get('wgTitle') == "Special:MaintenanceReport") {
		$("title").html("Maintenance Report");
		$("#WikiaPageHeader h1").html("Maintenance Report");
		$("h1#firstHeading").html("Maintenance Report");
		$("#mw-content-text").html($("<div>", {id:"MaintenanceReport" }) );
	}
	if (maintenanceReport.options.addButton) $('#MaintenanceReport').after($("<br>"), $("<button>", { id:"MaintenanceReport", class:"button", html:"Start Maintenance Report" })).remove();
	if ($('#MaintenanceReport.button').length) $('#MaintenanceReport.button').click(function() { MaintenanceReportInit(1) });
	else MaintenanceReportInit();

	function showResult(message, result) {
		if (typeof window.MaintenanceReportNotify != "undefined") window.MaintenanceReportNotify.hide();
		window.MaintenanceReportNotify = new BannerNotification(message, result).show();
	}

	function MaintenanceReportDisplay(andor) {
		var output = new Array(), firstloop = 1;

		$("#MaintenanceReport input[type=checkbox]").each(function(){
			if($(this).prop("checked")) {
				var temp = maintenanceReport.results[$(this).attr("id").substring(5)];
				if (firstloop) {
					firstloop = 0;
					output = output.concat(temp);
				} else if (andor == "or") {
					output = output.filter(function(i) {
						return temp.indexOf(i) == -1;
					});
					output = output.concat(temp);
				} else if (andor == "and") {
					output = output.filter(function(i) {
						return temp.indexOf(i) != -1;
					});
				}
			}
		});
		$("#resultsPane").html($("<ol>"));
		if (output.length == 0) $("#resultsPane ol").html("No results");
		else $(output).each(function(index, value) {
			$("#resultsPane ol").append(
				$('<li>')
				.append($('<a>', {
					"target":"_blank",
					"href":"./"+value.replace(/ /g,"_")+"?action=edit&showchanges=1",
					"html":"(edit) "
				}))
				.append($('<a>', {
					"target":"_blank",
					"href":"./"+value.replace(/ /g,"_"),
					"html":value
				}))
			)
		});

	}

	function MaintenanceReportInit(popup) {
		var ajaxIndicator = window.ajaxIndicator || 'https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif';

		if(popup) {
			$("#MaintenanceReport").attr("id","");

			SRWpopup("MaintenanceReportPopup", "Maintenance Report", "");

//				width: $(window).width() - 254,

			$("#MaintenanceReportPopup .popupWrapper").css({ "margin-top":"50px", "width": "90%" });
			$("#MaintenanceReportPopup h1").css({"margin-bottom":0,"text-align":"left"}).append(" <span style='color:black;display: inline-block;' id='ajaxProgress'> <img src='" + ajaxIndicator + "' style='vertical-align: top;height: 21px;' border='0' alt='Updating page' /></span>");
			$("#MaintenanceReportPopup .popupContent").append($("<div>", {id:"MaintenanceReport", class:"WikiaArticle WikiaMainContent"}));
/*			$("#MaintenanceReportPopup .popupContent").css({
				"text-align":"center",
				"overflow": "auto",
				"top":"100px",
				"min-height":"452px"
			});
*/
		} else {
			$("#MaintenanceReport").empty();
		}
		$("#MaintenanceReport").append("<div id='updateCountdown' left='0' style='text-align:center'></div>");
		$("#MaintenanceReport").append("<table><tr><td style='vertical-align: top;'><div id='listPane' style='line-height: normal;float:left;text-align:left;min-width: 23em;border-right: 4px double blue;line-height:normal;'></div></td><td style='vertical-align: top;'><div id='resultsPane' style='float:right;text-align:left;'><ol></ol></div></td></tr></table>");
		$("#listPane").append(
			$("<button>", {
				html:"Show Combined"
			}).click(function() { MaintenanceReportDisplay("or") })
		);
		$("#listPane").append(
			$("<button>", {
				html:"Show Intersection",
				style:"float:right;"
			}).click(function() { MaintenanceReportDisplay("and") })
		);

		for(var i in maintenanceReport.specials) {
			$("#listPane").append("<div><label for='checkS"+maintenanceReport.specials[i].replace(/ /g,"")+"' style='cursor: pointer;'><input type='checkbox' style='margin: 0 3px;' id='checkS"+maintenanceReport.specials[i].replace(/ /g,"")+"'>"+maintenanceReport.specials[i]+" (<a target='_blank' href='./Special:"+maintenanceReport.specials[i]+"'>Page</a>) <span style='float:right' class='loading'>Loading</span></label></div>");
		}
		if (localStorage.getItem('maintenanceReportCacheTime') > new Date().getTime()) {
			loadCachedSpecials();
			calcTimeLeft(localStorage.getItem('maintenanceReportCacheTime'));
			$("#updateCountdown").prepend("Results cached. ");
		} else {
			loadServerSpecials();
		}

		for(var i in maintenanceReport.defaults) maintenanceReport.defaults[i] = maintenanceReport.defaults[i].replace(/ /g,"_");

		for(var i in maintenanceReport.categories) {
			maintenanceReport.categories[i] = maintenanceReport.categories[i].replace(/ /g,"_");

			$("#listPane").append("<div><label for='checkC"+maintenanceReport.categories[i].replace(/ /g,"")+"' style='cursor: pointer;'><input type='checkbox' style='margin: 0 3px;' id='checkC"+maintenanceReport.categories[i].replace(/ /g,"")+"'>"+maintenanceReport.categories[i]+" (<a target='_blank' href='./Category:"+maintenanceReport.categories[i]+"'>Page</a>) <span style='float:right' class='loading'>Loading</span></label></div>");

			$.getJSON('/api.php?action=query&format=json&list=categorymembers&cmlimit=5000&cmtitle=Category:'+maintenanceReport.categories[i]+'&requestid='+maintenanceReport.categories[i].replace(/ /g,""), function(results) {
			  var unformattedresults = new Array(), formatteddisplay = "";
			  $("#checkC"+results.requestid +" ~ span").html("("+Object.keys(results.query.categorymembers).length+")");
			  $("#checkC"+results.requestid +" ~ span").removeClass("loading");
			  if (!$("span.loading").length) saveCachedSpecials();

			  $(results.query.categorymembers).each(function(index, value) {
				unformattedresults.push(value.title);
				if (maintenanceReport.defaults.indexOf(results.requestid) != -1) formatteddisplay += '<li><a href="./'+value.title+'">'+value.title+'</a></li>';
			  });
			  if (formatteddisplay) {
				$('#resultsPane').append("<h2><a href='./Category:"+results.requestid+"'>"+results.requestid+"</a></h2><ul>"+formatteddisplay+"</ul>");
				$("#checkC"+results.requestid).prop("checked", true);
			  }
			  maintenanceReport.results["C"+results.requestid] = unformattedresults;
			  if (!unformattedresults.length) {
				$("#checkC"+results.requestid).prop("disabled",true);
				if (maintenanceReport.options.removeZero) $("#checkC"+results.requestid).parent().remove();
			  }
			  if ($("#MaintenanceReportPopup").length) $("#MaintenanceReportPopup")[0].adjustTop();
			});
		}
		$("#MaintenanceReport input[type=checkbox]").click(function() {
			$('#resultsPane').empty();
			$("#MaintenanceReport input[type=checkbox]").each(function(){
				var formatteddisplay = "";
				if($(this).prop("checked")) {
					$(maintenanceReport.results[$(this).attr("id").substring(5)]).each(function(index, value) {
						formatteddisplay += '<li><a href="./'+value+'">'+value+'</a></li>';
					});
					if (formatteddisplay) $('#resultsPane').append("<h2><a href='./"+($(this).attr("id").substring(5,6)=="S"?"Special":"")+($(this).attr("id").substring(5,6)=="C"?"Category":"")+":"+$(this).attr("id").substring(6)+"'>"+$(this).attr("id").substring(6)+"</a></h2><ul>"+formatteddisplay+"</ul>");
				}
			});
		})

	}
	function saveCachedSpecials() {
		$("#ajaxProgress").remove();
		if (localStorage.getItem('maintenanceReportCacheTime') > new Date().getTime()) return;

		localStorage.setItem('maintenanceReportCacheTime', $("#updateCountdown").prop("reset"));

		var tmp = [];
		for (i in maintenanceReport.results) {
			if (i.substring(0,1) === "S")	{
				tmp.push(i+"\t"+maintenanceReport.results[i].join("\t"));
			}
		}
		tmp.join("\n");
		localStorage.setItem('maintenanceReportCache', tmp.join("\n"));
	}

	function loadCachedSpecials() {
		var tmp = {};
		tmp.Cache = localStorage.getItem('maintenanceReportCache');
		if (tmp.Cache) {
			tmp.Pages = tmp.Cache.split("\n");

			for (i in tmp.Pages) {
				tmp.Results = tmp.Pages[i].split("\t");
				tmp.PageName = tmp.Results.shift();
				if (tmp.Results[0] == "") tmp.Results.shift();
				maintenanceReport.results[tmp.PageName] = tmp.Results;
				displaySpecialPage(tmp.PageName);
			}
		}
	}
	function calcTimeLeft(cacheReset) {
		var diff = Math.floor((cacheReset - new Date().getTime())/1000);

		var left = (diff%60) + 's';
		diff=Math.floor(diff/60);
		left = (diff%60) + 'm ' + left;	diff=Math.floor(diff/60);
		left = (diff%24) + 'h ' + left;	diff=Math.floor(diff/24);
		left = diff + ' days ' + left;

		if (left.substring(0,1) == "-") $("#updateCountdown").html("The special page cache update is overdue.  Last reset: "+left);
		else $("#updateCountdown").html("Time left until cache update: "+left);
	}
	function loadServerSpecials() {
		for(var i in maintenanceReport.specials) {
			$.getJSON('/api.php?action=query&format=json&list=querypage&qplimit=5000&qppage='+maintenanceReport.specials[i], function(result) {
			  var querypage = result.query.querypage;

			  if (querypage.cachedtimestamp) {
				var cacheReset = new Date(new Date(querypage.cachedtimestamp).getTime()+(24*60*60000)).getTime();

				if (!$("#updateCountdown").prop("reset")) $("#updateCountdown").prop("reset", 0);
				if ($("#updateCountdown").prop("reset") < cacheReset) {
				  $("#updateCountdown").prop("reset", cacheReset);
				  calcTimeLeft(cacheReset);
				}
			  }
			  maintenanceReport.results["S"+querypage.name] = [];
			  $(querypage.results).each(function(index, value) {
				if (querypage.name == "Unusedcategories")
				  if (maintenanceReport.categories.indexOf(value.title.replace(/ /g,"_").replace(/Category:/g,"")) != -1) return;
				maintenanceReport.results["S"+querypage.name].push(value.title);
			  });
			  displaySpecialPage("S"+querypage.name);
			});
		}
	}
	function displaySpecialPage(PageName) {
		var tmpTitle, formatteddisplay = "";

		if (!maintenanceReport.results[PageName].length) {
		  	$("#check"+PageName).prop("disabled",true);
		  	if (maintenanceReport.options.removeZero) $("#check"+PageName).parent().remove();
		} else {
			if (maintenanceReport.defaults.indexOf(PageName.substring(1)) != -1) {
				for (i in maintenanceReport.results[PageName]) {
					tmpTitle = maintenanceReport.results[PageName][i];
					formatteddisplay += '<li><a href="./'+tmpTitle+'">'+tmpTitle+'</a></li>';
				}
				if (formatteddisplay) {
					$("#resultsPane").append('<h2><a href="./Special:'+PageName.substring(1)+'">'+PageName.substring(1)+'</a></h2> <ol>'+formatteddisplay+'</ol>');
					$("#check"+PageName).prop("checked", true);
				}
			}
		}
		$("#check"+PageName +" ~ span").html("("+maintenanceReport.results[PageName].length+")");
		$("#check"+PageName +" ~ span").removeClass("loading");

		if (!$("span.loading").length) saveCachedSpecials();
	}

});