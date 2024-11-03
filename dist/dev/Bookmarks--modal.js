importArticle({
        type: 'style',
        article: 'w:c:dev:MediaWiki:Bookmarks.css'
    });

var modal;
mw.hook('bookmarks.moduleLoaded').add(function(data) {
    if (data && data.success === "true") {
        modal = $('<div>', { id: 'bookmarksModal', class: 'bookmark-modal' }).append(
            $('<h2>', { text: 'Saved Bookmarks', class: 'bookmark-modal-title' }),
            $('<div>', { id: 'bookmarksContent', class: 'bookmark-content' }),
            $('<button>', {
                text: 'Details',
                class: 'bookmark-details-button',
                click: function() {
                    window.location.href = "/wiki/Special:BlankPage/Bookmarks";
                }
            }),
            $('<button>', {
                text: 'Close',
                class: 'bookmark-close-button',
                click: function() {
                    modal.hide();
                }
            })
        );

        $('body').append(modal);

        $(document).on('keydown', function(event) {
            if (event.ctrlKey && event.key === 'm') {
                event.preventDefault();
                if (modal.is(':visible')) {
                    modal.hide();
                } else {
                    displayBookmarksInModal(data.bookmarks);
                    modal.show();
                }
            }
        });

        function displayBookmarksInModal(bookmarks) {
            const bookmarksContent = $('#bookmarksContent');
            bookmarksContent.empty();

            if (bookmarks.length === 0) {
                bookmarksContent.append('<p class="no-bookmarks-text">You currently have no bookmarks.</p>');
            } else {
                bookmarks.forEach(function(bookmark) {
                    bookmarksContent.append(
                        '<div class="bookmark-item">' +
                        '<a href="' + bookmark.url + '" class="bookmark-link">' + bookmark.title + '</a>' +
                        '</div>'
                    );
                });
            }
        }

        mw.hook("bookmarks.savedBookmark").add(function(bookmarks) {
            displayBookmarksInModal(bookmarks);
        });

        mw.hook('bookmarks.removedBookmark').add(function(bookmarks) {
            displayBookmarksInModal(bookmarks);
        });
    }
});