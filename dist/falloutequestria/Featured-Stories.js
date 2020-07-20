      // Add create functionallity to older browsers
      if (typeof Object.create !== 'function') {
          Object.create = function (obj) {
              function F() {};
              F.prototype = obj;
              return new F();
          };
      }

      (function ($, document, window, undefined) {
          var plugin = {
              init: function (options, elem) {

                  self = this;
                  self.elem = elem;
                  self.$elem = $(elem);

                  self.options = $.extend({}, $.fn.feqFeaturedStories.options, options);

                  self.story = 0;
                  self.stories = new Array();

                  $(self.$elem).find('.external').each(function () {
                      self.stories.push(self.jsonForStory(this.text));
                  });

                  self.timer = window.setInterval(self.display(), self.options.interval);
              },

              display: function () {

                  if (self.stories[self.story - 1] !== 'undefined') self.stories[self.story - 1][self.options.transition](self.options.transitionDelay, self.$elem.empty());

                  var wrap = $('<div/>', {
                      class: "featured-stories-wrap",
                      style: "display:hidden;"
                  });
                  var element = $('<div/>', {
                      class: "featured-stories-element"
                  });
                  var subWrap = $('<div/>', {
                      class: "featured-stories-subWrap"
                  });
                  var subElement = $('<div/>', {
                      class: "featured-stories-subElement"
                  });
                  var prev = $('<div/>', {
                      class: "featured-stories-prev"
                  });
                  var next = $('<div/>', {
                      class: "featured-stories-next"
                  });

                  subWrap.append(subElement);
                  element.append(subWrap, [prev, next]);
                  wrap.append(element);

                  self.$elem[self.options.transition](self.options.transitionDelay);

                  self.story = self.story < self.stories.length ? self.story + 1 : 0;
              },

              jsonForStory: function (url) {
                  var requestUrl = (self.options.apiQuery + url);
                  var result = $.ajax({
                      type: "GET",
                      url: requestUrl,
                      dataType: "jsonp",
                      async: false,
                      success: function (response) {
                          console.log(response);
                      }
                  });
              },

              setUserConf: function () {
                  $.cookie('showSideStories', self.options.showSideStories, {
                      expires: 30,
                      path: '/'
                  });
              },

              getUserConf: function () {
                  self.options.showSideStories = $.cookie('showSideStories') !== null ? $.cookie('showSideStories') : self.options.showSideStories;
              }
          };

          $.fn.feqFeaturedStories = function (options) {
              return this.each(function () {
                  var Plugin = Object.create(plugin);
                  Plugin.init(options, this);
              });
          };

          $.fn.feqFeaturedStories.options = {
              apiQuery: "http://www.fimfiction.net/api/story.php?story=",
              showSideStories: false,
              transition: 'fadeToggle',
              transitionDelay,
              interval: 12000
          };

      })(jQuery, document, window);

      //$('#featuredStoriesBox').feqFeaturedStories();