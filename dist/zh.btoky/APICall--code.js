
//<source lang="javascript">
//Wikia API access - By Gguigui1
function apiblockuser(user, expiry, reason, onSuccess, onFail) {
    if (!reason) {
		var reason = prompt('Enter a block reason','Vandalism');
	}
	if (!user || !expiry) {
		onFail('You have to enter the expiry time and user to block. Block cancelled');
		return false;
	}
    var url = wgServer + '/api.php?action=query&prop=info&intoken=block&titles=User:' + user + '&format=json';
    $.getJSON(url, function (data) {
        var p;
        for (var p in data.query.pages) {
            break;
        };
        var token = data.query.pages[p].blocktoken;
        var url = wgServer + '/api.php?action=block&user=' + user + '&expiry=' + expiry + '&reason=' + reason + '&nocreate&autoblock&format=json&token=' + encodeURIComponent(token);
        $.post(url, function (data) {
			if ( data.error  ) {
			onFail(data.error.info + '||Block cancelled');
			return false;
			} else {
            onSuccess('User has been blocked');
			}
        });
    });
}
function apicontentofpage(page, revisionid, onFail) {
    if (!page) {
	onFail('You have to enter a page to perform this action on. Action cancelled.');
	return false;
	}
	var url;
	if (!revisionid) {
	url = wgServer + '/api.php?action=query&prop=info|revisions&titles=' + page + '&format=json&rvprop=content&rvlimit=1';
	} else {
	url = wgServer + '/api.php?action=query&prop=info|revisions&rvstartid=' + revisionid + 'titles=' + page + '&format=json&rvprop=content&rvlimit=1';
	}
        var content;
	$.ajaxSetup({	
		async: false
	});
	$.getJSON(url, function (data) {
		if ( data.error  ) {
			onFail(data.error.info + '||Action cancelled');
			return false;
		} else {
			for (var pageid in data.query.pages) {
				content = data.query.pages[pageid].revisions[0]['*'];
			}
		}
	});
	return content;
	$.ajaxSetup({	
		async: true
	});
}
function apiuserrights(user, groupstoadd, groupstoremove, reason, onSuccess, onFail) {
    if (user == null || groupstoadd == null && groupstoremove == null) {
        onFail('You must enter the user and the rights you wish to change. User rights cancelled.');
        return false;
    }
    if (!reason) {
        var reason = prompt('Enter reason for user rights change', 'Useful contributor');
    }
    var url = wgServer + wgScriptPath + '/api.php?action=query&list=users&ususers=' + user + '&ustoken=userrights&format=json';
    $.getJSON(url, function (data) {
        for (var p in data.query.users) {
            break;
        };
        var token = data.query.users[p].userrightstoken;
        if (groupstoadd == null) {
            if (jQuery.type(groupstoremove) != 'array') {
              onFail('Groups to remove or add have to be in an array(1)');
              return false;
            }
            groupstoremove = groupstoremove.join('|');
            var url = wgServer + wgScriptPath + '/api.php?action=userrights&user=' + user + '&remove=' + groupstoremove + '&reason=' + encodeURIComponent(reason) + '&format=json&token=' + encodeURIComponent(token);
        } else if (groupstoremove == null) {
            if (jQuery.type(groupstoadd) != 'array') {
              onFail('Groups to remove or add have to be in an array(2)');
              return false;
            }
            groupstoadd = groupstoadd.join('|');
            var url = wgServer + wgScriptPath + '/api.php?action=userrights&user=' + user + '&add=' + groupstoadd + '&reason=' + encodeURIComponent(reason) + '&format=json&token=' + encodeURIComponent(token);
        } else {
            if (jQuery.type(groupstoremove) != 'array' || jQuery.type(groupstoremove) != 'array') {
              onFail('Groups to remove or add have to be in an array');
              return false;
            }           
            groupstoremove = groupstoremove.join('|');
            groupstoadd = groupstoadd.join('|');
            var url = wgServer + wgScriptPath + '/api.php?action=userrights&user=' + user + '&add=' + groupstoadd + '&remove=' + groupstoremove + '&reason=' + encodeURIComponent(reason) + '&format=json&token=' + encodeURIComponent(token);
        }
        $.post(url, function () {
            if (data.error) {
                onFail(data.error.info + '|User rights cancelled');
                return false;
            } else {
                onSuccess('User rights changed successfully');
            }
        });
    });
}
function apiunblockuser(user, reason, onSuccess, onFail) {
    if (!reason) {
		var reason = prompt('Enter a block reason','Vandalism');
	}
	if (!user) {
		onFail('You must enter the user you wish to unblock. Unblock cancelled');
		return false;
	}
    var url = wgServer + '/api.php?action=query&prop=info&intoken=unblock&titles=User:' + user + '&format=json';
    $.getJSON(url, function (data) {
        var p;
        for (var p in data.query.pages) {
            break;
        };
        var token = data.query.pages[p].unblocktoken;
        var url = wgServer + '/api.php?action=unblock&user=' + user + '&reason=' + reason + '&format=json&token=' + encodeURIComponent(token);
        $.post(url, function (data) {
			if ( data.error  ) {
			onFail(data.error.info + '||Unblock cancelled');
			return false;
			} else {
            onSuccess('User has been unblocked');
			}
        });
    });
}
function apieditpage(page, content, flags, summary, onSuccess, onFail) {
    if (!page || !content) {
      onFail('Page and content have to be defined|Edits cancelled');
      return false;
    }
    if (jQuery.type(flags) != 'array') {
        onFail('Flags have to be in a array|Edit page cancelled');
        return false;
    }
    if (!summary) {
      var summary = '';
    }
    var editflags = flags.join('|');
    var url = wgServer + '/api.php?action=edit&title=' + page + '&' + editflags + '&summary=' + summary + '&text=' + content + '&token=' + encodeURIComponent(mw.user.tokens.values.editToken);
    $.post(url, function (data) {
        if (data.error) {
            onFail(data.error.info + '||Edit page cancelled');
            return false;
        } else {
            onSuccess('Page edited successfully');
        }
    });
}
function apipagesincategory(category, onFail) {
    if (!category) {
		onFail('Categories must be defined|Pages in categories cancelled');
        return false;
    }
	var pages = [];
	$.ajaxSetup({	
		async: false
	});
    $.getJSON("/api.php?action=query&list=categorymembers&cmtitle=Category:" + encodeURIComponent(category) + "&cmprop=title&cmlimit=5000&format=json", function (data) {
        var categoryUsage = data.query.categorymembers;
        if (categoryUsage.length > 0) {
            for (var currentPage = 0; currentPage < categoryUsage.length; currentPage++) {
                var title = categoryUsage[currentPage].title;
                if (title) {
                    pages.push(title);
                }
            }
        }
    });
    return pages;
	$.ajaxSetup({	
		async: true	
	});
}
function apideletepage(page, reason, onSuccess, onFail) {
    if (!reason) {
        var reason = prompt('請輸入刪除原因', '違反討論原則');
    }
    var token = mw.user.tokens.get("editToken");
    var url = wgServer + '/api.php?action=delete&title=' + page + '&reason=' + reason + '&format=json&token=' + encodeURIComponent(token);
    $.post(url, function (data) {
        if (data.error) {
            onFail(data.error.info + '||Delete page cancelled');
            return false;
        } else {
            onSuccess('頁面 : "' + page + '" 已刪除');
        }
    });
}
//</source>