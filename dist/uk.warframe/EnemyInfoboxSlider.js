/* jshint maxerr: 1000 */
/* jshint multistr: true */
$(".type-enemyBox").each(
	function(count, enemyVar) {
		var slider = $(enemyVar).find("#slider_div")[0];
		if(slider == null) return;

		var ehp_input_id = "ehp_input_" + count;
		var ehp_slider_id = "ehp_slider_" + count;
		var reset_id = "reset_" + count;
		var enemy_steelpath_id = "sp_" + count;
		var enemy_eximus_id = "eximus_" + count;

		slider.enemyVarInfoboxScaler = {};
		var scaler = slider.enemyVarInfoboxScaler;

		scaler.init = function() {
			this.faction = $(enemyVar).find(".pi-item[data-source=Faction]").find(".pi-data-value").text() || "Не визначено";
			this.overguard_v = 0;
			if (shield !== null) { this.shield_v = parseInt($(enemyVar).find("#shield")[0].innerHTML, 10); } else { this.shield_v = 0; }
			if (health !== null) { this.health_v = parseInt($(enemyVar).find("#health")[0].innerHTML, 10); } else { this.health_v = 0; }
			if (armor !== null)  { this.armor_v  = parseInt($(enemyVar).find("#armor")[0].innerHTML, 10);  } else { this.armor_v  = 0; }
			this.shield_v_original = this.shield_v;
			this.health_v_original = this.health_v;

			if (affinity !== null)	 { this.affinity_v	= parseInt($(enemyVar).find("#affinity")[0].innerHTML, 10);   } else { this.affinity_v	= 0; }
			if (base_level !== null)	 { this.base_lvl_v	= parseInt($(enemyVar).find("#base_level")[0].innerHTML, 10);  } else { this.base_lvl_v	= 0; }
			if (spawn_level !== null) { this.spawn_lvl_v = parseInt($(enemyVar).find("#spawn_level")[0].innerHTML, 10); } else { this.spawn_lvl_v = 0; }

			if (this.spawn_lvl_v === 0) this.spawn_lvl_v = this.base_lvl_v;
			
			$(enemyVar).find(".pi-item[data-source=EHP]").after(
				'<div class="pi-item pi-data pi-item-spacing pi-border-color"><div class="pi-data-value pi-font">\
				<div style="text-align: center;">\
				<input type="checkbox" name="sp" id="'+ enemy_steelpath_id +'"></input>\
				<label for="'+ enemy_steelpath_id +'">Шлях сталі</label>\
				<input type="checkbox" name="eximus" id="'+ enemy_eximus_id+'"></input>\
				<label for="'+ enemy_eximus_id +'">Ексім</label>\
				</div></div>'
			);
		};

		scaler.trans = function(start, end, curr_lvl) {
			if (curr_lvl - this.base_lvl_v < start) { return 0; }
			if (curr_lvl - this.base_lvl_v > end) { return 1; }

			var T = (curr_lvl - this.base_lvl_v - start) / (end - start);
			return 3*Math.pow(T, 2) - 2*Math.pow(T, 3);
		};

		scaler.overguard = function(a, b, c) {
			if (c - this.base_lvl_v < a)
			    return 0;
			if (c - this.base_lvl_v > b)
			    return 1;
			c = (c - a) / (b - a);
			return 3 * Math.pow((c - this.base_lvl_v - 45) / 5, 2) - 2 * Math.pow((c - this.base_lvl_v - 45) / 5, 3);
		};

		scaler.update = function() {
			var curr_lvl = $("#" + ehp_input_id)[0].value;
			if (curr_lvl < this.base_lvl_v) return;

			var isExim = $(enemyVar).find("#" + enemy_eximus_id)[0].checked;
			var isSP = $(enemyVar).find("#" + enemy_steelpath_id)[0].checked;

			var old_shield = 1 + 0.020*Math.pow(curr_lvl - this.base_lvl_v, 1.75);
			var old_health = 1 + 0.015*Math.pow(curr_lvl - this.base_lvl_v, 2);
			var old_armor  = 1 + 0.005*Math.pow(curr_lvl - this.base_lvl_v, 1.75);

			var new_shield = 1 + 1.6 * Math.pow(curr_lvl - this.base_lvl_v, 0.75);
			var new_health = 1 + 24.0*Math.sqrt(curr_lvl - this.base_lvl_v)*Math.sqrt(5)/5;
			var new_armor  = 1 + 0.40*Math.pow(curr_lvl - this.base_lvl_v, 0.75);

			switch (this.faction) {
				case "Ґрінери":
					old_health = 1 + 0.015 * Math.pow(curr_lvl - this.base_lvl_v, 2.12);
					new_health = 1 + 24 * Math.pow(curr_lvl - this.base_lvl_v, 0.72) * Math.sqrt(5) / 5;
					break;
				case "Корпус":
					old_health = 1 + 0.015 * Math.pow(curr_lvl - this.base_lvl_v, 2.12);
					new_health = 1 + 30 * Math.pow(curr_lvl - this.base_lvl_v, 0.55) * Math.sqrt(5) / 5;
					old_shield = 1 + 0.02 * Math.pow(curr_lvl - this.base_lvl_v, 1.76);
					new_shield = 1 + 2 * Math.pow(curr_lvl - this.base_lvl_v, 0.76);
					break;
				case "Заражені":
					old_health = 1 + 0.0225 * Math.pow(curr_lvl - this.base_lvl_v, 2.12);
					new_health = 1 + 36 * Math.pow(curr_lvl - this.base_lvl_v, 0.72) * Math.sqrt(5) / 5;
					break;
				case "Орокіни":
					old_health = 1 + 0.015 * Math.pow(curr_lvl - this.base_lvl_v, 2.1);
					new_health = 1 + 24 * Math.pow(curr_lvl - this.base_lvl_v, 0.685) * Math.sqrt(5) / 5;
					old_shield = 1 + 0.02 * Math.pow(curr_lvl - this.base_lvl_v, 1.75);
					new_shield = 1 + 2 * Math.pow(curr_lvl - this.base_lvl_v, 0.75);
			}

			var shield_multi = old_shield*(1 - this.trans(70, 80, curr_lvl)) + new_shield*this.trans(70, 80, curr_lvl);
			var health_multi = old_health*(1 - this.trans(70, 80, curr_lvl)) + new_health*this.trans(70, 80, curr_lvl);
			var armor_multi  = old_armor*(1 - this.trans(70, 80, curr_lvl)) + new_armor*this.trans(70, 80, curr_lvl);
			var overg = 0;

			//множники для ОЗ і ОЩ для шляху сталі
			if (isSP) {
				this.shield_v = 2.5 * this.shield_v_original;
				this.health_v = 2.5 * this.health_v_original;
			} else {
				this.shield_v = this.shield_v_original;
				this.health_v = this.health_v_original;
			}

			if (isExim) {
				// надзахист ексіма
				var old_overg = 1 + 0.0015 * Math.pow(curr_lvl - this.base_lvl_v, 4);
				var new_overg = 1 + 260 * Math.pow(curr_lvl - this.base_lvl_v, 0.9);
				
				if (curr_lvl - this.base_lvl_v < 45) { overg = 12 * old_overg; }
				else if ((curr_lvl - this.base_lvl_v) >= 45 && (curr_lvl - this.base_lvl_v) <= 50) { overg = 12 * new_overg; }
				else {
					overg = scaler.overguard(45, 50, curr_lvl);
					overg = 12 * (old_overg * (1 - overg) + new_overg * overg);
				}

				// захист ексіма
				old_armor = 1 + 0.005 * Math.pow(curr_lvl - this.base_lvl_v, 1.75);
				new_armor = 1 + 0.4 * Math.pow(curr_lvl - this.base_lvl_v, 0.75);
				if (curr_lvl <= 25) armor_multi = old_armor;
				else if (curr_lvl > 25 && curr_lvl <= 35) armor_multi = (1 + 0.0125 * (curr_lvl - 25)) * old_armor;
				else if (curr_lvl > 35 && curr_lvl <= 50) armor_multi = (1.125 + 0.06667 * (curr_lvl - 35)) * old_armor;
				else if (curr_lvl > 50 && curr_lvl <= 100)
					armor_multi = (1.375 + 0.005 * (curr_lvl - 50)) * (old_armor * (1 - this.trans(70, 80, curr_lvl, this.base_lvl_v)) + new_armor * this.trans(70, 80, curr_lvl, this.base_lvl_v));
				else armor_multi = 1.625 * new_armor;
				
				// здоров’я ексіма
				old_health = 1 + 0.015 * Math.pow(curr_lvl - this.base_lvl_v, 2);
				new_health = 1 + 24 * Math.sqrt(5) / 5 * Math.pow(curr_lvl - this.base_lvl_v, 0.5);
				if (curr_lvl <= 15) health_multi = old_health;
				else if (curr_lvl > 15 && curr_lvl <= 25) health_multi = (1 + 0.025 * (curr_lvl - 15)) * old_health;
				else if (curr_lvl > 25 && curr_lvl <= 35) health_multi = (1.25 + 0.125 * (curr_lvl - 25)) * old_health;
				else if (curr_lvl > 35 && curr_lvl <= 50) health_multi = (2.5 + 2 / 15 * (curr_lvl - 35)) * old_health;
				else if (curr_lvl > 50 && curr_lvl <= 100) 
					health_multi = (4.5 + 0.03 * (curr_lvl - 50)) * (old_health * (1 - this.trans(70, 80, curr_lvl, this.base_lvl_v)) + new_health * this.trans(70, 80, curr_lvl, this.base_lvl_v));
				else health_multi = 6 * new_health;

				// щити ексіма
				old_shield = 1 + 0.02 * Math.pow(curr_lvl - this.base_lvl_v, 1.75);
				new_shield = 1 + 2 * Math.pow(curr_lvl - this.base_lvl_v, 0.75);
				if (curr_lvl <= 15) shield_multi = old_shield;
				else if (curr_lvl > 15 && curr_lvl <= 25) shield_multi = (1 + 0.025 * (curr_lvl - 15)) * old_shield;
				else if (curr_lvl > 25 && curr_lvl <= 35) shield_multi = (1.25 + 0.125 * (curr_lvl - 25)) * old_shield;
				else if (curr_lvl > 35 && curr_lvl <= 50) shield_multi = (2.5 + 2 / 15 * (curr_lvl - 35)) * old_shield;
				else if (curr_lvl > 50 && curr_lvl <= 100)
					shield_multi = (4.5 + 0.03 * (curr_lvl - 50)) * (old_shield * (1 - this.trans(70, 80, curr_lvl, this.base_lvl_v)) + new_shield * this.trans(70, 80, curr_lvl, this.base_lvl_v));
				else shield_multi = 6 * new_shield;
				
				if (!$(enemyVar).find(".pi-item[data-source=Overguard]").length) {
					// додає поле з надзахистом перед рядком зменшення шкоди, якщо його нема, то перед рядком з вразливостями/опорами
					var $block = $(enemyVar).find(".pi-item[data-source=DmgReduction]").length ? $(enemyVar).find(".pi-item[data-source=DmgReduction]") : $(enemyVar).find(".pi-item[data-source=Resists]");
					$block.before(
						'<div class="pi-item pi-data pi-item-spacing pi-border-color" data-source="Overguard">\
						<h3 class="pi-data-label pi-secondary-font">Надзахист</h3>\
						<div class="pi-data-value pi-font"><span id="overguard">'+ overg +'</span></div>\
						</div>'
					);
				}
				$(enemyVar).find("#overguard")[0].innerHTML = Math.round((overg * 100) / 100).toLocaleString();
			} else {
				$(enemyVar).find(".pi-item[data-source=Overguard]").remove();
			}

			var affinity = this.affinity_v * (1 + Math.sqrt(curr_lvl) * 0.1425);
			var armor = this.armor_v * armor_multi;
					armor = armor < 2700 ? armor : 2700;
			var shield = this.shield_v * shield_multi;
			var health = this.health_v * health_multi;
			var DR = (1 - 300 / (armor + 300));
			var eHP = this.health_v * health_multi * (1 + armor / 300) + this.shield_v * shield_multi + overg;

			$(enemyVar).find("#shield").text((Math.round((shield * 100)) / 100).toLocaleString());
			$(enemyVar).find("#health").text((Math.round((health * 100)) / 100).toLocaleString());
			$(enemyVar).find("#armor").text((Math.round((armor * 100)) / 100).toLocaleString());
			$(enemyVar).find("#damage_redux").text((Math.round((DR * 10000)) / 100).toLocaleString());

			if (curr_lvl < this.spawn_lvl_v) {
				$(enemyVar).find("#out_ehp").text("&ndash;&ndash;");
			} else {
				$(enemyVar).find("#out_ehp").text((Math.round(eHP* 100) / 100).toLocaleString());
			}

			$(enemyVar).find("#affinity").text((Math.floor(affinity)).toLocaleString());
		};

		scaler.init();

		var slider_width = 91;
		if (scaler.base_lvl_v > 99) slider_width = 86;
		else if (scaler.base_lvl_v > 9) slider_width = 88;

		if (navigator.userAgent.indexOf("Firefox") != -1) {
			slider.innerHTML = "<div>" + scaler.base_lvl_v + "</div><div style='padding: 0 5px;width:" + slider_width + "%;'><input type='range' min='" + scaler.base_lvl_v + "' max='" + $(enemyVar).find("#slider_max")[0].innerHTML + "' value='" + scaler.spawn_lvl_v + "' id='" + ehp_slider_id + "' style='width:100%;' oninput='ehp_input.value = ehp_slider.value; slider_div.enemyVarInfoboxScaler.update();'/></div><div>" + $(enemyVar).find("#slider_max")[0].innerHTML + "</div>";
		} else {
			slider.innerHTML = "<div>" + scaler.base_lvl_v + "</div><div style='padding: 0 5px;width:" + slider_width + "%;'><input type='range' min='" + scaler.base_lvl_v + "' max='" + $(enemyVar).find("#slider_max")[0].innerHTML + "' value='" + scaler.spawn_lvl_v + "' id='" + ehp_slider_id + "' style='width:100%;' /></div><div>" + $(enemyVar).find("#slider_max")[0].innerHTML + "</div>";
		}
						
		$(enemyVar).find("#" + enemy_eximus_id + ", #" + enemy_steelpath_id).each(function () {
			$(this).click(function () {
				slider.enemyVarInfoboxScaler.update();
			});
		});

		$(slider).find("#" + ehp_slider_id)[0].oninput = function () {
			$("#" + ehp_input_id)[0].value = $("#" + ehp_slider_id)[0].value;
			slider.enemyVarInfoboxScaler.update();
		};

		$(enemyVar).find("#out_lvl")[0].innerHTML = "<input type='number' min='" + scaler.base_lvl_v + "' max='10000' value='" + scaler.spawn_lvl_v + "' id='" + ehp_input_id + "' style='max-width:70%'/>";
		$($(enemyVar).find("#out_lvl")[0]).find("#" + ehp_input_id)[0].oninput = function () {
			$("#" + ehp_slider_id)[0].value = $("#" + ehp_input_id)[0].value;
			slider.enemyVarInfoboxScaler.update();
		};

		$(enemyVar).find("#reset_btn")[0].innerHTML = "<button id='" + reset_id + "' type='button' onclick='ehp_slider.value = " + scaler.spawn_lvl_v + "; ehp_input.value = " + scaler.spawn_lvl_v + "; slider_div.enemyVarInfoboxScaler.update();' style='float:right;'>Скинути</button>";
		$($(enemyVar).find("#reset_btn")[0]).find("#" + reset_id)[0].onclick = function () {
			$("#" + ehp_slider_id)[0].value = scaler.spawn_lvl_v ;
			$("#" + ehp_input_id)[0].value  = scaler.spawn_lvl_v ;
			slider.enemyVarInfoboxScaler.update();
		};

		scaler.update();
	}
);