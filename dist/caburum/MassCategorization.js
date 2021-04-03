/* 
 * Mass Categorization
 * @description (De)Categorize listed multiple pages.
 * @author Ozuzanna, Dorumin, Caburum
 * @todo Add more i18n
 * Added option for <noinclude></include> (Dessamator)
 * Updated: (Dorumin)
 *     - Some optimization and code-cleaning.
 *     - Re-added the replace function
 *     - Now can add, remove, and replace multiple categories at once (but not all three modes at the same time).
 *     - Now prompts if you try to exit the modal while running.
 *     - The broad option now doesn't replace stuff like "Test 123", but I kept the option in anyways.
 * Updated for UCP (Caburum)
 */
 
mw.loader.using('mediawiki.api').then(function() {
 
    var groups = window.MassCategorizationGroups || ['autoconfirmed', 'bot', 'sysop'];
    if (
        window.MassCategorizationLoaded ||
        !mw.config.get('wgUserGroups').some(function(el) {
            return groups.indexOf(el) !== -1;
        })
    ) {
        return;
    }
    window.MassCategorizationLoaded = true;
 
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:MassCategorization.css'
    });
    
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Modal.js'
    });
 
	var i18n = {
		//language list - start
		en: {
			title: "Mass Categorization",
			mode: "Mode",
			add: "Add",
			remove: "Remove",
			replace: "Replace",
			category: "Category",
			categoryPlural: "Categories",
			replaceWith: "Replace with",
			matching: "Matching",
			generalMatching: "General (does not account for piped categories)",
			broadMatching: "Broad (takes care of piped links)",
			noInclude: "Do not include in transclusion (for templates)",
			caseSensitive: "Case sensitive (removal and replace only)",
			instructions: "Put the name of each page you want to categorize on a separate line",
			outputInitial: "Any errors encountered will appear below",
			cancel: "Cancel",
			addCategoryContents: "Add category contents",
			initiate: "Initiate",
			categoryPrompt: "Please enter the category name (no category prefix)",
			doesNotExist: "$1 does not exist",
			failedToGetContents: "Failed to get contents of $1",
			categoryAlert: "Please enter at least one category",
			warning: "Warning",
			closeModalWarning: "Are you sure you want to close the modal without finishing?",
			close: "Close",
			finished: "Finished",
			nothingLeftToDo: "Nothing left to do, or next line is blank",
			noCategoryToReplace: "No $1 to replace with entered",
			pageNotExist: "Page $1 does not exist",
			addSummary: "Adding $1 (automatic)",
			addFail: "Failed to add $1 to $2",
			categoryAlready: "$1 already has the category $2 or an error was encountered; it has been skipped",
			categoryCheckFail: "Category check failed for $1; it has been skipped",
			removeNotFound: "$1 was not found on $2",
			removeFail: "Failed to remove $1 from $2",
			removeSuccess: "$1 successfully removed from $2",
			removeSummary: "Removing $1 (automatic)",
			replaceFail: "Failed to replace $1 on $2",
			replaceSuccess: "Category successfully replaced on $1",
			replaceSummary: "Replacing $1 with $2 (automatic)",
			multiReplaceSummary: "Replacing categories: $1 (automatic)",
			noCategoryReplace: "No category to replace",
			automatic: "automatic"
		}
	};
	//set i18n according to user's language
	i18n = i18n[mw.config.get("wgUserLanguage")] || i18n[mw.config.get("wgUserLanguage").split('-')[0]] || i18n.en;
	var categoryName = mw.config.get('wgFormattedNamespaces')[14];
    
    var FormMC = '\
    <form method="" name="" class="WikiaForm "> \
        <fieldset> \
            <p>' + i18n.mode + ': \
                <select id="select-mc"> \
                    <option value="1">' + i18n.add + '</option> \
                    <option value="2">' + i18n.remove + '</option> \
                    <option value="3">' + i18n.replace + '</option> \
                </select> \
            </p> \
            <span style="float: right; text-align: center; margin-right: 20px;"> \
                <span id="mc-add-category">+</span> \
                <br /> \
                <span id="mc-remove-category" disabled>-</span> \
            </span> \
            <div id="mc-categories-container"> \
                <p>' + i18n.category + ': \
                    <input type="text" class="category-name" value="" /> \
                <p class="replace-para" style="display: none; padding-top: 3px;">' + i18n.replaceWith + ': \
                    <input type="text" class="replace-category-name" value="" /> \
           </div> \
                <p>' + i18n.matching + ': \
                <br/> \
                <label for="normal-removal"><input type="radio" id="mc-normal-removal" name="mass-categorization-removal" value="1" checked="checked"/>' + i18n.generalMatching + '</label> \
             <br/> \
                <label for="broad-removal"><input type="radio" id="mc-broad-removal" name="mass-categorization-removal"/ value="2">' + i18n.broadMatching + '</label> \
            <p> \
            <br/> \
                <label for="no-include"><input type="checkbox" id="mc-noinclude" name="mass-categorization-noinclude"/ value="1">' + i18n.noInclude + '</label> \
            <br/> \
                <label for="case-sensitive"><input type="checkbox" id="mc-case-sensitive" name="mass-categorization-casesensitive"/ value="1">' + i18n.caseSensitive + '</label> \
            </p> \
            <br/> \
            <p>' + i18n.instructions + '</p> \
                <textarea style="height: 20em; width: 80%;" id="text-categorization"/> \
        </fieldset> \
        <div id="mc-text-error-output">' + i18n.outputInitial + ': <br /></div> \
    </form>',
    delay = window.massCategorizationDelay || 1000,
    isUCP = mw.config.get('wgVersion') !== '1.19.24',
    categorizationModal,
    Api = new mw.Api();
 
    function click() {
        if (categorizationModal) {
            categorizationModal.show();
            return;
        }

        categorizationModal = new window.dev.modal.Modal({
            id: 'form-categorization',
            content: FormMC,
            size: isUCP ? 'large' : 'medium',
            title: i18n.title,
            close: 'closeModal',
            buttons: [{
                id: 'start-button',
                text: i18n.initiate,
                primary: true,
                event: 'init'
            }, {
                text: i18n.addCategoryContents,
                primary: true,
                event: 'addCategoryContents'
            }],
            events: {
            	close: close,
                init: init,
                addCategoryContents: addCategoryContents
            }
    	});
    	
        categorizationModal.create().then(function() {
            document.getElementById('mc-add-category').addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('mc-remove-category').removeAttribute('disabled');
                var container = document.getElementById('mc-categories-container');
                $(container).append('<div style="display: none;">\
                    <p>' + i18n.category + ': \
                        <input type="text" class="category-name" value="" /> \
                    <p class="replace-para" style="' + (document.getElementById('select-mc').value == 3 ? '' : 'display: none;') + 'padding-top: 3px;">' + i18n.replaceWith + ': \
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
        });
        
        categorizationModal.show();
    }
 
    mw.hook('dev.modal').add(function(modal) {
	    $('#my-tools-menu').prepend(
	        $('<li>', {
	            'class': 'custom'
	        }).append(
	            $('<a>', {
	                id: 't-mc',
	                text: i18n.title,
	                click: click
	            })
	        )
	    );
    });
 
    function logError(msg) {
        console.log(msg);
        var errBox = document.getElementById('mc-text-error-output');
        var text = document.createTextNode(msg);
        errBox.appendChild(text);
        var brTag = document.createElement('br');
        errBox.appendChild(brTag);
    }
 
    function addCategoryContents() {
        var category = prompt(i18n.categoryPrompt + ' :').replace('_', ' ');
        Api.get({
                action: 'query',
                list: 'categorymembers',
                cmtitle: i18n.category + ':' + category,
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
                        logError(i18n.doesNotExist.replace('$1',category));
                    }
                } else {
                    logError(i18n.failedToGetContents.replace('$1',category) + ' : ' + d.error.code);
                }
            })
            .fail(function() {
                logError(i18n.failedToGetContents.replace('$1',category));
            });
    }
 
    function init() {
        var catSlots = Array.from(document.getElementsByClassName('category-name')),
            txt = document.getElementById('text-categorization'),
            pages = txt.value.split('\n'),
            page = pages[0],
            catNames = [];
 
        $.each(catSlots, function(i, name) {
            name = name.value.trim();
            catNames.push(name.charAt(0).toUpperCase() + name.slice(1));
        });
 
        if (!catNames.filter(Boolean).length) {
            alert(i18n.categoryAlert);
            return;
        }
 
        document.getElementById('start-button').setAttribute('disabled', 'disabled');
 
        $('.blackout, #form-categorization .oo-ui-flaggedElement-close').unbind();
        $('.blackout, #form-categorization .oo-ui-flaggedElement-close').bind('click', function() {
            closeWarningModal = new window.dev.modal.Modal({
                id: 'close-warning',
                size: 'medium',
                title: i18n.warning,
                content: i18n.closeModalWarning,
                buttons: [{
                    text: i18n.close,
                    primary: true,
                    event: accept
                }],
                events: {
                    close: function() {
                    	closeWarningModal.close();
                    },
                    accept: function() {
                    	categorizationModal.close();
                    	closeWarningModal.close();
                    }
                }
            });
            closeWarningModal.create()
            closeWarningModal.show()
        });
        if (!page && !document.getElementById('form-complete')) {
            document.getElementById('start-button').removeAttribute("disabled");
            
            finishedModal = new window.dev.modal.Modal({
                id: 'form-complete',
                width: 200,
                size: 'medium',
                title: i18n.finished,
                content: i18n.nothingLeftToDo,
                buttons: [{
                    text: i18n.close,
                    id: 'form-complete-button',
                    primary: true,
                    event: 'close',
                    events: {
                        close: function() {
                            $('#form-complete').closeModal();
                            var $elems = $('.blackout, #form-categorization .oo-ui-flaggedElement-close');
                            $elems.unbind();
                            $elems.click(function() {
                                $('#form-categorization').closeModal();
                            });
                        }
                    }
                }]
            });
            finishedModal.create().then(function() {
                var $blackout = $('.blackout').last();
                $blackout.unbind();
                $blackout.click(function() {
                    $('#form-complete .wikia-button').click();
                });
            });
            finishedModal.show();
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
            $.each(newCatEl, function(i, name) {
                name = name.value.trim();
                newCats.push(name.charAt(0).toUpperCase() + name.slice(1));
            });
            if (!newCats.filter(Boolean).length) {
                alert(i18n.noCategoryToReplace.replace('$1', (newCatEl.length == 1 ? i18n.category : i18n.categoryPlural) ));
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
                    logError(i18n.pageNotExist.replace('$1', pageToCat));
                    return;
                }
                var knownCats = [];
                if (page.categories) {
                    $.each(page.categories, function(i, categ) {
                        knownCats.push(categ.title);
                    });
                }
                var toAdd = [];
                $.each(cats, function(i, cat) {
                    if (!cat) return;
                    cat = i18n.category + ':' + cat;
                    if (knownCats.indexOf(cat) === -1) toAdd.push(cat);
                });
                if (toAdd.length) {
                    var sPrefix = "";
                    var sSuffix = "";
                    if ($('input[name=mass-categorization-noinclude]').prop('checked')) {
                        sPrefix = "<noinclude>";
                        sSuffix = "<\/noinclude>";
                    }
                    summary = i18n.addSummary
                        .replace('$1', (toAdd.length == 1 ? i18n.category : i18n.categoryPlural + ':') + ' [[' + toAdd.join(']], [[') + ']]')
                        .replace(new RegExp('\\[\\[(?:' + i18n.category + '|Category):(.*?)\\]\\]', 'gi'), '[[' + i18n.category + ':$1|$1]]');
                    config = {
                        format: 'json',
                        action: 'edit',
                        title: pageToCat,
                        summary: summary,
                        nocreate: '',
                        appendtext: sPrefix + '\n[[' + toAdd.join(']]\n[[') + ']]' + sSuffix,
                        bot: true,
                        minor: true,
                        token: mw.user.tokens.get('editToken')
                    };
 
                    $.ajax({
                        url: mw.util.wikiScript('api'),
                        data: config,
                        dataType: 'json',
                        type: 'POST',
                        success: function(d) {
                            if (!d.error) {
                                console.log((toAdd.length == 1 ? i18n.category : i18n.categoryPlural) + ' successfully added to ' + pageToCat + '!');
                            } else {
                                logError(i18n.addFail.replace('$1',(toAdd.length == 1 ? i18n.category : i18n.categoryPlural )).replace('$2',pageToCat) + ': ' + d.error.code);
                            }
                        },
                        error: function() {
                            logError(i18n.addFail.replace('$1',(toAdd.length == 1 ? i18n.category : i18n.categoryPlural )).replace('$2',pageToCat));
                        }
                    });
                } else {
                    logError(cats.length == 1 ? pageToCat + ' already has the category ' + cats[0].substring(9) + ' or an error was encountered; it has been skipped.' : pageToCat + ' has each of the categories specified; it has been skipped.');
                }
            } else if (actionVal == 2 && !d.error) {
                /*
                 * Remove category.
                 */
                if (page.missing === '') {
                    logError(i18n.pageNotExist.replace('$1',pageToCat));
                    return;
                }
 
                $.each(cats, function(i, cat) {
                    if (!cat) {
                        cats[i] = false;
                        return;
                    }
 
                    // Remove it
                    var cSens = document.getElementById('mc-case-sensitive').checked;
                    var broad = document.getElementById('mc-broad-removal').checked;
                    var flags = 'g' + (cSens ? '' : 'i');
                    var escapedCat = $.escapeRE(cat).replace(/\s/g, '(\\s|_)');
                    var escapedName = $.escapeRE(categoryName).replace(/\s/g, '(\\s|_)');
                    var nRegEx = '\\[\\[' + escapedName + ':' + escapedCat + '\\]\\]';
                    var sRegEx = '(\\[\\[' + escapedName + ':' + escapedCat + '\\]\\]|\\[\\[' + i18n.category + ':' + escapedCat + '\\|.*?\\]\\])';
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
                        console.log(i18n.removeNotFound.replace('$1', cat).replace('$2', pageToCat));
                        cats[i] = false;
                    }
                    newContent = newContent.replace(regex, '');
                });
 
                //don't submit if new and old contents are equal (no category found)
                if (newContent == content) {
                    logError(i18n.removeNotFound.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2',pageToCat ));
                    return;
                }
 
                //submit new page
                cats = cats.filter(Boolean);
                summary = i18n.removeSummary
                    .replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) + ' [[' + i18n.category + ':' + cats.join(']], [[' + i18n.category + ':') + ']]')
                    .replace(new RegExp('\\[\\[(?:' + i18n.category + '|Category):(.*?)\\]\\]', 'gi'), '[[' + i18n.category + ':$1|$1]]');
                config = {
                    format: 'json',
                    action: 'edit',
                    watchlist: 'nochange',
                    title: pageToCat,
                    summary: summary,
                    nocreate: '',
                    text: newContent,
                    bot: true,
                    minor: true,
                    token: mw.user.tokens.get('editToken')
                };
 
                $.ajax({
                    url: mw.util.wikiScript('api'),
                    data: config,
                    dataType: 'json',
                    type: 'POST',
                    success: function(d) {
                        if (!d.error) {
                            console.log(i18n.removeSuccess.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat) );
                        } else {
                            logError(i18n.removeFail.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat) + ': ' + d.error.code);
                        }
                    },
                    error: function() {
                        logError(i18n.removeFail.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat));
                    }
                });
            } else if (actionVal == 3 && !d.error) {
                /* 
                 * Replace category.
                 */
                if (page.missing === '') {
                    logError(i18n.pageNotExist.replace('$1', pageToCat) );
                    return;
                }
 
                // Replace it
                $.each(cats, function(i, cat) {
                    if (!cat) {
                        console.log(i18n.noCategoryToReplace);
                        cat[i] = false;
                        newCats[i] = false;
                        return;
                    } else if (!newCats[i]) {
                        console.log(cat + ': ' + i18n.noCategoryToReplace);
                        cats[i] = false;
                        newCats[i] = false;
                        return;
                    }
                    var cSens = document.getElementById('mc-case-sensitive').checked;
                    var broad = document.getElementById('mc-broad-removal').checked;
                    var flags = 'g' + (cSens ? '' : 'i');
                    var escapedCat = cat;
                    ['\\', '(', ')', '[', ']', '{', '}', '?', '.', '^', '$', '|'].forEach(function(el) {
                        escapedCat = escapedCat.replace(new RegExp('\\' + el, 'g'), '\\' + el);
                    });
                    var nRegEx = '\\[\\[' + i18n.category + ':' + escapedCat + '\\]\\]';
                    var sRegEx = '(\\[\\[' + i18n.category + ':' + escapedCat + '\\]\\]|\\[\\[' + i18n.category + ':' + escapedCat + '\\|.*?\\]\\])';
                    var regex = new RegExp(broad ? sRegEx : nRegEx, flags);
                    var newCat = i18n.category + ':' + newCats[i].charAt(0).toUpperCase() + newCats[i].substring(1);
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
                    logError(i18n.removeNotFound.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat));
                    return;
                }
 
                // Create the summary
                cats = cats.filter(Boolean);
                newCats = newCats.filter(Boolean);
                if (cats.length == 1)
                    summary = i18n.replaceSummary
                        .replace('$1', '[[' + i18n.category + ':' + cats[0] + '|' + cats[0] + ']]')
                        .replace('$2', '[[' + i18n.category + ':' + newCats[0] + '|' + newCats[0] + ']]');
                else {
                    var replacements = '';
                    $.each(cats, function(i, cat) {
                        var temp = replacements + '[[' + i18n.category + ':' + cat + '|' + cat + ']] → [[' + i18n.category + ':' + newCats[i] + '|' + newCats[i] + ']], ';
                        if (temp.length > 150) {
                            if (replacements.indexOf('(+)') == -1)
                                replacements = replacements.replace('(' + i18n.automatic + ')', '(+) (' + i18n.automatic + ')');
                            return;
                        }
                        replacements = temp;
                    });
                    summary = i18n.multiReplaceSummary
                        .replace('$1', replacements.slice(0, replacements.length - 2));
                }
 
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
                    minor: true,
                    token: mw.user.tokens.get('editToken')
                };
 
                $.ajax({
                    url: mw.util.wikiScript('api'),
                    data: config,
                    dataType: 'json',
                    type: 'POST',
                    success: function(d) {
                        if (!d.error) {
                            console.log(i18n.replaceSuccess.replace('$1', pageToCat));
                        } else {
                            logError(i18n.replaceFail.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat) + ': ' + d.error.code);
                        }
                    },
                    error: function() {
                        logError(i18n.replaceFail.replace('$1', (cats.length == 1 ? i18n.category : i18n.categoryPlural) ).replace('$2', pageToCat));
                    }
                });
            } else {
                if (actionVal == 1) logError(i18n.categoryCheckFail.replace('$1', pageToCat) + d.error.code);
                else logError(i18n.failedToGetContents.replace('$1', pageToCat) + d.error.code);
            }
        }).fail(function() {
            if (actionVal == 1) logError(i18n.categoryCheckFail.replace('$1', pageToCat));
            else logError(i18n.failedToGetContents.replace('$1', pageToCat));
        });
        setTimeout(init, delay);
    }
});