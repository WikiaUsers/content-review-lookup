/* generate 3d tank model - use tanki's */

$(function() {
	var fn = {};
	/* functions */
	// generate <object> node
	fn.genTank = function(name) {
		var isValidName = false,
			isDebug = false;
		try {
			if ((name.search(/[^a-zA-Z0-9_\-\.]/) == -1 && name.length > 0) || name == "@") {
				// name does not contain invalid characters - a valid username
				isValidName = true;
				if (name == "@") {
					isDebug = true;
				}
			}
		} catch(err) {}
		if (isDebug) {
			// debug ('[data-tanker="@"]') - do not apply changes
			console.log(arguments);
			return false;
		} else if (isValidName) {
			// if the name is valid (alpha-numerical value, + optional minus signs, underscores or dots)
			var obj = document.createElement("object"),
				prm,
				params;
			params = {
				"menu": "false",
				"seamlesstabbing": "false",
				"wmode": "transparent",
				"flashvars": "userName=" + name + "&mountedItemsXmlUrl=https://ratings.tankionline.com/get_stat/mounteditems/"
			};
			obj.setAttribute("data", "https://ratings.tankionline.com/swf/viewer2.swf");
			obj.className = "tanker3d-object";
			for (var paramKey in params) {
				prm = document.createElement("param");
				prm.setAttribute("name", paramKey);
				prm.setAttribute("value", params[paramKey]);
				obj.appendChild(prm);
			}
			return obj;
		} else {
			var msg = document.createElement("code");
			msg.setAttribute("style", "color: #c00; font-size: 20px;");
			msg.innerText = "Invalid tanker name";
			return msg;
		}
	}
	// replace placeholders with 3d tank models
	fn.insertTank = function(_parent) {
		$(_parent || "body").find(".tanker3d-placeholder[data-tanker]").each(function() {
			var dataTanker = $(this).attr("data-tanker"),
				newNode = fn.genTank(dataTanker);
			if (newNode) {
				$(this).replaceWith(newNode);
			}
		});
	}

	/* implementations */

	// first check if user has flash (pretty much all pcs have flash- probably way less than the number of pcs that still use ie8- but why not)
	if (navigator.plugins.namedItem("Shockwave Flash") instanceof Object) {
		// user has flash
		// update markup
		fn.insertTank();
		// start observing the dom and see if further placeholders are added
		fn.obs = new MutationObserver(function(ms) {
			for (var i = 0; i < ms.length; i++) {
				for (var j = 0; j < ms[i].addedNodes.length; j++) {
					var node = ms[i].addedNodes[j];
					if (node.nodeType == 1) {
						fn.insertTank(node);
					}
				}
			}
		});
		// start observing
		fn.obs.observe(document.body, {
			childList: true,
			subtree: true
		});
	}
});


/* ================================ *\
	# protection module generator
\* ================================ */
window.tow = window.tow || {};
tow.protectionModules = {
	data: {},
	fn: {}
}

/* data */
// file url paths
tow.protectionModules.data.moduleUrlPaths = {
	icons: {
		Firebird: "4/41",
		Freeze: "b/b7",
		Isida: "6/6c",
		Hammer: "e/ee",
		Twins: "1/1d",
		Ricochet: "c/ce",
		Smoky: "1/14",
		Vulcan: "1/12",
		Thunder: "8/8a",
		Striker: "e/e4",
		Railgun: "a/ab",
		Magnum: "e/ef",
		Shaft: "a/ae",
		Mine: "7/7d",
		general: "b/bb"
	},
	modules: {
		M0: "8/81",
		M1: "0/0a",
		M2: "d/d0",
		M3: "6/61",
		special: "9/90"
	}
}
// green icon background
tow.protectionModules.data.iconbg = "http\x3a//images.wikia.com/tankionline/images/2/25/Garage_icons_protection_module_background.png";

