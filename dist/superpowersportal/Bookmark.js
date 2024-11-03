/**
 * @name            SiteBookmarks
 * @version         v1.0
 * @author          PUREDARK999
 * @description     Adds a fully functional bookmark system.
 */
mw.loader.using(['mediawiki.util', 'mediawiki.storage'], function () {
    importArticle({
        type: 'style',
        article: 'w:c:superpowersportal:MediaWiki:Bookmark.js/styles.css'
    });
    
    "use strict";
    var config = {};

    var fire = function(name, data) {
        mw.hook(name).fire(data);
    };

    function loadConfig() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: mw.util.wikiScript('api'),
                method: 'GET',
                data: {
                    action: 'query',
                    titles: 'MediaWiki:Custom-Bookmarks.json',
                    format: 'json',
                    rvprop: 'content',
                    prop: 'revisions'
                },
                dataType: 'json',
                success: function (response) {
                    var page = Object.values(response.query.pages)[0];
                    if (page) {
                        var jsonContent = page.revisions[0]["*"];
                        var jsonData = JSON.parse(jsonContent);
                        console.log(jsonData);
                        config.unmarkedIcon = jsonData.UnmarkedIcon || "☆";
                        config.markedIcon = jsonData.MarkedIcon || "★";
                        config.noBookmarksMessage = jsonData.NoBookmarksMessage || "You currently have no bookmarks. Please bookmark at least one page.";
                        config.showIconsIn = jsonData.ShowIconsIn || []; // Default to only empty namespace
                        resolve();
                        fire("bookmarks.configLoaded", config);
                        logMessage("Configuration loaded!");
                    } else {
                        reject('Configuration not found in MediaWiki:Bookmarks.js');
                    }
                },
                error: function (xhr, status, error) {
                    reject('Error loading configuration: ' + error);
                }
            });
        });
    }

    function isBookmarkableNamespace() {
	    var currentNamespace = mw.config.get('wgCanonicalNamespace') || "page";
	    
	    var allowedNamespaces = config.showIconsIn || []; 
		logMessage('Allowed Namespaces: ' + allowedNamespaces);

	    if (allowedNamespaces.length === 0) {
	    	logMessage('Canonical Namespace: ' + currentNamespace);
	        return currentNamespace === "page";
	    }
	    logMessage('Canonical Namespace: ' + currentNamespace);
	    return allowedNamespaces.includes(currentNamespace);
	}



    function saveBookmark(pageTitle, pageUrl) {
        if (!isBookmarkableNamespace()) {
            alert('This page cannot be bookmarked due to its namespace.');
            return;
        }
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        var bookmark = {title: pageTitle, url: pageUrl};
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        displayBookmarks();
        fire("bookmarks.savedBookmark", bookmarks);
        logMessage("Saved bookmark: " + bookmark.url + "!");
    }

    function removeBookmark(pageUrl) {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks = bookmarks.filter(function (bookmark) {
            return bookmark.url !== pageUrl;
        });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        displayBookmarks();
        fire("bookmarks.removedBookmark", bookmarks);
        logMessage("Removed bookmark!");
    }

    function updateBookmarkButton(pageUrl) {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        var isBookmarked = bookmarks.some(function (bookmark) {
            return bookmark.url === pageUrl;
        });
        var bookmarkButton = $('#bookmarkButton');

        if (isBookmarked) {
            bookmarkButton.html(config.markedIcon).addClass('bookmarked');
        } else {
            bookmarkButton.html(config.unmarkedIcon).removeClass('bookmarked');
        }
        fire("bookmarks.updatedBookmarks", bookmarks);
    }

    function displayBookmarks(filter) {
        var bookmarksContainer = $('#bookmarksContainer');
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarksContainer.empty();

        if (filter) {
            bookmarks = bookmarks.filter(function (bookmark) {
                return bookmark.title.toLowerCase().includes(filter.toLowerCase());
            });
        }

        if (bookmarks.length === 0) {
            bookmarksContainer.append("<p>" + config.noBookmarksMessage + "</p>");
        } else {
            bookmarks.forEach(function (bookmark) {
                bookmarksContainer.append(
                    '<div style="display: flex; align-items: center; margin-bottom: 8px;">' +
                    '<a href="' + bookmark.url + '" style="font-size: 16px; color: #0073e6; text-decoration: none; margin-right: 8px;">' + bookmark.title + '</a>' +
                    '<button class="remove-bookmark" data-url="' + bookmark.url + '" ' +
                    '>Remove</button>' +
                    '</div>'
                );
            });

            $('.remove-bookmark').on('click', function () {
                var url = $(this).data('url');
                removeBookmark(url);
            });
        }
        logMessage("Bookmarks display updated!");
    }

    function addImportExportButtons() {
        var buttonsContainer = $('<div>', { style: 'margin-top: 20px;' });
    
        var exportButton = $('<button>', {
            text: 'Export Bookmarks',
            class: 'export-button'
        }).on('click', function () {
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookmarks, null, 2));
            var downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "bookmarks.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
    
        var importButton = $('<button>', {
            text: 'Import Bookmarks',
            class: 'import-button'
        }).on('click', function () {
            var fileInput = $('<input>', { type: 'file', accept: '.json', style: 'display: none;' });
            
            fileInput.on('change', function (event) {
                var file = event.target.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        try {
                            var importedBookmarks = JSON.parse(e.target.result);
                            if (Array.isArray(importedBookmarks)) {
                                localStorage.setItem('bookmarks', JSON.stringify(importedBookmarks));
                                displayBookmarks();
                                alert('Bookmarks imported successfully.');
                            } else {
                                alert('Invalid file format.');
                            }
                        } catch (error) {
                            alert('Error reading file: ' + error.message);
                        }
                    };
                    reader.readAsText(file);
                }
            });
            
            fileInput.click();
        });
    
        buttonsContainer.append(exportButton, importButton);
        $('#bookmarksContainer').after(buttonsContainer);
        fire("bookmarks.fileOperationsLoaded");
        logMessage("File actions buttons appended!");
    }

    function logMessage(msg) {
        console.log("[BOOKMARKS]: " + msg);    
    }

    $(document).ready(function () {
        loadConfig()
            .then(init)
            .catch(function (error) {
                console.error(error);
            });

        function init() {
            var currentUserPageName = 'User:' + mw.config.get('wgUserName');
            var pageTitle = document.title;
            var pageUrl = window.location.href;
            var wgPageName = mw.config.get('wgPageName');

            var allowed = isBookmarkableNamespace()
            var bookmarkButton;
            if (allowed) {
            	bookmarkButton = $('<span>', {
                id: 'bookmarkButton',
                class: 'bookmark-button',
                css: { cursor: 'pointer', marginLeft: '10px', fontSize: '24px', verticalAlign: 'middle' }
	            }).html(config.unmarkedIcon);
	
	            $('#firstHeading').append(bookmarkButton);
	            updateBookmarkButton(pageUrl);
	            bookmarkButton.on('click', function () {
	                if ($(this).hasClass('bookmarked')) {
	                    removeBookmark(pageUrl);
	                } else {
	                    saveBookmark(pageTitle, pageUrl);
	                }
	                updateBookmarkButton(pageUrl);
	            });
            }
            
            if (wgPageName === "Special:BlankPage/Bookmarks") {
                if ($('p').length) {
                    $('p').remove();
                }
                $('#firstHeading').text('Your Bookmarks');
            }

            if (wgPageName === "Special:BlankPage/Bookmarks") {
                var bookmarksContainer = $('<div>', { id: 'bookmarksContainer', css: { padding: '20px' } });
                var searchContainer = $('<div>', { css: { marginBottom: '10px' } }).append(
                    '<input type="text" id="bookmarkSearch" placeholder="Search bookmarks..."/>'
                );
                $('#mw-content-text').append(searchContainer, bookmarksContainer);
                displayBookmarks();

                $('#bookmarkSearch').on('input', function () {
                    var searchTerm = $(this).val();
                    displayBookmarks(searchTerm);
                });
                
                addImportExportButtons();
            }

           if (wgPageName === currentUserPageName) {
			    setTimeout(function () {
			        var bookmarksLink = '<li class="user-profile-navigation__link"><a href="/Special:BlankPage/Bookmarks">Bookmarks</a></li>';
			        $('.user-profile-navigation').append(bookmarksLink);
			    }, 500);
			}

            var data = {
            	success: "true",
            	bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
            	config: config
            };
            fire("bookmarks.moduleLoaded", data);
        }
    });
});