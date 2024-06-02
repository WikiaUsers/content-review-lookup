var normalButton = '[Normal]';
var normalColor = '#D7EEFD';
var expertButton = '[Expert]';
var expertColor = '#FFE6E6';

if ($('.infoExpert').length > 0){
	$('.statTitle').remove();
	var flagExp = false;
	var $infoNormal = $('.infoNormal');
	var $infoExpert = $('.infoExpert');
	var $switchNormal = $('.switchNormal');
	var $switchExpert = $('.switchExpert');
	$switchNormal.append('<a href="#zzz">'+normalButton+'</a>');
	$switchExpert.append('<a href="#zzz">'+expertButton+'</a>');

	$switchNormal.css('font-weight','bold').css('color','#063B5E');
	$switchExpert.css('font-weight','200').css('color','#063B5E');

	var stats = ['Life', 'Money', 'Damage', 'Knockback', 'AI', 'Defense', 'Stack', 'Power', 'Drops'];

	function doNormal(){
		if (flagExp == true){
			$.each($('.infoNormal'), function(key, value){
				var NPCname = $(this).data('npcname');
				$.each(stats, function(data, stat){
					var npcSelect = '[data-npcname="'+NPCname+'"]';
					if ($('.expert' + stat + npcSelect).length > 0){
						var expValue = $('.expert' + stat + npcSelect).html();
						var normValue = $('.normal' + stat + npcSelect).html();
						$('.normal' + stat + npcSelect).html(expValue).css('background',normalColor);
						if (stat == "Drops"){
							$('.normal' + stat + npcSelect).html(expValue).css('background','#EDF8FE');
						}
						$('.expert' + stat + npcSelect).html(normValue);
					}
				});
				$switchNormal.css('font-weight','bold');
				$switchExpert.css('font-weight','200');
				flagExp = false;
			});
		}
	}

	function doExpert(){
		if (flagExp == false){
			$.each($('.infoNormal'), function(key, value){
				var NPCname = $(this).data('npcname'); 
				$.each(stats, function(data, stat){
					var npcSelect = '[data-npcname="'+NPCname+'"]';
					if ($('.expert' + stat + npcSelect).length > 0){ 
						var expValue = $('.expert' + stat + npcSelect).html();
						var normValue = $('.normal' + stat + npcSelect).html();
						$('.normal' + stat + npcSelect).html(expValue).css('background',expertColor);
						if (stat == "Drops"){
							$('.normal' + stat + npcSelect).html(expValue).css('background','#FFF2F2');
						}
						$('.expert' + stat + npcSelect).html(normValue);
					}
				});
				$switchNormal.css('font-weight','200');
				$switchExpert.css('font-weight','bold');
				flagExp = true;
			});
		}
	}
	$('.switchNormal').click( function(){ doNormal() } );
	$('.switchExpert').click( function(){ doExpert() } );
}