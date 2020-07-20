//ChatAvatarUserPageLink - Count of Howard
//21-9-16 - Initial build
//12-10-16 - mw.config.get cleanup 
 
;(function($, mw) {
  if (mw.config.get("wgCanonicalSpecialPageName") !== "Chat") {
    return;
  }
  
  var mwVariables = mw.config.get([
    'wgServer',
    'wgArticlePath'
  ]);
 
  $.each(['show', 'hide'], function (i, ev) {
    var el = $.fn[ev];
    $.fn[ev] = function () {
      this.trigger(ev);
      el.apply(this, arguments);
      return el;
    };
  });
 
  $('#UserStatsMenu').on('show', function() {
    var avatar = $('#UserStatsMenu .info > img');
    //Pretty messy way to get the proper username
    var username = $("#UserStatsMenu .info ul").children(".username").text().replace(/ /g,"_");
    var address = mwVariables.wgServer + mwVariables.wgArticlePath.replace( "$1", "User:" + username);
    $(avatar).wrap("<a href=" + address + " target='_blank'></a>");
  });
}) (this.jQuery, this.mediaWiki);