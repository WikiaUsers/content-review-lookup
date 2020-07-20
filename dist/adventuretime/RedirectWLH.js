// Add WhatLinksHere on redirect pages:
$('.redirectText').append(
	'<a class="redirectWLH" href="/wiki/Special:WhatLinksHere/'
        + mw.config.get('wgPageName')
        + '">→ Links pointing to this redirect</a>'
);