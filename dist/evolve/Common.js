window.UserTagsJS = {
    modules: {},
    tags: {
        // These will be added to people by UserTagsJS.modules.custom
        'chatmod': { u: 'Chat room Moderator', order: 0 },
        'rollback': { u: 'Patroller', order: 10 },
        'founder': { u: ' ', order: -4 },
        'inactiveAdmin': { u: 'Inactive Admin', order: -1 },
        'wiki moderator': { u: 'Wiki Moderator', order: -1 },
        'sysop': { u: 'Administrator', order: 1 },
        'moderator': { u: 'Moderator', order: 1 },
        'SITEADMIN' : { u: 'SITE ADMIN.......', order: 0 },
        'DEVELOPER' : { u: 'DEVELOPER', order: 1 },
        'SPRMOD' : { u: 'Super Moderator', order: 0 },
        'Enforcer' : { u: 'Enforcer', order: 1 }
        

    }
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;

UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser', 'threadmoderator', 'enforcer','supermoderator'];

UserTagsJS.modules.metafilter = {
	sysop: ['Administrator'],
	rollback: ['Patroller'],
	threadmoderator: ['Moderator'],
	supermoderator: ['SPRMOD']
	
};
UserTagsJS.modules.implode = {
	'inactiveAdmin': ['sysop', 'inactive'],
	'wiki moderator': ['chatmoderator', 'rollback', 'moderator'],
	'sysop':  ['sysop', 'threadmoderator','rollback','chatmoderator', 'supermoderator'],
	'SITEADMIN':  ['bureaucrat', 'sysop', 'threadmoderator','rollback','chatmoderator'],
	'DEVELOPER':  ['bureaucrat', 'sysop', 'threadmoderator','rollback','chatmoderator'],
	'SPRMOD': ['threadmoderator','rollback','supermoderator','enforcer','chatmoderator'],
	'Enforcer': ['enforcer', 'threadmoderator','rollback']
};

	
UserTagsJS.modules.custom = {
	'MythicConditor': ['SITEADMIN', 'DEVELOPER'],
	'': ['SPRMOD'],
	'Dino-drones': ['sysop'],
	'LocoPojo': ['sysop'],
	'': ['SPRMOD']
};  

// *1-5 Basic users
// *6-11 Dedicated users
// *
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    if ($("#UserProfileMasthead").size()) {
      editRanks = {
        //SOFT CAP//  
        1: "Level 1",
        5: "Level 2",
        15: "Level 3",
        20: "Level 4",
        25: "Level 5",
        30: "Level 6",
        35: "Level 7",
        40: "Level 8",
        45: "Level 9",
        50: "Level 10",
        55: "Level 11",
        60: "Level 12",
        65: "Level 13",
        70: "Level 14",
        75: "Level 15",
        80: "Level 16",
        85: "Level 17",
        90: "Level 18",
        95: "Level 19",
        100: "Level 20",
        105: "Level 21",
        110: "Level 22",
        115: "Level 23",
        120: "Level 24",
        125: "Level 25",
        130: "Level 26",
        135: "Level 27",
        140: "Level 28",
        145: "Level 29",
        150: "Level 20",
        155: "Level 31",
        160: "Level 32",
        165: "Level 33",
        170: "Level 34",
        175: "Level 35",
        180: "Level 36",
        185: "Level 37",
        190: "Level 38",
        195: "Level 39",
        200: "Level 40",
        
        //HARD CAP//
        225: "Division: (WHITE)" ,
        250: "Division: (WHITE▴)",
        275: "Division: (WHITE▴▴)",
        300: "Division: (WHITE▴▴▴)",
        325: "Division: (SILVER)",
        350: "Division: (SILVER▴)",
        375: "Division: (SILVER▴▴)",
        400: "Division: (SILVER▴▴▴)",
        425: "Division: (PEARLESCENT WHITE)",
        450: "Division: (PEARLESCENT WHITE▴)",
        475: "Division: (PEARLESCENT WHITE▴▴)",
        500: "Division: (PEARLESCENT WHITE▴▴▴)",
        545: "Division: (RED)",
        590: "Division: (RED⭑)",
        635: "Division: (RED⭑⭑)",
        680: "Division: (RED⭑⭑⭑)",
        725: "Division: (GOLD)",
        770: "Division: (GOLD⭑)",
        815: "Division: (GOLD⭑⭑)",
        860: "Division: (GOLD⭑⭑⭑)",
        905: "Division: (BLOOD RED)",
        950: "Division: (BLOOD RED⭑)",
        995: "Division: (BLOOD RED⭑⭑)",
        1040: "Division: (BLOOD RED⭑⭑⭑)",
        1090: "Division: (BLACK)",
        1140: "Division: (BLACK●)",
        1190: "Division: (BLACK●●)",
        1240: "Division: (BLACK●●●)",
        1295: "Division: (ONYX)",
        1350: "Division: (ONYX●)",
        1405: "Division: (ONYX●●)",
        1460: "Division: (ONYX●●●)",
        1515: "Division: (VOID)",
        1570: "Division: (VOID●)",
        1625: "Division: (VOID●●)",
        1680: "Division: (VOID●●●)",
       
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
      }
      editCount = $("#UserProfileMasthead .tally em").html().replace(",","");
      if (editCount) {
        for(i in editRanks) if (editCount >= parseInt(i)) editRank = editRanks[i];
        $("#UserProfileMasthead hgroup").append($("<div>").addClass("tag").html(editRank));
      }
    }
  }
}
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};
 
