/*
 * This file is responsible for providing functions to calculate experience-related values.
 */
tibiawiki_parent_module('tibiawiki.util.experience', (function () {

    /**
     * Calculates how much experience a character needs to reach a particular level.
     *
     * @param level the character's level.
     * @returns the minimum amount of experience the player has at this level.
     */
    function calculate_experience_for_level(level) {
        return ((50 * Math.pow(lvl - 1, 3) - 150 * Math.pow(lvl - 1, 2) + 400 * (lvl - 1)) / 3);
    }

    return {
        'calculate_experience_for_level': calculate_experience_for_level
    };
}());