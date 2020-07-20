// Project Pandora
var PandoraChat = function PandoraChat(){
    this.isChatWindow = $(document.body).hasClass('ChatWindow');
    this._users = mainRoom.model.users;
    this._chat = mainRoom.model.chats;
    this.users = [];
    this.checkRights = {
        'rollback': /rollback/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'chatmoderator': /chatmoderator/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'threadmoderator': /threadmoderator/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'content-moderator': /content-moderator/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'patroller': /patroller/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'codeeditor': /codeeditor/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'sysop': /sysop/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'bureaucrat': /bureaucrat/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'vstf': /vstf/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'voldev': /voldev/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'helper': /helper/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'staff': /staff/g.test(mw.config.get('wgUserGroups', wgUserGroups).join(', ')),
        'moderator': this.checkRights['chatmoderator'] || this.checkRights['threadmoderator'] || this.checkRights['content-moderator'],
        'admin': this.checkRights['sysop'],
        'administrator': this.checkRights['sysop'],
        'vandal-patrol': this.checkRights['patroller'] && this.checkRights['rollback'],
        'tech-admin': this.checkRights['codeeditor'] && (this.checkRights['sysop'] || this.checkRights['bureaucrat'])
    };
    this.init();
};

PandoraChat.prototype.UI = function(config){
    var $UIElement = null;
    switch (config.type){
        case 'switch':
        case 'switch1':
            $UIElement = $('<div class="PandoraSwitch switch1" id="' + config.id + '"/>');
            var $switch_html = [];
            for (var name in config.options.length){
                var option = config.options[name],
                    $option_html =
                        $('<span class="switch-button switch-option" />')
                        .html([
                            $('<label for="' + option.id + '" class="switch-name switch-label">' + name + '</label>'),
                            $('<input type="checkbox" class="switch-box" name="' + config.name + '" id="' + option.id + '" value="' + config.name + '" />')
                        ]);
                
            }
    }
};

/*
.PandoraSwitch {
  border: 1px solid #343640;
  display: inline-block;
  padding: 2px;
  border-radius: 15px;
}

.PandoraSwitch .switch-button {
  border: 1px solid red;
  border-radius: 100%;
  padding: 4px;
  display: inline-block;
}
*/

/*
$(document).ready(function(){
  var $switch = $('.switch1'),
      options = {
        'Off': {
          id: 'switch-off'
        },
        'On': {
          id: 'switch-on'
        }
      }
  for (var name in options){
    var option = options[name],
        $option_html =
          $('<span class="switch-button switch-option" />')
          .html([
               $('<label for="' + option.id + '" class="switch-name switch-label">' + name + '</label>'),
               $('<input type="radio" class="switch-box" name="switch" id="' + option.id + '" value="' + name + '" />')
          ]);
    $switch.append($option_html);
  }
});
*/