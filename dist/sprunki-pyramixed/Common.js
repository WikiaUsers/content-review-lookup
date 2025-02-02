mw.loader.using('mediawiki.api' ).then( function() {
    var api = new mw.Api();
    api.get({
        action: 'query',
        list: 'allpages',
        apnamespace: 110,
        aplimit: 'max'
    }).done(function(data) {
        var totalFanonPages = data.query.allpages ? data.query.allpages.length : 0;
        var statsElement = document.querySelector('.page-counter');

        if (statsElement) {
            var fanonCounter = document.createElement('div');
            fanonCounter.classList.add('page-counter__fanon');
            fanonCounter.style.lineHeight = '13px';
            fanonCounter.textContent = 'Fanon Pages ' + totalFanonPages;
            statsElement.appendChild(fanonCounter);
        }
    });
});