/**
 * @module              DiscordBanner
 * @description         Add a banner to a wiki's Discord.
 * @author              Americhino
 *                      Unai01
 * @usingcodeby         KockaAdmiralac (AddRailModule)
 * @version             1.1.0
 * @license             CC-BY-SA 3.0
 *
 */
mw.loader.using('mediawiki.api').then(function () {
    var loaded, loadQueue = [],
        $rail = $('#WikiaRail'),
        railClass = $rail.attr('class');
    // Configuration
    var config = window.DiscordBannerSettings || {},
        bannerStyle = config.bannerStyle || '3',
        inviteLink = config.inviteLink || 'wPrVUj4', // Fandom Developers
        prependToRail = config.prependToRail === undefined ? true : config.prependToRail, // Prepends to rail by default
        noRail = config.noRail || false; // Adds rail module by default
    if (
        (!$rail.exists() || noRail) &&
        !$('.discordBanner-variables').exists()
    ) {
        return;
    }
    function place($module) {
        var $ads;
        if (prependToRail) {
            $ads = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last();
            if ($ads.exists()) {
                $module.insertAfter($ads);
            } else {
                $rail.prepend($module);
            }
        } else {
            $ads = $('.rail-sticky-module');
            if ($ads.exists()) {
                $module.insertBefore($ads);
            } else {
                $rail.append($module);
            }
        }
    }
 
    function placeQueue() {
        if (!loadQueue.length || noRail) {
            return;
        }
        loaded = true;
        loadQueue.forEach(place);
    }
    new mw.Api().get({
        action: 'parse',
        prop: 'wikitext',
        page: 'MediaWiki:Custom-DiscordBanner-id',
        format: 'json'
    }).done(function (d) {
        var id;
        if (JSON.stringify(d).indexOf('error') > -1) {
            id = '246075715714416641';
        } else {
            id = d.parse.wikitext['*'];
        }
        if ($('.discordBanner-variables').exists()) {
            var templateID = $('.discordBanner-variables .db-id').text();
            var invite = $('.discordBanner-variables .db-invitelink').text();
            var style = $('.discordBanner-variables .db-style').text() || bannerStyle;
            var $template = $('<div>', {
                'class': 'db-banner',
                'style': 'transform: scale(0.9) !important; margin-left: -2px !important;',
                html: $('<a>', {
                    href: 'https://discord.gg/' + invite
                }).append($('<img>', {
                    src: 'https://discord.com/api/guilds/' + templateID + '/widget.png?style=banner' + style
                }))
            });
            $('.discordBanner-variables').empty().append($template).show();
        }
        if (noRail) {
            return;
        }
        var $section = $('<section>', {
            'class': 'discordBanner rail-module',
            'style': 'transform: scale(0.9) !important; margin-left: -2px !important;',
            html: $('<a>', {
                href: 'https://discord.gg/' + inviteLink
            }).append($('<img>', {
                src: 'https://discord.com/api/guilds/' + id + '/widget.png?style=banner' + bannerStyle
            }))
        }); 
        if (loaded) {
            place($section);
        } else {
            loadQueue.push($section);
        }
        mw.hook('wikipage.content').fire($section);
    });
    if (railClass && railClass.split(/\s+/).indexOf('loaded') === -1) {
        $rail.on('afterLoad.rail', placeQueue);
    } else {
        placeQueue();
    }
});