/* Any JavaScript here will be loaded for all users on every page load. */

/* Main page */
/** Poll text **/
$(function() {
    $(".ajax-poll .total").parent().addClass("pollText");
});

/**************************************************************/
/* sliders using jquery by User:Tierrie in Dragon Age Wiki */
/**************************************************************/
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
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = 'T plus ';
    } else {
        var tpm = 'T minus ';
    }

    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code originally by "pcj" of Wowpedia
 * Maintenance, cleanup, style and bug fixes by Grunny (http://community.wikia.com/wiki/User:Grunny)
 */
window.AjaxRCRefreshText = 'Auto-Refresh',
    window.AjaxRCRefreshHoverText = 'Enable auto-refreshing of this page',

    /**
     * Temp Hack: copy the RC filter JS since it can't be accessed
     * @source <https://github.com/Wikia/app/blob/dev/extensions/wikia/RecentChanges/js/RecentChanges.js>
     */
    RecentChangesLocal = {
        init: function() {
            this.$table = $('.mw-recentchanges-table');
            this.$dropdown = this.$table.find('.WikiaDropdown');
            this.$submit = this.$table.find('input[type="submit"]');
            this.$submit.on('click.RecentChangesDropdown', $.proxy(this.saveFilters, this));
            this.$submit.removeAttr('disabled'); //FF clean
            this.dropdown = new Wikia.MultiSelectDropdown(this.$dropdown);
            this.dropdown.on('change', $.proxy(this.onChange, this));

        },

        saveFilters: function(event) {
            var self = this;

            event.preventDefault();

            self.dropdown.disable();
            self.$submit.attr('disabled', 'disabled');

            if (self.dropdown.getSelectedValues().length === 0) {
                self.dropdown.doSelectAll(true);
            }

            $.nirvana.sendRequest({
                controller: 'RecentChangesController',
                method: 'saveFilters',
                data: {
                    filters: self.dropdown.getSelectedValues()
                },
                type: 'POST',
                format: 'json',
                callback: function(data) {
                    window.location.reload();
                }
            });
        }
    };

/* tabber: changing the tab displayed by default for certain pages */
/* (source: http://community.wikia.com/wiki/Forum:Extension:Tabber_-_Setting_the_default_tab_displayed) */

if (mw.config.get('wgPageName') === 'Human_Vanguard' || mw.config.get('wgPageName') === 'Human_Infiltrator' || mw.config.get('wgPageName') === 'Human_Adept') {
    $(window).on('load.tabberhack', function() {
        $('.tabberlive')[0].tabber.tabShow(1);
        $(window).off('load.tabberhack');
    });
};

/**
 * Helper script for the .hlist class in [[MediaWiki:Common.css]] and [[MediaWiki:Wikia.css]]
 * Add pseudo-selector class to last-child list items in IE8
 * @source mediawiki.org/wiki/Snippets/Horizontal_lists
 * @revision 6 (2014-08-23)
 * @author [[User:Edokter]]
 */
(function(mw, $) {
    var profile = $.client.profile();
    if (profile.name === 'msie' && profile.versionNumber === 8) {
        mw.hook('wikipage.content').add(function($content) {
            $content.find('.hlist').find('dd:last-child, dt:last-child, li:last-child')
                .addClass('hlist-last-child');
        });
    }
}(mediaWiki, jQuery));

// ============================================================
// BEGIN Template:Games
// ============================================================

// Description: Add icons to article title
// Credit:      User:Porter21 (modifications by User:Rappy and User:Gardimuer)
$(function addTitleIcons() {
    var insertTarget;

    if (wgAction != 'submit' && wgNamespaceNumber != 112 && $('#va-titleicons').length > 0) {
        insertTarget = $('#WikiaPageHeader .tally');
        $('#WikiaPageHeader .tally').html(' ').css('width', '200px');
    }
    if (insertTarget) {
        $('#va-titleicons').css('display', 'block').prependTo(insertTarget);
        $('#va-titleicons-more').append('<img width="0" height="0" class="va-titleicons-chevron" src="' + wgBlankImgUrl + '">');

        $('#va-titleicons').hover(
            function() {
                $(this).addClass('va-titleicons-hover');
            },
            function() {
                $(this).removeClass('va-titleicons-hover');
            });
    }
});

// ============================================================
// END Template:Games
// ============================================================