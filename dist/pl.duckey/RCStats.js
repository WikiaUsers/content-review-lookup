var rcstats = {
    i18n: {
        en: {
            name: 'Recent changes stats',
            users: 'Users',
            days: 'Activity',
            edits: 'Edits',
            pages: 'Pages',
            pageType: {
                module: 'Module',
                user: 'User',
                article: 'Article'
            }
        },
        pl: {
            name: 'Statystyki ostatnich zmian',
            users: 'Edytorzy',
            days: 'Aktywność',
            edits: 'Edycje',
            pages: 'Strony',
            pageType: {
                module: 'Moduł',
                user: 'Użytkownik',
                article: 'Artykuł'
            }
        }
    },
    init: function init() {
        rcstats.i18n = $.extend({}, rcstats.i18n.en, rcstats.i18n[mw.config.get('wgContentLanguage')], rcstats.i18n[mw.config.get('wgUserLanguage')]);
        rcstats.createToolbarLink();
        
        
        if (mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && $.getUrlVar('special') === 'rcstats') {
            mw.loader.implement('rcstats.dependencies', [
                '/load.php?debug=false&mode=articles&articles=u%3Adev%3AMediaWiki%3AChart.js&only=scripts'
            ], {}, {});

            rcstats.generateStatsPage();
            mw.loader.using(['mediawiki.api', 'mediawiki.util', 'rcstats.dependencies'], function() {
                new mw.Api().get({
                    action: 'query',
                    list: 'recentchanges',
                    rclimit: 500,
                    rcprop: ['user', 'timestamp', 'title'].join('|')
                }).done(function(data) {
                    var fullData = data.query.recentchanges.reverse();
                    
                    fullData = fullData.filter(function(item) {
                        return new Date(item.timestamp).getTime() > (new Date(new Date().setHours(24, 0, 0, 0)).getTime() - 1000*60*60*24*7);
                    });
                    
                    rcstats.data = fullData;
                    rcstats.createCharts();
                });
            });
        }
    },
    createToolbarLink: function createToolbarLink() {
        if (mw.config.get('wgUserGroups').indexOf('bureaucrat') === -1 && mw.config.get('wgUserGroups').indexOf('sysop') === -1) {
            return;
        }
        
        $('#my-tools-menu').prepend('<li class="overflow"><a href="/wiki/Special:BlankPage?special=rcstats">' + rcstats.i18n.name + '</a></li>');
        $('#p-tb ul').append('<li id="t-rcstats"><a href="/wiki/Special:BlankPage?special=rcstats" title="' + rcstats.i18n.name + '">' + rcstats.i18n.name + '</a></li>');
    },
    generateStatsPage: function generateStatsPage() {
        $('#PageHeader .page-header__title').html(rcstats.i18n.name);
        $('title').html(rcstats.i18n.name + ' | ' + mw.config.get('wgSiteName'));
        $('#mw-content-text').html('<main id="rcstats"><section class="rcsection"><h2>' + rcstats.i18n.users + '</h2><div class="rccanvaswrapper"><canvas id="rcstats-users" height="9" width="10"></canvas></div></section><section class="rcsection"><h2>' + rcstats.i18n.days + '</h2><div class="rccanvaswrapper"><canvas id="rcstats-days" height="9" width="10"></canvas></div></section><section class="rcsection"><h2>' + rcstats.i18n.pages + '</h2><div class="rccanvaswrapper"></div></section></main>');
        
        mw.loader.using('mediawiki.api', function() {
            new mw.Api().get({
                action: 'parse',
                text: '{{int:statistics-footer}}',
                prop: 'text'
            }).done(function(data) {
                $('#rcstats').after(data.parse.text['*'].replace(/<span class="editsection">(.*?)<\/span>/, ''));
            });
        });
    },
    createCharts: function createCharts() {
        var editsByUsers = {};
        var editsByDays = {};
        var editsByType = {};
        
        for (var i = 0; i < rcstats.data.length; i++) {
            if (editsByUsers[rcstats.data[i].user]) {
                editsByUsers[rcstats.data[i].user] += 1;
            }
            else {
                editsByUsers[rcstats.data[i].user] = 1;
            }
            
            var date = new Date(rcstats.data[i].timestamp);
            var day = date.getFullYear() + '-' + ('0' + date.getMonth()).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            
            if (editsByDays[day]) {
                editsByDays[day].edits += 1;
                if (editsByDays[day].users.indexOf(rcstats.data[i].user) === -1) {
                    editsByDays[day].users.push(rcstats.data[i].user)
                }
            }
            else {
                var weekday = date.toLocaleString(window.navigator.language || 'en-EN', {weekday: 'long'});
                editsByDays[day] = {
                    edits: 1,
                    day: weekday.charAt(0).toUpperCase() + weekday.slice(1),
                    users: [rcstats.data[i].user]
                };
            }
            
            if (editsByType[rcstats.getPageType(rcstats.data[i].title)]) {
                editsByType[rcstats.getPageType(rcstats.data[i].title)] += 1;
            }
            else {
                editsByType[rcstats.getPageType(rcstats.data[i].title)] = 1;
            }
        }
        
        console.log(editsByType)
        
        /* USERS */
        var usersData = [];
        var usersLabels = [];
        var usersColors = [];
        var usersBorders = $('.WikiaPageBackground').css('background-color');
        
        $.each(editsByUsers, function(user, edits) {
            usersData.push(edits);
            usersLabels.push(user);
            usersColors.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
        });
        
        rcstats.charts.users = new Chart($('#rcstats-users')[0].getContext('2d'), {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: usersData,
                    backgroundColor: usersColors,
                    borderColor: usersBorders,
                    hoverBorderColor: usersBorders
                }],
                labels: usersLabels
            },
            options: {
                legend: {
                    display: false
                }
            }
        });
        
        /* DAYS */
        var daysEditsData = [];
        var daysUsersData = [];
        var daysLabels = [];
        
        $.each(editsByDays, function(day, data) {
            daysEditsData.push(data.edits);
            daysUsersData.push(data.users.length);
            daysLabels.push(data.day);
        });
        
        rcstats.charts.days = new Chart($('#rcstats-days')[0].getContext('2d'), {
            type: 'line',
            data: {
                datasets: [{
                    label: rcstats.i18n.edits,
                    data: daysEditsData,
                    backgroundColor: '#2962FF',
                    borderColor: '#2962FF',
                    fill: false
                }, {
                    label: rcstats.i18n.users,
                    data: daysUsersData,
                    backgroundColor: '#EC407A',
                    borderColor: '#EC407A',
                    fill: false
                }],
                labels: daysLabels
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        }
                    }]
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest'
                }
            }
        });
    },
    getPageType: function getPageType(title) {
        if (title.match(/\.js$/) || title === 'MediaWiki:ImportJS') {
            return 'JavaScript';
        }
        else if (title.match(/\.css$/)) {
            return 'CSS';
        }
        else if (title.startsWith('MediaWiki')) {
            return 'MediaWiki';
        }
        else if (title.startsWith(rcstats.i18n.pageType.module + ':')) {
            return rcstats.i18n.pageType.module;
        }
        else if (title.startsWith(rcstats.i18n.pageType.user + ':')) {
            return rcstats.i18n.pageType.user;
        }
        
        return rcstats.i18n.pageType.article;
    },
    charts: {
        users: null,
        days: null
    },
    data: {}
};
$(rcstats.init);