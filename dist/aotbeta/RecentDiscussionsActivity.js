/**
* DiscussionsActivity
* @author: Manuel de la Fuente (https://manuelfte.com), based on DiscussionsFeed (http://dev.wikia.com/wiki/DiscussionsFeed) by Flightmare (http://elderscrolls.wikia.com/wiki/User:Flightmare)
* @version: 0.9.0
* @license: CC-BY-SA 3.0
* @description: Creates a special page for latest Discussions messages
*/
//
// ToDo:
// * Link to load more
// * Option to filter between threads and comments
// * Localization
// * Support for Monobook

/* global wgCityId, wgNamespaceNumber, wgTitle, wgUserGroups, wgUserName, XMLHttpRequest */
console.log('Discussions Activity 0.9.0')

// Converts timestamp to "X time ago"
function msToTime (formerTime) {
  var currentTime = Math.floor(new Date().getTime())
  var ms = currentTime - formerTime
  var years = parseInt((ms / (1000 * 60 * 60 * 24 * 30 * 12)).toFixed(20))
  var months = parseInt((ms / (1000 * 60 * 60 * 24 * 30) % 12).toFixed(20))
  var days = parseInt((ms / (1000 * 60 * 60 * 24) % 30).toFixed(20))
  var hours = parseInt((ms / (1000 * 60 * 60) % 24).toFixed(20))
  var minutes = parseInt((ms / (1000 * 60) % 60))
  var seconds = parseInt((ms / 1000 % 60))
  var formattedTime = ''

  if (years > 0) {
    if (years > 1) {
      formattedTime = years + ' years ago'
    } else {
      formattedTime = years + ' year ago'
    }
  } else if (months > 0) {
    if (months > 1) {
      formattedTime = months + ' months ago'
    } else {
      formattedTime = months + ' month ago'
    }
  } else if (days > 0) {
    if (days > 1) {
      formattedTime = days + ' days ago'
    } else {
      formattedTime = days + ' day ago'
    }
  } else if (hours > 0) {
    if (hours > 1) {
      formattedTime = hours + ' hours ago'
    } else {
      formattedTime = hours + ' hour ago'
    }
  } else if (minutes > 0) {
    if (minutes > 1) {
      formattedTime = minutes + ' minutes ago'
    } else {
      formattedTime = minutes + ' minute ago'
    }
  } else if (seconds > 0) {
    if (seconds > 1) {
      formattedTime = seconds + ' seconds ago'
    } else {
      formattedTime = seconds + ' second ago'
    }
  }

  return formattedTime
}

