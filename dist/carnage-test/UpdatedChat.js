window.UpdatedChat = window.UpdatedChat || {
    init: function init(){
        importArticles({
            type: 'script',
            articles: ['User:' + wgUserName + '/UpdatedChat.js']
        }, {
            type: 'style',
            articles: ['User:' + wgUserName + '/UpdatedChat.css']
        });
        this.loaded = false;
        this.users = this.getUserList();
        this.inGroup = {
            'rollback': this.checkGroup('rollback'),
            'chatmoderator': this.checkGroup('chatmoderator'),
            'admin': this.checkGroup('sysop'),
            'bureaucrat': this.checkGroup('bureaucrat'),
            'vstf': this.checkGroup('vstf'),
            'helper': this.checkGroup('helper'),
            'staff': this.checkGroup('staff'),
            // Other actions
            'cankick': this.checkGroup('chatmoderator sysop bureaucrat vstf helper staff'),
            'canban': this.inGroup['cankick'],
            'canpromote': this.checkGroup('sysop bureaucrat vstf helper staff'),
            'canblock': this.inGroup['canpromote'],
            'canphalanx': this.checkGroup('vstf helper staff')
        };
        this.create();
    },
    get create(){
        return function create(){
        
        };
    },
    get getUserList(){
        return function getUserList(){
            
        };
    }
};