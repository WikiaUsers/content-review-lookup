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
    var FANDOM_DEVELOPERS_SERVER_ID = '246075715714416641', FANDOM_DEVELOPERS_INVITE_CODE = 'Vgfu9qb';
    var loaded, loadQueue = [],
        $rail = $('#WikiaRail'),
        railClass = $rail.attr('class');
    // Configuration
    var config = window.DiscordBannerSettings || {},
        bannerStyle = config.bannerStyle || '3',
        inviteLink = config.inviteLink || FANDOM_DEVELOPERS_INVITE_CODE,
        prependToRail = config.prependToRail === undefined ? true : config.prependToRail, // Prepends to rail by default
        noRail = config.noRail || false; // Adds rail module by default
    if (
        (!$rail.length || noRail) &&
        $('.discordBanner-variables').length === 0
    ) {
        return;
    }
    function place($module) {
        var $ads;
        if (prependToRail) {
            $ads = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last();
            if ($ads.length) {
                $module.insertAfter($ads);
            } else {
                $rail.prepend($module);
            }
        } else {
            $ads = $('.rail-sticky-module');
            if ($ads.length) {
                $module.insertBefore($ads);
            } else {
                $rail.append($module);
            }
        }
    }

    function placeQueue() {
        if (noRail) {
            return;
        }
        loaded = true;
        loadQueue.forEach(place);
    }

    function actuallyConstructBanner(skeleton, serverId, inviteCode, bannerStyle) {
    	var style2 = '';
    	if (bannerStyle === '2') style2 = '100%';
        return skeleton.attr('style', 'transform: scale(0.9); margin-left: -2px;').html($('<a>', {
            href: 'https://discord.gg/' + inviteCode,
        }).append($('<img>', {
            src: 'https://discord.com/api/guilds/' + serverId + '/widget.png?style=banner' + bannerStyle,
        }).css('width', style2)));
    }

    function constructBanner(skeleton, serverId, inviteCode, bannerStyle) {
        return $.Deferred(function (deferred) {
            if (serverId === FANDOM_DEVELOPERS_SERVER_ID || inviteCode !== FANDOM_DEVELOPERS_INVITE_CODE) {
                // There's no configuration mismatch.
                deferred.resolve(actuallyConstructBanner(skeleton, serverId, inviteCode, bannerStyle));
                return;
            }
            // Server ID isn't Fandom Developers, but invite code _is_. If the current user is an admin/WM/staff/helper,
            // let's complain to them. Otherwise, we'll be nice and try to get an instant invite code
            // from `widget.json`.
            if (/sysop|wiki-representative|staff|helper/.test(mw.config.get('wgUserGroups'))) {
                deferred.resolve(actuallyConstructBanner(skeleton, serverId, inviteCode, bannerStyle).append($('<div>', {
                    style: 'color: #e81a3f;',
                    html: 'Your banner\'s invite link is not configured correctly. For help, ask <a href="https://discord.gg/' + FANDOM_DEVELOPERS_INVITE_CODE + '">here</a>.'
                })));
                return;
            }
            $.get('https://discord.com/api/guilds/' + serverId + '/widget.json').done(function (data) {
                if (!data.instant_invite) {
                    // Widget invite channel is not set, so we just won't show this banner to normal users.
                    deferred.reject();
                    return;
                }
                var instantInviteCode = /[\w-]+$/.exec(data.instant_invite)[0];
                if (!instantInviteCode) {
                    deferred.reject();
                    return;
                }
                deferred.resolve(actuallyConstructBanner(skeleton, serverId, instantInviteCode, bannerStyle));
            }).fail(function () {
                deferred.reject();
            });
        });
    }

    new mw.Api().get({
        action: 'parse',
        prop: 'wikitext',
        page: 'MediaWiki:Custom-DiscordBanner-id',
        format: 'json'
    }).done(function (d) {
        var id;
        if (JSON.stringify(d).indexOf('error') > -1) {
            id = FANDOM_DEVELOPERS_SERVER_ID;
        } else {
            id = d.parse.wikitext['*'];
        }
        $('.discordBanner-variables').each(function () {
            var $placeholder = $(this);
            var templateID = $placeholder.find('.db-id').text();
            var invite = $placeholder.find('.db-invitelink').text();
            if (!templateID || !invite) {
                return;
            }
            var style = $placeholder.find('.db-style').text() || bannerStyle;
            constructBanner($('<div>', { class: 'db-banner' }), templateID, invite, style).done(function ($template) {
                $placeholder.empty().append($template).show();
            });
        });
        if (noRail) {
            return;
        }
        constructBanner($('<section>', { class: 'discordBanner rail-module' }), id, inviteLink, bannerStyle).done(function ($section) {
            if (loaded) {
                place($section);
            } else {
                loadQueue.push($section);
            }
            mw.hook('wikipage.content').fire($section);
        });
    });
    if (railClass) {
        var splCls = railClass.split(/\s+/);
        if (splCls.indexOf('loaded') === -1 && splCls.indexOf('is-ready') === -1) {
            $rail.on('afterLoad.rail', placeQueue);
        } else {
            placeQueue();
        }
    } else {
        placeQueue();
    }
});