if(!!$('.dev_contribs').length) {
    wikia_url = 'http://dev.wikia.com/api.php?' + $.param({
	action: 'query',
        list: 'usercontribs',
        ucuser: wgUserName,
        uclimit: 20,
        ucdir: 'older',//get latest contribs
        ucshow: '!minor',//'new' and 'top' are not available on fandom wikis
        ucnamespace: '0|1|8',
        v: Math.round(Math.random() * 10),//prevent caching
        format: 'json'
    }).replace(/%7C/g,'|'); //fix for encoding inside yql url to prevent double encoding
    $.ajax({
      url      : "https://query.yahooapis.com/v1/public/yql",
      data     : { q: "select * from json where url='" + encodeURI(wikia_url) + "'", format : "json" },
      success  : function(data) {
          if(!!data.query.results && !!data.query.results.json.query.usercontribs) {
              contribs = data.query.results.json.query.usercontribs;
              /* if only one result make array out of single object the keep consistence */
              if(Object.prototype.toString.call(contribs).slice(8, -1) == 'Object') {
                  contribs = [contribs];
              }
              contribs = _.uniq(contribs,false,function(contribution) {
                  return contribution.title;
              });
              contributions = {};
              /* setting filters */
              filterIsTranslation = function(contribution) {
                  return contribution.title.includes('/') && contribution.title.split('/').pop().length == 2;
              }
              filterIsDescription = function(contribution) {
                  return contribution.ns == '0' && !contribution.title.includes('/');
              }
              filterIsScript = function(contribution) {
                  return contribution.ns == '8' && contribution.title.split('.').pop() == 'js';
              }
              filterIsFeedback = function(contribution) {
                  return contribution.ns == '1';
              }

              /* negation filter */
              contributions.miscellaneous = _.reject(contribs,function(contribution) {
                 return !(filterIsTranslation(contribution) && filterIsDescription(contribution) && filterIsScript(contribution) && filterIsFeedback(contribution));
             });

              /* applying filters */
              contributions.translations = contribs.filter(filterIsTranslation);
              contributions.descriptions = contribs.filter(filterIsDescription);
              contributions.scripts = contribs.filter(filterIsScript);
              contributions.feedback = contribs.filter(filterIsFeedback);
              $('.dev_contribs').empty();
              $('.dev_contribs').append(
                  $('<a />').attr('href','http://dev.wikia.com/wiki/User:' + wgUserName).html(
                      $('<strong />').html("User's Contributions to<br />Fandom Developers' Open Source Wiki")
                  )
              );
              ul = $('<ul />').appendTo($('.dev_contribs'));
              for(m in contributions) {
                  type = contributions[m];
                  if(!!type.length) {
                      li = $('<li />').appendTo(ul).text(m);
                      sublist = $('<ul />').appendTo(li);
                      for(n in type) {
                          contribution = type[n];
                          if(m == 'translations') {
                              parts = contribution.title.split('/');
                              title = parts[0] + ' (' + parts[1] + ')';
                          }
                          else if(m == 'scripts') {
                              _title = /MediaWiki:([A-Za-z0-9_-]+)\/code.js/.exec(contribution.title)
                              title = _title ? _title[1] : contribution.title;
                          }
                          else if(m == 'feedback') {
                              _title = /Talk:([A-Za-z_0-9\/ -]+)/.exec(contribution.title)
                              title = _title ? _title[1] : contribution.title;
                          }
                          else {
                              title = contribution.title;
                          }
                          sublist.append(
                              $('<li />').append(
                                  $('<a />')
                                      .attr('href','http://dev.wikia.com/wiki/' + contribution.title)
                                      .text(title)
                              )
                          );
                      }
                  }
              }
          }
      },
      error    : function(data) { console.error(data); }
    });
}