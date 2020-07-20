/*
	include in a script src element in the end of the
	nav of [[MediaWiki:ArticleData/clothing/nav.html‎]]
*/

function articleDataSubmitTypeClothing() {

/* textarea to variable */
var pageBox = $("textarea#wpTextbox1.ui-autocomplete-input");


/* start writing dynamic content */
var articleDataContent = "";

	// TEMPLATES opening
var articleDataContentTemplates = "";
if ($("input#articleDataParamTemplatesStub:checked").length > 0) {
	var articleDataContentTemplates = articleDataContentTemplates + "{{" + $("input#articleDataParamTemplatesStub:checked").attr("value") + "}}\n";
}
if ($("input#articleDataParamTemplatesNeeds_Image:checked").length > 0) {
	var articleDataContentTemplates = articleDataContentTemplates + "{{" + $("input#articleDataParamTemplatesNeeds_Image:checked").attr("value") + "}}\n";
}
if ($("input#articleDataParamTemplatesHistory:checked").length > 0) {
	var articleDataContentTemplates = articleDataContentTemplates + "{{" + $("input#articleDataParamTemplatesHistory:checked").attr("value") + "}}\n";
}
var articleDataContent = articleDataContentTemplates + articleDataContent;

	// INFOBOX opening
var articleDataContent = articleDataContent + "{{ItemInfobox"
	+ "\n|name= ";

	// INFOBOX name parameter
 if ($("#articleDataParamName").val().length > 0) {
	var articleDataContent = articleDataContent + $("#articleDataParamName").val();
} else {
	var articleDataContent = articleDataContent + "{{" + "SUBST:PAGENAME" + "}}";
}

	// INFOBOX image parameter
if ($("#articleDataParamImage").val().length > 0) {
	var articleDataContent = articleDataContent + "\n|image= File:" + $("#articleDataParamImage").val();
}

	// INFOBOX available parameter
if ($('input[name="articleDataParamAvailable"]').filter(":checked").length > 0) { // checked (any)
	if ($('input[name="articleDataParamAvailable"]').filter(':checked').attr("id") == "articleDataParamAvailableYes") { // available = yes
		var articleDataContent = articleDataContent + "\n|available= Yes";
	} else { // available = no
		var articleDataContent = articleDataContent + "\n|available= No";
	}
} else { // not selected
	var articleDataContent = articleDataContent + "\n|available= N/A";
}

	// INFOBOX type parameter
var articleDataContentTypeClothing = $("select#articleDataParamType").val();
var articleDataContent = articleDataContent + "\n|type= " + articleDataContentTypeClothing + " Item";

	// INFOBOX member parameter
if ($('input[name="articleDataParamMember"]').filter(":checked").length > 0) { // checked (any)
	if ($('input[name="articleDataParamMember"]').filter(':checked').attr("id") == "articleDataParamMemberYes") { // member = yes
		var articleDataContent = articleDataContent + "\n|member= Yes";
	} else { // member = no
		var articleDataContent = articleDataContent + "\n|member= No";
	}
} else { // not selected
	var articleDataContent = articleDataContent + "\n|member= N/A";
}

	// INFOBOX party parameter
if ($('input[name="articleDataParamParty"]').filter(":checked").length > 0) { // checked (any)
	if ($('input[name="articleDataParamParty"]').filter(':checked').attr("id") == "articleDataParamPartyNo") { // party = none
		var articleDataContent = articleDataContent + "\n|party= None";
	} else if ($('input[name="articleDataParamParty"]').filter(':checked').attr("id") == "articleDataParamPartyYes" && $("#articleDataParamPartyName").val().length > 0) { // party = yes [mentioned]
		var articleDataContent = articleDataContent + "\n|party= " + $("#articleDataParamPartyName").val();
	} else { // party = yes [not_mentioned]
		var articleDataContent = articleDataContent + "\n|party= Unknown";
	}
} else { // not selected
	var articleDataContent = articleDataContent + "\n|party= N/A";
}

	// INFOBOX cost parameter
var articleDataContent = articleDataContent + "\n|cost= ";
if ($("#articleDataParamPriceNumber").val().length > 0) { // if a value was inserted
	if ($("select#articleDataParamPriceType").val() == "coins") { // if "coins" is selected - append the string " [[coin]]s"
		var articleDataContent = articleDataContent + $("#articleDataParamPriceNumber").val() + " [[coin]]s";
	} else { // if other, allow free selection
		var articleDataContent = articleDataContent + $("#articleDataParamPriceNumber").val();
	}
} else { // price parameter remained blanked
	var articleDataContent = articleDataContent + "N/A";
}

	// INFOBOX found parameter
var articleDataContent = articleDataContent + "\n|found= ";
if ($("#articleDataParamFound").val() > 0) { // if value was inserted
	if ($("select#articleDataParamFoundType").val() != "other") { // catalog or room
		var articleDataContent = articleDataContent + "[[" + $("#articleDataParamFound").val() + "]]";
	} else { // other - free selection
		var articleDataContent = articleDataContent + $("#articleDataParamFound").val();
	}
} else { // found parameter remained blank
	var articleDataContent = articleDataContent + "N/A";
}

	// INFOBOX id parameter
var articleDataContent = articleDataContent + "\n|id= ";
if ($("#articleDataParamId").val().length > 0 && $("#articleDataParamIdSecondary").val().length > 0) { // has 2 ids
	var articleDataContent = articleDataContent + $("#articleDataParamId").val() + ", " + $("#articleDataParamIdSecondary").val();
} else if ($("#articleDataParamId").val().length > 0) { // has 1 id - first text box used
	var articleDataContent = articleDataContent + $("#articleDataParamId").val();
} else if ($("#articleDataParamIdSecondary").val().length > 0) { // has 1 id - second text box used
	var articleDataContent = articleDataContent + $("#articleDataParamIdSecondary").val();
} else { // none selected
	var articleDataContent = articleDataContent + "N/A";
}

	// INFOBOX unlock parameter
if ($('input[name="articleDataParamUnlock"]').filter(":checked").length > 0) { // checked (any)
	if ($('input[name="articleDataParamUnlock"]').filter(':checked').attr("id") == "articleDataParamUnlockYes") { // unlock = yes
		var articleDataContent = articleDataContent + "\n|unlock= Yes";
	} else { // unlock = no
		var articleDataContent = articleDataContent + "\n|unlock= No";
	}
} else { // not selected
	var articleDataContent = articleDataContent + "\n|unlock= N/A";
}
	// close infobox
var articleDataContent = articleDataContent + "\n}}";











/* insert textarea the final variable */
$(pageBox).val(articleDataContent + "\n" + $(pageBox).val());

}