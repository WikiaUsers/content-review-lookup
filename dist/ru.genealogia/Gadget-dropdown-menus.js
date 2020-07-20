/*********************************************************************
**             Script:        Drop-down menus                       **
**            Version:        4.40g                                 **
**             Author:        Haza-w                                **
**      Documentation:        [[en:User:Haza-w/Drop-down menus]]    **
**                                                                  **
*********************************************************************/

// "Fail gracefully" if skin not supported
switch (skin) {
    case 'modern': case 'monobook':

    // Global variables
    var _cactions = {
        admin: wgUserGroups.join().indexOf('sysop') > -1 ? true : false,
        areqs: [],
        menus: [],
        mouse: null,
        pname: encodeURIComponent(wgPageName),
        timer: []
    };

    // Process XMLHttpRequests
    function xhr(request,url,orsc) {
        with (request) {
            open('GET',url,true);
            onreadystatechange = orsc;
            send(null);
        }
    }

    // Find absolute position of element
    function findPos(eid,offset) {
        var obj = document.getElementById(eid), pos = [0,0];
        do with (obj) {
            pos[0] += offsetLeft;
            pos[1] += offsetTop;
        } while (obj = obj.offsetParent);
        pos[0] += offset[0]; pos[1] += offset[1];
        return pos;
    }

    // Create menu div element
    function createMenu(mid,html) {
        var menu = document.createElement('div');
        with (menu) {
            id = mid;
            className = 'ca-menu';
            style.display = 'none';
        }
        menu.onmouseover = function () {showMenu(mid)};
        menu.onmouseout = function () {hideMenu(mid)};

        var elements = {
            ul: document.createElement('ul'),
            li: null,
            a: null,
            txt: null
        };
        with (elements) {
            for (var i = 0; i < html.length; i++) if (html[i].length) {
                li = document.createElement('li'); li.id = html[i][0];
                a = document.createElement('a'); a.href = html[i][2];
                txt = document.createTextNode(html[i][1]);
                a.appendChild(txt); li.appendChild(a); ul.appendChild(li);
            }
            menu.appendChild(ul);
        }

        document.body.appendChild(menu);

        return mid;
    }

    // Create cactions LI tab
    function createTab(cid,mid,ltxt) {
        var elements = {
            li: document.createElement('li'),
            a: document.createElement('a'),
            txt: document.createTextNode(ltxt)
        };
        with (elements) {
            li.id = cid;
            a.href = '#';
            a.onmouseover = function () {showMenu(mid,findPos(cid,[-10,20]))};
            a.onmouseout = function () {hideMenu(mid)};
            a.appendChild(txt); li.appendChild(a);
        }

        return elements.li;
    }

    // CSS hide elements
    function hideElements(elements,conditionals) {
        if (typeof(conditionals) == 'undefined') {
            for (var i = 0; i < elements.length; i++) if (document.getElementById(elements[i])) document.getElementById(elements[i]).style.display = 'none';
        }
        else for (var i = 0; i < elements.length; i++) if (document.getElementById(elements[i])) {
            document.getElementById(elements[i]).style.display = 'none';
            if (conditionals[i]) document.getElementById(conditionals[i]).style.display = 'none';
        }
    }

    // Show/hide menu functions
    function showMenu(mid,pos) {
        with (_cactions) {
            mouse = mid;
            if (pos) for (var i = 0; i < menus.length; i++) {
                if (timer[menus[i]]) {
                    clearTimeout(timer[menus[i]]);
                    timer[menus[i]] = null;
                }
                if (mid.replace(/-[^-]+$/,'') == menus[i]) continue;
                document.getElementById(menus[i]).style.display = 'none';
            }
            if (!timer[mid]) with (document.getElementById(mid).style) {
                display = '';
                if (pos) {
                    left = pos[0]+'px';
                    top = pos[1]+'px';
                }
            }
            else {
                clearTimeout(timer[mid]);
                timer[mid] = null;
            }
        }
    }
    function hideMenu(mid) {
        with (_cactions) {
            if (mid == mouse.replace(/-[^-]+$/,'')) timer[mid] = null;

            if (timer[mid]) {
                timer[mid] = null;
                document.getElementById(mid).style.display = 'none';
                if (mid == mouse && mid.search(/opt-.*-/) != -1) document.getElementById(mid.replace(/-[^-]+$/,'')).style.display = 'none';
            }
            else timer[mid] = setTimeout('hideMenu(\''+mid+'\');',400);
        }
    }

    // Delink element
    function removeLink(eid) {
        var element = document.getElementById(eid);
        if (!element.getElementsByTagName('a').length) return false;

        var a = element.getElementsByTagName('a')[0];
        element.appendChild(a.removeChild(a.firstChild));
        element.removeChild(a);

        element.className = 'ca-disabled';
    }

    // User options hook
    addOnloadHook(function () {
        switch (wgNamespaceNumber) {
            case 2: case 3: _cactions['uname'] = encodeURIComponent(wgTitle.split('/')[0].replace(/ /g,'_'));
        }
        if (wgCanonicalSpecialPageName == 'Contributions') for (var i = 0, hl; hl = document.getElementById('contentSub').getElementsByTagName('a')[i]; i++) {
            if (hl.href.indexOf('user=') > -1) {
                _cactions['uname'] = hl.href.split('user=')[1].split('&amp;')[0];
                break;
            }
        }

        if (_cactions.uname) {
            with (_cactions) {
                menus[menus.length] = createMenu('opt-user',Array(
                    ['c-u-logs',        'Журналы участника >',      '#']                                                                                                            ,
                    ['c-u-rfx',         'Заявки >' ,'#']                                                                                                            ,
                    ['c-u-blocks',      'Блок >',         '#']                                                                                                            ,
                    ['c-u-contribs',    'Вклад',    wgScript+'?title=Special:Contributions/'+uname+'&action=view']                                                  ,
                    ['c-u-editcount',   'Счётчик правок',       'http://toolserver.org/~soxred93/count/index.php?lang=ru&wiki=wikipedia&name='+uname.replace(/_/g,'+')]         ,
                    ['c-u-editsum',     'Описания правок',   'http://toolserver.org/~soxred93/editsummary/index.php?lang=ru&wiki=wikipedia&name='+uname.replace(/_/g,'+')]   ,
                    ['c-u-wcuser',      'Анализ вклада',    'http://ru.wikichecker.com/user/?l=all&t='+uname]                                                               ,
                    ['c-u-subpages',    'Подстраницы',        wgScript+'?title=Special:PrefixIndex/User:'+uname+'/&action=view']                                              ,
                    ['c-u-email',       'Письмо участнику',      wgScript+'?title=Special:EmailUser/'+uname+'&action=view']                                                      ,
                    ['c-u-groups',      'Права',      wgScript+'?title=Special:ListUsers&action=view&limit=1&username='+uname]                                        ,
                    ['c-u-rightslog',   'Журнал прав',   wgScript+'?title=Special:Log&action=view&type=rights&page=User:'+uname]
                ));

                menus[menus.length] = createMenu('opt-user-logs',Array(
                    ['c-ul-logs',       'Все журналы',    wgScript+'?title=Special:Log&action=view&user='+uname]              ,
                    ['c-ul-blocks',     'Блокировки',           wgScript+'?title=Special:Log&action=view&type=block&user='+uname]   ,
                    ['c-ul-deletes',    'Удаления',        wgScript+'?title=Special:Log&action=view&type=delete&user='+uname]  ,
                    ['c-ul-moves',      'Переименования',            wgScript+'?title=Special:Log&action=view&type=move&user='+uname]    ,
                    ['c-ul-patrols',    'Патрулирования',          wgScript+'?title=Special:Log&action=view&type=review&user='+uname]  ,
                    ['c-ul-protects',   'Защита',      wgScript+'?title=Special:Log&action=view&type=protect&user='+uname] ,
                    ['c-ul-uploads',    'Загрузки',          wgScript+'?title=Special:Log&action=view&type=upload&user='+uname]  ,
                    ['c-ul-rights',     'Изменения прав',      wgScript+'?title=Special:Log&action=view&type=rights&user='+uname]
                ));

                menus[menus.length] = createMenu('opt-user-rfx',Array(
                    ['c-ux-rfa',        'ЗСА',             wgScript+'?title=Special:PrefixIndex/Википедия:Заявки_на_статус_администратора/'+uname+'&action=view']       ,
                    ['c-ux-rfb',        'ЗСБ',             wgScript+'?title=Special:PrefixIndex/Википедия:Заявки_на_статус_бюрократа/'+uname+'&action=view']  ,
                    //['c-ux-rfar',       'RfAr',             wgScript+'?title=Wikipedia:Requests_for_arbitration/'+uname+'&action=view']                         ,
                   // ['c-ux-rfc',        'RfC',              wgScript+'?title=Wikipedia:Requests_for_comment/'+uname+'&action=view']                             ,
                    ['c-ux-rfcu',       'ПП',             wgScript+'?title=Википедия:Проверка_участников/'+uname+'&action=view']
                ));

                menus[menus.length] = createMenu('opt-user-blocks',Array(
                    admin?          ['c-ub-block',          'Заблокировать',       wgScript+'?title=Special:BlockIP/'+uname+'&action=view']            :[] ,
                    admin?          ['c-ub-unblock',        'Разблокировать',     wgScript+'?title=Special:IPBlockList&action=unblock&ip='+uname]     :[] ,
                                    ['c-ub-ipblock',        'Текущая блокировка',       wgScript+'?title=Special:IPBlockList&action=view&ip='+uname]            ,
                                    ['c-ub-blocklog',       'Журнал блокировок',        wgScript+'?title=Special:Log&action=view&type=block&page=User:'+uname]
                ));

                document.getElementById('p-cactions').getElementsByTagName('div')[0].getElementsByTagName('ul')[0].appendChild(createTab('ca-user','opt-user','Об участнике'));

                if (sajax_init_object() && wgEnableAPI) {
                    if (uname.search(/(?:\d{1,3}\.){3}\d{1,3}/) == 0) {
                        areqs['ip'] = new sajax_init_object();
                        xhr(areqs['ip'],wgScriptPath+'/api.php?format=json&action=query&list=blocks&bkusers='+uname+'&bkprop=id&xhr='+Math.random(),function () {
                            with (areqs['ip']) if (readyState == 4 && status == 200) {
                                var api = eval('('+responseText+')');
                                if (api.query.blocks.length) {
                                    hideElements(['c-ub-block']);
                                    document.getElementById('c-ub-ipblock').getElementsByTagName('a')[0].style.color = '#EE1111';
                                }
                                else {
                                    hideElements(['c-ub-unblock']);
                                    removeLink('c-ub-ipblock');
                                }
                            }
                        } );
                    }
                    else {
                        areqs['user'] = new sajax_init_object();
                        xhr(areqs['user'],wgScriptPath+'/api.php?format=json&action=query&list=users&ususers='+uname+'&usprop=blockinfo|groups&xhr='+Math.random(),function () {
                            with (areqs['user']) if (readyState == 4 && status == 200) {
                                var api = eval('('+responseText+')');
                                with (api.query.users[0]) {
                                    if (typeof(missing) != 'undefined') hideElements(['ca-user']);
                                    else {
                                        if (typeof(blockedby) != 'undefined') {
                                            hideElements(['c-ub-block']);
                                            document.getElementById('c-ub-ipblock').getElementsByTagName('a')[0].style.color = '#EE1111';
                                        }
                                        else {
                                            hideElements(['c-ub-unblock']);
                                            removeLink('c-ub-ipblock');
                                        }

                                        if (typeof(groups) == 'undefined' || groups.join().indexOf('sysop') == -1) hideElements(['c-ul-blocks','c-ul-deletes','c-ul-protects','c-ul-rights']);
                                    }
                                }
                            }
                        } );

                        areqs['rfa'] = new sajax_init_object();
                        xhr(areqs['rfa'],wgScriptPath+'/api.php?format=json&action=query&list=allpages&apprefix=Requests_for_adminship%2F'+uname+'&apnamespace=4&aplimit=1&xhr='+Math.random(),function () {
                            with (areqs['rfa']) if (readyState == 4 && status == 200) {
                                var api = eval('('+responseText+')');
                                if (!api.query.allpages.length) removeLink('c-ux-rfa');
                            }
                        } );

                        areqs['rfb'] = new sajax_init_object();
                        xhr(areqs['rfb'],wgScriptPath+'/api.php?format=json&action=query&list=allpages&apprefix=Requests_for_bureaucratship%2F'+uname+'&apnamespace=4&aplimit=1&xhr='+Math.random(),function () {
                            with (areqs['rfb']) if (readyState == 4 && status == 200) {
                                var api = eval('('+responseText+')');
                                if (!api.query.allpages.length) removeLink('c-ux-rfb');
                            }
                        } );

                        areqs['uspace'] = new sajax_init_object();
                        xhr(areqs['uspace'],wgScriptPath+'/api.php?format=json&action=query&list=allpages&apprefix='+uname+'%2F&apnamespace=2&aplimit=1&xhr='+Math.random(),function () {
                            with (areqs['uspace']) if (readyState == 4 && status == 200) {
                                var api = eval('('+responseText+')');
                                if (!api.query.allpages.length) removeLink('c-u-subpages');
                            }
                        } );
                    }

                    areqs['rfx'] = new sajax_init_object();
                    xhr(areqs['rfx'],wgScriptPath+'/api.php?format=json&action=query&titles=Wikipedia:Requests_for_arbitration/'+uname+'|Wikipedia:Requests_for_comment/'+uname+'|Wikipedia:Requests_for_checkuser/Case/'+uname+'|Wikipedia:Sockpuppet_investigations/'+uname+'&letype=block&letitle=User:'+uname+'&prop=info&xhr='+Math.random(),function () {
                        with (areqs['rfx']) if (readyState == 4 && status == 200) {
                            var api = eval('('+responseText+')');
                            for (i in api.query.pages) switch (api.query.pages[i].title.split('/')[0]) {
                                case 'Wikipedia:Requests for arbitration': if (typeof(api.query.pages[i].missing) != 'undefined') removeLink('c-ux-rfar'); break;
                                case 'Wikipedia:Requests for comment': if (typeof(api.query.pages[i].missing) != 'undefined') removeLink('c-ux-rfc'); break;
                                case 'Wikipedia:Requests for checkuser': if (typeof(api.query.pages[i].missing) != 'undefined') removeLink('c-ux-rfcu'); break;
                                case 'Wikipedia:Sockpuppet investigations': if (typeof(api.query.pages[i].missing) != 'undefined') removeLink('c-ux-spi'); break;
                            }
                        }
                    } );

                    areqs['ublocks'] = new sajax_init_object();
                    xhr(areqs['ublocks'],wgScriptPath+'/api.php?format=json&action=query&list=logevents&letype=block&letitle=User:'+uname+'&lelimit=1&xhr='+Math.random(),function () {
                        with (areqs['ublocks']) if (readyState == 4 && status == 200) {
                            var api = eval('('+responseText+')');
                            if (!api.query.logevents.length) removeLink('c-ub-blocklog');
                        }
                    } );
                }
                else hideElements(['c-ub-ipblock','c-ul-blocks','c-ul-deletes','c-ul-protects','c-ul-rights']);
            }

            hideElements(['t-contributions','t-log','t-emailuser']);

            document.getElementById('c-u-logs').onmouseover = function () {showMenu('opt-user-logs',findPos('c-u-logs',[40,0]))};
            document.getElementById('c-u-logs').onmouseout = function () {hideMenu('opt-user-logs')};
            document.getElementById('c-u-logs').style.fontWeight = 'bold';

            document.getElementById('c-u-rfx').onmouseover = function () {showMenu('opt-user-rfx',findPos('c-u-rfx',[40,0]))};
            document.getElementById('c-u-rfx').onmouseout = function () {hideMenu('opt-user-rfx')};
            document.getElementById('c-u-rfx').style.fontWeight = 'bold';
            document.getElementById('opt-user-rfx').style.width = '50px';

            document.getElementById('c-u-blocks').onmouseover = function () {showMenu('opt-user-blocks',findPos('c-u-blocks',[40,0]))};
            document.getElementById('c-u-blocks').onmouseout = function () {hideMenu('opt-user-blocks')};
            document.getElementById('c-u-blocks').style.fontWeight = 'bold';

            if (_cactions.uname.search(/(?:\d{1,3}\.){3}\d{1,3}/) == 0) hideElements(['c-u-logs','c-ux-rfa','c-ux-rfb','c-u-editcount','c-u-editsum','c-u-wcuser','c-u-subpages','c-u-email','c-u-groups','c-u-rightslog']);
        }
    } );

    // Page options hook
    addOnloadHook(function () {
        if (!wgCanonicalSpecialPageName) {
            with (_cactions) {
                menus[menus.length] = createMenu('opt-page',Array(
                                    ['c-p-logs',        'Журналы >',      '#'],
                    wgArticleId?    ['c-p-move',        'Переименовать',        wgScript+'?title=Special:Movepage/'+pname+'&action=view']       :[] ,
                    admin?          ['c-p-protect',     'Защитить',     wgScript+'?title='+pname+'&action=protect']                     :[] ,
                    admin?          ['c-p-unprotect',   'Снять защиту',   wgScript+'?title='+pname+'&action=unprotect']                   :[] ,
                    admin?          ['c-p-delete',      'Удалить',      wgScript+'?title='+pname+'&action=delete']                      :[] ,
                    admin?          ['c-p-undelete',    'Восстановить',    wgScript+'?title=Special:Undelete/'+pname+'&action=view']       :[] ,
                    wgArticleId?    ['c-p-diff',        'Последнее изменение',      wgScript+'?title='+pname+'&action=view&diff='+wgCurRevisionId]  :[] ,
                    wgArticleId?    ['c-p-wcpage',      'Статистика',    'http://ru.wikichecker.com/article/?a='+pname]                  :[] ,
                    wgArticleId?    ['c-p-sgpage',      'Посещаемость',    'http://stats.grok.se/ru/latest/'+pname]                  :[] ,

                                    ['c-p-purge',       'Очистить кеш',      wgScript+'?title='+pname+'&action=purge']
                ));

                menus[menus.length] = createMenu('opt-page-logs',Array(
                                                ['c-pl-logs',       'Все журналы',    wgScript+'?title=Special:Log&action=view&page='+pname]                  ,
                                                ['c-pl-deletes',    'Журнал удалений',     wgScript+'?title=Special:Log&type=delete&page='+pname]                  ,
                                                ['c-pl-moves',      'Журнал переименований',         wgScript+'?title=Special:Log&action=view&type=move&page='+pname]        ,
                    wgArticleId?                ['c-pl-patrols',    'Журнал патрулировния',       wgScript+'?title=Special:Log&action=view&type=review&page='+pname]  :[] ,
                                                ['c-pl-protects',   'Журнал защиты',   wgScript+'?title=Special:Log&action=view&type=protect&page='+pname]     ,
                    wgNamespaceNumber == 6?     ['c-pl-uploads',    'Журнал загрузок',       wgScript+'?title=Special:Log&action=view&type=upload&page='+pname]  :[]
                ));

                document.getElementById('p-cactions').getElementsByTagName('div')[0].getElementsByTagName('ul')[0].appendChild(createTab('ca-page','opt-page','Страница'));
            }

            hideElements(['ca-protect','ca-unprotect','ca-delete','ca-undelete','ca-move'],['c-p-unprotect','c-p-protect','c-p-undelete','p-c-delete']);

            document.getElementById('c-p-logs').onmouseover = function () {showMenu('opt-page-logs',findPos('c-p-logs',[40,0]))};
            document.getElementById('c-p-logs').onmouseout = function () {hideMenu('opt-page-logs')};
            document.getElementById('c-p-logs').style.fontWeight = 'bold';
        }
    } );
}