// Taken From: https://hypixel-skyblock.fandom.com/wiki/User:Snoo999/common.js
// Inspired by Flachdachs

 
$(function() {
    var $anchor = $('#ehp-calculator');
    if (!$anchor) return;
 
    var $label = $('<label for="health">Your Health:</label>');
    var $health = $('<input id="health" type="number" min="1" value="100">').on('input', calculate);
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($health));
 
    $label = $('<label for="defense">Your Defense:</label>');
    var $defense = $('<input id="defense" type="number" min="0" value="0">').on('input', calculate);
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($defense));
 
    $label = $('<label for="ehp">Your EHP:</label>');
    var $ehp = $('<output id="ehp" style="border:1px solid gray; background-color:lightgray; color:black; display:inline-block; min-width:10em">');
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($ehp.html('&nbsp;')));
 
    function calculate() {
        var health = parseInt($health.val());
        var defense = parseInt($defense.val());
        var ehp = (!isNaN(health) && !isNaN(defense)) ?
            health * defense / 100 + health : '&nbsp;';
        $ehp.html(ehp);
    }
});
 
$(function() {
    var $anchor = $('#damage-calculator');
    if (!$anchor) return;
 
    var $label = $('<label for="damage">Damage:</label>');
    var $damage = $('<input id="damage" type="number" min="0" value="5">').on('input', calculate);
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($damage));
 
    $label = $('<label for="strength">Strength:</label>');
    var $strength = $('<input id="strength" type="number" min="0" value="0">').on('input', calculate);
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($strength));
 
    $label = $('<label for="critdamage">Crit Damage:</label>');
    var $critdamage = $('<input id="critdamage" type="number" min="0" value="50">').on('input', calculate);
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($critdamage));
 
    $label = $('<label for="multiplier">Multiplier:</label>');
    var $multiplier = $('<input id="multiplier" type="number" min="0" value="0">').on('input', calculate);
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($multiplier));
 
    $label = $('<label for="finaldamage">Final Damage:</label>');
    var $finaldamage = $('<output id="finaldamage" style="border:1px solid gray; background-color:lightgray; color:black; display:inline-block; min-width:10em">');
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($finaldamage.html('&nbsp;')));
 
    $label = $('<label for="finalcritdamage">Final Damage (Crit):</label>');
    var $finalcritdamage = $('<output id="finalcritdamage" style="border:1px solid gray; background-color:lightgray; color:black; display:inline-block; min-width:10em">');
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($finalcritdamage.html('&nbsp;')));
 
    function calculate() {
        var damage = parseInt($damage.val());
        var strength = parseInt($strength.val());
        var critdamage = parseInt($critdamage.val());
        var multiplier = parseInt($multiplier.val());
        var finaldamage = (!isNaN(damage) && !isNaN(strength) && !isNaN(multiplier)) ?
            (damage + Math.floor(strength / 5)) * (strength + 100) / 100 * (multiplier + 100) / 100 : '&nbsp;';
        var finalcritdamage = (!isNaN(damage) && !isNaN(strength) && !isNaN(multiplier) && !isNaN(critdamage)) ?
            (damage + Math.floor(strength / 5)) * (strength + 100) / 100 * (multiplier + 100) / 100 * (critdamage + 100) / 100 : '&nbsp;';
        $finaldamage.html(finaldamage);
        $finalcritdamage.html(finalcritdamage);
    }
});