/* Calculator script for [[Co-op Reward Modifier]] */
(function(mw) {
	'use strict';

	var calcID = 0,
		values = {
			difficulty: {
				casual: 0.75,
				normal: 1,
				extreme: 1.25,
				hyper: 1.5
			},
			mixer: {
				positive: 0,
				neutral: 0.1,
				negative: 0.25
			}
		},
		html = '<table class="wikitable crc-calc crc-win crc-chaptermax"><tr>' +
			'<th>Match outcome</th>' +
			'<td>' +
				'<input type="radio" id="crc-win$0" name="outcome$0" value="win" checked>' +
				'<label for="crc-win$0">Win</label>' +
				'<input type="radio" id="crc-loss$0" name="outcome$0" value="loss">' +
				'<label for="crc-loss$0">Loss</label>' +
				'<span class="crc-chaptertext"> at chapter ' +
					'<input type="number" class="crc-chapter" value="30" min="1" max="30" size="2" disabled>' +
					'<span class="crc-chaptermaxtext"> or later</span>' +
				'</span>' +
			'</td>' +
		'</tr>' +
		'<tr>' +
			'<th>Difficulty</th>' +
			'<td>' +
				'<input type="radio" id="crc-casual$0" name="difficulty$0" value="casual">' +
				'<label for="crc-casual$0">Casual</label>' +
				'<input type="radio" id="crc-normal$0" name="difficulty$0" value="normal" checked>' +
				'<label for="crc-normal$0">Normal</label>' +
				'<input type="radio" id="crc-extreme$0" name="difficulty$0" value="extreme">' +
				'<label for="crc-extreme$0">Extreme</label>' +
				'<input type="radio" id="crc-hyper$0" name="difficulty$0" value="hyper">' +
				'<label for="crc-hyper$0">Hyper</label>' +
			'</td>' +
		'</tr>' +
		'<tr id="crc-mixers$0">' +
			'<th></th>' +
			'<td>' +
				'<input type="checkbox" id="crc-mixers-on$0" checked>' +
				'<label for="crc-mixers-on$0"><b>Enable mixers</b></label>' +
			'</td>' +
		'</tr>$1' +
		'<tr>' +
			'<th></th>' +
			'<td>' +
				'<input type="checkbox" id="crc-doublexp$0" unchecked>' +
				'<label for="crc-doublexp$0">Enable Double XP Event</label>' +
			'</td>' +
		'</tr>' +
		'<tr>' +
			'<th>Oranges rewarded</th>' +
			'<td class="crc-oranges">7</td>' +
		'</tr>' +
		'<tr>' +
			'<th>Role XP rewarded</th>' +
			'<td class="crc-xp">120</td>' +
		'</tr></table>';

	function mixer(label, id) {
		return '<tr class="crc-mixer">' +
		'<th>' + label + ' mixer</th>' +
		'<td>' +
			'<input type="radio" id="crc-positive$0' + id + '" name="mixer$0' + id + '" value="positive" checked>' +
			'<label for="crc-positive$0' + id + '">None/Positive</label>' +
			'<input type="radio" id="crc-neutral$0' + id + '" name="mixer$0' + id + '" value="neutral">' +
			'<label for="crc-neutral$0' + id + '">Neutral</label>' +
			'<input type="radio" id="crc-negative$0' + id + '" name="mixer$0' + id + '" value="negative">' +
			'<label for="crc-negative$0' + id + '">Negative</label>' +
		'</td>' +
	'</tr>';
	}

	function updateChapter(ele, id) {
		if (ele.calc.querySelector('input[name="outcome' + id + '"]:checked').value === 'loss') {
			ele.calc.classList.remove('crc-win');
			ele.chapter.disabled = false;
		} else {
			ele.calc.classList.add('crc-win');
			ele.chapter.disabled = true;
		}
	}

	function inputFunc(ele, id) {
		var outcomeModifier = 1.2; // modifier for a win
		if (ele.calc.querySelector('input[name="outcome' + id + '"]:checked').value === 'loss') {
			var lossChapter = ele.chapter.value;
			if (typeof(Number(lossChapter)) !== 'number' || Math.floor(lossChapter) !== Number(lossChapter) || lossChapter < 1) {
				ele.oranges.innerHTML = '<span class="error">Error</span>';
				ele.xp.innerHTML = '<span class="error">Error</span>';
				return;
			}
			outcomeModifier = Math.min( lossChapter, 30 ) * ( 0.1 / 3 );
		}

		var modifiedOrangesBase = 6 * outcomeModifier,
			modifiedXpBase = 100 * outcomeModifier,
			otherModifiers = values.difficulty[ele.calc.querySelector('input[name="difficulty' + id + '"]:checked').value],
			eventModifiers = 1;

		if (ele.mixersOn.checked) {
			for ( var i=0; i<ele.mixers.length; i++ ) {
				otherModifiers += ele.mixers[i].checked ? values.mixer[ele.mixers[i].value] : 0;
			}
		}

		if (ele.doublexp.checked) eventModifiers++;

		ele.oranges.innerHTML = Math.trunc( modifiedOrangesBase * otherModifiers );

		ele.xp.innerHTML = Math.trunc( Math.trunc( modifiedXpBase * otherModifiers ) * eventModifiers );
	}
	mw.hook('wikipage.content').add(function($content) {
		$content.find('.calculator:not(.loaded)').each(function(_, e) {
			calcID++;
			var ID = calcID;
			e.innerHTML = html.replace('$1', mixer('First', 1) + mixer('Second', 2) + mixer('Third', 3)).replaceAll('$0', ID);
			var ele = {
				win: e.querySelector('#crc-win' + ID),
				loss: e.querySelector('#crc-loss' + ID),
				chapter: e.querySelector('.crc-chapter'),
				mixersOn: e.querySelector('#crc-mixers-on' + ID),
				doublexp: e.querySelector('#crc-doublexp' + ID),
				oranges: e.querySelector('.crc-oranges'),
				xp: e.querySelector('.crc-xp'),
				mixers: e.querySelectorAll('.crc-mixer input'),
				calc: e.querySelector('.crc-calc')
			};
			ele.win.addEventListener('change', function() {
				updateChapter(ele, ID);
			});
			ele.loss.addEventListener('change', function() {
				updateChapter(ele, ID);
			});
			
			ele.chapter.addEventListener('input', function() {
				if (ele.chapter.value > 29) {
					ele.calc.classList.add('crc-chaptermax');
				} else {
					ele.calc.classList.remove('crc-chaptermax');
				}
			});
		
			ele.chapter.addEventListener('focusout', function() {
				var lossChapter = ele.chapter.value;
				if (typeof(Number(lossChapter)) !== 'number' || lossChapter > 30) {
					ele.chapter.value = 30;
				} else if (lossChapter < 1) {
					ele.chapter.value = 1;
				} else if (Math.floor( lossChapter ) !== Number( lossChapter )) {
					ele.chapter.value = Math.floor(lossChapter);
				}
			});
		
			ele.mixersOn.addEventListener('change', function() {
				for (var i=0; i<ele.mixers.length; i++) {
					ele.mixers[i].disabled = !ele.mixersOn.checked;
				}
			});
			var calcInput = ele.calc.getElementsByTagName('input');
			for (var i=0; i<calcInput.length; i++) {
				calcInput[i].addEventListener('change', function() {
					inputFunc(ele, ID);
				});
			}
		});
	});
})(window.mediaWiki);