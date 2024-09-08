if ({history:1,view:1}[mediaWiki.config.get('wgAction')]
 || (mediaWiki.config.get('wgAction') === 'edit' && jQuery.inArray(mediaWiki.config.get('wgNamespaceNumber'), [1200, 1201, 1202, 2000, 2001, 2002]) !== -1)
   )
(function (window, $) {
   "use strict";
   var footerHr = '<hr style="clear: both; border-bottom:1px solid #C3B599; margin-top:20px">',
       footerSearch = '<table align="center"><tr><td><div style="width:330px"><form method="get" action="http://sonako.wikia.com/wiki/Special:Search" class="WikiaSearch" id="WikiaSearch2"><input name="search" autocomplete="off" placeholder="Tìm trên Sonako Wiki" type="text"><input type="hidden" name="fulltext" value="0"><input type="submit"><button class="wikia-button" style="height:27px"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21"></button></form></div></td></tr></table>';
 
    $.get('http://sonako.wikia.com/wiki/MediaWiki:Bottom_nav?action=render')
    .done(function (data) {
        $(function ($) {
            $("#WikiaArticle").append(footerHr + data + footerSearch);
            // HOOK: Allow custom Reference Popups in the footer.
            if (window.dev && window.dev.ReferencePopups && window.dev.ReferencePopups.loadCustom) {
                window.dev.ReferencePopups.loadCustom();
            }
 
            // the following was culled from: https://github.com/Wikia/app/tree/dev/skins/oasis/js/Search.js
            // RED ALERT: jquery.autocomplete clashes with jquery.ui.autocomplete and will COMPLETELY BREAK
            //    the source mode editor (LinkSuggest will crash which then prevents switching from Visual to Source)
            $.loadJQueryAutocomplete()
            .done(function() {
                $('#WikiaSearch2').find('input[name="search"]')
                .autocomplete({
                    serviceUrl: mediaWiki.config.get('wgServer') +
                                mediaWiki.config.get('wgScript') +
                                '?action=ajax&rs=getLinkSuggest&format=json',
                    onSelect: function(value, data, event) {
                        var valueEncoded = encodeURIComponent(value.replace(/ /g, '_')),
                            // slashes can't be urlencoded because they break routing
                            location = mediaWiki.config.get('wgArticlePath').
                                replace(/\$1/, valueEncoded).
                                replace(encodeURIComponent('/'), '/');
                        if (event.button === 1 || event.metaKey || event.ctrlKey) {
                            window.open(location);
                        } else {
                            window.location.href = location;
                        }
                        return false;
                    },
                    appendTo: '#WikiaSearch2',
                    deferRequestBy: 400,
                    minLength: 3,
                    maxHeight: 1000,
                    selectedClass: 'selected',
                    width: '300px',
                    skipBadQueries: true // BugId:4625 - always send the request even if previous one returned no suggestions
                });
            });
        });
    });
}(window, jQuery));