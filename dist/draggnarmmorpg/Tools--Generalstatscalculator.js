/*
 * This script is responsible for setting up [[Calculators/General_Character_Statistics]].
 *
 * It relies on the following common data:
 * - Vocation data, to determine how much a particular vocation gains.
 * - General Mechanics data, to determine the amount of experience required for a particular level.
 */
tibiawiki_parent_module('tibiawiki.tools.generalstatscalculator', (function() {
 
    function update() {
        var exp, lvl;
        if ($(this).val() === '') {
            $(this).val(1).select();
        }
        lvl = Math.abs(parseInt($(this).val(), 10) || 1);
        $(this).val(lvl);
        exp = tibiawiki.util.experience.calculate_experience_for_level(lvl);
 
        /* Separate by thousands. */
        while ((/\d{4}/).test(exp)) {
            exp = exp.replace(/(\d{3},|\d{3}$)/, ',$1');
        }
 
        $('#calculator_expr1').html('Experience for level ' + lvl + ': <b>' + exp + '</b>');
    }
 
    function initialize() {
        $('#calculator_exp')
            .append('Level: ')
            .append('<input type="text" size="8" maxlength="4" id="calculator_expi1" value="1" />&nbsp;')
            .append($('<input type="button" value="-" />').click(function() {
                calculator_btn_m(this);
            })).append('&nbsp;')
            .append($('<input type="button" value="+" />').click(function() {
                calculator_btn_p(this);
            }))
            .append('<br /><br /><span id="calculator_expr1"></span>');
        }
 
        /* Set up handlers. */
        $('#calculator_expi1').keyup(update);
 
        /* Force checking exp requirements for level 1 on initialization. This will place the UI
         * in a valid state, using the input "1". */
        $('#calculator_expi1').keyup();
    }
 
    return {
        'initialize': initialize
    };
}());