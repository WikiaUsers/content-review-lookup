/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
/*global mediaWiki:true*/
if (wgNamespaceNumber === 14) {
	(function (module, mw, $) {

		'use strict';

		var stopwordRegex = {
			de: /^(?:ein(?:e[rs])?|der|die|das|vo[nm])\s+/i,
			en: /^(?:the|an?)\s+/i,
			fr: /^(?:du|une?|(?:de\s+)?l[ea]|les)\s+|[ld]'/i,
			nl: /^(?:een|de|die)\s+/i
		}[mw.config.get('wgContentLanguage')];

		if (sessionStorage && sessionStorage.getItem('noSort')) return;

		if (mw.config.get('wgNamespaceNumber') !== 14 ||
			mw.config.get('skin') !== 'oasis' ||
			($.isFunction(module.use) && !module.use()) ||
			(typeof module.cat === 'string' &&
				$.inArray(module.cat, mw.config.get('wgCategories')) === -1)
		) return;

		var pages = $('#mw-pages');
		if (!pages.length || $('.sortkey').length) return;

		var hash = location.hash && location.hash.substring(1, location.hash.length - 2);

		function Title(title, continued, cssClass) {
			this.cssClass = cssClass;
			this.text = title;
			this.continued = continued;
		}

		Title.prototype.toString = function () {
			var text = this.text,
				id = '';
			if (this.continued) {
				text += ' cont.';
			} else {
				id = ' id="' + this.cssClass + ':' + text + '"';
			}
			return '<h3' + id + '>' + text + '</h3>';
		};

		function Link(title, href) {
			this.title = title;
			this.href = href;
		}

		Link.prototype.toString = function () {
			return '<a href="' + this.href + '" title="' + this.title + '">' + this.title + '</a>';
		};

		function List(title, continued, cssClass) {
			this.title = new Title(title, continued, cssClass);
			this.links = [];
		}

		List.prototype.addLink = function (title, href) {
			this.links.push(new Link(title, href));
		};

		List.prototype.toString = function () {
			if (!this.links.length) return '';
			return this.title + '<ul><li>' + this.links.join('</li><li>') + '</li></ul>';
		};

		function Column(cssClass) {
			this.cssClass = cssClass;
			this.count = 0;
			this.data = [];
		}

		Column.prototype.addList = function (title, continued) {
			this.count++;
			this.current = new List(title, continued, this.cssClass);
			this.data.push(this.current);
		};

		Column.prototype.addLink = function (title, href) {
			this.count++;
			this.current.addLink(title, href);
		};

		Column.prototype.toString = function () {
			return '<td style="width: 33%; vertical-align: text-top;">' + this.data.join('') + '</td>';
		};

		function Table(perColumn, cssClass) {
			this.cssClass = cssClass;
			this.cols = [];
			this.current = false;
			this.first = false;
			this.perColumn = perColumn;
		}

		Table.prototype.addLink = function (title, href, first) {
			if (!this.current || this.current.count >= this.perColumn) {
				this.current = new Column(this.cssClass);
				this.cols.push(this.current);
			}
			if (first !== this.first || this.current.count === 0) {
				this.current.addList(first, first === this.first && this.current.count === 0);
				this.first = first;
			}
			this.current.addLink(title, href);
		};

		Table.prototype.toString = function () {
			return '<table class="' + this.cssClass + '" style="width: 100%"><tbody><tr>' + this.cols.join('') + '</tr></tbody></table>';
		};

		Table.getAlphabet = function (titles) {
			var alphabet = [],
				first;
			for (var i = 0; i < titles.length; i++) {
				first = titles[i].redux[0].toUpperCase();
				if ($.inArray(first, alphabet) === -1) {
					alphabet.push(first);
				}
			}
			return alphabet;
		};

		Table.create = function (titles) {
			var title, table,
				alphabet = Table.getAlphabet(titles);
			table = new Table(
				Math.max(1, Math.floor((alphabet.length * 1.25 + titles.length) / 3)),
				'alpha'
			);
			if (titles.length > 200) {
				createSideNav(alphabet, 'alpha');
			}
			while (titles.length) {
				title = titles.shift();
				table.addLink(
					title.full,
					'/wiki/' + encodeURIComponent(title.full),
					title.redux[0].toUpperCase()
				);
			}
			return table.toString();
		};

		Table.rebuild = function (titles) {
			var title, table,
				alphabet = [],
				total = 0;
			if (!alphabet.length) {
				$.each(titles, function (first, list) {
					alphabet.push(first);
					total += list.length;
				});
			}
			createSideNav(alphabet, 'sortkey');
			table = new Table(Math.max(1, Math.floor((alphabet.length * 1.25 + total) / 3)), 'sortkey');
			$.each(titles, function (first, list) {
				while (list.length) {
					title = list.shift();
					table.addLink(title, '/wiki/' + encodeURIComponent(title), first);
				}
			});
			while (titles.length) {
				title = titles.shift();
				table.addLink(title, '/wiki/' + encodeURIComponent(title), title[0].toUpperCase());
			}
			return table.toString();
		};

		function createSideNav(alphabet, cssClass) {
			var color = $('.WikiaPage').css('border-left-color'),
				links = ['<a href="#cstop">▲</a>'];
			for (var i = 0; i < alphabet.length; i++) {
				links.push('<a href="#' + cssClass + ':' + alphabet[i] + '">' + alphabet[i] + '</a>');
			}
			links.push('<a href="#csbottom">▼</a>');

			$('head').append('<style type="text/css">.WikiaArticle{overflow:visible;display:flex} .letters{position:sticky;bottom:40px;align-self:flex-end;width:30px;padding:5px;min-height:50px;left:0;top:0;border-radius:4px;border:1px solid ' + color + ';background:' + window.sassParams['color-body'] + ';z-index:2;line-height:140%;white-space:pre;text-align:center}</style>');

			var letters = $('<div class="letters"><div> </div></div>')
				.appendTo('#WikiaArticle')
				.addClass(cssClass)
				.html(links.join("\n"));

			var $win = $(window),
				pageWidth = $('#WikiaPage').width(),
				lettersHeight = letters.height(),
				setPosition = function () {
					letters
						.css({
							top: Math.floor(($win.height() - lettersHeight) / 2) + 'px',
							left: Math.floor(($win.width() + $win.scrollLeft() - pageWidth) / 2) - 40 + 'px'
						});
				};

			$('.alpha').css('display', 'none');

			setPosition();
			$win.resize(setPosition);
		}

		function getCatMembers(cat, cmcontinue) {
			var defer = $.Deferred(),
				url = '/api.php?format=json&action=query&list=categorymembers&cmprop=title|sortkeyprefix&cmtype=page&cmlimit=500';
			url += '&cmtitle=Category:' + cat;
			if (cmcontinue) {
				url += '&cmcontinue=' + cmcontinue;
			}
			$.getJSON(url)
				.done(function (data) {
					if (data.query && data.query.categorymembers && $.isArray(data.query.categorymembers)) {
						var lists = {
							sortkey: {},
							alpha: []
						},
							m, key,
							members = data.query.categorymembers;
						for (var i = 0; i < members.length; i++) {
							m = members[i];
							key = (m.sortkeyprefix || m.title)[0].toUpperCase();
							lists.sortkey[key] = lists.sortkey[key] || [];
							lists.sortkey[key].push(m.title);
							lists.alpha.push({
								redux: normalize(m.title),
								full: m.title
							});
						}
						if (data['query-continue'] && data['query-continue'].categorymembers &&
							data['query-continue'].categorymembers.cmcontinue) {
							cmcontinue = data['query-continue'].categorymembers.cmcontinue;
							getCatMembers(cat, cmcontinue)
								.done(function (nextList) {
									$.each(lists.sortkey, function (i, v) {
										if (!nextList.sortkey[i]) return;
										lists.sortkey[i] = v.concat(nextList.sortkey[i]);
										delete nextList.sortkey[i];
									});
									lists.sortkey = $.extend(lists.sortkey, nextList.sortkey);
									lists.alpha = lists.alpha.concat(nextList.alpha);
									defer.resolve(lists);
								});
						} else {
							defer.resolve(lists);
						}
					}
				});
			return defer.promise();
		}

		function getCat(cat) {
			var defer = $.Deferred();
			getCatMembers(cat || mw.config.get('wgTitle'))
				.done(function (lists) {
					lists.alpha.sort(compare);
					defer.resolve(lists);
				});
			return defer.promise();
		}

		function toggleSortings(cssClass) {
			$('.alpha').add('.sortkey').css('display', 'none');
			$('.' + cssClass).css('display', 'block');
		}

		function addRadioButtons() {
			var $p = pages.find('p').first();
			$p.html($p.html() + ' Sortuj według: ' +
				'<input type="radio" name="sort" value="alpha"' +
				(hash === 'alpha' ? ' checked="checked"' : '') + '> ' +
				'<label>Pierwszy wyraz</label> ' +
				'<input type="radio" name="sort" value="sortkey"' +
				(hash !== 'alpha' ? ' checked="checked"' : '') + '> ' +
				'<label>Drugi wyraz</label> '
			);
			pages.find('input[name="sort"]')
				.click(function () {
					toggleSortings($(this).val());
				});
			if ({
				sortkey: 1,
				alpha: 1
			}[hash]) {
				toggleSortings(hash);
			} else {
				toggleSortings('sortkey');
			}
		}

		function normalize(str) {
			/*jshint boss:true*/
			var m;
			return str = (m = str.match(stopwordRegex)) ?
				str.substring(m[0].length).toLowerCase() :
				str.toLowerCase();
		}

		function compare(a, b) {
			if (a.redux < b.redux) return -1;
			if (a.redux > b.redux) return 1;
			return 0;
		}

		function addEdges() {
			$('#mw-content-text')
				.prepend('<a name="cstop"></a>')
				.append('<a name="csbottom"></a>');
		}

		var table = pages.find('table').first().addClass('sortkey');

		if (pages.children('a').length) { // category is oversized
			var h2 = pages.children('h2').clone(),
				m = pages.children('p').text().match(/(\d+(?:[,.]\d+)*)\D+$/m),
				total = m[1] || 'NaN';
			pages.empty()
				.append(h2)
				.append(
					'<p>Ta kategoria zawiera ' + total + ' stron.</p>' +
					'<div id="cat-placeholder" class="wikiaThrobber" style="width: 100%; height: 100px; position: relative;"> </div>'
			);
			getCat()
				.done(function (lists) {
					$('#cat-placeholder').remove();
					table = $(Table.rebuild(lists.sortkey))
						.appendTo(pages);
					table.after(Table.create(lists.alpha));
					addRadioButtons();
					addEdges();
				});
		} else {
			var linkTexts = [];
			table.find('a').each(function () {
				var text = $(this).text();
				linkTexts.push({
					redux: normalize(text),
					full: text
				});
			});
			table.after(Table.create(linkTexts.sort(compare)));
			addRadioButtons();
			if (linkTexts.length > 200) {
				addEdges();
			}
		}

	}((window.dev = window.dev || {}).catSort = window.dev.catSort || {}, mediaWiki, jQuery));
}