/**
 *  Notify When Copy
 ** Add license notify when visitor copy article contents
 ** Author: 机智的小鱼君 & Fandom dev wiki users
 *  LOGs
 ** 18:06, August 24, 2019 (UTC): Beta post
 ** 17:36, August 25, 2019 (UTC): Now allow custom message; Make url shorter for non-en wikis
 ** 04:46, August 29, 2019 (UTC): Use Fetch.js instead of mw.api; Fixed an issue where notifications were out of screen due to too many copy actions
 **/
require([
    'jquery',
    'mw',
    'wikia.window',
    'BannerNotification'
], function($, mw, window, Banner) {
  mw.hook('dev.fetch').add(function(fetch) {
    function init(i18n) {
      // Start
      fetch(['Edit', 'License-description', 'Custom-copynotify', 'Custom-copynotify-' + wgPageName]).then(function(mwMsg) {

        // Variables
        var license = $('.license-description a').prop('outerHTML'),
        licenseDescriptionMsg = mwMsg()[1].replace('$1', license),
        customMsg = mwMsg()[2],
        customPageMsg = mwMsg()[3],

        defaultMsg = i18n.msg('youCopiedArticle').escape().replace('$1', '<span style="font-weight:bold;">' + wgSiteName + '</span>').replace('$2', licenseDescriptionMsg) + '<br/>' + i18n.msg('indicateSource').escape().replace('$1', '<span style="font-style:italic;font-weight:bold;">' + decodeURIComponent(location.href) + '</span>'),

        finalMsg;

        // Get custom messages
        if (customPageMsg !== undefined && customPageMsg !== '-' && customPageMsg !== '') {
          finalMsg = customPageMsg.replace(/\$sitename/ig, wgSiteName).replace(/\$url/ig, decodeURIComponent(location.href)).replace(/\$license/ig, licenseDescriptionMsg);
        } else if (customMsg !== undefined && customMsg !== '-' && customMsg !== '') {
          finalMsg = customMsg.replace(/\$sitename/ig, wgSiteName).replace(/\$url/ig, decodeURIComponent(location.href)).replace(/\$license/ig, licenseDescriptionMsg);
        } else {
          finalMsg = defaultMsg;
        }
        var debugMsg = 'defaultMsg is:<br/>' + defaultMsg + '<hr/>customMsg is:<br/>' + customMsg + '<hr/>customPageMsg is:<br/>' + customPageMsg + '<hr/>finalMsg is:<br/>' + finalMsg;

        // Output
        $(window).on('copy',
        function() {
          if ($('#copy-notify').length > 0) {
            // If notification exist, shake it~
            jQuery.fn.shake = function(intShakes, intDistance, intDuration) {
              this.each(function() {
                var jqNode = $(this);
                jqNode.css({
                  position: 'relative'
                });
                for (var x = 1; x <= intShakes; x++) {
                  jqNode.animate({
                    left: (intDistance * -1)
                  },
                  (((intDuration / intShakes) / 4))).animate({
                    left: intDistance
                  },
                  ((intDuration / intShakes) / 2)).animate({
                    left: 0
                  },
                  (((intDuration / intShakes) / 4)));
                }
              });
              return this;
            };
            $("#copy-notify").parent().parent().shake(4, 10, 250);
          } else {
            // If notification not exist, output it~
            new Banner('<div id="copy-notify">' + finalMsg + '</div>', 'warn').show();
          }
        });

      });
      // End
    }
    mw.hook('dev.i18n').add(function(i18no) {
      i18no.loadMessages('NotifyWhenCopy').then(init);
    });

  });
  importArticles({
    type: 'script',
    articles: ['u:dev:MediaWiki:I18n-js/code.js', 'u:dev:MediaWiki:Fetch.js']
  });
});