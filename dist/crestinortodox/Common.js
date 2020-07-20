/* <pre> */

var qPreviewKey = '`';
var qPreviewName = 'Previzualizare rapidă';

function qPreviewButton(){ 
addToolbarButton(qPreviewName, qPreview, 'btnQPreview', 'Quick Preview', qPreviewKey);
}
addOnloadHook(qPreviewButton);

function qPreview(){
var divPreview = document.getElementById('wikiPreview');
if (!divPreview) return;
var btnQPreview = document.getElementById('btnQPreview');
if (btnQPreview) btnQPreview.value = 'Aşteptaţi...';
a = sajax_init_object();
a.open('POST', document.editform.action+'&live', true);
var Boundary = '--------p1415';
a.setRequestHeader('Content-Type', 'multipart/form-data; boundary='+Boundary);
var PostData = '--' + Boundary 
  + '\nContent-Disposition: form-data; name="wpTextbox1"\n\n'
  + document.getElementById('wpTextbox1').value + '\n--'+Boundary;
if (a.overrideMimeType) a.overrideMimeType('text/html');
a.send(PostData);
a.onreadystatechange = function(){
  if (a.readyState != 4) return;
var html = a.responseText;
html = html.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&apos;/g,"'");
divPreview.innerHTML = html;
if (btnQPreview)  btnQPreview.value =  qPreviewName;
};
}

//Adds a text button to edit toolbar
function addToolbarButton(name, onclick, id, tooltip, accesskey){
var toolbar = document.getElementById('toolbar');
if (!toolbar) return;
var newBtn = document.createElement('input');
newBtn.type = 'button'; 
newBtn.style.background = '#adbede';
newBtn.style.height = '22px'; 
newBtn.style.verticalAlign = 'middle';
if (name) newBtn.value = name; 
if (onclick) newBtn.onclick = onclick;
if (id) newBtn.id = id;
if (tooltip) newBtn.title = tooltip; 
if (accesskey) newBtn.accessKey = accesskey; 
toolbar.appendChild(newBtn);
return newBtn;
}

/* </pre> */