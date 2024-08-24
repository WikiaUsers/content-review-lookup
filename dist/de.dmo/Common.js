/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
 
 // Import [[MediaWiki:Onlyifuploading.js]] 
 
importScriptPage('ShowHide/code.js', 'dev');
 
var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};
 
/* Rating function */
/* Partially from http://runescape.wikia.com/wiki/User:Quarenon/gemwupdate.js 
and http://de.moviepedia.wikia.com/wiki/Moviepedia_Wiki
http://de.disneyfairies.wikia.com/wiki/MediaWiki:Common.js*/
addOnloadHook(function () {
    if ($.inArray("Film", wgCategories) > -1) {
        var pageName = 'Wertung:' + wgPageName;
        disableEdit = false;
        var clapperInactive = new Image();
        clapperInactive.src = 'https://images.wikia.nocookie.net/moviepedia/de/images/d/d5/Clap-cinema_hell_small.png';
        var clapperActive = new Image();
        clapperActive.src = 'https://images.wikia.nocookie.net/moviepedia/de/images/c/c5/Clap_Cinema_small.png';
 
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
 
/* Test Tooltip */
waitForImages = true
tooltipClasses = { 
'Tooltip-Skill': ['{'+'{Tooltip/Skill/','}}'],
'Tooltip-Test': ['{'+'{Tooltip/Test/','}}'], 
} 
 
importArticles({
    type: 'script',
    articles: [
        "w:c:nanaki:Tooltips/code.js",
    ]
});
 
/* Aktiviert Countdown */
/* von http://de.community.wikia.com/wiki/Forum:Countdown */
 
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
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
 
  // calcuate the diff
  var left = (diff%60) + ' Sek';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' Min ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' Std ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' T ' + left
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
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************