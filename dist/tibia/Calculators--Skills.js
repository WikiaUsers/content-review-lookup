$(function() {
    $('body:first').append(
        '<style>' +
        '#calculators_container>div {text-align:center;border:1px solid #bfcfcf; background-color:#f9fcff;padding:8px 10px;margin: 0 auto;}' +
        '#calculator_exerciseweapons {width:690px;}' +
        '#calculator_exerciseweapons input {margin: 0px 10px 0px 10px;}' +
        '#calculator_reakskill {width:550px;}' +
        '#calculator_reakskill input {margin: 0px 10px 0px 10px;}' +
        '</style>'
    );
    var loyalty_bonus = function(points) {
            var bonus = Math.floor(points / 360) * 0.05 + 1;
            if (bonus > 1.5) {
                bonus = 1.5;
            } else if (bonus === 0) {
                bonus = 1;
            }
            return bonus; /*Format: 1,00, 1,05, 1,15, etc */
        },
        magic_vocs = {
            "knight": 3,
            "paladin": 1.4,
            "druid": 1.1,
            "sorcerer": 1.1,
            "none": 4
        },
        melee_vocs = {
            "knight": 1.1,
            "paladin": 1.2,
            "druid": 1.8,
            "sorcerer": 2,
            "none": 2
        },
        fist_vocs = {
            "knight": 1.1,
            "paladin": 1.2,
            "druid": 1.5,
            "sorcerer": 1.5,
            "none": 1.5
        },
        dist_vocs = {
            "knight": 1.4,
            "paladin": 1.1,
            "druid": 1.8,
            "sorcerer": 2,
            "none": 2
        },
        shield_vocs = {
            "knight": 1.1,
            "paladin": 1.1,
            "druid": 1.5,
            "sorcerer": 1.5,
            "none": 1.5
        },
        get_constants = function(voc, type) {
            var A, y, minlevel = 10;
            if (type == "magic") {
                A = 1600;
                y = magic_vocs[voc];
                minlevel = 0;
            } else if (type == "axe" || type == "sword" || type == "club") {
                A = 50;
                y = melee_vocs[voc];
            } else if (type == "fist") {
                A = 50;
                y = fist_vocs[voc];
            } else if (type == "shield") {
                A = 100;
                y = shield_vocs[voc];
            } else if (type == "dist") {
                A = 30;
                y = dist_vocs[voc];
            } else if (type == "fish") {
                A = 20;
                y = 1.1;
            }
            var constants = [A, y, minlevel];
            return constants;
        },
        level_to_pts = function(level, voc, type) {
            var constants = get_constants(voc, type),
                A = constants[0],
                y = constants[1],
                minlevel = constants[2],
                points = A * ((Math.pow(y, level - minlevel) - 1) / (y - 1));
            return Math.round(points);
        },
        current_pts = function(level, voc, pct_left, type) {
            var curr_pts = level_to_pts(level, voc, type),
                next_pts = level_to_pts(level + 1, voc, type),
                dif = next_pts - curr_pts,
                advanced = ((100 - pct_left) / 100) * dif;
            return Math.round((curr_pts + advanced));
        },
        pts_to_level = function(pts, voc, type) {
            var constants = get_constants(voc, type),
                A = constants[0],
                y = constants[1],
                minlevel = constants[2],
                skill = Math.floor(Math.log(pts * (y - 1) / A + 1) / Math.log(y)) + minlevel;
            return skill;
        },
        pts_to_next_level = function(currlevel, voc, type) {
            var constants = get_constants(voc, type),
                A = constants[0],
                y = constants[1],
                minlevel = constants[2],
                pts = A * Math.pow(y, currlevel - minlevel);
            return pts;
        };

    /* Training */
    (function() {
        var serializeIntoHash = function() {
          const params = new URLSearchParams();
          params.set('loyaltyPoints', $('#calculator_ew_loyalty_pts').val());
          params.set('weaponType', $('select[name=calculator_ew_wep_type]').val());
          params.set('doubleEvent', $('input[name=ew_event]').prop('checked'));
          params.set('houseDummy', $('input[name=ew_dummy]').prop('checked'));
          params.set('skill', $('select[name=calculator_ew_voc_skill]').val());
          params.set('level', $('#calculator_ew_skill_level').val());
          params.set('percentageRemaining', $('#calculator_ew_left').val());
          params.set('target', $('#calculator_ew_skill_trained').val());
          return '#' + params.toString();
        };
        var deserializeFromHash = function() {
          const hash = location.hash.slice(1);
          if (!hash) return;
          const params = new URLSearchParams(hash);
          // Check if these are the params for this particular tool.
          if (!params.has('weaponType')) return;
          $('#calculator_ew_loyalty_pts').val(params.get('loyaltyPoints')).trigger('input');
          $('select[name=calculator_ew_wep_type]').val(params.get('weaponType'));
          $('input[name=ew_event]').prop('checked', params.get('doubleEvent'));
          $('input[name=ew_dummy]').prop('checked', params.get('houseDummy'));
          $('select[name=calculator_ew_voc_skill]').val(params.get('skill'));
          $('#calculator_ew_skill_level').val(params.get('level'));
          $('#calculator_ew_left').val(params.get('percentageRemaining'));
          $('#calculator_ew_skill_trained').val(params.get('target'));
          calculator_exerciseweapons_update();
        };

        var calculator_exerciseweapons_update = function() {
            var loyalty = 1 + parseInt($('#calculator_ew_loyalty_bonus').val(), 10) / 100;
            loyalty = isNaN(loyalty) ? 1 : loyalty;
            var level = parseInt($('#calculator_ew_skill_level').val(), 10);
            level = isNaN(level) ? 10 : (level > 150 ? 150 : level);
            var pct_left = parseFloat($('#calculator_ew_left').val(), 10);
            pct_left = (isNaN(pct_left) || pct_left > 100) ? 100 : pct_left;

            var vocation = 'druid';
            if ($('select[name=calculator_ew_voc_skill]').val() == 'magicknight') {
                vocation = 'knight';
            } else if (($('select[name=calculator_ew_voc_skill]').val() == 'magicpaladin')) {
                vocation = 'paladin';
            }
            var curr_pts = current_pts(level, vocation, pct_left, 'magic');
            var mode = $('input[name=ew_mode]:checked').val();
            var event = $('input[name=ew_event]').prop('checked') ? 2 : 1;
            var dummy = $('input[name=ew_event]').prop('checked') ? 1.1 : 1;
            var weapon_type = 1;
            if ($('select[name=calculator_ew_wep_type]').val() == 'training') {
                weapon_type = 0.1;
            } else if ($('select[name=calculator_ew_wep_type]').val() == 'durable') {
                weapon_type = 3.6;
            } else if ($('select[name=calculator_ew_wep_type]').val() == 'lasting') {
                weapon_type = 28.8;
            }
            var charges = 500 * weapon_type;
            var add_pts = 0;
            var weappts = dummy * event * loyalty * 600 * charges; // 600 UMPs of 500 mana ea
            var weappct = Math.round(100 * 100 * weappts / pts_to_next_level(level, vocation, 'magic')) / 100;
            var nweapons, trained_pts, trained_level, pts_to_next, next_pts_total, left_pts, final_pct_left;
            $('#calculator_ew_warning').empty(); //Clear warnings before any calculation
            if (mode == 'weapons') {
                nweapons = parseInt($('#calculator_ew_nweapons').val(), 10);
                add_pts = weappts * nweapons;
                $('#calculator_ew_skill_trained').prop('disabled', true);
                $('#calculator_ew_weapcost_gold').prop('disabled', false);
                $('#calculator_ew_weapcost_coins').prop('disabled', false);
                $('#calculator_ew_skill_left_trained').html(100);
                $('#calculator_ew_nweapons').prop('disabled', false);
                trained_pts = curr_pts + add_pts;
                trained_level = pts_to_level(trained_pts, vocation, 'magic');

                $('#calculator_ew_skill_trained').val(trained_level);
            } else {
                $('#calculator_ew_nweapons').prop('disabled', true);
                $('#calculator_ew_skill_trained').prop('disabled', false);
                $('#calculator_ew_weapcost_gold').prop('disabled', true);
                $('#calculator_ew_weapcost_coins').prop('disabled', true);
                trained_level = parseInt($('#calculator_ew_skill_trained').val(), 10);
                trained_pts = level_to_pts(trained_level, vocation, 'magic');
                nweapons = Math.ceil((trained_pts - curr_pts) / weappts);
                var trained_level_real = pts_to_level(curr_pts + weappts * nweapons, vocation, 'magic');
                if (trained_level_real > trained_level) {
                    $('#calculator_ew_warning').html('The number of weapons will be sufficient to achieve a higher skill than the submitted value. The final skill will be ' + trained_level_real + '.');
                }
                $('#calculator_ew_nweapons').val(nweapons);
            }
            if (trained_level < level || isNaN(trained_level)) {
                $('#calculator_ew_warning').html('The trained skill cannot be lower than the current skill.');
            } else {
                pts_to_next = pts_to_next_level(trained_level, vocation, 'magic');
                next_pts_total = level_to_pts(trained_level + 1, vocation, 'magic');
                left_pts = next_pts_total - trained_pts;
                final_pct_left = Math.ceil(10000 * (left_pts / pts_to_next)) / 100;
                final_pct_left = final_pct_left > 100 ? 100 : final_pct_left; //Roundings and reversed formula can lead to slightly different numbers that end up with 100.01% pct left.
                $('#calculator_ew_skill_bar1').width(100 - pct_left + "%");
                $('#calculator_ew_skill_bar2').width(pct_left + "%");

                $('#calculator_ew_skill_trainedbar1').width(100 - final_pct_left + "%");
                $('#calculator_ew_skill_trainedbar2').width(final_pct_left + "%");

                $('#calculator_ew_skill_left_trained').html(final_pct_left);

                $('#calculator_ew_weapcost_gold').val(nweapons * weapon_type * 262500 / 1000);
                $('#calculator_ew_weapcost_coins').val(nweapons * weapon_type * 25);

                /* update summary of calculation */
                $('#calculator_ew_skill_desc').html($('#calculator_ew_skill_level').val());
                $('#calculator_ew_loyalty_desc').html($('#calculator_ew_loyalty_bonus').val());
                $('#calculator_ew_event_desc').html($('input[name=ew_event]:checked').val() ? 'with' : 'without');
                $('#calculator_ew_dummy_desc').html($('input[name=ew_dummy]:checked').val() ? 'house' : 'regular');
                $('#calculator_ew_weappct_desc').html(weappct);

                var train_time_total = nweapons * charges * 2;
                var train_time_h = Math.floor(train_time_total / (60 * 60));
                var train_time_min = Math.floor(train_time_total / 60 - train_time_h * 60);
                var train_time_s = train_time_total - train_time_min * 60 - train_time_h * 60 * 60;

                $('#calculator_ew_train_time').html(train_time_h + ' hours, ' + train_time_min + ' minutes and ' + train_time_s + ' seconds');
            }

            // Update the permalink.
            $('#permalink_training').prop('hash', serializeIntoHash());
        };
        $('#calculator_exerciseweapons').html(
            '<div style="position: absolute;width: 680px;"><div style="display: grid;grid-row-gap:50px;">' +
            '<div><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Ferumbras_Exercise_Dummy.gif" style="float:left">' +
            '<img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Exercise_Dummy.gif" style="float:right"></div>' +
            '<div><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Exercise_Bow.gif" style="float:left;">' +
            '<img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Exercise_Sword.gif" style="float:right;"></div>' +
            '<div><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Exercise_Rod.gif" style="float:left;">' +
            '<img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Exercise_Axe.gif" style="float:right;"></div>' +
            '<div><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Exercise_Wand.gif" style="float:left;">' +
            '<img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Exercise_Club.gif" style="float:right;"></div>' +
            '</div></div>' +
            '<div style="position:relative;">' +
            '<label>Loyalty points:' +
            '<input id="calculator_ew_loyalty_pts" type="number" value="0" min="0" max="10000" style="width:55px;"></label>' +
            '<label>Loyalty bonus:' +
            '<input id="calculator_ew_loyalty_bonus" type="number" value="0" min="0" max="50" step="5" style="width:45px;">%</label><br/><br/>' +
            '<label>Skill/Vocation: <select name="calculator_ew_voc_skill"><option value="magicmage" selected>Magic/Mage</option><option value="meleeknight">Melee/Knight</option><option value="distancepaladin">Distance/Paladin</option><option value="magicpaladin">Magic/Paladin</option><option value="magicknight">Magic/Knight</option></select><label><br/><br/>' +
            '<label>Weapon Type: <select name="calculator_ew_wep_type"><option value="training">Training (50x, 1min40s)</option><option value="regular" selected>Regular (500x, 16min40s)</option><option value="durable">Durable (1,800x, 1h)</option><option value="lasting">Lasting (14,400x, 8h)</option></select></label><br/><br/>' +
            '<label><input type="checkbox" name="ew_event" value="double">Double Skills Event</label>' +
            '<label><input type="checkbox" name="ew_dummy" value="expert">House Dummy</label><br/><br/>' +
            /*'<input type="radio" name="ew_charges" value="exercise" checked>Exercise Weapon (500 charges)' +
            '<input type="radio" name="ew_charges" value="training">Training Weapon (100 charges)<br/><br/>' +*/
            '<label><input type="radio" name="ew_mode" value="weapons">Number of Weapons</label>' +
            '<label><input type="radio" name="ew_mode" value="skill" checked>Weapons required to achieve a skill</label>' +
            /*'<label><input type="radio" name="ew_mode" value="gold">Cost in Gold</label>' +
            '<label><input type="radio" name="ew_mode" value="coins">Cost in Tibia Coins</label>' +*/
            '<table style="margin: 0 auto;">' +
            '<tr>' +
            '<td>Current Skill (Base + Loyalty)</td><td>% left</td>' +
            '</tr><tr>' +
            '<td><input id="calculator_ew_skill_level" type="number" value="0" min="0" max="150" style="width:50px;"></td>' +
            '<td><input id="calculator_ew_left" type="number" value="100" min="0.01" max="100" style="width:55px;"><br/>' +
            '<div style="width: 136px; border:1px #000000 solid;">' +
            '<span id="calculator_ew_skill_bar1" style="text-align: right; height: 2px; width: 100%;background-color: #11B711;display: table;"></span>' +
            '<span id="calculator_ew_skill_bar2" style="text-align: left; width: 50%; background-color: #444444"></span>' +
            '</div></td>' +
            '</table><br/>' +
            'Simulations:' +

            '<table style="margin: 0 auto;">' +
            '<tr>' +
            '<td><label for="calculator_ew_skill_trained">Trained Skill</label></td><td><label for="calculator_ew_skill_left_trained">% left</label></td><td><label for="calculator_ew_nweapons"># of Weapons</label></td><td><label for="calculator_ew_weapcost_gold">Cost (Gold)</label></td><td><label for="calculator_ew_weapcost_coins">Cost (TC)</label></td>' +
            '</tr><tr>' +
            '<td><input id="calculator_ew_skill_trained" type="number" value="0" min="0" max="150" style="width:50px;"></td>' +
            '<td><span id="calculator_ew_skill_left_trained">100</span><br/>' +
            '<div style="width: 136px; border:1px #000000 solid;">' +
            '<span id = "calculator_ew_skill_trainedbar1" style="text-align: right; height: 2px; width: 100%;background-color: #11B711;display: table;"></span>' +
            '<span id = "calculator_ew_skill_trainedbar2" style="text-align: left; width: 50%; background-color: #444444"></span>' +
            '</div></td>' +
            '</td>' +
            '<td><input id="calculator_ew_nweapons" type="number" value="0" min="0" max="1000" style="width:60px;" disabled></td>' +
            '<td><input id="calculator_ew_weapcost_gold" type="number" value="0" min="0" step = "262.5" max="2626500" style="width:70px;" disabled>k</td>' +
            '<td><input id="calculator_ew_weapcost_coins"  type="number" value="0" min="0" step = "25" max="25000" style="width:70px;" disabled></td>' +
            '</tr>' +
            '</table><span id="calculator_ew_warning", style="color:red;"></span>' +
            '<br/><br/>' +
            'At ml/skill <span id="calculator_ew_skill_desc">0</span> with ' +
            '<span id="calculator_ew_loyalty_desc">0</span>% loyalty bonus, ' +
            '<span id="calculator_ew_event_desc">with</span> double skill event and ' +
            '<span id="calculator_ew_dummy_desc">regular</span> dummy,' +
            '<br/>each weapon will advance ' +
            '<span id="calculator_ew_weappct_desc">1</span>% of the current skill.<br/><br/>' +
            'You will need <span id="calculator_ew_train_time">0 hours, 0 minutes and 0 seconds</span> to use the required number of exercise weapons.<br/><a href="#loyaltyPoints=0&amp;weaponType=regular&amp;doubleEvent=false&amp;houseDummy=false&amp;skill=magicmage&amp;level=0&amp;percentageRemaining=100&amp;target=0" rel="permalink" id="permalink_training">Permanent link</a>' +
            '</div>'
        );

        $('#calculator_ew_loyalty_pts').on('input', function() {
            $('#calculator_ew_loyalty_bonus').val(Math.round(100 * (loyalty_bonus(parseInt($('#calculator_ew_loyalty_pts').val(), 10)) - 1)));
            calculator_exerciseweapons_update();
        });
        $('#calculator_ew_loyalty_bonus').on('input', function() {
            $('#calculator_ew_loyalty_pts').val(360 * (parseInt($('#calculator_ew_loyalty_bonus').val(), 10) / 5));
            calculator_exerciseweapons_update();
        });
        $('input[name=ew_mode], input[name=ew_dummy], input[name=ew_event], select[name=calculator_ew_voc_skill], select[name=calculator_ew_wep_type], #calculator_ew_skill_level, #calculator_ew_left, #calculator_ew_skill_trained, #calculator_ew_nweapons').on('input', function() {
            calculator_exerciseweapons_update();
        });
        $('#calculator_ew_weapcost_gold').on('input', function() {
            $('#calculator_ew_nweapons').val(Math.floor($('#calculator_ew_weapcost_gold').val() / 262.5));
            calculator_exerciseweapons_update();
        });
        $('#calculator_ew_weapcost_coins').on('input', function() {
            $('#calculator_ew_nweapons').val(Math.floor($('#calculator_ew_weapcost_coins').val() / 25));
            calculator_exerciseweapons_update();
        });

        // Restore inputs based on the URL hash, if applicable.
        deserializeFromHash();

    }());

    /* Loyalty */

    (function() {
        var skilltypes = ["magic", "fist", "club", "sword", "axe", "dist", "shield", "fish"],
            skillnames = {
                "magic": "Magic Level",
                "fist": "Fist Fighting",
                "club": "Club Fighting",
                "sword": "Sword Fighting",
                "axe": "Axe Fighting",
                "dist": "Distance Fighting",
                "shield": "Shielding",
                "fish": "Fishing"
            },
            minskills = {
                "magic": 0,
                "fist": 10,
                "club": 10,
                "sword": 10,
                "axe": 10,
                "dist": 10,
                "shield": 10,
                "fish": 10
            },
            next_pts = function(level, voc, type) {
                var constants = get_constants(voc, type),
                    A = constants[0],
                    y = constants[1],
                    minlevel = constants[2],
                    points = A * Math.pow(y, level - minlevel);
                return Math.round(points);
            },
            skill_wo_loyalty = function(points, loyalty) {
                var bonus = loyalty_bonus(loyalty),
                    pts = points / bonus;
                return Math.floor(pts);
            },
            calculator_realskill_update = function(changedskills = skilltypes) {
                var voc = $('input[name="calculator_rs_vocation"]:checked').val(),
                    loyalty = parseInt($('#calculator_rs_loyalty_pts').val(), 10);

                for (let type of changedskills) {
                    var level = parseInt($('#calculator_rs_' + type + '_level').val(), 10);
                    if (level > 150) level = 150;

                    var pct_left = parseInt($('#calculator_rs_' + type + '_left').val(), 10);
                    if (pct_left > 100) {
                        pct_left = 100;
                    } else if (pct_left < 1) {
                        pct_left = 1;
                    }

                    var curr_pts = current_pts(level, voc, pct_left, type),
                        real_pts = skill_wo_loyalty(curr_pts, loyalty),
                        real_level = pts_to_level(real_pts, voc, type),
                        real_curr_base = level_to_pts(real_level, voc, type),
                        real_next_total = level_to_pts(real_level + 1, voc, type),
                        real_next_pts = next_pts(real_level, voc, type),
                        skill_left_pts = real_next_total - real_pts,
                        real_pct = Math.ceil(100 * (skill_left_pts / real_next_pts));
                    /*var bonus = loyalty_bonus(loyalty);
                    $('#calculator_rs_loyalty_bonus').html(Math.round((bonus - 1) * 100) + '%:');*/
                    $('#calculator_rs_' + type + '_bar1').width(100 - pct_left + "%");
                    $('#calculator_rs_' + type + '_bar2').width(pct_left + "%");
                    $('#calculator_rs_' + type + '_realbar1').width(100 - real_pct + "%");
                    $('#calculator_rs_' + type + '_realbar2').width(real_pct + "%");
                    $('#calculator_rs_' + type + '_level_real').html(real_level);
                    $('#calculator_rs_' + type + '_left_real').html(real_pct);
                }
            };

        $('#calculator_reakskill').html(
            '<input type="radio" value = "druid" name ="calculator_rs_vocation" checked>Druid' +
            '<input type="radio" value = "sorcerer" name ="calculator_rs_vocation">Sorcerer' +
            '<input type="radio" value = "knight" name ="calculator_rs_vocation">Knight' +
            '<input type="radio" value = "paladin" name ="calculator_rs_vocation">Paladin' +
            '<input type="radio" value = "none" name ="calculator_rs_vocation">None' +
            '<br/><br/>' +
            'Loyalty points:' +
            '<input id="calculator_rs_loyalty_pts" type="number" value="0" min="0" max="10000" style="width:55px;">' +
            'Loyalty bonus:' +
            '<input id="calculator_rs_loyalty_bonus" type="number" value="0" min="0" max="50" step = "5">%<br/><br/>' +
            '<div">' +
            '<table id ="calculator_rs_inputs" style="margin: 0 auto;">' +
            '<tr>' +
            '<td>Skill</td><td>Current</td><td>% left</td><td>real skill</td><td>% left</td>' +
            '</tr>' +
            '</table>' +
            '</div>'
        );
        for (let type of skilltypes) {
            $('#calculator_rs_inputs tr:last').after(
                '<tr><td>' + skillnames[type] + '</td>' +
                '<td><input id="calculator_rs_' + type + '_level" type="number" value="' + minskills[type] + '" min="0" max="150" style="width:40px;"></td>' +
                '<td><input id="calculator_rs_' + type + '_left" type="number" value="100" min="1" max="100" style="width:40px;"><br/>' +
                '<div style="width: 136px; border:1px #000000 solid;">' +
                '<span id = "calculator_rs_' + type + '_bar1" style="text-align: right; height: 2px; width: 100%;background-color: #11B711;display: table;"></span>' +
                '<span id = "calculator_rs_' + type + '_bar2" style="text-align: left; width: 50%; background-color: #444444"></span>' +
                '</div>' +
                '<td><span id="calculator_rs_' + type + '_level_real"></span></td>' +
                '<td><span id="calculator_rs_' + type + '_left_real">100</span><br/>' +
                '<div style="width: 136px; border:1px #000000 solid;">' +
                '<span id = "calculator_rs_' + type + '_realbar1" style="text-align: right; height: 2px; width: 100%;background-color: #11B711;display: table;"></span>' +
                '<span id = "calculator_rs_' + type + '_realbar2" style="text-align: left; width: 50%; background-color: #444444"></span>' +
                '</div>' +
                '</td>' +
                '</tr>');
            $('#calculator_rs_' + type + '_level, #calculator_rs_' + type + '_left').on('input', function() {
                calculator_realskill_update([type]);
            });
        }
        $('#calculator_rs_loyalty_pts').on('input', function() {
            $('#calculator_rs_loyalty_bonus').val(Math.round(100 * (loyalty_bonus(parseInt($('#calculator_rs_loyalty_pts').val(), 10)) - 1)));
            calculator_realskill_update();
        });
        $('#calculator_rs_loyalty_bonus').on('input', function() {
            $('#calculator_rs_loyalty_pts').val(360 * (parseInt($('#calculator_rs_loyalty_bonus').val(), 10) / 5));
            calculator_realskill_update();
        });
        $('input[name="calculator_rs_vocation"]').change(function() {
            calculator_realskill_update(skilltypes);
        });
        calculator_realskill_update();
    }());
    $('#calculators_loading').hide();
    $('#calculators_container').show();
});