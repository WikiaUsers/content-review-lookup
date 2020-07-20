//ChatButtonsCollectionDeluxe.js
//Using scripts by Ozuzanna and Count of Howard
//22-11-16

;(function($, mw) {
  if (mw.config.get("wgCanonicalSpecialPageName") !== "Chat") {
    return;
  }
 
  var mwVariables = mw.config.get([
    'wgSiteName',
    'wgServer',
    'wgArticlePath',
    'wgUserLanguage'
  ]);
 
  var lang = mwVariables.wgUserLanguage;
  var i18n = {
    "en": { //English
      titleUP: 'User Page',
      PAC: 'Prevent account creation',
      talkPage : 'Prevent this user from editing their own talk page while blocked',
      headerExpires: 'Expires',
      headerReason: 'Reason',
      blockReason: 'Abusing multiple accounts',
      blockExpiry: 'infinite',
      blockPrompt: 'Block this user',
      blockCancel: 'Cancel',
      blockSuccess: ' has been blocked!',
      blockFail: 'Failed to block user: ',
      blockFailInline: 'Failed to block user: unknownerror',
      block: 'Block',
      from: 'from',
      promptGiving: 'Giving',
      promptCMR: 'Chat Moderator Rights',
      promptSure1: 'Are you sure you want to make',
      promptSure2: 'a Chat Moderator?',
      promptCancel: 'Cancel',
      promptPromote: 'Promote this user'
    },
    "be": { //Беларуская
      titleUP: 'Старонка ўдзельніка',
      PAC: 'Прадухіліць стварэнне ўліковага запісу',
      talkPage : 'Прадухіліць магчымасць рэдагавання сваёй старонкі абмеркавання на час блакавання',
      headerExpires: 'Мінае',
      headerReason: 'Прычына',
      blockReason: 'Злоўжыванне некалькімі ўліковымі запісамі',
      blockExpiry: 'бестэрмінова',
      blockPrompt: 'Заблакаваць гэтага ўдзельніка',
      blockCancel: 'Адмена',
      blockSuccess: ' быў заблакаваны!',
      blockFail: 'Не ўдалося заблакаваць ўдзельніка: ',
      blockFailInline: 'Не ўдалося заблакаваць ўдзельніка: невядомая памылка',
      block: 'Блакаванне',
      from: 'дзеля',
      promptGiving: 'Выдаць',
      promptCMR: 'правы мадэратара чата',
      promptSure1: 'Вы ўпэўненыя, што хочаце выдаць правы',
      promptSure2: 'мадэратара чата?',
      promptCancel: 'Адмена',
      promptPromote: 'Павысіць ўдзельніка'
    },
    "ru": { //Русский
      titleUP: 'Страница участника',
      PAC: 'Предотвратить создание учётной записи',
      talkPage : 'Предотвратить возможность редактирования своей страницы обсуждения на время блокировки',
      headerExpires: 'Истекает',
      headerReason: 'Причина',
      blockReason: 'Злоупотребление несколькими учетными записями',
      blockExpiry: 'бессрочно',
      blockPrompt: 'Заблокировать этого участника',
      blockCancel: 'Отмена',
      blockSuccess: ' был заблокирован!',
      blockFail: 'Не удалось заблокировать участника: ',
      blockFailInline: 'Не удалось заблокировать участника: неизвестная ошибка',
      block: 'Блокировка',
      from: 'для',
      promptGiving: 'Выдать',
      promptCMR: 'права модератора чата',
      promptSure1: 'Вы уверены, что хотите выдать права',
      promptSure2: 'модератора чата?',
      promptCancel: 'Отмена',
      promptPromote: 'Повысить участника'
    },
    "uk": { //Українська
      titleUP: 'Сторінка користувача',
      PAC: 'Запобігти створення облікового запису',
      talkPage : 'Запобігти можливості редагування своєї сторінки обговорення на час блокування',
      headerExpires: 'Закінчується',
      headerReason: 'Причина',
      blockReason: 'Зловживання декількома обліковими записами',
      blockExpiry: 'безстроково',
      blockPrompt: 'Заблокувати цього користувача',
      blockCancel: 'Скасування',
      blockSuccess: ' був заблокований!',
      blockFail: 'Не вдалося заблокувати користувача: ',
      blockFailInline: 'Не вдалося заблокувати користувача: невідома помилка',
      block: 'Блокування',
      from: 'для',
      promptGiving: 'Видати',
      promptCMR: 'права модератора чату',
      promptSure1: 'Ви впевнені, що хочете видати права',
      promptSure2: 'модератора чату?',
      promptCancel: 'Скасування',
      promptPromote: 'Підвищити користувача'
    }
  }
  var textContent = i18n.hasOwnProperty(lang) ? i18n[lang] : i18n.en;
 
  var FormHTML = '\
    <form method="" name="" class="WikiaForm "> \
      <fieldset> \
        <p>' + textContent.headerExpires + ' \
        <br/> \
          <input type="text" id="block-expiry"/> \
        </p> \
        <br/> \
        <p>' + textContent.headerReason + '\
        <br/> \
          <input type="text" id="block-reason"/> \
        </p> \
        <br/> \
        <label for="block-nocreate"><input type="checkbox" id="block-nocreate" checked="checked"/>' + textContent.PAC + '</label> \
      <br/> \
        <label for="block-rstrtp"><input type="checkbox" id="block-restrtp" checked="checked"/>' + textContent.talkPage + '</label> \
      </fieldset> \
    </form>',
  blockReason = window.chatBlockReason || textContent.blockReason,
  blockExpiry = window.chatBlockExpiry || textContent.blockExpiry;
 
  $.each(['show', 'hide'], function (i, ev) {
    var el = $.fn[ev];
    $.fn[ev] = function () {
      this.trigger(ev);
      el.apply(this, arguments);
      return el;
    };
  });
 
  $.attrHooks.viewbox = {
    set: function(elem, value, name) {
      elem.setAttributeNS(null, 'viewBox', value + '');
      return value;
    }
  };
 
  $('#UserStatsMenu').on('show', function() {
    var username = $("#UserStatsMenu .info ul").children(".username").text().replace(/ /g,"_");
    var address = mwVariables.wgServer + mwVariables.wgArticlePath.replace( "$1", "User:" + username);
    var userPageButton = $('.contribs').clone().addClass('userpage').removeClass('contribs');
    $(userPageButton).prependTo('.regular-actions');
    $('.userpage').wrap("<a href=" + address + " target='_blank' style='text-decoration:none;'></a>");
    $(".userpage a").attr("target", "_blank");
    $(".userpage a").attr("href", address);
    $(".userpage svg").attr("viewBox", "0 0 24 18");
    $('.userpage path').attr("d", "M12 14c3.309 0 6-2.691 6-6V6c0-3.309-2.691-6-6-6S6 2.691 6 6v2c0 3.309 2.691 6 6 6zm5 2H7c-3.86 0-7 3.14-7 7a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1c0-3.86-3.14-7-7-7z");
    $('.userpage .label').text(textContent.titleUP);
  });
 
  $('#WikiChatList li').click(function() {
    $('.UserStatsMenu').on('DOMNodeInserted', function () {
      if (!$('.block-custom').length && $('.give-chat-mod').length) {
        mw.util.addCSS('.UserStatsMenu .actions ul li.block-custom .icon { background-position: -614px 0px}');
        var blockButton = $('.kick').clone().addClass('block-custom').removeClass('kick');
 
        $(this).children('.actions').children('.admin-actions').append(
          blockButton
        );
        $('.block-custom .label').text('Block');
 
        $('.block-custom').click(function() {
          var name = $(this).parents().eq(2).children('.info').children('ul').children('.username').text();
          $(this).remove();
              function inlineAlert(msg) {
              mainRoom.model.chats.add(new models.InlineAlert({text:msg}));
              $('[name="message"]').val('').removeAttr('disabled').focus();
          }  
 
          $.showCustomModal(textContent.block + " " + name + " " + textContent.from + " " + mwVariables.wgSiteName, FormHTML, {
            id: 'chat-admin-block',
            width: 400,
            buttons: [{
              message: textContent.blockCancel,
              handler: function () {
                $('#chat-admin-block').closeModal();
              }
              }, {
                message: textContent.blockPrompt,
                defaultButton: true,
                handler: function() {
                  var block = {
                  action: 'block',
                  user: name,
                  expiry: document.getElementById('block-expiry').value || $('#block-expiry').attr('placeholder'),
                  reason: document.getElementById('block-reason').value || $('#block-reason').attr('placeholder'),
                  nocreate: '',
                  allowusertalk: '',
                  autoblock: 0,
                  format: 'json',
                  token: mw.user.tokens.values.editToken
                };

                if (!document.getElementById('block-nocreate').checked)
                  delete block.nocreate;

                if (document.getElementById('block-restrtp').checked)
                  delete block.allowusertalk;

                $.ajax({
                  url: mw.util.wikiScript('api'),
                  type: "POST",
                  dataType: "JSON",
                  data: block,
                  success: function(d) {
                    if (!d.error) {
                      inlineAlert(name+textContent.blockSuccess);
                      mainRoom.kick({
                        name: name
                      });
                    } else {
                      inlineAlert(textContent.blockFail + d.error.code);
                    }
                  },
                  error: function() {
                    inlineAlert(textContent.blockFailInline);
                  }
                });
                $('#chat-admin-block').closeModal();
              }
            }]
          });
          $('#block-expiry').attr('placeholder', blockExpiry);
          $('#block-reason').attr('placeholder', blockReason);
        });
      }
    });
    $('.UserStatsMenu').on('DOMNodeInserted', function () {
      if ($('.give-chat-mod').length) {
        mw.util.addCSS('.UserStatsMenu .actions ul li.give-chat-mod-custom .icon { background-position: -304px 0px}');
        $('.give-chat-mod').addClass('give-chat-mod-custom').removeClass('give-chat-mod');
  
        $(".give-chat-mod-custom").click(function() {
          var name = $(this).parents().eq(2).children('.info').children('ul').children('.username').text();
          $(this).remove();
          $.showCustomModal(textContent.promptGiving + ' ' + name + ' ' + textContent.promptCMR, '<p>' + textContent.promptSure1 + ' ' + name + ' ' + textContent.promptSure2 + '</p>', {
            id: 'give-chat-mod-prompt',
            width: 400,
            buttons: [{
              message: textContent.promptCancel,
              handler: function () {
              $('#give-chat-mod-prompt').closeModal();
              }
            }, {
              message: textContent.promptPromote,
              defaultButton: true,
              handler: function() {
                mainRoom.giveChatMod({
                  name: name
                });
                $('#give-chat-mod-prompt').closeModal();
              }
            }]
          });
        });
      }
    });
  });
})(this.jQuery, this.mediaWiki);