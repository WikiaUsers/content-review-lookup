/*
* Redirect Management
* @description Delete broken redirects and fix double redirects automatically.
* @author Ozuzanna
*/
 
;(function($, mw) {
 
if ($('#btn-resolve-broken').length || $('#btn-resolve-double').length)
  return;
 
var ug = mw.config.get("wgUserGroups").join(' ');
if (mw.config.get('wgCanonicalSpecialPageName') == "BrokenRedirects" && (ug.indexOf('sysop') + ug.indexOf('vstf') + ug.indexOf('staff') + ug.indexOf('helper') > -4)) {
  $('.mw-spcontent').find('p').first().append('<br/><a class="button" style="cursor:pointer" id="btn-resolve-broken">Resolve Redirects</a>');
  $('#btn-resolve-broken').click(function() {
    $('.special > li').each(function() {
      var page = $(this).find('a').first().text(),
      len = $(this).children('a').length;
      if (len != 4) //already resolved
        return;
 
      new mw.Api().post({
      format: 'json',
      action: 'delete',
      watchlist: 'nochange',
      title: page,
      reason: 'Automated Deletion :: Deleting broken redirects',
      token: mw.user.tokens.get('editToken')
      })
      .done(function(d) { 
         if (!d.error) {
	   console.log('Deletion of '+page+' successful!');
         }
         else {
           console.log('Failed to delete '+page+': '+ d.error.code);
         }		
      })
      .fail(function() {
        alert('Failed to delete '+page+'!');
      });  
    });
    setTimeout(function() { 
      location.reload(); 
    }, 15000);
  });
}
 
if (mw.config.get('wgCanonicalSpecialPageName') == "DoubleRedirects") {
  $('.mw-spcontent').find('p').first().append('<br/><a class="button" style="cursor:pointer" id="btn-resolve-double">Resolve Redirects</a>');
  $('#btn-resolve-double').click(function() {
    $('.special > li').each(function() {
      var page = $(this).find('a').first().text(),
      dest = $(this).find('a').last().text(),
      len = $(this).children('a').length;
      if (len != 4) //already resolved
        return;
 
      new mw.Api().post({
      action: 'edit',
      watchlist: 'nochange',
      title: page,
      text: '#REDIRECT [['+dest+']]',
      summary: 'Automated Edit :: Fixing double redirects',
      token: mw.user.tokens.get('editToken')
      })
      .done(function(d) { 
         if (!d.error) {
	   console.log('Resolving double redirect for '+page+' successful!');
         }
         else {
           console.log('Failed to resolve double redirect for '+page+': '+ d.error.code);
         }		
      })
      .fail(function() {
        alert('Failed to resolve double redirect for '+page+'!');
      });
    });
    setTimeout(function() { 
      location.reload(); 
    }, 30000);
  });
}
 
}) (this.jQuery, this.mediaWiki);
//