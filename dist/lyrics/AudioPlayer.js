(function ($, mw) {
  'use strict';

  function LoadPlayers(){
      var prefs = window.codeLoad.getScriptPrefs("AudioPlayer");
      var cats = mw.config.get('wgCategories');
      var loadSp = cats.indexOf('Spotify/Song') > -1 && prefs.loadSpotify;
      var loadBc = cats.indexOf('Bandcamp/Song') > -1 && prefs.loadBandcamp;

      if (loadSp || loadBc) {
        var tbx = $(".lyricbox");
        var rtl = tbx.parent().attr("dir") === 'rtl';
        var gpl = $("<div>").css({
            float: rtl ? "left" : "right",
            clear: "both",
            margin: "0",
            width: "252px"
        });

        if (loadSp) {
          var spLink = document.querySelector("a.external[href^='https://open.spotify.com/track/']");
          if (spLink) {
            gpl.append($("<iframe>").attr({
                src: "https://embed.spotify.com/?uri=spotify:track:" + spLink.href.slice(-22),
                width: "252",
                height: "80"
            }));
          }
        }

        if (loadBc) {
          var bcLink = document.querySelector(".extlink[data-bandcamp-id]");
          if (bcLink) {
            gpl.append($("<iframe>").attr({
                src: "https://bandcamp.com/EmbeddedPlayer/v=2/size=large/tracklist=false/artwork=none/bgcol=282828/linkcol=cccccc/transparent=true/track=" + bcLink.dataset.bandcampId,
                width: "252",
                height: "115"
            }));
          }
        }

        tbx.before(gpl);
      }
  }

  // in view mode on mainspace page?
  if (mw.config.get('wgAction') === 'view' && mw.config.get('wgNamespaceNumber') === 0) {
      LoadPlayers();
  }

}(jQuery, mediaWiki));