function Preparse(input) { //Parse slash commands.
		if(input.charAt(0) == '/') {
			var com = input.split(' ');
			com[0] = com[0].substring(1, com[0].length);
			var ref = '.' + com[0].toLowerCase();
			if(window.commands[com[0].toLowerCase()] == undefined) {return true;}
			while(typeof eval( 'window.commands' + ref) != 'function') {
				if(typeof eval( 'window.commands' + ref) == 'string') {
					ref = ref.substring(0, ref.lastIndexOf('.')) + '.' + eval('window.commands' + ref).toLowerCase();
					continue;
				}
				if(typeof eval('window.commands' + ref) == 'object') {
					if(!com[1]) {
						if(typeof eval('window.commands' + ref).default == 'function') {eval('window.commands' + ref).default.call(this, '', chat);}
						return true;
					}
					if(eval('window.commands' + ref)[com[1].toLowerCase()]) {ref += '.' + com[1].toLowerCase();}
					else if(eval('window.commands' + ref).default) {
						ref += '.default';
						if(typeof eval('window.commands' + ref) == 'function') {break;}
					}
					else {return true;}
					com = com.slice(1, com.length);
					continue;
				}
				if(typeof eval('window.commands' + ref) == 'undefined') {return true;}
			}
			com = com.slice(1, com.length);
			return eval('window.commands' + ref).call(this, com.join(' '), input);
		}
		else {return true;}
	}
 
	window.commands = {
		'staythenight': function(com, text) {
			$('#Write [name="message"]').val('Are you gonna stay the night? https://www.youtube.com/watch?v=i-gyZ35074k');
			return true;
		},
		'clarity': function(com, text) {
			$('#Write [name="message"]').val('Are you my clarity? https://www.youtube.com/watch?v=IxxstCcJlsc');
			return true;
		},