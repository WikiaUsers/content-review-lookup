/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */ 

// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = '';
  } else {
    var tpm = '';
  }
 
  // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' seconde';
  } else {
    left = (diff%60) + ' secondes';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' minute, et ' + left;
    } else {
      left = (diff%60) + ' minutes, et ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' heure, ' + left;
    } else {
      left = (diff%24) + ' heures, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' jour, ' + left;
    } else {
      left = diff + ' jours, ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
//$(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

 





 
 /**
 * Pour [[Modèle:Boîte déroulante]] 
 */
 
var BoiteDeroulante_Enrouler = '[enrouler]';
var BoiteDeroulante_Derouler  = '[dérouler]'; 
var BoiteDeroulante_max = 0; 
var BoiteDeroulante_index = -1;
 
function BoiteDeroulante_toggle(indexBoiteDeroulante){
      var NavFrame = document.getElementById("NavFrame" + indexBoiteDeroulante);
      var NavToggle = document.getElementById("NavToggle" + indexBoiteDeroulante);
      var CaptionContainer = document.getElementById("NavCaption" + indexBoiteDeroulante);
      if (!NavFrame || !NavToggle || !CaptionContainer) return; 
      var caption = new Array();
      var CaptionSpans = CaptionContainer.getElementsByTagName('span');
      caption[0] = CaptionSpans[0].innerHTML;
      caption[1] = CaptionSpans[1].innerHTML;
 
      var Contents = NavFrame.getElementsByTagName('div');  
      if (NavToggle.innerHTML == caption[1]) {
            NavToggle.innerHTML = caption[0];
            for(var a=0,m=Contents.length;a<m;a++){
                  if(hasClass(Contents[a], "NavContent")){
                        Contents[a].style.display = 'none';
                        return;
                  }
            }
      }else{
            NavToggle.innerHTML = caption[1];
            for(var a=0,m=Contents.length;a<m;a++){
                  if(hasClass(Contents[a], "NavContent")){
                        Contents[a].style.display = 'block';
                        return;
                  }
            }
      }
}
 
function BoiteDeroulante(Element){
      if(!Element) Element = document;
      var NavFrameCount = -1;
      var NavFrames = Element.getElementsByTagName("div");
      for(var i=0,l=NavFrames.length;i<l;i++){
            if(hasClass(NavFrames[i], "NavFrame")){
                  var NavFrame = NavFrames[i];
                  NavFrameCount++;
                  BoiteDeroulante_index++;
 
                  if (NavFrame.title && NavFrame.title.indexOf("/")!=-1) {
                        var Enrouler = NavFrame.title.HTMLize().split("/")[1];
                        var Derouler = NavFrame.title.HTMLize().split("/")[0];
                  }else{
                        var Enrouler = BoiteDeroulante_Enrouler;
                        var Derouler = BoiteDeroulante_Derouler;    
                  }
                  NavFrame.title='';
                  var CaptionContainer = document.createElement('span');
                  CaptionContainer.id = 'NavCaption' + BoiteDeroulante_index;
                  CaptionContainer.style.display = "none";
                  CaptionContainer.innerHTML = '<span>' + Derouler + '</span><span>' + Enrouler + '</span>';
                  NavFrame.appendChild(CaptionContainer);
 
                  var NavToggle = document.createElement("a");
                  NavToggle.className = 'NavToggle';
                  NavToggle.id = 'NavToggle' + BoiteDeroulante_index;
                  NavToggle.href = 'javascript:BoiteDeroulante_toggle(' + BoiteDeroulante_index + ');';
                  var NavToggleText = document.createTextNode(Enrouler);
                  NavToggle.appendChild(NavToggleText);
 
                  NavFrame.insertBefore( NavToggle, NavFrame.firstChild );
                  NavFrame.id = 'NavFrame' + BoiteDeroulante_index;
                  if (BoiteDeroulante_max <= NavFrameCount) {
                        BoiteDeroulante_toggle(BoiteDeroulante_index);
                  }
            }
      }
 
}
$(BoiteDeroulante);

/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		ambassadeur: { u:'AMBASSADEUR', m:'AMBASSADEUR', f:'AMBASSADRICE'},
        parrain: { u:'PARRAIN', m:'PARRAIN', f:'MARRAINE' },
        filleul: { u:'FILLEUL', m:'FILLEUL', f:'FILLEULE' },
        quizz: { u:'QUIZZEUR DU MOIS', m:'QUIZZEUR DU MOIS', f:'QUIZZEUSE DU MOIS' },
        vétéran: { u:'VÉTÉRAN', m:'VÉTÉRAN', f:'VÉTÉRANTE' },
        chatbot: { u:'CHATBOT', m:'CHATBOT', f:'CHATBOT' },
              }
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bannedfromchat', 'chatmoderator', 'bot', 'threadmoderator', 'patroller', 'blocked', 'content-moderator', 'council', 'vanguard'];
UserTagsJS.modules.custom = {
        'Paolino Paperino': ['ambassadeur'],
        'Tightwad': ['ambassadeur'],
        'ΚΟΜΙΞ': ['ambassadeur'],
        'Lokahoitas': ['ambassadeur'],
        'Mondopapero': ['ambassadeur'],
        'GladstoneGander' : ['vétéran'],
        'Simswiki' : ['vétéran'],
        'Potomac' : ['vétéran'],
        'LelalMekha' : ['vétéran'],
        'Loulouduck' : ['vétéran'],
        'PWChatBot' : ['chatbot'],
        'Paul112' : ['vétéran', 'parrain'],
        'Dark Yada' : ['parrain'],
        'Esteban02' : ['parrain'],
        'Nono007' : ['vétéran'],
        'SoupicDuck 14' : ['parrain'],
};

