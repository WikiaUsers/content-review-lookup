(function (window, mw) {
  "use strict";

  var wikiUrl = "https://" + location.host.split(":")[0];
  var langPrefix = '';

  var _config = mw.config.get(['wgNamespaceNumber', 'wgFormattedNamespaces', 'wgTitle', 'wgCityId']),
    wgNamespaceNumber = _config.wgNamespaceNumber,
    wgFormattedNamespaces = _config.wgFormattedNamespaces,
    wgTitle = _config.wgTitle,
    wgCityId = _config.wgCityId;

  if (
    window.SocialActivityModernLoaded ||
    wgNamespaceNumber !== -1 ||
    wgTitle !== 'SocialActivity'
  ) {
    return;
  }

  window.SocialActivityModernLoaded = true;
  importArticle({type: 'style',article: 'u:dev:MediaWiki:SocialActivityModern/code.css'});

  modifyActivityList();

  function modifyActivityList() {
    var activityList = document.querySelectorAll("ul.social-activity-list li");
    activityList = Array.prototype.slice.call(activityList);
    var activityPage = document.querySelector("#content");
    startLoading(activityPage);
    addActivityListClasses(activityList);
    replaceLinkInfo(activityList).then(function () {
      deleteDuplicates(activityList);
      stopLoading(activityPage);
    }).catch(function () {
      deleteDuplicates(activityList);
      stopLoading(activityPage);
    });
  }

  function startLoading(activityPage) {
    activityPage.classList.add('loading');
  }

  function stopLoading(activityPage) {
    activityPage.classList.remove('loading');
  }

  function deleteDuplicates(activityList) {
    activityList = activityList.map(function (li) {
      return li.children[2];
    });
    activityList.forEach(function (node, i) {
      var tempActivityList = activityList.slice(i + 1);
      tempActivityList.forEach(function (node2) {
        node.isEqualNode(node2) && node2.parentNode.remove();
      });
    });
  }

  function requestWithParams(baseUrl, params) {
    var queryString = '';
    Object.keys(params).forEach(function (param, i) {
      var paramString = '';

      if (i === 0) {
        paramString += '?';
      } else {
        paramString += '&';
      }

      paramString += param + '=' + params[param];
      queryString += paramString;
    });
    var fullUrl = baseUrl + queryString;
    return fetch(fullUrl).then(function (response) {
      return response.json();
    }).then(function (data) {
      return data;
    }).catch(function () {
      return false;
    });
  }

  function replaceLinkInfo(activityList) {
    var activityLinksList = activityList.map(function (li) {
      if (li.className === 'activity-list-comment' || li.className === 'activity-list-delete' || li.className === 'activity-list-edit') {
        return li.children[2].children[4].href || li.children[2].children[5].href;
      } else {
        return li.children[2].children[2].href;
      }
    });
    var promiseList = [];
    activityLinksList.forEach(function (link, i) {
      var promise = new Promise(function (resolve) {
        var currentLiContent = activityList[i].children[2];
        var hasLangPrefix = link.split('/')[3] !== 'wiki';
        var sliceIndex = hasLangPrefix ? 5 : 4;
        langPrefix = hasLangPrefix ? '/' + link.split('/')[3] : '';
        var page = decodeURI(link.split('/').slice(sliceIndex).join('/'));
        var columnSplitExists = page.split(':').length > 0;

        if (columnSplitExists) {
          var nameSpaceName = page.split(':')[0].split('_').join(' ');

          switch (nameSpaceName) {
            case wgFormattedNamespaces[500]:
              getBlogThreadInfo(page).then(function (elementsStructure) {
                var nextLiContent = parseElementsStructure(elementsStructure);
                currentLiContent.parentNode.replaceChild(nextLiContent, currentLiContent);
                resolve();
              }).catch(function () {
                currentLiContent.parentNode.remove();
                resolve();
              });
              break;

            case wgFormattedNamespaces[1200]:
              getWallThreadInfo(page).then(function (elementsStructure) {
                var nextLiContent = parseElementsStructure(elementsStructure);
                currentLiContent.parentNode.replaceChild(nextLiContent, currentLiContent);
                resolve();
              }).catch(function () {
                currentLiContent.parentNode.remove();
                resolve();
              });
              break;

            default:
              getArticleThreadInfo(page).then(function (elementsStructure) {
                var nextLiContent = parseElementsStructure(elementsStructure);
                currentLiContent.parentNode.replaceChild(nextLiContent, currentLiContent);
                resolve();
              }).catch(function () {
                currentLiContent.parentNode.remove();
                resolve();
              });
              break;
          }
        } else {
          getArticleThreadInfo(page).then(function (elementsStructure) {
            var nextLiContent = parseElementsStructure(elementsStructure);
            currentLiContent.parentNode.replaceChild(nextLiContent, currentLiContent);
            resolve();
          }).catch(function () {
            currentLiContent.parentNode.remove();
            resolve();
          });
        }
      });
      promiseList.push(promise);
    });
    return Promise.all(promiseList);
  }

  function parseElementsStructure(elementsStructure) {
    var rootDiv = document.createElement('DIV');
    rootDiv.className = 'activity-data';
    var title = document.createElement('A');
    title.innerHTML = elementsStructure.title;
    title.href = wikiUrl + langPrefix + '/wiki/' + elementsStructure.href;
    rootDiv.append(title);
    elementsStructure.elements.forEach(function (element) {
      var replyDiv = document.createElement('DIV');
      replyDiv.className = 'activity-data-reply';
      var imageLink = document.createElement('A');
      imageLink.className = 'activity-reply-avatar';
      imageLink.href = wikiUrl + langPrefix + '/wiki/' + wgFormattedNamespaces[2] + ':' + element.username;
      var avatar = document.createElement('IMG');
      avatar.src = element.avatar ? element.avatar : 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg';
      imageLink.append(avatar);
      replyDiv.append(imageLink);
      var timeDiv = document.createElement('DIV');
      timeDiv.className = 'activity-reply-time';
      timeDiv.innerText = element.timeago;
      var textDiv = document.createElement('DIV');
      textDiv.className = 'activity-reply-text';
      var userLink = document.createElement('A');
      userLink.innerHTML = element.username;
      userLink.href = imageLink.href;
      textDiv.append(userLink);
      var replyText = document.createElement('P');
      replyText.innerHTML = element.text;
      replyText.append(timeDiv);
      textDiv.append(replyText);
      replyDiv.append(textDiv);
      rootDiv.append(replyDiv);
    });
    return rootDiv;
  }

  function getWallThreadInfo(page) {
    var elementsStructure = {
      title: '',
      href: page,
      elements: []
    };
    var rootPageName = page.split('?');
    var isReplyLink = rootPageName[1].split('=')[1].length > 20;
    var threadId = isReplyLink ? rootPageName[1].split('=')[1].split('#')[0] : rootPageName[1].split('=')[1];

    if (isReplyLink) {
      elementsStructure.href = elementsStructure.href.split('#')[0];
    }

    var username = rootPageName[0].split(':')[1];
    var baseUrl = wikiUrl + langPrefix + '/api.php';
    var params = {
      action: 'query',
      list: 'users',
      ususers: username,
      format: 'json'
    };
    return requestWithParams(baseUrl, params).then(function (data) {
      if (data === false) {
        return Promise.reject(false);
      }

      var userId = data.query.users[0].userid;
      var threadUrl = "https://services.fandom.com/discussion/wall/".concat(wgCityId, "/").concat(userId, "/threads/").concat(threadId);
      return requestWithParams(threadUrl, {
        viewableOnly: 'false',
        responseGroup: 'full',
        limit: '2'
      }).then(function (data) {
        var title = decodeURI(data.title).split('_').join(' ');
        elementsStructure.title = title;
        var hasReplies = data._embedded["doc:posts"] ? data._embedded["doc:posts"].length > 0 : false;

        var messages = data._embedded;
        if (hasReplies) {
          messages = data._embedded["doc:posts"].sort(sortByTime);
          if (data._embedded["doc:posts"].length === 1) {
            messages = [data._embedded.firstPost[0], data._embedded["doc:posts"][0]];
          }
        } else {
          messages = [data._embedded.firstPost[0]];
        }
        elementsStructure.elements = structurizeMessages(messages);

        return elementsStructure;
      });
    }).catch(function () {
      return false;
    });
  }

  function structurizeMessages(messages) {
    var elements = [];
    messages.forEach(function (reply) {
      var text = reply.rawContent || reply.renderedContent ? reply.rawContent || reply.renderedContent : findText(JSON.parse(reply.jsonModel));
      var element = {
        text: text.length > 249 ? text.substring(0, 249) + '…' : text,
        avatar: reply.createdBy.avatarUrl,
        username: reply.createdBy.name,
        timeago: getTimeBySeconds(reply.creationDate.epochSecond),
        id: reply.id
      };
      elements.push(element);
    });
    return elements;
  }

  function getBlogThreadInfo(page) {
    var blogPage = page.split(':')[1];
    return getThreadInfo(blogPage, '500').then(function (elementsStructure) {
      elementsStructure.href = page.split('&')[0];
      return elementsStructure;
    });
  }

  function getArticleThreadInfo(page) {
    return getThreadInfo(page, '0');
  }

  function getThreadInfo(page, namespace) {
    var baseUrl = wikiUrl + langPrefix + '/wikia.php';
    page = page.split('&')[0];
    var linkArray = page.split('?');
    var title = decodeURI(linkArray[0]).split('_').join(' ');
    var threadId = 0;
    if (linkArray[1]) {
      threadId = linkArray[1].split('=')[1];
    } else {
      return Promise.reject(false);
    }
    var params = {
      controller: 'ArticleCommentsController',
      method: 'getThread',
      threadId: threadId,
      title: title,
      namespace: namespace
    };
    return requestWithParams(baseUrl, params).then(function (data) {
      if (data === false) {
        return Promise.reject(false);
      }

      var hasReplies = data.thread.posts.length > 0;
      var elementsStructure = {
        title: title,
        href: page,
        elements: []
      };

      var messages = data.thread;
      if (hasReplies) {
        messages = data.thread.posts;

        if (messages.length > 1) {
          messages = [messages[messages.length - 2], messages[messages.length - 1]];
        } else {
          messages = [data.thread.firstPost, messages[0]];
        }
      } else {
        messages = [data.thread.firstPost];
      }

      elementsStructure.elements = structurizeMessages(messages);

      return elementsStructure;
    }).catch(function () {
      return false;
    });
  }

  function findText(json) {
    var originalJson = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    if (originalJson === null) originalJson = json;

    if (json.type === 'text') {
      return json.text;
    } else {
      if (json.content === undefined) {
        json = originalJson;
        index += 1;
      } else {
        index = 0;
      }

      if (json.content[index] === undefined) {
        return '…';
      }

      return findText(json.content[index], originalJson, index);
    }
  }

  function sortByTime(a, b) {
    return a.creationDate.epochSecond > b.creationDate.epochSecond ? 1 :
      (a.creationDate.epochSecond < b.creationDate.epochSecond ? -1 : 0)
  }

  function getTimeBySeconds(seconds) {
    var now = new Date();
    var messageDate = new Date(0);
    messageDate.setUTCSeconds(seconds);
    var difference = now - messageDate;
    if (difference > 0) {
      var minutes = parseInt(difference / (1000 * 60));
      if (minutes <= 1) {
        return mw.msg('timeago-second');
      }
      if (minutes >= 60) {
        var hours = parseInt(minutes / 60);
        if (hours >= 24) {
          var days = parseInt(hours / 24);
          if (days >= 30) {
            var months = parseInt(days / 30);
            if (months >= 12) {
              var years = parseInt(months / 12);
              return mw.msg('timeago-year', years);
            }
            return mw.msg('timeago-month', months);
          }
          return mw.msg('timeago-day', days);
        }
        return mw.msg('timeago-hour', hours);
      }
      return mw.msg('timeago-minute', minutes);
    }
    return mw.msg('react-timeago-now');
  }

  function addActivityListClasses(activityList) {
    activityList.forEach(function (li) {
      var iconValue = li.children[1].children[0].children[0].attributes[0].value;
      var className = null;

      switch (iconValue) {
        case '#wds-icons-reply-tiny':
          className = 'activity-list-reply';
          break;

        case "#wds-icons-page-tiny":
          className = 'activity-list-comment';
          break;

        case '#wds-icons-envelope-tiny':
          className = 'activity-list-message';
          break;

        case '#wds-icons-trash-open-tiny':
        case '#wds-icons-trash-tiny':
          className = 'activity-list-delete';
          break;

        case '#wds-icons-pencil-tiny':
          className = 'activity-list-edit';
          break;

        default:
          break;
      }

      li.classList.add(className);
    });
  }
})(window, mediaWiki);