// DiscussionsRC
// RC-like feed for Discussions
// @author Noreplyz
// @version 0.3
// Work in progress!
// <nowiki>

;(function($, mw) {
   'use strict';

   // Loads or checks for DiscussionsRC
   if (window.discRC) {
      return;
   }
   if (mw.config.get('wgPageName') === mw.config.get('wgFormattedNamespaces')[-1] + ':DiscussionsRC') {
      $('h1.page-header__title').text('DiscussionsRC');
      document.title = 'DiscussionsRC | ' + mw.config.get('wgSiteName') + ' | Fandom';
      $('#WikiaMainContent, #content').empty().append($('<div>', {id: 'discrc'}));
   }
   if (!$('#discrc').length) {
      return;
   }
   var discRC = {};
   discRC.wikis = [];
   discRC.entries = [];
   var dRCAPI = {};

	dRCAPI.msg;
   // API request for wiki variables
   dRCAPI.getWikiVariables = function(apipath, timeout) {
      if (!apipath.match(/\.(fandom|wikia)\.(com|org)/g)) {
          apipath = '//' + apipath + '.wikia.com/api.php';
      }
      return $.ajax({
         url: apipath,
         type: 'GET',
         format: 'json',
         dataType: 'jsonp',
         crossDomain: 'true',
         timeout: timeout ? timeout : 5000,
         xhrFields: {
            withCredentials: true
         },
         data: {
            action: 'query',
            meta: 'siteinfo',
            siprop: ['general', 'variables'].join('|'),
            format:'json'
         }
      });
   };

   // Returns API request for list of posts from Discussions
   dRCAPI.getPosts = function(baseUrl, limit, page, reported, viewableOnly) {
      return $.ajax({
         url: baseUrl + '/wikia.php?controller=DiscussionPost&method=getPosts',
         type: 'GET',
         format: 'json',
         crossDomain: 'true',
         xhrFields: {
            withCredentials: true
         },
         data: {
            limit: limit,
            page: page,
            responseGroup: 'small',
            reported: reported,
            containerType: 'FORUM',
            viewableOnly: viewableOnly
         }
      });
   };

   // Returns API request for list of posts in a thread from Discussions
   dRCAPI.getThread = function(baseUrl, threadId, page, limit, viewableOnly) {
      return $.ajax({
         url: baseUrl + '/wikia.php?controller=DiscussionThread&method=getThread&threadId=' + threadId,
         type: 'GET',
         format: 'json',
         crossDomain: 'true',
         xhrFields: {
            withCredentials: true
         },
         data: {
            limit: limit,
            page: page,
            responseGroup: 'full',
            sortDirection: 'descending',
            sortKey: 'creation_date',
            viewableOnly: viewableOnly
         }
      }).then(function(thread) {
         // NB: As of when this hunk was introduced, `sortDirection=ascending` appears to be
         //     interpreted as `sortDirection=descending` when `sortKey=creation_date`. Here,
         //     we're matching the official client's approach of requesting with a descending
         //     sort order, then reversing the replies client-side.
         if (Object.prototype.hasOwnProperty.call(thread._embedded, 'doc:posts')) {
            thread._embedded['doc:posts'].reverse();
         }
         return thread;
      });
   };

   // Mustache templates
   discRC.templates = {
      // Individual RC entry
      rcEntry: '<li class="drc-entry">' + 
         '{{^singleWiki}}{{wiki.wiki}} . . {{/singleWiki}}' + 
         '{{#title}}<span class="drc-new" title="{{newPostTooltip}}"><svg class="wds-icon wds-icon-tiny"><use xlink:href="#wds-icons-{{newPostIcon}}-tiny"></use></svg></span>{{/title}}{{^title}}<span class="drc-reply" title="' + dRCAPI.msg('new-reply').escape() + '">R</span>{{/title}} . . ' +
         '(<span class="drc-view" data-city="{{wiki.id}}" data-thread="{{threadId}}"{{^title}} data-reply="{{id}}"{{/title}}><a>view</a></span>) . . ' +
         '<span class="drc-title">{{#title}}<a href="{{wiki.baseUrl}}/f/p/{{threadId}}">{{title}}{{/title}}{{^title}}<a href="{{wiki.baseUrl}}/f/p/{{threadId}}/r/{{id}}">{{threadtitle}}{{/title}}</a></span> ' + 
         'on <span class="drc-forumname"><a href="{{wiki.baseUrl}}/f?catId={{forumId}}">{{forumName}}</a></span>; ' + 
         '<span class="drc-timestamp">{{creationDate.dateString}}</span> . . ' + 
         '<span class="drc-creator"><a href="{{wiki.baseUrl}}/wiki/User:{{createdBy.name}}">{{createdBy.name}}</a></span> '+ 
         '<span class="mw-usertoollinks">(<a href="{{wiki.baseUrl}}/wiki/User talk:{{createdBy.name}}">wall</a> | <a href="{{wiki.baseUrl}}/wiki/Special:Contributions/{{createdBy.name}}">contribs</a> | <a href="{{wiki.baseUrl}}/f/u/{{createdBy.id}}">posts</a> | <a href="{{wiki.baseUrl}}/wiki/Special:Block/{{createdBy.name}}">block</a>)</span> . . ' + 
         '<span class="drc-snippet">({{truncatedContent}})</span>' + 
         '</li>',
      mainPost: '<div class="drc-post-header"><h2>{{post.title}}</h2><div class="drc-post-hlinks">' +
            '<span class="drc-post-category">in <a href="{{wiki.baseUrl}}/f?catId={{post.forumId}}">{{post.forumName}}</a></span> | ' +
            '<span class="drc-post-dlink"><a href="{{wiki.baseUrl}}/f/p/{{post.id}}">' + dRCAPI.msg('view-post-in-discussions-link').escape() + '</a></span></div></div>' +
            '<div class="drc-post{{#isHighlighted}} drc-post-highlighted{{/isHighlighted}}">' +
            '<div class="drc-post-avatar"><img src="{{post.createdBy.avatarUrl}}/zoom-crop/width/40/height/40" srcset="{{post.createdBy.avatarUrl}}/zoom-crop/width/40/height/40, {{post.createdBy.avatarUrl}}/zoom-crop/width/80/height/80 2x"/></div><div class="drc-post-author">{{post.createdBy.name}}' +
            ' &bull; <a href="{{wiki.baseUrl}}/wiki/Special:Contributions/{{post.createdBy.name}}">contribs</a> &bull; <a href="{{wiki.baseUrl}}/f/u/{{post.createdBy.id}}">posts</a></div>' +
            '<div class="drc-post-date"><a href="{{wiki.baseUrl}}/f/p/{{post.id}}">{{date}}</a></div>' +
            '<div class="drc-post-content">{{post.rawContent}}</div>' +
         '</div>',
      postReply: '<div class="drc-post-reply{{#isHighlighted}} drc-post-highlighted{{/isHighlighted}}">' +
            '<div class="drc-post-avatar"><img src="{{post.createdBy.avatarUrl}}/zoom-crop/width/40/height/40" srcset="{{post.createdBy.avatarUrl}}/zoom-crop/width/40/height/40, {{post.createdBy.avatarUrl}}/zoom-crop/width/80/height/80 2x"/></div><div class="drc-post-author">{{post.createdBy.name}}' +
            ' &bull; <a href="{{wiki.baseUrl}}/wiki/Special:Contributions/{{post.createdBy.name}}">contribs</a> &bull; <a href="{{wiki.baseUrl}}/f/u/{{post.createdBy.id}}">posts</a></div>' +
            '<div class="drc-post-date"><a href="{{wiki.baseUrl}}/f/p/{{post.threadId}}/r/{{post.id}}">{{date}}</a></div>' +
            '<div class="drc-post-content">{{post.rawContent}}</div>' +
         '</div>'
   };

   // Render a template using Mustache
   discRC.render = function(template, args) {
      return $(
         Mustache.render(template, args)
      );
   };

   /**
    * Truncate a string over a given length and add ellipsis if necessary
    * @param {string}  str - string to be truncated
    * @param {integer} limit - max length of the string before truncating
    * @return {string} truncated string
    */
   discRC.truncate = function(str, limit) {
      return (str.length < limit) ? str : str.substring(0, limit).replace(/.$/gi, '...');
   };

   // Pad numbers if 0-9 with an extra 0
   discRC.timePad = function(n) {
      return (n < 10) ? '0' + n : n;
   };

   // Loads posts and places them into discRC.entries
   discRC.generatePosts = function(wikis, page) {
      var promises = [];
      $.each(wikis, function(i, wiki) {
         var promise = dRCAPI.getPosts(wiki.baseUrl, 100, page, false, true).done(function(data) {
            if (data._embedded['doc:posts'].length > 0) {
               $.each(data._embedded['doc:posts'], function(i, post) {
                  var postDate = new Date(post.creationDate.epochSecond * 1000);
                  post.creationDate.dateString = discRC.timePad(postDate.getHours()) + ':' + discRC.timePad(postDate.getMinutes());
                  post.truncatedContent = discRC.truncate(post.rawContent, 50);
                  if (post.title === null) {
                     post.threadtitle = post._embedded.thread[0].title;
                  } else {
                     switch (post.funnel) {
                        case 'LINK':
                           post.newPostIcon = 'link';
                           post.newPostTooltip = dRCAPI.msg('new-link-post').plain();
                           break;
                        case 'IMAGE':
                           post.newPostIcon = 'image';
                           post.newPostTooltip = dRCAPI.msg('new-image-post').plain();
                           break;
                        case 'POLL':
                           post.newPostIcon = 'poll';
                           post.newPostTooltip = dRCAPI.msg('new-poll-post').plain();
                           break;
                        default:
                           console.warn('Unexpected funnel type "%s" for post %s', post.funnel, post.threadId);
                           /* fall through */
                        case 'TEXT':
                           post.newPostIcon = 'text';
                           post.newPostTooltip = dRCAPI.msg('new-text-post').plain();
                           break;
                     }
                  }
                  post.wiki = wiki;
                  post.singleWiki = wikis.length === 1;
                  discRC.entries.push({
                     time: postDate,
                     entry: discRC.render(discRC.templates.rcEntry, post)
                  });
               });
            } else {
               $('#discrc').prepend(dRCAPI.msg('unavailableNoPosts', encodeURIComponent(wiki.wiki)).plain());
            }
         }).fail(function() {
            $('#discrc').prepend(dRCAPI.msg('unavailable', encodeURIComponent(wiki.wiki)).plain());
         });
         promises.push(promise);
      });
      $.when.apply(null, promises).then(function() {
         discRC.showAllPosts();
      });
   };

   // Shows all posts that have been stored in discRC.entries
   discRC.showAllPosts = function() {
      $('#discrc').append('<ul id="discrc-list"></ul>');
      discRC.entries.sort(function(a, b) {
         return a.time > b.time ? -1 : 1;
      });
      var currDate = new Date(1900, 1, 1);
      $.each(discRC.entries, function(i, e) {
         if (currDate.getDate() !== e.time.getDate() ||
             currDate.getMonth() !== e.time.getMonth() || 
             currDate.getFullYear() !== e.time.getFullYear()) {
            $('#discrc-list').append('<h2>' + e.time.getDate() + ' ' + mw.config.get('wgMonthNames')[e.time.getMonth() + 1] + ' ' + e.time.getFullYear() + '</h2>');
         }
         $('#discrc-list').append(e.entry);
         currDate = e.time;
      });
   };

   // Click events
   // @pre data-city is always a valid city ID
   discRC.events = function() {
      $('#discrc').on('click', '.drc-view', function() {
         var cityId = $(this).attr('data-city');
         var wiki = discRC.wikis.filter(function(wiki) {
            return wiki.id.toString() === cityId.toString();
         })[0];
         console.log(wiki);
         var threadId = $(this).attr('data-thread');
         var replyId = $(this).attr('data-reply');
         dRCAPI.getThread(wiki.baseUrl, threadId, 0, 100, false).then(function(thread) {
            console.log('got threads');
            // Format the date
            var date = new Date(thread.creationDate.epochSecond * 1000);
            date = discRC.timePad(date.getHours()) + ':' + discRC.timePad(date.getMinutes()) + ', ' + date.getDate() + ' ' + mw.config.get('wgMonthNames')[date.getMonth() + 1] + ' ' + date.getFullYear();
            // Fix avatar
            if (!thread.createdBy.avatarUrl) {
               thread.createdBy.avatarUrl = 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest';
            }
            // Place into box
            $('#drc-view-post-content').empty().append(
               discRC.render(
                  discRC.templates.mainPost, {
                     post: thread,
                     wiki: wiki,
                     date: date,
                     isHighlighted: (replyId === undefined)
                  }
               )
            );
            window.dev.modal.modals['drc-view-post']._modal.updateSize();
            if (!Object.prototype.hasOwnProperty.call(thread._embedded, 'doc:posts')) {
               return;
            }
            // For each post, put into box as well
            $.each(thread._embedded['doc:posts'], function(i, post) {
               // Format date
               var date = new Date(post.creationDate.epochSecond * 1000);
               date = discRC.timePad(date.getHours()) + ':' + discRC.timePad(date.getMinutes()) + ', ' + date.getDate() + ' ' + mw.config.get('wgMonthNames')[date.getMonth() + 1] + ' ' + date.getFullYear();
               // Fix avatar
               if (!post.createdBy.avatarUrl) {
                  post.createdBy.avatarUrl = 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest';
               }
               $('#drc-view-post-content').append(
                  discRC.render(discRC.templates.postReply, {
                     post: post,
                     wiki: wiki,
                     date: date,
                     isHighlighted: (post.id === replyId)
                  })
               );
               window.dev.modal.modals['drc-view-post']._modal.updateSize();
            });
            var highlightedPost = document.querySelector('#drc-view-post-content .drc-post-highlighted');
            if (highlightedPost !== null) {
               highlightedPost.scrollIntoView({block: 'center'});
            }
         }, function(err) {
            $('#drc-view-post-content').empty().append(
               'Post not found'
            );
         });
         if (!discRC.modal) {
            discRC.modal = new window.dev.modal.Modal({
               title: 'DiscussionsRC',
               content: '<div id="drc-view-post-content"></div>',
               id: 'drc-view-post',
               width: 600,
               size: 'large',
               buttons: [{text: 'Close', label: 'Close', flags: ['safe', 'close'] }],
               callback: function(wrapper) {
                  wrapper.find('button.close.wikia-chiclet-button > img').replaceWith('<svg class="wds-icon"><use xlink:href="#wds-icons-close"></use></svg>');
               }
            });
            discRC.modal.create();
            discRC.modal.show();
            console.log('showed');
         } else {
            discRC.modal.show();
         }
      });
   };

   // Loads wiki variables, checks if wikis have Discussions and
   // starts generating posts for each wiki
   discRC.init = function() {
      $('#discrc').empty();
      var loadWikiList = $('#discrc').data('wiki');
      var wikiLoadPromises = [];
      if (loadWikiList) {
         $.each(loadWikiList.split(','), function(i, wiki) {
            var promise = dRCAPI.getWikiVariables(wiki).done(function(data) {
               discRC.wikis.push({
                  id: $.grep(data.query.variables, function(e) {return e.id === 'wgCityId';})[0]['*'],
                  baseUrl: data.query.general.server + data.query.general.scriptpath,
                  wiki: data.query.general.wikiid,
                  name: data.query.general.sitename
               });
            }).fail(function() {
               $('#discrc').prepend(dRCAPI.msg('error', encodeURIComponent(wiki)).plain() + '<br />');
            });
            wikiLoadPromises.push(promise);
         });
      } else {
         discRC.wikis.push({
            id: mw.config.get('wgCityId'),
            baseUrl: mw.config.get('wgServer') + mw.config.get('wgScriptPath'),
            wiki: mw.config.get('wgDBname'),
            name: mw.config.get('wgSiteName')
         });
      }
      importArticles({
         type: 'style',
         articles: [
            'u:dev:MediaWiki:DiscussionsRC.css',
         ]
      });
      (function() {
         // To support theme designer and personal customizations, we'll define:
         //  - `background-color` for `.drc-post-header` from `.modalWrapper` in <https://github.com/Wikia/app/blob/release-866.001/skins/shared/modal.scss#L14>; and
         //  - `background-color` for `.drc-post-highlighted` from `.SpeechBubble .speech-bubble-message.current` in <https://github.com/Wikia/app/blob/release-866.001/skins/oasis/css/core/SpeechBubble.scss#L103>.
         //
         // Note that whilst some of the above properties are trivially based on
         // values that we can access via `sassParams`, we'll elect to observe
         // these properties directly for consistency.
         //
         // In most cases, the stylesheets upon which we depend _should_ be loaded
         // by the time we reach here.

         // Generate the following tree:
         // ```haml
         // .sandbox(style="display: none;")
         //    .modalWrapper
         //    .SpeechBubble
         //       .speech-bubble-message.current
         // ```
         var modalWrapper = document.createElement('div');
         modalWrapper.className = 'modalWrapper';
         var speechBubbleMessage = document.createElement('div');
         speechBubbleMessage.className = 'speech-bubble-message current';
         var speechBubble = document.createElement('div');
         speechBubble.className = 'SpeechBubble';
         speechBubble.appendChild(speechBubbleMessage);
         var sandbox = document.createElement('div');
         sandbox.style.display = 'none';
         sandbox.appendChild(modalWrapper);
         sandbox.appendChild(speechBubble);

         // Insert into DOM, observe the properties in which we're interested, then clean up.
         document.body.appendChild(sandbox);
         var headerBackgroundColor = getComputedStyle(modalWrapper).backgroundColor;
         var highlightBackgroundColor = getComputedStyle(speechBubbleMessage).backgroundColor;
         document.body.removeChild(sandbox);

         // Generate and insert our stylesheet into the DOM.
         var generatedStyles = document.createElement('style');
         generatedStyles.appendChild(document.createTextNode(
            '.drc-post-header{background-color:' + headerBackgroundColor + ';}' +
            '.drc-post-highlighted{background-color:' + highlightBackgroundColor + ';}'
         ));
         document.head.appendChild(generatedStyles);
      }());
      $.get(mw.config.get('wgExtensionAssetsPath') + '/wikia/DesignSystem/node_modules/design-system/dist/svg/sprite.svg').done(function(svgDocument) {
         $('body').prepend(svgDocument.rootElement);
      });

      $.when.apply(null, wikiLoadPromises).always(function() {
         discRC.generatePosts(discRC.wikis, 0);
         discRC.events();
      });
   };
   importArticle({
       type: 'script',
       article: [
          'u:dev:MediaWiki:Modal.js',
          'u:dev:MediaWiki:I18n-js/code.js'
       ]
   });
   mw.hook('dev.i18n').add(function (i18n) {
		i18n.loadMessages('DiscussionsRC').done(function (i18no) {
			dRCAPI.msg = i18no.msg;
            mw.hook('dev.modal').add(function() {
               mw.loader.using('mediawiki.template.mustache', function() {
                  discRC.init();
               });
            });
		});
	});
   window.discRC = discRC;
})(jQuery, mediaWiki);
// </nowiki>