//<source lang="javascript">
$(document).ready(function() {
    if(typeof window.dev === 'undefined' || typeof window.dev.i18n === 'undefined') {
        importArticle({ type: 'script', article: 'MediaWiki:I18n-js/code.js' });
    }
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('QRThis').done(function(i18n) {
            i18n.useUserLang();

          // Detect if wikia uses user talk or message wall
          var nmspc = talkPageOrMessageWall();

          // ends the script if it's not Special:Block
          if (wgCanonicalSpecialPageName !== "Block") {
              return false;
          }
          // Executes the script once
          if ($('#mw-input-wpMessage').length > 0) {
              console.log('Already executed');
              return false;
          }
          $('tbody').append(  
            $('<tr />').addClass('mw-htmlform-field-HTMLCheckField').append(
              $('<td />').addClass('mw-label').append(
                $('<label />').attr('for','mw-input-wpMessage').html('&#160;')
              ),
              $('<td />').addClass('mw-input').append(
                $('<input />').attr({
                  name: 'wpMessage',
                  type: 'checkbox',
                  id: 'mw-input-wpMessage'
                }).val('1').html('&#160;'),
                $('<label />').attr('for','mw-input-wpMessage').text(i18n.msg('button').plain())
              )
            )
          );
          if (!MessageBlock.autocheck) {
              MessageBlock.autocheck = false;
          }
          if (MessageBlock.autocheck == true) {
              $('#mw-input-wpMessage').attr('checked', true);
          }
          $('.mw-htmlform-submit').click(function() {
              if ($('#mw-input-wpMessage').attr('checked')) {
                  if ($('#mw-input-wpExpiry-other').css('display') == 'none') {
                      var duration = $('#mw-input-wpExpiry option:selected').text();
                  } else {
                      var duration = $('#mw-input-wpExpiry-other').val();
                  }
                  if ($('#mw-input-wpReason-other').val()) {
                      var blockmessage = prompt(i18n.msg('blockreason').plain(), $('#mw-input-wpReason option:selected').text() + ":" + $('#mw-input-wpReason-other').val());
                  } else {
                      var blockmessage = prompt(i18n.msg('blockreason').plain(), $('#mw-input-wpReason option:selected').text());
                  }
                  var messages = MessageBlock.message.replace('$2', duration);
                  messages = messages.replace('$1', blockmessage);
                  switch (nmspc) {
                      // User talk
                      case 3:
                          $.post(mw.util.wikiScript('api'), {
                              action: 'edit',
                              title: 'User_talk:' + $('#mw-bi-target').val(),
                              section: 'new',
                              sectiontitle: MessageBlock.title,
                              text: messages,
                              token: mw.user.tokens.values.editToken
                          });
                          break;
                          // Message wall
                      default:
                          $.post(mw.util.wikiScript('wikia'), {
                              controller: 'WallExternal',
                              method: 'postNewMessage',
                              pagenamespace: '1200',
                              pagetitle: $('#mw-bi-target').val(),
                              messagetitle: MessageBlock.title,
                              body: messages,
                              format: 'json'
                          });
                          break;
                  }
                  alert(i18n.msg('success').plain());
              }
          });
       }
    }
});

function talkPageOrMessageWall() {
    message_wall = '.wds-global-navigation__dropdown-link[data-tracking-label="account.message-wall"]'
    talk_page = '.wds-global-navigation__dropdown-link[data-tracking-label="account.talk"]'
    if($(message_wall).exists()) { return 1200; }
    else if($(talk_page).exists()) { return 3; }
    else { return false; }
}
//</source>