window.MessageWallUserTags = {
    font: true,
    fontfamily: 'Cabazon',
    fontstyle: 'Bold',
    tagColor: '#000',
    border: true,
    borderColor: "#fff",
    glow: true,
    glowSize: '10px',
    glowColor: '#fff',
    users: {
        'MythicConditor': 'SITE ADMIN//DEVELOPER',
        'User1': 'Founder',
        'User2': 'Bureaucrat',
        'User3': 'Admin',
        'User4': 'Rollback',
        'User5': 'Custom Tag'
    }
};
 

importArticles({
    type: "style",
    articles: [
        "w:c:dev:FontAwesome/code.css"
    ]
});

window.LockForums = {
    expiryDays: 180,
    expiryMessage: "This forum has been automatically archived because its most recent comment is over <expiryDays> days old.",
    warningDays: 30,
    warningMessage: "This forum is now <actualDays> days old; out of courtesy to your fellow Wikians, please do not comment unless it is absolutely necessary. This forum will archive automatically when the last comment is <expiryDays> days old.",
    banners: true,
    ignoreDeletes: true,
    warningPopup: true,
    warningPopupMessage: "By posting on an old forum you may be filling up the e-mail boxes of many people who are still following this topic. Are you sure you want to do this?",
    disableOn: ["12345", "67890"]
};
 

/**
 * SpoilerAlert
 * documentation at: https://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 *
 * __NOWYSIWYG__
 */
/*jshint curly:false jquery:true browser:true */
 
