/* Класс для всплывающих изображений */
window.tooltips_list = [
    {   classname: 'ttimg',
        parse: '[[<#parameter1#>|<#parameter2#>px]]',
		delay: 300,
	},
];

//Масштабирование карты и маркеров
$('<input type="radio" name="radio" value="1" checked>x1</input>').appendTo('#scale');
$('<input type="radio" name="radio" value="2">x2</input>').appendTo('#scale');
$('<input type="radio" name="radio" value="3">x3</input>').appendTo('#scale');
$(':radio').change(function(){
$mapScale = 50 * $(this).val() - 50 + "%";
$markerScale = 1 - 0.25 * $(this).val() + 0.25;
$('#map').css('transform', 'translate('+$mapScale+', '+$mapScale+') scale('+$(this).val()+')');
$('.marker').css('transform', 'translate(-10%, -10%) scale('+$markerScale+')');
});

//Добавление флажков в легенду
var check = $('.check');
$('.check').click(function() {
$(this).attr('checked', !$(this).attr('checked'));
$(this).attr('checked') ? $('.' + this.id).show(200) : $('.' + this.id).hide(200);
    var checked = $('.check[checked]').length;
        $('#allMarkers').attr('checked', checked == check.length);
});
$('#allMarkers').click(function() {
$(this).attr('checked', !$(this).attr('checked'));
if($(this).attr('checked')) {
    $('.check').each(function(){
    $(this).attr('checked', 'checked');  
    });
    } else {
    $('.check').each(function(){
    $(this).removeAttr('checked');  
    });
    }
    $(this).attr('checked') ? $('.marker').show(200) : $('.marker').hide(200);
});