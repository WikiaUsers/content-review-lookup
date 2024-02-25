//<pre>
// Discussions Posts Viewer
// Button from Special:Contribs that shows all Discussions posts and replies
// @author: Jr Mime
// @author: Noreplyz
(function() {
  var config = mw.config.get([
    'wgServer',
    'wgScriptPath',
    'profileUserId',
    'wgUserLanguage'
  ]);
  if (
    window.dpv ||
    !config.profileUserId ||
    config.profileUserId === '0'
  ) {
    return;
  }
  var dpv = {};
  var preloads = 3;

  importArticles({
    type: 'script',
    articles: [
    	'u:dev:MediaWiki:I18n-js/code.js',
    	'u:dev:MediaWiki:ShowCustomModal.js'
    ]
  });

  importArticle({
    type: "style",
    article: "u:dev:MediaWiki:DiscussionsViewer.css"
  });

  dpv.preload = function() {
	if (--preloads === 0) {
      window.dev.i18n.loadMessages('DiscussionsViewer').done(dpv.init);
	}
  };

  dpv.init = function(i18n) {
    dpv.i18n = i18n;
    
    var interval = setInterval(function () {
    	if (!$('.user-profile-navigation').length) {
    		return;
    	}
    	clearInterval(interval);
    	
    	$('.user-profile-navigation').append(
    		$('<li>', {
    			class: 'user-profile-navigation__link false',
    			append: $('<a>', {
    				id: 'dpv',
    				text: dpv.i18n.msg('viewPosts').plain(),
    				href: '#',
    				click: dpv.click
    			})
    		})
    	);
    }, 100);
  };

  dpv.click = function() {
    dpv.type = 'discussions';
    window.dev.showCustomModal('', {
      content: $('<div>').append(
        $('<ul>', {
          'class': 'wds-tabs',
          'id': 'dpv-tabs'
        }).append(
          ['discussions', 'wall-posts', 'comments'].map(function(msg, index) {
            return $('<li>', {
              'class': index === 0 ?
                'wds-tabs__tab wds-is-current' :
                'wds-tabs__tab',
              'click': function() {
                dpv.type = msg;
                $('#dpv-tabs .wds-is-current').removeClass('wds-is-current');
                $(this).addClass('wds-is-current');
                dpv.getPosts();
              }
            }).append(
              $('<div>', {
                'class': 'wds-tabs__tab-label'
              }).append(
                $('<a>', {
                  href: '#',
                  text: dpv.i18n.msg(msg).plain()
                })
              )
            );
          })
        ),
        $('<div>', {
          id: 'dpv-view-posts'
        })
      ),
      id: 'dpv-view-post',
      width: 600,
      buttons: []
    });
    dpv.getPosts();
  };


  // Mustache templates
  dpv.templates = {
    mainPost: '<div class="dpv-post dpv-{{locked}}">' +
      '<div class="dpv-post-avatar"><img src="{{post.createdBy.avatarUrl}}"/></div><div class="dpv-post-top"><span class="dpv-post-author">{{post.createdBy.name}}</span>' +
      ' &bull; <a href="{{wiki}}/wiki/Special:Contributions/{{post.createdBy.name}}">{{i18nContribs}}</a>' +
      ' &bull; <a href="{{postUrl}}">{{i18nPosts}}</a>' +
      ' &bull; {{i18nIn}} <a href="{{boardUrl}}">{{boardName}}</a></div>' +
      '<div class="dpv-post-date"><a href="{{postUrl}}">{{date}}</a></div>' +
      '<h2>{{post.title}}</h2>' +
      '<div class="dpv-post-content">{{post.rawContent}}{{{post.renderedContent}}}' +
      '{{#img}}<br><img class="dpv-post-image" srv="{{img}}" srcset="{{img}}/scale-to-width-down/420 420w, {{img}}/scale-to-width-down/520 520w, {{img}} 600w" sizes="(min-width: 1575px) 640px, (min-width:1064px) 520px, 100vw">{{/img}}</div>' +
      '<div class="dpv-post-dlink"><a href="{{postUrl}}">{{i18nView}}</a></div>' +
      '</div></div><br>',
    postReply: '<div class="dpv-post-reply dpv-{{locked}}">' +
      '<div class="dpv-post-avatar"><img src="{{post.createdBy.avatarUrl}}" /></div><div class="dpv-post-author dpv-post-top">{{post.createdBy.name}}' +
      ' &bull; <a href="{{wiki}}/wiki/Special:Contributions/{{post.createdBy.name}}">{{i18nContribs}}</a> &bull; <a href="{{wiki}}/f/u/{{post.createdBy.id}}">{{i18nPosts}}</a></div>' +
      '<div class="dpv-post-date"><a href="{{postUrl}}">{{date}}</a></div>' +
      '<div class="dpv-post-content">{{post.rawContent}}{{{post.renderedContent}}} ' +
      '{{#img}}<br><img class="dpv-post-image" srv="{{img}}" srcset="{{img}}/scale-to-width-down/420 420w, {{img}}/scale-to-width-down/520 520w, {{img}} 600w" sizes="(min-width: 1575px) 640px, (min-width:1064px) 520px, 100vw">{{/img}}</div>' +
      '<div class="dpv-post-dlink"><a href="{{postUrl}}">{{i18nView}}</a></div>' +
      '</div><br>'
  };

  // Render a template using Mustache
  dpv.render = function(template, args) {
    return $(
      Mustache.render(template, args)
    );
  };

  dpv.typeToContainerType = {
    'comments': 'ARTICLE_COMMENT',
    'discussions': 'FORUM',
    'wall-posts': 'WALL'
  };
  
  dpv.getArticleTitle = function(forumId) {
    //return "???" as to not break the rest of the JS
    return '???';
    var cache = {};
    if (Object.keys(cache).length && cache[forumId]) {
      return cache[forumId];
    }
    //TODO: needs to be fixed to not be a mass of callbacks, doesn't work as is
    $.get(mw.util.wikiScript('wikia.php'), {
      controller: 'ArticleComments',
      method: 'getArticleTitle',
      stablePageId: forumId
    }).done(function (data) {
      //needed due to wikia.php not including the namespace, so we have to find out if it's an article comment or blog comment ourselves
      $.get(mw.util.wikiScript('api.php'), {
        action: 'query',
        formatversion: 2,
        format: 'json',
        titles: (data.title + '|User Blog:' + data.title)
      }).done(function (response) {
        //will result in nothing if both pages have been deleted, maybe check the deletion log too?
        var page = response.query.pages[0].filter(function (item) {
          return !item.missing;
        });
        cache[forumId] = page.title;
        //return the page var here too
      });
    });
  };

  dpv.getBoardName = function(post, other) {
    switch (dpv.type) {
      case 'discussions': return post.forumName;
      // TODO: This is not right (may not work on non-English wikis)
      case 'wall-posts': return dpv.i18n.msg('message-wall', post.forumName.replace(/ Message Wall$/, '')).plain();
      case 'comments': return dpv.getArticleTitle(post.forumId);
    }
  };

  dpv.getBoardUrl = function(post, other) {
    switch (dpv.type) {
      case 'discussions': return config.wgScriptPath + '/f?catId=' + post.forumId;
      // TODO: This is not right (may not work on non-English wikis)
      case 'wall-posts': return mw.util.getUrl('Message Wall:' + post.forumName.replace(/ Message Wall$/, ''));
      case 'comments': return mw.util.getUrl(dpv.getArticleTitle(post.forumId));
    }
  };

  dpv.getPostUrl = function(post, other) {
    var url;
    switch (dpv.type) {
      case 'discussions':
        url = config.wgScriptPath + '/f/p/' + post.threadId;
        if (post.isReply) {
          return url + '/r/' + post.id;
        }
        return url;
      // TODO: This is not right (may not work on non-English wikis)
      case 'wall-posts':
        url = mw.util.getUrl('Message Wall:' + post.forumName.replace(/ Message Wall$/, ''), {
          threadId: post.threadId
        });
        if (post.isReply) {
          return url + '#' + post.id;
        }
        return url;
      case 'comments':
        url = mw.util.getUrl(dpv.getArticleTitle(post.forumId), {
          commentId: post.threadId
        });
        if (post.isReply) {
          return url + '&replyId=' + post.id;
        }
        return url;
    }
  };

  dpv.getPosts = function() {
    $.get(mw.util.wikiScript('wikia'), {
          controller: 'DiscussionContribution',
          method: 'getPosts',
          userId: config.profileUserId,
          responseGroup: 'full',
          limit: 100,
          viewableOnly: false,
          containerType: dpv.typeToContainerType[dpv.type]
    }).done(function(data) {
      $("#dpv-view-posts").empty();
      var posts = data._embedded['doc:posts'];


      // For each post, put into box as well
      $.each(posts, function(i, post) {
        var option = "none",
            imgURL;
        // Format date
        var date = new Date(post.creationDate.epochSecond * 1000).toLocaleString(config.wgUserLanguage, {
        	dateStyle: 'medium',
        	timeStyle: 'short'
        });
        // Fix avatar
        if (!post.createdBy.avatarUrl) {
          post.createdBy.avatarUrl = 'https://images.wikia.com/messaging/images/1/19/Avatar.jpg';
        }

        // If post is over 196 characters, cut
        if (post.rawContent.length >= 196) {
          post.rawContent = post.rawContent.substring(0, 195) + "...";
        }

        // Add Discussions images
        if (post._embedded.contentImages && post._embedded.contentImages[0]) {
          imgURL = post._embedded.contentImages[0].url;
        }

        // If it's a reply
        if (post.isReply) {
          // Options if the post is reported, deleted or locked
          if (post.isReported) option = "report";
          if (post.isDeleted) option = "delete";

          $('#dpv-view-posts').append(
            dpv.render(dpv.templates.postReply, {
              post: post,
              date: date,
              wiki: config.wgServer + config.wgScriptPath,
              locked: option,
              img: imgURL,
              boardUrl: dpv.getBoardUrl(post),
              boardName: dpv.getBoardName(post),
              postUrl: dpv.getPostUrl(post),
              i18nContribs: dpv.i18n.msg('contribs').plain(),
              i18nPosts: dpv.i18n.msg('posts').plain(),
              i18nView: dpv.i18n.msg('view').plain()
            })
          );
        } else
          // If a post
          if (!post.isReply) {
            // Options if the post is reported, deleted or locked
            if (post.isReported) option = "report";
            if (post._embedded.thread[0].isLocked) option = "lock";
            if (post.isDeleted) option = "delete";

            $('#dpv-view-posts').append(
              dpv.render(dpv.templates.mainPost, {
                post: post,
                date: date,
                wiki: config.wgScriptPath,
                locked: option,
                img: imgURL,
                boardUrl: dpv.getBoardUrl(post),
                boardName: dpv.getBoardName(post),
                postUrl: dpv.getPostUrl(post),
                i18nContribs: dpv.i18n.msg('contribs').plain(),
                i18nPosts: dpv.i18n.msg('posts').plain(),
                i18nView: dpv.i18n.msg('view').plain(),
                i18nIn: dpv.i18n.msg('in').plain()
              })
            );
          }
      });
    });
  };

  window.dpv = dpv;

  mw.hook('dev.i18n').add(dpv.preload);
  mw.hook('dev.showCustomModal').add(dpv.preload);
  mw.loader.using([
      'mediawiki.template.mustache',
      'mediawiki.util'
  ]).then(dpv.preload);
})();
//</pre>