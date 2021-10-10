/* Any JavaScript here will be loaded for all users on every page load. */

/**
 * Uploadform.js
 *
 * Modifies the Special:Upload page by adding a custom
 * module which enforces categorization of any new files
 *
 * @author: slyst https://inazuma-eleven.fandom.com/wiki/MediaWiki:Common.js/uploadform.js
 */

;(function(document, mw) {
    var upload = {
        elem: 0,
        categories: {
            'Game stills': {
                'Resident Evil 0 images': 'RE0',
                'Resident Evil (1996) images': 'RE1-96',
                'Resident Evil remake images': 'RE1-02',
                'Resident Evil 2 (1998) images': 'RE2-98',
                'Resident Evil 2 remake images': 'RE2-19',
                'Resident Evil 3: Nemesis images': 'RE3-99',
                'Resident Evil 3 remake images': 'RE3-20',
                'Resident Evil CODE:Veronica images': 'CV',
                'Resident Evil 4 images': 'RE4',
                'Resident Evil 5 images': 'RE5',
                'Resident Evil 6 images': 'RE6',
                'Resident Evil 7: Biohazard images': 'RE7',
                'Resident Evil Village images': 'Village',
                'Resident Evil Outbreak images': 'Outbreak',
                'Resident Evil Survivor images': 'Survivor',
                'Resident Evil: Dead Aim images': 'Dead Aim',
                'Resident Evil: The Umbrella Chronicles images': 'UC',
                'Resident Evil: The Darkside Chronicles images': 'DC',
                'Resident Evil: Revelations images': 'Rev1',
                'Resident Evil: Revelations 2 images': 'Rev2',
                'Umbrella Corps images': 'Umbrella Corps',
                'Operation Raccoon City images': 'ORC',
                'Resident Evil: Resistance images': 'Resistance',
                'Resident Evil Re:Verse images': 'Re:Verse',
                'Mobile games images': 'Mobile',
                'Pachinko games images': 'Pachinko',
                'Other games images': 'Other',
            },
            'Backgrounds': {
                'Resident Evil 0 backgrounds': 'RE0',
                'Resident Evil (1996) backgrounds': 'RE1',
                'Resident Evil: Director%27s Cut': 'DC',
                'Resident Evil remake backgrounds': 'REmake',
                'Resident Evil 2 backgrounds': 'RE2',
                'Resident Evil 3: Nemesis backgrounds': 'RE3',
            },
            'Movie/TV stills': {
                'Resident Evil film screenshots': 'RE',
                'Resident Evil: Apocalypse screenshots': 'Apocalypse',
                'Resident Evil: Extinction screenshots': 'Extinction',
                'Resident Evil: Afterlife screenshots': 'Afterlife',
                'Resident Evil: Retribution screenshots': 'Retribution',
                'Resident Evil: The Final Chapter screenshots': 'Final Chapter',
                'Resident Evil: Welcome to Raccoon City screenshots': 'Resident Evil: Welcome to Raccoon City',
                'Resident Evil Netflix screenshots': 'Netflix',
                'Resident Evil: Degeneration screenshots': 'Degeneration',
                'Resident Evil: Damnation screenshots': 'Damnation',
                'Resident Evil: Vendetta screenshots': 'Vendetta',
                'Resident Evil: Infinite Darkness screenshots': 'Infinite Darkness',
                'Stage play screenshots': 'Stage play',
                'Other movie screenshots': 'Other/Behind the sceens',
            },
            'Other media': {
                'Artbook or guide book images': 'Artbook or guide book',
                'Manga images': 'Manga',
                'Comic images': 'Comic',
                'Manhua images': 'Manhua',
                'ARG images': 'ARG',
                'Other Resident Evil media images': 'Other',
            }, 
            'Concept art': {
                'Resident Evil 0 concept art': 'RE0',
                'Resident Evil (1996) concept art': 'RE1-96',
                'Resident Evil remake concept art': 'RE1-02',
                'Resident Evil 2 (1998) concept art': 'RE2-98',
                'Resident Evil 2 remake concept art': 'RE2-19',
                'Resident Evil 3: Nemesis concept art': 'RE3-98',
                'Resident Evil 3 remake concept art': 'RE3-20',
                'Resident Evil CODE:Veronica concept art': 'CV',
                'Resident Evil 4 concept art': 'RE4',
                'Resident Evil 5 concept art': 'RE5',
                'Resident Evil 6 concept art': 'RE6',
                'Resident Evil 7: Biohazard concept art': 'RE7',
                'Resident Evil Village concept art': 'Village',
                'Resident Evil Outbreak concept art': 'Outbreak',
                'Resident Evil Survivor concept art': 'Survivor',
                'Resident Evil: Dead Aim concept art': 'Dead Aim',
                'Resident Evil: The Umbrella Chronicles concept art': 'UC',
                'Resident Evil: The Darkside Chronicles concept art': 'DC',
                'Resident Evil: Revelations concept art': 'Rev1',
                'Resident Evil: Revelations 2 concept art': 'Rev2',
                'Mobile games concept art': 'Mobile',
                'Pachinko games concept art': 'Pachinko',
                'Movie concept art': 'Movie/TV',
                'Other games concept art': 'Other',
            },   
            'Promotional': {
                'Magazine images': 'Magazine',
                'Merchandise images': 'Merchandise',
                'Soundtrack images': 'Soundtrack',
                'Capcom Cafe images': 'Capcom Cafe',
                'Real world images': 'Image of the real world',
                'Promotional images': 'Other',
            },   
            'Other': {
                'Animated images': 'Animated image',
                'Real world images': 'Image of the real world',
                'Logos': 'Logos',
                'Covers': 'Covers',
                'User images': 'Image for my userpage',
                'Trophy and Achievement images': 'In-game Trophy or Achievement',
                'Steam Trading Cards images': 'Steam Trading Cards',
                'Wiki images': 'Wiki related',
                'Images': 'Does not fall in any other category',
            },
            'Non-RE': {
            	'TEPPEN images': 'TEPPEN',
                'Non-RE video games images': 'Other',
            },
            'Do Not Know': {
            	'Uncategorised images': 'Do Not Know',
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
                    'background-color: #BD0000;' +
                    'border: 1px solid #000000;' +
                    'border-radius: 4px;' +
                    'display: inline-block;' +
                    'margin: 2px 2px 0 2px;' +
                    'padding: 2px 7px;' +
                '}' +
                '#main-categories .main-category {' +
                    'margin: 0 2px;' +
                '}' +
                '#main-categories .main-category.selected {' +
                    'border-color: #000000;' +
                    'font-weight: bold;' +
                '}' +
                '#main-categories .main-category.passive {' +
                    'opacity: 0.4;' +
                '}' +
                '.addcat-outer {' +
                    'background-color: #1B1B1B !important;' +
                    'border-color: transparent !important;' +
                '}' +
                '.subcat-outer {' +
                    'background-color: #339966 !important;' +
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
                    'background-color: #D90000;' +
                    'padding: 3px 5px;' +
                '}' +
                'label.help {' +
                    'border-bottom: 1px dotted #000000;' +
                    'cursor: help;' +
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
            var name = mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload' ? '<label class="help" title="Selected categories will be added to all files being uploaded.">Categories</label>' : '<label>Categories</label>';
            label.innerHTML = name + '<br><span id="remove-all" title="Remove all categories">[x]</span>';
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
                span.innerHTML = 'Please categorize the file!';
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
    if (!mw.util.getParamValue('wpForReUpload')) {
        upload.init();
    }
}) (window.document, window.mediaWiki);