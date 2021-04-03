if ($('#slider_div').length) {

	slider_div.enemyinfoboxscaler = {};
	var scaler = slider_div.enemyinfoboxscaler;

	scaler.init = function () {
		//Sum types de santes
		this.flesh_v = 0;
		if (document.getElementById("flesh") != null) {
			this.flesh_v = parseInt(flesh.innerHTML, 10);
		}
		this.clonedflesh_v = 0;
		if (document.getElementById("clonedFlesh") != null) {
			this.clonedflesh_v = parseInt(clonedFlesh.innerHTML, 10);
		}
		this.infestedflesh_v = 0;
		if (document.getElementById("infestedFlesh") != null) {
			this.infestedflesh_v = parseInt(infestedFlesh.innerHTML, 10);
		}
		this.infested_v = 0;
		if (document.getElementById("infested") != null) {
			this.infested_v = parseInt(infested.innerHTML, 10);
		}
		this.fossilized_v = 0;
		if (document.getElementById("fossilized") != null) {
			this.fossilized_v = parseInt(fossilized.innerHTML, 10);
		}
		this.machinery_v = 0;
		if (document.getElementById("machinery") != null) {
			this.machinery_v = parseInt(machinery.innerHTML, 10);
		}
		this.robotic_v = 0;
		if (document.getElementById("robotic") != null) {
			this.robotic_v = parseInt(robotic.innerHTML, 10);
		}
		this.health_v = this.flesh_v + this.clonedflesh_v + this.infestedflesh_v + this.infested_v + this.fossilized_v + this.machinery_v + this.robotic_v;
		//Sum types d'armures
		this.ferritearmor_v = 0;
		if (document.getElementById("ferriteArmor") != null) {
			this.ferritearmor_v = parseInt(ferriteArmor.innerHTML, 10);
		}
		this.alloyarmor_v = 0;
		if (document.getElementById("alloyArmor") != null) {
			this.alloyarmor_v = parseInt(alloyArmor.innerHTML, 10);
		}
		this.sinewarmor_v = 0;
		if (document.getElementById("infestedSinew") != null) {
			this.sinewarmor_v = parseInt(infestedSinew.innerHTML, 10);
		}
		this.armor_v = this.ferritearmor_v + this.alloyarmor_v + this.sinewarmor_v;
		//Sum types boucliers
		this.protoshield_v = 0;
		if (document.getElementById("shield") != null) {
			this.shieldx_v = parseInt(shield.innerHTML, 10);
		}
		this.protoshield_v = 0;
		if (document.getElementById("protoshield") != null) {
			this.protoshield_v = parseInt(protoshield.innerHTML, 10);
		}
		this.shield_v = this.shieldx_v + this.protoshield_v;
		//Stats
		this.affinity_v = 0;
		if (document.getElementById("affinity") != null) {
			this.affinity_v = parseInt(affinity.innerHTML, 10);
		}
		this.base_lvl_v = parseInt(baseLevel.innerHTML, 10);
		this.spawn_lvl_v = this.base_lvl_v;
		if (document.getElementById("spawnLevel") != null) {
			this.spawn_lvl_v = parseInt(spawnLevel.innerHTML, 10);
		}
	};

	scaler.trans = function (start, end, curr_lvl) {
		var transition = Math.min(1, (Math.max(curr_lvl, start + this.base_lvl_v) - (start + this.base_lvl_v)) / (end - start));
		return transition;
	};

	scaler.update = function () {
		if ((curr_lvl = ehp_input.value) >= this.base_lvl_v) {
			var old_health = 1 + 0.015 * Math.pow(curr_lvl - this.base_lvl_v, 2);
			var old_shield = 1 + 0.0075 * Math.pow(curr_lvl - this.base_lvl_v, 2);
			var old_armor = 1 + 0.005 * Math.pow(curr_lvl - this.base_lvl_v, 1.75);

			var new_health = 1 + 10.7332 * Math.pow(curr_lvl - this.base_lvl_v, 0.5);
			var new_shield = 1 + 1.6 * Math.pow(curr_lvl - this.base_lvl_v, 0.75);
			var new_armor = 1 + 0.4 * Math.pow(curr_lvl - this.base_lvl_v, 0.75);

			health_multi = 1 + (1 - this.trans(70, 85, curr_lvl)) * (old_health - 1) + this.trans(70, 85, curr_lvl) * (new_health - 1);
			shield_multi = 1 + (1 - this.trans(70, 85, curr_lvl)) * (old_shield - 1) + this.trans(70, 85, curr_lvl) * (new_shield - 1);
			armor_multi = 1 + (1 - this.trans(60, 80, curr_lvl)) * (old_armor - 1) + this.trans(60, 80, curr_lvl) * (new_armor - 1);
			//Update Health types
			if (this.flesh_v > 0) {
				flesh.innerHTML = (Math.round(this.flesh_v * health_multi * 100) / 100).toLocaleString();
			}
			if (this.clonedflesh_v > 0) {
				clonedFlesh.innerHTML = (Math.round(this.clonedflesh_v * health_multi * 100) / 100).toLocaleString();
			}
			if (this.infestedflesh_v > 0) {
				infestedFlesh.innerHTML = (Math.round(this.infestedflesh_v * health_multi * 100) / 100).toLocaleString();
			}
			if (this.infested_v > 0) {
				infested.innerHTML = (Math.round(this.infested_v * health_multi * 100) / 100).toLocaleString();
			}
			if (this.fossilized_v > 0) {
				fossilized.innerHTML = (Math.round(this.fossilized_v * health_multi * 100) / 100).toLocaleString();
			}
			if (this.machinery_v > 0) {
				machinery.innerHTML = (Math.round(this.machinery_v * health_multi * 100) / 100).toLocaleString();
			}
			if (this.robotic_v > 0) {
				robotic.innerHTML = (Math.round(this.robotic_v * health_multi * 100) / 100).toLocaleString();
			}
			//Update Armor Types
			if (this.ferritearmor_v > 0) {
				ferriteArmor.innerHTML = (Math.round(this.ferritearmor_v * armor_multi * 100) / 100).toLocaleString();
			}
			if (this.alloyarmor_v > 0) {
				alloyArmor.innerHTML = (Math.round(this.alloyarmor_v * armor_multi * 100) / 100).toLocaleString();
			}
			if (this.sinewarmor_v > 0) {
				infestedSinew.innerHTML = (Math.round(this.sinewarmor_v * armor_multi * 100) / 100).toLocaleString();
			}

			if (this.ferritearmor_v > 0 || this.alloyarmor_v > 0 || this.sinewarmor_v > 0) {
				damage_redux.innerHTML = ((Math.round((1 - 300 / (this.armor_v * armor_multi + 300)) * 10000) / 10000) * 100).toLocaleString();
			}
			//Update Shield Types
			if (this.shieldx_v > 0) {
				shield.innerHTML = (Math.round(this.shieldx_v * shield_multi * 100) / 100).toLocaleString();
			}
			if (this.protoshield_v > 0) {
				protoshield.innerHTML = (Math.round(this.protoshield_v * shield_multi * 100) / 100).toLocaleString();
			}

			out_ehp.innerHTML = (Math.round((this.health_v * health_multi * (1 + this.armor_v * armor_multi / 300) + this.shield_v * shield_multi) * 100) / 100).toLocaleString();
			if (this.affinity_v > 0) {
				affinity.innerHTML = (Math.round(this.affinity_v * (1 + Math.pow(curr_lvl, 0.5) * 0.1425) * 100) / 100).toLocaleString();
			}
		}
	};

	scaler.init();

	if (scaler.base_lvl_v > 9) {
		var slider_width = 89;
	} else {
		var slider_width = 92;
	}

	if (navigator.userAgent.indexOf("Firefox") != -1) {
		slider_div.innerHTML = "<input type='range' min='" + scaler.base_lvl_v + "' max='" + slider_max.innerHTML + "' value='" + scaler.spawn_lvl_v + "' id='ehp_slider' style='height:3px; background:#3a3a3a; position:absolute; right:18px; -moz-appearance:none; width:" + slider_width + "%;' oninput='ehp_input.value = ehp_slider.value; slider_div.enemyinfoboxscaler.update();'/><div style='position:absolute; margin-top:-6px; left:-8px; font-size:11px; white-space:nowrap;'>" + scaler.base_lvl_v + "</div><div style='position: absolute;margin-top: -6px;left:234px;font-size:11px;white-space:nowrap;'>" + slider_max.innerHTML + "</div>";
	} else if ((navigator.userAgent.indexOf("MSIE") != -1) || (document.documentMode !== undefined)) {
		slider_div.innerHTML = "<input type='range' min='" + scaler.base_lvl_v + "' max='" + slider_max.innerHTML + "' value='" + scaler.spawn_lvl_v + "' id='ehp_slider' style='background:transparent; position:absolute; right:20px; top:-17px; -ms-appearance:none; width:" + slider_width + "%; height:6px;' onchange='ehp_input.value = ehp_slider.value; slider_div.enemyinfoboxscaler.update();'/><div style='position:absolute; margin-top:-6px; left:-8px; font-size:11px; white-space:nowrap;'>" + scaler.base_lvl_v + "</div><div style='position:absolute; margin-top:-6px; left:234px; font-size:11px; white-space:nowrap;'>" + slider_max.innerHTML + "</div>";
	} else {
		slider_div.innerHTML = "<input type='range' min='" + scaler.base_lvl_v + "' max='" + slider_max.innerHTML + "' value='" + scaler.spawn_lvl_v + "' id='ehp_slider' style='height:3px; background:#3a3a3a; position:absolute; right:18px; -webkit-appearance:none; width:" + slider_width + "%;' oninput='ehp_input.value = ehp_slider.value; slider_div.enemyinfoboxscaler.update();'/><div style='position:absolute; margin-top:-6px; left:-8px; font-size:11px; white-space:nowrap;'>" + scaler.base_lvl_v + "</div><div style='position:absolute; margin-top:-6px; left:234px; font-size:11px; white-space:nowrap;'>" + slider_max.innerHTML + "</div>";
	}

	out_lvl.innerHTML = "<input type='number' min='" + scaler.base_lvl_v + "' max='9999' value='" + scaler.spawn_lvl_v + "' id='ehp_input' oninput='ehp_slider.value = ehp_input.value; slider_div.enemyinfoboxscaler.update();' style='width:50px; height:18px;'/>";

	reset_btn.innerHTML = "<button type='button' onclick='ehp_slider.value = " + scaler.spawn_lvl_v + "; ehp_input.value = " + scaler.spawn_lvl_v + "; slider_div.enemyinfoboxscaler.update();' style='height:20px; padding:0 5px 0 5px; float:right;'>Reset</button>";

	scaler.update();
}