/* KillAnimatedAvatars
 *
 * Now that GIF icons may come for everyone officially able to be uploaded through Wikia, might aswell.
 * Keeps animated avatars from autoplaying, optionally resuming it on hover.
 * 
 * @author Dorumin
 */

(function() {
  if (
    !window.fetch ||
    (window.KillAnimatedAvatars && KillAnimatedAvatars.init)
  ) return;

  window.KillAnimatedAvatars = $.extend({
    // Configuration option, in case someone REALLY dislikes animated avatars
    resumeOnHover: true,
    // Object<src, canvas> Canvases cache
    canvases: {},
    // Selectors for all images that will be treated as potential gif avatars
    selectors: 'img.avatar, .wds-avatar__image,  #Rail .User img, #Write > img',
    // Selectors for the containers that when you hover over them, all children images matched by [this.selectors] will animate
    containers: 'img.avatar, .wds-avatar__image, #Rail .User, .Chat > ul > li:not(.inline-alert), .replies > .SpeechBubble, .message-1 > .speech-bubble-message, #notifications .notification, #Write > img',
    // @returns Promise<boolean>
    isAnimated: function(url) {
      return fetch(url, {
        method: 'HEAD'
      }).then(function(response) {
        return response.headers.get('Content-Type') == 'image/gif';
      });
    },
    // @returns Promise<canvas>
    loadCORSImage: function(url) {
      var that = this;
      return new Promise(function(resolve, reject) {
        if (that.canvases[url]) {
          resolve(that.canvases[url]);
          return;
        }
        var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          img = new Image();

        img.setAttribute('crossOrigin', 'anonymous');
        img.src = url.replace(/\w+\.wikia\.nocookie\.net/, 'images.wikia.com');
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            resolve(canvas);
        };
        img.onerror = function() {
            reject('[KillAnimatedAvatars] Failed to get image:' + img.src);
        };
      });
    },
    freezeAnimation: function(_, img) {
      if (!img.getAttribute('data-gif')) return;
      img.classList.remove('playing-animation');
      img.classList.add('frozen-animation');

      this.loadCORSImage(img.getAttribute('data-gif')).then(function(canvas) {
        try {
          img.src = canvas.toDataURL('image/gif');
        } catch(e) {
          // ¯\_(ツ)_/¯
          console.log('¯\\_(ツ)_/¯', e);
        }
      })['catch'](console.log);
    },
    resumeAnimation: function(_, img) {
      if (!img.getAttribute('data-gif')) return;
      img.classList.remove('frozen-animation');
      img.classList.add('playing-animation');

      var src = img.getAttribute('data-gif') || img.src;
      img.src = src;
    },
    // Maps a matched element to its children avatars, with some exceptions thrown in for a smoother experience
    mapContainerToImage: function(elem) {
      var $container = $(elem).closest(this.containers);

      if ($container.is('.Chat > ul > li')) { // Chat message hover fix
        while ($container.is('.continued')) {
          $container = $container.prev();
        }
      } else if ($container.is('.message-1 > .speech-bubble-message')) { // For the first message in forum posts, RIP Forum
        $container = $container.prev();
      }

      return $container.is(this.selectors) ? $container : $container.find(this.selectors);
    },
    init: function() {
      var that = this;
      $(that.selectors).each(function() {
        var img = this;
        if (img.getAttribute('data-gif')) return;
        that.isAnimated(img.src).then(function(result) {
          if (result) {
            img.setAttribute('data-gif', img.src);
            that.freezeAnimation(null, img);
          }
        });
      });
      if (!that.resumeOnHover) return;
      $(document)
        .on('mouseenter', that.containers, function() {
          var $images = that.mapContainerToImage(this);
          $images.each(that.resumeAnimation.bind(that));
        })
        .on('mouseleave', that.containers, function() {
          var $images = that.mapContainerToImage(this);
          $images.each(that.freezeAnimation.bind(that));
        });
    }
  });

  KillAnimatedAvatars.init();
})();