// Generates the content of the page
function createContent (content, isMod, canBlock, response) {
  var rdaList = ''
  response.forEach(function (postInfo) {
    var title = postInfo['_embedded'].thread[0].title
    var messageID = postInfo.id
    var text = postInfo.rawContent
    if (text.length > 250) {
      text = text.substring(0, 250).trim() + '...'
    }
    var threadID = postInfo.threadId
    var userName = postInfo['createdBy'].name
    var userNameEncoded = userName.replace(/ /g, '_')
    var userID = postInfo['createdBy'].id
    var avatarURL = postInfo['createdBy'].avatarUrl
    if (!avatarURL) {
      avatarURL = 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/50'
    }
    var forumName = postInfo.forumName
    var forumID = postInfo.forumId
    var isReply = postInfo.isReply
    var iconType = 'talk'
    var iconTitle = 'discussion reply'
    var subtitleType = 'commented'
    if (isReply === false) {
      iconType = 'new'
      iconTitle = 'discussion thread'
      subtitleType = 'created'
    }
    var epoch = postInfo['creationDate'].epochSecond
    var time = msToTime(new Date(epoch * 1000))
    var blockButton = ''
    if (canBlock) {
      blockButton = ' | <a class="rda-block" href="/wiki/Special:Block/' + userNameEncoded + '" title="Special:Block/' + userName + '">block</a>'
    }
    var images = postInfo['_embedded'].contentImages[0]
    var imageRow = ''
    if (images) {
      var imageURL = postInfo['_embedded'].contentImages[0].url
      var imageHeight = postInfo['_embedded'].contentImages[0].height
      var imageWidth = postInfo['_embedded'].contentImages[0].width
      if (imageWidth > 200) {
        var reduction = 200 / imageWidth
        imageHeight = Math.floor(imageHeight * reduction)
        imageWidth = 200
      }
      imageRow =
        '<tr data-type="inserted-image">' +
          '<td></td>' +
          '<td>' +
            '<ul class="activityfeed-inserted-media rda-inserted-media reset">' +
              '<li>' +
                '<a data-image-link="" href="' + imageURL + '">' +
                  '<img src="' + imageURL + '/scale-to-width-down/200" width="' + imageWidth + '" height="' + imageHeight + '" class="rda-image">' +
                '</a>' +
              '</li>' +
            '</ul>' +
          '</td>' +
        '</tr>'
    }
    var isThreadDeleted = postInfo['_embedded'].thread[0].isDeleted
    var isMessageDeleted = postInfo.isDeleted
    var isReported = postInfo.isReported
    var statusStyle = ''
    var statusRow = ''
    if (isMessageDeleted || isThreadDeleted || (isReported && isMod)) {
      var statusType
      var statusIconType
      var statusMessage

      if (isMessageDeleted || isThreadDeleted) {
        statusType = 'deleted'
        statusIconType = 'trash'
        statusStyle = ' rda-deleted" style="color: gray;'

        if (isMessageDeleted) {
          var deleter = postInfo.lastDeletedBy.name
          var deleterId = postInfo.lastDeletedBy.id
          statusMessage = 'Message deleted by <a class="rda-deleter" href="/d/u/' + deleterId + '">' + deleter + '</a>'
        } else if (isThreadDeleted) {
          statusMessage = 'Parent thread deleted'
        }
      } else if (isReported && isMod) {
        statusType = 'reported'
        statusIconType = 'error'
        statusMessage = 'Message reported'
        statusStyle = ' rda-deleted" style="font-style: italic;'
      }
      statusRow =
        '<tr>' +
          '<td></td>' +
          '<td class="rda-status-' + statusType + '">' +
            '<cite>' +
              '<img class="' + statusIconType + ' sprite rda-' + statusIconType + '-icon" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" alt="' + statusType + ' message" title="' + statusType + ' message" width="16" height="16">' +
              '<span class="subtle">' + statusMessage + '</span>' +
            '</cite>' +
          '</td>' +
        '</tr>'
    }

    // Creates each entry and puts them in the list
    var rdaEntry =
      '<li class="activity-type-discussion rda-entry">' +
        '<img class="' + iconType + ' sprite" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" alt="' + iconTitle + '" title="' + iconTitle + '" width="16" height="16">' +
        ' <strong><a class="title rda-title" href="/d/p/' + threadID + '">' + title + '</a></strong>' +
        ' in <a class="rda-category" href="/d/f?catId=' + forumID + '&sort=latest">' + forumName + '</a>' +
        '<table class="wallfeed rda-table">' +
          '<tbody>' +
            '<tr>' +
              '<td><img src="' + avatarURL /* Ideally, avatars should be resized by appending '/scale-to-width-down/50' here, but some of them error when doing it */ + '" width="30" height="30" class="avatar rda-avatar" alt="' + userName + '"></td>' +
              '<td>' +
                '<p>' +
                  '<cite>' +
                    '<span class="subtle">' + subtitleType + ' by</span>' +
                    ' <a class="real-name rda-username" href="/d/u/' + userID + '">' + userName + '</a> (<a class="rda-wall" href="/wiki/Message_Wall:' + userNameEncoded + '" title="Message Wall:' + userName + '">wall</a> | <a class="rda-contribs" href="/wiki/Special:Contributions/' + userNameEncoded + '" title="Special:Contributions/' + userName + '">contribs</a>' + blockButton + ')' +
                    ' <a class="subtle rda-time" href="/d/p/' + threadID + '/r/' + messageID + '">' + time + '</a>' +
                  '</cite>' +
                '</p>' +
                '<p style="font-size: 14px;">' +
                  '<span class="rda-content' + statusStyle + '">' + text + '</span>' +
                '</p>' +
              '</td>' +
            '</tr>' +
            imageRow +
            statusRow +
          '</tbody>' +
        '</table>' +
      '</li>'

    rdaList += rdaEntry
  })
  rdaList = '<ul class="activityfeed rda-feed reset" id="myhome-activityfeed">' + rdaList + '</ul>'

  content.innerHTML = rdaList
}

