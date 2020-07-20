/**
 * UserCheck
 *
 * A script to display basic information for a user
 *
 * Original script by [[User:Colouratura]]
 * Additional loading screens provided by [[User:Doork]]
 */
$(function() {
    if (window.UserCheckLoaded) {
        return;
    }
    window.UserCheckLoaded = true;

    var config = mw.config.get([
        'wgCanonicalNamespace',
        'wgCanonicalSpecialPageName',
        'wgMonthNames',
        'wgSiteName',
        'wgTitle'
    ]);

    $('.toolbar .tools .tools-menu').prepend(
        $('<li>', {
            id: 'checkuser'
        }).append(
            $('<a>', {
                href: mw.util.getUrl('Special:UserCheck'),
                text: 'User Check'
            })
        )
    );

    // load script
    var SA = window.SA || {};

    SA.widget = SA.widget || {};
    SA.widget.info = {};

    SA.widget.info.data = {};

    SA.widget.info.fn = {};
    SA.widget.info.fn.ui = {};
    SA.widget.info.fn.ui.loader = {};
    SA.widget.info.fn.ui.table = {};
    SA.widget.info.fn.data = {};

    SA.widget.info.fn.ui.loader.updateLoadingIcon = function(m) {
        document.getElementById('sa-user-info').textContent = m;
    };

    SA.widget.info.fn.ui.loader.loggedIn = function() {
        var message;

        if (typeof SA.widget.info.data.userName === 'string') {
            message = 'Loading your data ' + wgUserName + '! One moment...';
            SA.widget.info.fn.ui.loader.updateLoadingIcon(message);
            SA.widget.info.data.status = true;
        } else {
            message = 'Please login to use this widget!';
            SA.widget.info.fn.ui.loader.updateLoadingIcon(message);
            SA.widget.info.data.status = false;
        }
    };
    
    SA.widget.info.fn.ui.loader.showModal = function() {
        $.showCustomModal('AJAX UserCheck', 'Check users such as their registration date, user ID etc. </br> <hr> </br> <span id="sa-user-info"></span> <br> <hr> <br>', {
            width: 720
        });
        SA.widget.info.fn.init();
    };

    SA.widget.info.fn.ui.table.init = function() {
        SA.widget.info.data.table = document.createElement('table');
        SA.widget.info.data.tableHeading = document.createElement('tr');
        SA.widget.info.data.tableBody = document.createElement('tr');

        SA.widget.info.data.table.setAttribute('class', 'wikitable');
    };

    SA.widget.info.fn.ui.table.addEntry = function(k, v) {
        var col, row;

        if (k === 'registration') {
            v = SA.widget.info.fn.data.parseTimeStamp(v);
        }
        if (k == 'missing') {
            v = 'This account doesn\'t exist or has been disabled globally by user choice, or by Fandom.';
        }

        if (k == 'invalid') {
            v = 'This account belongs to an anonymous user who has not created an account yet or who does not use it, identified by the user\'s numerical IP address.';
        }

        if (k == 'blockexpiry' && v !== 'infinity') {
            var arr = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/.exec(v)

            var month = config.wgMonthNames[Number(arr[2])];

            var day;
            if (arr[3] == '01') {
                day = '1st';
            } else if (arr[3] == '02') {
                day = '2nd';
            } else if (arr[3] == '03') {
                day = '3rd';
            } else {
                var split = arr[3].split('0')
                day = split[1] + 'th'
            }

            v = month + ' ' + day + ', ' + arr[1] + ' at ' + arr[4] + ':' + arr[5] + ':' + arr[6] + ' (UTC)';
        }

        row = document.createElement('td');
        row.textContent = k;

        col = document.createElement('td');
        col.textContent = v;

        SA.widget.info.data.tableHeading.appendChild(row);
        SA.widget.info.data.tableBody.appendChild(col);
    };

    SA.widget.info.fn.ui.table.print = function() {
        SA.widget.info.data.table.appendChild(SA.widget.info.data.tableHeading);
        SA.widget.info.data.table.appendChild(SA.widget.info.data.tableBody);
        document.getElementById('sa-user-info').textContent = '';
        document.getElementById('sa-user-info').appendChild(SA.widget.info.data.table);
    };


    SA.widget.info.fn.data.parseTimeStamp = function(ts) {
        var endings = [
            'st',
            'nd',
            'rd',
            'th'
        ];

        var stamps = ts.split('T');

        stamps[1] = stamps[1].replace('Z', '');
        stamps[0] = stamps[0].split('-');

        if (parseInt(stamps[0][2]) < 10) {
            stamps[0][2] = stamps[0][2].replace('0', '');
        }

        if (stamps[0][2] === '1') {
            stamps[0][2] += endings[0];
        } else if (stamps[0][2] === '2') {
            stamps[0][2] += endings[1];
        } else if (stamps[0][2] === '3') {
            stamps[0][2] += endings[2];
        } else {
            stamps[0][2] += endings[3];
        }

        stamps[0][1] = config.wgMonthNames[Number(stamps[0][1])];

        return stamps[0][1] + ' ' + stamps[0][2] + ', ' + stamps[0][0] + ' at ' + stamps[1] + ' (UTC)';
    };

    SA.widget.info.fn.data.fetchUserInfo = function() {
        $.ajax({
            crossDomain: true,
            url: wgServer + wgScriptPath + '/api.php',
            type: 'POST',
            data: {
                action: 'query',
                list: 'users',
                ususers: SA.widget.info.data.userName,
                usprop: 'registration|gender|editcount|blockinfo|groups',
                format: 'json'
            },
            dataType: 'JSONP',
            success: function(data) {
                data = $(data['query']['users']);
                data = data[0];

                console.log(data);

                SA.widget.info.fn.ui.table.init();

                for (var key in data) {
                    SA.widget.info.fn.ui.table.addEntry(key, data[key]);
                }

                SA.widget.info.fn.ui.table.print();
            },
            error: function() {
                var message = 'An error occured while fetching your information!';
                SA.widget.info.fn.ui.loader.updateLoadingIcon(message);
            },
        });
    };

    SA.widget.info.fn.init = function() {
        //If ContribsPage
        if (wgCanonicalSpecialPageName == 'Contributions') {
            var url = document.URL;
            SA.widget.info.data.userName = url.split('/')[5]
        } else {
            SA.widget.info.data.userName = prompt('Username');
        }
        SA.widget.info.fn.ui.loader.loggedIn();
        if (SA.widget.info.data.status === false) return;
        SA.widget.info.fn.data.fetchUserInfo();
    };

    if (document.getElementById('sa-user-info') != null) {
        SA.widget.info.fn.init();
    }

    // If check page
    if (config.wgCanonicalNamespace === 'Special' && config.wgTitle === 'UserCheck') {
        $('#mw-content-text').remove();
        $('#WikiaArticle').append('Check users such as their registration date, user ID etc. </br> <hr> </br> <span id="sa-user-info"></span> <br> <hr> <br> <button onclick="SA.widget.info.fn.init()">ReCheck</button>');
        document.title = 'User Check | ' + (config.wgSiteName);
        $('#PageHeader h1').text('User Check');
        SA.widget.info.fn.init();
    } else if (config.wgCanonicalSpecialPageName === 'Contributions') {
        $("#contentSub").append(' <a id="userc" title="Check user" style="cursor: pointer;">AJAX UserCheck</a>');

        $('#userc').click(SA.widget.info.fn.ui.loader.showModal);
        mw.hook('QuickLogs.loaded').add(function(ql) {
            $('#userc').remove();
            ql.addLink('usercheck', {
                click: SA.widget.info.fn.ui.loader.showModal,
                message: 'AJAX UserCheck',
                attr: {
                    id: 'userc',
                    title: 'Check user',
                    style: 'cursor: pointer;',
                }
            });
        });
    }
});