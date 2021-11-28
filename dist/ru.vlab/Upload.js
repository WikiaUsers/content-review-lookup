function uploadPage(){
 var desc = document.getElementById('wpUploadDescription')
 var tmpl = document.getElementById('imageinfo')
 if (tmpl && desc && !desc.value) desc.value = tmpl.innerHTML
 var span = document.getElementById('insertlink')
 if (!span) return
 var a = document.createElement('a')
 a.href = 'javascript:addRationaleTemplate()'
 span.parentNode.insertBefore(a, span)
 a.appendChild(span)
 span.style.display = 'inline'
}
function addRationaleTemplate(){
 var desc = document.getElementById('wpUploadDescription')
 var tmpl = document.getElementById('rationale')
 if (desc && tmpl && desc.value.indexOf(tmpl.innerHTML.substring(0,8)) == -1){
   desc.value += '\n' + tmpl.innerHTML
   desc.rows = 15
 }
}

addOnloadHook(uploadPage)