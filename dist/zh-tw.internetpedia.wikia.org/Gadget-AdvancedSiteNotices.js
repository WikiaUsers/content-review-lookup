(function ($, mw) { $( function() {
    /** Advanced Site Notices ********
     * Allow to custom dynamic site notices
     * Maintainer: [[User:PhiLiP]]
     */
    if (typeof(window.customASNInterval) == 'undefined') {
        window.customASNInterval = 15;
    }
    $(function () {
        if (window.closeASNForever || wgAction == 'edit' || wgAction == 'submit') {
            return;
        }

        var ln = $('#siteNotice');
        if (!ln.length) {
            return;
        }
        var cname = 'dismissASN';
        var cval = $.cookie(cname);
        if (cval == '') {
            cval = -1;
        }
        var rev = 0;
        var toid = null;

        var tb = $('<table id="asn-dismissable-notice" width="100%" style="background: transparent;"/>');
        var ct = $('<div id="advancedSiteNotices"/>');
        var sd = $('<a href="#">' + wgULS('关闭', '關閉') + '</a>');
        tb.append($('<tr/>').append($('<td/>').append(ct)).append($('<td/>').append('[').append(sd).append(']')));
        var nts = null;

        sd.click(function () {
            $.cookie(cname, rev, {
                expires: 30,
                path: '/'
            });
            clearTimeout(toid);
            tb.remove();
            return false;
        });

        var matchCriteria = function( nt ) {
            var cache = nt.data( 'asn-cache' );
            if ( cache !== undefined ) {
                return cache;
            }
            var criteria = nt.attr( 'data-asn-criteria' );
            if ( criteria === undefined ) {
                criteria = nt.attr( 'class' ) ? 'false' : 'true';
                if ( nt.hasClass('only_sysop') ) {
                    criteria += '||in_group("sysop")';
                }
                if ( nt.hasClass('only_logged') ) {
                    criteria += '||in_group("user")';
                }
                if ( nt.hasClass('only_anon') ) {
                    criteria += '||!in_group("user")';
                }
                if ( nt.hasClass('only_zh_cn') ) {
                    criteria += '||in_country("CN")';
                }
                if ( nt.hasClass('only_zh_hk') ) {
                    criteria += '||in_country("HK")||in_country("MO")';
                }
                if ( nt.hasClass('only_zh_sg') ) {
                    criteria += '||in_country("SG")||in_country("MY")';
                }
                if ( nt.hasClass('only_zh_tw') ) {
                    criteria += '||in_country("TW")';
                }
            } else {
                criteria = decodeURIComponent( criteria.replace(/\+/g, '%20') )
                criteria = $.trim( criteria );
            }
            if ( criteria === '' ) {
                criteria = 'true';
            }
            var testCriteria = function() {
                var in_country = function( country ) {
                    return Geo && Geo.country === country;
                }, in_city = function( city ) {
                    return Geo && Geo.city === city;
                }, in_group = function( group ) {
                    return $.inArray( group, mw.config.get( 'wgUserGroups' ) ) > -1;
                };
                return eval( criteria );
            };
            cache = testCriteria();
            nt.data( 'asn-cache', cache );
            return cache;
        };

        var loadNotices = function (pos) {
            if (!tb.length) {
                return;
            }
            ct.css('min-height', ct.height() + 'px');
            var l = nts.length;
            var nt = null;
            var rt = 0;
            while ( rt++ < l ) {
                nt = $( nts[pos] );
                if ( matchCriteria( nt ) ) {
                    break;
                }
                pos = (pos + 1) % l;
            }
            if ( rt >= l ) {
                return;
            }
            nt = nt.html();
            var cthtml = ct.html();
            if ( cthtml ) {
                if ( cthtml !== nt ) {
                    ct.stop().fadeOut(function () {
                        ct.html(nt).fadeIn();
                    });
                }
            } else if (rev == cval) {
                return;
            } else {
                $.cookie( cname, null );
                tb.appendTo(ln);
                ct.html(nt).fadeIn();
            }
            toid = setTimeout(function () {
                loadNotices( (pos + 1) % l );
            }, window.customASNInterval * 1000);
        };

        $.get(mw.util.wikiScript( 'api' ), {
            page: 'Template:AdvancedSiteNotices/ajax',
            variant: wgUserVariant,
            prop: 'text',
            action: 'parse',
            format: 'json',
            maxage: 3600,
            smaxage: 3600
        }, function (d) {
            d = $( '<div />' ).html( d.parse.text['*'] ).find( 'ul.sitents' );
            nts = $('li', d);
            rev = d.data( 'asn-version' );
            var l = nts.length;
            loadNotices(Math.floor(Math.random() * l));
        });
    });
}); })(jQuery, mediaWiki);