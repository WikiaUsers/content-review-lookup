wowItem = new Array();

var tagMap = {'heroic' : '#Героїчний', 'Raid Finder' : '#Пошук рейду'};
var orderMap = {}, order = "name quality icon stack tag conjured location holiday bind unique unique_eq unique_type duration qbegin slot type mount glyph dmglow dmghigh dmgtype bonuslow bonushigh bonustype speed armor bonusarmor strength agility stamina intellect spirit crit hit haste mastery spellpen spellpower attackpower rangedattackpower expertise resilience pvppower arcane fire nature frost shadow resist gem gemattrib randomsuffix req rfaction rep rating red_sockets blue_sockets yellow_sockets meta_sockets prismatic_sockets cogwheel_sockets sha_sockets sockbonus durability locked bag classes races prof profskill pickup equip onhit use create set level ilvl charges sellprice itemid";
order = order.split(/\s+/);
for (var i = 0; i < order.length; i++) orderMap[order[i]] = i;
order = null;

function processMenuLink(tooltip, tt) {
	if (tooltip == null) return;
	if ($("#wpTextbox1").val()) {
		$("#wpTextbox1").val($("#wpTextbox1").val().replace(/(\{\{#data:Itemtip(.|[\n])*?\}\}|<onlyinclude>(.|[\n])*?<\/onlyinclude>)/i, tooltip));
	} else {
		$("#wpTextbox1").val("{" + "{Stub/Item}}\n" + tooltip + "\n==Source==\n...\n\n==Patches and hotfixes==\n{{Patch ...|note=Added.}}\n\n==External links==\n{" + "{subst:el}}\n{" + "{Elinks-item|" + wowItem[tt].itemid + "}}");
	}
}

function fetchItemData(proc, tt, fragment) {
	tt = tt ? tt : prompt("Item name or ID", wgTitle.replace(/( \(heroic|raid finder\)|'|")/gi, ""));
	if (!tt) return;
	wowItem[tt] = {};
	$.getScript("http://www.warcraftjs.com/i/" + tt, function() {
		if (typeof (retrieveItem) == "function") {
			retrieveItem();
			retrieveItem = null;
		}
		if (wowItem[tt].error) {
			alert("Error: " + wowItem[tt].error);
		} else {
			if (fragment == "dynamic") {
				fragment = (wowItem[tt].tag && tagMap[wowItem[tt].tag]) ? tagMap[wowItem[tt].tag] : null;
			}
			gTooltip = "{{#data:" + (fragment ? fragment : "Itemtip") + "\n";
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
			proc(gTooltip + "}}", tt);
		}
	});
}

$(function() {
	if ((wgAction != "edit" && wgAction != "submit") || wgPageName.indexOf("Quest:") > -1) return;
	
	icText = ($("#wpTextbox1").val()) ? "Update item tooltip" : "Create item page";
	$(mw.util.addPortletLink('p-cactions', 'javascript:void(null);', icText, 'ca-create-item', icText, 'i')).click(function() { fetchItemData(processMenuLink, null, null); })

	var btn = $('<img src="http://www.wowpedia.org/images/6/6f/Button_item.png" width="23" height="22" class="mw-toolbar-editbutton" id="ext-editbutton-item" alt="Insert or update item data" title="Insert or update item data" style="cursor: pointer" />'), box = $("#wpTextbox1");
	btn.click(function() {
		var p = box.textSelection('getSelection'), id = null, fragment = null;
		var iidm = p.match(/\{\{#data:((?:itemtip)?#[^|\n]*[^\s|])?([\s\S]*?)\|itemid=(\d+)/i);
		if (iidm) {
			fragment = iidm[1]; id = iidm[3];
		}
		var iidm = p.match(/\{\{#data:((?:itemtip)?#[^|\n]*[^\s|])?[\s\S]*?\|set=[^|\n]+(#[^\n\r|]+)/i);
		if (id == null && p.match(/^\d+$/)) id = parseInt(p);
		if (fragment == null && !p.match(/\{\{#data:/) && box.text().match(/\|itemid=/)) fragment = 'dynamic';
		fetchItemData(function(tt) {
			box.textSelection('encapsulateSelection', {"peri": tt, "replace":true, "selectPeri":true});
			$("#ext-editbutton-item").animate({"margin-left": "+=10"}, 'fast').animate({"margin-left": "-=10"}, 'fast');
		}, id, fragment);
		box.focus();
	});
	setTimeout(function() { $("#toolbar").append(btn); }, 50);
});