$(function () {
    "use strict";
    
 
window.SpoilerAlert = (function (my, console, Math) {

        my = $.extend({
            question: 'This page contains spoilers. Are you sure you want to read it?',
            yes: 'Yes, please',
            no: 'No, not yet',
            isSpoiler: function () {
        var bodys = document.getElementsByTagName('body');
        for (var i = 0, c = bodys.length; i < c; i++) {
            if (/spoiler/i.test($(bodys[i]).text())) return true;
        }
 
 
        return false;
    }

        }, my); // If my is undefined/null/not-object then jQuery will ignore it
 
        var wgArticleId = (window.mediaWiki && window.mediaWiki.config && window.mediaWiki.config.get('wgArticleId')) || window.wgArticleId;
 
        var dialog =
        '<table id="dialog" border="0" cellpadding="20" style="background-color: white; border-radius: 4px; border: 2px solid black;">' +
            '<tr>' +
                '<td colspan="2" style="padding: 20px 30px; border-style: none; text-align: center; color: black">' +
                    my.question +
                '</td>' +
            '</tr>' +
            '<tr>' +
                '<td style="padding: 0 30px 20px; text-align: center; border-style: none;">' +
                    '<button id="no">' + my.no + '</button>' +
                '</td>' +
                '<td style="padding: 0 30px 20px; text-align: center; border-style: none;">' +
                    '<button id="yes">' + my.yes + '</button>' +
                '</td>' +
            '</tr>' +
        '</table>';
 
        function getBackgroundColor () {
            var color = $('#WikiaPageBackground').css('background-color');
            if ('transparent' !== color) return color;
            color = $('#WikiaPage').css('background-color');
            if ('transparent' !== color) return color;
            color = $('section.module', '#WikiaRail').css('background-color');
            if ('transparent' !== color) return color;
            console.log('SpoilerAlert: Cannot determine color');
            return color;
        }
 
        // Use LocalStorage, it doesn't get sent to the server every HTTP request
        var ids = $.storage.get('SpoilerAlertJS');
        // Backwards compatibility. This block can be removed after a week or so
        if (!ids) {
            ids = $.cookies.get('spoilers');
            if (ids) { // Old cookie found, convert to local storage
                ids = ids.split(',');
                $.cookies.del('spoilers', {hoursToLive:0, path:'/', domain: location.host});
                $.storage.set('SpoilerAlertJS', ids);
            } else {
                ids = [];
            }
        }
        if (my.isSpoiler() && -1 === $.inArray(wgArticleId, ids)) {
            var article = $('#WikiaArticle');
            var articleHeight = article.height();
            var dialogHeight;
            $('<div id="blackout">' + dialog + '</div>').prependTo(article).css({
                position: 'absolute',
                top: 0, left: 0,
                right: 0, bottom: 0,
                zIndex: 2000000001,
                backgroundColor: getBackgroundColor(),
                minHeight: (dialogHeight = $('#dialog').height())
            });
            var dialogPadding = 100;
            var topRelativeToWindow = Math.round(
                ($(window).height() - dialogHeight) / 2 - $('#WikiaArticle').offset().top
            );
            var topRelativeToArticle = Math.round((articleHeight - dialogHeight) / 2);
            console.log(
                'window.height: ', $(window).height(),
                ', WikiaArticle.offset.top: ', $('#WikiaArticle').offset().top,
                ', articleHeight:', articleHeight,
                ', dialogHeight:', dialogHeight,
                ', topRelativeToWindow:', topRelativeToWindow,
                ', topRelativeToArticle: ', topRelativeToArticle
            );
            $('#dialog').css({
                position: 'absolute',
                left: Math.round(($('#WikiaArticle').width() - $('#dialog').width() ) / 2) + 'px',
                top:  Math.max(Math.min(topRelativeToWindow, topRelativeToArticle), dialogPadding) + 'px'
            });
            $('#no').click(function () {
                $('#dialog').remove();
                if (my.back) {
                    if (history.length) {
                        history.back();
                    } else {
                        
                        location.href = location.protocol + '//' + location.host;
                        
                    }
                }
            });
            $('#yes').click(function () {
                $('#dialog').remove();
                $('#blackout').fadeOut(1600, function () {
                    $(this).remove();
                });
                
                ids.push(wgArticleId);
                $.storage.set('SpoilerAlertJS', ids);
                var ug = mw.config.get("wgUserGroups");
            });
        }
 
        return my;
 
    }); (window.SpoilerAlert, window.console || { log: $.noop }, Math);
 });
