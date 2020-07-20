/**
 * CPWEditTools
 *
 * A set of tools to make quick fixes to some common issues with articles.
 *
 * More information can be found at
 * http://cpw.wikia.com/User:Underscorre/EditTools
 *
 * @author http://cpw.wikia.com/User:MrDupin
 *
 * Adapted for use on Wikia by http://cpw.wikia.com/User:Underscorre
 */

window.cpwEditTools = (typeof window.cpwEditTools === "object") ?
                        window.cpwEditTools :
                        {};

(function (cpw, mw, $, window, undefined) {

    cpw.i18n = {
        definitions: {
            en: {
                "fix-indentation": "Fix Indentation",
                "fix-newlines": "Fix Newlines",
                "fix-caps": "Fix Captialisation",
                "fix-spacing": "Fix Spacing",
                "fix-coding": "Fix Coding",
                "fix-trailingspaces": "Fix Trailing Spaces",
                "fix-all": "Fix All Issues",
                "remove-newlines": "Remove Newlines"
            }
        },
        getTranslation: function (definition) {
            var definitions = cpw.i18n.definitions,
                overrideLang = cpw.config.overrideLang;

            if (typeof overrideLang === "string" &&
                definitions.hasOwnProperty(overrideLang) &&
                definitions[overrideLang].hasOwnProperty(definition))
            {
                return cpw.i18n.definitions[overrideLang][definition];
            }

            if (typeof cpw.i18n.lang === "undefined") {
                cpw.i18n.lang = mw.config.get("wgUserLanguage");
            }

            if (cpw.i18n.definitions.hasOwnProperty(cpw.i18n.lang) &&
                cpw.i18n.definitions[cpw.i18n.lang].hasOwnProperty(definition))
            {
                return cpw.i18n.definitions[cpw.i18n.lang][definition];
            }

            if (cpw.i18n.definitions.hasOwnProperty(cpw.config.defaultLang) &&
                cpw.i18n.definitions[cpw.config.defaultLang]
                    .hasOwnProperty(definition))
            {
                return cpw.i18n.definitions[cpw.config.defaultLang][definition];
            }

            console.warn("Could not find translation for " + definition);
            return definition;
        },
    };

    cpw.defaultModules = {
        "fix-indentation": function (story) {
            var sArray   = story.split('\n'), // Split input by newline chars
                newStory = "",
                i;

            for (i = 0; i < sArray.length; i++) {
                // Build string to display
                newStory += sArray[i].trim() + '\n'; // trim() removes indenting
                                                     // and trailing spaces
            }

            newStory = cpw.callModule("fix-trailingspaces", newStory);

            return newStory;
        },

        "fix-newlines": function (story) {
            var length = story.length,
                i      = 0,
                j;

            while (i < length - 1) {
                if (story.charAt(i) === '\n') {
                    if (story.charAt(i + 1) !== '\n') {
                        // One newline -> two newlines

                        story = story.slice(0, i) + '\n' + story.slice(i);
                        length++; // Added another char, increase length
                    } else {
                        // Found two newlines in a row
                        // Need to remove any other newlines

                        j = 1;

                        while (i + j < length && story.charAt(i + j) === '\n') {
                            // Another newline
                            j++;
                        }

                        story = story.slice(0, i + 1) + story.slice(i + j - 1);
                            // Removing excess newlines
                        length -= j;
                    }

                    i++; // In any case, we'll be left with exactly two newlines
                         // This puts i after the second one.
                }

                i++;
            }

            story = cpw.callModule("fix-trailingspaces", story);

            return story;
        },

        "fix-caps": function (story) {
            var length = story.length,
                i = 1,
                punctuations = ['.', '?', '!'],
                // Everything in [] or {} should stay as is.
                // If flag1 (flag2) is true, it means we are inside [] ({})
                flag1 = false,
                flag2 = false;

            if (story !== "") {
                // If input isn't empty

                var c = story.charAt(0);

                if (c === c.toLowerCase()) {
                    // Make first letter of story uppercase
                    story = c.toUpperCase() + story.slice(1);
                }

                if(c == '['){
                    //Inside []
                    flag1 = true;
                }else if(c == '{'){
                    //Inside {}
                    flag2 = true;
                }
            }

            while(i<length-1){
                var curr = story.charAt(i);

                if(curr == '['){
                    //Started []
                    flag1 = true;
                }else if(curr == ']'){
                    //Exited []
                    flag1 = false;
                }else if(curr == '{'){
                    //Started {}
                    flag2 = true;
                }else if(curr == '}'){
                    //Exited {}
                    flag2 = false;
                }

                if(flag1 || flag2){
                    //Still inside [] or {}, continue to next char
                    i++;
                    continue;
                }

                //Capitalize first-person 'i'
                /*
                    To find first-person 'i' we need to find the following:

                    a) Find 'i'
                    b) Found 'i' follows a space
                    c) Found 'i' is followed by either a space or punctuation
                */
                if(curr == 'i'){
                    //Found 'i'
                    if(story.charAt(i-1) == ' '){
                        //Found " i"
                        var c = story.charAt(i+1);

                        if(c == ' ' || c == '\'' ||
                            $.inArray(c, punctuations) > -1){
                            //Found " i" and it's followed by either a space or
                            // punctuation
                            story = story.slice(0,i) + 'I' + story.slice(i+1);
                                //Make 'i' uppercase
                        }
                    }

                    i++;
                }else if($.inArray(curr, punctuations) > -1){
                    //Punctuation
                    if(i+2<length){
                        if(curr == '.' && story.charAt(i+2) == '.'){
                            //Don't capitalize after ellipses
                            i += 2;
                        }else if(curr == '.' && i-3>0 &&
                            story.charAt(i-3) == 'e' &&
                            story.charAt(i-2) == 't' &&
                            story.charAt(i-1) == 'c')
                        {
                            //Encountered etc. Don't capitalize.
                            i++;
                        }else{
                            var c = story.charAt(i+1);

                            if(c !== '"' && c != "”" && c != "’" && c != "'"){
                                c = story.charAt(i+2);
                            
                                if(c != ' '){
                                    if(c == c.toLowerCase()){
                                        //Capitalize char after punctuation followed
                                        // by a single space
                                        story = story.slice(0,i+2) +
                                            story.charAt(i+2).toUpperCase() +
                                            story.slice(i+3);
                                    }
                                }else if(i+3<length){
                                    c = story.charAt(i+3);

                                    if(c == c.toLowerCase()){
                                        //Capitalize char after punctuation followed
                                        // by two spaces
                                        story = story.slice(0,i+3) +
                                            story.charAt(i+3).toUpperCase() +
                                            story.slice(i+4);
                                    }
                                }
                            }
                            
                        }
                    }

                }else if(curr == '\n'){
                    var c = story.charAt(i+1);

                    if(c == c.toLowerCase()){
                        //Capitalize first letter of paragraph
                        story = story.slice(0,i+1) + c.toUpperCase() +
                            story.slice(i+2);
                    }
                }

                i++;
            }

            story = cpw.callModule("fix-trailingspaces", story);

            return story;
        },

        "fix-spacing": function (story) {
            var length      = story.length,
                i           = 0,
                punctuation = ['.','?','!',','],
                numbers = ['0','1','2','3','4','5','6','7','8','9'],
                c,
                s,
                // Everything in [] or {} should stay as is.
                // If flag1 (flag2) is true, it means we are inside [] ({}).
                flag1       = false,
                flag2       = false,
                // We shouldn't separate punctuation from a closing quotation
                // mark.
                // When quoting is true, quotation marks have been opened but
                // haven't been closed
                quoting     = false;

            if (story !== '') {
                if (story.charAt(0) === '[') {
                    // First char is '['
                    flag1 = true;
                } else if (story.charAt(0) === '{') {
                    // First char is '{'
                    flag2 = true;
                }
            }

            while (i < length - 1) {
                curr = story.charAt(i);

                if (curr === '[') {
                    // Started []
                    flag1 = true;
                } else if (curr === ']') {
                    // Exited []
                    flag1 = false;
                } else if (curr === '{') {
                    // Started {}
                    flag2 = true;
                } else if (curr === '}') {
                    // Exited {}
                    flag2 = false;
                }

                if (flag1 || flag2) {
                    // Still inside [] or {}, continue to next char
                    i++;
                    continue;
                }

                // Add space after punctuation
                if ($.inArray(curr, punctuation) > -1) {
                    // Found punctuation
                    if (i + 1 < length) {
                        c = story.charAt(i + 1); // Char after punctuation

                        if (c !== '\n' && c !== curr &&
                            $.inArray(c, punctuation) < 0 && $.inArray(c, numbers) < 0 &&
                            c !== ' ')
                        {
                            if (curr == '.' && c == 'S' && story.charAt(i-1) == 'P') {
                                //Found P.S do nothing
                                i++;
                            } else if (c !== '"' && c != "”" && c != "’" && c != "'") {
                                                         // We are neither
                                                         // quoting nor did we
                                                         // find quote mark
                                // Add space after punctuation
                                story = story.slice(0, i + 1) + ' ' +
                                    story.slice(i + 1);
                                length++; // Added char, length needs to be
                                          // increased
                            } else if (i + 2 < length) {
                                // We stopped quoting, we need to add space
                                // after the quotation marks (if there isn't one)
                                //unless there is the wiki code ''
                                if (story.charAt(i + 2) !== ' ') {
                                    if(!(c == "'" && story.charAt(i+1) == "'")){
                                        //We did not encounter the wiki code ''
                                        story = story.slice(0, i + 2) + ' ' +
                                            story.slice(i + 2);
                                        length++;
                                    }
                                }
                            }
                        }
                    }

                    if (i - 1 > 0 && story.charAt(i - 1) === ' ') {
                        // There should never be a space on the left of
                        // punctuation
                        story = story.slice(0, i - 1) + story.slice(i);
                        length--;
                    }
                } else if (curr === ' ') {
                    if (i + 2 < length) {
                        if (story.charAt(i + 1) === ' ' &&
                            story.charAt(i + 2) === ' ')
                        {
                            // Only two spaces in a row are allowed.
                            s = 3;

                            while (s + i < length &&
                                story.charAt(s + i) === ' ')
                            {
                                // Continue as long as a space is found
                                s++;
                            }

                            story = story.slice(0, i + 2) + story.slice(i + s);
                                    // Remove s - 2 spaces
                            length -= (s - 2); // Removed s - 2 chars, length
                                               // needs to be decreased
                            i += 2; // Push i after the two spaces left
                        }
                    }
                }

                i++;
            }

            story = cpw.callModule("fix-trailingspaces", story);

            return story;
        },

        "fix-coding": function (story) {
            var length        = story.length,
                i             = 0,
                triggers      = ['s', 'p'],
                curr,
                c1,
                c2,
                j,
                /*
                    We need to be removing lone nowiki tags, but keep opening
                    and closing nowiki tags.

                    Examples:

                    <nowiki> <- removed, because it just opens a tag (without
                                closing)
                    </nowiki> <- removed, because it just closes a tag (without
                                 opening)
                    <nowiki>Chars here...</nowiki> <- stays, tag opens & closes
                */
                nowikiIndexes = [];

            while (i < length) {
                curr = story.charAt(i);

                if (curr === '<' && i + 2 < length) {
                    c1 = story.charAt(i + 1);
                    c2 = story.charAt(i + 2);

                    if ($.inArray(c1, triggers) > -1 ||
                        (c1 === '/' && $.inArray(c2, triggers) > -1))
                    {
                        // Found tag that either starts with an 's' (or 'p') or
                        // is closing tag (with the following chars being either
                        // 's' or 'p')

                        if ((c1 === 's' && c2 !== 'p') ||
                            (c2 === 's' && i + 3 < length &&
                                story.charAt(i + 3) !== 'p'))
                        {
                            // Tag isn't span, even though it starts with 's',
                            // move onto the next char
                            
                            i++;
                            continue;
                        } else if ((c1 === 'p' && c2 === 'o') ||
                            (c2 === 'p' && i + 3 < length &&
                                story.charAt(i + 3) === 'o'))
                        {
                            // Found poem tag
                            i++;
                            continue;
                        }

                        // If we reached this point, it means that the tag we
                        // found should be deleted. So, we will delete every
                        // character until we reach a '>' tag or the end of the
                        // story

                        j = 0;

                        while (i + j < length - 1 && story[i + j] !== '>') {
                            // Continue until we reach a '>' tag or the end of
                            // the story
                            j++;
                        }

                        story = story.slice(0, i) + story.slice(i + j + 1);
                            // Remove tag
                        length -= j + 1; // We removed chars, need to update
                                         // length
                        i--; // Set i to the index before the '<' tag we just
                             // removed
                    } else if (c1 === 'b' && c2 === 'r') {
                        // Found br tag
                        j = 0;

                        while (i + j < length - 1 && story[i + j] !== '>') {
                            // Continue until we reach a '>' tag or the end of
                            // the story
                            j++;
                        }

                        story = story.slice(0, i) + '\n' +
                            story.slice(i + j + 1); // Replace br tag with
                                                    // newline
                        length -= j; // Removed br tag, but added newline. Need
                                     // to adjust length.
                    } else if (c1 === 'n' && c2 === 'o') {
                        // Found <nowiki>. We need to add its index to our
                        // <nowiki> indexes.
                        nowikiIndexes.push(i);
                    } else if (c1 === '/' && c2 === 'n') {
                        // Found </nowiki>. This closes a nowiki tag, if there
                        // is one.
                        if (nowikiIndexes.length === 0) {
                            // We haven't had any nowiki tags opened.
                            // The closing tag we just found should be removed.
                            story = story.slice(0, i) + story.slice(i + 9);
                                // Remove nowiki closing tag
                            length -= 9;
                            i--;
                        } else {
                            // We have at least one <nowiki>
                            // The last one (alternatively the innermost one)
                            // should be removed, as the tag closed.
                            nowikiIndexes.pop();
                        }
                    }
                }

                i++;
            }

            // Remove excess <nowiki>
            i = nowikiIndexes.length - 1;

            while (i >= 0) {
                story = story.slice(0, nowikiIndexes[i]) +
                    story.slice(nowikiIndexes[i] + 8);
                i--;
            }

            story = cpw.callModule("fix-trailingspaces", story);

            return story;
        },

        "fix-trailingspaces": function (story) {
            var length = story.length,
                i      = 0,
                curr,
                j;

            while (i < length) {
                curr = story.charAt(i);

                if (curr === '\n') {
                    j = 1;

                    while (i - j > 0 && story.charAt(i - j) === ' ') {
                        j++;
                    }

                    story = story.slice(0, i - j + 1) + story.slice(i);
                    length -= j;
                    i -= j - 1;
                }

                i++;
            }

            length = story.length;

            if (story.charAt(length - 1) === ' ' || story.charAt(length-1) == "\n") {
                story = story.slice(0, length - 1);
            }

            return story;
        },

        "fix-all": function (story) {
            var modules = cpw.getModules(),
                module;

            for (module in modules) {
                if (module !== 'fix-all') {
                    story = cpw.callModule(module, story);
                }
            }

            return story;
        },
        
        "remove-newlines": function (story) {
            var length = story.length,
                i      = 1,
                j;

            while(i<length-1){				
				if(story.charAt(i) == '\n'){
					if(story.charAt(i-1) == "="){
						i++
						continue;
					}
					if(story.charAt(i-1) != "\n" && story.charAt(i+1) != '\n'){
						//One newline -> zero newlines
						story = story.slice(0,i) + " " + story.slice(i+1);
					}
				}
				
				i++;
			}

            story = cpw.callModule("fix-trailingspaces", story);

            return story;
        }
    };

    cpw.callModule = function (module, story) {
        if (cpw.config.modules.hasOwnProperty(module) &&
            typeof cpw.config.modules[module] === "function")
        {
            return cpw.config.modules[module](story);
        } else {
            console.warn("Module '" + module + "' does not exist!");
            return story;
        }
    };

    cpw.getModules = function () {
        return cpw.config.modules;
    };

    var createEventHandler = function (module) {
        if (typeof cpw.handlers !== "object") {
            cpw.handlers = {};
        }

        cpw.handlers[mw.html.escape(module)] = function () {
            var story = $('#wpTextbox1').val();
            story = cpwEditTools.callModule(module, story);
            $('#wpTextbox1').val(story);
        };
    };

    var loadOasis = function () {
        var modules = cpw.getModules(),
            module,
            moduleElement = '<div class="module cpw-module">\n    <h3>\n     ' +
            '   <span>EditTools</span>\n        <img src="data:image/gif;base' +
            '64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D' +
            '%3D" class="chevron expand">\n    </h3>\n    <div class="module_' +
            'content" style="display: '

        if (cpw.config.autoOpenModuleOasis) {
            moduleElement += "block";
        } else {
            moduleElement += "none";
        }
        moduleElement += '; padding-top: 5px;">\n';

        for (module in modules) {
            moduleElement += '        <a href="#" id="module-';
            moduleElement += mw.html.escape(module);
            moduleElement += '">';
            moduleElement += mw.html.escape(cpw.i18n.getTranslation(module));
            moduleElement += '</a>';
            createEventHandler(module);
            moduleElement += ' <br />\n';
        }

        moduleElement += '    </div>\n</div>';

        $('.rail-auto-height').prepend(moduleElement);

        $('.cpw-module').click(function (e) {
            var id;
            e.preventDefault();
            if (e.target && e.target.nodeName == "A") {
                id = $(e.target).attr('id');
                if (id.slice(0, 7) === "module-" && id.length > 7) {
                    cpwEditTools.handlers[id.slice(7)]();
                }
            }
        });

        $('.cpw-module h3').click(function (e) {
            var h3      = $(this),
                content = h3.next(),
                visible = content.is(':visible');
            e.preventDefault();
            h3.find('.chevron').addClass(visible ? "expand" : "collapse")
                               .removeClass(visible ? "collapse" : "expand");
            content.stop().slideToggle(500);
        });
    };

    var loadMonobook = function () {
        var modules = cpw.getModules(),
            module,
            moduleElement = '<div class="cpw-module" style="display: inline;">';

        for (module in modules) {
            moduleElement += '&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#" id="module-';
            moduleElement += mw.html.escape(module);
            moduleElement += '">';
            moduleElement += mw.html.escape(cpw.i18n.getTranslation(module));
            moduleElement += '</a>';
            createEventHandler(module);
        }

        moduleElement += '</div>';

        $('#editform #toolbar').append(moduleElement);

        $('.cpw-module').click(function (e) {
            var id;
            e.preventDefault();
            if (e.target && e.target.nodeName == "A") {
                id = $(e.target).attr('id');
                if (id.slice(0, 7) === "module-" && id.length > 7) {
                    cpwEditTools.handlers[id.slice(7)]();
                }
            }
        });
    };

    var createConfig = function () {
        var defaultConfig = {
            modules: {},
            i18n: {},
            defaultLang: "en",
            overrideLang: false,
            autoOpenModuleOasis: false
        };

        if (cpw.hasOwnProperty("config")) {
            cpw.config = $.extend(true, defaultConfig, cpw.config);
        } else {
            cpw.config = defaultConfig;
        }

        cpw.config.modules = $.extend(true, cpw.defaultModules,
            cpw.config.modules);
        cpw.i18n.definitions = $.extend(true, cpw.i18n.definitions,
            cpw.config.i18n);
    };

    cpw.load = function () {
        if (cpw.loaded === true) {
            return;
        }
        cpw.loaded = true;

        createConfig();

        switch (mw.config.get("skin")) {
            case "oasis":
                loadOasis();
                break;

            case "monobook":
                loadMonobook();
                break;

            default:
                console.error("This skin is not supported! CPWEditTools not " +
                        "loaded");
                break;
        }
    };

    cpw.load();

}(window.cpwEditTools, window.mw, window.jQuery, window));