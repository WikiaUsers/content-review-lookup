/* 
 * Mass Categorization
 * @description (De)Categorize listed multiple pages.
 * @author Ozuzanna
 * Added option for <noinclude></include> (Dessamator)
 * Updated: (Dorumin)
 *     - Some optimization and code-cleaning.
 *     - Re-added the replace function
 *     - Now can add, remove, and replace multiple categories at once (but not all three modes at the same time).
 *     - Now prompts if you try to exit the modal while running.
 *     - The broad option now doesn't replace stuff like "Test 123", but I kept the option in anyways. 
 *       Anybody can remove it if you want, it really serves no purpose anymore.
 */
 
(function($, mw) {
 
    if ($('#t-mc').length)
        return;
 
    var FormMC = '\
    <form method="" name="" class="WikiaForm "> \
        <fieldset> \
            <p>Mode: \
                <select id="select-mc"> \
                    <option value="1">Add</option> \
                    <option value="2">Remove</option> \
                    <option value="3">Replace</option> \
                </select> \
            </p> \
            <span style="float: right; text-align: center;"> \
                <span id="mc-add-category">+</span> \
                <br /> \
                <span id="mc-remove-category" disabled>-</span> \
            </span> \
            <div id="mc-categories-container"> \
                <p>Category: \
                    <input type="text" class="category-name" value="" /> \
                <p class="replace-para" style="display: none; padding-top: 3px;">Replace with: \
                    <input type="text" class="replace-category-name" value="" /> \
           </div> \
                <p>Matching: \
                <br/> \
                <label for="normal-removal"><input type="radio" id="mc-normal-removal" name="mass-categorization-removal" value="1" checked="checked"/>General (does not account for piped categories)</label> \
             <br/> \
                <label for="broad-removal"><input type="radio" id="mc-broad-removal" name="mass-categorization-removal"/ value="2">Broad (takes care of piped links)</label> \
            <p> \
            <br/> \
                <label for="no-include"><input type="checkbox" id="mc-noinclude" name="mass-categorization-noinclude"/ value="1">Do not include in transclusion (for templates)</label> \
            <br/> \
                <label for="case-sensitive"><input type="checkbox" id="mc-case-sensitive" name="mass-categorization-casesensitive"/ value="1">Case sensitive (removal and replace only)</label> \
            </p> \
            <br/> \
            <p>Put the name of each page you want to categorize on a <b>separate line</b>.</p> \
                <textarea style="height: 20em; width: 80%;" id="text-categorization"/> \
        </fieldset> \
        <div id="text-error-output">Any errors encountered will appear below<br /></div> \
    </form>',
        delay = window.massCategorizationDelay || 1000,
        Api = new mw.Api();
 
    // Add the necessary CSS for the modal
    mw.util.addCSS('                                          \
        #mc-remove-category[disabled] {                       \
            display: none;                                    \
        }                                                     \
        #mc-add-category, #mc-remove-category {               \
            transition: all 0.2s ease-in-out;                 \
            cursor: pointer;                                  \
            font-size: 16px;                                  \
            margin-top: 4px;                                  \
        }                                                     \
        #mc-add-category:hover, #mc-remove-category:hover {   \
            -webkit-text-shadow:0 0 2px blue;                 \
            -moz-text-shadow: 0 0 2px blue;                   \
            text-shadow:0 0 2px grey;                         \
        }                                                     \
        #text-error-output {                                  \
            height: 10em;                                     \
            width: 80%;                                       \
            margin: 5px auto 0px auto;                        \
            color: #000;                                      \
            background-color: #ffbfbf;                        \
            height: 150px;                                    \
            border: 1px solid black;                          \
            font-weight: bold;                                \
            overflow: scroll;                                 \
        }                                                     \
    ');
 
    //Support for Monobook
    if (mw.config.get('skin') === 'monobook') {
        mw.util.addPortletLink('p-tb', '#', 'Mass Categorization', 't-mc');
    } else {
        $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-mc">Mass Categorization</a></li>');
    }
 
    document.getElementById('t-mc').addEventListener('click', function() {
        $.showCustomModal('Mass Categorization', FormMC, {
            id: 'form-categorization',
            callback: function() {
                document.getElementById('mc-add-category').addEventListener('click', function(e) {
                    e.preventDefault();
                    document.getElementById('mc-remove-category').removeAttribute('disabled');
                    var container = document.getElementById('mc-categories-container');
                    $(container).append('<div style="display: none;">\
                        <p>Category: \
                            <input type="text" class="category-name" value="" /> \
                        <p class="replace-para" style="' + (document.getElementById('select-mc').value == 3 ? '' : 'display: none;') + 'padding-top: 3px;">Replace with: \
                            <input type="text" class="replace-category-name" value="" />\
                    </div>');
                    $(container.lastElementChild).fadeIn();
                });
                document.getElementById('mc-remove-category').addEventListener('click', function(e) {
                    e.preventDefault();
                    var $toremove = $('#mc-categories-container > div:not(.removed)').last();
                    $toremove.addClass('removed').fadeOut(400, function() {
                        $(this).remove();
                    });
                    if ($toremove.parent().children(':not(.removed):last').prop('tagName') != 'DIV') this.setAttribute('disabled', 'disabled');
                });
                document.getElementById('select-mc').addEventListener('change', function() {
                    if (this.value == 3) {
                        $('.replace-para').fadeIn();
                    } else {
                        $('.replace-para').fadeOut();
                    }
                });
            },
            width: 500,
            buttons: [{
                message: 'Cancel',
                handler: function() {
                    $('#form-categorization').closeModal();
                }
            }, {
                message: 'Add category contents',
                defaultButton: true,
                handler: function() {
                    addCategoryContents();
                }
            }, {
                id: 'start-button',
                message: 'Initiate',
                defaultButton: true,
                handler: function() {
                    init();
                }
            }]
        });
    });
 
    function logError(msg) {
        console.log(msg);
        var errBox = document.getElementById('text-error-output');
        var text = document.createTextNode(msg);
        errBox.appendChild(text);
        var brTag = document.createElement('br');
        errBox.appendChild(brTag);
    }
 
    function addCategoryContents() {
        var category = prompt('Please enter the category name (no category prefix):').replace('_', ' ');
        Api.get({
                action: 'query',
                list: 'categorymembers',
                cmtitle: "Category:" + category,
                cmlimit: 5000,
                cb: new Date().getTime()
            })
            .done(function(d) {
                if (!d.error) {
                    var data = d.query;
                    var pList = document.getElementById('text-categorization');
                    if (data.categorymembers) {
                        for (var i in data.categorymembers) {
                            pList.value += data.categorymembers[i].title + '\n';
                        }
                    } else {
                        logError(category + ' does not exist!');
                    }
                } else {
                    logError('Failed to get contents of ' + category + ' : ' + d.error.code);
                }
            })
            .fail(function() {
                logError('Failed to get contents of ' + category + '!');
            });
    }
 
    function init() {
        var catSlots = Array.from(document.getElementsByClassName('category-name')),
            txt = document.getElementById('text-categorization'),
            pages = txt.value.split('\n'),
            page = pages[0],
            catNames = [];
 
        catSlots.forEach(function(name) {
            name = name.value.trim();
            catNames.push(name.charAt(0).toUpperCase() + name.slice(1));
        });
 
        if (!catNames.filter(Boolean).length) {
            alert('Please enter at least one category!');
            return;
        }
 
        document.getElementById('start-button').setAttribute('disabled', 'disabled');
 
        $('.blackout, #form-categorization .close').unbind();
        $('.blackout, #form-categorization .close').bind('click', function() {
            $.showCustomModal('Warning', 'Are you sure you want to close the modal without finishing?', {
                id: 'close-warning',
                width: 400,
                buttons: [{
                    message: 'Close',
                    defaultButton: true,
                    handler: function() {
                        // Nope, you can't close both with one call.
                        $('#close-warning').closeModal();
                        $('#form-categorization').closeModal();
                    }
                }, {
                    message: 'Cancel',
                    handler: function() {
                        $('#close-warning').closeModal();
                    }
                }]
            });
        });
        if (!page && !document.getElementById('form-complete')) {
            document.getElementById('start-button').removeAttribute("disabled");
            $.showCustomModal('Finished!', 'Nothing left to do, or next line is blank.', {
                id: 'form-complete',
                width: 200,
                callback: function() {
                    var $blackout = $('.blackout').last();
                    $blackout.unbind();
                    $blackout.click(function() {
                        $('#form-complete .wikia-button').click();
                    });
                },
                buttons: [{
                    message: 'Close',
                    id: 'form-complete-button',
                    defaultButton: true,
                    handler: function() {
                        $('#form-complete').closeModal();
                        var $elems = $('.blackout, #form-categorization .close');
                        $elems.unbind();
                        $elems.click(function() {
                            $('#form-categorization').closeModal();
                        });
                    }
                }]
            });
        } else {
            categorize(page, catNames);
        }
        pages = pages.slice(1, pages.length);
        txt.value = pages.join('\n');
    }
 
    function categorize(pageToCat, cats) {
        var actionVal = document.getElementById('select-mc').value;
        if (actionVal == 3) {
            var newCatEl = Array.from(document.getElementsByClassName('replace-category-name'));
            var newCats = [];
            newCatEl.forEach(function(name) {
                name = name.value.trim();
                newCats.push(name.charAt(0).toUpperCase() + name.slice(1));
            });
            if (!newCats.filter(Boolean).length) {
                alert('No ' + (newCatEl.length == 1 ? 'category' : 'categories') + ' to replace with entered!');
                document.getElementById('start-button').removeAttribute("disabled");
                return;
            }
        }
        Api.get({
            action: 'query',
            titles: pageToCat,
            prop: 'revisions|categories',
            rvprop: 'content',
            cb: new Date().getTime()
        }).done(function(d) {
            var page = d.query.pages[Object.keys(d.query.pages)[0]];
            var content = page.missing === '' ? '' : page.revisions[0]['*'];
            var newContent = content;
            var config;
            var summary;
            if (actionVal == 1 && !d.error) {
                /*
                 * Add category.
                 */
                if (page.missing === '') {
                    logError('Page ' + pageToCat + ' does not exist!');
                    return;
                }
                var knownCats = [];
                if (page.categories) {
                    page.categories.forEach(function(categ) {
                        knownCats.push(categ.title);
                    });
                }
                var toAdd = [];
                cats.forEach(function(cat) {
                    if (!cat) return;
                    cat = 'Category:' + cat;
                    if (knownCats.indexOf(cat) === -1) toAdd.push(cat);
                });
                if (toAdd.length) {
                    var sPrefix = "";
                    var sSuffix = "";
                    if ($('input[name=mass-categorization-noinclude]').prop('checked')) {
                        sPrefix = "<noinclude>";
                        sSuffix = "<\/noinclude>";
                    }
                    summary = ('Adding ' + (toAdd.length == 1 ? 'category' : 'categories:') + ' [[' + toAdd.join(']], [[') + ']] (automatic)').replace(/\[\[Category:(.*?)\]\]/g, '[[Category:$1|$1]]');
                    config = {
                        format: 'json',
                        action: 'edit',
                        title: pageToCat,
                        summary: summary,
                        nocreate: '',
                        appendtext: sPrefix + '\n[[' + toAdd.join(']]\n[[') + ']]' + sSuffix,
                        bot: true,
                        token: mw.user.tokens.get('editToken')
                    };
 
                    if (mw.config.get("wgUserGroups").join(' ').indexOf('bot') == -1)
                        delete config.bot;
 
                    $.ajax({
                        url: mw.util.wikiScript('api'),
                        data: config,
                        dataType: 'json',
                        type: 'POST',
                        success: function(d) {
                            if (!d.error) {
                                console.log((toAdd.length == 1 ? 'Category' : 'Categories') + ' successfully added to ' + pageToCat + '!');
                            } else {
                                logError('Failed to add ' + (toAdd.length == 1 ? 'Category' : 'Categories') + ' to ' + pageToCat + ': ' + d.error.code);
                            }
                        },
                        error: function() {
                            logError('Failed to add ' + (toAdd.length == 1 ? 'Category' : 'Categories') + ' to ' + pageToCat + '!');
                        }
                    });
                } else {
                    window.test = toAdd;
                    logError(cats.length == 1 ? pageToCat + ' already has the category ' + cats[0].substring(9) + ' or an error was encountered; it has been skipped.' : pageToCat + ' has each of the categories specified; it has been skipped.');
                }
            } else if (actionVal == 2 && !d.error) {
                /*
                 * Remove category.
                 */
                if (page.missing === '') {
                    logError('Page ' + pageToCat + ' does not exist!');
                    return;
                }
 
                cats.forEach(function(cat, i) {
                    if (!cat) {
                        cats[i] = false;
                        return;
                    }
 
                    // Remove it
                    var cSens = document.getElementById('mc-case-sensitive').checked;
                    var broad = document.getElementById('mc-broad-removal').checked;
                    var flags = 'g' + (cSens ? '' : 'i');
                    var nRegEx = '\\[\\[Category:' + cat + '\\]\\]';
                    var sRegEx = '(\\[\\[Category:' + cat + '\\]\\]|\\[\\[Category:' + cat + '\\|.*?\\]\\])';
                    var regex = new RegExp(broad ? sRegEx : nRegEx, flags);
                    if ($('input[name=mass-categorization-removal]:checked').val() == 2) {
                        regex = new RegExp(sRegEx, "gi");
                    }
                    if (document.getElementById('mc-noinclude').checked) {
                        regex = new RegExp('\\<noinclude\\>\\s*' + (broad ? sRegEx : nRegEx) + '\\s*\\<\/noinclude\\>', flags);
                    }
                    if (regex.test(newContent)) 
                        newContent = newContent.replace(regex, '');
                    else {
                        console.log(cat + ' was not found on ' + pageToCat + '!');
                        cats[i] = false;
                    }
                    newContent = newContent.replace(regex, '');
                });
 
                //don't submit if new and old contents are equal (no category found)
                if (newContent == content) {
                    logError((cats.length == 1 ? 'Category' : 'Categories') + ' not found on ' + pageToCat + '!');
                    return;
                }
 
                //submit new page
                cats = cats.filter(Boolean);
                summary = ('Removing ' + (cats.length == 1 ? 'category' : 'categories:') + ' [[' + cats.join(']], [[') + ']] (automatic)').replace(/\[\[Category:(.*?)\]\]/g, '[[Category:$1|$1]]');
                config = {
                    format: 'json',
                    action: 'edit',
                    watchlist: 'nochange',
                    title: pageToCat,
                    summary: summary,
                    nocreate: '',
                    text: newContent,
                    bot: true,
                    token: mw.user.tokens.get('editToken')
                };
 
                if (mw.config.get("wgUserGroups").join(' ').indexOf('bot') == -1)
                    delete config.bot;
 
                $.ajax({
                    url: mw.util.wikiScript('api'),
                    data: config,
                    dataType: 'json',
                    type: 'POST',
                    success: function(d) {
                        if (!d.error) {
                            console.log((cats.length == 1 ? 'Category' : 'Categories') + ' successfully removed from ' + pageToCat + '!');
                        } else {
                            logError('Failed to remove ' + (cats.length == 1 ? 'category' : 'categories') + ' from ' + pageToCat + ': ' + d.error.code);
                        }
                    },
                    error: function() {
                        logError('Failed to remove ' + (cats.length == 1 ? 'category' : 'categories') + ' from ' + pageToCat + '!');
                    }
                });
            } else if (actionVal == 3 && !d.error) {
                /* 
                 * Replace category.
                 */
                if (page.missing === '') {
                    logError('Page ' + pageToCat + ' does not exist!');
                    return;
                }
 
                // Replace it
                cats.forEach(function(cat, i) {
                    if (!cat) {
                        console.log('No category to replace!');
                        cats.splice(i, 1);
                        newCats.splice(i, 1);
                        return;
                    } else if (!newCats[i]) {
                        console.log('No category to replace ' + cat + ' with!');
                        cats.splice(i, 1);
                        newCats.splice(i, 1);
                        return;
                    }
                    var cSens = document.getElementById('mc-case-sensitive').checked;
                    var broad = document.getElementById('mc-broad-removal').checked;
                    var flags = 'g' + (cSens ? '' : 'i');
                    var nRegEx = '\\[\\[Category:' + cat + '\\]\\]';
                    var sRegEx = '(\\[\\[Category:' + cat + '\\]\\]|\\[\\[Category:' + cat + '\\|.*?\\]\\])';
                    var regex = new RegExp(broad ? sRegEx : nRegEx, flags);
                    var newCat = 'Category:' + newCats[i].charAt(0).toUpperCase() + newCats[i].substring(1);
                    if (regex.test(newContent)) 
                        newContent = newContent.replace(regex, '[[' + newCat + ']]');
                    else {
                        cats[i] = false;
                        newCats[i] = false;
                        return;
                    }
                });
 
 
                // Don't submit if new and old contents are equal (no category found)
                if (newContent == content) {
                    logError((cats.length == 1 ? 'Category' : 'Categories') + ' not found on ' + pageToCat + '; this page has been skipped.');
                    return;
                }
 
                // Create the summary
                var replacements = '';
                cats = cats.filter(Boolean);
                newCats = newCats.filter(Boolean);
                cats.forEach(function(cat, i) {
                    var temp = replacements + '[[Category:' + cat + '|' + cat + ']] → [[Category:' + newCats[i] + '|' + newCats[i] + ']], '; 
                    if (temp.length > 150) {
                        if (replacements.indexOf('(+)') == -1)
                            replacements = replacements.replace(' (automatic)', '(+) (automatic)');
                        return;
                    }
                    replacements = temp;
                });
                summary = cats.length == 1 ? 'Replacing category [[Category:' + cats[0] + '|' + cats[0] + ']] with [[Category:' + newCats[0].replace(/\|.*/, '') + '|' + newCats[0].replace(/\|.*/, '') + ']] (automatic)' : 'Replacing categories: ' + replacements.replace(/, (?!.*, )/, '') + ' (automatic)';
 
                //submit new page
                config = {
                    format: 'json',
                    action: 'edit',
                    watchlist: 'nochange',
                    title: pageToCat,
                    summary: summary,
                    nocreate: '',
                    text: newContent,
                    bot: true,
                    token: mw.user.tokens.get('editToken')
                };
 
                if (mw.config.get("wgUserGroups").indexOf('bot') == -1)
                    delete config.bot;
 
                $.ajax({
                    url: mw.util.wikiScript('api'),
                    data: config,
                    dataType: 'json',
                    type: 'POST',
                    success: function(d) {
                        if (!d.error) {
                            console.log('Category successfully replaced on ' + pageToCat + '!');
                        } else {
                            logError('Failed to replace ' + (cats.length == 1 ? 'category' : 'categories') + ' on ' + pageToCat + ': ' + d.error.code);
                        }
                    },
                    error: function() {
                        logError('Failed to replace ' + (cats.length == 1 ? 'category' : 'categories') + ' on ' + pageToCat + '!');
                    }
                });
            } else {
                if (actionVal == 1) logError('Category check failed for ' + pageToCat + ': ' + d.error.code + '! It has been skipped.');
                else logError('Failed to get contents of ' + pageToCat + ': ' + d.error.code);
            }
        }).fail(function() {
            if (actionVal == 1) logError('Category check failed for ' + pageToCat + '! It has been skipped.');
            else logError('Failed to get contents of ' + pageToCat + '!');
        });
        setTimeout(init, delay);
    }
})(this.jQuery, this.mediaWiki);