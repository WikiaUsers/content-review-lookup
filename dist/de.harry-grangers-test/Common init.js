addOnloadHook(function () {
    importArticlesCallback([
        /*{
            page: 'MediaWiki:CSON.js',
            type: 'scripts',
            callback: function() {
                console.log('CSON loaded',CSON);
                $.get('/wiki/MediaWiki:Users.cson.js?action=raw',function(code) {
                    console.log('cson',CSON.toJSON(code));
                });
            }
        },*/
        {
            page: 'MediaWiki:Libraries.js',
            type: 'scripts',
            callback: function() {
                loadLibraries(config.activateLibraries);
            }
        },
        {
            page: 'MediaWiki:Navigation.js',
            type: 'scripts',
            callback: function() {
                appendLink('user',3,'Project:Einstellungen','Wikispezifische Einstellungen');
            }
        },
        {
            page: 'MediaWiki:SettingsPage.js',
            type: 'scripts',
            callback: function() {
                //For some reason that does not work
                //showSettingsModal();
            }
        },
    {
        page: 'MediaWiki:Sidebar.js',
        type: 'scripts',
        callback: function() {
            //Add module to sidebar
            //Substitute MediaWiki:Description or if MediaWiki:Custom-about exists
            pageExists('MediaWiki:Custom-about-text',function() {
                $.get('/api.php?action=parse&title=MediaWiki:Custom-about-text&text={{int:Custom-about-text}}&format=json',function(data) {
                    pageExists('MediaWiki:Custom-about-title',function() {
                        $.get('/api.php?action=parse&title=MediaWiki:Custom-about-title&text={{int:Custom-about-title}}&format=json',function(data2) {
                            createSidebarModule(data2.parse.text['*'],data.parse.text['*'],'about');
                        });
                    },function() {
                        createSidebarModule('Über uns',data.parse.text['*'],'about');
                    });
                });
            },function() {
                $.get('/wiki/MediaWiki:Description',function(data) {
                    content = $('<div />').html($.parseHTML(data));
                    description = content.children('.WikiaSiteWrapper').find('.WikiaPage #mw-content-text').html();
                    pageExists('MediaWiki:Custom-about-title',function() {
                        $.get('/api.php?action=parse&title=MediaWiki:Custom-about-title&text={{int:Custom-about-title}}&format=json',function(data) {
                            createSidebarModule(data.parse.text['*'],description,'about');
                        });
                    },function() {
                        createSidebarModule('Über uns',description,'about');
                    });
                });
            });
 
            //Buch des Monats
            bdmNextMonth = wgMonthNames[(new Date()).getMonth() + 2];
            bdmYear = (new Date()).getMonth() == 11 ? (new Date()).getFullYear() + 1 : (new Date()).getFullYear();
            bdmDescription = $('<div />').addClass('description').append(
                'Wähle das ',
                $('<b />').text('Buch des Monats'),
                ' für ' + bdmNextMonth + '!'
            );
            bdmButton = $('<a />').addClass('button').text('Abstimmen').attr('href','/wiki/Top_10-Liste:Buch_des_Monats:_Abstimmung_für_' + bdmNextMonth + '_' + bdmYear);
            createSidebarModule('',bdmDescription.wrapAll('<div>').parent().html() + bdmButton.wrapAll('<div>').parent().html(),'BdM',true);
 
            //Latest Comments
            if(!isUserpage()) {
                getActivityComments(function(comments) {
                    latestCommentsBox(comments);
                });
            }
 
            //Aktuelles Buch
            if(isUserpage() && !!$('#currentBook').length) {
                    console.log('move to sidebar',$('#currentBook'));
                    createSidebarModule('Ich lese gerade',$('<div />').addClass('book').html($('#currentBook [data-book]').html()),'current-book');
                    $('#currentBook').detach();
            }
 
            //Hauspunkte
            addOnloadHook(function() {
                createSidebarModule('Hauspunkte',$('<div />').addClass('points').append(
                    $('<div />').addClass('bar').append($('<div />').attr('id','Gryffindor')),
                    $('<div />').addClass('bar').append($('<div />').attr('id','Hufflepuff')),
                    $('<div />').addClass('bar').append($('<div />').attr('id','Ravenclaw')),
                    $('<div />').addClass('bar').append($('<div />').attr('id','Slytherin'))
                ),'house-points');
            });
 
            getParties(function() {
                if(typeof users != 'undefined' && !!Object.keys(users).length) {
                    console.log('HERE: users in ',_.pluck(users,'name'),users[0].party);
                    currentParty = users[0].party;
                    date = new Date();
                    date.setDate(1); //Beginning of the month
                    ts = (date.getTime()  / 1000).toFixed();
                    getUserContribs(_.pluck(users,'name'),ts,{party:currentParty},function(contribs,options) {
                        housepoints.set(options.party,Object.keys(contribs).length);
                        $('.house-points .bar #' + options.party)
                            .css('min-height',Object.keys(contribs).length / 5)
                            .text(Object.keys(contribs).length);
                    });
                }
            });
        }
    },
    {
      page: 'MediaWiki:CustomUserGroups.js',
        type: 'scripts',
          callback: function() {
            if($.inArray(wgNamespaceNumber,[2,500,501,3,1200]) != -1) {
                $.get('/wiki/Vorlage:Infobox_Benutzer2?action=raw',function(tmpl) {
                    Mustache.parse(tmpl,['{{','}}']);
                    $('.api-infobox').html(Mustache.render(tmpl,{
                        Benutzername: "Agent Zuri",
                        Geschlecht: "männlich",
                        Benutzergruppen: ['sysop','bureaucrat','codeadmin'],
                        "Registriert seit": '2012-05-13',
                        Bearbeitungen: 22589,
                        FormatDate: function() {
                            return function(date,render) {
                                console.log(date,render(date));
                                return (new Date(render(date))).toLocaleDateString();
                            }
                        }
                    }));
                });

              function userInfobox() {
                if($('.api-infobox').length) {
                  getUserDetail(wgTitle, function(data) {
                    console.log('userinfobox',data.query.users);
 
                    $('.api-infobox .api-username').text(data.query.users[0].name);
                    $('.api-infobox .api-gender').text(data.query.users[0].gender);
                    $('.api-infobox .api-edits').text(new Intl.NumberFormat().format(data.query.users[0].editcount));
                    var regDate = new Date(data.query.users[0].registration);
                    console.log('before',regDate);
                    regDate = regDate.getDay() + '.' + regDate.getMonth() + '.' + regDate.getFullYear();
                    console.log('after',regDate);
                    $('.api-infobox .api-regDate').text(regDate);
                    groups = [];
                    groups.user = 'Benutzer';
                    groups.autoconfirmed = 'Autoconfirmed';
                    groups.emailconfirmed = 'bestätigte E-Mail-Adresse';
                    groups.codeadmin = 'Codeadmin';
                    groups.sysop = 'Admin';
                    groups.bureaucrat = 'Bürokrat';
                    groups.poweruser = 'Poweruser';
                    groups.staff = 'Wikia-Mitarbeiter';
                    groups.module_tester = 'Modultester';
                    $.extend(true,data.query.users[0].groups,wgUserGroups);
                    data.query.users[0].groups.splice(data.query.users[0].groups.indexOf('*'), 1);
                    if(data.query.users[0].groups.length > 1) {
                      $('.api-infobox .api-groups').append($('<ul />'));
                      for(i = 0; i < data.query.users[0].groups.length; i++) {
                        actualGroups = $.inArray(data.query.users[0].groups[i], groups) ? groups[data.query.users[0].groups[i]] : data.query.users[0].groups[i];
                        $('.api-infobox .api-groups ul').append($('<li />').text(actualGroups));
                      }
                    }
                    else {
                      $('.api-infobox .api-groups').text(data.query.users[0].groups[0]);
                    }
                  });
                }
                else {
                  console.warn('UI Element not found: Userinfobox');
                }
              }
              userInfobox();
            }
            else {
              console.warn('Not a userpage');
            }
          }
      },
        /*{
            page: 'MediaWiki:OOJS.js',
            type: 'scripts',
            callback: function() {
                importArticlesCallback([{
                    page: 'MediaWiki:OOJS.js',
                    type: 'scripts',
                    callback: function() {
                        OO.ui.confirm( 'Are you sure?' ).done( function ( confirmed ) {
                            if ( confirmed ) {
                                console.log( 'User clicked "OK"!' );
                            } else {
                                console.log( 'User clicked "Cancel" or closed the dialog.' );
                            }
                        } );
                    }
                }]);
            }
        },*/
      {
          page: 'MediaWiki:API.js',
          type: 'scripts',
          callback: function () {
              addOnloadHook(function() {
                  Wiki.prototype.init = function(callback) {
                      that = this;
                      getWikiData(wgCityId, function(data) {
                          that.stats = data.items[wgCityId].stats;
                          that.wam = data.items[wgCityId].wam_score;
 
                          getUserGroup('sysop', function(data) {
                              that.stats.admins = {
                                  length: that.stats.admins,
                                  users: data.query.allusers
                              }
 
                              callback();
                          });
                      });
                  }
                  wgWiki = new Wiki();
                  wgWiki.init(function() {
                      console.log('insert adminlist',$('.adminlist'),wgWiki.stats.admins.users);
                      $('.adminlist').append($('<ul />'));
                      for(u in wgWiki.stats.admins.users) {
                          $('.adminlist ul').append(
                              $('<li />').append(
                                  $('<a />')
                                      .attr('href','/wiki/Benutzer:' + wgWiki.stats.admins.users[u].name)
                                      .text(wgWiki.stats.admins.users[u].name)
                              )
                          );
                      }
                  });
              });
          }
      }]);
});
 
