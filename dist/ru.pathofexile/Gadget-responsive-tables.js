( function() {
'use strict';

/* Translation strings */
const i18n = {
    expand: 'Развернуть',
    collapse: 'Свернуть'
};

/*
 * Responsive tables
 * @param  tables  Table elements to be transformed into responsive tables
 */
function reponsive_table (tables) {
    if ( tables.length > 0 ) {
        const expand = '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path></svg><span>' + i18n.expand + '</span>';
        const collapse = '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M436 192H312c-13.3 0-24-10.7-24-24V44c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24V44c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300V344c0-13.3-10.7-24-24-24H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H312c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"></path></svg><span>' + i18n.collapse + '</span>';
        const do_toggle = function( wrap ) {
            if ( wrap.classList.contains('is-expanded') ) {
                this.innerHTML = expand;
                wrap.classList.remove('is-expanded');
            } else {
                this.innerHTML = collapse;
                wrap.classList.add('is-expanded');
            }
        };
        for ( var i = 0; i < tables.length; i++ ) {
            var table = tables[i];
            var wrap = document.createElement('div');
            wrap.classList.add('c-responsive-table');
            table.before(wrap);
            var scroll = document.createElement('div');
            scroll.classList.add('c-responsive-table__scroll');
            wrap.appendChild(scroll);
            scroll.appendChild(table);
            table.classList.add('c-responsive-table__table');
            if ( scroll.offsetHeight < scroll.scrollHeight ) {
                var toolbar = document.createElement('div');
                toolbar.classList.add('c-responsive-table__toolbar');
                scroll.before(toolbar);
                var toggle = document.createElement('button');
                toggle.classList.add('c-responsive-table__toolbar-button');
                toggle.innerHTML = expand;
                toolbar.appendChild(toggle);
                toggle.addEventListener( 'click', do_toggle.bind(toggle, wrap) );
            }
        }
    }
}

/* Fires when wiki content is added.  */
mw.hook('wikipage.content').add( function( $wikipageContent ) {

    reponsive_table( document.getElementsByClassName('responsive-table') );
    const table_containers = document.getElementsByClassName('responsive-table-container');
    for (var i = 0; i < table_containers.length; i++) {
        reponsive_table( table_containers[i].getElementsByTagName('table') );
    }

} );

}() );