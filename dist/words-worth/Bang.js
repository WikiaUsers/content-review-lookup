(function bang(window, mw, $) {

    if (window.bangLoaded) return;
    window.bangLoaded = true;

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

        $(document).on('keyup', '[class*="SearchInput-module_input"]', function() {
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
}) (this, mediaWiki, jQuery);