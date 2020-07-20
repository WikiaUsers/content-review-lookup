/*
 * Name: DiscordChat
 * Author: DuckeyD
 */

/* global mw, $ */
window.DiscordChat = {
  ready: false,
  messages: {},
  data: null,
  init: function () {
    window.DiscordChat.ready = true;
    var mwconfig = mw.config.get(['wgUserLanguage']);
    var api = new mw.Api();
    api.get({
      action: 'query',
      meta: 'allmessages',
      ammessages: ['chat-live2', 'chat-join-the-chat', 'awc-metrics-close', 'chat-entry-point-guidelines', 'Custom-DiscordChat-id'].join('|'),
      amlang: mwconfig.wgUserLanguage
    }).done(function (data) {
      if (data.error) {
        return;
      }

      data.query.allmessages.forEach(function (message) {
        if (message['*']) {
          window.DiscordChat.messages[message.name] = _.escape(message['*']);
        }
      });
      
      if (window.DiscordChat.messages['chat-entry-point-guidelines']) {
        api.get({
          action: 'parse',
          text: '{{int:chat-entry-point-guidelines}}',
          prop: 'text'
        }).done(function(data) {
          mw.hook('DiscordChat.added').add(function() {
            $('<div>', {'class': 'more'}).html(data.parse.text['*']).appendTo('.DiscordChat');
          });
        });
      }

      $.get('https://discord.com/api/guilds/' + window.DiscordChat.messages['Custom-DiscordChat-id'] + '/widget.json', function (data) {
        window.DiscordChat.data = data;
        if ($('#WikiaRail').length) {
          if ($('#WikiaRail').hasClass('loaded')) {
            window.DiscordChat.rail();
          } else {
            $('#WikiaRail').on('afterLoad.rail', window.DiscordChat.rail);
          }
        }
      });
    });
  },
  rail: function () {
    var i = 0;
    var appendedAvatars = 0;
    var avatarContainer = $('<div class="wds-avatar-stack"></div>');
    var members = window.DiscordChat.data.members;
    window.DiscordChat.shuffle(members);

    while (appendedAvatars < 5 && i < members.length) {
      if (!members[i].bot) {
        avatarContainer.append('<a href="#showDiscordUser" data-discorduser="' + encodeURI(_.escape(members[i].username + '#' + members[i].discriminator)) + '" class="wds-avatar chatter"><img class="wds-avatar__image" src="' + members[i].avatar_url + '"></a>');
        appendedAvatars++;
      }
      i++;
    }

    var element = $('<section class="chat-module rail-module DiscordChat">' +
                      '<h2 class="has-icon">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" class="discord-svg" width="20" height="20" viewBox="0 0 240 245"><path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/><path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"/></svg>' +
                        window.DiscordChat.messages['chat-live2'] + ' – Discord' +
                      '</h2>' +
                      '<div class="chat-details">' +
                        '<div class="avatars">' +
                          avatarContainer.prop('outerHTML') +
                          ((members.length - appendedAvatars) > 0 ? ('<a href="' + '#showDiscordUsers' + '" style="font-weight: bold; margin-left: 6px; text-decoration: none;">+' + (members.length - appendedAvatars) + '</a>') : '') +
                        '</div>' +
                        '<a href="' + window.DiscordChat.data.instant_invite + '" class="wds-is-secondary wds-button wds-is-squished">' + window.DiscordChat.messages['chat-join-the-chat'] + '</a>' +
                      '</div>' +
                    '</section>');
    $ads = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last(),
    $jsrt = $('.content-review-module');
    if ($ads.exists()) {
        $ads.after(element);
    } else if ($jsrt.exists()) {
        $jsrt.after(element);
    } else {
        $('#WikiaRail').prepend(element);
    }
    $('.chat-module:not(.DiscordChat)').css('display', 'none');
    
    /* fix wikia bug where avatars overlap edit menu */
    mw.util.addCSS('#WikiaRail .DiscordChat .wds-avatar-stack { z-index: 0; }');

    $('a[href="#showDiscordUser"][data-discorduser]').click(function (event) {
      event.preventDefault();
      window.DiscordChat.showDiscordUser(decodeURI($(this).attr('data-discorduser')));
    });

    $('a[href="#showDiscordUsers"]').click(function (event) {
      event.preventDefault();
      window.DiscordChat.showDiscordUsers();
    });

    mw.hook('DiscordChat.added').fire(element);
  },
  showDiscordUsers: function () {
    var usersContent = '<ul style="list-style: initial; font-size: 14px;">';
    var members = window.DiscordChat.data.members;
    for (var i = 0; i < members.length; i++) {
      usersContent += '<li><span style="-moz-user-select: none; user-select: none; cursor: pointer;" onclick="window.DiscordChat.showDiscordUser(\'' + _.escape(members[i].username + '#' + members[i].discriminator) + '\');"><img style="width: 0.75em; height: 0.75em;" src="' + members[i].avatar_url + '"> ' + _.escape(members[i].nick || members[i].username) + '</span></li>';
    }
    usersContent += '</ul>';
    require(['wikia.ui.factory'], function (ui) {
      ui.init(['modal']).then(function (uimodal) {
        var modalconfig = {
          type: 'default',
          vars: {
            id: 'show-discord-users',
            size: 'small',
            title: _.escape(window.DiscordChat.data.name) + ' – ' + window.DiscordChat.data.members.length,
            content: usersContent,
            buttons: [{
              vars: {
                value: window.DiscordChat.messages['awc-metrics-close'],
                data: [{
                  key: 'event',
                  value: 'close'
                }]
              }
            }, {
              type: 'link',
              vars: {
                value: window.DiscordChat.messages['chat-join-the-chat'],
                href: window.DiscordChat.data.instant_invite,
                title: ''
              }
            }]
          }
        };

        uimodal.createComponent(modalconfig, function (modal) {
          modal.show();
        });
      });
    });
  },
  showDiscordUser: function (tag) {
    var members = window.DiscordChat.data.members;
    var mi = null;
    for (var i = 0; i < members.length; i++) {
      if (members[i].username + '#' + members[i].discriminator === tag) {
        mi = i;
        break;
      }
    }
    require(['wikia.ui.factory'], function (ui) {
      ui.init(['modal']).then(function (uimodal) {
        var modalconfig = {
          type: 'default',
          vars: {
            id: 'show-discord-user',
            size: 'small',
            title: _.escape(members[mi].nick || members[mi].username) + (members[mi].bot ? '&nbsp;[BOT]' : ''),
            content: '<center><div style="position: relative; width: 128px; height: 128px;"><img width="128" height="128" style="border-radius: 50%;" src="' + members[mi].avatar_url + '"><div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; right: 0; bottom: 0; background-color: ' + (members[mi].status === 'online' ? 'lawngreen' : (members[mi].status === 'idle' ? 'gold' : 'firebrick')) + ';"></div></div><br>' + _.escape(tag) + '</center>',
            buttons: [{
              vars: {
                value: window.DiscordChat.messages['awc-metrics-close'],
                data: [{
                  key: 'event',
                  value: 'close'
                }]
              }
            }]
          }
        };

        uimodal.createComponent(modalconfig, function (modal) {
          modal.show();
        });
      });
    });
  },
  shuffle: function (a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
  }
};

mw.loader.using('mediawiki.api', function () {
  $(function () {
    if (window.DiscordChat && !window.DiscordChat.ready) {
      window.DiscordChat.init();
    }
  });
});