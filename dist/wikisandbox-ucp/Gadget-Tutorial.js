$(function() {
	$('.tutorial-button').each(function(i, div) {
		$(div).replaceWith('<button class="tutorial-button" onclick="' + $(div).attr('data-onclick') + '">' + $(div).text() + '</button>');
	});
	window.tutorial = {};
	window.tutorial.start = function(num) {
		var api = new mw.Api();
		api.postWithToken('csrf', {
			action: 'edit',
			text: window.tutorial.levels[String(num)].incorrect,
			title: 'User:' + mw.user.getName() + '/tutorial' + num,
			summary: mw.user.getName() + ' starts tutorial' + num
		}).then(function(res) {
			window.location.pathname = 'User:' + mw.user.getName() + '/tutorial' + num;
		}).fail(function(err) { console.error(err); });
	};
	
	window.tutorial.check = function(num) {
		var api = new mw.Api();
		api.get({
			action: 'parse',
			page: 'User:' + mw.user.getName() + '/tutorial' + num,
			prop: 'wikitext',
			format: 'json'
		}).then(function(res) {
			var text = res.parse.wikitext['*'];
			if (window.tutorial.levels[String(num)].checks(text)) return alert('I think you missed something...');
			else if (text.includes(window.tutorial.levels[String(num)].correct)) {
				if (!confirm('Success! You fixed the errors!\n\nClick OK to move onto the next level!')) return;
			} else return console.log('incorrect!');
			window.tutorial.start(num + 1);
		}).fail(function(err) { console.error(err); });
	};
	
	window.tutorial.levels = {
		'1': {
			checks: function(text) {
				return (text.includes('comon') || text.includes('txture') || text.includes('bocks'));
			},
			incorrect: "=Tutorial Stage 1= \nYour job here will be to correct the '''3''' typos in the following \"page\". Click the 'Edit' button on the top of the page or the 'Edit' button to the right of the header! Click the '''I am done!''' button on the bottom of the page when you have finished!\n\n<br><br>\n==Cobblestone==\n'''Cobblestone''' is a comon block, obtained from mining stone. Its txture resembles block of stone with a largely cracked surface.\n\n'''Mossy cobblestone''' is a variant of cobblestone with moss growing in its cracks. \nBoth bocks are mainly used for crafting or as building blocks.\n\n\n\n<div style=\"text-align: center;\"><div class=\"tutorial-button\" data-onclick=window.tutorial.check(1);\">I am done!</div></div>",
			correct: "==Cobblestone==\n'''Cobblestone''' is a common block, obtained from mining stone. Its texture resembles block of stone with a largely cracked surface.\n\n'''Mossy cobblestone''' is a variant of cobblestone with moss growing in its cracks. \nBoth blocks are mainly used for crafting or as building blocks."
		},
		'2': {
			checks: function(text) {
				return text.includes('Mineraft');	
			},
			incorrect: "=Tutorial Stage 2= \nHere, you have to correct a typo inside what is called a '''[[Template]]'''. These are used to create formatting that is reused over and over on the wiki. Once again, click the '''I am done!''' buttton at the bottom of the page when you are done!<br>\n<br>\nNote that when you fix the typo, the change is reflected throughout the template.\n<br>\n<br>\n==Example Infobox==\n{{Infobox tutorial\n|name = Mineraft\n|creator = Notch\n|date = May 17, 2009\n}}\n\n\n\n<div style=\"text-align: center;\"><div class=\"tutorial-button\" data-onclick=window.tutorial.check(2);\">I am done!</div></div>",
			correct: "==Example Infobox==\n{{Infobox tutorial\n|name = Minecraft\n|creator = Notch\n|date = May 17, 2009\n}}"
		}
	};
});