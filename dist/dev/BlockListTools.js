/**
 * blockListTools
 * 
 * Adds a number of tools to the Block List for each user
 * @author Thundercraft5
 * @version 0.1
 * @uses: jQuery, mediaWiki
 * @UCP Ready: Yes
 */
;(function($, mw, window) {
    var pagePathname = mw.config.get('wgArticlePath').replace('$1', ''),
        $ipToolsSel = $('td.TablePager_col_ipb_target span.mw-usertoollinks'),
        namespace = mw.config.get("wgNamespaceNumber"),
        pagename = mw.config.get("wgTitle");
 
    function logMsg(data) {
        return console.log('BlockListTools:', typeof(data) === 'object' ? data.join(' ') : data);
    }
    
    if (window.blockListTools.Init || namespace !== -1 && pagename !== 'BlockList') {
        logMsg('Namespace/page is not supported, skipping importing script.');
        return;
    }
    window.blockListTools = window.blockListTools || {};
    window.blockListTools.Init = true;
 
    /* IP tools */
    $ipToolsSel.each(function(i) {
        /* Variables within iterator */
        var $elem = $(this).children('a'),
            href = $elem.prop('href'),
            ip = href.match(/(\d{1,3}\.){3}\d{1,3}/g),
            classes = $elem.prop('class'),
            user = href.split(':')[2];
 
        if (ip) {
            $elem.first().after(
                " &bull; ",
                /* Proxy Check/General Info */
                $('<a>', {
                    href: "//www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test/lookup/" + ip,
                    title: "Proxy check for " + ip,
                    html: "PC",
                    class: $elem.prop('class'),
                }),
                " &bull; ",
                /* Spam Blacklist check */
                $('<a>', {
                    href: "//cleantalk.org/blacklists/" + ip,
                    title: "Spam Blacklist check for " + ip,
                    html: "BC",
                    class: $elem.prop('class'),
                }),
                " &bull; ",
                $('<a>', {
                    href: "https://cleantalk.org/whois/" + ip,
                    title: "WHOIS for " + ip,
                    html: "WHOIS",
                    class: $elem.prop('class'),
                })
            );
        }
    });
    logMsg('Sucessfully appended IP tool links!');
 
    /* Variables */
    var blOpsArray = [],
        blActionsSel = 'span.mw-blocklist-actions',
        cbSel = 'a[title^="Special:Block/"]',
        uSel = 'a[title^="Special:Unblock/"]';
 
    /* Get Block List Unblock/Block Links and store them */
    $(blActionsSel).each(function(i, elem) {
        elem.remove();
        blOpsArray.push(elem);
    });
 
    /* Append Stored elements */
    $('td.TablePager_col_ipb_timestamp').each(function(i, elem) {
        elem.append(blOpsArray[i]);
    });
 
    /* Adjustments */
    $(blActionsSel).before('<br/>');
    /* Iterate over new elements */
    $('span.mw-blocklist-actions > a').each(function(i, elem) {
        var $this = $(this);
        /* Save User variable for future modifications */
        user = $this.prop('title').match(/Special\:((?:Un)?block)\/(.+)/i);
        user = user ? user[2] : null;
        /* Format Titles */
        $this.prop('title', $this.prop('title').replace(/Special\:((?:Un)?block)\/(.+)/i, function(match, $1, $2) {
           if ($1.toLowerCase() == 'block') {
                return 'Change block settings for ' + $2;
           } else {
                return 'Unblock ' + $2;
           }
        }));
 
        /* Shorten Link Text */
        if ($this.html().toLowerCase() == 'change block') {
            $this.html('CB');
        } else {
            $this.html('U');
        }
 
        if (i % 2 === 1 && window.blockListTools.showAbuseLog) {
            /* Extra Tool Links */
            $this.after(' | ', $('<a>', { 
                href: pagePathname + 'Special:AbuseLog?wpSearchUser=' + user, 
                html: "AL", 
                title: "Abuse logs for " + user 
            }));
        }
    });
    logMsg('Sucessfully Modified block list action links!');
 
})(jQuery, mediaWiki, window);