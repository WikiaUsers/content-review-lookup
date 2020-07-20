/**
 * @name DiscussionsActivity
 * @author Manuel de la Fuente (https://manuelfte.com)
 * - Based on DiscussionsFeed (http://dev.wikia.com/wiki/DiscussionsFeed)
 *   by Flightmare (http://elderscrolls.wikia.com/wiki/User:Flightmare)
 * @version 0.9.7.8
 * @license CC-BY-SA-3.0
 * @description Creates a special page for latest Discussions messages
 * @todo Double check the HTML and CSS, they have to be the most similar possible to those of the Wiki Activity and Discussions
 * @todo Link to load more (the link should become unclickable while the discussions are being retrieved to prevent overloading)
 * @todo Support for Monobook
 * @todo Option to filter between threads and comments
 */
/* eslint-env browser */
/* jshint esversion:3, maxparams:3, maxdepth:2, maxstatements:10, maxcomplexity:5 */
(function () {
  'use strict';

  console.log('DiscussionsActivity v0.9.7.8');

  var config = window.mw.config.get([
    'wgCanonicalNamespace',
    'wgCityId',
    'wgTitle',
    'wgUserGroups',
    'wgUserName'
  ]);
  var i18n;
  var container;
  var blockers = ['sysop', 'staff', 'helper', 'vstf', 'global-discussions-moderator'];
  var canBlock = blockers.some(function (role) { return config.wgUserGroups.indexOf(role) > -1; });
  var isMod = Boolean(canBlock || config.wgUserGroups.indexOf('threadmoderator') > -1);
  var wallsEnabled = false;
  var interval = (window.rdaRefreshInterval >= 30000 ? window.rdaRefreshInterval : 60000);
  var timeout;
  var escapeHTML = function (str) { return (str ? window.mw.html.escape(str) : ''); };
  var thumbSize = function (h, w) { if (w > 200) { h = Math.floor(h * (200 / w)); w = 200; } return {height: h, width: w}; };
  /**
   * Converts timestamp to "X time ago"
   */
  function epochToTimeAgo (epoch) {
    var elapsed = (Math.floor(new Date().getTime()) - new Date(epoch * 1000)) / 1000;
    var factors = [['seconds', 60], ['minutes', 60], ['hours', 24], ['days', 30], ['months', 12], ['years']];
    var unit;
    var i = 0;

    for (; i < factors.length && elapsed >= factors[i][1]; i++) {
      elapsed /= factors[i][1];
    }

    unit = factors[i][0];
    elapsed = Math.floor(elapsed);

    return i18n(unit + '_ago_' + (elapsed > 1 ? 'plural' : 'singular'), elapsed).escape();
  }
  /**
   * Gets the necessary information about each post
   */
  function postInfo (post) {
    var data = {
      title: escapeHTML(post._embedded.thread[0].title),
      text: escapeHTML(post.rawContent.length > 250 ? post.rawContent.substring(0, 250).trim() + '...' : post.rawContent),
      userName: escapeHTML(post.createdBy.name),
      userNameEncoded: null,
      userID: post.createdBy.id,
      avatarURL: post.createdBy.avatarUrl,
      time: epochToTimeAgo(post.creationDate.epochSecond),
      image: post._embedded.contentImages[0],
      openGraph: post._embedded.openGraph,
      messageID: post.id,
      threadID: post.threadId,
      forumName: escapeHTML(post.forumName),
      forumID: post.forumId,
      isReply: post.isReply,
      isReported: (isMod ? post.isReported : undefined),
      isLocked: post._embedded.thread[0].isLocked,
      isDeleted: null,
      isMessageDeleted: post.isDeleted,
      isThreadDeleted: post._embedded.thread[0].isDeleted,
      deleter: null,
      deleterID: null
    };

    data.userNameEncoded = data.userName.replace(/ /g, '_'); // Username with spaces replaced with underscores (if any)
    if (!data.avatarURL) {
      data.avatarURL = 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest';
    // Images within the 'messaging' folder need this to be resized, with the others is the opposite
    } else if (data.avatarURL.indexOf('/messaging/') > -1) {
      data.avatarURL = data.avatarURL.replace(/[^jpg]*$/, '') + '/revision/latest'; // That regex removes any extra parameters after the file extension
    }
    data.isDeleted = Boolean(data.isThreadDeleted || data.isMessageDeleted);
    if (data.isMessageDeleted) {
      data.deleter = post.lastDeletedBy.name;
      data.deleterID = post.lastDeletedBy.id;
    }

    return data;
  }
  /**
   * Creates the header of the item
   */
  function headerItem (data) {
    var icon = {
      css: ['new', 'talk'],
      title: [i18n('icon_title_thread').escape(), i18n('icon_title_reply').escape()]
    };
    var i = (data.isReply ? 1 : 0);
    var header =
      '<img class="' + icon.css[i] + ' sprite" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" alt="' + icon.title[i] + '" title="' + icon.title[i] + '" width="16" height="16">' +
      ' <strong><a class="title" href="/d/p/' + data.threadID + '">' + data.title + '</a></strong>' +
      ' ' + i18n('in').escape() + ' <a class="rda-category" href="/d/f?catId=' + data.forumID + '&sort=latest">' + data.forumName + '</a>';

    return header;
  }
  /**
   * Creates the row of content
   */
  function contentRow (data) {
    var subtitle = i18n(data.isReply ? 'commented_by' : 'created_by').escape();
    var blockButton = (canBlock ? ' | <a class="rda-block" href="/wiki/Special:Block/' + data.userNameEncoded + '">' + i18n('block').escape() + '</a>' : '');
    var talk = {
      link: ['User_talk', 'Message_Wall'],
      text: [i18n('talk').escape(), i18n('wall').escape()],
      css: ['rda-talk', 'rda-wall']
    };
    var i = (wallsEnabled ? 1 : 0);
    var row =
      '<tr>' +
        '<td>' +
          '<img src="' + data.avatarURL + '/scale-to-width-down/50" width="30" height="30" class="avatar rda-avatar" alt="' + data.userName + '">' +
        '</td>' +
        '<td>' +
          '<p>' +
            '<cite>' +
              '<span class="subtle">' + subtitle + '</span>' +
              ' <a class="real-name rda-username" href="/d/u/' + data.userID + '">' + data.userName + '</a> (<a class="' + talk.css[i] + '" href="/wiki/' + talk.link[i] + ':' + data.userNameEncoded + '">' + talk.text[i] + '</a> | <a class="rda-contribs" href="/wiki/Special:Contributions/' + data.userNameEncoded + '">' + i18n('contribs').escape() + '</a>' + blockButton + ')' +
              ' <a class="subtle rda-time" href="/d/p/' + data.threadID + '/r/' + data.messageID + '">' + data.time + '</a>' +
            '</cite>' +
          '</p>' +
          '<p>' +
            '<span class="rda-content">' + data.text + '</span>' +
          '</p>' +
        '</td>' +
      '</tr>';

    return row;
  }
  /**
    * Creates the row for embedded image
    */
  function imageRow (image, tbody) {
    if (!image) {
      return;
    }
    var thumbnail = thumbSize(image.height, image.width);
    var fragment = document.createRange().createContextualFragment(
      '<template>' +
        '<tr data-type="inserted-image">' +
          '<td></td>' +
          '<td>' +
            '<ul class="activityfeed-inserted-media rda-inserted-media reset">' +
              '<li>' +
                '<a data-image-link="" href="' + image.url + '">' +
                  '<img src="' + image.url + '/scale-to-width-down/200" width="' + thumbnail.width + '" height="' + thumbnail.height + '" class="rda-image">' +
                '</a>' +
              '</li>' +
            '</ul>' +
          '</td>' +
        '</tr>' +
      '</template>'
    );
    tbody.appendChild(fragment.firstChild.content);
  }
  /**
    * Creates the row for Open Graph embed
    */
  function openGraphRow (openGraph, tbody) {
    if (!openGraph) {
      return;
    }
    var title = escapeHTML(openGraph[0].title);
    var url = escapeHTML(openGraph[0].url);
    var description = escapeHTML(openGraph[0].description);
    var siteName = escapeHTML(openGraph[0].siteName);
    var image = openGraph[0].imageUrl;
    var imageWrapper = '';
    if (image) {
      var thumbnail = thumbSize(openGraph[0].imageHeight, openGraph[0].imageWidth);
      var videoClass = (openGraph[0].videoUrl ? ' og-video-thumbnail' : '');
      imageWrapper =
        '<div class="og-image-wrapper' + videoClass + '">' +
          '<img src="' + image + '/scale-to-width-down/200" width="' + thumbnail.width + '" height="' + thumbnail.height + '" alt="' + title + '" class="og-image rda-image" /><!---->' +
        '</div>';
    }
    var fragment = document.createRange().createContextualFragment(
      '<template>' +
        '<tr>' +
          '<td></td>' +
          '<td>' +
            '<a target="_blank" title="' + url + '" href="' + url + '" class="og-container large-image-card-mobile small-image-card-desktop ember-view"><!---->' +
              imageWrapper +
              '<div class="og-texts">' +
                '<span class="og-title">' + title + '</span>' +
                '<span class="og-description">' + description + '</span>' +
                '<span class="og-site-name">' + siteName + '</span>' +
              '</div>' +
            '</a>' +
          '</td>' +
        '</tr>' +
      '</template>'
    );
    tbody.appendChild(fragment.firstChild.content);
  }
  /**
   * Creates the row for status (that shows if a message is deleted, reported or locked)
   */
  function statusRow (data, tbody) {
    var status = {
      isDeleted: {
        type: 'deleted',
        icon: 'trash',
        iconTitle: i18n('icon_title_deleted').escape(),
        subtitle: (data.isMessageDeleted ? i18n('message_deleted_by').escape() + ' <a class="rda-deleter" href="/d/u/' + data.deleterID + '">' + data.deleter + '</a>' : i18n('parent_thread_deleted').escape()),
        css: 'rda-deleted'
      },
      isReported: {
        type: 'reported',
        icon: 'error',
        iconTitle: i18n('icon_title_reported').escape(),
        subtitle: i18n('message_reported').escape(),
        css: 'rda-reported'
      },
      isLocked: {
        type: 'locked',
        icon: 'lock',
        iconTitle: i18n('icon_title_locked').escape(),
        subtitle: i18n(data.isReply ? 'parent_thread_locked' : 'thread_locked').escape(),
        css: 'rda-locked'
      }
    };
    var key = Object.keys(status).find(function (e) { return data[e] === true; });
    if (!key) {
      return;
    }
    var textSpan = tbody.getElementsByClassName('rda-content')[0]; // Span that contains the text of the post
    var fragment = document.createRange().createContextualFragment(
      '<template>' +
        '<tr>' +
          '<td></td>' +
          '<td class="rda-status-' + status[key].type + '">' +
            '<cite>' +
              '<img class="' + status[key].icon + ' sprite rda-icon-' + status[key].type + '" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" alt="' + status[key].iconTitle + '" title="' + status[key].iconTitle + '" width="16" height="16" />' +
              '<span class="subtle">' + status[key].subtitle + '</span>' +
            '</cite>' +
          '</td>' +
        '</tr>' +
      '</template>'
    );
    tbody.appendChild(fragment.firstChild.content);
    textSpan.classList.add(status[key].css); // Assigns class to content
  }
  /**
   * Creates each of the list items
   */
  function buildItem (post, ul) {
    var data = postInfo(post);
    var header = headerItem(data);
    var content = contentRow(data);
    var itemFrag = document.createRange().createContextualFragment(
      '<li class="activity-type-discussion rda-entry">' +
        header +
        '<table class="wallfeed">' +
          '<tbody>' +
            content +
          '</tbody>' +
        '</table>' +
      '</li>'
    );
    var li = itemFrag.firstChild;
    var tbody = li.getElementsByTagName('tbody')[0];
    // Functions that will add extra rows if needed
    imageRow(data.image, tbody);
    openGraphRow(data.openGraph, tbody);
    statusRow(data, tbody);
    // Appends the element to the list
    ul.appendChild(itemFrag);
  }
  /**
   * Creates the HTML of the list
   */
  function buildList (response) {
    var listFrag = document.createRange().createContextualFragment('<ul class="activityfeed rda-feed reset" id="myhome-activityfeed"></ul>');
    var ul = listFrag.firstChild;
    for (var i = 0; i < response.length; i++) {
      buildItem(response[i], ul);
    }
    listFrag.appendChild(document.createRange().createContextualFragment('<div class="activity-feed-more"><a href="#" data-since="2018-02-09T04:10:20Z">see more recent activity</a></div>'));
    container.innerHTML = '';
    container.appendChild(listFrag);
  }
  /**
   * Gets posts
   */
  function getPosts () {
    return new Promise(function (resolve, reject) {
      var viewableOnly = (isMod && localStorage.getItem('rdaShowDeleted') === 'false' ? true : !isMod); // Checks whether to get deleted posts
      var request = new XMLHttpRequest();
      request.timeout = 30000;
      request.ontimeout = function () {
        resolve('error_no_connection'); // This and the two last cases below should be rejections but stupid ES3 minifier won't let me use catches
      };
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          switch (request.status) {
            case 200:
              resolve(JSON.parse(request.responseText)._embedded['doc:posts']);
              break;
            case 404:
              resolve('error_discussions_disabled');
              break;
            default:
              resolve('error_no_connection');
          }
        }
      };
      request.open('GET', 'https://services.wikia.com/discussion/' + config.wgCityId + '/posts?limit=50&viewableOnly=' + viewableOnly, true);
      request.setRequestHeader('Accept', 'application/hal+json');
      request.withCredentials = true;
      request.send();
    });
  }
  /**
   * Loads Discussions list
   */
  function loadDiscussions (response, loadingEl) {
    function createTimeout (el) {
      if (timeout) {
        clearTimeout(timeout);
      }
      var autoRefresh = Boolean(JSON.parse(localStorage.getItem('rdaAutoRefresh')));
      timeout = (autoRefresh ? setTimeout(loadDiscussions, interval, null, el) : timeout);
    }
    if (!response) {
      loadingEl.classList.add('rda-loading');
      getPosts()
        .then(function (response) {
          buildList(response);
          createTimeout(loadingEl);
          loadingEl.classList.remove('rda-loading');
        });
      return;
    }
    buildList(response);
    createTimeout(document.getElementById('rda-chbx-autorefresh'));
  }
  /**
   * Sets checkboxes
   */
  function checkboxes () {
    var header = document.getElementsByClassName('page-header__main')[0];
    var chbxsFrag = document.createRange().createContextualFragment('<div id="rda-checkboxes"></div>');
    var div = chbxsFrag.firstChild;

    function makeChbx (name, id, cookie) {
      var frag = document.createRange().createContextualFragment(
        '<span id="' + id + '">' +
          '<label>' + name + '</label>' +
          '<input type="checkbox" />' +
        '</span>'
      );
      if (localStorage.getItem(cookie) !== 'false') {
        var input = frag.firstChild.childNodes[1];
        input.checked = true;
      }
      div.appendChild(frag);
    }
    // Creates checkbox for auto refresh
    makeChbx(i18n('checkbox_auto_refresh').escape(), 'rda-chbx-autorefresh', 'rdaAutoRefresh');
    // Creates checkbox for show deleted
    if (isMod) {
      makeChbx(i18n('checkbox_show_deleted').escape(), 'rda-chbx-showdeleted', 'rdaShowDeleted');
    }
    // Appends checkboxes to header
    header.appendChild(chbxsFrag);
    // Sets function for checkbox for auto refresh
    var autoRefresh = document.getElementById('rda-chbx-autorefresh').childNodes[1];
    autoRefresh.onchange = function () {
      // If checked, sets value in localStorage and reloads discussions
      if (autoRefresh.checked) {
        localStorage.setItem('rdaAutoRefresh', 'true');
        loadDiscussions(null, autoRefresh.parentElement);
      // If unchecked, sets value in localStorage and clears timeout without reloading
      } else {
        localStorage.setItem('rdaAutoRefresh', 'false');
        clearTimeout(timeout);
      }
    };
    // Sets function for checkbox for show deleted
    if (isMod) {
      var showDeleted = document.getElementById('rda-chbx-showdeleted').childNodes[1];
      showDeleted.onchange = function () {
        // Sets value in localStorage, whether true or false
        if (showDeleted.checked) {
          localStorage.setItem('rdaShowDeleted', 'true');
        } else {
          localStorage.setItem('rdaShowDeleted', 'false');
        }
        // Reloads discussions to hide/unhide deleted messages while passing the element to show loading icon
        loadDiscussions(null, showDeleted.parentElement);
      };
    }
  }
  /**
   * Checks whether wiki uses Talk Pages or Message Walls
   */
  function checkWalls () {
    return new Promise(function (resolve, reject) {
      var cookie = localStorage.getItem('rdaWallsEnabled');
      if (cookie) {
        wallsEnabled = Boolean(JSON.parse(cookie));
        return resolve();
      }
      var request = new XMLHttpRequest();
      request.timeout = 30000;
      request.ontimeout = function () {
        resolve();
      };
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 200) {
            wallsEnabled = true;
            localStorage.setItem('rdaWallsEnabled', 'true');
            resolve();
          } else {
            localStorage.setItem('rdaWallsEnabled', 'false');
            resolve();
          }
        }
      };
      request.open('GET', '/wiki/Message_Wall:Wikia', true);
      request.send();
    });
  }
  /**
   * Creates the content of the special page
   */
  function createContent (response) {
    if (config.wgCanonicalNamespace + ':' + config.wgTitle !== 'Special:DiscussionsActivity') {
      return;
    }
    if (response === 'error_no_connection' || response === 'error_discussions_disabled') {
      container.textContent = i18n(response).plain();
    } else {
      var title = document.getElementsByTagName('title')[0];
      var separator = document.getElementsByClassName('page-header__separator')[0];
      var separatorColor = window.getComputedStyle(separator).backgroundColor;
      var style = '<!-- CSS injected by DiscussionsActivity --><link rel="stylesheet" type="text/css" href="https://slot1-images.wikia.nocookie.net/__am/1515674256/sasses/skins/extensions/wikia/MyHome/oasis.scss,extensions/wikia/Wall/css/WallWikiActivity.scss" /><style>.activityfeed > li:not(:first-child),.og-container,.activity-feed-more{border-color:' + separatorColor + ';}</style>'; // Copy of the styles of Wiki Activity
      title.insertAdjacentHTML('afterend', style);
      checkWalls()
        .then(function () {
          checkboxes();
          loadDiscussions(response);
        });
    }
  }
  /**
   * Creates the special page
   */
  function createPage () {
    if (config.wgCanonicalNamespace + ':' + config.wgTitle !== 'Special:DiscussionsActivity') {
      return;
    }
    document.title = i18n('document_title_new').escape() + ' |' + document.title.split('|').slice(1).join('|');
    document.getElementById('PageHeader').getElementsByTagName('h1')[0].textContent = i18n('document_title_new').plain();
    container = document.getElementById('mw-content-text');
    container.innerHTML = '<span class="rda-loading">' + i18n('loading_discussions').escape() + '</span>';
  }
  /**
   * Inserts links in header subtitle in certain pages
   */
  function insertLinks () {
    var pages = {
      RecentChanges: {
        title: i18n('recent_changes').escape(),
        links: ['WikiActivity', 'DiscussionsActivity']
      },
      WikiActivity: {
        title: i18n('wiki_activity').escape(),
        links: ['WikiActivity/watchlist', 'RecentChanges', 'DiscussionsActivity']
      },
      DiscussionsActivity: {
        title: i18n('discussions_activity').escape(),
        links: ['RecentChanges', 'WikiActivity']
      },
      'WikiActivity/watchlist': {
        title: i18n('watchlist').escape(),
        links: ['RecentChanges', 'WikiActivity', 'DiscussionsActivity']
      }
    };
    // Terminates the function if the current page is not in the list
    if (Object.keys(pages).every(function (p) { return 'Special:' + p !== config.wgCanonicalNamespace + ':' + config.wgTitle; })) {
      return;
    }
    var headerSubtitle = document.getElementsByClassName('page-header__page-subtitle')[0];
    var pagesLinked = pages[config.wgTitle].links;
    var links = [];

    pagesLinked.forEach(function (page) {
      links.push('<a href="/wiki/Special:' + page + '" title="Special:' + page + '">' + pages[page].title + ' ></a>');
    });
    // Doesn't include link to followed pages if it's an anonymous user
    links = (config.wgTitle === 'WikiActivity' && !config.wgUserName ? links.slice(1) : links);
    // Inserts links
    headerSubtitle.innerHTML = links.join(' | ');
  }
  /**
   * Where everything starts
   */
  function init () {
    var getDisc = (config.wgCanonicalNamespace + ':' + config.wgTitle === 'Special:DiscussionsActivity' ? getPosts() : Promise.resolve('Invalid page'));
    var getLang = new Promise(function (resolve, reject) {
      window.mw.hook('dev.i18n').add(function (lib) {
        lib.loadMessages('DiscussionsActivity')
          .then(function (lang) {
            i18n = lang.msg;
            insertLinks();
            createPage();
            resolve();
          });
      });
      window.importArticles({ type: 'script', articles: 'u:dev:MediaWiki:I18n-js/code.js' }, { type: 'style', articles: 'u:aotbeta:MediaWiki:DiscussionsActivity.css' });
    });

    Promise.all([getDisc, getLang])
      .then(function (results) {
        createContent(results[0]);
      });
  }
  init();
})();