/*addOnloadHook(function () {
    importArticlesCallback([
        {
            page: 'MediaWiki:Sidebar.js',
            type: 'scripts',
            callback: function() {
                //Add module to sidebar
                createSidebarModule('Über uns','Wir sind das Testwiki','about');//{{MediaWiki:Description}}
                $.getJSON('/api.php?action=query&titles=Benutzer:Agent_Zuri/Aktuelles_Buch&format=json', function(page) {
                    content = page.query.pages[Object.keys(pages.query.pages)[0]].pageid;
                    $.getJSON('/api/v1/Articles/AsSimpleJson?id=5641&format=json', function(content) {
                        book_title = content.sections[0].text;
                        createSidebarModule('Über uns','Das lese ich gerade',book_title);
                    });
                });
            }
        },
        {
            page: 'MediaWiki:Notify.js',
            type: 'scripts',
            callback: function() {
                //Test notify
                notify('Test');
            }
        },
        {
            page: 'MediaWiki:API.js',
            type: 'scripts',
            callback: function () {*/
                /*console.log('Wiki',Wiki);
                function otherWikiSuggestions(callback) {
                    $.getJSON('http://www.wikia.com/api/v1/Wikis/ByString?string=' + encodeURIComponent(Wiki.subject) + '&lang=de&limit=25&batch=1&includeDomain=true').done(callback).error(function (error) {
        console.log('Somethink went wrong',error)
                   });
               }
 
              otherWikiSuggestions(function(data) {
                  console.log(data);
              });*/
            /*}
        }
    ]);*/
    /*importArticleCallback('MediaWiki:Sidebar.js','scripts',function() {
        //Add module to sidebar
        createSidebarModule('Über uns','Wir sind das Testwiki','about');
    });
    importArticleCallback('MediaWiki:Notify.js','scripts',function() {
        //Test notify
        notify('Test');
    });
}); */