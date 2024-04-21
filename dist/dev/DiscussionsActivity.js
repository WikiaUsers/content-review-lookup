/**
 * @name DiscussionsActivity
 * @author Manuel de la Fuente (https://manuelfte.com)
 * @author NoWayThisUsernameIsAlreadyOwnedBySomeone (https://dev.fandom.com/User:NoWayThisUsernameIsAlreadyOwnedBySomeone)
 * - Based on DiscussionsFeed (https://dev.fandom.com/wiki/DiscussionsFeed)
 *   by Flightmare (https://elderscrolls.fandom.com/wiki/User:Flightmare)
 * @version 0.10.3
 * @license CC-BY-SA-3.0
 * @description Creates a special page for latest Discussions messages
 */
 
/*
 * Features curremtly missing from pre-UCP version:
 * - embeds
 * - deleted, reported, locked status
 * - auto refresh
 * - show/hide deleted posts if user has permissions (&viewableOnly=false)
 *
 * Potential ideas for the future:
 * - Filter by containerType
 * - Filter to show only reported posts
 * - Pop up a image lightbox on click, but preserve "open in new tab" via middle-mouse/ctrl+click
 * - List extermal links for the post (because those are probably the most interesting)
 * - Clean up localization keys to be more consistent (duplicate them temporarily)
 * - Incremental updates for auto-refresh instead of getting all posts again
 *   --> "&since=" + new Date(posts[0].creationData.epochSecond * 1000 + 1).toISOString();
 * - "load more" button at the bottom
 * - Fetch page titles from mediawiki instead of custom locale?
 * - Option to filter between threads and comments
 */
