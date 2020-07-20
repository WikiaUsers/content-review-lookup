/* Any JavaScript here will be loaded for all users on every page load. */

//Wertung
if (wgPageName.substr(0,8) == "Wertung:") $("#mw-content-text").html("<font color='red'>Du hast hier nichts zu suchen, du Lump!</font>"); 
//Blog Beiträge
if (wgPageName=="Spezial:Blog-Beitrag_erstellen") {
$(document).ready(function() {
	$("#HiddenFieldsDialog .modalContent .modalToolbar").prepend(
		$("<div>",{html: "Wichtig:<br/>Verwende Blogbeiträge nur falls du etwas <b>wichtiges</b> bekannt geben willst. Alles andere wird gelöscht.<br/>Verwende stattdessen bitte das <a href=\"/wiki/Spezial:Forum\" style=\"position: relative;left: -10px;\" target=\"_blank\">Forum</a><br/>"})
		.css({color: "rgb(255,0,255)",fontSize: "20pt",lineHeight: "25pt",textAlign: "left"})
	);
});
}

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Copied from [[w:c:Community:MediaWiki:Common.js]] on 3-Sep-2010
 */
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit )
		return;
	if(!document.getElementById('old-forum-warning') ||
		 !document.getElementById('ca-edit') )
		return;
 
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}
 
/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* NSFW Warning */
 
/*
if (wgCategories.indexOf("NSFW") != -1) {
    $("#WikiaArticle").fadeOut(0);
    $("#WikiaArticleComments").fadeOut(0);
    importScriptNC("MediaWiki:Warning.js");
}
*/

SpoilerAlert = {
    question: 'Diese Seite enthält Inhalte, die auf normale Menschen verstörend wirken könnten, und ist NICHT für alle Altersgruppen geeignet. Möchtest du das wirklich sehen?',
    yes: 'Ja (Wir haben dich gewarnt...)',
    no: 'Nein (empfohlen)',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('NSFW');
    }
};

importScriptPage('SpoilerAlert/code.js', 'dev');

// PdM
$.each(wgCategories, function( index, value ) {
if(value.indexOf('Creepypasta des Monats')>-1) {
    $( ".mw-content-ltr" ).before( '<table cellspacing="8" cellpadding="0" style="background-color:black; width:100%; font-size:95%; border-color:#ff0; border-style:solid; margin-top:1em; clear:both; position:relative;"><tr><td style="vertical-align:top; text-align:center;"> Diese Geschichte ist für die Wahl zur <b>' + value +'</b> nominiert (mehr Informationen findest Du <a href="http://de.creepypasta.wikia.com/wiki/Pasta_des_Monats">hier</a>)</td></tr></table><br/><br/>' );}
});

/*
//Adventskalender
$( "area[href='/wiki/Ankunft']" ).remove();


//JS Erforderlich
$(".jsRequired").remove();

if (wgPageName == "Spotlight") importScriptNC("MediaWiki:Spotlight.js");
*/

/* Rating function */
/* Partially from http://runescape.wikia.com/wiki/User:Quarenon/gemwupdate.js */
addOnloadHook(function () {
    if ($.inArray("Bewertete Creepypasta", wgCategories) > -1) {
        var pageName = 'Wertung:' + wgPageName;
        disableEdit = false;
        var symbolInactive = new Image();
        symbolInactive.src = 'http://static3.wikia.nocookie.net/bossosbastelbude/de/images/9/9c/WertungsKuerbisInaktiv.png';
        var symbolActive = new Image();
        symbolActive.src = 'http://static1.wikia.nocookie.net/bossosbastelbude/de/images/0/04/WertungsKuerbisAktiv.png';
 
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
        saveRating = true;
        actualRating = parseInt($(this).attr('id').split("-")[1]);
 
        if (!wgUserName) {
            $.getJSON("http://smart-ip.net/geoip-json?callback=?", function (data) {}).done(function (data) {;
                var userIP = data.host;
                var pageName = 'Wertung:' + wgPageName;
 
                var contentText = '<noinclude>' + userIP + ':</noinclude>' + actualRating;
 
                if (disableEdit == false) {
                    submitReview(pageName, contentText, userIP, actualRating);
                }
            });
        } else {
            var userIP = wgUserName;
            var pageName = 'Wertung:' + wgPageName;
 
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
                'summary': 'Automatische Aktualisierung der Bewertung',
                'action': 'edit',
                'title': reviewPageName,
                'startimestamp': page.starttimestamp,
                'token': page.edittoken,
				'watchlist': 'unwatch',
                'text': content
            }, 'POST', function (response) {
                if (response.edit.result == 'Success') {
 
                    averageArray = [];
                    var averageRatingSymbols = Math.round(rating);
                    $('.rating-average').each(function () {
                        var currentAverageRatingEach = parseInt($(this).attr('id').split("-")[1]);
                        if (currentAverageRatingEach <= averageRatingSymbols) {
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
                'summary': 'Automatische Aktualisierung der Bewertung',
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
 
                    var averageRatingSymbols = Math.round(averageRatingNew);
                    $('.rating-average').attr('class', 'rating-average');
                    $('.rating-average').each(function () {
                        var currentAverageRatingEach = parseInt($(this).attr('id').split("-")[1]);
                        if (currentAverageRatingEach <= averageRatingSymbols) {
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
 
            var averageRatingSymbols = Math.round(averageRating);
            $('.rating-average').each(function () {
                var currentAverageRatingEach = parseInt($(this).attr('id').split("-")[1]);
                if (currentAverageRatingEach <= averageRatingSymbols) {
                    $(this).addClass('rating-average-active');
                }
				$('.rating-people').text(averageArray.length);
            });
 
            $('.rating-average').attr('data-amount', averageArray.length);
        }
    });
}
 
/* End rating function */