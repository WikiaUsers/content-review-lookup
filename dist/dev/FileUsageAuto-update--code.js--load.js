/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable complexity */
/* eslint-disable no-alert */
/**
 * Name:        FileUsageAuto-update
 * Description: Updates file links in use on the wiki when image is renamed.
 * Version:     v2.0
 * Authors:     Foodbandlt
 *              Jr Mime
 *              KockaAdmiralac
 * Used files:  [[File:Circle throbber.gif]]
 */
(function() {
    'use strict';
    if (window.LIR) {
        return;
    }
    var LIR = {
        options: window.LIRoptions || {},
        wg: mw.config.get([
            'wgAction',
            'wgCanonicalNamespace',
            'wgCanonicalSpecialPageName',
            'wgContentLanguage',
            'wgFileExtensions',
            'wgFormattedNamespaces',
            'wgPageName',
            'wgScriptPath',
            'wgTitle',
            'wgUserLanguage',
            'wgUserName'
        ]),
        ERRORS: [],
        updateStatus: function(gifDisplay, message) {
            var $queueStatusButton = $('#queueStatus');
            var $liveLoaderButton = $('#liveLoader');
            if ($queueStatusButton.length === 0 && $liveLoaderButton.length === 0) {
                return false;
            }
            var buttonMessage = message;
            if (typeof gifDisplay === 'string') {
                buttonMessage = gifDisplay;
            } else if (typeof gifDisplay === 'boolean') {
                $liveLoaderButton.css('display', gifDisplay ? 'inline-block' : 'none');
            } else {
                return false;
            }
            if (typeof buttonMessage === 'string' && $queueStatusButton.length > 0) {
                $queueStatusButton.html(' ' + buttonMessage);
            }
            return true;
        },
        start: function(type, oldName, newName, reason, callback) {
            // Checks if function has already started
            if ((LIR.started || LIR.started) && typeof LIR.queuePosition === 'undefined') {
                return false;
            }
            // Treat manual additions like multi
            var normalizedType = type;
            if (normalizedType === 'manual') {
                normalizedType = 'multi';
                LIR.method = 'manual';
                LIR.updateStatus(true, LIR.i18n.msg.processing);
            }
            // Checks whether renaming single image or adding to queue
            if (typeof normalizedType === 'undefined') {
                LIR.started = true;
                LIR.updateStatus(true, LIR.i18n.msg('processing').escape());
                LIR.type = 'single';
            } else if (normalizedType === 'single') {
                LIR.started = true;
                LIR.updateStatus(true, LIR.i18n.msg('processing').escape());
                LIR.type = 'single';
            } else if (normalizedType === 'multi') {
                LIR.started = true;
                if (typeof LIR.queuePosition === 'undefined') {
                    LIR.queuePosition = ++localStorage.LIRQueuedUpdates;
                    LIR.updateStatus(true);
                }
                if (LIR.queuePosition !== Number(localStorage.LIRQueuedUpdatesPos)) {
                    var position = LIR.queuePosition - Number(localStorage.LIRQueuedUpdatesPos);
                    LIR.updateStatus(LIR.i18n.msg('waitList', position).escape());
                    setTimeout(function() {
                        LIR.start(normalizedType, oldName, newName, reason, callback);
                    }, 500);
                    return false;
                }

                LIR.updateStatus(LIR.i18n.msg('processing').escape());
                LIR.type = 'multi';
            } else {
                if (console) {
                    console.log('Incorrect type specified');
                }
                return false;
            }
            // Retrieves queue, or resets variables if doesn't exist
            if (typeof localStorage[LIR.wg.wgUserName + '_LIRQueueData'] === 'undefined') {
                LIR.queueData = [];
            } else {
                LIR.queueData = JSON.parse(localStorage[LIR.wg.wgUserName + '_LIRQueueData']);
            }
            // Sets variables used by the function
            var newReason;
            var oldImageName;
            var newImageName;
            if (typeof oldName !== 'undefined' && typeof newName !== 'undefined') {
                if (oldName === '' || newName === '') {
                    LIR.updateStatus(false, LIR.i18n.msg('fileNameBlank').escape());
                    LIR.started = false;
                    localStorage.LIRQueuedUpdatesPos++;
                    delete LIR.queuePosition;
                    return false;
                }
                oldImageName = oldName;
                newImageName = newName;
                if (typeof reason === 'undefined') {
                    newReason = '';
                }
            } else {
                oldImageName = $('input[name="wpOldTitle"]').val().slice(LIR.wg.wgFormattedNamespaces[6].length + 1);
                newImageName = $('input[name="wpNewTitleMain"]').val();
                newReason = $('input[name="wpReason"]').val();
            }
            var leaveRedirect = $('input[name="wpLeaveRedirect"]').is(':checked');
            LIR.pageKey = [];
            // Checks if old or new file name is currently part of the queue
            var alreadyIn = LIR.queueData.find(function(data) {
                return data.newImage === oldImageName ||
                       data.newImage === newImageName ||
                       data.oldImage === oldImageName ||
                       data.oldImage === newImageName;
            });
            if (alreadyIn) {
                LIR.started = false;
                if (typeof LIR.queuePosition !== 'undefined') {
                    localStorage.LIRQueuedUpdatesPos++;
                    delete LIR.queuePosition;
                }
                var errorMessage;
                if (alreadyIn.oldImage === oldImageName || alreadyIn.newImage === oldImageName) {
                    errorMessage = 'alreadyInQueue';
                } else {
                    errorMessage = 'nameInUse';
                }
                LIR.updateStatus(false, LIR.i18n.msg(errorMessage).escape());
                if (typeof callback === 'function') {
                    callback(false, errorMessage);
                }
                return false;
            }
            var isVideo = true;
            for (var ext in LIR.wg.wgFileExtensions) {
                if (oldImageName.indexOf('.' + LIR.wg.wgFileExtensions[ext]) !== -1) {
                    isVideo = false;
                    break;
                }
            }
            // Checks if destination file name is the same as file being renamed
            var oldExt = oldImageName.slice(oldImageName.lastIndexOf('.')).toLowerCase();
            var newExt = newImageName.slice(newImageName.lastIndexOf('.')).toLowerCase();

            if (
                oldExt !== newExt &&
                // Same MIME type bugfix
                !(
                    (oldExt === '.jpeg' || oldExt === '.jpg') &&
                    (newExt === '.jpeg' || newExt === '.jpg')
                ) &&
                LIR.method !== 'manual' &&
                !isVideo
            ) {
                LIR.started = false;
                if (typeof LIR.queuePosition !== 'undefined') {
                    localStorage.LIRQueuedUpdatesPos++;
                    delete LIR.queuePosition;
                }
                LIR.updateStatus(false, LIR.i18n.msg('invalidExtension').escape());
                if (typeof callback === 'function') {
                    callback(false, 'invalidExtension');
                }
                return false;
            }
            // Check if destination file name is in use
            LIR.api.get({
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                titles: 'File:' + newImageName,
                v: Date.now()
            }).then(function(result) {
                if (typeof result.query.pages[-1] !== 'undefined' || LIR.method === 'manual') {
                    return LIR.backlinksUsagePromise(oldImageName);
                }
                LIR.started = false;
                if (typeof LIR.queuePosition !== 'undefined') {
                    localStorage.LIRQueuedUpdatesPos++;
                    delete LIR.queuePosition;
                }
                LIR.updateStatus(false, LIR.i18n.msg('destInUse').escape());
                if (typeof callback === 'function') {
                    callback(false, 'destInUse');
                }
            }).then(function(result) {
                if (!result) {
                    // An error occurred during the previous stage.
                    return;
                }
                var imageUsage = result.query.imageusage;
                var imageLinks = result.query.backlinks;
                var totalImageUsage = imageUsage.concat(imageLinks);
                console.log('Image usage successfully retrieved');
                if (totalImageUsage.length === 0) {
                    // Else, prompt to use normal renaming, since this is kind of pointless otherwise
                    LIR.started = false;
                    if (typeof LIR.queuePosition !== 'undefined') {
                        localStorage.LIRQueuedUpdatesPos++;
                        delete LIR.queuePosition;
                    }
                    LIR.updateStatus(false, LIR.i18n.msg('fileNotUsed').escape());
                    if (typeof callback === 'function') {
                        callback(false, 'fileNotUsed');
                    }
                    return;
                }
                // Resets queue-related variables if only renaming and replacing a single image
                if (LIR.type === 'single') {
                    LIR.queueData = [];
                    LIR.queueDataList = [];
                    LIR.pageKey = [];
                    LIR.queueDataList.push({
                        oldImage: oldImageName,
                        newImage: newImageName,
                        reason: newReason,
                        move: true,
                        noRedirect: !leaveRedirect
                    });
                } else {
                    LIR.queueData.push({
                        oldImage: oldImageName,
                        newImage: newImageName,
                        reason: newReason,
                        move: LIR.method !== 'manual',
                        noRedirect: !leaveRedirect
                    });
                }
                // Stores queue if renaming multiple images, or updates file usage if only renaming one
                if (LIR.type === 'multi') {
                    LIR.storeQueue();
                    LIR.started = false;
                    localStorage.LIRQueuedUpdatesPos++;
                    LIR.updateStatus(false, LIR.i18n.msg('successful').escape());
                    var enFileNamespace = 'File:';
                    var langFileNamespace = LIR.wg.wgFormattedNamespaces[6] + ':';
                    var pageName = LIR.wg.wgPageName;
                    if (
                        LIR.wg.wgCanonicalSpecialPageName === 'Movepage' &&
                        (
                            pageName.indexOf(langFileNamespace) !== -1 ||
                            pageName.indexOf(enFileNamespace) !== -1
                        )
                    ) {
                        // We're on Special:MovePage for a file.
                        window.location = mw.util.getUrl('File:' + oldImageName);
                    } else if (typeof callback === 'function') {
                        callback(true);
                    }
                } else {
                    /**
                     * This may seem odd, but because LIR.processQueue() is used for both single and multiple image
                     * updating, it requires LIR.started to be false to start
                     */
                    LIR.started = false;
                    LIR.processQueue(function() {
                        window.location.href = mw.util.getUrl('File:' + newImageName);
                    });
                }
            });
        },
        /**
         * Standalone function to store the queue in window.localStorage
         * uses wgUserName as a variable key so multi-user computers on the same wiki don't get each other's queue
         */
        storeQueue: function() {
            localStorage[LIR.wg.wgUserName + '_LIRQueueData'] = JSON.stringify(LIR.queueData);
        },
        backlinksUsagePromise: function(file) {
            var options = {
                action: 'query',
                list: 'backlinks|imageusage',
                bltitle: 'File:' + file,
                bllimit: 'max',
                iutitle: 'File:' + file,
                iulimit: 'max',
                v: Date.now()
            };
            if (!localStorage[LIR.wg.wgUserName + '_LIRNamespaceSelection']) {
                options.blnamespace = 0;
            }
            return LIR.api.get(options);
        },
        started: false,
        delay: 1000,
        updateProgress: function(show, progress) {
            var newProgress = progress;
            if (typeof newProgress === 'undefined' && typeof show === 'boolean') {
                newProgress = 0;
            }
            if (typeof show === 'boolean') {
                if (LIR.type === 'multi') {
                    if (show) {
                        var ui = window.dev.dorui;
                        $('.modalToolbar').prepend(ui.div({
                            attrs: {
                                id: 'LIRQueueProgress'
                            },
                            child: ui.div({
                                attrs: {
                                    id: 'LIRProgressInd'
                                }
                            })
                        }));
                    } else {
                        $('#LIRQueueProgress').remove();
                    }
                }
            }
            if (typeof newProgress === 'number') {
                $('#LIRProgressInd').css('width', newProgress * 100 + '%');
                return;
            }
            if (typeof show === 'number') {
                $('#LIRProgressInd').css('width', show * 100 + '%');
            }
        },
        compareQueueDataEntries: function(currentData, currentTitle, entry) {
            return entry.title === currentTitle &&
                   entry.oldImage === currentData.oldImage &&
                   entry.newImage === currentData.newImage;
        },
        getUsage: function(index) {
            var data = LIR.queueDataList[index];
            return LIR.backlinksUsagePromise(data.oldImage).then(function(result) {
                var imageUsage = result.query.imageusage;
                var imageLinks = result.query.backlinks;
                var totalImageUsage = imageUsage.concat(imageLinks);
                console.log('Image usage successfully retrieved');
                // Adds pages image is used on to LIR.pageKey to help keep track of pages in LIR.pageData later on
                totalImageUsage.forEach(function(usageData) {
                    var title = usageData.title;
                    if (LIR.pageKey.indexOf(title) === -1) {
                        LIR.pageKey.push(title);
                    }
                    if (!LIR.queueData.some(LIR.compareQueueDataEntries.bind(this, data, title))) {
                        LIR.queueData.push({
                            oldImage: data.oldImage,
                            newImage: data.newImage,
                            title: title,
                            move: data.move
                        });
                    }
                });
            });
        },
        processQueue: function(callback) {
            if (
                Number(localStorage.LIRQueuedUpdates) < Number(localStorage.LIRQueuedUpdatesPos) &&
                Number(localStorage.LIRQueuedUpdates) !== 0
            ) {
                localStorage.LIRQueuedUpdates = 0;
                localStorage.LIRQueuedUpdatesPos = 1;
            }
            // Check if operation already started
            if (LIR.started) {
                return false;
            }
            // LIR.type is already set if processing single update
            if (typeof LIR.type === 'undefined') {
                LIR.type = 'multi';
            }
            // Variable redeclaration
            LIR.started = true;
            LIR.requestCompleted = [];
            LIR.pageData = [];
            // Queue retrieval, returns false if no queue
            var queueDataLS = localStorage[LIR.wg.wgUserName + '_LIRQueueData'];
            if (LIR.type === 'multi' && Number(localStorage.LIRQueuedUpdates) === 0 || LIR.type === 'single') {
                if (typeof queueDataLS === 'undefined' && LIR.type !== 'single') {
                    console.log('Queue does not exist or was unable to be retrieved.');
                    LIR.started = false;
                    return false;
                }
                if (LIR.type === 'multi') {
                    LIR.queueDataList = JSON.parse(queueDataLS);
                    LIR.updateProgress(true);
                    console.log('Queue retrieved successfully.');
                }
                LIR.usageRequested = 0;
                LIR.usageProgress = 0;
                LIR.moveRequested = LIR.queueDataList.length;
                LIR.moveProgress = 0;
                LIR.queueData = [];
                LIR.pageKey = [];
                LIR.timer = 0;
                LIR.queueDataList.forEach(function(queueData, index) {
                    if (queueData.move) {
                        LIR.moveFile(
                            index,
                            function() {
                                LIR.updateProgress(++LIR.moveProgress / LIR.moveRequested / 2);
                                LIR.usageRequested++;
                                LIR.getUsage(index).then(function() {
                                    LIR.usageProgress++;
                                    if (
                                        LIR.moveProgress === LIR.moveRequested &&
                                        LIR.usageProgress === LIR.usageRequested
                                    ) {
                                        LIR.processPageContent(callback);
                                    }
                                });
                            },
                            function() {
                                LIR.updateProgress(++LIR.moveProgress / LIR.moveRequested / 2);
                                if (
                                    LIR.moveProgress === LIR.moveRequested &&
                                    LIR.usageProgress === LIR.usageRequested
                                ) {
                                    LIR.processPageContent(callback);
                                }
                            }
                        );
                    } else {
                        LIR.updateProgress(++LIR.moveProgress / LIR.moveRequested / 2);
                        LIR.usageRequested++;
                        LIR.getUsage(index).then(function() {
                            LIR.usageProgress++;
                            if (
                                LIR.moveProgress === LIR.moveRequested &&
                                LIR.usageProgress === LIR.usageRequested
                            ) {
                                LIR.processPageContent(callback);
                            }
                        });
                    }
                });
            } else if (LIR.type === 'multi') {
                console.log('Pages are still being added to the queue.');
                alert(LIR.i18n.msg('pagesWaiting').plain());
                LIR.started = false;
                return false;
            }
        },
        lowerUpperReg: function(input) {
            return '[' + input.substr(0, 1).toUpperCase() + input.substr(0, 1).toLowerCase() + ']' + input.substr(1);
        },
        processPageContent: function(callback) {
            console.log('Begin queue execution');
            // Sets progress checking variables
            for (var i = 0; i < LIR.pageKey.length; i++) {
                LIR.requestCompleted[i] = false;
            }
            var promises = [];
            console.log('Getting page contents');
            for (var j = 0; j < Math.floor(LIR.pageKey.length / 500) + 1; j++) {
                var tempArray = [];
                for (var k = j * 500; k < j * 500 + 500 && k < LIR.pageKey.length; k++) {
                    tempArray.push(LIR.pageKey[k]);
                }
                // Calls API for page contents
                promises.push(LIR.api.post({
                    action: 'query',
                    prop: 'revisions',
                    rvprop: 'content',
                    titles: tempArray.join('|'),
                    format: 'json'
                }).then(LIR.processPageCallback));
            }
            $.when.apply(this, promises).then(function() {
                // TODO: Now we're no longer sure we collected all pages
                console.log('Page contents retrieved and saved');
                LIR.log(LIR.i18n.msg('contentsRetrieved').escape());
                console.log('Begin processing page content.');
                // Replacing image name on each page
                var escapeRegExp = mw.RegExp.escape || mw.util.escapeRegExp;
                LIR.queueData.forEach(function(data) {
                    var pageKey = LIR.pageKey.indexOf(data.title);
                    var pageData = LIR.pageData[pageKey];
                    var escapedName = escapeRegExp(data.oldImage).replace(/( |_)/g, '[ _]');
                    if (escapedName.substr(0, 1).match(/[A-Za-z]/i)) {
                        escapedName = LIR.lowerUpperReg(escapedName);
                    }
                    var pageReplacement = new RegExp(
                        '(\\n[ ]*?|\\[?:?([Ff]ile|[Ii]mage|' +
                        LIR.lowerUpperReg(LIR.wg.wgFormattedNamespaces[6]) +
                        '|' +
                        LIR.lowerUpperReg(LIR.i18n.msg('imageNamespace').plain()) +
                        '):[ ]*?|=[ ]*?|\\|)' +
                        escapedName +
                        '([ ]*?\\n|[ ]*?\\||[ ]*?\\]|[ ]*?\\}|[ ]*?;)',
                        'g'
                    );
                    if (pageData.content.search(pageReplacement) !== -1) {
                        var replacementReg = new RegExp(escapedName, 'g');
                        var regExec;
                        pageData.changed = true;
                        console.log(data.oldImage, 'replaced on page', data.title);
                        while ((regExec = pageReplacement.exec(pageData.content)) !== null) {
                            if (!data.newImage && !data.move) {
                                // Removing links/usages
                                var replaceWith;
                                if (regExec[1].search(/\n/g) !== -1 || regExec[3].search(/\n/g) !== -1 || regExec[1].search(/[=]/g) !== -1) {
                                    // If surrounded by newlines or equals, keep them to prevent things from breaking
                                    replaceWith = regExec[0].replace(
                                        replacementReg,
                                        '<nowiki>' + data.oldImage + '</nowiki>'
                                    );
                                } else {
                                    replaceWith = '<nowiki>' + regExec[0] + '</nowiki>';
                                }
                                pageData.content = pageData.content.replace(regExec[0], replaceWith);
                                pageReplacement.lastIndex += '<nowiki></nowiki>'.length;
                            } else {
                                // Everything else
                                var replaced = regExec[0].replace(replacementReg, data.newImage);
                                pageData.content = pageData.content.replace(regExec[0], replaced);
                                pageReplacement.lastIndex += replaced.length - regExec[0].length - regExec[3].length;
                            }
                        }
                    } else if (LIR.type === 'multi') {
                        LIR.failedLog(data.oldImage, data.newImage, data.title);
                    } else {
                        alert(LIR.i18n.msg('unableToFind', data.oldImage, data.title).plain());
                    }
                });
                LIR.log(LIR.i18n.msg('submittingContent').escape());
                console.log('Begin submitting pages');
                var l = 0;
                if (LIR.type === 'multi') {
                    LIR.queueProgress = 0;
                }
                var throttle = setInterval(function() {
                    if (LIR.pageData[l].changed) {
                        LIR.submitChangedPages(l, callback);
                    } else {
                        LIR.requestCompleted[l] = true;
                    }
                    l++;
                    if (l === LIR.pageData.length) {
                        clearInterval(throttle);
                    }
                }, LIR.options.delay || LIR.delay);
            });
        },
        processPageCallback: function(result) {
            // Saves page contents for each page in LIR.pageData
            for (var i in result.query.pages) {
                var keyNum = LIR.pageKey.indexOf(result.query.pages[i].title);
                LIR.pageData[keyNum] = {
                    title: LIR.pageKey[keyNum],
                    content: result.query.pages[i].revisions[0]['*'],
                    changed: false
                };
            }
        },
        submitChangedPages: function(pageKey, callback) {
            LIR.api.post({
                action: 'edit',
                title: LIR.pageData[pageKey].title,
                summary: LIR.options.editSummary || LIR.i18n.inContentLang().msg('editSummary').plain(),
                text: LIR.pageData[pageKey].content,
                minor: true,
                nocreate: true,
                redirect: false,
                bot: true,
                token: mw.user.tokens.get('csrfToken')
            }).then(function() {
                LIR.requestCompleted[pageKey] = true;
                console.log('Posted page', LIR.pageKey[pageKey]);
                if (LIR.type === 'multi') {
                    LIR.updateProgress(++LIR.queueProgress / LIR.pageKey.length / 2 + 0.5);
                }
                if (LIR.requestCompleted.indexOf(false) === -1) {
                    if (LIR.type === 'multi') {
                        // Cleans up localStorage variables
                        delete localStorage[LIR.wg.wgUserName + '_LIRQueueData'];
                        LIR.started = false;
                        LIR.updateProgress(false);
                    }
                    // Call callback if exists
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            }).fail(function(code) {
                var message = LIR.i18n.msg('unableToSubmit', LIR.pageData[pageKey].title, code);
                if (LIR.type === 'multi') {
                    LIR.failedLogCustom(message.escape());
                    LIR.queueData.forEach(function(data) {
                        if (data.title === LIR.pageData[pageKey].title) {
                            LIR.failedLog(data.oldImage, data.newImage, data.title);
                        }
                    });
                } else {
                    alert(message.plain());
                }
            });
        },
        moveFile: function(index, callback, failure) {
            var data = LIR.queueDataList[index];
            var fileNS = LIR.wg.wgFormattedNamespaces[6];
            var options = {
                action: 'move',
                from: fileNS + ':' + data.oldImage,
                to: fileNS + ':' + data.newImage,
                reason: data.reason,
                movetalk: true,
                ignorewarnings: true,
                token: mw.user.tokens.get('csrfToken')
            };
            if (data.noRedirect) {
                options.noredirect = true;
            }
            setTimeout(function() {
                LIR.api.post(options).then(function(result) {
                    if (typeof result.error === 'undefined' || !data.move) {
                        console.log('Moved file', data.oldImage);
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                }).fail(function(code) {
                    var errorMsg = LIR.i18n.msg('unableToMove', data.oldImage, data.newImage, code);
                    if (!data.move) {
                        console.log('Error while moving file, but we weren\'t supposed to move it anyways?');
                        if (typeof callback === 'function') {
                            callback();
                        }
                    } else if (code === 'articleexists' || code === 'invalidtitle') {
                        var promptResponse = prompt(
                            errorMsg.plain() + '\n' + LIR.i18n.msg('unableToMoveChoose').plain()
                        );
                        if (promptResponse) {
                            data.newImage = promptResponse;
                            LIR.moveFile(index, callback, failure);
                        } else if (LIR.type === 'multi') {
                            LIR.failedLogCustom(LIR.i18n.msg('unableToMoveFail', data.oldImage).escape());
                            if (LIR.queueDataList.length === 1) {
                                delete localStorage[LIR.wg.wgUserName + '_LIRQueueData'];
                                LIR.started = false;
                                LIR.log(LIR.i18n.msg('queueComplete').escape());
                                LIR.updateQueueListing();
                            } else {
                                delete LIR.queueDataList[index];
                                failure();
                            }
                        } else {
                            LIR.started = false;
                            LIR.updateStatus(false, errorMsg.escape());
                        }
                    } else {
                        LIR.failedLogCustom(
                            errorMsg.escape() + ' ' +
                            LIR.i18n.msg('unableToMoveFail', data.oldImage).escape()
                        );
                        LIR.ERRORS.push(code);
                        if (LIR.queueDataList.length === 1) {
                            delete localStorage[LIR.wg.wgUserName + '_LIRQueueData'];
                            LIR.started = false;
                            LIR.log(LIR.i18n.msg('queueComplete').escape());
                            LIR.updateQueueListing();
                        } else {
                            delete LIR.queueDataList[index];
                            failure();
                        }
                    }
                });
            }, LIR.timer++ * (LIR.options.delay || LIR.delay));
        },
        removeFromQueue: function(queueOldName) {
            LIR.queueData = JSON.parse(localStorage[LIR.wg.wgUserName + '_LIRQueueData']);
            var escapeRegExp = mw.RegExp.escape || mw.util.escapeRegExp;
            var index = LIR.queueData.findIndex(function(data) {
                return queueOldName.match(new RegExp(escapeRegExp(data.oldImage), 'gi'));
            });
            if (index !== -1) {
                LIR.queueData.splice(index, 1);
            }
            if (LIR.queueData.length > 0) {
                LIR.storeQueue();
            } else {
                delete localStorage[LIR.wg.wgUserName + '_LIRQueueData'];
            }
        },
        log: function(text) {
            var options = {
                classes: ['LIRLogEntry']
            };
            if (typeof text === 'object') {
                options.child = text;
            } else {
                options.html = text;
            }
            $('#LIRLog')
                .append(window.dev.dorui.div(options))
                .scrollTop(100000000);
        },
        failedLog: function(oldImage, newImage, page) {
            var ui = window.dev.dorui;
            LIR.failedLogCustom(ui.frag([
                ui.a({
                    attrs: {
                        href: mw.util.getUrl('File:' + oldImage),
                        target: '_blank'
                    },
                    text: oldImage
                }),
                ' → ',
                ui.a({
                    attrs: {
                        href: mw.util.getUrl(newImage),
                        target: '_blank'
                    },
                    text: newImage
                }),
                ' on ',
                ui.a({
                    attrs: {
                        href: mw.util.getUrl(page),
                        target: '_blank'
                    },
                    text: page
                })
            ]));
        },
        failedLogCustom: function(text) {
            var options = {};
            if (typeof text === 'object') {
                options.child = text;
            } else {
                options.html = text;
            }
            $('#LIRFailedLog').append(window.dev.dorui.div(options));
        },
        updateQueueListing: function() {
            var queueDataLS = localStorage[LIR.wg.wgUserName + '_LIRQueueData'];
            var ui = window.dev.dorui;
            if (!queueDataLS) {
                $('#LIRQueue').html(ui.div({
                    text: LIR.i18n.msg('nothingInQueue').plain()
                }));
                $('#LIRQueueLengthBox').text('0');
                LIR.log(LIR.i18n.msg('queueUpdate').escape());
                return false;
            }
            LIR.queueData = JSON.parse(queueDataLS);
            $('#LIRQueue').html(LIR.queueData.map(function(data) {
                var removing = !data.move && !data.newImage;
                return ui.div({
                    classes: {
                        FUAuQueueEntry: true,
                        FUAuQueueEntryStyle1: !data.move && data.newImage,
                        FUAuQueueEntryRemoving: removing
                    },
                    children: [
                        ui.div({
                            attrs: {
                                title: LIR.i18n.msg('removeFromQueue').plain()
                            },
                            classes: ['LIRDeleteButton'],
                            children: [
                                ui.img({
                                    attrs: {
                                        height: 15,
                                        width: 15,
                                        src: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Red_x.svg'
                                    }
                                })
                            ],
                            events: {
                                click: function() {
                                    LIR.removeFromQueue(data.oldImage);
                                    LIR.log(LIR.i18n.msg('itemRemoved').escape());
                                    LIR.updateQueueListing();
                                }
                            }
                        }),
                        ui.a({
                            attrs: {
                                href: mw.util.getUrl('File:' + data.oldImage),
                                target: '_blank'
                            },
                            classes: ['LIROldName'],
                            text: data.oldImage
                        }),
                        ' → ',
                        removing ?
                            LIR.i18n.msg('removing').plain() :
                            ui.a({
                                attrs: {
                                    href: mw.util.getUrl('File:' + data.newImage),
                                    target: '_blank'
                                },
                                classes: ['LIRNewName'],
                                text: data.newImage
                            })
                    ]
                });
            }));
            $('#LIRQueueLengthBox').text(LIR.queueData.length);
            LIR.log(LIR.i18n.msg('queueUpdate').escape());
        },
        updateNamespaceSelection: function() {
            var $element = $('#LIRNamespaceToggleCheck input');
            if ($element.length === 0) {
                // OOUI is dumb
                $element = $('#LIRNamespaceToggleCheck');
            }
            if ($element.is(':checked')) {
                localStorage[LIR.wg.wgUserName + '_LIRNamespaceSelection'] = 'checked';
            } else {
                localStorage[LIR.wg.wgUserName + '_LIRNamespaceSelection'] = '';
            }
        },
        showQueueModal: function() {
            var ui = window.dev.dorui;
            window.dev.showCustomModal(LIR.i18n.msg('queueModalTitle').escape(), {
                content: ui.div({
                    attrs: {
                        id: 'LIRContainer'
                    },
                    children: [
                        ui.div({
                            attrs: {
                                id: 'LIRQueue'
                            }
                        }),
                        ui.div({
                            attrs: {
                                id: 'LIRLog'
                            }
                        }),
                        ui.div({
                            attrs: {
                                id: 'LIRQueueLength'
                            },
                            children: [
                                LIR.i18n.msg('filesInQueue').plain(),
                                ui.span({
                                    attrs: {
                                        id: 'LIRQueueLengthBox'
                                    }
                                })
                            ]
                        }),
                        ui.div({
                            attrs: {
                                id: 'LIRNamespaceToggle'
                            },
                            children: [
                                ui.input({
                                    attrs: {
                                        id: 'LIRNamespaceToggleCheck',
                                        type: 'checkbox'
                                    },
                                    events: {
                                        change: LIR.updateNamespaceSelection
                                    }
                                    // TODO: Initial checked based on localStorage
                                }),
                                ui.label({
                                    attrs: {
                                        'for': 'LIRNamespaceToggleCheck'
                                    },
                                    text: LIR.i18n.msg('namespaceCheckbox').plain()
                                }),
                                LIR.createLiveLoader(ui),
                                ui.div({
                                    attrs: {
                                        id: 'LIRFailedLog'
                                    },
                                    text: LIR.i18n.msg('failedDescription').plain()
                                })
                            ]
                        })
                    ]
                }),
                id: 'queueModal',
                width: 800,
                buttons: [
                    {
                        id: 'openManualModal',
                        message: LIR.i18n.msg('queueModalManual').escape(),
                        handler: function() {
                            if (LIR.started) {
                                return false;
                            }
                            LIR.showManualModal();
                        }
                    },
                    {
                        id: 'openBatchModal',
                        message: LIR.i18n.msg('queueModalBatch').escape(),
                        handler: function() {
                            if (LIR.started) {
                                return false;
                            }
                            LIR.showBatchModal();
                        }
                    },
                    {
                        id: 'resetCounter',
                        message: LIR.i18n.msg('queueModalReset').escape(),
                        handler: function() {
                            if (LIR.started) {
                                return false;
                            }
                            var diff = Number(localStorage.LIRQueuedUpdates) -
                                       Number(localStorage.LIRQueuedUpdatesPos) +
                                       1;
                            if (confirm(LIR.i18n.msg('queueModalWaitConfirm', diff).plain())) {
                                localStorage.LIRQueuedUpdates = 0;
                                localStorage.LIRQueuedUpdatesPos = 1;
                                LIR.log(LIR.i18n.msg('waitCleared').escape());
                            }
                        }
                    },
                    {
                        id: 'updateButton',
                        message: LIR.i18n.msg('queueModalUpdate').escape(),
                        handler: function() {
                            LIR.updateQueueListing();
                        }
                    },
                    {
                        id: 'executeButton',
                        message: LIR.i18n.msg('queueModalExecute').escape(),
                        defaultButton: true,
                        handler: function() {
                            if (typeof localStorage[LIR.wg.wgUserName + '_LIRQueueData'] === 'undefined') {
                                LIR.log(LIR.i18n.msg('noQueueExists').escape());
                            } else {
                                LIR.log(LIR.i18n.msg('queueStarted').escape());
                                LIR.updateStatus(true);
                                LIR.processQueue(function() {
                                    LIR.log(LIR.i18n.msg('queueComplete').escape());
                                    LIR.updateStatus(false);
                                    LIR.updateQueueListing();
                                });
                            }
                        }
                    }
                ],
                callback: function() {
                    $('.blackout, #queueModal .close').off('click').click(function() {
                        if (LIR.started === false || typeof LIR.started === 'undefined') {
                            delete LIR.queueData;
                            $('#queueModal').remove();
                            $('.blackout').fadeOut(function() {
                                $(this).remove();
                            });
                        }
                    });
                    LIR.updateQueueListing();
                }
            });
        },
        createLiveLoader: function(ui) {
            return ui.span({
                attrs: {
                    id: 'liveLoader'
                },
                child: ui.img({
                    attrs: {
                        src: 'https://static.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif'
                    }
                }),
                style: {
                    display: 'none'
                }
            });
        },
        createQueueStatus: function(ui) {
            return ui.span({
                attrs: {
                    id: 'queueStatus'
                }
            });
        },
        showManualModal: function() {
            var ui = window.dev.dorui;
            var filePrefix = LIR.wg.wgFormattedNamespaces[6] + ':';
            window.dev.showCustomModal(LIR.i18n.msg('queueAddition').escape(), {
                content: ui.fieldset({
                    children: [
                        ui.p({
                            child: ui.span({
                                html: LIR.i18n.msg('manualModalDescription').parse()
                            })
                        }),
                        ui.p({
                            children: [
                                ui.strong({
                                    text: LIR.i18n.msg('oldFileName').plain()
                                }),
                                ui.br(),
                                filePrefix,
                                ui.input({
                                    attrs: {
                                        id: 'modalOldName',
                                        type: 'text'
                                    }
                                }),
                                ui.br(),
                                ui.strong({
                                    // TODO: Separate i18n message?
                                    html: LIR.i18n.msg('newFileName', '').parse()
                                }),
                                ui.br(),
                                filePrefix,
                                ui.input({
                                    attrs: {
                                        id: 'modalNewName',
                                        type: 'text'
                                    }
                                })
                            ]
                        }),
                        ui.p({
                            children: [
                                LIR.createLiveLoader(ui),
                                LIR.createQueueStatus(ui)
                            ]
                        })
                    ]
                }),
                id: 'manualModal',
                width: 650,
                buttons: [
                    {
                        id: 'submit',
                        defaultButton: true,
                        message: LIR.i18n.msg('addToQueue').escape(),
                        handler: function() {
                            if (LIR.started) {
                                return false;
                            }
                            var $oldName = $('#modalOldName');
                            var $newName = $('#modalNewName');
                            LIR.start('manual', $oldName.val(), $newName.val(), '', function(res) {
                                if (res) {
                                    delete LIR.queuePosition;
                                    $oldName.val('').focus();
                                    $newName.val('');
                                    LIR.updateQueueListing();
                                }
                            });
                        }
                    }
                ],
                callback: function() {
                    $('.blackout, #manualModal .close').off('click').click(function() {
                        if (LIR.started) {
                            return false;
                        }
                        $('#manualModal').remove();
                        $('.blackout').fadeOut(function() {
                            $(this).remove();
                        });
                    });
                    $('#modalOldName, #modalNewName').on('keypress', function(e) {
                        if (e.which === 13) {
                            $('#manualModal #submit').click();
                        }
                    });
                }
            });
        },
        multipleManualAdd: function(files) {
            var pair = files.shift();
            if (!pair) {
                return;
            }
            LIR.start('manual', pair[0], pair[1], '', function(res) {
                if (res) {
                    delete LIR.queuePosition;
                    LIR.updateQueueListing();
                }
                $('#batchModalInput').val(files.map(function(filePair) {
                    return filePair[0] + ' ' + filePair[1];
                }).join('\n'));
                LIR.multipleManualAdd(files);
            });
        },
        showBatchModal: function() {
            var ui = window.dev.dorui;
            window.dev.showCustomModal(LIR.i18n.msg('queueAddition').escape(), {
                content: ui.fieldset({
                    children: [
                        ui.p({
                            text: LIR.i18n.msg('batchModalDescription').plain()
                        }),
                        ui.textarea({
                            attrs: {
                                id: 'batchModalInput',
                                rows: 20
                            }
                        })
                    ]
                }),
                id: 'batchModal',
                width: 650,
                buttons: [
                    {
                        id: 'submit',
                        defaultButton: true,
                        message: LIR.i18n.msg('addToQueue').escape(),
                        handler: function() {
                            if (LIR.started) {
                                return false;
                            }
                            LIR.multipleManualAdd(
                                $('#batchModalInput')
                                    .val()
                                    .split('\n')
                                    .map(function(line) {
                                        return line.trim().split(' ');
                                    })
                            );
                        }
                    }
                ]
            });
        },
        initialize: function(i18n) {
            LIR.api = new mw.Api();
            LIR.i18n = i18n;
            var ui = window.dev.dorui;
            if (typeof localStorage.LIRQueuedUpdates === 'undefined') {
                localStorage.LIRQueuedUpdates = 0;
                localStorage.LIRQueuedUpdatesPos = 1;
            }
            if (typeof localStorage[LIR.wg.wgUserName + '_LIRNamespaceSelection'] === 'undefined') {
                localStorage[LIR.wg.wgUserName + '_LIRNamespaceSelection'] = '';
            }
            var enFileNamespace = 'File:';
            var langFileNamespace = LIR.wg.wgFormattedNamespaces[6] + ':';
            var pageName = LIR.wg.wgPageName;
            if (
                LIR.wg.wgCanonicalSpecialPageName === 'Movepage' &&
                (
                    pageName.indexOf(langFileNamespace) !== -1 ||
                    pageName.indexOf(enFileNamespace) !== -1
                )
            ) {
                var $anchor = $('.oo-ui-buttonInputWidget').parent();
                // Buttons
                $anchor.append(
                    ui.a({
                        attrs: {
                            id: 'FUAuStartSingle'
                        },
                        classes: ['wds-button'],
                        events: {
                            click: LIR.start.bind(this, 'single')
                        },
                        text: LIR.options.singleButtonText || LIR.i18n.msg('singleButtonText').plain()
                    }),
                    ui.a({
                        attrs: {
                            'class': 'wds-button',
                            'id': 'FUAuStartMulti'
                        },
                        events: {
                            click: LIR.start.bind(this, 'multi')
                        },
                        text: LIR.options.queueButtonText || LIR.i18n.msg('queueButtonText').plain()
                    }),
                    LIR.createLiveLoader(ui),
                    LIR.createQueueStatus(ui),
                    ui.br(),
                    ui.span({
                        attrs: {
                            id: 'FUAuMovePageDescription'
                        },
                        html: LIR.i18n.msg(
                            'movePageDescription',
                            LIR.options.singleButtonText || LIR.i18n.msg('singleButtonText').plain(),
                            LIR.options.queueButtonText || LIR.i18n.msg('queueButtonText').plain()
                        ).parse()
                    }),
                    ui.br(),
                    LIR.options.bottomMessage ?
                        ui.div({
                            attrs: {
                                id: 'FUAuBottomMessage'
                            },
                            html: LIR.options.bottomMessage
                        }) :
                        null,
                    ui.br(),
                    ui.span({
                        attrs: {
                            id: 'FUAuFooter'
                        },
                        html: LIR.i18n.msg('movePageInfo').parse()
                    })
                );
                var checkbox = new OO.ui.CheckboxInputWidget({
                    id: 'LIRNamespaceToggleCheck'
                });
                $('#mw-movepage-table .oo-ui-fieldLayout-align-inline').last().after(
                    new OO.ui.FieldLayout(checkbox, {
                        align: 'inline',
                        label: LIR.i18n.msg('namespaceCheckbox').plain(),
                        selected: Boolean(localStorage[LIR.wg.wgUserName + '_LIRNamespaceSelection'])
                    }).$element,
                    ui.div({
                        classes: ['FUAuNote'],
                        text: LIR.i18n.msg(
                            'movePageNamespaceSelect',
                            LIR.options.singleButtonText || LIR.i18n.msg('singleButtonText').plain()
                        ).plain()
                    })
                );
                checkbox.$element
                    .find('input')
                    .on('change', LIR.updateNamespaceSelection);
            } else if (LIR.wg.wgCanonicalNamespace === 'File') {
                // File page
                $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list').append(
                    $('<li>').append(
                        $('<a>', {
                            click: LIR.showQueueModal,
                            text: LIR.i18n.msg('queue').plain()
                        })
                    )
                );
                if (typeof localStorage[LIR.wg.wgUserName + '_LIRQueueData'] !== 'undefined') {
                    LIR.queueData = JSON.parse(localStorage[LIR.wg.wgUserName + '_LIRQueueData']);
                    var escapeRegExp = mw.RegExp.escape || mw.util.escapeRegExp;
                    var matchedData = LIR.queueData.find(function(data) {
                        return LIR.wg.wgTitle.match(new RegExp(escapeRegExp(data.oldImage), 'gi'));
                    });
                    $('#content').prepend(ui.table({
                        attrs: {
                            id: 'LIRNotification'
                        },
                        classes: ['metadata', 'plainlinks', 'ambox', 'ambox-notice'],
                        child: ui.tbody({
                            children: [
                                ui.tr({
                                    children: [
                                        ui.td({
                                            classes: ['mbox-image'],
                                            child: ui.div({
                                                child: ui.img({
                                                    attrs: {
                                                        height: 40,
                                                        // eslint-disable-next-line max-len
                                                        src: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Checkmark_green.svg',
                                                        width: 46
                                                    }
                                                })
                                            })
                                        }),
                                        ui.td({
                                            classes: ['mbox-text'],
                                            children: [
                                                LIR.i18n.msg('alreadyInQueue').plain(),
                                                ui.br(),
                                                ui.span({
                                                    html: LIR.i18n.msg('newFileName', matchedData.newImage).parse()
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                ui.tr({
                                    child: ui.td({
                                        attrs: {
                                            colspan: 2,
                                            id: 'LIRNotificationBottom'
                                        },
                                        children: [
                                            ui.a({
                                                attrs: {
                                                    href: '#'
                                                },
                                                events: {
                                                    click: LIR.showQueueModal
                                                },
                                                text: LIR.i18n.msg('queue').plain()
                                            }),
                                            ' • ',
                                            ui.a({
                                                attrs: {
                                                    href: '#'
                                                },
                                                events: {
                                                    click: function() {
                                                        LIR.removeFromQueue(matchedData.oldImage);
                                                        $('#LIRNotification').slideUp('fast', function() {
                                                            this.remove();
                                                        });
                                                    }
                                                },
                                                text: LIR.i18n.msg('removeFromQueue').plain()
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    }));
                }
            }
        },
        preload: function() {
            $.when(
                window.dev.i18n.loadMessages('FileUsageAuto-update', {
                    cacheVersion: 2
                }),
                mw.loader.using([
                    'mediawiki.api',
                    'mediawiki.user',
                    'mediawiki.util'
                ])
            ).then(LIR.initialize);
        }
    };
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Dorui.js',
            'u:dev:MediaWiki:ShowCustomModal.js'
        ]
    }).then(LIR.preload);
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:FileUsageAuto-update.css'
    });
    window.LIR = LIR;
})();