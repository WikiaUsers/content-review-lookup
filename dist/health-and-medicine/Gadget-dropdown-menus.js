/*********************************************************************
**                ***WARNING: GLOBAL GADGET FILE***                 **
**         any changes to this file will affect many users          **
**          please discuss changes on the talk page or at           **
**             [[Wikipedia talk:Gadget]] before editing             **
**     (consider dropping the script author a note as well...)      **
**                                                                  **
**********************************************************************
**             Script:        Drop-down menus                       **
**            Version:        4.51g                                 **
**             Author:        Haza-w                                **
**      Documentation:        [[User:Haza-w/Drop-down menus]]       **
**                                                                  **
*********************************************************************/

// "Fail gracefully" if skin not supported
switch (mw.config.get('skin')) {
    case 'modern': case 'monobook': case 'vector':

    // Global variables
    var _cactions = {
        admin: mw.config.get( 'wgUserGroups' ).join().indexOf('sysop') > -1 ? true : false,
        areqs: [],
        hovms: mw.config.get('skin') == 'vector' ? 50 : 400,
        menus: [],
        mouse: null,
        pname: encodeURIComponent( mw.config.get( 'wgPageName' ) ),
        timer: [],
        vectr: mw.config.get('skin') == 'vector' ? true : false
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
    function createMenu(mid,vectorise,html) {
        var menu = document.createElement('div');
        with (menu) {
            id = 'opt-' + mid;
            className = 'ca-menu';
            style.display = 'none';
        }
        menu.onmouseover = function () {showMenu('opt-'+mid)};
        menu.onmouseout = function () {hideMenu('opt-'+mid)};

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
        if (vectorise) createTab(mid);

        return 'opt-' + mid;
    }

    // Create cactions LI tab
    function createTab(mid) {
        var mtitle = mid.charAt(0).toUpperCase() + mid.substr(1);

        if (_cactions.vectr) {
            var cid = 'p-' + mid;
            var elements = {
                div: document.createElement('div'),
                h3: document.createElement('h3'),
                span: document.createElement('span'),
                a: document.createElement('a'),
                txt: null
            };
            with (elements) {
                div.id = cid;
                div.className = 'vectorMenu extraMenu';

                txt = document.createTextNode(mtitle);
                span.appendChild(txt); h3.appendChild(span);

                a.href = '#';
                h3.onmouseover = function () {showMenu('opt-'+mid,findPos(cid,[0,40]))};
                h3.onmouseout = function () {hideMenu('opt-'+mid)};

                span = document.createElement('span');
                a.appendChild(span); h3.appendChild(a);

                div.appendChild(h3);
                document.getElementById('right-navigation').insertBefore(div,document.getElementById('p-search'));
            }
        }
        else {
            var cid = 'ca-' + mid;
            var elements = {
                li: document.createElement('li'),
                a: document.createElement('a'),
                txt: document.createTextNode(mtitle)
            };
            with (elements) {
                li.id = cid;
                a.href = '#';
                a.onmouseover = function () {showMenu('opt-'+mid,findPos(cid,[-10,20]))};
                a.onmouseout = function () {hideMenu('opt-'+mid)};
                a.appendChild(txt); li.appendChild(a);

                document.getElementById('p-cactions').getElementsByTagName('div')[0].getElementsByTagName('ul')[0].appendChild(li);
            }
        }
    }

    // CSS hide elements
    function hideElements(elements,conditionals) {
    	var i;
        if (typeof(conditionals) == 'undefined') {
            for (i = 0; i < elements.length; i++) if (document.getElementById(elements[i])) document.getElementById(elements[i]).style.display = 'none';
        }
        else for (i = 0; i < elements.length; i++) if (document.getElementById(elements[i])) {
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
            else timer[mid] = setTimeout('hideMenu(\''+mid+'\');',hovms);
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
   jQuery(function () {
        switch ( mw.config.get( 'wgNamespaceNumber' ) ) {
            case 2:
            case 3:
            	_cactions.uname = encodeURIComponent( mw.config.get( 'wgTitle' ).split('/')[0].replace(/ /g,'_') );
        }
        if ( mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Contributions') {
	        for (var i = 0, hl; hl = document.getElementById('contentSub').getElementsByTagName('a')[i]; i++) {
	            if (hl.href.indexOf('user=') > -1) {
	                _cactions.uname = hl.href.split('user=')[1].split('&amp;')[0];
	                break;
	            }
	        }
   }

        if (_cactions.uname) {
            with (_cactions) {
	        	var script = mw.config.get( 'wgScript' );
                menus[menus.length] = createMenu('user',true,Array(
                    ['c-u-logs',        'User logs >',      '#']                                                                                                            ,
                    ['c-u-rfx',         'Links to RfX >',   '#']                                                                                                            ,
                    ['c-u-blocks',      'Blocks >',         '#']                                                                                                            ,
                    ['c-u-contribs',    'Contributions',    script+'?title=Special:Contributions/'+uname+'&action=view']                                                  ,
                    ['c-u-editcount',   'Edit count',       '//tools.wmflabs.org/supercount/index.php?project=en.wikipedia&user='+uname.replace(/_/g,'+')]         ,
                    ['c-u-editsum',     'Edit summaries',   '//tools.wmflabs.org/xtools/editsummary/index.php?lang=en&wiki=wikipedia&name='+uname.replace(/_/g,'+')]   ,
                    ['c-u-wcuser',      'Edit analysis',    'http://en.wikichecker.com/user/?l=all&t='+uname]                                                               ,
                    ['c-u-sul',         'SUL status',       '//tools.wmflabs.org/quentinv57-tools/tools/sulinfo.php?username='+uname]                                                           ,
                    ['c-u-subpages',    'Userspace',        script+'?title=Special:PrefixIndex/User:'+uname+'/&action=view']                                              ,
                    ['c-u-email',       'Email user',      script+'?title=Special:EmailUser/'+uname+'&action=view']                                                      ,
                    ['c-u-groups',      'User groups',      script+'?title=Special:ListUsers&action=view&limit=1&username='+uname]                                        ,
                    ['c-u-rightslog',   'Rights changes',   script+'?title=Special:Log&action=view&type=rights&page=User:'+uname]
                ));

                menus[menus.length] = createMenu('user-logs',false,Array(
                    ['c-ul-logs',       'All user logs',    script+'?title=Special:Log&action=view&user='+uname]              ,
                    ['c-ul-blocks',     'Blocks',           script+'?title=Special:Log&action=view&type=block&user='+uname]   ,
                    ['c-ul-deletes',    'Deletions',        script+'?title=Special:Log&action=view&type=delete&user='+uname]  ,
                    ['c-ul-moves',      'Moves',            script+'?title=Special:Log&action=view&type=move&user='+uname]    ,
                    ['c-ul-patrols',    'Patrols',          script+'?title=Special:Log&action=view&type=patrol&user='+uname]  ,
                    ['c-ul-protects',   'Protections',      script+'?title=Special:Log&action=view&type=protect&user='+uname] ,
                    ['c-ul-uploads',    'Uploads',          script+'?title=Special:Log&action=view&type=upload&user='+uname]  ,
                    ['c-ul-rights',     'User rights',      script+'?title=Special:Log&action=view&type=rights&user='+uname]
                ));

                menus[menus.length] = createMenu('user-rfx',false,Array(
                    ['c-ux-rfa',        'RfAs',             script+'?title=Special:PrefixIndex/Wikipedia:Requests_for_adminship/'+uname+'&action=view']       ,
                    ['c-ux-rfb',        'RfBs',             script+'?title=Special:PrefixIndex/Wikipedia:Requests_for_bureaucratship/'+uname+'&action=view']  ,
                    ['c-ux-rfar',       'RfAr',             script+'?title=Wikipedia:Requests_for_arbitration/'+uname+'&action=view']                         ,
                    ['c-ux-rfc',        'RfC',              script+'?title=Wikipedia:Requests_for_comment/'+uname+'&action=view']                             ,
                    ['c-ux-rfcu',       'RfCU',             script+'?title=Wikipedia:Requests_for_checkuser/Case/'+uname+'&action=view']                      ,
                    ['c-ux-spi',        'SPI',              script+'?title=Wikipedia:Sockpuppet_investigations/'+uname+'&action=view']
                ));

                menus[menus.length] = createMenu('user-blocks',false,Array(
                    admin?          ['c-ub-block',          'Block user',       script+'?title=Special:BlockIP/'+uname+'&action=view']            :[] ,
                    admin?          ['c-ub-unblock',        'Unblock user',     script+'?title=Special:IPBlockList&action=unblock&ip='+uname]     :[] ,
                                    ['c-ub-ipblock',        'View block',       script+'?title=Special:IPBlockList&action=view&ip='+uname]            ,
                                    ['c-ub-blocklog',       'Block log',        script+'?title=Special:Log&action=view&type=block&page=User:'+uname]
                ));

                if (sajax_init_object()) {
                    if (uname.search(/(?:\d{1,3}\.){3}\d{1,3}/) == 0) {
                        areqs['ip'] = new sajax_init_object();
                        xhr(areqs['ip'], mw.config.get( 'wgScriptPath' )+'/api.php?format=json&action=query&list=blocks&bkusers='+uname+'&bkprop=id&xhr='+Math.random(),function () {
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
                        areqs.user = new sajax_init_object();
                        xhr(areqs.user, mw.config.get( 'wgScriptPath' )+'/api.php?format=json&action=query&list=users&ususers='+uname+'&usprop=blockinfo|groups&xhr='+Math.random(),function () {
                            with (areqs.user) if (readyState == 4 && status == 200) {
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

                        areqs.rfa = new sajax_init_object();
                        xhr(areqs.rfa,mw.config.get( 'wgScriptPath' )+'/api.php?format=json&action=query&list=allpages&apprefix=Requests_for_adminship%2F'+uname+'&apnamespace=4&aplimit=1&xhr='+Math.random(),function () {
                            with (areqs.rfa) if (readyState == 4 && status == 200) {
                                var api = eval('('+responseText+')');
                                if (!api.query.allpages.length) removeLink('c-ux-rfa');
                            }
                        } );

                        areqs.rfb = new sajax_init_object();
                        xhr(areqs.rfb,mw.config.get( 'wgScriptPath' )+'/api.php?format=json&action=query&list=allpages&apprefix=Requests_for_bureaucratship%2F'+uname+'&apnamespace=4&aplimit=1&xhr='+Math.random(),function () {
                            with (areqs.rfb) if (readyState == 4 && status == 200) {
                                var api = eval('('+responseText+')');
                                if (!api.query.allpages.length) removeLink('c-ux-rfb');
                            }
                        } );

                        areqs.uspace = new sajax_init_object();
                        xhr(areqs.uspace,mw.config.get( 'wgScriptPath' )+'/api.php?format=json&action=query&list=allpages&apprefix='+uname+'%2F&apnamespace=2&aplimit=1&xhr='+Math.random(),function () {
                            with (areqs.uspace) if (readyState == 4 && status == 200) {
                                var api = eval('('+responseText+')');
                                if (!api.query.allpages.length) removeLink('c-u-subpages');
                            }
                        } );
                    }

                    areqs.rfx = new sajax_init_object();
                    xhr(areqs.rfx,mw.config.get( 'wgScriptPath' )+'/api.php?format=json&action=query&titles=Wikipedia:Requests_for_arbitration/'+uname+'|Wikipedia:Requests_for_comment/'+uname+'|Wikipedia:Requests_for_checkuser/Case/'+uname+'|Wikipedia:Sockpuppet_investigations/'+uname+'&letype=block&letitle=User:'+uname+'&prop=info&xhr='+Math.random(),function () {
                        with (areqs.rfx) if (readyState == 4 && status == 200) {
                            var api = eval('('+responseText+')');
                            for (i in api.query.pages) switch (api.query.pages[i].title.split('/')[0]) {
                                case 'Wikipedia:Requests for arbitration': if (typeof(api.query.pages[i].missing) != 'undefined') removeLink('c-ux-rfar'); break;
                                case 'Wikipedia:Requests for comment': if (typeof(api.query.pages[i].missing) != 'undefined') removeLink('c-ux-rfc'); break;
                                case 'Wikipedia:Requests for checkuser': if (typeof(api.query.pages[i].missing) != 'undefined') removeLink('c-ux-rfcu'); break;
                                case 'Wikipedia:Sockpuppet investigations': if (typeof(api.query.pages[i].missing) != 'undefined') removeLink('c-ux-spi'); break;
                            }
                        }
                    } );

                    areqs.ublocks = new sajax_init_object();
                    xhr(areqs.ublocks,mw.config.get( 'wgScriptPath' )+'/api.php?format=json&action=query&list=logevents&letype=block&letitle=User:'+uname+'&lelimit=1&xhr='+Math.random(),function () {
                        with (areqs.ublocks) if (readyState == 4 && status == 200) {
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
    jQuery(function () {
        if ( !mw.config.get( 'wgCanonicalSpecialPageName' ) ) {
            with (_cactions) {
            	var script = mw.config.get( 'wgScript' ),
            		articleId = mw.config.get( 'wgArticleId')
                menus[menus.length] = createMenu('page',true,Array(
                                    ['c-p-logs',        'Page logs >',      '#'],
                    articleId?    ['c-p-history',     'History',          script+'?title='+pname+'&action=history']                     :[] ,
                    articleId?    ['c-p-move',        'Move page',        script+'?title=Special:Movepage/'+pname+'&action=view']       :[] ,
                    !vectr?         ['c-p-watch',       'Watch page',       script+'?title='+pname+'&action=watch']                       :[] ,
                    !vectr?         ['c-p-unwatch',     'Unwatch page',     script+'?title='+pname+'&action=unwatch']                     :[] ,
                    admin?          ['c-p-protect',     'Protect page',     script+'?title='+pname+'&action=protect']                     :[] ,
                    admin?          ['c-p-unprotect',   'Unprotect page',   script+'?title='+pname+'&action=unprotect']                   :[] ,
                    admin?          ['c-p-delete',      'Delete page',      script+'?title='+pname+'&action=delete']                      :[] ,
                    admin?          ['c-p-undelete',    'Undelete page',    script+'?title=Special:Undelete/'+pname+'&action=view']       :[] ,
                    articleId?    ['c-p-diff',        'Latest diff',      script+'?title='+pname+'&action=view&diff='+mw.config.get( 'wgCurRevisionId' )]  :[] ,
                    articleId?    ['c-p-editzero',    'Edit intro',       script+'?title='+pname+'&action=edit&section=0']              :[] ,
                    articleId?    ['c-p-wcpage',      'Page analysis',    'http://en.wikichecker.com/article/?a='+pname]                  :[] ,
                                    ['c-p-purge',       'Purge cache',      script+'?title='+pname+'&action=purge']
                ));

                menus[menus.length] = createMenu('page-logs',false,Array(
                                                ['c-pl-logs',       'All page logs',    script+'?title=Special:Log&action=view&page='+pname]                  ,
                                                ['c-pl-deletes',    'Deletion log',     script+'?title=Special:Log&type=delete&page='+pname]                  ,
                                                ['c-pl-moves',      'Move log',         script+'?title=Special:Log&action=view&type=move&page='+pname]        ,
                    articleId?                ['c-pl-patrols',    'Patrol log',       script+'?title=Special:Log&action=view&type=patrol&page='+pname]  :[] ,
                                                ['c-pl-protects',   'Protection log',   script+'?title=Special:Log&action=view&type=protect&page='+pname]     ,
                    mw.config.get( 'wgNamespaceNumber' ) == 6?     ['c-pl-uploads',    'Upload log',       script+'?title=Special:Log&action=view&type=upload&page='+pname]  :[]
                ));
            }

            hideElements(['ca-protect','ca-unprotect','ca-delete','ca-undelete','ca-history','ca-move'],['c-p-unprotect','c-p-protect','c-p-undelete','p-c-delete']);
            if (!_cactions.vectr) hideElements(['ca-watch','ca-unwatch'],['c-p-unwatch','c-p-watch']);

            document.getElementById('c-p-logs').onmouseover = function () {showMenu('opt-page-logs',findPos('c-p-logs',[40,0]))};
            document.getElementById('c-p-logs').onmouseout = function () {hideMenu('opt-page-logs')};
            document.getElementById('c-p-logs').style.fontWeight = 'bold';
        }
    } );
}