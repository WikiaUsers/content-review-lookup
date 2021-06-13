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

    $('#calculators_loading').hide();
    $('#calculators_container').show();
});