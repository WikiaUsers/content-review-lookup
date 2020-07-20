//Add an interface for adding pings
document.getElementById('pingspan').onmouseover = function(event) {document.getElementById('pings').style.display = 'block';}
document.getElementById('pingspan').onmouseout = function(event) {document.getElementById('pings').style.display = 'none'; createCookie('pingphrases', document.getElementById('pings').value.split('\n').join('\\n'), 99999);}
 
mainRoom.inlineAlert(i18n['init']);