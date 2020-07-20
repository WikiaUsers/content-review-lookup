var ChatActions = {
    'PM': function(){
        var users = mainRoom.model.users.map(function(child){
                return child.attributes.name;
            }),
            userPanel = new GlobalModule({
                title: 'Private Message',
                data: users.sort(),
                type: 'userlist'
            });
    }
};