//

 
function verifySummary(){
	var wpLicense = document.getElementById('wpLicense');
	var wpDestFile = document.getElementById('wpDestFile');
 
	// Check for licensing
	if ( wpLicense.value == "" ){
		alert('Licensing must be completed.');
		return false;
	}
 
	// Check for source
	if ( document.getElementById('sourceBox').value == "" ){
		alert('Source must be completed.');
		return false;
	}
 
	// Check for duplicated or capitalized file extensions
	if ( wpDestFile.value.match(/(JPG|PNG|GIF|SVG|jpg\.jpg|png\.png|gif\.gif|svg\.svg)$/)) {
		alert('Please do not use capitalized or duplicated file extensions in the filename.');
		return false;
	}
 
	var strBuilder = '==Summary==\r\n{{Information\r\n';
	strBuilder += '|attention=' + document.getElementById('attentionBox').value + '\r\n';
	strBuilder += '|description=' + document.getElementById('descriptionBox').value + '\r\n';
	strBuilder += '|source=' + document.getElementById('sourceBox').value + '\r\n';
	strBuilder += '|artist=' + document.getElementById('artistBox').value + '\r\n';
	strBuilder += '|filespecs=' + document.getElementById('filespecsBox').value + '\r\n';
	strBuilder += '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title + '\r\n';
	strBuilder += '|other versions=' + document.getElementById('versionsBox').value + '\r\n';
	strBuilder += '|cat artist=' + document.getElementById('catartistBox').value + '\r\n';
	strBuilder += '|cat licensee=' + document.getElementById('catlicenseeBox').value + '\r\n';
	strBuilder += '|cat subject=' + document.getElementById('catsubjectBox').value + '\r\n';
	strBuilder += '|cat type=' + document.getElementById('cattypeBox').value + '\r\n';
	strBuilder += '}}';
 
	document.getElementById('wpUploadDescription').value = strBuilder;
 
	wpLicense.selectedIndex = 0;
 
	return true;
}
//<source lang="javascript">
/* UserRightsRecord by MythicalConditor
 * Displays a list of all users having certain rights and when they gained and lost them.
 */
//IDEAS:
// custom date formatting
// add option to line everything up (luckily dates are already zero-padded)
// maybe I should allow sorting by highest duration within groups...
// should probably do something about group names if possible (e.g. sysop -> administrator) when desired
// should go through the data structure for cleanup instead of going through the HTML after it's done
 
