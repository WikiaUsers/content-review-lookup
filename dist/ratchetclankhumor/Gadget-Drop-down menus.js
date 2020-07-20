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
            ctabs: [],
            itabs: true,
            menus: [],
            mouse: null,
            pbase: encodeURIComponent(wgTitle.split('/')[0].replace(/ /g,'_')),
            pmenu: [],
            pname: encodeURIComponent(wgPageName),
            svars: [],
            timer: []
        };
        if (globals) for (i in globals) cactions[i] = globals[i];
    }());
    
    // XMLHttpRequest for API calls
    function _XMLHttpRequest() {
        try {return new XMLHttpRequest()} catch(e) {}
        try {return new ActiveXObject('Msxml2.XMLHTTP.6.0')} catch(e) {}
        try {return new ActiveXObject('Msxml2.XMLHTTP.3.0')} catch(e) {}
        try {return new ActiveXObject('Msxml2.XMLHTTP')} catch(e) {}
        try {return new ActiveXObject('Microsoft.XMLHTTP')} catch(e) {return false}
    };
    
    function xhr(request,url,orsc) {
        with (request) {
            request.open('GET',url,true);
            request.onreadystatechange = orsc;
            request.send(null);
        }
    }
    
    // Find absolute position of element
    function findPos(obj,offset) {
        var pos = [0,0];
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
            id = mid,
            className = 'ca-menu',
            style.display = 'none',
            onmouseover = function () {showMenu(mid)},
            onmouseout = function () {hideMenu(mid)};
        }
        
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
        
        addOnloadHook(function () {document.body.appendChild(menu)} );
        
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
            li.id = cid,
            a.href = '#',
            a.onmouseover = function () {showMenu(mid,findPos(this,[-10,20]))},
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
                if (pmenu[mid] == menus[i]) continue;
                document.getElementById(menus[i]).style.display = 'none';
            }
            if (!timer[mid]) with (document.getElementById(mid).style) {
                display = '';
                if (pos) {
                    left = pos[0]+'px',
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
            if (mid == pmenu[mouse]) timer[mid] = null;
            
            if (timer[mid]) {
                timer[mid] = null;
                document.getElementById(mid).style.display = 'none';
                if (mid == mouse && pmenu[mid]) document.getElementById(pmenu[mid]).style.display = 'none';
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
    switch (wgNamespaceNumber) {
        case 2: case 3:
        with (cactions) {
            menus[menus.length] = createMenu('opt-user',Array(
                                ['c-ulogs',         'User logs >',      '#'],
                                ['c-ublocks',       'Blocks >',         '#'],
                                ['c-contribs',      'Contributions',    wgScript+'?title=Special:Contributions/'+pbase+'&action=view'],
                                ['c-editcount',     'Edit count',       'http://toolserver.org/~interiot/cgi-bin/Tool1/wannabe_kate?site='+wgServer.substr(7)+'&username='+pbase],
                wgServer.indexOf('.wikipedia.org') > -1?    ['c-mathbot',       'Edit summaries',   'http://toolserver.org/~mathbot/cgi-bin/wp/rfa/edit_summary.cgi?lang='+wgServer.substr(7).split('.')[0]+'&user='+pbase]:[],
                wgServer == 'http://en.wikipedia.org'?      ['c-wcuser',        'Edit analysis',    'http://en.wikichecker.com/user/?l=all&t='+pbase]:[],
                                ['c-subpages',      'Userspace',        wgScript+'?title=Special:PrefixIndex&action=view&from='+pbase+'/&namespace=2'],
                                ['c-email',         'E-mail user',      wgScript+'?title=Special:EmailUser/'+pbase+'&action=view'],
                                ['c-groups',        'User groups',      wgScript+'?title=Special:ListUsers&action=view&limit=1&username='+pbase],
                                ['c-rightslog',     'Rights changes',   wgScript+'?title=Special:Log&action=view&type=rights&page=User:'+pbase]
            ));
            
            menus[menus.length] = createMenu('opt-ulogs',Array(
                ['c-ulogs',     'All user logs',    wgScript+'?title=Special:Log&action=view&user='+pbase],
                ['c-blocks',    'Blocks',               wgScript+'?title=Special:Log&action=view&type=block&user='+pbase],
                ['c-moves',     'Moves',                wgScript+'?title=Special:Log&action=view&type=move&user='+pbase],
                ['c-patrols',   'Patrols',              wgScript+'?title=Special:Log&action=view&type=patrol&user='+pbase],
                ['c-protects',  'Protections',          wgScript+'?title=Special:Log&action=view&type=protect&user='+pbase],
                ['c-uploads',   'Uploads',              wgScript+'?title=Special:Log&action=view&type=upload&user='+pbase],
                ['c-rights',    'User rights',          wgScript+'?title=Special:Log&action=view&type=rights&user='+pbase]
            ));
            pmenu['opt-ulogs'] = 'opt-user';
            
            menus[menus.length] = createMenu('opt-ublocks',Array(
                admin?          ['c-block',         'Block user',       wgScript+'?title=Special:BlockIP/'+pbase+'&action=view']:[],
                admin?          ['c-unblock',       'Unblock user',     wgScript+'?title=Special:IPBlockList&action=unblock&ip='+pbase]:[],
                                ['c-ipblock',       'View block',       wgScript+'?title=Special:IPBlockList&action=view&ip='+pbase],
                                ['c-blocklog',      'Block log',        wgScript+'?title=Special:Log&action=view&type=block&page=User:'+pbase]
            ));
            pmenu['opt-ublocks'] = 'opt-user';
            
            ctabs['user'] = createTab('ca-user','opt-user','User');
            
            if (_XMLHttpRequest() && wgEnableAPI) {
                if (pbase.search(/(?:\d{1,3}\.){3}\d{1,3}/) == 0) {
                    areqs['ip'] = new _XMLHttpRequest();
                    xhr(areqs['ip'],wgScriptPath+'/api.php?format=json&action=query&list=blocks&bkusers='+pbase+'&bkprop=id&xhr='+Math.random(),function () {
                        with (areqs['ip']) if (readyState == 4 && status == 200) {
                            var api = eval('('+responseText+')');
                            if (api.query.blocks.length) addOnloadHook(function () {
                                hideElements(['c-block']);
                                document.getElementById('c-ipblock').getElementsByTagName('a')[0].style.color = '#EE1111';
                            } );
                            else addOnloadHook(function () {
                                hideElements(['c-unblock']);
                                removeLink('c-ipblock');
                            } );
                        }
                    } );
                }
                else {
                    areqs['user'] = new _XMLHttpRequest();
                    xhr(areqs['user'],wgScriptPath+'/api.php?format=json&action=query&list=users&ususers='+pbase+'&usprop=blockinfo|groups&xhr='+Math.random(),function () {
                        with (areqs['user']) if (readyState == 4 && status == 200) {
                            var api = eval('('+responseText+')');
                            with (api.query.users[0]) {
                                if (typeof(blockedby) != 'undefined') addOnloadHook(function () {
                                    hideElements(['c-block']);
                                    document.getElementById('c-ipblock').getElementsByTagName('a')[0].style.color = '#EE1111';
                                } );
                                else addOnloadHook(function () {
                                    hideElements(['c-unblock']);
                                    removeLink('c-ipblock');
                                } );
                                
                                if (typeof(groups) == 'undefined') addOnloadHook(function () {hideElements(['c-blocks','c-deletes','c-protects','c-rights'])} );
                                else if (groups.join().indexOf('sysop') == -1) addOnloadHook(function () {hideElements(['c-blocks','c-deletes','c-protects','c-rights'])} );
                                
                                if (typeof(missing) != 'undefined') addOnloadHook(function () {hideElements(['ca-user'])} );
                            }
                        }
                    } );
                    
                    areqs['uspace'] = new _XMLHttpRequest();
                    xhr(areqs['uspace'],wgScriptPath+'/api.php?format=json&action=query&list=allpages&apprefix='+pbase+'%2F&apnamespace=2&aplimit=1&xhr='+Math.random(),function () {
                        with (areqs['uspace']) if (readyState == 4 && status == 200) {
                            var api = eval('('+responseText+')');
                            if (!api.query.allpages.length) addOnloadHook(function () {removeLink('c-subpages')} );
                        }
                    } );
                }
                
                areqs['ublocks'] = new _XMLHttpRequest();
                xhr(areqs['ublocks'],wgScriptPath+'/api.php?format=json&action=query&list=logevents&letype=block&letitle=User:'+pbase+'&lelimit=1&xhr='+Math.random(),function () {
                    with (areqs['ublocks']) if (readyState == 4 && status == 200) {
                        var api = eval('('+responseText+')');
                        if (!api.query.logevents.length) addOnloadHook(function () {removeLink('c-blocklog')} );
                    }
                } );
            }
            else addOnloadHook(function () {hideElements(['c-ipblock','c-blocks','c-deletes','c-protects','c-rights'])} );
        }
        
        addOnloadHook(function () {
            hideElements(['t-contributions','t-log','t-emailuser']);
            
            with (document.getElementById('c-ulogs')) {
                onmouseover = function () {showMenu('opt-ulogs',findPos(this,[40,0]));};
                onmouseout = function () {hideMenu('opt-ulogs');};
                style.fontWeight = 'bold';
            }
            
            with (document.getElementById('c-ublocks')) {
                onmouseover = function () {showMenu('opt-ublocks',findPos(this,[40,0]));};
                onmouseout = function () {hideMenu('opt-ublocks');};
                style.fontWeight = 'bold';
            }
            
            if (cactions.pbase.search(/(?:\d{1,3}\.){3}\d{1,3}/) == 0) hideElements(['c-ulogs','c-editcount','c-mathbot','c-wcuser','c-subpages','c-email','c-groups','c-rightslog']);
        } );
        
        break;
    }
    
    // Page options hook
    if (!wgCanonicalSpecialPageName) {
        with (cactions) {
            menus[menus.length] = createMenu('opt-page',Array(
                                    ['c-plogs',         'Page logs >',      '#'],
                wgArticleId?        ['c-history',       'History',          wgScript+'?title='+pname+'&action=history']:[],
                wgArticleId?        ['c-move',          'Move page',        wgScript+'?title=Special:Movepage/'+pname+'&action=view']:[],
                                    ['c-watch',         'Watch page',       wgScript+'?title='+pname+'&action=watch'],
                                    ['c-unwatch',       'Unwatch page',     wgScript+'?title='+pname+'&action=unwatch'],
                admin?              ['c-protect',       'Protect page',     wgScript+'?title='+pname+'&action=protect']:[],
                admin?              ['c-unprotect',     'Unprotect page',   wgScript+'?title='+pname+'&action=unprotect']:[],
                admin?              ['c-delete',        'Delete page',      wgScript+'?title='+pname+'&action=delete']:[],
                admin?              ['c-undelete',      'Undelete page',    wgScript+'?title=Special:Undelete/'+pname+'&action=view']:[],
                wgArticleId?        ['c-diff',          'Latest diff',      wgScript+'?title='+pname+'&action=view&diff='+wgCurRevisionId]:[],
                wgArticleId?        ['c-editzero',      'Edit intro',       wgScript+'?title='+pname+'&action=edit&section=0']:[],
                wgArticleId && wgServer == 'http://en.wikipedia.org'?   ['c-wcpage',    'Page analysis',    'http://en.wikichecker.com/article/?a='+pname]:[],
                                    ['c-purge',         'Purge cache',      wgScript+'?title='+pname+'&action=purge']
            ));

            menus[menus.length] = createMenu('opt-plogs',Array(
                ['c-plogs',         'All page logs',    wgScript+'?title=Special:Log&action=view&page='+pname],
                ['c-deletelog',     'Deletion log',     wgScript+'?title=Special:Log&type=delete&page='+pname],
                ['c-movelog',       'Move log',         wgScript+'?title=Special:Log&action=view&type=move&page='+pname],
                wgArticleId?    ['c-patrollog', 'Patrol log',   wgScript+'?title=Special:Log&action=view&type=patrol&page='+pname]:[],
                ['c-protectlog',    'Protection log',   wgScript+'?title=Special:Log&action=view&type=protect&page='+pname],
                wgNamespaceNumber == 6? ['c-uploadlog', 'Upload log',   wgScript+'?title=Special:Log&action=view&type=upload&page='+pname]:[]
            ));
            pmenu['opt-plogs'] = 'opt-page';
            
            ctabs['page'] = createTab('ca-page','opt-page','Page');
        }
        
        addOnloadHook(function () {
            if (cactions.itabs) hideElements(['ca-watch','ca-unwatch','ca-protect','ca-unprotect','ca-delete','ca-undelete','ca-history','ca-move'],['c-unwatch','c-watch','c-unprotect','c-protect','c-undelete','c-delete']);
            else hideElements(['c-history','c-move','c-watch','c-unwatch','c-protect','c-unprotect','c-delete','c-undelete']);
            
            with (document.getElementById('c-plogs')) {
                onmouseover = function () {showMenu('opt-plogs',findPos(this,[40,0]));};
                onmouseout = function () {hideMenu('opt-plogs');};
                style.fontWeight = 'bold';
            }
        } );
    }
    
    // insert caction tabs on page load
    addOnloadHook(function () {
        var li = document.getElementById('p-cactions').getElementsByTagName('div')[0].getElementsByTagName('ul')[0];
        for (i in cactions.ctabs) if (typeof(cactions.ctabs[i]) == 'object') li.appendChild(cactions.ctabs[i]);
    } );
    
    // shortcuts portlet hook
    addOnloadHook(function () {
        with (cactions) if (svars.length) {
            var portlet = document.createElement('div');
            with (portlet) {
                id = 'p-sc',
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