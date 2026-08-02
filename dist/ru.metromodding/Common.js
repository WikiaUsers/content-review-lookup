(function () {
    mw.hook('wikipage.content').add(function () {
        var box = document.getElementById('random-quote-box');
        if (!box || box.dataset.loaded) {
            return;
        }
        box.dataset.loaded = '1';

        var api = new mw.Api();
        api.get({
            action: 'parse',
            page: 'Template:СписокЦитат',
            prop: 'text',
            format: 'json'
        }).done(function (data) {
            var html = data.parse.text['*'];
            var temp = document.createElement('div');
            temp.innerHTML = html;

            var items = temp.querySelectorAll('.random-quote-item');
            if (items.length === 0) {
                return;
            }

            var random = items[Math.floor(Math.random() * items.length)];
            box.textContent = random.textContent;
        });
    });
})();