( function( window, $, mw ) {
    'use strict';

    const conf = mw.config.get( [
        'wgTitle',
        'wgNamespaceNumber',
        'wgUserGroups',
        'wgUserName',
        'wgServer',
        'wgFormattedNamespaces'
    ] );

    if ( conf.wgNamespaceNumber !== 1200 || window.UCP && window.UCP.PinMessages ) return;

    window.UCP = window.UCP || {};
    window.UCP.PinMessages = true;

    const wallOwner = conf.wgTitle;
    const currentUser = conf.wgUserName;
    const allowedGroups = [ 'sysop', 'threadmoderator', 'content-moderator', 'staff', 'soap', 'wiki-specialist' ];
    const isAllowed = currentUser === wallOwner || allowedGroups.some( function( g ) {
        return conf.wgUserGroups.includes( g );
    } );

    let cachedPinnedId = null;
    let observer = null;
    let isPinning = false;

    function check() {
        return new Promise( function( res ) {
            const interval = setInterval( function() {
                if ( document.querySelectorAll( '.ActionDropdown_list__NLhpP' ).length > 0 ) {
                    clearInterval( interval );
                    res();
                }
            }, 500 );
        } );
    }

    function fetchThreadFromIframe( threadId ) {
        return new Promise( function( res, rej ) {
            const iframe = document.createElement( 'iframe' );
            iframe.style.display = 'none';
            iframe.src = conf.wgServer + '/wiki/Message_Wall:' + encodeURIComponent( wallOwner ) + '?threadId=' + threadId;
            document.body.appendChild( iframe );

            iframe.addEventListener( 'load', function() {
                const interval = setInterval( function() {
                    const thread = iframe.contentDocument && iframe.contentDocument.querySelector( '.Message__wrapper' );
                    if ( thread ) {
                        clearInterval( interval );
                        const cloned = document.adoptNode( thread.cloneNode( true ) );
                        iframe.remove();
                        res( cloned );
                    }
                }, 500 );

                setTimeout( function() {
                    clearInterval( interval );
                    iframe.remove();
                    rej( 'Timed out waiting for thread in iframe' );
                }, 15000 );
            } );
        } );
    }

    mw.loader.using( 'mediawiki.api' ).then( function() {
        const isDark = document.body.classList.contains( 'theme-fandomdesktop-dark' );
        const pinIcon = isDark
            ? 'https://static.wikia.nocookie.net/dev/images/4/46/Pin-dark.png/revision/latest?cb=20260410060734'
            : 'https://static.wikia.nocookie.net/dev/images/9/99/Pin-light.png/revision/latest?cb=20260410060656';
        const unpinIcon = isDark
            ? 'https://static.wikia.nocookie.net/dev/images/5/58/Unpin-dark.png/revision/latest?cb=20260410060815'
            : 'https://static.wikia.nocookie.net/dev/images/9/90/Unpin-light.png/revision/latest?cb=20260410060848';

        const api = new mw.Api();
        const subpage = conf.wgFormattedNamespaces[ 2 ] + ':' + wallOwner + '/PinnedMessage';

        function fetchPinnedId() {
            return api.get( {
                action: 'query',
                titles: subpage,
                prop: 'revisions',
                rvprop: 'content',
                formatversion: 2
            } ).then( function( data ) {
                const page = data.query.pages[ 0 ];
                if ( page.missing ) return null;
                const content = page.revisions && page.revisions[ 0 ] && page.revisions[ 0 ].content;
                return content ? content.trim() : null;
            } );
        }

        function savePinnedId( threadId ) {
            return api.postWithEditToken( {
                action: 'edit',
                title: subpage,
                text: threadId || '',
                summary: 'Updating pinned message'
            } );
        }

        function pinThread( threadId, callback ) {
            const forum = document.querySelector( '.MessageWallForum' );
            const header = forum && forum.querySelector( '.MessageWallForum__header' );
            if ( !header ) {
                if ( callback ) callback();
                return;
            }

            const existing = document.querySelector( '.PinMessages-pinned' );
            if ( existing ) {
                existing.classList.remove( 'PinMessages-pinned' );
                const existingIndicator = existing.querySelector( '.PinMessages-pin-indicator' );
                if ( existingIndicator ) existingIndicator.remove();
            }

            function injectThread( thread ) {
                thread.classList.add( 'PinMessages-pinned' );
                header.insertAdjacentElement( 'afterend', thread );

                const indicator = document.createElement( 'div' );
                indicator.className = 'PinMessages-pin-indicator';
                indicator.style.marginBottom = '10px';
                indicator.innerHTML = '<img src="' + pinIcon + '" style="width:20px;height:20px;vertical-align:middle;margin-right:6px;">This message is pinned';
                thread.insertAdjacentElement( 'afterbegin', indicator );

                if ( callback ) callback();
            }

            const existingLink = document.querySelector( '[href*="threadId=' + threadId + '"]' );
            if ( existingLink ) {
                const wrapper = existingLink.closest( '.Message__wrapper' );
                if ( wrapper ) {
                    injectThread( wrapper );
                    return;
                }
            }

            fetchThreadFromIframe( threadId ).then( function( thread ) {
                injectThread( thread );
            } )[ 'catch' ]( function( err ) {
                console.log( '[PinMessages]', err );
                if ( callback ) callback();
            } );
        }

        function updateDropdowns( pinnedId ) {
            document.querySelectorAll( '.ActionDropdown_list__NLhpP' ).forEach( function( list ) {
                if ( list.querySelector( '.PinMessages-action' ) ) return;
                if ( !isAllowed ) return;

                const copyLink = list.querySelector( '[data-test="message-actions-link"]' );
                if ( !copyLink ) return;

                const href = copyLink.getAttribute( 'href' ) || '';
                const match = href.match( /threadId=(\d+)/ );
                if ( !match ) return;

                const threadId = match[ 1 ];
                const isPinned = threadId === pinnedId;

                const li = document.createElement( 'li' );
                li.className = 'ActionItem_action-item__dll5i PinMessages-action';
                li.setAttribute( 'tabindex', '0' );
                li.innerHTML = '<img src="' + ( isPinned ? unpinIcon : pinIcon ) + '" style="width:24px;height:24px;vertical-align:middle;margin-right:6px;">' + ( isPinned ? 'Unpin Message' : 'Pin Message' );

                li.addEventListener( 'click', function() {
                    if ( isPinned ) {
                        savePinnedId( '' ).then( function() {
                            setTimeout( function() {
                                window.location.reload();
                            }, 1500 );
                        } );
                    } else {
                        savePinnedId( threadId ).then( function() {
                            setTimeout( function() {
                                window.location.reload();
                            }, 1500 );
                        } );
                    }
                } );

                list.appendChild( li );
            } );
        }

        function startObserver( forum ) {
            observer = new MutationObserver( function() {
                updateDropdowns( cachedPinnedId );
                if ( cachedPinnedId && !document.querySelector( '.PinMessages-pinned' ) && !isPinning ) {
                    isPinning = true;
                    observer.disconnect();
                    pinThread( cachedPinnedId, function() {
                        isPinning = false;
                        observer.observe( forum, { childList: true, subtree: true } );
                    } );
                }
            } );
            observer.observe( forum, { childList: true, subtree: true } );
        }

        check().then( function() {
            fetchPinnedId().then( function( threadId ) {
                cachedPinnedId = threadId;

                if ( threadId ) {
                    isPinning = true;
                    pinThread( threadId, function() {
                        isPinning = false;
                    } );
                }

                const dropdownInterval = setInterval( function() {
                    updateDropdowns( cachedPinnedId );
                    if ( document.querySelectorAll( '.PinMessages-action' ).length > 0 ) {
                        clearInterval( dropdownInterval );
                    }
                }, 500 );

                const forum = document.querySelector( '.MessageWallForum' );
                if ( forum ) {
                    startObserver( forum );
                }
            } );
        } );
    } );

} )( this, jQuery, mediaWiki );