/**
 * This is a proprietary chat 
 * JavaScript page used for
 * testing purposes in KH:3DDDD
 * Wiki. Please do not copy the
 * code from this page without
 * an administrator's consent.
 * 
 * - Ultimate Dark Carnage
 **/

var _usersByCid = Object.keys(mainRoom.model.users._byCid),
    _users = [],
    i = 0;
    
for (; i < _usersByCid.length; i++){
    var _cidObj = mainRoom.model.users._byCid;
    _users[_users.length] = _cidObj[_usersByCid[i]].attributes.name;
}

$(document).ready(function(event){
    var user_list = _users.sort(),
        $user_list_elem = $('<div><section><header /><ul /></section></div>');
    for (var j = 0; j < user_list.length; j++){
        var $item = $('<li><label /><input /></li>');
        $item.find('> label').attr({
            'for': 'user-' + user_list.split(/\s+/g).join('_'),
            'class': 'dynamic-list-item option'
        }).html($('<img /><span />'));
    }
});