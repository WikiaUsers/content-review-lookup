function generate_card_price_calculator() {
    if (!$('#sgs-t5-tpl-card-price-cal').length) {
        return;
    }
    
    var html = '';
    
    var prices = $('#sgs-t5-tpl-card-price-cal #cpc-rarity p').text();
    prices = JSON.parse(prices);
 
    html += '<select>';
        html += '<option value="' + prices.common + '">Common</option>';
        html += '<option value="' + prices.rare + '">Rare</option>';
        html += '<option value="' + prices.epic + '">Epic</option>';
        html += '<option value="' + prices.legendary + '">Legendary</option>';
    html += '</select>';
    
    $('#sgs-t5-tpl-card-price-cal #cpc-rarity').html(html);
    
    html = '<input type="number" value="1" min="1" step="1"/>';
    
    $('#sgs-t5-tpl-card-price-cal #cpc-number').html(html);
}

function calculate_card_price() {
    if (!$('#sgs-t5-tpl-card-price-cal').length) {
        return;
    }
    
    $('#sgs-t5-tpl-card-price-cal #cpc-rarity select, #sgs-t5-tpl-card-price-cal #cpc-number input').change(function(){
        var rarity = $('#sgs-t5-tpl-card-price-cal #cpc-rarity select').val();
        var number = $('#sgs-t5-tpl-card-price-cal #cpc-number input').val();
        var price = rarity * number;
        
        $('#sgs-t5-tpl-card-price-cal #cpc-total').html(price);
    }).change();
}

function toggle_navigation() {
    if (!$('.sgs-t5-tpl-navigation').length) {
        return;
    }
 
    $('.sgs-t5-tpl-navigation .nav-title span').click(function() {
        var toggle_target = $(this).attr('data-toggle');
        toggle_target = '.' + toggle_target;
 
        if ($(toggle_target).length) {
            $(toggle_target).slideToggle();
 
            var btn_label = $(this).text() == '[ Show ]' ? '[ Hide ]' : '[ Show ]';
            $(this).text(btn_label);
        }
    });
 
    if ($('.sgs-t5-tpl-navigation table tr td ul li .selflink').length) {
        var display_target = $('.sgs-t5-tpl-navigation table tr td ul li .selflink').closest('.item-section').find('.nav-title>span').click();
        $('.sgs-t5-tpl-navigation>.nav-title:first-child>span').click();
    }
}
    
$(document).ready(function() {
    generate_card_price_calculator();
    calculate_card_price();
    toggle_navigation();
});