(function(){
    function en(e) { return encodeURIComponent(e) }
    function el(e) { return document.createElement(e) }
    function tstamp(t) { return !t.getUTCFullYear() ? null : // Safari + Chrome
                                (t.getUTCFullYear()+":0"+(t.getUTCMonth()+1)+":0"+t.getUTCDate()+":0"+
                                 t.getUTCHours()   +":0"+ t.getUTCMinutes() +":0"+t.getUTCSeconds())
                                 .replace(/:0?(\d\d)/g, '$1') }
    function ch(o) { for (var i in o) { return o[i] } }
 
 
    var conf = {
            'start': new Date("Nov 21 2008 +0000"),
            'end':   new Date("Nov 28 2008 +0000"),
            'criteria': {
                'count': 500,
                'registration': '2009-08-03T00:00:00Z'
            },
            'pagepath': 'Выборы/Голосование',
            'talkpath': 'Выборы/Обсуждение/',
            'votepath': 'Выборы/Голосование/'
        }
    var ico = {
            'up': 'http://upload.wikimedia.org/wikipedia/commons/thumb/',
            'supp'      : '2/2d/Support-gray.svg/39px-Support-gray.svg.png',
            'suppinact' : '8/8d/Support-colored.svg/39px-Support-colored.svg.png',
            'suppact'   : '5/5b/Support-filled.svg/39px-Support-filled.svg.png',
             'opp'      : 'e/e7/Oppose-gray.svg/39px-Oppose-gray.svg.png',
             'oppinact' : '0/06/Oppose-colored.svg/39px-Oppose-colored.svg.png',
             'oppact'   : '7/7d/Oppose-filled.svg/39px-Oppose-filled.svg.png'
        }
    var loc = {
            'votebutton': 'Проголосовать',
            'statuscriteria': 'Проверка критериев…',
            'criteriafail': '<h3 class="voting-error">Вы не соответствуете критериям.</h3><p>Ваши голоса на этих выборах <b>не будут засчитаны</b>.</p><p>Впрочем, если вам просто любопытно, как работает скрипт, вы можете посмотреть на него без сохранения голосов.</p>',
            'criteriafailbutton': 'Посмотреть',
            'loadingvotes': 'Проверка имеющихся голосов…',
            'draghere': 'Перетащите первого кандидата сюда',
            'votinghelp': '<div class="voting-help"><h4>Основная часть</h4>\
            <p>Расставьте голоса «за» и «против» рядом с именами тех кандидатов, относительно которых у вас сформировано мнение. Вы сможете дополнить или изменить выбор позже.</p>\
            </div>',
            'schulzehelp': '<div class="voting-help"><h4>Дополнительная часть (метод Шульце)</h4>\
            <p>В качестве эксперимента проводится сбор данных для подсчёта голосов по <a href="/wiki/Метод_Шульце">методу Шульце</a>. <b>Пожалуйста, примите участие.</b> Если вам очень хочется, вы можете пропустить этот раздел, но для качественного анализа необходимо больше данных, чем в прошлые разы.</p>\
            <p>Краткая инструкция:</p>\
            <ol>\
                <li>Перетащите какого-нибудь подходящего, на ваш взгляд, кандидата на первый уровень.</li>\
                <li>Перетаскивайте остальных кандидатов в этом же направлении. Кандидатов можно оставлять на существующих уровнях (отмечены цифрами) или на новых (места для их создания обозначены пунктиром). Во время перетаскивания пунктир показывает относительное расположение кандидата в списке.</li>\
                <li>Перед сохранением убедитесь в соответствии расстановки вашему мнению: более хорошие кандидаты выше, менее хорошие ниже, равные на одном уровне, совсем неподходящие в разделе «нет предпочтения». Если вы являетесь одним из кандидатов, <em>не оставляйте</em> себя в нижней секции.</li>\
            </ol>\
            <p>До конца выборов вы сможете изменить своё мнение.</p>\
            <p style="font-size:smaller">Если что-то осталось непонятным, можно <a target="_blank" href="/wiki/Википедия:Выборы_арбитров/Весна_2009/Голосование/$/%3F">задать вопрос</a>.</p>\
            </div>',
            'nopreference': 'нет предпочтения',
            'newlevel': 'новый уровень',
            'justbeforesave': 'Смело направляйте любые отзывы, предложения и сообщения&nbsp;об&nbsp;ошибках на&nbsp;<a href="/wiki/MediaWiki_talk:Voting9.js">страницу&nbsp;обсуждения</a>.',
            'savebutton': 'Сохранить',
            'schulzebuzz': 'Вы пропустили секцию «метод Шульце».\n\nДля анализа итогов по методу Шульце нужно как можно больше голосов, поэтому будет лучше, если вы разберётесь (это нетрудно) и подумаете.\n\nЧтобы сохранить текущие голоса сейчас, нажмите «Отмена». Тогда бот пришлёт вам напоминание в четверг утром.',
            'saveprog': '<b>Не закрывайте страницу</b> до завершения сохранения.',
            'summary': 'голос\u200B',
            'thankyou': '<h3>Спасибо за участие в выборах!</h3><p>Вы сможете изменить ваши голоса до конца голосования.</p><p>Только что отданные голоса можно посмотреть на <a href="/wiki/Special:Mycontributions">странице вклада</a>.</p>'
        }
    var cand = 'Test1 · Test2'.split(' · ')
    var wgAPIPath = wgServer + wgScriptPath + '/api.php?format=json&'
 
    var votes = {}
    var criteriaMatch
    var saving = null
    var aj = sajax_init_object()
    var token
 
    // drag-n-drop
    var coo
    var cooD
    var drag, dragGhost, dragItem, dragOriginal
    var dragHere
 
    function votingStart() {
        importStylesheetURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Voting7.css&action=raw&ctype=text/css')
        btn.disabled = true
        btn.style.display = 'none'
        status.innerHTML = loc.statuscriteria
        aj.onreadystatechange = votingStartContinue
        aj.open('GET', wgAPIPath + 'action=query&list=users&usprop=registration|editcount&ususers=' +
                en(wgUserName), true)
        aj.send('')
    }
    function votingStartContinue() {
        if (aj.readyState != 4) return
        if (aj.status != 200) { // temporary problems?
            votingStart()
            return
        }
        userinfo = eval('(' + aj.responseText + ')').query.users[0]
        if (// a valid voter must be a non-anonymous user 
            userinfo.missing !== undefined ||
            // who is not blocked
            userinfo.blockedby ||
            // whose editcount is at least conf.criteria.count
            userinfo.editcount < conf.criteria.count ||
            // and who is registered no later than conf.criteria.registration
            // "null" means "before 2005-12-29", user creation was not logged before then
            (userinfo.registration !== null && userinfo.registration > conf.criteria.registration))
            votingCriteriaFail()
        else {
            criteriaMatch = 1
            votingContinue()
        }
    }
    function votingCriteriaFail() {
        status.innerHTML = loc.criteriafail
        btn.style.display = ''
        btn.disabled = false
        btn.value = loc.criteriafailbutton
        btn.onclick = function(){criteriaMatch = 0; votingContinue()}
    }
    function votingContinue() {
        status.innerHTML = loc.loadingvotes
        btn.style.display = ''
        btn.onclick = votingToken
        btn.value = loc.savebutton
        btn.disabled = true
        // latest contributions in ns:4 + Schulze method page
        aj.open('GET', wgAPIPath + 'action=query' +
                '&list=usercontribs&ucnamespace=0&uclimit=500' +
                '&ucuser='  + en(wgUserName)     +
                (tstamp(conf.start) ? '&ucend=' + tstamp(conf.start) : '') +
                '&ucdir=older'                   +
                '&prop=revisions&rvprop=content' +
                '&titles='  + en(conf.votepath+'$') ,
                true)
        aj.onreadystatechange = votingDraw
        aj.send('')
    }
    function votingDraw() {
        status.innerHTML = 'Рисуем 1'

        if (aj.readyState != 4) return
        if (aj.status != 200) { // temporary problems?
            votingContinue()
            return
        }
        btn.disabled = !criteriaMatch
        status.innerHTML = aj.responseText
 
        var query = eval('(' + aj.responseText + ')')
            query = query.query
        var co = query.usercontribs
        var sc = ch(query.pages).revisions[0]['*'].split('\n')

        // retrieving "traditional" votes, according to contributions, only latest ones are valid
        for (i=0; i<cand.length; i++) votes[cand[i]] = {'orig':0, 'value':0}
        for (var i=co.length-1; i>=0; i--) {
            var m = co[i].title.indexOf(conf.votepath) == 0
            if (m) m = co[i].title.match(/\/([+-])\/(.*?)$/)
            if (m) votes[m[2]] = { 'orig' : m[1]=='+' ? +1 : -1,
                                   'value': 0 }
        }
 
        // retrieving Schulze method page
        // we assume that the bot will immediately revert not-well-formed edits
        for (i=0; i<sc.length; i++) {
            if (sc[i].indexOf('* ' + wgUserName + ' | ') == 0) {
                votes._ = {'reading': true}
                var j = 0
                continue
            }
            if (!votes._) continue
            if (sc[i].indexOf('* ') == 0) votes._.reading = undefined
            if (votes._.reading) {
                j++
                var m = sc[i].match(/^\*(.) (.*)/)
                    m[2] = m[2].split(' | ')
                votes._[m[1]=='#'?j:0] = m[2]
            }
        }
        if (!votes._) votes._ = {0: cand}
        if (!votes._[1]) votes._[1] = []
        if (!votes._[0]) votes._[0] = []
 
        // drawing
        var div1 = el('div')
            div1.id = 'voting-standard'
            div1.innerHTML = loc.votinghelp
        var tab = el('table')
 
        var tr, img, td1, td2, td3, lin
        for (i in votes) {
            if (i != '_') {
                tr = el('tr')
                td1 = el('td')
                img = el('img')
                img.alt = '+'
                img.width = img.height = 39
                img.src = ico.up + (votes[i].orig == 1 ? ico.suppinact : ico.supp)
                lin = el('a')
                lin.href = '#'
                lin.title = '+'
                lin.appendChild(img)
                td1.appendChild(lin)
 
                td2 = el('td')
                img = el('img')
                img.alt = '-'
                img.width = img.height = 39
                img.src = ico.up + (votes[i].orig == -1 ? ico.oppinact : ico.opp)
                lin = el('a')
                lin.href = '#'
                lin.title = '-'
                lin.appendChild(img)
                td2.appendChild(lin)
 
                td3 = el('td')
                td3.className = 'talklink'
                lin = el('a')
                lin.href = wgServer + wgScript + '?title=' + encodeURI(conf.talkpath + i)
                lin.target = '_blank'
                lin.innerHTML = i
 
                td3.appendChild(lin)
 
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tab.appendChild(tr)
            }
        }
        div1.appendChild(tab)
        // IE has problems inserting the table
        div1.innerHTML += ''
        var imgs = div1.getElementsByTagName('img')
        for (i=0; i<imgs.length; i++)
            imgs[i].parentNode.onclick = oncl
 
        dragHere = el('span')
        dragHere.id = 'voting-draghere'
        dragHere.innerHTML = loc.draghere
 
        var div2 = el('div')
            div2.id = 'voting-schulze'
            div2.innerHTML = loc.schulzehelp
        var ul = el('ul')
            ul.id = 'schulze-list'
        var gw, theid, can, first, level, spc
        var c
        for (i=1; i!=null; i==0 ? i=null : i++) {
            gw = el('li')
            gw.className = 'groundwork'
            theid = el('div')
            theid.className = 'li-id'
            theid.innerHTML = !votes._[i] ? i : (i==1 ? '' : i-1) + '…' + i
            gw.appendChild(theid)
 
            if (!votes._[i]) i=0
 
            level = el('li')
            level.className = 'level'
            if (i==0) level.id = 'voting-no-preference'
            if (i==1 && votes._[i].join('!') == '') {
                level.appendChild(dragHere)
            }
 
            theid = el('div')
            theid.className = 'li-id'
            theid.innerHTML = i==0 ? loc.nopreference : i
            level.appendChild(theid)
 
            for (c=0; c<votes._[i].length; c++) {
                can = el('a')
                can.onclick = function() { return false }
                can.onmousedown = boxMouseDown
                can.innerHTML = votes._[i][c]
                can.className = 'cand'
 
                level.appendChild(can)
            }
            level.appendChild(spacer())
 
            ul.appendChild(gw)
            ul.appendChild(level)
        }
        div2.appendChild(ul)
 
        if (navigator.appName=='Microsoft Internet Explorer') {
            // troubles with scopes
            document.onmousemove = mouseMove
            document.onmouseup = mouseUp
        } else {
            hookEvent('mousemove', mouseMove)
            hookEvent('mouseup',   mouseUp)
        }
 
        status.innerHTML = loc.justbeforesave
        status.parentNode.insertBefore(div1, status)
        status.parentNode.insertBefore(div2, status)
    }
    function votingToken() {
        aj = sajax_init_object()
        aj.onreadystatechange = votingTokenContinue
        aj.open('GET', wgAPIPath + 'action=query&prop=info&intoken=edit&titles=42', true)
        aj.send('')
    }
    function votingTokenContinue() {
        if (aj.readyState != 4) return
        if (aj.readyState == 4 && aj.status != 200) {
            votingToken()
            return
        }
        token = eval('(' + aj.responseText + ')')
        token = ch(token.query.pages).edittoken
        votingSave()
    }
    function votingSave() {
        if (saving == null) {
            var div = el('div')
            div.id = 'voting-saving'
            div.innerHTML = '<div id="voting-progress"><div id="voting-progress-progress" style="width:0%">&nbsp;</div></div>' + loc.saveprog
            status.parentNode.appendChild(div)
            btn.disabled = true
            document.getElementById('voting-schulze' ).style.visibility = 'hidden'
            document.getElementById('voting-standard').style.visibility = 'hidden'
 
            saving = {'cursor': 0, 'pages': []}
 
            for (var i in votes) {
                if (votes[i].value != 0 && votes[i].orig != votes[i].value) {
                    saving.pages[saving.cursor] = {'text': '\n# [[user:' + wgUserName + '|' + wgUserName + ']] ~' + '~~' + '~~\n',
                                                   'page': conf.votepath + (votes[i].value==1?'+':'-') + '/' + i}
                    saving.cursor++
                }
            }
            var text, text2
            var ms, mi
            var li = document.getElementById('schulze-list').getElementsByTagName('li')
 
            text = text2 = '\n* ' + wgUserName + ' | ~' + '~~' + '~~\n'
            for (i=0; i<li.length; i++) {
                ms = li[i].getElementsByTagName('a')
                if (ms.length) {
                    mi = []
                    for (var j=0; j<ms.length; j++) mi[mi.length] = ms[j].innerHTML
                    text += (li[i].id == 'voting-no-preference' ? '*: ' : '*# ') + mi.join(' | ') + '\n'
                }
            }
 
            for (i=1; i!=null; i==0 ? i=null : i++) {
                if (!votes._[i]) i=0
                if (votes._[i].join('.')) text2 += (i==0 ? '*: ' : '*# ') + votes._[i].join(' | ') + '\n'
            }
 
            if (text != text2) {
                saving.pages[saving.cursor] = {'page': conf.votepath + '$',
                                               'text': text}
            }
            saving.cursor = -5
            if (saving.pages.length)
                votingSave()
            else
                document.getElementById('voting-container').innerHTML = loc.thankyou
        } else {
            if (saving.cursor != -5 && aj.readyState != 4) return
            if (aj.readyState == 4 && aj.status != 200) {
                votingSave()
                return
            }
            if (saving.cursor == -5) saving.cursor = 0
            if (saving.cursor == -1) return
 
            document.getElementById('voting-progress-progress').style.width = 100*(saving.cursor+1)/saving.pages.length + '%'
            aj = sajax_init_object()
            aj.open('POST', wgAPIPath + 'action=edit&notminor=1&unwatch=1&token=' + en(token) + '&summary=' + en(loc.summary) +
                                 '&title=' + en(saving.pages[saving.cursor].page) +
                                 '&appendtext=' + en(saving.pages[saving.cursor].text), true)
            aj.onreadystatechange = votingSave
            aj.send('')
            saving.cursor++
            if (!saving.pages[saving.cursor]) {
                saving.cursor = -1
                document.getElementById('voting-container').innerHTML = loc.thankyou
            }
        }
    }
 
    // onclick() for round buttons
    function oncl() {
        var imgs = this.parentNode.parentNode.getElementsByTagName('img')
        var link = this.parentNode.parentNode.getElementsByTagName('a')[2]
        var ca = link.innerHTML
        var ti = this.title
        var vo = ti=='+'?1:-1
        votes[ca].value = (votes[ca].value==vo) ? 0 : vo
 
        imgs[0].src = ico.up + (votes[ca].value== 1 ?ico.suppact:(votes[ca].orig== 1 ?ico.suppinact:ico.supp))
        imgs[1].src = ico.up + (votes[ca].value==-1 ?ico.oppact :(votes[ca].orig==-1 ?ico.oppinact :ico.opp))
 
        link.className = ['opp', '', 'supp'][votes[ca].value + 1]
 
        return false
    }
 
 
    // used by drag-n-drop
 
    function disableSelection(el, g){
        // doesn't work for Opera, thus onmousemove drops selection ranges
        el.onselectstart       = g ? function(){ return false } : null
        el.unselectable        = g ? "on" : "off"
        el.style.MozUserSelect = g ? "none" : ""
    }
    function absolutePosition(el) {
        q = el
        co = {'x': 0, 'y': 0}
        while (q.offsetParent){
            co.x += q.offsetLeft
            co.y += q.offsetTop
            q     = q.offsetParent
        }
        return co
    }
    function coords(e) {
        if (e.pageX !== undefined)
            return {'x': e.pageX, 'y': e.pageY}
        else // IE (buggy for v7 while zoomed, but who cares?)
            return {
                'x': e.clientX + document.documentElement.scrollLeft, 
                'y': e.clientY + document.documentElement.scrollTop
            }
    }
    function boxMouseDown() {
        if (dragHere && dragHere.parentNode) dragHere.parentNode.removeChild(dragHere)
 
        dragGhost = this
        dragGhost.id = 'voting-ghost'
        dragOriginal = dragItem = this.parentNode
        dragItem.className += ' dragitem'
        drag = document.createElement('a')
        drag.innerHTML = this.innerHTML
        drag.id = 'voting-drag'
        drag.className = 'cand'
 
        cooD = absolutePosition(dragGhost)
        cooD.x -= coo.x
        cooD.y -= coo.y
        mouseMove({'pageX': coo.x, 'pageY': coo.y})
 
        document.body.appendChild(drag)
 
        disableSelection(document.body, true)
        disableSelection(drag, true)
    }
    function mouseMove(e) {
        coo = coords(e || window.event)
        if (!drag) return
        if (document.defaultView) // Opera: removing selection
            document.defaultView.getSelection().removeAllRanges()
 
        drag.style.left = (coo.x + cooD.x) + "px"
        drag.style.top  = (coo.y + cooD.y) + "px"
 
        var lis = document.getElementById('schulze-list').getElementsByTagName('li')
        var dragCurrent
 
        for (i=0; i<lis.length; i++) {
            pos = absolutePosition(lis[i])
            if (pos.x <= coo.x &&
                pos.y <= coo.y &&
                pos.x + lis[i].offsetWidth  > coo.x &&
                pos.y + lis[i].offsetHeight > coo.y) {
                dragCurrent = lis[i]
            }
        }
        if (!dragCurrent) { // pointer outside the whole list, returning ghost to its original location
            dragCurrent = dragOriginal
        }
        if (dragCurrent != dragItem) { // changing target level
            dragItem.className = dragItem.className.replace(' dragitem', '')
            d = dragItem.getElementsByTagName('div')[0]
            d.innerHTML = d.innerHTML.replace(/^([^:]+).*/, '$1')
            dragItem.removeChild(dragGhost)
 
            dragItem = dragCurrent
            dragItem.className += ' dragitem'
 
            if (dragItem.className.match(/groundwork/)) {
                dragItem.getElementsByTagName('div')[0].innerHTML += ': ' + loc.newlevel
                dragItem.appendChild(dragGhost)
            }
            else { // not an empty level, so inserting dragGhost in an appropriate place
                var bef
                var ch = dragItem.getElementsByTagName('a')
                var spacer = dragItem.getElementsByTagName('span')[0]
                if (ch.length == 0) {
                    bef = spacer
                } else {
                    bef = ch[0]
                    for (i=0; i<ch.length; i++)
                        if (ch[i].innerHTML < dragGhost.innerHTML)
                            bef = ch[i+1] || spacer
                }
                dragItem.insertBefore(dragGhost, bef)
            }
        }
    }
    function spacer() {
        var el = document.createElement('span')
        el.className = 'spacer'
        el.innerHTML = '&nbsp;'
        return el
    }
    function mouseUp() {
        if (!dragGhost || !drag || !dragItem) return
 
        dragItem.className = dragItem.className.replace(' dragitem', '')
        dragItem = null
 
        dragGhost.id = ''
        dragGhost = null
 
        disableSelection(document.body, false)
        disableSelection(drag, false)
        document.body.removeChild(drag)
        drag = null
 
        // arranging structures
        function groundwork() {
            var el = document.createElement('li')
            el.className = 'groundwork'
            el.innerHTML = '<div class="li-id">!</div>'
            return el
        }
 
        // creating groundworks around any newly created level
        var lis = document.getElementById('schulze-list').getElementsByTagName('li')
        for (i=0; i<lis.length-1; i++)
            if (lis[i].className == 'groundwork' && lis[i].getElementsByTagName('a').length > 0) {
                lis[i].className = 'level'
                lis[i].appendChild(spacer())
                lis[i].parentNode.insertBefore(groundwork(), lis[i].nextSibling)
                lis[i].parentNode.insertBefore(groundwork(), lis[i])
            }
 
        // destroying empty levels, except when there's only one
        var lis = document.getElementById('schulze-list').getElementsByTagName('li')
        if (lis.length > 4)
            for (i=0; i<lis.length-1; i++)
                if (lis[i].className == 'level' && lis[i].getElementsByTagName('a').length == 0)
                    lis[i].parentNode.removeChild(lis[i])
 
        // blowing up inevitable duplicate groundworks
        var lis = document.getElementById('schulze-list').getElementsByTagName('li')
        for (i=1; i<lis.length; i++) {
            if (lis[i].className == 'groundwork' && lis[i-1].className == 'groundwork')
                lis[i].parentNode.removeChild(lis[i])
        }
 
        var lis = document.getElementById('schulze-list').getElementsByTagName('li')
        // "drag first candidate here" label
        if (lis[1].getElementsByTagName('a').length == 0)
            lis[1].insertBefore(dragHere, lis[1].getElementsByTagName('span')[0])
 
        // renumbering
        var j = 0
        for (i=0; i<lis.length-1; i++) {
            lis[i].getElementsByTagName('div')[0].innerHTML =
                lis[i].className == 'groundwork'
                ? (j==0 ? '…'+(++j) : (i==lis.length-2 ? ++j : j+'…'+(++j))) : j
        }
    }
 
 
    document.getElementById('voting-container').innerHTML = ''
    var btn = el('input')
    btn.type = 'button'
    btn.id = 'voting-button'
    btn.value = loc.votebutton
    btn.onclick = votingStart
    var status = el('div')
    status.id = 'voting-status'
 
    document.getElementById('voting-container').appendChild(status)
    document.getElementById('voting-container').appendChild(btn)
})()