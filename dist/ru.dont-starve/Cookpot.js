(function () {
    'use strict';

    var ARROW_IMAGE_URL = 'https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru';

    function selectAll(selector, root) {
        return Array.prototype.slice.call((root || document).querySelectorAll(selector));
    }

    function directChildImages(element) {
        return Array.prototype.filter.call(element.children, function (child) {
            return child.tagName === 'IMG';
        });
    }

    function callGlobalFunction(name) {
        var fn = window[name];
        var args = Array.prototype.slice.call(arguments, 1);

        if (typeof fn !== 'function') {
            console.error('[cookpot] Не найдена функция ' + name + '().');
            return undefined;
        }

        return fn.apply(window, args);
    }

    function setDisplay(selector, value, root) {
        selectAll(selector, root).forEach(function (element) {
            element.style.display = value;
        });
    }

    function addClass(selector, className, root) {
        selectAll(selector, root).forEach(function (element) {
            element.classList.add(className);
        });
    }

    function removeClass(selector, className, root) {
        selectAll(selector, root).forEach(function (element) {
            element.classList.remove(className);
        });
    }

    function setBackground(selector, value, root) {
        selectAll(selector, root).forEach(function (element) {
            element.style.backgroundColor = value;
        });
    }

    function markOnce(element, marker) {
        var attribute = 'data-cookpot-' + marker;

        if (element.getAttribute(attribute) === 'true') {
            return false;
        }

        element.setAttribute(attribute, 'true');
        return true;
    }

    function bindClick(selector, handler, root, marker) {
        selectAll(selector, root).forEach(function (element) {
            if (marker && !markOnce(element, 'bound-' + marker)) {
                return;
            }

            element.addEventListener('click', handler);
        });
    }

    function createChance(number) {
        var chance = document.createElement('span');
        chance.id = 'chance' + number;
        chance.style.fontWeight = 'bold';
        return chance;
    }

    function createImageCell(id, className, clickHandler) {
        var wrapper = document.createElement('span');
        var image = document.createElement('img');

        wrapper.style.position = 'relative';
        image.id = id;

        if (className) {
            image.className = className;
        }

        if (clickHandler) {
            image.addEventListener('click', clickHandler);
        }

        wrapper.appendChild(image);
        return wrapper;
    }

    function addCookpotCells(workspace) {
        var cells = [];
        var arrowWrapper;
        var arrow;
        var number;

        for (number = 1; number <= 4; number += 1) {
            (function (ingredientIndex) {
                cells.push(createImageCell(
                    'cookpot' + (ingredientIndex + 1),
                    'ingredientcookpot',
                    function () {
                        callGlobalFunction('cookpotDelete', ingredientIndex);
                    }
                ));
            }(number - 1));
        }

        arrowWrapper = document.createElement('span');
        arrowWrapper.style.position = 'relative';

        arrow = document.createElement('img');
        arrow.id = 'arrowcookpot';
        arrow.className = 'cookpotarrow';
        arrow.src = ARROW_IMAGE_URL;
        arrow.alt = '';
        arrowWrapper.appendChild(arrow);
        cells.push(arrowWrapper);

        for (number = 1; number <= 4; number += 1) {
            cells.push(createImageCell(
                'result' + number,
                number === 1 ? 'result-cell-cookpot' : 'hiddeningredientcookpot'
            ));
            cells.push(createChance(number));
        }

        workspace.prepend.apply(workspace, cells);
    }

    function prepareIngredientLinks(root) {
        selectAll('.cookpot .inglist a', root).forEach(function (link) {
            var image = directChildImages(link)[0];
            var originalTitle;
            var source;
            var rawName;
            var name;

            if (!image) {
                return;
            }

            if (!markOnce(link, 'ingredient-ready')) {
                return;
            }

            originalTitle = link.getAttribute('title') || '';
            source = image.getAttribute('data-src') || image.getAttribute('src') || '';
            rawName = image.getAttribute('data-image-name') || image.getAttribute('alt') || originalTitle;
            name = rawName.replace(/\.png$/i, '');

            if (name) {
                link.setAttribute('title', name);
            }

            link.removeAttribute('href');
            link.removeAttribute('onclick');
            link.classList.remove('image-thumbnail', 'image');

            link.addEventListener('click', function (event) {
                event.preventDefault();

                if (!source) {
                    console.warn('[cookpot] У изображения ингредиента отсутствуют data-src и src.', image);
                    return;
                }

                callGlobalFunction('cookpotAdd', originalTitle || name, source);
            });
        });
    }

    function prepareOtherLinks(root) {
        selectAll('.cookpot .cookpoting a', root).forEach(function (link) {
            link.removeAttribute('href');
            link.classList.remove('image-thumbnail', 'image');
        });

        selectAll('#foods a', root).forEach(function (link) {
            var id = link.getAttribute('title');

            if (id) {
                link.id = id;
            }

            link.removeAttribute('href');
            link.classList.remove('image-thumbnail', 'image');
        });
    }

    function revealDescriptionImages(root) {
        selectAll('#description > a, #description2 > a, #description3 > a, #description4 > a', root)
            .forEach(function (link) {
                directChildImages(link).forEach(function (image) {
                    var source = image.getAttribute('data-src') || image.getAttribute('src');

                    if (source) {
                        image.setAttribute('src', source);
                    }
                });
            });
    }

    function setupDlcButton(options, root) {
        var button = root.querySelector(options.button);

        if (!button || !markOnce(button, 'dlc-bound')) {
            return;
        }

        button.addEventListener('click', function () {
            setDisplay(options.show, '', root);
            setDisplay(options.hide, 'none', root);
            button.classList.add('buttoncb');
            removeClass(options.deactivate, 'buttoncb', root);
            callGlobalFunction('cookpotDeleteAll');
            window.dlc = options.dlc;

            if (options.afterChange) {
                options.afterChange(root);
            }
        });
    }

    function setupDlcButtons(root) {
        setupDlcButton({
            button: '#buttonds',
            show: '.ds',
            hide: '.rog, .sw, .h, .dst, .warlydst',
            deactivate: '#buttonrog, #buttonsw, #buttonh, #buttondst',
            dlc: 'DS'
        }, root);

        setupDlcButton({
            button: '#buttonrog',
            show: '.rog',
            hide: '.ds, .sw, .h, .dst, .warlydst',
            deactivate: '#buttonds, #buttonsw, #buttonh, #buttondst',
            dlc: 'RoG'
        }, root);

        setupDlcButton({
            button: '#buttonsw',
            show: '.sw',
            hide: '.ds, .rog, .h, .dst, .warlydst',
            deactivate: '#buttonds, #buttonrog, #buttonh, #buttondst',
            dlc: 'SW'
        }, root);

        setupDlcButton({
            button: '#buttonh',
            show: '.h',
            hide: '.ds, .rog, .sw, .dst, .warlydst',
            deactivate: '#buttonds, #buttonrog, #buttonsw, #buttondst',
            dlc: 'H'
        }, root);

        setupDlcButton({
            button: '#buttondst',
            show: '.dst',
            hide: '.ds, .sw, .h, .rog, .warlydst',
            deactivate: '#buttonds, #buttonsw, #buttonh, #buttonrog',
            dlc: 'DST',
            afterChange: function (contentRoot) {
                var warlyButton = contentRoot.querySelector('#buttonwarly');

                if (warlyButton && warlyButton.classList.contains('buttonwarly')) {
                    setDisplay('.warly, .warlydst', '', contentRoot);
                }
            }
        }, root);
    }

    function setupWarlyButton(root) {
        var button = root.querySelector('#buttonwarly');

        if (!button || !markOnce(button, 'warly-bound')) {
            return;
        }

        button.addEventListener('click', function () {
            callGlobalFunction('cookpotDeleteAll');

            if (!button.classList.contains('buttonwarly')) {
                setDisplay('.warly, .warlydst', '', root);
                button.classList.add('buttonwarly');
                window.warly = true;
            } else {
                setDisplay('.warly, .warlydst', 'none', root);
                removeClass('.buttonwarly', 'buttonwarly', root);
                window.warly = false;
            }
        });
    }

    function setupCategoryButton(options, root) {
        var button = root.querySelector(options.button);

        if (!button || !markOnce(button, 'category-bound')) {
            return;
        }

        button.addEventListener('click', function () {
            addClass(options.highlight, 'light', root);
            removeClass(options.unhighlight, 'light', root);
            button.style.backgroundColor = '#88684c82';
            setBackground(options.resetButtons, 'transparent', root);
        });
    }

    function setupCategoryButtons(root) {
        setupCategoryButton({
            button: '#bmeat',
            highlight: '.meat, .meatfish',
            unhighlight: '.veggie, .fish, .fruit, .other',
            resetButtons: '#bveggie, #bfish, #bfruit, #bother'
        }, root);

        setupCategoryButton({
            button: '#bfish',
            highlight: '.fish, .meatfish',
            unhighlight: '.veggie, .meat, .fruit, .other',
            resetButtons: '#bveggie, #bmeat, #bfruit, #bother'
        }, root);

        setupCategoryButton({
            button: '#bveggie',
            highlight: '.veggie',
            unhighlight: '.meat, .fish, .meatfish, .fruit, .other',
            resetButtons: '#bmeat, #bfish, #bfruit, #bother'
        }, root);

        setupCategoryButton({
            button: '#bfruit',
            highlight: '.fruit',
            unhighlight: '.veggie, .meat, .meatfish, .fish, .other',
            resetButtons: '#bveggie, #bfish, #bmeat, #bother'
        }, root);

        setupCategoryButton({
            button: '#bother',
            highlight: '.other',
            unhighlight: '.veggie, .meat, .fruit, .fish, .meatfish',
            resetButtons: '#bveggie, #bmeat, #bfruit, #bfish'
        }, root);

        bindClick('#bclear', function () {
            removeClass('.veggie, .meat, .fruit, .fish, .meatfish, .other', 'light', root);
            setBackground('#bveggie, #bmeat, #bfruit, #bfish, #bother', 'transparent', root);
        }, root, 'category-clear');
    }

    function setupClearButton(root) {
        selectAll('#cpclear', root).forEach(function (button) {
            button.removeAttribute('onclick');

            if (!markOnce(button, 'bound-clear')) {
                return;
            }

            button.addEventListener('click', function () {
                callGlobalFunction('cookpotDeleteAll');
            });
        });
    }

    function setupLazyImageLoading(root) {
        bindClick('#buttonds, #buttonrog, #buttonsw, #buttonh, #buttondst, #buttonwarly', function () {
            selectAll('.cookpot img.lzy, .cookpotbutton img.lzy', root).forEach(function (image) {
                var source = image.getAttribute('data-src');

                if (source) {
                    image.setAttribute('src', source);
                }
            });
        }, root, 'lazy-images');
    }

    function setupResultLinks(root) {
        bindClick('.result-cell-cookpot', function (event) {
            var href;

            if (!event.ctrlKey) {
                return;
            }

            href = this.getAttribute('href');
            if (href !== null) {
                window.open(href, '_blank');
            }
        }, root, 'result-link');

        bindClick('.cookpot-name-label', function () {
            var href = this.getAttribute('href');

            if (href !== null) {
                window.open(href, '_blank');
            }
        }, root, 'name-link');

        bindClick('.cookpot > div > p > span > span > a > img', function (event) {
            var rawName;
            var href;
            var openedWindow;

            if (!event.ctrlKey) {
                return;
            }

            rawName = this.getAttribute('data-image-name') || this.getAttribute('alt') || '';
            href = rawName.replace(/\.png$/i, '');

            if (!href) {
                return;
            }

            openedWindow = window.open(href, '_blank');
            if (openedWindow) {
                openedWindow.focus();
            }
        }, root, 'recipe-link');
    }

    function findWorkspaces(root) {
        var workspaces = selectAll('#cookpotWorkSpace', root);

        if (root.nodeType === 1 && root.matches('#cookpotWorkSpace')) {
            workspaces.unshift(root);
        }

        return workspaces;
    }

    function timer(root) {
        var contentRoot = root && root.querySelector ? root : document;
        var workspaces = findWorkspaces(contentRoot);

        if (!workspaces.length) {
            return;
        }

        workspaces.forEach(function (workspace) {
            if (workspace.getAttribute('data-cookpot-initialized') === 'true') {
                return;
            }

            addCookpotCells(workspace);
            workspace.setAttribute('data-cookpot-initialized', 'true');
        });

        setupClearButton(contentRoot);
        prepareIngredientLinks(contentRoot);
        prepareOtherLinks(contentRoot);
        revealDescriptionImages(contentRoot);
        setupDlcButtons(contentRoot);
        setupWarlyButton(contentRoot);
        setupCategoryButtons(contentRoot);
        setupLazyImageLoading(contentRoot);
        setupResultLinks(contentRoot);
    }

    function start() {
        if (window.mw && typeof window.mw.hook === 'function') {
            window.mw.hook('wikipage.content').add(function () {
                timer(document);
            });
            return;
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                timer(document);
            }, { once: true });
        } else {
            timer(document);
        }
    }

    window.timer = timer;
    start();
}());


