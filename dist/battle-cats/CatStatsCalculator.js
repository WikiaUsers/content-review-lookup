/* Calculate a given CRO's HP and ATK based on their level and EoC collection rate */

mw.loader.using('mediawiki.api').then(function () {
	if (mw.config.get('wgPageName') == 'Level-up') {
		handleStatCalculator();
	}
});

function handleStatCalculator() {
	// constants
	const CAT_RELEASE_ORDER_PAGENAME = "Cat_Release_Order";
	const STAT_HP = 0;
	const STAT_ATK = 3;
	const STAT_ATK_2 = 59;
	const STAT_ATK_3 = 60;
	const ERROR_INVALID_INPUT = "<p>ERROR: Stats not found.</p>";
	const ERROR_MISSING_GROWTH_CURVE = "<p>BUG: Growth curve for this Cat is missing.</p>";
	// decorate input
	$("#search_form").append(`<table>
<tr>
<td><b><a href='/` + CAT_RELEASE_ORDER_PAGENAME + `'>CRO</a></b></td>
<td><input type="number" id="cro" min="0" value="0"></td>
<td><sup>(value >= 0)</sup></td>
</tr>
<tr>
<td><b>Form</b></td>
<td colspan=2><select id="cat_form">
	<option value="0">Normal</option>
	<option value="1">Evolved</option>
	<option value="2">True</option>
	<option value="3">Ultra</option>
</select></td>
</tr>
<tr>
<td><b>Level</b></td>
<td><input type="number" id="cat_level" min="1" value="30"></td>
<td><sup>(1 <= value <= 200)</sup></td>
</tr>
<tr>
<td><b>EoC Treasure</b></td>
<td><input type="number" id="eoc_treasure" min="0" max="300" value="300">%</td>
<td><sup>(0 <= value <= 300)</sup></td>
</tr>
<tr>
<td></td>
<td colspan=2><button id="btnCalculate" type="button">Display</button></td>
</tr>
</table>`);

	// data source
	let growth_curve = null;
	let stats = [{}, {}, {}, {}];

	const PARAMS_GROWTH_CURVE = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/cat_level_multiplier.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const PARAMS_STATS_1 = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/cat_stats_form_1.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const PARAMS_STATS_2 = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/cat_stats_form_2.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const PARAMS_STATS_3 = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/cat_stats_form_3.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const PARAMS_STATS_4 = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/cat_stats_form_4.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	// fetching data
	api = new mw.Api();
    api.get(PARAMS_GROWTH_CURVE).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        growth_curve = JSON.parse(content);
    });
    api.get(PARAMS_STATS_1).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        stats[0] = JSON.parse(content);
    });
    api.get(PARAMS_STATS_2).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        stats[1] = JSON.parse(content);
    });
    api.get(PARAMS_STATS_3).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        stats[2] = JSON.parse(content);
    });
    api.get(PARAMS_STATS_4).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        stats[3] = JSON.parse(content);
    });
	// events
	$("#btnCalculate").on("click", function() {
		calculate();
	});
	// calculating
	function calculate() {
		// input parsing
		let level = parseInt($("#cat_level").val());
		let cro = parseInt($("#cro").val()).toString();
		let form = parseInt($("#cat_form").val());
		let eoc_treasure = (parseInt($("#eoc_treasure").val()) / 100) * 0.5 + 1;
		// validating
		if (stats[form][cro] === undefined) {
			$("#result").html(ERROR_INVALID_INPUT);
			return;
		}
		if (growth_curve[cro] === undefined) {
			$("#result").html(ERROR_MISSING_GROWTH_CURVE);
			return;
		}
		// calculating
		let result_hp = stats[form][cro][STAT_HP];
		let result_atk = stats[form][cro][STAT_ATK];
		let result_atk_2 = stats[form][cro][STAT_ATK_2] === undefined ? 0 : stats[form][cro][STAT_ATK_2];
		let result_atk_3 = stats[form][cro][STAT_ATK_3] === undefined ? 0 : stats[form][cro][STAT_ATK_3];
		for (let i = 1; i < level; i++) {
			if (growth_curve[cro][Math.floor(i / 10)] === undefined)
				break;
			result_hp += stats[form][cro][STAT_HP] * growth_curve[cro][Math.floor(i / 10)] / 100;
			result_atk += stats[form][cro][STAT_ATK] * growth_curve[cro][Math.floor(i / 10)] / 100;
			if (stats[form][cro].length > STAT_ATK_2 && stats[form][cro][STAT_ATK_2] != 0)
				result_atk_2 += stats[form][cro][STAT_ATK_2] * growth_curve[cro][Math.floor(i / 10)] / 100;
			if (stats[form][cro].length > STAT_ATK_3 && stats[form][cro][STAT_ATK_3] != 0)
				result_atk_3 += stats[form][cro][STAT_ATK_3] * growth_curve[cro][Math.floor(i / 10)] / 100;
		}
	
		result_hp = Math.round(result_hp * eoc_treasure);
		result_atk = Math.round(result_atk * eoc_treasure);
		result_atk_2 = Math.round(result_atk_2 * eoc_treasure);
		result_atk_3 = Math.round(result_atk_3 * eoc_treasure);
		// displaying
		$("#result").html(
			"<div style='overflow-x: auto'>" + 
			"<table style='border:1px solid black'>" + 
			"<th colspan=2 style='background:#00000037'>Base Stats</th>" + 
			"<tr><td style='background:#00000006'><b>Growth Curve</b></td>" + 
			"<td>" + display_growth_curve(growth_curve[cro]) + "</td></tr>" +
			"<tr><td style='background:#00000006'><b>HP</b></td>" + 
			"<td>" + stats[form][cro][STAT_HP] + "</td></tr>" +
			"<tr><td style='background:#00000006'><b>ATK</b></td>" + 
			"<td>" + display_atk(
				stats[form][cro][STAT_ATK], 
				stats[form][cro][STAT_ATK_2] === undefined ? 0 : stats[form][cro][STAT_ATK_2], 
				stats[form][cro][STAT_ATK_3] === undefined ? 0 : stats[form][cro][STAT_ATK_3]) + 
			"</td></tr>" +
			"<th colspan=2 style='background:#00000037'>At level " + level + " and " + $("#eoc_treasure").val() + "% EoC treasure</th>" + 
			"<tr><td style='background:#00000006'><b>HP</b></td>" + 
			"<td>" + result_hp + "</td></tr>" +
			"<tr><td style='background:#00000006'><b>ATK</b></td>" + 
			"<td>" + display_atk(result_atk, result_atk_2, result_atk_3) + "</td></tr>" +
			"</table></div>"
		);
	}
	// utility functions
	function display_growth_curve(curve) {
		let row_1 = "";
		let row_2 = "</tr><tr>";
	
		for (let i = 0; i < curve.length; i++) {
			row_1 += "<td style='background:#00000025'>Lvl. " + i + "1~" + (i+1) + "0</td>";
			row_2 += "<td style='background:#00000012'>" + curve[i] + "%</td>";
		}
	
		return "<table style='border:1px solid black'><tr>" + row_1 + row_2 + "</tr></table>";
	}
	function display_atk(atk_1, atk_2, atk_3) {
		if (atk_2 == 0)
			return atk_1;
		if (atk_3 == 0)
			return atk_1.toString() + "+" + atk_2.toString() + "=" + (atk_1 + atk_2).toString();
		return atk_1.toString() + "+" + atk_2.toString() + "+" + atk_3.toString() + "=" + (atk_1 + atk_2 + atk_3).toString();
	}
}