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
	const CAT_RELEASE_ORDER_PAGENAME = "Cat_Release_Order";
	const CRO_INPUT_SEPARATOR = " ";
	const MSG_SEARCH_BY_CRO_EXPLANATION = "Input space-separated values e.g. \"10 25 71 76 259\"";
	const HOW_TO_MANAGE_SELECTION_MSG = "Click on a talent to remove it from selection";

	const DEFAULT_DROPDOWN_TEXT = "Select a talent...";
	const SEARCH_FORM_HTML = `<table style="width: 100%">
<tr>
	<td colspan=3 style="text-align:center; background: #ffffff25"><b>Available conditions:</b></td>
</tr>
<tr>
	<td style="width: 20%"><b>Gain ability</b></td>
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
	<td colspan=3 style="text-align:center; background: #ffffff25"><b>Selected conditions:</b></td>
</tr>
<tr>
	<td><b><span style="text-decoration-line: underline; text-decoration-style: dotted" title="` + HOW_TO_MANAGE_SELECTION_MSG + `">Talents</span></b></td>
	<td colspan=2 id="condition_selected"></td>
</tr>
<tr>
	<td><b>Types</b></td>
	<td>Talents<input type="checkbox" id="include_talent" checked></td>
	<td>Ultra Talents<input type="checkbox" id="include_utalent" checked></td>
</tr>
<tr>
	<td><b>Specific <a href='/` + CAT_RELEASE_ORDER_PAGENAME + `'>CROs</a></b></td>
	<td colspan=2><textarea rows="4" id="cros" placeholder='` + MSG_SEARCH_BY_CRO_EXPLANATION + `'></textarea></td>
	</tr>
</tr>
<tr>
	<td></td>
	<td><button id="btnCalculate" type="button">Search</button></td>
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
	$("#condition_selected").css({"border": "1px solid black", "padding": "20px"});
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
    api.get(SOURCE_TALENT_LEVEL).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        TALENT_LEVEL = JSON.parse(content);
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
		$("#condition_selected").append("<button class='selected_option' value='" + selected_value +"' />" + selected_text + "</button>");
	});
	// remove a selected talent
	$("#condition_selected").on("click", "button.selected_option", function() {
		$(this).remove();
	});
	// display talent of the selected Cat
	$("#result").on("click", "span.cat_image", function() {
		let cro = $(this).data("cro");

		$("#description").html("");
		$("#description").append("<img style='vertical-align: middle' src='/Special:Redirect/file/Uni"+ padding(cro) +"_s00.png' /><b>CRO-" + cro + "</b>");

		let detail_header = `{\| class="article-table"
!#
!Type
!Talent
!Detail
!Max Level
!NP
!Total NP`;

		let parse_to_html = {
			action: 'parse',
			text: detail_header + buildTooltip(cro) + "\n|}",
		    contentmodel: 'wikitext',
		};
		api.post(parse_to_html)
		.done(function(parse_result) {
			$("#description").append(parse_result.parse.text['*']);
		});
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
		$("#condition_selected").html("");
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
		// get inputted CROs if exist
		let selected_cros_initial = $("#cros").val().trim().split(CRO_INPUT_SEPARATOR);
		let selected_cros = [];
		for (let i = 0; i < selected_cros_initial.length; i++) {
			if (selected_cros_initial[i].length == 0 || isNaN(parseInt(selected_cros_initial[i])))
				continue;
			selected_cros.push(selected_cros_initial[i]);
		}
		// actually filter
		let result = [];
		// talent index range
		let flag_check_talent = $("#include_talent").is(":checked");
		let flag_check_utalent = $("#include_utalent").is(":checked");
		// loop
		for (const [key, value] of Object.entries(TALENT_DATA)) {
			// if CROs are provided, check if this Cat is one of it
			if (selected_cros.length > 0 && selected_cros.indexOf(key) < 0) continue;
			// if no criteria is selected, get all available Cats
			if (criteria.length == 0) {
				result.push(key);
				continue;
			}
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
		$("#result").append("<p>Found " + result.length + " Cat(s), click a Cat's icon for details.</p>");
		// display
		for (let i = 0; i < result.length; i++) {
			$("#result").append("<span class='cat_image' data-cro='" + result[i] + "' title='CRO-" + result[i] + "'><img src='/Special:Redirect/file/Uni" + padding(result[i]) + "_s00.png' /></span>");
		}
	});
	function buildTooltip(cro) {

		let body = [];
		let data = TALENT_DATA[cro];
		for (let i = 0; i < MAX_TALENT_COUNT; i++) {
			if (data[i*OFFSET+DESCRIPTION_OFFSET] == 0) break;

			let talent_type = data[i*OFFSET+ULTRA_TALENT_OFFSET] == 0 ? "Talent" : "Ultra Talent";
			let total_np = 0;
			let max_level = data[i*OFFSET+MAX_LEVEL_OFFSET] == 0 ? 1 : data[i*OFFSET+MAX_LEVEL_OFFSET];
			for (let j = 0; j < max_level; j++) {
				total_np += TALENT_LEVEL[data[i*OFFSET+UPGRADE_TYPE_OFFSET]][j];
			}

			let talent_detail = TALENT_DETAIL[data[i*OFFSET+DESCRIPTION_OFFSET]];
			for (let j = 0; j < MAX_PARAMS_COUNT; j++) {
				talent_detail = talent_detail.replaceAll("{" + String(j+1) + "}", display_talent_parameter(data[i*OFFSET+PARAMS_OFFSET+j*2], data[i*OFFSET+PARAMS_OFFSET+j*2+1]));
				talent_detail = talent_detail.replaceAll("{" + String(j+1) + "r}", display_talent_parameter(data[i*OFFSET+PARAMS_OFFSET+j*2]/4, data[i*OFFSET+PARAMS_OFFSET+j*2+1]/4));
			}

			let wikitext = `\n\|-
\|` + String(i+1) + `\n
\|` + talent_type + `\n
\|` + TALENT_DESCRIPTION[data[i*OFFSET+DESCRIPTION_OFFSET]] + `\n
\|` + talent_detail + `\n
\|` + max_level + `\n
\|` + String(TALENT_LEVEL[data[i*OFFSET+UPGRADE_TYPE_OFFSET]].slice(0, max_level)) + `\n
\|` + total_np;
			body.push(wikitext);
		}

		return body.join("\n");
	}
	function display_talent_parameter(param_1, param_2) {
		if (param_1 == param_2) return param_1;
			return param_1 + "~" + param_2;
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