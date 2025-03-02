//скрипт додає клас 'current-bounty-rotation' до стовпця активної ротації контракту,
//а також виводить час до завершення

$(function() {
	const PAGE = mw.config.get("wgPageName");
	const IMG_URL = 'https://static.wikia.nocookie.net/warframe/images/';
	const IMG_PREFIX = '/revision/latest?path-prefix=uk';
	const WIKI_URL = 'https://warframe.fandom.com/uk/wiki/';
	const WHITELIST_PAGES = [ "Контракти", "Контракт" ];
	const ICONS = {
		'reputation': 'b/b1/Репутація_іконка_uk.png',
		'motherToken': '3/3d/Медальйон_Матері_uk.png',
	};
	const ISOVAULT_IDS = {
		'NecraliskBounty7': 'IsolationVault1',
		'NecraliskBounty8': 'IsolationVault2',
		'NecraliskBounty9': 'IsolationVault3',
		'ArcanaIsoVaultBounty1': 'IsolationVault1',
		'ArcanaIsoVaultBounty2': 'IsolationVault2',
		'ArcanaIsoVaultBounty3': 'IsolationVault3',
	};
	const BOUNTY_IDS = {
		'Ostron':"CetusBounty", 
		'Entrati':"NecraliskBounty",
		'Solaris United':"FortunaBounty",
		'Plague Star':"PlagueStar",
		'Ghoul Purge':"GhoulBounty"
	};
	const ROT_NUMBER = {
		'A':"1", 
		'B':"2",
		'C':"3"
	};
	const PLAGUE_STAR_TIER = [
		['З', 'звичайний'],
		['У', 'ускладнений'],
		['ШС', '«Шлях сталі»']
	];
	if (WHITELIST_PAGES.includes(PAGE)) {
	$.get('https://api.tenno.tools/worldstate/pc', function (data) {
		$.each(data.bounties.data, function(_, syndicateData) {
			if (BOUNTY_IDS[syndicateData.syndicate] && data.bounties.time >= syndicateData.start) {
				$.each(syndicateData.jobs, function(i, bounty) {
					var isEntrati = syndicateData.syndicate === 'Entrati',
						isPlagueStar = syndicateData.syndicate === 'Plague Star',
						bountyID = isPlagueStar ? 'PlagueStar' : BOUNTY_IDS[syndicateData.syndicate] + (i + 1);
					bountyID = ISOVAULT_IDS[bountyID] || bountyID;
					$('.bounty').each(function() {
						var tableID = $(this)[0].id.replace(/\-./, ''),
							endTime = syndicateData.end * 1000;
						if ((ISOVAULT_IDS[tableID] || tableID) == bountyID) {
							if (bounty.rotation) {
								$(this).find('tr:nth-child(2) th:nth-child('+ ROT_NUMBER[bounty.rotation] +') a')
								.addClass('current-bounty-rotation')
								.parent().append(
									$('<span>', {
										'data-time': endTime,
										title: 'Закінчиться ' + new Date(endTime).toLocaleString(),
									})
								);
							}
							$stageTh = $(this).find('tr th[colspan=6]');
							if ($stageTh.length) {
								var tableLength = $stageTh.length;
								$stageTh.each(function(i1, th) {
									var additionalReward = (i1 == tableLength - 1) ? bounty.xpAmounts[bounty.xpAmounts.length-1] : bounty.xpAmounts[i1],
										additionalRewardBonus = Math.floor(additionalReward * 0.25),
										plagueStarBonus = 25 * ((i >= 1 ? i+1 : i) + 1),
										plagueStarStanding = 100 * ((i >= 1 ? i+1 : i) + 1),
										rewardSum = additionalReward + (isPlagueStar ? (i1 != 1 ? 0 : plagueStarBonus + plagueStarStanding) : additionalRewardBonus),
										rewardSumText = (isPlagueStar ? PLAGUE_STAR_TIER[i][0] + ':\xa0' : '') + '+' + (rewardSum).toLocaleString(),
										rewardSumTitle = (isPlagueStar && i1 == 1 ? 
										'За завершення етапу 2 ('+ PLAGUE_STAR_TIER[i][1] + '): ' + additionalReward.toLocaleString() + ', завершення етапу 3 ('+ PLAGUE_STAR_TIER[i][1] + '): ' + plagueStarStanding 
										: 'За завершення етапу' +  (isPlagueStar ? ' ('+ PLAGUE_STAR_TIER[i][1] + ')' : '') + ': ' + additionalReward.toLocaleString()) +
											(isPlagueStar ? (i1 != 1 ? '' : ', за виконання додаткової цілей на етапі 3 ще +' + plagueStarBonus) : ', за виконання додаткових цілей ще +' +  additionalRewardBonus.toLocaleString());
									$(th).append(
										$('<span>', {
											append: [
												' (',
												$('<span>', {
													text: rewardSumText,
													title: rewardSumTitle,
													css: {'border-bottom': '1px dotted gray'}
												}),
												$('<img>', {
													class: 'icon ' + (isEntrati ? '' : 'dark-invert'),
													src: IMG_URL +
													(isEntrati ? ICONS.motherToken : ICONS.reputation ) +
													IMG_PREFIX,
													title: isEntrati ? 'Медальйон Матері' : 'Репутація',
													href: WIKI_URL + (isEntrati ? 'Медальйон Матері' : 'Репутація'),
													css: {'cursor': 'pointer'}
												}),
												')'
											]
										})
									);
								});
							}
						}
					});
				});
			}
		});
	});
	setInterval(countdown, 1000);
	}

	function countdown() {
		var now = new Date().getTime();
    	$( 'table.bounty span[data-time]' ).each( function () {
			var countDownDate = $( this ).attr('data-time'),
				distance = countDownDate - now,
				days = Math.floor(distance / (1000 * 60 * 60 * 24)),
				hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
				seconds = Math.floor((distance % (1000 * 60)) / 1000),
				timer = 
					(hours > 0 ? hours + " год " : '') + 
					(minutes > 0 ? minutes + " хв" : '') + 
					(hours <=0 ? ' ' + seconds + " c" : '');

			$( this ).text( '(' + timer + ')');
			if (seconds < 0) { $( this ).text('(закінчилось ' + timer + ')'); }
		});
	}
});