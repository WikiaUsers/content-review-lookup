/**
 * @name        FeaturedArticleContestWidget
 * @description This script creates a configurable module in Rail that shows the current results of Featured Article Contest. Created special for Axong Wiki.
 * @author      Kofirs2634
 * @version     1.2.1
 * @docs        [[w:c:ru.koffee:Featured Article Contest Widget]]
 */
$(function($) {
    if (window.FACWReady || !$('#WikiaRail').length || window.FACWDisable) return;
    window.FACWReady = true;
    var path = mw.config.get('wgArticlePath');

    $.get(mw.util.wikiScript(), { action: 'raw', title: 'MediaWiki:Custom-FACW' }, function(data) {
        if (data.length) {
            var dataArray = data.split('\n'),
                percent = [], nominees = [], rates = [],
                totalRate = 0;
            if (dataArray[3] == 'true') {
                $('#WikiaRail').prepend($('<section>', {
                    'class': 'rail-module',
                    id: 'featured-voting'
                }));
                $('#featured-voting').append($('<h2>', { text: dataArray[1] }))
                .append($('<div>', { id: 'ratings' }))
                .append(dataArray[2].replace('$1', path.replace('$1', 'Thread:' + dataArray[4])));

                for (i = 5; i < dataArray.length; i++) {
                    nominees[i - 5] = dataArray[i].split(':')[0],
                    rates[i - 5] = dataArray[i].split(':')[1].replace(/\s+/g, '')
                }
                rates.forEach(function(e) { totalRate += parseInt(e) })
                nominees.forEach(function(e, n) {
                    if (!totalRate) percent[n] = 0
                    else percent[n] = Math.round(rates[n] / totalRate * 100);
                    $('#ratings').append($('<div>', { 'class': 'featured-article' })
                        .append('<h3><a href="' + path.replace('$1', e) + '">' + e + '</a></h3>')
                        .append($('<div>', { 'class': 'rate-bar-box' }).append($('<span>', {
                            'class': 'rate-text',
                            text: percent[n] + '%, ' + rates[n] + ' очков'
                        })).append($('<div>', {
                            'class': 'rate-bar',
                            style: 'width: ' + percent[n] + '%'
                        }))))
                })
                console.log('Featured Article Contest Widget is online!')
            } else console.log('Widget is inactive!')
        } else console.error('There aren\'t any settings for widget!')
    })
})