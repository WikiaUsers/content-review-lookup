$(function() {
    var calculator_btn_m = function(o) {
            $(o).prev().val(parseInt($(o).prev().val(), 10) - 1);
            $(o).prev().keyup();
        },
        calculator_btn_p = function(o) {
            $(o).prev().prev().val(parseInt($(o).prev().prev().val(), 10) + 1);
            $(o).prev().prev().keyup();
        };
    /*Exp*/
    (function() {
        $('#calculator_exp')
            .append('Level: ')
            .append('<input type="text" size="8" maxlength="4" id="calculator_expi1" value="8" />&nbsp;')
            .append($('<input type="button" value="-" />').click(function() {
                calculator_btn_m(this);
            })).append('&nbsp;')
            .append($('<input type="button" value="+" />').click(function() {
                calculator_btn_p(this);
            }))
            .append('<br /><br /><span id="calculator_expr1"></span>')
            .append('<input type="checkbox" id="death_rh" name="death_rh">' +
                '<label for="death_rh" style="font-size:0.7em">Retro Hardcore PvP</label><br/><br/>')
            .append('<span id="calculator_expr2"></span>');
        $('#calculator_expi1').keyup(function() {
            if ($(this).val() === '') {
                $(this).val(1).select();
            }
            var exp, nextexp, totalxploss, fivebloss, fiveblossp, sevenbloss, sevenblossp, lvl = Math.abs(parseInt($(this).val(), 10) || 1),
                prot = 0.08;
            $(this).val(lvl);
            exp = (50 * Math.pow(lvl - 1, 3) - 150 * Math.pow(lvl - 1, 2) + 400 * (lvl - 1)) / 3;
            nextexp = String(((50 * Math.pow(lvl, 3) - 150 * Math.pow(lvl, 2) + 400 * (lvl)) / 3) - exp);
            nextexp = nextexp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if ($('#death_rh').prop('checked')) {
                prot = 0.0631;
            }
            totalxploss = Math.round((lvl + 50) * (lvl * lvl - 5 * lvl + 8) / 2);
            fivebloss = totalxploss * (1 - 0.3 - 5 * prot);
            fiveblossp = Math.round(100 * 100 * fivebloss / exp) / 100;
            sevenbloss = totalxploss * (1 - 0.3 - 7 * prot);
            sevenblossp = Math.round(100 * 100 * sevenbloss / exp) / 100;
            exp = String(exp).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            fivebloss = String(Math.round(fivebloss)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            sevenbloss = String(Math.round(sevenbloss)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            var min_share_lvl = Math.floor((lvl / 3) * 2);
            var max_share_lvl = Math.ceil((lvl / 2) * 3);
            max_share_lvl += lvl % 2 === 0 ? 1 : 0;
            // The share range is always calculated from the higher level rounding down.
            // For this reason, the max share level for even levels is underestimated. 
            // For example: a level 151 can share with a level 100 even though 100 * (3/2) = 150.
            $('#calculator_expr1').html(
                'Total level XP: <b>' + exp + '</b><br/>' +
                'Next level XP: <b>' + nextexp + '</b><br/><br/>' +
                'Death XP Loss (5 blessings): <b>' + fivebloss + ' (' + fiveblossp + '%)</b><br/>' +
                'Death XP Loss (7 blessings): <b>' + sevenbloss + ' (' + sevenblossp + '%)</b><br/>' +
                '<span style="font-size:0.7em">promoted characters with 100% to next level</span><br/>'
            );
            $('#calculator_expr2').html(
                'Minimum level to share experience: <b>' + min_share_lvl + '</b><br/>' +
                'Maximum level to share experience: <b>' + max_share_lvl + '</b>'
            );
        });
        $('#death_rh').change(function() {
            $('#calculator_expi1').keyup();
        });
        $('#calculator_expi1').keyup();
    }());

    /*Stats*/
    (function() {
        var x, tmp = '',
            calculator_stats_voc = {
                'Druid': [5, 30, 10],
                'Knight': [15, 5, 25],
                'Paladin': [10, 15, 20],
                'Sorcerer': [5, 30, 10],
                'Rookstayer': [5, 5, 10]
            }, //[hp, mana, cap]

            calculator_stats_update = function() {
                var x, lvl;
                for (x = 2; x <= 4; x++) {
                    if ($('#calculator_statsi' + x).val() === '') {
                        $('#calculator_statsi' + x).val(8).select();
                    }
                    $('#calculator_statsi' + x).val(Math.abs(parseInt($('#calculator_statsi' + x).val(), 10) || 8));
                }
                lvl = parseInt($('#calculator_statsi2').val(), 10);
                x = calculator_stats_voc[$('#calculator_statsi1').val()][0];
                $('#calculator_statsr1').text(145 + (5 * Math.min(8, lvl)) + (Math.max(0, lvl - 8) * x));
                x = calculator_stats_voc[$('#calculator_statsi1').val()][1];
                $('#calculator_statsr2').text(50 + (5 * Math.min(8, lvl)) + (Math.max(0, lvl - 8) * x));
                x = calculator_stats_voc[$('#calculator_statsi1').val()][2];
                $('#calculator_statsr3').text(390 + (10 * Math.min(8, lvl)) + (Math.max(0, lvl - 8) * x));
                $('#calculator_statsr4').text(109 + (lvl));
            };

        for (x in calculator_stats_voc) {
            if (calculator_stats_voc.hasOwnProperty(x)) {
                tmp += '<option value="' + x + '">' + x + '</option>';
            }
        }
        $('#calculator_stats').html(
            '<table><tr>' +
            '<td class="text_align_right">Vocation:</td>' +
            '<td class="text_align_left"><select id="calculator_statsi1" size="1">' + tmp + '</select></td>' +
            '</tr><tr>' +
            '<td class="text_align_right">Target level:</td>' +
            '<td class="text_align_left"><input type="text" size="8" maxlength="4" id="calculator_statsi2" value="8" />&nbsp;<input type="button" value="-" />&nbsp;<input type="button" value="+" /></td>' +
            '</tr><tr><td colspan="2">' +
            '<div id="calculator_statsrs"><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Calculator_Stats.png" alt="Stats" />' +
            '<div id="calculator_statsr1"></div>' +
            '<div id="calculator_statsr2"></div>' +
            '<div id="calculator_statsr3"></div>' +
            '<div id="calculator_statsr4"></div>' +
            '</div>' +
            '</td></tr>' +
            '</table>'
        );

        $('#calculator_statsi2').keyup(calculator_stats_update)
            .next().click(function() {
                calculator_btn_m(this);
                calculator_stats_update();
            })
            .next().click(function() {
                calculator_btn_p(this);
                calculator_stats_update();
            });
        $('#calculator_statsi1').change(calculator_stats_update);
        calculator_stats_update();
    }());
    
    /* Blessings */
    (function() {
    	$('#calculator_blessings')
    		.append('Level: ')
    		.append('<input id="calculator_blessings_level" type="number" value="120" min="8" max="4000" step="1" style="width:55px;">')
    		.append('</br></br>')
    		.append('<table id="calculator_blessings_table"><thead><tr><th>Level</th><th>Regular Blessing</br><small>(each)</small></th><th>Enhanced Blessing</br><small>(each)</small></th><th>All 7 Blessings</th><th>All 7 Blessings</br><small>(using Henricus)</small></th></tr></thead><tbody></tbody></table>');
    	
    	regular_blessing = function(level) {	
    		if (level < 30) {
    			return 2000;
    		} else if (level < 120) {
    			return (200 * (level - 20));
    		} else {
    			return (20000 + 75 * (level - 120));
    		}
    	};
    	enhanced_blessing = function(level) {	
    		if (level < 30) {
    			return 2600;
    		} else if (level < 120) {
    			return (260 * (level - 20));
    		} else {
    			return (26000 + 100 * (level - 120));
    		}
    	};
    	fmt = function(x) {
    		return x.toLocaleString('en-US', {maximumFractionDigits:2});
    	};
    	update_blessings_table = function (level) {
    		var reg = regular_blessing(level),
    		enh = enhanced_blessing(level),
    		allBless = 5 * reg + 2 * enh,
    		allBlessInq = Math.floor(5 * reg * 1.1 + 2 * enh);
    		
    		$('#calculator_blessings_table > tbody').empty();
    		$('#calculator_blessings_table')
    			.append('<tr><td>' + fmt(level) + '</td><td>' + fmt(reg) + '</td><td>' + fmt(enh) + '</td><td>' + fmt(allBless) + '</td><td>' + fmt(allBlessInq) + '</td></tr>');
    	};
    	$('#calculator_blessings_level').on('change keyup',function() {
    		update_blessings_table(this.value);
    	});
    	update_blessings_table($('#calculator_blessings_level').val());
    }());
    
    /*Loot Bonus*/
    (function() {
        $('#calculator_lootbonus')
        	.append('<img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Bosstiary_Icon.gif" style="float:left;"></img>')
        	.append('<img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Boss_Slots_Icon.gif" style="float:right;"></img>')
            .append('Boss Points: ')
            .append('<input id="calculator_lootbonus_points" type="number" value="0" min="0" max="30000" step="5" style="width:55px;">')
            .append('<br/><br/>')
            .append('<span id="calculator_lootbonus_bonus">Equipment Loot Bonus: <b>25%</b></span><br/>')
            .append('<span id="calculator_lootbonus_next"><br/>' +
					'<table><thead><tr>' +
					'<th>Bonus</th><th>Total Points</th><th>Points Left</th></tr>'+
					'</thead><tbody></tbody></table>' +
            		'</span><br/>');
        
        bonus_for_points = function(points) {
        	var bonus = 0;
        	if (points < 250) {
        		bonus = Math.floor(25 + points/10);
        	} else if (points < 1250) {
        		bonus = Math.floor(37.5 + points/20);
        	} else {
        		bonus = Math.floor(100 + 0.5 * (Math.sqrt(8 * ((points - 1250) / 5) + 81) - 9));
        	}
        	return bonus;
        };
            
        points_for_next = function(points) {
        	var points_next = 10,
        	bonus = bonus_for_points(points);
        	if (points < 240) {
        		points_next = 10 * Math.floor(points/ 10) + 10;
        	} else if (points < 1250) {
        		points_next = 20 * Math.floor((points - 250)/ 20) + 20 + 250;
        	} else {
        		points_next = 2.5 * Math.pow(bonus + 1, 2) - 477.5 * (bonus + 1) + 24000;
        	}
        	return points_next;
        };
            
        $('#calculator_lootbonus_points').on('change keyup keypress',function() {
        	var points = this.value,
        	bonus = bonus_for_points(points),
        	points_next = points_for_next(points);
        	
        	$('#calculator_lootbonus_bonus').html('Current Equipment Loot Bonus: <b>' + bonus + '%</b>');
        	
        	var points_arr = [points_next];
        	
        	$('#calculator_lootbonus_next table tbody').empty();
        	
        	for (i = bonus + 1; i < bonus + 4; i++) {
        		$('#calculator_lootbonus_next table tbody')
        			.append('<tr><td>' + i + '%</td><td>' + points_next + '</td><td>' + (points_next - points) + '</td></tr>');
    			points_next = points_for_next(points_arr[points_arr.length - 1]);
        		points_arr.push(points_next);
        	}
        });
    }());
		
    $('#calculators_loading').hide();
    $('#calculators_container').show();
});