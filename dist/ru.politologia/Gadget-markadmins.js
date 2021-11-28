var userSet = {
'A': '|Ingvar Tolk|',
'B': '|Ingvar Tolk|'
}

var userSetTip = {
'A':'администратор',
'B':'бюрократ'}

addOnloadHook(markUsers)
 
function markUsers(){
 var body, lnk, mm, user, mark, i, k, flags, tips
 cont = document.getElementById('bodyContent') || document.getElementById('content')
 if (!cont) return
 var links = cont.getElementsByTagName('A')
 for (i=0; i<links.length; i++){
  lnk = links[i]
  if (!lnk.title || ! (mm=lnk.title.match('Участник:(.*)'))) continue
  user = decodeURIComponent(mm[1])
  if (lnk.className.indexOf('new') != -1) user = user.replace(/ \([^\)]+\)$/,'')
  user = '|' + user + '|'
  flags = []
  for (k in userSet)
    if (userSet[k].indexOf(user) >= 0)
	  flags.push(k)
  if (flags.length == 0) continue
  tips = []
  for (k in flags) tips.push(userSetTip[flags[k]])
  mark = document.createElement('tt')
  mark.className = 'userflags'
  mark.appendChild(document.createTextNode('(' + flags.join(',') + ')'))
  lnk.appendChild(mark)
  lnk.title += ' ('+tips.join(', ')+')'
 }
}