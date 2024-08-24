//Script for adding small calculators to infoboxes.

//First a function to add commas to numbers, credit to http://www.mredkj.com/javascript/numberFormat.html#addcommas
function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
//---------------

var inputwidth = $.browser['webkit']?'45px':'30px';

//First the things that should happen when entering something in the inputs

function killkeyup() {//function for everything that should happen whenever someone enters something in the kill xp input box
	var warn = ''; var warn2 = '';
	if ($('input#monsterCalc').val().search(/[^0-9]/) != '-1') {warn = '<abbr title="Los caracteres no numéricos son ignorados" style="cursor:help;border-bottom:1px dotted #000;">'; warn2 = '</abbr>'}//Setting warn vars so that whenever there is a character other than a number in the input value, it turns the vars into a warning
	var killXP = $('#killXP .fightXP').html();
	var constXP = $('#killXP .constXP').html();
	var inputVal = $('input#monsterCalc').val().replace(/[^0-9]/g, '');
	if (inputVal.length == 0) {//giving the default value when the input is empty, and else giving the calculation.
		$('#monsterCalcResult').html(warn + killXP + ' PE (y ' + constXP + ' experiencia en <a title="Constitución" href="/wiki/Constitución">Constitución</a>)' + warn2);
	} else {
		$('#monsterCalcResult').html(warn + inputVal * killXP + ' PE (y ' + inputVal * constXP + ' experiencia en <a title="Constitución" href="/wiki/Constitución">Constitución</a>)' + warn2);
	}
}

