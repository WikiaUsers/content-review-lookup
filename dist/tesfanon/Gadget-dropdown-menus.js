// "Fail gracefully" if skin not supported
switch (skin) {
    case 'modern': case 'monobook':

    // Global variables
    if (typeof(cactions) == 'undefined') var cactions;
    eval(function () {
        var globals = cactions ? cactions : null;
        cactions = {
            admin: wgUserGroups.join().indexOf('sysop') > -1 ? true : false,
            areqs: [],
            itabs: true,
            menus: [],
            mouse: null,
            mwsvr: wgServer.indexOf('secure.wikimedia.org') == -1 ? wgServer.split('://')[1] : null,
            pname: encodeURIComponent(wgPageName),
            svars: [],
            tbusr: false,
            timer: [],
            xmlhr: true
        };
        if (globals) for (i in globals) cactions[i] = globals[i];
    }());

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
        with (cactions) {
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
        with (cactions) {
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

    // CSS styles
    importStylesheetURI('http://en.wikipedia.org/w/index.php?title=User:Haza-w/cactions.css&ctype=text/css&action=raw');

    // User options hook
    addOnloadHook(function () {
        switch (wgNamespaceNumber) {
            case 2: case 3: cactions['uname'] = encodeURIComponent(wgTitle.split('/')[0].replace(/ /g,'_'));
        }
        if (wgCanonicalSpecialPageName == 'Contributions') for (var i = 0, hl; hl = document.getElementById('contentSub').getElementsByTagName('a')[i]; i++) {
            if (hl.href.indexOf('user=') > -1) {
                cactions['uname'] = hl.href.split('user=')[1].split('&amp;')[0];
                break;
            }
        }

        if (cactions.uname) {
            with (cactions) {
                menus[menus.length] = createMenu('opt-user',Array(
                                                    ['c-u-logs',        'User logs >',      '#']                                                                                                                                                    ,
                    mwsvr == 'en.wikipedia.org'?    ['c-u-rfx',         'Links to RfX >',   '#']                                                                                                                                                :[] ,
                                                    ['c-u-blocks',      'Blocks >',         '#']                                                                                                                                                    ,
                                                    ['c-u-contribs',    'Contributions',    wgScript+'?title=Special:Contributions/'+uname+'&action=view']                                                                                          ,
                    mwsvr?                          ['c-u-editcount',   'Edit count',       wgScript+'?title=Special:Editcount/'+uname+'&action=view']          :[] ,
                    mwsvr == 'en.wikipedia.org'?    ['c-u-wcuser',      'Edit analysis',    'http://en.wikichecker.com/user/?l=all&t='+uname]                                                                                                   :[] ,
                                                    ['c-u-subpages',    'Userspace',        wgScript+'?title=Special:PrefixIndex/User:'+uname+'/&action=view']                                                                                      ,
                                                    ['c-u-email',       'E-mail user',      wgScript+'?title=Special:EmailUser/'+uname+'&action=view']                                                                                              ,
                                                    ['c-u-groups',      'User groups',      wgScript+'?title=Special:ListUsers&action=view&limit=1&username='+uname]                                                                                ,
                                                    ['c-u-rightslog',   'Rights changes',   wgScript+'?title=Special:Log&action=view&type=rights&page=User:'+uname]
                ));

                menus[menus.length] = createMenu('opt-user-logs',Array(
                                                    ['c-ul-logs',       'All user logs',    wgScript+'?title=Special:Log&action=view&user='+uname]                  ,
                                                    ['c-ul-blocks',     'Blocks',           wgScript+'?title=Special:Log&action=view&type=block&user='+uname]       ,
                                                    ['c-ul-deletes',    'Deletions',        wgScript+'?title=Special:Log&action=view&type=delete&user='+uname]      ,
                                                    ['c-ul-moves',      'Moves',            wgScript+'?title=Special:Log&action=view&type=move&user='+uname]        ,
                                                    ['c-ul-patrols',    'Patrols',          wgScript+'?title=Special:Log&action=view&type=patrol&user='+uname]      ,
                                                    ['c-ul-protects',   'Protections',      wgScript+'?title=Special:Log&action=view&type=protect&user='+uname]     ,
                                                    ['c-ul-uploads',    'Uploads',          wgScript+'?title=Special:Log&action=view&type=upload&user='+uname]      ,
                                                    ['c-ul-rights',     'User rights',      wgScript+'?title=Special:Log&action=view&type=rights&user='+uname]
                ));

                menus[menus.length] = createMenu('opt-user-blocks',Array(
                    admin?                          ['c-ub-block',      'Block user',       wgScript+'?title=Special:BlockIP/'+uname+'&action=view']            :[] ,
                    admin?                          ['c-ub-unblock',    'Unblock user',     wgScript+'?title=Special:IPBlockList&action=unblock&ip='+uname]     :[] ,
                                                    ['c-ub-ipblock',    'View block',       wgScript+'?title=Special:IPBlockList&action=view&ip='+uname]            ,
                                                    ['c-ub-blocklog',   'Block log',        wgScript+'?title=Special:Log&action=view&type=block&page=User:'+uname]
                ));

                menus[menus.length] = createMenu('opt-user-rfx',Array(
                                                    ['c-ux-rfa',        'RfAs',             wgScript+'?title=Special:PrefixIndex/Wikipedia:Requests_for_adminship/'+uname+'&action=view'],
                                                    ['c-ux-rfb',        'RfBs',             wgScript+'?title=Special:PrefixIndex/Wikipedia:Requests_for_bureaucratship/'+uname+'&action=view'],
                                                    ['c-ux-rfar',       'RfAr',             wgScript+'?title=Wikipedia:Requests_for_arbitration/'+uname+'&action=view'],
                                                    ['c-ux-rfc',        'RfC',              wgScript+'?title=Wikipedia:Requests_for_comment/'+uname+'&action=view'],
                                                    ['c-ux-rfcu',       'RfCU',             wgScript+'?title=Wikipedia:Requests_for_checkuser/Case/'+uname+'&action=view'],
                                                    ['c-ux-spi',        'SPI',              wgScript+'?title=Wikipedia:Sockpuppet_investigations/'+uname+'&action=view']
                ));

                document.getElementById('p-cactions').getElementsByTagName('div')[0].getElementsByTagName('ul')[0].appendChild(createTab('ca-user','opt-user','User'));

                if (xmlhr && sajax_init_object() && wgEnableAPI) {
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

                        if (document.getElementById('c-u-rfx')) {
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
                        }

                        areqs['uspace'] = new sajax_init_object();
                        xhr(areqs['uspace'],wgScriptPath+'/api.php?format=json&action=query&list=allpages&apprefix='+uname+'%2F&apnamespace=2&aplimit=1&xhr='+Math.random(),function () {
                            with (areqs['uspace']) if (readyState == 4 && status == 200) {
                                var api = eval('('+responseText+')');
                                if (!api.query.allpages.length) removeLink('c-u-subpages');
                            }
                        } );
                    }

                    if (document.getElementById('c-u-rfx')) {
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
                    }

                    areqs['ublocks'] = new sajax_init_object();
                    xhr(areqs['ublocks'],wgScriptPath+'/api.php?format=json&action=query&list=logevents&letype=block&letitle=User:'+uname+'&lelimit=1&xhr='+Math.random(),function () {
                        with (areqs['ublocks']) if (readyState == 4 && status == 200) {
                            var api = eval('('+responseText+')');
                            if (!api.query.logevents.length) removeLink('c-ub-blocklog');
                        }
                    } );
                }
                else hideElements(['c-ub-ipblock','c-ul-blocks','c-ul-deletes','c-ul-protects','c-ul-rights']);

                if (!tbusr) hideElements(['t-contributions','t-log','t-emailuser']);
            }

            document.getElementById('c-u-logs').onmouseover = function () {showMenu('opt-user-logs',findPos('c-u-logs',[40,0]))};
            document.getElementById('c-u-logs').onmouseout = function () {hideMenu('opt-user-logs')};
            document.getElementById('c-u-logs').style.fontWeight = 'bold';

            document.getElementById('c-u-blocks').onmouseover = function () {showMenu('opt-user-blocks',findPos('c-u-blocks',[40,0]))};
            document.getElementById('c-u-blocks').onmouseout = function () {hideMenu('opt-user-blocks')};
            document.getElementById('c-u-blocks').style.fontWeight = 'bold';

            if (document.getElementById('c-u-rfx')) {
                document.getElementById('c-u-rfx').onmouseover = function () {showMenu('opt-user-rfx',findPos('c-u-rfx',[40,0]))};
                document.getElementById('c-u-rfx').onmouseout = function () {hideMenu('opt-user-rfx')};
                document.getElementById('c-u-rfx').style.fontWeight = 'bold';
                document.getElementById('opt-user-rfx').style.width = '50px';
            }

            if (cactions.uname.search(/(?:\d{1,3}\.){3}\d{1,3}/) == 0) hideElements(['c-u-logs','c-ux-rfa','c-ux-rfb','c-u-editcount','c-u-editsum','c-u-wcuser','c-u-subpages','c-u-email','c-u-groups','c-u-rightslog']);
        }
    } );

    // Page options hook
    addOnloadHook(function () {
        if (!wgCanonicalSpecialPageName) {
            with (cactions) {
                menus[menus.length] = createMenu('opt-page',Array(
                                                                ['c-p-logs',        'Page logs >',      '#'],
                    wgArticleId?                                ['c-p-history',     'History',          wgScript+'?title='+pname+'&action=history']                         :[] ,
                    wgArticleId?                                ['c-p-move',        'Move page',        wgScript+'?title=Special:Movepage/'+pname+'&action=view']           :[] ,
                                                                ['c-p-watch',       'Watch page',       wgScript+'?title='+pname+'&action=watch']                               ,
                                                                ['c-p-unwatch',     'Unwatch page',     wgScript+'?title='+pname+'&action=unwatch']                             ,
                    admin?                                      ['c-p-protect',     'Protect page',     wgScript+'?title='+pname+'&action=protect']                         :[] ,
                    admin?                                      ['c-p-unprotect',   'Unprotect page',   wgScript+'?title='+pname+'&action=unprotect']                       :[] ,
                    admin?                                      ['c-p-delete',      'Delete page',      wgScript+'?title='+pname+'&action=delete']                          :[] ,
                    admin?                                      ['c-p-undelete',    'Undelete page',    wgScript+'?title=Special:Undelete/'+pname+'&action=view']           :[] ,
                    wgArticleId?                                ['c-p-diff',        'Latest diff',      wgScript+'?title='+pname+'&action=view&diff='+wgCurRevisionId]      :[] ,
                    wgArticleId?                                ['c-p-editzero',    'Edit intro',       wgScript+'?title='+pname+'&action=edit&section=0']                  :[] ,
                    wgArticleId && mwsvr == 'en.wikipedia.org'? ['c-p-wcpage',      'Page analysis',    'http://en.wikichecker.com/article/?a='+pname]                      :[] ,
                                                                ['c-p-purge',       'Purge cache',      wgScript+'?title='+pname+'&action=purge']
                ));

                menus[menus.length] = createMenu('opt-page-logs',Array(
                                                                ['c-pl-logs',       'All page logs',    wgScript+'?title=Special:Log&action=view&page='+pname]                  ,
                                                                ['c-pl-deletes',    'Deletion log',     wgScript+'?title=Special:Log&type=delete&page='+pname]                  ,
                                                                ['c-pl-moves',      'Move log',         wgScript+'?title=Special:Log&action=view&type=move&page='+pname]        ,
                    wgArticleId?                                ['c-pl-patrols',    'Patrol log',       wgScript+'?title=Special:Log&action=view&type=patrol&page='+pname]  :[] ,
                                                                ['c-pl-protects',   'Protection log',   wgScript+'?title=Special:Log&action=view&type=protect&page='+pname]     ,
                    wgNamespaceNumber == 6?                     ['c-pl-uploads',    'Upload log',       wgScript+'?title=Special:Log&action=view&type=upload&page='+pname]  :[]
                ));

                document.getElementById('p-cactions').getElementsByTagName('div')[0].getElementsByTagName('ul')[0].appendChild(createTab('ca-page','opt-page','Page'));
            }

            if (cactions.itabs) hideElements(['ca-watch','ca-unwatch','ca-protect','ca-unprotect','ca-delete','ca-undelete','ca-history','ca-move','ca-purge'],['c-p-unwatch','c-p-watch','c-p-unprotect','c-p-protect','c-p-undelete','c-p-delete']);
            else hideElements(['c-p-history','c-p-move','c-p-watch','c-p-unwatch','c-p-protect','c-p-unprotect','c-p-delete','c-p-undelete','c-p-purge']);

            document.getElementById('c-p-logs').onmouseover = function () {showMenu('opt-page-logs',findPos('c-p-logs',[40,0]))};
            document.getElementById('c-p-logs').onmouseout = function () {hideMenu('opt-page-logs')};
            document.getElementById('c-p-logs').style.fontWeight = 'bold';
        }
    } );

    // shortcuts portlet hook
    addOnloadHook(function () {
        with (cactions) if (svars.length) {
            var portlet = document.createElement('div');
            with (portlet) {
                id = 'p-sc';
                className = 'portlet';
            }

            var elements = {
                h5: document.createElement('h5'),
                div: document.createElement('div'),
                ul: document.createElement('ul'),
                li: null,
                a: null,
                txt: null
            };
            with (elements) {
                h5.appendChild(document.createTextNode('Shortcuts'));
                portlet.appendChild(h5);
                div.className = 'pBody';
                for (var i = 0; i < svars.length; i++) if (!svars[i][1].indexOf('/') || !svars[i][1].search(/http[s]?:\/\//)) {
                    li = document.createElement('li'); li.id = 's-'+svars[i][0].toLowerCase().replace(/\W/g,'');
                    a = document.createElement('a'); a.href = svars[i][1];
                    txt = document.createTextNode(svars[i][0]);
                    a.appendChild(txt); li.appendChild(a); ul.appendChild(li);
                }
                div.appendChild(ul);
                portlet.appendChild(div);
            }

            switch (skin) {
                case 'modern': document.getElementById('mw_portlets').insertBefore(portlet,document.getElementById('p-lang')); break;
                case 'monobook': document.getElementById('column-one').insertBefore(portlet,document.getElementById('p-lang')); break;
            }
        }
    } );
}