var dlc = "DS";
var warly = false;
var api;
var cookpot = new Array(4);

mw.hook('wikipage.content').add(function() {
    console.log("Api loaded!");
    api = new mw.Api();
});

window.cookpotDeleteResult = function() {
    if (cookpotIsFull(cookpot)) {
        api.abort();
        if (navigator.userAgent.includes('Firefox')) {
            $('#result1').removeAttr('src');
        } else {
            $('#result1').attr('src', ' ');
        }
        $('#result1').removeAttr('href');
        $('#arrowcookpot').attr('src', "https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru");
        $('#chance1').text(' ');
        $('#description1').css({
            "display": "none"
        });
        for (var i = 4; i > 1; --i) {
            if (($('#result' + i).css('display')) !== 'none') {
                $('#chance' + i).text(' ');
                $('#description' + i).css({
                    "display": "none"
                });
                $('#result' + i).removeClass('result-cell-cookpot');
                $('#result' + i).addClass('hiddeningredientcookpot');
                $('#result' + i).attr('src', ' ');
            }
        }
    }
};

window.cookpotDelete = function(i) {
    cookpotDeleteResult();
    delete cookpot[i];
    if (navigator.userAgent.includes('Firefox')) {
        $('#cookpot' + (i + 1)).removeAttr('src');
    } else {
        $('#cookpot' + (i + 1)).attr('src', ' ');
    }
};

