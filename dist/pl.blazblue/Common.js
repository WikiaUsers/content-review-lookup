// Facebook
$(function() {
    $('#WikiaRail .loading').after('<div style="box-shadow: 0 0 2px #000000; margin-bottom: 10px; max-height: 130px;"><iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=BlazBlueWiki&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="300" height="130" scrolling="no" /></div>');
});

$(function() {
    window.InactiveUsers = function(my, debug) {
        if (!$('#UserProfileMasthead').length) return;

        function getUserName() {
            var m;
            if (-1 < [2, 3, 500, 501, 1200].indexOf(wgNamespaceNumber) && (m = wgTitle.match(/^([^\/]+)/))) {
                return m[1];
            } else if (-1 == wgNamespaceNumber && -1 < ['Contributions', 'Following'].indexOf(wgCanonicalSpecialPageName)) {
                var lastPart = location.pathname.split('/').pop();
                if (lastPart.length && lastPart != wgPageName) {
                    return decodeURIComponent(lastPart.replace(/_/g, ' '));
                }
                return wgUserName;
            }
            return false;
        }

        var userName = getUserName();
        if (debug) console.log(userName);
        if (!userName) return;

        my = $.extend({
            text: 'inactive',
            gone: [],
            months: 2
        }, my);

        function labelAsInactive() {
            $('#UserProfileMasthead hgroup').append(
                '<span class="tag inactive-user" style="margin-left: 10px !important">' + my.text + '</span>'
            );
        }

        if (-1 < my.gone.indexOf(userName)) {
            labelAsInactive();
        } else {
            function ISODateNDaysAgo(days) {
                function pad(n) {
                    return n < 10 ? '0' + n : n;
                }

                function ISODateString(d) {
                    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z';
                }
                return ISODateString(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
            }

            var apiUrl = '/api.php?action=query&list=usercontribs&uclimit=1&ucprop=title|timestamp&format=json' +
                '&ucuser=' + encodeURIComponent(userName) +
                '&ucstart=' + ISODateNDaysAgo(0) +
                '&ucend=' + ISODateNDaysAgo(30 * Math.max(1, parseInt(my.months)));

            $.getJSON(apiUrl, function(result) {
                if (debug) console.log(result);
                if (result.hasOwnProperty('query') &&
                    result.query.hasOwnProperty('usercontribs') &&
                    !result.query.usercontribs.length
                ) {
                    labelAsInactive();
                }
            });
        }

        return my;

    }(window.hasOwnProperty('InactiveUsers') ? window.InactiveUsers : {}, false);
});

// Source buttons
/* DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA */

if (typeof(mwCustomEditButtons) != 'undefined') {

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ea/Button_align_left.png",
        "speedTip": "Align text to the left",
        "tagOpen": "<left>",
        "tagClose": "</left>",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
        "speedTip": "Center the text",
        "tagOpen": "<center>",
        "tagClose": "</center>",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/a5/Button_align_right.png",
        "speedTip": "Align text to the right",
        "tagOpen": "<right>",
        "tagClose": "</right>",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_justify.png",
        "speedTip": "Justify the text",
        "tagOpen": "<p align=justify>",
        "tagClose": "</p>",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png",
        "speedTip": "insert superscript",
        "tagOpen": "<sup>",
        "tagClose": "</" + "sup>",
        "sampleText": "Superscript"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png",
        "speedTip": "Insert subscript",
        "tagOpen": "<sub>",
        "tagClose": "</" + "sub>",
        "sampleText": "Subscript"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png",
        "speedTip": "Comment, which is visible during edition",
        "tagOpen": "<!--",
        "tagClose": "-->",
        "sampleText": "Message text."
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
        "speedTip": "Add the code",
        "tagOpen": "<code><nowiki>",
        "tagClose": "</" + "nowiki></code>",
        "sampleText": "Coded text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
        "speedTip": "Disambiguation template",
        "tagOpen": "{{Disambiguation template",
        "tagClose": "}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/50/Button_tidyman.png",
        "speedTip": "Mark this article as to delete",
        "tagOpen": "{{Delete",
        "tagClose": "}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
        "speedTip": "Wstaw galerię zdjęć",
        "tagOpen": "\n<gallery spacing=medium columns=3 position=center widths=180 orientation=none captionalign=center>\n",
        "tagClose": "\n</gallery>",
        "sampleText": "File:Example 1.png|Description 1\nFile:Example 2.png|Description 2"
    };

}

window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};

// Slider
// Slider
// Autor: Pecoes & Vuh
// Modyfikacje: Nanaki
// Licencja: CC-BY-NC-SA
//           http://creativecommons.org/licenses/by-nc-sa/3.0/deed.pl

// Oryginał: http://pl.elderscrolls.wikia.com/wiki/MediaWiki:Slider.js
// Lekko zmodyfikowana wersja skryptu pozwalająca działać z galerią

if (mediaWiki.config.get('wgAction') === 'view')(function() {

    'use strict';

    function createSlider() {
        /*jshint validthis:true*/
        var scrollPane = $(this),
            scrollPaneWidth = scrollPane.width(),
            scrollContent = scrollPane.find('.scroll-content'),
            scrollContentWidth = 0;

        var elems = scrollContent.find('.wikia-gallery-item');
        if (!elems.length) elems = scrollContent.find('img');

        elems.each(function() {
            var $this = $(this),
                width = $this.outerWidth();
            if (width) {
                scrollContentWidth += width;
            } else {
                $this.on('load', function() {
                    scrollContentWidth += $this.outerWidth();
                });
            }
        });

        var scrollbar = scrollPane.find('.scroll-bar').slider({
            slide: function(event, ui) {
                if (scrollContentWidth > scrollPaneWidth) {
                    scrollContent.css('margin-left', Math.round(
                        ui.value / 100 * (scrollPaneWidth - scrollContentWidth)
                    ) + 'px');
                } else {
                    scrollContent.css('margin-left', 0);
                }
            }
        });

        scrollPane.css("overflow", "hidden");

        scrollbar.find('.ui-slider-handle').css({
            width: '60px',
            marginLeft: '-30px'
        });
    }

    $(function() {
        var imgSlider = $('.img-slider');
        if (!imgSlider.length) return;

        $('head')
            .append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" /><style type="text/css"> .ui-widget-header { background: transparent; border: none; } .scroll-bar-wrap{ width: 500px; margin: 0 auto; padding: 4px; background: transparent; border: none; } .ui-slider { border: 1px solid #000; box-shadow: 0 0 4px #000; background: transparent; } .scroll-bar-wrap .ui-slider-handle {background: #143746; border: 1px black; } .scroll-bar-wrap .ui-slider-handle:hover { background: none repeat scroll 0 0 #143746; border: 1px black; } .img-slider { overflow: hidden; white-space: nowrap; width: auto; } .img-slider * { margin: 0; padding: 0; } .img-slider figure { display: inline-block; }</style>');

        imgSlider
            .wrap('<div class="scroll-pane"></div>')
            .addClass('scroll-content')
            .after('<div class="scroll-bar-wrap ui-widget-content"><div class="scroll-bar"></div></div>');

        mediaWiki.loader.using('jquery.ui.slider', function() {
            $('.scroll-pane').each(createSlider);
        });
    });
}());

// Slider jQuery
//===============================================================================
// Slider jquery by Tierrie
//===============================================================================
mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});

// Ajax
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';