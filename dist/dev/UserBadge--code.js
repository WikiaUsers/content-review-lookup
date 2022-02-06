/**
 * @name UserBadge
 * @author 机智的小鱼君
 *
 * @description Add user group badge after user links
 */

;(function ($) {
  if ($('.mw-userlink').length < 1) return

  // Adjust global variables
  window.dev = window.dev || []
  window.dev.userBadge = window.dev.userBadge || {}
  if (typeof window.dev.userBadge !== 'object') window.dev.userBadge = {}
  var mwApi = new mw.Api({
    parameters: {
      format: 'json',
      formatversion: 2,
    },
  })

  /** @type {{ name: string; groups: string[]; missing?: true; invalid?: true }[]} */
  var USERS_CACHE = []
  /** @type {Record<string, string>} */
  var BADGES_DEFAULTS = {
    // local
    sysop:
      'https://vignette.wikia.nocookie.net/central/images/1/12/Badge-Admin.svg',
    'content-moderator':
      'https://vignette.wikia.nocookie.net/central/images/e/ef/Badge-ContentModerator.svg',
    threadmoderator:
      'https://vignette.wikia.nocookie.net/central/images/5/50/Badge-DiscussionsModerator.svg',
    // global
    staff:
      'https://vignette.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg',
    'wiki-representative':
      'https://vignette.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg',
    'wiki-specialist':
      'https://vignette.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg',
    helper:
      'https://vignette.wikia.nocookie.net/central/images/c/c8/Badge-Helper.svg',
    soap: 'https://vignette.wikia.nocookie.net/central/images/9/9a/Badge-SOAP.svg',
    'global-discussions-moderator':
      'https://vignette.wikia.nocookie.net/central/images/4/40/Badge-GlobalDiscussionsModerator.svg',
  }

  /** @type {string[]} */
  var DISABLED_USERS = window.dev.userBadge.disabledUsers || []
  if (typeof DISABLED_USERS === 'string') {
    DISABLED_USERS = DISABLED_USERS.split('|')
  }

  /** @type {string[]} */
  var DISABLED_GROUPS = window.dev.userBadge.disabledGroups || []
  if (typeof DISABLED_USERS === 'string') {
    DISABLED_GROUPS = DISABLED_GROUPS.split('|')
  }

  /** @type {Record<string, string>} */
  var CUSTOM_BADGES = window.dev.userBadge.customBadges || {}
  if (typeof CUSTOM_BADGES !== 'object') {
    CUSTOM_BADGES = {}
  }

  var BADGES_LIST = Object.assign({}, BADGES_DEFAULTS, CUSTOM_BADGES)

  // Get all users
  var _userNames = []
  $('.mw-userlink').each(function (_, el) {
    var $this = $(el)
    var userName = $this.text().trim()
    _userNames.push(userName)
  })
  USERS_CACHE = Array.from(new Set(_userNames)).map(function (name) {
    return {
      name: name,
      groups: [],
    }
  })

  // Get user groups
  mwApi
    .get({
      action: 'query',
      list: 'users',
      ususers: USERS_CACHE.map(function (i) {
        return i.name
      }),
      usprop: 'groups',
    })
    .then(function (data) {
      USERS_CACHE = data.query.users
      USERS_CACHE.filter(function (item) {
        return !item.missing && !item.invalid
      }).forEach(function (item) {
        // Variables
        var name = item.name
        var groups = item.groups
        var $userLink = $('[data-username="' + name + '"]')

        // Add group classes
        $userLink.addClass(
          groups.map(function (group) {
            return 'group-' + group
          })
        )

        // Disabled user
        if (DISABLED_USERS.includes(name)) {
          return $userLink.addClass('badge-disabled-user')
        }

        item.groups.forEach(function (group) {
          var src = BADGES_LIST[group]

          // Has group badge?
          if (!src) return

          // Disabled group
          if (DISABLED_GROUPS.includes(group)) {
            return $userLink.addClass('badge-disabled-group-' + group)
          }

          $userLink.append(function () {
            // Already has badge
            if ($(this).find('.user-badge.group-' + group).length > 0) return

            return $('<img>', {
              class: 'user-badge group-' + group,
              src: src,
            }).css({
              width: '1em',
              height: '1em',
            })
          })
        })
      })
    })
})(window.jQuery)