'use strict';
/* eslint-disable no-invalid-this */
/**
 * <nowiki>
 * Dashboard for Global Discussions Moderators
 * @see https://github.com/kcnotes/GDMDashboard/blob/master/fandom_loaded/gdmdashboard.ts
 * @author Noreplyz
 *
 * Hello JS Reviewer! To help you on your quest for secure scripts: this code is most easily viewed in Typescript via
 * the link above. This script takes in content from wiki pages and relies on Mustache and Chart.js to check and render
 * content safely to mitigate security risks.
 */
var __assign = (this && this.__assign) || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
    to[j] = from[i];
  return to;
};
(function(window, $, mw) {
  if ('GDMDashboardLoaded' in window)
    return;
  if ($('#gdm-dashboard').length === 0 && $('#gdm-dashboard-summary').length === 0)
    return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.GDMDashboardLoaded = true;
  var isDarkMode = document.body.classList.contains('theme-fandomdesktop-dark');
  var defaultChartOptions = {
    legend: {
      labels: {
        boxWidth: 12,
        fontColor: isDarkMode ? '#FFF' : '#000',
      },
    },
  };
  var pages = {
    summary: 'Data:Overview/summary',
    counts: 'Data:Overview/counts',
    wr: 'Data:Overview/wr',
    gdm: 'Data:Overview/discussions',
    ignore: 'Data:Dashboard/ignore',
  };
  var schema = [
    'wikiId',
    'domain',
    'sitename',
    'lang',
    'vertical',
    'wikiRepresentative',
    'articleComment',
    'forum',
    'wall',
    'lastReported',
  ];
  var summarySchema = [
    'lang',
    'vertical',
    'articleComment',
    'forum',
    'wall',
    'wikis',
  ];
  var countSchema = [ 'articleComment', 'forum', 'wall', 'wikis' ];
  var colors = [
    '#520045',
    '#83004e',
    '#be0055',
    '#f9005b',
    '#fc632e',
    '#fec600',
    '#c2cf6e',
    '#86d7db',
    '#bfe2db',
    '#f8eddb',
  ];
  var getPage = function(page) {
    var data = {
      action: 'query',
      prop: 'revisions',
      titles: page,
      rvprop: 'content',
      cb: Math.random().toString(),
      format: 'json',
    };
    return fetch('/api.php?' + new URLSearchParams(data).toString())
      .then(function(resp) {
        return resp.json();
      })
      .then(function(data) {
        if (!data.query || !data.query.pages) {
          console.warn('Could not get page ' + page);
          return null;
        }
        for (var pageid in data.query.pages) {
          if (!data.query.pages[pageid] ||
                        !data.query.pages[pageid].revisions ||
                        !data.query.pages[pageid].revisions.length) {
            console.warn('Could not get page ' + page);
            return null;
          }
          return data.query.pages[pageid].revisions[0]['*'];
        }
        return null;
      });
  };
  var getPageWithHistory = function(page) {
    var data = {
      action: 'query',
      prop: 'revisions',
      titles: page,
      rvprop: 'timestamp|content',
      cb: Math.random().toString(),
      rvlimit: '90',
      format: 'json',
    };
    return fetch('/api.php?' + new URLSearchParams(data).toString())
      .then(function(resp) {
        return resp.json();
      })
      .then(function(data) {
        if (!data.query || !data.query.pages) {
          console.warn('Could not get page ' + page);
          return null;
        }
        for (var pageid in data.query.pages) {
          if (!data.query.pages[pageid] ||
                        !data.query.pages[pageid].revisions ||
                        !data.query.pages[pageid].revisions.length) {
            console.warn('Could not get page ' + page);
            return null;
          }
          return data.query.pages[pageid].revisions.map(function(rev) {
            return ({
              timestamp: rev.timestamp,
              data: rev['*'],
            });
          });
        }
        return null;
      });
  };
  var getUserDetails = function(ids) {
    return fetch('https://services.fandom.com/user-attribute/user/bulk?id=' + ids.join('&id='))
      .then(function(resp) {
        return resp.json();
      });
  };
  var convertCountSchema = function(data) {
    var entries = data.map(function(entry) {
      return ({
        timestamp: entry.timestamp,
        data: parseFields(entry.data)[0],
      });
    });
    return entries.map(function(entry) {
      if (entry.data.length != countSchema.length) {
        console.log(entry.data, countSchema);
        throw new Error('Counts data does not match schema');
      }
      return {
        timestamp: new Date(entry.timestamp),
        data: {
          articleComment: Number(entry.data[0]),
          forum: Number(entry.data[1]),
          wall: Number(entry.data[2]),
          wikis: Number(entry.data[3]),
        },
      };
    });
  };
  var convertSummarySchema = function(data) {
    if (data.length != summarySchema.length) {
      throw new Error('Summary data does not match schema');
    }
    return {
      lang: data[0],
      vertical: data[1],
      articleComment: Number(data[2]),
      forum: Number(data[3]),
      wall: Number(data[4]),
      wikis: Number(data[5]),
    };
  };
  var convertWikiSchema = function(data) {
    if (data.length != schema.length) {
      throw new Error('Summary data does not match schema');
    }
    return {
      wikiId: Number(data[0]),
      domain: data[1],
      sitename: data[2],
      lang: data[3],
      vertical: data[4],
      wikiRepresentative: Number(data[5]),
      articleComment: Number(data[6]),
      forum: Number(data[7]),
      wall: Number(data[8]),
      lastReported: new Date(data[9]),
    };
  };
  var parseFields = function(data) {
    return data
      .split('\n')
      .filter(function(line) {
        return line.startsWith('*');
      }) // Ignore category
      .map(function(line) {
        return line.slice(1).split('|');
      }); // Get fields
  };
    // Tracked state
  var filterStates = {
    wr: '',
    lang: '',
    vertical: '',
    sortby: 'forum',
    page: 1,
    limit: 10,
  };
  var previous = __assign({}, filterStates);
  var renderTable = function(wikiReports, userMap, filter, onPageChange) {
    var wr = filter.wr,
      vertical = filter.vertical,
      lang = filter.lang,
      page = filter.page,
      limit = filter.limit;
    // Filter and render
    var reports = wikiReports
      .filter(function(w) {
        return wr === '' || w.wikiRepresentative.toString() === userMap[wr];
      })
      .filter(function(w) {
        return vertical === '' || w.vertical === vertical;
      })
      .filter(function(w) {
        return lang === '' || w.lang === lang;
      })
      .sort(function(a, b) {
        switch (filter.sortby) {
        case 'forum':
          return b.forum - a.forum;
        case 'wall':
          return b.wall - a.wall;
        case 'articleComment':
          return b.articleComment - a.articleComment;
        case 'domain':
          return a.domain.localeCompare(b.domain);
        }
      });
    var table = '\n    <table class="article-table gdmd-report-results">\n      <thead>\n        <th>Wiki</th>\n        <th>Language</th>\n        <th>Vertical</th>\n        <th>WR</th>\n        <th>Posts</th>\n        <th>Messages</th>\n        <th>Comments</th>\n      </thead>\n      <tbody>\n        {{#wikis}}\n          <tr>\n            <td><a href="https://{{domain}}/f" target="_blank">{{sitename}}</a> (<a href="//{{domain}}/Special:ListUsers/sysop" target="_blank">a</a>, <a href="//{{domain}}/Special:ListUsers/threadmoderator" target="_blank">m</a>)</td>\n            <td>{{lang}}</td>\n            <td>{{vertical}}</td>\n            <td>{{wrUsername}}</td>\n            <td><a href="https://{{domain}}/f/reported?type=posts" target="_blank">{{forum}}</a></td>\n            <td><a href="https://{{domain}}/f/reported?type=messages" target="_blank">{{wall}}</a></td>\n            <td><a href="https://{{domain}}/f/reported?type=comments" target="_blank">{{articleComment}}</a></td>\n          </tr>\n        {{/wikis}}\n      </tbody>\n    </table>\n    ';
    var paginatedReports = reports.slice((page - 1) * limit, page * limit);
    $('#gdmd-report-table')
      .empty()
      .append(Mustache.render(table, {
        wikis: paginatedReports,
      }));
    $('#gdmd-report-table').append($('<div class="gdmd-pagination">').append(renderPageCounts(Math.ceil(reports.length / limit), filter.page, onPageChange).$element));
  };
  var memoRenderTable = function(wikiReports, userMap, filter, onPageChange) {
    if (filter.limit !== previous.limit ||
            filter.page !== previous.page ||
            filter.sortby !== previous.sortby ||
            filter.vertical !== previous.vertical ||
            filter.lang !== previous.lang ||
            filter.wr !== previous.wr) {
      previous = __assign({}, filter);
      return renderTable(wikiReports, userMap, filter, onPageChange);
    }
  };
  var renderPageCounts = function(pages, currentPage, onClick) {
    var pageCounts = Array.from({
      length: pages,
    }, function(_, i) {
      return '' + (i + 1);
    });
    if (pages > 7) {
      if (currentPage < 4) {
        pageCounts = pageCounts.splice(0, 7);
      } else if (currentPage > pages - 4) {
        pageCounts = pageCounts.splice(pages - 7, pages - 1);
      } else {
        pageCounts = [
          currentPage - 3,
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          currentPage + 3,
        ].map(function(p) {
          return p.toString();
        });
      }
      pageCounts = __spreadArray(__spreadArray(['first'], pageCounts), ['last']);
    }
    var pagination = new OO.ui.ButtonGroupWidget({
      items: pageCounts.map(function(i) {
        var button = new OO.ui.ButtonWidget({
          label: [ 'first', 'last' ].includes(i) ? undefined : '' + i,
          icon: [ 'first', 'last' ].includes(i) ? i : undefined,
          flags: i === currentPage.toString() ? ['primary'] : [],
        });
        button.on('click', function() {
          if (i === 'first') {
            return onClick(1);
          } else if (i === 'last') {
            return onClick(pages);
          }
          onClick(Number(i));
        });
        return button;
      }),
    });
    return pagination;
  };
  var renderDropdown = function(options, onClick) {
    var dropdown = new OO.ui.DropdownInputWidget({
      required: true,
      options: options.map(function(option) {
        return option;
      }),
    });
    dropdown.on('change', onClick);
    return dropdown;
  };
  var chartPromise = importArticles({
    type: 'script',
    articles: ['u:dev:MediaWiki:Chart.js'],
  });
  var getSums = function(summaries) {
    var sums = {
      articleComment: 0,
      forum: 0,
      wall: 0,
      wikis: 0,
      langs: {},
      verticals: {},
    };
    summaries.forEach(function(summary) {
      var total = summary.articleComment + summary.forum + summary.wall;
      sums.articleComment += summary.articleComment;
      sums.forum += summary.forum;
      sums.wall += summary.wall;
      sums.wikis += summary.wikis;
      if (sums.langs[summary.lang]) {
        sums.langs[summary.lang].reports += total;
        sums.langs[summary.lang].wikis += summary.wikis;
      } else {
        sums.langs[summary.lang] = {
          reports: total,
          wikis: summary.wikis,
        };
      }
      if (sums.verticals[summary.vertical]) {
        sums.verticals[summary.vertical].reports += total;
        sums.verticals[summary.vertical].wikis += summary.wikis;
      } else {
        sums.verticals[summary.vertical] = {
          reports: total,
          wikis: summary.wikis,
        };
      }
    });
    return sums;
  };
  var convertToOther = function(data, max, sortBy) {
    if (Object.keys(data).length <= max)
      return data;
    var sorted = Object.entries(data).sort(function(a, b) {
      return b[1][sortBy] - a[1][sortBy];
    });
    var res = {};
    sorted.forEach(function(_a, index) {
      var type = _a[0],
        sums = _a[1];
      if (index < max - 1) {
        res[type] = sums;
        return;
      }
      if (!('other' in res)) {
        res['other'] = {
          reports: 0,
          wikis: 0,
        };
      }
      res['other'].reports += sums.reports;
      res['other'].wikis += sums.wikis;
    });
    return res;
  };
  var createChart = function(type, elementId, labels, datasets, options) {
    if (options === void 0) {
      options = defaultChartOptions;
    }
    new Chart(document.getElementById(elementId).getContext('2d'), {
      type: type,
      data: {
        labels: labels,
        datasets: datasets.map(function(dataset) {
          return (__assign({
            backgroundColor: colors,
            borderWidth: 0,
          }, dataset));
        }),
      },
      options: options,
    });
  };
  var renderComboBox = function(options, onChange, placeholder) {
    var comboBox = new OO.ui.ComboBoxInputWidget({
      value: '',
      options: options
        .map(function(option) {
          return ({
            data: option,
          });
        })
        .sort(function(a, b) {
          return (a.data > b.data) ? 1 : (b.data > a.data) ? -1 : 0;
        }),
      menu: {
        filterFromInput: true,
      },
      placeholder: placeholder,
    });
    comboBox.on('change', onChange);
    return comboBox;
  };
  var loadSummary = function() {
    var pagePromise = getPage(pages.summary);
    var countPromise = getPageWithHistory(pages.counts);
    Promise.all([ chartPromise, pagePromise, countPromise ]).then(function(_a) {
      var _ = _a[0],
        summaryData = _a[1],
        countsData = _a[2];
      if (!summaryData || !countsData)
        return;
      $('#gdm-dashboard-summary').empty().append('\n      <h2>Total reports</h2>\n      <div class="gdmd-counts-chart"><canvas id="chartCounts" height="100px"/></div>\n      <div class="gdmd-charts">\n        <div class="gdmd-chart">\n          <h2>Wikis with reports, per vertical</h2>\n          <div class="gdmd-chart-container"><canvas id="chartPerVertical"/></div>\n        </div>\n        <div class="gdmd-chart">\n          <h2>Wikis with reports, per language</h2>\n          <div class="gdmd-chart-container"><canvas id="chartPerLang"/></div>\n        </div>\n        <div class="gdmd-chart">\n          <h2>Number of reports, per platform</h2>\n          <div class="gdmd-chart-container"><canvas id="chartPerPlatform"/></div>\n        </div>\n      </div>\n    ');
      var sums = getSums(parseFields(summaryData).map(convertSummarySchema));
      var counts = convertCountSchema(countsData);
      if (Chart) {
        createChart('line', 'chartCounts', counts.map(function(entry) {
          return entry.timestamp;
        }), [ {
          label: 'Wikis',
          data: counts.map(function(entry) {
            return entry.data.wikis;
          }),
          backgroundColor: colors[5],
          fill: false,
          borderColor: colors[5],
          borderWidth: 3,
          borderDash: [ 10, 10 ],
          yAxisID: 'y',
        },
        {
          label: 'Reports',
          data: counts.map(function(entry) {
            return entry.data.forum +
                                entry.data.wall +
                                entry.data.articleComment;
          }),
          backgroundColor: colors[3],
          fill: false,
          borderColor: colors[3],
          borderWidth: 3,
          yAxisID: 'y1',
        },
        {
          label: 'Discussions',
          data: counts.map(function(entry) {
            return entry.data.forum;
          }),
          backgroundColor: colors[0],
          fill: false,
          borderColor: colors[0],
          borderWidth: 3,
          yAxisID: 'y2',
        },
        ], __assign(__assign({}, defaultChartOptions), {
          scales: {
            yAxes: [ {
              id: 'y',
              type: 'linear',
              position: 'left',
            },
            {
              id: 'y1',
              type: 'linear',
              position: 'right',
            },
            {
              id: 'y2',
              type: 'linear',
              position: 'right',
            },
            ],
            xAxes: [{
              stacked: true,
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'YY/MM/DD',
                },
              },
            }],
          },
          tooltips: {
            mode: 'x',
          },
        }));
        createChart('pie', 'chartPerVertical', Object.keys(sums.verticals), [{
          label: '# wikis with reports',
          data: Object.values(sums.verticals).map(function(v) {
            return v.wikis;
          }),
        }]);
        var langData = convertToOther(sums.langs, 10, 'wikis');
        createChart('pie', 'chartPerLang', Object.keys(langData), [{
          label: '# wikis with reports',
          data: Object.values(langData).map(function(v) {
            return v.wikis;
          }),
        }]);
        createChart('pie', 'chartPerPlatform', [ 'Discussions', 'Article comments', 'Wall' ], [{
          label: '# reports',
          data: [ sums.forum, sums.articleComment, sums.wall ],
        }]);
      }
    });
  };
  var loadReports = function(type, _a) {
    var user = _a.user,
      lang = _a.lang,
      vertical = _a.vertical,
      limit = _a.limit;
    var mustacheLoad = mw.loader.using([
      'oojs-ui-windows',
      'mediawiki.template.mustache',
      'mediawiki.api',
    ]);
    if (user)
      filterStates.wr = user;
    if (lang)
      filterStates.lang = lang;
    if (vertical)
      filterStates.vertical = vertical;
    if (limit)
      filterStates.limit = limit;
    var pagePromise = getPage(pages[type]);
    Promise.all([ mustacheLoad, pagePromise, chartPromise ]).then(function(_a) {
      var _ = _a[0],
        page = _a[1];
      if (!page)
        return;
      var wikiReports = parseFields(page).map(convertWikiSchema);
      var wrIds = new Set(wikiReports.map(function(wiki) {
        return wiki.wikiRepresentative;
      }));
      var languages = Array.from(new Set(wikiReports.map(function(wiki) {
        return wiki.lang;
      })));
      var verticals = Array.from(new Set(wikiReports.map(function(wiki) {
        return wiki.vertical;
      })));
      getUserDetails(Array.from(wrIds)).then(function(users) {
        var wikiReportsWithWR = wikiReports.map(function(report) {
          var _a;
          return (__assign(__assign({}, report), {
            wrUsername: ((_a = users.users[report.wikiRepresentative]) === null || _a === void 0 ? void 0 : _a.username) || '',
          }));
        });
        var userMap = {};
        Object.entries(users.users).forEach(function(_a) {
          var id = _a[0],
            username = _a[1].username;
          userMap[username] = id;
        });
        $('#gdm-dashboard').empty().append('<div id="gdmd-search"></div><div id="gdmd-report-table"></div>');
        var wr = renderComboBox(Object.keys(userMap), function(value) {
          filterStates.wr = value;
          if (previous.wr !== value) {
            filterStates.page = 1; // reset page if wr changed
          }
          memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
        }, 'Enter a username');
        var language = renderComboBox(languages, function(value) {
          filterStates.lang = value;
          if (previous.lang !== value) {
            filterStates.page = 1; // reset page if lang changed
          }
          memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
        }, 'Language');
        var vertical = renderComboBox(verticals, function(value) {
          filterStates.vertical = value;
          if (previous.vertical !== value) {
            filterStates.page = 1; // reset page if vertical changed
          }
          memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
        }, 'Vertical');
        var sort = renderDropdown([ {
          data: 'forum',
          label: 'Posts',
        },
        {
          data: 'wall',
          label: 'Messages',
        },
        {
          data: 'articleComment',
          label: 'Comments',
        },
        {
          data: 'domain',
          label: 'URL',
        },
        ], function(value) {
          filterStates.sortby = value;
          memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
        });
        var limit = renderDropdown([ 10, 25, 50, 100, 1000 ].map(function(num) {
          return ({
            data: num,
            label: num.toString(),
          });
        }), function(value) {
          if (previous.limit !== value) {
            filterStates.page = 1; // reset page if limit changed
          }
          filterStates.limit = value;
          memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
        });
        var topBar = new OO.ui.FieldLayout(new OO.ui.Widget({
          content: [
            new OO.ui.HorizontalLayout({
              items: [
                new OO.ui.FieldLayout(wr, {
                  label: 'Filter by wiki representative',
                  align: 'top',
                }),
                new OO.ui.FieldLayout(language, {
                  label: 'Filter by language',
                  align: 'top',
                }),
                new OO.ui.FieldLayout(vertical, {
                  label: 'Filter by vertical',
                  align: 'top',
                }),
                new OO.ui.FieldLayout(sort, {
                  label: 'Sort by',
                  align: 'top',
                }),
                new OO.ui.FieldLayout(limit, {
                  label: 'Limit',
                  align: 'top',
                }),
              ],
            }),
          ],
        }), {
          align: 'top',
        });
        $('#gdmd-search').append(topBar.$element);
        var onPageChange = function(page) {
          filterStates.page = page;
          memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
        };
        renderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
      });
    });
  };
  var params = {
    user: mw.util.getParamValue('user'),
    lang: mw.util.getParamValue('lang'),
    vertical: mw.util.getParamValue('vertical'),
    limit: Number(mw.util.getParamValue('limit')),
  };
  switch (mw.config.get('wgPageName')) {
  case 'Data:Dashboard/summary':
    loadSummary();
    break;
  case 'Data:Dashboard/wr':
    loadReports('wr', params);
    break;
  case 'Data:Dashboard':
    loadReports('gdm', params);
    break;
  default:
    break;
  }
})(window, jQuery, mw);