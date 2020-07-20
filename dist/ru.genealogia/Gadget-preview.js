function ajaxPreviewInit(){
 if (typeof ajaxPreviewKey != 'string') ajaxPreviewKey = 'p'
 if (typeof ajaxDiffKey != 'string') ajaxDiffKey  = 'v'
 ajaxPreviewPos = window.ajaxPreviewPos || 'right'
 if (ajaxPreviewPos != 'bottom'){
   var tOld = document.getElementById('toolbar') || document.getElementById('wpTextbox1')
   tOld.style.clear = 'none'
   var d = document.createElement('div'); d.style.cssText = 'width:100%; clear:both'
   tOld.parentNode.insertBefore(d, tOld)
   var tNew = document.createElement('div'); tNew.style.cssText = 'float:'+ ajaxPreviewPos
   tOld.parentNode.insertBefore(tNew, tOld)
 }
 addBtn(window.ajaxPreviewButton, 'wpPreview', ajaxPreviewKey)
 addBtn(window.ajaxDiffButton, 'wpDiff', ajaxDiffKey)
 function addBtn(name, id, akey){ 
  var btnOld = document.getElementById(id)
  if (!btnOld) return
  var btn = document.createElement('input'); btn.type = 'button'
  btn.onclick = ajaxPreviewClick;  btn.id = id + 'Live'
  if (!name){ //extract last word from standard buttons
    name = btnOld.value.split(' '); name = name[name.length-1]
    name = name.substring(0,1).toUpperCase() + name.substring(1) 
  }
  btn.value = name;  btn.title = btnOld.value + ' (Ajax)'
  if (ajaxPreviewPos == 'bottom'){
    btnOld.parentNode.insertBefore(btn, btnOld)
    btn.value = btnOld.value
    btnOld.value = '>'
  }else{
    btn.style.cssText = 'height:22px; padding:0 1px'
    tNew.appendChild(btn)
  }
  if (akey){ //reassign acces key
    if (btnOld.accessKey == akey){ 
      btnOld.accessKey = ''
      btnOld.title = btnOld.title.replace(tooltipAccessKeyRegexp, '')
    }
	btn.accessKey = akey
    btn.title += ' ['+tooltipAccessKeyPrefix+akey+']'
  }
  btn.value2 = btn.value
 }
}



function ajaxPreviewClick(){ajaxPreviewRun(this)}

function ajaxPreviewRun(btn){
 var wkPreview = document.getElementById('wikiPreview'), form = document.editform
 var aj = sajax_init_object()
 if (!wkPreview || !form || !aj) return
 var oldHeight = wkPreview.offsetHeight
 var el, htm, isDiff = (btn.id=='wpDiffLive')
 wkPreview.style.opacity = '0.3'; wkPreview.style.color = 'gray'; document.body.style.cursor = 'wait'
 if (el=document.getElementById('wikiDiff')) el.style.display = 'none'
 if (el=document.getElementById('newarticletext')) el.style.display = 'none'
 btn.style.width = Math.max(btn.scrollWidth, btn.offsetWidth) + 'px';  btn.value = '...'
 //prepare
 var txt = form.wpTextbox1.value, action = form.action
 var boundary = '--------123xyz', data = ''
 if (isDiff){
   addData('wpDiff', ''); addData('wpStarttime'); addData('wpEdittime')
   if (!window.ajaxPreview_CSS) ajaxPreview_CSS = importStylesheetURI('/skins-1.5/common/diff.css') 
 }else{
   action += '&live'
   if (form.wpSection && form.wpSection.value) txt += '\n<br /><references />'
 } 
 addData('wpTextbox1', txt); addData('wpSection'); addData('wpSummary')
 //send
 aj.open('POST', action, true)
 aj.setRequestHeader('Content-Type', 'multipart/form-data; charset=UTF-8; boundary='+boundary)
 aj.send(data + '--' + boundary)
 aj.onreadystatechange = function(){
  if (aj.readyState != 4) return
  wkPreview.style.display = 'block'
  if (isDiff){
    var htm = aj.responseText
    var p1 = htm.indexOf("<table class='diff'>" )
    var p2 = htm.indexOf('</table>', p1)
    htm = (p1!=-1 && p2!=-1) ? htm.substring(p1, p2+8) : 'Error'
  }else{
    htm = aj.responseText.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&apos;/g,"'")
  }
  wkPreview.innerHTML = htm
  btn.value = btn.value2

  if (el = wkPreview.getElementsByTagName('h2')[0]){
    if (el.style.textAlign != 'right') el.innerHML +=  ' (Ajax)'
    el.style.textAlign = 'right'
  }

  if (window.ajaxPreviewScrollTop && wkPreview.scrollIntoView) wkPreview.scrollIntoView()
  else document.documentElement.scrollTop +=  wkPreview.offsetHeight - oldHeight 

  wkPreview.style.opacity = ''; wkPreview.style.color = ''; document.body.style.cursor = ''
  if (!isDiff) ajaxPreviewFinish(wkPreview)
 }

 function addData(name, value){
   if (!value) value = form[name] ? form[name].value : ''
   data += '--' + boundary + '\nContent-Disposition: form-data; name="'+name+'"\n\n' + value + '\n'
 }
}


function ajaxPreviewFinish(el){
 collapsibleDivs()
 collapsibleTables()
 sortables_init()
}


if (wgAction=='edit' || wgAction=='submit') addOnloadHook(ajaxPreviewInit)