// Gets Discussions list
var rdaTimeout // Global variable in order to be able to cancel timeout from other functions
function getDiscussions (content, isMod, canBlock, loadingIcon) {
  // Shows loading icon
  if (!loadingIcon) {
    loadingIcon = document.getElementById('rda-loading-autorefresh')
  }
  loadingIcon.style.display = 'inline'
  // Clears existing timeouts
  if (rdaTimeout) {
    clearTimeout(rdaTimeout)
    console.log('Former timeout cleared')
  }
  // Refresh interval
  var interval = 60000
  if (window.rdaRefreshInterval >= 30000) { // Only if value of global variable is equal or higher than 30 seconds
    interval = window.rdaRefreshInterval
    console.log('interval window set', interval)
  }
  // Checks whether to show deleted posts
  var viewableOnly = !isMod
  if (isMod && window.localStorage.getItem('rdaShowDeleted') === 'false') {
    viewableOnly = true
    console.log('showDeleted localStorage', !viewableOnly)
  }
  // Retrieves JSON
  var request = new XMLHttpRequest()
  request.timeout = 30000
  request.ontimeout = function () {
    content.textContent = 'Unable to load discussions. The connection errored or the service might be down.'
  }
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      // If posts were retrieved correctly
      if (request.status === 200) {
        var response = JSON.parse(request.responseText)['_embedded']['doc:posts']
        createContent(content, isMod, canBlock, response)
      // If posts couldn't be retrieved
      } else {
        content.textContent = 'Unable to load discussions. The connection errored or the service might be down.'
      }
      // Sets autorefresh
      var autoRefresh = true
      if (window.localStorage.getItem('rdaAutoRefresh') === 'false') {
        autoRefresh = false
        console.log('autoRefresh localStorage', autoRefresh)
      }
      if (autoRefresh === true) { // Sets timeout only if auto refresh is enabled
        rdaTimeout = setTimeout(getDiscussions, interval, content, isMod, canBlock)
        console.log('autoRefresh timeout set')
      }
      console.log('Loaded Discussions', new Date())
      // Hides loading icon
      loadingIcon.style.display = 'none'
    }
  }
  request.open('GET', 'https://services.wikia.com/discussion/' + wgCityId + '/posts?limit=50&viewableOnly=' + viewableOnly, true)
  request.setRequestHeader('Accept', 'application/hal+json')
  request.withCredentials = true
  request.send()
}

// Sets checkboxes
function checkboxes (content, isMod, canBlock) {
  // Gets header
  var header = document.getElementsByClassName('page-header__main')[0]
  // Checkbox for auto refresh
  var autoRefreshStatus = ''
  if (window.localStorage.getItem('rdaAutoRefresh') !== 'false') {
    autoRefreshStatus = 'checked'
  }
  var autoRefresh =
    '<span>' +
      '<label style="vertical-align: bottom;">Auto refresh</label>' +
      '<input id="rda-chbx-autorefresh" type="checkbox" ' + autoRefreshStatus + ' style="margin-bottom: 0; margin-top: 0; vertical-align: middle;" />' +
      '<img alt="Loading" id="rda-loading-autorefresh" style="display: none; vertical-align: bottom;" src="https://images.wikia.nocookie.net/wlb/images/7/74/WIP.gif">' +
    '</span>'
  // Checkbox for show deleted
  var showDeleted = ''
  if (isMod) {
    var showDeletedStatus = ''
    if (window.localStorage.getItem('rdaShowDeleted') !== 'false') {
      showDeletedStatus = 'checked'
    }
    showDeleted =
    '<span style="margin-left: 1em;">' +
      '<label style="vertical-align: bottom;">Show deleted</label>' +
      '<input id="rda-chbx-showdeleted" type="checkbox" ' + showDeletedStatus + ' style="margin-bottom: 0; margin-top: 0; vertical-align: middle;" />' +
      '<img alt="Loading" id="rda-loading-showdeleted" style="display: none; vertical-align: bottom;" src="https://images.wikia.nocookie.net/wlb/images/7/74/WIP.gif">' +
    '</span>'
  }
  // Puts them inside the wrapper
  var checkboxes =
    '<div id="rda-checkboxes" style="font-size: 10px; margin-top: 0.5em;">' +
      autoRefresh +
      showDeleted +
    '</div>'
  // Appends it to header
  header.insertAdjacentHTML('beforeend', checkboxes)
  // Sets function for checkbox for auto refresh
  var chbxAutoRefresh = document.getElementById('rda-chbx-autorefresh')

  chbxAutoRefresh.onchange = function () {
    if (chbxAutoRefresh.checked === true) {
      window.localStorage.setItem('rdaAutoRefresh', 'true')
      getDiscussions(content, isMod, canBlock)
    } else {
      window.localStorage.setItem('rdaAutoRefresh', 'false')
      clearTimeout(rdaTimeout)
    }
  }
  // Sets function for checkbox for show deleted
  if (isMod) {
    var chbxShowDeleted = document.getElementById('rda-chbx-showdeleted')

    chbxShowDeleted.onchange = function () {
      if (chbxShowDeleted.checked === true) {
        window.localStorage.setItem('rdaShowDeleted', 'true')
      } else {
        window.localStorage.setItem('rdaShowDeleted', 'false')
      }
      var loadingIcon = document.getElementById('rda-loading-showdeleted')
      getDiscussions(content, isMod, canBlock, loadingIcon)
    }
  }
}

