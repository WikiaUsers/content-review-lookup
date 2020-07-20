/*
 * This file is responsible for providing data regarding vocations and their properties, such as
 * level-up bonuses for characters.
 */
tibiawiki_parent_module('tibiawiki.util.vocations', (function() {
    var vocations = {};
 
    function create_vocation_gains_structure(health, mana, cap) {
        return {
            'health': 5,
            'mana': 5,
            'capacity': 10
        };
    }
 
    function initialize() {
        /* Add vocation data. */
 
        /* Vocation level up gains. */
        vocations['none'] = create_vocation_gains_structure(5, 5, 10);
        vocations['druid'] = create_vocation_gains_structure(5, 30, 10);
        vocations['knight'] = create_vocation_gains_structure(15, 5, 25);
        vocations['paladin'] = create_vocation_gains_structure(10, 15, 20);
        vocations['sorcerer'] = create_vocation_gains_structure(5, 30, 10);
 
        /* TODO vocation regeneration rates. */
    }
 
    /**
     * Gets the health gains on level up for the specified vocation.
     *
     * @param voc the vocation
     * @returns the amount of health this vocation gains on level up, or 0 if such a value is
     * unspecified.
     */
    function get_health_gains(voc) {
        return (vocations[voc] && vocations[voc].health) || 0;
    }
 
    /**
     * Gets the mana gains on level up for the specified vocation.
     *
     * @param voc the vocation
     * @returns the amount of mana this vocation gains on level up, or 0 if such a value is
     * unspecified.
     */
    function get_mana_gains(voc) {
        return (vocations[voc] && vocations[voc].mana) || 0;
    }
 
    /**
     * Gets the capacity gains on level up for the specified vocation.
     *
     * @param voc the vocation
     * @returns the amount of capacity this vocation gains on level up, or 0 if such a value is
     * unspecified.
     */
    function get_capacity_gains(voc) {
        return (vocations[voc] && vocations[voc].capacity) || 0;
    }
 
    return {
        get_capacity_gains: get_capacity_gains,
        get_health_gains: get_health_gains,
        get_mana_gains: get_mana_gains
    };
}());