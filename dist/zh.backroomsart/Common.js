(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0];
        if (!target) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        e.addEventListener('click', function () {
            console.log(target);
            if (target.paused || target.ended) {
                target.play();
            } else {
                target.pause();
            }
        });
    });
})();

mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
    
    $(".sitenotice-tab-container").each(function() {
		var container = $(this);
		function switchTab(offset) {
			return function() {
				var tabs = container.children(".sitenotice-tab").toArray();
				var no = Number(container.find(".sitenotice-tab-no")[0].innerText) + offset;
				var count = tabs.length;
				if (no < 1) no = count;
				else if (no > count) no = 1;
				for (var i = 0; i < count; i++)
					tabs[i].style.display = (i + 1 == no ? null : "none");
				container.find(".sitenotice-tab-no")[0].innerText = no;
			};
		}
		container.find(".sitenotice-tab-arrow.prev").click(switchTab(-1));
		container.find(".sitenotice-tab-arrow.next").click(switchTab(1));
	});
});

$.getJSON(mw.util.wikiScript("index"), {
    title: "MediaWiki:Custom-import-scripts.json",
    action: "raw"
}).done(function (result, status) {
    if (status != "success" || typeof (result) != "object") return;
    var scripts = result[mw.config.get("wgPageName")];
    if (scripts) {
        if (typeof (scripts) == "string") scripts = [scripts];
        importArticles({ type: "script", articles: scripts });
    }
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
           ]
});
(function (mw) {
  'use strict';

  var msg;

  function init(content) {
    content[0].querySelectorAll('.html5audio2:not(.loaded)').forEach(function (div) {
      var data = div.dataset;
      var file = data.file;
      if (!file) {
        return;
      }
      var format = file.split('.').pop().substr(0, 3);
      var preload = data.preload;
      var download = data.download;
      var options = data.options;
      var mediaid = '';
      mediaid = data.mediaid;
      var opts = { controls: '' };
      var volume = Number(Number(data.volume).toFixed(1));
      var start = parseFloat(data.start);
      var end = parseFloat(data.end);
      var repeatStart = parseFloat(data.repeatStart);
      var repeatEnd = parseFloat(data.repeatEnd);

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
      
      //if (!isNaN(media_id))
      //audio.setAttribute(classname, media_id);

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

      var source = document.createElement('source');
      source.src = file;
      source.type = 'audio/' + format;

      audio.append(source, msg('text').escape());

      if (volume >= 0 && volume <= 1) {
        audio.volume = volume;
      }
      
      var realid;
      if (mediaid !== '') {
      	  realid = 'media-id-'+mediaid;
	      audio.className = realid;
      }else{
      	realid = 'ERROR!!!';
      	audio.className = 'media-id-';
      }

	  div.innerHTML = '';
      div.appendChild(audio);
      div.classList.add('loaded');
      
      var eles = document.getElementsByClassName('js-action-play2');
      var elesnum = eles.length;
      var i = 0;var j = 0;
      var aud;var audnum;
      for(i=0;i<elesnum;i++){
      	var elepur = eles[i].getAttribute('data-media-id');
      	var elemode = '';
      	elemode = eles[i].getAttribute('data-media-mode');
      	if (!elepur) {
            console.error('No data-media-id present on element', eles[i]);
            //alert('No data-media-id present on element:'+ eles[i]);
        }
        
        if (elepur == mediaid){
	        aud = document.getElementsByClassName('media-id-'+ elepur);
	        audnum = aud.length;
	        j = 0;
	        var medi = aud[j];
	        for(j=0;j<audnum;j++){
	        	//eles[i].innerHTML = elepur+':-:'+mediaid+':-:'+medi.className;
	        	if (elemode == 'onlyplay'){
		        	eles[i].addEventListener('click', function(){
		        		//console.log(target);
			            if (medi.paused || medi.ended) {
			                medi.play();
			            }
		        	});
	        	}
	        	else if (elemode == 'onlypause'){
		        	eles[i].addEventListener('click', function(){
		        		//console.log(target);
			            if (medi.paused || medi.ended) {
			                //medi.play();
			            } else {
			                medi.pause();
			            }
		        	});
	        	}
	        	else if (elemode == 'onlyend'){
		        	eles[i].addEventListener('click', function(){
		        		//console.log(target);
			            if (medi.ended == false) {
			                medi.end();
			            }
		        	});
	        	}
	        	else {
		        	eles[i].addEventListener('click', function(){
		        		//console.log(target);
			            if (medi.paused || medi.ended) {
			                medi.play();
			            } else {
			                medi.pause();
			            }
		        	});
	        	}
	        }
        }
      }
      var ches = document.getElementsByClassName('html5audio2-check');
      var chesnum = ches.length;
      var i1 = 0;var j1 = 0;
      for(i1=0;i1<chesnum;i1++){
      	var chesex = '';
      	chesex = ches[i1].getAttribute('data-ex');
      	var chesmode = '';
      	chesmode = ches[i1].getAttribute('data-mode');
      	var chesstyle = '';
      	chesstyle = ches[i1].getAttribute('data-ex-style');
      	if (chesex == '') {
            console.error('No data-ex present on element', ches[i1]);
            //alert('No data-media-id present on element:'+ eles[i]);
        }
        if (chesmode == 'hide') {
        	ches[i1].innerHTML = '';
        }else {
        	ches[i1].innerHTML = chesex;
        }
        ches[i1].style = chesstyle;
      }
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