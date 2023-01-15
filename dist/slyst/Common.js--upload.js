;(function(document) {
    var upload = {
        elem: 0,
        categories: {
            'Original series': {
                'Original series anime screenshots': 'Anime screenshot',
                'Original series artwork images': 'Artwork',
                'Original series game screenshots': 'Game screenshot',
                'Original series manga images': 'Manga',
                'Original series sprites': 'Sprite'
            },
            'GO': {
                'GO anime screenshots': 'Anime screenshot',
                'GO artwork images': 'Artwork',
                'GO game screenshots': 'Game screenshot',
                'GO manga images': 'Manga',
                'GO sprites': 'Sprite'
            },
            'Chrono Stone': {
                'Chrono Stone anime screenshots': 'Anime screenshot',
                'Chrono Stone artwork images': 'Artwork',
                'Chrono Stone game screenshots': 'Game screenshot',
                'Chrono Stone manga images': 'Manga',
                'Chrono Stone sprites': 'Sprite'
            },
            'Galaxy': {
                'Galaxy anime screenshots': 'Anime screenshot',
                'Galaxy artwork images': 'Artwork',
                'Galaxy game screenshots': 'Game screenshot',
                'Galaxy manga images': 'Manga',
                'Galaxy sprites': 'Sprite',
                'QR code images': 'QR code'
            },
            'Ares': {
                'AC Card images': 'AC Card',
                'Ares anime screenshots': 'Anime screenshots',
                'Ares artwork images': 'Artwork',
                'Ares game screenshots': 'Game screenshot',
                'Ares manga images': 'Manga',
                'Eleven License images': 'Eleven License'
            },
            'Orion': {
                'AC Card images': 'AC Card',
                'Eleven License images': 'Eleven License',
                'Orion anime screenshots': 'Anime screenshot',
                'Orion artwork images': 'Artwork',
                'Orion manga images': 'Manga'
            },
            'Strikers': {
                'Strikers artwork images': 'Artwork',
                'Strikers icons': 'Icon',
                'Strikers screenshots': 'Screenshot',
                'Strikers sprites': 'Sprite'
            },
            'Others': {
                'Merchandise images': 'Merchandise',
                'Movie images': 'Movie',
                'TCG images': 'TCG',
                'Team emblem images': 'Team emblem',
                'Wiki related images': 'Wiki related',
                'Miscellaneous images': 'Miscellaneous'
            }
        },
        addCSS: function() {
            mw.util.addCSS(
                '.category-outer-container, #category-list {' +
                    'max-width: 600px;' +
                '}' +
                '.category-outer-container li {' +
                    'cursor: pointer;' +
                '}' +
                '#main-categories {' +
                    'display: inline-block;' +
                    'margin: 0;' +
                '}' +
                '#main-categories .main-category, #sub-categories .sub-category {' +
                    'background-color: #fff;' +
                    'border: 1px solid #cccc;' +
                    'border-radius: 4px;' +
                    'display: inline-block;' +
                    'margin: 2px 2px 0 2px;' +
                    'padding: 2px 7px;' +
                '}' +
                '#main-categories .main-category {' +
                    'margin: 0 2px;' +
                '}' +
                '#main-categories .main-category.selected {' +
                    'border-color: #aaa;' +
                    'font-weight: bold;' +
                '}' +
                '#main-categories .main-category.passive {' +
                    'opacity: 0.4;' +
                '}' +
                '.addcat-outer {' +
                    'background-color: #baeaba !important;' +
                    'border-color: transparent !important;' +
                '}' +
                '.subcat-outer {' +
                    'background-color: #ecaaaa !important;' +
                    'border-color: transparent !important;' +
                '}' +
                '.addcat, .subcat {' +
                    'font-weight: bold;' +
                    'margin: 0 2px;' +
                '}' +
                '#sub-categories {' +
                    'margin: 0;' +
                '}' +
                '#sub-categories .sub-category {' +
                    'transition: .1s all linear;' +
                '}' +
                '#remove-all {' +
                    'cursor: pointer;' +
                    'font-size: 15px;' +
                    'margin: 0 5px;' +
                '}' +
                '.upload-warning {' +
                    'background-color: #ecaaaa;' +
                    'padding: 3px 5px;' +
                '}'
            );
        },
        current: [],
        build: function() {
            var ul = document.createElement('ul'),
                sub = document.createElement('ul'),
                div = document.createElement('div'),
                input = document.createElement('td'),
                label = document.createElement('td'),
                tr = document.createElement('tr');
            ul.id = 'main-categories';
            sub.id = 'sub-categories';
            input.classList.add('mw-input');
            input.classList.add('category-outer-container');
            label.classList.add('mw-label');
            label.innerHTML = '<label>Categories:</label><br><span id="remove-all" title="Remove all categories">[x]</span>';
            for (var i in upload.categories) {
                var li = document.createElement('li'),
                    ar = document.createElement('div');
                li.classList.add('main-category');
                ar.classList.add('expand');
                li.appendChild(ar);
                li.innerHTML += i;
                ul.appendChild(li);
            }
            input.appendChild(div.appendChild(ul));
            input.appendChild(sub);
            tr.appendChild(label).appendChild(input);
            var desc = document.getElementById('wpUploadDescription');
            desc.setAttribute('rows', 3);
            desc.style.resize = 'none';
            var llabel = document.createElement('td'),
                list = document.createElement('td'),
                ltr = document.createElement('tr');
            llabel.classList.add('mw-label');
            llabel.innerHTML = '<label>Categories added:</label>';
            list.id = 'category-list';
            list.classList.add('mw-input');
            ltr.appendChild(llabel).appendChild(list);
            desc.parentNode.parentNode.insertAdjacentHTML('afterend', tr.innerHTML + ltr.outerHTML);
            upload.update();
            upload.subcat();
            document.getElementsByClassName('main-category')[upload.elem].click();
        },
        subcat: function() {
            [].forEach.call(document.getElementsByClassName('expand'), function(elem) {
                elem.parentNode.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.target.classList.remove('passive');
                    e.target.classList.add('selected');
                    Array.prototype.filter.call(e.target.parentNode.children, function(child) {
                        if (child !== e.target) {
                            child.classList.remove('selected');
                            child.classList.add('passive');
                        }
                    });
                    upload.elem = [].indexOf.call(elem.parentNode.parentNode.children, elem.parentNode);
                    var container = document.getElementById('sub-categories'),
                        ul = document.createElement('ul'),
                        main = e.target.innerText;
                    for (var i in upload.categories[main]) {
                        var li = document.createElement('li');
                        li.classList.add('sub-category');
                        li.setAttribute('category', i);
                        var span = document.createElement('span');
                        if (upload.current.indexOf(i) > -1) {
                            span.classList.add('subcat');
                            span.innerHTML = '-';
                            li.classList.add('subcat-outer');
                        } else {
                            span.classList.add('addcat');
                            span.innerHTML = '+';
                            li.classList.add('addcat-outer');
                        }
                        li.appendChild(span);
                        span.insertAdjacentHTML('afterend', ' ');
                        li.innerHTML += upload.categories[main][i];
                        ul.append(li);
                    }
                    container.innerHTML = ul.innerHTML;
                });
            });
            document.addEventListener('click', function(e) {
                var target = e.target;
                if (/addcat(-outer|)/.test(target.className)) {
                    e.preventDefault();
                    target = target.className == 'addcat' ? target.parentNode : e.target;
                    target.className = target.className.replace(/addcat/, 'subcat');
                    target.children[0].className = 'subcat';
                    target.children[0].innerText = '-';
                    upload.current.push(target.getAttribute('category'));
                    upload.update();
                } else if (/subcat(-outer|)/.test(target.className)) {
                    e.preventDefault();
                    target = target.className == 'subcat' ? target.parentNode : e.target;
                    target.className = target.className.replace(/subcat/, 'addcat');
                    target.children[0].className = 'addcat';
                    target.children[0].innerText = '+';
                    upload.current = upload.current.filter(function(elem) {
                        return elem !== target.getAttribute('category');
                    });
                    upload.update();
                } else if (target.id == 'remove-all') {
                    upload.current.length = 0;
                    document.getElementsByClassName('main-category')[upload.elem].click();
                    upload.update('All categories have been removed.');
                } else {
                    return;
                }
            });
        },
        update: function(m) {
            var target = document.getElementById('category-list');
            if (!upload.current.length) {
                target.innerHTML = m || 'None.';
            } else {
                var str = '';
                for (var i = 0; i < upload.current.length; i++) {
                    var a = document.createElement('a');
                    a.href = '/wiki/Category:' + mw.util.wikiUrlencode(upload.current[i]);
                    a.target = '_blank';
                    a.innerText = upload.current[i];
                    str += a.outerHTML + (i !== upload.current.length - 1 ? ', ' : '');
                }
                target.innerHTML = str;
            }
        },
        submit: function(e) {
            if (!upload.current.length) {
                e.preventDefault();
                var list = document.getElementById('category-list'),
                    br = document.createElement('br'),
                    span = document.createElement('span');
                span.classList.add('upload-warning');
                span.innerHTML = 'Please categorize the file.';
                list.appendChild(br);
                list.appendChild(span);
                return false;
            }
            var cats = '';
            for (var i = 0; i < upload.current.length; i++) {
                cats += '[[Category:' + upload.current[i] + ']]\n';
            }
            var desc = document.getElementById('wpUploadDescription');
            desc.value = desc.value ? desc.value + '\n\n' + cats : cats;
        },
        init: function() {
            upload.addCSS();
            upload.build();
            var form = document.getElementById('mw-upload-form');
            form.addEventListener('submit', upload.submit, false);
            form.submit = upload.submit;
        }
    };
    upload.init();
})(window.document);