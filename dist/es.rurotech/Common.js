/* Any JavaScript here will be loaded for all users on every page load. */
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
    }
    ());