// Creates the special page
function createPage (status) {
  if (wgNamespaceNumber === -1 && wgTitle === 'DiscussionsActivity') {
    // Replaces the title
    document.title = document.title.replace('Error', 'Recent Discussions Activity')
    document.getElementById('PageHeader').getElementsByTagName('h1')[0].textContent = 'Recent Discussions Activity'
    // Gets div of content
    var content = document.getElementById('mw-content-text')
    // If Discussions were loaded correctly
    switch (status) {
      case 200:
        // Detects the background color to request the proper CSS
        var background = document.getElementById('WikiaPageBackground')
        var rgb = window.getComputedStyle(background).backgroundColor.match(/\d+/g)
        var hex = ''
        rgb.forEach(function (i) {
          hex += parseInt(i).toString(16).padStart(2, i)
        })
        // Requests the CSS and inserts it in the page
        var title = document.getElementsByTagName('title')[0]
        var style = '<link rel="stylesheet" type="text/css" href="https://slot1-images.wikia.nocookie.net/__am/1515674256/sasses/color-page%3D%2523' + hex + '%26skins/extensions/wikia/MyHome/oasis.scss,extensions/wikia/Wall/css/WallWikiActivity.scss" />'
        title.insertAdjacentHTML('afterend', style)
        // Gets user perms to pass to next function
        var canBlock = Boolean(wgUserGroups.indexOf('sysop') > -1 || wgUserGroups.indexOf('staff') > -1 || wgUserGroups.indexOf('helper') > -1 || wgUserGroups.indexOf('vstf') > -1 || wgUserGroups.indexOf('global-discussions-moderator') > -1)
        var isMod = Boolean(canBlock || wgUserGroups.indexOf('threadmoderator') > -1)
        // Inserts checkboxes
        checkboxes(content, isMod, canBlock)
        // Inserts temporary content
        content.innerHTML = 'Loading feed... <img src="https://images.wikia.nocookie.net/wlb/images/7/74/WIP.gif" /></div>'
        // Gets Discussions list
        getDiscussions(content, isMod, canBlock)
        break
      // If Discussions is not enabled on the domain
      case 404:
        content.textContent = 'Unable to load discussions. The feature is not enabled on this domain.'
        break
      // Any other error
      default:
        content.textContent = 'Unable to load discussions. The connection errored or the service might be down.'
    }
  }
}

// Inserts links in header subtitle in certain pages
function insertLinks () {
  if (wgNamespaceNumber === -1 && (wgTitle === 'DiscussionsActivity' || wgTitle === 'WikiActivity' || wgTitle === 'WikiActivity/watchlist' || wgTitle === 'RecentChanges')) {
    var headerSubtitle = document.getElementsByClassName('page-header__page-subtitle')[0]
    var changesLink = '<a href="/wiki/Special:RecentChanges" title="Special:RecentChanges">Recent changes ></a>'
    var activityLink = '<a href="/wiki/Special:WikiActivity" title="Special:WikiActivity">Wiki activity ></a>'
    var followedLink = '<a href="/wiki/Special:WikiActivity/watchlist" title="Special:WikiActivity/watchlist"> Followed Pages only</a>'
    var discussionsLink = '<a href="/wiki/Special:DiscussionsActivity" title="Special:DiscussionsActivity">Discussions activity ></a>'
    var headerLinks

    if (wgTitle === 'DiscussionsActivity') {
      headerLinks = changesLink + ' | ' + activityLink
    } else if (wgTitle === 'WikiActivity') {
      if (wgUserName) {
        headerLinks = followedLink + ' | ' + changesLink + ' | ' + discussionsLink
      } else {
        headerLinks = changesLink + ' | ' + discussionsLink
      }
    } else if (wgTitle === 'WikiActivity/watchlist') {
      headerLinks = activityLink + ' | ' + changesLink + ' | ' + discussionsLink
    } else if (wgTitle === 'RecentChanges') {
      headerLinks = activityLink + ' | ' + discussionsLink
    }

    headerSubtitle.innerHTML = headerLinks
  }
}

// Checks whether Discussions is enabled on the domain
function isDiscussionsEnabled () {
  var request = new XMLHttpRequest()
  request.timeout = 30000
  request.ontimeout = function () {
    createPage(request.status)
  }
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      // Creates page regardless of status; if success it will load Discussions, if fail it will show an error
      createPage(request.status)
      // Inserts links under header only if Discussions is enabled
      if (request.status === 200) {
        insertLinks()
      }
    }
  }
  request.open('GET', '/d/f', true)
  request.send()
}

// Fires the function after the HTML document has been loaded
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  isDiscussionsEnabled()
} else {
  document.addEventListener('DOMContentLoaded', isDiscussionsEnabled)
}