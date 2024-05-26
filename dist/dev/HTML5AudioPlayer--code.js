
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
      var files = [];
      var sources = [];

      // Find all data-file attributes
      for (var attr in data) {
          if (attr.startsWith("file")) {
              // Get suffix, "file" for data-file, "-1" for data-file-1
              var s = attr.substring(4);
              // Get number, 0 for data-file, 1 for data-file-1, null for anything else
              var n = parseInt(s.substring(1)) || (s === '' ? 0 : null);
              if (n != null) files[n] = data[attr];
          }
      }

      // Remove missing elements
      files = files.filter(function(f){ return f; });

      for (var n = 0; n < files.length; n++) {

          var file = files[n];
          var format;
          
          // Get type from attribute, if specified
          format = data["fileType" + (n > 0 ? "-" + n : "")];

          // Otherwise get type from extension of URL. This is prone to issues.
          // (Might be better to do a HEAD request for each file in the future)
          if (!format) {

              var f = files[n];
              
              // Trim query string portion if it exists
              var queryIndex = f.lastIndexOf('?');
              if (queryIndex != -1)
                  f = f.substring(0, queryIndex);

              // Don't try to use extension when it doesn't exist, and don't try to use extensions
              // that have more than 4 characters (as they're likely not a part of the file name)
              var dotIndex = f.lastIndexOf('.');
              if (dotIndex != -1 && f.length - (dotIndex + 1) <= 4)
                  format = f.substring(dotIndex + 1);
          }

          if (format && format.length > 0) {
              // Change mp3 to mpeg
              if (format == "mp3")
                  format = "mpeg";
              // Add the audio MIME type prefix if it doesn't already exist
              if (!format.startsWith("audio/"))
                  format = "audio/" + format;
          }

          var source = document.createElement("source");
          source.src = file;
          if (format) source.type = format;
          sources.push(source);
      }

      if (sources.length == 0) return;
        
      var preload = data.preload;
      var download = data.download;
      var options = data.options;
      var opts = { controls: '' };
      var volume = Number(Number(data.volume).toFixed(1));
      var start = parseFloat(data.start);
      var end = parseFloat(data.end);
      var repeatStart = parseFloat(data.repeatStart);
      var repeatEnd = parseFloat(data.repeatEnd);

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

      // Start point
      if (!isNaN(start))
        audio.currentTime = start;

      // End point
      if (!isNaN(end)) {
        var autoPauseUpdate = function () {
          if (audio.currentTime >= end) {
            // Ignore seeks
            if (!audio.seeking) audio.pause();
            audio.removeEventListener('timeupdate', autoPauseUpdate);
          }
        };
        audio.addEventListener('timeupdate', autoPauseUpdate);
      }

      // If either repeat value is set
      if (!isNaN(repeatStart) || !isNaN(repeatEnd)) {

        // Default repeatStart to 0
        if (isNaN(repeatStart) || repeatStart < 0) repeatStart = 0;

        audio.addEventListener('loadedmetadata', function () {
          // Default repeatEnd to duration
          if (isNaN(repeatEnd) || repeatEnd > audio.duration)
            repeatEnd = audio.duration;

          // If repeating the entire duration, just enable loop instead
          if (repeatStart == 0 && repeatEnd == audio.duration) {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('seeking', onSeeking);
            audio.removeEventListener('ended', onEnded);
            audio.setAttribute('loop', '');
            enableRepeat = false;
          }

          // If repeating very close to the end, don't regular loop since it will interfere
          else if (repeatEnd > audio.duration - 0.25)
            audio.removeAttribute('loop');
        });

        var enableRepeat = true;

        var onTimeUpdate = function (e) {
          // When paused/seeking and not ended, don't repeat
          // (the ended check ensures that a repeatEnd position at the end of the audio will still repeat)
          if (!enableRepeat) return;
          if (audio.paused && !audio.ended) return;

          // Set currentTime back to repeatStart when its over repeatEnd
          if (audio.currentTime >= repeatEnd)
            audio.currentTime = repeatStart;
        };

        // Fired continuously on seek, when a loop occurs, or when repeating
        var onSeeking = function () {
          // Disable repeating if we're seeking past the repeat end point
          enableRepeat = audio.currentTime < repeatEnd;
        }

        // Fired when the audio ends, but never when looping via the attribute
        var onEnded = function () { audio.play(); }

        audio.addEventListener('ended', onEnded);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('seeking', onSeeking);
      }

      Element.prototype.replaceChildren.apply(audio, sources);
      audio.append(msg('text').escape());

      if (volume >= 0 && volume <= 1) {
        audio.volume = volume;
      }

      div.innerHTML = '';
      div.appendChild(audio);
      div.classList.add('loaded');
    });
  }
  mw.hook('dev.i18n').add(function (i18n) {
    i18n.loadMessages('HTML5AudioPlayer').done(function (i18no) {
      msg = i18no.msg;
      mw.hook('wikipage.content').add(init);
    });
  });
  importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js'
  });
})(window.mediaWiki);