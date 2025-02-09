mw.loader.using('mediawiki.api').then(function() { 
    var api = new mw.Api();
    api.get({
        action: 'query',
        list: 'categorymembers',
        cmtitle: 'Category:Fanon/Sprunki\'s',
        cmlimit: 'max'
    }).done(function(data) {
        var totalFanonPages = data.query.categorymembers ? data.query.categorymembers.length : 0;
        var statsElement = document.querySelector('.page-counter');

        if (statsElement) {
            var fanonCounter = document.createElement('div');
            fanonCounter.classList.add('page-counter__fanon');
            fanonCounter.style.lineHeight = '13px';
            fanonCounter.textContent = 'Fanon Pages: ' + totalFanonPages;
            statsElement.appendChild(fanonCounter);
        }
    }).fail(function() {
        console.error('Failed to fetch Fanon page count');
    });
});