window.cookpotDeleteAll = function() {
    cookpotDeleteResult();
    for (var i = 0; i < 4; i++) {
        delete cookpot[i];
        if (navigator.userAgent.includes('Firefox')) {
            $('#cookpot' + (i + 1)).removeAttr('src');
        } else {
            $('#cookpot' + (i + 1)).attr('src', ' ');
        }
    }
};

window.cookpotIsFull = function(cookpot) {
    for (var cookpotIndex = 0; cookpotIndex < 4; cookpotIndex++) {
        if (cookpot[cookpotIndex] === undefined) {
            return false;
        }
    }
    return true;
};

window.cookpotAdd = function(title, src) { //Добавляет ингридиент в казан, если слот пустой то он добавляет в него, если слот был удалён, также добавляет в него
    if (event.ctrlKey !== true) {
        for (var cookpotSlotIndex = 0; cookpotSlotIndex < 4; cookpotSlotIndex++) {
            if (cookpot[cookpotSlotIndex] === undefined) {
                cookpot[cookpotSlotIndex] = title;
                var cookpotHTMLId = "#cookpot" + (cookpotSlotIndex + 1);
                $(cookpotHTMLId).attr('src', src);
                break;
            }
        }
        if (cookpotIsFull(cookpot)) {
            api.abort();
            api.get({
                action: 'expandtemplates',
                text: '{{#invoke:Cookpot|cookpotCalculate|' + dlc + '|' + warly + '|' + cookpot[0] + '|' + cookpot[1] + '|' + cookpot[2] + '|' + cookpot[3] + '}}',
                smaxage: 600,
                maxage: 600
            }).done(updateResult);
            if (($('#result1').attr('src') == ' ') || ($('#result1').attr('src') === undefined)) {
                src = $('#cookpotatwork').children('img').attr('data-src');
                $('#arrowcookpot').attr('src', src);
            }
        }
    }
};

