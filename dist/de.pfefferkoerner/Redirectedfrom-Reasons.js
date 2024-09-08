mw.loader.using('mediawiki.util').then(function() {
	if ((redirectEl = document.querySelector('.mw-redirectedfrom')) === null) {
		return;
	}
	
	(new mw.Api()).parse(new mw.Title(redirectEl.querySelector('.mw-redirect').textContent), {
		format: 'json',
		formatversion: 2,
		disablelimitreport: true,
		wrapoutputclass: '',
	}).then(function(content) {
		var html = (new DOMParser()).parseFromString(content, "text/html");
	    html.querySelector('.redirectMsg').remove();
	    var redirectReasonEl = html.body.firstElementChild;
	    if (redirectReasonEl.classList.contains('mw-redirect-reason')) {
			mw.util.$content.get(0).prepend(redirectReasonEl);
			redirectReasonEl.querySelector('.mw-redirect-reason-source').style.display = 'none';
			redirectReasonEl.querySelector('.mw-redirect-reason-target').style.display = 'initial';
	    }
	});
});