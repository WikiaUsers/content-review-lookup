// ==========================================================================
// Deck Ratings
//    1. Supports the rating 'stars' on deck pages
//    2. Updates the rating column on deck tables
// Version 1.3.1
// Author: Aspallar
//
// ** Please do not edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
// This code was inspired by the rating system used on https://de.sonic.fandom.com
// <nowiki>
(function ($) {
    /* global mw */
    'use strict';

    if ((document.getElementById('mdw-rating') === null && $('.mdw-ratingtable').length === 0) ||
         $('#mdw-disabled-js').attr('data-ratings-1-3-1'))
        return;

    var ratingsDataPageName = 'Ratings:DeckRatings';

    function error(error) {
        console.error(error);
        $('#mdw-rating').html('Error').addClass('mdw-error');
    }

    function ajaxError(status) {
        error('Ajax error: ' + status);
    }

    function stripDeckPrefix(deckName) {
        return deckName.substring(0, 6) === 'Decks/' ? deckName.substring(6) : deckName;
    }

    function deckName() {
        return stripDeckPrefix(mw.config.get('wgTitle'));
    }

    function validRating(rating) {
        return typeof rating === 'object' &&
            typeof rating.votes === 'number' &&
            rating.votes !== 0 &&
            typeof rating.total === 'number';
    }

    function calcScore(rating) {
        return validRating(rating) ? Math.round(rating.total / rating.votes) : 0;
    }

    function findRating(name, ratingData) {
        for (var k = 0, l = ratingData.length; k < l; k++) {
            if (ratingData[k].name === name)
                return ratingData[k];
        }
        return null;
    }

    function getRating(name, ratingData) {
        var rating = findRating(name, ratingData);
        if (rating === null) {
            rating = {name:name, total:0, votes:0};
            ratingData.push(rating);
        }
        return rating;
    }

    function updateRatingUiValue(rating) {
        $('.mdw-rating-score').each(function () {
            var ratingStar = $(this);
            if (rating >= parseInt(ratingStar.attr('data-rating'), 10))
                ratingStar.addClass('mdw-rating-active');
            else
                ratingStar.removeClass('mdw-rating-active');
        });
    }

    function getDataFromPage(page) {
        var data = [];
        try {
            data = JSON.parse(page.revisions[0]['*']);
        } catch (e) {
            error('Ratings data error: ' + e);
        }
        return data;
    }

    function fetchRatingPage(api) {
        var deferred = $.Deferred();
        api.get({
            action: 'query',
            prop: 'info|revisions',
            intoken: 'edit',
            titles: ratingsDataPageName,
            rvprop: 'content|timestamp',
            rvlimit: '1'
        }).then(function (response){
            deferred.resolve(Object.values(response.query.pages)[0]);
        }).fail(function (_, status) {
            ajaxError(status);
        });
        return deferred.promise();
    }

    function fetchRatingData(cbDone) {
        fetchRatingPage(new mw.Api()).then(function (page) {
            var data = getDataFromPage(page) || [];
            cbDone(data);
        });
    }

    function addScore(rating, score) {
        rating.total += score;
        ++rating.votes;
    }

    function updateRating(deckName, score) {
        var api = new mw.Api();
        fetchRatingPage(api).done(function (page) {
            var data = getDataFromPage(page);
            if (data === null)
                return; 
            var rating = getRating(deckName, data);
            addScore(rating, score);
            var newContent = JSON.stringify(data, null, 1);
            updateRatingUiValue(calcScore(rating));
            api.post({
                minor: '1',
                summary: 'Rating for [[Decks/' + deckName + '|' + deckName + ']] (' + score + ')',
                action: 'edit',
                title: ratingsDataPageName,
                basetimestamp: page.revisions[0].timestamp,
                startimestamp: page.starttimestamp,
                watchlist: 'nochange',
                text: newContent,
                token: page.edittoken
            }).done(function (response){
                if (response.edit.result !== 'Success')
                    error('Update fail in updateRating: ' + response.edit.result);
                else
                    $('#mdw-rating').html('Voted.');
            }).fail(function (_, status) {
                ajaxError(status);
            });
        });
    }

    function onRatingMouseEnter() {
        /* jshint -W040 */ // allow old school jquery use of this
        var rating = parseInt($(this).attr('data-rating'), 10);
        $('.mdw-rating').each(function () {
            var voteStar = $(this);
            var voteStarRating = parseInt(voteStar.attr('data-rating'), 10);
            if (voteStarRating <= rating) {
                voteStar.addClass('mdw-rating-active');
            }
        });
    }

    function onRatingMouseLeave() {
        $('.mdw-rating').removeClass('mdw-rating-active');
    }

    function onRatingClick() {
        /* jshint -W040 */ // allow old school jquery use of this
        var rating = parseInt($(this).attr('data-rating'), 10);
        $('#mdw-rating').html($('<img>', {
            src: mw.config.get('stylepath') + '/common/images/ajax.gif'
        }));
        updateRating(deckName(), rating);
    }

    function initializeRating() {
        fetchRatingData(function (data) {
            var rating = findRating(deckName(), data);
            if (rating !== null)
                updateRatingUiValue(calcScore(rating));
        });
    }

    function wireUpEvents() {
        $('.mdw-rating')
            .mouseenter(onRatingMouseEnter)
            .mouseleave(onRatingMouseLeave)
            .click(onRatingClick);
    }

    function addDataRatingAttributes(selector) {
        $(selector).each(function (index, element) {
            $(element).attr('data-rating', index + 1);
        });
    }

    function addAllDataRatingAttributes() {
        addDataRatingAttributes('.mdw-rating-score');
        addDataRatingAttributes('.mdw-rating');
    }

    function getDeckNames(table) {
        var names = [];
        table.find('td:nth-child(' + table.attr('data-deckcol') + ') a').each(function () {
            // xA0 (160 decimal) is the non-breaking space char, the wikitext parser sometimes 
            // uses &nbsp; instead of a normal space, we need to change them back to spaces
            names.push(stripDeckPrefix($(this).attr('title')).replace(/\xA0/g, ' '));
        });
        return names;
    }

    function validateRatingsTable(table) {
        var digits = /^\d+$/;
        var messages = ['The following mdw-ratingtable contains errors.'];
        var attr = table.attr('data-deckcol');
        if (attr === undefined)
            messages.push('Missing data-deckcol attribute.');
        else if (!digits.test(attr))
            messages.push('Invalid data-deckcol attribute, value must be an integer.');
        attr = table.attr('data-ratingcol');
        if (attr === undefined)
            messages.push('Missing data-ratingcol attribute.');
        else if (!digits.test(attr))
            messages.push('Invalid data-ratingcol attribute, value must be an integer.');
        return messages.length === 1 ? null : messages.join(' ');
    }

    function updateRatingColumn() {
        fetchRatingData(function (data) {
            $('.mdw-ratingtable').each(function () {
                var table = $(this);
                var deckRow = 0;
                var errors = validateRatingsTable(table);
                if (errors === null) {
                    var deckNames = getDeckNames(table);
                    table.find('td:nth-child(' + table.attr('data-ratingcol') + ')').each(function () {
                        var rating = findRating(deckNames[deckRow++], data);
                        if (rating !== null)
                            $(this).text(calcScore(rating));
                    });
                } else {
                    table.before($('<p class="mdw-error">').text(errors));
                }
            });
        });
    }

    function initializeStars() {
        addAllDataRatingAttributes();
        wireUpEvents();
        initializeRating();
    }

    $(function () {
        mw.loader.using('mediawiki.api').then(function() {
            if (document.getElementById('mdw-rating') !== null) {
                // we are on a deck page with rating
                initializeStars();
            } else {
                // we are on a page with a ratings table
                updateRatingColumn();
            }
        });
    });

}(jQuery));