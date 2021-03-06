/**
 * @name UserBadge
 * @author 机智的小鱼君
 * @description Add user group badge after user links
 */
!(function () {
  if ($('.mw-userlink').length < 1) return

  window.dev = window.dev || []
  window.dev.userBadge = window.dev.userBadge || {}
  if (typeof window.dev.userBadge !== 'object') window.dev.userBadge = {}
  // if (window.dev.userBadge.loaded) {
  //   return
  // } else {
  //   window.dev.userBadge.loaded = true
  // }

  // Cache users
  var userList = []
  // Default badges
  var defaultBadgeList = {
    staff: 'https://vignette.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg/revision/latest?cb=20181230095915',
    helper: 'https://vignette.wikia.nocookie.net/central/images/c/c8/Badge-Helper.svg/revision/latest?cb=20181230101409',
    sysop: 'https://vignette.wikia.nocookie.net/central/images/1/12/Badge-Admin.svg/revision/latest?cb=20181230095355',
    'content-moderator': 'https://vignette.wikia.nocookie.net/central/images/e/ef/Badge-ContentModerator.svg/revision/latest?cb=20181230094934',
    'discussions-moderator': 'https://vignette.wikia.nocookie.net/central/images/5/50/Badge-DiscussionsModerator.svg/revision/latest?cb=20181230095305',
    /* vstf */soap: 'https://vignette.wikia.nocookie.net/central/images/9/93/Badge-VSTF.svg/revision/latest?cb=20181230101029',
    vanguard: 'https://vignette.wikia.nocookie.net/central/images/b/b2/Badge-Vanguard-small.svg/revision/latest?cb=20171111112441',
    'global-discussions-moderator': 'https://vignette.wikia.nocookie.net/central/images/4/40/Badge-GlobalDiscussionsModerator.svg/revision/latest?cb=20181230212405',
    // ...
  }
  // Disabled users
  var disabledUsers = window.dev.userBadge.disabledUsers || []
  if (typeof disabledUsers === 'string') disabledUsers = disabledUsers.split('|')
  // Disabled groups
  var disabeldGroups = window.dev.userBadge.disabledGroups || []
  if (typeof disabledUsers === 'string') disabledGroups = disabledGroups.split('|')
  // Custom badges
  var customBadges = window.dev.userBadge.customBadges || {}
  if (typeof customBadges !== 'object') customBadges = {}
  var badgeList = $.extend({}, defaultBadgeList, customBadges)

  // Get all users
  $('.mw-userlink').each(function (_, el) {
    var $this = $(el)

    // Get user name
    var userName = $this.text().trim()

    // Set data
    $this.attr('data-username', userName)

    // Save to cache
    if (userList.indexOf(userName) < 0) {
      userList.push(userName)
    }
  })

  // Get user groups
  userList = userList.join('|').replace(/\s/, '_')
  new mw.Api().get({
    format: 'json',
    action: 'query',
    list: 'users',
    ususers: userList,
    usprop: 'groups'
  }).then(function (data) {
    $.each(data.query.users, function (_, user) {
      if (user.missing === '' || user.invalid === '') return
      // Variables
      var userName = user.name
      var userGroup = user.groups
      var $userLink = $('.mw-userlink[data-username="' + userName + '"]')

      // Add group classes
      var groupClass = ''
      if (userGroup.length > 0) {
        groupClass = 'group-' + userGroup.join(' group-')
      } else {
        groupClass = ''
      }

      $userLink.addClass(groupClass)

      // Add badge
      if (disabledUsers.indexOf(userName) > -1) {
        // Disabled user
        $userLink.addClass('badge-disabled-user')
      } else {
        $.each(badgeList, function (groupId, src) {
          if (disabeldGroups.indexOf(groupId) > -1) {
            // Disabled group
            $userLink.addClass('badge-disabled-group-' + groupId)
          } else {
            // Has group badge?
            if (userGroup.indexOf(groupId) > -1) {
              // Add badge
              $userLink.append(function () {
                if ($(this).find('.user-badge.group-' + groupId).length > 0) return
                return $('<img>', { class: 'user-badge group-' + groupId, style: 'width:1em;height:auto', src: src })
              })
            }
          }
        })
      }
    })
  })

})()