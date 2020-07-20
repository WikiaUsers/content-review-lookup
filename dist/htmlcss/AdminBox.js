(function(module, $, mw){
    var admins = [],
        $admin_box = $('<section />').addClass('admin-box admin-section');
    
    function checkSymbol(symbol_1, symbol_2, obj){
        if (symbol_1 == symbol_2)
            admins[admins.length] = obj;
    }
    
    $.get('/index.php?title=MediaWiki:Custom-RightBox&action=raw')
        .done(function(data){
            var users = data.split(/\n/g),
                i = 0;
            for (; i < users.length; i++){
                var user = users[i],
                    symbol = user.slice(0,1);
                checkSymbol(symbol, '+', {
                    user: user,
                    right: 'bureaucrat'
                });
                
                checkSymbol(symbol, '^', {
                    user: user,
                    right: 'admin'
                });
                
                checkSymbol(symbol, '%', {
                    user: user,
                    right: 'chatmoderator'
                });
                
                checkSymbol(symbol, '$', {
                    user: user,
                    right: 'codeeditor'
                });
                
                checkSymbol(symbol, '@', {
                    user: user,
                    right: 'rollbacker'
                });
                
                checkSymbol(symbol, '!', {
                    user: user,
                    right: 'patroller'
                });
            }
        })
        .fail(function(error){
            $.showCustomModal('Error', '<p>Cannot retrieve any data from <code>MediaWiki:Custom-RightBox</code>.</p>', {
                id: 'ErrorModal'
            });
        });
    
    for (var j = 0; j < admins.length; j++){
        
    }
})(this.AdminBox, this.jQuery, this.mediaWiki);