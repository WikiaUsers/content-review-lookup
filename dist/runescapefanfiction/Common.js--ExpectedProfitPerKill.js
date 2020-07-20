var priceList = [], rarityList = [];
 
$( '.expectedProfitPerKill' ).each( function () {
retrieveInfo();
finalSum();
});
 
function finalSum()
{
	var sum = 0, temp,
		questionImg = $( '<a>' ).attr(
			{href: 'http://runescapefanfiction.wikia.com/wiki/Expected_profit_per_kill_calculation',
             title: 'Click here to see how this value is calculated'
            }
		).append(
			$( '<img>' ).attr( {
			src: 'https://images.wikia.nocookie.net/runescapefanfiction/images/7/74/Monster_infobox_question_mark.png',
			width: 20,
			height: 20,
			alt: '[?]'
			} )
		);
	for ( var i in priceList )
	{
		temp = (priceList[i]*rarityList[i]);
		sum += temp;
	}
	$( '.expectedProfitPerKill' ).css({ 'color': 'green',
										'font-style':'bold'}).text(addCommas(Math.round(sum))+" coins").append(questionImg);
	return sum;
}
 
function addCommas(nStr) 
{
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
 
function retrieveInfo()
{
	$('.dropstable tr').each(function() {
		//retrieve the exchange values from the Exchange price cell in each row
		var val = this.cells[4].innerHTML.replace(/,/g,'');
 
		if (parseInt(val))
		{
			if(val.indexOf('–') == -1)
			{ priceList.push(parseInt(val)); }
			else
			{ 
				var temp = val.split('–');
				var average = (parseInt(temp[0])+parseInt(temp[1]))/2;
				priceList.push(average);
			}
 
			//retrieves the Probabilities from the Rairity cell in each row
			var Rarity = (this.cells[3].innerHTML.toLowerCase());
			rarityList.push(retrieveProbability(Rarity));
		}
	});
}
 
function retrieveProbability(Rarity)
{
	if(Rarity.indexOf('uncommon') != -1)
		return (1/30);
	else if(Rarity.indexOf('very rare') != -1)
		return (1/5000);
	else if(Rarity.indexOf('extremely rare') != -1)
		return (1/50000);
	else if(Rarity.indexOf('always') != -1)
		return 1;
	else if(Rarity.indexOf('common') != -1)
		return (1/10);
	else if(Rarity.indexOf('rare') != -1)
		return (1/250);
	else
		return 0;
}