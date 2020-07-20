var talkNamespaces = [1,2,3,5,7,9,11,13,15,110,111,401,500,501,502,503];
var ShowHideConfig = { autoCollapse: 4 };

importScriptPage( 'AjaxUndo/code.js', 'dev' );

$(function () {

    // make constants-section on function pages collapsible:
    if ($('.jmw-function').length) {
        importScriptPage('ShowHide/code.js', 'dev');
    }

    // restore underscores in function names:

    $('a').filter(function () {
        return /\(\)$/.test($(this).html());
    }).html(function (index, oldhtml) {
        return oldhtml.replace(/ +/, '_');
    });

    // searches for tables with the CSS class jtable
    // and sets every 2nd row's background to white
    
    if ($('.jtable').length) {
        $('.jtable tr:nth-child(even) td,.jtable td[rowspan]').css({
            backgroundColor: 'white'
        });
    }

    //*
    // replaces emoticon templates in MediaWiki:Edittools with their images:
    if (document.getElementById('jmw-smilies'))
    {
        var images = {"{{=smile}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/6\/69\/Icon_smile.gif","{{=arrow}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/c\/ca\/Icon_arrow.gif","{{=biggrin}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/4\/44\/Icon_biggrin.gif","{{=confused}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/e\/e4\/Icon_confused.gif","{{=cool}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/6\/6c\/Icon_cool.gif","{{=cry}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/f\/fc\/Icon_cry.gif","{{=eek}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/3\/3d\/Icon_eek_std.gif","{{=evil}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/1\/19\/Icon_evil.gif","{{=exclaim}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/0\/05\/Icon_exclaim.gif","{{=geek}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/3\/3a\/Icon_geek.gif","{{=idea}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/9\/91\/Icon_idea.gif","{{=lol}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/1\/10\/Icon_lol.gif","{{=mad}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/0\/05\/Icon_mad.gif","{{=mrgreen}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/1\/19\/Icon_mrgreen.gif","{{=neutral}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/7\/72\/Icon_neutral.gif","{{=question}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/0\/02\/Icon_question.gif","{{=razz}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/1\/1e\/Icon_razz.gif","{{=redface}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/8\/88\/Icon_redface.gif","{{=rolleyes}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/d\/d0\/Icon_rolleyes.gif","{{=sad}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/1\/13\/Icon_sad.gif","{{=surprised}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/6\/67\/Icon_surprised.gif","{{=twisted}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/b\/ba\/Icon_twisted.gif","{{=ugeek}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/2\/2e\/Icon_ugeek.gif","{{=wink}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/f\/fa\/Icon_wink.gif","{{=angel}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/3\/3a\/Icon_angel.gif","{{=clap}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/9\/95\/Icon_clap.gif","{{=crazy}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/3\/3c\/Icon_crazy.gif","{{=eh}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/f\/f1\/Icon_eh.gif","{{=lolno}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/c\/c4\/Icon_lolno.gif","{{=problem}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/4\/41\/Icon_problem.gif","{{=shh}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/e\/e3\/Icon_shh.gif","{{=shifty}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/e\/e7\/Icon_shifty.gif","{{=sick}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/5\/56\/Icon_sick.gif","{{=silent}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/5\/5e\/Icon_silent.gif","{{=think}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/b\/bb\/Icon_think.gif","{{=thumbdown}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/2\/2d\/Icon_thumbdown.gif","{{=thumbup}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/3\/3e\/Icon_thumbup.gif","{{=wave}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/d\/df\/Icon_wave.gif","{{=wtf}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/7\/79\/Icon_wtf.gif","{{=yawn}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/1\/1c\/Icon_yawn.gif","{{=eusa angel}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/0\/0d\/Eusa_angel.gif","{{=eusa boohoo}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/9\/93\/Eusa_boohoo.gif","{{=eusa clap}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/3\/3c\/Eusa_clap.gif","{{=eusa dance}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/b\/b3\/Eusa_dance.gif","{{=eusa doh}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/b\/b2\/Eusa_doh.gif","{{=eusa drool}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/8\/89\/Eusa_drool.gif","{{=eusa eh}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/c\/ce\/Eusa_eh.gif","{{=eusa hand}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/4\/48\/Eusa_hand.gif","{{=eusa liar}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/6\/63\/Eusa_liar.gif","{{=eusa naughty}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/8\/84\/Eusa_naughty.gif","{{=eusa pray}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/9\/94\/Eusa_pray.gif","{{=eusa shhh}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/3\/30\/Eusa_shhh.gif","{{=eusa shifty}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/c\/c1\/Eusa_shifty.gif","{{=eusa sick}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/3\/31\/Eusa_sick.gif","{{=eusa silenced}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/e\/e8\/Eusa_silenced.gif","{{=eusa snooty}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/d\/dc\/Eusa_snooty.gif","{{=eusa think}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/9\/92\/Eusa_think.gif","{{=eusa wall}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/d\/d1\/Eusa_wall.gif","{{=eusa whistle}}":"http:\/\/images.wikia.com\/jadeempire-modding\/images\/d\/d1\/Eusa_whistle.gif"};
        
        var emoLinks = document.getElementById('jmw-smilies').getElementsByTagName('a');
        for (i = 0; i < emoLinks.length; i++)
        {
            var e = emoLinks[i].innerHTML;
            if (images[e]) emoLinks[i].innerHTML = '<img alt="'+e+'" title="'+e+'" src="'+images[e]+'" />';
        }
    }
    //*/

    // adds a link to the source code for all 2da articles:
    $('h1').filter(function() {
        var h1 = $(this).html();
        if (/^\w+\.2da$/.test(h1)) { 
            $(this).append(' <a title="view source" href="http://jade-empire-in-style.com/2das/' +
                h1.toLowerCase() +
                '"><span class="twoda"><img src="https://images.wikia.nocookie.net/jadeempire-modding/images/b/b0/Source.png" alt="' +
                h1 + '" /></span></a>'
        )}
    });

    // widgets for the main page:
    if ($('#jmw-main-container').length)
    {
        var recentChangesQuery = {
            selector: '#jmw-main-rcwidget',
            url: '/api.php?action=query&format=json&list=recentchanges&rclimit=30&rctype=edit&rcshow=!redirect&rcprop=title&rcnamespace=0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|110|111|400|401|500|501|502|503',
        };
        
        var newPagesQuery = {
            selector: '#jmw-main-npwidget',
            url: '/api.php?action=query&format=json&list=recentchanges&rclimit=10&rctype=new&rcshow=!redirect&rcprop=title&rcnamespace=0',
        };
        
        var contribsQuery = {
            selector: '#jmw-main-mcwidget',
            url: '/api.php?action=query&format=json&list=usercontribs&uclimit=30&ucuser='  +  encodeURIComponent(wgUserName)  +  '&ucprop=title',
        };
        
        recentChangesQuery.preload = newPagesQuery.preload = contribsQuery.preload = function (div) {
            div.css({ backgroundImage: 'url(https://images.wikia.nocookie.net/jadeempire-modding/images/4/42/Loading.gif)', backgroundRepeat: 'no-repeat', backgroundPosition: '30px 26px' });
        }
        
        recentChangesQuery.postload = newPagesQuery.postload = contribsQuery.postload = function (div) {
            div.css({ backgroundImage: 'none' } );
        }

		var queries = [recentChangesQuery, newPagesQuery];
        if (wgUserName) queries.push(contribsQuery);
        
        function queryWikiaAPI (query) {
            if (!query.selector || !query.url) return;
            var container = $(query.selector);
            if (!container.length) return;
            container.empty();
            if (query.preload && typeof query.preload == 'function') query.preload(container);
            query.list = /list=(\w+)\b/.exec(query.url)[1];
            if (!query.list) return;
            if (!query.maxResults || typeof query.maxResults != 'number') query.maxResults = 8;
            if (!query.format || typeof query.format != 'function') {
                query.format = function (dataset) {
                    return '<a href="/wiki/'+dataset.title+'">'+dataset.title+'</a>';
            }};
            $.ajax({
                type: "GET",
                url: query.url,
                dataType: "json",
                async: true,
                cache: false,
                success: function (response, textStatus, jqXHR) {
                    var data = response.query[query.list];
                    var titles = new Array();
                    var html = '';
                    for (i = 0; i < data.length && titles.length < query.maxResults; i++) {
                        if (-1 == $.inArray(data[i].title, titles))
                        {
                            titles.push(data[i].title);
                            html += '<li>'+query.format(data[i])+'</li>';
                        }
                    }
                    if (html.length) {
                        container.append('<ul>'+html+'</ul>');
                        if (query.postload && typeof query.postload == 'function') query.postload(container);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert('error'+textStatus);
                }
            });
        }

		function performQueries (queries)
        {
            if (window.lastWidgetUpdate && Date.now() - window.lastWidgetUpdate < 61000) return;
            window.lastWidgetUpdate = Date.now();
            if (!window.widgetInterval) {
                window.widgetInterval = window.setInterval(
                function () {
                    performQueries(queries);
                }, 20000);
            }
			for (var i = 0; i < queries.length; i++) {				
				queryWikiaAPI(queries[i]);
			}
        }
    
        performQueries(queries);
        $(window).focus(function () { performQueries(queries); } );
        $(window).blur(function () { 
            if (window.widgetInterval) window.clearInterval(window.widgetInterval);
            delete window.widgetInterval;
        });
    }
});