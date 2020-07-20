(function($, mw, mainRoom, statuses){
    var chatStatus = {
        statuses: $.extend({}, statuses),
        users: {},
        self: mw.config.get('wgUserName')
    };
    
    chatStatus.sendStatus = function(status, exp){
        var statusCmd = new models.SetStatusCommand({
            statusMessage: '@cws',
            statusState: status
        });
        mainRoom.socket.send(statusCmd.xport());
    };
    
    chatStatus.updateStatus = function(user, status){
        var statusTxt = chatStatus.getStatusTxt(status),
            $elem = chatStatus.getStatusElem(user);
        chatStatus.users[user] = status;
        if (statusTxt && typeof statusTxt === 'string'){
            $elem.text(statusTxt).show();
        } else {
            $elem.hide().text('');
            delete chatStatus.users[user];
        }
    };
    
    chatStatus.getStatusElem = function(user){ 
        var $parent = (chatStatus.self === user) ? $('#ChatHeader .User') :
            mainRoom.model.users.findByName(user).view.el;
        return $($parent).find('.status');
    };
    
    chatStatus.getStatusTxt = function(status){
        var statusTxt = chatStatus.statuses.hasOwnProperty(status) ? chatStatus.statuses[status] : null;
        return statusTxt;
    };
    
    chatStatus.refreshStatus = function(){
        if (chatStatus.users.hasOwnProperty(chatStatus.self)){
            chatStatus.sendStatus(chatStatus.users[chatStatus.self]);
        }
    };
    
    chatStatus.init = function(){
        mainRoom.socket.on('updateUser', function(msg){
            var data = JSON.parse(msg.data), status = data.attrs.statusState,
                user = data.attrs.name, statusMsg = data.attrs.statusMessage;
            if (statusMsg === '@cws'){
                if (typeof status === 'string'){
                    chatStatus.updateStatus(user, status.toLowerCase());
                } else {
                    chatStatus.refreshStatus();
                }
            }
        });
        
        mainRoom.socket.on('part', function(msg){
            var data = JSON.parse(msg.data), user = data.attrs.name;
            delete chatStatus.users[user];
        });
        
        $('<a>', { 'class': 'status-trigger', 'id': 'status-trigger', 'title': 'Show Custom Status' })
            .on('click', function(){
                var status = chatStatus.statuses, statusCode, i = 0, list = [];
                for (statusCode in status){
                    if (typeof status[statusCode] === 'string'){
                        list[list.length] = $('<li>', { 'class': 'cws-status-item', 'data-status': statusCode })
                            .html([
                                $('<input>', { 'class': 'cws-status-select', 'type': 'radio', 'id': 'cws-status-select-' + i, 'name': 'status-trigger' }),
                                $('<label>', { 'class': 'cws-status-text', 'for': 'cws-status-select-' + i }).text(mw.html.escape(status[statusCode]))
                            ]);
                        i++;
                    }
                }
                
                var modal = new ModalWindow({
                    title: 'Select Your Status',
                    id: 'status-modal',
                    content: $('<nav>'),
                    buttons: []
                });
                
                modal.open();
            })
            .appendTo('');
    };
}(jQuery, mediaWiki, mainRoom, $.extend({}, window.statuses)));