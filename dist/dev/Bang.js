(function bang(mw, $, window) {

    if (window.bang) return;
    window.bang = { loaded: true };

	var namespaces = {
			t: "Template",
			mw: "MediaWiki",
			s: "Special",
			h: "Help",
			m: "Module",
			f: "File",
			u: "User",
			ut: "User talk",
			w: "Message Wall",
			ub: "User blog",
			p: "Project",
			c: "Category",
			fo: "Forum"
		};

    if (mw.config.get('skin') === 'fandomdesktop') {
        $(document).on('keyup', '.SearchInput-module_input__1mP-U', function() {
	        var txt = $(this).val(),
		        m = txt.match(/^\!([a-z]+) /),
		        e = this;
	
            if (m && namespaces.hasOwnProperty(m[1])) {
	    		txt = namespaces[m[1]] + ":" + txt.substr(m[1].length + 2);
                // This timeout is way too long but without it another function in the queue reverts the change
			    setTimeout(function() {
                    $(e).val(txt);
                }, 1000);
		    }
	    });
    } else {
        $('.wds-global-navigation__search-input').on('keyup', function(){
	        var txt = $(this).val(),
      		    m = txt.match(/^\!([a-z]+) /);

	        if (m && namespaces.hasOwnProperty(m[1])) {
			    $(this).val(namespaces[m[1]] + ":" + txt.substr(m[1].length + 2));
		    }
	    });
    }
    
}) (mediaWiki, jQuery, window);