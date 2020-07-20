/* Any JavaScript here will be loaded for all users on every page load. */

// Offer Ubiquity commands
if(wgPageName.indexOf("Ubiquity/")==0 && wgAction == "view") {
	commandname = wgPageName.substring(9);
	if(commandname=='All_package') {
		script = document.createElement('script');
		script.src = '/index.php?title=MediaWiki:Ubiquity/All_package.js&action=raw&ctype=text/javascript';
		script.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(script);
	}else{
		var validity = /^([a-z0-9_]*)$/i;
		if(commandname != "" && validity.test(commandname)) {
			var e=document.createElement("link");
			e.rel = "commands";
			e.href = "http://sysadmin.wikia.com/index.php?title=MediaWiki:Ubiquity/"+commandname+".js&action=raw&ctype=text/javascript";
			document.getElementsByTagName('head')[0].appendChild(e);
		}
	}
}