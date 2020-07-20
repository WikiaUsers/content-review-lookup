 function loadUbiquityCmd(cmds) {
 	var cmd = cmds.pop();
 	var validity = /^([a-z0-9_]*)$/i;
 	cmd = cmd.replace(/ /g,'_');
 	if(cmd != "" && validity.test(cmd)) {
 		jQuery.get('http://sysadmin.wikia.com/index.php?title=MediaWiki:Ubiquity/'+cmd+'.js&action=raw&ctype=text/javascript', function(msg) {
 			cmdSrc += msg;
 			if(cmds.length>0) loadUbiquityCmd(cmds);
 			else eval(cmdSrc);
 		});
 	}
 }
 
 var cmds = ['The Sysadmin Wiki','Debian package search'];
 var cmdSrc = '';
 loadUbiquityCmd(cmds);
 
 var e = document.createElement('link');
 e.rel = 'webpage-commands';
 e.type = 'text/html';
 e.href = '';
 document.getElementsByTagName('head')[0].appendChild(e);