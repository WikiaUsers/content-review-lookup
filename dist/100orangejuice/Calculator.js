/* Calculator script for [[Co-op Reward Modifier]] */
mw.hook('wikipage.content').add(function($content) {
	'use strict';

	var calculator = $content.find('#calculator:not(.loaded)')[0];
	if (!calculator) return;
	calculator.classList.add('loaded');

	var values = {
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
	};

	function mixer(label, id) {
		return '<tr class="crc-mixer">' +
		'<th>' + label + ' mixer</th>' +
		'<td>' +
			'<input type="radio" id="crc-positive' + id + '" name="mixer' + id + '" value="positive" checked>' +
			'<label for="crc-positive' + id + '">None/Positive</label>' +
			'<input type="radio" id="crc-neutral' + id + '" name="mixer' + id + '" value="neutral">' +
			'<label for="crc-neutral' + id + '">Neutral</label>' +
			'<input type="radio" id="crc-negative' + id + '" name="mixer' + id + '" value="negative">' +
			'<label for="crc-negative' + id + '">Negative</label>' +
		'</td>' +
	'</tr>';
	}

	var calc = document.createElement('table');
	calc.id = 'crc-calc';
	calc.className = 'wikitable crc-win crc-chaptermax';
	calc.innerHTML = '<tr>' +
		'<th>Match outcome</th>' +
		'<td>' +
			'<input type="radio" id="crc-win" name="outcome" value="win" checked>' +
			'<label for="crc-win">Win</label>' +
			'<input type="radio" id="crc-loss" name="outcome" value="loss">' +
			'<label for="crc-loss">Loss</label>' +
			'<span id="crc-chaptertext"> at chapter ' +
				'<input type="number" id="crc-chapter" value="30" min="1" max="30" size="2" disabled>' +
				'<span id="crc-chaptermaxtext"> or later</span>' +
			'</span>' +
		'</td>' +
	'</tr>' +
	'<tr>' +
		'<th>Difficulty</th>' +
		'<td>' +
			'<input type="radio" id="crc-casual" name="difficulty" value="casual">' +
			'<label for="crc-casual">Casual</label>' +
			'<input type="radio" id="crc-normal" name="difficulty" value="normal" checked>' +
			'<label for="crc-normal">Normal</label>' +
			'<input type="radio" id="crc-extreme" name="difficulty" value="extreme">' +
			'<label for="crc-extreme">Extreme</label>' +
			'<input type="radio" id="crc-hyper" name="difficulty" value="hyper">' +
			'<label for="crc-hyper">Hyper</label>' +
		'</td>' +
	'</tr>' +
	'<tr id="crc-mixers">' +
		'<th></th>' +
		'<td>' +
			'<input type="checkbox" id="crc-mixers-on" checked>' +
			'<label for="crc-mixers-on"><b>Enable mixers</b></label>' +
		'</td>' +
	'</tr>' +
	mixer('First', 1) +
	mixer('Second', 2) +
	mixer('Third', 3) +
	'<tr>' +
		'<th></th>' +
		'<td>' +
			'<input type="checkbox" id="crc-doublexp" unchecked>' +
			'<label for="crc-doublexp">Enable Double XP Event</label>' +
		'</td>' +
	'</tr>' +
	'<tr>' +
		'<th>Oranges rewarded</th>' +
		'<td id="crc-oranges">7</td>' +
	'</tr>' +
	'<tr>' +
		'<th>Role XP rewarded</th>' +
		'<td id="crc-xp">120</td>' +
	'</tr>';

	calculator.append(calc);

	var win = $content.find('#crc-win')[0];
	var loss = $content.find('#crc-loss')[0];
	var chapter = $content.find('#crc-chapter')[0];
	var mixersOn = $content.find('#crc-mixers-on')[0];
	var doublexp = $content.find('#crc-doublexp')[0];
	var oranges = $content.find('#crc-oranges')[0];
	var xp = $content.find('#crc-xp')[0];
	var mixers = calc.querySelectorAll('.crc-mixer input');

	function updateChapter() {
		if (calc.querySelector('input[name="outcome"]:checked').value === 'loss') {
			calc.classList.remove('crc-win');
			chapter.disabled = false;
		} else {
			calc.classList.add('crc-win');
			chapter.disabled = true;
		}
	}
	win.addEventListener('change', updateChapter);
	loss.addEventListener('change', updateChapter);
	
	chapter.addEventListener('input', function() {
		if (chapter.value > 29) {
			calc.classList.add('crc-chaptermax');
		} else {
			calc.classList.remove('crc-chaptermax');
		}
	});

	chapter.addEventListener('focusout', function() {
		var lossChapter = chapter.value;
		if (typeof(Number(lossChapter)) !== 'number' || lossChapter > 30) {
			chapter.value = 30;
		} else if (lossChapter < 1) {
			chapter.value = 1;
		} else if (Math.floor( lossChapter ) !== Number( lossChapter )) {
			chapter.value = Math.floor(lossChapter);
		}
	});

	mixersOn.addEventListener('change', function() {
		for (var i=0; i<mixers.length; i++) {
			mixers[i].disabled = !mixersOn.checked;
		}
	});

	function inputFunc() {
		var outcomeModifier = 1.2; // modifier for a win
		if (calc.querySelector('input[name="outcome"]:checked').value === 'loss') {
			var lossChapter = chapter.value;
			if (typeof(Number(lossChapter)) !== 'number' || Math.floor(lossChapter) !== Number(lossChapter) || lossChapter < 1) {
				oranges.innerHTML = '<span class="error">Error</span>';
				xp.innerHTML = '<span class="error">Error</span>';
				return;
			}
			outcomeModifier = Math.min( lossChapter, 30 ) * ( 0.1 / 3 );
		}

		var modifiedOrangesBase = 6 * outcomeModifier;
		var modifiedXpBase = 100 * outcomeModifier;

		var otherModifiers = values.difficulty[calc.querySelector('input[name="difficulty"]:checked').value];
		if (mixersOn.checked) {
			for ( var i=0; i<mixers.length; i++ ) {
				otherModifiers += mixers[i].checked ? values.mixer[mixers[i].value] : 0;
			}
		}
		
		var eventModifiers = 1;
		if (doublexp.checked) eventModifiers++;

		oranges.innerHTML = Math.trunc( modifiedOrangesBase * otherModifiers );

		xp.innerHTML = Math.trunc( Math.trunc( modifiedXpBase * otherModifiers ) * eventModifiers );
	}
	var calcInput = calc.getElementsByTagName('input');
	for (var i=0; i<calcInput.length; i++) {
		calcInput[i].addEventListener('change', inputFunc);
	}
});