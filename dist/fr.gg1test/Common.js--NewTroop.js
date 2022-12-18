/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    //If troop info enabled, enabling the script
    if ($('.troopinfo').length === 0)
        return;
    //Show console information
    console.log('Enabling troop information code...');
$('table div.button[id^=level]').click(function() { //Enable level color button and row
	$('.troops.wikitable tr').each(function() {
		$(this).css("background-color","");
		$(this).css("font-weight","");
	});
	$('table div.button[id^=level]').css('background-image', '');
	$(this).css('background-image','none');
	var ligne = $(this).attr("id");
	$('.' + ligne).css("background-color","#1E7FCB");
	$('.' + ligne).css("font-weight","bold");
});
//Default option
$("#level1").css('background-image',"none");
$("#rage0").css('background-image','none');
$('.troopinfo').find('table:eq(0)').addClass('troops');
$('.troops tr:has(td)').each(function(index) {
		$(this).addClass('level' + (index + 1));
});
$('.level1').css("background-color","#1E7FCB");
$('.level1').css("font-weight","bold");
$('.troops tr[class^=level]').each(function() { //Add default values
        if ($('.dpa').length > 0)
		$(this).find('td').eq(2).attr('default-value',$(this).find('td').eq(2).html());
	$(this).find('td').eq(1).attr('default-value',$(this).find('td').eq(1).html());
});
    for (i=7;i>0;i--) { //Check for each level
        if ($('.level' + i).length === 0) {
            $('#level' + i).remove();
        }
    }
$('.vitesse').attr('default-value', $('.vitesse').html());
$('table div.button[id^=rage]').click(function() { //Add rage informations
	$('table div.button[id^=rage]').css('background-image', '');
	$(this).css('background-image','none');
	console.log($(this).attr('id').substring(4,5));
	var bonus = parseInt($(this).attr('id').substring(4,5)) / 10 + 2.2;
	if (bonus > 2.2) {
	$('.vitesse').html(parseInt($('.vitesse').attr('default-value')) + (parseInt($(this).attr('id').substring(4,5)) * 2 + 18));
	console.log("Bonus : " + bonus);
	$('.troops tr[class^=level]').each(function() {
		console.log($(this));
		$(this).find('td').eq(1).html(Math.round(parseInt($(this).find('td').eq(1).attr('default-value')) * bonus * 10) / 10);
		$(this).find('td').eq(1).css('background-color','#F400A1');
		if ($('.dpa').length > 0) {
		$(this).find('td').eq(2).html(Math.round($(this).find('td').eq(1).html() * $('.dpa').html() * 100) / 100);
		$(this).find('td').eq(2).css('background-color','#9900CC');
		}
	});
	} else {
	$('.vitesse').html($('.vitesse').attr('default-value'));
	console.log("Bonus : " + bonus);
	$('.troops tr[class^=level]').each(function() {
		console.log($(this));
		$(this).find('td').eq(1).html($(this).find('td').eq(1).attr('default-value'));
		$(this).find('td').eq(1).css('background-color','');
		if ($('.dpa').length > 0) {
        $(this).find('td').eq(2).html($(this).find('td').eq(2).attr('default-value'));
		$(this).find('td').eq(2).css('background-color','');
		}
	});
	}
});
});