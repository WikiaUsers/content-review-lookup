mw.loader.using('mediawiki.api').then(function () {
	if (mw.config.get('wgPageName') == 'Talents') {
		handleTalentFilter();
	}
});

// data sources
function handleTalentFilter() {
	/* constants */
	const SOURCE_TALENT_DATA = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/talent_data.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const SOURCE_TALENT_DETAIL = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/talent_detail.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const SOURCE_TALENT_LEVEL = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/talent_level.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const SOURCE_TALENT_DESCRIPTION = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/talent_description.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const CRITERIA_GAIN = "gain";
	const CRITERIA_STATS = "stats";
	const CRITERIA_TARGET = "target";
	const CRITERIA_UPGRADE = "upgrade";
	const CRITERIA_UNLOCK = "unlock";
	const CRITERIA_MISC = "misc";
	// better be in a separated data source
	const SEARCH_CRITERIA = {
		[CRITERIA_GAIN]: [
			 '1',  '2',  '3',  '4',  '5',  '6',  '7',  '8',  '9', '10', 
			'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
			'21', '22', '23', '24', '25', '26', '52', '53', '54', '55',
			'56', '57', '58', '65', '67', '79', '94'
		],
		[CRITERIA_STATS]: [
			'27', '28', '29', '30', '31', '32', '82'
		], 
		[CRITERIA_TARGET]: [
			'33', '34', '35', '36', '37', '38', '39', '40', '41', '77'
		],
		[CRITERIA_UPGRADE]: [
			'42', '43', '44', '45', '46', '47', '48', '49', '50', '51',
			'61', '62', '63', '74'
		],
		[CRITERIA_UNLOCK]: [
			'59', '60', '64', '66', '68', '69', '70', '71', '72', '73',
			'75', '76', '78', '80', '83', '84', '85', '86', '87', '88',
			'89', '90', '91', '92', '95'
		],
		[CRITERIA_MISC]: [
			'81', '93'
		]
	};
	// html for the search form
	const DEFAULT_DROPDOWN_TEXT = "Select a talent...";
	const SEARCH_FORM_HTML = `<table>
<tr>
	<td><b>Gain ability</b></td>
	<td colspan=2><select class='dd' id='` + CRITERIA_GAIN + `'><option value="">` + DEFAULT_DROPDOWN_TEXT + `</option></select></td>
</tr>
<tr>
	<td><b>Stat improvement</b></td>
	<td colspan=2><select class='dd' id='` + CRITERIA_STATS + `'><option value="">` + DEFAULT_DROPDOWN_TEXT + `</option></select></td>
</tr>
<tr>
	<td><b>Add target trait</b></td>
	<td colspan=2><select class='dd' id='` + CRITERIA_TARGET + `'><option value="">` + DEFAULT_DROPDOWN_TEXT + `</option></select></td>
</tr>
<tr>
	<td><b>Upgrade ability</b></td>
	<td colspan=2><select class='dd' id='` + CRITERIA_UPGRADE + `'><option value="">` + DEFAULT_DROPDOWN_TEXT + `</option></select></td>
</tr>
<tr>
	<td><b>Unlock ability</b></td>
	<td colspan=2><select class='dd' id='` + CRITERIA_UNLOCK + `'><option value="">` + DEFAULT_DROPDOWN_TEXT + `</option></select></td>
</tr>
<tr>
	<td><b>Misc.</b></td>
	<td colspan=2><select class='dd' id='` + CRITERIA_MISC + `'><option value="">` + DEFAULT_DROPDOWN_TEXT + `</option></select></td>
</tr>
<tr>
	<td></td>
	<td>Talents<input type="checkbox" id="include_talent" checked></td>
	<td>Ultra Talents<input type="checkbox" id="include_utalent" checked></td>
</tr>
<tr>
	<td></td>
	<td><button id="btnCalculate" type="button">Calculate</button></td>
	<td><button id="btnReset" type="button">Reset</button></td>
</tr>
</table>`;
	/* init */
	// declare data
	let TALENT_DATA = null;
	let TALENT_DETAIL = null;
	let TALENT_LEVEL = null;
	let TALENT_DESCRIPTION = null;
	// decorate
	$("#search_form").css({"border": "1px solid black", "padding": "20px"});
	$("#selected").css({"border": "1px solid black", "padding": "20px"});
	$("#description").css({"border": "1px solid black", "padding": "10px"});
	$("#search_form").append(SEARCH_FORM_HTML);

	// fill dropdowns
	function populateDropdown(id) {
		for (let i = 0; i < SEARCH_CRITERIA[id].length; i++) {
			$("#"+id).append("<option value='" + SEARCH_CRITERIA[id][i] + "'>" + SEARCH_CRITERIA[id][i] + " - " + TALENT_DESCRIPTION[SEARCH_CRITERIA[id][i]] + "</option>");
		}
	}

	// extract data
	api = new mw.Api();
    api.get(SOURCE_TALENT_DATA).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        TALENT_DATA = JSON.parse(content);
    });
    api.get(SOURCE_TALENT_DETAIL).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        TALENT_DETAIL = JSON.parse(content);
    });
    api.get(SOURCE_TALENT_DESCRIPTION).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        TALENT_DESCRIPTION = JSON.parse(content);
		// fill dropdown
		populateDropdown(CRITERIA_GAIN);
		populateDropdown(CRITERIA_STATS);
		populateDropdown(CRITERIA_TARGET);
		populateDropdown(CRITERIA_UPGRADE);
		populateDropdown(CRITERIA_UNLOCK);
		populateDropdown(CRITERIA_MISC);
    });
    /* events */
	// add event to the selected talents
	$(".dd").on("change", function() {
		let id = $(this).attr("id");
		let selected_value = $("#" + id +" option:selected").val();
		if (selected_value == "")
			return;
		let selected_text =  $("#" + id + " option:selected").text();
		$("#selected").append("<button class='selected_option' value='" + selected_value +"' />" + selected_text + "</button>");
	});
	// remove a selected talent
	$("#selected").on("click", "button.selected_option", function() {
		$(this).remove();
	});
	// display talent of the selected Cat
	$("#result").on("click", "span.cat_image", function() {
		let cro = $(this).data("cro");
		buildTooltip(cro);
	});
	/* filter */
	const MAX_TALENT_COUNT = 8;
	const OFFSET = 12;
	const MAX_LEVEL_OFFSET = 0;
	const PARAMS_OFFSET = 1;
	const DESCRIPTION_OFFSET = 9;
	const UPGRADE_TYPE_OFFSET = 10;
	const ULTRA_TALENT_OFFSET = 11;
	
	const MAX_PARAMS_COUNT = 4;
	// reset filtering
	$("#btnReset").on("click", function() { 
		$("#description").html("");
		$("#result").html("");
		$("#selected").html("");
	});
	// filtering
	$("#btnCalculate").on("click", function() {
		$("#description").html("");
		$("#result").html("");
		// validation
		if (!$("#include_talent").is(":checked") && !$("#include_utalent").is(":checked")) {
			$("#result").html("<p>Please select a Talent type (Talent and/or Ultra Talent)</p>");
			return;
		}
		// get the selected talents
		let criteria = [];
		$(".selected_option").each(function() {
			criteria.push( parseInt($(this).val()) );
		});
		// actually filter
		let result = [];
		// talent index range
		let flag_check_talent = $("#include_talent").is(":checked");
		let flag_check_utalent = $("#include_utalent").is(":checked");
		// loop
		for (const [key, value] of Object.entries(TALENT_DATA)) {
			// retrieve this Cat's all talents
			let this_cat_all_talents = [];
			for (let i = 0; i < MAX_TALENT_COUNT; i++) {
				// stop retrieving once reached an empty talent
				if (value[i*OFFSET+DESCRIPTION_OFFSET] == 0) break;
				// exclude regular talent if the checkbox is unchecked
				if (!flag_check_talent && value[i*OFFSET+ULTRA_TALENT_OFFSET] == 0) continue;
				// exclude ultra talent if the checkbox is unchecked
				if (!flag_check_utalent && value[i*OFFSET+ULTRA_TALENT_OFFSET] != 0) continue;
				// retrieve
				this_cat_all_talents.push(value[i*OFFSET+DESCRIPTION_OFFSET]);
			}
			// must qualify all
			let isQualified = criteria.every(function(val) {
				return this_cat_all_talents.indexOf(val) >= 0;
			});
			if (isQualified)
				result.push(key);
		}
		// count the matching Cats
		$("#result").append("<p>Found " + result.length + " Cat(s)</p>");
		// display
		for (let i = 0; i < result.length; i++) {
			$("#result").append("<span class='cat_image' data-cro='" + result[i] + "' title='CRO-" + result[i] + "'><img src='/Special:Redirect/file/Uni" + padding(result[i]) + "_s00.png' /></span>");
		}
	});
	// can just be merged with getDetail()
	function buildTooltip(cro) {
		$("#description").html("");
		let tooltip = "<img style='vertical-align: middle' src='/Special:Redirect/file/Uni"+ padding(cro) +"_s00.png' /><b>CRO-" + cro + "</b><br />";
		let data = TALENT_DATA[cro];
		for (let i = 0; i < MAX_TALENT_COUNT; i++) {
			if (data[i*OFFSET+DESCRIPTION_OFFSET] == 0) break;
			
			if (data[i*OFFSET+ULTRA_TALENT_OFFSET] != 0)
				tooltip = tooltip + "● <u><i>Ultra Talent:</i></u> " + TALENT_DESCRIPTION[data[i*OFFSET+DESCRIPTION_OFFSET]] + "<br />";
			else
				tooltip = tooltip + "● <u><i>Talent:</i></u> " + TALENT_DESCRIPTION[data[i*OFFSET+DESCRIPTION_OFFSET]] + "<br />";
		}
		$("#description").append("<p>" + tooltip + "</p>");
	}
	// contruct valid cro for the image filename
	function padding(num) {
		let str = num.toString();
		while (str.length < 3) {
			str = "0" + str;
		}
		return str;
	}
}