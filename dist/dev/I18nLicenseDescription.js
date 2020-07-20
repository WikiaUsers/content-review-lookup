/** 
 * i18n License Description
 * Make the License-description at the bottom of the article display in user language rather than community language
 **/
(new mw.Api()).get({
  action: 'query',
  meta: 'allmessages',
  ammessages: 'License-description',
  amlang: mw.config.get('wgUserLanguage') || mw.config.get('wgContentLanguage')
}).done(function(data) {
  var License = $('.license-description a').prop('outerHTML'),
      LicenseDescriptionMsg = data.query.allmessages[0]['*'].replace('$1',License);

  $('.license-description').html(LicenseDescriptionMsg);
});