$('.rightsrecord').each(function(thisidx) {
    var $urr = $(this),
      mode = $urr.attr('data-urr-mode') === 'users' ? 'users' : 'rights',
      exclude = $urr.attr('data-urr-exclude') ? $urr.attr('data-urr-exclude').split(', ') : [],
      start = $urr.attr('data-urr-start') ? '&lestart=' + $urr.attr('data-urr-start') : '',
      end = $urr.attr('data-urr-end') ? '&leend=' + $urr.attr('data-urr-end') : '',
      user = $urr.attr('data-urr-user') ? '&letitle=' + $urr.attr('data-urr-user') : '',
      minDays = parseInt($urr.attr('data-urr-daymin')) || 1,
      showDays = ($urr.attr('data-urr-showdays') || 'true').toLowerCase(),
      hideUnknown = (($urr.attr('data-urr-onlyknown') || 'false').toLowerCase() === 'true'),
      hidePresent = (($urr.attr('data-urr-onlypast') || 'false').toLowerCase() === 'true'),
      nameChanges = {},
      stuff = {};
        //rights: {'rollback':{'User:A':[[start, end]], 'User:B':[[start, end], [start, end]]}, 'sysop':{}, ...}
        //users: {'User:A':{'rollback':[[start, end], [start, end]], 'sysop':[[start, end]]}, 'User:B':{}, ...}
 
    try {
        nameChanges = JSON.parse($urr.text());
    } catch (SyntaxError) {
        if ($urr.text() !== '') {
            console.log('Invalid name change specification.');
        }
    }
 
    if (!($.isPlainObject(nameChanges))) {
        nameChanges = {}; // override any other valid JSON that may have been there
    }
 
    if (showDays === 'false') {
        showDays = false;
    } else if (showDays !== 'divided') {
        showDays = true;
    }
 
    //An approximation. Let me know if it is not sufficiently accurate, 
    // but it doesn't need to be exact. (Thanks StackOverflow as always)
    function dateDiff(date1, date2) {
        var days = 0;
 
        if (date1 === 'unknown') {
            return '??? days';
        }
 
        if (date2 === 'present') {
            date2 = new Date().toJSON();
            date2 = date2.substring(0, date2.indexOf('T'));
        }
 
        days = Math.round((new Date(date2) - new Date(date1))/8.64e+7);
 
        if (showDays !== 'divided') {
            return days.toString() + (days === 1 ? ' day' : ' days');
        } else {
            var counts = [0, 0, 0], str = [];
            counts[0] = Math.floor(days / 365);
            days = days % 365;
            counts[1] = Math.floor(days / 30);
            days = days % 30;
            counts[2] = days;
 
            if (counts[0]) str.push(counts[0] + ' year' + (counts[0] > 1 ? 's' : ''));
            if (counts[1]) str.push(counts[1] + ' month' + (counts[1] > 1 ? 's' : ''));
            if (counts[2]) str.push(counts[2] + ' day' + (counts[2] > 1 ? 's' : ''));
 
            return str.join(', '); //wow this section is terrible. Darn time
        }
    }
 
    //This seems like the best way to create objects in "stuff" as necessary...
    // hopefully it isn't too slow being called that often.
    function checkElement(name) {
        if (stuff[name] === undefined) {
            stuff[name] = {};
        }
    }
 
    function addDate(arr, target, timestamp, isPlus) {
        var e = ['', ''], // I apologize to anyone reading this code for the bottom section :/
          arrInd = isPlus ? 0 : 1,
          plcInd = isPlus ? 1 : 0,
          placeholders = ['unknown', 'present'],
          arrlen;
 
        if (arr.length && arr[0] !== '') {
            for (var i = 0; i < arr.length; i++) {
                if (mode === 'rights') {
                    checkElement(arr[i]);
                    e = [arr[i], target];
                } else if (mode === 'users') {
                    checkElement(target);
                    e = [target, arr[i]];
                }
 
                // I probably should have stayed with separating them by plus/minus. @_@
                if (stuff[e[0]][e[1]]) {
                    arrlen = stuff[e[0]][e[1]].length - 1;
                    if (stuff[e[0]][e[1]][arrlen][arrInd] === placeholders[arrInd] && !isPlus) {
                        //additions should always make a new element due to chronology
                        stuff[e[0]][e[1]][arrlen][arrInd] = timestamp;
                    } else {
                        stuff[e[0]][e[1]].push(['', '']);
                        stuff[e[0]][e[1]][arrlen+1][arrInd] = timestamp;
                        stuff[e[0]][e[1]][arrlen+1][plcInd] = placeholders[plcInd];
                    }
                } else {
                    stuff[e[0]][e[1]] = [['', '']];
                    stuff[e[0]][e[1]][0][arrInd] = timestamp;
                    stuff[e[0]][e[1]][0][plcInd] = placeholders[plcInd];
                }
            }
        }
    }
 
    function cleanOutput() {
        if (mode === 'rights') {
            $urr.find('h3').each(function() {
                if (!($(this).next().find('li').length)) {
                    $(this).next().remove();
                    $(this).remove();
                    $('#urr-toc').find('a[href="#' + 
                      $(this).attr('id') + '"]').closest('li').remove();
                }
            });
        } else if (mode === 'users') {
            $urr.find('li').each(function() {
                if ($(this).text() === $(this).find('a').text() + ': ') {
                    $(this).remove();
                }
            });
        }
 
        if (!($urr.find('li').length)) {
            $urr.html('No results found matching the criteria.');
        }
    }
 
    function getData(qcontinue, callback) {
        $.getJSON('/api.php?action=query&list=logevents&letype=rights' + 
          '&leprop=title|timestamp|details' + qcontinue + end + user +
          '&ledir=newer&lelimit=max&format=json', function(data) {
            var evs = data.query.logevents, newArr, oldArr, target, timestamp, plus, minus;
            for (var i = 0; i < evs.length; i++) {
                if (evs[i].actionhidden !== undefined || !evs[i].rights) {
                    continue; //as always, some random thing to account for :P
                }
 
                target = evs[i].title.substring(5);
                if (nameChanges[target] === null) {
                    continue;
                }
                target = 'User:' + (nameChanges[target] || target);
                timestamp = evs[i].timestamp.substring(0, evs[i].timestamp.indexOf('T'));
                newArr = evs[i].rights['new'].split(', ');
                oldArr = evs[i].rights['old'].split(', ');
                // Array difference: http://stackoverflow.com/a/15385871/2848688
                plus = $(newArr).not(oldArr).not(exclude);
                minus = $(oldArr).not(newArr).not(exclude);
 
                addDate(plus, target, timestamp, true);
                addDate(minus, target, timestamp, false);
            }
 
            qcontinue = data['query-continue'];
            if (qcontinue !== undefined) {
                getData('&lestart=' + qcontinue.logevents.lestart, callback);
            } else {
                callback();
            }
        });
    }
 
    function putResults() {
        function arrMerge(arr) { //don't need the parameter thanks to epic scoping but I like to be safe
            var wrap = (mode === 'rights' ? [' (', '', ')'] : [' [', '', ']']);
            //best way I could think of to wrap a string like this
 
            var stop = arr.length;
            for (var k = 0; k < stop; k++) {
                wrap[1] = dateDiff(arr[k][0], arr[k][1]);
 
                if (
                    wrap[1].substring(0, wrap[1].indexOf(' ')) < minDays || 
                    (hideUnknown && arr[k][0] === 'unknown') || 
                    (hidePresent && arr[k][1] === 'present')
                ) {
                    arr.splice(k, 1);
                    stop -= 1;
                    k -= 1; //next iteration at same index
                } else {
                    arr[k] = arr[k].join(' &ndash; ') + (showDays ? wrap.join('') : '');
                }
            }
            return arr.join(', ');
        }
 
        var keysOuter = [], keysInner = [], item, merge;
        $urr.html('<h2>User rights record</h2>');
        if (mode === 'rights') {
            $urr.append('<table class="toc"><tr><td><ul id="urr-toc"></ul></td></tr></table>');
        } else if (mode === 'users') {
            $urr.append('<ul></ul>');
        }
 
        for (var key in stuff) {
            keysOuter.push(key);
        }
        keysOuter.sort();
 
        for (var i = 0; i < keysOuter.length; i++) {
            keysInner = [];
            for (var key in stuff[keysOuter[i]]) {
                keysInner.push(key);
            }
            keysInner.sort();
 
            for (var j = 0; j < keysInner.length; j++) {
                item = stuff[keysOuter[i]][keysInner[j]];
                merge = arrMerge(item);
 
                if (mode === 'rights') {
                    if (j === 0) {
                        $urr.append(
                            $('<h3 />', {
                                'id':'urr-' + keysOuter[i] + '-' + thisidx,
                                'text':keysOuter[i]
                            }).after(
                                $('<ul />', {'id':'urr-active'})
                            )
                        );
 
                        $('#urr-toc').append(
                            $('<li />', {
                                'class':'toclevel-1',
                                'html':$('<a />', {
                                    'href':'#urr-' + keysOuter[i] + '-' + thisidx,
                                    'text':keysOuter[i]
                                })
                            })
                        );
                    }
 
                    if (merge) {
                        $('#urr-active').append(
                            $('<li />').html(
                                $('<a />', {
                                    'href':'/wiki/' + keysInner[j].replace(/ /g, '_'),
                                    'text':keysInner[j].substring(5)
                                }).after(': ')
                            ).append(merge)
                        );
                    }
                } else if (mode === 'users') {
                    if (j === 0) {
                        $urr.children('ul').append(
                            $('<li />', {
                                'id':'urr-active',
                                'html':$('<a />', {
                                    'href':'/wiki/' + keysOuter[i].replace(/ /g, '_'),
                                    'text':keysOuter[i].substring(5)
                                }).after(': ')
                            })
                        );
                    } else if (merge && $('#urr-active').text().slice(-1) === ')') {
                        $('#urr-active').append(', ');
                    }
 
                    if (merge) {
                        $('#urr-active').append(keysInner[j] + ' (' + merge + ')');
                    }
                }
            }
 
            $('#urr-active').removeAttr('id');
        }
 
        cleanOutput(); //easier to clean up a mess than to avoid making one
 
        $('#urr-toc').removeAttr('id'); //for multiple instances on one page
    }
 
    //One line to call them all
    getData(start, putResults);
});
//</source>