/* Chat-headline */
function changeChatDesc() {
try {
if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc){
$('p.chat-name').html(''+chatDesc+'');
setTimeout("changeChatDesc()", 200);
}
 
}catch (err){
setTimeout("changeChatDesc()", 200);
}
};
 
$(document).ready(function (){changeChatDesc()});

/*
    Remplace <insert name here> avec le nom de l'utilisateur qui parcours la page.
    Requiers de copier {{USERNAME}}.
*/
 function substUsername() {
        $('.insertusername').text(wgUserName);
}
 
 function substUsernameTOC() {
        var toc = document.getElementById('toc');
        var userpage = document.getElementById('pt-userpage');
 
        if( !userpage || !toc )
                return;
 
        var username = userpage.firstChild.firstChild.nodeValue;
        var elements = getElementsByClass('toctext', toc, 'span');
 
        for( var i = 0; i < elements.length; i++ )
                elements[i].firstChild.nodeValue = elements  [i].firstChild.nodeValue.replace('<insert name here>', username);
}
        $('.insertusername').text(wgUserName);

// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
$(function() {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    $(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});

/* Notations */ /**Provenance : http://de.moviepedia.wikia.com/wiki/MediaWiki:Common.js**/
/* Rating function */
/* Partially from http://runescape.wikia.com/wiki/User:Quarenon/gemwupdate.js */
$(function () {
    if ($.inArray("Histoire", wgCategories) > -1) {
        var pageName = 'Notation:' + wgPageName;
        disableEdit = false;
        var clapperInactive = new Image();
        clapperInactive.src = 'https://images.wikia.nocookie.net/picsou/fr/images/7/75/EtoileNoteGrisSmall.png';
        var clapperActive = new Image();
        clapperActive.src = 'https://images.wikia.nocookie.net/picsou/fr/images/5/50/EtoileNoteJauneSmall.png';
 
        if (!wgUserName) {
            $.getJSON("http://smart-ip.net/geoip-json?callback=?", function (data) {}).done(function (data) {;
                var userIP = data.host;
 
                getReview(pageName, userIP);
            });
        } else {
            var userIP = wgUserName;
 
            getReview(pageName, userIP)
        }
 
    }
 
    saveRating = false;
    $('.rating').mouseenter(function () {
        var currentRating = parseInt($(this).attr('id').split("-")[1]);
 
        $('.rating').each(function () {
            var currentRatingEach = parseInt($(this).attr('id').split("-")[1]);
            if (currentRatingEach <= currentRating && saveRating == false) {
                $(this).addClass('rating-active');
            }
        });
    });
 
    $('.rating').mouseleave(function () {
        if (saveRating == false) {
            $('.rating').attr('class', 'rating');
        }
    });
 
    $(".rating").on("click", function () {
        disableEdit = false;
        saveRating = true;
        actualRating = parseInt($(this).attr('id').split("-")[1]);
 
        if (!wgUserName) {
            $.getJSON("http://smart-ip.net/geoip-json?callback=?", function (data) {}).done(function (data) {;
                var userIP = data.host;
                var pageName = 'Notation:' + wgPageName;
 
                var contentText = '<noinclude>' + userIP + ':</noinclude>' + actualRating;
 
                if (disableEdit == false) {
                    submitReview(pageName, contentText, userIP, actualRating);
                }
            });
        } else {
            var userIP = wgUserName;
            var pageName = 'Notation:' + wgPageName;
 
            var contentText = '<noinclude>' + userIP + ':</noinclude>' + actualRating;
 
            if (disableEdit == false) {
                submitReview(pageName, contentText, userIP, actualRating);
            }
        }
 
        if (saveRating == true) {
            $('.rating').attr('class', 'rating');
            $('.rating').each(function () {
                var currentRatingEach = parseInt($(this).attr('id').split("-")[1]);
                if (currentRatingEach <= actualRating) {
                    $(this).addClass('rating-active');
                }
            });
        }
    });
});
 
function showError(msg) {
    console.log(msg);
}
 
function callAPI(data, method, callback) {
    data['format'] = 'json';
 
    $.ajax({
        data: data,
        dataType: 'json',
        url: wgScriptPath + '/api.php',
        type: method,
        success: function (response) {
            if (response.error) {
                showError('API error: ' + response.error.info);
            } else {
                callback(response);
            }
        },
        error: function (xhr, error) {
            showError('AJAX error: ' + error);
        },
        timeout: 10000 // msec
    });
}
 
function submitReview(reviewPageName, reviewRating, userIP, rating) {
    disableEdit = true;
    setTimeout(function () {
        disableEdit = false;
    }, 500);
    callAPI({
        'action': 'query',
        'prop': 'info|revisions',
        'intoken': 'edit',
        'titles': reviewPageName,
        'rvprop': 'content',
        'rvlimit': '1'
    }, 'GET', function (response) {
        var pages = response.query.pages;
        var page = null;
 
        for (var i in pages) {
            page = pages[i];
        }
 
        if (page.missing == "") {
            var content = reviewRating;
 
            callAPI({
                'minor': 'yes',
                'summary': 'Mise à jour automatique des notations',
                'action': 'edit',
                'title': reviewPageName,
                'startimestamp': page.starttimestamp,
                'token': page.edittoken,
				'watchlist': 'unwatch',
                'text': content
            }, 'POST', function (response) {
                if (response.edit.result == 'Success') {
 
                    averageArray = [];
                    var averageRatingClappers = Math.round(rating);
                    $('.rating-average').each(function () {
                        var currentAverageRatingEach = parseInt($(this).attr('id').split("-")[1]);
                        if (currentAverageRatingEach <= averageRatingClappers) {
                            $(this).addClass('rating-average-active');
                        }
                    });
					$('.rating-people').text(1);
 
                    $('.rating-total').attr('data-rating', rating);
 
                    averageArray.push(parseInt(rating));
                } else {
 
                }
            });
        } else {
            var content = page.revisions[0]['*'];
 
            if ((page.length) == 0) {
                var content = reviewRating;
            } else {
                if (content.match(userIP)) {
                    var numbers = new RegExp(userIP + '\:\<\/noinclude>[0-9]([0-9])?', 'm');
                    var content = content.replace(numbers, userIP + '\:\<\/noinclude>' + rating);
                } else {
                    var content = content + ' + ' + reviewRating;
                }
            }
 
            callAPI({
                'minor': 'yes',
                'summary': 'Mise à jour automatique des notations',
                'action': 'edit',
                'title': reviewPageName,
                'basetimestamp': page.revisions[0].timestamp,
                'startimestamp': page.starttimestamp,
                'token': page.edittoken,
				'watchlist': 'unwatch',
                'text': content
            }, 'POST', function (response) {
                if (response.edit.result == 'Success') {
 
 
                    var newAverageArray = [];
                    var newAverageArray = averageArray;
                    var stopSplice = false;
                    var oldRating = $('.rating-total').attr('data-rating');
 
                    for (var i = newAverageArray.length - 1; i >= 0; i--) {
                        if (newAverageArray[i] == oldRating && stopSplice == false) {
                            newAverageArray.splice(i, 1);
                            var stopSplice = true;
                        }
                    }
 
                    newAverageArray.push(parseInt(rating));
 
                    sumRatingNew = 0;
                    for (var x = 0; x < newAverageArray.length; x++) {
                        sumRatingNew = sumRatingNew + newAverageArray[x];
                    }
 
                    averageRatingNew = sumRatingNew / newAverageArray.length;
 
                    var averageRatingClappers = Math.round(averageRatingNew);
                    $('.rating-average').attr('class', 'rating-average');
                    $('.rating-average').each(function () {
                        var currentAverageRatingEach = parseInt($(this).attr('id').split("-")[1]);
                        if (currentAverageRatingEach <= averageRatingClappers) {
                            $(this).addClass('rating-average-active');
                        }
                    });
					$('.rating-people').text(newAverageArray.length);
 
 
                    $('.rating-total').attr('data-rating', rating);
 
                } else {
 
                }
            });
        }
    });
}
 
function getReview(reviewPageName, userIP) {
    callAPI({
        'action': 'query',
        'prop': 'info|revisions',
        'intoken': 'edit',
        'titles': reviewPageName,
        'rvprop': 'content',
        'rvlimit': '1'
    }, 'GET', function (response) {
        var pages = response.query.pages;
        var page = null;
 
        for (var i in pages) {
            page = pages[i];
        }
 
        if (page.missing == "") {
            $('.rating-people').text(0);
        } else {
            var content = page.revisions[0]['*'];
 
            var contentArray = content.split("+");
 
            averageArray = [];
            $(contentArray).each(function (index, value) {
                var averageRatingItem = contentArray[index];
 
                var averageRatingEachExp = new RegExp('\:\<\/noinclude\>[0-9]+', 'm');
                var averageRatingEach = averageRatingItem.match(averageRatingEachExp)[0].replace(':</noinclude>', '');
 
                averageArray.push(parseInt(averageRatingEach));
 
                if (contentArray[index].indexOf(userIP) > -1) {
                    var ratingArrayItem = contentArray[index];
 
                    var ratingRegExp = new RegExp('\:\<\/noinclude\>[0-9]+', 'm');
                    ratingFinal = ratingArrayItem.match(ratingRegExp)[0].replace(':</noinclude>', '');
 
                    $('.rating-total').attr('data-rating', ratingFinal);
 
                    $('.rating').each(function () {
                        var currentRatingEach = parseInt($(this).attr('id').split("-")[1]);
                        if (currentRatingEach <= ratingFinal) {
                            $(this).addClass('rating-active');
                        }
                        saveRating = true;
                    });
                }
            });
            sumRating = 0;
            for (var x = 0; x < averageArray.length; x++) {
                sumRating = sumRating + averageArray[x];
            }
 
            averageRating = sumRating / averageArray.length;
 
            var averageRatingClappers = Math.round(averageRating);
            $('.rating-average').each(function () {
                var currentAverageRatingEach = parseInt($(this).attr('id').split("-")[1]);
                if (currentAverageRatingEach <= averageRatingClappers) {
                    $(this).addClass('rating-average-active');
                }
				$('.rating-people').text(averageArray.length);
            });
 
            $('.rating-average').attr('data-amount', averageArray.length);
        }
    });
}

/* ArchiveBoards */
window.ArchiveBoards = {
    boards: ["Sous-forum:Billet de blog du mois"],
    style: "width: 100%;text-align: center;border: 2px solid #f66;background-color: whitesmoke;margin: 0.8em 0px;padding: 0.5em 12px;color: black;",
    boardNotice: "Désolé, vous ne pouvez pas créer une nouvelle discussion dans ce sous-forum.",
    threadNotice: "Désolé, vous ne pouvez pas répondre à cette discussion."
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:ReferencePopups/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:UserTags/code.js',
        'MediaWiki:Chat-headline',
        'u:dev:WikiaNotification/code.js',
        'u:dev:PageRenameAuto-update/code.js',
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
        'u:dev:MediaWiki:ArchiveBoards/code.js'

    ]
});