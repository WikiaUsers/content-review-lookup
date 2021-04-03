/* Any JavaScript here will be loaded for all users on every page load. */

/* Function made to check if given user is an admin */
/* Based on ListAdmins from dev.fandom.com */
const CheckPermissions = function (username, group) {
  return new Promise(function(resolve, reject) {
    $.getJSON(mw.util.wikiScript('api'), {
      action: 'query',
      list: 'allusers|groupmembers',
      augroup: group,
      aulimit: 'max',
      gmgroups: group,
      gmlimit: 'max',
      format: 'json'
    }, function(data) {
      if (!data.error) {
        (data.users || data.query && data.query.allusers).forEach(function(u) {
          if (username == u.name) resolve(true);
        });
      }
      resolve(false);
    });
  });
};
/* HTML that is going to be checked will look like:
<div class="check-permission">
  <div class="check-permission-user" style="display:none">USERNAME</div>
  <div class="check-permission-group" style="display:none">GROUP NAME (EG. SYSOP)</div>
  <div class="check-permission-true" style="display:none">TEXT TO BE SHOWN IF USER IS IN THIS GROUP</div>
  <div class="check-permission-false" style="display:none">TEXT TO BE SHOWN IF USER IS NOT IN THIS GROUP</div>
</div>
*/
mw.hook('wikipage.content').add(function ($content) {
  $('.check-permission').each(function(index, element) {
    if ($(element).children(".check-permission-group").text().toUpperCase() == "TRUE")
      $(element).find(".check-permission-true").show();
    else CheckPermissions($(element).children(".check-permission-user").text(),
                          $(element).children(".check-permission-group").text())
                          .then(function(result) {
      if (result) $(element).find(".check-permission-true").show();
      else $(element).find(".check-permission-false").show();
    });
  });
});

// Show USERNAME
if (wgUserName != 'null') {
  $('.insertusername').text(wgUserName);
}