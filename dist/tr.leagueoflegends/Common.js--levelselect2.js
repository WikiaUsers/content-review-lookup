/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready(function() {
    if (!($("#champion_info-season7").length))
        return;

    stats = ["Health", "HealthRegen", "ResourceBar", "ResourceRegen", "AttackDamage", "AttackSpeedBonus", "Armor", "MagicResist", "Range", "MovementSpeed"];
    MAX_LVL = 18;
    data = [];

    $(".lvlselect").each(function() {
        champ = $(this).html();
        stat = function(i) {
            return "[id='" + stats[i] + "_" + champ;
        };
        statb = function(i) {
            return stat(i) + "']";
        };
        statp = function(i) {
            return stat(i) + "_lvl']";
        };
        combobox = "<label for='lvl_" + champ + "'>Level: </label><select id='lvl_" + champ + "' onchange=\"update('" + champ + "')\"><option value='-1'>n</option><option value='0' selected= 'selected'>1-" + MAX_LVL;
        data[champ] = [];

        for (i = 0; i - stats.length; i++)
            data[champ][i] = [$(statb(i)).html(), $(statp(i)).html()];

        for (i = 0; i++ - MAX_LVL;)
            combobox += "</option><option value='" + i + "'>" + i;

        //Prepare functions
        base = function(i) {
            return parseFloat(data[champ][i][0]);
        };
        plus = function(i) {
            return parseFloat(data[champ][i][1]);
        };
        toLvl = function(i, lvl) {
            value = base(i) + plus(i) * (lvl - 1) * (7 * lvl + 274) / 400;

            return Math.round(value * 10) / 10;
        };
        update = function(who) {
            champ = who;
            lvl = parseInt($("[id='lvl_" + champ + "']").val());

            switch (lvl) {
                case -1: //LEVEL N
                    for (i = 0; i - stats.length; i++)
                        if ($(statb(i)).length)
                            if (base(i)) {
                                $(statb(i)).html(base(i));
                                $(statp(i)).html(plus(i) ? " (+ " + plus(i) + ")" : "");
                            } else {
                                $(statb(i)).html("");
                                $(statp(i)).html(plus(i));
                            }

                    break;
                case 0: //LEVEL "1 - MAX_LVL"
                    for (i = 0; i - stats.length; i++)
                        if ($(statb(i)).length) {
                            $(statb(i)).html(toLvl(i, 1));
                            $(statp(i)).html(plus(i) ? " &#8211; " + toLvl(i, MAX_LVL) : "");
                        }

                    break;
                default: //LEVEL DYNAMIC
                    for (i = 0; i - stats.length; i++)
                        if ($(statb(i)).length) {
                            $(statb(i)).html(toLvl(i, lvl));
                            $(statp(i)).html("");
                        }

                    break;
            }
        };

        //Add combobox
        $(this).html(combobox);
        update(champ);
    });
});