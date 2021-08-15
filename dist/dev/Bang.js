(function bang(mw, $, window) {

    if (window.bang) return;
    window.bang = { loaded: true };

	var ns = mw.config.get('wgFormattedNamespaces'),
		namespaces = {
			t: ns[10], // Template
			mw: ns[8], // MediaWiki
			s: ns[-1], // Special
			h: ns[12], // Help
			m: ns[828], // Module
			f: ns[6], // File
			u: ns[2], // User
			ut: ns[3], // User talk
			w: ns[1200], // Message Wall
			ub: ns[500], // User blog
			p: ns[4], // Project
			c: ns[14], // Category
			fo: ns[110] // Forum
		};

    if (mw.config.get('skin') === 'fandomdesktop') {
        $(document).on('keyup', '.SearchInput-module_input__1mP-U', function() {
	        var old = $(this).val(),
                txt,
		        m = old.match(/^\!([a-z]+) /),
		        $e = $(this),
                interval, times = 0;
	
            if (m && namespaces.hasOwnProperty(m[1])) {
	    		txt = namespaces[m[1]] + ":" + old.substr(m[1].length + 2);
                $e.val(txt);
                // Fighting some global code that changes it back
				interval = setInterval(function() {
				    if ($e.val() === old) {
				        $e.val(txt);
				        times = 0;
				        clearInterval(interval);
				    } else if (++times >  10) {
				        times = 0;
				        clearInterval(interval);
				    }
				}, 100);
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