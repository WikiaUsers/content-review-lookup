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

        function getLastUnpinnedThread() {
            const threads = document.querySelectorAll( '.Message__wrapper:not(.PinMessages-pinned)' );
            return threads.length ? threads[ threads.length - 1 ] : null;
        }

        function hideLastUnpinnedThread() {
            const last = getLastUnpinnedThread();
            if ( last ) {
                last.setAttribute( 'data-pinmessages-hidden', 'true' );
                last.style.display = 'none';
            }
        }

        function restoreHiddenThread() {
            const hidden = document.querySelector( '[data-pinmessages-hidden="true"]' );
            if ( hidden ) {
                hidden.style.display = '';
                hidden.removeAttribute( 'data-pinmessages-hidden' );
            }
        }

        function unpinThread() {
            const pinned = document.querySelector( '.PinMessages-pinned' );
            if ( !pinned ) return;

            restoreHiddenThread();

            const wasIframeFetched = pinned.hasAttribute( 'data-pinmessages-iframe' );
            const nextSibling = pinned.dataset.pinmessagesNextSibling
                ? document.querySelector( '[data-pinmessages-anchor="' + pinned.dataset.pinmessagesNextSibling + '"]' )
                : null;
            const parent = pinned.parentNode;

            pinned.classList.remove( 'PinMessages-pinned' );
            delete pinned.dataset.pinmessagesNextSibling;
            const indicator = pinned.querySelector( '.PinMessages-pin-indicator' );
            if ( indicator ) indicator.remove();

            if ( wasIframeFetched ) {
                pinned.remove();
            } else if ( parent ) {
                if ( nextSibling && nextSibling.parentNode === parent ) {
                    parent.insertBefore( pinned, nextSibling );
                } else {
                    parent.appendChild( pinned );
                }
                pinned.removeAttribute( 'data-pinmessages-anchor' );
            }
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
                const alreadyInDom = document.querySelector( '[href*="threadId=' + threadId + '"]' );
                if ( alreadyInDom ) {
                    const wrapper = alreadyInDom.closest( '.Message__wrapper' );
                    if ( wrapper && !wrapper.classList.contains( 'PinMessages-pinned' ) ) {
                        const nextSib = wrapper.nextElementSibling;
                        if ( nextSib ) {
                            nextSib.setAttribute( 'data-pinmessages-anchor', threadId );
                            wrapper.dataset.pinmessagesNextSibling = threadId;
                        }
                        wrapper.classList.add( 'PinMessages-pinned' );
                        header.insertAdjacentElement( 'afterend', wrapper );
                        if ( !wrapper.querySelector( '.PinMessages-pin-indicator' ) ) {
                            const indicator = document.createElement( 'div' );
                            indicator.className = 'PinMessages-pin-indicator';
                            indicator.style.marginBottom = '10px';
                            indicator.innerHTML = '<img src="' + pinIcon + '" style="width:20px;height:20px;vertical-align:middle;margin-right:6px;">This message is pinned';
                            wrapper.insertAdjacentElement( 'afterbegin', indicator );
                        }
                    }
                    if ( callback ) callback();
                    return;
                }

                hideLastUnpinnedThread();

                thread.setAttribute( 'data-pinmessages-iframe', 'true' );
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
                            cachedPinnedId = null;
                            unpinThread();
                            document.querySelectorAll( '.PinMessages-action' ).forEach( function( el ) {
                                el.remove();
                            } );
                            updateDropdowns( null );
                        } );
                    } else {
                        savePinnedId( threadId ).then( function() {
                            if ( cachedPinnedId ) {
                                unpinThread();
                            }
                            cachedPinnedId = threadId;
                            isPinning = true;
                            observer && observer.disconnect();
                            pinThread( threadId, function() {
                                isPinning = false;
                                const forum = document.querySelector( '.MessageWallForum' );
                                if ( forum && observer ) {
                                    observer.observe( forum, { childList: true, subtree: true } );
                                }
                            } );
                            document.querySelectorAll( '.PinMessages-action' ).forEach( function( el ) {
                                el.remove();
                            } );
                            updateDropdowns( threadId );
                        } );
                    }
                } );

                list.appendChild( li );
            } );
        }

        function attachLoadMoreListener() {
            const btn = document.querySelector( '.LoadMoreButton_load-more__9yEV2' );
            if ( !btn || btn.dataset.pinmessagesListening ) return;
            btn.dataset.pinmessagesListening = 'true';

            btn.addEventListener( 'click', function() {
                const countBefore = document.querySelectorAll(
                    '.Message__wrapper:not(.PinMessages-pinned)'
                ).length;

                const poll = setInterval( function() {
                    const countAfter = document.querySelectorAll(
                        '.Message__wrapper:not(.PinMessages-pinned)'
                    ).length;

                    if ( countAfter > countBefore ) {
                        clearInterval( poll );

                        if ( cachedPinnedId ) {
                            restoreHiddenThread();
                            hideLastUnpinnedThread();
                        }

                        updateDropdowns( cachedPinnedId );

                        delete btn.dataset.pinmessagesListening;
                        attachLoadMoreListener();
                    }
                }, 300 );

                setTimeout( function() { clearInterval( poll ); }, 15000 );
            } );
        }

        function startObserver( forum ) {
            const header = forum.querySelector( '.MessageWallForum__header' );
            observer = new MutationObserver( function() {
                updateDropdowns( cachedPinnedId );
                attachLoadMoreListener();

                if ( cachedPinnedId ) {
                    const pinned = document.querySelector( '.PinMessages-pinned' );
                    const real = document.querySelector( '[href*="threadId=' + cachedPinnedId + '"]' );
                    if ( pinned && real ) {
                        const realWrapper = real.closest( '.Message__wrapper' );
                        if ( realWrapper && realWrapper !== pinned ) {
                            restoreHiddenThread();
                            pinned.remove();
                            realWrapper.classList.add( 'PinMessages-pinned' );
                            if ( header ) header.insertAdjacentElement( 'afterend', realWrapper );
                            if ( !realWrapper.querySelector( '.PinMessages-pin-indicator' ) ) {
                                const indicator = document.createElement( 'div' );
                                indicator.className = 'PinMessages-pin-indicator';
                                indicator.style.marginBottom = '10px';
                                indicator.innerHTML = '<img src="' + pinIcon + '" style="width:20px;height:20px;vertical-align:middle;margin-right:6px;">This message is pinned';
                                realWrapper.insertAdjacentElement( 'afterbegin', indicator );
                            }
                        }
                    }
                }

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
                    attachLoadMoreListener();
                }
            } );
        } );
    } );

} )( this, jQuery, mediaWiki );