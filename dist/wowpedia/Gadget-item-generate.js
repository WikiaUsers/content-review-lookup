wowItem = new Array();

var tagMap = {'Heroic' : '#Heroic', 'Raid Finder' : '#Raid Finder', 'Flexible' : '#Flexible', 'Warforged' : '#Warforged', 'Heroic Warforged' : '#Heroic Warforged'};
var orderMap = {}, order = "name quality icon stack tag azerite conjured location holiday bind unique unique_eq unique_type duration qbegin ilvls slot type mount glyph relic dmglow dmghigh dmgtype bonuslow bonushigh bonustype corruption speed armor bonusarmor strength agility stamina intellect agiint strint agistr agistrint versatility crit hit haste mastery spellpen spellpower attackpower rangedattackpower expertise resilience pvppower arcane fire nature frost shadow resist gem gemattrib randomsuffix req rfaction rep rating red_sockets blue_sockets yellow_sockets meta_sockets prismatic_sockets cogwheel_sockets sha_sockets sockbonus durability locked bag classes races prof profskill pickup equip equip2 onhit use create set toy level ilvl charges sellprice itemid";
order = order.split(/\s+/);
for (var i = 0; i < order.length; i++) orderMap[order[i]] = i;
order = null;

function fetchItemData(proc, tt, fragment, bonus, name) {
	tt = tt ? tt : prompt("Item name or ID", mw.config.get('wgTitle').replace(/( \(heroic|raid finder\)|")/gi, ""));
	if (!tt) return;
	wowItem[tt] = {};
	$.getScript("https://www.pcj.us/wjs/?i=" + tt + (bonus!=null?"&bonus="+bonus:""), function() {
		if (typeof (retrieveItem) == "function") {
			retrieveItem();
			retrieveItem = null;
		}
		if (wowItem[tt].error) {
			alert("Error: " + wowItem[tt].error);
		} else {
			if (name != null && wowItem[tt].name != name) alert("Warning: Tooltip is being updated with a different name than existed previously.");
			if (fragment == "dynamic") {
				fragment = (wowItem[tt].tag && tagMap[wowItem[tt].tag]) ? tagMap[wowItem[tt].tag] : null;
			}
			if (fragment == null) fragment = "Itemtip";
			gTooltip = "{{#data:" + fragment + "\n";
			var props = [];
			for (property in wowItem[tt]) {
				if (property != "null") props[props.length] = property;
			}
			props.sort(function (a, b) {
				var av = orderMap[a];
				var bv = orderMap[b];
				if (a == b) return 0;
				if (av == null && bv == null) return a < b ? -1 : 1;
				if (av == null || bv == null) return av == null ? 1 : -1;
				return av - bv;
			});

			for (i in props) {
				var key = props[i].replace("_", "-"), value = wowItem[tt][props[i]];
				gTooltip += "|" + key + "=" + value + "\n";
			}
			proc(gTooltip + "}}", tt, fragment);
		}
	});
}

function itemCreate(context) {
	$("#wpTextbox1").val($("#wpTextbox1").val().replace(/\{\{sell\|.*?\}\}/gi,""));
	its = $("#wpTextbox1").val().split("{{#data:");
	if (its.length<2) {
		fetchItemData(function(tt, ttid) {
			if (tt == null) return;
			$("#wpTextbox1").val("{" + "{Stub/Item}}\n" + tt + "\n\n'''"+wowItem[ttid].name+"'''...\n\n==Patch changes==\n*{"+"{Patch ...|note=Added.}}\n\n==External links==\n{" + "{subst:el}}\n{" + "{Elinks-item|" + wowItem[ttid].itemid + "}}");
		}, null, null, null, null); 
		return;
	}
	for (it in its) {
		id = null, fragment = null, bonus = null, name = null;
		var iidm = its[it].match(/((?:itemtip)?#[^|\n]*[^\s|])?([\s\S]*?)\|itemid(?: )?=(?: )?(\d+)/i);
		if (iidm) {
			fragment = iidm[1]; id = iidm[3];
		}
		if (id == null) continue;
		if (fragment == null) fragment = 'Itemtip';
		var itagm = its[it].match(/((?:itemtip)?#[^|\n]*[^\s|])?([\s\S]*?)\|tag=([\w ]+)/i);
		if (itagm) {
			switch (itagm[3].toLowerCase()) {
				case "heroic":
					bonus = 566;
				break;
				case "mythic":
					bonus = 567;
				break;
				case "timewarped":
					bonus = 3627;
				break;
				case "raid finder":
					bonus = 451;
				break;
			}
		}
		var ibonusm = its[it].match(/((?:itemtip)?#[^|\n]*[^\s|])?([\s\S]*?)\|itembonus=(\d+)/i);
		if (ibonusm && bonus == null) bonus = ibonusm[3];
		var inamem = its[it].match(/((?:itemtip)?#[^|\n]*[^\s|])?([\s\S]*?)\|name=(?: )?([\w', :\"\-]+)/i);
		if (inamem) name = inamem[3];
		fetchItemData(function(tt, ttid, frag) {
			var ttRE = new RegExp("\\{\\{#data:"+frag+"(.|[\\n])*?\\}\\}",'i');
			$("#wpTextbox1").val($("#wpTextbox1").val().replace(ttRE,tt));
		}, id, fragment, bonus, name);
	}
}

function insertTooltip(context) {
	box = $("#wpTextbox1");
	box.val(box.val().replace(/\{\{sell\|.*?\}\}/gi,""));
	var p = box.textSelection('getSelection'), id = null, fragment = null, bonus = null, name = null;
	var iidm = p.match(/\{\{#data:((?:itemtip)?#[^|\n]*[^\s|])?([\s\S]*?)\|itemid(?: )?=(?: )?(\d+)/i);
	if (iidm) {
		fragment = iidm[1]; id = iidm[3];
	}
	if (id == null && p.match(/^\d+$/)) id = parseInt(p);
	var itagm = p.match(/\{\{#data:((?:itemtip)?#[^|\n]*[^\s|])?([\s\S]*?)\|tag=(\w+)/i);
	if (itagm) {
		switch (itagm[3].toLowerCase()) {
			case "heroic":
				bonus = 566;
			break;
			case "mythic":
				bonus = 567;
			break;
			case "timewarped":
				bonus = 3627;
			break;
			case "raid finder":
				bonus = 451;
			break;
		}
	}
	var ibonusm = p.match(/\{\{#data:((?:itemtip)?#[^|\n]*[^\s|])?([\s\S]*?)\|itembonus=(\d+)/i);
	if (ibonusm && bonus == null) bonus = ibonusm[3];
	var inamem = p.match(/((?:itemtip)?#[^|\n]*[^\s|])?([\s\S]*?)\|name=(?: )?([\w', :\"\-]+)/i);
	if (inamem) name = inamem[3];
	if (fragment == null && !p.match(/\{\{#data:/) && box.text().match(/\|itemid(?: )?=/)) fragment = 'dynamic';
	fetchItemData(function(tt) {
		box.textSelection('encapsulateSelection', {"peri": tt, "replace":true, "selectPeri":true});
		$("#ext-editbutton-item").animate({"margin-left": "+=10"}, 'fast').animate({"margin-left": "-=10"}, 'fast');
	}, id, fragment, bonus, name);
	box.focus();
}

mw.loader.using(['site','ext.wikiEditor']).done(function() {
	if ((mw.config.get('wgAction') != "edit" && mw.config.get('wgAction') != "submit") || mw.config.get('wgPageName').indexOf("Quest:") > -1) return;
	icText = ($("#wpTextbox1").val()) ? "Update item tooltip" : "Create item page";
	$(".ve-fd-header__actions").prepend('<a class="wds-button wds-is-text page-header__action-button has-label oo-ui-buttonElement-button" href="#" id="ca-create-item" role="button" data-tracking-label="ca-create-item" accesskey="a"><span class="oo-ui-labelElement-label">'+ icText + '</span></a>');
	$(".ve-fd-header__actions").prepend('<a class="wds-button wds-is-text has-label oo-ui-buttonElement-button" href="#" id="ca-insert-tooltip" role="button" data-tracking-label="ca-insert-tooltip"><span class="oo-ui-labelElement-label">Insert item tooltip</span></a>');
	$('#ca-create-item').click(function(){ itemCreate(); });
	$('#ca-insert-tooltip').click(function(){ insertTooltip(); });
	$('#wpTextbox1').wikiEditor( 'addToToolbar', {
		'section': 'main',
		'group': 'insert',
		'tools': {
			'tooltip': {
				label: icText, 
				type: 'button',
				icon: 'https://static.wikia.nocookie.net/wowpedia/images/6/6f/Button_item.png/revision/latest',
				action: {
					type: 'callback',
					execute: function(context) {
						itemCreate();
					}
				}
			}
		}
	});
});