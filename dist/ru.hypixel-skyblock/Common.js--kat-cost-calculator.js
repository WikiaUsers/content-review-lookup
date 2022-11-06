// Author: Flachdachs
// Taken from User:Flachdachs/common.js
$(function() {
    // Kat pet rarity leveling cost calculator
    // insert into a page: <div id="kat-cost-calculator"></div>
    var $anchor = $('#kat-cost-calculator');
    if (!$anchor) return;
 
    var $label = $('<label for="pet-level">Уровень вашего питомца:</label>');
    var $petLevel = $('<input id="pet-level" type="number" min="1" max="100">').on('input', calculate);
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($petLevel));
 
    $label = $('<label for="cost-base-price">Базовая цена в соответствии с приведенной ниже таблицей</label>');
    var $basePrice = $('<input id="cost-base-price" type="number">').on('input', calculate);
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($basePrice)
            .append(' coins'));
 
    $label = $('<label for="cost-cost">Стоимость Кэт:</label>');
    var $cost = $('<output id="cost-cost" style="border:1px solid gray; background-color:lightgray; color:black; display:inline-block; min-width:10em">');
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($cost.html('&nbsp;'))
            .append(' coins'));
 
    function calculate() {
        var petLevel = parseInt($petLevel.val());
        var basePrice = parseInt($basePrice.val());
        var cost = (!isNaN(petLevel) && !isNaN(basePrice)) ?
            basePrice - 0.003 * basePrice * petLevel : '&nbsp;';
        $cost.html(cost);
    }
});
 
$(function() {
    // Kat pet rarity leveling base price calculator
    // insert into a page: <div id="kat-base-calculator"></div>
    var $anchor = $('#kat-base-calculator');
    if (!$anchor) return;
 
    var $label = $('<label for="base-pet-level">Уровень вашего питомца:</label>');
    var $petLevel = $('<input id="base-pet-level" type="number" min="1" max="100">').on('input', calculate);
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($petLevel));
 
    $label = $('<label for="base-cost">Стоимость Кэт:</label>');
    var $cost = $('<input id="base-cost" type="number">').on('input', calculate);
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($cost)
            .append(' coins'));
 
    $label = $('<label for="cost">Базовая цена:</label>');
    var $basePrice = $('<output id="base-base-price" style="border:1px solid gray; background-color:lightgray; color:black; display:inline-block; min-width:10em">');
    $anchor.append(
        $('<p>')
            .append($label)
            .append('&nbsp;')
            .append($basePrice.html('&nbsp;'))
            .append(' coins'));
 
    function calculate() {
        var petLevel = parseInt($petLevel.val());
        var cost = parseInt($cost.val());
        var basePrice = (!isNaN(petLevel) && !isNaN(cost)) ?
            - ( 1000 * cost / (3 * petLevel - 1000) ) : '&nbsp;';
        $basePrice.html(basePrice);
    }
});