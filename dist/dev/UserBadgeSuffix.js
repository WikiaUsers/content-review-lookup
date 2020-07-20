/**
 * Add User Badge
 * @Author: 机智的小鱼君
 * 
 * DO NOT USE
 * Seems not work for MediaWiki 1.19 - Waiting UCP
 * **/
$(function () {
  if ($('.mw-userlink').length < 1) return;

  // Main function
  function addUserBadge(params) {
    var api = new mw.Api(),
      group = params.group,
      badge = params.badge,
      groupName = params.groupName || group;
    api.get({
      action: 'query',
      list: 'allusers',
      aulimit: 'max',
      augroup: group,
      format: 'json'
    }).done(function (data) {
      if (data.warnings !== undefined) {
        console.warn('AddUserBadge warning: ' + data.warnings.allusers['*']);
        return;
      }
      var users = data.query.allusers;
      for (k = 0; k < users.length; k++) {
        console.info('Added ' + group + ' badge to ' + users[k].name);
        $('.mw-userlink[data-username="' + users[k].name + '"]')
          .addClass('usergroup-' + group)
          .after(
            $('<img>', {
              class: 'user-badge usergroup-' + group,
              style: 'height:1em;width:auto;',
              title: 'This user is ' + groupName,
              src: badge
            })
          );
      }
    });
  }

  // Eliminate namespace name differences
  $('.mw-userlink').each(function () {
    var $this = $(this),
      username = $this.attr('title').split(':')[1];
    $this.attr('data-username', username);
  });

  // Add groups & badges
  addUserBadge({
    group: 'content-moderator',
    badge: 'https://vignette.wikia.nocookie.net/central/images/e/ef/Badge-ContentModerator.svg/revision/latest',
    groupName: 'wiki content moderator'
  });
  addUserBadge({
    group: 'discussions-moderator',
    badge: 'https://vignette.wikia.nocookie.net/central/images/5/50/Badge-DiscussionsModerator.svg/revision/latest',
    groupName: 'wiki discussions moderator'
  });
  addUserBadge({
    group: 'global-discussions-moderator',
    badge: 'https://vignette.wikia.nocookie.net/central/images/4/40/Badge-GlobalDiscussionsModerator.svg/revision/latest',
    groupName: 'global discussions modrator'
  });
  addUserBadge({
    group: 'helper',
    badge: 'https://vignette.wikia.nocookie.net/central/images/c/c8/Badge-Helper.svg/revision/latest',
    groupName: 'Fandom IVT helper'
  });
  addUserBadge({
    group: 'staff',
    badge: 'https://vignette.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg/revision/latest',
    groupName: 'official Fandom staff'
  });
  addUserBadge({
    group: 'sysop',
    badge: 'https://vignette.wikia.nocookie.net/central/images/1/12/Badge-Admin.svg/revision/latest',
    groupName: 'wiki admin'
  });
  addUserBadge({
    group: 'vanguard',
    badge: 'https://vignette.wikia.nocookie.net/central/images/b/b2/Badge-Vanguard-small.svg/revision/latest',
    groupName: 'Vanguard'
  });
  addUserBadge({
    group: 'vstf',
    badge: 'https://vignette.wikia.nocookie.net/central/images/9/93/Badge-VSTF.svg/revision/latest',
    groupName: 'VSTF member'
  });
  // ...
});