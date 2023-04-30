// adds Special:InterceptorRedirect create redirects for the Interceptor ships. Also adds an entry to the global nav dropdown.
mw.hook("wikipage.content").add(function($content) {
	if (window.InterceptorRedirectLinkLoaded) {
        return;
    }
    window.InterceptorRedirectLinkLoaded = true;
    $('.wds-global-navigation__user-menu .wds-list, .wiki-tools .wds-dropdown__content .wds-list').append(
        ['css'].map(function(ext) {
            return $('<li>', {
                append: $('<a>', {
                    'href': mw.util.getUrl('Special:InterceptorRedirect'),
                    text: 'InterceptorRedirect'
                })
            });
        })
    );

	if (window.InterceptorRedirectLoaded) {
        return;
    }
    window.InterceptorRedirectLoaded = true;
	if (mw.config.get('wgNamespaceNumber') !== -1 || mw.config.get('wgTitle') !== 'InterceptorRedirect') {
	    return;
	}
	document.title = 'InterceptorRedirect';
	$('.page-header__title').text('InterceptorRedirect');

	var html = '<p>Copy the name of your ship with the greek letter into the box, then click the copy button and click the link below. Paste the copied text into the page and save.</p><form class="createbox"><input type="text" id="interceptorName" style="height:2rem"><button type="button" id="copyCodeButton" style="margin-inline:.5rem; cursor:pointer" class="mw-ui-button mw-ui-progressive">Copy Redirect Code</button></form><a style="display:block" id="redirectLink"></a>';
	$('#mw-content-text').html(html);
	$('#interceptorName')[0].oninput = (function(e) {
		var input = e.target;
		var name = input.value;
		var newName = convertGreek(name);
		var linkElement = $('#redirectLink')[0];
		linkElement.href = '/' + newName;
		linkElement.innerText = newName;

		function convertGreek(name) {
			var greekLetters = {
				α: 'Alpha',
				β: 'Beta',
				γ: 'Gamma',
				δ: 'Delta',
				ε: 'Epsilon',
				ζ: 'Zeta',
				η: 'Eta',
				θ: 'Theta',
				ι: 'Iota',
				κ: 'Kappa',
				λ: 'Lambda',
				μ: 'Mu',
				ν: 'Nu',
				ξ: 'Xi',
				ο: 'Omicron',
				π: 'Pi',
				ρ: 'Rho',
				σ: 'Sigma',
				ς: 'Sigma',
				ϲ: 'Sigma',
				τ: 'Tau',
				υ: 'Upsilon',
				φ: 'Phi',
				χ: 'Chi',
				ψ: 'Psi',
				ω: 'Omega',
			};
			var containsGreekLetter = Object.keys(greekLetters).some(function (letter) {
				return name.toLowerCase().includes(letter);
			});
			if (!containsGreekLetter) return;
			var regex = new RegExp("[".concat(Object.keys(greekLetters).join(''), "]"), 'gi');
			var newName = name.replace(regex, function (letter) {
				return greekLetters[letter.toLowerCase()];
			});
			return newName;
		}
	});
	$('#copyCodeButton')[0].onclick = (function(e) {
		var btn = e.target;
		var name = $('#interceptorName')[0].value;
		btn.style.pointerEvents = 'none';
		var text = '#REDIRECT [[' + name + ']]';
		navigator.clipboard.writeText(text);
		var prevBtnText = btn.innerText;
		btn.innerText = 'Copied!';
		setTimeout(function() {
			btn.innerText = prevBtnText;
			btn.style.pointerEvents = '';
		}, 1000);
	});

	
});