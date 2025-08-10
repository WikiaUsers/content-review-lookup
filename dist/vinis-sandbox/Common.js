// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
		
		$(".css-button").click(function() {
			css.disabled = !css.disabled;
		});
	});
});

/* Get Username */

$(function($, user) {
    if (user !== '') {
        $('.insertusername').text(user);
    }
}(window.jQuery, (window.mw.config.get('wgUserName') || '')));

/* Adiciona evento para inicializar o áudio apenas quando o collapsible for aberto */
(function (mw) {
  'use strict';

  function initializeAudioOnExpand() {
    document.querySelectorAll('.mw-collapsible').forEach(function (collapsible) {
      collapsible.addEventListener('beforeExpand', function () {
        collapsible.querySelectorAll('.html5audio:not(.loaded)').forEach(function (div) {
          var data = div.dataset;
          var files = [];
          var sources = [];

          for (var attr in data) {
            if (attr.startsWith('file')) {
              var suffix = attr.substring(4);
              var index = parseInt(suffix.substring(1)) || (suffix === '' ? 0 : null);
              if (index != null) files[index] = data[attr];
            }
          }

          files = files.filter(Boolean);

          files.forEach(function (file, n) {
            var source = document.createElement('source');
            source.src = file;
            sources.push(source);
          });

          if (!sources.length) return;

          var audio = document.createElement('audio');
          audio.controls = true;
          sources.forEach(function (source) {
            audio.appendChild(source);
          });

          div.innerHTML = '';
          div.appendChild(audio);
          div.classList.add('loaded');
        });
      });
    });
  }

  mw.hook('wikipage.content').add(initializeAudioOnExpand);
})(window.mediaWiki);