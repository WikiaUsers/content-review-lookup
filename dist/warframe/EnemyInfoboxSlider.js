/* jshint maxerr: 1000 */
$(".type-enemyBox").each(
	function(count, enemyVar) {
		var slider = $(enemyVar).find("#slider_div")[0];

		if(slider === null) {
			return;
		}

		var ehp_input_id = "ehp_input_" + count;
		var ehp_slider_id = "ehp_slider_" + count;
		var reset_id = "reset_" + count;

		slider.enemyVarInfoboxScaler = {};
		var scaler = slider.enemyVarInfoboxScaler;

		scaler.init = function() {
			this.health_v    = parseInt($(enemyVar).find("#health")[0].innerHTML);
			this.shield_v    = parseInt($(enemyVar).find("#shield")[0].innerHTML);
			this.armor_v     = parseInt($(enemyVar).find("#armor")[0].innerHTML);
			this.overguard_v = parseInt($(enemyVar).find("#overguard")[0].innerHTML);

			this.health_f1_coef    = parseFloat($(enemyVar).find("#health_f1_coef")[0].innerHTML);
			this.shield_f1_coef    = parseFloat($(enemyVar).find("#shield_f1_coef")[0].innerHTML);
			this.armor_f1_coef     = parseFloat($(enemyVar).find("#armor_f1_coef")[0].innerHTML);
			this.overguard_f1_coef = parseFloat($(enemyVar).find("#overguard_f1_coef")[0].innerHTML);

			this.health_f2_coef    = parseFloat($(enemyVar).find("#health_f2_coef")[0].innerHTML);
			this.shield_f2_coef    = parseFloat($(enemyVar).find("#shield_f2_coef")[0].innerHTML);
			this.armor_f2_coef     = parseFloat($(enemyVar).find("#armor_f2_coef")[0].innerHTML);
			this.overguard_f2_coef = parseFloat($(enemyVar).find("#overguard_f2_coef")[0].innerHTML);

			this.health_f1_expo    = parseFloat($(enemyVar).find("#health_f1_expo")[0].innerHTML);
			this.shield_f1_expo    = parseFloat($(enemyVar).find("#shield_f1_expo")[0].innerHTML);
			this.armor_f1_expo     = parseFloat($(enemyVar).find("#armor_f1_expo")[0].innerHTML);
			this.overguard_f1_expo = parseFloat($(enemyVar).find("#overguard_f1_expo")[0].innerHTML);

			this.health_f2_expo    = parseFloat($(enemyVar).find("#health_f2_expo")[0].innerHTML);
			this.shield_f2_expo    = parseFloat($(enemyVar).find("#shield_f2_expo")[0].innerHTML);
			this.armor_f2_expo     = parseFloat($(enemyVar).find("#armor_f2_expo")[0].innerHTML);
			this.overguard_f2_expo = parseFloat($(enemyVar).find("#overguard_f2_expo")[0].innerHTML);

			this.affinity_v  = parseInt($(enemyVar).find("#affinity")[0].innerHTML);
			this.base_lvl_v  = parseInt($(enemyVar).find("#base_level")[0].innerHTML);
			this.spawn_lvl_v = parseInt($(enemyVar).find("#spawn_level")[0].innerHTML);

			if (this.spawn_lvl_v === 0) { this.spawn_lvl_v = this.base_lvl_v; }
		};

		scaler.trans = function(start, end, curr_lvl) {
			if (curr_lvl - this.base_lvl_v < start) { return 0; }
			if (curr_lvl - this.base_lvl_v > end)   { return 1; }

			var T = (curr_lvl - this.base_lvl_v - start) / (end - start);
			return 3*Math.pow(T, 2) - 2*Math.pow(T, 3);
		};

		scaler.update = function() {
			var curr_lvl = $("#" + ehp_input_id)[0].value;

			if(curr_lvl < this.base_lvl_v) {
				return;
			}

			var trans = this.trans(70, 80, curr_lvl);

			var health_f1 = this.health_f1_coef * Math.pow(curr_lvl - this.base_lvl_v, this.health_f1_expo);
			var health_f2 = this.health_f2_coef * Math.pow(curr_lvl - this.base_lvl_v, this.health_f2_expo);
			var health_multi = 1 + health_f1 + (health_f2 - health_f1) * trans;
			var health = Math.round(this.health_v * health_multi * 100) / 100;

			var shield_f1 = this.shield_f1_coef * Math.pow(curr_lvl - this.base_lvl_v, this.shield_f1_expo);
			var shield_f2 = this.shield_f2_coef * Math.pow(curr_lvl - this.base_lvl_v, this.shield_f2_expo);
			var shield_multi = 1 + shield_f1 + (shield_f2 - shield_f1) * trans;
			var shield = Math.round(this.shield_v * shield_multi * 100) / 100;

			var armor_f1 = this.armor_f1_coef * Math.pow(curr_lvl - this.base_lvl_v, this.armor_f1_expo);
			var armor_f2 = this.armor_f2_coef * Math.pow(curr_lvl - this.base_lvl_v, this.armor_f2_expo);
			var armor_multi = 1 + armor_f1 + (armor_f2 - armor_f1) * trans;
			var armor = Math.min(Math.round(this.armor_v * armor_multi * 100) / 100, 2700);
			var armor_redux = Math.round(Math.sqrt(3 * armor) * 100) / 10000;

			var overguard_f1 = this.overguard_f1_coef * Math.pow(curr_lvl - this.base_lvl_v, this.overguard_f1_expo);
			var overguard_f2 = this.overguard_f2_coef * Math.pow(curr_lvl - this.base_lvl_v, this.overguard_f2_expo);
			var overguard_multi = 1 + overguard_f1 + (overguard_f2 - overguard_f1) * this.trans(45, 50, curr_lvl);
			var overguard = Math.round(this.overguard_v * overguard_multi * 100) / 100;

			var affinity = Math.floor(this.affinity_v * (1 + Math.sqrt(curr_lvl) * 0.1425));

			var ehp = Math.round((health / (1 - armor_redux) + shield + overguard) * 100) / 100;

			$(enemyVar).find("#health")[0].innerHTML       = health.toLocaleString();
			$(enemyVar).find("#shield")[0].innerHTML       = shield.toLocaleString();
			$(enemyVar).find("#armor")[0].innerHTML        = armor.toLocaleString();
			$(enemyVar).find("#damage_redux")[0].innerHTML = (100 * armor_redux).toLocaleString();
			$(enemyVar).find("#overguard")[0].innerHTML    = overguard.toLocaleString();
			$(enemyVar).find("#affinity")[0].innerHTML     = affinity.toLocaleString();

			if (curr_lvl < this.spawn_lvl_v) {
				$(enemyVar).find("#out_ehp")[0].innerHTML = "&ndash;&ndash;";
			} else {
				$(enemyVar).find("#out_ehp")[0].innerHTML = ehp.toLocaleString();
			}

			if (curr_lvl < 100 + this.spawn_lvl_v) {
				$(enemyVar).find("#out_sp_ehp")[0].innerHTML = "&ndash;&ndash;";
			} else {
				$(enemyVar).find("#out_sp_ehp")[0].innerHTML = (2.5 * ehp).toLocaleString();
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
			slider.innerHTML = "<div>" + scaler.base_lvl_v + "</div><div><input type='range' min='" + scaler.base_lvl_v + "' max='" + $(enemyVar).find("#slider_max")[0].innerHTML + "' value='" + scaler.spawn_lvl_v + "' id='" + ehp_slider_id + "' style='width:" + slider_width + "%;' oninput='ehp_input.value = ehp_slider.value; slider_div.enemyVarInfoboxScaler.update();'/></div><div>" + $(enemyVar).find("#slider_max")[0].innerHTML + "</div>";
		} else {
			slider.innerHTML = "<div>" + scaler.base_lvl_v + "</div><div><input type='range' min='" + scaler.base_lvl_v + "' max='" + $(enemyVar).find("#slider_max")[0].innerHTML + "' value='" + scaler.spawn_lvl_v + "' id='" + ehp_slider_id + "' style='width:" + slider_width + "%;' /></div><div>" + $(enemyVar).find("#slider_max")[0].innerHTML + "</div>";
		}

		$(slider).find("#" + ehp_slider_id)[0].oninput = function () {
			$("#" + ehp_input_id)[0].value = $("#" + ehp_slider_id)[0].value;
			slider.enemyVarInfoboxScaler.update();
		};

		$(enemyVar).find("#out_lvl")[0].innerHTML = "<input type='number' min='" + scaler.base_lvl_v + "' max='10000' value='" + scaler.spawn_lvl_v + "' id='" + ehp_input_id + "' style='max-width:70%'/>";
		$($(enemyVar).find("#out_lvl")[0]).find("#" + ehp_input_id)[0].oninput = function () {
			$("#" + ehp_slider_id)[0].value = $("#" + ehp_input_id)[0].value;
			slider.enemyVarInfoboxScaler.update();
		};

		$(enemyVar).find("#reset_btn")[0].innerHTML = "<button id='" + reset_id + "' type='button' onclick='ehp_slider.value = " + scaler.spawn_lvl_v + "; ehp_input.value = " + scaler.spawn_lvl_v + "; slider_div.enemyVarInfoboxScaler.update();' style='float:right;'>Reset</button>";
		$($(enemyVar).find("#reset_btn")[0]).find("#" + reset_id)[0].onclick = function () {
			$("#" + ehp_slider_id)[0].value = scaler.spawn_lvl_v ;
			$("#" + ehp_input_id)[0].value  = scaler.spawn_lvl_v ;
			slider.enemyVarInfoboxScaler.update();
		};

		scaler.update();
	}
);