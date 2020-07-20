$(function() {
    if (wgNamespaceNumber !== 0) {
        var perfil = $('.WikiaUserPagesHeader h1').html();
        $('head').append('<style>@import url("http://tvskins.wikia.com/wiki/User:' + perfil + '/ca.css?action=raw&ctype=text/css');
    };
});

$(function() {
  var codi    = $('.soundcloud').data('codi') || '';
  var player  = '<iframe width="100%" height="120" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + codi + '&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>';
  if (codi != '') {
  $('.mw-content-ltr').prepend(playerlatino);
  };
});

function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "nomusuari");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
} 
addOnloadHook(UserNameReplace);

$(function() {
    var lastEdited = $.extend({
        size: true,
        time: false
    }, window.lastEdited);
    if (mw.config.get('wgNamespaceNumber') == 0) {
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'revisions',
            rvprop: 'timestamp|user|size',
            format: 'json'
        }, function(data) {
            for (var i in data.query.pages) break;
            var rv = data.query.pages[i].revisions[0];
                oasis = '.WikiaPageHeader';
                monobook = '.firstHeading';
          var text = '<div class="lastEdited" style="border-bottom: 1px solid #5f0; margin-bottom: 10px; padding: 3px;"><span style="font-weight: bold;">Últim editor:</span> <a href="/wiki/User:' + encodeURIComponent(rv.user) + '">' + rv.user + '</a> (' + new Date(rv.timestamp).toUTCString().slice(5, 16) + ')';
            if (lastEdited.size) {
              text += '<br /><span style="font-weight: bold;">Mida:</span> ' + rv.size + ' bytes';
            }
            text += '</div>';
          if (skin === 'oasis') {
            $(oasis).after(text);
          } else {
            $(monobook).after(text);
          }
        });
    }
});

$(function () {
  $('.default-infobox-container .default-infobox-title').append('<span id="fletxa">▼</span>');
  $('.default-infobox-container tr + tr + tr').hide();
  $('#fletxa').toggle(function () {
    $(this).text('▲');
    $('.default-infobox-container tr + tr + tr').toggle(400);
  }, function () {
    $(this).text('▼');
    $('.default-infobox-container tr + tr + tr').toggle(400);
  });
});

importArticles({
	type: 'script',
	articles: [
		'u:dev:Countdown/code.js',
		'MediaWiki:Facebook.js'
	]
});