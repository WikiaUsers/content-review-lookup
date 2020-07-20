(function() {
	var siteURL = location.protocol + "//" + location.host + location.pathname;
 
	var ctoc_generic = document.createElement("table");
	$(ctoc_generic).addClass("va-genericbox va-table-center va-table-middle plainlinks current-tab").css({
		"clear": "both",
		"margin": "5px auto"
	}).attr({
		"cellspacing": "0",
		"cellpadding": "0"
	});
 
	var ctg_tbody = document.createElement("tbody");
	$(ctoc_generic).prepend(ctg_tbody);
 
	var ctg_initial_tr = document.createElement("tr");
	$(ctg_tbody).prepend(ctg_initial_tr);
 
	var ctg_contents = document.createElement("th");
	$(ctg_contents).html("Xếp theo:");
	$(ctg_contents).css("padding", "2px 5px");
	$(ctg_initial_tr).prepend(ctg_contents);
 
	var ctg_tabledata_main = document.createElement("td");
	$(ctg_tabledata_main).css("padding", "2px 5px 2px 0");
	$(ctg_initial_tr).append(ctg_tabledata_main);
 
	var ctg_textop = document.createElement("a");
	$(ctg_textop).addClass("text");
	$(ctg_textop).attr("href", siteURL);
	$(ctg_textop).html("Về đầu");
	$(ctg_tabledata_main).append(ctg_textop);
 
	var ctg_middot1 = document.createElement("span");
	$(ctg_middot1).css("font-weight", "bold");
	$(ctg_middot1).html("&nbsp;&middot;&nbsp;");
	$(ctg_tabledata_main).append(ctg_middot1);
 
	var ctg_num = document.createElement("a");
	$(ctg_num).addClass("text");
	$(ctg_num).attr("href", siteURL + "?from=0");
	$(ctg_num).html("0-9");
	$(ctg_tabledata_main).append(ctg_num);
 
	var ctg_middot2 = document.createElement("span");
	$(ctg_middot2).css("font-weight", "bold");
	$(ctg_middot2).html("&nbsp;&middot;&nbsp;");
	$(ctg_tabledata_main).append(ctg_middot2);
 
	function addLetter( input ) {
		var letter = document.createElement("a");
		$(letter).addClass("text");
		$(letter).attr("href", siteURL + "?from=" + input);
		$(letter).html(input + "&nbsp;");
		$(ctg_tabledata_main).append(letter);
	}
 
	addLetter("A");
	addLetter("B");
	addLetter("C");
	addLetter("D");
	addLetter("E");
	addLetter("F");
	addLetter("G");
	addLetter("H");
	addLetter("I");
	addLetter("J");
	addLetter("K");
	addLetter("L");
	addLetter("M");
	addLetter("N");
	addLetter("O");
	addLetter("P");
	addLetter("Q");
	addLetter("R");
	addLetter("S");
	addLetter("T");
	addLetter("U");
	addLetter("V");
	addLetter("W");
	addLetter("X");
	addLetter("Y");
	addLetter("Z");
 
	if( 
		$("body").hasClass("ns-14") 
		&& !( $("body").hasClass("action-edit") )
		&& !( $("body").hasClass("editor") )
	) { 
		$("#mw-content-text").prepend(ctoc_generic);
	}
}());