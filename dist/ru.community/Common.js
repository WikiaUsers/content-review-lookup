/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/**
 * This one fixes #forum-display position.
 */
$(function () {
    if ($('#forum-display').length) {
        $('#forum-display').insertBefore('#WikiaFooter');
    }
});

$('.centralhelpbox').click(function(){
    window.location = $(this).find('a').get(0).href;
});

// Автоматические аватары на заглавной
!function( mw, $ ) {
    'use strict';
    if ( !mw.config.get( 'wgIsMainPage' ) ) return;
 
    $( '.mainpage-avatar' ).each( function() {
        var $this_elem = $( this ).empty(),
            data_obj = {
                id: {
                    action: 'query',
                    list: 'users',
                    ususers: $( this ).attr( 'data-name' ),
                    format: 'json'
                },
                avatar: {
                    controller: 'UserProfile',
                    method: 'getUserData',
                    tab: 'avatar',
                    format: 'json'
                }
            };
 
        $.get( '/ru/api.php', data_obj.id, function( d ) {
            data_obj.avatar.userId = d.query.users[ 0 ].userid;
 
            $.post( '/ru/wikia.php', data_obj.avatar, function ( t ) {
                $( '<img />', {
                    src: t.userData.avatar,
                    width: '55px',
                    height: '55px',
                    style: 'cursor: pointer;'
                })
                .click( function() { window.open( '/ru/wiki/User:' + data_obj.id.ususers, '_blank' )})
                .appendTo( $this_elem );
            });
        });
    });
}( this.mediaWiki, this.jQuery );

/*Карточки вики-проектов*/
// Original code https://dev.fandom.com/wiki/MediaWiki:WikiStatistics/code.js
//rework by Arhhhat
(function() {
	if (window.getWikiStatistics) return;
	var cache = {},
		targetClasses = [
			'.outwikistats-articles',
		];

	function getWikiStatistics(targetClass, prop, $content) {
		$content = $content || $(document);
		if (!$content.find(targetClass).length) return;
		mw.log('gws t&p', targetClass, prop, $content.find(targetClass).length);
		$content.find(targetClass).each(function() {
			var proto, wiki,
				$this = $(this);
			$this.children().hide();
			$this.append('<img src="https://static.wikia.nocookie.net/dont-starve/images/e/ed/Загрузка.gif/revision/latest/scale-to-width-down/32?cb=20220727200503&path-prefix=ru" />');
			wiki = $this.text();
			//Maybe add support for https? -Sophie
			proto = (/^https?:\/\/|^\/\//i).exec(wiki);
			proto = proto ? proto[0] : '//';
			wiki = wiki.replace(/^https?:\/+|^\/+/i, '').replace(/\.fandom\.com.*/i, '');
			wiki = proto + encodeURIComponent(wiki) + '.fandom.com/ru';
			// if data request in process
			if (cache[wiki]) {
				// if data in cache
				if (cache[wiki].data) {
					$this.text(cache[wiki].data[prop]);
					return;
				}
				cache[wiki].targets.push({
					c: targetClass,
					p: prop,
					t: $this
				});
				return;
			}
			// create cache
			cache[wiki] = {
				targets: [{
					c: targetClass,
					p: prop,
					t: $this
				}, ],
			};

			///* disabled due to XSS issue
			mw.log('gws req', wiki, prop);
			$.ajax({
				url: wiki + '/api.php',
				data: {
					action: 'query',
					meta: 'siteinfo',
					siprop: 'statistics',
					format: 'json'
				},
				dataType: 'jsonp',
				jsonp: 'callback',
				crossDomain: true,
				type: 'GET',
				success: function(data) {
					mw.log('gws data', this, wiki, prop, data, data.query.statistics);
					data = data.query.statistics;
					cache[wiki].data = data;
					cache[wiki].targets.forEach(function(v) {
						v.t.text(data[v.p]);
					});

				}
			});

			wiki2 = wiki.replace(/\.fandom\.com.*/i, '');

			var url = wiki2 + ".fandom.com/ru/api.php";

			var params = {
				action: "query",
				list: "allusers",
				augroup: "sysop",
				auactiveusers: "true",
				format: "json"
			};

			'use strict';

			url = url + "?origin=*";
			Object.keys(params).forEach(function(key) {
				url += "&" + key + "=" + params[key];
			});

			fetch(url)
				.then(function(response) {
					return response.json();
				})
				.then(function(response) {
					var allusers = response.query.allusers;
					if (allusers.length !== 0) {
						$('#list-wiki-sysop').html('');
						for (var p in allusers) {
							$.getJSON(mw.config.get('wgScriptPath') + '/api/v1/User/Details', {
								ids: (allusers[p].name)
							}, function(d) {
								d.items.forEach(function(el) {
									var src = el.avatar;
									var name = el.title;
									$('#list-wiki-sysop').append('<div class="wds-avatar" title="' + name + '"><a href="/ru/wiki/%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA:' + name + '"><img src="' + src + '" alt="' + name + '" title="' + name + '" class="wds-avatar__image"></a></div>');
								});
							});
						}
					}
				});
		});
		//*/
	}
	// backward compatible global getWikiStatistics
	window.getWikiStatistics = getWikiStatistics;
	mw.hook('wikipage.content').add(function($content) {
		mw.log('gws', targetClasses, $content.find(targetClasses.join(',')).length);
		if (!$content.find(targetClasses.join(',')).length) return;
		targetClasses.forEach(function(v) {
			getWikiStatistics(v, v.replace(/^.*?\-/, ''), $content);
		});
	});
})();

$(function() {
	$('.pi-theme-wikicard').css({
		"--wiki-bg": "url(" + $('.wikicard-back a').attr('href') + ")"
	});
});