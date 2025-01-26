/* jshint maxerr: 1000 */
/* jshint multistr: true */
$(".type-enemyBox, .enemy-horiz-box").each(
	function(count, enemyVar) {
		var slider = $(enemyVar).find("#slider_div")[0];
		if (slider == null) return;

		var is_horiz = $(enemyVar).hasClass("enemy-horiz-box");
		var ehp_input_id = "ehp_input_" + count;
		var ehp_slider_id = "ehp_slider_" + count;
		var reset_id = "reset_" + count;
		var enemy_steelpath_id = "sp_" + count;
		var enemy_eximus_id = "eximus_" + count;
		var voidDmg_tooltip = '<span class="tooltip tooltip-full damage-type-tooltip tooltips-init-complete" data-param="Порожнечею" data-param2="DamageTypes"><a href="/uk/wiki/%D0%A8%D0%BA%D0%BE%D0%B4%D0%B0/%D0%A8%D0%BA%D0%BE%D0%B4%D0%B0_%D0%9F%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D0%B5%D1%87%D0%B5%D1%8E"><img alt="Порожнечею іконка uk" src="https://static.wikia.nocookie.net/warframe/images/7/7f/%D0%9F%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D0%B5%D1%87%D0%B5%D1%8E_%D1%96%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_uk.png/revision/latest/scale-to-width-down/32?cb=20250122143528&amp;path-prefix=uk" decoding="async" loading="lazy" width="32" height="32" class="icon" data-image-name="Порожнечею іконка uk.png" data-image-key="%D0%9F%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D0%B5%D1%87%D0%B5%D1%8E_%D1%96%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_uk.png" data-relevant="0"></a></span><span style="color:green">x1,5</span>';

		slider.enemyVarInfoboxScaler = {};
		var scaler = slider.enemyVarInfoboxScaler;

		scaler.init = function() {
			this.health_v    = parseInt($(enemyVar).find("#health").text());
			this.shield_v    = parseInt($(enemyVar).find("#shield").text());
			this.armor_v     = parseInt($(enemyVar).find("#armor").text());
			this.overguard_v = parseInt($(enemyVar).find("#overguard").text());

			this.health_f1_coef    = parseFloat($(enemyVar).find("#health_f1_coef").text());
			this.shield_f1_coef    = parseFloat($(enemyVar).find("#shield_f1_coef").text());
			this.armor_f1_coef     = parseFloat($(enemyVar).find("#armor_f1_coef").text());
			this.overguard_f1_coef = parseFloat($(enemyVar).find("#overguard_f1_coef").text());

			this.health_f2_coef    = parseFloat($(enemyVar).find("#health_f2_coef").text());
			this.shield_f2_coef    = parseFloat($(enemyVar).find("#shield_f2_coef").text());
			this.armor_f2_coef     = parseFloat($(enemyVar).find("#armor_f2_coef").text());
			this.overguard_f2_coef = parseFloat($(enemyVar).find("#overguard_f2_coef").text());

			this.health_f1_expo    = parseFloat($(enemyVar).find("#health_f1_expo").text());
			this.shield_f1_expo    = parseFloat($(enemyVar).find("#shield_f1_expo").text());
			this.armor_f1_expo     = parseFloat($(enemyVar).find("#armor_f1_expo").text());
			this.overguard_f1_expo = parseFloat($(enemyVar).find("#overguard_f1_expo").text());

			this.health_f2_expo    = parseFloat($(enemyVar).find("#health_f2_expo").text());
			this.shield_f2_expo    = parseFloat($(enemyVar).find("#shield_f2_expo").text());
			this.armor_f2_expo     = parseFloat($(enemyVar).find("#armor_f2_expo").text());
			this.overguard_f2_expo = parseFloat($(enemyVar).find("#overguard_f2_expo").text());

			this.affinity_v  = parseInt($(enemyVar).find("#affinity").text());
			this.base_lvl_v  = parseInt($(enemyVar).find("#base_level").text());
			this.spawn_lvl_v = parseInt($(enemyVar).find("#spawn_level").text());
			
			this.shield_v_original = this.shield_v;
			this.health_v_original = this.health_v;

			if (this.spawn_lvl_v === 0)  this.spawn_lvl_v = this.base_lvl_v;

			$(enemyVar).find((is_horiz ? ".data-row" : ".pi-item") + "[data-source=EHP]").after(
				'<div class="' + (is_horiz ? 'data-row' : 'pi-item pi-data pi-item-spacing pi-border-color') + '">\
				<div class="pi-data-value pi-font"><div style="text-align: center;">\
				<input type="checkbox" name="sp" id="'+enemy_steelpath_id+'"></input>\
				<label for="'+enemy_steelpath_id+'">Шлях сталі</label>\
				<input type="checkbox" name="eximus" id="'+enemy_eximus_id+'"></input>\
				<label for="'+enemy_eximus_id+'">Ексім</label></div></div>'
			);
		};

		scaler.eximus = function(type, curr_lvl) {
			var trans = this.trans(70, 80, curr_lvl);
			var type_vars = {
				health: { f1: [0.015, 2], f2: [(Math.sqrt(5) * 24)/5, 0.5] },
				shield: { f1: [0.002, 1.75], f2: [2, 0.75] },
				armor: { f1: [0.002, 1.75], f2: [2, 0.75] }
			};
			var multi;
			var fun1 = 1 + type_vars[type].f1[0] * Math.pow(curr_lvl - this.base_lvl_v, type_vars[type].f1[1]);
			var fun2 = 1 + type_vars[type].f2[0] * Math.pow(curr_lvl - this.base_lvl_v, type_vars[type].f2[1]);
			if (type == "armor") {
				if (curr_lvl <= 25) multi = fun1;
				else if (curr_lvl > 25 && curr_lvl <= 35) multi = (1 + 0.0125 * (curr_lvl - 25)) * fun1;
				else if (curr_lvl > 35 && curr_lvl <= 50) multi = (1.125 + 0.06667 * (curr_lvl - 35)) * fun1;
				else if (curr_lvl > 50 && curr_lvl <= 100)
					multi = (1.375 + 0.005 * (curr_lvl - 50)) * (fun1 * (1 - trans) + fun2 * trans);
				else multi = 1.625 * fun2;
			} else {
				if (curr_lvl <= 15) multi = fun1;
				else if (curr_lvl > 15 && curr_lvl <= 25) multi = (1 + 0.025 * (curr_lvl - 15)) * fun1;
				else if (curr_lvl > 25 && curr_lvl <= 35) multi = (1.25 + 0.125 * (curr_lvl - 25)) * fun1;
				else if (curr_lvl > 35 && curr_lvl <= 50) multi = (2.5 + 2 / 15 * (curr_lvl - 35)) * fun1;
				else if (curr_lvl > 50 && curr_lvl <= 100) 
					multi = (4.5 + 0.03 * (curr_lvl - 50)) * (fun1 * (1 - trans) + fun2 * trans);
				else multi = 6 * fun2;
			}
			return multi;
		};

		scaler.trans = function(start, end, curr_lvl) {
			if (curr_lvl - this.base_lvl_v < start) return 0;
			if (curr_lvl - this.base_lvl_v > end) return 1;

			var T = (curr_lvl - this.base_lvl_v - start) / (end - start);
			return 3*Math.pow(T, 2) - 2*Math.pow(T, 3);
		};

		scaler.update = function() {
			var curr_lvl = $("#" + ehp_input_id).val();
			if (curr_lvl < this.base_lvl_v) return;

			var is_eximus = $(enemyVar).find("#" + enemy_eximus_id).prop('checked');
			var is_sp = $(enemyVar).find("#" + enemy_steelpath_id).prop('checked');

			var trans = this.trans(70, 80, curr_lvl);
			var lvl_diff = curr_lvl - this.base_lvl_v;

			if (is_sp) {
				this.shield_v = 2.5 * this.shield_v_original;
				this.health_v = 2.5 * this.health_v_original;
			} else {
				this.shield_v = this.shield_v_original;
				this.health_v = this.health_v_original;
			}

			var affinity = 0;
			if (this.affinity_v > 0) 
				affinity = Math.floor(this.affinity_v * ((is_eximus ? 3 : 1) + Math.sqrt(curr_lvl) * 0.1425));

			var health = 0;
			if (this.health_v > 0) {
				var health_multi;
				if (is_eximus) health_multi = this.eximus("health", curr_lvl);
				else {
					var health_f1 = this.health_f1_coef * Math.pow(lvl_diff, this.health_f1_expo);
					var health_f2 = this.health_f2_coef * Math.pow(lvl_diff, this.health_f2_expo);
					health_multi = 1 + health_f1 + (health_f2 - health_f1) * trans;
				}
				health = Math.round(this.health_v * health_multi * 100) / 100;
			}
				
			var shield = 0;
			if (this.shield_v > 0) {
				var shield_multi;
				if (is_eximus) shield_multi = this.eximus("shield", curr_lvl);
				else {
					shield_f1 = this.shield_f1_coef * Math.pow(lvl_diff, this.shield_f1_expo);
					shield_f2 = this.shield_f2_coef * Math.pow(lvl_diff, this.shield_f2_expo);
					shield_multi = 1 + shield_f1 + (shield_f2 - shield_f1) * trans;
				}
				shield = Math.round(this.shield_v * shield_multi * 100) / 100;
			}

			var armor = 0, armor_redux = 0;
			if (this.armor_v > 0) {
				var armor_multi;
				if (is_eximus) armor_multi = this.eximus("armor", curr_lvl);
				else {
					var armor_f1 = this.armor_f1_coef * Math.pow(lvl_diff, this.armor_f1_expo);
					var armor_f2 = this.armor_f2_coef * Math.pow(lvl_diff, this.armor_f2_expo);
					armor_multi = 1 + armor_f1 + (armor_f2 - armor_f1) * trans;
				}
				armor = Math.min(Math.round(this.armor_v * armor_multi * 100) / 100, 2700);
				armor_redux = Math.round(Math.sqrt(3 * armor) * 100) / 10000;
			}

			var overguard = 0;
			if (this.overguard_v > 0 || is_eximus) {
				var overguard_multi, overguard_f1, overguard_f2;
				if (is_eximus) {
					overguard_f1 = 1 + 0.0015 * Math.pow(lvl_diff, 4);
					overguard_f2 = 1 + 260 * Math.pow(lvl_diff, 0.9);

					if (lvl_diff < 45) overguard = 12 * overguard_f1; 
					else if (lvl_diff >= 45 && lvl_diff <= 50) overguard = 12 * overguard_f2; 
					else overguard = 12 * (overguard_f1 * (1 - scaler.trans(45, 50, curr_lvl)) + overguard_f2 * scaler.trans(45, 50, curr_lvl));
				} else {
					overguard_f1 = this.overguard_f1_coef * Math.pow(lvl_diff, this.overguard_f1_expo);
					overguard_f2 = this.overguard_f2_coef * Math.pow(lvl_diff, this.overguard_f2_expo);
					overguard_multi = 1 + overguard_f1 + (overguard_f2 - overguard_f1) * this.trans(45, 50, curr_lvl);
					overguard = Math.round(this.overguard_v * overguard_multi * 100) / 100;
				}

				// додає поле з надзахистом
				if (!$(enemyVar).find( '.' + (is_horiz ? 'data-row' : 'pi-item') + '[data-source=Overguard]').length) {
					$(enemyVar).find('.' + (is_horiz ? 'data-row' : 'pi-item') + '[data-source=Affinity]').after(
					'<div class="'+(is_horiz ? 'data-row' : 'pi-item pi-data pi-item-spacing pi-border-color') +'" data-source="Overguard">\
					<h3 class="'+(is_horiz ? 'data-label' : 'pi-data-label pi-secondary-font') +'">Надзахист</h3>\
					<div class="'+(is_horiz ? 'data-value' : 'pi-data-value pi-font') +'"><span id="overguard">${overguard}</span></div></div>\
					<div class="'+(is_horiz ? 'data-row' : 'pi-item pi-data pi-item-spacing pi-border-color') +'" data-source="OverguardT">\
				<div class="pi-data-value pi-font"><div style="text-align: center; font-size: 12px; font-weight: bold;">\
				<div style="text-align:center;">'+voidDmg_tooltip+'</div></div></div></div>');
				$(window).trigger('CustomEvent', $(enemyVar));
				}
			}
			if (!is_eximus && this.overguard_v <= 0) {
				$(enemyVar).find('.'+(is_horiz ? 'data-row' : 'pi-item')+'[data-source=Overguard]').hide();
				$(enemyVar).find('.'+(is_horiz ? 'data-row' : 'pi-item')+'[data-source=OverguardT]').hide();
			} else {
				$(enemyVar).find('.'+(is_horiz ? 'data-row' : 'pi-item')+'[data-source=Overguard]').show();
				$(enemyVar).find('.'+(is_horiz ? 'data-row' : 'pi-item')+'[data-source=OverguardT]').show();
			}

			var ehp = Math.round((health / (1 - armor_redux) + shield + overguard) * 100) / 100;

			$(enemyVar).find("#health").text(health.toLocaleString());
			$(enemyVar).find("#shield").text(shield.toLocaleString());
			$(enemyVar).find("#armor").text(armor.toLocaleString());
			$(enemyVar).find("#damage_redux").text((100 * armor_redux).toLocaleString());
			$(enemyVar).find("#overguard").text(overguard.toLocaleString());
			$(enemyVar).find("#affinity").text(affinity.toLocaleString());
			$(enemyVar).find("#out_ehp").html(ehp.toLocaleString());
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

		$(enemyVar).find('#'+enemy_eximus_id+', #'+enemy_steelpath_id).each(function () {
			$(this).on("click", function() {
				slider.enemyVarInfoboxScaler.update();
			});
		});

		scaler.update();
	}
);