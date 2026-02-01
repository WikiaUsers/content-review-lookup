/* Any JavaScript here will be loaded for all users on every page load. */
  if (mw.config.get('wgPageName') === 'Calculator') {
      mw.loader.getScript('/wiki/MediaWiki:CalculationEngine.js?action=raw&ctype=text/javascript')
          .then(function() {
              return mw.loader.getScript('/wiki/MediaWiki:DamageCalculator_Core.js?action=raw&ctype=text/javascript');
          })
          .then(function() {
              return mw.loader.getScript('/wiki/MediaWiki:DamageCalculator_UI.js?action=raw&ctype=text/javascript');
          });
  }