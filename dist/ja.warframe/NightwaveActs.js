// API を使用してアクティブな Nightwave アクトの表示を自動化
// For use in Warframe Wikia, particularly in the following page:
// https://warframe.fandom.com/ja/wiki/Nightwave/Acts_Currently_Available
// Created by User:Cephalon Scientia
// Made in JavaScript + jQuery 3.3.1
 
// 注意：WikiaのJSパーサーは文字列補間をサポートしていないので、キーワードを入れておきましょう。
//       または矢印関数
 
/* Cephalon Scientia Nightwave Current Acts */
importArticles({
    type: 'script',
    articles: [
        'u:warframe:MediaWiki:Countdown.js',
    ]
});
 
const WIKI_IMG_URL = 'https://vignette.wikia.nocookie.net/warframe/images/';
const API_URL = 'https://api.warframestat.us/pc/nightwave';     // all platforms have the same Nightwave acts
const REP_IMG_URL = WIKI_IMG_URL + '9/92/ReputationLargeBlack.png/revision/latest/scale-to-width-down/20?cb=20141029201703';   // scaled down image
const IMG_MAP_URL = 'https://warframe.fandom.com/api.php?action=parse&page=Module:NightwaveActs&format=json';     // contains json map to be fetched
 
const ActTypeEnum = {
    'DAILY': 1,
    'WEEKLY': 2,
    'ELITE': 3
};
// Object.freeze(ActTypeEnum); // for immutability, but Wikia's parser doesn't recognize this function
 
// Fetching act image maps from a page outside of MediaWiki namespace
// so won't have to update this code everytime new Nightwave acts are added
// or if they need to be modified
 
var jsonImgMap;
 
fetch(IMG_MAP_URL)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    // Type string, getting what's in code block in page
    jsonImgMap = data.parse.text['*'];
    // Actual data is encapsulated between two block comment symbols in Lua
    jsonImgMap = jsonImgMap.substring(
        jsonImgMap.indexOf('--[[') + 4, jsonImgMap.indexOf(']]--')
    );
    // Removing any trace <p> or <pre> tags so string can be converted to JSON
    jsonImgMap = jsonImgMap.replace(/(<.+>)/g, '');
    jsonImgMap = JSON.parse(jsonImgMap);
    // console.log(jsonImgMap);
});
 
