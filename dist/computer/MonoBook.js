// ================================================================================
// STARTED Automated tagging script system - by Splarka
// ================================================================================
// Note: Advanced and a bit spooky.
 
if(wgNamespaceNumber != -1) addOnloadHook(addTaggingButtons)
function addTaggingButtons() {
  //in 1.11 you can use (wgAction == 'edit')
  if(document.title.indexOf('Editing ') == 0) {   
    var iTop = 'javascript:insertTop';
    var iBottom = 'javascript:insertBottom';
  } else {
    var iTop = 'javascript:insertGoTop';
    var iBottom = 'javascript:insertGoBottom';
  }

 
function insertTop(stuff) {
  if(!document.getElementById('wpTextbox1')) return
  var text = document.getElementById('wpTextbox1');
  if(text.value.replace(/ /g,'')=='') {
    text.value += stuff;
  } else {
    text.value = stuff + '\n' + text.value;
  }
  document.getElementById('wpSummary').value += ' * tagging  ' + stuff;
  document.getElementById('wpSave').click();
}
 
function insertBottom(stuff) {
  if(!document.getElementById('wpTextbox1')) return
  var text = document.getElementById('wpTextbox1');
  if(text.value.replace(/ /g,'')=='') {
    text.value += stuff;
  } else {
    text.value += '\n' + stuff ;
  }
  document.getElementById('wpSummary').value += '  tagging with: ' + stuff;
  document.getElementById('wpSave').click();
}
 
function insertGoTop(stuff) {
  var url = document.getElementById('ca-edit').firstChild.href;
  document.location.href = url + '&insert=true&inserttop=' + encodeURIComponent(stuff);
}
 
function insertGoBottom(stuff) {
  var url = document.getElementById('ca-edit').firstChild.href;
  document.location.href = url + '&insert=true&insertbottom=' + encodeURIComponent(stuff);
}
 
function processInsert() {
  if(queryString('insertbottom')) {
      insertBottom(queryString('insertbottom'));
  }
  if(queryString('inserttop')) {
    insertTop(queryString('inserttop'));
  }
}
if(queryString('insert')=='true') addOnloadHook(processInsert)
 
function queryString(p) {
  var re = RegExp('[&?]' + p + '=([^&]*)');
  var matches;
  if (matches = re.exec(document.location)) {
    try { 
      return decodeURI(matches[1]);
    } catch (e) {
    }
  }
  return null;
}
 
// ================================================================================
// END Automated tagging script system
// ================================================================================
 
 
/*