/* functions */
// get icon image url
tow.protectionModules.fn.getIconUrl = function(name) {
	var validIcons = ["Firebird", "Freeze", "Isida", "Hammer", "Twins", "Ricochet", "Smoky", "Vulcan", "Thunder", "Striker", "Railgun", "Magnum", "Shaft", "Mine", "general"];
	if (validIcons.indexOf(name) > -1) {
		name = name;
	} else {
		name = "general";
	}
	return "http\x3a//images.wikia.com/tankionline/images/" + tow.protectionModules.data.moduleUrlPaths.icons[name] + "/Garage_icons_protection_modules_" + name + ".png";
}
// get module image url
tow.protectionModules.fn.getModuleUrl = function(name) {
	var validModules = ["M0", "M1", "M2", "M3", "special"];
	if (validModules.indexOf(name) > -1) {
		name = name;
	} else {
		name = "M0";
	}
	return "http\x3a//images.wikia.com/tankionline/images/" + tow.protectionModules.data.moduleUrlPaths.modules[name] + "/Protection_Module_icon_" + name + ".png";
}
// create module canvas
tow.protectionModules.fn.createModuleCanvas = function(moduleData, cb) { // cb's 'ths' is bounded to the generated canvas
	// moduleData = {type: /M[0-3]|special/, prot: []}
	var canvas = document.createElement("canvas"),
		ctx = canvas.getContext("2d"),
		content = [];
	cb = cb.bind(canvas);
	canvas.className = "protection-module-canvas";
	canvas.width = 166;
	canvas.height = 106;
	content.push({
		url: tow.protectionModules.fn.getModuleUrl(moduleData.type),
		x: 0,
		y: 0
	});
	moduleData.prot = Array.isArray(moduleData.prot) ? moduleData.prot : [];
	moduleData.prot.concat(/* clone in order not to affect other script modules that use the same protection data */).reverse(/* reverse because icons are drawn from right to left */).forEach(function(prot, i) {
		// 'x' and 'y' are just for testing - put the logic for calculation position later, based on 'i' and 'moduleData.prot.length'
		var listWidth = 32 * moduleData.prot.length - 2,
			x = (166 - listWidth) / 2 + i * (32),
			y = 36;
		x = 166 - x - 30; // mirror the drawing position of x - icons are drawn from right to left
		content.push({
			url: tow.protectionModules.data.iconbg,
			x: x - 1,
			y: y - 1
		});
		content.push({
			url: tow.protectionModules.fn.getIconUrl(prot),
			x: x + 1,
			y: y + 1
		});
	});
	tow.protectionModules.fn.fillModule(ctx, content, cb);
}
// draw images on module canvas
tow.protectionModules.fn.fillModule = function(ctx, arrayOfImages, cb) {
	if (arrayOfImages.length === 0) {
		cb();
	} else {
		var curr = arrayOfImages.shift(),
			img = document.createElement("img");
		img.onload = function() {
			ctx.drawImage(this, curr.x || 0, curr.y || 0);
			tow.protectionModules.fn.fillModule(ctx, arrayOfImages, cb);
		}
		img.src = curr.url;
	}
}
// create module svg
tow.protectionModules.fn.createModuleSvg = function(moduleData, cb) {
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
		icon = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
		title = document.createElementNS("http://www.w3.org/2000/svg", "title"),
		curr,
		currProt,
		i;
	svg.className = "protection-module-svg";
	svg.setAttributeNS(null, "width", "166");
	svg.setAttributeNS(null, "height", "106");
	svg.style.position = "absolute";
	svg.style.top = "0";
	svg.style.left = "0";
	svg.style.pointerEvents = "none";
	icon.setAttributeNS(null, "width", "30");
	icon.setAttributeNS(null, "height", "30");
	icon.setAttributeNS(null, "y", "36");
	icon.setAttributeNS(null, "rx", "2");
	icon.setAttributeNS(null, "ry", "2");
	icon.setAttributeNS(null, "fill", "rgba(0, 0, 0, 0)");
	icon.style.cursor = "pointer";
	icon.style.pointerEvents = "fill";
	icon.appendChild(title);
	function openPage() {
		open("/wiki/" + encodeURIComponent(this));
	}
	for (i = 0; i < moduleData.prot.length; i++) {
		curr = icon.cloneNode(true);
		currProt = moduleData.prot[i];
		curr.querySelector("title").appendChild(document.createTextNode(currProt));
		curr.setAttributeNS(null, "x", String((166 - (32 * moduleData.prot.length - 2)) / 2 + i * (32)));
		curr.addEventListener("click", openPage.bind(currProt));
		svg.appendChild(curr);
	}
	cb = cb.bind(svg);
	cb();
}
// create new module
tow.protectionModules.fn.createModule = function(moduleData, cb) {
	var nav = document.createElement("nav");
	nav.className = "protection-module-nav";
	nav.style.width = "166px";
	nav.style.height = "106px";
	nav.style.position = "relative";
	cb = cb.bind(nav);
	tow.protectionModules.fn.createModuleCanvas(moduleData, function() {
		nav.appendChild(this);
		tow.protectionModules.fn.createModuleSvg(moduleData, function() {
			nav.appendChild(this);
			cb();
		})
	});
}

