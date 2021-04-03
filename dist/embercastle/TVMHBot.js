//Bot mode for TVMH, using code from https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/ (Thanks River!)
(function () {
    if (mw.config.get('wgPageName') !== 'Special:BlankPage/TVMH') {
        return;
    }

    function waitForDone () {
        //Originally by Dorumin
        return new Promise(function (resolve) {
            var observer = new MutationObserver(callback); //eslint-disable-line no-use-before-define
            var container = document.getElementById('tvmh-workbench');
            function callback () {
                if (!container.textContent.includes('Page edited successfully:')) {
                    return;
                }

                observer.disconnect();
                resolve();
            }
            observer.observe(container, {
                childList: true,
                subtree: true
            });
            callback();
        });
    }

    function methodThatReturnsAPromise (el) {
        return new Promise(function (resolve) {
            if (/User:|Thread:|@comment|Message Wall Greeting:/.test($(el).text())) {
                resolve(el);
            }
            setTimeout(function () {
                $(el).click();
                $('.tvmh-workbench-tabs > li:last-child').click();
                setTimeout(function () {
                    $('.tvmh-workbench-tabs-content > .active > button[type="submit"]').click();
                }, 100);
                $.when(waitForDone).then(function () {
                    resolve(el);
                });
            }, 1000);
        });
    }

    function click () {
        $('#tvmh-options #tvmh-bot-enable').hide();
        if (!mw.config.get('wgUserGroups').includes('bot') && !confirm('No bot flag on account, contiune?')) {
            return;
        }
        if (!confirm('Mass migrate tabview usage on this wiki?')) {
            return;
        }
        var result = Array.from($('#tvmh-pagelist > ul > li')).reduce(function (accumulatorPromise, el) {
            return accumulatorPromise.then(function () {
                return methodThatReturnsAPromise(el);
            });
        }, Promise.resolve());
        result.then(function () {
            alert('All migrations should be done.');
        });
    }
    
    var interval = setInterval(function () {
        if (!$('#tvmh-options').length) {
            return;
        }
        clearInterval(interval);
        $('<button>', {
            id: 'tvmh-bot-enable',
            style: 'margin-right: 10px;',
            text: 'BOT',
            prependTo: $('#tvmh-options'),
            click: click
        });
    }, 100);
})();