$(document).ready(function() {
  // These ids will be on Template:NightwaveActs page
  var $resultDaily = $(document.getElementById('nightwave_daily'));
  var $resultWeekly = $(document.getElementById('nightwave_weekly'));
  var $resultElite = $(document.getElementById('nightwave_elite'));
 
  // Adding starting div tags for each span element within tabber element
  $resultDaily.append($([
    '<div class="daily">'
  ].join('\n')).prop('outerHTML'));
  $resultWeekly.append($([
    '<div class="weekly">'
  ].join('\n')).prop('outerHTML'));
  $resultElite.append($([
    '<div class="elite">'
  ].join('\n')).prop('outerHTML'));
 
  // Using Fetch API to get JSON on current Nightwave acts
  fetch(API_URL)
    .then(function(response) {
      return response.json();
    }) // response is a Body object
    .then(function(data) {
      // Work with data here
      data.activeChallenges.forEach(function(actJSON) {
        var actType;
        var actImgURL;
        var tabIDAttr;
        var rowIDAttr;
        var classAttr;
 
        if (actJSON.isDaily) {
          actType = ActTypeEnum.DAILY;
        } else if (!actJSON.isElite) {
          actType = ActTypeEnum.WEEKLY;
        } else {
          actType = ActTypeEnum.ELITE;
        }
 
        // Initializing tabIDAttr, rowIDAttr, classAttr, and actImgURL
        switch (actType) {
          case ActTypeEnum.DAILY:
            tabIDAttr = 'nightwave_daily';
            rowIDAttr = 'daily_acts';
            classAttr = 'daily';
            actImgURL = WIKI_IMG_URL + jsonImgMap.daily[actJSON.title];
            break;
 
          case ActTypeEnum.WEEKLY:
            tabIDAttr = 'nightwave_weekly';
            rowIDAttr = 'weekly_acts';
            classAttr = 'weekly';
            actImgURL = WIKI_IMG_URL + jsonImgMap.weekly[actJSON.title];
            break;
 
          case ActTypeEnum.ELITE:
            tabIDAttr = 'nightwave_elite';
            rowIDAttr = 'elite_acts';
            classAttr = 'elite';
            actImgURL = WIKI_IMG_URL + jsonImgMap.elite[actJSON.title];
            break;
        }
 
        // Adding table
        // Add table if a div element with id associated with act type is not found
        // One table per act type
        if ($(document.getElementById(tabIDAttr)).find('#' + rowIDAttr).length === 0) {
          $(document.getElementById(tabIDAttr)).find('.' + classAttr).append($('<div>', {
            id: rowIDAttr,
            append: [
              $('<p>'),
              $('<table>', {
                class: 'emodtable',
                style: 'width:100%;',
                append: [
                  $('<tbody>', {
                    append: [
                      $('<tr>', {
                        append: [
                          $('<th>').text('Icon'),
                          $('<th>').text('Description'),
                          $('<th>').text('Reward'),
                          (actType === ActTypeEnum.DAILY) ? $('<th>').text('End Time') : null,
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }));
        }
 
        // Adding table rows
        $(document.getElementById(tabIDAttr)).find('#' + rowIDAttr).find('.emodtable').append($('<tr>', {
          append: [
            $('<td>', {
              append: [
                $('<div>', {
                  class: 'center floatnone',
                  append: [
                    $('<a>', {
                      href: actImgURL,
                      class: 'image image-thumbnail',
                      append: [
                        $('<img>', {
                          src: actImgURL,
                          width: '75',
                          height: '75',
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            $('<td>', {
              append: [
                $('<b>').text(actJSON.title),
                $('<br>'),
                $('<i>').text(actJSON.desc)
              ]
            }),
            $('<td>', {
              append: [
                $('<span>', {
                  style: 'display:none',
                  class: 'sortkey',
                }).text(actJSON.reputation),
                $('<a>', {
                  href: '/wiki/Syndicates',
                  class: 'image image-thumbnail link-internal',
                  title: 'Syndicates',
                  append: [
                    $('<img>', {
                      src: REP_IMG_URL,
                      width: '20',
                      height: '20',
                    })
                  ]
                }),
                $('<b>').text(actJSON.reputation.toLocaleString())
              ]
            }),
            (actType !== ActTypeEnum.DAILY) ? null : $('<td>').append($('<div>', {
			    align: 'center',
			    append: [
					$('<strong>', {
						append: [
							$('<span>', {
								class: 'customcountdown',
								style: 'font-size:14px; display:visible;',
								append: [
									$('<span>', { style: 'display:visible;', class: 'bText' }).text(''),
									$('<span>', { style: 'display:none;', class: 'bDelayText' }).text(''),
									$('<span>', { class: 'years' }),
									$('<span>', { class: 'months' }),
									$('<span>', { class: 'days' }),
									$('<span>', { class: 'hours' }),
									$('<span>', { class: 'minutes' }),
									$('<span>', { class: 'seconds' }),
									$('<span>', { style: 'display:visible;', class: 'aText' }).text(''),
									$('<span>', { style: 'display:none;', class: 'aDelayText' }).text(''),
									$('<span>', { style: 'display:none;', class: 'seedDate' }).text(parseISOString(actJSON.expiry)),
									$('<span>', { style: 'display:none;', class: 'loopTime' }).text('3'),
									$('<span>', { style: 'display:none;', class: 'loopTimeUnit' }).text('D'),
									$('<span>', { style: 'display:none;', class: 'loopLimit' }).text('1'),
									$('<span>', { style: 'display:none;', class: 'endText' }).text('Expired'),
									$('<span>', { style: 'display:none;', class: 'delayTime' }).text(''),
									$('<span>', { style: 'display:none;', class: 'delayTimeUnit' }).text(''),
									$('<span>', { style: 'display:none;', class: 'delayCountDisplay' }).text(''),
									$('<span>', { style: 'display:none;', class: 'dst' }).text('t'),
									$('<span>', { style: 'display:none;', class: 'dateFormat' }).text('D hh mm ss'),
									$('<span>', { style: 'display:none;', class: 'dateLabels' }).text('single'),
									$('<span>', { style: 'display:none;', class: 'separators' }).text(' '),
								]})
						]})
				]}))
          ]
        }));
      });
    });
});
 
// Assume s is in ISO Date format
// Returns a string in the format of 'February 27, 2019 00:00:00 UTC'
function parseISOString(s) {
  var b = s.split(/\D+/);
  var d = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",  "November", "December"];
  return month[d.getMonth()] + ' ' + b[2] + ', ' + b[0] + ' ' + b[3] + ':' + b[4] + ':' + b[5] + ' UTC';
}
/* END Cephalon Scientia Nightwave Current Acts */