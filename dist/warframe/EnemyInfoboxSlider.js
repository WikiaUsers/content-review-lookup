/* jshint maxerr: 1000 */
$(".type-enemyBox").each(
	function(count, enemyVar) {
		var slider = $(enemyVar).find("#slider_div")[0];
		if(slider !== null){
			var ehp_input_id = "ehp_input_" + count;
			var ehp_slider_id = "ehp_slider_" + count;
			var reset_id = "reset_" + count;

			slider.enemyVarInfoboxScaler = {};
			var scaler = slider.enemyVarInfoboxScaler;

			scaler.init = function() {
				if (shield !== null) { this.shield_v = parseInt($(enemyVar).find("#shield")[0].innerHTML, 10); } else { this.shield_v = 0; }
				if (health !== null) { this.health_v = parseInt($(enemyVar).find("#health")[0].innerHTML, 10); } else { this.health_v = 0; }
				if (armor !== null)  { this.armor_v  = parseInt($(enemyVar).find("#armor")[0].innerHTML, 10);  } else { this.armor_v  = 0; }

				if (affinity !== null)	 { this.affinity_v	= parseInt($(enemyVar).find("#affinity")[0].innerHTML, 10);   } else { this.affinity_v	= 0; }
				if (baselevel !== null)	 { this.base_lvl_v	= parseInt($(enemyVar).find("#baselevel")[0].innerHTML, 10);  } else { this.base_lvl_v	= 0; }
				if (spawnlevel !== null) { this.spawn_lvl_v = parseInt($(enemyVar).find("#spawnlevel")[0].innerHTML, 10); } else { this.spawn_lvl_v = 0; }

				if (this.spawn_lvl_v === 0) {
					this.spawn_lvl_v = this.base_lvl_v;
				}
			};

			scaler.trans = function(start, end, curr_lvl) {
				if (curr_lvl - this.base_lvl_v < start) { return 0; }
				if (curr_lvl - this.base_lvl_v > end) { return 1; }

				var T = (curr_lvl - this.base_lvl_v - start) / (end - start);
				return 3*Math.pow(T, 2) - 2*Math.pow(T, 3);
			};

			scaler.update = function() {
				if((curr_lvl = $("#" + ehp_input_id)[0].value) >= this.base_lvl_v) {
					var old_shield = 1 + 0.020*Math.pow(curr_lvl - this.base_lvl_v, 1.75);
					var old_health = 1 + 0.015*Math.pow(curr_lvl - this.base_lvl_v, 2);
					var old_armor  = 1 + 0.005*Math.pow(curr_lvl - this.base_lvl_v, 1.75);

					var new_shield = 1 + 1.60*Math.pow(curr_lvl - this.base_lvl_v, 0.75);
					var new_health = 1 + 24.0*Math.sqrt(curr_lvl - this.base_lvl_v)*Math.sqrt(5)/5;
					var new_armor  = 1 + 0.40*Math.pow(curr_lvl - this.base_lvl_v, 0.75);

					shield_multi = old_shield*(1 - this.trans(70, 80, curr_lvl)) + new_shield*this.trans(70, 80, curr_lvl);
					health_multi = old_health*(1 - this.trans(70, 80, curr_lvl)) + new_health*this.trans(70, 80, curr_lvl);
					armor_multi  = old_armor*(1 - this.trans(70, 80, curr_lvl)) + new_armor*this.trans(70, 80, curr_lvl);

					$(enemyVar).find("#shield")[0].innerHTML	   = (Math.round(this.shield_v * shield_multi * 100) / 100).toLocaleString();
					$(enemyVar).find("#health")[0].innerHTML	   = (Math.round(this.health_v * health_multi * 100) / 100).toLocaleString();
					$(enemyVar).find("#armor")[0].innerHTML		   = (Math.round(this.armor_v * armor_multi * 100) / 100).toLocaleString();
					$(enemyVar).find("#damage_redux")[0].innerHTML = ((Math.round((1 - 300 / (this.armor_v * armor_multi + 300)) * 10000) / 10000) * 100).toLocaleString();

					$(enemyVar).find("#out_ehp")[0].innerHTML = (Math.round((this.health_v * health_multi * (1 + this.armor_v * armor_multi / 300) + this.shield_v * shield_multi)* 100) / 100).toLocaleString();

					$(enemyVar).find("#affinity")[0].innerHTML = (Math.floor(this.affinity_v * (1 + Math.sqrt(curr_lvl) * 0.1425))).toLocaleString();
				}
			};

			scaler.init();

			var slider_width = 91;
			if (scaler.base_lvl_v > 99) {
				slider_width = 86;
			} else if (scaler.base_lvl_v > 9) {
				slider_width = 88;
			}

			if (navigator.userAgent.indexOf("Firefox") != -1) {
				slider.innerHTML = "<input type='range' min='" + scaler.base_lvl_v + "' max='" + $(enemyVar).find("#slider_max")[0].innerHTML + "' value='" + scaler.spawn_lvl_v + "' id=" + ehp_slider_id + " style='height:3px; background:#3a3a3a; position:absolute; right:18px; -moz-appearance:none; width:" + slider_width + "%;' oninput='ehp_input.value = ehp_slider.value; slider_div.enemyVarInfoboxScaler.update();'/><div style='position:absolute; margin-top:-6px; left:-8px; font-size:11px; white-space:nowrap;'>" + scaler.base_lvl_v + "</div><div style='position: absolute;margin-top: -6px;left:234px;font-size:11px;white-space:nowrap;'>" + $(enemyVar).find("#slider_max")[0].innerHTML + "</div>";
			} else if ((navigator.userAgent.indexOf("MSIE") != -1) || (document.documentMode !== undefined)) {
				slider.innerHTML = "<input type='range' min='" + scaler.base_lvl_v + "' max='" + $(enemyVar).find("#slider_max")[0].innerHTML + "' value='" + scaler.spawn_lvl_v + "' id=" + ehp_slider_id + " style='background:transparent; position:absolute; right:20px; top:-17px; -ms-appearance:none; width:" + slider_width + "%; height:6px;' onchange='ehp_input.value = ehp_slider.value; slider_div.enemyVarInfoboxScaler.update();'/><div style='position:absolute; margin-top:-6px; left:-8px; font-size:11px; white-space:nowrap;'>" + scaler.base_lvl_v + "</div><div style='position:absolute; margin-top:-6px; left:234px; font-size:11px; white-space:nowrap;'>" + $(enemyVar).find("#slider_max")[0].innerHTML + "</div>";
			} else {
				slider.innerHTML = "<input type='range' min='" + scaler.base_lvl_v + "' max='" + $(enemyVar).find("#slider_max")[0].innerHTML + "' value='" + scaler.spawn_lvl_v + "' id=" + ehp_slider_id + " style='height:3px; background:#3a3a3a; position:absolute; right:18px; -webkit-appearance:none; width:" + slider_width + "%;' />	<div style='position:absolute; margin-top:-6px; left:-8px; font-size:11px; white-space:nowrap;'>" + scaler.base_lvl_v + "</div><div style='position:absolute; margin-top:-6px; left:234px; font-size:11px; white-space:nowrap;'>" + $(enemyVar).find("#slider_max")[0].innerHTML + "</div>";
			}
			$(slider).find("#" + ehp_slider_id)[0].oninput = function () {
				$("#" + ehp_input_id)[0].value = $("#" + ehp_slider_id)[0].value;
				slider.enemyVarInfoboxScaler.update();
			};

			$(enemyVar).find("#out_lvl")[0].innerHTML = "<input type='number' min='" + scaler.base_lvl_v + "' max='9999' value='" + scaler.spawn_lvl_v + "' id=" + ehp_input_id + "  style='width:50px; height:18px;'/>";
			$($(enemyVar).find("#out_lvl")[0]).find("#" + ehp_input_id)[0].oninput = function () {
				$("#" + ehp_slider_id)[0].value = $("#" + ehp_input_id)[0].value;
				slider.enemyVarInfoboxScaler.update();
			};

			$(enemyVar).find("#reset_btn")[0].innerHTML = "<button id=" + reset_id + " type='button' onclick='ehp_slider.value = " + scaler.spawn_lvl_v + "; ehp_input.value = " + scaler.spawn_lvl_v + "; slider_div.enemyVarInfoboxScaler.update();' style='height:20px; padding:0 5px 0 5px; float:right;'>Reset</button>";
			$($(enemyVar).find("#reset_btn")[0]).find("#" + reset_id)[0].onclick = function () {
				$("#" + ehp_slider_id)[0].value = scaler.spawn_lvl_v ;
				$("#" + ehp_input_id)[0].value  = scaler.spawn_lvl_v ;
				slider.enemyVarInfoboxScaler.update();
			};

			scaler.update();
		}
	}
);