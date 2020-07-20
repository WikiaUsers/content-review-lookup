importArticles({type: 'script',
    articles: [
        'u:dev:View_Source/code.js',
        'MediaWiki:Common.js/DrTerror.js',
        'w:c:clashofclans:MediaWiki:Common.js/Experience.js',
        'w:c:clashofclans:MediaWiki:Common.js/Usernames.js',
        'w:c:clashofclans:MediaWiki:Common.js/TroopInfo.js',
        'w:c:clashofclans:MediaWiki:Common.js/BuildingInfo.js',
        'w:c:de.clashofclanstest:MediaWiki:Common.js/AttackStrategies.js',
        'u:dev:AjaxRC/code.js'
    ]
});

/* Rating function */
/* Partially from http://runescape.wikia.com/wiki/User:Quarenon/gemwupdate.js */
addOnloadHook(function () {
    if ($.inArray("Angriffsstrategie", wgCategories) > -1) {
        var pageName = 'Wertung:' + wgPageName;
        disableEdit = false;
        var clapperInactive = new Image();
        clapperInactive.src = 'https://images.wikia.nocookie.net/__cb20140703164828/20m61/de/images/thumb/6/6d/Checkbox_aus.png/18px-Checkbox_aus.png';
        var clapperActive = new Image();
        clapperActive.src = 'https://images.wikia.nocookie.net/__cb20140703164815/20m61/de/images/thumb/a/a2/Checkbox_an.png/18px-Checkbox_an.png';
 
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

window.LockForums = {
    expiryDays: 7,
    expiryMessage: "Dieses Forum wurde archiviert, da die Letzte Antwort über <expiryDays> Tag her ist. Bitte antworte nicht mehr.",
    forumName: "Forum Board" 
};
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockForums/code.js"
    ]
});

importArticles({
    type: "script",
    articles: [
        "u:dev:RecentChangesMultiple/code.js"
    ]
});