//ChatButtonsCollection.js
//Ozank Cx and Count of Howard
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
      from: 'from'
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
      from: 'дзеля'
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
      from: 'для'
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
      from: 'для'
    },
    "pt": { //Portuguese
      titleUP: 'Perfil do Utilizador',
      PAC: 'Impedir criação de contas de utilizador',
      talkPage : 'Prevenir que este utilizador publique no seu próprio Mural de Mensagens enquanto estiver bloqueado',
      headerExpires: 'Expiração',
      headerReason: 'Motivo',
      blockReason: 'Uso abusivo de contas múltiplas',
      blockExpiry: 'infinite',
      blockPrompt: 'Bloquear este utilizador',
      blockCancel: 'Cancelar',
      blockSuccess: 'foi bloqueado com sucesso!',
      blockFail: 'Falha ao bloquear utilizador: ',
      blockFailInline: 'Falha ao bloquear utilizador: erro desconhecido',
      block: 'Bloquear',
      from: 'de'
    },
    "pt-br": { //Brazilian Portuguese
      titleUP: 'Perfil do Usuário',
      PAC: 'Prevenir criação de conta de usuário',
      talkPage : 'Impedir que este usuário publique no seu próprio Mural de Mensagens enquanto estiver bloqueado',
      headerExpires: 'Expiração',
      headerReason: 'Motivo',
      blockReason: 'Uso abusivo de contas múltiplas',
      blockExpiry: 'infinite',
      blockPrompt: 'Bloquear este usuário',
      blockCancel: 'Cancelar',
      blockSuccess: 'foi bloqueado com sucesso!',
      blockFail: 'Falha ao bloquear usuário: ',
      blockFailInline: 'Falha ao bloquear usuário: erro desconhecido',
      block: 'Bloquear',
      from: 'da'
    },
    "es": { //Spanish
      titleUP: 'Página de usuario',
      PAC: 'Prevenir la creación de cuentas',
      talkPage : 'Impedir a este usuario dejar mensajes en su propio Muro de Mensajes mientras está bloqueado',
      headerExpires: 'Expira',
      headerReason: 'Razón',
      blockReason: 'Abusar de multiples cuentas',
      blockExpiry: 'Infinito',
      blockPrompt: 'Bloquear a este usuario',
      blockCancel: 'Cancelar',
      blockSuccess: ' ha sido bloqueado!',
      blockFail: 'Fallo al bloquear al usuario: ',
      blockFailInline: 'Fallo al bloquear al usuario: error desconocido',
      block: 'Bloquear',
      from: 'de'
    }
  };
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
  });
  $('#UserStatsMenu').on('show', function() {
    $('.give-chat-mod').remove();
  });
})(this.jQuery, this.mediaWiki);