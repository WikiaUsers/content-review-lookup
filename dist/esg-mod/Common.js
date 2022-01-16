/* Hover Preview */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/esg-mod/images/e/e0/ES2_Icon.png/revision/latest?cb=20211217044035';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/esg-mod/images/e/e0/ES2_Icon.png/revision/latest?cb=20211217044035';
window.pPreview.RegExp.onlyinclude = ['.preview-content'];

/* Sketchfab Embed */
mw.hook('wikipage.content').add(function ($content) {
    if (!$content.find('.sfab').length) return;
    var defaults = {
            width: 640,
            height: 480,
            frameborder: 0,
            allow: '"autoplay; fullscreen; vr"'
        },
        src = 'https://sketchfab.com/models/(src)/embed';
    $content.find('.sfab').each(function () {
        var $el, $this = $(this), data = this.dataset;
        if (!data || !data.id) return;
        $el = $('<iframe>', {
            src: src.replace('(src)', data.id),
            width: data.width || defaults.width,
            height: data.height || defaults.height,
            frameborder: data.frameborder || defaults.frameborder,
            allow: data.allow || defaults.allow
        });
        $this.append($el);
    });
});

/* Arcology Admin Calculator */
/* Credit to Chocolina#7949 on Discord */
(function() {
	var ui;
	var container = $('#autonomous-calculator');

	if (container.length !== 1 || container[0].childNodes.length > 0) return;

	function init(lib) {
		ui = lib;
		var prefix = 'autonomous-calculator-';
		var fields = ['iE','GS'];
		var labels = {
			iE: 'Total in Empire',
			GS: 'Game Speed Multiplier',
		};
		var inputs = {};

		fields.forEach(function(k) {
			var input = ui.input({
				id: prefix + k
			})
			var row = ui.div({
				children: [
					ui.label({
						text: labels[k] + ': ',
						for: prefix + k
					}),
					input
				]
			});
			inputs[k] = input;
			container.append(row);
		});

		var output = ui.span({
			id: 'autonomous-calculator-result'
		});

		function getValue(k) {
			return parseFloat(inputs[k].value);
		}

		function calculate(ev) {
			ev.preventDefault();
			var a = {};
			fields.forEach(function(k) {
				a[k] = getValue(k)
			});
			var dps = 6000 * (1 + a.iE) * a.GS;
			output.textContent = dps;
		}

		container.append([
			ui.div({
				children: [
					ui.b({
						text: 'Result: '
					}),
					output
				]
			}),
			ui.button({
				events: {
					click: calculate
				},
				text: 'Calculate'
			})
		]);

	}

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:Dorui.js'
	})

	mw.hook('doru.ui').add(init);
})();

/* Autonomous Admin Calculator */
/* Credit to Chocolina#7949 on Discord */
(function() {
	var ui;
	var container = $('#arcology-calculator');

	if (container.length !== 1 || container[0].childNodes.length > 0) return;

	function init(lib) {
		ui = lib;
		var prefix = 'arcology-calculator-';
		var fields = ['iE','iS','GS'];
		var labels = {
			iE: 'Total in Empire',
			iS: 'Total on System',
			GS: 'Game Speed Multiplier',
		};
		var inputs = {};

		fields.forEach(function(k) {
			var input = ui.input({
				id: prefix + k
			})
			var row = ui.div({
				children: [
					ui.label({
						text: labels[k] + ': ',
						for: prefix + k
					}),
					input
				]
			});
			inputs[k] = input;
			container.append(row);
		});

		var output = ui.span({
			id: 'arcology-calculator-result'
		});

		function getValue(k) {
			return parseFloat(inputs[k].value);
		}

		function calculate(ev) {
			ev.preventDefault();
			var a = {};
			fields.forEach(function(k) {
				a[k] = getValue(k)
			});
			var dps = (2000 * (1 + a.iE) * (1 + a.iS)) * a.GS;
			output.textContent = dps;
		}

		container.append([
			ui.div({
				children: [
					ui.b({
						text: 'Result: '
					}),
					output
				]
			}),
			ui.button({
				events: {
					click: calculate
				},
				text: 'Calculate'
			})
		]);

	}

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:Dorui.js'
	})

	mw.hook('doru.ui').add(init);
})();