(function(windows, mw) {
  "use strict";

  if (window.DiscussionsActivityLoaded) return;
  window.DiscussionsActivityLoaded = true;
  
  console.log('DiscussionsActivity v0.10.3');

  const mwConfig = mw.config.get([
    "wgArticlePath",
    "wgCanonicalSpecialPageName",
    "wgEnableDiscussions",
    "wgNamespaceNumber",
    "wgPageName",
    "wgScriptPath",
    "wgServerName",
    "wgTitle",
    "wgUserGroups",
  ]);

  if (!mwConfig.wgEnableDiscussions) return;

  const otherActivityPages = {
    Recentchanges: true,
    SocialActivity: true,
    Newimages: true,
    Reports: true, /* https://community.fandom.com/wiki/Help:Interactive_Maps#Special:Reports */
  };
  
  const isDiscussionsActivityPage = mwConfig.wgNamespaceNumber === -1 && mwConfig.wgTitle === "DiscussionsActivity";
  const isOtherActivityPage = otherActivityPages[mwConfig.wgCanonicalSpecialPageName] === true;

  if (!isDiscussionsActivityPage && !isOtherActivityPage) return;

  var i18n; /* assigned later when translations have come in */
  const perf = {};
  perf.started = performance.now();
  /* 
   * As of August 2021 the discussions API request is way slower than normal MediaWiki API requests.
   * It will be slower than getting uncached translations, even though those are two sequential calls.
   * So we need to make sure to give it a head start.
   */
  var messagePromise;
  if (isDiscussionsActivityPage) {
    messagePromise = new Promise(function(resolve, reject) {
      const parameters = "?controller=DiscussionPost&method=getPosts&limit=100";
      callApi(parameters, resolve);
    });
  }

  window.importArticles({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js'
  }, {
    type: 'style',
    article: 'u:dev:MediaWiki:DiscussionsActivity.css'
  });

  mw.hook('dev.i18n').add(function(lib) {
    perf.i18nLoaded = performance.now();
    lib.loadMessages('DiscussionsActivity', { cacheVersion: 1 }).done(function(lang) {
      i18n = lang.msg;
      perf.i18nMessagesLoaded = performance.now();
      if (isOtherActivityPage) addDiscussionsActivityLink();
      if (isDiscussionsActivityPage) renderDiscussions();
    });
  });

  function callApi(parameters, callback) {
    const url = mwConfig.wgScriptPath + "/wikia.php" + parameters;
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.setRequestHeader('Accept', 'application/hal+json');
    request.withCredentials = true;
    request.timeout = 10000;
    request.onloadend = function() {
      callback(request);
    };
    request.send();
  }

  function addDiscussionsActivityLink() {
    const activityLinkTabs = document.getElementsByClassName("activity-tabs");
    if (activityLinkTabs.length === 0) return;
    const lists = activityLinkTabs[0].getElementsByTagName("ul");
    if (lists.length === 0) return;
    const tab = createActivityTab("discussions_activity", "Special:DiscussionsActivity", false);
    lists[0].appendChild(tab);
  }

  function renderDiscussions() {
    const contentElement = document.getElementById("content");
    contentElement.textContent = "";
    perf.pageCleared = performance.now();
    createPageHeader(contentElement);
    perf.headerCreated = performance.now();
    messagePromise.then(function(request) {
      switch (request.status) {
        case 200:
          perf.apiResponded = performance.now();
          const postsData = JSON.parse(request.responseText)._embedded["doc:posts"];
          perf.jsonParsed = performance.now();
          const pageNamePromise = queryCommentPageNames(postsData);
          perf.pageNamesQueryStarted = performance.now();
          displayPosts(postsData, contentElement, pageNamePromise);
          perf.postsRendered = performance.now();
          addCommentLinks(pageNamePromise);
          break;
        case 0:
          console.log("DiscussionsActivity cannot connect to server");
          break;
        default:
          console.log("DiscussionsActivity encountered an error of HTTP " + request.status);
          break;
      }
    });
  }

  function createPageHeader(contentElement) {
    changeTitle();
    const headerFragment = document.createDocumentFragment();
    headerFragment.appendChild(createPageInfo());
    headerFragment.appendChild(createActivityTabList());
    contentElement.appendChild(headerFragment);
    contentElement.appendChild(createSvgSymobls());
  }

  function changeTitle() {
    const titleText = i18n("document_title_new").plain();
    var pageTitle = document.getElementById("firstHeading");
    pageTitle.innerText = titleText;

    const oldDocTitle = document.title;
    const index = oldDocTitle.indexOf(" |");
    if (index >= 0) document.title = titleText + oldDocTitle.substring(index);
  }

  function createPageInfo() {
    const container = document.createElement("div");
    container.className = "rda-activity-summary";

    const message = document.createElement("div");
    message.innerText = i18n("discussions-activity-summary").plain();
    container.appendChild(message);

    const help = document.createElement("div");
    container.appendChild(help);
    const helpLink = document.createElement("a");
    helpLink.className = "wds-button wds-is-text";
    helpLink.href = "https://dev.fandom.com/DiscussionsActivity";
    help.appendChild(helpLink);
    helpLink.appendChild(createSvgUsage("#wds-icons-question-small", "wds-icon wds-icon-small"));

    const helpText = document.createElement("span");
    helpText.innerText = "Help";
    helpLink.appendChild(helpText);

    return container;
  }

  function createActivityTabList() {
    const activityTabs = document.createElement("div");
    activityTabs.className = "wds-tabs__wrapper rda-activity-tabs with-bottom-border";

    const tabList = document.createElement("ul");
    tabList.classList.add("wds-tabs");
    activityTabs.appendChild(tabList);

    function canSeeMapReports() {
      const moderateInteractiveMapGroups = {
        "content-moderator": true,
        "soap": true,
        "staff": true,
        "sysop": true,
        "wiki-specialist": true,
      };

      const groups = mwConfig.wgUserGroups;
      const groupCount = groups.length;
      for (var i = 0; i < groupCount; ++i) {
        if (moderateInteractiveMapGroups[groups[i]] === true) return true;
      }
      return false;
    }
    const makeTab = createActivityTab;
    tabList.appendChild(makeTab("link-text-recent-changes", "Special:RecentChanges", false));
    tabList.appendChild(makeTab("link-text-social-activity", "Special:SocialActivity", false));
    tabList.appendChild(makeTab("link-text-new-files", "Special:NewFiles", false));
    if (canSeeMapReports()) {
      tabList.appendChild(makeTab("link-text-reports", "Special:Reports", false));
    }
    tabList.appendChild(makeTab("discussions_activity", mwConfig.wgPageName, true));

    return activityTabs;
  }

  function createActivityTab(i18nKey, link, isCurrent) {
    const name = i18n(i18nKey).plain();
    const tab = document.createElement("li");
    tab.className = "wds-tabs__tab";
    if (isCurrent) tab.classList.add("wds-is-current");

    const tabLabel = document.createElement("div");
    tabLabel.className = "wds-tabs__tab-label";
    tab.appendChild(tabLabel);
    tabLabel.appendChild(createArticleTextLink(link, name));

    return tab;
  }

  function queryCommentPageNames(posts) {
    var forumIdsToRequest = {};
    var postCount = posts.length;
    for (var i = 0; i < postCount; ++i) {
      const post = posts[i];
      if (post._embedded.thread[0].containerType == "ARTICLE_COMMENT") {
        forumIdsToRequest[post.forumId] = true;
      }
    }
    const ids = Object.keys(forumIdsToRequest).join(",");
    const parameters = "?controller=FeedsAndPosts&method=getArticleNamesAndUsernames&stablePageIds=" + ids;
    const promise = new Promise(function(resolve, reject) {
      callApi(parameters, resolve);
    });
    return promise;
  }

  function displayPosts(posts, parent) {
    const fragment = document.createDocumentFragment();
    const list = document.createElement("ul");
    list.className = "rda-feed";
    fragment.appendChild(list);

    const postCount = posts.length;
    for (var i = 0; i < postCount; ++i) {
      const post = posts[i];
      const thread = post._embedded.thread[0];
      const attachments = post._embedded.attachments[0];

      const listEntry = document.createElement("li");
      listEntry.classList.add("rda-list-entry");
      const entry = document.createElement("div");
      entry.classList.add("rda-entry");

      const mainData = document.createElement("div");
      mainData.classList.add("rda-main-data");

      const contentTable = document.createElement("table");
      contentTable.classList.add("rda-datatable");

      const textContent = createTextRepresentation(post, 250);
      if (textContent) {
        contentTable.appendChild(createTableRow(i18n("post-info-content").plain(), textContent));
      }
      if (attachments.contentImages.length > 0) {
        const imageList = createImageList(attachments.contentImages);
        contentTable.appendChild(createTableRow(i18n("post-info-images").plain(), imageList));
      }
      if (!post.isReply && thread.tags.length > 0) {
        const tagList = createTagList(thread.tags);
        contentTable.appendChild(createTableRow(i18n("post-info-tags").plain(), tagList));
      }

      mainData.appendChild(createTitleLine(post, thread));
      mainData.appendChild(createAuthorLine(post));
      mainData.appendChild(contentTable);
      entry.appendChild(createInfoIcons(post, thread));
      entry.appendChild(mainData);
      listEntry.appendChild(entry);

      list.appendChild(listEntry);
    }

    parent.appendChild(fragment);
  }

  function createTableRow(headerText, content) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");

    th.innerText = headerText + ":";
    td.innterText = content;

    tr.appendChild(th);
    tr.appendChild(td);

    if (typeof(content) === "string") {
      td.innerText = content;
    } else {
      td.appendChild(content);
    }

    return tr;
  }

  function createInfoIcons(post, thread) {
    const container = document.createElement("div");
    container.classList.add("rda-info-icons");

    var containerClass;
    var containerTitle;
    switch (thread.containerType) {
      case "FORUM":
        containerClass = "rda-container-forum";
        containerTitle = i18n("container-name-forum").plain();
        break;
      case "WALL":
        containerClass = "rda-container-wall";
        containerTitle = i18n("container-name-wall").plain();
        break;
      case "ARTICLE_COMMENT":
        containerClass = "rda-container-article";
        containerTitle = i18n("container-name-article").plain();
        break;
    }

    var postTypeClass;
    var postTypeTitle;
    if (post.isReply) {
      postTypeClass = "rda-post-type-reply";
      postTypeTitle = i18n("post-type-reply").plain();
    } else if (post.poll) {
      postTypeClass = "rda-post-type-poll";
      postTypeTitle = i18n("post-type-poll").plain();
    } else {
      postTypeClass = "rda-post-type-text";
      postTypeTitle = i18n("post-type-text").plain();
    }

    function createIcon(className, title) {
      const icon = document.createElement("div");
      icon.classList.add(className);
      icon.title = title;
      icon.appendChild(document.createElement("div")); /* wrapper for CSS */
      return icon;
    }
    container.appendChild(createIcon(containerClass, containerTitle));
    container.appendChild(createIcon(postTypeClass, postTypeTitle));
    return container;
  }

  function createTitleLine(post, thread) {
    const replyText = i18n("post-type-reply").plain();
    var reply;
    var threadTitle;
    var container;
    switch (thread.containerType) {
      case "FORUM":
        const forumThreadUrl = "/f/p/" + post.threadId;
        threadTitle = createWikiTextLink(forumThreadUrl, thread.title);
        container = createWikiTextLink("/f?catId=" + post.forumId, post.forumName);
        reply = createWikiTextLink(forumThreadUrl + "/r/" + post.id, replyText);
        break;
      case "WALL":
        const wallNameLength = post.forumName.length - " Message Wall".length;
        const wallName = post.forumName.substring(0, wallNameLength);
        const wallArticleName = "Message_Wall:" + wallName;
        const wallLinkText = i18n("link-title-message-wall", wallName.replace("_", " ")).plain();
        const wallThreadUrl = wallArticleName + "?threadId=" + post.threadId;
        container = createArticleTextLink(wallArticleName, wallLinkText);
        threadTitle = createArticleTextLink(wallThreadUrl, thread.title);
        reply = createArticleTextLink(wallThreadUrl + "#" + post.id, replyText); 
        break;
      case "ARTICLE_COMMENT":
        const titleText = createTextRepresentation(thread.firstPost, 70, false);
        threadTitle = document.createElement("span");
        threadTitle.innerText = titleText;
        threadTitle.dataset.rdaForumId = post.forumId;
        threadTitle.dataset.rdaThreadId = post.threadId;
        threadTitle.className = "rda-placeholder";
        container = document.createElement("span");
        container.innerText = "???";
        container.dataset.rdaForumId = post.forumId;
        container.className = "rda-placeholder";
        reply = document.createElement("span");
        reply.dataset.rdaForumId = post.forumId;
        reply.dataset.rdaThreadId = post.threadId;
        reply.dataset.rdaPostId = post.id;
        reply.innerText = replyText;
        reply.className = "rda-placeholder";
        break;
    }
    threadTitle.classList.add("rda-title");

    const titleLine = document.createElement("div");
    if (post.isReply) {
      titleLine.appendChild(reply);
      titleLine.appendChild(document.createTextNode(" " + i18n("to").plain() + " "));
    }
    titleLine.appendChild(threadTitle);
    titleLine.appendChild(document.createTextNode(" " + i18n("in").plain() + " "));
    titleLine.appendChild(container);

    return titleLine;
  }

  function createAuthorLine(post) {
    const authorLine = document.createElement("div");
    authorLine.classList.add("rda-authorinfo");

    /* For some reason IPs always start with a slash, which we need to cut out */
    const userName = post.createdBy.name || post.creatorIp.substring(1);
    const isLoggedIn = post.creatorId !== "0";

    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add("wds-avatar");
    if (post.createdBy.avatarUrl) {
      const image = document.createElement("img");
      image.setAttribute("class", "wds-avatar__image rda-avatar");
      image.src = createThumbnailUrl(post.createdBy.avatarUrl, 30, 30);
      avatarContainer.appendChild(image);
    } else {
      avatarContainer.appendChild(createSvgUsage("#wds-icons-avatar", "wds-avatar__image rda-avatar"));
    }
    authorLine.appendChild(avatarContainer);
    authorLine.appendChild(document.createTextNode(i18n("created_by").plain() + " "));

    const profileActivityPageName = "Special:UserProfileActivity/" + userName;
    const profileActivityLink = createArticleTextLink(profileActivityPageName, userName);
    authorLine.appendChild(profileActivityLink);

    const contribsPageName = "Special:Contributions/" + userName;
    const contribsLink = createArticleTextLink(contribsPageName, i18n("contribs").plain());
    authorLine.appendChild(document.createTextNode(" ("));
    authorLine.appendChild(contribsLink);

    if (isLoggedIn) {
      const wallLink = createArticleTextLink("User_talk:" + userName, i18n("talk").plain());
      authorLine.appendChild(document.createTextNode(" | "));
      authorLine.appendChild(wallLink);

      const profileLink = createArticleTextLink("User:" + userName, i18n("link-title-profile").plain());
      authorLine.appendChild(document.createTextNode(" | "));
      authorLine.appendChild(profileLink);
    }
    authorLine.appendChild(document.createTextNode(")"));

    const timeAgo = epochToTimeAgo(post.creationDate.epochSecond);
    authorLine.appendChild(document.createTextNode(" " + timeAgo));

    return authorLine;
  }

  function epochToTimeAgo(epoch) {
    var elapsed = (Math.floor(new Date().getTime()) - new Date(epoch * 1000)) / 1000;
    var factors = [
      ['seconds', 60],
      ['minutes', 60],
      ['hours', 24],
      ['days', 30],
      ['months', 12],
      ['years']
    ];

    for (var i = 0; i < factors.length && elapsed >= factors[i][1]; i++) {
      elapsed /= factors[i][1];
    }
    var unit = factors[i][0];
    elapsed = Math.floor(elapsed);

    return i18n(unit + '_ago_' + (elapsed > 1 ? 'plural' : 'singular'), elapsed).plain();
  }

  function createImageList(images) {
    const ul = document.createElement("ul");
    ul.classList.add("rda-images");
    const imageCount = images.length;
    for (var i = 0; i < imageCount; ++i) {
      const imageData = images[i];
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = imageData.url;
      const img = document.createElement("img");
      img.src = createThumbnailUrl(imageData.url, 200, 120);
      li.appendChild(a);
      a.appendChild(img);
      ul.appendChild(li);
    }
    return ul;
  }

  function createTagList(tags) {
    const ul = document.createElement("ul");
    ul.classList.add("rda-tags");
    const tagCount = tags.length;
    for (var i = 0; i < tagCount; ++i) {
      const tagData = tags[i];
      const li = document.createElement("li");
      const a = createWikiTextLink("/f/t/" + encodeURIComponent(tagData.articleTitle), tagData.articleTitle);
      li.appendChild(a);
      ul.appendChild(li);
    }

    return ul;
  }

  function addCommentLinks(pageNamesPromise) {
    pageNamesPromise.then(function(request) {
      switch (request.status) {
        case 200:
          perf.pageNamesQueryCompleted = performance.now();
          const articleNames = JSON.parse(request.responseText).articleNames;
          const original = document.getElementsByClassName("rda-feed")[0];
          /* 
           * Clone the whole post list, update the off-screen clone
           * and then replace it back as a single operation.
           * This seems to perform up to an order of magnitude better
           * then doing incremental DOM updates (tested in Firefox and Chrome).
           * If there are loss of posts, but no or nearly no article comments,
           * doing the direct updates is faster. So ideally we would only do this
           * if there is a certain amount of elements needing updating.
           * Maybe make the criterion should be something like this:
           *    articleComments / totalEntries > threashold
           * This will require some more testing first to get userful numbers.
           */
          const clone = original.cloneNode(true);
          const placeholders = clone.getElementsByClassName("rda-placeholder");
          const placeholderCount = placeholders.length;
          for (var i = 0; i < placeholderCount; ++i) {
            const placeholder = placeholders[i];
            const articleInfo = articleNames[placeholder.dataset.rdaForumId];
            var url = articleInfo.relativeUrl;
            if (placeholder.dataset.rdaThreadId) {
              url = url + "?commentId=" + placeholder.dataset.rdaThreadId;
              if (placeholder.dataset.rdaPostId) {
                url = url + "&replyId=" + placeholder.dataset.rdaPostId;
              }
            }
            const originalText = placeholder.innerText;
            const newText = originalText === "???" ? articleInfo.title : originalText;
            const newElement = createTextLink(url, newText);
            newElement.classList = placeholder.classList;
            newElement.classList.remove("rda-placeolder");
            placeholder.replaceWith(newElement);
          }
          original.replaceWith(clone);
          perf.commentLinksAdded = performance.now();
          break;
        case 0:
          console.log("DiscussionsActivity cannot connect to server");
          break;
        default:
          console.log("DiscussionsActivity encountered an error of HTTP " + request.status);
          break;
      }

      if (new URL(windows.location.href).searchParams.has("rdaDebug")) {  
        const logPerf = function (text, start, end) {
          console.debug(text + ": " + (end - start) + "ms");
        };
        
        logPerf("load i18n          ", perf.started, perf.i18nLoaded);
        logPerf("i18n messages      ", perf.i18nLoaded, perf.i18nMessagesLoaded);
        logPerf("clear page         ", perf.i18nMessagesLoaded, perf.pageCleared);
        logPerf("render header      ", perf.pageCleared, perf.headerCreated);
        logPerf("wait for API       ", perf.headerCreated, perf.apiResponded);
        logPerf("total API call     ", perf.started, perf.apiResponded);
        logPerf("parse JSON         ", perf.apiResponded, perf.jsonParsed);
        logPerf("query page names   ", perf.jsonParsed, perf.pageNamesQueryStarted);
        logPerf("render posts       ", perf.pageNamesQueryStarted, perf.postsRendered);
        logPerf("wait for page names", perf.postsRendered, perf.pageNamesQueryCompleted);
        logPerf("update page names  ", perf.pageNamesQueryCompleted, perf.commentLinksAdded);
        logPerf("total              ", perf.started, perf.commentLinksAdded);
      }
    });
  }

  function createTextRepresentation(post, characterLimit, includeLineBreaks) {
    if (includeLineBreaks === undefined) includeLineBreaks = true;
    var result;
    if (post.jsonModel) {
      /*
       * As of August 2021 post.rawContent (seemingly incorrectly) strips HTML tags from code blocks.
       * Therefor we avoid rawContent entirely and always parse post.jsonModel instead.
       */
      result = createTextFromJsonModel(post.jsonModel, characterLimit, includeLineBreaks);
    } else if (post.poll) {
      result = post.poll.question;
      const answers = post.poll.answers;
      const answerCount = answers.length;
      for (var i = 0; i < answerCount && result.length < characterLimit; ++i) {
        result = result + "\n" + answers[i].text;
      }
    } else if (post.renderedContent) {
      /* This is probably migrated from old thread-based technology. */
      result = stripHtml(post.renderedContent);
      if (!includeLineBreaks) result = result.replace("\n", "");
    }
    if (!result) return undefined;
    const cappedResult = result.length > characterLimit ?
      result.substring(0, characterLimit) + "…" :
      result;

    return cappedResult;
  }

  function createTextFromJsonModel(jsonModel, characterLimit, includeLineBreaks) {
    var result = "";
    const json = JSON.parse(jsonModel);
    result = parseContentElement(json.content, result, characterLimit, includeLineBreaks);
    return result;
  }
  
  function parseContentElement(contentElement, result, characterLimit, includeLineBreaks) {
    const docElementCount = contentElement.length;
    const addLineBreak = function(currentIndex, totalCount) {
      if (includeLineBreaks && currentIndex < totalCount - 1) result += "\n";
    };
    for (var i = 0; i < docElementCount && result.length < characterLimit; ++i) {
      const docElement = contentElement[i];
      const elementContent = docElement.content;
      if (!elementContent) continue;
      const subElementCount = elementContent.length;
      for (var j = 0; j < subElementCount && result.length < characterLimit; ++j) {
        const subElement = elementContent[j];
        switch (docElement.type) {
          case "paragraph":
          case "code_block":
            if (subElement.type === "text" && subElement.text) {
              result += subElement.text;
            }
            break;
          case "bulletList":
          case "orderedList":
            if (subElement.type === "listItem" && subElement.content) {
              result = parseContentElement(subElement.content, result, characterLimit, includeLineBreaks);
            }
            addLineBreak(j, subElementCount);
            break;
        }
      }
      addLineBreak(i, docElementCount);
    }
    return result;
  }

  function stripHtml(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.innerText || "";
  }

  function createThumbnailUrl(imageUrl, width, height) {
    if (imageUrl.indexOf("/messaging/") !== -1) {
      /* This is a pre-UCP default avatar, it needs to be treated like a wiki image */
      imageUrl += "/revision/latest";
    }
    /* see https://github.com/Wikia/vignette#thumbnail-modes */
    return imageUrl + "/thumbnail-down/width/" + width + "/height/" + height;
  }
  
  function createArticleTextLink(pagename, text) {
    return createTextLink(mwConfig.wgArticlePath.replace("$1", pagename), text);
  }
  
  function createWikiTextLink(relativeUrl, text) {
    return createTextLink(mwConfig.wgScriptPath + relativeUrl, text);
  }
  
  function createTextLink(url, text) {
    var link = document.createElement("a");
    link.href = url;
    link.innerText = text;
    return link;
  }
  
  function createSvgElement(name) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const element = document.createElementNS(svgNamespace, name);
    return element;
  }

  function createSvgUsage(href, className) {
    const svg = createSvgElement("svg");
    svg.setAttribute("class", className);
    const use = createSvgElement("use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", href);
    svg.appendChild(use);
    return svg;
  }
  
  function createSvgSymobls() {
    function createSymbol(symbolId, href, size) {
      const symbol = createSvgElement("symbol");
      symbol.setAttribute("viewBox", "0 0 " + size + " " + size);
      symbol.id = symbolId;
      const use = createSvgElement("use");
      const rootedHref = "/resources-ucp/v2/dist/svg/" + href;
      use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", rootedHref);
      symbol.appendChild(use);
      return symbol;
    }
    var svg = createSvgElement("svg");
    svg.style = "height: 0px; width: 0px; position: absolute; overflow: hidden;";
    svg.setAttribute("aria-hidden", true);
    svg.appendChild(createSymbol("wds-icons-avatar", "wds-icons-avatar.svg#user-avatar-a", 24));
    svg.appendChild(createSymbol("wds-icons-question-small", "wds-icons-question-small.svg#question-small", 18));
    return svg;
  }

})(this, mediaWiki);