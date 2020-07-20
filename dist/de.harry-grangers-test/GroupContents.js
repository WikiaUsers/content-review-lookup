function inObject(object,value) {
    for(key in object) {
        if(object[key] == value) {
            return true;
        }
    }
}

function transmap(input,store,map) {
    var where = [];
    for(i in input) {
        if($.inArray(map[input[i]], store) != -1) {
            where.push(map[input[i]]);
        }
    }
    return where;
}

function highestGroup(groupCollection) {
    if($.inArray('sysop',groups)) {
        return 'sysop';
    }
    else if($.inArray('user',groups)) {
        return 'user';
    }
    else if($.inArray('*',groups)) {
        return '*';
    }
    else {
        return false;
    }
}

function toggleBooleanCondition(condition1,condition2,bool) {
    if((condition1 == condition2) == bool) {
        return true;
    }
    else {
        return false;
    }
}

function noEmptyValues(arr1,arr2) {
  if(!arguments[2]) {
    result = $.grep(arr1, function(element) {
      return $.inArray(element, arr2 ) !== -1;
    });
    return result;
  }
  else if(arguments[2] == true) {
    return arr2.filter(function(obj) { return arr1.indexOf(obj) == -1; });
  }
  else {
    return false;
  }
}

if($('.user-group-display-contents').length && $('.user-group-display-contents div[data-group]').length) {
    $.getScript('http://underscorejs.org/underscore.js', function() {
        console.warn('Group contents module load');
        groups = {
            'admin': 'sysop',
            'benutzer' : 'user',
            'visitors': '*'
        }
        modes = {
            'me': 'self',
            'others': '!self'
        }
        container = [];
        $('.user-group-display-contents div[data-group]').each(function(key,val) {
            container.push($(val).data('group').toLowerCase()); 
        });
        console.dir(Object.keys(groups));
        if(groups[$('.user-group-display-contents div').data('group').toLowerCase()] != undefined) {
            affectedGroups = transmap(container,wgUserGroups,groups);
            affectedGroup = highestGroup(affectedGroups);
            $('.user-group-display-contents').find('div[data-group="' + affectedGroup +'"]').show();
            excludeGroups = noEmptyValues(Object.keys(_.invert(groups)),_.reject(wgUserGroups, function(group){ return group == affectedGroup; }));
            for(group in excludeGroups) {
                console.log(group,excludeGroups[group],wgUserGroups,_.invert(groups)[excludeGroups[group]] ? _.invert(groups)[excludeGroups[group]] : '',inObject(groups,excludeGroups[group]) ? $('.user-group-display-contents').find('div[data-group="' + _.invert(groups)[excludeGroups[group]] + '"]') : '');
                console.log(_.where(wgUserGroups,excludeGroups),excludeGroups);
                $('.user-group-display-contents').find('div[data-group="' + _.invert(groups)[excludeGroups[group]] + '"]').detach();
            }
        }
        else if(modes[$('.user-group-display-contents div').data('group').toLowerCase()] != undefined) {
            console.log('modus',modes[$('.user-group-display-contents div').data('group').toLowerCase()]);
            modus = modes[$('.user-group-display-contents div').data('group').toLowerCase()];
            userAccess = wgPageName.split(':')[1].replace('_',' ');
            currentUser = wgUserName;
            self = true;
            if(toggleBooleanCondition(userAccess,currentUser,modus)) {
                $('.user-group-display-contents').find('div[data-group="me"]').show();
                excludes = _.reject(wgUserGroups, function(group){ return group == affectedGroup; });
                for(i in excludes) {
                    if($('.user-group-display-contents').find('div[data-group="' + excludes[i] + '"]').length) {
                        $('.user-group-display-contents').find('div[data-group="' + excludes[i] + '"]').detach();
                    }
                }
            }
            else {
                $('.user-group-display-contents').find('div[data-group="other"]').show();
                excludes = _.reject(wgUserGroups, function(group){ return group == affectedGroup; });
                for(i in excludes) {
                    if($('.user-group-display-contents').find('div[data-group="' + excludes[i] + '"]').length) {
                        $('.user-group-display-contents').find('div[data-group="' + excludes[i] + '"]').detach();
                    }
                }
            }
        }
        else {
            console.log('Does not contain',$('.user-group-display-contents div').data('group'));
        }
    });
}
else {
    console.warn('UI Element not found: UserGroup-Contents');
}