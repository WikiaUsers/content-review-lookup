$(function() {
	mw.util.addCSS('\
		.flaggedrevs-color-1 {background-color:#f0f8ff}\
		.flaggedrevs-unreviewed {background-color:#FAEBD7}\
		.flaggedrevs-pending {background-color: #FFC}\
		#flagged-legend {display:block !important}');

	var nonFlaggedNS = [];
	$.each(mw.config.get('wgFormattedNamespaces'), function( i, ns ) {
		if ( i > 0 && i != 6 && i != 10 && i != 14) {
			nonFlaggedNS.push(ns);
		}
	});
	nonFlaggedNS.push('Участница');
	nonFlaggedNS = new RegExp('^(' + nonFlaggedNS.join('|') + '):');

	var title,
		titles = [],
		link = {};
	$('a.mw-newpages-pagename').each( function( i, lnk ) {
		title = $(lnk).attr('title');
		if ( nonFlaggedNS.test(title) ) {
			return;
		}
		titles.push(title);
		link[title] = lnk;
	});

	while ( titles.length ) {
		$.post( // !!! временно из-за [[mediazilla:36839]]
			mw.util.wikiScript('api'),
			{
				action:'query',
				format:'json',
				prop:   'info|flagged|categories',
				inprop: 'talkid|watched',
				cllimit: 500,
				titles: titles.splice(0,50).join('|')
			},
			function(resp) {
				if ( !resp || !(resp=resp.query) ) {
					return;
				}
				for ( var id in resp.pages ) {
					markLink( resp.pages[id] );
				}
			}
		);
	}

	return;



	function markLink( pg ) {
		var lnk = $(link[pg.title]),
			li = lnk.closest('li'),
			clss,
			catText,
			catColor,
			catTip;

		if ( pg.flagged ) {
			if ( pg.lastrevid == pg.flagged.stable_revid) {
				clss = 'flaggedrevs-color-1';
			} else {
				clss = 'flaggedrevs-pending';
				addLnk('oldid=' + pg.flagged.stable_revid + '&diff=' + pg.lastrevid, 'непров');
			}
		} else {
			clss = 'flaggedrevs-unreviewed';
		}
		li.addClass(clss);

		if ( typeof pg.watched === 'string' ) {
			lnk.wrap('<strong class="mw-watched" />');
		}

		if ( pg.talkid ) {
			addLnk('curid=' + pg.talkid, '<b>обс.</b>');
		}

		if ( pg.categories ) {
			for ( var c = 0; c < pg.categories.length; c++ ) {
				var cat = pg.categories[c].title.replace(/^[^:]+:/,''); //rm prefix
				if ( /:К быстрому удалению$/.test(cat) && !catText ) {
					catText = 'КБУ';
					catColor = '#f88';
					catTip = cat;
				} else if ( /:Кандидаты на удаление$/.test(cat) ) {
					catText = 'К удалению';
					catColor = '#faa';
					catTip = cat;
				} else if ( /^Farm Frenzy вики:БУ:/.test(cat) ) {
					catText = cat.replace(/^Farm Frenzy вики:/,'');
					catColor = '#f88';
					catTip = cat;
				} else if ( /^Википедия:К отсроченному удалению$/.test(cat) ) {
					catText = 'Отсроченное';
					catColor = 'pink';
					catTip = cat;
				} else if ( /:Оспариваемые быстрые удаления$/.test(cat) ) {
					catText = 'Оспаривается';
					catColor = 'violet';
					catTip = cat;
				}
			}
			if ( catText ) {
				li.append(' <span style="background:' + catColor + '"'
				+ ' title="«' + catTip + '»">(' + catText + ')</span>');
			}
		}

		function addLnk( href, name ) {
			li.find('.mw-newpages-history a:last')
				.after(' | <a href="' + mw.config.get('wgScript') + '?' + href + '">' + name + '</a>');
		}

	} //markLink
});