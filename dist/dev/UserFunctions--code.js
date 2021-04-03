/**
 * @name UserFunctions
 * @description Provides functions similar to [[Mw:Extension:UserFunctions]]
 * @author 机智的小鱼君
 */
!(function($, mw) {
  $('.UserFunctions').html(function() {
    // Create variables
    var NoMatchedItems = 0,
      $this = $(this), // class="UserFunctions"
      $children = $this.children(),
      type = this.dataset.type,
      username = mw.config.get('wgUserName'),
      usergroup = mw.config.get('wgUserGroups')

    // Functions
    switch (type) {
      case 'iflogin':
        if (username != null) {
          $this.find('[data-keyword="true"]').show()
          $this.find('[data-keyword="false"]').hide()
        } else {
          $this.find('[data-keyword="false"]').show()
          $this.find('[data-keyword="true"]').hide()
        }
        break

      case 'username':
        return username
        break

      case 'ifusername':
        $children.each(function() {
          var keyword = this.dataset.keyword
          if (keyword == username) {
            $(this).show()
            ++NoMatchedItems
          } else {
            $(this).hide()
          }
        })
        break

      case 'usergroup':
        return usergroup
        break

      case 'ifingroup':
        $children.each(function() {
          var keyword = this.dataset.keyword
          if ($.inArray(keyword, usergroup) > 0) {
            $(this).show()
            ++NoMatchedItems
          } else {
            $(this).hide()
          }
        })
        break

      default:
        return '<a href="https://dev.fandom.com/wiki/UserFunctions" target="_blank"><span style="font-weight:bold;color:#b00">User Functions type error!</span></a>'
    }

    // If no matched items, then show default
    if (NoMatchedItems < 1) {
      $this.find('[data-keyword="!default"]').show()
    }
  })
})(jQuery, mediaWiki)