function User(identifier) {
    console.log(identifier);
    this.id = identifier ? (isNaN(identifier) ? 0 : identifier) : 0;
    this.name = identifier ? (isNaN(identifier) ? identifier : '') : mw.config.get('wgUserName');
    this.groups = identifier ? (isNaN(identifier) ? mw.config.get('wgUserGroups') : ['none']) : ['none'];
    var that = this;

    if(!identifier) {
        console.log('getting id from username');
        getUserId(mw.config.get('wgUserName'), function(data) {
            if(data.query.allusers[0].name == mw.config.get('wgUserName')) {
                that.id = data.query.allusers[0].id;
                that.setID(that.id);
                console.log('ID is', that.id,data.query.allusers[0].id);
                getUserDetail(data.query.allusers[0].name, function(detail) {
                    that.editcount = new Intl.NumberFormat().format(detail.query.users[0].editcount);
                });
            }
            else {
                console.log('User not found' ,data.query.allusers[0].name, 'is not', mw.config.get('wgUserName'));
            }
        });
    }
    else if(identifier && isNaN(that.identifier)) {
        console.log('getting id');
        console.log(typeof identifier, ':', identifier);
        getUserId(identifier, function(data) {
            if(data.query.allusers[0].name == identifier) {
                console.log('that3', that);
                that.id = data.query.allusers[0].id;
                that.setID(that.id);
                console.log('ID is', that.id,data.query.allusers[0].id);
                getUserDetail(data.query.allusers[0].name, function(detail) {
                    that.editcount = new Intl.NumberFormat().format(detail.query.users[0].editcount);
                });
            }
            else {
                console.log('User not found', data.query.allusers[0].name, 'is not', that.identifier);
            }
        });
    }
    else {
        console.log('Not possible', identifier);
    }
}
User.prototype = {
    setID: function(id) {
        console.log(this,id);
        this.id = id;
        console.log(this.id);
    }
}

/*var Zuri = new User();
console.log(Zuri);

var other = new User('Harry granger');
console.log(other);

var different = new User(7);
console.log(different);*/

/* var User = {
    id: 0,
    name: wgUserName,
    groups: wgUserGroups
}; */

function getUserGroup(group, callback) {
    $.getJSON('/api.php?action=query&list=allusers&format=json&augroup=' + group).done(callback).error(apiError);
}

function getUserId(name,callback) {
    $.getJSON('/api.php?action=query&list=allusers&aufrom=' + encodeURIComponent(name) + '&format=json').done(callback).error(apiError).always(function(response) {
        return response;
    });
}

function getUserName(id, callback) {
    $.getJSON('/api/v1/User/Details?ids=' + id).done(callback).error(apiError).always(function(response) {
        return response;
    });
}

function apiError(error) {
    console.log('Somethink went wrong', error);
}

/*var username = 'Harry granger';
getUserId(username, function(data) {
    if(data.query.allusers[0].name == username) {
        console.log('id',data.query.allusers[0].id);
    }
});*/

function getUserDetail(name, callback) {
    $.get('/api.php?action=query&list=users&ususers=' + name + '&usprop=blockinfo%7Cgroups%7Ceditcount%7Cregistration%7Cgender&format=json').done(callback);
}

/*getUserDetail(username, function(data) {
    console.log('id',data.query.users);
});*/

/** Username replace function
 * Inserts user name into 
 * By Splarka
 */
/* Replaces {{BENUTZERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $("span.insertusername").text(mw.config.get('wgUserName'));
}
substUsername = UserNameReplace;
addOnloadHook(UserNameReplace);
 
/* End of the {{BENUTZERNAME}} replacement */


/* Replaces {{EDITCOUNT}} with the name of the user browsing the page.
   Requires copying Template:EDITCOUNT. */

function editCountReplace() {
    if (typeof (disableeditCountReplace) != 'undefined' && disableeditCountReplace || mw.config.get('wgUserName') === null) return;
    $("span.inserteditcount").html(User.editcount);
}
$(document).ready(editCountReplace);

/* End of the {{EDITCOUNT}} replacement */