window.updateResult = function(data) {
    console.log(data.expandtemplates['*']);
    cookpotResult = JSON.parse(data.expandtemplates['*']);
	
    for (var resultIndex = 0; resultIndex < cookpotResult.length; resultIndex++) {
        var resultInfo = cookpotResult[resultIndex];
        var src = $('#' + resultInfo['prefab']).children('img').attr('data-src');
        var id = resultIndex + 1;
        $('#result' + id).attr('src', src);
        $('#result' + id).attr('href', resultInfo['ru-name']);
        $("#name" + id).attr('href', resultInfo['ru-name']);
        if (resultIndex !== 0) {
            $('#result' + id).removeClass('hiddeningredientcookpot');
            $('#result' + id).addClass('result-cell-cookpot');
        }
        $('#arrowcookpot').attr('src', "https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru");
        $('#name' + id).text(resultInfo['ru-name']);
        $('#health' + id).text(' ' + resultInfo['health'] + ' ');
        $('#hunger' + id).text(' ' + resultInfo['hunger'] + ' ');
        $('#sanity' + id).text(' ' + resultInfo['sanity'] + ' ');
        $('#description' + id).css({
            "display": ""
        });
    }


    if (cookpotResult.length == 4) {
        $('#chance1, #chance2, #chance3, #chance4').text('25%');
    } else if (cookpotResult.length == 3) {
        $('#chance1, #chance2, #chance3').text('33%');
    } else if (cookpotResult.length == 2) {
        $('#chance1, #chance2').text('50%');
    }

};