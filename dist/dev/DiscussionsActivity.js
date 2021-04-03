/**
 * @name DiscussionsActivity
 * @author Manuel de la Fuente (https://manuelfte.com)
 * - Based on DiscussionsFeed (https://dev.fandom.com/wiki/DiscussionsFeed)
 *   by Flightmare (https://elderscrolls.fandom.com/wiki/User:Flightmare)
 * @version 0.9.9
 * @license CC-BY-SA-3.0
 * @description Creates a special page for latest Discussions messages
 * @todo Link to load more
 * @todo Option to filter between threads and comments
 */
/* eslint-env browser */
(function () {
  'use strict';

  if ( window.DiscussionsActivityLoaded ) return;
  window.DiscussionsActivityLoaded = true;

  console.log('DiscussionsActivity v0.9.9');

  var config = window.mw.config.get([
    'wgCanonicalNamespace',
    'wgScriptPath',
    'wgServer',
    'wgTitle',
    'wgUserGroups',
    'wgUserName',
    'wgVersion'
  ]);
  var i18n;
  var isMod;
  var canBlock;
  var wallsEnabled = false;
  var timeout;
  var isUCP = config.wgVersion !== '1.19.24';
  /**
   * Escapes special characters
   */
  function escapeHTML (str) {
    return (str ? window.mw.html.escape(str) : '');
  }
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
      text: escapeHTML(post.rawContent.length > 250 ? post.rawContent.substring(0, 250).trim() + '...' : post.rawContent), // Trims the message to 250 characters if it's longer than that
      userName: escapeHTML(post.createdBy.name),
      userNameEncoded: null,
      userID: post.createdBy.id,
      avatarURL: post.createdBy.avatarUrl,
      time: epochToTimeAgo(post.creationDate.epochSecond),
      image: post._embedded.contentImages[0],
      embed: post._embedded.openGraph,
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
      deleterID: null,
      tags: []
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
    
    if (!post.isReply && post._embedded && post._embedded.thread && post._embedded.thread[0] && post._embedded.thread[0].tags) {
      post._embedded.thread[0].tags.forEach(function(tag) {
        data.tags.push({
          title: escapeHTML(tag.articleTitle)
        });
      });
    }

    return data;
  }
  /**
   * Creates the header of the item
   */
  function headerItem (data) {
    var icon = {
      class: ['new', 'talk'],
      title: [i18n('icon_title_thread').escape(), i18n('icon_title_reply').escape()]
    };
    var i = (data.isReply ? 1 : 0);
    var header =
      '<img class="' + icon.class[i] + ' sprite" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" alt="' + icon.title[i] + '" title="' + icon.title[i] + '" width="16" height="16">' +
      ' <strong><a class="title rda-title" href="' + config.wgScriptPath +  '/f/p/' + data.threadID + '">' + data.title + '</a></strong>' +
      ' ' + i18n('in').escape() + ' <a class="rda-category" href="' + config.wgScriptPath +  '/f?catId=' + data.forumID + '&sort=latest">' + data.forumName + '</a>';

    return header;
  }
  /**
   * Creates the row of content
   */
  function contentRow (data) {
    var subtitle = i18n(data.isReply ? 'commented_by' : 'created_by').escape();
    var blockButton = (canBlock ? ' | <a class="rda-block" href="' + config.wgScriptPath +  '/wiki/Special:Block/' + data.userNameEncoded + '">' + i18n('block').escape() + '</a>' : '');
    var talk = {
      class: ['rda-talk', 'rda-wall'],
      link: ['User_talk', 'Message_Wall'],
      text: [i18n('talk').escape(), i18n('wall').escape()]
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
              ' <a class="real-name rda-username" href="' + config.wgScriptPath +  '/f/u/' + data.userID + '">' + data.userName + '</a> (<a class="' + talk.class[i] + '" href="' + config.wgScriptPath +  '/wiki/' + talk.link[i] + ':' + data.userNameEncoded + '">' + talk.text[i] + '</a> | <a class="rda-contribs" href="' + config.wgScriptPath +  '/wiki/Special:Contributions/' + data.userNameEncoded + '">' + i18n('contribs').escape() + '</a>' + blockButton + ')' +
              ' <a class="subtle rda-time" href="' + config.wgScriptPath +  '/f/p/' + data.threadID + '/r/' + data.messageID + '">' + data.time + '</a>' +
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
    * Gets thumbnail dimensions
    */
  function getThumbnail (h, w) {
    if (w > 200) {
      h = Math.floor(h * (200 / w));
      w = 200;
    }
    return {height: h, width: w};
  }
  /**
    * Creates the row for image
    */
  function imageRow (image, table) {
    if (!image) {
      return;
    }
    var thumbnail = getThumbnail(image.height, image.width);
    var cellContent =
      '<ul class="activityfeed-inserted-media rda-inserted-media reset">' +
        '<li>' +
          '<a data-image-link="" href="' + image.url + '">' +
            '<img src="' + image.url + '/scale-to-width-down/200" width="' + thumbnail.width + '" height="' + thumbnail.height + '" class="rda-image">' +
          '</a>' +
        '</li>' +
      '</ul>';
    // Appends the row to the table
    var row = table.insertRow(-1); // Inserts empty row
    row.setAttribute('data-type', 'inserted-image'); // Injects its data attribute
    row.insertCell(0); // Inserts first empty cell
    var cell2 = row.insertCell(1); // Inserts second empty cell for actual content
    cell2.innerHTML = cellContent; // Inserts the contents
  }
  /**
    * Creates the row for embedded link
    */
  function embedRow (embed, table) {
    if (!embed) {
      return;
    }
    var title = escapeHTML(embed[0].title);
    var url = escapeHTML(embed[0].url);
    var thumbnail = getThumbnail(embed[0].imageHeight, embed[0].imageWidth);
    var separator = document.getElementsByClassName('page-header__separator')[0];
    var separatorColor = window.getComputedStyle(separator).backgroundColor;
    var fragment = document.createRange().createContextualFragment(
      '<a target="_blank" style="border-color: ' + separatorColor + ';" title="' + url + '" href="' + url + '" class="og-container large-image-card-mobile small-image-card-desktop ember-view"><!---->' +
        '<div class="og-image-wrapper">' +
          '<img src="' + embed[0].imageUrl + '/scale-to-width-down/200" width="' + thumbnail.width + '" height="' + thumbnail.height + '" alt="' + title + '" class="og-image rda-image"><!---->' +
        '</div>' +
        '<div class="og-texts">' +
          '<h3 class="og-title">' + title + '</h3>' +
          '<div class="og-description subtle">' + escapeHTML(embed[0].description) + '</div>' +
          '<div class="og-site-name subtle">' + escapeHTML(embed[0].siteName) + '</div>' +
        '</div>' +
      '</a>'
    );
    var imageWrapper = fragment.firstChild.childNodes[1];
    if (embed[0].videoUrl) {
      imageWrapper.classList.add('og-video-thumbnail');
    }
    // Appends the row to the table
    var row = table.insertRow(-1); // Inserts empty row
    row.setAttribute('data-type', 'inserted-image'); // Injects its data attribute
    row.insertCell(0); // Inserts first empty cell
    var cell2 = row.insertCell(1); // Inserts second empty cell for actual content
    cell2.appendChild(fragment); // Inserts the contents
  }
  /**
   * Creates the row for status (that shows if a message is deleted, reported or locked)
   */
  function statusRow (data, table) {
    var status = {
      isDeleted: {
        type: 'deleted',
        icon: 'trash',
        iconTitle: i18n('icon_title_deleted').escape(),
        subtitle: (data.isMessageDeleted ? i18n('message_deleted_by').escape() + ' <a class="rda-deleter" href="' + config.wgScriptPath +  '/f/u/' + data.deleterID + '">' + data.deleter + '</a>' : i18n('parent_thread_deleted').escape()),
        class: 'rda-deleted'
      },
      isReported: {
        type: 'reported',
        icon: 'error',
        iconTitle: i18n('icon_title_reported').escape(),
        subtitle: i18n('message_reported').escape(),
        class: 'rda-reported'
      },
      isLocked: {
        type: 'locked',
        icon: 'lock',
        iconTitle: i18n('icon_title_locked').escape(),
        subtitle: i18n(data.isReply ? 'parent_thread_locked' : 'thread_locked').escape(),
        class: 'rda-locked'
      }
    };
    var key = Object.keys(status).filter(function (e) { return data[e] === true; })[0];
    if (!key) {
      return;
    }
    var textSpan = table.getElementsByClassName('rda-content')[0]; // Span that contains the text of the post
    var cellContent =
      '<cite>' +
        '<img class="' + status[key].icon + ' sprite rda-icon-' + status[key].type + '" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" alt="' + status[key].iconTitle + '" title="' + status[key].iconTitle + '" width="16" height="16" />' +
        '<span class="subtle">' + status[key].subtitle + '</span>' +
      '</cite>';
    // Appends the row to the table
    var row = table.insertRow(-1); // Inserts empty row
    row.insertCell(0); // Inserts first empty cell
    var cell2 = row.insertCell(1); // Inserts second empty cell for actual content
    cell2.className = 'rda-status-' + status[key].type; // Assigns class to this cell
    cell2.innerHTML = cellContent; // Inserts the contents
    textSpan.classList.add(status[key].class); // Assigns class to content
  }
  /**
   * Creates a new row for tags that are associated with this post
   */
  function tagsRow(tags, table) {
    if (tags.length === 0) {
      return;
    }
    var row = table.insertRow(-1);
    row.insertCell(0);
    var cell2 = row.insertCell(1);
    var iconHoverText = i18n('icon_title_tags').escape();
    cell2.className = 'rda-tags';
    cell2.innerHTML = '<img class="message sprite rda-icon-tags" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" alt="'+ iconHoverText + '" title="'+ iconHoverText + '" />'
      + tags.map(function(elem) { return elem.title; }).join(', ');
  }
  /**
   * Creates each of the list items
   */
  function buildItem (post, ul) {
    var data = postInfo(post);
    var header = headerItem(data);
    var content = contentRow(data);
    // Creates a document fragment for the item
    var itemFrag = document.createRange().createContextualFragment(
      '<li class="activity-type-discussion rda-entry">' +
        header +
        '<table class="wallfeed rda-table">' +
          '<tbody>' +
            content +
          '</tbody>' +
        '</table>' +
      '</li>'
    );
    var li = itemFrag.firstChild;
    var table = li.getElementsByTagName('table')[0];
    // Functions that will add extra rows if needed
    imageRow(data.image, table);
    embedRow(data.embed, table);
    tagsRow(data.tags, table);
    statusRow(data, table);
    // Appends the element to the list
    ul.appendChild(itemFrag);
  }
  /**
   * Creates the HTML of the list
   */
  function buildList (response, content) {
    // Creates a document fragment for the list
    var listFrag = document.createRange().createContextualFragment('<ul class="activityfeed rda-feed reset" id="myhome-activityfeed"></ul>');
    var ul = listFrag.firstChild;
    // For each post retrieved, calls the function that will turn them into list items and append them to the fragment
    for (var i = 0; i < response.length; i++) {
      buildItem(response[i], ul);
    }
    // Clears the content of the page and replaces it with the fragment
    content.innerHTML = '';
    content.appendChild(listFrag);
  }
  /**
   * Gets Discussions list
   */
  function getDiscussions (content, loadingElement) {
    // Shows loading icon
    loadingElement = (loadingElement || document.getElementById('rda-chbx-autorefresh'));
    loadingElement.classList.add('rda-loading');
    // Clears existing timeouts
    if (timeout) {
      clearTimeout(timeout);
    }
    // Refresh interval
    var interval = (window.rdaRefreshInterval >= 30000 ? window.rdaRefreshInterval : 60000); // Minimum interval is 30 seconds
    // Checks whether to show deleted posts
    var viewableOnly = (isMod && localStorage.getItem('rdaShowDeleted') === 'false' ? true : !isMod);
    // Retrieves JSON
    var request = new XMLHttpRequest();
    request.timeout = 30000;
    request.ontimeout = function () {
      content.textContent = i18n('error_no_connection').plain();
    };
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // If posts were retrieved correctly
        if (request.status === 200) {
          var response = JSON.parse(request.responseText)._embedded['doc:posts'];
          buildList(response, content);
        // If posts couldn't be retrieved
        } else {
          content.textContent = i18n('error_no_connection').plain();
        }
        // Sets autorefresh
        var autoRefresh = (localStorage.getItem('rdaAutoRefresh') === 'false' ? false : true); // eslint-disable-line
        timeout = (autoRefresh ? setTimeout(getDiscussions, interval, content) : timeout); // Sets timeout only if auto refresh is enabled
        // Hides loading icon
        loadingElement.classList.remove('rda-loading');
      }
    };
    request.open('GET', config.wgServer + config.wgScriptPath + '/wikia.php?controller=DiscussionPost&method=getPosts&limit=50&containerType=FORUM&viewableOnly=' + viewableOnly, true);
    request.setRequestHeader('Accept', 'application/hal+json');
    request.withCredentials = true;
    request.send();
  }
  /**
   * Sets checkboxes
   */
  function checkboxes (content) {
    // Gets header
    var header = document.getElementsByClassName('page-header__main')[0];
    // Creates wrapper
    var chbxsFrag = document.createRange().createContextualFragment('<div id="rda-checkboxes" class="page-header__subtitle"></div>');
    var div = chbxsFrag.firstChild;
    // Function to create each checkbox
    function makeChbx (name, id, cookie) {
      var frag = document.createRange().createContextualFragment(
        '<span id="' + id + '">' +
          '<input type="checkbox" />' +
          '<label>' + name + '</label>' +
        '</span>'
      );
      // Whether to show it as checked
      if (localStorage.getItem(cookie) !== 'false') {
        var input = frag.firstChild.childNodes[0];
        input.checked = true;
      }
      // Appends it to the div
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
    var autoRefresh = document.getElementById('rda-chbx-autorefresh').childNodes[0];
    autoRefresh.onchange = function () {
      // If checked, sets value in localStorage and reloads discussions
      if (autoRefresh.checked) {
        localStorage.setItem('rdaAutoRefresh', 'true');
        getDiscussions(content);
      // If unchecked, sets value in localStorage and clears timeout without reloading
      } else {
        localStorage.setItem('rdaAutoRefresh', 'false');
        clearTimeout(timeout);
      }
    };
    // Sets function for checkbox for show deleted
    if (isMod) {
      var showDeleted = document.getElementById('rda-chbx-showdeleted').childNodes[0];
      showDeleted.onchange = function () {
        // Sets value in localStorage, whether true or false
        if (showDeleted.checked) {
          localStorage.setItem('rdaShowDeleted', 'true');
        } else {
          localStorage.setItem('rdaShowDeleted', 'false');
        }
        // Reloads discussions to hide/unhide deleted messages while passing the element to show loading icon
        getDiscussions(content, showDeleted.parentElement);
      };
    }
  }
  /**
   * Creates the special page
   */
  function createPage (status) {
    if (config.wgCanonicalNamespace + ':' + config.wgTitle !== 'Special:DiscussionsActivity') {
      return;
    }
    // Replaces the title
    document.title = i18n('document_title_new').escape() + ' |' + document.title.split('|').slice(1).join('|');
    document.getElementById('PageHeader').getElementsByTagName('h1')[0].textContent = i18n('document_title_new').plain();
    // Gets div of content
    var content = document.getElementById('mw-content-text');
    // Different actions depending on status
    switch (status) {
      // If Discussions were loaded correctly
      case 200:
        // Detects the background color to request the proper copy of the styles of Wiki Activity
        var background = isUCP ? document.getElementsByClassName('WikiaPageContentWrapper')[0] : document.getElementById('WikiaPageBackground');
        var rgb = window.getComputedStyle(background).backgroundColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        function toHex(i) {
          return parseInt(i, 10).toString(16).padStart(2, i);
        }
        var hex = toHex(rgb[1]) + toHex(rgb[2]) + toHex(rgb[3]);
        // Requests the CSS and inserts it in the page
        var title = document.getElementsByTagName('title')[0];
        var style = '<link rel="stylesheet" type="text/css" href="https://slot1-images.wikia.nocookie.net/__am/1515674256/sasses/color-page%3D%2523' + hex + '%26skins/extensions/wikia/MyHome/oasis.scss,extensions/wikia/Wall/css/WallWikiActivity.scss" />';
        title.insertAdjacentHTML('afterend', style);
        // Gets user perms
        var blockers = ['sysop', 'staff', 'wiki-manager', 'helper', 'soap', 'global-discussions-moderator'];
        canBlock = blockers.some(function (role) { return config.wgUserGroups.indexOf(role) > -1; });
        isMod = Boolean(canBlock || config.wgUserGroups.indexOf('threadmoderator') > -1);
        // Calls the next steps once the following task is complete
        var startLoading = function () {
          // Inserts checkboxes
          checkboxes(content);
          // Inserts temporary content
          content.innerHTML = '<span class="rda-loading">' + i18n('loading_discussions').escape() + '</span>';
          // Gets Discussions list
          getDiscussions(content);
        };
        // Checks whether wiki uses Talk Pages or Message Walls
        var request = new XMLHttpRequest();
        request.timeout = 30000;
        request.ontimeout = function () {
          startLoading();
        };
        request.onreadystatechange = function () {
          if (request.readyState === 4) {
            if (request.status === 200) {
              wallsEnabled = true;
            }
            startLoading();
          }
        };
        request.open('GET', mw.util.getUrl('Message Wall:Wikia'), true);
        request.send();
        break;
      // If Discussions is not enabled on the domain
      case 404:
        content.textContent = i18n('error_discussions_disabled').plain();
        break;
      // Any other error
      default:
        content.textContent = i18n('error_no_connection').plain();
    }
  }
  /**
   * Inserts links in header subtitle in certain pages
   */
  function insertLinks () {
    var defaultPages = {
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
    var pages = typeof window.rdaSubtitleLinksPages === 'object'
      ? Object.fromEntries(Object.entries(window.rdaSubtitleLinksPages).map(function (entry) {
        var title = entry[0], config = entry[1];
        return [title, Object.assign({}, defaultPages[title], config)];
      }))
      : defaultPages;
    // Terminates the function if the current page is not in the list
    if (Object.keys(pages).every(function (p) { return 'Special:' + p !== config.wgCanonicalNamespace + ':' + config.wgTitle; })) {
      return;
    }
    var headerSubtitle = document.getElementsByClassName('page-header__page-subtitle')[0];
    var pagesLinked = pages[config.wgTitle].links;
    var links = [];

    pagesLinked.forEach(function (page) {
      links.push('<a href="' + config.wgScriptPath +  '/wiki/Special:' + page + '" title="Special:' + page + '">' + pages[page].title + ' ></a>');
    });
    // Doesn't include link to followed pages if it's an anonymous user
    links = (config.wgTitle === 'WikiActivity' && !config.wgUserName ? links.slice(1) : links);
    // Inserts links
    headerSubtitle.innerHTML = links.join(' | ');
  }
  /**
   * Checks whether Discussions is enabled on the domain
   */
  function isDiscussionsEnabled () {
    var request = new XMLHttpRequest();
    request.timeout = 30000;
    request.ontimeout = function () {
      createPage(request.status);
    };
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // Creates page regardless of status; if success it will load Discussions, if fail it will show an error
        createPage(request.status);
        // Inserts links under header only if Discussions is enabled
        if (request.status === 200) {
          insertLinks();
        }
      }
    };
    request.open('GET', config.wgScriptPath + '/f', true);
    request.send();
  }
  /**
   * Loads localization and CSS, and fires the function when done
   */
  window.mw.hook('dev.i18n').add(function (lib) {
    lib.loadMessages('DiscussionsActivity').done(function (lang) {
      i18n = lang.msg;
      isDiscussionsEnabled();
    });
  });
  if (isUCP) {
    mw.loader.load('https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js');
    mw.loader.load('https://dev.fandom.com/load.php?mode=articles&only=styles&articles=MediaWiki:DiscussionsActivity.css', 'text/css');
  } else {
    window.importArticles(
      {
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
      },
      {
        type: 'style',
        article: 'u:dev:MediaWiki:DiscussionsActivity.css'
      }
    );
  }
})();