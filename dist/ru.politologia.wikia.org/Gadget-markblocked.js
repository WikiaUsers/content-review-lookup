function markBlocked() {

  if (!window.mbTempStyle)
    mbTempStyle = 'opacity: 0.7; text-decoration: line-through'
  if (!window.mbIndefStyle)
    mbIndefStyle = 'opacity: 0.4; font-style: italic; text-decoration: line-through'
  if (!window.mbTipBoxStyle)
    mbTipBoxStyle = 'font-size:smaller; background:#FFFFF0; ' +
                    'border:1px solid #FEA; padding:0 0.3em; color:#AAA'
  if (!window.mbTooltip) {
    i18n = {                                                  // authors
      'dsb': '(blokěrowany wót $2 za traśe wót $1: $3)',      // hsb:User:Tlustulimu  
      'en': '(blocked by $2 with an expiry time of $1: $3)',
      'eo': '(forbarita de $2 por daŭro de $1: $3)',          // ru:User:Александр_Сигачёв
      'hsb': '(zablokowany wot $2 za traće wot $1: $3)',      // hsb:User:Tlustulimu
      'pt': '(bloqueado por $2 até $1: $3)',                  // ru:User:Volkov
      'ru': '(блокировка $2 на срок $1: $3)',                 // ru:User:Kalan
      'sv': '(har blockerats av $2 till $1: $3)',             // ru:User:Flrn
      'uk': '(блокування $2 на термін $1: $3)'                // ru:User:Ahonc
    }
    mbTooltip = i18n[wgUserLanguage] || i18n.en
  }
  appendCSS('.user-blocked-temp    {' + mbTempStyle   + '}\n' +
            '.user-blocked-indef   {' + mbIndefStyle  + '}\n' +
            '.user-blocked-tipbox  {' + mbTipBoxStyle + '}')
  function apiRequest(params, callback) {
    var aj = sajax_init_object() 
    aj.onreadystatechange = function() {
      if (aj.readyState != 4 || aj.status != 200) return  
      callback(eval('(' + aj.responseText + ')'))
    }
    aj.open('GET', wgServer + wgScriptPath + '/api.php?format=json&' + params, true)
    aj.send('')
  }
  
  var users = []
  var userLinks = []

  function checkLinks(namespaces) {
    function target(link) {
      ap = wgArticlePath.replace('$1', '')
      if (link.href.replace(wgServer, '').match(/^http:/)) return ''
        // elimnating the decodeURIComponent() error on non-UTF links
      if (link.href.replace(wgServer, '').substr(0, ap.length) == ap) // .wikipedia.org/wiki/...
        return link.title + (link.href.match(/#/) ? '#...' : '')
                          // that's risky, but we can't bypass IE6's bugs another way...
                          // "thanks" Tim Starling if it breaks eventually :(
      else // .wikipedia.org/w/index.php?title=...
        return decodeURIComponent(link.href.replace(wgScript, '')
                                           .replace(/.*[?&]title=(.*?)&[^#]*/, '$1')
                                           .replace(/_/g, ' '))
    }
    
    var content = document.getElementById('content') ||
                  document.getElementById('mw_content') ||
                  document.body
    var links = content.getElementsByTagName('a')
      
    var ns = namespaces.query.namespaces
    var ca
    for (var i = 0; i < namespaces.query.specialpagealiases.length; i++) {
      if (namespaces.query.specialpagealiases[i].realname == 'Contributions')
        ca = namespaces.query.specialpagealiases[i].aliases
    }
    
    if (!namespaces.fromcookie) {
      document.cookie = 'mbNamespaces='
            + escape([ns[-1]['*'], ns[2]['*'], ns[3]['*'], ca.join('|')].join(':'))
            + '; expires=' + (new Date((new Date).getTime() + Math.exp(20))).toGMTString()
    }
    
    //   User:   User_talk:   Special:Contributions/   in canonical form, as they are in hrefs
    var isUser = new RegExp('^((' + ns[2]['*'] + '|' + ns[3]['*'] + '):|' + ns[-1]['*'] +
                                   ':(' + ca.join('|').replace(/_/g, ' ') + ')\\/)([^\\/#]*)$')
    var j = 0
    for (i = 0; i < links.length; i++) {
      if (target(links[i]).match(isUser)) {
        users[j++] = target(links[i]).replace(isUser, '$4')
        userLinks[j-1] = links[i]
        links[i].style.opacity = window.mbLoadingOpacity || 0.85 // a way to mark that the data is loading
      }
    }
    if (j == 0) return // nobody to mark

    var query = ''
    
    // performing sort and duplicate cleanup, otherwise we risk of some users being marked twice
    var usersTemp = users.join('|').split('|')
        usersTemp.sort()
    var u = []
        u[0] = usersTemp[0]
    if (usersTemp[1]) {
      j = 1
      for (i = 1; i < usersTemp.length; i++) {
        if (usersTemp[i] != usersTemp[i-1])
          u[j++] = usersTemp[i]
      }
    }
    
    for (i = 0; i < u.length; i++) {
      if (query.length > 1666) { // splitting the URL into small parts when needed
        apiRequest('action=query&list=blocks&bklimit=500&bkusers=' + query, markLinks)
        query = ''
      }
      query += (query ? '|' : '') + encodeURIComponent(u[i])
    }
    if (query) apiRequest('action=query&list=blocks&bklimit=500&bkusers=' + query, markLinks)
  }
  
  function markLinks(banlist) {
    var bl = banlist.query.blocks
    if (!bl) { // no bans
      for (var i = 0; i < userLinks.length; i++)
        userLinks[i].style.opacity = ''
      return
    }
    var mark = []
    var tips = {}
    var infin = {}
    var j = 0
    for (var i = 0; i < bl.length; i++) {
      mark[j++] = bl[i].user
      tips[bl[i].user] = ' ' + mbTooltip
                               .replace('$1', bl[i].expiry.replace(/(.*)T(.*)Z/, '$1 $2 UTC'))
                               .replace('$2', bl[i].by)
                               .replace('$3', bl[i].reason)
      infin[bl[i].user] = bl[i].expiry.substr(0, 2) == 'in'
    }
    var fenceOfShame = '|' + mark.join('|') + '|'
    var span
    for (var i = 0; i < userLinks.length; i++) {
      userLinks[i].style.opacity = ''
      if (fenceOfShame.indexOf('|' + users[i] + '|') > -1) {
        userLinks[i].className += ' user-blocked-' + (infin[users[i]] ? 'indef' : 'temp')
        if (window.mbTipBox) {
          span = document.createElement('span')
          span.title = users[i] + tips[users[i]]
          span.className = 'user-blocked-tipbox'
          span.innerHTML = '#'
          userLinks[i].parentNode.insertBefore(span, userLinks[i])
        } else
          userLinks[i].title += tips[users[i]]
      }
    }
  }
  
  if (ca = document.getElementById('ca-showblocks'))
    ca.parentNode.removeChild(ca)
  
  var cookie = document.cookie.match(/mbNamespaces=(.*?);/)
  if (cookie) {
    cookie = unescape(cookie[1]).split(':')
    checkLinks({
      'query': {
        'namespaces': { '-1': { '*': cookie[0] }, '2': { '*': cookie[1] }, '3': { '*': cookie[2] } },
        'specialpagealiases': [{'realname': 'Contributions', 'aliases': cookie[3].split('|')}]
      },
      'fromcookie': 1
    })
  } else {
    apiRequest('action=query&meta=siteinfo&siprop=namespaces|specialpagealiases', checkLinks)
  }
}

if (wgAction != 'edit') {
  if (window.mbNoAutoStart) {
    f = function(){
      addPortletLink('p-cactions', 'javascript:markBlocked()', 'XX', 'ca-showblocks')
    }
  } else {
    f = markBlocked
  }
  addOnloadHook(f)
}