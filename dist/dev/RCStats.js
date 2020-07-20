// Script: [[RCStats]]
// Author: [[User:DuckeyD]]
/* global mw, Chart, importArticle */
(function () {
  'use strict'
  if (!window.rcstats) {
    window.rcstats = {
      onLoad: function () { // On page load
        mw.log('window.rcstats.onLoad')
        if (window.rcstats.isStatsPage()) {
          // Spinner SVG
          document.getElementById('mw-content-text').innerHTML = '<svg class="wds-spinner wds-spinner__block" width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g transform="translate(22.5, 22.5)"><circle class="wds-spinner__stroke" fill="none" stroke-width="5" stroke-dasharray="125.66370614359172" stroke-dashoffset="125.66370614359172" stroke-linecap="round" r="20"></circle></g></svg>'
        }

        // Dependencies
        if (!mw.loader.getState('rcstats.i18n')) {
          mw.loader.implement('rcstats.i18n', [
            '/load.php?mode=articles&only=scripts&articles=u:dev:I18n-js/code.js'
          ], {}, {})
        }

        mw.loader.using(['rcstats.i18n', 'mediawiki.api', 'mediawiki.util'], function () {
          // Load i18n
          window.dev.i18n.loadMessages('RCStats').done(function (i18n) {
            window.rcstats.i18n = i18n
            window.rcstats.init()
          })
        })
      },
      init: function () { // This function is called at the beginning, after loading i18n and defining dependencies
        mw.log('window.rcstats.init')
        mw.hook('rcstats.init').fire()
        window.rcstats.createLink()

        if (window.rcstats.isStatsPage()) {
          window.rcstats.loadPage()
        }
      },
      createLink: function () {
        mw.log('window.rcstats.createLink')
        var text = window.rcstats.i18n.msg('shortName').plain()
        var href = mw.util.getUrl('Special:Blankpage', { 'blankspecial': 'rcstats' })
        var elem = document.createElement('li')
        var link = document.createElement('a')
        link.appendChild(document.createTextNode(text))
        link.setAttribute('href', href)
        elem.appendChild(link)
        var header = document.querySelector('.wds-community-header__wiki-buttons > .wds-dropdown > .wds-dropdown__content > .wds-list')
        if (header) {
          header.appendChild(elem)
          mw.hook('rcstats.link').fire({
            elem: elem,
            text: text,
            href: href
          })
        }
      },
      loadPage: function () {
        mw.log('window.rcstats.loadPage')
        importArticle({
          type: 'style',
          article: 'u:dev:MediaWiki:RCStats.css',
          loaded: function () { // On CSS load
            window.sectionsData = []
            mw.loader.using(['ext.hydralytics.scripts'], function () {
              window.rcstats.generateStatsPage()
              // First request for recent changes data
              window.rcstats.request(null, [], new mw.Api(), 500, new Date(new Date().setHours(25, 0, 0, 0) - 1000 * 60 * 60 * 24 * 7))
            })
          }
        })
      },
      request: function (rcstart, fetchedData, api, requestSize, furthestDate) {
        api.get({
          action: 'query',
          list: 'recentchanges',
          rcprop: ['user', 'timestamp', 'title', 'loginfo', 'flags'].join('|'),
          rclimit: 500,
          rcstart: rcstart,
          maxage: 86400, // Cache, 24h
          smaxage: 86400
        }).done(function (data) {
          var newData = fetchedData.concat(data.query.recentchanges.filter(function (entry) {
            return new Date(entry.timestamp) >= furthestDate // Remove entries older than one week (from last request)
          }))
          if (data.query.recentchanges.length < requestSize) {
            window.rcstats.requestsFinished(newData)
            return
          }
          var furthestEntry = data.query.recentchanges[requestSize - 1]
          if (new Date(furthestEntry.timestamp) >= furthestDate) {
            // The limit is not met, send more requests
            window.rcstats.request(data['query-continue'].recentchanges.rcstart, newData, api, requestSize, furthestDate)
          } else {
            window.rcstats.requestsFinished(newData)
          }
        })
      },
      requestsFinished: function (fetchedData) {
        mw.log('window.rcstats.requestsFinished')
        window.rcstats.data = fetchedData.map(function (entry) {
          return {
            type: window.rcstats.getPageType(entry.ns),
            timestamp: new Date(entry.timestamp),
            user: entry.user,
            bot: entry.bot !== undefined,
            minor: entry.minor !== undefined
          }
        }).reverse() // Sort chronologically

        window.rcstats.createCharts()
      },
      generateStatsPage: function () {
        mw.log('window.rcstats.generateStatsPage')
        document.querySelector('#PageHeader .page-header__title').textContent = window.rcstats.i18n.msg('name').plain() // Page header text
        document.title = window.rcstats.i18n.msg('name').plain() + ' | ' + mw.config.get('wgSiteName') // Page title

        var mwContentText = document.getElementById('mw-content-text')
        while (mwContentText.lastChild) { mwContentText.removeChild(mwContentText.lastChild) } // Empty the element

        var docFrag = document.createDocumentFragment()

        var mainElem = document.createElement('main')
        mainElem.classList.add('rcstats')
        ;['users', 'days', 'pages'].forEach(function (sectionName) {
          var sectionElem = document.createElement('section')
          sectionElem.classList.add('rcsection')

          var sectionTitle = document.createElement('h2')
          sectionTitle.appendChild(document.createTextNode(window.rcstats.i18n.msg(sectionName).plain()))
          sectionElem.appendChild(sectionTitle)

          var chartWrapper = document.createElement('div')
          chartWrapper.classList.add('rccanvaswrapper')
          var canvasElem = document.createElement('canvas')
          canvasElem.id = 'rcstats-' + sectionName
          canvasElem.setAttribute('width', 10)
          canvasElem.setAttribute('height', 9)
          chartWrapper.appendChild(canvasElem)
          sectionElem.appendChild(chartWrapper)

          mainElem.appendChild(sectionElem)
        })
        docFrag.appendChild(mainElem)

        var filtersElem = document.createElement('section')
        var mainFieldset = document.createElement('fieldset')
        mainFieldset.classList.add('rcfilters')
        ;['article', 'social', 'user', 'media', 'code', 'other'].forEach(function (catName) {
          var labelElem = document.createElement('label')
          var checkbox = document.createElement('input')
          checkbox.setAttribute('type', 'checkbox')
          checkbox.setAttribute('data-type', catName)
          checkbox.checked = true
          checkbox.disabled = true
          labelElem.appendChild(checkbox)
          labelElem.appendChild(document.createTextNode(window.rcstats.i18n.msg(catName).plain()))
          mainFieldset.appendChild(labelElem)
        })
        filtersElem.appendChild(mainFieldset)
        var secondaryFieldset = document.createElement('fieldset')
        secondaryFieldset.classList.add('rcfilters')
        var botsLabel = document.createElement('label')
        var botsCheckbox = document.createElement('input')
        botsCheckbox.setAttribute('type', 'checkbox')
        botsCheckbox.setAttribute('data-bots', true)
        botsCheckbox.checked = false
        botsCheckbox.disabled = true
        botsLabel.appendChild(botsCheckbox)
        botsLabel.appendChild(document.createTextNode(window.rcstats.i18n.msg('bots').plain()))
        secondaryFieldset.appendChild(botsLabel)
        var minorLabel = document.createElement('label')
        var minorCheckbox = document.createElement('input')
        minorCheckbox.setAttribute('type', 'checkbox')
        minorCheckbox.setAttribute('data-minor', true)
        minorCheckbox.checked = true
        minorCheckbox.disabled = true
        minorLabel.appendChild(minorCheckbox)
        minorLabel.appendChild(document.createTextNode(window.rcstats.i18n.msg('showMinor').plain()))
        secondaryFieldset.appendChild(minorLabel)
        filtersElem.appendChild(secondaryFieldset)
        docFrag.appendChild(filtersElem)

        var footerElem = document.createElement('footer')
        footerElem.classList.add('rcfooter')
        footerElem.appendChild(document.createTextNode(window.rcstats.i18n.msg('nodata').plain()))
        docFrag.appendChild(footerElem)

        mwContentText.appendChild(docFrag)

        new mw.Api().get({
          action: 'parse',
          text: '{{int:statistics-footer}}',
          prop: 'text'
        }).done(function (data) {
          var elem = document.createElement('template')
          elem.innerHTML = data.parse.text['*']
          elem.content.querySelector('.editsection').remove()
          mwContentText.appendChild(elem)
        })
      },
      createCharts: function () {
        mw.log('window.rcstats.createCharts')
        window.rcstats.updateFooter(window.rcstats.data)

        if (window.rcstats.data.length === 0) {
          return
        }

        var dicts = window.rcstats.getEditDicts(window.rcstats.data)

        // USERS
        var usersChartData = window.rcstats.getUsersChartData(dicts.editsByUsers)

        window.rcstats.charts.users = new Chart(document.getElementById('rcstats-users').getContext('2d'), {
          type: 'doughnut',
          data: {
            datasets: usersChartData.datasets,
            labels: usersChartData.labels
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              displayColors: false
            }
          }
        })

        document.getElementById('rcstats-users').addEventListener('click', function (e) {
          var elem = window.rcstats.charts.users.getElementsAtEvent(e)[0]
          if (elem === undefined) {
            return
          }

          window.open(mw.util.getUrl('Special:Contributions/' + window.rcstats.charts.users.data.labels[elem._index]))
        })

        // DAYS
        var daysChartData = window.rcstats.getDaysChartData(dicts.editsByDays)

        window.rcstats.charts.days = new Chart(document.getElementById('rcstats-days').getContext('2d'), {
          type: 'line',
          data: {
            datasets: daysChartData.datasets,
            labels: daysChartData.labels
          },
          options: {
            scales: {
              xAxes: [{
                ticks: {
                  autoSkip: false
                }
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            tooltips: {
              mode: 'index',
              intersect: false
            },
            hover: {
              mode: 'nearest'
            }
          }
        })

        // PAGES
        var pagesChartData = window.rcstats.getPagesChartData(dicts.editsByType)

        window.rcstats.charts.pages = new Chart(document.getElementById('rcstats-pages').getContext('2d'), {
          type: 'bar',
          data: {
            datasets: pagesChartData.datasets,
            labels: pagesChartData.labels
          },
          options: {
            tooltips: {
              displayColors: false
            },
            scales: {
              xAxes: [{
                stacked: true,
                ticks: {
                  autoSkip: false
                }
              }],
              yAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })

        Array.from(document.querySelectorAll('.rcfilters input[type=checkbox][data-type]')).forEach(function (check) {
          if (window.rcstats.data.filter(function (rev) { return rev.type === check.getAttribute('data-type') }).length === 0) {
            check.parentNode.remove() // If no pages apply to a filter, remove it
          } else {
            check.removeAttribute('disabled') // Enable the checkbox
          }
        })

        if (window.rcstats.data.filter(function (rev) { return rev.bot }).length === 0) {
          document.querySelector('.rcfilters input[type=checkbox][data-bots]').parentNode.remove()
        } else {
          document.querySelector('.rcfilters input[type=checkbox][data-bots]').removeAttribute('disabled')
        }

        if (window.rcstats.data.filter(function (rev) { return rev.minor }).length === 0) {
          document.querySelector('.rcfilters input[type=checkbox][data-minor]').parentNode.remove()
        } else {
          document.querySelector('.rcfilters input[type=checkbox][data-minor]').removeAttribute('disabled')
        }

        Array.from(document.querySelectorAll('.rcfilters input[type=checkbox]')).forEach(function (check) {
          check.addEventListener('change', function () {
            window.rcstats.updateFilter()
          })
        })
        window.rcstats.updateFilter()
      },
      getPageType: function (ns) {
        // Get page type from a namespace number
        if ([0, 4, 5, 14, 15].includes(ns)) {
          return 'article'
        } else if ([-2, 6, 7].includes(ns)) {
          return 'media'
        } else if ([8, 9, 10, 11, 828, 829].includes(ns)) {
          return 'code'
        } else if ([1, 3, 110, 111, 500, 501, 502, 503, 1200, 1201, 2000, 2001, 2002].includes(ns)) {
          return 'social'
        } else if ([2, 1202].includes(ns)) {
          return 'user'
        } else {
          return 'other'
        }
      },
      getEditDicts: function (data) {
        var editsByUsers = {}
        var editsByDays = {}
        var editsByType = {}

        Object.entries(data).forEach(function (entry) {
          if (editsByUsers[entry[1].user]) {
            editsByUsers[entry[1].user] += 1
          } else {
            editsByUsers[entry[1].user] = 1
          }

          var date = entry[1].timestamp
          var day = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2) + '-' + date.getDate().toString().padStart(2)

          if (editsByDays[day]) {
            editsByDays[day].edits += 1
            if (!editsByDays[day].users.includes(entry[1].user)) {
              editsByDays[day].users.push(entry[1].user)
            }
          } else {
            var weekday = date.toLocaleString(window.navigator.language || 'en-EN', { weekday: 'long' })
            editsByDays[day] = {
              edits: 1,
              day: weekday.charAt(0).toUpperCase() + weekday.slice(1),
              users: [entry[1].user]
            }
          }

          if (editsByType[entry[1].type]) {
            editsByType[entry[1].type].minor += entry[1].minor ? 1 : 0
            editsByType[entry[1].type].major += entry[1].minor ? 0 : 1
          } else {
            editsByType[entry[1].type] = {
              minor: entry[1].minor ? 1 : 0,
              major: entry[1].minor ? 0 : 1
            }
          }
        })

        return {
          editsByUsers: editsByUsers,
          editsByDays: editsByDays,
          editsByType: editsByType
        }
      },
      getUsersChartData: function (editsByUsers, filter) {
        var usersData = []
        var usersLabels = []
        var usersColors = []
        var usersHoverColors = []
        var usersBorders = window.sassParams['color-page']

        Object.entries(editsByUsers).sort(function (a, b) {
          return b[1] - a[1]
        }).filter(function (e) { return filter ? filter(e[1]) : true }).forEach(function (e) {
          usersData.push(e[1])
          usersLabels.push(e[0])
          // Get a unique color from a given string (nickname)
          // First generate a 32-bit hash from the string
          // Then make it unsigned (x + 2147483647)
          // Then clamp it between [0, 1) as a float (x / 4294967295)
          // Then get a hue value [0, 360) from given float (x * 360)
          var hue = ((Array.from(e[0]).reduce(function (s, c) { return Math.imul(31, s) + c.charCodeAt(0) | 0 }, 0) + 2147483647) / 4294967295) * 360 // Name to hue
          if (window.rcstats.charts.users && window.rcstats.charts.users.data.labels && window.rcstats.charts.users.data.datasets[0]) {
            var id = Object.entries(window.rcstats.charts.users.data.labels).find(function (dataE) {
              return dataE[1] === e[0]
            })
            if (id) {
              usersColors.push(window.rcstats.charts.users.data.datasets[0].backgroundColor[id[0]])
              usersHoverColors.push(window.rcstats.charts.users.data.datasets[0].hoverBackgroundColor[id[0]])
            } else {
              usersColors.push('hsl(' + hue + ', 80%, 50%)')
              usersHoverColors.push('hsl(' + hue + ', 80%, 25%)')
            }
          } else {
            usersColors.push('hsl(' + hue + ', 80%, 50%)')
            usersHoverColors.push('hsl(' + hue + ', 80%, 25%)')
          }
        })

        return {
          datasets: [{
            data: usersData,
            backgroundColor: usersColors,
            hoverBackgroundColor: usersHoverColors,
            borderColor: usersBorders,
            hoverBorderColor: usersBorders
          }],
          labels: usersLabels
        }
      },
      getDaysChartData: function (editsByDays) {
        var daysEditsData = []
        var daysUsersData = []
        var daysLabels = []

        Object.values(editsByDays).forEach(function (v) {
          daysEditsData.push(v.edits)
          daysUsersData.push(v.users.length)
          daysLabels.push(v.day)
        })

        return {
          datasets: [{
            label: window.rcstats.i18n.msg('edits').plain(),
            data: daysEditsData,
            backgroundColor: '#00d6d6',
            borderColor: '#00d6d6',
            fill: false
          }, {
            label: window.rcstats.i18n.msg('users').plain(),
            data: daysUsersData,
            backgroundColor: '#ff6a64',
            borderColor: '#ff6a64',
            fill: false
          }],
          labels: daysLabels
        }
      },
      getPagesChartData: function (editsByType) {
        var typeEditsMinor = []
        var typeEditsMajor = []
        var typeEditsLabels = []

        Object.entries(editsByType).sort(function (a, b) {
          return b[1].major + b[1].minor - (a[1].major + a[1].minor)
        }).forEach(function (e) {
          typeEditsMinor.push(e[1].minor)
          typeEditsMajor.push(e[1].major)
          typeEditsLabels.push(window.rcstats.i18n.msg(e[0]).plain())
        })

        var datasets = [{
          label: window.rcstats.i18n.msg('edits').plain(),
          data: typeEditsMajor,
          backgroundColor: '#006661'
        }]

        if (typeEditsMinor.some(function (v) { return v > 0 })) { // Don't add the minor dataset if there are no minor edits
          datasets.push({
            label: window.rcstats.i18n.msg('minorEdits').plain(),
            data: typeEditsMinor,
            backgroundColor: '#5df2ae'
          })
        }

        return {
          datasets: datasets,
          labels: typeEditsLabels
        }
      },
      updateCharts: function (data, usersFilter) {
        var dicts = window.rcstats.getEditDicts(data)
        var results = {
          users: window.rcstats.getUsersChartData(dicts.editsByUsers, usersFilter),
          days: window.rcstats.getDaysChartData(dicts.editsByDays),
          pages: window.rcstats.getPagesChartData(dicts.editsByType)
        }
        Object.entries(results).forEach(function (chart) {
          // Diff checker, only update a chart if it has changed
          var previous = JSON.stringify(window.rcstats.charts[chart[0]].data.datasets.map(function (o) { return Object.entries(o).find(function (e) { return e[0] === 'data' })[1] }))
          var current = JSON.stringify(chart[1].datasets.map(function (o) { return Object.entries(o).find(function (e) { return e[0] === 'data' })[1] }))
          if (previous !== current) {
            window.rcstats.charts[chart[0]].data.datasets = chart[1].datasets
            window.rcstats.charts[chart[0]].data.labels = chart[1].labels
            window.rcstats.charts[chart[0]].update()
          }
        })
        window.rcstats.updateFooter(data)
      },
      updateFilter: function () {
        var enabledTypes = []
        Array.from(document.querySelectorAll('.rcfilters input[type=checkbox][data-type]')).forEach(function (elem) {
          if (elem.checked) {
            enabledTypes.push(elem.getAttribute('data-type'))
          }
        })
        var botsEnabled = (document.querySelector('.rcfilters input[type=checkbox][data-bots]') || {}).checked
        var minorEnabled = (document.querySelector('.rcfilters input[type=checkbox][data-minor]') || {}).checked
        window.rcstats.updateCharts(window.rcstats.data.filter(function (e) {
          if ((!botsEnabled && e.bot) || (!minorEnabled && e.minor)) {
            return false
          }
          return enabledTypes.includes(e.type)
        }))
      },
      updateFooter: function (data) {
        if (!data[0]) {
          document.querySelector('.rcfooter').textContent = window.rcstats.i18n.msg('nodata').plain()
        } else {
          document.querySelector('.rcfooter').textContent = window.rcstats.i18n.msg('footer', data.length, Math.ceil((new Date().getTime() - data[0].timestamp.getTime()) / (1000 * 60 * 60 * 24))).plain()
        }
      },
      isStatsPage: function () {
        return mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && new URLSearchParams(window.location.search).get('blankspecial') === 'rcstats'
      },
      charts: {
        users: null,
        days: null,
        pages: null
      },
      data: []
    }

    if (document.readyState !== 'loading') {
      window.rcstats.onLoad()
    } else {
      document.addEventListener('DOMContentLoaded', function () { window.rcstats.onLoad() })
    }
  }
})()