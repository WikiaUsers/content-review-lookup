/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('wikipage.content').add(function($wikipageContent){
  (function() {
      var $animated = $wikipageContent.find('.animated').addClass('animated-visible');
      var animateds = [];
      $animated.each(function() {
          animateds.push({
              $: $(this).find('> .animated-subframe').addBack().find('> *:not(.animated-subframe)'),
          });
      });
      $.each(animateds, function() {
          var minHeight = 0,
              differentHeights;
          this.$.each(function() {
              var height = this.offsetHeight;
              differentHeights = differentHeights || minHeight && height !== minHeight;
              minHeight = Math.max(height, minHeight);
          });
          if (differentHeights) {
              this.height = minHeight;
          }
      });
      $animated.each(function(i) {
          $(
              this).css('min-height', animateds[i].height);
      }).removeClass('animated-visible');
  }());
  (function() {
      var $content = $('#mw-content-text');
      var advanceFrame = function(parentElem, parentSelector) {
          var curFrame = parentElem.querySelector(parentSelector + ' > .animated-active');
          $(curFrame).removeClass('animated-active');
          var $nextFrame = $(curFrame && curFrame.nextElementSibling || parentElem.firstElementChild);
          return $nextFrame.addClass('animated-active');
      };
      var hidden;
      if (typeof document.hidden !== 'undefined') {
          hidden = 'hidden';
      } else if (typeof document.msHidden !== 'undefined') {
          hidden = 'msHidden';
      } else if (typeof document.webkitHidden !== 'undefined') {
          hidden = 'webkitHidden';
      }
      setInterval(function() {
          if (hidden && document[hidden]) {
              return;
          }
          $content.find('.animated').each(function() {
              if ($(this).hasClass('animated-paused')) {
                  return;
              }
              var $nextFrame = advanceFrame(this, '.animated');
              if ($nextFrame.hasClass('animated-subframe')) {
                  advanceFrame($nextFrame[0], '.animated-subframe');
              }
          });
      }, 2000);
  }());
});