/* implement */
$(".protection-module").each(function() {
	var placeholder = this,
		data = {type: null, prot: []},
		protAttr = $(this).attr("data-protection-module-prot");
	data.type = $(this).attr("data-protection-module-type");
	if (typeof protAttr === "string") {
		// value not empty or set to 'NONE'
		if (protAttr != "NONE" && protAttr.trim().length > 0) {
			data.prot = protAttr.split("##");
		}
	}
	window.q = data;
	tow.protectionModules.fn.createModule(data, function() {
		$(placeholder).replaceWith(this);
	});
});


/* ================================ *\
	# filter for [[Protection_Modules]]
\* ================================ */
if (mw.config.get("wgPageName") == "Protection_Modules") {
$(".protection-module-table").each(function() {
	var form = $(
			'<form class="protection-module-table-filter">' +
				'<tl>' +
					'<dt>Filtering options</dt>' +
				'</dl>' +
				'<ul></ul>' +
				'<div class="protection-module-table-filter-settings">' +
					'Filtering mode: <select class="protection-module-table-filter-mode">' +
						'<option value="0">Modules with at least one of the selected options</option>' +
						'<option value="1">Modules with all selected protections</option>' +
					'</select><br />' +
				'</div>' +
			'</form>'
		),
		prots = ["Firebird", "Freeze", "Isida", "Hammer", "Twins", "Ricochet", "Smoky", "Vulcan", "Thunder", "Striker", "Railgun", "Magnum", "Shaft", "Mine", "general"],
		filter = {};
	window.filter = filter;
	window.form = form;
	prots.forEach(function(prot, i) {
		$(form).find("ul").append(/*(i > 1 ? '<br />' : '') + */'<li><input type="checkbox" value="' + prot + '" checked /> ' + (prot == "general" ? "Universal protection" : prot) + '</li>');
		filter[prot] = true;
	});
	function refresh() {
		$(form).next().find('tr[data-protections]').each(function() {
			var modProts = $(this).attr("data-protections").trim().replace(/[^[a-zA-Z]+/, " ").split(" "),
				filteringMode =  $(form).find(".protection-module-table-filter-mode").val(),
				i;
			if (filteringMode === "0") {
				// mode '0'
				var allProtectionsHidden = true;
				for (i = 0; i < modProts.length; i++) {
					if (filter[modProts[i]]) {
						allProtectionsHidden = false;
						break;
					}
				}
				if (allProtectionsHidden) {
					$(this).hide();
				} else {
					$(this).show();
				}
			} else if (filteringMode === "1") {
				// mode '1'
				var allSelectionsInModule = true;
				for (i in filter) {
					if (filter[i] && modProts.indexOf(i) === -1) {
						allSelectionsInModule = false;
						break;
					}
				}
				if (allSelectionsInModule) {
					$(this).show();
				} else {
					$(this).hide();
				}
			}
		});
	}
	$(form).find('input[type="checkbox"]').click(function() {
		filter[this.value] = this.checked;
		refresh();
	});
	$('<input type="button" value="all" />').click(function() {
		$(form).find('input[type="checkbox"]').each(function() {
			this.checked = filter[this.value] = true;
		});
		refresh();
	}).appendTo($(form).find(".protection-module-table-filter-settings"));
	$('&nbsp;<input type="button" value="none" />').click(function() {
		$(form).find('input[type="checkbox"]').each(function() {
			this.checked = filter[this.value] = false;
		});
		refresh();
	}).appendTo($(form).find(".protection-module-table-filter-settings"));
	$(form).find(".protection-module-table-filter-mode").change(function() {
		refresh();
	});
	// css
	mw.util.addCSS(
		'.protection-module-table-filter {\n' +
			'\tpadding: 3px 10px;\n' +
			'\tborder: 1px solid #6b6c6c;\n' +
			'\tfont-size: smaller;\n' +
		'}\n' +
		'.protection-module-table-filter ul {\n' +
			'\tmargin: auto;\n' +
			'\tpadding: 0 20px;\n' +
			'\tcolumn-count: 4;\n' +
			'\tlist-style: none;\n' +
		'}\n' +
		'.protection-module-table-filter input[type="button"] + input[type="button"] {\n' +
			'\tmargin-left: 3px;\n' +
		'}'
	);
	$(this).before(form);
});
}