function xpkeyup() {//function for everything that should happen whenever someone enters something in the xp input box
	var warn = ''; var warn2 = '';
	if ($('input#XPCalc').val().search(/[^0-9]/) != '-1') {warn = '<abbr title="Los caracteres no numéricos son ignorados" style="cursor:help;border-bottom:1px dotted #000;">'; warn2 = '</abbr>'}//Setting warn vars so that whenever there is a character other than a number in the input value, it turns the vars into a warning
	var inputVal = $('input#XPCalc').val().replace(/[^0-9]/g, '');
	var XPEach = $('#XPEach .XPEach').html();
	var split = XPEach.split(/, |\//);
	for (i=0; split[i]; i++) {var calc = (calc?calc:'') + (calc?' / ':'') + split[i] * inputVal}
	if (inputVal.length == 0) {//giving the default value when the input is empty, and else giving the calculation.
		$('#XPCalcResult').html(warn + XPEach + warn2);
	} else {
		$('#XPCalcResult').html(warn + calc + warn2);
	}
}


var infoTitle = ' title="Inserte una cantidad para calcular la experiencia ganada por esa cantidad."';
var infoTitle2 = ' title="Inserte una cantidad para calcular el precio por esa cantidad."';
var checkbox = getCookie('communicate') == 0 ? '' : ' checked="checked"';

//Monster killing XP calc

$(document).ready(function(){
	if ($('span#killXP').length != 0) {
		var killXP = $('#killXP .fightXP').html();
		var constXP = $('#killXP .constXP').html();
		$('span#killXP span').attr('style', 'display:none;')//hide the original text, which is replaced by the script's text.
		$('span#killXP').append('<input' + infoTitle + ' id="monsterCalc" type="number" style="width:'+inputwidth+';" value="1" maxlength="5" min="0" max="99999"> <div id="monsterCalcResult" style="display:inline;">' + killXP + ' PE (y ' + constXP + ' experiencia en <a title="Constitución" href="/wiki/Constitución">Constitución</a>)</div>')//inserting the input box and the result element in the infobox
		$('input#monsterCalc').bind('keyup click', killkeyup)//running the function of above when the user entered something in the box
		if ($('span#XPEach').length != 0) {//if there is an xp calc in the infobox too...
			$('#killXP').prepend('<input id="communicateBox" type="checkbox"' + checkbox + 'title="allow this box to communicate with the slayer XP box below">')//adding a checkbox to let the user decide if the boxes should communicate
		$('#monsterCalc').bind('keyup click', function(){
			if ($('#communicateBox').is(':checked')) { 
				$('#XPCalc').val($('#monsterCalc').val())//putting the entered value in the other input too
				killkeyup()//running the other calculator's function too, when the checkbox is checked
				xpkeyup()//running the other calculator's function too, when the checkbox is checked
			}
		})
		}
		$('input#monsterCalc').focus(function(){
			$('input#monsterCalc').select()//select the input's contents when clicked on
		})
	}
})

//Other XP calcs
//see documentation above

$(document).ready(function(){
	if ($('span#XPEach').length != 0) {
		var XPEach = $('#XPEach .XPEach').html()
		$('span#XPEach span').attr('style', 'display:none;')
		$('span#XPEach').append('<input' + infoTitle + ' id="XPCalc" type="number" style="width:'+inputwidth+';" value="1" maxlength="5" min="0" max="99999"> <div id="XPCalcResult" style="display:inline;">' + XPEach + '</div>')
		$('input#XPCalc').bind('keyup click', xpkeyup)
		if ($('span#killXP').length != 0) {
		$('#XPCalc').bind('keyup click', function(){
			if ($('#communicateBox').is(':checked')) { 
				$('#monsterCalc').val($('#XPCalc').val())
				xpkeyup()
				killkeyup()
			}
		})
		}
		$('input#XPCalc').focus(function(){
			$('input#XPCalc').select()
		})
	}
})

//Cookie for checking the checkbox on pageload or not

$(document).ready(function() {
$('#communicateBox').click(function() {
    if ($('#communicateBox').is(':checked')) {
        setCookie('communicate', '1', 365);
    } else {
        setCookie('communicate', '0', 365);
    }
})
})

//GE price calc
var inputwidthge = $.browser['webkit']?'65px':'50px';

$(document).ready(function(){
	if ($('span#GEPrice').length != 0) {
		$('span.GEItem span').attr('style', 'display:none;')//hide the original text, which is replaced by the script's text.
		if ($('span.GEItem span').attr('class')) {//if the GEItem span has a class, that means there are multiple prices on the page, which makes it run a special script
			var i = 1
			$('span.GEItem').each(function(){//for each of the prices, run this script
				$(this).prepend('<input' + infoTitle2 + ' id="GEPriceCalc' + i + '" class="' + i + '" type="number" style="width:'+inputwidthge+';" value="1" maxlength="10" min="0" max="9999999999"> <div id="GEPCalcResult' + i + '" style="display:inline;">' + $('span.GEItem span.' + i).html() + '</div>')//give all of the inputs a different id, each being "GEPriceCalc" with a number, increasing by 1 for each price
				$('input#GEPriceCalc' + i).bind('keyup click', function(){//when text is entered...
					var warn = ''; var warn2 = ''
					if ($(this).val().search(/[^0-9]/) != '-1') {warn = '<abbr title="Los caracteres no numéricos son ignorados" style="cursor:help;border-bottom:1px dotted #000;">'; warn2 = '</abbr>'}//setting the warning vars like above
					if ($(this).val().replace(/[^0-9]/g, '').length == 0) {
						$('#GEPCalcResult' + $(this).attr('class')).html(warn + $('span.GEItem span.' + $(this).attr('class')).html() + warn2)
					} else {
						$('#GEPCalcResult' + $(this).attr('class')).html(warn + addCommas($(this).val().replace(/[^0-9]/g, '') * $('span.GEItem span.' + $(this).attr('class')).html().replace(/[^0-9]/g, '')) + warn2)
					}
				})
				i++
			})
		} else {
			var GEItem = $('span.GEItem span').html()
			if (GEItem && GEItem.search(/[^0-9,]/) == '-1') {//only if there is no other character than a number or a comma in the GE price, the script will run
				$('span.GEItem').append('<input' + infoTitle2 + ' id="GEPriceCalc" type="number" style="width:'+inputwidthge+';" value="1" maxlength="10" min="0" max="9999999999"> <div id="GEPCalcResult" style="display:inline;">' + GEItem + '</div>')
			}
		}
		$('input#GEPriceCalc').bind('keyup click', function(){
			var warn = ''; var warn2 = ''
			if ($('input#GEPriceCalc').val().search(/[^0-9]/) != '-1') {warn = '<abbr title="Los caracteres no numéricos son ignorados" style="cursor:help;border-bottom:1px dotted #000;">'; warn2 = '</abbr>'}
			if ($('input#GEPriceCalc').val().replace(/[^0-9]/g, '').length == 0) {
				$('#GEPCalcResult').html(warn + GEItem + warn2)
			} else {
				$('#GEPCalcResult').html(warn + addCommas($('input#GEPriceCalc').val().replace(/[^0-9]/g, '') * GEItem.replace(/[^0-9]/g, '')) + warn2)//add commas back to the result too after calculating the price
			}
		})
		$('input[id^="GEPriceCalc"]').focus(function(){
			$(this).select()
		})
	}
})