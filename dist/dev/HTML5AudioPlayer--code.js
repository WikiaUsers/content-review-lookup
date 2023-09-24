/**
 * @name HTML5AudioPlayer
 * @author Manuel de la Fuente (https://manuelfte.com)
 * @author KockaAdmiralac <1405223@gmail.com>
 * @version 1.5.1
 * @license CC-BY-SA-3.0
 * @description Play audio files with a native HTML5 player
 */

(function (mw) {
  'use strict';

  var msg;

  function init(content) {
    content[0].querySelectorAll('.html5audio:not(.loaded)').forEach(function (div) {
      var data = div.dataset;
      var file = data.file;
      if (!file) {
        return;
      }
      var format = file.split('.').pop().substr(0,3);
      var preload = data.preload;
      var download = data.download;
      var options = data.options;
      var opts = { controls: '' };
      var volume = Number(Number(data.volume).toFixed(1));
  
      if (format === 'mp3') {
        format = 'mpeg';
      }
  
      if (preload !== 'auto' && preload !== 'metadata') {
        preload = 'none';
      }
      opts.preload = preload;
  
      if (download === 'false') {
        opts.controlsList = 'nodownload';
      }
  
      if (options) {
        var valid = ['autoplay', 'loop', 'muted'];
        options.split(',').forEach(function (el) {
          el = el.trim();
          if (valid.indexOf(el) !== -1) {
            opts[el] = '';
          }
        });
      }
  
      var audio = document.createElement('audio');
  
      Object.keys(opts).forEach(function (attr) {
        var value = opts[attr];
        audio.setAttribute(attr, value);
      });
  
      var source = document.createElement('source');
      source.src = file;
      source.type = 'audio/' + format;
  
      audio.append(
        source,
        msg('text').escape()
      );
  
      if (volume >= 0 && volume <= 1) {
        audio.volume = volume;
      }
  
      div.innerHTML = '';
      div.appendChild(audio);
      div.classList.add('loaded');
    });
  }
  mw.hook('dev.i18n').add(function(i18n) {
    i18n.loadMessages('HTML5AudioPlayer').done(function(i18no) {
      msg = i18no.msg;
      mw.hook('wikipage.content').add(init);
    });
  });
  importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js'
  });
})(window.mediaWiki);