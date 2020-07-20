/**
 * This part of the script is for internal use only
 **/
 
(function(mw, $, mainRoom, fc){
    function FCLibrary(room){ 
        if (typeof room === 'undefined') return;
        mw.hook('dev.wds').add($.proxy(this.createLib, this));
    }
    
    FCLibrary.prototype.createLib = function(wds){
        this.wds = wds;
    };
    
    FCLibrary.prototype.groups = {
        'staff': 'staff',
        'helper': 'helper',
        'vstf': 'vstf',
        'global-discussions-moderator': 'global-discussions-moderator',
        'vanguard': 'vanguard',
        'councilor': 'councilor',
        'bureaucrat': 'bureaucrat',
        'sysop': 'sysop',
        'chatmoderator': 'chatmoderator',
        'content-moderator': 'content-moderator',
        'discussions-moderator': 'discussions-moderator',
        'rollback': 'rollback',
        'bot': 'bot',
        'admin': ['staff', 'helper', 'vstf', 'bureaucrat', 'sysop'],
        'mod': ['staff', 'helper', 'vstf', 'global-discussions-moderator', 'bureaucrat', 'sysop', 'chatmoderator', 'discussions-moderator']
    };
    
    FCLibrary.prototype.badgeGroups = {
        'staff': 'staff',
        'helper': 'helper',
        'vstf': 'vstf',
        'global-discussions-moderator': 'global-discussions-moderator',
        'sysop': 'admin',
        'discussion-moderator': 'discussion-moderator',
        'discussions-moderator': 'discussion-moderator',
        'chatmoderator': 'discussion-moderator',
        'content-moderator': 'content-moderator'
    };
    
    FCLibrary.prototype.getUserData = function(user){
        var item = mainRoom.model.users.findByName(user),
            attributes = item.attributes;
        if (!(item === null || typeof item === 'undefined')){
            var obj = {
                since: attributes.since,
                name: attributes.name,
                active: attributes.active,
                avatar: attributes.avatarSrc,
                editcount: attributes.editcount,
                groups: attributes.groups,
                isMod: this.isMember(user, 'mod'),
                isAdmin: this.isMember(user, 'admin'),
                isBot: this.isMember(user, 'bot'),
                isStaff: this.isMember(user, 'staff'),
                statusMessage: attributes.statusMessage,
                statusState: attributes.statusState,
                cid: item.cid
            };
            return obj;
        } else return null;
    };
    
    FCLibrary.prototype.getBadge = function(user){
        var userData = this.getUserData(user),
            badgeObj = this.badgeGroups,
            badgeGroups = Object.keys(badgeObj),
            groups = userData.groups.filter(function(group){
                return badgeGroups.indexOf(group) > -1;
            }).sort(function(a, b){
                if (badgeGroups.indexOf(a) < badgeGroups.indexOf(b)) return -1;
                else if (badgeGroups.indexOf(a) > badgeGroups.indexOf(b)) return 1;
                return 0;
            }), index = 0, badge = null;
        while ((group = groups[index])){
            if (this.isMember(user, group)){
                badge = this.wds.badge(badgeObj[group], { 'class': 'badge-' + group });
                break;
            }
            index++;
        }
        return badge;
    };
    
    FCLibrary.prototype.roundTo = function(n, d){
        var fixed = parseFloat(n).toFixed(d);
        return Number(fixed);
    };
    
    FCLibrary.prototype.condenseNumber = function(n){
        var divisor, name, number;
        if (Math.abs(n) < Math.pow(10, 3)){
            return String(n);
        } else if (Math.abs(n) >= Math.pow(10, 3) && Math.abs(n) < Math.pow(10, 6)){
            divisor = Math.pow(10, 3);
            name = 'K';
        } else if (Math.abs(n) >= Math.pow(10, 6) && Math.abs(n) < Math.pow(10, 9)){
            divisor = Math.pow(10, 6);
            name = 'M';
        } else if (Math.abs(n) >= Math.pow(10, 9) && Math.abs(n) < Math.pow(10, 12)){
            divisor = Math.pow(10, 9);
            name = 'B';
        } else if (Math.abs(n) >= Math.pow(10, 12) && Math.abs(n) < Math.pow(10, 15)){
            divisor = Math.pow(10, 12);
            name = 'T';
        } else if (Math.abs(n) >= Math.pow(10, 15)){
            divisor = Math.pow(10, 15);
            name = 'Q';
        }
        number = this.roundTo(n / divisor, 1);
        return String(number) + name;
    };
    
    ['checkGroup', 'isMember'].forEach(function(fn){
        FCLibrary.prototype[fn] = function(user, group){
            var userData = this.getUserData(user),
                groupList = this.groups,
                userGroups = userData.groups,
                selectedGroup, inGroup = null;
            if (groupList.hasOwnProperty(group)){
                selectedGroup = groupList[group];
                if (typeof selectedGroup === 'string'){
                    if (userGroups.indexOf(selectedGroup) > -1){
                        inGroup = true;
                    } else {
                        inGroup = false;
                    }
                } else if (Array.isArray(selectedGroup)){
                    inGroup = userGroups.some(function(g){
                        return selectedGroup.indexOf(g) > -1;
                    });
                }
            }
            return inGroup;
        };
    });
    
    $(document).ready(function(){
        var factory = new FCLibrary(mainRoom);
        window.FandomizedChat = $.extend(FandomizedChat, factory);
    });
}(mediaWiki, jQuery, mainRoom, window.FandomizedChat));