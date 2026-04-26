
/* This JavaScript file is to load on every cache of the Wikia for all users. Credits of any public domain coding goes fully to the aforementioned users. */


/*======================================================================================*/

/* Adds information icons to the bottom border of page headers
 * Full credit to: [[User:The 888th Avatar]], [[User:Lady Lostris]], and [[User:Thailog]] of Avatar Wiki
 */

$(function() {
    if ( mw.config.get( 'wgVersion' ) !== '1.19.24' && $( '#title-eraicons' ).length ) {
        $( '.page-header__contribution > div' ).first().append( $( '#title-eraicons' ).show() );
    } else if ( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 335px;' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em' } ).show();
}
});

/*======================================================================================*/

/*Start of JS Button in dashboard script, originally by TK-999 et al. 
Customised by Annon- CPA to go to Fandomdesktop.js instead of common.js*/

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
        window.AdminDashboardJSButtonLoaded
    ) {
        return;
    }
    window.AdminDashboardJSButtonLoaded = true;
    var AdminDashboardJSButton = {
        init: function(i18n) {
            console.log(i18n);
            this.$control = $('<li>', {
                'class': 'control',
                'data-tooltip': i18n.msg('tooltip').plain()
            }).append(
                $('<a>', {
                    'class': 'set',
                    href: mw.util.getUrl('MediaWiki:Fandomdesktop.js', { action: 'edit' })
                }).append(
                    $('<span>', {
                        'class': 'representation AdminDashboardJSButton'
                    }).append(
                        $('<div>').append(
                            $('<span>', {
                                text: 'JS_'
                            })
                        )
                    ),
                    'JS'
                )
            ).hover($.proxy(this.hover, this), $.proxy(this.unhover, this));
            $('.control a[data-tracking="special-css"]').parent().after(this.$control);
            this.$tooltip = $('.control-section.wiki > header > .dashboard-tooltip');
        },
        hover: function(e) {
            this.$tooltip.text(this.$control.data('tooltip'));
        },
        unhover: function(e) {
            this.$tooltip.text('');
        },
        hook: function(i18n) {
            i18n.loadMessages('AdminDashboard_JS-Button')
                .then($.proxy(this.init, this));
        }
    };
    mw.hook('dev.i18n').add($.proxy(AdminDashboardJSButton.hook, AdminDashboardJSButton));
    importArticle(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:AdminDashboardJSButton.css'
        }
    );
})();
/* Imports for js button for admin page and adds first edit page to profile*/
importArticles({
    type: 'script',
    articles: [
 'u:dev:MediaWiki:FirstEditDate.js',
 'u:dev:MediaWiki:BackToTopButton/code.js',


    ]
});
/*======================================================================================*/

// Create the "dev" namespace if it doesn't exist already:

window.dev = window.dev || {};

// Create the sub-namespace for this addon and set some options:

window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:Custom-StandardEditSummaries'
};

// The options need to be set before the import! Otherwise they may not work.

importArticles({ type: 'script', articles: [ 
    'u:dev:MediaWiki:Standard Edit Summary/code.js'
]});

/*======================================================================================*/

function toggleContent(element) {
    var content = element.parentNode.nextElementSibling;
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

/*======================================================================================*/

function sortList(criteria) {
    const list = document.getElementById('nameList');
    const items = Array.from(list.getElementsByTagName('li'));

    items.sort((a, b) => {
        let valueA = a.getAttribute(`data-${criteria}`);
        let valueB = b.getAttribute(`data-${criteria}`);

        if (criteria === 'name') {
            return valueA.localeCompare(valueB);
        } else {
            return parseInt(valueA) - parseInt(valueB);
        }
    });

    list.innerHTML = '';

    if (criteria === 'induction' || criteria === 'peak') {
        let currentHeader = '';
        items.forEach(item => {
            let value = item.getAttribute(`data-${criteria}`);

            if (value !== currentHeader) {
                currentHeader = value;
                const header = document.createElement('li');
                header.textContent = currentHeader;
                header.className = 'categorization';
                list.appendChild(header);
            }

            list.appendChild(item);
        });
    } else {
        items.forEach(item => list.appendChild(item));
    }
}