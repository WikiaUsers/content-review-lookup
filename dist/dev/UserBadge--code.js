/** 
 * UserBadge
 * Add user badge after user links
 * ATTENSION: Do not use it. The script currently has serious performance issues
 **/
$(function(){
  $('.mw-userlink').each(function() {
    var $this = $(this),
    user = $(this).attr('title');
    new mw.Api().get({
      action: 'query',
      list: 'users',
      ususers: user,
      usprop: 'groups'
    }).done(function(data) {
      var groups = data.query.users[0].groups;
      if (groups.indexOf('staff') > -1) {
        $this.addClass('user-staff').after('<img class="user-badge user-staff" src="https://vignette.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg/revision/latest?cb=20181230095915" style="height:1em;width:auto;" title="This user is Fandom staff"/>');
      }
      if (groups.indexOf('sysop') > -1) {
        $this.addClass('user-sysop').after('<img class="user-badge user-sysop" src="https://vignette.wikia.nocookie.net/central/images/1/12/Badge-Admin.svg/revision/latest?cb=20181230095355" style="height:1em;width:auto;" title="This user is wiki admin"/>');
      }
    });
  });
});