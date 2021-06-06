!(function( $, mw ) {
	"use strict";
	if ( mw.config.get('wgPageName') !== 'Save-Generator' ) return;
	var SG;
	var gm = document.getElementById("generator_main"),
		upgrade_string_regex = /([a-z0-9_]+):(\d)+,/gm,
		found_count_regex = /([a-z0-9]+):([0-9]+),*/gm,
		kill_count_regex = found_count_regex,
		params_base = {
			action: "cargoquery",
			format: "json",
			formatversion: "2",
			limit: "max"
		},
		params_items = {
			tables: "GUIDs, Items, Bestiary, Familiars",
			fields: "GUIDs.name=GName,Items.name=IName,Bestiary.name=BName,Familiars.name=FName, Items.type, GUIDs.item_guid, GUIDs.effect_guid=statusEffects, GUIDs.potion_guid=potionDatas, GUIDs.upgrade_guid=equipment",
			where: "GUIDs.name>'' OR Items.name>'' OR Bestiary.name>'' OR Familiars.name>''",
			join_on: "GUIDs.name=Items.name, GUIDs.name=Bestiary.name, GUIDs.name=Familiars.name"
		},
		params_upgrades = {
			tables: "Upgrades",
			fields: "key_name, min, max, description"
		},
		datas = {},
		img_url = mw.config.values.wgServer + mw.config.values.wgScript + "?title=Special:Redirect&wptype=file&wpvalue=",
		org_json,
		types = { // type, SaveFileName, min, max
			"name": ["text", "peonName"],
			"color": ["number", "peonColor", 0],
			"health": ["number", "hp", 0, 100],
			"bombs": ["number", "bombs", 0, 99],
			"gold": ["number", "gold", 0, 999999],
			"thorium": ["number", "thorium", 0, 999999],
			"nether": ["number", "nether", 0, 999999],
			"keys": ["number", "keys", 0, 99],
			"familiar": ["loading", ""],
			"playtime": ["number", "playTime", 0],
			"guid": ["label", "guid"],
			"gender": ["select", "gender", "Male", "470fadeafb964c6f99ed7edb3cbcfa50", "Female", "12978e83e73548c89a2aba4d008ad5d0"],
		},
		types_to_autosave = ["bombs", "gold", "hp", "keys", "nether", "thorium"],
		portrait = {
			clothes: [ // dark, light
				'183039', '39516B',
				'181818', '393839',
				'423C42', '6B696B',
				'391818', '5A3421',
				'422C21', '634931',
				'636973', '8C9294',
				'314121', '4A6939',
				'421831', '5A2439',
				'8C3C08', 'B55908',
				'420008', '6B1800',
				'6B3C18', '946529',
				'213C39', '316152'
				/* '343F21', '466A38'*/
			],
			eyes: [
				'298493',
				'781F14',
				'4B5C5F',
				'359200',
				'8C2992',
				'552E8A',
				'A3CBD1',
				'718D92'
			],
			hair: [ // dark, middle, light
				'291418', '522C29', '8C5142',
				'311808', '522C18', '9C6131',
				'841C10', 'B55121', 'EF924A',
				'422010', '734518', 'C68E4A'
			],
			hat: [ // dark, light
				'212029', '394552',
				'181818', '313031',
				'292829', '5A555A',
				'312021', '523C31',
				'392821', '5A4D39',
				'394142', '737984',
				'212821', '4A5542',
				'291C29', '523442',
				'7B3018', 'B55921',
				'310C08', '5A1C10',
				'734918', 'B58239',
				'293839', '395952'
				/* 'CDCDCD', 485643 */
			],
			skin: [ // dark, light
				'632C18', '945531',
				'8C4521', 'BD7942',
				'D67D52', 'E7B28C',
				'B65B2A', 'DD9B5D'
			],
			skin_range: 512, /* 2**9 */
			eye_range: 65536, /* 2**16 */
			max_range: 524288 /* eye_range * 8 */
		},
		color_change_sec = {
			"clothes": "hat",
			"hair": "skin",
			"hat": "clothes",
			"skin": "hair",
		},
		color_change_temp = {},
		d_options,
		f_options,
		u_options,
		o_options,
		s_options,
		k_options;
	SG = {
		clear_table: function(des) {
			while (des.rows.length > 3) {
				des.deleteRow(2);
			}
		},
		delete_row: function (des) {
			des.parentElement.deleteRow(des.rowIndex);
		},
		set_attributes: function(ele, args) {
			for (var i = 0; i < args.length; i += 2) {
				ele.setAttribute(args[i], args[i + 1]);
			}
		},
		get_index: function(field) {
			for (var i=0;i<field.list.options.length;i++) {
				if (field.value === field.list.options[i].value || field.value === field.list.options[i].getAttribute("sg_search_alt")) {
					return field.list.options[i];
				}
			}
			return;
		},
		add_row: function (ele) {
			var val = ele.children[0].children[0];
			if (!val.list || val.value.length === 0) { return; }
			var ind = SG.get_index(val);
			if (!ind) {return;}
			var data = datas[ind.getAttribute("sg_datatable")][ind.getAttribute("sg_index")].title;
			var par = ele.parentElement;
			var newrow = par.insertRow(par.rows.length - 1);
			newrow.setAttribute("sg_data", ind.getAttribute("sg_search_alt"));
			for (var i = 0; i < par.rows[1].cells.length; i++) {
				newrow.insertCell(-1);
			}
			var name = data.IName || data.BName || data.FName || data["key name"] || data.GName;
			for (i = 0; i < newrow.cells.length - 1; i++) {
				var label = par.rows[1].cells[i].innerText.toLowerCase(),
					cell = newrow.cells[i],
					inp = undefined;
				if (label === "image") {
					inp = document.createElement("img");
					SG.set_attributes(inp, ["src", img_url + name + ".png", "loading", "lazy"]);
					cell.className = "sg_image";
				} else if (label === "value") {
					inp = document.createElement("input");
					inp.setAttribute("type", "number");
					SG.set_attributes(inp, ["min", data.min || 0, "max", data.max || null, "value", data.min || 0]);
				} else if (label == "description") {
					cell.innerText = data.description;
				} else if (label === "name") {
					cell.innerText = name + (data.type && " (" + data.type + ")" || "");
				} else if (label === "sticky?") {
					inp = document.createElement("input");
					inp.setAttribute("type", "checkbox");
				} else if (label === "duration") {
					inp = document.createElement("input");
					SG.set_attributes(inp, ["type", "number", "min", "-1", "value", "0"]);
				} else if (label === "level") {
					inp = document.createElement("input");
					SG.set_attributes(inp, ["type", "range", "min", "1", "max", "4", "value", "1"]);
				}
				if (inp) {
					cell.appendChild(inp);
				}
			}
			newrow.cells[newrow.cells.length - 1].innerText = "X";
			SG.set_attributes(newrow.cells[newrow.cells.length - 1], ["class", "sg_delete_row", "onclick", "SG.delete_row(this.parentElement)"]);
			val.value = "";
		},
		create_upgrade_string_options: function() {
			var a = datas.upgrade_data,
				b = document.createElement("datalist");
			b.id = "upgrade_string_options";
			for (var i = 0; i < a.length; i++) {
				var c = document.createElement("option");
				var d = a[i].title.description;
				SG.set_attributes(c, ["sg_datatable", "upgrade_data", "sg_index", i, "sg_search_alt", a[i].title["key name"], "value", a[i].title["key name"] + (d.length > 0 && (" (" + d + ")") || "")]);
				b.appendChild(c);
			}
			gm.appendChild(b);
		},
		add_field: function(ele, autofilldata) {
			var a = document.getElementById(ele).children[0].children,
				b = document.createElement("input");
			SG.set_attributes(b, ["type", "text", "list", autofilldata, "placeholder", "Type.."]);
			a[(a.length - 1)].children[0].innerText = "";
			a[(a.length - 1)].children[0].className = "sg_input_field " + ele;
			a[(a.length - 1)].children[0].appendChild(b);
			a[(a.length - 1)].children[1].innerText = ">";
			SG.set_attributes(a[(a.length - 1)].children[1], ["onclick", "SG.add_row(this.parentElement)", "class", "sg_add_row"]);
		},
		add_guid: function(des, to_add){ // destination, guid
			var ele = document.getElementsByClassName("sg_input_field " + des)[0];
			var backup = ele.children[0].value;
			var old_length = ele.parentElement.parentElement.rows.length;
			ele.children[0].value = to_add;
			ele.parentElement.children[1].onclick();
			ele.children[0].value = backup;
			if (old_length === ele.parentElement.parentElement.rows.length) {
				console.log("Unknown id present (" + des + "): " + to_add);
				return false;
			}
			return true;
		},
		check_peasant: function(data) {
			var keys = Object.keys(data);
			for (var i=0;i<keys.length;i++) {
				var ele = document.getElementById("sg_peasant_" + keys[i]);
				if (ele) {
					ele.children[0].value = data[keys[i]];
				}
			}
		},
		add_data: function(a, b) {
			if (!a) { return; }
			for (var i=0;i<a.length;i++){
				SG.add_guid(b, a[i]);
			}
		},
		clear_colors: function() {
			var ele = document.getElementById("peasant_colors").children[0],
				i;
			for (i = 1; i < ele.rows.length; i++) {
				ele.rows[i].cells[1].children[0].options[0].selected = true;
				ele.rows[i].cells[1].children[0].onchange();
			}
			color_change_temp.clothes = document.getElementById("color_options_clothes");
			color_change_temp.eyes = document.getElementById("color_options_eyes");
			color_change_temp.skin = document.getElementById("color_options_skin");
		},
		clear_peasant: function(){
			var ele = document.getElementById("peasant_info").children[0],
				i;
			for (i = 1; i < ele.rows.length; i++) {
				var field = ele.rows[i].cells[1].children[0];
				if (field) {
					field.value = field.type === "number" && field.min || "";
				}
				if (field.type === "select-one") {
					field.options[0].selected = true;
					if (field.onchange) {
						field.onchange();
					}
				}
			}
			ele = document.getElementsByClassName("sg_input_field familiar")[0].children[0].options;
			if (ele) {
				for (i=0; i<ele.length; i++){
					ele[i].selected = ele[i].value === "Canary";
				}
			}
		},
		clear_familiar: function() {
			var ele = document.getElementById("familiar_list").children[0];
			for (var i=2;i<ele.rows.length;i++){
				ele.rows[i].cells[2].children[0].value = 0;
			}
		},
		clear_all: function() {
			SG.clear_peasant();
			SG.clear_colors();
			SG.clear_familiar();
			SG.clear_table(document.getElementById("unlocked_list"));
			SG.clear_table(document.getElementById("discovered_list"));
			SG.clear_table(document.getElementById("statuseffect_list"));
			SG.clear_table(document.getElementById("upgrade_string"));
			SG.clear_table(document.getElementById("killHistory_list"));
			SG.clear_table(document.getElementById("pickupHistory_list"));
			SG.clear_table(document.getElementById("dropHistory_list"));
			SG.clear_table(document.getElementById("foundCount_list"));
			SG.clear_table(document.getElementById("killCount_list"));
		},
		create_load: function() {
			var lbtn = document.getElementById("sg_load"),
				input = document.createElement('input'),
				inputLabel = document.createElement('label');
			input.id = "upload_btn";
			inputLabel.innerText = "Opens a local file from your computer.";
			inputLabel.setAttribute("for", "upload_btn");
			inputLabel.style.width = 0;
			inputLabel.style.display = "table-column";
			input.style.display = "none";
			input.type = 'file';
			lbtn.appendChild(inputLabel);
			lbtn.appendChild(input);
			SG.loadbtn = input;
			lbtn.setAttribute("onclick","window.SG.loadbtn.click()");
			input.onchange = function(e) {
				var file = e.target.files[0],
					reader = new FileReader(),
					ele,
					i;
				reader.readAsText(file);
				reader.onload = function(readerEvent) {
					var content = readerEvent.target.result;
					var loaded = JSON.parse(content),
						res,
						tmp;
					if (loaded) {
						org_json = loaded;
						SG.clear_all();
						console.log("Loading peasant..");
						loaded.peonColor = Math.max(0, loaded.peonColor || 0);
						loaded.peonColor -= Math.floor(loaded.peonColor / portrait.max_range) * portrait.max_range;
						tmp = Math.ceil(loaded.peonColor / portrait.eye_range);
						if (tmp > color_change_temp.eyes.options.length) {tmp = 1;}
						color_change_temp.eyes.options[tmp - 1].selected = true;
						loaded.peonColor -= (tmp - 1) * portrait.eye_range;
						tmp = Math.ceil(loaded.peonColor / portrait.skin_range);
						if (tmp > color_change_temp.skin.options.length) {tmp = 1;}
						color_change_temp.skin.options[tmp - 1].selected = true;
						loaded.peonColor -= (tmp - 1) * portrait.skin_range;
						color_change_temp.clothes.options[Math.min(loaded.peonColor, color_change_temp.clothes.options.length - 1)].selected = true;
						color_change_temp.eyes.onchange();
						color_change_temp.skin.onchange();
						color_change_temp.clothes.onchange();
						SG.check_peasant(loaded);
						SG.check_peasant(loaded.autoSaveData);
						if (loaded.peonID === types.gender[5]) {
							document.getElementById("sg_peasant_gender").children[0].options[1].selected = true;
						} else {
							document.getElementById("sg_peasant_gender").children[0].options[0].selected = true;
						}
						SG.gender_changed();
						console.log("Loading upgrades..");
						var ustable = document.getElementById("upgrade_string").rows;
						while ((res = upgrade_string_regex.exec(loaded.upgradeString)) !== null) {
							if (res.index === upgrade_string_regex.lastIndex) {
								upgrade_string_regex.lastIndex++;
							}
							if (SG.add_guid("upgrade_string", res[1])) {
								ustable[ustable.length-2].cells[1].children[0].value = res[2];
							}
						}
						console.log("Loading found-count..");
						var fctable = document.getElementById("foundCount_list").rows;
						while ((res = found_count_regex.exec(loaded.foundCountString)) !== null) {
							if (res.index === found_count_regex.lastIndex) {
								found_count_regex.lastIndex++;
							}
							if (SG.add_guid("foundCount_list", res[1])) {
								fctable[fctable.length-2].cells[2].children[0].value = res[2];
							}
						}
						console.log("Loading kill-count..");
						var kctable = document.getElementById("killCount_list").rows;
						while ((res = kill_count_regex.exec(loaded.killCountString)) !== null) {
							if (res.index === kill_count_regex.lastIndex) {
								kill_count_regex.lastIndex++;
							}
							if (SG.add_guid("killCount_list", res[1])) {
								kctable[kctable.length-2].cells[2].children[0].value = res[2];
							}
						}
						console.log("Loading unlocked..");
						SG.add_data(loaded.unlocked, "unlocked_list");
						console.log("Loading discovered..");
						SG.add_data(loaded.discovered, "discovered_list");
						console.log("Loading dropHistory..");
						SG.add_data(loaded.autoSaveData.dropHistory, "dropHistory_list");
						console.log("Loading pickupHistory..");
						SG.add_data(loaded.autoSaveData.pickupHistory, "pickupHistory_list");
						console.log("Loading killHistory..");
						SG.add_data(loaded.autoSaveData.killHistory, "killHistory_list");
						console.log("Loading statuseffect..");
						var se_list = document.getElementById("statuseffect_list").rows;
						for (i=0;i<loaded.autoSaveData.statusEffects.length;i++){
							if (SG.add_guid("statuseffect_list", loaded.autoSaveData.statusEffects[i].id)) {
								var row = se_list[se_list.length - 2];
								row.cells[2].children[0].value = loaded.autoSaveData.statusEffects[i].level;
								row.cells[3].children[0].value = loaded.autoSaveData.statusEffects[i].duration;
								row.cells[4].children[0].value = loaded.autoSaveData.statusEffects[i].sticky;
							}
						}
						console.log("Loading familiar-xp..");
						for (i=0;i<loaded.autoSaveData.familiarXP.length;i++){
							ele = document.getElementById("familiar_" + loaded.autoSaveData.familiarXP[i].id);
							if (ele) {
								ele.cells[2].children[0].value = loaded.autoSaveData.familiarXP[i].xp;
							}
						}
					}
				};
			};
		},
		add_list_guids: function(des, list) {
			var ele = document.getElementById(list);
			for (var i=2; i<ele.rows.length - 1;i++) {
				des.push(ele.rows[i].getAttribute("sg_data"));
			}
		},
		get_field_value: function(field) {
			if (field.type == "number") {
				return field.checkValidity() ? Math.max(field.value, field.min) : 0;
			} else {
				return field.value || "";
			}
		},
		download: function(filename, text) {
			var element = document.createElement('a');
			element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
			element.setAttribute('download', filename);
			element.style.display = 'none';
			gm.appendChild(element);
			element.click();
			gm.removeChild(element);
		},
		add_index_string: function(ele, col) { // destination, element, column
			var a = "";
			for (var i = 2; i<ele.rows.length - 1; i++) {
				a += ele.rows[i].getAttribute("sg_data");
				a += ":" + SG.get_field_value(ele.rows[i].cells[col].children[0]);
				a += ";";
			}
			return a;
		},
		create_save: function(to_console) {
			var save_file = {};
			save_file.version = 0;
			save_file.unlocked = [];
			save_file.discovered = [];
			save_file.upgradeString = "";
			save_file.foundCount = "";
			save_file.killCount = "";
			save_file.autoSaveData = {};
			save_file.autoSaveData.statusEffects = [];
			save_file.autoSaveData.familiarXP = [];
			save_file.autoSaveData.dropHistory = [];
			save_file.autoSaveData.killHistory = [];
			save_file.autoSaveData.pickupHistory = [];
			SG.add_list_guids(save_file.unlocked, "unlocked_list");
			SG.add_list_guids(save_file.discovered, "discovered_list");
			SG.add_list_guids(save_file.autoSaveData.dropHistory, "dropHistory_list");
			SG.add_list_guids(save_file.autoSaveData.killHistory, "killHistory_list");
			SG.add_list_guids(save_file.autoSaveData.pickupHistory, "pickupHistory_list");
			save_file.peonID = document.getElementById("sg_portrait_male").style.display === "unset" && types.gender[3] || types.gender[5];
			var ele = document.getElementById("statuseffect_list"),
				to_add,
				i;
			for (i=2; i<ele.rows.length - 1;i++) {
				to_add = {
					id: ele.rows[i].getAttribute("sg_data"),
					level: SG.get_field_value(ele.rows[i].cells[2].children[0]),
					duration: SG.get_field_value(ele.rows[i].cells[3].children[0]),
					sticky: ele.rows[i].cells[4].children[0].checked
				};
				save_file.autoSaveData.statusEffects.push(to_add);
			}
			ele = document.getElementById("familiar_list");
			for (i=2; i<ele.rows.length - 1; i++) {
				to_add = {
					id: ele.rows[i].id.substr(9),
					xp: SG.get_field_value(ele.rows[i].cells[2].children[0])
				};
				if (Number(to_add.xp) > 0) {
					save_file.autoSaveData.familiarXP.push(to_add);
				}
			}
			save_file.upgradeString = SG.add_index_string(document.getElementById("upgrade_string"), 1);
			save_file.foundCount = SG.add_index_string(document.getElementById("foundCount_list"), 2);
			save_file.killCount = SG.add_index_string(document.getElementById("killCount_list"), 2);
			for (i=0; types.length; i++) {
				ele = document.getElementById("sg_peasant_" + types[i][1]);
				if (ele) {
					if (types_to_autosave.includes(types[i][1])) {
						save_file.autoSaveData[types[i][1]] = SG.get_field_value(ele.children[0]);
					} else {
						save_file[types[i][1]] = SG.get_field_value(ele.children[0]);
					}
				}
			}
			ele = document.getElementsByClassName("sg_input_field familiar")[0].children[0];
			save_file.familiar = ele.options[ele.selectedIndex].getAttribute("fam_uuid");
			console.log(save_file);
			if (to_console) {
				console.log(JSON.stringify(save_file, null, 2));
			} else {
				SG.download("Save0.json", JSON.stringify(save_file, null, 2));
			}
		},
		change_parts: function(a, b, args) {
			for (var i = 0; i < args.length; i++) {
				var c = document.getElementsByClassName(args[i]);
				for (var j = 0; j < c.length; j++) {
					c[j].style["background-color"] = "#" + portrait[a][b * args.length + i];
				}
			}
		},
		color_changed: function(a) {
			var ele = document.getElementById("color_options_" + a);
			if (!ele || ele.style.background === ele.options[ele.selectedIndex].style.background) {
				return;
			}
			ele.style.background = ele.options[ele.selectedIndex].style.background;
			ele.style.color = ele.options[ele.selectedIndex].style.color;
			if (a === "eyes") {
				SG.change_parts("eyes", ele.selectedIndex, ["eye-color"]);
			} else if (a === "hair") {
				SG.change_parts("hair", ele.selectedIndex, ["hair-dark", "hair", "hair-light"]);
			} else {
				SG.change_parts(a, ele.selectedIndex, [a + "-dark", a + "-light"]);
			}
			if (color_change_sec[a]) {
				var sec_ele = document.getElementById("color_options_" + color_change_sec[a]);
				if (sec_ele) {
					sec_ele.options[ele.selectedIndex].selected = true;
					SG.color_changed(color_change_sec[a]);
				}
			}
			if (color_change_temp.eyes && color_change_temp.skin && color_change_temp.clothes) {
				document.getElementById("sg_peasant_peonColor").children[0].value = portrait.eye_range * color_change_temp.eyes.selectedIndex + portrait.skin_range * color_change_temp.skin.selectedIndex + color_change_temp.clothes.selectedIndex;
			}
		},
		gender_changed: function() {
			var ele = document.getElementById("sg_peasant_gender").children[0];
			document.getElementById("sg_portrait_male").style.display = ele.options[ele.selectedIndex].value === "Male" && "unset" || "none";
			document.getElementById("sg_portrait_female").style.display = ele.options[ele.selectedIndex].value === "Female" && "unset" || "none";
		},
		add_desc: function(ele, target_ele, text) {
			var a = document.createElement("label");
			a.style.display = "table-column";
			a.innerText = text;
			a.setAttribute("for", target_ele);
			ele.appendChild(a);
		},
		add_optionstable: function(a, b) {
			var c = document.createElement("datalist");
			c.id = a;
			gm.appendChild(c);
			for (var i = 0; i < b.length; i++) {
				SG.add_field(b[i], a);
			}
			return c;
		},
		add_item_option: function(data, entry_no) {
			var d = data[entry_no],
				el = document.createElement("option"),
				newcell;
			var guid = d.title["item guid"];
			SG.set_attributes(el, ["sg_datatable", "item_data", "sg_index", entry_no, "sg_search_alt", guid, "value", (d.title.IName || d.title.BName || d.title.FName || d.title.GName) + " - " + guid]);
			/* if (d.title.potionDatas.length > 0) {
				p_options.appendChild(el.cloneNode());
			} */
			if (d.title.statusEffects.length > 0) {
				s_options.appendChild(el.cloneNode());
				SG.set_attributes(s_options.lastChild, ["sg_search_alt", d.title.statusEffects, "value", (d.title.IName || d.title.BName || d.title.FName || d.title.GName) + " - " + d.title.statusEffects]);
			}
			if (d.title["item guid"].length > 0 || d.title.equipment.length > 0) {
				o_options.appendChild(el.cloneNode());
			}
			var t = (d.title.type || "").toLowerCase();
			if (t === "potion" || d.title.FName) {
				d_options.appendChild(el.cloneNode());
			}
			if (t === "blessing" || d.title.FName || t === "potion" || t === "relic") {
				u_options.appendChild(el.cloneNode());
				f_options.appendChild(el.cloneNode());
			}
			if (t === "upgrade") {
				f_options.appendChild(el.cloneNode());
			}
			if (d.title.BName) {
				k_options.appendChild(el.cloneNode());
			}
			if (d.title.FName) { // Familiars
				var newrow = document.getElementById("familiar_list").insertRow(-1);
				newrow.id = "familiar_" + guid;
				newcell = newrow.insertCell(-1);
				newcell.appendChild(document.createElement("img"));
				SG.set_attributes(newcell.lastChild, ["loading", "lazy", "src", img_url + d.title.FName + ".png", "alt", "Image of " + d.title.FName]);
				newcell.className = "sg_image";
				newcell = newrow.insertCell(-1);
				newcell.appendChild(document.createElement("span"));
				newcell.lastChild.innerText = d.title.FName;
				newcell = newrow.insertCell(-1);
				newcell.appendChild(document.createElement("input"));
				SG.set_attributes(newcell.lastChild, ["id", "familiar_label_" + entry_no, "type", "number", "min", 0, "max", 800]);
				newcell.className = "sg_input_field";
				SG.add_desc(newcell, "familiar_label_" + entry_no, "Changes the amount of xp for " + d.title.FName);
				var sel_ = document.createElement("option");
				sel_.innerText = d.title.FName;
				sel_.selected = d.title.FName === "Canary";
				SG.set_attributes(sel_, ["value", d.title.FName, "fam_uuid", guid]);
				document.getElementById("familiar_select").appendChild(sel_);
			}
		},
		init: function() {
			var api = new mw.Api();
			if (gm && api) {
				gm.style.display = "unset";
				document.getElementById("generator_placeholder").style.display = "none";
				var i,
					info = document.getElementById("peasant_info"),
					colors = document.getElementById("peasant_colors"),
					rows = info.rows,
					ele,
					ele2,
					j,
					target,
					label;
				d_options=SG.add_optionstable("data_dropHistory", ["dropHistory_list"]);
				f_options=SG.add_optionstable("data_foundCount", ["foundCount_list"]);
				k_options=SG.add_optionstable("data_killHistory", ["killHistory_list", "killCount_list"]);
				o_options=SG.add_optionstable("data_other", ["discovered_list", "pickupHistory_list"]);
				s_options=SG.add_optionstable("data_effect", ["statuseffect_list"]);
				u_options=SG.add_optionstable("data_unlocked", ["unlocked_list"]);
				api.get(Object.assign(params_items, params_base)).done(function (d) {
					var item_data = d.cargoquery,
						fsel = document.createElement("select");
					console.log("Item Data:");
					console.log(item_data);
					datas.item_data = item_data;
					fsel.id = "familiar_select";
					var sel__ = document.getElementsByClassName("sg_input_field familiar")[0];
					sel__.replaceChild(fsel, sel__.children[0]);
					for (i = 0; i < item_data.length; i++) {
						SG.add_item_option(item_data, i);
					}
				}).fail(function(a, b, c) {
					console.log("Loading of Items failed! Reason: " + (b || "") + " Error: " + (c || ""));
				});
		
				for (i = 1; i < rows.length; i++) {
						target = rows[i].cells[1];
						label = rows[i].cells[0].innerText.toLowerCase();
						target.id = "sg_peasant_" + (types[label] && types[label][1] || "unknown" + i);
					if ((types[label] && types[label][0] || "") === "text") {
						ele = document.createElement("input");
						SG.set_attributes(ele, ["type", "text", "id", "peasant_label_" + i]);
						target.className = "sg_input_field";
						target.appendChild(ele);
						SG.add_desc(target, "peasant_label_" + i, "Changes the value for " + label);
					} else if ((types[label] && types[label][0] || "") === "label") {
						ele = document.createElement("input");
						SG.set_attributes(ele, ["type", "text", "readonly", "", "id", "peasant_label_" + i]);
						target.className = "sg_input_field";
						target.appendChild(ele);
						SG.add_desc(target, "peasant_label_" + i, "Changes the value for " + label);
					} else if ((types[label] && types[label][0] || "") === "number") {
						ele = document.createElement("input");
						SG.set_attributes(ele, ["id", "peasant_label_" + i, "type", "number", "min", types[label][2], "max", types[label][3]]);
						target.className = "sg_input_field";
						target.appendChild(ele);
						SG.add_desc(target, "peasant_label_" + i, "Changes the value for " + label);
					} else if ((types[label] && types[label][0] || "") === "select") {
						ele = document.createElement("select");
						for (j = 2; j < types[label].length; j += 2) {
							ele2 = document.createElement("option");
							ele2.innerText = types[label][j];
							ele2.setAttribute("uuid", types[label][j + 1]);
							ele.appendChild(ele2);
						}
						target.className = "sg_input_field";
						target.appendChild(ele);
						if (label === "gender") {
							ele.setAttribute("onchange", "window.SG.gender_changed()");
						}
					} else if ((types[label] && types[label][0] || "") === "loading") {
						ele = document.createElement("span");
						ele.setAttribute("type", "text");
						ele.innerText = "Loading..";
						target.className = "sg_input_field " + label;
						target.appendChild(ele);
					}
				}
				rows = colors.rows;
				for (i = 1; i < rows.length; i++) {
						target = rows[i].cells[1];
						label = rows[i].cells[0].innerText.toLowerCase();
						target.id="sg_peasant_" + label;
					if (portrait[label]) {
						ele = document.createElement("select");
						for (j = 0; j < portrait[label].length; j += (label === "eyes" && 1 || label === "hair" && 3 || 2)) {
							ele2 = document.createElement("option");
							ele2.style.background = "#" + portrait[label][j];
							ele2.style.color = "#" + portrait[label][j];
							ele2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
							ele.appendChild(ele2);
						}
						ele.id = "color_options_" + label;
						target.className = "sg_input_field";
						target.appendChild(ele);
					}
					SG.color_changed(label);
					ele.setAttribute("onchange", "window.SG.color_changed('" + label + "')");
				}
				api.get(Object.assign(params_upgrades, params_base)).done(function (d) {
					datas.upgrade_data = d.cargoquery;
					SG.create_upgrade_string_options();
					SG.add_field("upgrade_string", "upgrade_string_options");
				}).fail(function(a,b,c) {
					console.log("Loading of Upgrades failed! Reason: " + (b || "") + " Error: " + (c || ""));
				});
				var controls = document.getElementById("controls");
				console.log("Controls:");
				console.log(controls);
				SG.create_load();
				var cbtn = document.getElementById("sg_clear");
				cbtn.setAttribute("onclick", "window.SG.clear_all()");
				SG.clear_all();
				// Save
				document.getElementById("sg_save").setAttribute("onclick","window.SG.create_save()");
				document.getElementById("sg_console").setAttribute("onclick","window.SG.create_save(true)");
			}
		}
	};
	console.log(SG);
	window.SG = SG;
	$(SG.init);
})( this.jQuery, this.mediaWiki );