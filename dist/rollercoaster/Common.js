/* Redirect and Color edit buttons *
 * Thanks to rct.wikia.com         */

if ((wgAction == "edit" || wgAction == "submit") && mwCustomEditButtons) { 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/coasterpedia/images/4/41/RainbowButton.png",
		"speedTip": "Color Text",
		"tagOpen": "<span style='color:#000000'>",
		"tagClose": "</span>",
		"sampleText": "Colored text"
        };
}
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#Redirect [[",
     "tagClose": "]]",
     "sampleText": "Insert text"
   };
}
 

/** Date, Length Speed - Measurement Switch Buttons *****
  * Allows users to switch between American/International dates and Imperial/Metric measurements
  * Concept and request by [[User:Lachlan5963]]
  * Built by [[User:Lunarity]] 9 November 2012
  */

jQuery(function($) {
    "use strict";
    function stripZero(str) {
        return str.replace(/\.?0+$/, '');
    }
    function convert(toMetric) {
         $('.convertable-length').each(function() {
             var $this = $(this), text = $this.text(), org = $this.data('IMOrgVal'), num;
             // Sniff the string for imperial
             var m = (/(?:([\d,]+(?:\.\d+)?)(?:['′]|\s*f(?:ee|oo)?t\.?))?(?:\s*([\d,]+(?:\.\d+)?)(?:["″]|\s*in(?:che?s?)?\.?))?/).exec(text);
             if (m && (m[1] || m[2])) { // Imperial
                 if (!org) {
                     $this.data('IMOrgVal', org = { v: text, imp: true });
                 }
                 if (!toMetric) {
                     return;
                 }
                 if (org.imp) {
                     num  = (m[1] ? parseFloat(m[1].replace(/,/g, '')) * 12 : 0);
                     num += (m[2] ? parseFloat(m[2].replace(/,/g, '')) : 0);
                     num *= 0.0254;
                     $this.text(stripZero(num.toFixed(0)) + ' meters');
                 } else {
                     $this.text(org.v);
                 }
                 return;
             }
             if (!org) {
                 $this.data('IMOrgVal', org = { v: text, imp: false });
             }
             if (toMetric) {
                return;
             }
             // Sniff for metric
             m = (/([\d,]+(?:\.\d+)?)\s*m(?:ete?re?s)?/).exec(text);
             if (!m) {
                 return;
             }
             if (org.imp) {
                 $this.text(org.v);
                 return;
             }
             num = parseFloat(m[1].replace(/,/g, ''));
             num *= 3.2808399;
             $this.text(stripZero(num.toFixed(0)) + ' feet');
         });
    }
    function convertSpeed(toMetric) {
        $('.convertable-speed').each(function() {
            var $this = $(this), text = $this.text(), org = $this.data('IMSpeedOrg');
            // check
            var m = (/([\d,]+(?:\.\d+)?)\s*(k?m)p?\/?h/).exec(text);
            if (!m) {
                return;
            }
            if (!org) {
                $this.data('IMSpeedOrg', org = { v: text, imp: (m[2] === 'm') });
            }
            if (org.imp !== toMetric) {
                $this.text(org.v);
                return;
            }
            var num = parseFloat(m[1].replace(/,/g, ''));
            if (toMetric) {
                if (m[2] === 'm') {
                    num *= 1.60934;
                    $this.text(stripZero(num.toFixed(0)) + ' km/h');
                }
                return;
            }
            if (m[2] === 'km') {
                num /= 1.60934;
                $this.text(stripZero(num.toFixed(0)) + ' mph');
            }
        });
    }
    function flipDate(toUS) {
        $('.convertable-date').each(function() {
            var $this = $(this), text = $this.text();
            // US Date (specific, reduced case)
            var m = (/([A-Za-z]+)\s*(\d+)(?:\s*,\s*|\s+)(\d+)/).exec(text);
            if (m) {
                if (toUS) {
                    return;
                }
                $this.text(m[2] + ' ' + m[1] + ' ' + m[3]);
                return;
           }
           if (!toUS) {
               return;
           }
           // British/other data (reduced case)
           m = (/(\d+)\s+([A-Za-z]+)\s+(\d+)/).exec(text);
           if (m) {
               $this.text(m[2] + ' ' + m[1] + ', ' + m[3]);
           }
        });
    }
    // No convertables = exit
    if ($('.convertable-length, .convertable-date, .convertable-speed').length === 0) {
        return;
    }
    function onAriaPress(ev) {
        if (ev.which !== 32) { return; }
        ev.preventDefault();
        ev.stopPropagation();
        $(ev.target).click();
        return false;
    }
    var isMetric = false, isUS = false;
    var $button = $('<a role="button" id="MetricImperial" class="wikia-button">Metric Units</a>')
        .click(function(ev) {
            ev.preventDefault();
            convert(isMetric = !isMetric);
            convertSpeed(isMetric);
            try { window.localStorage.setItem('ConvertToMetric', isMetric); } catch(e) {}
            $(this).text(isMetric ? 'Imperial Units' : 'Metric Units');
        })
        .keypress(onAriaPress);
    var $button2 = $('<a role="button" id="DateConvert" class="wikia-button">International Dates</a>')
        .click(function(ev) {
            ev.preventDefault();
            flipDate(isUS = !isUS);
            try { window.localStorage.setItem('ConvertToUS', isUS); } catch(e) {}
            $(this).text(isUS ? 'International Dates' : 'US Dates');
        })
        .keypress(onAriaPress);
    if (window.localStorage.getItem('ConvertToMetric') === 'true') {
        $button.click();
    } else {
        convert(false);
        convertSpeed(false);
    }
    if (window.localStorage.getItem('ConvertToUS') === 'true') {
        $button2.click();
    } else {
        flipDate(false);
    }
    $('#WikiaPageHeader').find('.wikia-menu-button, .wikia-button').last().after($button.add($button2));
});
/*** END ***/

importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});

/* Easy archive tool for talk pages */
var ArchiveToolConfig = {
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivedtalk',
   archiveSubpage: 'Archive',
   userLang: true
};
importScriptPage('ArchiveTool/code.js', 'dev');


/* Auto Refresh Special:RecentChanges */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('AjaxRC/code.js', 'dev');
var ajaxRefresh = 10000;

 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js",
        "MediaWiki:Common.js/collapse.js"
    ]
});